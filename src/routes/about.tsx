import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Visa Case Times — Independent USCIS Tracker" },
      {
        name: "description",
        content:
          "Visa Case Times is an independent tracker for USCIS processing times. Daily snapshots, weekly averages, fiscal-year history — all from USCIS's official data, transparently sourced.",
      },
      { rel: "canonical", href: "https://visacasetimes.com/about" } as any,
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-6 py-12 w-full">
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>About</span>
        </nav>

        <article>
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">About</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              An independent USCIS processing-time tracker
            </h1>
            <p className="mt-4 text-lg text-foreground">
              We collect what USCIS publishes, store it daily, and present it as a trend
              chart you can actually read. The official tool tells you today's range. We
              tell you whether the range has moved — and when.
            </p>
          </header>

          <section>
            <h2 className="display text-2xl text-primary mt-10 mb-3">Why this exists</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The USCIS Processing Times tool answers "what's the current range for my
              case type at my office?" It doesn't show what the range was last month,
              whether it's trending up or down, or how it compares to the same case at
              a different field office. For applicants who have been waiting nine, twelve,
              eighteen months, the current snapshot is the least interesting question.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Visa Case Times rebuilds the picture as a time series. We sample USCIS's
              published numbers every weekday, store every snapshot, and chart the trend
              alongside the fiscal-year averages USCIS publishes separately. Every case
              page shows where things stand today, where they were a week ago, where they
              were a year ago, and the full history back to fiscal year 2014.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">What we track</h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>Every USCIS form-category-office combination that USCIS publishes a processing time for. Currently around 500 distinct case rows across 43 forms.</li>
              <li>The published processing-time range and the case-inquiry date.</li>
              <li>Historic fiscal-year medians from USCIS's Historic Processing Times page, back to FY2014.</li>
            </ul>

            <h2 className="display text-2xl text-primary mt-10 mb-3">How we present it</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Each case page combines four data tiers on a single chart:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li><strong>Fiscal-year averages</strong> (diamond markers) — USCIS-published national median for each completed fiscal year, drawn from their Historic Processing Times page.</li>
              <li><strong>Current-year YTD</strong> (also a diamond) — partial-year median for the current USCIS fiscal year.</li>
              <li><strong>Weekly averages</strong> (square markers) — our weekly aggregations of daily snapshots, for the period before the last 30 days.</li>
              <li><strong>Daily snapshots</strong> (line with circle markers) — every snapshot we collected in the last 30 days.</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The chart is designed so a single glance answers two questions: where does
              the current range sit compared to history? and is it moving?
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Editorial standards</h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li><strong>USCIS is the source.</strong> We don't editorialize the numbers. The published range is the published range.</li>
              <li><strong>No predictions.</strong> We show what has happened. We don't claim to predict your case timeline.</li>
              <li><strong>No legal advice.</strong> Our guides explain how USCIS processes work in plain language but are not a substitute for an attorney. We clearly mark sponsored content.</li>
              <li><strong>Sponsorship is labeled.</strong> Attorney CTAs and ads are labeled. Editorial content is not influenced by sponsors.</li>
              <li><strong>Data is owned and reproducible.</strong> Methodology is documented (<Link to="/methodology" className="text-primary hover:underline">here</Link>). If we ever change how we calculate something, we'll note it on the methodology page with the date.</li>
            </ul>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Who built this</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Visa Case Times is built and maintained by an independent operator who has
              navigated the USCIS system personally and built data infrastructure for a
              living. The site started as a personal tool to track wait times across a
              family's various pending petitions and grew into something useful for other
              applicants in the same boat.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              We're not a law firm, a marketing agency, or a government-affiliated
              organization. We are independent. If you'd like to reach us, the Feedback
              widget at the bottom-left of every page goes directly to our inbox.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">How we make money</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The Service is free to use and we have no plans to add a paywall.
              Costs are covered through:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li><strong>Display advertising</strong> via Google AdSense and other ad networks. Clearly labeled "Sponsored."</li>
              <li><strong>Direct attorney sponsorships</strong> — partnering with immigration attorneys whose practices we consider trustworthy. Labeled "Sponsored." We do not endorse any specific firm; the choice of attorney is yours.</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              We do not, and will not, sell visitor data. Our analytics are first-party
              and limited to what's needed to improve the site. See our{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for details.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">What we don't do</h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>We do not look up your specific case status. For that, use USCIS's <a className="text-primary hover:underline" href="https://egov.uscis.gov/casestatus" target="_blank" rel="noopener">Case Status tool</a> with your receipt number.</li>
              <li>We do not file petitions, prepare forms, or represent applicants.</li>
              <li>We do not store your USCIS receipt number, A-number, or any personal case information. Don't enter that data here — we have no way to act on it.</li>
              <li>We do not provide legal advice. For case-specific guidance, talk to a licensed immigration attorney.</li>
            </ul>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Get in touch</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Found a data gap? Spotted an inaccuracy? Have a question? The Feedback widget
              at the bottom-left of every page is the fastest way to reach us. We read every
              note and respond to most within a few days.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For press or partnership inquiries: <strong>hello@visacasetimes.com</strong>.
            </p>

            <p className="text-xs text-muted-foreground mt-10 pt-6 border-t rule">
              See also:{" "}
              <Link to="/methodology" className="text-primary hover:underline">Methodology</Link> ·{" "}
              <Link to="/guides" className="text-primary hover:underline">Guides</Link> ·{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy</Link> ·{" "}
              <Link to="/terms" className="text-primary hover:underline">Terms</Link>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
