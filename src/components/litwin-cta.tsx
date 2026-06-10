/**
 * Reusable CTA pointing to the Litwin Law free consult.
 *
 * Variants:
 *   - "sidebar"  → card with headline + button, fits the case-page right column
 *   - "inline"   → full-width banner, sits between content sections
 *   - "compact"  → single-line text-link with arrow, for the footer or header
 *   - "floating" → fixed bottom-right button on mobile/case pages
 */

const HREF = "https://litwinlaw.com/?utm_source=visa-lead-times&utm_medium=referral&utm_campaign=free_consult";

type Props = {
  variant: "sidebar" | "inline" | "compact" | "floating";
  context?: string; // e.g. "case-page" — appended to utm_content for attribution
};

function withContext(context?: string): string {
  if (!context) return HREF;
  return `${HREF}&utm_content=${encodeURIComponent(context)}`;
}

export function LitwinCTA({ variant, context }: Props) {
  const href = withContext(context);

  if (variant === "sidebar") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener sponsored"
        className="block border rule bg-card p-5 group hover:border-primary transition-colors"
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Sponsored · Immigration attorney
        </p>
        <p className="display text-base text-primary leading-snug">
          Case taking longer than expected?
        </p>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          Litwin Law offers a free consultation for delayed USCIS cases. Talk
          to an attorney about your options.
        </p>
        <span className="mt-3 inline-flex items-center text-xs font-medium text-primary group-hover:underline">
          Book free consult →
        </span>
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener sponsored"
        className="block my-6 border-l-4 border-accent bg-card px-5 py-4 group hover:border-primary transition-colors"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Sponsored
            </p>
            <p className="text-sm text-foreground mt-1">
              <strong>Stuck waiting on USCIS?</strong> Talk to an immigration
              attorney free for 15 minutes.
            </p>
          </div>
          <span className="shrink-0 text-xs font-medium text-primary group-hover:underline whitespace-nowrap">
            Free consult →
          </span>
        </div>
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener sponsored"
        className="text-xs text-muted-foreground hover:text-primary"
      >
        Need legal help? Free consult at Litwin Law →
      </a>
    );
  }

  // floating
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener sponsored"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 text-sm font-medium shadow-lg hover:bg-primary/90"
    >
      Free immigration consult
    </a>
  );
}
