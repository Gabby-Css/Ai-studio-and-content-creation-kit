'use strict';
/**
 * lib/elevenlabs-budget.cjs — ElevenLabs character-usage budget. Generalizes the * metered-API cost lesson to the OTHER API the story pipeline leans on (VO). Unlike Apify (opaque
 * compute+proxy billing → must read the provider's real usage), we generate ALL VO ourselves, so the
 * chars we send ARE the exact spend — a LOCAL count is accurate, not an under-estimate. (The /v1/user/
 * subscription endpoint is permission-blocked on the current key, so this is the honest path; set
 * ELEVENLABS_CHAR_LIMIT to your plan's monthly cap, or grant the key user_read to auto-detect later.)
 */
const fs = require('fs');
const path = require('path');
const LOG = path.join(__dirname, '..', 'memory', 'elevenlabs-usage.jsonl');
const LIMIT = parseInt(process.env.ELEVENLABS_CHAR_LIMIT || '30000', 10); // STARTER ~30k chars/mo default

function monthKey() { const d = new Date(); return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`; }

function monthlyChars() {
  try {
    const m = monthKey();
    return fs.readFileSync(LOG, 'utf8').trim().split('\n').filter(Boolean)
      .map(l => { try { return JSON.parse(l); } catch { return null; } })
      .filter(e => e && (e.ts || '').slice(0, 7) === m)
      .reduce((a, e) => a + (e.chars || 0), 0);
  } catch { return 0; }
}

/** Record characters actually sent to ElevenLabs (call AFTER a successful TTS). */
function recordChars(chars, script) {
  try { fs.appendFileSync(LOG, JSON.stringify({ ts: new Date().toISOString(), chars: chars || 0, script: script || '' }) + '\n'); } catch { /* non-fatal */ }
}

/** Check before generating: would this VO fit under the monthly cap? */
function canSpend(estChars) {
  const used = monthlyChars();
  const remaining = LIMIT - used;
  return { allowed: (estChars || 0) <= remaining, used, remaining, limit: LIMIT, pct: Math.round(used / LIMIT * 100) };
}

module.exports = { monthlyChars, recordChars, canSpend, LIMIT };
