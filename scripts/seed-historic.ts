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

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});

const seed = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data", "historic-pt-seed.json"), "utf8")
).filter((row: any) => row.form_code); // skip the _note rows

const rows = seed.map((r: any) => ({
  form_code: r.form_code,
  classification: r.classification,
  fiscal_year: r.fiscal_year,
  is_ytd: !!r.is_ytd,
  avg_months: r.avg_months,
}));

(async () => {
  const { error } = await sb
    .from("historic_pt")
    .upsert(rows, { onConflict: "form_code,classification,fiscal_year" });
  if (error) throw error;
  console.log(`Seeded ${rows.length} historic rows`);
})();
