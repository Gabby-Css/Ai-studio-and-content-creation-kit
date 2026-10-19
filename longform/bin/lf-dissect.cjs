#!/usr/bin/env node
/**
 * lf-dissect.cjs — LONGFORM dissection pass. One command produces everything the agent
 * needs to "watch" a raw video: ffprobe facts, whisper transcript (word timestamps),
 * silence map, scene map (FableCut analyzer), timestamped contact sheets + cut stills.
 *
 *   node longform/bin/lf-dissect.cjs "<video path>" [--force] [--model=small] [--lang=en]
 *   node longform/bin/lf-dissect.cjs --ref "<video path>"      # fingerprint a style reference
 *
 * Idempotent: each stage skips if its output exists (whisper is the long pole) unless --force.
 * Outputs -> longform/work/<slug>/
 */
"use strict";
const fs = require("fs");
const path = require("path");
const {
  ROOT, DIRS, run, runOk, probeMedia, slug, readJson, writeJson, fmtTime, systemFont,
} = require("./lf-lib.cjs");
const { verifyRenderedPng } = require(path.join(ROOT, "lib", "verify-rendered-png.cjs"));
const { analyze } = require(path.join(ROOT, "FableCut", "analyze.js"));

const argv = process.argv.slice(2);
const flag = (name, d) => {
  const a = argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.split("=").slice(1).join("=") : d;
};
const FORCE = argv.includes("--force");
const MODEL = flag("model", "small");
const LANG = flag("lang", "en");
const SHEET_EVERY = 5;   // one contact-sheet cell per N seconds
const STILL_CAP = 80;    // max full-frame stills at scene cuts

const r3 = (x) => Math.round(x * 1000) / 1000;

async function silenceMap(wav, duration, { noise = "-30dB", minsil = 1.0, pad = 0.12 } = {}) {
  // Detect silence at half
  // the min so a `minsil` gap is reliably seen, filter by minsil after, shrink each cut by
  // `pad` so adjacent words aren't clipped.
  const det = Math.max(0.2, minsil * 0.5);
  const r = await run("ffmpeg", ["-i", wav, "-af", `silencedetect=noise=${noise}:d=${det}`, "-f", "null", "-"]);
  const raw = [];
  let cur = null;
  for (const line of r.stderr.split(/\r?\n/)) {
    let m = /silence_start:\s*([-\d.]+)/.exec(line);
    if (m) { cur = parseFloat(m[1]); continue; }
    m = /silence_end:\s*([-\d.]+)/.exec(line);
    if (m && cur !== null) { raw.push([Math.max(0, cur), parseFloat(m[1])]); cur = null; }
  }
  if (cur !== null) raw.push([Math.max(0, cur), duration]); // silence ran to EOF
  const silences = raw.filter(([a, b]) => b - a >= minsil).map(([a, b]) => ({ start: r3(a), end: r3(b) }));
  let speech = [[0, duration]];
  for (const s of silences) {
    const a = s.start + pad, b = s.end - pad;
    if (b - a <= 0) continue;
    const next = [];
    for (const [ka, kb] of speech) {
      if (b <= ka || a >= kb) { next.push([ka, kb]); continue; }
      if (a > ka) next.push([ka, a]);
      if (b < kb) next.push([b, kb]);
    }
    speech = next;
  }
  return {
    noise, minsil, pad, duration, silences,
    speech: speech.filter(([a, b]) => b - a >= 0.05).map(([a, b]) => ({ start: r3(a), end: r3(b) })),
  };
}

/** small concurrency pool for the per-timestamp still extractions */
async function pool(items, size, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, async () => {
    while (i < items.length) { const idx = i++; await fn(items[idx], idx); }
  }));
}

async function refMode(file) {
  const bp = await analyze(path.resolve(file), { music: false });
  const fp = {
    source: bp.source, duration: bp.duration, width: bp.width, height: bp.height,
    avgShotLen: bp.avgShotLen, cutsPerSecond: bp.cutsPerSecond, cutCount: bp.cuts.length,
    bpm: bp.bpm, drop: bp.drop, fingerprinted_at: new Date().toISOString(),
  };
  const fpPath = path.join(DIRS.references, "00-FINGERPRINTS.json");
  const all = fs.existsSync(fpPath) ? readJson(fpPath) : {};
  all[slug(path.basename(file))] = fp;
  writeJson(fpPath, all);
  console.log(JSON.stringify(fp, null, 2));
  console.log(`fingerprint saved -> ${fpPath}`);
}

