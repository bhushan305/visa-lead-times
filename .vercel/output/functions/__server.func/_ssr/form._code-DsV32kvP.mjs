import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as Route$2, S as SiteHeader, a as SiteFooter } from "./router-Be1gyKw9.mjs";
import { S as SponsoredSlot } from "./sponsored-slot-DN8x9ydN.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-BQ76axSV.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function FormPage() {
  const {
    form,
    cases,
    allForms
  } = Route$2.useLoaderData();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `USCIS Form ${form.code} processing times`,
    description: `Daily-updated processing-time ranges for USCIS Form ${form.code} (${form.title}) across ${form.count} service-center/category combinations.`,
    creator: {
      "@type": "Organization",
      name: "Visa Lead Times"
    },
    isBasedOn: "https://egov.uscis.gov/processing-times",
    keywords: [form.code, form.title, "USCIS", "processing times", "immigration"].join(", ")
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 mx-auto max-w-6xl px-6 py-12 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
        __html: JSON.stringify(jsonLd)
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-muted-foreground mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Form ",
          form.code
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b rule pb-8 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: "Form" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "display text-5xl sm:text-6xl text-primary mt-2", children: form.code }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg text-foreground max-w-3xl", children: form.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          form.count,
          " case ",
          form.count === 1 ? "type" : "types",
          " tracked"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rule bg-card divide-y divide-[var(--color-border)]", children: cases.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/case/$slug", params: {
        slug: c.slug
      }, className: "flex items-start sm:items-center flex-col sm:flex-row gap-2 sm:gap-6 px-5 py-4 hover:bg-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: c.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: c.office })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "num text-primary text-sm whitespace-nowrap", children: c.current_display ?? "—" })
      ] }, c.slug)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SponsoredSlot, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display text-2xl text-primary border-b rule pb-3 mb-6", children: "Other popular forms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] border rule", children: allForms.filter((x) => x.code !== form.code).slice(0, 8).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/form/$code", params: {
          code: f.slug
        }, className: "bg-card p-5 hover:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display text-xl text-primary", children: f.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: f.title })
        ] }, f.code)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  FormPage as component
};
