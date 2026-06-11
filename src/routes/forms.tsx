import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getAllForms, getAllCases } from "@/lib/case.functions";

export const Route = createFileRoute("/forms")({
  loader: async () => {
    const [formsRaw, casesRaw] = await Promise.all([getAllForms(), getAllCases()]);
    const counts = new Map<string, number>();
    for (const c of casesRaw) counts.set(c.form_code, (counts.get(c.form_code) ?? 0) + 1);
    const forms = formsRaw.map((f: any) => ({
      code: f.code,
      title: (f.label ?? "").split(" | ")[1] ?? f.label,
      slug: f.slug,
      count: counts.get(f.code) ?? 0,
    }));
    return { forms };
  },
  head: () => ({
    meta: [
      { title: "All USCIS Forms We Track | Visa Case Times" },
      {
        name: "description",
        content:
          "Browse every USCIS form we track for processing times — I-130, I-485, I-765, I-129, N-400 and many more.",
      },
      { rel: "canonical", href: "/forms" } as any,
    ],
  }),
  component: FormsIndex,
});

function FormsIndex() {
  const { forms } = Route.useLoaderData();
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-6xl px-6 py-12 w-full">
        <header className="border-b rule pb-8 mb-8">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Index</p>
          <h1 className="display text-5xl text-primary mt-2">All tracked forms</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            {forms.length} USCIS forms across {forms.reduce((s, f) => s + f.count, 0)} case types.
            Pick a form to see its case categories and service centers.
          </p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)] border rule">
          {forms.map((f) => (
            <Link
              key={f.code}
              to="/form/$code"
              params={{ code: f.slug }}
              className="bg-card p-5 hover:bg-secondary flex flex-col"
            >
              <div className="display text-2xl text-primary">{f.code}</div>
              <div className="text-sm text-foreground mt-1 line-clamp-2">{f.title}</div>
              <div className="mt-auto pt-3 text-xs text-muted-foreground num">
                {f.count} case {f.count === 1 ? "type" : "types"}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
