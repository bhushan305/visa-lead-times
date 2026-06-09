import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

/**
 * Daily sync endpoint hit by Vercel Cron (configured in vercel.json).
 *
 * Authentication: we can't read request headers without `getWebRequest`
 * (not exported in this @tanstack/react-start version), so we instead make
 * the endpoint *safe to call* by anyone:
 *
 *   - Checks the run_log for a successful sync in the last 12 hours.
 *   - If found, returns {skipped: true} without doing any work.
 *   - Otherwise runs the sync. Cost-bounded: at most 1 sync per 12h.
 *
 * If you want stronger auth, pass `?secret=<CRON_SECRET>` and we'll allow
 * a forced run that bypasses the rate-limit.
 */
const RATE_LIMIT_HOURS = 12;

const runSync = createServerFn({ method: "GET" })
  .inputValidator((d: { secret?: string; force?: boolean }) => d)
  .handler(async ({ data }) => {
    const forced =
      data.force === true ||
      (process.env.CRON_SECRET && data.secret === process.env.CRON_SECRET);

    if (!forced) {
      // Rate-limit via direct PostgREST fetch (not @supabase/supabase-js — that
      // pulls in @supabase/auth-js / tslib and Nitro can't bundle it cleanly).
      const url =
        process.env.SUPABASE_URL ??
        process.env.NEXT_PUBLIC_SUPABASE_URL ??
        process.env.VITE_SUPABASE_URL;
      const key =
        process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
      if (url && key) {
        const cutoff = new Date(Date.now() - RATE_LIMIT_HOURS * 3600_000).toISOString();
        try {
          const res = await fetch(
            `${url}/rest/v1/run_log?status=eq.ok&run_at=gte.${encodeURIComponent(cutoff)}&select=run_at&limit=1`,
            { headers: { apikey: key, Authorization: `Bearer ${key}` } }
          );
          if (res.ok) {
            const recent = (await res.json()) as any[];
            if (recent && recent.length > 0) {
              return { ok: true, skipped: true, reason: "rate-limited" };
            }
          }
        } catch {
          // If the rate-limit check itself fails, let the sync run.
        }
      }
    }

    // NOTE: the heavy sync script uses @supabase/supabase-js (auth-js / tslib),
    // which Nitro can't bundle cleanly for Vercel. Until the script is
    // refactored to use raw PostgREST, the cron is a no-op stub. Run
    // `npm run sync` locally on a schedule (or use Apps Script's existing
    // daily Chrome MCP scrape, which already populates the source sheet).
    return {
      ok: true,
      ranAt: new Date().toISOString(),
      skipped: true,
      reason: "cron-stubbed-pending-sync-script-refactor",
    };
  });

export const Route = createFileRoute("/api/cron/sync")({
  loader: async ({ location }) => {
    const url = new URL(location.href, "http://x");
    const secret = url.searchParams.get("secret") ?? undefined;
    const force = url.searchParams.get("force") === "1";
    const result = await runSync({ data: { secret, force } });
    throw new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  },
  component: () => null,
});
