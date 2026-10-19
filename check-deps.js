#!/usr/bin/env node
'use strict';
/**
 * check-deps.js — run this first, from the studio root. Reports what each part of the studio needs,
 * what you already have, and the exact command to install what's missing.
 *
 * Nothing here is all-or-nothing. The studio is several tools that share a folder, so this prints
 * per-CAPABILITY: which ones are ready to run now, and what each missing piece would unlock. A
 * kit with no puppeteer still edits longform video; it just can't render motion graphics yet.
 *
 * (The clipper has its own checker for its own binaries: `cd clipper && node check-deps.js`.)
 *
 * Exit: 0 at least one capability is ready · 1 nothing can run yet
 */
const { spawnSync } = require('child_process');
const fs = require('fs');

function which(bin) {
  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [bin], { shell: false });
  return r.status === 0;
}
function firstLine(bin, arg = '--version') {
  const r = spawnSync(bin, [arg], { shell: false });
  if (!r || r.status !== 0) return null;
  return String(r.stdout || '').split('\n')[0].trim() || null;
}
// Checked by LOADING, not by looking for a folder: a half-extracted or wrong-platform install
// leaves node_modules/<pkg> present while require() still throws.
function hasModule(name) {
  try { require(name); return true; } catch { return false; }
}

// Puppeteer can load successfully even when its separately downloaded Chrome for Testing
// executable is absent (for example after a skipped or interrupted postinstall download).
// Keep these states separate so the repair advice does not tell someone to reinstall an
// already-working npm package.
async function inspectPuppeteer() {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    return { moduleReady: false, browserReady: false };
  }

  try {
    // Puppeteer 25 returns a Promise here; older supported releases may return a string.
    const executable = await Promise.resolve(puppeteer.executablePath());
    return {
      moduleReady: true,
      browserReady: Boolean(executable && fs.existsSync(executable)),
    };
  } catch {
    return { moduleReady: true, browserReady: false };
  }
}

let puppeteerStatus = { moduleReady: false, browserReady: false };

const platform = process.platform === 'win32' ? 'windows' : process.platform === 'darwin' ? 'mac' : 'linux';
const install = {
  ffmpeg: {
    windows: 'choco install ffmpeg   (or download from ffmpeg.org and add bin/ to PATH)',
    mac: 'brew install ffmpeg',
    linux: 'sudo apt install ffmpeg',
  },
  'yt-dlp': {
    windows: 'pip install yt-dlp     (or: scoop install yt-dlp)',
    mac: 'brew install yt-dlp        (or: pip3 install yt-dlp)',
    linux: 'pip install yt-dlp       (or: sudo apt install yt-dlp)',
  },
  whisper: {
    windows: 'pip install openai-whisper',
    mac: 'pip3 install openai-whisper',
    linux: 'pip install openai-whisper',
  },
};

const nodeParts = process.versions.node.split('.').map(Number);
const nodeOk = nodeParts[0] > 22 || (nodeParts[0] === 22 && nodeParts[1] >= 12);

// A capability is READY when every one of its requirements is present.
const CAPABILITIES = [
  {
    name: 'Craft docs, mega-prompts, and written reference analysis',
    needs: [],
    note: 'always available — these are documents, nothing to install',
  },
  {
    name: 'Longform auto-edit bay (lf-scan / lf-dissect / lf-assemble)',
    needs: [{ kind: 'bin', id: 'ffmpeg' }],
    note: 'reads your footage, builds the edit',
  },
  {
    name: 'Motion graphics renderer (html3d-render, lf-motion)',
    needs: [
      { kind: 'mod', id: 'puppeteer' },
      { kind: 'browser', id: 'puppeteer-chrome' },
      { kind: 'bin', id: 'ffmpeg' },
    ],
    note: 'renders the 3D/HTML compositions frame-by-frame into video',
  },
  {
    name: 'Voiceover tools (gen-vo, gen-story-vo)',
    needs: [{ kind: 'mod', id: 'minimist' }, { kind: 'mod', id: 'dotenv' }],
    note: 'bring your own hosted voice credentials, or separately install the optional local VoxCPM runtime described in voice/VOXCPM-GUIDE.md',
  },
  {
    name: 'Transcription (Whisper wrapper)',
    needs: [{ kind: 'bin', id: 'whisper' }],
    note: 'word-timed transcripts, used by captions and by lf-dissect',
  },
  {
    name: 'SVG overlay rasterising (asset-library)',
    needs: [{ kind: 'any', ids: [{ kind: 'mod', id: 'sharp' }, { kind: 'bin', id: 'rsvg-convert' }, { kind: 'bin', id: 'magick' }] }],
    note: 'any one of sharp / rsvg-convert / ImageMagick will do',
  },
];

