create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.admin_users where user_id = auth.uid()); $$;
grant execute on function public.is_admin() to anon, authenticated;

create table if not exists public.site_settings (
  id integer primary key check (id = 1),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  title text not null default '',
  subtitle text not null default '',
  role text not null default '',
  stack text not null default '',
  image text not null default '',
  href text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.site_assets (
  asset_key text primary key,
  path text not null,
  original_name text,
  mime_type text,
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.site_assets enable row level security;

create policy "public read settings" on public.site_settings for select to anon, authenticated using (true);
create policy "admin write settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "public read projects" on public.projects for select to anon, authenticated using (true);
create policy "admin write projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "public read assets" on public.site_assets for select to anon, authenticated using (true);
create policy "admin write assets" on public.site_assets for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets(id, name, public, file_size_limit)
values ('portfolio-public', 'portfolio-public', true, 52428800)
on conflict (id) do update set public = true, file_size_limit = 52428800;

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values (
  'care-private',
  'care-private',
  false,
  52428800,
  array[
    'image/jpeg','image/png','image/webp','image/heic','image/heif',
    'application/pdf','application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/x-hwp','application/haansofthwp'
  ]
)
on conflict (id) do update
set public = false, file_size_limit = 52428800, allowed_mime_types = excluded.allowed_mime_types;

create policy "public download portfolio files" on storage.objects for select to anon, authenticated
using (bucket_id = 'portfolio-public');
create policy "admin upload portfolio files" on storage.objects for insert to authenticated
with check (bucket_id = 'portfolio-public' and public.is_admin());
create policy "admin update portfolio files" on storage.objects for update to authenticated
using (bucket_id = 'portfolio-public' and public.is_admin()) with check (bucket_id = 'portfolio-public' and public.is_admin());
create policy "admin delete portfolio files" on storage.objects for delete to authenticated
using (bucket_id = 'portfolio-public' and public.is_admin());

drop policy if exists "admin read care files" on storage.objects;
drop policy if exists "admin upload care files" on storage.objects;
drop policy if exists "admin update care files" on storage.objects;
drop policy if exists "admin delete care files" on storage.objects;

create policy "admin read care files" on storage.objects for select to authenticated
using (bucket_id = 'care-private' and public.is_admin());
create policy "admin upload care files" on storage.objects for insert to authenticated
with check (bucket_id = 'care-private' and public.is_admin());
create policy "admin update care files" on storage.objects for update to authenticated
using (bucket_id = 'care-private' and public.is_admin())
with check (bucket_id = 'care-private' and public.is_admin());
create policy "admin delete care files" on storage.objects for delete to authenticated
using (bucket_id = 'care-private' and public.is_admin());

-- Supabase Authentication에서 관리자 사용자를 만든 다음 이메일을 바꾸어 실행하세요.
-- insert into public.admin_users(user_id)
-- select id from auth.users where email = 'YOUR_ADMIN_EMAIL'
-- on conflict (user_id) do nothing;
