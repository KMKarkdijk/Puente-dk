create or replace function public.puente_match_compatible(a jsonb,b jsonb)
returns boolean language sql immutable set search_path='' as $$
 select
  coalesce(exists(select 1 from jsonb_array_elements_text(coalesce(a->'days','[]'::jsonb)) ad
   join jsonb_array_elements_text(coalesce(b->'days','[]'::jsonb)) bd on ad.value=bd.value),false)
  and coalesce(a->>'time'=b->>'time' or exists(select 1
   from jsonb_array_elements_text(coalesce(a->'times',case when a ? 'time' then jsonb_build_array(a->>'time') else '[]'::jsonb end)) atime
   join jsonb_array_elements_text(coalesce(b->'times',case when b ? 'time' then jsonb_build_array(b->>'time') else '[]'::jsonb end)) btime on atime.value=btime.value),false)
  and coalesce(exists(select 1 from jsonb_array_elements_text(coalesce(a->'interests','[]'::jsonb)) ai
   join jsonb_array_elements_text(coalesce(b->'interests','[]'::jsonb)) bi on ai.value=bi.value),false)
  and coalesce(exists(select 1 from jsonb_array_elements_text(coalesce(a->'length',coalesce(a->'lens','[]'::jsonb))) al
   join jsonb_array_elements_text(coalesce(b->'length',coalesce(b->'lens','[]'::jsonb))) bl on al.value=bl.value),false)
  and (coalesce(a->>'home','')=coalesce(b->>'home','')
   or coalesce(a->'cango','[]'::jsonb) ? coalesce(b->>'home','')
   or coalesce(b->'cango','[]'::jsonb) ? coalesce(a->>'home','')
   or exists(select 1 from jsonb_array_elements_text(coalesce(a->'cango','[]'::jsonb)) aa
    join jsonb_array_elements_text(coalesce(b->'cango','[]'::jsonb)) bb on aa.value=bb.value))
  and nullif(a->>'lat','') is not null and nullif(a->>'lon','') is not null
  and nullif(b->>'lat','') is not null and nullif(b->>'lon','') is not null
  and 6371*2*asin(least(1::double precision,sqrt(
   power(sin(radians(((b->>'lat')::double precision-(a->>'lat')::double precision)/2)),2)
   +cos(radians((a->>'lat')::double precision))*cos(radians((b->>'lat')::double precision))
   *power(sin(radians(((b->>'lon')::double precision-(a->>'lon')::double precision)/2)),2)
  ))) <= greatest(0,coalesce(nullif(a->>'radius_km','')::double precision,0))
    + greatest(0,coalesce(nullif(b->>'radius_km','')::double precision,0));
$$;
revoke all on function public.puente_match_compatible(jsonb,jsonb) from public,anon,authenticated;

create or replace function public.puente_status(p_token text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_pid uuid; v_match public.puente_matches%rowtype; v_other_answers jsonb;
begin
 select participant_id into v_pid from public.puente_participant_tokens
 where token_hash=encode(extensions.digest(p_token,'sha256'),'hex') and expires_at>now();
 if v_pid is null then raise exception 'Invalid or expired participant token'; end if;
 select * into v_match from public.puente_matches
 where (patient_id=v_pid or volunteer_id=v_pid) and status in ('proposed','confirmed')
   and expires_at>now() order by created_at desc limit 1;
 if not found then return jsonb_build_object('status','waiting','confirmed',false); end if;
 select answers into v_other_answers from public.puente_participants
 where id=case when v_match.patient_id=v_pid then v_match.volunteer_id else v_match.patient_id end
   and expires_at>now();
 return jsonb_build_object(
  'status',v_match.status,'confirmed',v_match.status='confirmed',
  'your_consent',case when v_match.patient_id=v_pid then v_match.patient_consent else v_match.volunteer_consent end,
  'other_consent',case when v_match.patient_id=v_pid then v_match.volunteer_consent else v_match.patient_consent end,
  'other_profile',case when v_other_answers is null then null else jsonb_build_object(
   'name',v_other_answers->>'name','home',v_other_answers->>'home',
   'interests',coalesce(v_other_answers->'interests','[]'::jsonb),
   'days',coalesce(v_other_answers->'days','[]'::jsonb),'time',v_other_answers->>'time',
   'length',coalesce(v_other_answers->'length','[]'::jsonb)) end);
end; $$;
revoke all on function public.puente_match_compatible(jsonb,jsonb) from public,anon,authenticated;
revoke all on function public.puente_status(text) from public,anon,authenticated;
grant execute on function public.puente_status(text) to anon,authenticated;
