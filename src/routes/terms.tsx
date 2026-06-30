import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Visa Case Times" },
      {
        name: "description",
        content:
          "Terms of use for Visa Case Times. Information is provided for general guidance and is not legal advice.",
      },
      { rel: "canonical", href: "https://visacasetimes.com/terms" } as any,
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-6 py-12 w-full">
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>Terms of Service</span>
        </nav>

        <article>
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Legal</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              Terms of Service
            </h1>
            <p className="mt-3 text-xs text-muted-foreground">Last updated: June 19, 2026</p>
          </header>

          <section>
            <p className="text-base text-foreground leading-relaxed mb-4">
              By using Visa Case Times (the "Service"), you agree to these terms. If you do
              not agree, please don't use the Service.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">1. Nature of the Service</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Visa Case Times is an independent dashboard that displays USCIS-published
              processing times, historic averages, and our own derived statistics
              (weekly averages, trend analyses). The Service is operational at{" "}
              <a className="text-primary hover:underline" href="https://visacasetimes.com">visacasetimes.com</a> and{" "}
              <a className="text-primary hover:underline" href="https://usciscasetimes.com">usciscasetimes.com</a>.
              We are not affiliated with USCIS, the Department of Homeland Security, or any
              government agency.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">2. Not legal advice</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The Service provides general informational content about USCIS processing
              times and immigration procedures. This is <strong>not legal advice</strong> and
              should not be treated as such. Immigration law is complex, fact-specific, and
              changes frequently. For advice on your specific situation, consult a licensed
              immigration attorney.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Decisions you make based on information from the Service are your own. We
              disclaim liability for outcomes that result from reliance on information
              displayed here.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">3. Accuracy and availability</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              We make a good-faith effort to display accurate, current USCIS data. However:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>USCIS may update its processing-time ranges at any time and we may not reflect those updates immediately.</li>
              <li>Our snapshots are collected on a daily cadence and may occasionally miss days due to scraping failures, USCIS site issues, or our own outages.</li>
              <li>Historic data shown on this site is sourced from USCIS's published Historic Processing Times page; older data may have been re-categorized or restated by USCIS.</li>
              <li>The Service is provided "as is" without warranty of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.</li>
            </ul>

            <h2 className="display text-2xl text-primary mt-10 mb-3">4. Permitted use</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              You may use the Service for personal, non-commercial reference. You may link to
              individual case pages or share screenshots. You may not:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>Scrape, crawl, or systematically extract data from the Service without our written permission.</li>
              <li>Resell or commercialize the data, in whole or in part.</li>
              <li>Use the Service to harass, defraud, or deceive other users.</li>
              <li>Reverse-engineer or attempt to disrupt the Service's infrastructure.</li>
            </ul>

            <h2 className="display text-2xl text-primary mt-10 mb-3">5. User-submitted content</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              If you submit feedback through the feedback widget, you grant us a perpetual,
              royalty-free license to read, store, respond to, and use that feedback to
              improve the Service. Don't include sensitive personal information (USCIS
              receipt numbers, A-numbers, immigration history, medical info) in feedback
              submissions — there's no legitimate reason to share that with us.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">6. Sponsored content</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The Service displays advertisements and sponsored content, including referrals
              to immigration attorneys. Sponsorships are clearly labeled. We do not endorse
              any specific attorney or service; choosing an attorney is your decision.
              We may receive compensation when you click on sponsored links or contact a
              sponsored attorney.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">7. External links</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The Service links to USCIS.gov, Department of State, attorney directories, and
              other third-party sites. We are not responsible for the content, accuracy, or
              practices of those external sites.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">8. Limitation of liability</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              To the maximum extent permitted by law, Visa Case Times and its operators are
              not liable for any indirect, incidental, consequential, or punitive damages
              arising out of your use of the Service, including (without limitation) lost
              profits, lost data, or immigration outcomes. Your sole remedy for any
              dissatisfaction with the Service is to stop using it.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">9. Changes to these terms</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              We may update these Terms periodically. The "Last updated" date at the top
              reflects the most recent change. Continued use of the Service after a change
              constitutes acceptance.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">10. Governing law</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              These Terms are governed by the laws of the State of California, United
              States, without regard to conflict-of-laws rules. Any disputes will be resolved
              in the state or federal courts located in Alameda County, California.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">11. Contact</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Questions: via the Feedback widget on any page, or
              email <strong>hello@visacasetimes.com</strong>.
            </p>

            <p className="text-xs text-muted-foreground mt-10 pt-6 border-t rule">
              See also: <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> ·{" "}
              <Link to="/about" className="text-primary hover:underline">About</Link>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
