#!/usr/bin/env node
/**
 * lf-scan.cjs — LONGFORM component indexer. Walks longform/components/,
 * classifies every file, ffprobes media, and rewrites components/00-INDEX.json wholesale
 * (stateless — re-run after every drop). Arsenal law: an asset is not real until it's an
 * entry here with a real path + size.
 *
 *   node longform/bin/lf-scan.cjs [--quiet]
 */
"use strict";
const fs = require("fs");
const path = require("path");
const {
  DIRS, INDEX_PATH, VIDEO_EXT, AUDIO_EXT, IMAGE_EXT, LUT_EXT, FONT_EXT,
  probeMedia, slug, writeJson,
} = require("./lf-lib.cjs");

const CANON = { broll: "broll", music: "music", sfx: "sfx", overlays: "overlay", luts: "lut", graphics: "graphic", fonts: "font" };
const TYPES = ["broll", "music", "sfx", "overlay", "lut", "graphic", "font"];
const SFX_MAX_SEC = 20; // ambiguous audio: shorter than this ⇒ sfx, else music

function walk(dir, base = dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, base, out);
    else if (name !== "00-INDEX.json" && !name.startsWith(".")) out.push({ full, rel: path.relative(base, full).replace(/\\/g, "/"), bytes: st.size });
  }
  return out;
}

/** classification: canonical top folder → extension → probe-derived hints */
function baseType(rel, ext) {
  const top = rel.split("/")[0].toLowerCase();
  if (CANON[top]) return CANON[top];
  if (LUT_EXT.has(ext)) return "lut";
  if (FONT_EXT.has(ext)) return "font";
  if (IMAGE_EXT.has(ext)) return "graphic";
  if (VIDEO_EXT.has(ext)) return "broll";
  if (AUDIO_EXT.has(ext)) return null; // sfx vs music decided by duration after probe
  return null;
}

function tagsFor(rel) {
  const parts = rel.split("/");
  const fileTokens = parts[parts.length - 1].replace(/\.[a-z0-9]+$/i, "");
  const folderTokens = parts.slice(0, -1).filter((p) => !CANON[p.toLowerCase()]);
  return [...new Set([...folderTokens, fileTokens].join(" ").toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1))];
}

async function main() {
  const quiet = process.argv.includes("--quiet");
  if (!fs.existsSync(DIRS.components)) { console.error("components/ missing:", DIRS.components); process.exit(1); }
  const files = walk(DIRS.components);
  const assets = [];
  const warnings = [];

  for (const f of files) {
    const ext = path.extname(f.rel).toLowerCase();
    if (/['"]/.test(f.rel)) warnings.push(`quote in filename (breaks ffmpeg filter/concat paths — rename it): ${f.rel}`);
    let type = baseType(f.rel, ext);
    const entry = { id: "", type: "", path: f.full.replace(/\\/g, "/"), rel: f.rel, bytes: f.bytes, tags: tagsFor(f.rel) };

    const isMedia = VIDEO_EXT.has(ext) || AUDIO_EXT.has(ext) || IMAGE_EXT.has(ext);
    if (isMedia) {
      try {
        const m = await probeMedia(f.full);
        if (m.duration) entry.duration = m.duration;
        if (m.width) { entry.width = m.width; entry.height = m.height; }
        if (m.fps) entry.fps = m.fps;
        if (VIDEO_EXT.has(ext)) { entry.hasAudio = m.hasAudio; entry.hasAlpha = m.hasAlpha; }
        if (AUDIO_EXT.has(ext)) { entry.channels = m.channels; entry.sampleRate = m.sampleRate; }
        if (!type && AUDIO_EXT.has(ext)) type = m.duration && m.duration < SFX_MAX_SEC ? "sfx" : "music";
        // video with alpha dropped outside overlays/ is still an overlay by nature
        if (type === "broll" && m.hasAlpha) type = "overlay";
      } catch (e) {
        warnings.push(`unprobeable, skipped: ${f.rel} (${e.message.split("\n")[0]})`);
        continue;
      }
    }
    if (!type) { warnings.push(`unclassifiable, skipped: ${f.rel}`); continue; }
    entry.type = type;
    const idParts = f.rel.replace(/\.[a-z0-9]+$/i, "").split("/");
    if (CANON[idParts[0].toLowerCase()]) idParts.shift(); // don't double the bucket folder into the id
    entry.id = `${type}-${slug(idParts.join("/"))}`;
    assets.push(entry);
  }

  // stable ids must also be unique — disambiguate collisions deterministically
  const seen = new Map();
  for (const a of assets) {
    const n = seen.get(a.id) || 0;
    seen.set(a.id, n + 1);
    if (n > 0) a.id = `${a.id}-${n + 1}`;
  }

  const counts = {};
  for (const t of TYPES) counts[t] = assets.filter((a) => a.type === t).length;
  writeJson(INDEX_PATH, {
    version: 1,
    scanned_at: new Date().toISOString(),
    root: DIRS.components.replace(/\\/g, "/"),
    counts,
    assets: assets.sort((a, b) => a.id.localeCompare(b.id)),
  });

  if (!quiet) {
    console.log(`indexed ${assets.length} components -> ${INDEX_PATH}`);
    console.log("  " + TYPES.map((t) => `${counts[t]} ${t}`).join(" · "));
    for (const w of warnings) console.log("  ⚠ " + w);
  }
  if (warnings.some((w) => w.startsWith("quote"))) process.exitCode = 2; // loud, fail-fast at scan time
}

main().catch((e) => { console.error("lf-scan failed:", e.message); process.exit(1); });
