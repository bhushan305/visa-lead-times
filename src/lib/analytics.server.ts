/**
 * Server-side analytics writer.
 *
 * Identity: visitors generate their own UUID client-side and pass it in the
 * event payload (`user_id`). This avoids the build-time dependency on
 * `getWebRequest` (which isn't exported by every version of @tanstack/react-start)
 * and is also more privacy-friendly — no IP processing anywhere on the server.
 *
 * Writes use the service-role Supabase client so they bypass RLS (the
 * page_views / click_events tables are read-locked).
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _writer: SupabaseClient | null = null;
function getWriter(): SupabaseClient | null {
  if (_writer) return _writer;
  const url =
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.VITE_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  _writer = createClient(url, key, { auth: { persistSession: false } });
  return _writer;
}

export type PageViewPayload = {
  user_id: string;
  page_path: string;
  referrer?: string | null;
  session_id?: string | null;
  load_ms?: number | null;
  user_agent?: string | null;
};

export type ClickPayload = {
  user_id: string;
  session_id?: string | null;
  page_path: string;
  element_type: string;
  element_label?: string | null;
  element_id?: string | null;
  element_class?: string | null;
  hierarchy?: string | null;
  href?: string | null;
  target_kind?: string | null;
  data_attrs?: Record<string, string> | null;
};

const MAX_LABEL = 120;
const MAX_HIERARCHY = 240;
const clamp = (s: string | null | undefined, n: number) =>
  s == null ? null : s.length > n ? s.slice(0, n) : s;

export async function recordPageView(p: PageViewPayload) {
  const sb = getWriter();
  if (!sb) return { ok: false, reason: "no-supabase" as const };
  if (!p.user_id) return { ok: false, reason: "no-user-id" as const };
  const { error } = await sb.from("page_views").insert({
    user_id: clamp(p.user_id, 64),
    session_id: clamp(p.session_id ?? null, 64),
    page_path: clamp(p.page_path, 512),
    referrer: clamp(p.referrer ?? null, 1024),
    user_agent: clamp(p.user_agent ?? null, 512),
    load_ms: p.load_ms ?? null,
  });
  return error ? { ok: false, reason: error.message } : { ok: true };
}

export async function recordClick(p: ClickPayload) {
  const sb = getWriter();
  if (!sb) return { ok: false, reason: "no-supabase" as const };
  if (!p.user_id) return { ok: false, reason: "no-user-id" as const };
  const { error } = await sb.from("click_events").insert({
    user_id: clamp(p.user_id, 64),
    session_id: clamp(p.session_id ?? null, 64),
    page_path: clamp(p.page_path, 512),
    element_type: p.element_type,
    element_label: clamp(p.element_label, MAX_LABEL),
    element_id: clamp(p.element_id, 120),
    element_class: clamp(p.element_class, 240),
    hierarchy: clamp(p.hierarchy, MAX_HIERARCHY),
    href: clamp(p.href, 1024),
    target_kind: p.target_kind ?? null,
    data_attrs: p.data_attrs ?? null,
  });
  return error ? { ok: false, reason: error.message } : { ok: true };
}
