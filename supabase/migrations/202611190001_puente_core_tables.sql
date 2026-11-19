create extension if not exists pgcrypto with schema extensions;
create extension if not exists pg_cron with schema pg_catalog;

create table public.puente_participants (
 id uuid primary key default gen_random_uuid(),
 role text not null check (role in ('patient','volunteer')),
 display_name text,
 answers jsonb not null check (jsonb_typeof(answers)='object'),
 created_at timestamptz not null default now(),
 expires_at timestamptz not null default (now()+interval '60 minutes'),
 check (expires_at <= created_at + interval '60 minutes' + interval '5 seconds')
);
create index puente_participants_active_role_idx on public.puente_participants(role,expires_at);
create index puente_participants_expiry_idx on public.puente_participants(expires_at);

create table public.puente_participant_tokens (
 participant_id uuid primary key references public.puente_participants(id) on delete cascade,
 token_hash text not null unique,
 created_at timestamptz not null default now(),
 expires_at timestamptz not null
);
create index puente_tokens_expiry_idx on public.puente_participant_tokens(expires_at);

create table public.puente_matches (
 id uuid primary key default gen_random_uuid(),
 patient_id uuid not null references public.puente_participants(id) on delete cascade,
 volunteer_id uuid not null references public.puente_participants(id) on delete cascade,
 status text not null default 'proposed' check (status in ('proposed','confirmed','declined','expired')),
 patient_consent boolean not null default false,
 volunteer_consent boolean not null default false,
 match_reason jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 expires_at timestamptz not null default (now()+interval '60 minutes'),
 responded_at timestamptz,
 check (patient_id<>volunteer_id),
 check (expires_at <= created_at + interval '60 minutes' + interval '5 seconds')
);
create unique index puente_one_open_match_per_pair on public.puente_matches(patient_id,volunteer_id) where status in ('proposed','confirmed');
create index puente_matches_expiry_idx on public.puente_matches(expires_at);
create index puente_matches_volunteer_id_idx on public.puente_matches(volunteer_id);

alter table public.puente_participants enable row level security;
alter table public.puente_participant_tokens enable row level security;
alter table public.puente_matches enable row level security;
alter table public.puente_participants force row level security;
alter table public.puente_participant_tokens force row level security;
alter table public.puente_matches force row level security;
revoke all on public.puente_participants from anon,authenticated,public;
revoke all on public.puente_participant_tokens from anon,authenticated,public;
revoke all on public.puente_matches from anon,authenticated,public;

create or replace function public.purge_expired_puente()
returns integer language plpgsql security definer set search_path='' as $$
declare deleted_count integer;
begin
 delete from public.puente_matches where expires_at<=now() or status='expired';
 delete from public.puente_participant_tokens where expires_at<=now();
 delete from public.puente_participants where expires_at<=now();
 get diagnostics deleted_count=row_count;
 return deleted_count;
end; $$;
revoke all on function public.purge_expired_puente() from public,anon,authenticated;
select cron.schedule('puente-expiry-cleanup','* * * * *','select public.purge_expired_puente();');
