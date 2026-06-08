/**
 * Canonical case slug — used by the sync script (writes to Supabase) AND by
 * the live-API fallback (reads from the sheet). Both must produce identical
 * slugs so URLs are stable regardless of which backend served the request.
 *
 * Slugs are built from the human-readable category + office labels rather
 * than the raw `logical_case_name` (which contains USCIS internal codes like
 * "137-H1B1" that no one searches for). The result is keyword-rich and short
 * enough for a good URL display in search results.
 */

/** Office abbreviations USCIS uses repeatedly. Shorter = better URLs. */
const OFFICE_ABBREV: Array<[RegExp, string]> = [
  [/service\s*center\s*operations\s*\(?\s*scops\s*\)?/i, "scops"],
  [/national\s*benefits\s*center\s*\(?\s*nbc\s*\)?/i, "nbc"],
  [/california\s*service\s*center/i, "csc"],
  [/texas\s*service\s*center/i, "tsc"],
  [/nebraska\s*service\s*center/i, "nsc"],
  [/vermont\s*service\s*center/i, "vsc"],
  [/potomac\s*service\s*center/i, "psc"],
  [/all\s*field\s*offices/i, "all-offices"],
];

function normaliseOffice(s: string): string {
  let out = s;
  for (const [re, abbr] of OFFICE_ABBREV) out = out.replace(re, abbr);
  return out;
}

function stripUscisCodes(s: string): string {
  return (
    s
      // Drop bracket codes like "[(c)(26)]" — they don't help SEO
      .replace(/\[[^\]]+\]/g, " ")
      // Drop parenthetical codes EXCEPT meaningful visa categories like (H-1B), (EB-2), (K-1)
      .replace(/\(([^)]+)\)/g, (_m, inside) => {
        const meaningful = /^[A-Z]-?\d|^[A-Z]\d-?[A-Z]|^[CO]\d{1,2}$/i.test(inside.trim());
        return meaningful ? ` ${inside} ` : " ";
      })
      // Strip leading numeric form-internal codes like "137-", "134A-", "147-"
      .replace(/^[\s-]*\d{2,4}[a-z]?\s*-\s*/i, "")
      // Strip standalone tokens that look like "F21", "F11", "B12" form codes
      // when they precede actual keywords (heuristic: not before "1B" / "1A" etc.)
      .replace(/\b[A-Z]\d{2,3}\b(?!\s*[A-Z])/g, " ")
  );
}

function slugifyText(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Build a canonical slug for a (form, category, office) tuple.
 * Output examples:
 *   I-129 / H-1B - Specialty occupation - Extension / SCOPS
 *     → "i-129-h-1b-specialty-occupation-extension-scops"
 *   I-485 / Employment-based adjustment applications / All Field Offices
 *     → "i-485-employment-based-adjustment-applications-all-offices"
 *   I-765 / Based on being an H-4 spouse ... [(c)(26)] / SCOPS
 *     → "i-765-based-on-being-an-h-4-spouse-of-an-h-1b-nonimmigrant-scops"
 */
export function caseSlug(form_code: string, category: string, office: string): string {
  const form = slugifyText(form_code);
  const cat = slugifyText(stripUscisCodes(category));
  const off = slugifyText(normaliseOffice(office));
  const raw = [form, cat, off].filter(Boolean).join("-");
  // Keep under ~100 chars for clean search snippet display
  if (raw.length <= 100) return raw;
  return raw.slice(0, 100).replace(/-+[^-]*$/, ""); // trim mid-word
}

/**
 * Legacy slug used by the original logical_case_name approach. Kept so
 * existing URLs (and any external links accumulated during dev) keep working
 * — the case loader does a fallback lookup by this value.
 */
export function legacyCaseSlug(logical_case_name: string): string {
  return slugifyText(logical_case_name).slice(0, 200);
}
