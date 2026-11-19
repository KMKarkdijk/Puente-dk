-- School-project retention: participant records, tokens and matches live for 12 hours.
-- Access is checked against expires_at; pg_cron physically removes expired rows every minute.
do $$
declare c record;
begin
  for c in
    select conname from pg_constraint
    where conrelid in ('public.puente_participants'::regclass,'public.puente_matches'::regclass)
      and contype='c' and pg_get_constraintdef(oid) like '%01:00:05%'
  loop
    if c.conname like 'puente_participants%' then
      execute format('alter table public.puente_participants drop constraint %I',c.conname);
    else
      execute format('alter table public.puente_matches drop constraint %I',c.conname);
    end if;
  end loop;
end $$;

alter table public.puente_participants
  alter column expires_at set default (now() + interval '12 hours');
alter table public.puente_matches
  alter column expires_at set default (now() + interval '12 hours');

alter table public.puente_participants
  drop constraint if exists puente_participants_expiry_max_12h;
alter table public.puente_participants
  add constraint puente_participants_expiry_max_12h
  check (expires_at <= created_at + interval '12 hours 5 seconds');

alter table public.puente_matches
  drop constraint if exists puente_matches_expiry_max_12h;
alter table public.puente_matches
  add constraint puente_matches_expiry_max_12h
  check (expires_at <= created_at + interval '12 hours 5 seconds');

create or replace function public.puente_register(p_role text,p_answers jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_id uuid; v_token text; v_match uuid; v_other_id uuid;
begin
 if p_role not in ('patient','volunteer') then raise exception 'Invalid participant role'; end if;
 if jsonb_typeof(p_answers)<>'object' then raise exception 'Answers must be a JSON object'; end if;
 if length(coalesce(p_answers->>'name',''))>80 then raise exception 'Name is too long'; end if;
 v_token:=encode(extensions.gen_random_bytes(32),'hex');
 insert into public.puente_participants(role,display_name,answers,expires_at)
 values(p_role,nullif(left(coalesce(p_answers->>'name',''),80),''),p_answers,now()+interval '12 hours') returning id into v_id;
 insert into public.puente_participant_tokens(participant_id,token_hash,expires_at)
 values(v_id,encode(extensions.digest(v_token,'sha256'),'hex'),now()+interval '12 hours');
 select p.id into v_other_id from public.puente_participants p
 where p.role<>p_role and p.expires_at>now() and p.id<>v_id
 and not exists(select 1 from public.puente_matches m
   where (m.patient_id=p.id or m.volunteer_id=p.id)
   and m.status in ('proposed','confirmed') and m.expires_at>now())
 and public.puente_match_compatible(
   case when p_role='patient' then p_answers else p.answers end,
   case when p_role='volunteer' then p_answers else p.answers end)
 order by p.created_at asc limit 1;
 if v_other_id is not null then
   insert into public.puente_matches(patient_id,volunteer_id,match_reason,expires_at)
   values(case when p_role='patient' then v_id else v_other_id end,
          case when p_role='volunteer' then v_id else v_other_id end,
          jsonb_build_object('shared_time',p_answers->>'time'),now()+interval '12 hours')
   returning id into v_match;
 end if;
 return jsonb_build_object('participant_token',v_token,'participant_id',v_id,
   'match_proposed',v_match is not null,'expires_at',now()+interval '12 hours');
end; $$;
