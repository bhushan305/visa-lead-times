-- Feedback submissions from the public site.
--
-- Schema designed to:
--   * accept anonymous submissions (name optional, email required)
--   * preserve context (which page, which case) for triage
--   * support reading via service-role key only (no public read access)
--
-- Use cases for the data:
--   * understand which pages drive feedback (which cases are confusing?)
--   * follow up via email
--   * surface emerging issues / data gaps reported by users

create table if not exists feedback (
  id          bigserial primary key,
  submitted_at timestamptz not null default now(),
  user_name   text,                              -- optional
  email       text not null,                     -- required
  message     text not null,
  page_path   text,                              -- where the form was submitted from
  case_slug   text,                              -- if submitted from a /case/* page
  user_agent  text,
  user_id     text,                              -- analytics UUID (joins with page_views / click_events)
  -- Soft constraints so we don't trust user input to be valid
  constraint feedback_email_chk      check (char_length(email) between 3 and 320 and email like '%@%'),
  constraint feedback_message_chk    check (char_length(message) between 1 and 4000),
  constraint feedback_user_name_chk  check (user_name is null or char_length(user_name) <= 120)
);

create index if not exists idx_feedback_submitted_at on feedback (submitted_at desc);
create index if not exists idx_feedback_case_slug on feedback (case_slug) where case_slug is not null;

-- RLS: deny by default. Inserts come via the service-role key (server-side).
alter table feedback enable row level security;

-- Admin view: last 30 days, sorted newest first
create or replace view v_feedback_recent as
select
  submitted_at, user_name, email, message, page_path, case_slug
from feedback
where submitted_at > now() - interval '30 days'
order by submitted_at desc;
