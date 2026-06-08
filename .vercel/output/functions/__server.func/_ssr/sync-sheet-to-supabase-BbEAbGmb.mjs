import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as caseSlug } from "./slug-Dep3TFBB.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL ?? "https://script.google.com/macros/s/AKfycbwF37kFPBEYOCS9t33Ai5gzoL_XkYBFfMsKzCt9SameFmPf30wOQkqbbqn53njCdrAZ/exec";
const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (sb_secret_… / service_role)."
  );
  console.error("Add them to .env.local — the secret key is required for writes.");
  process.exit(1);
}
const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 200);
}
function parseRange(display) {
  if (!display) return [null, null];
  const nums = (display.match(/[\d.]+/g) ?? []).map(Number).filter((n) => !isNaN(n));
  if (nums.length === 0) return [null, null];
  if (nums.length === 1) return [nums[0], nums[0]];
  return [nums[0], nums[1]];
}
function parseDate(raw) {
  if (!raw) return null;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}
async function fetchJson(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return await res.json();
}
async function main() {
  const t0 = Date.now();
  const formsResp = await fetchJson(`${APPS_SCRIPT_URL}?tab=forms`);
  const forms = formsResp.forms.map((f) => ({
    code: f.code,
    label: f.label,
    slug: slugify(f.code)
  }));
  const { error: formsErr } = await sb.from("forms").upsert(forms, { onConflict: "code" });
  if (formsErr) throw formsErr;
  console.log(`Upserted ${forms.length} forms`);
  const latest = await fetchJson(`${APPS_SCRIPT_URL}?tab=latest`);
  const raw = await fetchJson(
    `${APPS_SCRIPT_URL}?tab=raw&days=9999&limit=200000`
  );
  const slugMap = /* @__PURE__ */ new Map();
  const usedSlugs = /* @__PURE__ */ new Set();
  function assignSlug(logical, form_code, cat, off) {
    if (slugMap.has(logical)) return slugMap.get(logical);
    const base = caseSlug(form_code, cat, off);
    usedSlugs.add(base);
    slugMap.set(logical, base);
    return base;
  }
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
  const mostRecentRawByCase = /* @__PURE__ */ new Map();
  for (const r of raw.rows) {
    if (!r.category_label_selected || !r.office_label_selected) continue;
    const prev = mostRecentRawByCase.get(r.logical_case_name);
    if (!prev || (parseDate(r.run_date) ?? "") > (parseDate(prev.run_date) ?? "")) {
      mostRecentRawByCase.set(r.logical_case_name, r);
    }
  }
  const caseRows = [];
  const seenLogical = /* @__PURE__ */ new Set();
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
      as_of: parseDate(r.run_date)
    });
  }
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
      as_of: parseDate(r.run_date)
    });
  }
  if (orphansSynthesized > 0) {
    console.log(`Synthesized ${orphansSynthesized} case rows from raw (cases not in latest)`);
  }
  if (skippedUnknown > 0) {
    console.log(`Skipped ${skippedUnknown} rows with unrecognised form_code (not in forms table)`);
  }
  const caseMap = /* @__PURE__ */ new Map();
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
  let skippedOrphans = 0;
  const snapshots = raw.rows.map((r) => {
    const slug = slugMap.get(r.logical_case_name);
    if (!slug) {
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
      notes: r.notes ?? null
    };
  }).filter(Boolean);
  if (skippedOrphans > 0) {
    console.log(`Skipped ${skippedOrphans} orphan snapshots (unexpected — missing slug)`);
  }
  const snapshotMap = /* @__PURE__ */ new Map();
  for (const s of snapshots) snapshotMap.set(`${s.case_slug}__${s.run_date}`, s);
  const deduped = [...snapshotMap.values()];
  if (deduped.length !== snapshots.length) {
    console.log(`Deduped ${snapshots.length - deduped.length} duplicate snapshots`);
  }
  for (let i = 0; i < deduped.length; i += 1e3) {
    const batch = deduped.slice(i, i + 1e3);
    const { error } = await sb.from("daily_snapshots").upsert(batch, { onConflict: "case_slug,run_date" });
    if (error) throw error;
  }
  console.log(`Upserted ${deduped.length} daily snapshots`);
  await sb.rpc("refresh_monthly_aggregates");
  await sb.from("run_log").insert({
    source: "apps_script",
    status: "ok",
    rows_attempted: dedupedCases.length + snapshots.length,
    rows_written: dedupedCases.length + deduped.length,
    errors: 0,
    notes: `forms=${forms.length} cases=${dedupedCases.length} snapshots=${deduped.length} elapsed_ms=${Date.now() - t0}`
  });
  console.log(`Done in ${((Date.now() - t0) / 1e3).toFixed(1)}s`);
}
function extractFormCode(logicalName) {
  const m = logicalName.match(/^([A-Z]-?\d+[A-Z0-9]*)/);
  return m ? m[1] : null;
}
main().catch((e) => {
  console.error(e);
  sb.from("run_log").insert({
    source: "apps_script",
    status: "error",
    notes: e instanceof Error ? e.message : String(e)
  }).then(() => process.exit(1));
});
