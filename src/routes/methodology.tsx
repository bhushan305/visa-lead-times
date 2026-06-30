import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology — How We Collect & Display USCIS Data | Visa Case Times" },
      {
        name: "description",
        content:
          "Transparent documentation of how Visa Case Times collects USCIS processing-time data, aggregates it, and presents it. Sources, cadence, limitations, and revision history.",
      },
      { rel: "canonical", href: "https://visacasetimes.com/methodology" } as any,
    ],
  }),
  component: MethodologyPage,
});

function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-6 py-12 w-full">
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>Methodology</span>
        </nav>

        <article>
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Methodology</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              How we collect, store, and display USCIS data
            </h1>
            <p className="mt-4 text-lg text-foreground">
              Transparent documentation of every step from USCIS publication to your screen.
              If you spot an error or want to know more about a specific calculation, the
              Feedback widget at the bottom-left of any page goes directly to us.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">Last updated: June 19, 2026</p>
          </header>

          <section>
            <h2 className="display text-2xl text-primary mt-10 mb-3">1. Data sources</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Every number you see on Visa Case Times comes from one of two USCIS-published
              sources:
            </p>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Current ranges + case inquiry dates</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              We collect from USCIS's official <a className="text-primary hover:underline" href="https://egov.uscis.gov/processing-times/" target="_blank" rel="noopener">Processing Times tool</a> at <code>egov.uscis.gov/processing-times</code>. For each combination of form, category, and service center or field office that USCIS publishes a number for, we capture:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>The published processing-time range (e.g., "9 Months to 14 Months")</li>
              <li>The case inquiry date (the receipt date below which USCIS will accept service requests)</li>
              <li>The publication date of that snapshot</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              USCIS's methodology for the published range is documented on their site. In
              short: the range represents the time it took to complete 50% (low end) to 80%
              (high end) of cases of that type at that office over the previous six months.
              See our <Link to="/guides/uscis-processing-times-explained" className="text-primary hover:underline">processing-times explainer</Link> for the
              full story.
            </p>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Historic fiscal-year averages</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For the long-term trend lines on each case page, we use USCIS's{" "}
              <a className="text-primary hover:underline" href="https://egov.uscis.gov/processing-times/historic-pt" target="_blank" rel="noopener">Historic Processing Times</a> page.
              This source publishes the median processing time for each form and (where
              applicable) category, for each completed fiscal year (FY2014 onward), plus the
              current fiscal-year-to-date. We seed our historic table from this source and
              re-pull it periodically as USCIS updates older records.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">2. Collection cadence</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              We scrape the current Processing Times tool once per weekday at approximately
              9:00 AM Pacific Time. Each run captures every form-category-office combination
              currently published (approximately 500 rows). Snapshots are stored
              append-only — we never overwrite or delete a historical record.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The USCIS site uses anti-bot protection, so scrapes occasionally fail. When a
              day is missed, we don't backfill — the snapshot for that day simply doesn't
              exist. The chart honors gaps as gaps rather than interpolating across missing
              dates.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">3. How we aggregate</h2>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Daily snapshots</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For each (case, day) pair, we store the published range as a lo / hi pair of
              months (parsing "9 Months to 14 Months" into <code>lo=9, hi=14</code>). The
              daily line on the chart plots the midpoint of that range; the shaded band
              shows the lo-to-hi span.
            </p>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Weekly averages</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For days older than 30, we bucket daily snapshots into ISO calendar weeks
              (Monday-anchored). Each weekly bar shows the simple mean of all daily lo
              values and the simple mean of all daily hi values for that week. We use
              ISO week numbering so weeks are stable across year boundaries.
            </p>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Fiscal-year markers</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Diamond markers on the chart plot USCIS's own published fiscal-year medians
              (we do not derive these from our daily scrapes). USCIS occasionally restates
              past years — when they do, our re-pull picks up the new value.
            </p>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">National medians on form pages</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              On a form page (e.g., <Link to="/form/n-400" className="text-primary hover:underline">/form/n-400</Link>),
              the "National median" shown for each category is the median of the per-office
              published ranges across all offices that handle that category. This is our
              calculation, not USCIS's — USCIS publishes per-office numbers, not a national
              roll-up. We use median (not mean) so a single outlier office doesn't skew the
              top-line number.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">4. Classification matching</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              USCIS's Historic Processing Times page categorizes some forms by classification
              (e.g., I-129 by "Premium Filed" vs "Non-Premium Filed"; I-485 by employment vs
              family vs asylum). On a given case page, we choose the historic classification
              that best matches the case's current category text via word-overlap scoring,
              with a known-good bias toward "non-Premium" for I-129 visa types where the
              regular processing-time history is more representative than premium.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">5. Slug structure (URLs)</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Each case page URL follows the pattern{" "}
              <code>/case/{"<form>-<category-slug>-<office-slug>"}</code>. Slugs are
              generated by lowercasing, stripping USCIS internal codes, applying common
              office abbreviations (SCOPS, NBC, CSC, TSC, VSC, NSC), and joining with
              hyphens. Multiple naming conventions across USCIS data revisions are merged
              to one slug per real case, so a single case has exactly one URL even if USCIS
              has renamed it over time.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">6. Visa-name search</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Users search by visa names (H-1B, E-2, EB-2, B1/B2, etc.) but USCIS publishes
              by form number. We maintain a translation map (≈150 visa names → relevant
              USCIS forms) so a search for "EB-2" surfaces I-140 and I-485 results without
              the user needing to know the form numbers. The map is open-ended — when a
              search returns zero results, we log the term and add it to the map.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">7. Known limitations</h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li><strong>USCIS doesn't publish everything.</strong> Some case types have no public processing-time data — we can only show what USCIS publishes.</li>
              <li><strong>The published range is statistical, not predictive.</strong> Your specific case may resolve faster or slower than the displayed range.</li>
              <li><strong>USCIS occasionally changes how it categorizes data.</strong> A category that was tracked as "Standard" one month may move to a new sub-bucket the next. We pick up the new categorization on the next scrape but historic continuity may break.</li>
              <li><strong>Scrape failures cause gaps.</strong> When a scheduled run fails, we don't backfill. Gaps appear honestly in the chart.</li>
              <li><strong>Time zones.</strong> USCIS publishes in Eastern. Our daily run is anchored to Pacific time. The "date" of a snapshot is the Pacific date when we captured it.</li>
              <li><strong>National median on form pages is a computed roll-up</strong>, not USCIS-published. It's there to make the form page useful when a form has many offices; for the authoritative per-office number, click into the specific office.</li>
            </ul>

            <h2 className="display text-2xl text-primary mt-10 mb-3">8. Storage and reproducibility</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              All snapshots are stored in a Postgres database (Supabase). Every record
              carries the run date, the case identifier, the published display string, and
              parsed lo/hi numbers. Because we store the raw display string alongside the
              parsed numbers, any future parsing change can be re-applied to historical data
              without re-scraping USCIS.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">9. Updates to this methodology</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              We document material methodology changes here with the date of change. If we
              change how a metric is calculated, we'll update the "Last updated" date and
              add a note explaining what changed. We don't quietly restate past calculations.
            </p>

            <h2 className="display text-2xl text-primary mt-10 mb-3">Change history</h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li><strong>2026-06-19:</strong> Initial published methodology page.</li>
            </ul>

            <p className="text-xs text-muted-foreground mt-10 pt-6 border-t rule">
              See also: <Link to="/about" className="text-primary hover:underline">About</Link> ·{" "}
              <Link to="/guides/uscis-processing-times-explained" className="text-primary hover:underline">How USCIS processing times work</Link> ·{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy</Link>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
