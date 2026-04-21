create table if not exists clients (
  phone text primary key,
  name text not null
);

create table if not exists services (
  id serial primary key,
  name text not null,
  category text not null check (category in ('domestic', 'commercial')),
  unit text,
  base_price numeric(10,2) not null default 0
);

create table if not exists requests (
  id bigserial primary key,
  client_phone text not null references clients(phone),
  service_id int not null references services(id),
  params jsonb not null default '{}'::jsonb,
  calc_price numeric(10,2) not null default 0,
  final_price numeric(10,2),
  status text not null default 'Новая',
  address text,
  desired_date timestamptz,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists media (
  id bigserial primary key,
  request_id bigint not null references requests(id) on delete cascade,
  type text not null check (type in ('photo', 'video')),
  url text not null,
  filename text not null,
  size bigint not null,
  uploaded_at timestamptz not null default now()
);

create table if not exists bonuses (
  client_phone text primary key references clients(phone),
  balance int not null default 0
);

create table if not exists bonus_history (
  id bigserial primary key,
  client_phone text not null references clients(phone),
  request_id bigint references requests(id),
  change int not null,
  reason text not null,
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id bigserial primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  image_url text,
  tags text[] default '{}',
  published_at timestamptz not null default now()
);

create index if not exists idx_requests_created_at on requests(created_at desc);
create index if not exists idx_requests_status on requests(status);
create index if not exists idx_requests_phone on requests(client_phone);
