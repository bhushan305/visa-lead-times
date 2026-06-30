import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/guides/case-status-vs-processing-times")({
  head: () => ({
    meta: [
      { title: "USCIS Case Status vs Processing Times — What's the Difference? | Visa Case Times" },
      {
        name: "description",
        content:
          "Side-by-side comparison of USCIS case status (your specific case's current step) vs processing times (a statistical estimate). When each tool is useful.",
      },
      {
        name: "keywords",
        content:
          "USCIS case status vs processing times, USCIS case status meaning, USCIS receipt number lookup, USCIS processing times difference, MyUSCIS account",
      },
      {
        property: "og:title",
        content: "USCIS Case Status vs Processing Times — What's the Difference?",
      },
      {
        property: "og:description",
        content:
          "Side-by-side comparison of USCIS case status (your specific case's current step) vs processing times (a statistical estimate). When each tool is useful.",
      },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: "2026-06-19" },
      {
        rel: "canonical",
        href: "https://visacasetimes.com/guides/case-status-vs-processing-times",
      } as any,
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "USCIS Case Status vs Processing Times — What's the Difference?",
    description:
      "Side-by-side comparison of USCIS case status (your specific case's current step) vs processing times (a statistical estimate). When each tool is useful.",
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
          <span>Case Status vs Processing Times</span>
        </nav>

        {/* Article */}
        <article className="prose-content">
          <header className="border-b rule pb-6 mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Guide</p>
            <h1 className="display text-4xl sm:text-5xl text-primary mt-2 leading-[1.05]">
              USCIS Case Status vs Processing Times
            </h1>
            <p className="mt-4 text-lg text-foreground">
              They both live on egov.uscis.gov, they both involve "your case," and they get confused
              constantly. But the case status tool and the processing times tool answer completely
              different questions. Knowing which to check — and when — is one of the first skills of
              navigating a pending USCIS file.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Updated June 19, 2026 · 6 min read
            </p>
          </header>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The two tools at a glance
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              USCIS publishes two public lookup tools that filers reach for constantly, and they
              look superficially similar. Both live on the egov subdomain. Both have plain forms
              and a single button. Both return something about "your case." But they answer
              fundamentally different questions, and reading the wrong one is a guaranteed way to
              get more anxious instead of less.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>
                  <a
                    href="https://egov.uscis.gov/casestatus"
                    target="_blank"
                    rel="noopener"
                    className="text-primary underline"
                  >
                    egov.uscis.gov/casestatus
                  </a>
                </strong>{" "}
                — Takes a 13-character receipt number (like SRC2490012345). Returns the current
                step of that one specific case.
              </li>
              <li>
                <strong>
                  <a
                    href="https://egov.uscis.gov/processing-times"
                    target="_blank"
                    rel="noopener"
                    className="text-primary underline"
                  >
                    egov.uscis.gov/processing-times
                  </a>
                </strong>{" "}
                — Takes a form number, category, and office. Returns a statistical estimate of
                completion time for cases like yours.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The case status tool is a per-file lookup. The processing times tool is a population
              statistic. One is about you; the other is about everyone else.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              What each tool actually tells you
            </h2>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Case status</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The case status tool reports the most recent event recorded against your receipt
              number. That event is one of a small set of standardized strings USCIS uses, with
              messages like "Case Was Received and A Receipt Notice Was Mailed," "Request for
              Initial Evidence Was Sent," or "Decision Notice Was Mailed." There is also a free
              text paragraph underneath the heading that paraphrases the same event.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Crucially, the tool only reports events that triggered a notice or system update. If
              an officer pulled your file, reviewed it for an hour, and put it back without
              issuing a notice, the case status will show nothing new. The status reflects mail
              and database flags, not officer activity.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Processing times</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The processing times tool reports a range — typically presented as something like
              "9 months to 14.5 months" — that describes recently completed cases of the same
              form, category, and office. The upper bound is the 80th percentile completion time;
              80% of cases finished within that window. The lower bound, under the current
              methodology, is the median. We cover the math in detail in our companion explainer
              on{" "}
              <Link
                to="/guides/uscis-processing-times-explained"
                className="text-primary underline"
              >
                how USCIS processing times work
              </Link>
              .
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The tool also publishes a "receipt date for a case inquiry," which is the cutoff
              date for filing a service request. Both numbers are statistics about a population of
              completed cases. They are not predictions about your file.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Why people confuse the two
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The confusion is understandable. Both tools live under the same egov.uscis.gov
              umbrella with similar URL structures. Both ask you to enter information about your
              case. Both return a screen that talks about "your case" in some form. And both feel,
              from the filer's perspective, like the same question: "Where am I in this process?"
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The mental model that works: case status is a notification feed about your specific
              file. Processing times are a weather forecast about a whole population of files. The
              forecast tells you what season it is; the notification feed tells you when the rain
              actually hits your roof. Mistake one for the other and you will either panic at
              month four or sit refreshing the page for half a year waiting on an update that
              isn't coming.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Reading case status messages
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              USCIS uses a fixed vocabulary of status messages. The exact wording varies a little
              by form, but the common ones include:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong>"Case Was Received and A Receipt Notice Was Mailed."</strong> The most
                common starting state. USCIS has accepted your filing, assigned it a receipt
                number, and put a Form I-797C notice in the mail. This status alone tells you
                nothing about adjudication progress; it just means the file exists in the system.
              </li>
              <li>
                <strong>"Case Was Updated to Show Fingerprints Were Taken."</strong> Biometrics
                are complete and on file. Common for I-485, N-400, I-765, and a few other forms.
              </li>
              <li>
                <strong>"Request for Initial Evidence Was Sent" (RFE).</strong> The officer found
                something missing or unclear and has mailed a request. Read the letter carefully
                when it arrives; the response deadline is firm.
              </li>
              <li>
                <strong>"Interview Was Scheduled."</strong> A field office has put you on the
                interview calendar. You will receive a separate notice with date, time, and
                location.
              </li>
              <li>
                <strong>"Case Was Approved" or "New Card Is Being Produced."</strong> The
                substantive decision is favorable. For green-card and EAD cases, card production
                is its own brief subsequent stage.
              </li>
              <li>
                <strong>"Decision Notice Was Mailed."</strong> A formal decision letter is on the
                way. This wording is used for both approvals and denials; you will not know which
                until the letter arrives.
              </li>
              <li>
                <strong>"Card Was Mailed to Me" / "Card Was Delivered to Me by the Post
                Office."</strong> For card-producing benefits, the physical end of the journey.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Be honest with yourself about cadence. USCIS case status updates are sparse. It is
              entirely normal for a case to sit at "Case Was Received" for many months — sometimes
              the entire processing window — without a single intermediate update. The absence of
              new status messages is not evidence that nothing is happening. It is evidence that
              nothing has happened yet that triggers a notice.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Reading the processing times page
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The processing times tool returns three useful pieces of information: the range, the
              case inquiry date, and (in most cases) a small explainer about methodology. The
              range is a 50th-to-80th percentile band of recently completed cases. If your case is
              younger than the lower number, you are squarely within the normal window. If you are
              between the lower and upper numbers, you are in the typical-to-slow zone. If you are
              past the upper number, you are part of the slowest 20% — which is still a normal
              statistical bucket, but worth paying attention to.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For the full mechanics of how those numbers are calculated, refresh cadence, and why
              they vary so dramatically by office, see{" "}
              <Link
                to="/guides/uscis-processing-times-explained"
                className="text-primary underline"
              >
                how USCIS processing times work
              </Link>
              .
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              When to use case status
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Reach for case status when the question is specific to your file:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                You want to confirm USCIS actually received and accepted your filing after you
                mailed it.
              </li>
              <li>
                You got a paper notice — interview, RFE, biometrics, approval — and want to
                confirm a matching online record before responding.
              </li>
              <li>
                You are checking whether anything has changed since your last visit (e.g., looking
                for an interview being scheduled, or for the case moving to card production after
                an approval).
              </li>
              <li>
                You are about to call the USCIS Contact Center and need your latest status
                message in front of you to reference.
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Case status is the right tool when the question starts with "what is happening with
              my case right now."
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              When to use processing times
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Reach for processing times when the question is about timing and planning rather
              than the current state of your file:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                You are deciding when to book travel, start a job search, sign a lease, or make
                another life decision that hinges on an approval.
              </li>
              <li>
                You are evaluating whether your case is "delayed" relative to recent norms at
                your office.
              </li>
              <li>
                You are checking whether you have crossed the case inquiry date and can submit a
                service request.
              </li>
              <li>
                You are comparison-shopping offices or strategies (for instance, deciding whether
                a transfer between service centers is worth requesting).
              </li>
            </ul>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Processing times is the right tool when the question starts with "when should I
              expect" or "is this normal."
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              How the two tools connect: the case inquiry date
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The clearest place the two tools meet is the case inquiry date. The processing
              times page publishes a receipt-date cutoff; if your receipt date (printed on your
              I-797C and stored in your case status record) is older than that cutoff, USCIS
              considers your case outside the normal window and will accept a service request.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Once you cross that line, the actual submission of a service request happens from
              the case status side of the house. Sign into your MyUSCIS online account, navigate
              to the relevant receipt, and you will see an "e-Request" or "Submit a case inquiry"
              option attached to it. The processing times page tells you whether you are eligible;
              the case status page is where you actually act.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              This is the one workflow where filers really do need to read both tools together,
              and where confusing them costs you the most. Filing an inquiry before you are
              eligible just generates an auto-close response. Waiting too long after you become
              eligible costs you weeks of potential follow-up.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              The limits of both tools
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Neither tool tells you the whole story, and it is worth being honest about what each
              one cannot do.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>Case status does not tell you why your case is stuck.</strong> It will
              cheerfully display "Case Was Received" for fourteen months without explaining
              whether you are sitting in a background-check queue, waiting on a transfer, or just
              behind a long line of cases ahead of you. The status messages are descriptive of
              events, not diagnostic of delays.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>Processing times do not predict your individual case.</strong> The
              percentile band is a backward-looking summary of cases USCIS has already finished.
              Your case is one new data point that may resolve anywhere in or outside that range,
              depending on its individual fact pattern, the officer it gets assigned to, and
              factors no statistical model can capture.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              For the trend context that neither USCIS tool provides — how completion times are
              moving month over month, where your filing date sits relative to others currently
              waiting — combine the official tools with community-data sites like{" "}
              <Link to="/" className="text-primary underline">
                ours
              </Link>
              . Triangulating between the official numbers and aggregated user-reported data
              tends to produce a more honest read than either source on its own.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Common scenarios and what to do
            </h2>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              "My case status hasn't updated in six months — is that normal?"
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Usually yes. For forms with long processing windows — I-130, I-485, I-751, I-140 in
              regular processing — long stretches at "Case Was Received" are the default
              experience, not an exception. The first thing to do is open the processing times
              tool, find your form and office, and compare your receipt date against the case
              inquiry date. If you are still inside the normal window, the silence is expected.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              "My case is past the upper processing time — what now?"
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              You are in the slowest 20% bucket and you have some real options. Start with an
              online service request, escalate to a congressional inquiry or USCIS Ombudsman
              request if needed, and consider consulting an immigration attorney about whether a
              mandamus suit makes sense. Our guide on{" "}
              <Link
                to="/guides/what-to-do-if-case-delayed"
                className="text-primary underline"
              >
                what to do if your USCIS case is delayed
              </Link>{" "}
              walks through that escalation ladder in detail.
            </p>
            <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
              "Processing times say 12 months but I want to plan based on actual data."
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              The published number is the best official anchor you will get, but it is genuinely
              an average across recently completed cases — including ones filed under different
              conditions than yours. Pair it with current month-over-month trend data and
              community reports to get a feel for whether your office is speeding up or slowing
              down. Use the upper bound as a planning cushion, not a deadline.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="display text-2xl text-primary mt-10 mb-3">
              Don't refresh — get notified
            </h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              If you find yourself reloading the case status page daily, sign up for a MyUSCIS
              online account at <strong>my.uscis.gov</strong> and link your receipt to it. Once
              linked, USCIS will email you whenever the case status changes, so the page comes to
              you instead of the other way around. Account-linked cases also expose the e-Request
              flow and let you view PDFs of issued notices directly, which is faster than waiting
              for the paper copy in some categories.
            </p>
            <p className="text-base text-foreground leading-relaxed mb-4">
              There is also a USCIS mobile app for iOS and Android with the same tracking and
              notification features. None of this makes your case move faster, but it removes the
              compulsive refresh loop. For the processing-times side, there is no official
              subscription product — which is part of why third-party sites that chart USCIS data
              over time exist.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 border-t rule pt-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This article is for general informational purposes
              only and does not constitute legal advice. Immigration law is complex and
              fact-specific. For guidance about your individual situation, consult a licensed
              immigration attorney or an accredited representative of a recognized organization.
              Status message wording, tool URLs, and account features change over time; always
              confirm against the current{" "}
              <a
                href="https://egov.uscis.gov/casestatus"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                USCIS Case Status
              </a>{" "}
              and{" "}
              <a
                href="https://egov.uscis.gov/processing-times"
                target="_blank"
                rel="noopener"
                className="text-primary underline"
              >
                Processing Times
              </a>{" "}
              tools before acting.
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
