import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route$5, S as SiteHeader, a as SiteFooter } from "./router-Be1gyKw9.mjs";
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
function FormsIndex() {
  const {
    forms
  } = Route$5.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 mx-auto max-w-6xl px-6 py-12 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b rule pb-8 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: "Index" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "display text-5xl text-primary mt-2", children: "All tracked forms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-muted-foreground max-w-2xl", children: [
          forms.length,
          " USCIS forms across ",
          forms.reduce((s, f) => s + f.count, 0),
          " case types. Pick a form to see its case categories and service centers."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)] border rule", children: forms.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/form/$code", params: {
        code: f.slug
      }, className: "bg-card p-5 hover:bg-secondary flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display text-2xl text-primary", children: f.code }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground mt-1 line-clamp-2", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-3 text-xs text-muted-foreground num", children: [
          f.count,
          " case ",
          f.count === 1 ? "type" : "types"
        ] })
      ] }, f.code)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  FormsIndex as component
};
