import { c as createServerRpc } from "./createServerRpc-Bq8_OHzE.mjs";
import { c as createServerFn } from "./server-DNzsfDsc.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
let _writer = null;
function getWriter() {
  if (_writer) return _writer;
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  _writer = createClient(url, key, { auth: { persistSession: false } });
  return _writer;
}
const MAX_LABEL = 120;
const MAX_HIERARCHY = 240;
const clamp = (s, n) => s == null ? null : s.length > n ? s.slice(0, n) : s;
async function recordPageView(p) {
  const sb = getWriter();
  if (!sb) return { ok: false, reason: "no-supabase" };
  if (!p.user_id) return { ok: false, reason: "no-user-id" };
  const { error } = await sb.from("page_views").insert({
    user_id: clamp(p.user_id, 64),
    session_id: clamp(p.session_id ?? null, 64),
    page_path: clamp(p.page_path, 512),
    referrer: clamp(p.referrer ?? null, 1024),
    user_agent: clamp(p.user_agent ?? null, 512),
    load_ms: p.load_ms ?? null
  });
  return error ? { ok: false, reason: error.message } : { ok: true };
}
async function recordClick(p) {
  const sb = getWriter();
  if (!sb) return { ok: false, reason: "no-supabase" };
  if (!p.user_id) return { ok: false, reason: "no-user-id" };
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
    data_attrs: p.data_attrs ?? null
  });
  return error ? { ok: false, reason: error.message } : { ok: true };
}
const trackBatch_createServerFn_handler = createServerRpc({
  id: "4d6296202bf5c35b0329991759d93a18a28e88d917e6a4e3a21b379a696a243c",
  name: "trackBatch",
  filename: "src/routes/api/track.tsx"
}, (opts) => trackBatch.__executeServer(opts));
const trackBatch = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(trackBatch_createServerFn_handler, async ({
  data
}) => {
  const results = await Promise.allSettled(data.events.map((e) => {
    if (e.kind === "pageview") return recordPageView(e);
    if (e.kind === "click") return recordClick(e);
    return Promise.resolve({
      ok: false,
      reason: "unknown-kind"
    });
  }));
  const ok = results.filter((r) => r.status === "fulfilled" && r.value.ok).length;
  return {
    received: data.events.length,
    written: ok
  };
});
export {
  trackBatch_createServerFn_handler
};
