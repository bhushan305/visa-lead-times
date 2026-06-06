# Visa Lead Times

A full-stack consumer web app for USCIS processing-time tracking. Built for **organic discovery + SEO**, with daily-refreshed data and non-intrusive ad slots.

```
TanStack Start (React 19 + Vite + SSR)
  ├── Supabase  ← source of truth (synced nightly from Google Sheet)
  └── Live Apps Script API  ← fallback when Supabase is unconfigured
```

## What's here

- **`src/routes/`** — `/`, `/forms`, `/form/$code`, `/case/$slug`, `/about`, plus `/sitemap.xml` and `/robots.txt`
- **`src/lib/data/repo.server.ts`** — single repository facade: Supabase first, live API fallback
- **`src/lib/processing-times.ts`** — client helpers, including the 4-tier `buildSeries`
- **`src/components/processing-time-chart.tsx`** — tiered chart (FY / YTD / monthly / daily)
- **`supabase/migrations/001_init.sql`** — schema (forms, cases, daily_snapshots, monthly_aggregates MV, historic_pt, run_log)
- **`scripts/sync-sheet-to-supabase.ts`** — nightly ETL from the Apps Script JSON API into Supabase
- **`scripts/seed-historic.ts`** — one-time seed of fiscal-year historic averages from `data/historic-pt-seed.json`

## Chart tiers (left → right)

| Tier | Source | When shown |
| --- | --- | --- |
| **Yearly FY averages** | `historic_pt` (USCIS published) | Always, for prior fiscal years |
| **YTD FY** | `historic_pt` where `is_ytd=true` | Only if we have no daily/monthly data for the current FY |
| **Monthly average** | `monthly_aggregates` materialized view (or computed from daily) | For snapshots older than 30 days |
| **Daily** | `daily_snapshots` | Last 30 days |

## Local dev

```bash
pnpm install
cp .env.example .env.local
# Set SUPABASE_URL + SUPABASE_ANON_KEY at minimum, or leave blank to use the live Apps Script fallback.
pnpm dev
```

## First-time Supabase setup

```bash
# 1. Apply the migration
supabase db push   # or paste supabase/migrations/001_init.sql into the SQL editor

# 2. Seed historic averages (one-time)
pnpm seed:historic

# 3. Run the initial sync
pnpm sync
```

## Deploy

### Vercel (default)

```bash
vercel
# In project settings, set env vars from .env.example.
# vercel.json already wires the daily cron to /api/cron/sync.
```

### Netlify

```bash
DEPLOY_TARGET=netlify pnpm build
netlify deploy --prod
```

## Daily sync

`vercel.json` defines a cron at `0 17 * * *` UTC (≈ 10 AM PT, after the 9 AM PT Apps Script run) that hits `/api/cron/sync`. The endpoint pulls `tab=forms`, `tab=latest`, and `tab=raw&days=30` from the Apps Script API, upserts into Supabase, and refreshes `monthly_aggregates`.

## Updating historic FY averages

USCIS posts FY averages monthly at https://egov.uscis.gov/processing-times/historic-pt. The page is behind Cloudflare so we keep a manually-refreshed JSON file:

1. Open the page in a browser and copy the table values into `data/historic-pt-seed.json`.
2. Run `pnpm seed:historic` to upsert.

## SEO

- Per-route `<title>` + meta description + canonical
- JSON-LD `Dataset` on form pages, `FAQPage` on case pages
- Dynamic `/sitemap.xml` (all forms + cases) and `/robots.txt`
- All routes server-render via TanStack Start so crawlers see fully populated HTML

## Ads

`<SponsoredSlot />` renders editorial-style placeholders. Two variants:

- `variant="inline"` — between content blocks; clearly labeled "Sponsored"
- `variant="sidebar"` — fixed-height card in the right rail to prevent CLS

No interstitials, no auto-playing media, no above-the-fold competing with the chart.

## Cookies

`src/lib/preferences.ts` writes a 180-day `vlp_last_case` cookie on every case view; the home page surfaces it as a "Last viewed" chip.
