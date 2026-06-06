/**
 * Non-intrusive in-content sponsorship card. Renders an editorial-style
 * placeholder marked clearly as "Sponsored" so future ad fills feel native
 * rather than disruptive. Reserve fixed height to prevent CLS.
 */
export function SponsoredSlot({
  variant = "inline",
}: {
  variant?: "inline" | "sidebar";
}) {
  if (variant === "sidebar") {
    return (
      <aside
        className="border rule bg-card p-5"
        aria-label="Sponsored content"
        style={{ minHeight: 280 }}
      >
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Sponsored
        </div>
        <p className="display text-xl leading-snug text-primary">
          Talk to an immigration attorney about your case.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Free 15-minute case review. Get a clear picture of expected timelines and
          options for your specific situation.
        </p>
        <a
          href="#consult"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          Request a consultation →
        </a>
      </aside>
    );
  }
  return (
    <div
      className="border-y rule my-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      aria-label="Sponsored content"
    >
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Sponsored
        </div>
        <p className="display text-xl text-primary mt-1">
          Wait time longer than expected? An attorney may be able to help.
        </p>
      </div>
      <a
        href="#consult"
        className="shrink-0 inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-primary/90"
      >
        Free case review
      </a>
    </div>
  );
}
