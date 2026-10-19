#!/usr/bin/env node
/**
 * reel-cover.cjs — the COVER/thumbnail producer. For each reel in the publish-kit, grabs a striking hero frame
 * (where the form is established + the grain has settled) and overlays the HOOK big + the CTA small = one scroll-stopping
 * cover PNG per reel. Covers drive the post's CTR (the thumbnail is the first impression) and feed the product-listing
 * bundle. ffmpeg single-pass; reuses build-reel's font-in-tmp + bare-relative-path trick (Windows drawtext can't escape the
 * drive-colon). Requires ffmpeg and a licensed font; reads source clips and writes covers plus kit metadata.
 *
 *   node pipeline/bin/reel-cover.cjs            # one cover per ready reel -> <DIR>/covers/<reel>-cover.png
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const DIR = path.resolve(process.env.STUDIO_MEDIA_DIR || path.join(__dirname, '..', '..', 'output'));
const COVERS = path.join(DIR, 'covers');
const FONT_SRC = process.env.STUDIO_FONT || path.join(process.env.WINDIR || 'C:/Windows', 'Fonts', 'segoeuib.ttf'); // Set STUDIO_FONT to a licensed font on other platforms.
const KIT = path.resolve(__dirname, '..', '..', 'memory', 'reel-publish-kit.json');

if (!fs.existsSync(KIT)) { console.error('Missing input: memory/reel-publish-kit.json. Supply your own reels array with existing files, captions and variant fields. The original input producer is not included.'); process.exit(1); }
const kit = JSON.parse(fs.readFileSync(KIT, 'utf8'));
const reels = (kit.reels || []).filter(r => r.exists);
fs.mkdirSync(COVERS, { recursive: true });

// each reel's HERO form clip = its OPENING shot, derived from the SOURCE OF TRUTH (build-reel's VARIANTS), NOT a parallel
// hardcoded map that silently falls back to the captioned reel for unmapped variants (T-10481). Grab the cover from the
// UNCAPTIONED form clip so it shows a clean hero + ONLY our hook/cta (a reel frame bakes in the reel's lower-third caption).
const { VARIANTS } = require('./build-reel.cjs');
const heroOf = variant => {
  const v = VARIANTS[variant];
  return (v && v.shots && v.shots[0] && v.shots[0].file) || null;
};

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cover-'));
fs.copyFileSync(FONT_SRC, path.join(tmp, 'font.ttf')); // bare name in the filter → no drive-colon to escape

function run(args) {
  const r = spawnSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'], cwd: tmp });
  if (r.status !== 0) { console.error('ffmpeg failed:', (r.stderr || '').toString().split('\n').slice(-4).join('\n')); process.exit(1); }
}

let made = 0;
for (const r of reels) {
  const heroClip = heroOf(r.variant) || r.file;         // clean uncaptioned hero from build-reel VARIANTS (fallback to the reel)
  const src = path.join(DIR, fs.existsSync(path.join(DIR, heroClip)) ? heroClip : r.file);
  if (!fs.existsSync(src)) { console.error('missing source:', src); continue; }
  const base = r.file.replace(/\.mp4$/i, '');
  const out = path.join(COVERS, `${base}-cover.png`);
  // hook + cta via textfile (dodge text-escaping); frame at ~2.0s where the hero form is established
  fs.writeFileSync(path.join(tmp, 'hook.txt'), r.hook || r.angle || '');
  fs.writeFileSync(path.join(tmp, 'cta.txt'), r.cta || '');
  const vf =
    `drawtext=fontfile=font.ttf:textfile=hook.txt:fontcolor=white:fontsize=82:line_spacing=12:` +
    `x=(w-text_w)/2:y=h*0.15:box=1:boxcolor=black@0.46:boxborderw=32,` +
    `drawtext=fontfile=font.ttf:textfile=cta.txt:fontcolor=0x6fe0ff:fontsize=52:` +
    `x=(w-text_w)/2:y=h-250:box=1:boxcolor=black@0.42:boxborderw=22`;
  run(['-y', '-ss', '3.0', '-i', src, '-frames:v', '1', '-vf', vf, out]); // form clip fully formed + mid-motion at 3s
  made++;
  process.stdout.write(`  cover ${made}/${reels.length}: ${base}-cover.png ✓\n`);
}

fs.rmSync(tmp, { recursive: true, force: true });

// record cover paths into the publish-kit (so the bundle + planner can reference them)
kit.covers = reels.map(r => {
  const base = r.file.replace(/\.mp4$/i, '');
  const cp = path.join(COVERS, `${base}-cover.png`);
  return { reel: r.file, variant: r.variant, file: `covers/${base}-cover.png`, exists: fs.existsSync(cp) };
});
fs.writeFileSync(KIT, JSON.stringify(kit, null, 2));

console.log(`reel-cover: ${made}/${reels.length} covers -> ${COVERS} (+ kit.covers recorded)`);
