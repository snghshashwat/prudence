create table public.client_services (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  service_id uuid not null references public.service_catalog(id) on delete restrict,
  status text not null default 'not_started' check (status in ('not_started','in_progress','completed')),
  notes text,
  assigned_by uuid references public.profiles(id),
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, service_id)
);

create index client_services_client_idx on public.client_services (client_id);
create index client_services_service_idx on public.client_services (service_id);
