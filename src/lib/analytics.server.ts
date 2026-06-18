/**
 * Server-side analytics writer.
 *
 * Identity: visitors generate their own UUID client-side and pass it in the
 * event payload (`user_id`). This avoids the build-time dependency on
 * `getWebRequest` (which isn't exported by every version of @tanstack/react-start)
 * and is also more privacy-friendly — no IP processing anywhere on the server.
 *
 * Writes go via raw PostgREST fetch (not @supabase/supabase-js) — see
 * supabase.server.ts for the rationale. Service-role key bypasses RLS so the
 * read-locked page_views / click_events tables accept inserts.
 */

function readServerCreds(): { url: string; key: string } | null {
  const url =
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.VITE_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return { url, key };
}

async function pgrestInsert(
  table: string,
  row: any
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const creds = readServerCreds();
  if (!creds) return { ok: false, reason: "no-supabase" };
  try {
    const res = await fetch(`${creds.url}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: creds.key,
        Authorization: `Bearer ${creds.key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify([row]),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, reason: `${res.status} ${text.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e: any) {
    return { ok: false, reason: e?.message ?? String(e) };
  }
}

export type PageViewPayload = {
  user_id: string;
  host?: string | null;
  page_path: string;
  referrer?: string | null;
  session_id?: string | null;
  load_ms?: number | null;
  user_agent?: string | null;
};

export type ClickPayload = {
  user_id: string;
  host?: string | null;
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
  if (!p.user_id) return { ok: false, reason: "no-user-id" as const };
  const result = await pgrestInsert("page_views", {
    user_id: clamp(p.user_id, 64),
    session_id: clamp(p.session_id ?? null, 64),
    host: clamp(p.host ?? null, 120),
    page_path: clamp(p.page_path, 512),
    referrer: clamp(p.referrer ?? null, 1024),
    user_agent: clamp(p.user_agent ?? null, 512),
    load_ms: p.load_ms ?? null,
  });
  return result;
}

export async function recordClick(p: ClickPayload) {
  if (!p.user_id) return { ok: false, reason: "no-user-id" as const };
  return pgrestInsert("click_events", {
    user_id: clamp(p.user_id, 64),
    session_id: clamp(p.session_id ?? null, 64),
    host: clamp(p.host ?? null, 120),
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
}

export type SearchPayload = {
  user_id: string;
  session_id?: string | null;
  host?: string | null;
  page_path: string;
  query: string;
  normalized_query?: string | null;
  matched_alias?: string | null;
  results_count?: number | null;
  user_agent?: string | null;
};

export async function recordSearch(p: SearchPayload) {
  if (!p.user_id) return { ok: false, reason: "no-user-id" as const };
  const q = String(p.query ?? "").trim();
  if (q.length < 1 || q.length > 200) {
    return { ok: false, reason: "invalid-query" as const };
  }
  return pgrestInsert("search_queries", {
    user_id: clamp(p.user_id, 64),
    session_id: clamp(p.session_id ?? null, 64),
    host: clamp(p.host ?? null, 120),
    page_path: clamp(p.page_path, 512),
    query: q,
    normalized_query: clamp(p.normalized_query ?? null, 120),
    matched_alias: clamp(p.matched_alias ?? null, 200),
    results_count: p.results_count ?? null,
    user_agent: clamp(p.user_agent ?? null, 512),
  });
}
