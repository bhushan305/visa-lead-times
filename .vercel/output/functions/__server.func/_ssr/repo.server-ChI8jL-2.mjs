import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as caseSlug } from "./slug-Dep3TFBB.mjs";
let cached = null;
function readUrl() {
  return process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? null;
}
function readKey() {
  return process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? // fallback: scripts/cron can reuse this
  process.env.SUPABASE_SECRET_KEY ?? null;
}
function getSupabase() {
  if (cached) return cached;
  const url = readUrl();
  const key = readKey();
  if (!url || !key) return null;
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}
function hasSupabase() {
  return !!(readUrl() && readKey());
}
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL ?? "https://script.google.com/macros/s/AKfycbwF37kFPBEYOCS9t33Ai5gzoL_XkYBFfMsKzCt9SameFmPf30wOQkqbbqn53njCdrAZ/exec";
const memo = /* @__PURE__ */ new Map();
const TTL_MS = 60 * 60 * 1e3;
async function fetchTab(qs) {
  const key = qs;
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data;
  const url = `${APPS_SCRIPT_URL}?${qs}`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Apps Script ${res.status}: ${qs}`);
  const data = await res.json();
  memo.set(key, { at: Date.now(), data });
  return data;
}
async function liveForms() {
  return fetchTab("tab=forms");
}
async function liveLatest(form) {
  return fetchTab(`tab=latest${""}`);
}
async function liveRaw(form, days = 60) {
  return fetchTab(`tab=raw&form=${form}&days=${days}`);
}
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 200);
}
function parseRange(display) {
  if (!display) return [null, null];
  const nums = (display.match(/[\d.]+/g) ?? []).map(Number).filter((n) => !isNaN(n));
  if (!nums.length) return [null, null];
  if (nums.length === 1) return [nums[0], nums[0]];
  return [nums[0], nums[1]];
}
function parseDate(raw) {
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}
function extractFormCode(name) {
  const m = name.match(/^([A-Z]-?\d+[A-Z0-9]*)/);
  return m ? m[1] : "UNKNOWN";
}
async function repoForms() {
  if (hasSupabase()) {
    const { data, error } = await getSupabase().from("forms").select("code,label,slug").order("code");
    if (!error && data?.length) return data;
  }
  const { forms } = await liveForms();
  return forms.map((f) => ({ ...f, slug: slugify(f.code) }));
}
let _casesAllCache = null;
const CASES_TTL_MS = 60 * 60 * 1e3;
async function repoCases(form) {
  if (hasSupabase()) {
    let q = getSupabase().from("cases").select("*").order("name");
    if (form) q = q.eq("form_code", form);
    const { data } = await q;
    if (data?.length) {
      return data.map((r) => ({
        slug: r.slug,
        form_code: r.form_code,
        name: r.name,
        category: r.category,
        office: r.office,
        current_display: r.current_display,
        current_lo: r.current_lo_months,
        current_hi: r.current_hi_months,
        inquiry_date: r.inquiry_date,
        last_change_date: r.last_change_date,
        as_of: r.as_of
      }));
    }
  }
  if (!_casesAllCache || Date.now() - _casesAllCache.at > CASES_TTL_MS) {
    const { rows } = await liveLatest();
    _casesAllCache = { at: Date.now(), data: rows.map(rowToCase) };
  }
  return form ? _casesAllCache.data.filter((c) => c.form_code === form) : _casesAllCache.data;
}
function rowToCase(r) {
  const [lo, hi] = parseRange(r.processing_time_display);
  const form_code = extractFormCode(r.logical_case_name);
  const base = caseSlug(form_code, r.category_label_selected, r.office_label_selected);
  return {
    slug: base,
    // Supabase path is authoritative; live-API is fallback only
    form_code,
    name: r.logical_case_name,
    category: r.category_label_selected,
    office: r.office_label_selected,
    current_display: r.processing_time_display ?? null,
    current_lo: lo,
    current_hi: hi,
    inquiry_date: parseDate(r.case_inquiry_date_display),
    last_change_date: parseDate(r.last_change_date),
    as_of: parseDate(r.run_date)
  };
}
async function repoCase(slug) {
  if (hasSupabase()) {
    const { data } = await getSupabase().from("cases").select("*").eq("slug", slug).maybeSingle();
    if (data) {
      return {
        slug: data.slug,
        form_code: data.form_code,
        name: data.name,
        category: data.category,
        office: data.office,
        current_display: data.current_display,
        current_lo: data.current_lo_months,
        current_hi: data.current_hi_months,
        inquiry_date: data.inquiry_date,
        last_change_date: data.last_change_date,
        as_of: data.as_of
      };
    }
  }
  const all = await repoCases();
  return all.find((c) => c.slug === slug) ?? null;
}
async function repoDaily(caseSlug2) {
  if (hasSupabase()) {
    const { data } = await getSupabase().from("daily_snapshots").select("run_date,lo_months,hi_months").eq("case_slug", caseSlug2).not("lo_months", "is", null).order("run_date");
    if (data?.length) {
      return data.map((r) => ({ d: r.run_date, lo: r.lo_months, hi: r.hi_months }));
    }
  }
  const c = await repoCase(caseSlug2);
  if (!c) return [];
  const raw = await liveRaw(c.form_code, 60);
  return raw.rows.filter((r) => slugify(r.logical_case_name) === caseSlug2).map((r) => {
    const [lo, hi] = parseRange(r.processing_time_display);
    const d = parseDate(r.run_date);
    if (!d || lo == null || hi == null) return null;
    return { d, lo, hi };
  }).filter(Boolean);
}
async function repoMonthly(caseSlug2) {
  if (hasSupabase()) {
    const { data } = await getSupabase().from("monthly_aggregates").select("month,avg_lo,avg_hi").eq("case_slug", caseSlug2).order("month");
    if (data?.length) return data;
  }
  return [];
}
async function repoHistoricForForm(form_code, category) {
  if (hasSupabase()) {
    const { data } = await getSupabase().from("historic_pt").select("*").eq("form_code", form_code).order("fiscal_year");
    if (data?.length) {
      const byClass = /* @__PURE__ */ new Map();
      for (const row of data) {
        const k = row.classification;
        if (!byClass.has(k)) byClass.set(k, []);
        byClass.get(k).push(row);
      }
      if (byClass.size === 1) return data;
      const candidates = [...byClass.keys()];
      const chosen = category ? pickBestText(category, candidates) : candidates[0];
      return byClass.get(chosen) ?? data;
    }
  }
  try {
    const mod = await import("./historic-pt-seed-CD1BX4Xf.mjs");
    const all = (mod.default ?? mod).filter(
      (r) => r && r.form_code === form_code && r.years
    );
    if (!all.length) return [];
    const chosen = category ? pickBestClassification(category, all) : all[0];
    const ytdYear = chosen.ytd_year;
    return Object.entries(chosen.years).map(([yStr, v]) => {
      const fy = Number(yStr);
      if (!Number.isFinite(fy) || v == null) return null;
      return {
        form_code,
        classification: chosen.classification,
        fiscal_year: fy,
        avg_months: Number(v),
        is_ytd: ytdYear === fy
      };
    }).filter(Boolean);
  } catch {
    return [];
  }
}
function pickBestText(target, candidates) {
  const tLower = target.toLowerCase();
  const wantsPremium = /\bpremium\b/i.test(tLower);
  let pool = candidates;
  const anyPremium = candidates.some((c) => /\bpremium\b/i.test(c));
  if (anyPremium) {
    if (wantsPremium) {
      const premiumOnly = candidates.filter(
        (c) => /\bpremium\b/i.test(c) && !/non[\s-]*premium/i.test(c)
      );
      if (premiumOnly.length) pool = premiumOnly;
    } else {
      const nonPremium = candidates.filter(
        (c) => !/\bpremium\b/i.test(c) || /non[\s-]*premium/i.test(c)
      );
      if (nonPremium.length) pool = nonPremium;
    }
  }
  const tokenize = (s) => new Set(
    s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 2)
  );
  const t = tokenize(target);
  let best = pool[0];
  let bestScore = -1;
  for (const c of pool) {
    const cand = tokenize(c);
    let overlap = 0;
    for (const w of t) if (cand.has(w)) overlap++;
    if (overlap > bestScore || overlap === bestScore && c.length > best.length) {
      bestScore = overlap;
      best = c;
    }
  }
  return best;
}
function pickBestClassification(category, candidates) {
  const tokenize = (s) => new Set(
    s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 2)
  );
  const target = tokenize(category);
  let best = candidates[0];
  let bestScore = -1;
  for (const c of candidates) {
    const cand = tokenize(c.classification);
    let overlap = 0;
    for (const t of target) if (cand.has(t)) overlap++;
    if (overlap > bestScore) {
      bestScore = overlap;
      best = c;
    }
  }
  return best;
}
async function repoLastSync() {
  if (hasSupabase()) {
    const { data } = await getSupabase().from("run_log").select("run_at").eq("status", "ok").order("run_at", { ascending: false }).limit(1).maybeSingle();
    return data?.run_at ?? null;
  }
  return null;
}
export {
  repoDaily as a,
  repoMonthly as b,
  repoHistoricForForm as c,
  repoForms as d,
  repoCases as e,
  repoLastSync as f,
  repoCase as r
};
