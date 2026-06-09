import { c as createServerRpc } from "./createServerRpc-BEnvNtoQ.mjs";
import { c as createServerFn } from "./server-BQ76axSV.mjs";
import { d as repoForms, e as repoCases } from "./repo.server-DJRlbpet.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const buildSitemap_createServerFn_handler = createServerRpc({
  id: "8bee41cb9ed06301515218938d966489142040c6a082bf2309158ca03e911892",
  name: "buildSitemap",
  filename: "src/routes/sitemap[.]xml.tsx"
}, (opts) => buildSitemap.__executeServer(opts));
const buildSitemap = createServerFn({
  method: "GET"
}).handler(buildSitemap_createServerFn_handler, async () => {
  const site = process.env.SITE_URL ?? "https://usciscasestatus.fyi";
  const [forms, cases] = await Promise.all([repoForms(), repoCases()]);
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const urls = [{
    loc: `${site}/`,
    priority: 1,
    changefreq: "daily"
  }, {
    loc: `${site}/forms`,
    priority: 0.9,
    changefreq: "weekly"
  }, {
    loc: `${site}/about`,
    priority: 0.4,
    changefreq: "monthly"
  }, ...forms.map((f) => ({
    loc: `${site}/form/${f.slug}`,
    priority: 0.8,
    changefreq: "daily"
  })), ...cases.map((c) => ({
    loc: `${site}/case/${c.slug}`,
    priority: 0.6,
    changefreq: "daily"
  }))];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>`;
  return xml;
});
export {
  buildSitemap_createServerFn_handler
};
