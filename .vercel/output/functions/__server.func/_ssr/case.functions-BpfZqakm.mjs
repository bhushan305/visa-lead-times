import { c as createServerRpc } from "./createServerRpc-Bq8_OHzE.mjs";
import { c as createServerFn } from "./server-DNzsfDsc.mjs";
import { r as repoCase, a as repoDaily, b as repoMonthly, c as repoHistoricForForm, d as repoForms, e as repoCases, f as repoLastSync } from "./repo.server-ChI8jL-2.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./slug-Dep3TFBB.mjs";
const getCaseDetail_createServerFn_handler = createServerRpc({
  id: "d4ac6c73be1f2a6cd38464e9f928196851ab708e67ecfc87179eed6bcbfcfb5b",
  name: "getCaseDetail",
  filename: "src/lib/case.functions.ts"
}, (opts) => getCaseDetail.__executeServer(opts));
const getCaseDetail = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(getCaseDetail_createServerFn_handler, async ({
  data
}) => {
  const summary = await repoCase(data.slug);
  if (!summary) return null;
  const [daily, monthly, historic] = await Promise.all([repoDaily(data.slug), repoMonthly(data.slug), repoHistoricForForm(summary.form_code)]);
  return {
    summary,
    daily,
    monthly,
    historic
  };
});
const getCasePageBundle_createServerFn_handler = createServerRpc({
  id: "24437f18c155a1da8afb8a099ea8efa86f342257f84afff9447c166341defc87",
  name: "getCasePageBundle",
  filename: "src/lib/case.functions.ts"
}, (opts) => getCasePageBundle.__executeServer(opts));
const getCasePageBundle = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(getCasePageBundle_createServerFn_handler, async ({
  data
}) => {
  const summary = await repoCase(data.slug);
  if (!summary) return null;
  const [daily, monthly, historic, allForms, formCases] = await Promise.all([repoDaily(data.slug), repoMonthly(data.slug), repoHistoricForForm(summary.form_code, summary.category), repoForms(), repoCases(summary.form_code)]);
  const formMeta = allForms.find((f) => f.code === summary.form_code) ?? null;
  const siblings = formCases.filter((c) => c.slug !== data.slug).map((c) => ({
    slug: c.slug,
    category: c.category,
    office: c.office,
    current_display: c.current_display ?? null
  }));
  return {
    summary,
    daily,
    monthly,
    historic,
    formMeta,
    siblings
  };
});
const getAllForms_createServerFn_handler = createServerRpc({
  id: "bd998e4240cc0759734b564ad4a2e6dbd5278eaa6dd5c658b6499396720490fc",
  name: "getAllForms",
  filename: "src/lib/case.functions.ts"
}, (opts) => getAllForms.__executeServer(opts));
const getAllForms = createServerFn({
  method: "GET"
}).handler(getAllForms_createServerFn_handler, async () => {
  return repoForms();
});
const getFormCases_createServerFn_handler = createServerRpc({
  id: "a3526677b8e6c17c93524c718c1a5dc4aa89fe1f188e75e5bb54aa0657a61152",
  name: "getFormCases",
  filename: "src/lib/case.functions.ts"
}, (opts) => getFormCases.__executeServer(opts));
const getFormCases = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(getFormCases_createServerFn_handler, async ({
  data
}) => {
  return repoCases(data.form_code);
});
const getAllCases_createServerFn_handler = createServerRpc({
  id: "d1959d88a8e1dc8eff26f89a4ead3ca839d60b6f3b9bc383e77362541a96f84c",
  name: "getAllCases",
  filename: "src/lib/case.functions.ts"
}, (opts) => getAllCases.__executeServer(opts));
const getAllCases = createServerFn({
  method: "GET"
}).handler(getAllCases_createServerFn_handler, async () => {
  return repoCases();
});
const getLastSync_createServerFn_handler = createServerRpc({
  id: "f3116ac8d208153e9b1f32f61d8fb376db7e5df7fa386e32001ce23c60febafe",
  name: "getLastSync",
  filename: "src/lib/case.functions.ts"
}, (opts) => getLastSync.__executeServer(opts));
const getLastSync = createServerFn({
  method: "GET"
}).handler(getLastSync_createServerFn_handler, async () => {
  return repoLastSync();
});
const getFormPageBundle_createServerFn_handler = createServerRpc({
  id: "28c6b26bcd0da259730acc02a56ccd654c8abe8bd83042f071eb170d8432dcef",
  name: "getFormPageBundle",
  filename: "src/lib/case.functions.ts"
}, (opts) => getFormPageBundle.__executeServer(opts));
const getFormPageBundle = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(getFormPageBundle_createServerFn_handler, async ({
  data
}) => {
  const allFormsRaw = await repoForms();
  const formRaw = allFormsRaw.find((f) => f.slug === data.slug);
  if (!formRaw) {
    return {
      form: null,
      cases: [],
      allForms: []
    };
  }
  const casesRaw = await repoCases(formRaw.code);
  return {
    form: {
      code: formRaw.code,
      title: (formRaw.label ?? "").split(" | ")[1] ?? formRaw.label,
      slug: formRaw.slug,
      count: casesRaw.length
    },
    cases: casesRaw.map((c) => ({
      slug: c.slug,
      category: c.category,
      office: c.office,
      current_display: c.current_display ?? null
    })),
    allForms: allFormsRaw.map((f) => ({
      code: f.code,
      slug: f.slug,
      title: (f.label ?? "").split(" | ")[1] ?? f.label
    }))
  };
});
export {
  getAllCases_createServerFn_handler,
  getAllForms_createServerFn_handler,
  getCaseDetail_createServerFn_handler,
  getCasePageBundle_createServerFn_handler,
  getFormCases_createServerFn_handler,
  getFormPageBundle_createServerFn_handler,
  getLastSync_createServerFn_handler
};
