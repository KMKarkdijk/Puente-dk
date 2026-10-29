-- Proposed tables for when Puente needs real volunteers and real requests.
-- Run in the Supabase SQL editor. Row Level Security is ON: the anon key can only do what the policies allow.
create table if not exists volunteers (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  areas text[] default '{}',
  available_days text[] default '{}',
  helps text[] default '{}',
  created_at timestamptz default now()
);
create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  volunteer_id uuid references volunteers(id),
  answers jsonb not null,            -- contains personal data: see README before storing
  created_at timestamptz default now()
);
alter table volunteers enable row level security;
alter table requests   enable row level security;
create policy "anyone can read volunteers" on volunteers for select using (true);
create policy "anyone can send a request"  on requests   for insert with check (true);
-- No select/update/delete policy on requests: only you (dashboard / service role on a server) can read them.
