/**
 * Sync the Apps Script JSON API (which mirrors the Google Sheet) into Supabase.
 *
 * Run nightly via:
 *   - Vercel Cron (vercel.json) hitting /api/cron/sync
 *   - or GitHub Actions: `pnpm tsx scripts/sync-sheet-to-supabase.ts`
 *
 * Required env:
 *   SUPABASE_URL              = https://<project>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY = (server-only, never expose to client)
 *   APPS_SCRIPT_URL           = https://script.google.com/macros/s/.../exec
 */

import { createClient } from "@supabase/supabase-js";
import { caseSlug, legacyCaseSlug } from "../src/lib/slug";

type Form = { code: string; label: string };
type SheetRow = {
  logical_case_name: string;
  run_date: string;
  form_label_selected: string;
  category_label_selected: string;
  office_label_selected: string;
  processing_time_display: string;
  case_inquiry_date_display?: string;
  last_change_date?: string;
  data_status?: string;
  change_vs_prior?: string;
  notes?: string;
};

const APPS_SCRIPT_URL =
  process.env.APPS_SCRIPT_URL ??
  "https://script.google.com/macros/s/AKfycbwF37kFPBEYOCS9t33Ai5gzoL_XkYBFfMsKzCt9SameFmPf30wOQkqbbqn53njCdrAZ/exec";

const SUPABASE_URL =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (sb_secret_… / service_role)."
  );
  console.error("Add them to .env.local — the secret key is required for writes.");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200);
}

/** Deterministic 5-char hash suffix for disambiguating colliding slugs. */
function shortHash(s: string): string {
  // djb2-style; deterministic across runs so the same logical_case_name always
  // gets the same suffix → slugs stay stable across re-syncs.
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36).slice(0, 5);
}

/** Parse "8.5 Months to 11 Months" → [8.5, 11]. Handles "null See notes" gracefully. */
function parseRange(display: string | undefined): [number | null, number | null] {
  if (!display) return [null, null];
  const nums = (display.match(/[\d.]+/g) ?? []).map(Number).filter((n) => !isNaN(n));
  if (nums.length === 0) return [null, null];
  if (nums.length === 1) return [nums[0], nums[0]];
  return [nums[0], nums[1]];
}

function parseDate(raw: string | undefined): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return (await res.json()) as T;
}

