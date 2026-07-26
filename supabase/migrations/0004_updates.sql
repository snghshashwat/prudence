create table public.updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  target_client_id uuid references public.profiles(id) on delete cascade,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create index updates_target_idx on public.updates (target_client_id);
create index updates_created_at_idx on public.updates (created_at desc);
