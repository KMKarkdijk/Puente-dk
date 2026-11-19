# Puente

Picture-first questionnaire (modes W = Writing, P = Pictures, V = Voice). Static website, vanilla JavaScript.

## Current state of the two-sided matching work

The branch `feature/supabase-two-sided-matching` contains the initial Supabase database layer:
- Separate participant records for care recipients and volunteers.
- Private participant tokens (only token hashes are stored).
- Match proposals with separate consent flags; a match is confirmed only after both participants accept.
- A database cleanup job scheduled every minute; expired participant, token and match rows are deleted after 12 hours.
- Row Level Security enabled and forced on all three tables; direct table access is revoked.
- One active match per participant is enforced.

**Important: this is a backend foundation, not a finished website integration.** The current `src/main.js` still uses its local fictitious profiles and local `findMatch()` result screen. It does not yet submit completed forms to the new RPCs, give participants their return tokens, or show an independent consent screen. Do not merge or deploy this branch as a live feature until that UI flow is implemented and tested.

## Supabase migrations and tests

Apply migrations in order:
1. `supabase/migrations/202611190001_puente_core_tables.sql`
2. `supabase/migrations/202611190002_puente_matching_consent_rpc.sql`
3. `supabase/migrations/202611190003_puente_one_active_match_per_participant.sql`

The database integration tests are `supabase/tests/two_sided_matching.sql` and `supabase/tests/twenty_profile_two_sided_flow.sql`. Run them only in a disposable test project; they create and delete synthetic participants.

The cleanup job runs every minute. Expired data is immediately inaccessible to the RPCs after its expiry timestamp; physical deletion occurs on the next scheduled cleanup run (normally within one minute). The 12-hour lifetime is not an archival guarantee and backups/logs may have separate retention rules.

## Existing site and build

- **Framework / language:** none. Plain HTML, CSS and JavaScript (ES5 style), no framework, no bundler.
- **Libraries (CDN, pinned):** Leaflet 1.9.4 (real map), Google Fonts. Map tiles: OpenStreetMap.
- **Build:** `npm run build` copies the site into `dist/` and writes `dist/config.js`.

| File | Purpose |
|---|---|
| `index.html` | page shell, loads everything |
| `src/main.js` | questions, existing local matching and result UI |
| `src/style.css` | styling |
| `src/lib/supabase.js` | minimal Supabase REST client; not yet used by the UI |
| `scripts/build.mjs` | build script; blocks secret keys in browser output |
| `supabase/migrations/` | database migrations |
| `supabase/tests/` | disposable test SQL |

## Run and build locally

Requires Node 18+.
```
npm run build
npm run dev
```
Do not open `index.html` by double-clicking after a fresh checkout: `config.js` only exists after `npm run build`.

## Security and privacy

- The browser may receive only `SUPABASE_URL` and a public anon/publishable key. Never put a service-role or `sb_secret_` key in frontend code.
- The RPCs use random 256-bit participant tokens; only SHA-256 token hashes are stored. Public callable SECURITY DEFINER RPCs are intentionally used for token-based participation, but they still need abuse/rate-limit protection before public deployment.
- Participant answers may contain health-related information. Before real use, complete a GDPR/AVG review, define lawful basis and notices, restrict collected fields, agree retention/backups/logs, and arrange human safeguarding and accessibility review.
- The existing questionnaire's voice feature relies on browser speech recognition; audio may be processed by the browser's external speech provider.

## Vercel

The current production site is not changed by this branch. Do not deploy this backend-only branch until the browser form, token-return and separate-consent screens are connected and verified in a preview deployment.
