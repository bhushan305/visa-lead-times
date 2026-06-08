/**
 * Seed the historic_pt table from data/historic-pt-seed.json.
 * Run once on setup, and again whenever the seed file is refreshed
 * from https://egov.uscis.gov/processing-times/historic-pt.
 *
 *   pnpm tsx scripts/seed-historic.ts
 */
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const url =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
if (!url || !key) {
  console.error("Need SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (sb_secret_…) in .env.local");
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false } });

const seed = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data", "historic-pt-seed.json"), "utf8")
).filter((row: any) => row && row.form_code && row.years); // skip the _note rows

// Compact JSON shape: each entry has a `years` map → expand to one row per FY.
const rows: any[] = [];
for (const r of seed) {
  for (const [yStr, v] of Object.entries(r.years)) {
    const fy = Number(yStr);
    if (!Number.isFinite(fy) || v == null) continue;
    rows.push({
      form_code: r.form_code,
      classification: r.classification,
      fiscal_year: fy,
      is_ytd: r.ytd_year === fy,
      avg_months: Number(v),
    });
  }
}

(async () => {
  const { error } = await sb
    .from("historic_pt")
    .upsert(rows, { onConflict: "form_code,classification,fiscal_year" });
  if (error) throw error;
  console.log(`Seeded ${rows.length} historic rows`);
})();