async function main() {
  const refIdx = argv.indexOf("--ref");
  if (refIdx !== -1) {
    const refFile = argv[refIdx + 1] && !argv[refIdx + 1].startsWith("--") ? argv[refIdx + 1] : argv.find((a, i) => i !== refIdx && !a.startsWith("--"));
    if (!refFile || !fs.existsSync(refFile)) { console.error("usage: lf-dissect.cjs --ref <video>"); process.exit(1); }
    return refMode(refFile);
  }

  const src = argv.find((a) => !a.startsWith("--"));
  if (!src || !fs.existsSync(src)) { console.error("usage: lf-dissect.cjs <video> [--force] [--model=small]"); process.exit(1); }
  const absSrc = path.resolve(src);
  const vslug = slug(path.basename(absSrc));
  const work = path.join(DIRS.work, vslug);
  const framesDir = path.join(work, "frames");
  fs.mkdirSync(framesDir, { recursive: true });
  const done = (f) => !FORCE && fs.existsSync(path.join(work, f));
  console.log(`dissect: ${absSrc}\n  slug: ${vslug}\n  work: ${work}`);

  // 1. probe
  let source;
  if (done("source.json")) source = readJson(path.join(work, "source.json"));
  else {
    source = { probed_at: new Date().toISOString(), source: absSrc.replace(/\\/g, "/"), slug: vslug, ...(await probeMedia(absSrc)) };
    writeJson(path.join(work, "source.json"), source);
  }
  console.log(`  ${source.width}x${source.height} @ ${source.fps}fps · ${fmtTime(source.duration)} · audio: ${source.hasAudio}`);

  // 2-5. audio → whisper → silence (skipped cleanly if the video has no audio track)
  const wav = path.join(work, "audio.wav");
  if (source.hasAudio) {
    if (FORCE || !fs.existsSync(wav)) {
      await runOk("ffmpeg", ["-y", "-i", absSrc, "-vn", "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wav]);
      console.log("  audio.wav extracted (16k mono)");
    }
    if (!done("transcript.json")) {
      console.log(`  whisper transcribing (model=${MODEL}) — the long pole, minutes not seconds...`);
      await runOk("whisper", [wav, "--model", MODEL, "--word_timestamps", "True",
        "--output_format", "all", "--output_dir", work, "--language", LANG, "--verbose", "False"]);
      const stem = path.join(work, "audio");
      for (const [from, to] of [["json", "transcript.json"], ["srt", "transcript.srt"], ["txt", "transcript.txt"]]) {
        if (fs.existsSync(`${stem}.${from}`)) fs.renameSync(`${stem}.${from}`, path.join(work, to));
      }
      for (const junk of ["audio.vtt", "audio.tsv"]) { try { fs.rmSync(path.join(work, junk)); } catch {} }
    }
    const words = (readJson(path.join(work, "transcript.json")).segments || []).reduce((n, s) => n + ((s.words || []).length), 0);
    console.log(`  transcript.json/.srt ready (${words} words, word timestamps)`);

    if (!done("silence.json")) {
      writeJson(path.join(work, "silence.json"), await silenceMap(wav, source.duration, {
        noise: flag("noise", "-30dB"), minsil: parseFloat(flag("minsil", "1.0")), pad: parseFloat(flag("pad", "0.12")),
      }));
    }
    const sil = readJson(path.join(work, "silence.json"));
    const cutSec = sil.silences.reduce((n, s) => n + (s.end - s.start), 0);
    console.log(`  silence.json: ${sil.silences.length} cuttable silences (${cutSec.toFixed(1)}s dead air)`);
  } else console.log("  ⚠ no audio track — whisper/silence skipped");

  // 6. scenes (FableCut analyzer as a module)
  if (!done("scenes.json")) {
    console.log("  scene analysis (cuts/beats/energy)...");
    writeJson(path.join(work, "scenes.json"), await analyze(absSrc, { music: false }));
  }
  const scenes = readJson(path.join(work, "scenes.json"));
  console.log(`  scenes.json: ${scenes.cuts.length} cuts · avgShotLen ${scenes.avgShotLen}s`);

  // 7a. contact sheets — the "watch" artifact: 1 cell / 5s, timecode burned, 6x6 tile ≈ 3min/sheet
  const sheets = () => fs.readdirSync(framesDir).filter((f) => f.startsWith("sheet_"));
  if (FORCE || sheets().length === 0) {
    fs.copyFileSync(systemFont(), path.join(work, "font.ttf")); // bare name in the filter — no drive-colon escaping
    const vf = `fps=1/${SHEET_EVERY},scale=320:-2,` +
      `drawtext=fontfile=font.ttf:text='%{pts\\:hms}':fontsize=20:fontcolor=white:box=1:boxcolor=black@0.55:boxborderw=4:x=6:y=6,` +
      `tile=6x6`;
    await runOk("ffmpeg", ["-y", "-i", absSrc, "-vf", vf, "-vsync", "vfr", path.join("frames", "sheet_%02d.png")], { cwd: work });
  }
  // 7b. full-frame stills at scene cuts (evenly thinned to the cap)
  let cutTimes = scenes.cuts;
  if (cutTimes.length > STILL_CAP) {
    const step = cutTimes.length / STILL_CAP;
    cutTimes = Array.from({ length: STILL_CAP }, (_, i) => cutTimes[Math.floor(i * step)]);
  }
  const missing = cutTimes.filter((t) => FORCE || !fs.existsSync(path.join(framesDir, `cut_${t.toFixed(1)}.png`)));
  await pool(missing, 4, (t) =>
    runOk("ffmpeg", ["-y", "-ss", String(t), "-i", absSrc, "-frames:v", "1", "-vf", "scale=-2:720", path.join(framesDir, `cut_${t.toFixed(1)}.png`)]));

  // gate every frame through the buyer's-eye PNG check
  const pngs = fs.readdirSync(framesDir).filter((f) => f.endsWith(".png"));
  let bad = 0;
  for (const f of pngs) {
    try { verifyRenderedPng(path.join(framesDir, f), { look: false, minBytes: 2000 }); }
    catch (e) { bad++; console.log("  ⚠ " + e.message); }
  }
  console.log(`  frames: ${sheets().length} contact sheets + ${pngs.length - sheets().length} cut stills (${bad} failed verify)`);

  console.log(`\ndissection complete -> ${work}`);
  console.log(`next: READ transcript.json + silence.json + scenes.json, LOOK at frames/sheet_*.png,`);
  console.log(`      author ${path.join(work, "edit-plan.json")}, then lf-assemble.cjs ${vslug} --check`);
  if (bad) process.exitCode = 2;
}

main().catch((e) => { console.error("lf-dissect failed:", e.message); process.exit(1); });
