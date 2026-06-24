import { useEffect, useRef } from "react";

/**
 * Reusable ad slot. Two modes:
 *
 *   - LIVE (when an AdSense slot ID is provided): renders the actual
 *     `<ins class="adsbygoogle">` tag and pushes to the adsbygoogle queue
 *     once the slot is near the viewport (IntersectionObserver lazy-load).
 *     This keeps the SDK from blocking initial render or hurting CWV.
 *
 *   - PLACEHOLDER (no slot ID — current state, while AdSense is pending):
 *     renders a designed "Ad placement" panel that reserves the slot's
 *     dimensions exactly so there's zero layout shift when ads go live.
 *
 * Reserving exact height up-front is critical for Core Web Vitals — once
 * a Google ad fills the slot, the layout doesn't jump.
 */

const ADSENSE_CLIENT = "ca-pub-2935901629293366";

type Format = "in-content" | "sidebar" | "leaderboard";

type Props = {
  /** Stable identifier used in analytics and as React key. */
  id: string;
  /** Visual format — controls reserved dimensions and label. */
  format: Format;
  /** AdSense slot ID from your AdSense dashboard. Omit while in placeholder mode. */
  slot?: string;
  /** Optional context string for analytics (e.g. "case-page"). */
  context?: string;
};

const FORMAT_SPEC: Record<
  Format,
  { minHeight: number; maxWidth: number; label: string; hint: string }
> = {
  "in-content": {
    minHeight: 280,
    maxWidth: 728,
    label: "Sponsored",
    hint: "300×250 or 336×280 in-content rectangle",
  },
  sidebar: {
    minHeight: 600,
    maxWidth: 300,
    label: "Sponsored",
    hint: "300×600 half-page or 300×250 rectangle",
  },
  leaderboard: {
    minHeight: 90,
    maxWidth: 728,
    label: "Sponsored",
    hint: "728×90 leaderboard (desktop) / 320×50 (mobile)",
  },
};

export function AdSlot({ id, format, slot, context }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const pushed = useRef(false);
  const spec = FORMAT_SPEC[format];

  // Lazy-load: only push to adsbygoogle when slot enters near-viewport.
  useEffect(() => {
    if (!slot) return; // placeholder mode — nothing to push
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || pushed.current) continue;
          try {
            // @ts-expect-error — adsbygoogle is on window once the SDK loads
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushed.current = true;
          } catch {
            // Swallow — Google's SDK has its own error reporting
          }
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [slot]);

  // LIVE mode — real AdSense slot
  if (slot) {
    return (
      <div
        ref={ref}
        data-ad-id={id}
        data-ad-context={context}
        style={{
          minHeight: spec.minHeight,
          maxWidth: spec.maxWidth,
          margin: "1.5rem auto",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
          {spec.label}
        </p>
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: spec.minHeight - 20 }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // PLACEHOLDER mode — only visible on localhost or when explicitly enabled
  // via a query param (?showAds=1). Real visitors see nothing rather than a
  // "coming soon" panel that looks broken. Auto-ads (enabled in the AdSense
  // dashboard) will fill the page automatically once review completes; manual
  // slot IDs go in `slot` prop later for hand-picked positions.
  const isDevView =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.search.includes("showAds=1"));
  if (!isDevView) return null;

  return (
    <div
      data-ad-id={id}
      data-ad-context={context}
      data-ad-placeholder="true"
      className="my-6 mx-auto border rule bg-card flex flex-col items-center justify-center text-center px-4"
      style={{
        minHeight: spec.minHeight,
        maxWidth: spec.maxWidth,
        borderStyle: "dashed",
        opacity: 0.7,
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {spec.label}
      </p>
      <p className="display text-base text-primary mt-2">Ad placement (dev)</p>
      <p className="text-xs text-muted-foreground mt-1 max-w-xs">{spec.hint}</p>
    </div>
  );
}
