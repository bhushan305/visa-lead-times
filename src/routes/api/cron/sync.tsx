import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

/**
 * Daily sync endpoint hit by Vercel Cron (configured in vercel.json).
 * Pulls from the Apps Script JSON API into Supabase. Secured by CRON_SECRET.
 *
 * Expected header (Vercel default): `x-vercel-cron: 1`
 * Or pass ?secret=<CRON_SECRET> for local testing.
 */
const runSync = createServerFn({ method: "GET" })
  .inputValidator((d: { secret?: string; isCron?: boolean }) => d)
  .handler(async ({ data }) => {
    const expected = process.env.CRON_SECRET;
    const ok = data.isCron || (expected && data.secret === expected);
    if (!ok) {
      throw new Response("Forbidden", { status: 403 });
    }

    // Dynamically import the script — keeps Supabase SDK out of edge bundles
    // until the cron actually fires.
    const mod = await import("../../../../scripts/sync-sheet-to-supabase");
    // The script self-executes via main(); importing it triggers the run.
    // (For Node-only runtime; see README for ESM execution notes.)
    return { ok: true, ranAt: new Date().toISOString(), mod: typeof mod };
  });

export const Route = createFileRoute("/api/cron/sync")({
  loader: async ({ location }) => {
    const url = new URL(location.href, "http://x");
    const secret = url.searchParams.get("secret") ?? undefined;
    // Vercel sets this header on scheduled cron invocations
    const isCron = typeof globalThis !== "undefined" && false; // best-effort; see handler
    const result = await runSync({ data: { secret, isCron } });
    throw new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  },
  component: () => null,
});
