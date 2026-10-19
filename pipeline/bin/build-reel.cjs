#!/usr/bin/env node
/**
 * build-reel.cjs — the COMPOSITOR/assembler: stitches the rendered 3D form clips into a multi-shot, beat-cut
 * short-form REEL with kinetic AI-tip captions. Each shot = a ~1.4s window of a form + a one-line caption (fade-in),
 * hard cuts (beat-synced), concatenated. The deliverable the 7 forms were building toward (playbook §7 retention).
 *
 *   node pipeline/bin/build-reel.cjs                 # build FUSION-REEL.mp4 from the default shot list
 *
 * ffmpeg-based; requires compatible codecs, input clips, and a licensed font. Kinetic-caption polish (per-letter, RGB-split cuts) is the Remotion-compositor upgrade.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const DIR = path.resolve(process.env.STUDIO_MEDIA_DIR || path.join(__dirname, '..', '..', 'output'));
const FONT_SRC = process.env.STUDIO_FONT || path.join(process.env.WINDIR || 'C:/Windows', 'Fonts', 'segoeuib.ttf'); // Set STUDIO_FONT to a licensed font on other platforms.

// reel VARIANTS — each a distinct topic angle (form order + caption set). `--variant=NAME` (default = the original cut).
const VARIANTS = {
  default: { out: 'FUSION-REEL.mp4', shots: [
    { file: 'TEXT-HERO-RAG-3d.mp4',  start: 1.5, dur: 1.5, caption: 'AI in 8 seconds' },
    { file: 'NEURAL-GENESIS-3d.mp4', start: 2.0, dur: 1.4, caption: 'Route 3 LLMs' },
    { file: 'CRYSTAL-CORE-3d.mp4',   start: 2.2, dur: 1.4, caption: 'Lock your AI style' },
    { file: 'DATA-CORRIDOR-3d.mp4',  start: 2.0, dur: 1.4, caption: 'Set clear run limits' },
    { file: 'NEON-KNOT-3d.mp4',      start: 1.8, dur: 1.4, caption: 'Use bigger context' },
    { file: 'RAG-STREAM-3d.mp4',     start: 2.0, dur: 1.9, caption: 'Comment AGENT to learn' },
  ] },
  cost: { out: 'FUSION-REEL-cost.mp4', shots: [
    { file: 'NEON-KNOT-3d.mp4',      start: 1.8, dur: 1.5, caption: 'Paying too much for AI' },
    { file: 'NEURAL-GENESIS-3d.mp4', start: 2.0, dur: 1.4, caption: 'Route across 3 LLMs' },
    { file: 'DATA-CORRIDOR-3d.mp4',  start: 2.0, dur: 1.4, caption: 'Match models to tasks' },
    { file: 'CRYSTAL-CORE-3d.mp4',   start: 2.2, dur: 1.4, caption: 'Premium only when needed' },
    { file: 'TEXT-HERO-RAG-3d.mp4',  start: 1.5, dur: 1.4, caption: 'Measure cost and quality' },
    { file: 'RAG-STREAM-3d.mp4',     start: 2.0, dur: 1.9, caption: 'Comment STACK' },
  ] },
  agents: { out: 'FUSION-REEL-agents.mp4', shots: [
    { file: 'DATA-CORRIDOR-3d.mp4',  start: 2.0, dur: 1.5, caption: 'Plan bounded agent work' },
    { file: 'RAG-STREAM-3d.mp4',     start: 2.0, dur: 1.4, caption: 'On your own data' },
    { file: 'NEON-KNOT-3d.mp4',      start: 1.8, dur: 1.4, caption: 'Connected reasoning' },
    { file: 'NEURAL-GENESIS-3d.mp4', start: 2.0, dur: 1.4, caption: 'A swarm of models' },
    { file: 'CRYSTAL-CORE-3d.mp4',   start: 2.2, dur: 1.4, caption: 'Review before delivery' },
    { file: 'TEXT-HERO-RAG-3d.mp4',  start: 1.5, dur: 1.9, caption: 'Comment AGENT' },
  ] },
  // an ad for the engine itself — made BY the engine (the content→product tie-in). CTA drives the product funnel.
  creators: { out: 'FUSION-REEL-creators.mp4', shots: [
    { file: 'NEON-KNOT-3d.mp4',      start: 1.8, dur: 1.5, caption: 'AI made this reel' },
    { file: 'CRYSTAL-CORE-3d.mp4',   start: 2.2, dur: 1.4, caption: 'No After Effects' },
    { file: 'FUSION-VORTEX-3d.mp4',    start: 2.0, dur: 1.4, caption: 'Just code + Three.js' },
    { file: 'DATA-CORRIDOR-3d.mp4',  start: 2.0, dur: 1.4, caption: 'Code-driven motion graphics' },
    { file: 'TEXT-HERO-RAG-3d.mp4',  start: 1.5, dur: 1.4, caption: 'Render with explicit limits' },
    { file: 'RAG-STREAM-3d.mp4',     start: 2.0, dur: 1.9, caption: 'Comment ENGINE' },
  ] },
  // reasoning-models angle (fresh 2026 AI-news) — the morphing raymarched SDF-BLOB is the hero "thinking" visual (used 2x)
  reasoning: { out: 'FUSION-REEL-reasoning.mp4', shots: [
    { file: 'SDF-BLOB-3d.mp4',       start: 1.6, dur: 1.6, caption: 'AI that thinks first' },
    { file: 'NEURAL-GENESIS-3d.mp4', start: 2.0, dur: 1.4, caption: 'Reasons step by step' },
    { file: 'CRYSTAL-CORE-3d.mp4',   start: 2.2, dur: 1.4, caption: 'Checks its own work' },
    { file: 'RAG-STREAM-3d.mp4',     start: 2.0, dur: 1.4, caption: 'Grounded in your data' },
    { file: 'SDF-BLOB-3d.mp4',       start: 3.4, dur: 1.4, caption: 'Fewer hallucinations' },
    { file: 'TEXT-HERO-RAG-3d.mp4',  start: 1.5, dur: 1.9, caption: 'Comment REASON' },
  ] },
  // connected-intelligence angle — the woven GYROID lattice is the hero "everything connects" visual (used 2x)
  connect: { out: 'FUSION-REEL-connect.mp4', shots: [
    { file: 'SDF-GYROID-3d.mp4',     start: 1.5, dur: 1.6, caption: 'AI connects the dots' },
    { file: 'NEURAL-GENESIS-3d.mp4', start: 2.0, dur: 1.4, caption: 'Across all your data' },
    { file: 'DATA-CORRIDOR-3d.mp4',  start: 2.0, dur: 1.4, caption: 'One knowledge graph' },
    { file: 'RAG-STREAM-3d.mp4',     start: 2.0, dur: 1.4, caption: 'Check for missing context' },
    { file: 'SDF-GYROID-3d.mp4',     start: 3.2, dur: 1.4, caption: 'Reasoning that links up' },
    { file: 'TEXT-HERO-RAG-3d.mp4',  start: 1.5, dur: 1.9, caption: 'Comment CONNECT' },
  ] },
  // ENGINE SHOWCASE — all 9 hero forms in one fast montage = the engine selling itself (for the gated product listing).
  // The breadth IS the pitch: 9 distinct visuals, hand-coded; source clips must be provided. Not a content reel — a capability demo.
  showcase: { out: 'FUSION-REEL-showcase.mp4', shots: [
    { file: 'NEURAL-GENESIS-3d.mp4', start: 2.0, dur: 1.3, caption: '9 hero visuals' },
    { file: 'CRYSTAL-CORE-3d.mp4',   start: 2.2, dur: 1.3, caption: 'Hand-coded in Three.js' },
    { file: 'FUSION-VORTEX-3d.mp4',    start: 2.0, dur: 1.3, caption: 'Zero After Effects' },
    { file: 'DATA-CORRIDOR-3d.mp4',  start: 2.0, dur: 1.3, caption: 'Renders headless' },
    { file: 'NEON-KNOT-3d.mp4',      start: 1.8, dur: 1.3, caption: 'Every frame is code' },
    { file: 'TEXT-HERO-RAG-3d.mp4',  start: 1.5, dur: 1.3, caption: '3D kinetic type' },
    { file: 'SDF-BLOB-3d.mp4',       start: 2.5, dur: 1.3, caption: 'Raymarched SDFs' },
    { file: 'SDF-GYROID-3d.mp4',     start: 2.0, dur: 1.3, caption: 'Review assets and licenses' },
    { file: 'RAG-STREAM-3d.mp4',     start: 2.0, dur: 1.8, caption: 'Comment ENGINE' },
  ] },
  // depth angle (infinite context) — the MANDELBULB fractal is the hero "infinite detail / goes deeper" visual (used 2x)
  depth: { out: 'FUSION-REEL-depth.mp4', shots: [
    { file: 'SDF-MANDELBULB-3d.mp4', start: 1.5, dur: 1.6, caption: 'AI that goes deeper' },
    { file: 'SDF-GYROID-3d.mp4',     start: 2.0, dur: 1.4, caption: 'Relevant context' },
    { file: 'RAG-STREAM-3d.mp4',     start: 2.0, dur: 1.4, caption: 'Review the reasoning' },
    { file: 'DATA-CORRIDOR-3d.mp4',  start: 2.0, dur: 1.4, caption: 'Every layer connected' },
    { file: 'SDF-MANDELBULB-3d.mp4', start: 3.4, dur: 1.4, caption: 'Detail all the way down' },
    { file: 'TEXT-HERO-RAG-3d.mp4',  start: 1.5, dur: 1.8, caption: 'Comment DEPTH' },
  ] },
};
module.exports = { VARIANTS };

// import-safe: build a reel ONLY when run directly. A bare require() (e.g. reel-cover reading VARIANTS for the hero clip)
// must NOT trigger a reel build (require-footgun guard).
if (require.main === module) {
const VARIANT = (process.argv.find(a => a.startsWith('--variant=')) || '--variant=default').split('=')[1];
const XFADE = process.argv.includes('--xfade'); // smooth cross-dissolve transitions between shots (else hard cuts)
const PICK = VARIANTS[VARIANT] || VARIANTS.default;
const OUT = path.join(DIR, PICK.out);
const SHOTS = PICK.shots;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'reel-'));
fs.copyFileSync(FONT_SRC, path.join(tmp, 'font.ttf')); // reference by bare name in the filter (no drive-colon to escape)
const shotFiles = [];

function run(args) {
  const r = spawnSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'], cwd: tmp });
  if (r.status !== 0) { console.error('ffmpeg failed:', (r.stderr || '').toString().split('\n').slice(-4).join('\n')); process.exit(1); }
}

console.log(`building reel: ${SHOTS.length} shots`);
SHOTS.forEach((s, i) => {
  const src = path.join(DIR, s.file);
  if (!fs.existsSync(src)) { console.error('missing clip:', src); process.exit(1); }
  const out = path.join(tmp, `shot${String(i).padStart(2, '0')}.mp4`);
  // caption via textfile + bare relative paths (cwd=tmp) → no drive-colon to escape in the filter
  fs.writeFileSync(path.join(tmp, `cap${i}.txt`), s.caption);
  // caption fade-in (single-quote expr → literal commas, NO backslash-escaping — that was the earlier parse bug) +
  // a brief RGB-split FLASH at the cut (t<0.12 of each shot = the cut moment) = retention pattern-interrupt (playbook §7)
  const draw = `drawtext=fontfile=font.ttf:textfile=cap${i}.txt:fontcolor=white:fontsize=68:x=(w-text_w)/2:y=h-380`
    + `:box=1:boxcolor=black@0.42:boxborderw=26:alpha='min(1,min(t/0.28,(${(s.dur - 0.3).toFixed(2)}-t)/0.3))'`
    + `,rgbashift=rh=12:bh=-12:enable='lt(t,0.12)'`;
  run(['-y', '-ss', String(s.start), '-t', String(s.dur), '-i', src,
    '-vf', draw, '-c:v', 'libx264', '-preset', 'fast', '-crf', '19', '-pix_fmt', 'yuv420p',
    '-r', '30', '-an', '-video_track_timescale', '30000', out]);
  shotFiles.push(out);
  process.stdout.write(`  shot ${i + 1}/${SHOTS.length} (${s.file}) ✓\n`);
});

if (XFADE && shotFiles.length >= 2) {
  // XFADE cross-dissolve chain: each transition overlaps xd s; offset_i = (running length so far) - xd; total = sum(dur) - (N-1)*xd
  const xd = 0.3;
  const inputs = shotFiles.flatMap(f => ['-i', f]);
  let filter = '', prev = '[0:v]', cum = SHOTS[0].dur;
  for (let i = 1; i < shotFiles.length; i++) {
    const off = (cum - xd).toFixed(3);
    const out = i === shotFiles.length - 1 ? 'vout' : `x${i}`;
    filter += `${prev}[${i}:v]xfade=transition=fade:duration=${xd}:offset=${off}[${out}];`;
    prev = `[${out}]`;
    cum += SHOTS[i].dur - xd;
  }
  filter = filter.slice(0, -1); // drop trailing ;
  run(['-y', ...inputs, '-filter_complex', filter, '-map', '[vout]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '30', OUT]);
} else {
  // hard-cut concat (re-encode for clean timestamps)
  const listPath = path.join(tmp, 'list.txt');
  fs.writeFileSync(listPath, shotFiles.map(f => `file '${f.replace(/\\/g, '/')}'`).join('\n'));
  run(['-y', '-f', 'concat', '-safe', '0', '-i', listPath, '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '30', OUT]);
}
fs.rmSync(tmp, { recursive: true, force: true });
const mb = (fs.statSync(OUT).size / 1048576).toFixed(1);
console.log(`reel -> ${OUT} (${mb} MB, ${SHOTS.reduce((a, s) => a + s.dur, 0).toFixed(1)}s)`);
}
