create or replace function public.puente_match_compatible(a jsonb,b jsonb)
returns boolean language sql immutable set search_path='' as $$
 select
 coalesce(exists(select 1 from jsonb_array_elements_text(coalesce(a->'days','[]'::jsonb)) ad join jsonb_array_elements_text(coalesce(b->'days','[]'::jsonb)) bd on ad.value=bd.value),false)
 and coalesce((a->>'time')=(b->>'time'),false)
 and coalesce(exists(select 1 from jsonb_array_elements_text(coalesce(a->'interests','[]'::jsonb)) ai join jsonb_array_elements_text(coalesce(b->'interests','[]'::jsonb)) bi on ai.value=bi.value),false)
 and coalesce(exists(select 1 from jsonb_array_elements_text(coalesce(a->'length','[]'::jsonb)) al join jsonb_array_elements_text(coalesce(b->'length','[]'::jsonb)) bl on al.value=bl.value),false)
 and (coalesce(a->>'home','')=coalesce(b->>'home','')
  or coalesce(a->'cango','[]'::jsonb) ? coalesce(b->>'home','')
  or coalesce(b->'cango','[]'::jsonb) ? coalesce(a->>'home','')
  or exists(select 1 from jsonb_array_elements_text(coalesce(a->'cango','[]'::jsonb)) aa join jsonb_array_elements_text(coalesce(b->'cango','[]'::jsonb)) bb on aa.value=bb.value));
$$;

create or replace function public.puente_register(p_role text,p_answers jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_id uuid; v_token text; v_match uuid; v_other_id uuid; v_reason jsonb;
begin
 if p_role not in ('patient','volunteer') then raise exception 'Invalid participant role'; end if;
 if jsonb_typeof(p_answers)<>'object' then raise exception 'Answers must be a JSON object'; end if;
 if length(coalesce(p_answers->>'name',''))>80 then raise exception 'Name is too long'; end if;
 v_token:=encode(extensions.gen_random_bytes(32),'hex');
 insert into public.puente_participants(role,display_name,answers) values(p_role,nullif(left(coalesce(p_answers->>'name',''),80),''),p_answers) returning id into v_id;
 insert into public.puente_participant_tokens(participant_id,token_hash,expires_at) values(v_id,encode(extensions.digest(v_token,'sha256'),'hex'),now()+interval '60 minutes');
 select p.id into v_other_id from public.puente_participants p
 where p.role<>p_role and p.expires_at>now() and p.id<>v_id
 and not exists(select 1 from public.puente_matches m
  where m.patient_id=case when p_role='patient' then v_id else p.id end
  and m.volunteer_id=case when p_role='volunteer' then v_id else p.id end
  and m.status in ('proposed','confirmed'))
 and public.puente_match_compatible(
  case when p_role='patient' then p_answers else p.answers end,
  case when p_role='volunteer' then p_answers else p.answers end)
 order by p.created_at asc limit 1;
 if v_other_id is not null then
  v_reason:=jsonb_build_object('shared_time',p_answers->>'time');
  insert into public.puente_matches(patient_id,volunteer_id,match_reason)
  values(case when p_role='patient' then v_id else v_other_id end,
         case when p_role='volunteer' then v_id else v_other_id end,v_reason)
  returning id into v_match;
 end if;
 return jsonb_build_object('participant_token',v_token,'participant_id',v_id,'match_proposed',v_match is not null,'expires_at',now()+interval '60 minutes');
end; $$;

create or replace function public.puente_respond(p_token text,p_accept boolean)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_pid uuid; v_match public.puente_matches%rowtype;
begin
 select participant_id into v_pid from public.puente_participant_tokens
 where token_hash=encode(extensions.digest(p_token,'sha256'),'hex') and expires_at>now();
 if v_pid is null then raise exception 'Invalid or expired participant token'; end if;
 select * into v_match from public.puente_matches
 where (patient_id=v_pid or volunteer_id=v_pid) and status='proposed' and expires_at>now()
 order by created_at desc limit 1 for update;
 if not found then return jsonb_build_object('status','waiting','confirmed',false); end if;
 if not p_accept then update public.puente_matches set status='declined',responded_at=now() where id=v_match.id; return jsonb_build_object('status','declined','confirmed',false); end if;
 if v_match.patient_id=v_pid then update public.puente_matches set patient_consent=true where id=v_match.id;
 else update public.puente_matches set volunteer_consent=true where id=v_match.id; end if;
 update public.puente_matches set status='confirmed',responded_at=now()
 where id=v_match.id and patient_consent and volunteer_consent;
 select * into v_match from public.puente_matches where id=v_match.id;
 return jsonb_build_object('status',v_match.status,'confirmed',v_match.status='confirmed','both_consented',v_match.patient_consent and v_match.volunteer_consent);
end; $$;

create or replace function public.puente_status(p_token text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_pid uuid; v_match public.puente_matches%rowtype;
begin
 select participant_id into v_pid from public.puente_participant_tokens
 where token_hash=encode(extensions.digest(p_token,'sha256'),'hex') and expires_at>now();
 if v_pid is null then raise exception 'Invalid or expired participant token'; end if;
 select * into v_match from public.puente_matches
 where (patient_id=v_pid or volunteer_id=v_pid) and status in ('proposed','confirmed') and expires_at>now()
 order by created_at desc limit 1;
 if not found then return jsonb_build_object('status','waiting','confirmed',false); end if;
 return jsonb_build_object('status',v_match.status,'confirmed',v_match.status='confirmed',
  'your_consent',case when v_match.patient_id=v_pid then v_match.patient_consent else v_match.volunteer_consent end,
  'other_consent',case when v_match.patient_id=v_pid then v_match.volunteer_consent else v_match.patient_consent end);
end; $$;

revoke all on function public.puente_match_compatible(jsonb,jsonb) from public,anon,authenticated;
revoke all on function public.puente_register(text,jsonb) from public,anon,authenticated;
revoke all on function public.puente_respond(text,boolean) from public,anon,authenticated;
revoke all on function public.puente_status(text) from public,anon,authenticated;
grant execute on function public.puente_register(text,jsonb) to anon,authenticated;
grant execute on function public.puente_respond(text,boolean) to anon,authenticated;
grant execute on function public.puente_status(text) to anon,authenticated;
