import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/guides/i-485-processing-times")({
  head: () => ({
    meta: [
      { title: "I-485 Processing Times — Adjustment of Status Guide 2026 | Visa Case Times" },
      {
        name: "description",
        content:
          "Current I-485 adjustment of status processing times by category (family-based, employment-based, asylum), interview timelines, EAD/AP combo cards, RFE patterns.",
      },
      {
        name: "keywords",
        content:
          "I-485 processing time, adjustment of status timeline, I-485 EAD AP, I-485 interview, AC21 portability, concurrent filing I-485, family based adjustment, employment based adjustment",
      },
      { property: "og:title", content: "I-485 Processing Times — Adjustment of Status in 2026" },
      {
        property: "og:description",
        content:
          "Current I-485 adjustment of status processing times by category (family-based, employment-based, asylum), interview timelines, EAD/AP combo cards, RFE patterns.",
      },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: "2026-06-19" },
      {
        rel: "canonical",
        href: "https://visacasetimes.com/guides/i-485-processing-times",
      } as any,
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "I-485 Processing Times — Adjustment of Status in 2026",
    description:
      "Current I-485 adjustment of status processing times by category (family-based, employment-based, asylum), interview timelines, EAD/AP combo cards, RFE patterns.",
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
          <span>I-485 Processing Times</span>
        </nav>

        {/* Article */}
        <article className="prose-content">
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Guide</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              I-485 Processing Times — Adjustment of Status in 2026
            </h1>
            <p className="mt-4 text-lg text-foreground">
              Form I-485 is the application that turns a pending immigrant visa petition into an
              actual green card without leaving the United States. It is also one of the
              longest-running, most fact-sensitive cases USCIS adjudicates — with timelines that
              swing from under a year to well over three depending on category, country of birth,
              and field office. This guide walks through what current I-485 waits look like, why
              they vary, and how the moving pieces (EAD, Advance Parole, interview, AC21
              portability) fit together.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Updated June 19, 2026 · 12 min read
            </p>
          </header>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              What Form I-485 is and who files it
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Form{" "}
              <Link to="/form/i-485" className="text-primary underline">
                I-485, Application to Register Permanent Residence or Adjust Status
              </Link>
              , is the form a person already inside the United States files to become a lawful
              permanent resident (green card holder) without leaving the country. It is the
              domestic alternative to consular processing, which is the parallel path used by
              people who go through a U.S. embassy or consulate abroad.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Adjustment of status is only available to people who entered the U.S. lawfully (with
              limited exceptions for grandfathered §245(i) filers and certain humanitarian
              categories) and who have an immigrant visa "immediately available" to them. The
              second condition is the one that gates almost every employment-based and most
              family-based filers: USCIS will not accept an I-485 unless the applicant's priority
              date is current under the State Department's monthly Visa Bulletin.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Filing I-485 is also a strategic decision, not just a procedural one. Once it is
              pending, it generally protects the applicant from the accrual of unlawful presence,
              and it opens the door to ancillary benefits like employment authorization and
              Advance Parole. But it also commits the applicant to the U.S.-based process, with
              all its delays.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Eligibility categories
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              I-485 is a single form that covers many distinct legal categories. The category
              determines almost everything that follows — including processing time, interview
              likelihood, and which adjudicating office handles the file.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Family-based.</strong> Immediate relatives of U.S. citizens (IR1 spouse,
                IR2 minor child, IR5 parent) and the conditional-resident equivalents (CR1, CR2
                for marriages under two years old at admission), plus the preference categories
                F1 (unmarried adult children of citizens), F2A (spouses/minor children of LPRs),
                F2B (unmarried adult children of LPRs), F3 (married adult children of citizens),
                and F4 (siblings of citizens).
              </li>
              <li>
                <strong>Employment-based.</strong> EB-1 (extraordinary ability, outstanding
                researchers, multinational managers), EB-2 (advanced-degree professionals and
                national-interest waivers), EB-3 (skilled workers and professionals), EB-4
                (special immigrants including certain religious workers), and EB-5 (immigrant
                investors).
              </li>
              <li>
                <strong>Asylee adjustment.</strong> Available one year after the grant of asylum.
                Filed on the same I-485 form but with a different statutory basis (INA §209).
              </li>
              <li>
                <strong>Refugee adjustment.</strong> Required one year after lawful admission as
                a refugee.
              </li>
              <li>
                <strong>Diversity visa winners</strong> who are inside the U.S. in valid status
                at the time of selection.
              </li>
              <li>
                <strong>Special programs.</strong> NACARA, the Cuban Adjustment Act, HRIFA,
                Lautenberg, Liberian Refugee Immigration Fairness, and other narrower bases.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Priority date and visa availability
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For preference-category filers (everything except immediate relatives, asylees,
              refugees, and a few special programs), the I-485 cannot be filed until a visa
              number is available. That availability is published every month in the State
              Department's Visa Bulletin, which lists cutoff dates by category and country of
              birth.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The bulletin has two charts: Final Action Dates (when a green card can actually be
              issued) and Dates for Filing (when an application can be submitted in anticipation
              of availability). Each month, USCIS announces which of the two charts may be used
              for adjustment of status filings — sometimes the more generous Dates for Filing
              chart, sometimes the stricter Final Action chart. Filers in heavily backlogged
              categories — particularly EB-2 and EB-3 for India and China, and F2B and F4 across
              the board — watch the monthly bulletin closely.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Immediate relatives of U.S. citizens (IR/CR categories) are not subject to numerical
              limits and are always considered current. That is one reason their I-485 timeline
              is bounded primarily by USCIS workload rather than visa-number availability.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The I-485 packet
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              A complete I-485 filing is almost never just the I-485 form. It is a packet that
              ties the underlying immigrant petition together with the personal eligibility
              evidence USCIS needs to issue the green card.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">A typical packet includes:</p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                Form I-485 with the correct filing fee and biometrics fee.
              </li>
              <li>
                Evidence of the underlying basis — typically an approved or concurrently filed{" "}
                <Link to="/form/i-130" className="text-primary underline">
                  I-130
                </Link>{" "}
                (family) or{" "}
                <Link to="/form/i-140" className="text-primary underline">
                  I-140
                </Link>{" "}
                (employment), or an asylum approval notice for asylee adjustment.
              </li>
              <li>
                Form I-693, the sealed medical examination from a USCIS-designated civil surgeon.
                Since the 2024 policy update, an I-693 signed by the civil surgeon does not
                expire as long as it remains in the case file.
              </li>
              <li>
                Form I-864, Affidavit of Support, for family-based cases (with the petitioner's
                tax returns or transcripts). Employment-based cases generally do not need I-864
                but do need a current employer letter confirming the job offer and salary remain
                valid.
              </li>
              <li>
                Two passport-style photographs, birth certificate with certified translation,
                passport biographic pages, current and prior I-94 records, and any prior
                immigration documents (EAD, advance parole, prior status approvals).
              </li>
              <li>
                Optional but commonly bundled: Form{" "}
                <Link to="/form/i-765" className="text-primary underline">
                  I-765
                </Link>{" "}
                under category (c)(9) for an EAD and Form{" "}
                <Link to="/form/i-131" className="text-primary underline">
                  I-131
                </Link>{" "}
                for advance parole.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Processing time ranges by category
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              I-485 processing time is one of the most variable numbers in the entire USCIS
              system. The percentile range published on the agency's Processing Times tool
              depends not only on which form was filed but on which sub-category — and that
              sub-category is what determines which office adjudicates the case.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Rough ranges in recent reporting periods:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Family-based, immediate relative (spouse/parent/child of citizen).</strong>{" "}
                Roughly 10 to 24 months at most field offices, with the spread driven mostly by
                interview backlog at the local office.
              </li>
              <li>
                <strong>Family preference (F1, F2A, F2B, F3, F4).</strong> 12 to 30+ months once
                the priority date is current; longer in high-volume offices.
              </li>
              <li>
                <strong>Employment-based EB-1/EB-2/EB-3.</strong> 8 to 20 months in many service
                center jurisdictions. Cases that do not require an interview tend to fall toward
                the shorter end.
              </li>
              <li>
                <strong>Asylee and refugee adjustment.</strong> 14 to 30+ months at the Nebraska
                Service Center, with significant variation as workload shifts.
              </li>
              <li>
                <strong>EB-5 investor adjustment.</strong> Often longer — 24 to 48+ months — given
                the underlying investment review.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              These numbers are not a forecast for any individual case. Always check the
              currently published range for the specific sub-category and office handling your
              file. Our companion guide on{" "}
              <Link to="/guides/uscis-processing-times-explained" className="text-primary underline">
                how USCIS processing times work
              </Link>{" "}
              explains what those numbers actually measure.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Field office vs. service center
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              I-485 cases are split between USCIS service centers and local field offices, and
              the split is not random. As a rough rule of thumb, cases that require an in-person
              interview are routed to the applicant's local field office, while cases that can
              be adjudicated on paper are adjudicated by a service center.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Most family-based I-485s and some employment-based I-485s end up at field offices.
              Refugee and asylee adjustments are largely consolidated at the Nebraska Service
              Center. The National Benefits Center plays a coordinating role for many family
              cases, handling pre-interview processing before forwarding the file to the local
              office for adjudication.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The distinction matters because field office processing time depends on local
              interview slot availability, which can swing dramatically between, say, the
              Newark and the San Francisco field offices.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The interview
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              An interview is required for most family-based I-485s and many employment-based
              I-485s. USCIS has the discretion to waive interviews in low-risk employment cases,
              and in practice many EB-1/EB-2/EB-3 filings without complicating factors are
              waived. Marriage-based filings are almost never waived.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The interview itself is generally scheduled at the local field office and runs
              between 20 minutes and an hour. Applicants should bring originals of every document
              submitted with the petition, updated tax returns, and (for marriage-based cases) a
              fresh stack of relationship evidence covering the time since filing.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              Typical interview questions
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Marriage-based interviews focus on the bona fides of the relationship: how the
              couple met, daily routines, finances, family. Officers may interview spouses
              separately (a "Stokes interview") if the case raises questions. Employment-based
              interviews focus on the offered position, the company, the applicant's
              qualifications, and continued intent to take the job.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              EAD (I-765 c09) and Advance Parole (I-131)
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Most adjustment applicants file Form{" "}
              <Link to="/form/i-765" className="text-primary underline">
                I-765
              </Link>{" "}
              under category (c)(9) and Form{" "}
              <Link to="/form/i-131" className="text-primary underline">
                I-131
              </Link>{" "}
              for advance parole concurrently with the I-485 — or shortly after. These two
              benefits are what make the wait livable: the EAD authorizes any kind of work in the
              U.S. while the I-485 is pending, and the advance parole document allows
              international travel without abandoning the application.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Historically USCIS often issued these as a single "combo card" — one document that
              served as both the EAD and the advance parole travel authorization. In recent
              years the agency has more often issued them separately because the underlying
              adjudication timelines have decoupled.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              A 2023 policy update extended the validity period of (c)(9) EADs and the
              corresponding advance parole to up to five years, which dramatically reduced the
              renewal burden on long-pending applicants. That said, validity period is still set
              at adjudication and is not retroactive for older approvals.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              Travel on advance parole — risks
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Advance parole allows re-entry, but it does not guarantee admission. CBP retains
              discretion at the port of entry. Applicants who triggered prior unlawful presence
              bars, who have certain criminal history, or who are subject to other
              inadmissibility grounds should consult an attorney before traveling, even with
              valid AP.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Travel while I-485 is pending
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The general rule is straightforward and important: an applicant with a pending
              I-485 who departs the United States without an approved advance parole document is
              considered to have abandoned the application. The case is then administratively
              closed.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              There are narrow exceptions. An H-1, H-4, L-1, L-2, K-3, or K-4 nonimmigrant in
              valid status with a valid visa stamp can re-enter on that underlying status
              without using advance parole. The protection does not extend to other categories —
              an F-1 or B-2, for example, cannot use that status to re-enter while I-485 is
              pending. And even for H/L holders, the safer practice for most filers is to wait
              for AP and travel on that document.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Re-entry on advance parole admits the applicant as a "parolee," not in the prior
              nonimmigrant status. This has downstream implications for things like employment
              authorization (parolees rely on the EAD, not the underlying H-1B work
              authorization) and for any subsequent change of status if the I-485 is ultimately
              denied.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Maintaining status during the wait
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Once the I-485 is filed and receipted, USCIS considers the applicant to be in a
              period of authorized stay. Time spent waiting on a pending I-485 does not count
              against the three- and ten-year unlawful presence bars under INA §212(a)(9)(B),
              which is one of the most important protections the filing provides.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              That said, many filers choose to maintain underlying nonimmigrant status — H-1B,
              L-1, O-1, and so on — as a fallback. If the I-485 is denied, an applicant who has
              continuously maintained nonimmigrant status keeps that status and can usually
              continue working. An applicant who let their nonimmigrant status lapse and was
              relying on the pending adjustment is left without a fallback if the case goes
              sideways.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Common RFE patterns
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Requests for Evidence are common on I-485 filings. A few patterns come up
              repeatedly:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Missing or expired Form I-693.</strong> Historically the most common RFE
                category by volume. The 2024 policy change removing the I-693 expiration helps,
                but cases filed without an I-693 still routinely draw an RFE.
              </li>
              <li>
                <strong>Affidavit of Support deficiencies.</strong> Missing tax transcripts,
                missing joint sponsor I-864, income calculations that fall short of 125% of
                poverty guidelines, or W-2/self-employment income that does not match the tax
                return.
              </li>
              <li>
                <strong>Public charge.</strong> Following the 2022 final rule, the public charge
                analysis is narrower than during the 2019-2021 period, but officers still
                request additional financial evidence in cases where they have concerns.
              </li>
              <li>
                <strong>Derivative beneficiary documentation.</strong> Missing birth or marriage
                certificates for spouse and child derivatives, or evidence that a derivative
                spouse was eligible at the time of the principal's adjustment.
              </li>
              <li>
                <strong>Employment-based portability questions.</strong> Cases where the
                applicant has changed employers under AC21 often draw RFEs about the new
                position, the duties, and the same-or-similar analysis.
              </li>
              <li>
                <strong>Underlying status gaps.</strong> Particularly for §245(c)
                inadmissibility — whether the applicant maintained continuous lawful status
                between admission and filing.
              </li>
            </ul>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Job changes during I-485 (AC21 portability)
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Section 204(j) of the Immigration and Nationality Act — added by the American
              Competitiveness in the Twenty-first Century Act of 2000 — allows an
              employment-based I-485 applicant to change jobs after the I-485 has been pending
              for at least 180 days, as long as the new position is in the "same or similar"
              occupational classification.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The portability mechanism is one of the most consequential protections in the
              system, particularly for applicants in long-backlogged categories where the wait
              from priority date to final adjudication can run into many years. It means that
              the I-140 stays attached to the case even after the original sponsoring employer
              relationship ends.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Procedurally, the applicant files Form I-485 Supplement J with USCIS, signed by
              the new employer, confirming the new job offer and that the position qualifies as
              same or similar. The new employer does not need to file a new I-140 or sponsor a
              new labor certification. For more on choosing between employment categories before
              filing, see our{" "}
              <Link to="/guides/eb-2-vs-eb-3" className="text-primary underline">
                EB-2 vs EB-3 guide
              </Link>
              .
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              What happens after approval
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Once an I-485 is approved, the applicant receives an I-797 approval notice.
              Production of the physical green card (Form I-551) typically takes two to four
              additional weeks, mailed separately. The applicant is a lawful permanent resident
              from the date of approval, not the date the card arrives.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Two types of green cards come out of this process. Most approved I-485s produce a
              full ten-year permanent resident card. But marriage-based approvals where the
              marriage is less than two years old at the time of approval produce a two-year
              conditional resident card (CR1/CR2). Conditional residents must file Form I-751 in
              the 90-day window before the second anniversary of approval to remove the
              conditions. Failure to do so terminates status.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The clock for naturalization eligibility starts from the date of approval — three
              years for spouses of U.S. citizens who remain married, five years for everyone
              else.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              What if the I-485 is denied
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              I-485 denials are not appealable to the Administrative Appeals Office in the
              traditional sense. The applicant's options are limited:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Motion to reopen or reconsider</strong> with USCIS, filed on Form I-290B
                within 30 days of the decision.
              </li>
              <li>
                <strong>Refiling</strong> if the underlying basis is still valid and the issue
                that caused the denial has been resolved.
              </li>
              <li>
                <strong>Federal court review</strong> through an APA action, which is limited
                in scope and depends heavily on the specific grounds of denial.
              </li>
              <li>
                <strong>Renewing the application in removal proceedings</strong> if USCIS issues
                a Notice to Appear after the denial — which is more common than it used to be
                for applicants who lack lawful status to fall back on.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Because denial outcomes vary enormously based on the underlying reason and on the
              applicant's status fallback, anyone facing an I-485 denial should consult an
              immigration attorney quickly — the 30-day motion window goes by fast.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Concurrent filing strategy
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Concurrent filing means submitting Form I-485 at the same time as the underlying
              I-130 or I-140, rather than waiting for the petition to be approved first. It is
              available for immediate-relative I-130s and for any employment-based I-140 where
              the priority date is current.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The advantages are real. The applicant gets EAD and AP eligibility immediately,
              which can be critical for someone whose current nonimmigrant status is precarious
              or who needs to start a new job that the underlying petition does not authorize.
              And the overall calendar from filing to green card is shorter, because the I-485
              processing time runs in parallel with the I-130/I-140 review rather than after
              it.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The trade-offs are the I-485 filing fee being committed before the underlying
              petition is approved (which is meaningful given the 2024 fee increases), and the
              fact that an I-140 denial after a concurrent I-485 filing usually causes the I-485
              to be denied as well. In practice, concurrent filing makes sense for clean cases
              with strong underlying petitions and for applicants whose category is current.
              Filers in long-backlogged categories typically cannot file concurrently anyway,
              because the priority date is not current.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For applicants whose case is moving slowly past the published processing time,
              see our guide on{" "}
              <Link to="/guides/what-to-do-if-case-delayed" className="text-primary underline">
                what to do if your USCIS case is delayed
              </Link>{" "}
              for escalation options.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 border-t rule pt-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This article is for general informational purposes
              only and does not constitute legal advice. Immigration law is complex and
              fact-specific. For guidance about your individual situation, consult a licensed
              immigration attorney or an accredited representative of a recognized organization.
              Processing time ranges, fees, and policy details cited here change frequently;
              always confirm with the current{" "}
              <a
                href="https://egov.uscis.gov/processing-times"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                USCIS Processing Times tool
              </a>{" "}
              and the relevant USCIS policy manual before relying on any specific figure.
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
                <Link to="/guides/eb-2-vs-eb-3" className="text-primary hover:underline">
                  EB-2 vs EB-3 — which to choose
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
