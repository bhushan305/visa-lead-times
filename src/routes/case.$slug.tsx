import { createFileRoute, Link, notFound, useRouter, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ProcessingTimeChart } from "@/components/processing-time-chart";
import { LitwinCTA } from "@/components/litwin-cta";
import { FeedbackForm } from "@/components/feedback-form";
import { AdSlot } from "@/components/ad-slot";
import { CaseFAQ } from "@/components/case-faq";
import { getGuidesForForm } from "@/lib/guide-links";
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

    // Lead with the high-intent keywords ("USCIS processing time") that capture
    // search queries like "I-485 employment processing time".
    const title = `${s.form_code} ${s.category} Processing Time at ${s.office} | USCIS Tracker`;
    const asOf = s.as_of ?? new Date().toISOString().slice(0, 10);
    const desc = s.current_display
      ? `USCIS processing time for Form ${s.form_code} — ${s.category} at ${s.office}: ${s.current_display} as of ${asOf}. Daily-updated chart and historic fiscal-year averages.`
      : `Track USCIS processing time for Form ${s.form_code} — ${s.category} at ${s.office}. Daily-updated chart with historic averages back to FY2014.`;

    const siteUrl = process.env.SITE_URL ?? "https://visacasetimes.com";
    const canonical = `${siteUrl}/case/${params.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `${s.form_code} processing time, USCIS ${s.form_code}, ${s.category}, ${s.office}, immigration wait time` },
        { property: "og:title", content: `${s.form_code} ${s.category} — Processing Time` },
        { property: "og:description", content: desc },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "article" },
        { property: "article:modified_time", content: asOf },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${s.form_code} processing time` },
        { name: "twitter:description", content: desc },
        { rel: "canonical", href: canonical } as any,
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

  // ---- SEO + GEO structured data ----
  // GEO (generative engine optimization): LLMs cite pages that publish
  // explicit, quote-friendly Q&A pairs. We emit multiple questions covering
  // the variations real users (and AI search engines) actually ask.
  const asOfDate = summary.as_of ?? new Date().toISOString().slice(0, 10);
  const currentRange = summary.current_display ?? "currently tracking";
  const inquiryDateText = summary.inquiry_date
    ? new Date(summary.inquiry_date + "T00:00:00Z").toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      })
    : null;
  const tldr = summary.current_display
    ? `As of ${asOfDate}, USCIS reports a ${currentRange} processing time for Form ${summary.form_code} ${summary.category} cases handled by ${summary.office}. This range represents the time to complete 80% of these cases. ${inquiryDateText ? `If your filing receipt is dated before ${inquiryDateText}, you may submit a case inquiry to USCIS.` : ""}`
    : `We're collecting daily USCIS snapshots for Form ${summary.form_code} ${summary.category} at ${summary.office}. The chart below shows historic fiscal-year medians back to FY2014.`;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the current USCIS processing time for ${summary.form_code} (${summary.category}) at ${summary.office}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: tldr,
        },
      },
      {
        "@type": "Question",
        name: `How long does ${summary.form_code} take in 2026?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: summary.current_display
            ? `USCIS currently reports ${currentRange} for ${summary.form_code} ${summary.category} at ${summary.office} (as of ${asOfDate}). USCIS publishes this as the time to complete 80% of cases of this type.`
            : `USCIS has not published a current range for this category. Historic fiscal-year medians are available in the chart on this page.`,
        },
      },
      ...(inquiryDateText ? [{
        "@type": "Question",
        name: `Can I submit a case inquiry for my ${summary.form_code}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `USCIS accepts case inquiries when your receipt is dated before the displayed inquiry date. For ${summary.form_code} ${summary.category} at ${summary.office}, the current inquiry date is ${inquiryDateText}. If your filing receipt is older than that, you are eligible to submit an inquiry through your USCIS online account.`,
        },
      }] : []),
      {
        "@type": "Question",
        name: `Where does this processing time data come from?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `All processing-time figures on this page come directly from USCIS's official Processing Times tool at egov.uscis.gov/processing-times. We snapshot the published ranges every weekday and chart the trend. Historic fiscal-year medians come from USCIS's Historic Processing Times page. This site is independent and not affiliated with USCIS.`,
        },
      },
    ],
  };

  // Dataset schema — tells AI engines this page hosts time-series data.
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `USCIS Form ${summary.form_code} ${summary.category} processing time — ${summary.office}`,
    description: tldr,
    creator: { "@type": "Organization", name: "Visa Case Times" },
    isBasedOn: "https://egov.uscis.gov/processing-times",
    dateModified: asOfDate,
    temporalCoverage: "2014-10-01/..",
    variableMeasured: {
      "@type": "PropertyValue",
      name: "Processing time (months)",
      description: "USCIS-published 80th-percentile completion time range",
      unitText: "month",
    },
    keywords: [
      summary.form_code,
      summary.category,
      summary.office,
      "USCIS",
      "processing time",
      "immigration",
      "wait time",
    ].join(", "),
  };

  // BreadcrumbList schema for site hierarchy.
  const siteUrl = "https://visacasetimes.com";
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: `Form ${summary.form_code}`, item: `${siteUrl}/form/${formMeta?.slug ?? summary.form_code.toLowerCase()}` },
      { "@type": "ListItem", position: 3, name: summary.category, item: `${siteUrl}/case/${summary.slug}` },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-6xl px-6 py-5 w-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        <nav className="text-xs text-muted-foreground mb-3">
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

        <header className="border-b rule pb-4 mb-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Form {summary.form_code} processing time
          </p>
          <h1 className="display text-2xl sm:text-3xl text-primary mt-1 max-w-4xl leading-tight">
            {summary.form_code} {summary.category}
          </h1>

          <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 flex-wrap">
            {/* Office picker: only renders the dropdown when >1 office exists
                for this category. For "All Field Offices"-only categories
                (e.g. I-485 Employment-based) it just shows the office label. */}
            <OfficeSwitcher
              currentSlug={summary.slug}
              currentOffice={summary.office}
              siblings={siblings.filter(
                (s: any) => s.category === summary.category
              )}
            />
            {/* Category picker: jump to other categories within this form
                (I-485 Family-based, Asylum, etc.). Useful when the current
                category has no per-office breakdown to compare across. */}
            <CategorySwitcher
              currentCategory={summary.category}
              siblings={siblings}
            />
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div>
            <div className="grid sm:grid-cols-3 gap-px bg-[var(--color-border)] border rule mb-4">
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

            {/* TL;DR — written as a single, citable paragraph so AI search
                engines and Google snippets have a clean block to extract. */}
            <section
              className="mt-6 border-l-4 border-accent bg-card px-5 py-4"
              aria-label="Summary"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Summary · Updated {asOfDate}
              </p>
              <p className="text-sm text-foreground leading-relaxed">{tldr}</p>
            </section>

            {/* High-engagement ad slot — user has just consumed the chart + TLDR. */}
            <AdSlot id="case-inline" format="in-content" context={`case:${summary.form_code}`} />

            <section className="mt-10 space-y-6">
              <div>
                <h2 className="display text-2xl text-primary border-b rule pb-3 mb-3">
                  How long does {summary.form_code} {summary.category} take?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {summary.current_display ? (
                    <>
                      USCIS currently publishes a range of{" "}
                      <span className="num text-foreground">{summary.current_display}</span> for{" "}
                      Form {summary.form_code} {summary.category} cases handled by {summary.office}
                      {", as of "}
                      <time dateTime={asOfDate}>{asOfDate}</time>. This is the time to complete 80% of
                      cases of this type at this office — your case may resolve faster or slower than
                      the published range.
                    </>
                  ) : (
                    <>
                      USCIS has not published a current range for this category. The chart above
                      shows historic fiscal-year medians from USCIS's Historic Processing Times
                      page so you can see how long similar cases took in prior years.
                    </>
                  )}
                </p>
              </div>

              {inquiryDateText && (
                <div>
                  <h2 className="display text-2xl text-primary border-b rule pb-3 mb-3">
                    Can I submit a case inquiry?
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    USCIS accepts case inquiries when your receipt date is older than the published
                    inquiry date. For {summary.form_code} {summary.category} at {summary.office},
                    that date is currently{" "}
                    <span className="text-foreground font-medium">{inquiryDateText}</span>. If your
                    filing receipt is dated before that, you can submit a service request through
                    your USCIS online account.
                  </p>
                  {/* High-intent moment — user is reading about delayed cases. */}
                  <LitwinCTA variant="inline" context={`case:${summary.form_code}:inquiry-date`} />
                </div>
              )}

              <div>
                <h2 className="display text-2xl text-primary border-b rule pb-3 mb-3">
                  How to read the chart
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The chart combines four data sources, oldest to newest: USCIS-published{" "}
                  <strong>fiscal-year averages</strong> from FY2014 (including the current
                  partial year), drawn from USCIS's Historic Processing Times page;{" "}
                  <strong>weekly averages</strong> computed from our daily snapshots; and{" "}
                  <strong>daily snapshots</strong> for the most recent 30 days. A flat line means the
                  published range was unchanged in our snapshots, not that nothing is happening on
                  individual cases.
                </p>
              </div>

              <div>
                <h2 className="display text-2xl text-primary border-b rule pb-3 mb-3">
                  Source &amp; methodology
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All processing-time figures on this page come directly from USCIS's official{" "}
                  <a
                    className="text-primary underline"
                    href="https://egov.uscis.gov/processing-times"
                    target="_blank"
                    rel="noopener"
                  >
                    Processing Times tool
                  </a>
                  . We snapshot the published ranges every weekday and store the time series for trend
                  analysis. Historic fiscal-year medians come from USCIS's{" "}
                  <a
                    className="text-primary underline"
                    href="https://egov.uscis.gov/processing-times/historic-pt"
                    target="_blank"
                    rel="noopener"
                  >
                    Historic Processing Times
                  </a>{" "}
                  page. This site is independent and not affiliated with USCIS or any government
                  agency.
                </p>
              </div>
            </section>

            {/* Visa-specific FAQ — substantial editorial content per case page */}
            <CaseFAQ
              form_code={summary.form_code}
              category={summary.category}
              formCode={summary.form_code}
            />

            {/* Internal links to the most-relevant long-form guides for this form.
                Helps users dive deeper and gives Google strong topical-cluster signals. */}
            <CaseGuideLinks form_code={summary.form_code} />
          </div>

          <div className="space-y-6">
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

            <LitwinCTA variant="sidebar" context={`case:${summary.form_code}:sidebar`} />
            <AdSlot id="case-sidebar" format="sidebar" context={`case:${summary.form_code}`} />
          </div>
        </div>

        {/* Inline feedback at bottom — users who scrolled this far are engaged. */}
        <FeedbackForm
          variant="inline"
          caseSlug={summary.slug}
          title="Spot something off?"
          subtitle="Tell us — we read every note."
        />
      </main>
      <SiteFooter />
    </div>
  );
}

/**
 * "Helpful guides" callout at the bottom of every case page. Surfaces the
 * most-relevant long-form guides for this case's form (e.g., N-400 case →
 * naturalization guide + delayed-case guide + processing-times explainer).
 * Pure internal linking — drives both SEO and user research depth.
 */
function CaseGuideLinks({ form_code }: { form_code: string }) {
  const guides = getGuidesForForm(form_code);
  if (!guides.length) return null;
  return (
    <section className="mt-10" aria-labelledby="case-guides-heading">
      <h2
        id="case-guides-heading"
        className="display text-2xl text-primary border-b rule pb-3 mb-4"
      >
        Helpful guides
      </h2>
      <ul className="space-y-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <a
              href={`/guides/${g.slug}`}
              className="block border rule bg-card px-4 py-3 hover:border-primary transition-colors"
            >
              <span className="text-sm font-medium text-foreground">{g.title}</span>
              <span className="block text-xs text-muted-foreground mt-0.5">
                Read the guide →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
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
    <div className="bg-card px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className={`display text-xl mt-1 num ${accent ? "text-primary" : valueColor}`}>{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>}
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
  // Single-office case: still show the row with the label so it visually pairs
  // with the Category dropdown next to it.
  if (siblings.length === 0) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Service center
        </span>
        <span className="text-sm font-medium text-foreground">{currentOffice}</span>
      </div>
    );
  }
  // Alphabetical across all offices including the current one — the <select>
  // highlights the active row in place, so users find what they expect at the
  // expected position rather than seeing the current office pinned to the top
  // or bottom of the list.
  const options = [
    { slug: currentSlug, office: currentOffice },
    ...siblings.filter((s) => s.slug !== currentSlug),
  ].sort((a, b) => a.office.localeCompare(b.office));
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Service center
      </span>
      <div className="relative">
        <select
          aria-label="Switch service center"
          value={currentSlug}
          onChange={(e) => navigate({ to: "/case/$slug", params: { slug: e.target.value } })}
          className="appearance-none bg-card border rule px-3 py-1.5 pr-8 text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-ring/40 cursor-pointer"
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

/**
 * Category switcher — lists distinct categories within this form so users can
 * jump from e.g. "I-485 Employment-based" to "I-485 Family-based" without
 * going back to the form page. Navigates to the first office in the chosen
 * category (alphabetically) — the case page's OfficeSwitcher then lets the
 * user pick a different office within that category.
 */
function CategorySwitcher({
  currentCategory,
  siblings,
}: {
  currentCategory: string;
  siblings: { slug: string; category: string; office: string }[];
}) {
  const navigate = useNavigate();
  // Pick one representative slug per category — the first office alphabetically.
  const byCategory = new Map<string, { slug: string; office: string }>();
  for (const s of siblings) {
    const existing = byCategory.get(s.category);
    if (!existing || s.office.localeCompare(existing.office) < 0) {
      byCategory.set(s.category, { slug: s.slug, office: s.office });
    }
  }
  // Don't render if there's only one category for this form.
  if (byCategory.size === 0) return null;

  const otherCategories = [...byCategory.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Category
      </span>
      <div className="relative">
        <select
          aria-label="Switch case category"
          value="__current__"
          onChange={(e) => {
            const slug = e.target.value;
            if (slug !== "__current__") {
              navigate({ to: "/case/$slug", params: { slug } });
            }
          }}
          className="appearance-none bg-card border rule px-3 py-1.5 pr-8 text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-ring/40 cursor-pointer max-w-[280px] truncate"
        >
          <option value="__current__">{currentCategory}</option>
          {otherCategories.map(([category, { slug }]) => (
            <option key={category} value={slug}>
              {category}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
          ▾
        </span>
      </div>
    </div>
  );
}
