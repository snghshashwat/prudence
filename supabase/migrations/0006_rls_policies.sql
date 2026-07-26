alter table public.profiles enable row level security;
alter table public.service_catalog enable row level security;
alter table public.client_services enable row level security;
alter table public.updates enable row level security;

-- profiles
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

create policy "profiles_update_own_or_admin" on public.profiles
  for update using (id = auth.uid() or public.is_admin());

create policy "profiles_insert_admin" on public.profiles
  for insert with check (public.is_admin());

-- service_catalog
create policy "service_catalog_select_authenticated" on public.service_catalog
  for select to authenticated using (true);

create policy "service_catalog_write_admin" on public.service_catalog
  for all using (public.is_admin()) with check (public.is_admin());

-- client_services
create policy "client_services_select_own_or_admin" on public.client_services
  for select using (client_id = auth.uid() or public.is_admin());

create policy "client_services_insert_admin" on public.client_services
  for insert with check (public.is_admin());

create policy "client_services_update_admin" on public.client_services
  for update using (public.is_admin());

create policy "client_services_delete_admin" on public.client_services
  for delete using (public.is_admin());

-- updates
create policy "updates_select_broadcast_or_own_or_admin" on public.updates
  for select using (
    target_client_id is null or target_client_id = auth.uid() or public.is_admin()
  );

create policy "updates_insert_admin" on public.updates
  for insert with check (public.is_admin() and created_by = auth.uid());

create policy "updates_delete_admin" on public.updates
  for delete using (public.is_admin());
