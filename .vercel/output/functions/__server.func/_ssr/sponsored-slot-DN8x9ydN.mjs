import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function SponsoredSlot({
  variant = "inline"
}) {
  if (variant === "sidebar") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: "border rule bg-card p-5",
        "aria-label": "Sponsored content",
        style: { minHeight: 280 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3", children: "Sponsored" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "display text-xl leading-snug text-primary", children: "Talk to an immigration attorney about your case." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Free 15-minute case review. Get a clear picture of expected timelines and options for your specific situation." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#consult",
              className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline",
              children: "Request a consultation →"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border-y rule my-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
      "aria-label": "Sponsored content",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Sponsored" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "display text-xl text-primary mt-1", children: "Wait time longer than expected? An attorney may be able to help." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#consult",
            className: "shrink-0 inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-primary/90",
            children: "Free case review"
          }
        )
      ]
    }
  );
}
export {
  SponsoredSlot as S
};
