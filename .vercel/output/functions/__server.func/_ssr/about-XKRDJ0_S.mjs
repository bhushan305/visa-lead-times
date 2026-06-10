import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteHeader, a as SiteFooter } from "./router-CNCJAWJW.mjs";
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
import "./server-CuwrsFOk.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 mx-auto max-w-3xl px-6 py-16 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: "About the data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "display text-5xl text-primary mt-2", children: "Where the numbers come from" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 space-y-8 text-base text-foreground leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Source", children: [
          "All processing-time figures come directly from",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-primary underline", href: "https://egov.uscis.gov/processing-times", target: "_blank", rel: "noopener", children: "USCIS's official Processing Times tool" }),
          ". We do not modify the published ranges."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "How often we update", children: "We capture a snapshot every weekday for every tracked case type — form, category, and service center. This lets us show how often USCIS changes a published range, not just what the current range is." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "How the trend chart works", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-2 marker:text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Last 30 days" }),
            ": each point is a daily snapshot."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Earlier months" }),
            ": we average daily snapshots into a monthly value so the long-term direction is readable."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Year-to-date & prior years" }),
            ": as we accumulate more history, the chart automatically extends. We supplement with USCIS's published historic processing times where appropriate."
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "What this is not", children: "This is informational, not legal advice. Your case may be processed faster or slower than the published range. If your case is significantly outside the published range, talking with an immigration attorney is usually a good idea." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-block mt-12 text-sm text-primary underline", children: "← Back to home" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display text-2xl text-primary border-b rule pb-2 mb-3", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children })
  ] });
}
export {
  AboutPage as component
};
