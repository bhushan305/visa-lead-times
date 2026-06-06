/**
 * Single repository facade for all data reads on the server.
 * - Prefers Supabase (fast, indexed, cacheable on edge)
 * - Falls back to the live Apps Script API when Supabase is not configured
 * - Reads historic-pt yearly averages from Supabase (seeded once)
 *
 * Callers should never know which backend served the data.
 */
import { getSupabase, hasSupabase } from "../supabase.server";
import { liveForms, liveLatest, liveRaw, type LiveRow } from "./live-api.server";

export type FormDTO = { code: string; label: string; slug: string };
export type CaseDTO = {
  slug: string;
  form_code: string;
  name: string;
  category: string;
  office: string;
  current_display: string | null;
  current_lo: number | null;
  current_hi: number | null;
  inquiry_date: string | null;
  last_change_date: string | null;
  as_of: string | null;
};
export type DailyDTO = { d: string; lo: number; hi: number };
export type MonthlyDTO = { month: string; avg_lo: number; avg_hi: number };
export type HistoricYearDTO = {
  form_code: string;
  classification: string;
  fiscal_year: number;
  avg_months: number;
  is_ytd: boolean;
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 200);
}
function parseRange(display: string | undefined): [number | null, number | null] {
  if (!display) return [null, null];
  const nums = (display.match(/[\d.]+/g) ?? []).map(Number).filter((n) => !isNaN(n));
  if (!nums.length) return [null, null];
  if (nums.length === 1) return [nums[0], nums[0]];
  return [nums[0], nums[1]];
}
function parseDate(raw?: string): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}
function extractFormCode(name: string): string {
  const m = name.match(/^([A-Z]-?\d+[A-Z0-9]*)/);
  return m ? m[1] : "UNKNOWN";
}

/* ---------- forms ---------- */
export async function repoForms(): Promise<FormDTO[]> {
  if (hasSupabase()) {
    const { data, error } = await getSupabase()!
      .from("forms")
      .select("code,label,slug")
      .order("code");
    if (!error && data?.length) return data as FormDTO[];
  }
  const { forms } = await liveForms();
  return forms.map((f) => ({ ...f, slug: slugify(f.code) }));
}

/* ---------- cases (all or filtered) ---------- */
// Process-local cache for the fully-hydrated CaseDTO list so a request that
// pulls "all cases" and then asks for "cases for form X" doesn't fire two API
// calls. Bounded to one snapshot per process; the underlying live-api memo is
// the upstream eviction policy.
let _casesAllCache: { at: number; data: CaseDTO[] } | null = null;
const CASES_TTL_MS = 60 * 60 * 1000;

export async function repoCases(form?: string): Promise<CaseDTO[]> {
  if (hasSupabase()) {
    let q = getSupabase()!.from("cases").select("*").order("name");
    if (form) q = q.eq("form_code", form);
    const { data } = await q;
    if (data?.length) {
      return data.map((r: any) => ({
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
        as_of: r.as_of,
      }));
    }
  }
  // Live-API path: pull once, slice locally.
  if (!_casesAllCache || Date.now() - _casesAllCache.at > CASES_TTL_MS) {
    const { rows } = await liveLatest(); // no form filter — single fetch covers everything
    _casesAllCache = { at: Date.now(), data: rows.map(rowToCase) };
  }
  return form ? _casesAllCache.data.filter((c) => c.form_code === form) : _casesAllCache.data;
}

function rowToCase(r: LiveRow): CaseDTO {
  const [lo, hi] = parseRange(r.processing_time_display);
  return {
    slug: slugify(r.logical_case_name),
    form_code: extractFormCode(r.logical_case_name),
    name: r.logical_case_name,
    category: r.category_label_selected,
    office: r.office_label_selected,
    current_display: r.processing_time_display ?? null,
    current_lo: lo,
    current_hi: hi,
    inquiry_date: parseDate(r.case_inquiry_date_display),
    last_change_date: parseDate(r.last_change_date),
    as_of: parseDate(r.run_date),
  };
}