async function main() {
  const t0 = Date.now();

  // 1) Forms
  const formsResp = await fetchJson<{ forms: Form[] }>(`${APPS_SCRIPT_URL}?tab=forms`);
  const forms = formsResp.forms.map((f) => ({
    code: f.code,
    label: f.label,
    slug: slugify(f.code),
  }));
  const { error: formsErr } = await sb.from("forms").upsert(forms, { onConflict: "code" });
  if (formsErr) throw formsErr;
  console.log(`Upserted ${forms.length} forms`);

  // 2) Build case dimension from UNION(latest, raw history) — lossless.
  //
  // Why union: `?tab=latest` only contains cases that succeeded on the most
  // recent USCIS run. Cases that errored that day (e.g. I-129 H1B1 with no
  // published time) are absent from latest but still have valid history in
  // raw_snapshots. If we built the case dimension from latest alone, we'd
  // drop every snapshot for those "orphan" cases — losing weeks of data.
  //
  // Instead: read full raw history (days=9999), then for any logical_case_name
  // we haven't already seen in latest, synthesize a case row from its most
  // recent raw entry. Every USCIS row that ever existed becomes a case.
  //
  // The sync is upsert-only. Existing Supabase rows are never deleted; we
  // only insert new ones or update fields on existing slugs.

  const latest = await fetchJson<{ rows: SheetRow[] }>(`${APPS_SCRIPT_URL}?tab=latest`);
  const raw = await fetchJson<{ rows: SheetRow[] }>(
    `${APPS_SCRIPT_URL}?tab=raw&days=9999&limit=200000`
  );

  // Slug assignment.
  //
  // We dedupe aggressively on the base SEO slug itself. Apps Script v1 and v2
  // emit subtly different category/office strings for the same USCIS case
  // (e.g. "I-485 Employment" vs "Employment-based adjustment applications"),
  // which would split a single case into two slugs if we keyed on the raw
  // tuple. But once we run caseSlug() over them, both strip down to the same
  // SEO slug — that match is our signal that they're the same case.
  //
  // Trade-off: if two truly distinct USCIS cases ever slugify identically,
  // they'll be merged. In practice this doesn't happen — the slug already
  // encodes form, category, and office, which are the case's natural key in
  // USCIS's own tool. Aggressive merging is the right default; the hash
  // suffix experiment introduced more noise than it solved.
  const slugMap = new Map<string, string>(); // logical_case_name → slug (lookup)
  const usedSlugs = new Set<string>();

  function assignSlug(logical: string, form_code: string, cat: string, off: string) {
    if (slugMap.has(logical)) return slugMap.get(logical)!;
    const base = caseSlug(form_code, cat, off);
    // Whether or not the base is already used, the new row maps to it.
    // (If used, this row is a v1/v2 variation of an existing case.)
    usedSlugs.add(base);
    slugMap.set(logical, base);
    return base;
  }

  // Process latest first so active cases get the clean (un-suffixed) slug.
  // Skip rows that don't yield a recognisable form code — these can't FK into
  // the forms table and would crash the upsert. (Forms table only has the
  // 43 codes returned by `?tab=forms`.)
  let skippedUnknown = 0;
  const validFormCodes = new Set(forms.map((f) => f.code));
  for (const r of latest.rows) {
    const form_code = extractFormCode(r.logical_case_name);
    if (!form_code || !validFormCodes.has(form_code)) {
      skippedUnknown++;
      continue;
    }
    assignSlug(r.logical_case_name, form_code, r.category_label_selected, r.office_label_selected);
  }

  // For orphans (in raw but not latest), keep the MOST RECENT raw row per
  // logical_case_name so we can synthesize a case from it.
  const mostRecentRawByCase = new Map<string, SheetRow>();
  for (const r of raw.rows) {
    if (!r.category_label_selected || !r.office_label_selected) continue;
    const prev = mostRecentRawByCase.get(r.logical_case_name);
    if (!prev || (parseDate(r.run_date) ?? "") > (parseDate(prev.run_date) ?? "")) {
      mostRecentRawByCase.set(r.logical_case_name, r);
    }
  }

  // Build case rows: from latest where available, synthesized from raw otherwise.
  const caseRows: any[] = [];
  const seenLogical = new Set<string>();

  for (const r of latest.rows) {
    const form_code = extractFormCode(r.logical_case_name);
    if (!form_code || !validFormCodes.has(form_code)) continue;
    seenLogical.add(r.logical_case_name);
    const slug = assignSlug(r.logical_case_name, form_code, r.category_label_selected, r.office_label_selected);
    const [lo, hi] = parseRange(r.processing_time_display);
    caseRows.push({
      slug,
      form_code,
      name: r.logical_case_name,
      category: r.category_label_selected,
      office: r.office_label_selected,
      current_display: r.processing_time_display,
      current_lo_months: lo,
      current_hi_months: hi,
      inquiry_date: parseDate(r.case_inquiry_date_display),
      last_change_date: parseDate(r.last_change_date),
      as_of: parseDate(r.run_date),
    });
  }

  // Synthesize orphans from their most recent raw row.
  let orphansSynthesized = 0;
  for (const [logical, r] of mostRecentRawByCase) {
    if (seenLogical.has(logical)) continue;
    const form_code = extractFormCode(logical);
    if (!form_code || !validFormCodes.has(form_code)) {
      skippedUnknown++;
      continue;
    }
    orphansSynthesized++;
    const slug = assignSlug(logical, form_code, r.category_label_selected, r.office_label_selected);
    const [lo, hi] = parseRange(r.processing_time_display);
    caseRows.push({
      slug,
      form_code,
      name: logical,
      category: r.category_label_selected,
      office: r.office_label_selected,
      current_display: r.processing_time_display ?? null,
      current_lo_months: lo,
      current_hi_months: hi,
      inquiry_date: parseDate(r.case_inquiry_date_display),
      last_change_date: parseDate(r.last_change_date),
      as_of: parseDate(r.run_date),
    });
  }
  if (orphansSynthesized > 0) {
    console.log(`Synthesized ${orphansSynthesized} case rows from raw (cases not in latest)`);
  }
  if (skippedUnknown > 0) {
    console.log(`Skipped ${skippedUnknown} rows with unrecognised form_code (not in forms table)`);
  }

  // Dedupe by slug (last write wins) for safety.
  const caseMap = new Map<string, any>();
  for (const c of caseRows) caseMap.set(c.slug, c);
  const dedupedCases = [...caseMap.values()];
  if (dedupedCases.length !== caseRows.length) {
    console.log(`Deduped ${caseRows.length - dedupedCases.length} duplicate cases`);
  }

  for (let i = 0; i < dedupedCases.length; i += 500) {
    const batch = dedupedCases.slice(i, i + 500);
    const { error } = await sb.from("cases").upsert(batch, { onConflict: "slug" });
    if (error) throw error;
  }
  console.log(`Upserted ${dedupedCases.length} cases`);

  // 3) Daily snapshots — every raw row is now insertable because every
  // logical_case_name has a corresponding case row.
  let skippedOrphans = 0;
  const snapshots = raw.rows
    .map((r) => {
      const slug = slugMap.get(r.logical_case_name);
      if (!slug) {
        // Should be unreachable after the synthesis pass, but log defensively.
        skippedOrphans++;
        return null;
      }
      const [lo, hi] = parseRange(r.processing_time_display);
      const run_date = parseDate(r.run_date);
      if (!run_date) return null;
      return {
        case_slug: slug,
        run_date,
        processing_time_display: r.processing_time_display ?? null,
        lo_months: lo,
        hi_months: hi,
        inquiry_date: parseDate(r.case_inquiry_date_display),
        change_vs_prior: r.change_vs_prior ?? null,
        data_status: r.data_status ?? null,
        notes: r.notes ?? null,
      };
    })
    .filter(Boolean) as any[];

  if (skippedOrphans > 0) {
    console.log(`Skipped ${skippedOrphans} orphan snapshots (unexpected — missing slug)`);
  }

  // Dedupe by (case_slug, run_date) — the sheet occasionally has multiple
  // rows for the same case+date (e.g. mid-day re-runs), and Postgres' upsert
  // can't apply two updates to the same row in one batch. Last write wins.
  const snapshotMap = new Map<string, any>();
  for (const s of snapshots) snapshotMap.set(`${s.case_slug}__${s.run_date}`, s);
  const deduped = [...snapshotMap.values()];
  if (deduped.length !== snapshots.length) {
    console.log(`Deduped ${snapshots.length - deduped.length} duplicate snapshots`);
  }

  for (let i = 0; i < deduped.length; i += 1000) {
    const batch = deduped.slice(i, i + 1000);
    const { error } = await sb
      .from("daily_snapshots")
      .upsert(batch, { onConflict: "case_slug,run_date" });
    if (error) throw error;
  }
  console.log(`Upserted ${deduped.length} daily snapshots`);

  // 4) Refresh monthly aggregates
  await sb.rpc("refresh_monthly_aggregates");

  // 5) Log the run
  await sb.from("run_log").insert({
    source: "apps_script",
    status: "ok",
    rows_attempted: dedupedCases.length + snapshots.length,
    rows_written: dedupedCases.length + deduped.length,
    errors: 0,
    notes: `forms=${forms.length} cases=${dedupedCases.length} snapshots=${deduped.length} elapsed_ms=${Date.now() - t0}`,
  });

  console.log(`Done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

/** "I-485 - Employment-based ... @ Service Center" → "I-485" */
function extractFormCode(logicalName: string): string | null {
  const m = logicalName.match(/^([A-Z]-?\d+[A-Z0-9]*)/);
  return m ? m[1] : null;
}

main().catch((e) => {
  console.error(e);
  sb.from("run_log")
    .insert({
      source: "apps_script",
      status: "error",
      notes: e instanceof Error ? e.message : String(e),
    })
    .then(() => process.exit(1));
});
