-- ClinicDocs MVP - Supabase/PostgreSQL schema
-- Execute este arquivo no SQL Editor do Supabase.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Minha clínica',
  cnpj text,
  address text,
  representative text,
  plan text not null default 'beta_free',
  monthly_contract_limit int not null default 999,
  created_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner','admin','member')),
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  title text not null,
  document_type text not null,
  html_template text not null,
  is_system boolean not null default false,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  created_by uuid not null references auth.users(id),
  title text not null,
  document_type text not null,
  client_name text,
  client_document_masked text,
  html_content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_org_member(org uuid)
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.organization_members m
    where m.organization_id = org and m.user_id = auth.uid()
  );
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  org_id uuid;
begin
  insert into public.profiles(id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;

  insert into public.organizations(name)
  values ('Minha clínica') returning id into org_id;

  insert into public.organization_members(organization_id, user_id, role)
  values (org_id, new.id, 'owner');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.templates enable row level security;
alter table public.contracts enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles select own" on public.profiles for select using (id = auth.uid());
create policy "profiles update own" on public.profiles for update using (id = auth.uid());

create policy "org select member" on public.organizations for select using (public.is_org_member(id));
create policy "org update owner admin" on public.organizations for update using (
  exists (select 1 from public.organization_members m where m.organization_id = id and m.user_id = auth.uid() and m.role in ('owner','admin'))
);

create policy "members select same org" on public.organization_members for select using (public.is_org_member(organization_id));
create policy "members insert owner admin" on public.organization_members for insert with check (
  exists (select 1 from public.organization_members m where m.organization_id = organization_id and m.user_id = auth.uid() and m.role in ('owner','admin'))
);
create policy "members delete owner" on public.organization_members for delete using (
  exists (select 1 from public.organization_members m where m.organization_id = organization_id and m.user_id = auth.uid() and m.role = 'owner')
);

create policy "templates select" on public.templates for select using (is_system = true or public.is_org_member(organization_id));
create policy "templates insert" on public.templates for insert with check (public.is_org_member(organization_id));
create policy "templates update" on public.templates for update using (public.is_org_member(organization_id));
create policy "templates delete" on public.templates for delete using (public.is_org_member(organization_id));

create policy "contracts select" on public.contracts for select using (public.is_org_member(organization_id));
create policy "contracts insert" on public.contracts for insert with check (public.is_org_member(organization_id) and created_by = auth.uid());
create policy "contracts delete" on public.contracts for delete using (public.is_org_member(organization_id));

create policy "audit select" on public.audit_logs for select using (public.is_org_member(organization_id));
create policy "audit insert" on public.audit_logs for insert with check (public.is_org_member(organization_id) and user_id = auth.uid());
