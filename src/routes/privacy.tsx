import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Visa Case Times" },
      {
        name: "description",
        content:
          "How Visa Case Times collects, uses, and protects visitor data. Plain-English explanation of our analytics, feedback, and advertising practices.",
      },
      { rel: "canonical", href: "https://visacasetimes.com/privacy" } as any,
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-6 py-12 w-full">
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>Privacy Policy</span>
        </nav>

        <article>
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Legal</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              Privacy Policy
            </h1>
            <p className="mt-3 text-xs text-muted-foreground">Last updated: June 19, 2026</p>
          </header>

          <section>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Visa Case Times ("we", "our", "the Service") respects your privacy. This page
              explains what data we collect, why we collect it, and how you can control it.
              We aim to collect as little as possible.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Who we are</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Visa Case Times is an independent USCIS processing-time tracker operated at
              <a className="text-primary hover:underline" href="https://visacasetimes.com">visacasetimes.com</a> and
              <a className="text-primary hover:underline" href="https://usciscasetimes.com"> usciscasetimes.com</a>.
              We are not affiliated with USCIS, the Department of Homeland Security, or any
              government agency. All processing-time figures on the Service come from USCIS's
              official Processing Times tool.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Data we collect</h2>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">1. Automatically — when you visit</h3>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>A randomly-generated visitor ID stored in a first-party cookie (<code>vlt_uid</code>) that lasts up to 180 days. This is a UUID — it is not your name, email, or IP address.</li>
              <li>A short-lived per-tab session ID stored in browser <code>sessionStorage</code>.</li>
              <li>Pages you view, links/buttons you click, the search terms you type into our search box, the host you arrived on, the referrer (if any), and your user-agent string.</li>
              <li>For Core Web Vitals reporting only, a coarse load-time number.</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              We use these signals to understand which pages are useful, fix bugs, and improve
              the site. We do not sell this data.
            </p>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">2. Voluntarily — when you submit feedback</h3>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>Your email address (required).</li>
              <li>Your name (optional).</li>
              <li>The message text you submit.</li>
              <li>The page you submitted from.</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              We use this to read, respond to, and act on your feedback. We do not add you to
              any mailing list. We do not share your email with third parties.
            </p>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">3. Through advertising partners</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              We display ads through Google AdSense and may add other ad networks over time.
              These networks may set their own cookies and use device identifiers to show ads.
              Their data practices are governed by their own policies. You can opt out of
              personalized advertising via{" "}
              <a className="text-primary hover:underline" href="https://www.youradchoices.com/" target="_blank" rel="noopener">YourAdChoices</a> or{" "}
              <a className="text-primary hover:underline" href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ad Settings</a>.
              Google's own privacy policy is at{" "}
              <a className="text-primary hover:underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">What we don't collect</h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>We do not ask for your USCIS receipt number, A-number, date of birth, country of birth, or any other case-specific information.</li>
              <li>We do not require an account or login.</li>
              <li>We do not store your IP address in any of our databases.</li>
              <li>We do not collect data about your case from USCIS on your behalf.</li>
            </ul>

            <h2 className="display text-2xl text-primary mt-10 mb-3">How long we keep data</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Analytics records (page views, clicks, searches) are retained indefinitely in
              aggregate form for trend analysis. Individual feedback submissions are retained
              until we respond and then archived. You can request deletion of your feedback
              submission at any time (see "Your rights" below).
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Where data is stored</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Our analytics, feedback, and operational data are stored in a Supabase
              PostgreSQL database hosted in the United States. Our site is delivered via
              Vercel's edge network. Both providers maintain industry-standard security
              practices including encryption in transit and at rest.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Cookies we use</h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li><code>vlt_uid</code> — first-party, 180 days. A random UUID to count unique visitors and prevent duplicate analytics events.</li>
              <li><code>vlt_last_case</code> — first-party, 30 days. Remembers the last case page you visited so we can surface it on the home page for quick re-access.</li>
              <li>Cookies set by Google AdSense and other ad partners — see their own privacy policies for details.</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              You can clear or block cookies in your browser settings. If you block our
              first-party cookies, the site still works — you'll just be counted as a new
              visitor on each return.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Your rights</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Depending on your jurisdiction, you may have rights including:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li><strong>Access:</strong> Request a copy of the data we hold about your feedback submission.</li>
              <li><strong>Deletion:</strong> Request that we delete your feedback record.</li>
              <li><strong>Correction:</strong> Request that we correct inaccurate information in your feedback submission.</li>
              <li><strong>Opt-out of analytics:</strong> Block our cookies, or use your browser's "Do Not Track" setting (which we honor for first-party analytics).</li>
              <li><strong>Opt-out of personalized ads:</strong> Use the links in the "Through advertising partners" section above.</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              To exercise any of these rights, send a request via the Feedback widget (bottom-left of any page) or email us at <strong>privacy@visacasetimes.com</strong>.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Children</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The Service is not directed at children under 13. We do not knowingly collect
              data from children under 13. If you believe a child has submitted data, contact
              us and we will delete it.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Changes to this policy</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              We may update this Privacy Policy periodically. The "Last updated" date at the
              top reflects the most recent change. Significant changes will be highlighted in
              a banner on the homepage for at least 30 days.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Contact</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Questions about this policy or our data practices: <strong>privacy@visacasetimes.com</strong>
              {" "}or via the Feedback widget on any page.
            </p>

            <p className="text-xs text-muted-foreground mt-10 pt-6 border-t rule">
              See also: <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> ·{" "}
              <Link to="/about" className="text-primary hover:underline">About</Link>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
