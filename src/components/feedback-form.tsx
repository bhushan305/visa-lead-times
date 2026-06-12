import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";
import { submitFeedback } from "@/routes/api/feedback";

/**
 * Feedback form. Two visual variants:
 *   - "inline" → sits within content (e.g. bottom of case page)
 *   - "modal"  → floating button bottom-right that opens a modal
 *
 * Email is required; name is optional. Page context (path + case slug) is
 * captured automatically from the router for triage.
 */

type Props = {
  variant: "inline" | "modal";
  caseSlug?: string;
  /** Override the headline copy per placement. */
  title?: string;
  /** Optional short description above the form. */
  subtitle?: string;
};

function getUserId(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )vlt_uid=([^;]*)/);
  return m ? m[1] : null;
}

function FeedbackFormFields({
  caseSlug,
  onSuccess,
}: {
  caseSlug?: string;
  onSuccess: () => void;
}) {
  const submit = useServerFn(submitFeedback);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg(null);
    if (!email.trim() || !email.includes("@")) {
      setErrMsg("Please enter a valid email so we can follow up.");
      return;
    }
    if (!message.trim()) {
      setErrMsg("Please enter a message.");
      return;
    }
    setStatus("sending");
    try {
      const result = await submit({
        data: {
          email: email.trim(),
          message: message.trim(),
          user_name: name.trim() || null,
          host: typeof window !== "undefined" ? window.location.host : null,
          page_path: router.state.location.pathname,
          case_slug: caseSlug ?? null,
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
          user_id: getUserId(),
        },
      });
      if (result.ok) {
        onSuccess();
      } else {
        setStatus("error");
        setErrMsg(`Couldn't send (${result.reason}). Try again?`);
      }
    } catch (err: any) {
      setStatus("error");
      setErrMsg(err?.message ?? "Network error — try again?");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
          Name (optional)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border rule bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary"
          maxLength={120}
        />
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
          Email *
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border rule bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary"
          maxLength={320}
        />
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
          Feedback *
        </label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What worked, what didn't, what's missing?"
          className="w-full border rule bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary min-h-[100px] resize-y"
          maxLength={4000}
        />
      </div>
      {errMsg && (
        <p className="text-xs text-destructive">{errMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send feedback"}
      </button>
    </form>
  );
}

export function FeedbackForm({ variant, caseSlug, title, subtitle }: Props) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const headline = title ?? "Send feedback";
  const sub = subtitle ?? "Bug, missing data, or idea — we read every note.";

  // ESC closes the modal
  useEffect(() => {
    if (variant !== "modal" || !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [variant, open]);

  if (variant === "inline") {
    return (
      <section className="border rule bg-card p-5 sm:p-6 mt-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Feedback
        </p>
        <h2 className="display text-xl text-primary mb-1">{headline}</h2>
        <p className="text-sm text-muted-foreground mb-4">{sub}</p>
        {sent ? (
          <p className="text-sm text-foreground">
            Thanks — we got it. We'll follow up at your email if a response is
            warranted.
          </p>
        ) : (
          <FeedbackFormFields caseSlug={caseSlug} onSuccess={() => setSent(true)} />
        )}
      </section>
    );
  }

  // modal variant
  return (
    <>
      <button
        onClick={() => {
          setSent(false);
          setOpen(true);
        }}
        className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full bg-card border rule px-4 py-2.5 text-xs font-medium shadow-md hover:border-primary"
        aria-label="Send feedback"
      >
        Feedback
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-card border rule w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Feedback
            </p>
            <h2 className="display text-xl text-primary mb-1">{headline}</h2>
            <p className="text-sm text-muted-foreground mb-4">{sub}</p>
            {sent ? (
              <div>
                <p className="text-sm text-foreground mb-3">
                  Thanks — we got it.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="text-xs text-primary underline"
                >
                  Close
                </button>
              </div>
            ) : (
              <FeedbackFormFields
                caseSlug={caseSlug}
                onSuccess={() => setSent(true)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
