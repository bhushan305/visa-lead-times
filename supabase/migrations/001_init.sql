-- Visa Lead Times — Supabase schema
-- Mirrors the Google Sheet (Apps Script API) into Postgres for fast, cacheable reads.

-- 1) Reference: forms (small lookup; ~43 rows)
create table if not exists public.forms (
  code text primary key,
  label text not null,
  slug text not null unique,
  updated_at timestamptz not null default now()
);

-- 2) Cases = a (form, category, office) tuple. ~505 rows.
create table if not exists public.cases (
  slug text primary key,
  form_code text not null references public.forms(code) on update cascade,
  name text not null,
  category text not null,
  office text not null,
  current_display text,
  current_lo_months numeric(6,2),
  current_hi_months numeric(6,2),
  inquiry_date date,
  last_change_date date,
  as_of date,
  updated_at timestamptz not null default now()
);
create index if not exists cases_form_idx on public.cases(form_code);

-- 3) Daily snapshots — one row per case per run_date.
create table if not exists public.daily_snapshots (
  case_slug text not null references public.cases(slug) on delete cascade,
  run_date date not null,
  processing_time_display text,
  lo_months numeric(6,2),
  hi_months numeric(6,2),
  inquiry_date date,
  change_vs_prior text,
  data_status text,
  notes text,
  primary key (case_slug, run_date)
);
create index if not exists snapshots_run_date_idx on public.daily_snapshots(run_date);

-- 4) Monthly aggregates — computed from daily_snapshots for periods older than 30 days.
-- Materialized so the public site reads a tiny slice instead of scanning all snapshots.
create materialized view if not exists public.monthly_aggregates as
select
  case_slug,
  to_char(run_date, 'YYYY-MM') as month,
  avg(lo_months)::numeric(6,2) as avg_lo,
  avg(hi_months)::numeric(6,2) as avg_hi,
  min(lo_months)::numeric(6,2) as min_lo,
  max(hi_months)::numeric(6,2) as max_hi,
  count(*) as snapshot_count
from public.daily_snapshots
where lo_months is not null and hi_months is not null
group by case_slug, to_char(run_date, 'YYYY-MM');
create unique index if not exists monthly_agg_pk on public.monthly_aggregates(case_slug, month);

-- 5) Historic USCIS data — published yearly fiscal-year averages and YTD national averages
-- (from https://egov.uscis.gov/processing-times/historic-pt). Manually seeded; refreshed monthly.
create table if not exists public.historic_pt (
  form_code text not null,
  classification text not null,
  fiscal_year int not null,         -- e.g. 2015..current FY
  is_ytd boolean not null default false,  -- TRUE for the current-FY partial value
  avg_months numeric(6,2),
  source_url text default 'https://egov.uscis.gov/processing-times/historic-pt',
  updated_at timestamptz not null default now(),
  primary key (form_code, classification, fiscal_year)
);
create index if not exists historic_form_idx on public.historic_pt(form_code);

-- 6) Run log — one row per sync execution (mirrors Apps Script Run_Log)
create table if not exists public.run_log (
  id bigserial primary key,
  run_at timestamptz not null default now(),
  source text not null,             -- 'apps_script' | 'historic_pt' | 'manual'
  status text not null,             -- 'ok' | 'partial' | 'error'
  rows_attempted int default 0,
  rows_written int default 0,
  errors int default 0,
  notes text
);

-- Public read access through the anon key (this site is fully public, no PII).
alter table public.forms             enable row level security;
alter table public.cases             enable row level security;
alter table public.daily_snapshots   enable row level security;
alter table public.historic_pt       enable row level security;
alter table public.run_log           enable row level security;

create policy "public read forms"      on public.forms            for select using (true);
create policy "public read cases"      on public.cases            for select using (true);
create policy "public read snapshots"  on public.daily_snapshots  for select using (true);
create policy "public read historic"   on public.historic_pt      for select using (true);
create policy "public read run_log"    on public.run_log          for select using (true);
-- Writes are gated to the service_role key (used only by the sync script).

-- Helper: refresh the monthly aggregates after a sync run.
create or replace function public.refresh_monthly_aggregates() returns void
language sql security definer as $$
  refresh materialized view concurrently public.monthly_aggregates;
$$;
