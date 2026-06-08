import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { S as notFound, m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-DNzsfDsc.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function useServerFn(serverFn) {
  const router2 = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
}
const appCss = "/assets/styles-BWb-oZcj.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const SESSION_KEY = "vlt_session";
const USER_COOKIE = "vlt_uid";
const USER_COOKIE_DAYS = 180;
const BUFFER = [];
const FLUSH_INTERVAL = 4e3;
const MAX_BUFFER = 20;
let flushTimer = null;
let installed = false;
function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  try {
    const cur = sessionStorage.getItem(SESSION_KEY);
    if (cur) return cur;
    const id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return "no-storage";
  }
}
function getUserId() {
  if (typeof document === "undefined") return "ssr";
  const m = document.cookie.match(new RegExp("(?:^|; )" + USER_COOKIE + "=([^;]*)"));
  if (m) return m[1];
  const id = crypto.randomUUID();
  document.cookie = `${USER_COOKIE}=${id}; Path=/; Max-Age=${USER_COOKIE_DAYS * 86400}; SameSite=Lax`;
  return id;
}
function buildHierarchy(el) {
  const parts = [];
  let cur = el;
  let depth = 0;
  while (cur && cur !== document.body && depth < 6) {
    let s = cur.tagName.toLowerCase();
    if (cur.id) s += `#${cur.id}`;
    else if (cur.classList.length) {
      const cls = Array.from(cur.classList).filter((c) => !c.startsWith("css-") && c.length < 24).slice(0, 2).join(".");
      if (cls) s += `.${cls}`;
    }
    parts.unshift(s);
    cur = cur.parentElement;
    depth++;
  }
  return parts.join(" > ");
}
function targetKind(href, hostname) {
  if (!href) return null;
  if (href.startsWith("mailto:")) return "mailto";
  if (href.startsWith("tel:")) return "tel";
  if (href.startsWith("#")) return "anchor";
  try {
    const u = new URL(href, location.href);
    if (u.hostname === hostname) return "internal";
    return "external";
  } catch {
    return null;
  }
}
function dataAttrs(el) {
  const out = {};
  for (const a of Array.from(el.attributes)) {
    if (a.name.startsWith("data-track-")) {
      out[a.name.slice("data-track-".length)] = a.value;
    }
  }
  return Object.keys(out).length ? out : null;
}
function trackPageView(page_path) {
  if (typeof window === "undefined") return;
  BUFFER.push({
    kind: "pageview",
    user_id: getUserId(),
    page_path,
    referrer: document.referrer || null,
    session_id: getSessionId(),
    user_agent: navigator.userAgent,
    load_ms: performance.now() | 0
  });
  schedule();
}
function trackClick(el, page_path) {
  if (typeof window === "undefined") return;
  const tag = el.tagName.toLowerCase();
  const isLink = tag === "a";
  const href = isLink ? el.getAttribute("href") : null;
  const label = el.innerText?.trim().slice(0, 120) || null;
  const hierarchy = buildHierarchy(el);
  const target_kind = el.getAttribute("data-track-kind") ?? el.closest("[data-track-kind]")?.getAttribute("data-track-kind") ?? targetKind(href, location.hostname);
  BUFFER.push({
    kind: "click",
    user_id: getUserId(),
    page_path,
    element_type: tag,
    element_label: label,
    element_id: el.id || null,
    element_class: el.className && typeof el.className === "string" ? el.className : null,
    hierarchy,
    href,
    target_kind,
    data_attrs: dataAttrs(el),
    session_id: getSessionId()
  });
  schedule();
}
function schedule() {
  if (BUFFER.length >= MAX_BUFFER) {
    void flush();
    return;
  }
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flush();
  }, FLUSH_INTERVAL);
}
let sender = null;
function setSender(fn) {
  sender = fn;
}
async function flush() {
  if (!BUFFER.length || !sender) return;
  const batch = BUFFER.splice(0, BUFFER.length);
  try {
    await sender(batch);
  } catch {
    BUFFER.unshift(...batch.slice(-MAX_BUFFER));
  }
}
function installClickTracking(getPath) {
  if (installed || typeof window === "undefined") return;
  installed = true;
  document.addEventListener(
    "click",
    (e) => {
      let el = e.target;
      while (el && el !== document.body) {
        const tag = el.tagName.toLowerCase();
        if (tag === "a" || tag === "button" || el.getAttribute("role") === "button") {
          trackClick(el, getPath());
          return;
        }
        el = el.parentElement;
      }
    },
    { capture: true, passive: true }
  );
  window.addEventListener("pagehide", () => void flush());
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const $$splitComponentImporter$8 = () => import("./track-BTU5dmpx.mjs");
const trackBatch = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("4d6296202bf5c35b0329991759d93a18a28e88d917e6a4e3a21b379a696a243c"));
const Route$9 = createFileRoute("/api/track")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
function AnalyticsProvider({ children }) {
  const router2 = useRouter();
  const send = useServerFn(trackBatch);
  reactExports.useEffect(() => {
    setSender((events) => send({ data: { events } }));
  }, [send]);
  reactExports.useEffect(() => {
    installClickTracking(() => router2.state.location.pathname);
  }, [router2]);
  reactExports.useEffect(() => {
    trackPageView(router2.state.location.pathname);
    const unsub = router2.subscribe("onResolved", (evt) => {
      const path = evt.toLocation?.pathname ?? router2.state.location.pathname;
      trackPageView(path);
    });
    return () => unsub();
  }, [router2]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Visa Lead Times — Daily USCIS Processing Time Tracker" },
      {
        name: "description",
        content: "Independent tracker for USCIS processing times. Updated daily across every form and service center, with monthly averages and historic fiscal-year context."
      },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Visa Lead Times" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) });
}
const $$splitComponentImporter$7 = () => import("./sitemap_._xml-BTU5dmpx.mjs");
const buildSitemap = createServerFn({
  method: "GET"
}).handler(createSsrRpc("8bee41cb9ed06301515218938d966489142040c6a082bf2309158ca03e911892"));
const Route$7 = createFileRoute("/sitemap.xml")({
  loader: async () => {
    const xml = await buildSitemap();
    throw new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=21600, s-maxage=21600"
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./robots_._txt-BTU5dmpx.mjs");
const Route$6 = createFileRoute("/robots.txt")({
  loader: () => {
    const site = process.env.SITE_URL ?? "https://usciscasestatus.fyi";
    const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${site}/sitemap.xml
`;
    throw new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400"
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(createSsrRpc("d4ac6c73be1f2a6cd38464e9f928196851ab708e67ecfc87179eed6bcbfcfb5b"));
const getCasePageBundle = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(createSsrRpc("24437f18c155a1da8afb8a099ea8efa86f342257f84afff9447c166341defc87"));
const getAllForms = createServerFn({
  method: "GET"
}).handler(createSsrRpc("bd998e4240cc0759734b564ad4a2e6dbd5278eaa6dd5c658b6499396720490fc"));
createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(createSsrRpc("a3526677b8e6c17c93524c718c1a5dc4aa89fe1f188e75e5bb54aa0657a61152"));
const getAllCases = createServerFn({
  method: "GET"
}).handler(createSsrRpc("d1959d88a8e1dc8eff26f89a4ead3ca839d60b6f3b9bc383e77362541a96f84c"));
createServerFn({
  method: "GET"
}).handler(createSsrRpc("f3116ac8d208153e9b1f32f61d8fb376db7e5df7fa386e32001ce23c60febafe"));
const getFormPageBundle = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(createSsrRpc("28c6b26bcd0da259730acc02a56ccd654c8abe8bd83042f071eb170d8432dcef"));
const $$splitComponentImporter$5 = () => import("./forms-CRZbsXKi.mjs");
const Route$5 = createFileRoute("/forms")({
  loader: async () => {
    const [formsRaw, casesRaw] = await Promise.all([getAllForms(), getAllCases()]);
    const counts = /* @__PURE__ */ new Map();
    for (const c of casesRaw) counts.set(c.form_code, (counts.get(c.form_code) ?? 0) + 1);
    const forms = formsRaw.map((f) => ({
      code: f.code,
      title: (f.label ?? "").split(" | ")[1] ?? f.label,
      slug: f.slug,
      count: counts.get(f.code) ?? 0
    }));
    return {
      forms
    };
  },
  head: () => ({
    meta: [{
      title: "All USCIS Forms We Track | Visa Lead Times"
    }, {
      name: "description",
      content: "Browse every USCIS form we track for processing times — I-130, I-485, I-765, I-129, N-400 and many more."
    }, {
      rel: "canonical",
      href: "/forms"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./about-9VLbZ3Qk.mjs");
const Route$4 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About the Data | Visa Lead Times"
    }, {
      name: "description",
      content: "How we collect USCIS processing time data: daily snapshots, monthly averages, and historical context."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-B9cKf6yZ.mjs");
const Route$3 = createFileRoute("/")({
  loader: async () => {
    const [formsRaw, casesRaw] = await Promise.all([getAllForms(), getAllCases()]);
    const forms = formsRaw.map((f) => {
      const formCases = casesRaw.filter((c) => c.form_code === f.code).map(toSummary);
      return {
        code: f.code,
        title: (f.label ?? "").split(" | ")[1] ?? f.label,
        slug: f.slug,
        count: formCases.length,
        cases: formCases
      };
    });
    const allCases = casesRaw.map(toSummary);
    return {
      forms,
      allCases
    };
  },
  head: () => ({
    meta: [{
      title: "USCIS Visa Processing Times — Daily Tracker | Visa Lead Times"
    }, {
      name: "description",
      content: "Track current USCIS visa processing times by form (I-130, I-485, I-765, N-400 and more). See daily trends, monthly averages, and historical lead times."
    }, {
      property: "og:title",
      content: "USCIS Visa Processing Times — Daily Tracker"
    }, {
      property: "og:description",
      content: "Daily-updated wait times for every USCIS form and service center. Find your case in seconds."
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }, {
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
function toSummary(c) {
  return {
    slug: c.slug,
    name: c.name,
    form: c.form_code,
    category: c.category,
    office: c.office,
    current_display: c.current_display ?? null
  };
}
function SiteHeader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b rule bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-4 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-baseline gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "display text-2xl text-primary", children: "Visa Lead Times" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "USCIS Processing Tracker" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-6 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary text-muted-foreground", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forms", className: "hover:text-primary text-muted-foreground", children: "All forms" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-primary text-muted-foreground", children: "About the data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "https://egov.uscis.gov/processing-times",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary underline-offset-4 hover:underline",
          children: "USCIS.gov ↗"
        }
      )
    ] })
  ] }) });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-24 border-t rule", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-10 text-xs text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "display text-base text-foreground", children: "Visa Lead Times" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl", children: "Independent dashboard tracking publicly-reported USCIS processing times. We are not affiliated with USCIS or any government agency. Information is provided for general guidance and is not legal advice." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Visa Lead Times. Source: USCIS.gov."
    ] })
  ] }) });
}
const $$splitErrorComponentImporter$1 = () => import("./form._code-C_itxYqA.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./form._code-cyjppWFd.mjs");
const $$splitComponentImporter$2 = () => import("./form._code-B_N1BbwO.mjs");
const Route$2 = createFileRoute("/form/$code")({
  loader: async ({
    params
  }) => {
    const bundle = await getFormPageBundle({
      data: {
        slug: params.code
      }
    });
    if (!bundle.form) throw notFound();
    const {
      form,
      cases,
      allForms
    } = bundle;
    return {
      form: {
        code: form.code,
        title: (form.label ?? "").split(" | ")[1] ?? form.label,
        slug: form.slug,
        count: cases.length
      },
      cases: cases.map((c) => ({
        slug: c.slug,
        category: c.category,
        office: c.office,
        current_display: c.current_display ?? null
      })),
      allForms: allForms.map((f) => ({
        code: f.code,
        slug: f.slug,
        title: (f.label ?? "").split(" | ")[1] ?? f.label
      }))
    };
  },
  head: ({
    loaderData,
    params
  }) => {
    const f = loaderData?.form;
    if (!f) return {
      meta: [{
        title: "Form not found"
      }]
    };
    return {
      meta: [{
        title: `${f.code} Processing Times — ${f.title} | Visa Lead Times`
      }, {
        name: "description",
        content: `Current USCIS processing times for Form ${f.code} (${f.title}). ${f.count} case types tracked across service centers, updated daily.`
      }, {
        property: "og:title",
        content: `${f.code} processing times`
      }, {
        property: "og:description",
        content: f.title
      }, {
        rel: "canonical",
        href: `/form/${params.code}`
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  pendingMs: 50,
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 mx-auto max-w-6xl px-6 py-12 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 bg-muted rounded animate-pulse mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-32 bg-muted rounded animate-pulse mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-72 bg-muted rounded animate-pulse mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rule bg-card", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b rule", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-2/3 bg-muted rounded animate-pulse mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/3 bg-muted rounded animate-pulse" })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent")
});
const $$splitErrorComponentImporter = () => import("./case._slug-3mvobz26.mjs");
const $$splitNotFoundComponentImporter = () => import("./case._slug-C1rtaNIz.mjs");
const $$splitComponentImporter$1 = () => import("./case._slug-Bydnwptj.mjs");
const Route$1 = createFileRoute("/case/$slug")({
  // Single round-trip bundle so cold loads aren't bottlenecked by serial
  // Apps Script API calls. See lib/case.functions.ts → getCasePageBundle.
  loader: async ({
    params
  }) => {
    const bundle = await getCasePageBundle({
      data: {
        slug: params.slug
      }
    });
    if (!bundle) throw notFound();
    return {
      detail: {
        summary: bundle.summary,
        daily: bundle.daily,
        monthly: bundle.monthly,
        historic: bundle.historic
      },
      formMeta: bundle.formMeta,
      siblings: bundle.siblings
    };
  },
  // Render a skeleton fast so the user sees something is loading instead of
  // a blank tab during the loader fetch.
  pendingMs: 50,
  pendingComponent: CasePageSkeleton,
  head: ({
    loaderData,
    params
  }) => {
    const s = loaderData?.detail?.summary;
    if (!s) return {
      meta: [{
        title: "Case not found"
      }]
    };
    const title = `${s.form_code} ${s.category} Processing Time at ${s.office} | USCIS Tracker`;
    const asOf = s.as_of ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const desc = s.current_display ? `USCIS processing time for Form ${s.form_code} — ${s.category} at ${s.office}: ${s.current_display} as of ${asOf}. Daily-updated chart and historic fiscal-year averages.` : `Track USCIS processing time for Form ${s.form_code} — ${s.category} at ${s.office}. Daily-updated chart with historic averages back to FY2014.`;
    const siteUrl = process.env.SITE_URL ?? "https://usciscasestatus.fyi";
    const canonical = `${siteUrl}/case/${params.slug}`;
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: desc
      }, {
        name: "keywords",
        content: `${s.form_code} processing time, USCIS ${s.form_code}, ${s.category}, ${s.office}, immigration wait time`
      }, {
        property: "og:title",
        content: `${s.form_code} ${s.category} — Processing Time`
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:url",
        content: canonical
      }, {
        property: "og:type",
        content: "article"
      }, {
        property: "article:modified_time",
        content: asOf
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: `${s.form_code} processing time`
      }, {
        name: "twitter:description",
        content: desc
      }, {
        rel: "canonical",
        href: canonical
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
function CasePageSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 mx-auto max-w-6xl px-6 py-10 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-24 bg-muted rounded animate-pulse mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-2/3 bg-muted rounded animate-pulse mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-1/3 bg-muted rounded animate-pulse mb-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-px bg-[var(--color-border)] border rule mb-8", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-20 bg-muted rounded animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-28 bg-muted rounded animate-pulse mt-3" })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rule bg-card p-6 h-[340px] animate-pulse" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
const $$splitComponentImporter = () => import("./sync-BTU5dmpx.mjs");
const runSync = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(createSsrRpc("58e932baa02997ed77fdd89d9a222a0567b606122210416bc4e65267ce5d75fe"));
const Route = createFileRoute("/api/cron/sync")({
  loader: async ({
    location: location2
  }) => {
    const url = new URL(location2.href, "http://x");
    const secret = url.searchParams.get("secret") ?? void 0;
    const force = url.searchParams.get("force") === "1";
    const result = await runSync({
      data: {
        secret,
        force
      }
    });
    throw new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$7.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$8
});
const RobotsDottxtRoute = Route$6.update({
  id: "/robots.txt",
  path: "/robots.txt",
  getParentRoute: () => Route$8
});
const FormsRoute = Route$5.update({
  id: "/forms",
  path: "/forms",
  getParentRoute: () => Route$8
});
const AboutRoute = Route$4.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const FormCodeRoute = Route$2.update({
  id: "/form/$code",
  path: "/form/$code",
  getParentRoute: () => Route$8
});
const CaseSlugRoute = Route$1.update({
  id: "/case/$slug",
  path: "/case/$slug",
  getParentRoute: () => Route$8
});
const ApiTrackRoute = Route$9.update({
  id: "/api/track",
  path: "/api/track",
  getParentRoute: () => Route$8
});
const ApiCronSyncRoute = Route.update({
  id: "/api/cron/sync",
  path: "/api/cron/sync",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  FormsRoute,
  RobotsDottxtRoute,
  SitemapDotxmlRoute,
  ApiTrackRoute,
  CaseSlugRoute,
  FormCodeRoute,
  ApiCronSyncRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$5 as R,
  SiteHeader as S,
  SiteFooter as a,
  Route$3 as b,
  Route$2 as c,
  Route$1 as d,
  router as r
};
