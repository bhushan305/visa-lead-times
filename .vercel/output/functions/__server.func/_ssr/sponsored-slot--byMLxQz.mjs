import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const HREF = "https://litwinlaw.com/?utm_source=visa-lead-times&utm_medium=referral&utm_campaign=free_consult";
function withContext(ctx) {
  return `${HREF}&utm_content=${encodeURIComponent(ctx)}`;
}
function SponsoredSlot({
  variant = "inline"
}) {
  if (variant === "sidebar") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: withContext("sponsored-slot:sidebar"),
        target: "_blank",
        rel: "noopener sponsored",
        className: "block border rule bg-card p-5 group hover:border-primary transition-colors",
        "aria-label": "Sponsored: Litwin Law free consultation",
        style: { minHeight: 220 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3", children: "Sponsored" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "display text-xl leading-snug text-primary", children: "Talk to an immigration attorney about your case." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Free 15-minute case review with Litwin Law." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline", children: "Request a consultation →" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: withContext("sponsored-slot:inline"),
      target: "_blank",
      rel: "noopener sponsored",
      "aria-label": "Sponsored: Litwin Law free consultation",
      className: "border-y rule my-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-card transition-colors px-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Sponsored" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "display text-xl text-primary mt-1", children: "Wait time longer than expected? An attorney may be able to help." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium rounded-sm group-hover:bg-primary/90", children: "Free case review" })
      ]
    }
  );
}
export {
  SponsoredSlot as S
};
