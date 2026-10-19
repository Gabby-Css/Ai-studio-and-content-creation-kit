#!/usr/bin/env node
'use strict';
/**
 * gen-story-cinematic.cjs — optional voiceover + Remotion example.
 *
 * In explicit --execute mode, this can call ElevenLabs /with-timestamps, map returned word timings
 * to the composition, and render. ElevenLabs is a separate service with its own setup, pricing,
 * privacy, and output terms. Default mode is a dry run and makes no provider call.
 *
 *   node longform/remotion/gen-story-cinematic.cjs                # inspect the plan
 *   node longform/remotion/gen-story-cinematic.cjs --execute      # provider call + render
 *   flags: --voice=<id> --model=<id> --out=<name> --accentA=#hex --accentB=#hex
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { spawnSync } = require('child_process');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const ROOT = path.resolve(process.env.STUDIO_ROOT || path.resolve(__dirname, '..', '..'));
const REMOTION_DIR = path.join(ROOT, 'pipeline', 'generators', 'remotion');
const CLI = path.join(REMOTION_DIR, 'node_modules', '@remotion', 'cli', 'remotion-cli.js');
const VO_DIR = path.join(REMOTION_DIR, 'public', 'vo');
const DEMO_DIR = path.join(ROOT, 'longform', 'work', 'story-cinematic');
fs.mkdirSync(VO_DIR, { recursive: true });
fs.mkdirSync(DEMO_DIR, { recursive: true });

const argv = process.argv.slice(2);
const EXECUTE = argv.includes('--execute');
const KEEP_PROPS = argv.includes('--keep-props');
const getArg = (k, d) => { const a = argv.find(x => x.startsWith(`--${k}=`)); return a ? a.split('=').slice(1).join('=') : d; };
// evolving engine: a topic file supplies the script (segments) + meta for a NEW video; --slug
// names its unique scene dir (the engine rewrites src/scenes/active.ts to it before rendering).
const TOPIC_FILE = getArg('topicFile', null);
let topic = {};
if (TOPIC_FILE) {
  const tp = path.isAbsolute(TOPIC_FILE) ? TOPIC_FILE : path.join(ROOT, TOPIC_FILE);
  topic = JSON.parse(fs.readFileSync(tp, 'utf8'));
}
const OUT = getArg('out', topic.slug || 'cinematic-demo');
const VOICE_ID = getArg('voice', topic.voice || '<YOUR_VOICE_ID>');
const MODEL_ID = getArg('model', process.env.ELEVEN_MODEL_ID || 'eleven_turbo_v2_5');
const ACCENT_A = getArg('accentA', topic.accentA || '#8B5CF6');
const ACCENT_B = getArg('accentB', topic.accentB || '#22D3EE');
const EYEBROW = getArg('eyebrow', topic.eyebrow || 'AI · RAG');
// Use the caller or topic CTA; otherwise provide a neutral example keyword.
const CTA = getArg('cta', topic.cta || 'START');
const PROJECT_ID = getArg('projectId', topic.projectId || 'EXAMPLE-001');
const TAGLINE = topic.tagline || 'Practical ideas for your next project.';
const ACTIVE_SLUG = getArg('slug', topic.slug || null);

// Tightened ~14-16s script — text == what's spoken == what's shown (one-to-one, so word timings map cleanly).
const SEGMENTS = (topic.segments && topic.segments.length) ? topic.segments : [
  { kind: 'hook', eyebrow: EYEBROW, text: 'Your RAG sounds confident. Check the sources.' },
  { kind: 'insight', text: 'Vector search can miss exact terms like SKUs and error codes.' },
  { kind: 'proof', text: 'Compare retrieval quality before and after adding a reranker.' },
  { kind: 'cta', text: `Comment ${CTA} for the full breakdown.` },
];

// Optionally point the active scene registry at a caller-supplied scene directory.
function writeActiveRegistry(slug) {
  const p = path.join(REMOTION_DIR, 'src', 'scenes', 'active.ts');
  fs.writeFileSync(p,
    `// AUTO-WRITTEN by gen-story-cinematic.cjs — active scene set = ${slug}\n` +
    `export { SceneHook } from './${slug}/SceneHook';\n` +
    `export { SceneInsight } from './${slug}/SceneInsight';\n` +
    `export { SceneProof } from './${slug}/SceneProof';\n`);
}
function elevenWithTimestamps(text, voiceId) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text, model_id: MODEL_ID,
      voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true },
    });
    const req = https.request({
      hostname: 'api.elevenlabs.io', port: 443,
      path: `/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`,
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Accept': 'application/json',
      },
      timeout: 90000,
    }, (res) => {
      const chunks = []; res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        if (res.statusCode !== 200) return reject(new Error(`ElevenLabs ${res.statusCode}: ${raw.slice(0, 300)}`));
        try { resolve(JSON.parse(raw)); } catch (e) { reject(new Error('bad JSON: ' + e.message)); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('ElevenLabs timeout 90s')));
    req.write(body); req.end();
  });
}

// reconstruct words (with start/end seconds) from per-character alignment
function wordsFromAlignment(al) {
  const chars = al.characters || [];
  const st = al.character_start_times_seconds || [];
  const en = al.character_end_times_seconds || [];
  const words = [];
  let cur = '', curStart = null, curEnd = null;
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (/\s/.test(c)) { if (cur) { words.push({ w: cur, startS: curStart, endS: curEnd }); cur = ''; curStart = null; } continue; }
    if (curStart == null) curStart = st[i];
    curEnd = en[i];
    cur += c;
  }
  if (cur) words.push({ w: cur, startS: curStart, endS: curEnd });
  return words;
}

async function main() {
  const script = SEGMENTS.map(s => s.text).join(' ');
  console.log(`StoryCinematic VO ${EXECUTE ? '[LIVE]' : '[DRY-RUN]'}`);
  console.log(`  voice: ${VOICE_ID} · model: ${MODEL_ID}`);
  console.log(`  chars: ${script.length} (~${Math.round(script.length / 15)}s)`);
  console.log(`  script: "${script}"`);
  if (!EXECUTE) {
    console.log('\n  [DRY] would call the configured timestamped-voice endpoint, then render StoryCinematic.');
    console.log('  No provider call was made. Check current provider pricing and terms before --execute.');
    return;
  }
  if (!process.env.ELEVENLABS_API_KEY) { console.error('ELEVENLABS_API_KEY missing'); process.exit(2); }
  if (!VOICE_ID || /^<.*>$/.test(VOICE_ID)) { console.error('pass --voice=<id> or set topic.voice before --execute'); process.exit(2); }

  console.log('\n  generating VO with word timestamps...');
  const resp = await elevenWithTimestamps(script, VOICE_ID);
  const mp3 = Buffer.from(resp.audio_base64, 'base64');
  const voRel = `vo/${OUT}.mp3`;
  fs.writeFileSync(path.join(REMOTION_DIR, 'public', voRel), mp3);
  const words = wordsFromAlignment(resp.alignment || resp.normalized_alignment || {});
  // map words onto segments (contiguous, same text we sent)
  let ptr = 0;
  const outSegs = SEGMENTS.map(seg => {
    const n = seg.text.split(/\s+/).filter(Boolean).length;
    const segWords = words.slice(ptr, ptr + n); ptr += n;
    const startS = segWords.length ? segWords[0].startS : 0;
    const endS = segWords.length ? segWords[segWords.length - 1].endS : startS;
    return { kind: seg.kind, eyebrow: seg.eyebrow, text: seg.text, startS, endS, words: segWords };
  });
  const voDurS = words.length ? words[words.length - 1].endS : (outSegs[outSegs.length - 1].endS || 14);
  console.log(`  ✓ VO ${mp3.length} bytes · ${words.length} words · ${voDurS.toFixed(2)}s`);
  outSegs.forEach(s => console.log(`     ${s.kind.padEnd(8)} ${s.startS.toFixed(2)}-${s.endS.toFixed(2)}s  "${s.text.slice(0, 48)}"`));

  const props = {
    eyebrow: EYEBROW, accentA: ACCENT_A, accentB: ACCENT_B, cta: CTA, tipId: PROJECT_ID,
    tagline: TAGLINE,
    segments: outSegs, voSrc: voRel, voDurS,
  };
  const propsFile = path.join(REMOTION_DIR, `_props-${OUT}.json`);
  fs.writeFileSync(propsFile, JSON.stringify(props, null, 2));
  // keep a durable copy of the resolved props (word timings) for downstream scene work
  fs.writeFileSync(path.join(DEMO_DIR, `${OUT}.props.json`), JSON.stringify(props, null, 2));
  // point the active registry at THIS video's unique scenes before rendering
  if (ACTIVE_SLUG) { writeActiveRegistry(ACTIVE_SLUG); console.log(`  active scene set -> ${ACTIVE_SLUG}`); }
  const outFile = path.join(DEMO_DIR, `${OUT}.mp4`);
  console.log(`\n  rendering StoryCinematic -> ${path.relative(ROOT, outFile)} (gl=angle)`);
  const r = spawnSync(process.execPath, [CLI, 'render', 'src/index.ts', 'StoryCinematic',
    `--output=${outFile}`, `--props=${propsFile}`, '--gl=angle', '--codec=h264', '--quality=95', '--crf=16'],
    { cwd: REMOTION_DIR, stdio: 'inherit' });
  if (!KEEP_PROPS) { try { fs.unlinkSync(propsFile); } catch {} }
  if (r.status !== 0) { console.error(`render failed (exit ${r.status})`); process.exit(1); }
  console.log(`\n  ✓ ${path.relative(ROOT, outFile)}`);
}

main().catch(e => { console.error(e.stack || e.message); process.exit(1); });
