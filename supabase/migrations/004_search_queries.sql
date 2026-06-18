-- Search query log — every distinct search a visitor performs.
--
-- Captured client-side after a 350ms debounce so we don't log every
-- keystroke (typing "H-1B" sends ONE event, not five). Joins to page_views
-- via user_id so you can reconstruct a session: search → results → click.
--
-- Use cases:
--   * find queries that returned zero results → expand VISA_ALIASES
--   * find most-searched visa names → prioritize content
--   * measure search-to-click conversion (joins to click_events on user_id)

create table if not exists search_queries (
  id              bigserial primary key,
  searched_at     timestamptz not null default now(),
  user_id         text,
  session_id      text,
  host            text,
  page_path       text,

  -- The literal text the user typed
  query           text not null,
  -- Normalized form used for alias lookup (lowercase, alphanumeric only)
  normalized_query text,
  -- If the query matched a visa alias, the friendly display name (e.g. "H-1B Specialty Occupation")
  matched_alias   text,
  -- Number of grouped results we showed in the dropdown
  results_count   integer,

  user_agent      text,

  constraint search_queries_query_chk check (char_length(query) between 1 and 200)
);

create index if not exists idx_search_queries_searched_at on search_queries (searched_at desc);
create index if not exists idx_search_queries_normalized on search_queries (normalized_query);
create index if not exists idx_search_queries_zero_results on search_queries (searched_at desc) where results_count = 0;

alter table search_queries enable row level security;

-- Useful view: most-searched queries over the last 30 days with zero-result rate
create or replace view v_search_top_30d as
select
  lower(query) as query,
  count(*) as total_searches,
  count(distinct user_id) as unique_searchers,
  sum(case when results_count = 0 then 1 else 0 end) as zero_result_searches,
  max(matched_alias) as matched_alias
from search_queries
where searched_at >= now() - interval '30 days'
group by lower(query)
order by total_searches desc;
