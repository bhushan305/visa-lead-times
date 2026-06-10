import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as Route$3, S as SiteHeader, a as SiteFooter } from "./router-CNCJAWJW.mjs";
import { S as SponsoredSlot } from "./sponsored-slot--byMLxQz.mjs";
import { r as readLastCase, b as buildSearchGrouped, L as LitwinCTA } from "./preferences-BnQAndOW.mjs";
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
function HomePage() {
  const {
    forms,
    allCases
  } = Route$3.useLoaderData();
  const [q, setQ] = reactExports.useState("");
  const [lastCase, setLastCase] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setLastCase(readLastCase());
  }, []);
  const results = reactExports.useMemo(() => buildSearchGrouped(allCases, q), [q, allCases]);
  const lastCaseMeta = reactExports.useMemo(() => lastCase ? allCases.find((c) => c.slug === lastCase) : null, [lastCase, allCases]);
  const popularCodes = ["I-485", "I-130", "I-129", "N-400", "I-765", "I-131", "I-751", "I-90"];
  const popularForms = popularCodes.map((code) => forms.find((f) => f.code === code)).filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b rule", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-16 sm:py-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: "Updated daily · Source: USCIS.gov" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "display text-5xl sm:text-7xl text-primary mt-4 leading-[1.02] max-w-4xl", children: "How long is your visa really taking?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 max-w-2xl text-lg text-muted-foreground", children: [
          "We collect USCIS-published processing times every weekday for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num text-foreground", children: allCases.length.toLocaleString() }),
          " ",
          "case types across every service center, then plot the daily trend so you can see when your wait is moving — not just where it stands today."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2", children: "Find your case" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "search", value: q, onChange: (e) => setQ(e.target.value), placeholder: "Try “I-485 employment” or “H-1B” or “N-400”", className: "w-full max-w-3xl border rule bg-card px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-ring/40" }) }),
          results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 max-w-3xl border rule bg-card divide-y divide-[var(--color-border)]", children: results.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/case/$slug", params: {
            slug: g.primarySlug
          }, className: "flex items-center justify-between gap-4 px-5 py-3 hover:bg-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "display text-base text-primary", children: g.form }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: g.category })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: g.offices.length === 1 ? g.offices[0].office : `${g.offices.length} service centers — pick on next page` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm num text-primary whitespace-nowrap", children: g.rangeDisplay ?? "—" })
          ] }, `${g.form}::${g.category}`)) })
        ] }),
        lastCaseMeta && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 inline-flex items-center gap-3 border rule bg-card px-4 py-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Last viewed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/case/$slug", params: {
            slug: lastCaseMeta.slug
          }, className: "text-primary font-medium hover:underline", children: lastCaseMeta.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num text-muted-foreground", children: lastCaseMeta.current_display })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 py-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between border-b rule pb-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display text-3xl text-primary", children: "Popular forms" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forms", className: "text-sm text-muted-foreground hover:text-primary", children: "All forms →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] border rule", children: popularForms.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/form/$code", params: {
          code: f.slug
        }, className: "bg-card p-6 hover:bg-secondary transition-colors flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Form" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "display text-3xl text-primary mt-1", children: f.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-foreground line-clamp-2", children: f.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-4 text-xs text-muted-foreground", children: [
            f.count,
            " case ",
            f.count === 1 ? "type" : "types",
            " tracked"
          ] })
        ] }, f.code)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SponsoredSlot, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LitwinCTA, { variant: "inline", context: "home:after-forms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-baseline justify-between border-b rule pb-4 mb-8 mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display text-3xl text-primary", children: "Why this exists" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Explainer, { n: "01", title: "Daily snapshots", body: "USCIS only updates timing ranges on their own schedule. We snapshot every weekday so you can see the actual cadence of change." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Explainer, { n: "02", title: "Your specific case", body: "Pick your form, category, and service center to see the published range that applies to your filing — not a national average." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Explainer, { n: "03", title: "Trend over time", body: "Daily detail for the past 30 days, monthly averages further back, then YTD and yearly USCIS historic averages — all in one chart." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function Explainer({
  n,
  title,
  body
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs num text-accent font-medium", children: n }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "display text-2xl mt-1 text-primary", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: body })
  ] });
}
export {
  HomePage as component
};
