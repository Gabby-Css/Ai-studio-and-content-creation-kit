#!/usr/bin/env node
/**
 * lf-verify.cjs — LONGFORM render verification gate. Extracts frames at every edit event
 * (LOOK -> lines for the agent's buyer's-eye vision pass) and runs mechanical checks:
 * duration vs timeline-map, stream layout, resolution, loudness (-14 LUFS / TP <= -1 final).
 *
 *   node longform/bin/lf-verify.cjs <slug> --draft|--final [--variant=<label>]
 *
 * Exit 1 on hard failure (a failing render must not ship). Report -> work/<slug>/verify/<mode>/report.json
 */
"use strict";
const fs = require("fs");
const path = require("path");
const { ROOT, DIRS, run, runOk, probeMedia, readJson, writeJson } = require("./lf-lib.cjs");
const { verifyRenderedPng } = require(path.join(ROOT, "lib", "verify-rendered-png.cjs"));

const argv = process.argv.slice(2);
const SLUG = argv.find((a) => !a.startsWith("--"));
const MODE = argv.includes("--final") ? "final" : "draft";
const VARIANT = ((argv.find((a) => a.startsWith("--variant=")) || "--variant=final").split("=")[1] || "final").replace(/[^a-z0-9._-]/gi, "-");
if (!SLUG) { console.error("usage: lf-verify.cjs <slug> --draft|--final [--variant=<label>]"); process.exit(1); }

const work = path.join(DIRS.work, SLUG);
const FRAME_CAP = 40;

/** Match lf-assemble final path (output/<slug>/<variant>.mp4); fall back to legacy output/<slug>-final.mp4 */
function resolveRenderPath() {
  if (MODE === "draft") return path.join(work, "draft-480p.mp4");
  const modern = path.join(DIRS.output, SLUG, `${VARIANT}.mp4`);
  if (fs.existsSync(modern)) return modern;
  const legacy = path.join(DIRS.output, `${SLUG}-final.mp4`);
  if (fs.existsSync(legacy)) return legacy;
  return modern; // preferred path for the "not found" error
}

async function pool(items, size, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, async () => {
    while (i < items.length) { const idx = i++; await fn(items[idx], idx); }
  }));
}

async function main() {
  const map = readJson(path.join(work, "timeline-map.json"));
  const render = resolveRenderPath();
  if (!fs.existsSync(render)) { console.error("render not found: " + render); process.exit(1); }
  const vdir = path.join(work, "verify", MODE);
  fs.mkdirSync(vdir, { recursive: true });
  // clear stale frames: target lists change between runs and leftover f_*.png from a previous
  // plan get read as if current — a false-negative trap for the vision pass
  for (const f of fs.readdirSync(vdir)) if (/^f_.*\.png$/.test(f)) fs.unlinkSync(path.join(vdir, f));

  const checks = [];
  const check = (name, ok, got, want, hard = true) => {
    checks.push({ name, ok, got, want, hard });
    console.log(`  ${ok ? "✓" : hard ? "✗" : "⚠"} ${name}: ${got}${ok ? "" : ` (want ${want})`}`);
    return ok;
  };

  // mechanical probes
  const info = await probeMedia(render);
  const D = map.outputDuration;
  check("duration", Math.abs(info.duration - D) <= 0.5, `${info.duration}s`, `${D}s ±0.5`);
  check("streams", info.hasVideo && info.hasAudio, `video:${info.hasVideo} audio:${info.hasAudio}`, "1 video + 1 audio");
  const wantW = MODE === "draft" ? 854 : (map.target && map.target.width) || 1920;
  const wantH = MODE === "draft" ? 480 : (map.target && map.target.height) || 1080;
  check("resolution", info.width === wantW && info.height === wantH, `${info.width}x${info.height}`, `${wantW}x${wantH}`);

  // loudness (ebur128 summary — I in LUFS, true peak in dBFS)
  const lufs = (map.target && map.target.lufs) || -14;
  const lr = await run("ffmpeg", ["-i", render, "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const sum = lr.stderr.slice(lr.stderr.lastIndexOf("Summary:"));
  const iM = /I:\s*(-?[\d.]+)\s*LUFS/.exec(sum);
  const pM = /Peak:\s*(-?[\d.]+)\s*dBFS/.exec(sum);
  const I = iM ? parseFloat(iM[1]) : NaN;
  const TP = pM ? parseFloat(pM[1]) : NaN;
  // YouTube only turns DOWN louder-than--14 content; quieter is left alone. TP-bound VO can't
  // reach -14 without limiting, so hard-fail only outside ±2; ±1 is the warn band.
  const hardLoud = MODE === "final";
  check("loudness I", Number.isFinite(I) && Math.abs(I - lufs) <= 2, `${I} LUFS`, `${lufs} ±2`, hardLoud);
  if (Number.isFinite(I) && Math.abs(I - lufs) > 1 && Math.abs(I - lufs) <= 2)
    console.log(`  ⚠ loudness ${I} LUFS is inside the accept band but >1 from target ${lufs}`);
  check("true peak", Number.isFinite(TP) && TP <= -0.9, `${TP} dBFS`, "<= -1", hardLoud);

  // frame targets: into every event, around every cut boundary, ends, 90s baseline
  let ts = [0.5, Math.max(0.1, D - 0.5)];
  for (let t = 90; t < D; t += 90) ts.push(t);
  for (const e of map.events || []) ts.push(Math.min(e.outAt + Math.min(1, e.dur / 2), D - 0.1));
  for (const s of map.segments || []) {
    if (s.outStart > 0.6) { ts.push(s.outStart - 0.5); ts.push(s.outStart + 0.5); }
  }
  ts = [...new Set(ts.map((t) => Math.max(0, Math.min(D - 0.05, Math.round(t * 10) / 10))))].sort((a, b) => a - b);
  if (ts.length > FRAME_CAP) {
    const step = ts.length / FRAME_CAP;
    ts = Array.from({ length: FRAME_CAP }, (_, i) => ts[Math.floor(i * step)]);
  }
  const frames = [];
  await pool(ts, 4, async (t) => {
    const f = path.join(vdir, `f_${t.toFixed(1)}.png`);
    await runOk("ffmpeg", ["-y", "-ss", String(t), "-i", render, "-frames:v", "1", "-vf", "scale=-2:360", f]);
    frames.push(f);
  });
  let badFrames = 0;
  for (const f of frames.sort()) {
    try { verifyRenderedPng(f, { minBytes: 2000 }); } // prints LOOK -> for the vision pass
    catch (e) { badFrames++; console.log("  ✗ " + e.message); }
  }
  check("frames extract+verify", badFrames === 0, `${frames.length - badFrames}/${frames.length} ok`, "all ok");

  const failed = checks.filter((c) => !c.ok && c.hard);
  writeJson(path.join(vdir, "report.json"), {
    verified_at: new Date().toISOString(), render, mode: MODE, checks,
    frames: frames.map((f) => path.basename(f)).sort(),
    pass: failed.length === 0,
  });
  console.log(`\n${failed.length === 0 ? "PASS" : "FAIL"} — report -> ${path.join(vdir, "report.json")}`);
  console.log("now LOOK at every frame above from the viewer's seat before calling it done.");
  if (failed.length) process.exit(1);
}

main().catch((e) => { console.error("lf-verify failed:", e.message); process.exit(1); });