/* ---------- case detail + series ---------- */
export async function repoCase(slug: string): Promise<CaseDTO | null> {
  if (hasSupabase()) {
    const { data } = await getSupabase()!.from("cases").select("*").eq("slug", slug).maybeSingle();
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
        as_of: data.as_of,
      };
    }
  }
  // Fallback: find in live latest (less efficient, but works for cold start)
  const all = await repoCases();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function repoDaily(caseSlug: string): Promise<DailyDTO[]> {
  if (hasSupabase()) {
    const { data } = await getSupabase()!
      .from("daily_snapshots")
      .select("run_date,lo_months,hi_months")
      .eq("case_slug", caseSlug)
      .not("lo_months", "is", null)
      .order("run_date");
    if (data?.length) {
      return data.map((r: any) => ({ d: r.run_date, lo: r.lo_months, hi: r.hi_months }));
    }
  }
  // Fallback: pull from live raw, filtered to this case (best-effort)
  const c = await repoCase(caseSlug);
  if (!c) return [];
  const raw = await liveRaw(c.form_code, 60);
  return raw.rows
    .filter((r) => slugify(r.logical_case_name) === caseSlug)
    .map((r) => {
      const [lo, hi] = parseRange(r.processing_time_display);
      const d = parseDate(r.run_date);
      if (!d || lo == null || hi == null) return null;
      return { d, lo, hi };
    })
    .filter(Boolean) as DailyDTO[];
}

export async function repoMonthly(caseSlug: string): Promise<MonthlyDTO[]> {
  if (hasSupabase()) {
    const { data } = await getSupabase()!
      .from("monthly_aggregates")
      .select("month,avg_lo,avg_hi")
      .eq("case_slug", caseSlug)
      .order("month");
    if (data?.length) return data as MonthlyDTO[];
  }
  return [];
}

/**
 * Historic FY medians for a form. When a category is provided, we pick the
 * classification that best matches it so a user on an "Employment-based AOS"
 * case sees that classification's history rather than a generic average.
 */
export async function repoHistoricForForm(
  form_code: string,
  category?: string
): Promise<HistoricYearDTO[]> {
  if (hasSupabase()) {
    const { data } = await getSupabase()!
      .from("historic_pt")
      .select("*")
      .eq("form_code", form_code)
      .order("fiscal_year");
    if (data?.length) return data as HistoricYearDTO[];
  }
  // JSON fallback (bundled seed). New compact format: each entry has a `years`
  // map keyed by FY. We pick the best classification per the case category,
  // then expand into one HistoricYearDTO per year.
  try {
    const mod: any = await import("../../../data/historic-pt-seed.json");
    const all: any[] = (mod.default ?? mod).filter(
      (r: any) => r && r.form_code === form_code && r.years
    );
    if (!all.length) return [];
    const chosen = category ? pickBestClassification(category, all) : all[0];
    const ytdYear = chosen.ytd_year as number | undefined;
    return Object.entries(chosen.years)
      .map(([yStr, v]) => {
        const fy = Number(yStr);
        if (!Number.isFinite(fy) || v == null) return null;
        return {
          form_code,
          classification: chosen.classification,
          fiscal_year: fy,
          avg_months: Number(v),
          is_ytd: ytdYear === fy,
        };
      })
      .filter(Boolean) as HistoricYearDTO[];
  } catch {
    return [];
  }
}

/** Word-overlap scorer to map a user's case category to a USCIS classification. */
function pickBestClassification(category: string, candidates: any[]): any {
  const tokenize = (s: string) =>
    new Set(
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

/* ---------- last sync ---------- */
export async function repoLastSync(): Promise<string | null> {
  if (hasSupabase()) {
    const { data } = await getSupabase()!
      .from("run_log")
      .select("run_at")
      .eq("status", "ok")
      .order("run_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    return (data as any)?.run_at ?? null;
  }
  return null;
}
