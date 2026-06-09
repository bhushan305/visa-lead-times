import { c as createServerRpc } from "./createServerRpc-BEnvNtoQ.mjs";
import { c as createServerFn } from "./server-BQ76axSV.mjs";
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
const RATE_LIMIT_HOURS = 12;
const runSync_createServerFn_handler = createServerRpc({
  id: "58e932baa02997ed77fdd89d9a222a0567b606122210416bc4e65267ce5d75fe",
  name: "runSync",
  filename: "src/routes/api/cron/sync.tsx"
}, (opts) => runSync.__executeServer(opts));
const runSync = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(runSync_createServerFn_handler, async ({
  data
}) => {
  const forced = data.force === true || process.env.CRON_SECRET && data.secret === process.env.CRON_SECRET;
  if (!forced) {
    const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
    if (url && key) {
      const cutoff = new Date(Date.now() - RATE_LIMIT_HOURS * 36e5).toISOString();
      try {
        const res = await fetch(`${url}/rest/v1/run_log?status=eq.ok&run_at=gte.${encodeURIComponent(cutoff)}&select=run_at&limit=1`, {
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`
          }
        });
        if (res.ok) {
          const recent = await res.json();
          if (recent && recent.length > 0) {
            return {
              ok: true,
              skipped: true,
              reason: "rate-limited"
            };
          }
        }
      } catch {
      }
    }
  }
  return {
    ok: true,
    ranAt: (/* @__PURE__ */ new Date()).toISOString(),
    skipped: true,
    reason: "cron-stubbed-pending-sync-script-refactor"
  };
});
export {
  runSync_createServerFn_handler
};
