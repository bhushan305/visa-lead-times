import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { LitwinCTA } from "@/components/litwin-cta";
import { AdSlot } from "@/components/ad-slot";
import { getAllForms, getAllCases } from "@/lib/case.functions";
import { searchWithAlias, type CaseSummary, type FormGroup } from "@/lib/processing-times";
import { trackSearch } from "@/lib/analytics-tracker";
import { readLastCase } from "@/lib/preferences";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [formsRaw, casesRaw] = await Promise.all([getAllForms(), getAllCases()]);
    const forms: FormGroup[] = formsRaw.map((f: any) => {
      const formCases = casesRaw
        .filter((c: any) => c.form_code === f.code)
        .map(toSummary);
      return {
        code: f.code,
        title: (f.label ?? "").split(" | ")[1] ?? f.label,
        slug: f.slug,
        count: formCases.length,
        cases: formCases,
      };
    });
    const allCases: CaseSummary[] = casesRaw.map(toSummary);
    return { forms, allCases };
  },
  head: () => ({
    meta: [
      { title: "USCIS Visa Processing Times — Daily Tracker | Visa Case Times" },
      {
        name: "description",
        content:
          "Track current USCIS visa processing times by form (I-130, I-485, I-765, N-400 and more). See daily trends, monthly averages, and historical lead times.",
      },
      { property: "og:title", content: "USCIS Visa Processing Times — Daily Tracker" },
      {
        property: "og:description",
        content:
          "Daily-updated wait times for every USCIS form and service center. Your case type in seconds.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { rel: "canonical", href: "/" } as any,
    ],
  }),
  component: HomePage,
});

function toSummary(c: any): CaseSummary {
  return {
    slug: c.slug,
    name: c.name,
    form: c.form_code,
    category: c.category,
    office: c.office,
    current_display: c.current_display ?? null,
  };
}

