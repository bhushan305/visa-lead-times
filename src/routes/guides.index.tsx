import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: "USCIS Immigration Guides — Processing Times & Procedures | Visa Case Times" },
      {
        name: "description",
        content:
          "In-depth guides on USCIS processing times, what to do if your case is delayed, EB-2 vs EB-3, filing checklists, and the most common form types (H-1B, I-485, N-400, I-130).",
      },
      { rel: "canonical", href: "https://visacasetimes.com/guides" } as any,
    ],
  }),
  component: GuidesIndex,
});

type Guide = {
  slug: string;
  title: string;
  description: string;
  readTime: string;
};

const FOUNDATIONAL: Guide[] = [
  {
    slug: "uscis-processing-times-explained",
    title: "How USCIS processing times work",
    description: "What the 80th-percentile methodology means, how to read the published range, and why your case may resolve faster or slower.",
    readTime: "8 min",
  },
  {
    slug: "what-to-do-if-case-delayed",
    title: "What to do if your USCIS case is delayed",
    description: "Service requests, congressional inquiries, USCIS Ombudsman, premium processing, writ of mandamus — the full set of remedies.",
    readTime: "10 min",
  },
  {
    slug: "case-status-vs-processing-times",
    title: "Case status vs processing times — the difference",
    description: "Two USCIS tools, two different questions. When to use each.",
    readTime: "6 min",
  },
  {
    slug: "filing-checklist",
    title: "USCIS filing checklist",
    description: "Forms, fees, evidence, signatures, common rejection reasons — what every USCIS filing needs.",
    readTime: "12 min",
  },
  {
    slug: "eb-2-vs-eb-3",
    title: "EB-2 vs EB-3 — which is faster?",
    description: "Side-by-side comparison of the two main employment-based green card categories, including downgrading strategy.",
    readTime: "9 min",
  },
];

const BY_FORM: Guide[] = [
  {
    slug: "h-1b-processing-times",
    title: "H-1B processing times in 2026",
    description: "Cap, change of status, transfer, extension, amendment — current timelines and premium processing.",
    readTime: "11 min",
  },
  {
    slug: "i-485-processing-times",
    title: "I-485 adjustment of status processing times",
    description: "Family-based, employment-based, asylee — timelines by category, interview, EAD/AP, RFE patterns.",
    readTime: "12 min",
  },
  {
    slug: "i-130-family-petition-times",
    title: "I-130 family petition processing times",
    description: "All eligibility categories, Visa Bulletin connection, what comes after approval.",
    readTime: "11 min",
  },
  {
    slug: "n-400-naturalization-times",
    title: "N-400 naturalization processing times",
    description: "Eligibility, continuous residence, English/civics tests, interview, oath ceremony.",
    readTime: "10 min",
  },
];

function GuidesIndex() {
  // CollectionPage JSON-LD for the index
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "USCIS Immigration Guides",
    description: "Comprehensive guides on USCIS processing times and immigration procedures.",
    publisher: { "@type": "Organization", name: "Visa Case Times" },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-4xl px-6 py-12 w-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />

        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>Guides</span>
        </nav>

        <header className="border-b rule pb-6 mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Guides</p>
          <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
            USCIS Immigration Guides
          </h1>
          <p className="mt-4 text-lg text-foreground max-w-2xl">
            In-depth, plain-language guides on how USCIS works — written for applicants who
            want to understand their case, not just check a status page. None of this is
            legal advice; consult an immigration attorney for case-specific guidance.
          </p>
        </header>

        <section>
          <h2 className="display text-2xl text-primary mb-4">Foundational</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Start here if you're new to USCIS processing-time data or trying to figure out
            how to push a stuck case forward.
          </p>
          <ul className="space-y-3">
            {FOUNDATIONAL.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="display text-2xl text-primary mb-4">By form</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Deep dives on the most-filed USCIS forms.
          </p>
          <ul className="space-y-3">
            {BY_FORM.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </ul>
        </section>

        <section className="mt-14 p-5 border rule bg-card">
          <h2 className="display text-xl text-primary mb-2">More coming</h2>
          <p className="text-sm text-muted-foreground">
            We're publishing new guides regularly. If there's a topic you'd like covered,
            send a note via the Feedback widget at the bottom-left of any page.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function GuideCard({ guide }: { guide: Guide }) {
  // Each guide is its own static route — use plain anchor for client-side
  // navigation. TanStack's router will intercept and do soft nav.
  return (
    <li>
      <a
        href={`/guides/${guide.slug}`}
        className="block border rule bg-card p-5 hover:border-primary transition-colors"
      >
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <h3 className="display text-lg text-primary truncate">{guide.title}</h3>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground shrink-0">
            {guide.readTime}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{guide.description}</p>
      </a>
    </li>
  );
}
