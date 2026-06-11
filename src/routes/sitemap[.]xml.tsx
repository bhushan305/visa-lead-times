import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { repoForms, repoCases } from "@/lib/data/repo.server";

/**
 * Dynamic sitemap with all forms + cases.
 * Cached for 6 hours since URL set only changes when new cases appear.
 */
const buildSitemap = createServerFn({ method: "GET" }).handler(async () => {
  const site = process.env.SITE_URL ?? "https://visacasetimes.com";
  const [forms, cases] = await Promise.all([repoForms(), repoCases()]);
  const today = new Date().toISOString().slice(0, 10);

  const urls: { loc: string; priority: number; changefreq: string }[] = [
    { loc: `${site}/`, priority: 1.0, changefreq: "daily" },
    { loc: `${site}/forms`, priority: 0.9, changefreq: "weekly" },
    { loc: `${site}/about`, priority: 0.4, changefreq: "monthly" },
    ...forms.map((f) => ({
      loc: `${site}/form/${f.slug}`,
      priority: 0.8,
      changefreq: "daily",
    })),
    ...cases.map((c) => ({
      loc: `${site}/case/${c.slug}`,
      priority: 0.6,
      changefreq: "daily",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
  )
  .join("\n")}
</urlset>`;
  return xml;
});

export const Route = createFileRoute("/sitemap.xml")({
  loader: async () => {
    const xml = await buildSitemap();
    throw new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=21600, s-maxage=21600",
      },
    });
  },
  component: () => null,
});
