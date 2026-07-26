-- RLS hardening.
--
-- The UPDATE policies in 0006 had a USING clause but no WITH CHECK. USING
-- filters which rows you may target; WITH CHECK validates the row *after*
-- the update. Without it a permitted row can be rewritten into a state the
-- policy would never have allowed you to select, e.g. re-pointing a
-- client_services row at a different client.

-- profiles: you may only ever end up owning your own row.
drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin" on public.profiles
  for update
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- Belt-and-braces: the primary key must never change, even for an admin.
-- (prevent_role_escalation in 0005 already pins `role` for non-admins.)
create or replace function public.prevent_profile_id_change()
returns trigger language plpgsql as $$
begin
  if new.id is distinct from old.id then
    raise exception 'profiles.id is immutable';
  end if;
  return new;
end;
$$;

drop trigger if exists on_profile_id_guard on public.profiles;
create trigger on_profile_id_guard
  before update on public.profiles
  for each row execute function public.prevent_profile_id_change();

-- client_services: admin-only writes, and the resulting row must still
-- satisfy the admin check.
drop policy if exists "client_services_update_admin" on public.client_services;
create policy "client_services_update_admin" on public.client_services
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- updates: no UPDATE policy exists, so updates are immutable once sent
-- (insert + delete only). That is intentional, an edited announcement
-- clients have already read would be misleading.
