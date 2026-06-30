import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/guides/n-400-naturalization-times")({
  head: () => ({
    meta: [
      {
        title:
          "N-400 Naturalization Processing Times — Citizenship Guide 2026 | Visa Case Times",
      },
      {
        name: "description",
        content:
          "Current N-400 naturalization processing times by field office, eligibility requirements (3-year vs 5-year rule), interview, civics test, and oath ceremony timeline.",
      },
      {
        name: "keywords",
        content:
          "N-400 processing time, naturalization timeline, US citizenship application, civics test, oath ceremony, 5-year rule, 3-year rule",
      },
      {
        property: "og:title",
        content: "N-400 Naturalization Processing Times 2026",
      },
      {
        property: "og:description",
        content:
          "Current N-400 naturalization processing times by field office, eligibility requirements (3-year vs 5-year rule), interview, civics test, and oath ceremony timeline.",
      },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: "2026-06-19" },
      {
        rel: "canonical",
        href: "https://visacasetimes.com/guides/n-400-naturalization-times",
      } as any,
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "N-400 Naturalization Processing Times 2026",
    description:
      "Current N-400 naturalization processing times by field office, eligibility requirements (3-year vs 5-year rule), interview, civics test, and oath ceremony timeline.",
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
          <span>N-400 Naturalization Times</span>
        </nav>

        {/* Article */}
        <article className="prose-content">
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Guide</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              N-400 Naturalization Processing Times 2026
            </h1>
            <p className="mt-4 text-lg text-foreground">
              Naturalization is the final immigration step for most lawful permanent residents,
              and Form N-400 is the application that makes it happen. The wait has shortened
              meaningfully over the last two years — many field offices that were quoting
              fourteen-plus months in 2022 are now closing cases inside six — but the path from
              filing to oath still involves several distinct checkpoints, each with its own
              timing. This guide walks through what each step actually requires and how long it
              tends to take.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Updated June 19, 2026 · 10 min read
            </p>
          </header>

          {/* Section 1 — Eligibility basics */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Eligibility basics: the 5-year and 3-year rules
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Most lawful permanent residents (LPRs) become eligible to file N-400 after five
              years as a green-card holder. That five-year window is the default path and the one
              most applicants follow. To qualify, you must be at least 18 years old at the time
              of filing, have continuously resided in the United States as an LPR for the five
              years immediately preceding the application, and have been physically present in
              the country for at least 30 of those 60 months.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The 3-year rule is a shorter path for the spouse of a U.S. citizen. To use it, you
              must have been an LPR for at least three years, have been married to and living
              with the same U.S. citizen spouse for those entire three years, and the spouse
              must have been a U.S. citizen for the same period. If the marriage ends — through
              death, divorce, or separation — before naturalization, you generally fall back to
              the five-year rule. Physical presence under the 3-year path is 18 months out of
              the 36.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              USCIS lets you file up to 90 days before reaching your eligibility date, which is
              useful because it lets the agency start working on background checks before the
              clock fully runs.
            </p>
          </section>

          {/* Section 2 — Continuous residence vs physical presence */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Continuous residence vs. physical presence
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              These two requirements sound similar but mean very different things, and confusing
              them is one of the most common reasons applicants are denied or have to refile.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>Continuous residence</strong> measures whether you have maintained the
              United States as your primary home as an LPR. It is broken by absences abroad of
              certain lengths:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                A single trip of more than six months but less than one year creates a
                <em> rebuttable </em>
                presumption that continuous residence has been broken. You can overcome it with
                evidence — maintained U.S. home, ongoing employment, family ties, tax filings as
                a U.S. resident — but the burden is on you.
              </li>
              <li>
                A single trip of one year or more almost always breaks continuous residence
                unless you preserved it in advance by filing Form N-470 (typically only
                available for certain employment situations).
              </li>
              <li>
                Breaking continuous residence resets the clock. Depending on the circumstances,
                you may need to wait an additional 4 years and 1 day (under the 5-year rule) or
                2 years and 1 day (under the 3-year rule) after returning before you can refile.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>Physical presence</strong> is the simpler concept — actual days spent
              inside the United States. You need 30 months (913 days) out of the last 60 under
              the 5-year rule, or 18 months (548 days) out of the last 36 under the 3-year rule.
              Officers count this by reviewing the trip history you list on the application,
              cross-checked against CBP entry/exit records.
            </p>
          </section>

          {/* Section 3 — Good moral character */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Good moral character
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              USCIS must conclude that you have shown good moral character during the relevant
              statutory period — five years for the standard path, three years for the
              spouse-of-citizen path — and that nothing in your earlier history disqualifies you.
              You are required to disclose older issues as well; officers can and do consider
              conduct before the statutory window when deciding character.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Some issues are permanent statutory bars. Others create rebuttable concerns:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                Most aggravated felonies and any murder conviction are permanent bars to
                naturalization.
              </li>
              <li>
                Two or more convictions for controlled substance offenses, a single conviction
                for an aggravated felony at any time after 1990, and certain crimes of moral
                turpitude during the statutory period can disqualify outright.
              </li>
              <li>
                False claims to U.S. citizenship — for example, on a job application, a voter
                registration form, or at the border — are an extremely serious issue and often
                disqualifying.
              </li>
              <li>
                Failure to file required tax returns, owed and unpaid taxes, or willful failure
                to support dependents can each weigh against good moral character.
              </li>
              <li>
                Failure to register with the Selective Service (for males who were required to
                — see Section 11 below) can be a character issue if it occurred during the
                statutory period.
              </li>
            </ul>
          </section>

          {/* Section 4 — English and civics tests */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              English and civics tests
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Two tests are administered during the naturalization interview. Both must be
              passed unless you qualify for an exemption.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">English</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The English requirement has three components. Speaking is evaluated informally by
              the officer during the interview itself — based on your ability to understand and
              respond to questions about your application. Reading requires you to read one of
              three sentences aloud correctly. Writing requires you to write one of three
              sentences correctly. The vocabulary is drawn from a published list focused on
              civics terms.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Civics</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The civics test draws from a pool of 100 questions about U.S. history and
              government, all publicly available on the USCIS website. During the interview, the
              officer asks up to 10 of them orally and you must answer 6 correctly to pass. The
              test stops as soon as you reach 6 correct answers, so a confident start can mean
              you finish in a minute or two.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Age and residence exemptions</h3>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>50/20 rule:</strong> 50 or older at filing and an LPR for at least 20
                years — exempt from the English requirement, but still take the civics test (in
                a language of your choice, with an interpreter).
              </li>
              <li>
                <strong>55/15 rule:</strong> 55 or older at filing and an LPR for at least 15
                years — also exempt from English, still take the civics test in your language.
              </li>
              <li>
                <strong>65/20 rule:</strong> 65 or older at filing and an LPR for at least 20
                years — exempt from English, and take a shorter civics test of 20 designated
                questions (must get 6 of 10 asked correct).
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              A medical disability exemption (Form N-648, signed by a licensed medical
              professional) is also available for applicants who cannot meet the requirements
              because of a physical, developmental, or mental condition.
            </p>
          </section>

          {/* Section 5 — Filing N-400 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Filing the N-400
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Under the 2024 USCIS fee rule, the filing fee is $760 for paper submissions and
              $710 for online submissions. The biometric services fee is now included in the
              filing fee — there is no separate $85 charge. Reduced and waived fees remain
              available for applicants who qualify based on income.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              USCIS strongly encourages online filing through a myUSCIS account. Online filings
              tend to be processed slightly faster, generate digital receipts immediately, and
              make it easier to respond to requests for evidence and to track case status. Paper
              filings remain accepted, but you should expect a longer mail-and-data-entry lag
              before your receipt notice arrives.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              You can submit the application up to 90 days before reaching your five-year (or
              three-year) anniversary as an LPR. Filing earlier than the 90-day window will
              result in a denial — and a lost filing fee — so check the math carefully against
              the "Resident Since" date on your green card before submitting.
            </p>
          </section>

          {/* Section 6 — Current processing time ranges */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Current processing time ranges (2026)
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For live, office-specific numbers, see our{" "}
              <Link to="/form/n-400" className="text-primary underline">
                N-400 processing times page
              </Link>
              , which pulls the USCIS published median and 80th-percentile ranges for each field
              office.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The high-level picture in 2026 is encouraging. USCIS prioritized N-400
              adjudications starting in late 2022, and the agency has reported the national
              median for naturalization completion falling from over 14 months at the height of
              the post-pandemic backlog to roughly 5 to 6 months in many field offices through
              2024 and 2025. That improvement has held into 2026.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The catch is wide variance by field office. Faster offices are routinely closing
              cases inside four months from receipt to oath. Slower offices — particularly some
              high-volume metros and offices that absorbed transferred caseload — still post
              ranges in the 9-to-14-month range. Always check the published number for the
              specific field office that covers your residential address.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              For background on what those published ranges actually measure, see our companion
              guide on{" "}
              <Link
                to="/guides/uscis-processing-times-explained"
                className="text-primary underline"
              >
                how USCIS processing times work
              </Link>
              .
            </p>
          </section>

          {/* Section 7 — Biometrics */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Biometrics
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Since 2021, USCIS has reused biometrics from earlier filings — typically the
              fingerprints captured during the I-485 green-card process — for most N-400
              applicants. If your biometrics are still on file and current, you will not be
              scheduled for a new appointment, which removes a step that used to add four to
              eight weeks to the timeline.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Some applicants do still receive a biometrics appointment notice. This usually
              happens when prior fingerprints have expired, when there is a quality issue with
              the earlier capture, or when the system simply does not find a match. If you
              receive a notice, the appointment itself is short — 15 to 30 minutes at an
              Application Support Center.
            </p>
          </section>

          {/* Section 8 — The N-400 interview */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The N-400 interview
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The naturalization interview is the heart of the process. It typically lasts 15 to
              30 minutes and is conducted in person at the field office that covers your
              address. The officer will swear you in, review your application page by page,
              administer the English and civics tests, and look at any supporting documents you
              brought (passport, tax transcripts, marriage and divorce records, court
              dispositions if relevant).
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              At the end, the officer issues a Form N-652, Notice of Examination Results, with
              one of three possible outcomes:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Recommended for approval.</strong> The most common outcome for prepared
                applicants. You either take the oath the same day (more on this below) or
                receive a separate oath notice in the mail.
              </li>
              <li>
                <strong>Continued.</strong> The officer needs additional evidence, a second
                interview, or wants you to retake a test. Continuations are common and not by
                themselves bad news, but they add weeks to months to the timeline.
              </li>
              <li>
                <strong>Denied.</strong> Issued in a written decision that explains the basis.
                You can appeal an N-400 denial by filing Form N-336 within 30 days for a
                hearing before a different officer.
              </li>
            </ul>
          </section>

          {/* Section 9 — The oath ceremony */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The oath ceremony
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Approval at the interview does not by itself make you a citizen — taking the Oath
              of Allegiance does. There are two routes.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>Administrative oath ceremonies</strong> are run by USCIS itself, often at
              the field office. At many offices, if you pass your interview in the morning, you
              can be sworn in at a small ceremony that same afternoon. At other offices, an
              administrative ceremony is scheduled separately, typically 2 to 6 weeks after the
              interview.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>Judicial oath ceremonies</strong> are conducted in federal court before a
              judge. They tend to be larger, more formal events and are required in jurisdictions
              where the local court has reserved exclusive oath authority for itself. The wait
              for a scheduled judicial ceremony can run from a few weeks to a few months,
              depending on the court's calendar.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              At the ceremony, you turn in your green card, take the oath, and receive a
              Certificate of Naturalization (Form N-550). The certificate is the official proof
              of citizenship and the document you will use to apply for a U.S. passport,
              register to vote, and update Social Security records.
            </p>
          </section>

          {/* Section 10 — Common reasons for denial or delay */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Common reasons for denial or delay
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Failing the English or civics test.</strong> You are entitled to one
                retake, scheduled 60 to 90 days after the first attempt. Failing the retake
                results in denial.
              </li>
              <li>
                <strong>Good moral character issues.</strong> Undisclosed arrests, recent DUIs,
                domestic-violence allegations, and tax problems are all common bases for
                denial.
              </li>
              <li>
                <strong>Abandonment of LPR status.</strong> Long trips abroad, failure to file
                resident-status tax returns, and indicators that you have established your
                primary residence in another country can all be characterized as abandonment.
              </li>
              <li>
                <strong>Failure to demonstrate continuous residence or physical presence.</strong>{" "}
                Recordkeeping matters. Officers will compare your stated trip history against
                CBP entry/exit records, and discrepancies trigger further scrutiny.
              </li>
              <li>
                <strong>Tax compliance failures.</strong> Unfiled returns or owed and unpaid
                taxes are flagged regularly. The fix is usually to file what is missing and to
                enter a payment plan with the IRS before the interview.
              </li>
              <li>
                <strong>Selective Service issues</strong> for males in the required age window.
                See the next section.
              </li>
            </ul>
          </section>

          {/* Section 11 — Selective Service */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The Selective Service registration issue
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              U.S. law requires nearly all male U.S. residents — including most LPRs — to
              register with the Selective Service System between the ages of 18 and 26. The
              obligation applies to males born in the United States and to those who became LPRs
              before turning 26. If you became an LPR after age 26, you were never required to
              register and this is not an issue.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For N-400 purposes, a failure to register is most consequential if it occurred
              during the statutory good-moral-character period (the last five or three years).
              If you should have registered and did not, and you are still under 26, register
              immediately at{" "}
              <a
                href="https://www.sss.gov"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                sss.gov
              </a>{" "}
              before filing.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              If you are over 26 and failed to register, you can request a Status Information
              Letter from the Selective Service that documents your situation. Combined with a
              written statement explaining the failure was not willful and a good track record
              since, USCIS can and often does waive the issue, particularly when the failure
              fell outside the statutory period.
            </p>
          </section>

          {/* Section 12 — Travel during N-400 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Travel during the N-400 process
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              International travel while your N-400 is pending is generally fine. You are still
              an LPR with full travel rights, and a pending naturalization application does not
              by itself restrict you. There are two things to watch.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              First, the continuous-residence rules still apply. A trip of more than six months
              during the pending period can break continuous residence and disqualify you, even
              after filing. Plan trips so that no single absence reaches the 180-day mark.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Second, keep careful travel records. Save boarding passes, take photos of passport
              stamps, and reconcile your records against CBP's I-94 travel history (available
              online). At the interview, you may be asked to update your trip list, and being
              able to do that accurately matters.
            </p>
          </section>

          {/* Section 13 — Renewing green card */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Renewing your green card while N-400 is pending
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Your green card carries an expiration date independent of your naturalization
              application. If it is going to expire while N-400 is pending, you have two
              options.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The first is to file{" "}
              <Link to="/form/i-90" className="text-primary underline">
                Form I-90
              </Link>{" "}
              to renew the green card. This is the safer option if you have any meaningful
              international travel planned, because an unexpired card avoids confusion at
              re-entry.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The second is to request an ADIT stamp ("I-551 stamp") in your passport from your
              local USCIS field office. The stamp serves as temporary evidence of LPR status and
              is generally valid for one year. USCIS has also been sending automatic 24-month
              extension notices for N-400 applicants whose green cards are expiring; the
              extension notice plus the expired card is sufficient evidence of status in most
              situations.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Whatever you choose, do not let your green card go fully expired without
              documentation. Employers running E-Verify checks and airlines verifying travel
              documents will not accept an expired card alone.
            </p>
          </section>

          {/* Section 14 — What citizenship gets you */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              What U.S. citizenship gets you
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Voting in federal elections.</strong> Only U.S. citizens can vote in
                federal elections and most state and local ones.
              </li>
              <li>
                <strong>A U.S. passport.</strong> Generally one of the more travel-friendly
                passports, and the legal right to enter the United States without further
                inspection.
              </li>
              <li>
                <strong>Protection from deportation.</strong> Citizens cannot be removed from
                the country. Denaturalization is possible but rare and requires fraud in the
                naturalization process itself.
              </li>
              <li>
                <strong>Faster family sponsorship.</strong> U.S. citizens can sponsor spouses,
                parents, and unmarried children under 21 with no annual visa cap — these are
                "immediate relatives" and avoid the long preference-category waits.
              </li>
              <li>
                <strong>Federal employment eligibility.</strong> Many federal jobs, security
                clearances, and certain contractor positions require U.S. citizenship.
              </li>
              <li>
                <strong>Eligibility for most elected office.</strong> You can run for and hold
                most public offices. The presidency and vice presidency remain reserved for
                natural-born citizens.
              </li>
              <li>
                <strong>Jury duty.</strong> This is an obligation rather than a benefit, but it
                comes with citizenship.
              </li>
            </ul>
          </section>

          {/* Section 15 — N-400 vs N-600 vs N-600K */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              N-400 vs. N-600 vs. N-600K
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              All three forms relate to U.S. citizenship, but they serve very different
              purposes. Picking the right one matters because filing the wrong form delays your
              case by months.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>N-400</strong> is the application <em>for</em> naturalization — the
                process of an LPR becoming a U.S. citizen. This is the form covered in this
                guide.
              </li>
              <li>
                <strong>N-600</strong> is an application for a Certificate of Citizenship for
                someone who is <em>already</em> a U.S. citizen by operation of law — typically
                someone who acquired or derived citizenship automatically through a U.S.-citizen
                parent. You do not become a citizen by filing N-600; you document the
                citizenship you already have.
              </li>
              <li>
                <strong>N-600K</strong> is for children who are not yet U.S. citizens but who
                qualify to be naturalized through a U.S.-citizen parent while still living
                abroad. It involves bringing the child to the U.S. for the interview and oath.
                It is more common for U.S.-citizen parents working overseas or in the military.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              If you are not sure which applies, the simplest test is your starting point. If
              you are an LPR seeking to become a citizen, it is N-400. If you believe you are
              already a citizen through a parent, it is N-600. If you are a U.S. citizen parent
              with a child abroad who needs to be naturalized, it is N-600K.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 border-t rule pt-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This article is for general informational purposes
              only and does not constitute legal advice. Immigration and naturalization law is
              fact-specific, and individual cases — especially those involving criminal
              history, prior immigration issues, or complex residence and travel patterns —
              should be reviewed by a licensed immigration attorney or an accredited
              representative of a recognized organization. Fees, processing times, and policies
              cited here change over time; always confirm with the current{" "}
              <a
                href="https://www.uscis.gov/n-400"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                USCIS N-400 page
              </a>{" "}
              and the{" "}
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
            </ul>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
