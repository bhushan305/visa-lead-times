import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/guides/what-to-do-if-case-delayed")({
  head: () => ({
    meta: [
      { title: "What to Do if Your USCIS Case Is Delayed | Visa Case Times" },
      {
        name: "description",
        content:
          "Step-by-step guide to remedies when your USCIS case is taking longer than normal: service requests, congressional inquiries, mandamus lawsuits, premium processing.",
      },
      {
        name: "keywords",
        content:
          "USCIS case delayed, USCIS service request, USCIS mandamus lawsuit, congressional inquiry USCIS, premium processing USCIS",
      },
      { property: "og:title", content: "What to Do if Your USCIS Case Is Delayed" },
      {
        property: "og:description",
        content:
          "Step-by-step guide to remedies when your USCIS case is taking longer than normal",
      },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: "2026-06-19" },
      {
        rel: "canonical",
        href: "https://visacasetimes.com/guides/what-to-do-if-case-delayed",
      } as any,
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What to Do if Your USCIS Case Is Delayed",
    description:
      "Step-by-step guide to remedies when your USCIS case is taking longer than normal: service requests, congressional inquiries, mandamus lawsuits, premium processing.",
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
          <span>What to Do if Your USCIS Case Is Delayed</span>
        </nav>

        {/* Article */}
        <article className="prose-content">
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Guide</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              What to Do if Your USCIS Case Is Delayed
            </h1>
            <p className="mt-4 text-lg text-foreground">
              When a USCIS case sits longer than the published processing time, there is a real
              escalation ladder you can climb — starting with a free online inquiry and ending,
              if necessary, with a federal lawsuit. This guide walks through every step in order,
              with realistic timelines, costs, and the honest tradeoffs at each rung.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Updated June 19, 2026 · 10 min read
            </p>
          </header>

          {/* Section: First check */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              First check: is your case actually delayed?
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              Before you start filing inquiries, confirm that USCIS itself considers your case
              "outside normal processing." The agency uses a specific cutoff to decide whether
              it will even respond to a status inquiry, and the rule is mechanical: compare your
              receipt date to the "case inquiry date" displayed on the{" "}
              <a
                href="https://egov.uscis.gov/processing-times"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                USCIS Processing Times tool
              </a>
              .
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">Finding your receipt date</h3>
            <p className="text-base text-foreground leading-relaxed">
              Your receipt date is printed on your Form I-797C, Notice of Action — the receipt
              notice USCIS mailed (or made available in your online account) shortly after it
              accepted your filing. It is also visible inside your{" "}
              <a
                href="https://my.uscis.gov/"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                MyUSCIS online account
              </a>{" "}
              under the case details. The receipt date is the day USCIS recorded the petition as
              received, not the day you mailed it.
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">How the inquiry date works</h3>
            <p className="text-base text-foreground leading-relaxed">
              Underneath the processing time range on the USCIS tool, you'll see a line that reads
              "Receipt date for a case inquiry: [date]." If your receipt date is earlier than
              that displayed date, USCIS treats your case as outside normal processing and will
              accept an inquiry. If your receipt date is more recent — even by a single day —
              the agency considers your case still within expected range and any inquiry will be
              closed without a substantive response.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: if your receipt date hasn't crossed the inquiry date yet, you're not
              "delayed" in USCIS's eyes. Save your effort until you're eligible to inquire.
            </p>
          </section>

          {/* Step 1 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Step 1: Submit an e-Request (online service request)
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              The cheapest and easiest first step is an online service request submitted through
              your MyUSCIS account. There is no fee. The request creates a formal record asking
              USCIS to take some action on your file, and you'll receive a service request
              identification number for follow-up.
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">When to use it</h3>
            <p className="text-base text-foreground leading-relaxed">
              USCIS will accept a service request in a handful of specific circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-accent text-base text-foreground leading-relaxed">
              <li>
                <strong>Case outside normal processing time.</strong> Your receipt date precedes
                the published case inquiry date.
              </li>
              <li>
                <strong>Non-delivery of card or document.</strong> USCIS shows your card or
                approval notice was mailed but you never received it.
              </li>
              <li>
                <strong>Typographical error.</strong> Your approval notice or card contains an
                error caused by USCIS.
              </li>
              <li>
                <strong>Appointment accommodation.</strong> You need a disability accommodation
                or rescheduling.
              </li>
              <li>
                <strong>Expedited processing request.</strong> Under USCIS expedite criteria —
                severe financial loss, emergencies, humanitarian reasons, U.S. government
                interest, or clear USCIS error. Approval is discretionary and the bar is high.
              </li>
            </ul>
            <h3 className="display text-xl text-primary mt-6 mb-2">How to file</h3>
            <p className="text-base text-foreground leading-relaxed">
              Log into your MyUSCIS account, open the relevant case, and choose "Submit a case
              inquiry." Pick the inquiry type that matches your situation. Provide your receipt
              number, any prior service request numbers, and a short factual description. Keep
              it concise — the officers who triage these requests handle large volumes and a
              short, clear narrative reads faster than a long one.
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">Realistic expectations</h3>
            <p className="text-base text-foreground leading-relaxed">
              USCIS aims to respond to service requests within 60 days, but in practice 60 to 90
              days is more typical and many responses are non-substantive — boilerplate language
              saying the case is "under review" or "pending background checks." Roughly one in
              five service requests produces a meaningful update or surfaces a parked file.
              That's not nothing, especially given the zero cost, but it's not a remedy that
              reliably moves cases forward on its own.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: always file a service request first. It's free, it creates a paper trail
              you'll need later, and occasionally it works.
            </p>
          </section>

          {/* Step 2 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Step 2: Contact the USCIS Contact Center
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              The USCIS Contact Center (1-800-375-5283) handles phone inquiries and can also
              create service requests on your behalf. For most cases, the phone option duplicates
              what you can do online — but there are two situations where it adds value.
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">When phone calls help</h3>
            <ul className="list-disc pl-5 space-y-2 marker:text-accent text-base text-foreground leading-relaxed">
              <li>
                <strong>When you need a Tier 2 officer.</strong> The first agent (Tier 1) follows
                a script and reads from the same screen you can see in your online account. If
                Tier 1 cannot answer your question, ask explicitly to be escalated to a Tier 2
                Immigration Services Officer. Tier 2 officers can see internal notes, escalate
                cases to the adjudicating office, and sometimes provide substantive information
                that isn't visible online.
              </li>
              <li>
                <strong>When you need a service request created by USCIS staff.</strong>{" "}
                Occasionally a Tier 2 officer will create a request that the online system
                wouldn't accept — for example, a more specific category of inquiry.
              </li>
            </ul>
            <h3 className="display text-xl text-primary mt-6 mb-2">What to ask</h3>
            <p className="text-base text-foreground leading-relaxed">
              Have your receipt number, A-number (if applicable), date of birth, and prior
              service request reference numbers ready. Ask: (1) is my case still pending at the
              same office or has it been transferred? (2) are there any pending requests for
              evidence or scheduled actions on my file? (3) can you create a service request and
              give me the reference number? Don't argue with Tier 1 — they don't have the
              authority to escalate adjudication. Just politely ask for Tier 2 if your answer
              isn't there.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: phone calls are most useful when you ask for Tier 2 escalation and have
              a specific question. Avoid daily calls — the Contact Center tracks repeat callers
              and may flag your record.
            </p>
          </section>

          {/* Step 3 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Step 3: USCIS Ombudsman case assistance
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              The{" "}
              <a
                href="https://www.dhs.gov/topics/cis-ombudsman"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                Citizenship and Immigration Services Ombudsman
              </a>{" "}
              is an independent office inside the Department of Homeland Security that exists to
              help individuals and employers resolve problems with USCIS. It is not part of
              USCIS itself — it has its own staff and reports separately to Congress in an
              annual report.
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">When to use it</h3>
            <p className="text-base text-foreground leading-relaxed">
              The Ombudsman accepts case assistance requests only after you've tried to resolve
              the issue directly with USCIS first — typically through a service request. It is
              designed for cases that are clearly outside normal processing or where USCIS has
              made an error it won't correct (lost file, unprocessed motion, ignored RFE
              response).
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">How to file</h3>
            <p className="text-base text-foreground leading-relaxed">
              File Form DHS-7001, "Case Assistance Form," online through the Ombudsman's case
              assistance portal. The form asks for the underlying USCIS receipt number, a
              description of the issue, the prior service request numbers you've submitted, and
              the responses you received. Upload supporting documents — receipt notices, RFE
              responses, prior correspondence. There is no fee.
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">What it can and can't do</h3>
            <p className="text-base text-foreground leading-relaxed">
              The Ombudsman cannot order USCIS to make a decision or change one it has already
              made. What it can do is escalate your case to a senior USCIS liaison, request a
              substantive review, and surface patterns of delay to leadership. In practice, a
              well-documented Ombudsman request can break loose cases that have been ignored
              through ordinary channels — especially when USCIS error is the cause. Typical
              response time is 60 to 120 days.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: file with the Ombudsman after a service request has failed, not before.
              Be specific about what went wrong and what you want.
            </p>
          </section>

          {/* Step 4 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Step 4: Congressional inquiry
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              Every U.S. Representative and Senator has a casework office whose staff help
              constituents resolve problems with federal agencies, including USCIS. Congressional
              inquiries are free, often surprisingly effective, and don't require an attorney.
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">How to file</h3>
            <p className="text-base text-foreground leading-relaxed">
              Find your Representative at house.gov and your two Senators at senate.gov. Most
              offices have a "Help with a Federal Agency" or "Casework" page with a request
              form. You will need to submit, at minimum:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-accent text-base text-foreground leading-relaxed">
              <li>A signed Privacy Act release authorizing the office to inquire on your behalf.</li>
              <li>Your full legal name, date of birth, and A-number (if assigned).</li>
              <li>Your USCIS receipt number and form type.</li>
              <li>The filing date and current case status.</li>
              <li>A brief description of the delay and what you've already tried (service requests, Ombudsman, etc.).</li>
              <li>Any time-sensitive factors — expiring underlying status, job offer at risk, family separation, etc.</li>
            </ul>
            <h3 className="display text-xl text-primary mt-6 mb-2">Realistic effectiveness</h3>
            <p className="text-base text-foreground leading-relaxed">
              Congressional inquiries vary widely by office. Some offices have full-time
              immigration caseworkers and standing relationships with USCIS liaisons; their
              inquiries get faster, more substantive responses. Other offices forward the
              inquiry and pass along whatever USCIS replies. House offices typically handle a
              higher volume of immigration casework than Senate offices and may respond faster.
              Either way, the USCIS Congressional Affairs unit must respond, usually within 30
              to 45 days.
            </p>
            <p className="text-base text-foreground leading-relaxed">
              Filing with both your Representative and one Senator is reasonable. Filing with
              all three is acceptable but unlikely to add value — USCIS often consolidates
              parallel inquiries.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: this is the most underused free remedy. It costs nothing and frequently
              produces a substantive update.
            </p>
          </section>

          {/* Step 5 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Step 5: Premium processing
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              Premium processing is a paid service that guarantees a USCIS decision — approval,
              denial, RFE, or Notice of Intent to Deny — within a fixed timeframe. It is filed on
              Form I-907 and is available only for specific forms and categories. Importantly,
              the guarantee is a decision, not an approval.
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">Which forms qualify</h3>
            <ul className="list-disc pl-5 space-y-2 marker:text-accent text-base text-foreground leading-relaxed">
              <li>
                <strong>Form I-129 (most categories).</strong> H-1B, L-1, O-1, P, R, TN, E, and
                others. Decision in 15 business days.
              </li>
              <li>
                <strong>Form I-140 (most preference categories).</strong> EB-1A, EB-1B, EB-2,
                EB-3, and EB-1C. Decision in 15 business days. Not available for some
                multinational manager categories during certain periods.
              </li>
              <li>
                <strong>Form I-539 (limited).</strong> F, M, and J change-of-status applicants,
                and dependents of certain workers. Decision in 30 business days.
              </li>
              <li>
                <strong>Form I-765 (limited).</strong> Available for F-1 students applying for
                pre-completion or post-completion OPT and STEM extensions (eligibility category
                c3), plus certain other categories USCIS has phased in. Decision in 30 business
                days.
              </li>
            </ul>
            <h3 className="display text-xl text-primary mt-6 mb-2">Current fees</h3>
            <p className="text-base text-foreground leading-relaxed">
              The Form I-907 fee varies by form type and ranges from roughly $1,500 to $2,805,
              with the highest fees attached to I-140 and certain I-129 categories. Fees were
              last adjusted following the 2024 USCIS fee rule. Always confirm the current fee
              on the{" "}
              <a
                href="https://www.uscis.gov/i-907"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                Form I-907 page
              </a>{" "}
              before filing.
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">What it doesn't do</h3>
            <p className="text-base text-foreground leading-relaxed">
              Premium processing accelerates USCIS adjudication only. It does not speed up FBI
              name checks, State Department visa availability (priority date currency), consular
              processing abroad, or any other agency's piece of your case. If a security check
              is pending, USCIS can — and sometimes does — issue an RFE or hold the case open,
              fulfilling the "decision" requirement without actually adjudicating.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: if your form qualifies and you can afford the fee, premium processing
              is the fastest legal remedy. Just know exactly what it guarantees and what it
              doesn't.
            </p>
          </section>

          {/* Step 6 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Step 6: Writ of mandamus (federal lawsuit)
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              A writ of mandamus is a federal court action asking a judge to order a federal
              agency to perform a non-discretionary duty it has unreasonably delayed. For USCIS
              cases, the duty is straightforward: the agency has a legal obligation to make a
              decision on a properly filed petition within a reasonable time. Mandamus does not
              ask the court to approve your case — only to order USCIS to decide it.
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">When to consider it</h3>
            <p className="text-base text-foreground leading-relaxed">
              Mandamus is a last-resort tool for cases that are clearly past the published
              processing time — typically months or years past — and where the lower-cost
              remedies above haven't moved the file. It is most effective for I-485, I-130,
              I-140, I-751, N-400, and I-765 cases stuck in adjudication. It is generally less
              useful where the delay is caused by something USCIS cannot control (visa
              availability under the Visa Bulletin, for example).
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">How it works</h3>
            <p className="text-base text-foreground leading-relaxed">
              An immigration attorney files a complaint in the U.S. District Court covering
              your jurisdiction, naming USCIS and DHS officials as defendants. The U.S.
              Attorney's Office and USCIS Office of Chief Counsel handle the defense. In the
              vast majority of cases, USCIS adjudicates the underlying petition before the case
              reaches a substantive court ruling — they would rather decide your case than
              litigate it. Typical timeline from filing to adjudication is 60 to 120 days,
              though some cases resolve much faster.
            </p>
            <h3 className="display text-xl text-primary mt-6 mb-2">Cost</h3>
            <ul className="list-disc pl-5 space-y-2 marker:text-accent text-base text-foreground leading-relaxed">
              <li>
                <strong>Federal court filing fee:</strong> $402 (the standard civil filing fee in
                U.S. District Court).
              </li>
              <li>
                <strong>Attorney fees:</strong> typically $3,000 to $8,000 flat, depending on
                attorney and case complexity. Some firms offer reduced fees for relatively
                straightforward mandamus filings.
              </li>
              <li>
                <strong>Process server and miscellaneous costs:</strong> a few hundred dollars.
              </li>
            </ul>
            <h3 className="display text-xl text-primary mt-6 mb-2">Effectiveness and risks</h3>
            <p className="text-base text-foreground leading-relaxed">
              For genuinely-stuck cases, mandamus is one of the most effective tools available.
              Practitioner reports and AILA surveys consistently show high adjudication rates
              within months of filing. The risk is that USCIS, once compelled to decide, can
              deny — and a forced denial is harder to challenge than continued silence. For
              that reason, mandamus is best used on cases where you believe the underlying
              petition is approvable. An experienced attorney will evaluate the file before
              recommending the filing.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: mandamus works, but it's a real federal lawsuit. Hire an experienced
              immigration litigator, and only after the cheaper steps have run their course.
            </p>
          </section>

          {/* Step 7 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Step 7: APA "unreasonable delay" claims
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              Some attorneys file a related cause of action under the Administrative Procedure
              Act (5 U.S.C. § 706(1)), which authorizes a court to "compel agency action
              unlawfully withheld or unreasonably delayed." APA claims are often pleaded
              alongside mandamus in the same complaint — they offer the court a second legal
              theory and can be more flexible than the strict mandamus standard. The mechanics,
              cost, and timeline are essentially the same as mandamus. Which theory leads in the
              complaint is a strategic call for your attorney; from your perspective as the
              plaintiff, the practical effect is identical.
            </p>
          </section>

          {/* What not to do */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              What not to do
            </h2>
            <ul className="list-disc pl-5 space-y-2 marker:text-accent text-base text-foreground leading-relaxed">
              <li>
                <strong>Don't refile the same petition.</strong> Filing a duplicate creates two
                receipt numbers, two files, and frequent confusion at the service center. Both
                can be flagged and held while officers reconcile. The original petition's
                priority date is also placed at risk.
              </li>
              <li>
                <strong>Don't ignore RFE or NOID deadlines.</strong> A Request for Evidence
                typically gives you 87 days; a Notice of Intent to Deny typically gives 30.
                Miss them and USCIS will deny the case — and the denial itself becomes a new
                obstacle that mandamus cannot fix.
              </li>
              <li>
                <strong>Don't call the Contact Center daily.</strong> Tier 1 cannot move your
                case. Repeated calls without new information are flagged in your record and can
                slow help when you do need it.
              </li>
              <li>
                <strong>Don't post your A-number or receipt number publicly.</strong> Forums and
                Reddit threads are full of well-meaning advice, but doxxing your case identifiers
                creates real fraud exposure.
              </li>
              <li>
                <strong>Don't ignore address changes.</strong> File Form AR-11 within 10 days of
                any move. A missed notice because of a stale address has derailed countless
                otherwise-approvable cases.
              </li>
            </ul>
          </section>

          {/* Documenting */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Documenting your case
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              Every step on the escalation ladder benefits from clean documentation. A
              congressional caseworker has an easier time pushing your file when you hand them a
              tidy chronology; a mandamus complaint is faster (and cheaper) to draft when your
              attorney isn't reconstructing the timeline from scratch.
            </p>
            <p className="text-base text-foreground leading-relaxed">Keep, at minimum:</p>
            <ul className="list-disc pl-5 space-y-2 marker:text-accent text-base text-foreground leading-relaxed">
              <li>Your receipt notice (Form I-797C) and the official receipt date.</li>
              <li>Copies of any RFEs, NOIDs, or transfer notices you've received.</li>
              <li>Copies of your responses to any USCIS requests, with proof of timely delivery.</li>
              <li>Every service request reference number and the date filed.</li>
              <li>A short log of every Contact Center call — date, time, agent name or ID, tier, and substance.</li>
              <li>The case inquiry date and processing time displayed on USCIS's tool on the day you check, screenshot if helpful.</li>
              <li>Copies of your congressional and Ombudsman submissions and their responses.</li>
            </ul>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: a simple folder or shared drive saves you hours later. Start it the day
              you file.
            </p>
          </section>

          {/* When to hire attorney */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              When to hire an immigration attorney
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              You don't need an attorney for service requests, Contact Center calls, Ombudsman
              filings, or congressional inquiries. Those are designed for self-represented
              filers and the value of a paid representative on those steps is limited.
            </p>
            <p className="text-base text-foreground leading-relaxed">
              Attorney representation is high-value in these scenarios:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-accent text-base text-foreground leading-relaxed">
              <li>
                You are considering a writ of mandamus or APA action. Mandamus is a federal
                lawsuit; self-representation is technically allowed but rarely advisable.
              </li>
              <li>
                You've received an RFE or NOID and the requested evidence is something you can't
                easily produce — a missing civil document from a difficult jurisdiction, for
                example.
              </li>
              <li>
                Your delay is intertwined with a denial, a Notice to Appear (NTA), or removal
                proceedings.
              </li>
              <li>
                You have prior immigration violations, criminal history, or any inadmissibility
                issue that a forced decision might trigger.
              </li>
              <li>
                Your case involves a complex employment-based filing where the underlying job
                circumstances have changed since filing.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed">
              For finding counsel, the{" "}
              <a
                href="https://www.ailalawyer.com/"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                AILA Immigration Lawyer Search
              </a>{" "}
              and the{" "}
              <a
                href="https://www.immigrationadvocates.org/nonprofit/legaldirectory/"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                Immigration Advocates Network legal directory
              </a>{" "}
              are reliable starting points. The latter lists nonprofit and low-cost providers
              for filers who cannot afford private representation.
            </p>
          </section>

          {/* Realistic expectations */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Realistic expectations
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              The honest reality is that most cases simply need patience. The published
              processing times reflect a system under significant load — staffing shortfalls,
              shifting workload between humanitarian and traditional caseloads, and the lingering
              effects of pandemic-era hiring freezes. The vast majority of delays have nothing
              to do with anything you did or didn't do; they reflect where in the queue your
              file happened to land.
            </p>
            <p className="text-base text-foreground leading-relaxed">
              That said, the escalation ladder works in the order presented. Service requests
              catch parked files. Congressional inquiries get substantive responses where
              service requests get boilerplate. Mandamus moves cases that have been stuck for
              years. Premium processing, where available, is often the cleanest option.
            </p>
            <p className="text-base text-foreground leading-relaxed">
              Most filers never need any of these. Most who do need them succeed with the first
              one or two steps. The handful who need mandamus generally get a result. Knowing
              the options exist often makes the waiting itself less anxious, even if you never
              file anything.
            </p>
            <p className="text-base text-foreground leading-relaxed italic text-muted-foreground">
              Takeaway: start cheap, escalate methodically, document everything, and don't
              skip steps. The system is slow but it does respond to pressure applied through
              the right channels.
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
                  to="/guides/case-status-vs-processing-times"
                  className="text-primary hover:underline"
                >
                  Case status vs processing times
                </Link>
              </li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section className="mt-8 p-4 border rule bg-card text-xs text-muted-foreground">
            <strong className="text-foreground">Disclaimer:</strong> This article is for general
            information only and is not legal advice. Immigration law is complex and
            case-specific. Statistics and procedures cited are drawn from USCIS published
            materials, USCIS Ombudsman annual reports, and AILA practice advisories; figures
            change and should be verified against current USCIS guidance before acting. For
            advice on your situation, consult a licensed immigration attorney or an accredited
            representative of a recognized organization.
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
