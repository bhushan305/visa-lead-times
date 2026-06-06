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

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
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

  // 2) Latest snapshot → cases + today's daily_snapshots
  const latest = await fetchJson<{ rows: SheetRow[] }>(`${APPS_SCRIPT_URL}?tab=latest`);
  const cases = latest.rows.map((r) => {
    const slug = slugify(r.logical_case_name);
    const [lo, hi] = parseRange(r.processing_time_display);
    return {
      slug,
      form_code: extractFormCode(r.logical_case_name) ?? "UNKNOWN",
      name: r.logical_case_name,
      category: r.category_label_selected,
      office: r.office_label_selected,
      current_display: r.processing_time_display,
      current_lo_months: lo,
      current_hi_months: hi,
      inquiry_date: parseDate(r.case_inquiry_date_display),
      last_change_date: parseDate(r.last_change_date),
      as_of: parseDate(r.run_date),
    };
  });

  // Upsert in batches of 500 to stay under PostgREST limits
  for (let i = 0; i < cases.length; i += 500) {
    const batch = cases.slice(i, i + 500);
    const { error } = await sb.from("cases").upsert(batch, { onConflict: "slug" });
    if (error) throw error;
  }
  console.log(`Upserted ${cases.length} cases`);

  // 3) Daily snapshots — pull last 30 days so we backfill any missed runs
  const raw = await fetchJson<{ rows: SheetRow[] }>(`${APPS_SCRIPT_URL}?tab=raw&days=30`);
  const snapshots = raw.rows
    .map((r) => {
      const slug = slugify(r.logical_case_name);
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

  for (let i = 0; i < snapshots.length; i += 1000) {
    const batch = snapshots.slice(i, i + 1000);
    const { error } = await sb
      .from("daily_snapshots")
      .upsert(batch, { onConflict: "case_slug,run_date" });
    if (error) throw error;
  }
  console.log(`Upserted ${snapshots.length} daily snapshots`);

  // 4) Refresh monthly aggregates
  await sb.rpc("refresh_monthly_aggregates");

  // 5) Log the run
  await sb.from("run_log").insert({
    source: "apps_script",
    status: "ok",
    rows_attempted: cases.length + snapshots.length,
    rows_written: cases.length + snapshots.length,
    errors: 0,
    notes: `forms=${forms.length} cases=${cases.length} snapshots=${snapshots.length} elapsed_ms=${Date.now() - t0}`,
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
