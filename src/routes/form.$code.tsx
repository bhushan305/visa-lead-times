import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { SponsoredSlot } from "@/components/sponsored-slot";
import { getFormPageBundle } from "@/lib/case.functions";

export const Route = createFileRoute("/form/$code")({
  loader: async ({ params }) => {
    const bundle = await getFormPageBundle({ data: { slug: params.code } });
    if (!bundle.form) throw notFound();
    const { form, cases, allForms } = bundle;
    return {
      form: {
        code: form.code,
        title: (form.label ?? "").split(" | ")[1] ?? form.label,
        slug: form.slug,
        count: cases.length,
      },
      cases: cases.map((c: any) => ({
        slug: c.slug,
        category: c.category,
        office: c.office,
        current_display: c.current_display ?? null,
      })),
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
        { title: `${f.code} Processing Times — ${f.title} | Visa Lead Times` },
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
  const { form, cases, allForms } = Route.useLoaderData();

  // JSON-LD: Dataset schema makes Google understand we're tracking time-series data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `USCIS Form ${form.code} processing times`,
    description: `Daily-updated processing-time ranges for USCIS Form ${form.code} (${form.title}) across ${form.count} service-center/category combinations.`,
    creator: { "@type": "Organization", name: "Visa Lead Times" },
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

        <div className="border rule bg-card divide-y divide-[var(--color-border)]">
          {cases.map((c) => (
            <Link
              key={c.slug}
              to="/case/$slug"
              params={{ slug: c.slug }}
              className="flex items-start sm:items-center flex-col sm:flex-row gap-2 sm:gap-6 px-5 py-4 hover:bg-secondary"
            >
              <div className="flex-1">
                <div className="font-medium text-foreground">{c.category}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{c.office}</div>
              </div>
              <div className="num text-primary text-sm whitespace-nowrap">
                {c.current_display ?? "—"}
              </div>
            </Link>
          ))}
        </div>

        <SponsoredSlot />

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
