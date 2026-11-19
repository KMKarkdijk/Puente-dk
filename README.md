# Puente

Picture-first questionnaire (modes Writing, Pictures and Voice). Static website, vanilla JavaScript.

## Supabase-connected two-sided matching

The branch `feature/supabase-two-sided-matching` now connects the questionnaire to the Supabase RPC API:

- Hulpvragers and volunteers submit their forms separately.
- Only a public Supabase key is sent to the browser. Never expose a service-role or secret key.
- Participant answers, match proposals and token hashes are stored in Supabase.
- A random 256-bit private participant token is saved in that browser's local storage so the participant can return on the same device/browser.
- Each person must accept independently. The match is confirmed only after both accept.
- Participants can refresh their private status later; the token expires after 12 hours.
- The cleanup job runs every minute and deletes expired participants, tokens and matches.
- Matching checks overlapping days, time of day, meeting length and interests, compatible selected districts, and straight-line distance against the combined travel radii. The website currently estimates travel radius from the selected transport mode (walking 2 km, bicycle 5 km, bus/metro/car/lift 15 km; cannot travel alone 0 km). This is a prototype approximation, not route planning.

## Supabase setup

The database project is already connected and its migrations have been applied. For a Vercel build, set these Environment Variables for **Production** and **Preview**:

| Name | Value |
|---|---|
| `SUPABASE_URL` | `https://yuulhnugryckrqcwpwxj.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | The project's public `sb_publishable_...` key from Supabase → Project Settings → API Keys |

A legacy public anon key can be used as `SUPABASE_ANON_KEY` if needed. Do not use `sb_secret_...` or a service-role key. The build script refuses Vercel builds without these public settings and rejects secret keys.

## Migrations and tests

Migrations in order:
1. `supabase/migrations/202611190001_puente_core_tables.sql`
2. `supabase/migrations/202611190002_puente_matching_consent_rpc.sql`
3. `supabase/migrations/202611190003_puente_one_active_match_per_participant.sql`
4. `supabase/migrations/20261119180000_puente_school_project_12h_retention.sql`
5. `supabase/migrations/20261119193000_puente_frontend_distance_and_private_status.sql`

The test SQL files in `supabase/tests/` use disposable records. Database-level integration tests have verified that:
- A proposal is created for compatible profiles.
- The first acceptance does not confirm the match.
- The second independent acceptance confirms it.
- A distance-incompatible pair is rejected.
- The actual 20 patient and 20 volunteer profiles embedded in `src/main.js` were evaluated as a 20×20 matrix (400 possible pairs; 57 compatible pairs under the prototype's inferred travel/district assumptions). Two known hard cases, Rosa (no shared interests) and Begoña (outside the local matching area), produced no compatible pair in that matrix.
- Test records were removed after the tests.

These are database and static-code checks, not a full browser end-to-end test across two real browsers. The website still needs a live Preview deployment check before production use.

## Build and local run

Requires Node 18+.

```bash
npm run build
npm run dev
```

For a local Supabase-connected build, set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the environment before `npm run build`. The build writes `dist/config.js`; only the public URL/key are included.

## Security, privacy and project limits

- Row Level Security is enabled and forced on all participant, token and match tables. Direct table access is revoked; the browser calls narrow token-authenticated RPC functions.
- The public RPCs are SECURITY DEFINER functions by design for this no-account prototype. Supabase's security advisor therefore still reports warnings for public execution, and the tables produce informational RLS-without-policy notices. Do not interpret this as a production security certification.
- The token is a bearer credential stored in local storage. Anyone with access to that browser profile can act as that participant. Do not use shared/public devices.
- Public registration has no CAPTCHA or rate limiting. This is a school prototype only.
- Participant answers can reveal health-related information. Before real-world use, complete a GDPR/AVG review, establish a lawful basis and participant notices, review backups/log retention, add abuse protection, and arrange safeguarding/accessibility oversight.
- Straight-line distance is only an approximation. It does not calculate roads, transit time, terrain or actual meeting arrangements.
- Voice recognition is browser-provided; audio may be processed by the browser's speech provider. Puente does not record or store audio.

## Vercel deployment

Vercel is not connected through an available deployment control in this workspace. The branch is prepared for a Preview build once the two environment variables above are set in Vercel. Verify the Preview workflow with two separate browser profiles before promoting to Production. Do not deploy as a real service for patients or volunteers.
