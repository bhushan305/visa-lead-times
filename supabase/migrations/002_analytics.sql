-- Visa Lead Times — click + pageview analytics
-- Stores hashed IP (not raw) for privacy; pseudo user_id is stable per visitor.

create table if not exists public.page_views (
  id bigserial primary key,
  visited_at timestamptz not null default now(),
  user_id text not null,          -- sha256(ip + salt), short prefix
  session_id text,                -- per-tab UUID set client-side
  page_path text not null,
  referrer text,
  user_agent text,
  country text,                   -- best-effort from CF/Vercel header
  load_ms int,                    -- optional client-reported metric
  ip_hash text                    -- full hash (separate from short user_id)
);
create index if not exists page_views_user_idx on public.page_views(user_id);
create index if not exists page_views_path_idx on public.page_views(page_path);
create index if not exists page_views_visited_idx on public.page_views(visited_at desc);

create table if not exists public.click_events (
  id bigserial primary key,
  clicked_at timestamptz not null default now(),
  user_id text not null,
  session_id text,
  page_path text not null,        -- where the click happened
  element_type text not null,     -- 'link' | 'button' | other tagName
  element_label text,             -- innerText, truncated to 120 chars
  element_id text,                -- DOM id if any
  element_class text,             -- DOM classes
  hierarchy text,                 -- short CSS-selector chain (e.g. "main > section > a.cta")
  href text,                      -- destination if a link
  target_kind text,               -- 'internal' | 'external' | 'sponsored' | 'mailto' | 'tel'
  data_attrs jsonb                -- any data-track-* attributes the call site adds
);
create index if not exists click_user_idx on public.click_events(user_id);
create index if not exists click_path_idx on public.click_events(page_path);
create index if not exists click_clicked_idx on public.click_events(clicked_at desc);
create index if not exists click_target_idx on public.click_events(target_kind);

-- Lock down: only the secret key (the cron + tracking endpoint) writes.
-- Public reads are NOT enabled — analytics is an internal dashboard concern.
alter table public.page_views   enable row level security;
alter table public.click_events enable row level security;

-- Helper view: top pages by visit count (last 30d)
create or replace view public.v_top_pages_30d as
  select page_path,
         count(*)                  as views,
         count(distinct user_id)   as unique_users,
         count(distinct session_id) as sessions
  from public.page_views
  where visited_at >= now() - interval '30 days'
  group by page_path
  order by views desc;

-- Helper view: top click targets (last 30d)
create or replace view public.v_top_clicks_30d as
  select page_path,
         element_label,
         target_kind,
         href,
         count(*)                  as clicks,
         count(distinct user_id)   as unique_users
  from public.click_events
  where clicked_at >= now() - interval '30 days'
  group by page_path, element_label, target_kind, href
  order by clicks desc;
