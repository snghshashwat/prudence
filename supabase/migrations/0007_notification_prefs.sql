-- Per-user notification preferences, surfaced on the dashboard Settings page.
alter table public.profiles
  add column notify_service_updates boolean not null default true,
  add column notify_announcements boolean not null default true,
  add column notify_email boolean not null default true;
