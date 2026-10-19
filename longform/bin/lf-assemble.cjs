#!/usr/bin/env node
/**
 * lf-assemble.cjs — LONGFORM plan executor. Reads the agent-authored edit-plan.json +
 * components/00-INDEX.json, validates, maps source→output time, and renders with staged
 * ffmpeg passes: cut (re-encoded keep segments → concat spine) → composite (one video
 * pass: b-roll / grade / overlays / captions) → audio (music duck + sfx + loudnorm) → mux.
 *
 *   node longform/bin/lf-assemble.cjs <slug> --check            # validate + print timeline
 *   node longform/bin/lf-assemble.cjs <slug> --draft            # 854x480 fast render
 *   node longform/bin/lf-assemble.cjs <slug> --final            # full-quality → output/
 *   add --stage=cut|composite|audio|mux to force one stage
 *
 * All plan times are SOURCE seconds; this script owns the mapping (timeline-map.json).
 * Heavy intermediates live under the operating system's temp directory at lf-build/<slug>/.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const {
  DIRS, INDEX_PATH, run, runOk, probeMedia, readJson, writeJson, buildDir, writeConcatList, fmtTime,
  resolveExistingPath,
} = require("./lf-lib.cjs");

const argv = process.argv.slice(2);
const SLUG = argv.find((a) => !a.startsWith("--"));
const MODE = argv.includes("--final") ? "final" : "draft";
const CHECK = argv.includes("--check");
const STAGE = (argv.find((a) => a.startsWith("--stage=")) || "--stage=all").split("=")[1];
// per-video output folder + named variant: final → output/<slug>/<variant>.mp4 (default "final")
const VARIANT = ((argv.find((a) => a.startsWith("--variant=")) || "--variant=final").split("=")[1] || "final").replace(/[^a-z0-9._-]/gi, "-");
if (!SLUG) { console.error("usage: lf-assemble.cjs <slug> --draft|--final [--variant=<label>] [--stage=cut|composite|audio|mux] [--check]"); process.exit(1); }

const work = path.join(DIRS.work, SLUG);
const planPath = path.join(work, "edit-plan.json");

function fail(errors) {
  for (const e of errors) console.error("  ✗ " + e);
  console.error(`${errors.length} validation error(s) — fix edit-plan.json`);
  process.exit(1);
}

async function main() {
  if (!fs.existsSync(planPath)) { console.error("no edit-plan.json at " + planPath); process.exit(1); }
  const plan = readJson(planPath);
  if (!fs.existsSync(INDEX_PATH)) { console.error("no component index — run lf-scan.cjs first"); process.exit(1); }
  const index = readJson(INDEX_PATH);
  const byId = new Map((index.assets || []).map((a) => [a.id, a]));

  const T = Object.assign({ width: 1920, height: 1080, fps: 30, lufs: -14 }, plan.target || {});
  const P = MODE === "draft"
    ? { w: 854, h: 480, preset: "veryfast", crf: "28", abr: "192k", extra: [] }
    : { w: T.width, h: T.height, preset: "medium", crf: "18", abr: "320k", extra: ["-maxrate", "16M", "-bufsize", "32M"] };

  const errors = [], warnings = [];
  // Resolve plan.source robustly (drive-letter case + "longform"/"long form" near-misses).
  let src = resolveExistingPath(plan.source);
  if (!src) fail([`plan.source missing on disk: ${plan.source}`]);
  if (src !== plan.source) plan.source = src;
  const srcInfo = await probeMedia(src);

  // asset resolution with type enforcement (USABLE-only law: references/ can never render)
  const resolve = (id, kinds, where) => {
    const a = byId.get(id);
    if (!a) { errors.push(`${where}: asset "${id}" not in 00-INDEX.json (run lf-scan.cjs)`); return null; }
    if (!kinds.includes(a.type)) { errors.push(`${where}: asset "${id}" is type ${a.type}, allowed: ${kinds.join("|")}`); return null; }
    if (!fs.existsSync(a.path)) { errors.push(`${where}: indexed file missing on disk: ${a.path}`); return null; }
    return a;
  };

  // keep[] → segments + source→output mapping
  const keep = Array.isArray(plan.keep) ? plan.keep : [];
  if (!keep.length) errors.push("plan.keep is empty — nothing to render");
  let cum = 0;
  const segments = keep.map((k, i) => {
    if (!(k.in < k.out)) errors.push(`keep[${i}]: in(${k.in}) must be < out(${k.out})`);
    if (k.in < 0 || k.out > srcInfo.duration + 0.05) errors.push(`keep[${i}]: outside source 0..${srcInfo.duration}`);
    if (k.zoom != null && !(k.zoom >= 1 && k.zoom <= 2.5)) errors.push(`keep[${i}]: zoom ${k.zoom} outside 1..2.5`);
    const seg = { in: k.in, out: k.out, zoom: k.zoom || 1, fx: k.fx == null ? 0.5 : k.fx, fy: k.fy == null ? 0.45 : k.fy, outStart: cum, outEnd: cum + (k.out - k.in) };
    cum = seg.outEnd;
    return seg;
  });
  const outDur = cum;
  const mapS2O = (t) => {
    if (t === 0) return 0; // special case: "start of the output"
    for (const s of segments) if (t >= s.in && t <= s.out) return s.outStart + (t - s.in);
    return null;
  };

  // events: map every source-time anchor to output time
  const events = [];
  const mapEvent = (kind, e, i, kinds) => {
    const a = resolve(e.asset, kinds, `${kind}[${i}]`);
    if (!a) return null;
    const full = e.dur === "full";
    const outAt = mapS2O(e.at);
    if (outAt === null) { errors.push(`${kind}[${i}] "${e.asset}": at=${e.at}s falls in CUT material — anchor inside a keep range`); return null; }
    let dur = full ? outDur - outAt : Number(e.dur);
    if (kind === "sfx") dur = a.duration || 1;
    if (!full && outAt + dur > outDur + 0.01) { warnings.push(`${kind}[${i}] "${e.asset}": window clamped to output end`); dur = Math.max(0.1, outDur - outAt); }
    const ev = { kind, asset: a.id, srcAt: e.at, outAt, dur, full, spec: e, file: a.path, meta: a };
    events.push(ev);
    return ev;
  };
  (plan.broll || []).forEach((e, i) => mapEvent("broll", e, i, ["broll"]));
  (plan.overlays || []).forEach((e, i) => mapEvent("overlay", e, i, ["overlay", "graphic"]));
  (plan.sfx || []).forEach((e, i) => mapEvent("sfx", e, i, ["sfx"]));
  (plan.music || []).forEach((e, i) => mapEvent("music", e, i, ["music"]));
  const lut = plan.grade && plan.grade.lut ? resolve(plan.grade.lut, ["lut"], "grade.lut") : null;
  if (plan.captions && plan.captions.burn && !fs.existsSync(path.join(work, plan.captions.srt || "transcript.srt")))
    errors.push(`captions.burn: srt not found in work dir: ${plan.captions.srt}`);

  if (errors.length) fail(errors);
  for (const w of warnings) console.log("  ⚠ " + w);

  writeJson(path.join(work, "timeline-map.json"), {
    slug: SLUG, mode: MODE, target: T, outputDuration: Math.round(outDur * 1000) / 1000,
    segments: segments.map((s) => ({ in: s.in, out: s.out, outStart: Math.round(s.outStart * 1000) / 1000, outEnd: Math.round(s.outEnd * 1000) / 1000 })),
    events: events.map((e) => ({ kind: e.kind, asset: e.asset, srcAt: e.srcAt, outAt: Math.round(e.outAt * 1000) / 1000, dur: Math.round(e.dur * 1000) / 1000 })),
  });

  console.log(`timeline: ${segments.length} segments -> ${fmtTime(outDur)} output · ${events.length} events`);
  segments.forEach((s, i) => console.log(`  seg ${i}: src ${fmtTime(s.in)}-${fmtTime(s.out)} -> out ${fmtTime(s.outStart)}`));
  events.forEach((e) => console.log(`  ${e.kind.padEnd(7)} ${e.asset} @ out ${fmtTime(e.outAt)} (${e.full ? "full" : e.dur.toFixed(1) + "s"})`));
  if (CHECK) { console.log("--check OK (no render)"); return; }

  const bdir = buildDir(SLUG);
  const F = (n) => path.join(bdir, `${MODE}-${n}`);
  const planM = fs.statSync(planPath).mtimeMs;
  const needs = (f) => STAGE !== "all" || !fs.existsSync(f) || fs.statSync(f).mtimeMs < planM;
  const runsStage = (name, out) => (STAGE === "all" && needs(out)) || STAGE === name;
  const scaleChain = `scale=${P.w}:${P.h}:force_original_aspect_ratio=decrease,pad=${P.w}:${P.h}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=${T.fps}`;

  // ── stage 1: CUT — re-encode each keep range to one normalized profile, concat -c copy
  const spine = F("spine.mp4");
  if (runsStage("cut", spine)) {
    const segFiles = [];
    for (let i = 0; i < segments.length; i++) {
      const s = segments[i], f = F(`seg_${String(i).padStart(2, "0")}.mp4`);
      // punch-in: crop at FULL source res before the downscale — up to 2x from 4K→1080p is lossless
      const punch = s.zoom > 1.001
        ? `crop=floor(iw/${s.zoom}/2)*2:floor(ih/${s.zoom}/2)*2:(iw-iw/${s.zoom})*${s.fx}:(ih-ih/${s.zoom})*${s.fy},`
        : "";
      console.log(`  cut seg ${i + 1}/${segments.length} (${fmtTime(s.in)}-${fmtTime(s.out)})${s.zoom > 1.001 ? ` punch ${s.zoom}x` : ""}`);
      await runOk("ffmpeg", ["-y", "-ss", String(s.in), "-to", String(s.out), "-i", src,
        "-vf", punch + scaleChain, "-c:v", "libx264", "-preset", P.preset, "-crf", P.crf, "-pix_fmt", "yuv420p",
        "-video_track_timescale", "30000", "-c:a", "aac", "-b:a", P.abr, "-ar", "48000", ...P.extra, f]);
      segFiles.push(f);
    }
    writeConcatList(F("list.txt"), segFiles);
    await runOk("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", F("list.txt"), "-c", "copy", spine]);
    console.log(`  spine -> ${spine}`);
  }

  // ── stage 2: COMPOSITE — one filter_complex pass (b-roll → grade → overlays → captions)
  const composite = F("composite.mp4");
  const brolls = events.filter((e) => e.kind === "broll");
  const olays = events.filter((e) => e.kind === "overlay");
  const hasComposite = brolls.length || olays.length || lut || (plan.grade && plan.grade.extra) || (plan.captions && plan.captions.burn);
  if (runsStage("composite", composite)) {
    if (!hasComposite) { fs.copyFileSync(spine, composite); console.log("  composite: nothing to do — spine passthrough"); }
    else {
      const inputs = ["-i", spine];
      const lines = [];
      let cur = "[0:v]", n = 1, li = 0;
      const label = () => `[v${li++}]`;
      for (const e of brolls) {
        const sc = e.spec.mode === "pip"
          ? `scale=round(${P.w}*${(e.spec.pip && e.spec.pip.scale) || 0.35}/2)*2:-2`
          : scaleChain;
        const x = e.spec.mode === "pip" ? ((e.spec.pip && e.spec.pip.x) || "W-w-60") : "0";
        const y = e.spec.mode === "pip" ? ((e.spec.pip && e.spec.pip.y) || "60") : "0";
        inputs.push("-i", e.file);
        lines.push(`[${n}:v]trim=start=${e.spec.assetIn || 0}:duration=${e.dur},${sc},setsar=1,fps=${T.fps},setpts=PTS-STARTPTS+${e.outAt.toFixed(3)}/TB[b${n}]`);
        const out = label();
        lines.push(`${cur}[b${n}]overlay=${x}:${y}:enable='between(t,${e.outAt.toFixed(3)},${(e.outAt + e.dur).toFixed(3)})':eof_action=pass${out}`);
        cur = out; n++;
      }
      if (lut || (plan.grade && plan.grade.extra)) {
        if (lut) {
          fs.copyFileSync(lut.path, path.join(bdir, "lut.cube")); // bare name — no drive-colon escaping
          const s = plan.grade.strength == null ? 1 : plan.grade.strength;
          const out = label();
          if (s >= 0.999) lines.push(`${cur}lut3d=lut.cube${out}`);
          else lines.push(`${cur}split[ga][gb];[ga]lut3d=lut.cube[gl];[gl][gb]blend=all_mode=normal:all_opacity=${s}${out}`);
          cur = out;
        }
        if (plan.grade.extra) { const out = label(); lines.push(`${cur}${plan.grade.extra}${out}`); cur = out; }
      }
      for (const e of olays) {
        const isVideo = /\.(mp4|mov|mkv|webm|avi|m4v)$/i.test(e.file);
        if (isVideo) {
          if (e.spec.loop) inputs.push("-stream_loop", "-1", "-t", String(e.dur), "-i", e.file);
          else inputs.push("-i", e.file);
          const out = label();
          if (e.spec.blend && e.spec.blend !== "normal") {
            lines.push(`[${n}:v]scale=${P.w}:${P.h},setsar=1,fps=${T.fps}[o${n}]`);
            lines.push(`${cur}[o${n}]blend=all_mode=${e.spec.blend}:all_opacity=${e.spec.opacity == null ? 0.2 : e.spec.opacity}${out}`);
          } else {
            const alpha = e.meta && e.meta.hasAlpha ? "format=rgba," : "";
            lines.push(`[${n}:v]${alpha}scale=${P.w}:${P.h},setsar=1,fps=${T.fps},setpts=PTS-STARTPTS+${e.outAt.toFixed(3)}/TB[o${n}]`);
            lines.push(`${cur}[o${n}]overlay=0:0:enable='between(t,${e.outAt.toFixed(3)},${(e.outAt + e.dur).toFixed(3)})':eof_action=pass${out}`);
          }
          cur = out; n++;
        } else { // graphic (png etc): scaled, alpha fades, positioned, optionally ANIMATED
          const fd = e.spec.fade == null ? 0.35 : e.spec.fade;
          const t0 = e.outAt.toFixed(3);
          const X = e.spec.x || "60", Y = e.spec.y || "60";
          const fades = `fade=t=in:st=0:d=${fd}:alpha=1,fade=t=out:st=${Math.max(0, e.dur - fd).toFixed(3)}:d=${fd}:alpha=1`;
          let xE = X, yE = Y;
          // anim: slide-right/slide-left ease in over 0.6s; float bobs ±8px; zoom = Ken Burns push
          if (e.spec.anim === "slide-right") xE = `(${X})+max(0,(0.6-(t-${t0}))/0.6)*(W-(${X}))`;
          if (e.spec.anim === "slide-left") xE = `(${X})-max(0,(0.6-(t-${t0}))/0.6)*((${X})+w)`;
          if (e.spec.anim === "float") yE = `(${Y})+8*sin(2*PI*(t-${t0})/2.5)`;
          const out = label();
          if (e.spec.anim === "zoom") { // zoompan renders frames from the still (flattens alpha — use for screenshots/photos)
            inputs.push("-i", e.file);
            const gw = Math.round((P.w * (e.spec.scale || 0.35)) / 2) * 2;
            const gh = Math.round((gw * ((e.meta.height || 9) / (e.meta.width || 16))) / 2) * 2;
            lines.push(`[${n}:v]zoompan=z='min(1+0.0012*on,1.18)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${Math.ceil(e.dur * T.fps)}:s=${gw}x${gh}:fps=${T.fps},format=rgba,${fades},setpts=PTS-STARTPTS+${t0}/TB[g${n}]`);
          } else {
            inputs.push("-loop", "1", "-framerate", String(T.fps), "-t", String(e.dur), "-i", e.file);
            const sc = e.spec.scale ? `scale=round(${P.w}*${e.spec.scale}/2)*2:-2,` : "";
            lines.push(`[${n}:v]format=rgba,${sc}${fades},setpts=PTS-STARTPTS+${t0}/TB[g${n}]`);
          }
          lines.push(`${cur}[g${n}]overlay=x='${xE}':y='${yE}':enable='between(t,${t0},${(e.outAt + e.dur).toFixed(3)})':eof_action=pass${out}`);
          cur = out; n++;
        }
      }
      if (plan.captions && plan.captions.burn) {
        fs.copyFileSync(path.join(work, plan.captions.srt || "transcript.srt"), path.join(bdir, "captions.srt"));
        const out = label();
        lines.push(`${cur}subtitles=captions.srt${out}`);
        cur = out;
      }
      lines.push(`${cur}null[vout]`);
      fs.writeFileSync(path.join(bdir, "filter.txt"), lines.join(";\n"), "utf8");
      console.log(`  composite: ${brolls.length} b-roll · grade:${!!lut} · ${olays.length} overlays`);
      await runOk("ffmpeg", ["-y", ...inputs, "-filter_complex_script", "filter.txt", "-map", "[vout]",
        "-c:v", "libx264", "-preset", P.preset, "-crf", P.crf, "-pix_fmt", "yuv420p", "-an", composite], { cwd: bdir });
    }
  }

  // ── stage 3: AUDIO — speech + ducked music + sfx → loudnorm → mix.m4a
  const mix = F("mix.m4a");
  const musics = events.filter((e) => e.kind === "music");
  const sfxs = events.filter((e) => e.kind === "sfx");
  if (runsStage("audio", mix)) {
    const inputs = ["-i", spine];
    const lines = [];
    let n = 1;
    const mixIns = [];
    if (musics.length) {
      lines.push(`[0:a]asplit=2[spMain][spKey]`);
      mixIns.push("[spMain]");
      const musLbls = [];
      for (const m of musics) {
        if (m.spec.loop) inputs.push("-stream_loop", "-1", "-i", m.file); else inputs.push("-i", m.file);
        const delay = m.outAt > 0 ? `,adelay=${Math.round(m.outAt * 1000)}:all=1` : "";
        lines.push(`[${n}:a]atrim=0:${(m.full ? outDur : m.dur).toFixed(3)},asetpts=PTS-STARTPTS,volume=${m.spec.gain == null ? -21 : m.spec.gain}dB${delay}[m${n}]`);
        musLbls.push(`[m${n}]`); n++;
      }
      let musAll = musLbls[0];
      if (musLbls.length > 1) { lines.push(`${musLbls.join("")}amix=inputs=${musLbls.length}:normalize=0[mall]`); musAll = "[mall]"; }
      const duck = musics.find((m) => m.spec.duck);
      if (duck) {
        const d = Object.assign({ ratio: 8, attack_ms: 150, release_ms: 400 }, duck.spec.duck);
        lines.push(`${musAll}[spKey]sidechaincompress=threshold=0.02:ratio=${d.ratio}:attack=${d.attack_ms}:release=${d.release_ms}[musD]`);
        mixIns.push("[musD]");
      } else mixIns.push(musAll);
    } else { lines.push(`[0:a]anull[spMain]`); mixIns.push("[spMain]"); }
    for (const s of sfxs) {
      inputs.push("-i", s.file);
      lines.push(`[${n}:a]adelay=${Math.round(s.outAt * 1000)}:all=1,volume=${s.spec.gain == null ? -8 : s.spec.gain}dB[s${n}]`);
      mixIns.push(`[s${n}]`); n++;
    }
    const mixed = mixIns.length > 1 ? (lines.push(`${mixIns.join("")}amix=inputs=${mixIns.length}:duration=first:normalize=0[mix]`), "[mix]") : mixIns[0];

    const lnBase = `loudnorm=I=${T.lufs}:TP=-1.0:LRA=11`; // TP -1.0 = YouTube spec; tighter ceilings under-gain TP-bound VO
    if (MODE === "final") { // two-pass: measure, then apply with measured_* + linear
      lines.push(`${mixed}${lnBase}:print_format=json[aout]`);
      fs.writeFileSync(path.join(bdir, "audio-p1.txt"), lines.join(";\n"), "utf8");
      console.log("  audio: loudnorm measurement pass...");
      const p1 = await run("ffmpeg", ["-y", ...inputs, "-filter_complex_script", "audio-p1.txt", "-map", "[aout]", "-f", "null", "-"], { cwd: bdir });
      const s0 = p1.stderr.lastIndexOf("{"), s1 = p1.stderr.lastIndexOf("}");
      if (p1.code !== 0 || s0 === -1) throw new Error("loudnorm measurement failed:\n" + p1.stderr.split("\n").slice(-6).join("\n"));
      const M = JSON.parse(p1.stderr.slice(s0, s1 + 1));
      lines.pop();
      // no linear=true: when the TP ceiling binds, linear mode under-gains (measured -15.6 for a
      // -14 target); dynamic mode hits the integrated target while respecting TP.
      lines.push(`${mixed}${lnBase}:measured_I=${M.input_i}:measured_TP=${M.input_tp}:measured_LRA=${M.input_lra}:measured_thresh=${M.input_thresh}:offset=${M.target_offset},aresample=48000[aout]`);
    } else lines.push(`${mixed}${lnBase},aresample=48000[aout]`);
    fs.writeFileSync(path.join(bdir, "audio.txt"), lines.join(";\n"), "utf8");
    console.log(`  audio: ${musics.length} music (duck:${musics.some((m) => m.spec.duck)}) · ${sfxs.length} sfx · loudnorm ${T.lufs} LUFS`);
    await runOk("ffmpeg", ["-y", ...inputs, "-filter_complex_script", "audio.txt", "-map", "[aout]", "-c:a", "aac", "-b:a", "320k", mix], { cwd: bdir });
  }

  // ── stage 4: MUX
  // final → per-video folder output/<slug>/<variant>.mp4 (holds every variant of THIS inbox video)
  const outDir = MODE === "final" ? path.join(DIRS.output, SLUG) : work;
  const outFile = MODE === "draft" ? path.join(work, "draft-480p.mp4") : path.join(outDir, `${VARIANT}.mp4`);
  if (runsStage("mux", outFile)) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    await runOk("ffmpeg", ["-y", "-i", composite, "-i", mix, "-map", "0:v", "-map", "1:a", "-c", "copy", "-movflags", "+faststart", outFile]);
    if (MODE === "final") fs.copyFileSync(planPath, path.join(outDir, `${VARIANT}-edit-plan.json`));
    const mb = (fs.statSync(outFile).size / 1048576).toFixed(1);
    console.log(`\n${MODE} render -> ${outFile} (${mb} MB, ${fmtTime(outDur)})`);
    console.log(`next: node longform/bin/lf-verify.cjs ${SLUG} --${MODE}`);
  }
}

main().catch((e) => { console.error("lf-assemble failed:", e.message); process.exit(1); });
