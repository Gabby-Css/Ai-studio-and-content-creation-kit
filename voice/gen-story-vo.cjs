#!/usr/bin/env node
'use strict';
/**
 * gen-story-vo.cjs — (2026-06-02).
 *
 * Generate an ElevenLabs AI VOICEOVER for a StoryTipDeep IG-story and place it
 * where Remotion can bake it into the render.
 *
 * Pipeline:
 *   1. Resolve a tip (by --tipId from memory/daily-ai-tips.json, or --text="...").
 *   2. Compose a ~13-14s spoken VO script from the tip fields (or use tip.vo if present).
 *   3. TTS via ElevenLabs (eleven_turbo_v2_5, the authorized voice selected by the recipient).
 *   4. Save MP3 to pipeline/generators/remotion/public/vo/<tipId>.mp3  (staticFile() reads public/).
 *   5. ffprobe the duration; warn if > 14.5s (would get clipped by the 15s comp).
 *   Cached by SHA(text|voice) so the same script never re-spends.
 *
 * Safety: --dry-run by default (shows script + cost). --execute generates (needs
 * ELEVENLABS_API_KEY). Run --execute only when the user authorizes voice generation.
 *
 * Run:
 *   node voice/gen-story-vo.cjs --tipId=AI-IMG-001 --dry-run
 *   node voice/gen-story-vo.cjs --tipId=AI-IMG-001 --execute
 *   node voice/gen-story-vo.cjs --text="custom narration" --out=sample --execute
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const { spawnSync } = require('child_process');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ROOT = path.join(__dirname, '..');
const TIPS_PATH = path.join(ROOT, 'memory', 'daily-ai-tips.json');
const VO_DIR = path.join(ROOT, 'pipeline', 'generators', 'remotion', 'public', 'vo');
const MANIFEST_PATH = path.join(VO_DIR, '_manifest.json');
fs.mkdirSync(VO_DIR, { recursive: true });

const argv = process.argv.slice(2);
const EXECUTE = argv.includes('--execute');
const DRY_RUN = !EXECUTE;
const getArg = (k) => { const a = argv.find(x => x.startsWith(`--${k}=`)); return a ? a.split('=').slice(1).join('=') : null; };
const TIP_ID = getArg('tipId');
const TEXT = getArg('text');
const OUT = getArg('out') || TIP_ID || 'sample';
const VOICE_ID = getArg('voice') || '<YOUR_VOICE_ID>'; // studio-specified story VO voice (--voice overrides)
const MODEL_ID = process.env.ELEVEN_MODEL_ID || 'eleven_turbo_v2_5';

function sha8(s) { return crypto.createHash('sha256').update(s).digest('hex').slice(0, 8); }
function loadJSON(p, d) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return d; } }

// Compose a natural ~13s spoken script from tip fields (VO should COMPLEMENT the
// on-screen text, not read it verbatim). Honors an explicit tip.vo override.
function composeVO(tip) {
  if (tip.vo) return String(tip.vo).trim();
  const hook = String(tip.hook || '').replace(/[.!?]+$/, '');
  const steps = Array.isArray(tip.steps) ? tip.steps : [];
  const connectors = ['First,', 'Then', 'Finally'];
  const stepLine = steps.map((s, i) => `${connectors[i] || 'Then'} ${String(s).charAt(0).toLowerCase()}${String(s).slice(1).replace(/[.]+$/, '')}.`).join(' ');
  const result = String(tip.result || '').replace(/[.!?]+$/, '');
  const cta = tip.cta || 'START';
  return `${hook}. Here's the fix. ${stepLine} ${result}. Reply ${cta} for the full breakdown.`;
}

function callElevenLabs(text, voiceId) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text,
      model_id: MODEL_ID,
      // a touch more expressive than the phone read; story VO wants energy
      voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true },
    });
    const req = https.request({
      hostname: 'api.elevenlabs.io', port: 443,
      path: `/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Accept': 'audio/mpeg',
      },
      timeout: 60000,
    }, (res) => {
      if (res.statusCode !== 200) {
        let err = ''; res.on('data', c => err += c);
        res.on('end', () => reject(new Error(`ElevenLabs ${res.statusCode}: ${err.slice(0, 300)}`)));
        return;
      }
      const chunks = []; res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('ElevenLabs timeout 60s')));
    req.write(body); req.end();
  });
}

function audioDuration(file) {
  try {
    const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file], { encoding: 'utf8' });
    const d = parseFloat((r.stdout || '').trim());
    return isNaN(d) ? null : d;
  } catch { return null; }
}

async function main() {
  let tip = null;
  let text = TEXT;
  if (!text) {
    if (!TIP_ID) { console.error('Provide --tipId=<id> or --text="..."'); process.exit(1); }
    const bank = loadJSON(TIPS_PATH, { tips: [] });
    tip = (bank.tips || []).find(t => t.id === TIP_ID || t.tipId === TIP_ID);
    if (!tip) { console.error(`No tip "${TIP_ID}" in ${TIPS_PATH}`); process.exit(1); }
    text = composeVO(tip);
  }

  const key = sha8(text + '|' + VOICE_ID + '|' + MODEL_ID);
  const outPath = path.join(VO_DIR, `${OUT}.mp3`);
  const est = Math.round(text.length / 15);
  console.log(`Story VO ${DRY_RUN ? '[DRY-RUN]' : '[LIVE]'}`);
  console.log(`  out:   ${path.relative(ROOT, outPath)}`);
  console.log(`  voice: ${VOICE_ID} · model: ${MODEL_ID}`);
  console.log(`  chars: ${text.length} (~${est}s spoken)`);
  console.log(`  script: "${text}"`);
  if (est > 15) console.log(`  ⚠ script may exceed 15s — tighten before --execute (comp clips at 15s).`);

  const manifest = loadJSON(MANIFEST_PATH, {});
  if (manifest[OUT] && manifest[OUT].sha === key && fs.existsSync(outPath)) {
    console.log(`  ✓ already cached (sha ${key}) — ${manifest[OUT].duration_s}s`);
    return;
  }

  if (DRY_RUN) {
    console.log(`\n  [DRY] Would POST api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}  (~$0.05)`);
    return;
  }
  if (!process.env.ELEVENLABS_API_KEY) { console.error('ELEVENLABS_API_KEY missing in .env'); process.exit(2); }

  // ElevenLabs char-budget — warn (don't hard-block; VO is load-bearing for stories) + record the spend.
  const elb = require('../lib/elevenlabs-budget.cjs');
  const budget = elb.canSpend(text.length);
  if (!budget.allowed) console.warn(`  ⚠ ElevenLabs char cap: ${budget.used}/${budget.limit} (${budget.pct}%) — this VO (${text.length} chars) is over; generating anyway (raise ELEVENLABS_CHAR_LIMIT if your plan is bigger).`);
  console.log(`\n  Generating... (${budget.used}/${budget.limit} chars used this month)`);
  const audio = await callElevenLabs(text, VOICE_ID);
  fs.writeFileSync(outPath, audio);
  elb.recordChars(text.length, 'gen-story-vo');
  const dur = audioDuration(outPath);
  manifest[OUT] = { sha: key, voice_id: VOICE_ID, model_id: MODEL_ID, chars: text.length, duration_s: dur, generated_at: new Date().toISOString(), preview: text.slice(0, 120) };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`  ✓ Wrote ${audio.length} bytes → ${path.relative(ROOT, outPath)}`);
  if (dur != null) {
    console.log(`  duration: ${dur.toFixed(2)}s ${dur > 14.6 ? '⚠ (>14.6s — will clip in the 15s comp; tighten script)' : '✓ fits 15s'}`);
  }
}

main().catch(e => { console.error(e.stack || e.message); process.exit(1); });
