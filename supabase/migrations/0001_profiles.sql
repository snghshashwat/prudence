create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('admin','customer')),
  full_name text not null,
  email text not null,
  phone text,
  company_name text,
  client_type text check (client_type in ('nri','family_business','sme','individual')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);
