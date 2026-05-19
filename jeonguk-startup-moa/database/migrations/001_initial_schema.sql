create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  name text,
  phone text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create table if not exists public.raw_listings (
  id uuid primary key default gen_random_uuid(),
  source_file_id uuid,
  raw_brand_name text,
  raw_branch_name text,
  raw_category text,
  raw_address text,
  raw_sido text,
  raw_sigungu text,
  raw_dong text,
  raw_detail_address text,
  owner_name text,
  owner_phone text,
  customer_name text,
  monthly_sales numeric,
  premium numeric,
  rent numeric,
  cost numeric,
  estimated_profit numeric,
  pos_original jsonb,
  sales_sheet_original jsonb,
  internal_memo text,
  status text not null default 'draft' check (status in ('draft', 'reviewing', 'published', 'hidden')),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.public_listings (
  id uuid primary key default gen_random_uuid(),
  raw_listing_id uuid references public.raw_listings(id) on delete set null,
  public_code text not null unique,
  title text not null,
  brand_group text,
  category text not null,
  sido text not null,
  sigungu text not null,
  region_label text not null,
  monthly_sales_range text,
  premium_range text,
  estimated_profit_range text,
  rent_range text,
  monthly_sales_bucket int,
  premium_bucket int,
  estimated_profit_bucket int,
  size_range text,
  floor_type text,
  operation_period_range text,
  summary text,
  highlights text[] not null default '{}',
  recommended_for text[] not null default '{}',
  image_url text,
  is_public boolean not null default false,
  published_at timestamptz,
  hidden_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.favorite_listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  public_listing_id uuid not null references public.public_listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, public_listing_id)
);

create table if not exists public.compare_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  public_listing_id uuid not null references public.public_listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, public_listing_id)
);

create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  public_listing_id uuid references public.public_listings(id) on delete set null,
  request_type text not null check (request_type in ('consultation', 'detail_request', 'condition_request')),
  name text not null,
  phone text not null,
  preferred_region text,
  preferred_category text,
  budget_range text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'in_progress', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists public_listings_public_idx
  on public.public_listings (is_public, published_at desc);

create index if not exists public_listings_filter_idx
  on public.public_listings (sido, sigungu, category, brand_group);

create index if not exists public_listings_bucket_idx
  on public.public_listings (monthly_sales_bucket, premium_bucket, estimated_profit_bucket);

alter table public.profiles enable row level security;
alter table public.raw_listings enable row level security;
alter table public.public_listings enable row level security;
alter table public.favorite_listings enable row level security;
alter table public.compare_items enable row level security;
alter table public.consultation_requests enable row level security;

create policy "profiles are readable by owner or admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "profiles are inserted by owner"
  on public.profiles for insert
  with check (id = auth.uid());

create policy "profiles are updated by owner or admin"
  on public.profiles for update
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

create policy "raw listings admin select"
  on public.raw_listings for select
  using (public.is_admin());

create policy "raw listings admin insert"
  on public.raw_listings for insert
  with check (public.is_admin());

create policy "raw listings admin update"
  on public.raw_listings for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "raw listings admin delete"
  on public.raw_listings for delete
  using (public.is_admin());

create policy "public listings readable when published"
  on public.public_listings for select
  using (is_public = true or public.is_admin());

create policy "public listings admin insert"
  on public.public_listings for insert
  with check (public.is_admin());

create policy "public listings admin update"
  on public.public_listings for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "public listings admin delete"
  on public.public_listings for delete
  using (public.is_admin());

create policy "favorites owner select"
  on public.favorite_listings for select
  using (user_id = auth.uid());

create policy "favorites owner insert"
  on public.favorite_listings for insert
  with check (user_id = auth.uid());

create policy "favorites owner delete"
  on public.favorite_listings for delete
  using (user_id = auth.uid());

create policy "compare owner select"
  on public.compare_items for select
  using (user_id = auth.uid());

create policy "compare owner insert"
  on public.compare_items for insert
  with check (user_id = auth.uid());

create policy "compare owner delete"
  on public.compare_items for delete
  using (user_id = auth.uid());

create policy "consultations owner select"
  on public.consultation_requests for select
  using (user_id = auth.uid() or public.is_admin());

create policy "consultations customer insert"
  on public.consultation_requests for insert
  with check (user_id = auth.uid() or user_id is null);

create policy "consultations admin update"
  on public.consultation_requests for update
  using (public.is_admin())
  with check (public.is_admin());
