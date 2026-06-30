import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/guides/h-1b-processing-times")({
  head: () => ({
    meta: [
      { title: "H-1B Processing Times in 2026 — Complete Guide | Visa Case Times" },
      {
        name: "description",
        content:
          "Current H-1B processing times for cap, change of status, transfer, extension, and amendment cases. Premium processing timelines, RFE trends, and what to expect.",
      },
      {
        name: "keywords",
        content:
          "H-1B processing times, H-1B premium processing, H-1B cap timeline, H-1B transfer, H-1B extension, I-129 H-1B, H-1B 2026, H-1B RFE",
      },
      { property: "og:title", content: "H-1B Processing Times in 2026 — Complete Guide" },
      {
        property: "og:description",
        content:
          "Current H-1B processing times for cap, change of status, transfer, extension, and amendment cases. Premium processing timelines, RFE trends, and what to expect.",
      },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: "2026-06-19" },
      {
        rel: "canonical",
        href: "https://visacasetimes.com/guides/h-1b-processing-times",
      } as any,
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "H-1B Processing Times in 2026 — Complete Guide",
    description:
      "Current H-1B processing times for cap, change of status, transfer, extension, and amendment cases. Premium processing timelines, RFE trends, and what to expect.",
    datePublished: "2026-06-19",
    author: { "@type": "Organization", name: "Visa Case Times" },
    publisher: { "@type": "Organization", name: "Visa Case Times" },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-6 py-12 w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />

        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/guides" className="hover:text-primary">
            Guides
          </Link>
          <span className="mx-2">/</span>
          <span>H-1B Processing Times in 2026</span>
        </nav>

        {/* Article */}
        <article className="prose-content">
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Guide</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              H-1B Processing Times in 2026
            </h1>
            <p className="mt-4 text-lg text-foreground">
              H-1B timelines look simple from the outside — file the petition, wait a few months,
              get the approval — but the actual wait depends on which flavor of H-1B you are
              filing, whether you paid for premium processing, and which adjudication queue your
              file lands in. This guide walks through every common H-1B scenario, what realistic
              processing currently looks like, and the levers that actually move your timeline.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Updated June 19, 2026 · 11 min read
            </p>
          </header>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              What this guide covers
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              This guide focuses on the H-1B specialty occupation classification — petitions
              filed on{" "}
              <Link to="/form/i-129" className="text-primary underline">
                Form I-129
              </Link>{" "}
              with the H Classification Supplement. It covers the standard cap-subject path,
              cap-exempt employers, change-of-status filings, transfers between employers,
              extensions of stay, and amendments triggered by material changes in employment.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              It does not cover dependent H-4 filings (those run on Form I-539, with their own
              queue), the H-2A and H-2B seasonal visas, or H-3 trainees. Those categories share
              the I-129 form for the principal worker but are adjudicated under different
              criteria and timelines.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: "H-1B processing time" is not one number. It is at least six different
              numbers depending on which kind of H-1B petition you are filing.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              H-1B petition types and their realistic timelines
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The H-1B umbrella covers several distinct filing scenarios. Each has its own
              statistical profile because the underlying queue, evidence burden, and policy
              triggers differ.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Cap-subject new H-1B.</strong> The headline path most people picture.
                Employer registers in March, USCIS runs the selection lottery in late March or
                early April, selected employers file the full I-129 between April 1 and June 30,
                and USCIS adjudicates over the following two to six months. Premium processing
                compresses adjudication to fifteen business days.
              </li>
              <li>
                <strong>Change of Status.</strong> Used when the beneficiary is already in the
                U.S. on another nonimmigrant status (often F-1 OPT) and is converting to H-1B.
                Regular processing runs two to six months; premium processing is fifteen business
                days. The beneficiary cannot start working in H-1B status until the change is
                approved and the requested start date arrives.
              </li>
              <li>
                <strong>Cap-exempt H-1B.</strong> Filed by qualifying institutions of higher
                education, related nonprofits, governmental research organizations, and nonprofit
                research organizations. No annual numerical cap and no registration step.
                Petitions can be filed any time of year. Regular processing two to six months;
                premium fifteen business days.
              </li>
              <li>
                <strong>Transfer to a new employer.</strong> A new employer files a fresh I-129
                for a worker already in H-1B status. Under H-1B portability, the beneficiary can
                begin work for the new employer upon USCIS receipt of the new petition — they do
                not need to wait for approval. Regular processing two to six months; premium
                fifteen business days.
              </li>
              <li>
                <strong>Extension of stay.</strong> Same employer, same role, extending H-1B
                status before it expires. Regular processing typically two to five months;
                premium fifteen business days. The 240-day rule lets the worker keep working
                while a timely-filed extension is pending.
              </li>
              <li>
                <strong>Amendment.</strong> Triggered by a material change in employment — a new
                worksite outside the original MSA, a substantial change in duties, or a
                significant change in the terms of employment. Regular processing two to four
                months; premium fifteen business days.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the right benchmark is the timeline for your specific filing type, not
              the cap-season headlines.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Premium processing — what you actually get
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Premium processing is requested by filing Form I-907 alongside (or after) the
              I-129. The current fee is $2,805 for most H-1B filings, and USCIS commits to
              issuing a decision within fifteen business days of receipt of the I-907.
              Importantly, "decision" includes approval, denial, a Request for Evidence (RFE),
              or a Notice of Intent to Deny (NOID) — issuing any of those satisfies the
              fifteen-day clock.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              If USCIS issues an RFE, the premium processing clock pauses. It restarts when the
              evidence response is received, and USCIS then has another fifteen business days to
              issue a final decision. If the agency misses its window for reasons unrelated to
              the file, the premium fee is refunded but adjudication continues.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Premium is available for every H-1B filing type discussed above. It does not
              change the substantive standard of review or the likelihood of approval — it only
              changes the speed at which you get an answer.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: premium buys speed, not approval. An RFE issued on day fourteen still
              counts as USCIS having met its commitment.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Which service center handles your H-1B
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Historically H-1B work was split among the Vermont, California, Nebraska, and
              Texas Service Centers based on the employer's state. USCIS has progressively
              consolidated H-1B adjudication under Service Center Operations (SCOPS), with
              individual centers picking up work as capacity allows. Petitioners cannot choose
              which center receives their file — USCIS routes based on internal workload
              balancing.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              In practical terms, this means processing times can shift if a queue gets
              transferred mid-cycle. A petition filed expecting one center's pace can finish at
              another center's pace if the work is reassigned. Most case management systems
              update the receipt notice if a transfer happens; the underlying receipt date stays
              the same.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: do not over-index on a specific service center's reputation. SCOPS
              balancing means the queue you joined at filing may not be the queue you exit
              from.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Current actual processing times
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The numbers above are typical ranges. For the current published USCIS data for
              your specific filing — broken down by category and service center — see our live
              page for{" "}
              <Link to="/form/i-129" className="text-primary underline">
                Form I-129 processing times
              </Link>
              . That page pulls directly from USCIS and updates monthly.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              As of mid-2026, regular processing for most H-1B classifications runs roughly two
              to six months end-to-end, with significant swings depending on SCOPS workload and
              the specific filing type. Premium processing remains at fifteen business days for
              all eligible H-1B classifications.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For background on how USCIS produces these numbers and what the published range
              actually represents, see our companion guide{" "}
              <Link
                to="/guides/uscis-processing-times-explained"
                className="text-primary underline"
              >
                how USCIS processing times work
              </Link>
              .
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: posted ranges describe recently completed cases, not your case. Use
              them as planning anchors, not promises.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The H-1B cap process — month by month
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For the cap-subject path, the entire cycle from registration to earliest start
              date spans roughly seven months. The dates anchor to the federal fiscal year,
              which begins October 1.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>March.</strong> Electronic registration window opens. Employers submit a
                short electronic registration for each beneficiary they want to sponsor and pay
                a per-registration fee.
              </li>
              <li>
                <strong>Late March / early April.</strong> USCIS runs the selection process.
                Selected registrants are notified through the employer's USCIS online account.
                If the cap is not reached on the first run, USCIS conducts additional selection
                rounds later in the year.
              </li>
              <li>
                <strong>April 1.</strong> Filing window opens for selected registrants.
                Employers can submit the full I-129 petition with all supporting evidence.
              </li>
              <li>
                <strong>April through June.</strong> The bulk of cap petitions are filed.
                Premium processing requests are common in this window because employers want
                certainty before October.
              </li>
              <li>
                <strong>June 30.</strong> Standard end of the filing window for the initial
                selection (USCIS gives selected registrants at least 90 days to file).
              </li>
              <li>
                <strong>June through September.</strong> USCIS adjudicates. Regular processing
                files trickle through; premium files get their fifteen-business-day commitment.
              </li>
              <li>
                <strong>October 1.</strong> Earliest possible employment start date for cap
                H-1Bs. Workers cannot begin in H-1B status before this date even if their
                petition was approved earlier.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the cap timeline is calendar-bound. The fastest cap-subject worker
              still cannot begin H-1B employment before October 1.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              What can delay your H-1B
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Several specific events can stretch an H-1B beyond the published range. Most are
              not random — they correlate with the structure of the underlying employment.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Request for Evidence (RFE).</strong> The single most common delay.
                Adds anywhere from a few weeks to several months depending on response time and
                re-adjudication.
              </li>
              <li>
                <strong>FDNS site visit.</strong> The Fraud Detection and National Security
                directorate may visit the listed worksite to verify the petition's claims. This
                does not always delay adjudication, but it can.
              </li>
              <li>
                <strong>Fraud investigation or referral.</strong> If something on the petition
                triggers an FDNS review, the case can sit pending for months while the
                investigation completes.
              </li>
              <li>
                <strong>Background check delays.</strong> The beneficiary's record needs to
                clear standard checks. A name shared with a flagged individual or an
                inconsistent biographic record can hold the file.
              </li>
              <li>
                <strong>Filing errors.</strong> Wrong edition of a form, missing signatures, or
                an outdated Labor Condition Application can trigger an RFE or a rejection.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: most delays are addressable upstream. A clean filing with strong
              evidence is the single best timeline lever.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Common H-1B RFE topics
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              When USCIS issues an RFE on an H-1B, the topic is rarely surprising. A handful of
              issues account for most of the volume.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Specialty occupation.</strong> USCIS questions whether the role truly
                requires a specific bachelor's-or-higher degree in a specialized field. Common
                for generalist tech titles and roles where the Department of Labor's O*NET
                description lists multiple acceptable backgrounds.
              </li>
              <li>
                <strong>Beneficiary qualifications.</strong> USCIS asks whether the
                beneficiary's degree actually matches the field claimed for the role. Foreign
                degree equivalency evaluations and transcripts get scrutinized closely.
              </li>
              <li>
                <strong>Employer-employee relationship.</strong> Most common in third-party
                placements (the petitioner is a staffing or consulting firm placing the worker
                at a client site). USCIS wants to see that the petitioner retains the right to
                control the work — itineraries, end-client letters, and statements of work are
                typical evidence.
              </li>
              <li>
                <strong>Wage level.</strong> USCIS may question whether the wage on the LCA
                accurately reflects the role's complexity. A Level I wage paired with senior
                duties is a frequent trigger.
              </li>
              <li>
                <strong>Availability of specialty occupation work.</strong> For consulting
                placements, USCIS wants to see contracts or end-client letters confirming there
                is enough specialty occupation work for the entire requested validity period.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: most RFE topics are predictable. A petition built with the likely RFE
              in mind avoids the round trip entirely.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Cap-exempt H-1B
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Cap-exempt H-1Bs are filed by qualifying institutions of higher education, their
              related or affiliated nonprofit entities, nonprofit research organizations, and
              governmental research organizations. They are also available to beneficiaries who
              will be employed at a qualifying institution even when the petitioner is not
              itself cap-exempt.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Cap-exempt filings skip the March registration step entirely and are not subject
              to the annual numerical cap. Petitions can be filed any time of year, and the
              beneficiary can begin work as soon as the petition is approved (for change of
              status filings) or admitted into the U.S. on H-1B status (for consular processing
              filings).
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Fees are the same as the cap-subject path minus the per-registration fee. Regular
              processing runs two to six months; premium processing remains fifteen business
              days.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: if a qualifying employer is willing to sponsor you, cap-exempt is the
              fastest reliable path into H-1B status outside the cap cycle.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Extensions beyond the six-year limit (AC21 §104 and §106)
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              H-1B status is generally capped at six years total. The American Competitiveness
              in the Twenty-First Century Act of 2000 (AC21) created two pathways for
              extensions beyond that limit, both tied to the worker's pending green card
              process.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>§106 (one-year extensions).</strong> A worker is eligible for one-year
              extensions beyond six years if a labor certification application (PERM) or
              Form I-140 has been pending for 365 days or more. The extensions can be granted
              in one-year increments until the underlying case is adjudicated.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>§104(c) (three-year extensions).</strong> A worker is eligible for
              three-year extensions beyond six years if they have an approved I-140 in an
              employment-based category and a final-action visa number is not yet available
              under the State Department's Visa Bulletin. This is the path most commonly used
              by Indian and Chinese nationals in EB-2 and EB-3, who often spend many years in
              H-1B extensions while waiting for priority dates to become current.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For background on the underlying green card categories, see our guide on{" "}
              <Link to="/guides/eb-2-vs-eb-3" className="text-primary underline">
                EB-2 vs EB-3
              </Link>
              .
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the six-year limit is the default, not the ceiling. For workers in
              backlogged green card categories, AC21 extensions are routine.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              H-1B portability — changing employers
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              One of the most useful provisions of AC21 is H-1B portability. A worker already
              in valid H-1B status can begin work for a new employer as soon as USCIS receives
              a non-frivolous new I-129 petition from that employer. They do not need to wait
              for the petition to be approved.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The receipt notice from USCIS is the trigger — once the new petition has a
              receipt date, the worker can start. If the new petition is later denied, the
              worker loses H-1B status, but the period of authorized work between filing and
              denial is not retroactively unauthorized.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Importantly, transferring employers does not consume a new H-1B cap number, and
              the worker carries forward their existing priority date if an I-140 was approved
              under the prior employer. Fees are the same as a regular new H-1B filing on
              I-129, including the Asylum Program Fee where applicable.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the receipt notice unlocks employment with the new employer. Approval
              is a separate, later event.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              What happens if your H-1B is denied
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              H-1B denials usually follow one of a small number of patterns: an RFE response
              that did not overcome the cited concern, a finding of fraud or willful
              misrepresentation, or a status violation by the beneficiary that disqualifies a
              change of status.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Once issued, the formal appeal options are limited. The petitioner can file a
              motion to reopen (based on new facts) or a motion to reconsider (arguing the
              decision was legally wrong) with USCIS, or pursue an appeal to the Administrative
              Appeals Office (AAO). All three are slow and most are unsuccessful — the AAO
              affirms USCIS denials in the large majority of H-1B appeals.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              In practice, the more productive path after a denial is often to refile a new
              I-129 with the substantive issues addressed. For cap-subject denials, this means
              waiting for the next registration cycle. For non-cap filings, a refile can happen
              immediately.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: most denials are practically final. Refiling with a stronger record
              usually beats appealing.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              H-1B vs O-1, L-1, and E-3
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The H-1B is not the only specialty work visa. Three alternatives come up
              regularly when the cap is a problem or when the beneficiary's profile fits
              better elsewhere.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>O-1.</strong> For individuals with extraordinary ability in the
                sciences, arts, education, business, or athletics. No annual cap. Evidence
                burden is higher — typically requires meeting multiple regulatory criteria
                such as awards, original contributions, media coverage, or critical roles.
                Premium processing available.
              </li>
              <li>
                <strong>L-1.</strong> For intracompany transferees moving from a foreign
                affiliate to a U.S. office in a managerial, executive, or specialized
                knowledge role. Requires one year of qualifying employment abroad in the past
                three years. No cap, premium available.
              </li>
              <li>
                <strong>E-3.</strong> Reserved for Australian nationals in specialty
                occupations. Functionally similar to H-1B but with its own separate annual
                cap that has historically never been reached. Processed at consulates abroad
                or through change of status.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: if the H-1B cap is a recurring obstacle, the alternatives are worth a
              careful look — each has a narrower profile but no annual lottery.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              2026-specific notes
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Several rule changes from the past two years materially shape what filing an
              H-1B looks like today.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>Fee rule, April 2024.</strong> The base I-129 H-1B filing fee increased
              to $780. Most employers also pay an additional $600 Asylum Program Fee
              (reduced for small employers and waived for some nonprofits). The premium
              processing fee, separately adjusted, currently stands at $2,805. These are in
              addition to the ACWIA training fee, the fraud prevention and detection fee for
              initial filings and changes of employer, and any per-beneficiary registration
              fee for cap cases.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>Beneficiary-centric registration, effective FY2025 cycle.</strong> USCIS
              restructured the cap selection so that each unique beneficiary is entered into
              the lottery once regardless of how many employers register them. This eliminated
              the prior dynamic where a single beneficiary's odds scaled with the number of
              sponsoring employers and is generally credited with making cap selection rates
              more predictable.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>New I-129 edition.</strong> USCIS issued a new edition of Form I-129
              alongside the fee rule. Earlier editions are no longer accepted; filings on the
              wrong edition will be rejected at intake, which costs weeks. Always confirm the
              current edition date on USCIS.gov before filing.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              If your filing is sitting outside the published range and you are wondering
              what to do next, our guide on{" "}
              <Link
                to="/guides/what-to-do-if-case-delayed"
                className="text-primary underline"
              >
                what to do if your USCIS case is delayed
              </Link>{" "}
              walks through the escalation ladder.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the form, the fees, and the lottery mechanics have all changed
              recently. Old playbooks need re-checking before each filing cycle.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 border-t rule pt-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This article is for general informational purposes
              only and does not constitute legal advice. Immigration law is complex and
              fact-specific, and H-1B adjudication in particular turns on details unique to
              each petition. For guidance on your individual case, consult a licensed
              immigration attorney. Fees, form editions, and processing times change over
              time — always confirm current figures with USCIS.gov and the current{" "}
              <a
                href="https://egov.uscis.gov/processing-times"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                USCIS Processing Times tool
              </a>{" "}
              before making decisions.
            </p>
          </section>

          {/* Related guides at bottom */}
          <section className="mt-16 border-t rule pt-8">
            <h2 className="display text-xl text-primary mb-4">Related guides</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/guides/uscis-processing-times-explained"
                  className="text-primary hover:underline"
                >
                  How USCIS processing times work
                </Link>
              </li>
              <li>
                <Link
                  to="/guides/what-to-do-if-case-delayed"
                  className="text-primary hover:underline"
                >
                  What to do if your USCIS case is delayed
                </Link>
              </li>
              <li>
                <Link to="/guides/eb-2-vs-eb-3" className="text-primary hover:underline">
                  EB-2 vs EB-3 — choosing the right green card category
                </Link>
              </li>
            </ul>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
