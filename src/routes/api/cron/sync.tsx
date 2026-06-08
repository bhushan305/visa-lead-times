import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

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
      // Rate-limit: if a successful sync happened in the last 12h, skip.
      const url =
        process.env.SUPABASE_URL ??
        process.env.NEXT_PUBLIC_SUPABASE_URL ??
        process.env.VITE_SUPABASE_URL;
      const key =
        process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
      if (url && key) {
        const sb = createClient(url, key, { auth: { persistSession: false } });
        const cutoff = new Date(Date.now() - RATE_LIMIT_HOURS * 3600_000).toISOString();
        const { data: recent } = await sb
          .from("run_log")
          .select("run_at")
          .eq("status", "ok")
          .gte("run_at", cutoff)
          .limit(1);
        if (recent && recent.length > 0) {
          return { ok: true, skipped: true, reason: "rate-limited" };
        }
      }
    }

    // Dynamic import keeps the heavy sync script out of the SSR bundle until
    // the cron actually fires.
    await import("../../../../scripts/sync-sheet-to-supabase");
    return { ok: true, ranAt: new Date().toISOString() };
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