function HomePage() {
  const { forms, allCases } = Route.useLoaderData();
  const [q, setQ] = useState("");
  const [lastCase, setLastCase] = useState<string | null>(null);

  useEffect(() => {
    setLastCase(readLastCase());
  }, []);

  const outcome = useMemo(() => searchWithAlias(allCases, q), [q, allCases]);
  const results = outcome.groups;
  const matchedAlias = outcome.alias;

  // Debounced search tracking. After the user pauses typing for 400ms we log
  // ONE event: the query, whether it matched a visa alias, and how many
  // results we showed. Joins to clicks via user_id so we can compute
  // search → click conversion.
  useEffect(() => {
    const trimmed = q.trim();
    if (trimmed.length < 2) return;
    const timer = setTimeout(() => {
      trackSearch({
        query: trimmed,
        normalized_query: trimmed.toLowerCase().replace(/[^a-z0-9]/g, ""),
        matched_alias: matchedAlias?.display ?? null,
        results_count: results.length,
        page_path: typeof window !== "undefined" ? window.location.pathname : "/",
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [q, matchedAlias?.display, results.length]);
  const lastCaseMeta = useMemo(
    () => (lastCase ? allCases.find((c) => c.slug === lastCase) : null),
    [lastCase, allCases]
  );

  const popularCodes = ["I-485", "I-130", "I-129", "N-400", "I-765", "I-131", "I-751", "I-90"];
  const popularForms = popularCodes
    .map((code) => forms.find((f) => f.code === code))
    .filter(Boolean) as FormGroup[];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b rule">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Updated daily · Source: USCIS.gov
            </p>
            <h1 className="display text-5xl sm:text-7xl text-primary mt-4 leading-[1.02] max-w-4xl">
              USCIS processing times,&nbsp;decoded.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Daily snapshots, weekly averages, and a decade of fiscal-year history for{" "}
              <span className="num text-foreground">{allCases.length.toLocaleString()}</span>{" "}
              case types across every USCIS service center. See exactly when the wait moved —
              not just where it stands today.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Pick a form below — or search by visa type, category, or office.
            </p>

            <div className="mt-10">
              <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Your case type
              </label>
              <div className="relative">
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Try “I-485 employment” or “H-1B” or “N-400”"
                  className="w-full max-w-3xl border rule bg-card px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
              {results.length > 0 && (
                <div className="mt-2 max-w-3xl border rule bg-card">
                  {matchedAlias && (
                    <div className="border-b rule px-5 py-2.5 bg-secondary/50">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Matched visa
                      </p>
                      <p className="text-sm text-foreground mt-0.5">
                        <strong>{matchedAlias.display}</strong>
                        {matchedAlias.forms.length > 1 && (
                          <span className="text-muted-foreground">
                            {" — typically involves "}
                            {matchedAlias.forms.join(" + ")}
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                <div className="divide-y divide-[var(--color-border)]">
                  {results.map((g) => (
                    <Link
                      key={`${g.form}::${g.category}`}
                      to="/case/$slug"
                      params={{ slug: g.primarySlug }}
                      className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-secondary"
                    >
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="display text-base text-primary">{g.form}</span>
                          <span className="font-medium text-foreground truncate">{g.category}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {g.offices.length === 1
                            ? g.offices[0].office
                            : `${g.offices.length} service centers — pick on next page`}
                        </div>
                      </div>
                      <div className="text-sm num text-primary whitespace-nowrap">
                        {g.rangeDisplay ?? "—"}
                      </div>
                    </Link>
                  ))}
                </div>
                </div>
              )}
            </div>

            {lastCaseMeta && (
              <div className="mt-8 inline-flex items-center gap-3 border rule bg-card px-4 py-3 text-sm">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Last viewed
                </span>
                <Link
                  to="/case/$slug"
                  params={{ slug: lastCaseMeta.slug }}
                  className="text-primary font-medium hover:underline"
                >
                  {lastCaseMeta.name}
                </Link>
                <span className="num text-muted-foreground">
                  {lastCaseMeta.current_display}
                </span>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-baseline justify-between border-b rule pb-4 mb-8">
            <h2 className="display text-3xl text-primary">Popular forms</h2>
            <Link to="/forms" className="text-sm text-muted-foreground hover:text-primary">
              All forms →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] border rule">
            {popularForms.map((f) => (
              <Link
                key={f.code}
                to="/form/$code"
                params={{ code: f.slug }}
                className="bg-card p-6 hover:bg-secondary transition-colors flex flex-col"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Form
                </div>
                <div className="display text-3xl text-primary mt-1">{f.code}</div>
                <div className="mt-2 text-sm text-foreground line-clamp-2">{f.title}</div>
                <div className="mt-auto pt-4 text-xs text-muted-foreground">
                  {f.count} case {f.count === 1 ? "type" : "types"} tracked
                </div>
              </Link>
            ))}
          </div>

          {/* High-intent: visitor just browsed cases. Offer pro help if needed. */}
          <LitwinCTA variant="inline" context="home:after-forms" />

          <AdSlot id="home-leaderboard" format="leaderboard" context="home" />

          {/* Surface long-form guides — they're the most-shareable and
              highest-SEO-value pages on the site. Linking them from the
              home page (highest authority page) gives them a strong boost. */}
          <div className="flex items-baseline justify-between border-b rule pb-4 mb-6 mt-16">
            <h2 className="display text-3xl text-primary">Popular guides</h2>
            <a href="/guides" className="text-xs text-accent hover:underline whitespace-nowrap">
              All guides →
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)] border rule mb-16">
            {[
              { slug: "uscis-processing-times-explained", title: "How USCIS processing times work", desc: "What the published range actually means and how to read it" },
              { slug: "what-to-do-if-case-delayed", title: "What to do if your case is delayed", desc: "Service requests, inquiries, mandamus — the full set of remedies" },
              { slug: "eb-2-vs-eb-3", title: "EB-2 vs EB-3 — which is faster?", desc: "Side-by-side employment green card comparison" },
              { slug: "h-1b-processing-times", title: "H-1B processing times in 2026", desc: "Cap, change of status, transfer, extension" },
              { slug: "i-485-processing-times", title: "I-485 adjustment of status", desc: "Timelines by category, interview, EAD/AP, RFEs" },
              { slug: "n-400-naturalization-times", title: "N-400 naturalization", desc: "Eligibility, tests, interview, oath ceremony" },
            ].map((g) => (
              <a
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="bg-card p-5 hover:bg-secondary transition-colors"
              >
                <p className="display text-base text-primary leading-snug">{g.title}</p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{g.desc}</p>
              </a>
            ))}
          </div>

          <div className="flex items-baseline justify-between border-b rule pb-4 mb-8 mt-16">
            <h2 className="display text-3xl text-primary">Why this exists</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <Explainer n="01" title="Daily snapshots" body="USCIS only updates timing ranges on their own schedule. We snapshot every weekday so you can see the actual cadence of change." />
            <Explainer n="02" title="Your specific case" body="Pick your form, category, and service center to see the published range that applies to your filing — not a national average." />
            <Explainer n="03" title="Trend over time" body="Daily detail for the past 30 days, monthly averages further back, then YTD and yearly USCIS historic averages — all in one chart." />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Explainer({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div>
      <div className="text-xs num text-accent font-medium">{n}</div>
      <h3 className="display text-2xl mt-1 text-primary">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
