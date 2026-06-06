import { createFileRoute, Link, notFound, useRouter, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { SponsoredSlot } from "@/components/sponsored-slot";
import { ProcessingTimeChart } from "@/components/processing-time-chart";
import { buildSeries, formatMonths, trendDelta } from "@/lib/processing-times";
import { getCasePageBundle } from "@/lib/case.functions";
import { rememberLastCase } from "@/lib/preferences";

export const Route = createFileRoute("/case/$slug")({
  // Single round-trip bundle so cold loads aren't bottlenecked by serial
  // Apps Script API calls. See lib/case.functions.ts → getCasePageBundle.
  loader: async ({ params }) => {
    const bundle = await getCasePageBundle({ data: { slug: params.slug } });
    if (!bundle) throw notFound();
    return {
      detail: {
        summary: bundle.summary,
        daily: bundle.daily,
        monthly: bundle.monthly,
        historic: bundle.historic,
      },
      formMeta: bundle.formMeta,
      siblings: bundle.siblings,
    };
  },
  // Render a skeleton fast so the user sees something is loading instead of
  // a blank tab during the loader fetch.
  pendingMs: 50,
  pendingComponent: CasePageSkeleton,
  head: ({ loaderData, params }) => {
    const s = loaderData?.detail?.summary;
    if (!s) return { meta: [{ title: "Case not found" }] };
    const title = `${s.form_code} ${s.category} at ${s.office} — Processing Time | Visa Lead Times`;
    const desc = `Current USCIS processing time for ${s.form_code} (${s.category}) at ${s.office}: ${s.current_display ?? "see chart"}. Updated daily.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: `${s.form_code} · ${s.category}` },
        { property: "og:description", content: `${s.office} — ${s.current_display ?? "Tracking daily"}` },
        { rel: "canonical", href: `/case/${params.slug}` } as any,
      ],
    };
  },
  component: CasePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
      Case not found.{" "}
      <Link to="/" className="text-primary underline ml-2">Go home</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="p-10 text-sm">
        <p className="text-destructive">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-3 underline"
        >
          Try again
        </button>
      </div>
    );
  },
});

function CasePage() {
  const { detail, formMeta, siblings } = Route.useLoaderData();
  const summary = detail.summary;
  const series = buildSeries(detail);
  const trend = trendDelta(series);

  useEffect(() => {
    rememberLastCase(summary.slug);
  }, [summary.slug]);

  // JSON-LD for SEO: FAQ schema using the case-specific question users actually search.
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How long is the USCIS processing time for ${summary.form_code} (${summary.category}) at ${summary.office}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: summary.current_display
            ? `As of ${summary.as_of ?? "the most recent update"}, the published USCIS processing time is ${summary.current_display}. This represents the time it took to complete 80% of cases of this type at this office.`
            : `We're tracking this case type daily; check the chart for the latest USCIS-published range.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-6xl px-6 py-10 w-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link
            to="/form/$code"
            params={{ code: formMeta?.slug ?? summary.form_code.toLowerCase() }}
            className="hover:text-primary"
          >
            Form {summary.form_code}
          </Link>
          <span className="mx-2">/</span>
          <span>Case</span>
        </nav>

        <header className="border-b rule pb-8 mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Form {summary.form_code}
          </p>
          <h1 className="display text-4xl sm:text-5xl text-primary mt-2 max-w-4xl">
            {summary.category}
          </h1>

          <OfficeSwitcher
            currentSlug={summary.slug}
            currentOffice={summary.office}
            siblings={siblings.filter(
              (s: any) => s.category === summary.category
            )}
          />
        </header>

        <div className="grid lg:grid-cols-[1fr_300px] gap-10">
          <div>
            <div className="grid sm:grid-cols-3 gap-px bg-[var(--color-border)] border rule mb-8">
              <Stat label="Current published range" value={summary.current_display ?? "—"} accent />
              <Stat
                label="30-day change"
                value={
                  trend
                    ? `${trend.delta >= 0 ? "+" : ""}${formatMonths(Math.abs(trend.delta))}${trend.delta >= 0 ? " slower" : " faster"}`
                    : "—"
                }
                tone={trend ? (trend.delta > 0 ? "warn" : "good") : "neutral"}
              />
              <Stat
                label="Receipts as of"
                value={summary.inquiry_date ? formatDate(summary.inquiry_date) : "—"}
                sub="USCIS adjudication date"
              />
            </div>

            <ProcessingTimeChart series={series} />

            <SponsoredSlot />

            <section className="prose-sm max-w-none mt-10">
              <h2 className="display text-2xl text-primary border-b rule pb-3 mb-4">
                How to read this
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                USCIS publishes a range — for example,{" "}
                <span className="num text-foreground">{summary.current_display ?? "X–Y months"}</span> —
                that represents the time it took to complete 80% of cases of this type at this office. The
                case-inquiry date tells you the receipt date USCIS is currently processing; if your receipt
                is newer than that date, you generally cannot make a service request yet.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                The chart combines four views: USCIS-published <strong>fiscal-year averages</strong> from
                FY2015 forward, a <strong>YTD national average</strong> for the current FY, then{" "}
                <strong>monthly averages</strong> of our daily snapshots, and finally{" "}
                <strong>daily detail</strong> for the most recent 30 days. A flat line means the published
                range was unchanged in our snapshots, not that nothing is happening on individual cases.
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <SponsoredSlot variant="sidebar" />

            {formMeta && siblings.length > 0 && (
              <div className="border rule bg-card p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Other {summary.form_code} case types
                </p>
                <ul className="space-y-2">
                  {/* Show one row per distinct category (dedupe across offices) */}
                  {Array.from(
                    new Map(
                      siblings
                        .filter((s: any) => s.category !== summary.category)
                        .map((s: any) => [s.category, s])
                    ).values()
                  )
                    .slice(0, 6)
                    .map((c: any) => (
                      <li key={c.slug}>
                        <Link
                          to="/case/$slug"
                          params={{ slug: c.slug }}
                          className="text-sm text-primary hover:underline"
                        >
                          {c.category}
                        </Link>
                      </li>
                    ))}
                </ul>
                <Link
                  to="/form/$code"
                  params={{ code: formMeta.slug }}
                  className="block mt-4 text-xs text-accent hover:underline"
                >
                  See all {siblings.length + 1} →
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
  tone = "neutral",
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  tone?: "neutral" | "good" | "warn";
}) {
  const valueColor =
    tone === "good" ? "text-positive" : tone === "warn" ? "text-accent" : "text-primary";
  return (
    <div className="bg-card p-5">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className={`display text-2xl mt-2 num ${accent ? "text-primary" : valueColor}`}>{value}</div>
      {sub && <div className="text-[11px] text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}

/**
 * Skeleton shown while the loader is still fetching. Keeps the chrome stable
 * so users see structure instantly instead of a white tab.
 */
function CasePageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-6xl px-6 py-10 w-full">
        <div className="h-3 w-24 bg-muted rounded animate-pulse mb-4" />
        <div className="h-12 w-2/3 bg-muted rounded animate-pulse mb-3" />
        <div className="h-5 w-1/3 bg-muted rounded animate-pulse mb-10" />
        <div className="grid sm:grid-cols-3 gap-px bg-[var(--color-border)] border rule mb-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-card p-5">
              <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              <div className="h-7 w-28 bg-muted rounded animate-pulse mt-3" />
            </div>
          ))}
        </div>
        <div className="border rule bg-card p-6 h-[340px] animate-pulse" />
      </main>
      <SiteFooter />
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Quick office-switcher. Renders as the current office text with a select
 * underlay when more than one office exists for this (form, category).
 * Navigates without a full reload.
 */
function OfficeSwitcher({
  currentSlug,
  currentOffice,
  siblings,
}: {
  currentSlug: string;
  currentOffice: string;
  siblings: { slug: string; office: string; current_display?: string | null }[];
}) {
  const navigate = useNavigate();
  // Single-office case: just show the office name, no picker.
  if (siblings.length === 0) {
    return <p className="mt-3 text-lg text-muted-foreground">{currentOffice}</p>;
  }
  const options = [
    { slug: currentSlug, office: currentOffice },
    ...siblings.filter((s) => s.slug !== currentSlug),
  ];
  return (
    <div className="mt-4 flex items-center gap-3 flex-wrap">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Service center
      </span>
      <div className="relative">
        <select
          aria-label="Switch service center"
          value={currentSlug}
          onChange={(e) => navigate({ to: "/case/$slug", params: { slug: e.target.value } })}
          className="appearance-none bg-card border rule px-4 py-2 pr-9 text-base font-medium text-primary focus:outline-none focus:ring-2 focus:ring-ring/40 cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.office}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
          ▾
        </span>
      </div>
      <span className="text-xs text-muted-foreground">
        {options.length} office{options.length === 1 ? "" : "s"}
      </span>
    </div>
  );
}