function met(req) {
  if (req.kind === 'bin') return which(req.id);
  if (req.kind === 'mod') {
    if (req.id === 'puppeteer') return puppeteerStatus.moduleReady;
    return hasModule(req.id);
  }
  // When the package itself is absent, `npm ci` is the first repair step and normally
  // downloads its browser too. Surface the browser-specific gap only when Puppeteer loads.
  if (req.kind === 'browser') return !puppeteerStatus.moduleReady || puppeteerStatus.browserReady;
  if (req.kind === 'any') return req.ids.some(met);
  return false;
}
function label(req) {
  if (req.kind === 'any') return req.ids.map(label).join(' or ');
  if (req.kind === 'browser') return 'Chrome for Puppeteer';
  return req.id;
}

async function main() {
puppeteerStatus = await inspectPuppeteer();

console.log('AI Video Studio Kit — dependency check\n');
if (!nodeOk) {
  console.log(`  Node ${process.versions.node} is too old. Install Node 22.12.0+ from https://nodejs.org, then re-run.\n`);
  process.exit(1);
}
console.log(`  node ${process.versions.node}`);
const ff = firstLine('ffmpeg', '-version');
if (ff) console.log(`  ${ff.slice(0, 70)}`);
console.log('');

let ready = 0;
const missingMods = new Set();
const missingBins = new Set();
let missingPuppeteerBrowser = false;

for (const cap of CAPABILITIES) {
  const gaps = cap.needs.filter(r => !met(r));
  if (gaps.length === 0) {
    ready++;
    console.log(`  READY   ${cap.name}`);
  } else {
    console.log(`  BLOCKED ${cap.name}`);
    console.log(`          needs: ${gaps.map(label).join(', ')}`);
    for (const g of gaps) {
      const flat = g.kind === 'any' ? g.ids : [g];
      // For an "any" requirement, suggest only the first option rather than all of them.
      const pick = flat[0];
      if (pick.kind === 'mod') missingMods.add(pick.id);
      else if (pick.kind === 'browser') missingPuppeteerBrowser = true;
      else missingBins.add(pick.id);
    }
  }
  if (cap.note) console.log(`          ${cap.note}`);
}

console.log(`\n  ${ready}/${CAPABILITIES.length} capabilities ready`);

if (missingMods.size || missingBins.size || missingPuppeteerBrowser) {
  console.log('\nTo unlock the rest:\n');
  if (missingMods.size) console.log(`  npm ci             # installs the locked packages, including ${[...missingMods].join(', ')}`);
  if (missingPuppeteerBrowser) {
    console.log('  npx puppeteer browsers install chrome   # downloads Chrome for Puppeteer');
  }
  for (const b of missingBins) {
    const cmd = install[b] && install[b][platform];
    console.log(`  ${cmd || `install "${b}" and put it on your PATH`}`);
  }
}

if (ready === 0) {
  console.log('\nNothing can run yet — start with the npm ci line above.');
  process.exit(1);
}
console.log('\nStart here:  pipeline/00-START-HERE.md');
process.exit(0);
}

main().catch(error => {
  console.error(`dependency check failed: ${error.message}`);
  process.exit(1);
});
