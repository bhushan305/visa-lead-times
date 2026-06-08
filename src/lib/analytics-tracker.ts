/**
 * Client-side event tracker.
 *
 * Auto-captures:
 *   - Page views on route change (call trackPageView from a router subscriber)
 *   - Clicks on any <a> or <button>, with DOM-hierarchy + label + href
 *
 * Events are buffered in memory and flushed every 4s or when the buffer hits
 * 20 events. The pagehide listener does a final flush via fetch keepalive so
 * we don't drop events when users close the tab.
 */

type Event =
  | {
      kind: "pageview";
      user_id: string;
      page_path: string;
      referrer: string | null;
      session_id: string;
      user_agent: string;
      load_ms?: number;
    }
  | {
      kind: "click";
      user_id: string;
      page_path: string;
      element_type: string;
      element_label: string | null;
      element_id: string | null;
      element_class: string | null;
      hierarchy: string;
      href: string | null;
      target_kind: string | null;
      data_attrs: Record<string, string> | null;
      session_id: string;
    };

const SESSION_KEY = "vlt_session";
const USER_COOKIE = "vlt_uid";
const USER_COOKIE_DAYS = 180;
const BUFFER: Event[] = [];
const FLUSH_INTERVAL = 4_000;
const MAX_BUFFER = 20;
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let installed = false;

/** Per-tab session id stored in sessionStorage so reloads keep it, tabs differ. */
function getSessionId(): string {
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

/**
 * Per-visitor id stored in a 180-day cookie. Stable across tabs and reloads.
 * Resets when the user clears cookies (which we want — that's the privacy contract).
 */
function getUserId(): string {
  if (typeof document === "undefined") return "ssr";
  const m = document.cookie.match(new RegExp("(?:^|; )" + USER_COOKIE + "=([^;]*)"));
  if (m) return m[1];
  const id = crypto.randomUUID();
  document.cookie = `${USER_COOKIE}=${id}; Path=/; Max-Age=${USER_COOKIE_DAYS * 86400}; SameSite=Lax`;
  return id;
}

/** Build a short, stable selector chain from `el` up to <body>. */
function buildHierarchy(el: Element): string {
  const parts: string[] = [];
  let cur: Element | null = el;
  let depth = 0;
  while (cur && cur !== document.body && depth < 6) {
    let s = cur.tagName.toLowerCase();
    if (cur.id) s += `#${cur.id}`;
    else if (cur.classList.length) {
      // Take the first 2 non-utility-looking classes to keep this readable.
      const cls = Array.from(cur.classList)
        .filter((c) => !c.startsWith("css-") && c.length < 24)
        .slice(0, 2)
        .join(".");
      if (cls) s += `.${cls}`;
    }
    parts.unshift(s);
    cur = cur.parentElement;
    depth++;
  }
  return parts.join(" > ");
}

function targetKind(href: string | null, hostname: string): string | null {
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

function dataAttrs(el: Element): Record<string, string> | null {
  const out: Record<string, string> = {};
  for (const a of Array.from(el.attributes)) {
    if (a.name.startsWith("data-track-")) {
      out[a.name.slice("data-track-".length)] = a.value;
    }
  }
  return Object.keys(out).length ? out : null;
}

/** Public API ----------------------------------------------------------- */

export function trackPageView(page_path: string) {
  if (typeof window === "undefined") return;
  BUFFER.push({
    kind: "pageview",
    user_id: getUserId(),
    page_path,
    referrer: document.referrer || null,
    session_id: getSessionId(),
    user_agent: navigator.userAgent,
    load_ms: performance.now() | 0,
  });
  schedule();
}

export function trackClick(el: Element, page_path: string) {
  if (typeof window === "undefined") return;
  const tag = el.tagName.toLowerCase();
  const isLink = tag === "a";
  const href = isLink ? (el as HTMLAnchorElement).getAttribute("href") : null;
  const label = (el as HTMLElement).innerText?.trim().slice(0, 120) || null;
  const hierarchy = buildHierarchy(el);
  const target_kind =
    (el.getAttribute("data-track-kind") as string | null) ??
    (el.closest("[data-track-kind]")?.getAttribute("data-track-kind") as string | null) ??
    targetKind(href, location.hostname);

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
    session_id: getSessionId(),
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

/**
 * Send function — provided by the React layer via setSender (it owns the
 * TanStack server-fn proxy so we don't have to hardcode an internal URL).
 */
type Sender = (events: Event[]) => Promise<unknown>;
let sender: Sender | null = null;
export function setSender(fn: Sender) {
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

/**
 * Install global click listener + page-hide flush. Idempotent — safe to call
 * from a React effect that runs on every mount.
 */
export function installClickTracking(getPath: () => string) {
  if (installed || typeof window === "undefined") return;
  installed = true;

  document.addEventListener(
    "click",
    (e) => {
      let el = e.target as Element | null;
      // Walk up to find the nearest <a> or <button> (handles nested icons/spans).
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
