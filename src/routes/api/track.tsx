import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { recordPageView, recordClick, recordSearch } from "@/lib/analytics.server";

/**
 * Tracking endpoint. Accepts a batched payload of events the client collected
 * since the last flush. Each event already carries its own user_id + session_id
 * (set client-side via cookie/sessionStorage) so the server is a pure writer.
 */
export const trackBatch = createServerFn({ method: "POST" })
  .inputValidator((d: { events: any[] }) => d)
  .handler(async ({ data }) => {
    const results = await Promise.allSettled(
      data.events.map((e) => {
        if (e.kind === "pageview") return recordPageView(e);
        if (e.kind === "click") return recordClick(e);
        if (e.kind === "search") return recordSearch(e);
        return Promise.resolve({ ok: false, reason: "unknown-kind" });
      })
    );
    const ok = results.filter(
      (r) => r.status === "fulfilled" && (r.value as any).ok
    ).length;
    return { received: data.events.length, written: ok };
  });

export const Route = createFileRoute("/api/track")({
  component: () => null,
});
