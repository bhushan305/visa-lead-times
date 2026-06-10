import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { d as Route$1, S as SiteHeader, F as FeedbackForm, a as SiteFooter } from "./router-CNCJAWJW.mjs";
import { S as SponsoredSlot } from "./sponsored-slot--byMLxQz.mjs";
import { a as buildSeries, t as trendDelta, c as rememberLastCase, f as formatMonths, L as LitwinCTA } from "./preferences-BnQAndOW.mjs";
import "../_libs/seroval.mjs";
import { R as ResponsiveContainer, C as ComposedChart, a as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, b as ReferenceArea, A as Area, L as Line } from "../_libs/recharts.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function ProcessingTimeChart({ series }) {
  if (!series.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rule bg-card p-8 text-sm text-muted-foreground", children: "No time-series data yet for this case. We collect new snapshots every weekday." });
  }
  const findFirstOfType = (t) => series.find((p) => p.type === t)?.label ?? null;
  const findLastLabel = () => series[series.length - 1]?.label ?? null;
  const dailyStart = findFirstOfType("daily");
  const dailyEnd = findLastLabel();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rule bg-card p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Processing time trend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "display text-2xl text-primary", children: "Months to decision" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", height: 340 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ComposedChart, { data: series, margin: { top: 8, right: 16, bottom: 8, left: -8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "rangeFill", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-primary)", stopOpacity: 0.18 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-primary)", stopOpacity: 0.02 })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", vertical: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        XAxis,
        {
          dataKey: "label",
          tick: { fontSize: 11, fill: "var(--color-muted-foreground)" },
          stroke: "var(--color-rule)",
          interval: "preserveStartEnd"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        YAxis,
        {
          tick: { fontSize: 11, fill: "var(--color-muted-foreground)" },
          stroke: "var(--color-rule)",
          unit: " mo",
          width: 60
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, {}), cursor: { stroke: "var(--color-rule)" } }),
      dailyStart && dailyEnd && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReferenceArea,
        {
          x1: dailyStart,
          x2: dailyEnd,
          fill: "var(--color-primary)",
          fillOpacity: 0.04,
          stroke: "var(--color-rule)",
          strokeOpacity: 0.3,
          strokeDasharray: "3 3",
          label: {
            value: "Last 30 days",
            position: "insideTop",
            fontSize: 10,
            fill: "var(--color-muted-foreground)",
            offset: 6
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Area,
        {
          type: "monotone",
          dataKey: "hi",
          stroke: "none",
          fill: "url(#rangeFill)",
          activeDot: false,
          isAnimationActive: false
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Area,
        {
          type: "monotone",
          dataKey: "lo",
          stroke: "none",
          fill: "var(--color-background)",
          activeDot: false,
          isAnimationActive: false
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Line,
        {
          type: "monotone",
          dataKey: "midpoint",
          stroke: "var(--color-primary)",
          strokeWidth: 2,
          dot: /* @__PURE__ */ jsxRuntimeExports.jsx(TypedDot, {}),
          activeDot: { r: 4 },
          isAnimationActive: false
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "FY bars" }),
      " are USCIS-published yearly national averages.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Weekly" }),
      " points average our daily snapshots.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Daily" }),
      " points are individual USCIS snapshots from the last 30 days."
    ] })
  ] });
}
function TypedDot(props) {
  const { cx, cy, payload } = props;
  if (cx == null || cy == null) return null;
  const t = payload.type;
  if (t === "yearly")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r: 3, fill: "var(--color-muted-foreground)" });
  if (t === "ytd")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "rect",
      {
        x: cx - 4,
        y: cy - 4,
        width: 8,
        height: 8,
        transform: `rotate(45, ${cx}, ${cy})`,
        fill: "var(--color-accent)"
      }
    );
  if (t === "weekly")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: cx - 2.5, y: cy - 2.5, width: 5, height: 5, fill: "var(--color-primary)", opacity: 0.65 });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r: 2.5, fill: "var(--color-primary)" });
}
function Legend() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-3 text-[11px] text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2.5 h-2.5 rounded-full bg-muted-foreground" }),
      " FY"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2.5 h-2.5 bg-accent rotate-45" }),
      " YTD"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2.5 h-2.5 bg-primary/65" }),
      " Weekly"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-3 h-0.5 bg-primary" }),
      " Daily"
    ] })
  ] });
}
function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  const tier = p.type === "daily" ? "Daily snapshot" : p.type === "weekly" ? "Weekly average" : p.type === "ytd" ? "Fiscal year (YTD)" : "Fiscal year average";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rule bg-card px-3 py-2 text-xs shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: p.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground mt-1", children: tier }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 num", children: p.lo === p.hi ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
      p.midpoint.toFixed(1),
      " mo"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
      p.lo.toFixed(1),
      "–",
      p.hi.toFixed(1),
      " mo"
    ] }) })
  ] });
}
function CasePage() {
  const {
    detail,
    formMeta,
    siblings
  } = Route$1.useLoaderData();
  const summary = detail.summary;
  const series = buildSeries(detail);
  const trend = trendDelta(series);
  reactExports.useEffect(() => {
    rememberLastCase(summary.slug);
  }, [summary.slug]);
  const asOfDate = summary.as_of ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const currentRange = summary.current_display ?? "currently tracking";
  const inquiryDateText = summary.inquiry_date ? (/* @__PURE__ */ new Date(summary.inquiry_date + "T00:00:00Z")).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }) : null;
  const tldr = summary.current_display ? `As of ${asOfDate}, USCIS reports a ${currentRange} processing time for Form ${summary.form_code} ${summary.category} cases handled by ${summary.office}. This range represents the time to complete 80% of these cases. ${inquiryDateText ? `If your filing receipt is dated before ${inquiryDateText}, you may submit a case inquiry to USCIS.` : ""}` : `We're collecting daily USCIS snapshots for Form ${summary.form_code} ${summary.category} at ${summary.office}. The chart below shows historic fiscal-year medians back to FY2014.`;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [{
      "@type": "Question",
      name: `What is the current USCIS processing time for ${summary.form_code} (${summary.category}) at ${summary.office}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: tldr
      }
    }, {
      "@type": "Question",
      name: `How long does ${summary.form_code} take in 2026?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: summary.current_display ? `USCIS currently reports ${currentRange} for ${summary.form_code} ${summary.category} at ${summary.office} (as of ${asOfDate}). USCIS publishes this as the time to complete 80% of cases of this type.` : `USCIS has not published a current range for this category. Historic fiscal-year medians are available in the chart on this page.`
      }
    }, ...inquiryDateText ? [{
      "@type": "Question",
      name: `Can I submit a case inquiry for my ${summary.form_code}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `USCIS accepts case inquiries when your receipt is dated before the displayed inquiry date. For ${summary.form_code} ${summary.category} at ${summary.office}, the current inquiry date is ${inquiryDateText}. If your filing receipt is older than that, you are eligible to submit an inquiry through your USCIS online account.`
      }
    }] : [], {
      "@type": "Question",
      name: `Where does this processing time data come from?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `All processing-time figures on this page come directly from USCIS's official Processing Times tool at egov.uscis.gov/processing-times. We snapshot the published ranges every weekday and chart the trend. Historic fiscal-year medians come from USCIS's Historic Processing Times page. This site is independent and not affiliated with USCIS.`
      }
    }]
  };
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `USCIS Form ${summary.form_code} ${summary.category} processing time — ${summary.office}`,
    description: tldr,
    creator: {
      "@type": "Organization",
      name: "Visa Lead Times"
    },
    isBasedOn: "https://egov.uscis.gov/processing-times",
    dateModified: asOfDate,
    temporalCoverage: "2014-10-01/..",
    variableMeasured: {
      "@type": "PropertyValue",
      name: "Processing time (months)",
      description: "USCIS-published 80th-percentile completion time range",
      unitText: "month"
    },
    keywords: [summary.form_code, summary.category, summary.office, "USCIS", "processing time", "immigration", "wait time"].join(", ")
  };
  const siteUrl = "https://usciscasestatus.fyi";
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${siteUrl}/`
    }, {
      "@type": "ListItem",
      position: 2,
      name: `Form ${summary.form_code}`,
      item: `${siteUrl}/form/${formMeta?.slug ?? summary.form_code.toLowerCase()}`
    }, {
      "@type": "ListItem",
      position: 3,
      name: summary.category,
      item: `${siteUrl}/case/${summary.slug}`
    }]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 mx-auto max-w-6xl px-6 py-5 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
        __html: JSON.stringify(faqLd)
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
        __html: JSON.stringify(datasetLd)
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
        __html: JSON.stringify(breadcrumbLd)
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-muted-foreground mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/form/$code", params: {
          code: formMeta?.slug ?? summary.form_code.toLowerCase()
        }, className: "hover:text-primary", children: [
          "Form ",
          summary.form_code
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Case" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b rule pb-4 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground", children: [
          "Form ",
          summary.form_code,
          " processing time"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "display text-2xl sm:text-3xl text-primary mt-1 max-w-4xl leading-tight", children: [
          summary.form_code,
          " ",
          summary.category
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OfficeSwitcher, { currentSlug: summary.slug, currentOffice: summary.office, siblings: siblings.filter((s) => s.category === summary.category) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_300px] gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-px bg-[var(--color-border)] border rule mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Current published range", value: summary.current_display ?? "—", accent: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "30-day change", value: trend ? `${trend.delta >= 0 ? "+" : ""}${formatMonths(Math.abs(trend.delta))}${trend.delta >= 0 ? " slower" : " faster"}` : "—", tone: trend ? trend.delta > 0 ? "warn" : "good" : "neutral" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Receipts as of", value: summary.inquiry_date ? formatDate(summary.inquiry_date) : "—", sub: "USCIS adjudication date" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessingTimeChart, { series }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 border-l-4 border-accent bg-card px-5 py-4", "aria-label": "Summary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2", children: [
              "Summary · Updated ",
              asOfDate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: tldr })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SponsoredSlot, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "display text-2xl text-primary border-b rule pb-3 mb-3", children: [
                "How long does ",
                summary.form_code,
                " ",
                summary.category,
                " take?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: summary.current_display ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "USCIS currently publishes a range of",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num text-foreground", children: summary.current_display }),
                " for",
                " ",
                "Form ",
                summary.form_code,
                " ",
                summary.category,
                " cases handled by ",
                summary.office,
                ", as of ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("time", { dateTime: asOfDate, children: asOfDate }),
                ". This is the time to complete 80% of cases of this type at this office — your case may resolve faster or slower than the published range."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "USCIS has not published a current range for this category. The chart above shows historic fiscal-year medians from USCIS's Historic Processing Times page so you can see how long similar cases took in prior years." }) })
            ] }),
            inquiryDateText && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display text-2xl text-primary border-b rule pb-3 mb-3", children: "Can I submit a case inquiry?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
                "USCIS accepts case inquiries when your receipt date is older than the published inquiry date. For ",
                summary.form_code,
                " ",
                summary.category,
                " at ",
                summary.office,
                ", that date is currently",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: inquiryDateText }),
                ". If your filing receipt is dated before that, you can submit a service request through your USCIS online account."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(LitwinCTA, { variant: "inline", context: `case:${summary.form_code}:inquiry-date` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display text-2xl text-primary border-b rule pb-3 mb-3", children: "How to read the chart" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
                "The chart combines four data sources, oldest to newest: USCIS-published",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "fiscal-year medians" }),
                " from FY2014 (when available); a current-FY",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "YTD national median" }),
                " from USCIS's Historic Processing Times page;",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "weekly averages" }),
                " computed from our daily snapshots; and",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "daily snapshots" }),
                " for the most recent 30 days. A flat line means the published range was unchanged in our snapshots, not that nothing is happening on individual cases."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "display text-2xl text-primary border-b rule pb-3 mb-3", children: "Source & methodology" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
                "All processing-time figures on this page come directly from USCIS's official",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-primary underline", href: "https://egov.uscis.gov/processing-times", target: "_blank", rel: "noopener", children: "Processing Times tool" }),
                ". We snapshot the published ranges every weekday and store the time series for trend analysis. Historic fiscal-year medians come from USCIS's",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-primary underline", href: "https://egov.uscis.gov/processing-times/historic-pt", target: "_blank", rel: "noopener", children: "Historic Processing Times" }),
                " ",
                "page. This site is independent and not affiliated with USCIS or any government agency."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          formMeta && siblings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rule bg-card p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3", children: [
              "Other ",
              summary.form_code,
              " case types"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: Array.from(new Map(siblings.filter((s) => s.category !== summary.category).map((s) => [s.category, s])).values()).slice(0, 6).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/case/$slug", params: {
              slug: c.slug
            }, className: "text-sm text-primary hover:underline", children: c.category }) }, c.slug)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/form/$code", params: {
              code: formMeta.slug
            }, className: "block mt-4 text-xs text-accent hover:underline", children: [
              "See all ",
              siblings.length + 1,
              " →"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LitwinCTA, { variant: "sidebar", context: `case:${summary.form_code}:sidebar` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SponsoredSlot, { variant: "sidebar" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackForm, { variant: "inline", caseSlug: summary.slug, title: "Spot something off?", subtitle: "Tell us — we read every note." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function Stat({
  label,
  value,
  sub,
  accent,
  tone = "neutral"
}) {
  const valueColor = tone === "good" ? "text-positive" : tone === "warn" ? "text-accent" : "text-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `display text-xl mt-1 num ${accent ? "text-primary" : valueColor}`, children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5", children: sub })
  ] });
}
function formatDate(iso) {
  return (/* @__PURE__ */ new Date(iso + "T00:00:00Z")).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function OfficeSwitcher({
  currentSlug,
  currentOffice,
  siblings
}) {
  const navigate = useNavigate();
  if (siblings.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-base text-muted-foreground", children: currentOffice });
  }
  const options = [{
    slug: currentSlug,
    office: currentOffice
  }, ...siblings.filter((s) => s.slug !== currentSlug)];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-3 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Service center" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { "aria-label": "Switch service center", value: currentSlug, onChange: (e) => navigate({
        to: "/case/$slug",
        params: {
          slug: e.target.value
        }
      }), className: "appearance-none bg-card border rule px-3 py-1.5 pr-8 text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-ring/40 cursor-pointer", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.slug, children: o.office }, o.slug)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs", children: "▾" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
      options.length,
      " office",
      options.length === 1 ? "" : "s"
    ] })
  ] });
}
export {
  CasePage as component
};
