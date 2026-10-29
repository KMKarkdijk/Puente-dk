# Puente

Picture-first questionnaire (modes W = Writing, P = Pictures, V = Voice). Static website, vanilla JavaScript.

## What it is
- **Framework / language:** none. Plain HTML, CSS and JavaScript (ES5 style), no framework, no bundler.
- **Libraries (CDN, pinned):** Leaflet 1.9.4 (real map), Google Fonts. Map tiles: OpenStreetMap.
- **Build:** `npm run build` copies the site into `dist/` and writes `dist/config.js`. No dependencies to install.

## Files
| File | Purpose |
|---|---|
| `index.html` | page shell, loads everything |
| `src/main.js` | the whole app (questions, matching, map, results) |
| `src/style.css` | all styling |
| `src/lib/supabase.js` | optional database client (not used by the UI yet) |
| `scripts/build.mjs` | build script (also blocks secret keys) |
| `package.json`, `vercel.json` | build scripts, Vercel settings and security headers |
| `.env.example` | variable names, no secrets |
| `supabase/schema.sql` | proposed tables and Row Level Security |

## Run and build locally
Requires Node 18+.
```
npm run build      # creates dist/
npm run dev        # builds and serves on http://localhost:3000
```
Do not open `index.html` by double-clicking after a fresh checkout: `config.js` only exists after `npm run build`.

## What needs a backend
| Feature | Today | For production |
|---|---|---|
| Volunteers and matching | hard-coded demo people in `main.js` | database (Supabase `volunteers`) |
| Sending the request to a person | shown on screen only | database or email service (`requests` table, or a server function that sends mail) |
| Accounts / login | none | Supabase Auth, if people need to return |
| File storage | none needed | none |
| Voice mode | simulated demo; uses the browser's `speechSynthesis` | real speech recognition would need a browser API or a speech-to-text service; its API key must live in a server function, never in the page |
| External APIs | OpenStreetMap tiles, Google Fonts | OSM's public tile server is for light use; for real traffic use a tile provider (MapTiler, Stadia, Mapbox) |

Nothing here needs a backend to run today. The site works as it is.

## Secrets
- The browser only ever receives `SUPABASE_URL` and `SUPABASE_ANON_KEY` (public by design; Row Level Security protects the data).
- The build fails if that variable holds a `service_role` or `sb_secret_` key.
- Never put API keys for other services in `src/`. Use a Vercel serverless function (`/api/...`) and a Vercel environment variable instead.

## Privacy (important before storing answers)
Answers include a name, a home location and the fact that someone had a stroke. In the EU that is health data (GDPR, special category). Before saving requests, get explicit consent, use an EU Supabase region and write a privacy notice. Google Fonts loaded from Google's servers is also a GDPR point; you can self-host the two font families instead.

## Deploy to Vercel
1. Create a GitHub repo and push this folder (`.gitignore` already excludes `dist`, `.env`).
2. vercel.com > Add New > Project > import the repo.
3. Framework Preset: **Other**. Build Command: `npm run build`. Output Directory: `dist` (`vercel.json` already says this).
4. Only if you use Supabase: Settings > Environment Variables, add `SUPABASE_URL` and `SUPABASE_ANON_KEY` (Production and Preview). Deploy.
5. Open the URL and test: pick a home on the map, finish the questions, check the browser console for errors.
6. Optional: Settings > Domains to add your own domain.
CLI alternative: `npm i -g vercel`, then `vercel` (test) and `vercel --prod`.

## Supabase (optional)
1. Create a project, run `supabase/schema.sql` in the SQL editor.
2. Copy Project URL and the anon/publishable key into the Vercel variables above (and into a local `.env` if you export them before `npm run build`).
3. In `main.js` call `PuenteDB.select('volunteers')` or `PuenteDB.insert('requests', {...})` where the app should use real data.
