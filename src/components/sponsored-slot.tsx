/**
 * Non-intrusive in-content sponsorship card. Currently fills with the Litwin
 * Law free-consult CTA. Marked "Sponsored" so it's clearly an ad, not editorial.
 * Reserves fixed height to prevent CLS.
 */

const HREF =
  "https://litwinlaw.com/?utm_source=visa-lead-times&utm_medium=referral&utm_campaign=free_consult";

function withContext(ctx: string): string {
  return `${HREF}&utm_content=${encodeURIComponent(ctx)}`;
}

export function SponsoredSlot({
  variant = "inline",
}: {
  variant?: "inline" | "sidebar";
}) {
  if (variant === "sidebar") {
    return (
      <a
        href={withContext("sponsored-slot:sidebar")}
        target="_blank"
        rel="noopener sponsored"
        className="block border rule bg-card p-5 group hover:border-primary transition-colors"
        aria-label="Sponsored: Litwin Law free consultation"
        style={{ minHeight: 220 }}
      >
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Sponsored
        </div>
        <p className="display text-xl leading-snug text-primary">
          Talk to an immigration attorney about your case.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Free 15-minute case review with Litwin Law.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline">
          Request a consultation →
        </span>
      </a>
    );
  }
  return (
    <a
      href={withContext("sponsored-slot:inline")}
      target="_blank"
      rel="noopener sponsored"
      aria-label="Sponsored: Litwin Law free consultation"
      className="border-y rule my-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-card transition-colors px-2"
    >
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Sponsored
        </div>
        <p className="display text-xl text-primary mt-1">
          Wait time longer than expected? An attorney may be able to help.
        </p>
      </div>
      <span className="shrink-0 inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium rounded-sm group-hover:bg-primary/90">
        Free case review
      </span>
    </a>
  );
}
