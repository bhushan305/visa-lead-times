/**
 * Pre-build script — generates public/sitemap.xml from Supabase data.
 *
 * Runs as part of `npm run build` so the sitemap is a static file (served
 * by Vercel's CDN, never hits a serverless function). Cron job (or local
 * runs) keep it fresh — daily rebuild via GitHub Actions sync workflow
 * regenerates it.
 *
 * Fallback: if Supabase is unreachable at build time, writes a minimal
 * sitemap with just the static routes so deploys never fail.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const SITE_URL = process.env.SITE_URL ?? "https://visacasetimes.com";

const SUPABASE_URL =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.VITE_SUPABASE_URL;

const SUPABASE_KEY =
  process.env.SUPABASE_ANON_KEY ??
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SECRET_KEY;

async function pgrest(table: string, params = ""): Promise<any[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (!res.ok) return [];
    return (await res.json()) as any[];
  } catch {
    return [];
  }
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const urls: { loc: string; priority: number; changefreq: string }[] = [
    { loc: `${SITE_URL}/`, priority: 1.0, changefreq: "daily" },
    { loc: `${SITE_URL}/forms`, priority: 0.9, changefreq: "weekly" },
    { loc: `${SITE_URL}/guides`, priority: 0.9, changefreq: "weekly" },
    { loc: `${SITE_URL}/about`, priority: 0.5, changefreq: "monthly" },
    { loc: `${SITE_URL}/methodology`, priority: 0.5, changefreq: "monthly" },
    { loc: `${SITE_URL}/privacy`, priority: 0.3, changefreq: "yearly" },
    { loc: `${SITE_URL}/terms`, priority: 0.3, changefreq: "yearly" },
    // Guides — high SEO value, original long-form content
    { loc: `${SITE_URL}/guides/uscis-processing-times-explained`, priority: 0.8, changefreq: "monthly" },
    { loc: `${SITE_URL}/guides/what-to-do-if-case-delayed`, priority: 0.8, changefreq: "monthly" },
    { loc: `${SITE_URL}/guides/case-status-vs-processing-times`, priority: 0.8, changefreq: "monthly" },
    { loc: `${SITE_URL}/guides/filing-checklist`, priority: 0.8, changefreq: "monthly" },
    { loc: `${SITE_URL}/guides/eb-2-vs-eb-3`, priority: 0.8, changefreq: "monthly" },
    { loc: `${SITE_URL}/guides/h-1b-processing-times`, priority: 0.8, changefreq: "monthly" },
    { loc: `${SITE_URL}/guides/i-485-processing-times`, priority: 0.8, changefreq: "monthly" },
    { loc: `${SITE_URL}/guides/i-130-family-petition-times`, priority: 0.8, changefreq: "monthly" },
    { loc: `${SITE_URL}/guides/n-400-naturalization-times`, priority: 0.8, changefreq: "monthly" },
  ];

  const forms = await pgrest("forms", "select=slug");
  for (const f of forms) {
    if (f.slug) {
      urls.push({
        loc: `${SITE_URL}/form/${f.slug}`,
        priority: 0.8,
        changefreq: "daily",
      });
    }
  }

  const cases = await pgrest("cases", "select=slug");
  for (const c of cases) {
    if (c.slug) {
      urls.push({
        loc: `${SITE_URL}/case/${c.slug}`,
        priority: 0.6,
        changefreq: "daily",
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
  )
  .join("\n")}
</urlset>`;

  const out = resolve("public/sitemap.xml");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, xml, "utf-8");
  console.log(
    `Wrote ${out} with ${urls.length} URLs (${forms.length} forms, ${cases.length} cases)`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(0); // never fail the build
});
