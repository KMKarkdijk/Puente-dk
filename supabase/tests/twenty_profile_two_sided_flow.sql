-- Disposable-project integration test. Creates 20 synthetic participants per role and cleans them up.
do $$
declare
  i integer;
  p jsonb;
  v jsonb;
  p_tokens text[] := array[]::text[];
  v_tokens text[] := array[]::text[];
  match_count integer;
  first_yes jsonb;
  second_yes jsonb;
  rejected jsonb;
begin
  for i in 1..20 loop
    p:=public.puente_register('patient',jsonb_build_object(
      'name','SYNTH-P-'||i,'home','Chamberi','cango',jsonb_build_array('Chamberi','Centro'),
      'days',jsonb_build_array('Mon','Wed'),'time','Morning',
      'interests',jsonb_build_array('Reading','Coffee'),'length',jsonb_build_array('30 minutes','45 minutes')
    ));
    p_tokens:=array_append(p_tokens,p->>'participant_token');
  end loop;
  for i in 1..20 loop
    v:=public.puente_register('volunteer',jsonb_build_object(
      'name','SYNTH-V-'||i,'home','Chamberi','cango',jsonb_build_array('Chamberi','Centro'),
      'days',jsonb_build_array('Mon','Wed'),'time','Morning',
      'interests',jsonb_build_array('Reading','Coffee'),'length',jsonb_build_array('30 minutes','45 minutes')
    ));
    v_tokens:=array_append(v_tokens,v->>'participant_token');
  end loop;
  select count(*) into match_count
  from public.puente_matches m
  join public.puente_participants p on p.id=m.patient_id
  join public.puente_participants v on v.id=m.volunteer_id
  where p.display_name like 'SYNTH-P-%' and v.display_name like 'SYNTH-V-%'
    and m.status='proposed';
  if match_count<>20 then raise exception 'Expected 20 proposals, got %',match_count; end if;
  first_yes:=public.puente_respond(p_tokens[1],true);
  if coalesce((first_yes->>'confirmed')::boolean,false) then raise exception 'One yes must not confirm'; end if;
  second_yes:=public.puente_respond(v_tokens[1],true);
  if not coalesce((second_yes->>'confirmed')::boolean,false) then raise exception 'Two yes answers should confirm'; end if;
  rejected:=public.puente_respond(v_tokens[2],false);
  if rejected->>'status'<>'declined' then raise exception 'Decline did not set declined'; end if;
  delete from public.puente_participants
  where display_name like 'SYNTH-P-%' or display_name like 'SYNTH-V-%';
end $$;
