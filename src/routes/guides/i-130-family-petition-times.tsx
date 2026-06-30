import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/guides/i-130-family-petition-times")({
  head: () => ({
    meta: [
      { title: "I-130 Family Petition Processing Times — 2026 Guide | Visa Case Times" },
      {
        name: "description",
        content:
          "I-130 petition for alien relative processing times by category (IR, F1, F2A, F2B, F3, F4), what comes after approval, consular processing vs adjustment of status.",
      },
      {
        name: "keywords",
        content:
          "I-130 processing time, I-130 family petition, petition for alien relative, IR1, CR1, F2A, F2B, F3, F4, consular processing, adjustment of status",
      },
      { property: "og:title", content: "I-130 Family Petition Processing Times in 2026" },
      {
        property: "og:description",
        content:
          "I-130 petition for alien relative processing times by category (IR, F1, F2A, F2B, F3, F4), what comes after approval, consular processing vs adjustment of status.",
      },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: "2026-06-19" },
      {
        rel: "canonical",
        href: "https://visacasetimes.com/guides/i-130-family-petition-times",
      } as any,
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "I-130 Family Petition Processing Times in 2026",
    description:
      "I-130 petition for alien relative processing times by category (IR, F1, F2A, F2B, F3, F4), what comes after approval, consular processing vs adjustment of status.",
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
          <span>I-130 Family Petition Processing Times</span>
        </nav>

        {/* Article */}
        <article className="prose-content">
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Guide</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              I-130 Family Petition Processing Times in 2026
            </h1>
            <p className="mt-4 text-lg text-foreground">
              Form I-130 is the first step in nearly every family-based green card case, but it
              is also one of the most misunderstood forms USCIS handles. Approval does not grant
              status, does not authorize work or travel, and for most categories does not even
              mean a visa is available. Understanding what the form does — and the long chain of
              steps that follow it — is the difference between confident planning and years of
              quiet frustration.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Updated June 19, 2026 · 11 min read
            </p>
          </header>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              What Form I-130 is — and what it isn't
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Form I-130, the Petition for Alien Relative, is the document a U.S. citizen or
              lawful permanent resident files to ask USCIS to recognize a qualifying family
              relationship with a foreign-national relative. It is, in essence, a request for
              the government to put the petitioner and beneficiary on the official record as
              family for immigration purposes.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              What I-130 approval does <strong>not</strong> do is grant immigration status. An
              approved I-130 does not authorize the beneficiary to live in the United States,
              work, travel, or apply for any benefit on its own. It does two narrower things:
              it confirms the relationship, and — for cases that face a visa quota — it
              establishes a priority date that determines the beneficiary's place in line.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The actual immigration benefit — the green card — comes from a separate step.
              That step is either{" "}
              <Link to="/form/i-485" className="text-primary underline">
                adjustment of status with Form I-485
              </Link>{" "}
              if the beneficiary is already in the United States, or consular processing
              through the National Visa Center and a U.S. embassy if the beneficiary is abroad.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: I-130 approval is a starting line, not a finish line. The wait between
              I-130 approval and a green card can be longer than the I-130 wait itself.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Who can petition for whom
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Eligibility depends entirely on the petitioner's status. U.S. citizens can
              petition for a broader range of relatives than lawful permanent residents, and
              the categories themselves carry very different waiting periods.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">U.S. citizen petitioners</h3>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>Spouse (Immediate Relative — IR1 or CR1)</li>
              <li>Unmarried children under 21 (Immediate Relative — IR2 or CR2)</li>
              <li>Parents, if the petitioner is at least 21 (Immediate Relative — IR5)</li>
              <li>Unmarried adult sons and daughters 21 or older (First Preference — F1)</li>
              <li>Married sons and daughters of any age (Third Preference — F3)</li>
              <li>Brothers and sisters, if the petitioner is at least 21 (Fourth Preference — F4)</li>
            </ul>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Lawful permanent resident petitioners</h3>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>Spouse and unmarried children under 21 (Second Preference A — F2A)</li>
              <li>Unmarried adult sons and daughters 21 or older (Second Preference B — F2B)</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              LPRs cannot petition for parents, married children, or siblings. That asymmetry
              is one of the most common surprises in family-based immigration, and it is one of
              the practical reasons many LPRs naturalize as soon as they are eligible.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: who you can petition for depends on whether you are a citizen, not just
              on your relationship. When a petitioner naturalizes mid-case, the beneficiary's
              category often shifts upward and the wait shortens.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Immediate Relative versus preference categories
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The most important distinction in the family-based system is between Immediate
              Relatives and the family preference categories. They are governed by completely
              different sets of rules.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>Immediate Relatives</strong> — spouses of U.S. citizens, unmarried
              children under 21 of U.S. citizens, and parents of adult U.S. citizens — have
              <em> no annual numerical cap</em>. A visa is always considered available, which
              means there is no Visa Bulletin wait. The only delay is USCIS processing time on
              the I-130 itself and, if applicable, the subsequent I-485 or consular case.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>Family preference categories</strong> — F1, F2A, F2B, F3, and F4 — are
              capped at a fixed number of visas per fiscal year, with a further per-country
              cap of 7% of the worldwide total. When demand outstrips supply for a particular
              country and category, a queue forms and the beneficiary waits for a priority
              date to become current under the monthly State Department Visa Bulletin.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The practical effect of those caps is enormous. F4 sibling petitions filed for
              beneficiaries born in Mexico or the Philippines have historically faced waits of
              two decades or more before the priority date becomes current. For most other
              countries the F4 wait is still well over a decade. Meanwhile an IR1 spouse case
              for the same petitioner faces no quota wait at all.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the form is the same, but the timeline depends almost entirely on
              category and country of birth. Always check both before estimating a wait.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The Visa Bulletin and why priority dates matter
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For preference cases, the priority date is the day USCIS received a properly
              filed I-130. Once the petition is approved, the case moves into a holding pattern
              that ends only when that priority date becomes current under the Visa Bulletin
              the State Department publishes each month.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The Visa Bulletin publishes two charts per category: the Final Action Dates chart
              (when visas may actually be issued) and the Dates for Filing chart (when a
              beneficiary may submit the adjustment or consular paperwork in advance). USCIS
              chooses each month which chart adjustment-of-status filers may use; consular
              cases follow the Final Action Dates chart at the National Visa Center.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Priority dates do not always advance smoothly. They can stall for months, retreat
              when demand surges, and occasionally leap forward when a category is undersubscribed
              at year-end. Tracking the bulletin month over month is the only reliable way to
              estimate where you stand.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: for preference categories, an approved I-130 starts a second clock — the
              one that runs on the Visa Bulletin, not on USCIS processing time.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Current I-130 processing times
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              USCIS publishes I-130 processing times by category and by service center. For the
              live, current numbers see our{" "}
              <Link to="/form/i-130" className="text-primary underline">
                I-130 processing time page
              </Link>
              , which mirrors the official agency data and breaks it down by category.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              In recent reporting periods, IR1 and CR1 spouse petitions for U.S. citizens have
              tended to land in roughly the 9-to-20-month range depending on which service
              center is assigned the case. Other categories sit in similar windows for the
              I-130 step itself; the much longer waits attached to preference cases mostly
              accrue afterward, in the Visa Bulletin queue.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The National Benefits Center, Texas Service Center, Nebraska Service Center,
              Potomac Service Center, and California Service Center all handle I-130s in
              different proportions, and the published times can differ by months between
              them. There is no way to choose which center handles your case — it depends on
              category, your address, and how USCIS is balancing workload at the time of
              filing.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the I-130 wait is only the first leg. For preference cases, treat the
              USCIS-published number as a small fraction of the total journey.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              What to include when you file
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              A clean I-130 filing is the single biggest predictor of how fast the case moves.
              An incomplete or weakly supported petition almost always draws a Request for
              Evidence (RFE), and RFEs typically add several months to the overall timeline.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">Every I-130 package should include:</p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>The completed Form I-130 itself, signed and dated</li>
              <li>The filing fee — $675 for paper filings or $625 for online filings under the 2024 fee rule</li>
              <li>
                Proof of the petitioner's status: a U.S. passport biographical page, a
                naturalization or citizenship certificate, or a copy of the petitioner's green
                card (front and back) for LPR filers
              </li>
              <li>
                Proof of the qualifying relationship: marriage certificate for spouses, birth
                certificates establishing parent-child or sibling relationships, adoption
                decrees where relevant
              </li>
              <li>
                Translations of any document not originally in English, with a certificate of
                translation signed by the translator
              </li>
              <li>For previously married petitioners or beneficiaries, divorce decrees or death certificates ending all prior marriages</li>
              <li>Passport-style photos of petitioner and beneficiary where required by the instructions</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the fee changes published in 2024 are now the operative numbers. Always
              re-check the current fee on the USCIS site before mailing, because rejections for
              fee errors are surprisingly common.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Spouse petitions — proving a bona fide marriage
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Spouse petitions face heavier scrutiny than any other I-130 category because
              marriage fraud is the single most-litigated form of immigration fraud. The
              petitioner is expected to show, with documentary evidence, that the marriage is
              real — that the couple lives a shared life, not just that they signed a marriage
              certificate.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">Typical bona fide marriage evidence includes:</p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>Joint bank account statements covering a meaningful span of time</li>
              <li>A joint lease or mortgage, or property records showing both names</li>
              <li>Joint utility bills, internet bills, or other household account records</li>
              <li>Joint health, auto, or renter's insurance policies</li>
              <li>Beneficiary designations on retirement accounts and life insurance naming the spouse</li>
              <li>Tax returns filed jointly, especially in subsequent years</li>
              <li>Photographs of the couple together over time, with family, on travel, at milestones</li>
              <li>Birth certificates of any children born to the marriage</li>
              <li>Affidavits from friends and family who can attest to the relationship, with the affiant's name, address, and personal knowledge of the couple</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Thin marriage evidence — a marriage certificate and little else — is one of the
              most common RFE triggers in the entire family-based system. Officers are looking
              for a pattern of intertwined lives, and they want to see it in records that were
              created in the normal course of living together, not produced for the petition.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: build the file as if the officer has never met you and has every
              reason to be skeptical. That mindset usually produces a complete record.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              CR1/CR2 versus IR1/IR2 — the two-year rule
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              When a spouse-of-citizen or child-of-citizen case finishes and the beneficiary
              receives a green card, the type of green card issued depends on how long the
              underlying marriage has lasted at the moment lawful permanent residence is
              granted.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              If the marriage is less than two years old when the green card is approved, the
              beneficiary receives a <strong>conditional</strong> green card valid for two
              years — coded CR1 (spouse) or CR2 (child). If the marriage is at least two years
              old at that point, the green card is issued as an unconditional ten-year card
              coded IR1 or IR2.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Conditional residents must file{" "}
              <Link to="/form/i-751" className="text-primary underline">
                Form I-751
              </Link>{" "}
              to remove the conditions during the 90-day window immediately before the
              two-year anniversary of the conditional green card. Missing that window can have
              serious consequences, including the loss of LPR status, although USCIS does
              sometimes accept late filings with a documented explanation.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the two-year clock runs from the marriage date, not the filing date.
              Couples close to the two-year mark sometimes find that small timing differences
              determine whether they get a conditional or unconditional card.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              After I-130 approval — the two paths forward
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              An approved I-130 is a milestone, not an endpoint. What happens next depends on
              where the beneficiary is physically located and what their current status is.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">If the beneficiary is in the United States in valid status</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The beneficiary may file Form I-485 to adjust status to lawful permanent
              resident. For Immediate Relatives, I-485 can be filed concurrently with the
              I-130 or any time after; for preference cases, I-485 may only be filed when the
              priority date is current. Adjustment of status keeps the entire process inside
              the United States and is generally the faster route when both options are
              available.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">If the beneficiary is abroad</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The case moves from USCIS to the State Department's National Visa Center for
              consular processing. The NVC collects the immigrant visa application (Form
              DS-260), civil documents, and the affidavit of support, then schedules an
              interview at the U.S. embassy or consulate in the beneficiary's country.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the choice between adjustment and consular processing is sometimes a
              choice and sometimes dictated by where the beneficiary is. Either way, the
              I-130 is only the first of two USCIS or State Department workflows.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Consular processing — what to expect
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Once an approved I-130 reaches the NVC, the case enters a fee-bill-and-document
              phase. The petitioner and beneficiary pay the immigrant visa and affidavit of
              support fees, submit the DS-260 online, and upload civil documents — birth
              certificates, marriage certificates, police clearances, court records — through
              the CEAC portal.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              NVC review typically takes one to three months when the documents are complete.
              The case is then designated documentarily qualified and put in line for an
              interview at the U.S. embassy or consulate in the beneficiary's country.
              Embassy interview scheduling varies enormously — some posts can interview
              within a few months of being documentarily qualified, while others have
              backlogs that stretch a year or more.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Once the interview is passed and any administrative processing clears, the
              beneficiary receives an immigrant visa, enters the United States, and becomes a
              lawful permanent resident on entry. The physical green card arrives by mail
              within a few weeks after entry.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: consular processing has more discrete stages than adjustment, and the
              embassy interview wait is the variable most likely to surprise filers. Check
              your specific post.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The affidavit of support
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Every family-based immigrant requires a Form I-864 Affidavit of Support, signed
              by the petitioner, certifying that the petitioner has the financial capacity to
              support the beneficiary at 125% of the federal poverty guidelines for the
              applicable household size. The form is legally enforceable and obligates the
              sponsor until the beneficiary naturalizes, accrues 40 qualifying quarters of
              work, departs the U.S. permanently, or dies.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              If the petitioner's income is insufficient, a joint sponsor — any U.S. citizen
              or LPR who meets the income requirement on their own — can file a separate
              I-864 covering the beneficiary. Assets can also be used in some circumstances,
              typically valued at three to five times the income shortfall depending on the
              relationship.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: the affidavit of support is one of the most enforceable financial
              commitments most petitioners will ever sign. Treat it accordingly.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Common RFE patterns
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Requests for Evidence are one of the main reasons I-130 cases stall. The same
              issues recur month after month in the published RFE templates:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>Insufficient bona fide marriage evidence in spouse cases — by far the most common single trigger</li>
              <li>Foreign-language documents submitted without a complete certified English translation</li>
              <li>Proof-of-status problems on the petitioner side — illegible passport copies, missing naturalization certificate, expired green card images</li>
              <li>Identity discrepancies — names spelled differently across documents, name changes that were not explained, transliteration inconsistencies</li>
              <li>Missing or incomplete documentation of prior marriages — divorce decrees, annulments, or death certificates that close out every previous marriage on both sides</li>
              <li>Birth certificate issues for the beneficiary — late-registered certificates, hospital records used as substitutes without a secondary source</li>
              <li>For petitions for siblings, missing evidence that the petitioner and beneficiary share at least one common parent</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: most RFEs are predictable and preventable. A pre-filing checklist that
              walks the package against these categories catches the vast majority of issues.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Less typical family structures
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The I-130 statute and regulations recognize a wider set of family relationships
              than people sometimes expect. A few worth flagging:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Same-sex marriages</strong> have been fully recognized for federal
                immigration purposes since the 2013 Supreme Court ruling in U.S. v. Windsor.
                The same evidence standards apply.
              </li>
              <li>
                <strong>Stepchildren</strong> qualify as children if the marriage that created
                the step-relationship took place before the child's 18th birthday.
              </li>
              <li>
                <strong>Adopted children</strong> qualify if the adoption took place before
                age 16 and the child has been in the legal and physical custody of the
                adoptive parent for at least two years (with limited exceptions).
              </li>
              <li>
                <strong>Half-siblings</strong> qualify for F4 petitions if the petitioner and
                beneficiary share at least one biological parent.
              </li>
              <li>
                <strong>Divorced petitioners or beneficiaries</strong> must document the
                termination of every prior marriage with a final court order or death
                certificate.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: complex family structures are not disqualifying, but they raise the
              evidentiary bar. Plan the documentary record carefully before filing.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Withdrawal, revocation, and death of the petitioner
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              An I-130 is the petitioner's filing, and the petitioner can withdraw it at any
              time before the beneficiary obtains lawful permanent residence. USCIS may also
              revoke an approved I-130 if new evidence emerges of fraud, of a sham marriage,
              or of any other ground that would have prevented approval in the first place.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Death of the petitioner historically caused the I-130 to die with them. Under
              INA §204(l), beneficiaries who were physically present in the United States at
              the time of the petitioner's death and have continuously resided here may
              request humanitarian reinstatement of the petition; the discretionary standard
              is meaningful, but the relief is real and is granted in many sympathetic cases.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: an I-130 is not as fragile as it once was when the petitioner dies,
              but the §204(l) and humanitarian-reinstatement paths are still discretionary and
              should be pursued with help.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Common scenarios filers actually ask about
            </h2>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">How long does an I-130 spouse petition take from filing to green card?</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For an IR1 spouse-of-citizen case pursued through adjustment of status inside
              the United States, the typical end-to-end timeline is roughly 12 to 24 months
              from filing to green card. For consular processing the range is more like 18 to
              30 months, depending heavily on the embassy involved.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">When can I file I-130 and I-485 together?</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Concurrent filing is allowed when the beneficiary is physically present in the
              United States in valid status and the case is either an Immediate Relative
              petition or a preference case where the priority date is current on the day of
              filing. For most preference cases the priority date is not current at the
              moment the I-130 is filed, so concurrent filing is not an option.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">My I-130 is approved but my priority date isn't current. What now?</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              You wait, and you track the Visa Bulletin month over month. There is no
              shortcut. The only real planning move is to keep the case up to date with the
              NVC if you're going the consular route, and to make sure passports, civil
              documents, and addresses are current when the date finally moves.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: most of the impatient questions about I-130 have the same honest
              answer — the wait is what it is, and the system rewards patience and clean
              paperwork over creative escalation.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 border-t rule pt-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This article is for general informational purposes
              only and does not constitute legal advice. Immigration law is complex and
              fact-specific. For guidance about your individual situation, consult a licensed
              immigration attorney or an accredited representative of a recognized
              organization. Statistics, fees, and policies cited are drawn from USCIS
              published data and may change. Always confirm with the current{" "}
              <a
                href="https://egov.uscis.gov/processing-times"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                USCIS Processing Times tool
              </a>{" "}
              and the live{" "}
              <Link to="/form/i-130" className="text-primary underline">
                I-130 data page
              </Link>{" "}
              before making decisions.
            </p>
          </section>

          {/* Related guides at bottom */}
          <section className="mt-16 border-t rule pt-8">
            <h2 className="display text-xl text-primary mb-4">Related guides</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/guides/i-485-processing-times"
                  className="text-primary hover:underline"
                >
                  I-485 adjustment of status processing times
                </Link>
              </li>
              <li>
                <Link
                  to="/guides/uscis-processing-times-explained"
                  className="text-primary hover:underline"
                >
                  How USCIS processing times actually work
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
