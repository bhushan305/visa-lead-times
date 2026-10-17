/**
 * Canonical public origin for the site.
 *
 * www.visacasetimes.com is the Vercel primary domain (project
 * "visa-lead-times-v2"). visacasetimes.com 308-redirects to it, and
 * usciscasetimes.com serves the same pages, so every page points its
 * canonical tag here to consolidate SEO signals onto one host.
 *
 * Hardcoded on purpose: canonical URLs must be identical on the server and
 * the client, and must not depend on a deploy-time env var (a stale
 * SITE_URL=https://usciscasestatus.fyi in Vercel once sent every sitemap URL
 * and canonical to a domain that doesn't exist).
 */
export const SITE_URL = "https://www.visacasetimes.com";

/** Absolute canonical URL for a site path, e.g. canonicalUrl("/forms"). */
export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
