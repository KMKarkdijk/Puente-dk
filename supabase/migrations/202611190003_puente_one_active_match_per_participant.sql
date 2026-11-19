create unique index if not exists puente_one_active_match_per_patient
 on public.puente_matches(patient_id) where status in ('proposed','confirmed');
create unique index if not exists puente_one_active_match_per_volunteer
 on public.puente_matches(volunteer_id) where status in ('proposed','confirmed');

create or replace function public.puente_register(p_role text,p_answers jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_id uuid; v_token text; v_match uuid; v_other_id uuid;
begin
 if p_role not in ('patient','volunteer') then raise exception 'Invalid participant role'; end if;
 if jsonb_typeof(p_answers)<>'object' then raise exception 'Answers must be a JSON object'; end if;
 if length(coalesce(p_answers->>'name',''))>80 then raise exception 'Name is too long'; end if;
 v_token:=encode(extensions.gen_random_bytes(32),'hex');
 insert into public.puente_participants(role,display_name,answers)
 values(p_role,nullif(left(coalesce(p_answers->>'name',''),80),''),p_answers) returning id into v_id;
 insert into public.puente_participant_tokens(participant_id,token_hash,expires_at)
 values(v_id,encode(extensions.digest(v_token,'sha256'),'hex'),now()+interval '60 minutes');
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
   insert into public.puente_matches(patient_id,volunteer_id,match_reason)
   values(case when p_role='patient' then v_id else v_other_id end,
          case when p_role='volunteer' then v_id else v_other_id end,
          jsonb_build_object('shared_time',p_answers->>'time'))
   returning id into v_match;
 end if;
 return jsonb_build_object('participant_token',v_token,'participant_id',v_id,
   'match_proposed',v_match is not null,'expires_at',now()+interval '60 minutes');
end; $$;
