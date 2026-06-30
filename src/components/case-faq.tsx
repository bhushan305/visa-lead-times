import { getCaseFaqs, type FAQ } from "@/lib/case-faqs";

/**
 * Per-case FAQ section. Renders 5-10 visa-specific Q&As at the bottom of
 * each case page, plus FAQ-schema JSON-LD so search engines (and AI engines)
 * can extract them as featured snippets / answer cards.
 *
 * Substantial editorial content per page — addresses Google AdSense's "thin
 * content" rejection and improves long-tail SEO.
 */
export function CaseFAQ({
  form_code,
  category,
  formCode,
}: {
  form_code: string;
  category: string;
  /** Used to vary the section heading per case. */
  formCode?: string;
}) {
  const faqs = getCaseFaqs(form_code, category);
  if (!faqs.length) return null;

  // FAQPage JSON-LD — extends the case page's existing FAQ schema for richer coverage
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section className="mt-10" aria-labelledby="case-faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <h2
        id="case-faq-heading"
        className="display text-2xl text-primary border-b rule pb-3 mb-4"
      >
        Frequently asked questions
        {formCode ? ` about ${formCode}` : ""}
      </h2>
      <div className="space-y-5">
        {faqs.map((f, i) => (
          <FaqItem key={i} faq={f} />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ faq }: { faq: FAQ }) {
  return (
    <div>
      <h3 className="text-base font-medium text-foreground mb-1.5">{faq.q}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
    </div>
  );
}
