import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/guides/eb-2-vs-eb-3")({
  head: () => ({
    meta: [
      { title: "EB-2 vs EB-3 — Which Employment Green Card is Faster? | Visa Case Times" },
      {
        name: "description",
        content:
          "Side-by-side comparison of EB-2 and EB-3 employment-based green card categories, including processing times, eligibility, priority dates, and downgrading strategy.",
      },
      {
        name: "keywords",
        content:
          "EB-2 vs EB-3, EB-3 downgrade, EB-2 NIW, priority date, visa bulletin, employment based green card, PERM, I-140, I-485",
      },
      { property: "og:title", content: "EB-2 vs EB-3 — Which Employment Green Card is Faster?" },
      {
        property: "og:description",
        content:
          "Side-by-side comparison of EB-2 and EB-3 employment-based green card categories, including processing times, eligibility, priority dates, and downgrading strategy.",
      },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: "2026-06-19" },
      {
        rel: "canonical",
        href: "https://visacasetimes.com/guides/eb-2-vs-eb-3",
      } as any,
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "EB-2 vs EB-3 — Which Employment Green Card is Faster?",
    description:
      "Side-by-side comparison of EB-2 and EB-3 employment-based green card categories, including processing times, eligibility, priority dates, and downgrading strategy.",
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
          <span>EB-2 vs EB-3</span>
        </nav>

        {/* Article */}
        <article className="prose-content">
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Guide</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              EB-2 vs EB-3 — Which Employment Green Card is Faster?
            </h1>
            <p className="mt-4 text-lg text-foreground">
              On paper, EB-2 is the "higher" employment-based preference category and should
              move faster than EB-3. In practice — for the two countries where this question
              matters most, India and China — the relative speed of the two categories has
              swapped multiple times in the past decade, and choosing the wrong one can add
              years to a green-card timeline. Here is how the categories actually differ, and
              when each one is the faster path.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Updated June 19, 2026 · 9 min read
            </p>
          </header>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The quick answer
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For most countries of birth, EB-2 is faster than EB-3, and in many months both
              categories are simply "current" — meaning a green card is available as soon as
              USCIS finishes processing the petition. If you were born in Canada, the United
              Kingdom, Germany, Brazil, Nigeria, or essentially anywhere outside the four
              backlogged countries, EB-2 is almost always the right answer when you qualify.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For India and China, the answer is genuinely "it depends on what the Visa
              Bulletin is doing this month." EB-2 India and EB-3 India have swapped positions
              more than once in the last several years. The same has happened — less
              dramatically — for EB-2 China and EB-3 China. Picking the right category requires
              watching the monthly Department of State Visa Bulletin and being willing to file
              a second I-140 if the lanes shift.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: outside the backlogged countries, file EB-2 if you qualify. For India
              and China, the bulletin tells you which lane is moving — and that can change
              from month to month.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Who qualifies for EB-2
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              EB-2 is the second-preference employment-based category. It is reserved for
              workers with advanced degrees or exceptional ability, and it contains three
              distinct sub-paths.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              EB-2 (Advanced Degree)
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The most common EB-2 path. The job offered must require an advanced degree
              (master's or higher), and you must hold that degree or its equivalent. USCIS
              treats a U.S. bachelor's degree plus five years of progressive post-baccalaureate
              experience in the specialty as the equivalent of a master's degree. The
              "progressive" language matters — the experience must show advancing
              responsibility, not five years of the same junior-level role.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              EB-2 (Exceptional Ability)
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For people with a documented degree of expertise significantly above the
              ordinary in the sciences, arts, or business. Petitioners must satisfy at least
              three of six regulatory criteria (degrees, ten years of experience, professional
              license, salary evidence, professional-association membership, recognition of
              achievements). This path still requires a job offer and PERM labor certification
              unless combined with the National Interest Waiver.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              EB-2 National Interest Waiver (NIW)
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The NIW is a self-petition path: no employer sponsorship and no PERM labor
              certification required. To qualify, the petitioner must meet the three-prong
              test established by the Administrative Appeals Office in Matter of Dhanasar
              (2016). The petitioner must show that the proposed endeavor has substantial
              merit and national importance, that they are well positioned to advance it, and
              that on balance it would be beneficial to the United States to waive the job
              offer and PERM requirements. NIW has become a significant pathway for STEM
              researchers, founders, and physicians working in underserved areas.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Who qualifies for EB-3
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              EB-3 is the third-preference employment-based category. It is broader than EB-2
              and is split into three sub-categories that share the same annual visa pool
              but differ sharply in how they get treated by the Visa Bulletin.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              EB-3 (Skilled Worker)
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For jobs that require at least two years of training or work experience. The
              "two years" must be a real requirement of the role as established in the PERM
              labor certification, not just something the worker happens to have. A typical
              EB-3 skilled-worker job description names a specific occupation with two years
              of in-field experience.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              EB-3 (Professional)
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For positions that require a U.S. bachelor's degree or foreign equivalent as a
              minimum entry requirement. This is the category most often used for workers who
              hold only a bachelor's degree (no master's, no five years of progressive
              experience), and whose job role does not require anything more.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              EB-3 (Other Workers, "Unskilled")
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For positions requiring less than two years of training or experience. This
              sub-category is severely backlogged for every country of birth — the annual cap
              is 10,000 visas worldwide before any per-country limits — and waits stretch
              well past a decade even for chargeability areas that are otherwise current.
              Other Workers is a category of last resort.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The Visa Bulletin and priority dates
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The Department of State publishes a Visa Bulletin every month that sets out
              which priority dates are eligible to move forward in each preference category
              and chargeability area. Your priority date is the day your employer's PERM
              labor certification was filed with the Department of Labor — or, in cases
              without PERM (such as the NIW), the day the I-140 was filed.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The bulletin contains two charts per category. The <strong>Final Action
              Date</strong> is the cutoff USCIS uses to actually approve adjustment of status
              or issue an immigrant visa. The <strong>Date for Filing</strong> is an earlier
              cutoff that, when USCIS chooses to honor it in a given month, allows applicants
              to file Form I-485 and get the ancillary benefits (work and travel authorization)
              while waiting for their final action date to become current.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Each month USCIS announces, on its own webpage, whether it will accept Dates
              for Filing or only Final Action Dates that month. The announcement comes a few
              days after the bulletin itself is published. Always check the USCIS chart
              selection — not just the bulletin — before assuming you can file.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Country of birth, not citizenship
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Visa Bulletin allocations are based on country of birth, not country of
              citizenship. A Canadian citizen who was born in India is charged to India for
              Visa Bulletin purposes, with all the wait that implies. A naturalized U.S.
              citizen's foreign-born spouse is charged to their country of birth.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Per-country caps limit any single chargeability area to roughly 7% of the total
              employment-based numbers issued each year. With India and China responsible for
              a disproportionate share of skilled-worker filings, demand has run ahead of the
              7% cap for years, which is why the backlogs persist. Mexico and the Philippines
              face similar caps but with lower demand in the employment categories — their
              waits are typically much shorter than India or China for EB-2 and EB-3.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              One important workaround: <strong>cross-chargeability</strong>. If the principal
              beneficiary's spouse was born in a different country with a faster cutoff date,
              the family can be charged to the spouse's country. This is a meaningful
              planning lever for India- or China-born applicants married to someone born
              elsewhere, and worth raising with an attorney before filing I-485.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Why EB-3 sometimes moves faster than EB-2 (India and China)
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The annual EB-2 and EB-3 visa pools are roughly the same size — about 40,000
              visas each before per-country caps and "spillover" from unused EB-1 and
              family-based numbers. Because the pools are similar in size, the relative
              speed of EB-2 versus EB-3 for a given country depends almost entirely on the
              relative demand in each category from that country in any given period.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For India, EB-3 priority dates have at multiple points in recent history moved
              ahead of EB-2 priority dates. In the 2020 to 2022 window, EB-3 India was
              meaningfully more current than EB-2 India for an extended stretch, driving a
              wave of EB-3 "downgrades" (covered below). EB-2 India then recovered ground.
              The Department of State's Charlie Oppenheim and the AILA Visa Bulletin tracking
              are the most-cited sources for monthly movement projections; both make clear
              that these dynamics shift with demand patterns and EB-1 spillover.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The lesson is structural, not predictive: when one category fills up faster
              than the other from a backlogged country, the other category's cutoff date
              moves forward more quickly. Applicants benefit by being in the less-demanded
              lane.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the historical pattern is that EB-2 India and EB-3 India swap
              periodically. Past movement is not a forecast of the future, but it does
              explain why the "downgrade" question keeps coming up.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Downgrading from EB-2 to EB-3 (and the reverse)
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              If your EB-2 priority date is stuck and EB-3 in your country is moving faster,
              you can file a second{" "}
              <Link to="/form/i-140" className="text-primary underline">
                Form I-140
              </Link>{" "}
              under EB-3 using the same approved PERM labor certification. The new I-140
              keeps the original priority date from the PERM filing, so you do not lose
              years of accrued wait. This is what practitioners mean by an "EB-3 downgrade."
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Mechanically, the steps are:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                Confirm the underlying PERM actually qualifies the job under EB-3 standards
                — a PERM written for a master's-required role may not cleanly support an
                EB-3 professional filing without scrutiny.
              </li>
              <li>
                File a new I-140 with the EB-3 box checked, attaching the original certified
                PERM (ETA Form 9089) and a copy of the approved EB-2 I-140 receipt or
                approval.
              </li>
              <li>
                If EB-3 is current under the relevant chart, file (or refile) Form I-485
                concurrently or shortly after.
              </li>
              <li>
                Keep the original EB-2 I-140 in place. Most attorneys advise leaving it
                approved as insurance in case EB-2 becomes the faster lane again.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The reverse — moving from EB-3 to EB-2 — works the same way if the worker now
              qualifies for EB-2 (for example, they have since earned a master's degree, or
              accumulated the five years of progressive post-bachelor's experience) and the
              underlying job description supports the higher category. A new PERM may be
              required if the original PERM does not match EB-2 standards.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              PERM labor certification timeline
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For both EB-2 (other than NIW) and EB-3, the green-card process begins at the
              Department of Labor with PERM labor certification — proof that no qualified
              U.S. worker is available for the role at the prevailing wage. PERM has its own
              multi-step timeline that runs entirely before USCIS touches the case.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              First, the employer files a prevailing wage determination request with the
              DOL's National Prevailing Wage Center. That request alone has averaged
              roughly six months in recent processing reports. Once the wage is set, the
              employer runs a mandatory recruitment campaign (job postings, newspaper ads,
              internal posting) over a thirty-day window plus a thirty-day quiet period.
              Then the actual ETA Form 9089 is filed with DOL.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              DOL processing of the certified ETA 9089 has, as of recent DOL postings,
              been running in the fourteen-to-eighteen-month range for non-audited cases.
              If the case is selected for audit — either at random or because of specific
              flags — add six months or more. Audited cases pull supporting documentation
              and can sometimes prompt supervised recruitment, which restarts much of the
              effort.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              I-140 processing timeline
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Once PERM is certified, the employer files Form I-140 with USCIS. Regular
              processing varies by service center and by category; you can check the live
              numbers on our{" "}
              <Link to="/form/i-140" className="text-primary underline">
                I-140 processing times page
              </Link>
              . Premium processing is available for most EB-1, EB-2, and EB-3 I-140 filings,
              which guarantees USCIS action within fifteen business days for a fee that was
              set at $2,805 in the 2024 USCIS fee rule.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              "Action" in premium processing means an approval, a denial, a request for
              evidence, or a notice of intent to deny — not necessarily an approval. If
              USCIS issues an RFE, the fifteen-business-day clock resets when the response
              is received. Premium processing is widely used for I-140s today because the
              cost is modest relative to the planning value of knowing the case is
              approved.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              I-485 adjustment of status
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              When the priority date is current under the applicable chart, the beneficiary
              and any derivatives (spouse and unmarried children under 21) can file{" "}
              <Link to="/form/i-485" className="text-primary underline">
                Form I-485
              </Link>
              , Application to Register Permanent Residence or Adjust Status. For
              employment-based cases that allow concurrent filing under the Dates for
              Filing chart, the I-485 can sometimes go in with the I-140 or shortly after,
              long before the final action date is current.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              I-485 processing times vary dramatically by field office and by employment
              category. Our live processing times for I-485 are tracked at our{" "}
              <Link to="/form/i-485" className="text-primary underline">
                I-485 page
              </Link>
              . An I-485 filing also opens access to a combined Employment Authorization
              Document and Advance Parole travel document under Form I-765/I-131, which
              many filers use to bridge the wait.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Realistic total timelines
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The "total" timeline from initial PERM filing to green card in hand depends
              overwhelmingly on country of birth. Here are three illustrative scenarios
              based on recent Visa Bulletin movement and current USCIS / DOL processing
              postings.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Mexican-born EB-2 (Master's degree).</strong> Roughly two to three
                years total. PERM runs eighteen-to-twenty-four months including prevailing
                wage; I-140 with premium processing closes in weeks; I-485 lands as soon as
                the category is current, which for Mexico EB-2 has been current or close
                to current most months.
              </li>
              <li>
                <strong>Chinese-born EB-2 (PhD).</strong> Roughly five to eight years total.
                The same PERM and I-140 timelines apply, then the wait for EB-2 China
                final action date to reach the priority date accounts for most of the
                elapsed time. NIW can shorten the front end (no PERM) but does not change
                the bulletin wait.
              </li>
              <li>
                <strong>Indian-born EB-2 (Bachelor's + five years progressive
                experience).</strong> Currently estimated by AILA and practitioner trackers
                at roughly ten to twenty years from PERM filing to green card, depending on
                where the EB-2 India final action date sits when the I-140 is approved.
              </li>
              <li>
                <strong>Indian-born EB-3 (Professional).</strong> Often comparable to EB-2
                India in expected total time. In periods when EB-3 India runs ahead, the
                downgrade can shave years off; in periods when EB-2 India runs ahead, the
                EB-3 lane is slower.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              None of these are quotes. Visa Bulletin movement is genuinely unpredictable
              over multi-year horizons, and the only reliable approach is to check the
              current bulletin and consult counsel before making major life decisions
              around any specific timeline.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The NIW alternative
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For workers whose underlying endeavor has independent national importance —
              STEM researchers, founders building technology with public benefit,
              physicians serving underserved populations, certain entrepreneurs — the
              National Interest Waiver is worth a hard look. NIW removes the PERM step
              entirely, which alone saves eighteen to twenty-four months, and removes the
              employer-sponsorship dependency, which gives the worker portability that
              EB-2 (Advanced Degree) and EB-3 do not provide.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              NIW still uses the EB-2 visa pool. It does nothing to shorten the Visa
              Bulletin wait for India- and China-born applicants. But it can be a
              meaningful accelerator for everyone else, and a structural advantage for
              applicants who want to leave their sponsor without losing their place in
              line. USCIS has published an NIW policy update grounded in Matter of
              Dhanasar; reading that policy memo before filing is the single best
              preparation for the petition.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Reading the Visa Bulletin: Final Action vs Dates for Filing
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The Visa Bulletin's two charts confuse a lot of applicants. Here is the
              practical breakdown:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Chart A — Final Action Dates.</strong> The cutoff for actually
                approving an adjustment of status or issuing an immigrant visa. If your
                priority date is before this cutoff, USCIS can approve your green card
                this month, assuming the file is otherwise ready.
              </li>
              <li>
                <strong>Chart B — Dates for Filing.</strong> An earlier, more generous
                cutoff that allows filers to submit I-485 (with the work and travel
                ancillary applications) ahead of approval. USCIS decides each month
                whether Chart B applies; when it does, the agency announces it on its
                Adjustment of Status Filing Charts page.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Filing on Chart B does not advance the eventual green card — that still
              waits for Chart A — but it locks in the I-485 pendency benefits, which can
              matter a great deal for job mobility and family travel during the wait.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Common mistakes
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Filing in the wrong category for the job.</strong> Filing EB-2 on
                a PERM that supports only a bachelor's degree (no "advanced degree
                required" language) invites an RFE or denial. EB-3 downgrades from a
                master's-required PERM can also draw scrutiny.
              </li>
              <li>
                <strong>Not maintaining valid nonimmigrant status during the wait.</strong>{" "}
                For India- and China-born applicants, the multi-year wait usually requires
                continuous H-1B (or L-1, O-1, etc.) status. AC21 portability and H-1B
                extensions beyond the six-year cap rely on the I-140 being approved and
                the priority date not yet current.
              </li>
              <li>
                <strong>Not filing I-485 when current.</strong> When the priority date
                first becomes current, the window can close again. Filing promptly under
                the applicable chart preserves the spot and starts the EAD/AP benefits.
              </li>
              <li>
                <strong>Letting the priority date "die."</strong> An approved I-140 that
                is withdrawn by the employer fewer than 180 days after approval loses the
                priority date for porting purposes. Past the 180-day mark, the priority
                date generally survives even if the employer later withdraws.
              </li>
              <li>
                <strong>Ignoring cross-chargeability.</strong> A spouse born in a faster
                country can move the family into a faster lane. This is often missed in
                the rush to file.
              </li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 border-t rule pt-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This article is for general informational
              purposes only and does not constitute legal advice. Immigration law is
              complex and fact-specific, and choosing between EB-2 and EB-3 — or executing
              a downgrade — should be done with the guidance of a licensed immigration
              attorney. Figures and processing ranges cited are drawn from public USCIS
              data, the Department of State Visa Bulletin, the Department of Labor
              iCERT/FLAG dashboards, and AILA practice advisories. Visa Bulletin movement
              changes monthly; always confirm the current{" "}
              <a
                href="https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                Visa Bulletin
              </a>{" "}
              and the corresponding{" "}
              <a
                href="https://www.uscis.gov/visabulletininfo"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                USCIS adjustment-of-status filing chart selection
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
            </ul>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
