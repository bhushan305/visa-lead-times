/**
 * Daily USCIS processing-times scrape.
 *
 * USCIS's processing-times API sits behind bot protection (403 for curl,
 * GitHub Actions, and cloud IPs), so this runs INSIDE a real browser tab on
 * https://egov.uscis.gov/processing-times — injected by Claude in Chrome from
 * the "USCIS daily scrape" scheduled task, or pasted into DevTools by hand.
 *
 * Flow:
 *   1. Discover the page's Next.js server-action IDs by name (getProcessingTime).
 *      IDs change whenever USCIS redeploys; names have been stable.
 *   2. GET the tracked cases from the Apps Script API (?tab=config).
 *   3. Call getProcessingTime([form, category, office]) for every active case.
 *   4. POST {data: items} to the Apps Script web app (doPost → processAndWrite),
 *      which writes Raw_Snapshots, Latest, Changes and Run_Log.
 *   The GitHub Action (.github/workflows/sync.yml) then copies the sheet into
 *   Supabase, which the site reads.
 *
 * Progress and the final result are on window.__uscis (poll it). Nothing is
 * written if fewer than MIN_SUCCESS_RATIO of the cases succeed.
 */
(() => {
  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwF37kFPBEYOCS9t33Ai5gzoL_XkYBFfMsKzCt9SameFmPf30wOQkqbbqn53njCdrAZ/exec";
  const SOURCE_URL = "https://egov.uscis.gov/processing-times/";
  const CONCURRENCY = 3;
  const MIN_SUCCESS_RATIO = 0.8;

  if (window.__uscis && window.__uscis.phase && !/^(done|failed)/.test(window.__uscis.phase)) {
    return "already running: " + window.__uscis.phase;
  }
  const state = (window.__uscis = {
    phase: "starting",
    total: 0,
    done: 0,
    ok: 0,
    err: 0,
    startedAt: new Date().toISOString(),
    errors: [],
    result: null,
  });
  const nativeFetch = window.__origFetch || window.fetch.bind(window);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function findActionIds() {
    const ids = {};
    const srcs = [...document.scripts].map((s) => s.src).filter(Boolean);
    for (const src of srcs) {
      const text = await (await nativeFetch(src)).text();
      const re = /createServerReference\)?\(\s*"([0-9a-f]{40,})"[^)]{0,200}?"([A-Za-z_$][\w$]*)"\s*\)/g;
      for (const m of text.matchAll(re)) ids[m[2]] = m[1];
    }
    if (!ids.getProcessingTime) {
      throw new Error("getProcessingTime server action not found; the USCIS page changed");
    }
    return ids;
  }

  async function callAction(id, args) {
    const res = await nativeFetch("/processing-times", {
      method: "POST",
      headers: {
        Accept: "text/x-component",
        "next-action": id,
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: JSON.stringify(args),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const text = await res.text();
    const i = text.indexOf('1:{"data"');
    if (i < 0) throw new Error("Unexpected server-action response");
    const rest = text.slice(i + 2);
    const nl = rest.indexOf("\n");
    return JSON.parse(nl >= 0 ? rest.slice(0, nl) : rest);
  }

  const part = (x) => `${x?.value ?? null} ${x?.unitEn ?? x?.unit ?? ""}`.trim();
  // USCIS returns [high, low]; the sheet has always stored "low to high".
  const display = (range) =>
    Array.isArray(range) && range.length
      ? `${part(range[1] ?? range[0])} to ${part(range[0])}`
      : "";

  // Form titles from the page's dropdown ("I-130 | Petition for Alien Relative").
  // The sheet's label is always "<config form_code> | <title>": USCIS shows
  // "I-526 | ..." for the I-526(L) option, and the sync keys forms by label.
  function formTitles() {
    const map = {};
    const sel = document.getElementById("formName");
    if (sel) for (const o of sel.options) if (o.value) map[o.value] = o.text.split(" | ").slice(1).join(" | ").trim();
    return map;
  }

  async function scrapeOne(actionId, row, labels) {
    const base = {
      caseName: row.logical_case_name,
      formCode: row.form_code,
      categoryHint: row.target_category_hint,
      officeHint: row.target_office_hint,
      formLabel: labels[row.form_code] ? `${row.form_code} | ${labels[row.form_code]}` : row.form_code,
      categoryLabel: row.target_category_hint,
      officeLabel: row.target_office_hint,
      sourceUrl: SOURCE_URL,
    };
    let lastErr = "";
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const j = await callAction(actionId, [row.form_code, String(row.category_key), row.office_code]);
        const pt = j?.data?.data?.processingTime;
        if (!pt) {
          lastErr = "No processingTime in response";
          break; // USCIS has no data for this combo; retrying won't help
        }
        const sub =
          (pt.subtypes || []).find((s) => String(s.formType) === String(row.category_key)) ||
          (pt.subtypes || [])[0] ||
          {};
        return {
          ...base,
          status: "SUCCESS",
          processingTimeDisplay: display(sub.range || pt.range),
          inquiryDate: sub.serviceRequestDateEn || sub.serviceRequestDate || "",
          formLabel: `${row.form_code} | ${labels[row.form_code] || j?.data?.data?.formInfoEn || ""}`,
          categoryLabel: sub.subtypeInfoEn || row.target_category_hint,
          errorNotes: "",
        };
      } catch (e) {
        lastErr = String(e && e.message ? e.message : e);
        await sleep(1500 * (attempt + 1));
      }
    }
    return { ...base, status: "ERROR", processingTimeDisplay: "", inquiryDate: "", errorNotes: lastErr };
  }

  (async () => {
    try {
      state.phase = "discovering server actions";
      const ids = await findActionIds();

      state.phase = "loading config";
      const cfg = await (await nativeFetch(APPS_SCRIPT_URL + "?tab=config")).json();
      const rows = (cfg.rows || []).filter(
        (r) => r.logical_case_name && (r.active === true || String(r.active).toUpperCase() === "TRUE"),
      );
      if (!rows.length) throw new Error("Config tab returned no active rows");
      state.total = rows.length;
      const labels = formTitles();

      state.phase = "scraping";
      const items = new Array(rows.length);
      let next = 0;
      const worker = async () => {
        while (next < rows.length) {
          const k = next++;
          items[k] = await scrapeOne(ids.getProcessingTime, rows[k], labels);
          state.done++;
          if (items[k].status === "SUCCESS") state.ok++;
          else {
            state.err++;
            if (state.errors.length < 20) state.errors.push(`${items[k].caseName}: ${items[k].errorNotes}`);
          }
          await sleep(150);
        }
      };
      await Promise.all(Array.from({ length: CONCURRENCY }, worker));

      if (state.ok / rows.length < MIN_SUCCESS_RATIO) {
        throw new Error(`Only ${state.ok}/${rows.length} cases succeeded; not writing to the sheet`);
      }

      state.phase = "writing to sheet";
      const res = await nativeFetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ data: items }),
      });
      state.result = await res.json().catch(() => ({ status: "UNKNOWN", http: res.status }));
      if (state.result && state.result.status === "ERROR") throw new Error("Apps Script: " + state.result.message);
      state.phase = "done";
    } catch (e) {
      state.phase = "failed: " + (e && e.message ? e.message : e);
    } finally {
      state.finishedAt = new Date().toISOString();
    }
  })();
  return "started";
})();
