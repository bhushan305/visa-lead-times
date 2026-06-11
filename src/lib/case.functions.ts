import { createServerFn } from "@tanstack/react-start";
import {
  repoCase,
  repoDaily,
  repoMonthly,
  repoHistoricForForm,
  repoForms,
  repoCases,
  repoLastSync,
} from "./data/repo.server";

/**
 * Single fetch for everything the case-detail page needs.
 * Returns null when the slug is unknown.
 */
export const getCaseDetail = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const summary = await repoCase(data.slug);
    if (!summary) return null;
    const [daily, monthly, historic] = await Promise.all([
      repoDaily(data.slug),
      repoMonthly(data.slug),
      repoHistoricForForm(summary.form_code),
    ]);
    return { summary, daily, monthly, historic };
  });

/**
 * One-call bundle for the case page — collapses what was three sequential
 * server-fn round-trips into a single response. Runs the sibling/forms
 * lookups in parallel with the detail fetch so cold loads aren't bottlenecked
 * by serial 302→googleusercontent redirects on the Apps Script API.
 */
export const getCasePageBundle = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    // Kick off the detail fetch first to learn the form_code; everything else
    // can be derived from already-cached calls inside the repo.
    const summary = await repoCase(data.slug);
    if (!summary) return null;

    const [daily, monthly, historic, allForms, formCases] = await Promise.all([
      repoDaily(data.slug),
      repoMonthly(data.slug),
      repoHistoricForForm(summary.form_code, summary.category),
      repoForms(),
      repoCases(summary.form_code),
    ]);

    const formMeta = allForms.find((f: any) => f.code === summary.form_code) ?? null;
    const siblings = formCases
      .filter((c: any) => c.slug !== data.slug)
      .map((c: any) => ({
        slug: c.slug,
        category: c.category,
        office: c.office,
        current_display: c.current_display ?? null,
      }));
    return { summary, daily, monthly, historic, formMeta, siblings };
  });

/** All forms — used by /forms index and sitemap. */
export const getAllForms = createServerFn({ method: "GET" }).handler(async () => {
  return repoForms();
});

/** All cases for a form. */
export const getFormCases = createServerFn({ method: "GET" })
  .inputValidator((d: { form_code: string }) => d)
  .handler(async ({ data }) => {
    return repoCases(data.form_code);
  });

/** All cases (for search index + sitemap). */
export const getAllCases = createServerFn({ method: "GET" }).handler(async () => {
  return repoCases();
});

/** Last successful sync timestamp — shown in the footer. */
export const getLastSync = createServerFn({ method: "GET" }).handler(async () => {
  return repoLastSync();
});

/**
 * One-call bundle for the form-detail page. Same motivation as
 * getCasePageBundle: one HTTP round trip from client → server, parallel data
 * fetches inside the server fn.
 */
export const getFormPageBundle = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const allFormsRaw = await repoForms();
    const formRaw = allFormsRaw.find((f: any) => f.slug === data.slug);
    if (!formRaw) {
      return { form: null, cases: [], allForms: [] };
    }
    const casesRaw = await repoCases(formRaw.code);
    return {
      form: {
        code: formRaw.code,
        title: (formRaw.label ?? "").split(" | ")[1] ?? formRaw.label,
        slug: formRaw.slug,
        count: casesRaw.length,
      },
      cases: casesRaw.map((c: any) => ({
        slug: c.slug,
        category: c.category,
        office: c.office,
        current_display: c.current_display ?? null,
        current_lo: c.current_lo ?? null,
        current_hi: c.current_hi ?? null,
      })),
      allForms: allFormsRaw.map((f: any) => ({
        code: f.code,
        slug: f.slug,
        title: (f.label ?? "").split(" | ")[1] ?? f.label,
      })),
    };
  });
