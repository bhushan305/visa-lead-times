/**
 * Mapping of USCIS form codes to the most relevant guide slug(s).
 *
 * Used by case pages and form pages to deep-link readers from a specific
 * case's chart into the long-form guide that explains the underlying form.
 * Provides strong internal-linking signals for SEO and topical authority.
 */

export type GuideRef = { slug: string; title: string };

/** Every guide we've published. Keep in sync with src/routes/guides/*.tsx. */
export const ALL_GUIDES: Record<string, GuideRef> = {
  "uscis-processing-times-explained": {
    slug: "uscis-processing-times-explained",
    title: "How USCIS processing times work",
  },
  "what-to-do-if-case-delayed": {
    slug: "what-to-do-if-case-delayed",
    title: "What to do if your case is delayed",
  },
  "case-status-vs-processing-times": {
    slug: "case-status-vs-processing-times",
    title: "Case status vs processing times",
  },
  "filing-checklist": {
    slug: "filing-checklist",
    title: "USCIS filing checklist",
  },
  "eb-2-vs-eb-3": {
    slug: "eb-2-vs-eb-3",
    title: "EB-2 vs EB-3 — which is faster?",
  },
  "h-1b-processing-times": {
    slug: "h-1b-processing-times",
    title: "H-1B processing times in 2026",
  },
  "i-485-processing-times": {
    slug: "i-485-processing-times",
    title: "I-485 adjustment of status processing times",
  },
  "i-130-family-petition-times": {
    slug: "i-130-family-petition-times",
    title: "I-130 family petition processing times",
  },
  "n-400-naturalization-times": {
    slug: "n-400-naturalization-times",
    title: "N-400 naturalization processing times",
  },
};

/**
 * Form code → ordered list of relevant guide slugs (most relevant first).
 * Each form gets 1-3 recommended guides surfaced on its case pages.
 */
const FORM_TO_GUIDES: Record<string, string[]> = {
  "I-129": ["h-1b-processing-times", "what-to-do-if-case-delayed", "filing-checklist"],
  "I-130": ["i-130-family-petition-times", "i-485-processing-times", "what-to-do-if-case-delayed"],
  "I-140": ["eb-2-vs-eb-3", "i-485-processing-times", "what-to-do-if-case-delayed"],
  "I-485": ["i-485-processing-times", "eb-2-vs-eb-3", "what-to-do-if-case-delayed"],
  "I-765": ["i-485-processing-times", "what-to-do-if-case-delayed", "uscis-processing-times-explained"],
  "I-131": ["i-485-processing-times", "uscis-processing-times-explained"],
  "I-751": ["i-485-processing-times", "what-to-do-if-case-delayed"],
  "I-129F": ["i-130-family-petition-times", "filing-checklist"],
  "I-539": ["filing-checklist", "what-to-do-if-case-delayed", "uscis-processing-times-explained"],
  "N-400": ["n-400-naturalization-times", "what-to-do-if-case-delayed", "uscis-processing-times-explained"],
  "I-90": ["uscis-processing-times-explained", "what-to-do-if-case-delayed"],
  "I-821D": ["what-to-do-if-case-delayed", "uscis-processing-times-explained"],
  "I-821": ["what-to-do-if-case-delayed", "uscis-processing-times-explained"],
  "I-526": ["i-485-processing-times", "filing-checklist"],
  "I-526E": ["i-485-processing-times", "filing-checklist"],
  "I-829": ["i-485-processing-times", "what-to-do-if-case-delayed"],
  "I-360": ["what-to-do-if-case-delayed", "filing-checklist"],
  "I-601A": ["what-to-do-if-case-delayed", "filing-checklist"],
  "I-730": ["what-to-do-if-case-delayed", "uscis-processing-times-explained"],
  "I-914": ["what-to-do-if-case-delayed", "uscis-processing-times-explained"],
  "I-918": ["what-to-do-if-case-delayed", "uscis-processing-times-explained"],
};

/** Fallback when a form has no specific mapping. */
const DEFAULT_GUIDES = [
  "uscis-processing-times-explained",
  "what-to-do-if-case-delayed",
  "filing-checklist",
];

/** Get up to 3 most-relevant guides for a given form code. */
export function getGuidesForForm(form_code: string): GuideRef[] {
  const slugs = FORM_TO_GUIDES[form_code] ?? DEFAULT_GUIDES;
  return slugs
    .map((s) => ALL_GUIDES[s])
    .filter((g): g is GuideRef => Boolean(g))
    .slice(0, 3);
}

/** Get the single most-relevant guide for the form, if any. */
export function getPrimaryGuideForForm(form_code: string): GuideRef | null {
  const guides = getGuidesForForm(form_code);
  return guides[0] ?? null;
}
