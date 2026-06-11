import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  loader: () => {
    const site = process.env.SITE_URL ?? "https://visacasetimes.com";
    const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${site}/sitemap.xml
`;
    throw new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  },
  component: () => null,
});
