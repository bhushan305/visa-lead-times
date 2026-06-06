/**
 * Live Apps Script API fallback. The Apps Script web app exposes the
 * Google Sheet as JSON. Used when Supabase is not configured (local dev,
 * preview deploys, or before the first sync).
 */

const APPS_SCRIPT_URL =
  process.env.APPS_SCRIPT_URL ??
  "https://script.google.com/macros/s/AKfycbwF37kFPBEYOCS9t33Ai5gzoL_XkYBFfMsKzCt9SameFmPf30wOQkqbbqn53njCdrAZ/exec";

type SheetResp<T> = { rows: T[]; count: number; headers: string[] };

const memo = new Map<string, { at: number; data: any }>();
const TTL_MS = 60 * 60 * 1000; // 1 hour — data only changes daily

async function fetchTab<T>(qs: string): Promise<T> {
  const key = qs;
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data as T;
  const url = `${APPS_SCRIPT_URL}?${qs}`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Apps Script ${res.status}: ${qs}`);
  const data = (await res.json()) as T;
  memo.set(key, { at: Date.now(), data });
  return data;
}

export type LiveRow = {
  logical_case_name: string;
  run_date: string;
  form_label_selected: string;
  category_label_selected: string;
  office_label_selected: string;
  processing_time_display: string;
  case_inquiry_date_display?: string;
  last_change_date?: string;
  change_vs_prior?: string;
  data_status?: string;
  notes?: string;
};

export async function liveForms() {
  return fetchTab<{ forms: { code: string; label: string }[] }>("tab=forms");
}
export async function liveLatest(form?: string) {
  return fetchTab<SheetResp<LiveRow>>(`tab=latest${form ? `&form=${form}` : ""}`);
}
export async function liveRaw(form: string, days = 60) {
  return fetchTab<SheetResp<LiveRow>>(`tab=raw&form=${form}&days=${days}`);
}
