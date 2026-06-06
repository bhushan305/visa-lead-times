import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Data | Visa Lead Times" },
      {
        name: "description",
        content:
          "How we collect USCIS processing time data: daily snapshots, monthly averages, and historical context.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-6 py-16 w-full">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          About the data
        </p>
        <h1 className="display text-5xl text-primary mt-2">
          Where the numbers come from
        </h1>

        <div className="mt-10 space-y-8 text-base text-foreground leading-relaxed">
          <Section title="Source">
            All processing-time figures come directly from{" "}
            <a
              className="text-primary underline"
              href="https://egov.uscis.gov/processing-times"
              target="_blank"
              rel="noopener"
            >
              USCIS's official Processing Times tool
            </a>
            . We do not modify the published ranges.
          </Section>
          <Section title="How often we update">
            We capture a snapshot every weekday for every tracked case type — form, category, and
            service center. This lets us show how often USCIS changes a published range, not just
            what the current range is.
          </Section>
          <Section title="How the trend chart works">
            <ul className="list-disc pl-5 space-y-2 marker:text-accent">
              <li>
                <strong>Last 30 days</strong>: each point is a daily snapshot.
              </li>
              <li>
                <strong>Earlier months</strong>: we average daily snapshots into a monthly value
                so the long-term direction is readable.
              </li>
              <li>
                <strong>Year-to-date & prior years</strong>: as we accumulate more history, the
                chart automatically extends. We supplement with USCIS's published historic
                processing times where appropriate.
              </li>
            </ul>
          </Section>
          <Section title="What this is not">
            This is informational, not legal advice. Your case may be processed faster or slower
            than the published range. If your case is significantly outside the published range,
            talking with an immigration attorney is usually a good idea.
          </Section>
        </div>

        <Link to="/" className="inline-block mt-12 text-sm text-primary underline">
          ← Back to home
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="display text-2xl text-primary border-b rule pb-2 mb-3">{title}</h2>
      <div className="text-muted-foreground">{children}</div>
    </section>
  );
}
