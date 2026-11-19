-- Run only against a disposable test project.
do $$
declare a jsonb; b jsonb; one_yes jsonb; two_yes jsonb; pid1 uuid; pid2 uuid;
begin
 a:=public.puente_register('patient',jsonb_build_object('name','TEST Patient','home','Chamberi','cango',jsonb_build_array('Chamberi'),'days',jsonb_build_array('Mon'),'time','Morning','interests',jsonb_build_array('Reading'),'length',jsonb_build_array('30 minutes')));
 pid1:=(a->>'participant_id')::uuid;
 b:=public.puente_register('volunteer',jsonb_build_object('name','TEST Volunteer','home','Chamberi','cango',jsonb_build_array('Chamberi'),'days',jsonb_build_array('Mon'),'time','Morning','interests',jsonb_build_array('Reading'),'length',jsonb_build_array('30 minutes')));
 pid2:=(b->>'participant_id')::uuid;
 if not (b->>'match_proposed')::boolean then raise exception 'Compatible profiles should produce a proposal'; end if;
 one_yes:=public.puente_respond(a->>'participant_token',true);
 if coalesce((one_yes->>'confirmed')::boolean,false) then raise exception 'One yes must not confirm'; end if;
 two_yes:=public.puente_respond(b->>'participant_token',true);
 if not coalesce((two_yes->>'confirmed')::boolean,false) then raise exception 'Two yes answers should confirm'; end if;
 update public.puente_participants set expires_at=now()-interval '1 minute' where id in(pid1,pid2);
 update public.puente_participant_tokens set expires_at=now()-interval '1 minute' where participant_id in(pid1,pid2);
 update public.puente_matches set expires_at=now()-interval '1 minute' where patient_id=pid1 and volunteer_id=pid2;
 perform public.purge_expired_puente();
 if exists(select 1 from public.puente_participants where id in(pid1,pid2)) then raise exception 'Expired participant data not purged'; end if;
end $$;
