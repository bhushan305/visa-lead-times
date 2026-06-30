import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/guides/filing-checklist")({
  head: () => ({
    meta: [
      { title: "USCIS Filing Checklist — What to Include in Your Petition | Visa Case Times" },
      {
        name: "description",
        content:
          "Comprehensive checklist for filing USCIS petitions: forms, evidence, fees, biometrics, signatures, and common rejection reasons.",
      },
      {
        name: "keywords",
        content:
          "USCIS filing checklist, USCIS petition checklist, USCIS lockbox rejection, USCIS filing fees, USCIS supporting documents, USCIS G-1450",
      },
      { property: "og:title", content: "USCIS Filing Checklist — What to Include in Your Petition" },
      {
        property: "og:description",
        content:
          "Comprehensive checklist for filing USCIS petitions: forms, evidence, fees, biometrics, signatures, and common rejection reasons.",
      },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: "2026-06-19" },
      {
        rel: "canonical",
        href: "https://visacasetimes.com/guides/filing-checklist",
      } as any,
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "USCIS Filing Checklist — What to Include in Your Petition",
    description:
      "Comprehensive checklist for filing USCIS petitions: forms, evidence, fees, biometrics, signatures, and common rejection reasons.",
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
          <span>USCIS Filing Checklist</span>
        </nav>

        {/* Article */}
        <article className="prose-content">
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Guide</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              USCIS Filing Checklist
            </h1>
            <p className="mt-4 text-lg text-foreground">
              The single most common reason a USCIS petition gets sent back is something boring:
              the wrong form edition, a missing signature, a fee that's a few dollars off. None of
              it has anything to do with the merits of the case. This checklist walks through
              every component of a clean filing — what goes in the envelope, in what form, and the
              small mistakes that cost weeks or months at the front door.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Updated June 19, 2026 · 12 min read
            </p>
          </header>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Why filings get rejected at the lockbox
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Before a USCIS officer ever looks at the substance of your case, your petition has
              to clear the lockbox — a contractor-run intake facility that does a completeness
              check, cashes the fee, and issues your receipt notice. If anything is off, the
              package gets returned unfiled, sometimes weeks later, with a short rejection
              notice and your uncashed check.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The most common rejection reasons are mechanical:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Wrong form edition.</strong> USCIS revises forms periodically and
                publishes the accepted edition dates on each form's page. An old edition is
                rejected outright.
              </li>
              <li>
                <strong>Missing signature.</strong> Every applicant, petitioner, and
                attorney/representative who needs to sign must do so in ink (or via the
                approved digital workflow for online filings). A typed name is not a signature.
              </li>
              <li>
                <strong>Wrong or missing fee.</strong> Sending the prior-year fee or omitting
                the biometric services fee where required is an instant return.
              </li>
              <li>
                <strong>No payment method.</strong> Forgetting to include the check, money
                order, or completed G-1450.
              </li>
              <li>
                <strong>Illegible writing.</strong> The lockbox will not adjudicate cramped
                handwriting. Type or print clearly.
              </li>
              <li>
                <strong>Missing initial evidence.</strong> A handful of forms (notably I-130)
                will be rejected if the most basic supporting documents aren't attached.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: the lockbox is not your friend. It is a mechanical filter. Build the
              package to survive it.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The seven components of any USCIS filing
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Every paper filing follows the same anatomy. Not every form requires every
              component, but if you build a mental template around these seven pieces you will
              very rarely forget something.
            </p>
            <ol className="list-decimal list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Cover letter.</strong> Recommended but not required for most forms. A
                one-page table of contents listing the form, the petitioner, and what's
                enclosed makes the officer's life easier.
              </li>
              <li>
                <strong>The form itself.</strong> Current edition, fully completed, signed in
                ink. Confirm the edition date in the top-right corner against USCIS.gov.
              </li>
              <li>
                <strong>Filing fee.</strong> Personal or cashier's check, money order, or Form
                G-1450 for credit/debit card.
              </li>
              <li>
                <strong>Biometric services fee</strong> where applicable. Several forms now
                include the biometric fee in the base filing fee; check the current fee
                schedule.
              </li>
              <li>
                <strong>Form G-28</strong> if you are represented by an attorney or accredited
                representative.
              </li>
              <li>
                <strong>Required supporting documents.</strong> Varies by form and case
                category. The form instructions list the minimum required initial evidence.
              </li>
              <li>
                <strong>Certified English translations</strong> for any non-English document.
                The translator's certification goes attached to (not on the back of) the
                translation.
              </li>
            </ol>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: assemble the package in this order, top to bottom. It mirrors the
              order the lockbox checks.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Choosing the right form edition
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              USCIS publishes a separate page for every form, and that page lists the currently
              accepted edition date (printed in the lower-left corner of each page of the form
              itself). The agency sometimes accepts the prior edition for a short transition
              window after revising a form, and sometimes does not — the form's page will say.
              Old editions submitted outside any transition window are rejected.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The safest practice: download the form fresh from USCIS.gov in the same week you
              mail it. Do not reuse a PDF you saved months ago. The few seconds you save are
              not worth the four-to-eight-week delay a rejected filing creates.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: a fresh download is the cheapest insurance policy in this checklist.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Filing fees under the 2024 fee rule
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The 2024 USCIS fee rule (effective April 1, 2024) was the first comprehensive
              restructuring in nearly a decade. It folded the biometric services fee into the
              base filing fee for most forms and introduced lower online fees for several
              categories. Selected fees:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>I-485 (Adjustment of Status).</strong> $1,440 with biometric services
                fee bundled in for most adult applicants.
              </li>
              <li>
                <strong>I-130 (Petition for Alien Relative).</strong> $675 paper / $625
                online.
              </li>
              <li>
                <strong>I-129 (Nonimmigrant Worker).</strong> Base fees vary by classification
                between roughly $460 and $780, with separate fees for H-1B registration and
                the Asylum Program Fee depending on employer size.
              </li>
              <li>
                <strong>I-765 (Employment Authorization).</strong> $520 paper / $470 online
                for most categories.
              </li>
              <li>
                <strong>N-400 (Naturalization).</strong> $760 paper / $710 online.
              </li>
              <li>
                <strong>I-131 (Advance Parole / Reentry Permit).</strong> $630 in most
                contexts.
              </li>
              <li>
                <strong>I-140 (Immigrant Petition for Alien Worker).</strong> $715.
              </li>
              <li>
                <strong>I-751 (Removal of Conditions).</strong> $750 with biometric fee
                included.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              These are starting points. Surcharges and discounts apply in specific
              categories (Asylum Program Fee on employer petitions, reduced fees for small
              employers and nonprofits, reduced N-400 fees for low-income applicants). Always
              confirm the current fee on USCIS.gov before writing the check.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: the fee you remember from a friend's filing two years ago is almost
              certainly wrong. Look it up the day you file.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Payment methods that actually work
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Three payment methods are accepted at the lockbox: personal check, money order
              or cashier's check, and credit/debit card via Form G-1450. There are small but
              important rules around each.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              Checks and money orders
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Make the check payable to <strong>U.S. Department of Homeland Security</strong>.
              Spell it out — not "USCIS," not "DHS," not "Dept. of Homeland Security." The
              lockbox returns checks made out to anything else. Write the form number and
              applicant's name in the memo line. If you are sending multiple forms in the same
              package, USCIS recommends separate checks for each form so that a rejection of
              one doesn't void the others.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              Form G-1450 and online filing
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The G-1450 is a half-page authorization that lets the lockbox charge a card
              (Visa, MasterCard, Amex, or Discover) for the filing fee. Use one G-1450 per
              form. If the card is declined, the entire package is rejected — confirm the card
              is not near its limit before mailing. Online filings through a USCIS account take
              card payment directly during checkout, with no paper authorization needed.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: the payee name is the single most common payment mistake. Triple-check
              that the check says "U.S. Department of Homeland Security" before you put it in
              the envelope.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Where to file
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The filing address is not on the form. It lives on a separate "Direct Filing
              Addresses" page for each form on USCIS.gov, and it depends on the form, the
              applicant's state of residence, the category, whether the case is concurrent
              with another filing, and (for employer filings) the size of the employer.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Most family- and employment-based petitions go to one of the USCIS lockboxes
              (Chicago, Phoenix, or Lewisville). Some I-129 categories and most I-130s filed
              from abroad go directly to a service center. Addresses can change with little
              notice when USCIS rebalances workload, so reconfirm the day you mail.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: do not copy a mailing address from an old guide. Look it up on the
              form's filing-addresses page the day you ship.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Supporting evidence by category
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The minimum required initial evidence for each form is in the form's
              instructions PDF. Brief sketches for the most common filings:
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              I-130 for a spouse
            </h3>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>Marriage certificate</li>
              <li>Proof of termination of any prior marriages for both spouses</li>
              <li>Petitioner's proof of U.S. citizenship or lawful permanent residence</li>
              <li>Passport-style photos of both spouses</li>
              <li>
                Evidence of a bona fide marriage — joint lease or mortgage, joint bank or
                credit card statements, joint utility bills, joint insurance, photographs
                together over time, affidavits from people who know the couple
              </li>
            </ul>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              I-485 (Adjustment of Status)
            </h3>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>Form I-693 medical exam in a sealed civil surgeon's envelope</li>
              <li>Birth certificate (with certified translation if not in English)</li>
              <li>Copy of passport biographic page and most recent I-94</li>
              <li>Two passport-style photographs</li>
              <li>Tax transcripts and/or employment verification letter</li>
              <li>Evidence of the underlying basis (approved I-130 receipt, I-140, etc.)</li>
            </ul>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              I-765 under category (c)(9)
            </h3>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>Copy of the I-485 receipt notice</li>
              <li>Two passport-style photos</li>
              <li>Copy of the most recent I-94</li>
              <li>Copy of the prior EAD (if renewal)</li>
            </ul>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">N-400</h3>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>Front and back copy of the green card</li>
              <li>Tax transcripts for the statutory period (typically 3 or 5 years)</li>
              <li>Travel history with dates of every trip outside the U.S.</li>
              <li>
                Certified court dispositions for any arrest, citation, or detention, no matter
                how minor or how long ago
              </li>
              <li>Marriage and divorce records relevant to good moral character</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: missing initial evidence does not always trigger a lockbox rejection,
              but it almost always triggers a Request for Evidence later — adding months to
              your case.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Translations and notarization
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Every non-English document submitted to USCIS must be accompanied by a full
              English translation. Selective or partial translation is not accepted — the
              translator must convert the entire document, including stamps, seals, and
              handwritten notes.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The translator signs a short certification stating they are competent to
              translate from the source language to English and that the translation is
              complete and accurate, including their name, signature, address, and date. The
              translator does not need to be professional or licensed — a competent bilingual
              friend qualifies, though a neutral third party is cleaner than an interested
              relative.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Notarization is <strong>not</strong> required for translations, and it is not
              required for most signatures on USCIS forms either.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: certified translation, yes. Notarization, no.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Passport-style photos
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Most filings require two identical passport-style photos of the
              applicant/beneficiary. The specifications are the same as for a U.S. passport: 2
              inches by 2 inches, color, full face directly facing the camera, plain white or
              off-white background, taken within the last 30 days.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Lightly write the applicant's name and A-number (or "no A-number" if none has
              been assigned) on the back of each photo in <em>pencil</em>. Ink can bleed
              through. Place the photos in a small envelope or a sealed plastic sleeve inside
              the package so they don't get stapled, bent, or stuck to other documents.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: pharmacies and shipping stores will take USCIS-spec photos for under
              $20. It is not worth trying to print them at home.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The biometrics appointment
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For most forms that require biometrics, USCIS schedules the appointment
              automatically after the filing is receipted. You get an appointment notice
              (Form I-797C) telling you to show up at a local Application Support Center
              (ASC) on a specific date. The biometric capture takes fingerprints, a
              photograph, and a signature, which feed the FBI background check.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Bring the ASC appointment notice plus a government-issued photo ID (passport,
              driver's license, or state ID). The appointment itself usually takes 15 to 30
              minutes. The biometric services fee, where it applies, is included in the form
              filing fee under the 2024 fee rule for most form types — you do not pay
              separately at the ASC.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              If you cannot make the scheduled date, request rescheduling through your USCIS
              online account. For renewals where USCIS already has biometrics on file, the
              agency may reuse them and skip the appointment entirely.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: do not skip a biometrics appointment without rescheduling. A no-show
              can trigger a denial for abandonment.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Common mistakes that delay cases
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Aside from outright lockbox rejections, another set of mistakes doesn't bounce
              the package but does add weeks to months once an officer picks up the file.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>Wrong fee amount.</strong> Under the new fee, returned for being
                short. Over the new fee, sometimes processed anyway with the difference
                refunded, but not reliably.
              </li>
              <li>
                <strong>Expired form edition.</strong> Returned at the lockbox.
              </li>
              <li>
                <strong>Missing initial evidence.</strong> Usually triggers an RFE, adding 60
                to 90 days minimum.
              </li>
              <li>
                <strong>Inconsistent addresses.</strong> The address on the form, the
                envelope's return address, and any prior USCIS correspondence should all
                match. Mismatches cause routing confusion and missed notices.
              </li>
              <li>
                <strong>Missing Form G-28 when an attorney is representing you.</strong>
                Without it, USCIS sends notices only to you and the attorney is locked out of
                the file.
              </li>
              <li>
                <strong>Stapled photos or evidence.</strong> The lockbox unstaples everything
                anyway. Use binder clips or just paper-clip sets together.
              </li>
              <li>
                <strong>Two-sided printing where one-sided is required.</strong> USCIS asks
                for single-sided pages for nearly everything.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: most "USCIS lost my case" stories trace back to one of these
              mistakes.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Online filing vs. paper
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The list of online-fileable forms has grown steadily. Most high-volume forms —
              N-400, I-90, I-130, I-765, I-131 in many categories, and a growing list of
              nonimmigrant forms — can be filed through a USCIS online account.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Online filing has real benefits: fees are generally $50 cheaper, receipt notices
              appear in your account almost immediately instead of arriving by mail, and
              status tracking, RFE responses, and address changes happen in one place.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Trade-offs: you have to upload supporting documents up front in a specific
              order, you lose the certified-mail paper trail, and complex cases with attorney
              involvement still tend to be cleaner on paper.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: for simple, single-applicant filings, online wins on cost and speed.
              For everything else, paper still has its place.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Concurrent filing
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              In several common scenarios you can file multiple forms together in a single
              package. The most common combinations:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>I-130 + I-485 + I-765 + I-131</strong> for an immediate relative
                already in the U.S. — petition, adjustment, employment authorization, and
                travel document all at once.
              </li>
              <li>
                <strong>I-140 + I-485 + I-765 + I-131</strong> for an employment-based
                applicant once their priority date is current.
              </li>
              <li>
                <strong>I-485 + I-765 + I-131</strong> for applicants whose I-130 or I-140 is
                already approved.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Concurrent filing saves time on the front end — you get the underlying petition
              and the work permit / travel document moving together. It also lets you share
              supporting documents (one set of birth certificates, one set of marriage
              records) across the package. Use a cover letter to list each form, each fee,
              and which supporting documents apply to which form.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: concurrent filing is almost always the right choice when you are
              eligible for it.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Working with an attorney vs. DIY
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Filing fees are the same whether you DIY or hire an attorney. USCIS does not
              charge more for attorney-prepared filings. So the only question is whether the
              cost of representation buys enough value for your particular case.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Straightforward family cases — a U.S. citizen petitioning for a spouse, a clean
              N-400, an I-90 replacement, a routine I-765 renewal — are viable DIY filings if
              you are organized and willing to read the instructions carefully.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Cases that strongly favor counsel: employment-based filings (PERM, I-140,
              H-1B), any criminal history including old or minor offenses, prior immigration
              violations (overstay, unauthorized work, prior removal or denial), waiver
              applications, naturalization with travel or moral-character issues, and
              anything involving litigation. For nonprofit help, the Immigration Advocates
              Network maintains a state-by-state directory; AILA's lawyer search is the
              standard tool for private attorneys.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground mb-4">
              Takeaway: simple cases DIY, complicated cases hire help. The middle ground —
              cases that look simple but have one weird wrinkle — is where most DIY filings
              go wrong, so when in doubt, pay for a one-hour consultation before you mail.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 border-t rule pt-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This article is for general informational purposes
              only and does not constitute legal advice. Immigration law is complex and
              fact-specific. Filing fees cited reflect the USCIS fee rule that took effect on
              April 1, 2024, and are subject to change; always confirm current fees and
              filing addresses on the relevant form's page at{" "}
              <a
                href="https://www.uscis.gov/forms/all-forms"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                USCIS.gov
              </a>{" "}
              before you file. For guidance about your individual situation, consult a
              licensed immigration attorney or an accredited representative of a recognized
              organization.
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
                  How USCIS processing times work — a complete guide
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
