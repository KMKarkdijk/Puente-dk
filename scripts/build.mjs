// Zero-dependency build: copies the static site into dist/ and writes dist/config.js
// from environment variables. Only PUBLIC values are written (URL and anon/publishable key).
import { cpSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';

const out = 'dist';
rmSync(out, { recursive: true, force: true });
mkdirSync(out);
cpSync('index.html', `${out}/index.html`);
cpSync('src', `${out}/src`, { recursive: true });

const url = (process.env.SUPABASE_URL || '').trim();
const key = (process.env.SUPABASE_ANON_KEY || '').trim();

// Safety net: refuse to publish a secret key in frontend code.
let secret = key.startsWith('sb_secret_');
try {
  const part = key.split('.')[1];
  if (part && JSON.parse(Buffer.from(part, 'base64url').toString()).role === 'service_role') secret = true;
} catch { /* not a JWT: fine */ }
if (secret) {
  console.error('ERROR: SUPABASE_ANON_KEY holds a secret/service_role key. Use the public anon (publishable) key.');
  process.exit(1);
}

writeFileSync(`${out}/config.js`,
  `window.__PUENTE_CONFIG__ = ${JSON.stringify({ SUPABASE_URL: url, SUPABASE_ANON_KEY: key })};\n`);
console.log(`Built dist/ (Supabase ${url && key ? 'configured' : 'not configured'})`);
