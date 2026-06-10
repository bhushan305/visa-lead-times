import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const HREF = "https://litwinlaw.com/?utm_source=visa-lead-times&utm_medium=referral&utm_campaign=free_consult";
function withContext(context) {
  if (!context) return HREF;
  return `${HREF}&utm_content=${encodeURIComponent(context)}`;
}
function LitwinCTA({ variant, context }) {
  const href = withContext(context);
  if (variant === "sidebar") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href,
        target: "_blank",
        rel: "noopener sponsored",
        className: "block border rule bg-card p-5 group hover:border-primary transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2", children: "Sponsored · Immigration attorney" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "display text-base text-primary leading-snug", children: "Case taking longer than expected?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 leading-relaxed", children: "Litwin Law offers a free consultation for delayed USCIS cases. Talk to an attorney about your options." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-3 inline-flex items-center text-xs font-medium text-primary group-hover:underline", children: "Book free consult →" })
        ]
      }
    );
  }
  if (variant === "inline") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href,
        target: "_blank",
        rel: "noopener sponsored",
        className: "block my-6 border-l-4 border-accent bg-card px-5 py-4 group hover:border-primary transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Sponsored" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Stuck waiting on USCIS?" }),
              " Talk to an immigration attorney free for 15 minutes."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs font-medium text-primary group-hover:underline whitespace-nowrap", children: "Free consult →" })
        ] })
      }
    );
  }
  if (variant === "compact") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href,
        target: "_blank",
        rel: "noopener sponsored",
        className: "text-xs text-muted-foreground hover:text-primary",
        children: "Need legal help? Free consult at Litwin Law →"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener sponsored",
      className: "fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 text-sm font-medium shadow-lg hover:bg-primary/90",
      children: "Free immigration consult"
    }
  );
}
function isoWeekKey(d) {
  const dt = /* @__PURE__ */ new Date(d + "T00:00:00Z");
  const day = dt.getUTCDay();
  const mondayOffset = (day + 6) % 7;
  dt.setUTCDate(dt.getUTCDate() - mondayOffset);
  const monday = dt.toISOString().slice(0, 10);
  const jan1 = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
  const daysSinceJan1 = Math.floor((dt.getTime() - jan1.getTime()) / 864e5);
  const week = Math.floor(daysSinceJan1 / 7) + 1;
  const key = `${dt.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
  return { key, weekStart: monday };
}
function buildSeries(detail) {
  const points = [];
  const seenYears = /* @__PURE__ */ new Set();
  const closedYears = detail.historic.filter((h) => !h.is_ytd && typeof h.avg_months === "number").sort((a, b) => a.fiscal_year - b.fiscal_year).filter((h) => {
    if (seenYears.has(h.fiscal_year)) return false;
    seenYears.add(h.fiscal_year);
    return true;
  });
  for (const y of closedYears) {
    points.push({
      label: `FY${String(y.fiscal_year).slice(-2)}`,
      midpoint: y.avg_months,
      lo: y.avg_months,
      hi: y.avg_months,
      type: "yearly",
      date: `${y.fiscal_year}-01-01`
    });
  }
  const ytd = detail.historic.find((h) => h.is_ytd);
  const haveCurrentYearDaily = detail.daily.length > 0;
  if (ytd && !haveCurrentYearDaily) {
    points.push({
      label: `FY${String(ytd.fiscal_year).slice(-2)} YTD`,
      midpoint: ytd.avg_months,
      lo: ytd.avg_months,
      hi: ytd.avg_months,
      type: "ytd",
      date: `${ytd.fiscal_year}-06-15`
    });
  }
  const sortedDaily = [...detail.daily].sort((a, b) => a.d.localeCompare(b.d));
  if (sortedDaily.length) {
    const today = /* @__PURE__ */ new Date();
    const cutoff = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );
    cutoff.setUTCDate(cutoff.getUTCDate() - 30);
    const cutoffIso = cutoff.toISOString().slice(0, 10);
    const older = sortedDaily.filter((p) => p.d <= cutoffIso);
    const recent = sortedDaily.filter((p) => p.d > cutoffIso);
    if (older.length) {
      const byWeek = /* @__PURE__ */ new Map();
      for (const p of older) {
        const { key, weekStart } = isoWeekKey(p.d);
        if (!byWeek.has(key)) byWeek.set(key, { lo: [], hi: [], start: weekStart });
        byWeek.get(key).lo.push(p.lo);
        byWeek.get(key).hi.push(p.hi);
      }
      for (const k of [...byWeek.keys()].sort()) {
        const b = byWeek.get(k);
        const lo = avg(b.lo);
        const hi = avg(b.hi);
        points.push({
          label: (/* @__PURE__ */ new Date(b.start + "T00:00:00Z")).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          }),
          midpoint: (lo + hi) / 2,
          lo,
          hi,
          type: "weekly",
          date: b.start
        });
      }
    }
    for (const p of recent) {
      points.push({
        label: (/* @__PURE__ */ new Date(p.d + "T00:00:00Z")).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        }),
        midpoint: (p.lo + p.hi) / 2,
        lo: p.lo,
        hi: p.hi,
        type: "daily",
        date: p.d
      });
    }
  }
  return points.sort((a, b) => a.date.localeCompare(b.date));
}
function avg(xs) {
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}
function formatMonths(m) {
  if (m == null) return "—";
  if (m < 1) return `${Math.round(m * 30)} days`;
  return `${m.toFixed(1)} mo`;
}
function trendDelta(series) {
  const daily = series.filter((s) => s.type === "daily");
  if (daily.length < 2) return null;
  const first = daily[0].midpoint;
  const last = daily[daily.length - 1].midpoint;
  return { delta: last - first, pct: (last - first) / first * 100 };
}
const ALIASES = {
  h1b: { form: "I-129", subterm: "h1b" },
  h1: { form: "I-129", subterm: "h1" },
  h2a: { form: "I-129", subterm: "h2a" },
  h2b: { form: "I-129", subterm: "h2b" },
  l1: { form: "I-129", subterm: "l" },
  o1: { form: "I-129", subterm: "o" },
  h4: { form: "I-539", subterm: "h4" },
  greencard: { form: "I-485" },
  gc: { form: "I-485" },
  aos: { form: "I-485" },
  ead: { form: "I-765" },
  workpermit: { form: "I-765" },
  ap: { form: "I-131" },
  advanceparole: { form: "I-131" },
  travel: { form: "I-131" },
  citizenship: { form: "N-400" },
  naturalization: { form: "N-400" },
  fiance: { form: "I-129F" },
  k1: { form: "I-129F" },
  removeconditions: { form: "I-751" },
  roc: { form: "I-751" },
  renewgreencard: { form: "I-90" }
};
function buildSearch(allCases, query) {
  const raw = query.trim().toLowerCase();
  if (!raw) return [];
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const nTerm = norm(raw);
  if (!nTerm) return [];
  const alias = ALIASES[nTerm];
  const targetForm = alias ? norm(alias.form) : null;
  const subterm = alias?.subterm ?? null;
  const scored = [];
  for (const c of allCases) {
    const nForm = norm(c.form);
    const nName = norm(c.name);
    const nCat = norm(c.category);
    const nOff = norm(c.office);
    let score = 0;
    if (targetForm) {
      if (nForm === targetForm) {
        score += 80;
        if (subterm && (nName.includes(subterm) || nCat.includes(subterm))) {
          score += 40;
        }
      }
    }
    if (nForm === nTerm) score += 100;
    else if (nForm.startsWith(nTerm)) score += 90;
    if (nName.startsWith(nTerm)) score += 70;
    else if (nName.includes(nTerm)) score += 45;
    if (nCat.includes(nTerm)) score += 30;
    if (nOff.includes(nTerm)) score += 10;
    if (score > 0) scored.push({ c, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, 20).map((s) => s.c);
}
function buildSearchGrouped(allCases, query) {
  const hits = buildSearch(allCases, query);
  if (!hits.length) return [];
  const order = [];
  const groups = /* @__PURE__ */ new Map();
  for (const c of hits) {
    const key = `${c.form}::${c.category}`;
    if (!groups.has(key)) {
      order.push(key);
      groups.set(key, {
        form: c.form,
        category: c.category,
        offices: [],
        primarySlug: c.slug,
        rangeDisplay: c.current_display
      });
    }
    groups.get(key).offices.push({
      slug: c.slug,
      office: c.office,
      current_display: c.current_display
    });
  }
  for (const c of allCases) {
    const key = `${c.form}::${c.category}`;
    const g = groups.get(key);
    if (g && !g.offices.some((o) => o.slug === c.slug)) {
      g.offices.push({ slug: c.slug, office: c.office, current_display: c.current_display });
    }
  }
  return order.map((k) => groups.get(k)).slice(0, 12);
}
const COOKIE_NAME = "vlp_last_case";
const MAX_AGE = 60 * 60 * 24 * 180;
function rememberLastCase(slug) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(slug)}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
}
function readLastCase() {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(?:^|; )" + COOKIE_NAME + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}
export {
  LitwinCTA as L,
  buildSeries as a,
  buildSearchGrouped as b,
  rememberLastCase as c,
  formatMonths as f,
  readLastCase as r,
  trendDelta as t
};
