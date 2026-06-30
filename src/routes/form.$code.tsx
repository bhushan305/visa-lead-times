import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { SponsoredSlot } from "@/components/sponsored-slot";
import { AdSlot } from "@/components/ad-slot";
import { getFormPageBundle } from "@/lib/case.functions";
import { getPrimaryGuideForForm } from "@/lib/guide-links";

/** Median of a numeric array. Returns null for empty input. */
function median(xs: number[]): number | null {
  if (!xs.length) return null;
  const sorted = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/** Format months as "8-12 mo" or "9 mo". */
function fmtRange(lo: number | null, hi: number | null): string {
  if (lo == null && hi == null) return "—";
  if (lo == null || hi == null) return `${(lo ?? hi)!.toFixed(1)} mo`;
  if (Math.abs(lo - hi) < 0.05) return `${lo.toFixed(1)} mo`;
  return `${lo.toFixed(1)}–${hi.toFixed(1)} mo`;
}

type Office = {
  slug: string;
  office: string;
  current_display: string | null;
  current_lo: number | null;
  current_hi: number | null;
};
type CategoryGroup = {
  category: string;
  offices: Office[];
  // Aggregate stats across all offices in this category
  medianLo: number | null;
  medianHi: number | null;
  minLo: number | null;
  maxHi: number | null;
};

export const Route = createFileRoute("/form/$code")({
  loader: async ({ params }) => {
    const bundle = await getFormPageBundle({ data: { slug: params.code } });
    if (!bundle.form) throw notFound();
    const { form, cases, allForms } = bundle;

    // Group cases by category. For forms like N-400 with one category and 80
    // field offices, this collapses to a single card with a national median
    // and a per-office drilldown. For forms like I-129 with many distinct
    // categories at a few service centers, you get one card per category.
    const byCategory = new Map<string, Office[]>();
    for (const c of cases) {
      const offices = byCategory.get(c.category) ?? [];
      offices.push({
        slug: c.slug,
        office: c.office,
        current_display: c.current_display ?? null,
        current_lo: c.current_lo ?? null,
        current_hi: c.current_hi ?? null,
      });
      byCategory.set(c.category, offices);
    }

    const categoryGroups: CategoryGroup[] = [...byCategory.entries()]
      .map(([category, offices]) => {
        const los = offices.map((o) => o.current_lo).filter((n): n is number => n != null);
        const his = offices.map((o) => o.current_hi).filter((n): n is number => n != null);
        // Sort offices alphabetically for predictable drilldown
        offices.sort((a, b) => a.office.localeCompare(b.office));
        return {
          category,
          offices,
          medianLo: median(los),
          medianHi: median(his),
          minLo: los.length ? Math.min(...los) : null,
          maxHi: his.length ? Math.max(...his) : null,
        };
      })
      // Sort categories: most common first, then alphabetical
      .sort((a, b) => b.offices.length - a.offices.length || a.category.localeCompare(b.category));

    return {
      form: {
        code: form.code,
        title: (form.label ?? "").split(" | ")[1] ?? form.label,
        slug: form.slug,
        count: cases.length,
      },
      categoryGroups,
      allForms: allForms.map((f: any) => ({
        code: f.code,
        slug: f.slug,
        title: (f.label ?? "").split(" | ")[1] ?? f.label,
      })),
    };
  },
  head: ({ loaderData, params }) => {
    const f = loaderData?.form;
    if (!f) return { meta: [{ title: "Form not found" }] };
    return {
      meta: [
        { title: `${f.code} Processing Times — ${f.title} | Visa Case Times` },
        {
          name: "description",
          content: `Current USCIS processing times for Form ${f.code} (${f.title}). ${f.count} case types tracked across service centers, updated daily.`,
        },
        { property: "og:title", content: `${f.code} processing times` },
        { property: "og:description", content: f.title },
        { rel: "canonical", href: `/form/${params.code}` } as any,
      ],
    };
  },
  component: FormPage,
  pendingMs: 50,
  pendingComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-6xl px-6 py-12 w-full">
        <div className="h-3 w-16 bg-muted rounded animate-pulse mb-3" />
        <div className="h-16 w-32 bg-muted rounded animate-pulse mb-3" />
        <div className="h-5 w-72 bg-muted rounded animate-pulse mb-8" />
        <div className="border rule bg-card">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="px-5 py-4 border-b rule">
              <div className="h-4 w-2/3 bg-muted rounded animate-pulse mb-2" />
              <div className="h-3 w-1/3 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
  notFoundComponent: () => <NotFound />,
  errorComponent: ({ error }) => (
    <div className="p-10 text-sm text-destructive">{error.message}</div>
  ),
});

function FormPage() {
  const { form, categoryGroups, allForms } = Route.useLoaderData();

  // JSON-LD: Dataset schema makes Google understand we're tracking time-series data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `USCIS Form ${form.code} processing times`,
    description: `Daily-updated processing-time ranges for USCIS Form ${form.code} (${form.title}) across ${form.count} service-center/category combinations.`,
    creator: { "@type": "Organization", name: "Visa Case Times" },
    isBasedOn: "https://egov.uscis.gov/processing-times",
    keywords: [form.code, form.title, "USCIS", "processing times", "immigration"].join(", "),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-6xl px-6 py-12 w-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>Form {form.code}</span>
        </nav>

        <header className="border-b rule pb-8 mb-8">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Form</p>
          <h1 className="display text-5xl sm:text-6xl text-primary mt-2">{form.code}</h1>
          <p className="mt-3 text-lg text-foreground max-w-3xl">{form.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {form.count} case {form.count === 1 ? "type" : "types"} tracked
          </p>
        </header>

        {/* Surface the matching long-form guide if we have one. Prominent above
            the case list because most visitors land here looking for context
            before clicking into a specific office. */}
        {(() => {
          const guide = getPrimaryGuideForForm(form.code);
          if (!guide) return null;
          return (
            <a
              href={`/guides/${guide.slug}`}
              className="block mb-6 border-l-4 border-accent bg-card px-5 py-4 hover:bg-secondary transition-colors"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Guide
              </p>
              <p className="text-sm text-foreground mt-1">
                <strong>{guide.title}</strong>
                <span className="text-muted-foreground"> — read the full guide →</span>
              </p>
            </a>
          );
        })()}

        <div className="space-y-4">
          {categoryGroups.map((g) => (
            <CategoryCard key={g.category} group={g} />
          ))}
        </div>

        <SponsoredSlot />

        <AdSlot id="form-leaderboard" format="leaderboard" context={`form:${form.code}`} />

        <div className="mt-12">
          <h2 className="display text-2xl text-primary border-b rule pb-3 mb-6">
            Other popular forms
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] border rule">
            {allForms
              .filter((x) => x.code !== form.code)
              .slice(0, 8)
              .map((f) => (
                <Link
                  key={f.code}
                  to="/form/$code"
                  params={{ code: f.slug }}
                  className="bg-card p-5 hover:bg-secondary"
                >
                  <div className="display text-xl text-primary">{f.code}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{f.title}</div>
                </Link>
              ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function CategoryCard({ group }: { group: CategoryGroup }) {
  const [expanded, setExpanded] = useState(false);
  const hasManyOffices = group.offices.length > 1;
  const nationalRange = fmtRange(group.medianLo, group.medianHi);
  const spread =
    group.minLo != null && group.maxHi != null && group.offices.length > 1
      ? `${group.minLo.toFixed(1)}–${group.maxHi.toFixed(1)} mo across ${group.offices.length} offices`
      : null;

  // If only one office, link directly — skip the expand affordance.
  if (!hasManyOffices) {
    const only = group.offices[0];
    return (
      <Link
        to="/case/$slug"
        params={{ slug: only.slug }}
        className="block border rule bg-card px-5 py-4 hover:border-primary"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="font-medium text-foreground">{group.category}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{only.office}</div>
          </div>
          <div className="num text-primary text-sm whitespace-nowrap">
            {only.current_display ?? "—"}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="border rule bg-card">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary"
        aria-expanded={expanded}
      >
        <div className="flex-1">
          <div className="font-medium text-foreground">{group.category}</div>
          {spread && (
            <div className="text-xs text-muted-foreground mt-0.5">{spread}</div>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            National median
          </p>
          <p className="num text-primary text-sm whitespace-nowrap mt-0.5">
            {nationalRange}
          </p>
        </div>
        <span
          className="text-muted-foreground text-lg leading-none w-4 text-center"
          aria-hidden="true"
        >
          {expanded ? "−" : "+"}
        </span>
      </button>
      {expanded && (
        <ul className="border-t rule divide-y divide-[var(--color-border)]">
          {group.offices.map((o) => (
            <li key={o.slug}>
              <Link
                to="/case/$slug"
                params={{ slug: o.slug }}
                className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-secondary"
              >
                <span className="text-sm text-foreground">{o.office}</span>
                <span className="num text-primary text-xs whitespace-nowrap">
                  {o.current_display ?? "—"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="display text-5xl text-primary">Form not tracked</h1>
        <p className="mt-3 text-muted-foreground">We don't have data for that form yet.</p>
        <Link to="/" className="inline-block mt-6 text-primary underline">
          Back to home
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
