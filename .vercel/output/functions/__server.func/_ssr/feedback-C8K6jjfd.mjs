import { c as createServerRpc } from "./createServerRpc-DDuTYe-T.mjs";
import { c as createServerFn } from "./server-CuwrsFOk.mjs";
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
const submitFeedback_createServerFn_handler = createServerRpc({
  id: "25a4e34d5c9aadbbc31fee205219011bbacd45bfa7d839be08d3375d38c7388f",
  name: "submitFeedback",
  filename: "src/routes/api/feedback.tsx"
}, (opts) => submitFeedback.__executeServer(opts));
const submitFeedback = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(submitFeedback_createServerFn_handler, async ({
  data
}) => {
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  if (!email.includes("@") || email.length < 3 || email.length > 320) {
    return {
      ok: false,
      reason: "invalid-email"
    };
  }
  if (message.length < 1 || message.length > 4e3) {
    return {
      ok: false,
      reason: "invalid-message"
    };
  }
  const name = data.user_name?.trim().slice(0, 120) || null;
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return {
    ok: false,
    reason: "no-supabase"
  };
  try {
    const res = await fetch(`${url}/rest/v1/feedback`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify([{
        user_name: name,
        email,
        message,
        page_path: data.page_path ?? null,
        case_slug: data.case_slug ?? null,
        user_agent: data.user_agent?.slice(0, 512) ?? null,
        user_id: data.user_id ?? null
      }])
    });
    if (!res.ok) {
      const text = await res.text();
      return {
        ok: false,
        reason: `db-error: ${text.slice(0, 200)}`
      };
    }
    return {
      ok: true
    };
  } catch (e) {
    return {
      ok: false,
      reason: e?.message ?? String(e)
    };
  }
});
export {
  submitFeedback_createServerFn_handler
};
