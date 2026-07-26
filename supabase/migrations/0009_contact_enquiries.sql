-- Enquiries submitted from the public contact form on the landing page.
create table public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  interest text check (interest in ('nri','family_business','accounting_cfo','other')),
  message text not null,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now()
);

create index contact_enquiries_created_at_idx
  on public.contact_enquiries (created_at desc);
create index contact_enquiries_status_idx on public.contact_enquiries (status);

alter table public.contact_enquiries enable row level security;

-- Anyone (including anonymous visitors) may submit an enquiry...
create policy "contact_enquiries_insert_public" on public.contact_enquiries
  for insert to anon, authenticated with check (true);

-- ...but only staff may ever read or manage them. Without an explicit
-- SELECT policy the anon role cannot read back what it just inserted,
-- which is what we want: the form is write-only to the public.
create policy "contact_enquiries_select_admin" on public.contact_enquiries
  for select using (public.is_admin());

create policy "contact_enquiries_update_admin" on public.contact_enquiries
  for update using (public.is_admin()) with check (public.is_admin());

create policy "contact_enquiries_delete_admin" on public.contact_enquiries
  for delete using (public.is_admin());
