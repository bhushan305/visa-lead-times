import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { SponsoredSlot } from "@/components/sponsored-slot";
import { LitwinCTA } from "@/components/litwin-cta";
import { getAllForms, getAllCases } from "@/lib/case.functions";
import { buildSearchGrouped, type CaseSummary, type FormGroup } from "@/lib/processing-times";
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
      { title: "USCIS Visa Processing Times — Daily Tracker | Visa Lead Times" },
      {
        name: "description",
        content:
          "Track current USCIS visa processing times by form (I-130, I-485, I-765, N-400 and more). See daily trends, monthly averages, and historical lead times.",
      },
      { property: "og:title", content: "USCIS Visa Processing Times — Daily Tracker" },
      {
        property: "og:description",
        content:
          "Daily-updated wait times for every USCIS form and service center. Find your case in seconds.",
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

  const results = useMemo(() => buildSearchGrouped(allCases, q), [q, allCases]);
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
              How long is your visa really&nbsp;taking?
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              We collect USCIS-published processing times every weekday for{" "}
              <span className="num text-foreground">{allCases.length.toLocaleString()}</span>{" "}
              case types across every service center, then plot the daily trend so you can see
              when your wait is moving — not just where it stands today.
            </p>

            <div className="mt-10">
              <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Find your case
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
                <div className="mt-2 max-w-3xl border rule bg-card divide-y divide-[var(--color-border)]">
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

          <SponsoredSlot />

          {/* High-intent: visitor just browsed cases. Offer pro help if needed. */}
          <LitwinCTA variant="inline" context="home:after-forms" />

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
