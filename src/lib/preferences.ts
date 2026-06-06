// Cookie-based user preference for last viewed case
const COOKIE_NAME = "vlp_last_case";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

export function rememberLastCase(slug: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(slug)}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
}

export function readLastCase(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(?:^|; )" + COOKIE_NAME + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}
