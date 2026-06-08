/**
 * AnalyticsProvider — drop into the root layout to enable:
 *   - Pageview tracking on every route change
 *   - Global click tracking (anchors, buttons, role=button)
 *   - Batched flush via TanStack server fn (typed, no hardcoded URLs)
 */
import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  installClickTracking,
  setSender,
  trackPageView,
} from "@/lib/analytics-tracker";
import { trackBatch } from "@/routes/api/track";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const send = useServerFn(trackBatch);

  // 1) Hand the typed sender to the buffered client so flushes use the
  //    framework's RPC URL (immune to TanStack version changes).
  useEffect(() => {
    setSender((events) => send({ data: { events } }));
  }, [send]);

  // 2) Install the global click listener once.
  useEffect(() => {
    installClickTracking(() => router.state.location.pathname);
  }, [router]);

  // 3) Track every route change as a pageview.
  useEffect(() => {
    // Fire once for the initial page.
    trackPageView(router.state.location.pathname);
    const unsub = router.subscribe("onResolved", (evt) => {
      const path = evt.toLocation?.pathname ?? router.state.location.pathname;
      trackPageView(path);
    });
    return () => unsub();
  }, [router]);

  return <>{children}</>;
}
