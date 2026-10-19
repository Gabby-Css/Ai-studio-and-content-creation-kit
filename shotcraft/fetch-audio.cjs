#!/usr/bin/env node
'use strict';
/**
 * fetch-audio.cjs — download the shot library's sound effects onto YOUR machine.
 *
 * The studio does not redistribute this audio. It is Mixkit material that the upstream
 * video-shotcraft project vendored into its repo; the Mixkit Free License covers using the files
 * in a project, not shipping them inside a downloadable kit. So the files are fetched from
 * upstream here, at your request, under whatever licence Mixkit grants you directly.
 *
 * Usage:
 *   node shotcraft/fetch-audio.cjs --dry-run    # show exactly what would be downloaded
 *   node shotcraft/fetch-audio.cjs              # fetch (asks first)
 *   node shotcraft/fetch-audio.cjs --yes        # fetch without the prompt
 *
 * Exit: 0 ok · 1 fetch/network failure · 2 declined
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const HERE = __dirname;
const REPO = 'Vincentwei1021/video-shotcraft';
const REF = 'd491544';                       // the commit this kit's shot library derives from
const TARBALL = `https://codeload.github.com/${REPO}/tar.gz/${REF}`;

const DRY = process.argv.includes('--dry-run');
const YES = process.argv.includes('--yes') || process.argv.includes('-y');

// Both audio locations upstream carries. The template needs its own copy because Remotion resolves
// staticFile() against template/public/ — a symlink or a shared dir would not survive a bundle.
const TARGETS = [
  { into: path.join(HERE, 'assets', 'audio'), from: 'assets/audio', what: '149 SFX in 16 categories + 5 BGM tracks + ATTRIBUTION.md' },
  { into: path.join(HERE, 'template', 'public', 'audio'), from: 'template/public/audio', what: '11 SFX the Remotion demo template loads via staticFile()' },
];

const BANNER = `
──────────────────────────────────────────────────────────────────────────────
  AUDIO LICENCE — read before you use these files commercially
──────────────────────────────────────────────────────────────────────────────

The audio comes from Mixkit, via the upstream video-shotcraft project. Upstream's
own assets/audio/ATTRIBUTION.md is candid about a gap in its records:

  * Most files trace to a specific Mixkit URL. Those are fine under the Mixkit
    Free License — free for commercial use, no attribution required.

  * SIX files cannot be traced back to a source entry. Upstream recorded them as
    "cannot be traced, must verify before commercial use" after a bulk download
    stripped their metadata:

        sfx/text/keyboard.mp3        sfx/ui/pop.mp3
        sfx/riser/riser-cine.mp3     sfx/light/sparkle.mp3
        bgm/bgm-tech-house.mp3       (+ one further unverified entry)

    Four of those six are also in the template's copy.

  * pop.mp3 has no recorded source at all.

If your video is monetized, sponsored, or client work, verify those six against
your own Mixkit account before shipping — or replace them. Every shot recipe in
this library works without them; audio only affects the sound design pass.

After fetching, read assets/audio/ATTRIBUTION.md for the full per-file table.
──────────────────────────────────────────────────────────────────────────────
`;

function have(cmd) {
  const r = spawnSync(cmd, ['--version'], { stdio: 'ignore', shell: process.platform === 'win32' });
  return r.status === 0;
}

function ask(q) {
  // Read one line from the real terminal. If stdin is not a TTY (CI, piped), refuse rather than
  // silently downloading — an unattended fetch of licence-flagged audio is not a safe default.
  if (!process.stdin.isTTY) return null;
  process.stdout.write(q);
  const buf = Buffer.alloc(256);
  let n = 0;
  try { n = fs.readSync(0, buf, 0, 256, null); } catch { return null; }
  return buf.slice(0, n).toString('utf8').trim().toLowerCase();
}

function main() {
  console.log(BANNER);

  for (const t of TARGETS) {
    const exists = fs.existsSync(t.into) && fs.readdirSync(t.into).length > 0;
    console.log(`  ${exists ? '✓ already present' : '→ will fetch'}  ${path.relative(HERE, t.into).replace(/\\/g, '/')}`);
    console.log(`      ${t.what}`);
  }
  console.log(`\n  source: ${TARBALL}`);
  console.log(`  ~37 MB download\n`);

  if (DRY) { console.log('[--dry-run] nothing downloaded.'); return 0; }

  if (!YES) {
    const a = ask('Fetch the audio now? [y/N] ');
    if (a === null) {
      console.error('\nstdin is not a terminal. Re-run with --yes to fetch unattended,');
      console.error('after reading the licence notes above.');
      return 2;
    }
    if (a !== 'y' && a !== 'yes') { console.log('\nDeclined. Nothing downloaded.'); return 2; }
  }

  if (!have('curl') && !have('tar')) {
    console.error('\nNeed curl and tar on PATH. Both ship with macOS, Linux, and Windows 10+.');
    return 1;
  }

  const tmp = path.join(HERE, '.audio-fetch-tmp');
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(tmp, { recursive: true });
  const tgz = path.join(tmp, 'src.tar.gz');

  try {
    console.log('\nDownloading…');
    let r = spawnSync('curl', ['-fL', '--retry', '2', '-o', tgz, TARBALL], { stdio: 'inherit' });
    if (r.status !== 0) { console.error('\ncurl failed — check your connection and that the ref still exists.'); return 1; }

    console.log('Extracting…');
    // --strip-components=1 drops the "video-shotcraft-<ref>/" wrapper GitHub adds.
    r = spawnSync('tar', ['-xzf', tgz, '-C', tmp, '--strip-components=1'], { stdio: 'inherit' });
    if (r.status !== 0) { console.error('\ntar failed.'); return 1; }

    let copied = 0;
    for (const t of TARGETS) {
      const src = path.join(tmp, ...t.from.split('/'));
      if (!fs.existsSync(src)) { console.error(`  ! upstream no longer has ${t.from} — skipped`); continue; }
      fs.mkdirSync(path.dirname(t.into), { recursive: true });
      fs.cpSync(src, t.into, { recursive: true });
      const n = fs.readdirSync(t.into).length;
      console.log(`  ✓ ${path.relative(HERE, t.into).replace(/\\/g, '/')}  (${n} entries)`);
      copied++;
    }
    if (copied === 0) { console.error('\nNothing was copied — upstream layout changed.'); return 1; }

    console.log('\nDone. Read assets/audio/ATTRIBUTION.md for the per-file licence table,');
    console.log('and references/sound-design.md for how to choose and place sound effects.');
    return 0;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

process.exit(main());
