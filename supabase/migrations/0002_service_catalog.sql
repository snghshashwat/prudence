create table public.service_catalog (
  id uuid primary key default gen_random_uuid(),
  pillar text not null check (pillar in ('nri','family_business','accounting_cfo')),
  category text not null,
  name text not null,
  description text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index service_catalog_pillar_idx on public.service_catalog (pillar);
