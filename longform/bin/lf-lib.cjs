/**
 * lf-lib.cjs — shared helpers for the LONGFORM bay (longform).
 * Zero-dependency CommonJS. Child processes use argument arrays so paths with spaces remain safe.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawn } = require("child_process");

const ROOT = (process.env.STUDIO_ROOT || path.resolve(__dirname, '..', '..'));
const LONGFORM = path.join(ROOT, "longform");
const DIRS = {
  root: LONGFORM,
  inbox: path.join(LONGFORM, "inbox"),
  references: path.join(LONGFORM, "references"),
  components: path.join(LONGFORM, "components"),
  work: path.join(LONGFORM, "work"),
  output: path.join(LONGFORM, "output"),
};
const INDEX_PATH = path.join(DIRS.components, "00-INDEX.json");

const VIDEO_EXT = new Set([".mp4", ".mov", ".mkv", ".webm", ".avi", ".m4v", ".mts"]);
const AUDIO_EXT = new Set([".mp3", ".wav", ".m4a", ".aac", ".flac", ".ogg", ".opus"]);
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"]);
const LUT_EXT = new Set([".cube", ".3dl"]);
const FONT_EXT = new Set([".ttf", ".otf", ".woff", ".woff2"]);
const MEDIA_EXT = new Set([...VIDEO_EXT, ...AUDIO_EXT, ...IMAGE_EXT]);

/** spawn with array args; resolves {code, stdout, stderr}. Never a shell string. */
function run(cmd, args, { binary = false, cwd, onStderr } = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { windowsHide: true, cwd });
    const out = [], err = [];
    proc.stdout.on("data", (c) => out.push(c));
    proc.stderr.on("data", (c) => { err.push(c); if (onStderr) onStderr(c.toString("utf8")); });
    proc.on("error", reject);
    proc.on("close", (code) => resolve({
      code,
      stdout: binary ? Buffer.concat(out) : Buffer.concat(out).toString("utf8"),
      stderr: Buffer.concat(err).toString("utf8"),
    }));
  });
}

/** run that throws on nonzero exit, printing the ffmpeg tail (the useful part). */
async function runOk(cmd, args, opts = {}) {
  const r = await run(cmd, args, opts);
  if (r.code !== 0) {
    const tail = (r.stderr || "").split("\n").filter(Boolean).slice(-6).join("\n");
    throw new Error(`${cmd} exited ${r.code}:\n${tail}`);
  }
  return r;
}

async function ffprobeJson(file) {
  const r = await runOk("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", file]);
  return JSON.parse(r.stdout);
}

/** distilled media facts from ffprobe */
async function probeMedia(file) {
  const info = await ffprobeJson(file);
  const v = (info.streams || []).find((s) => s.codec_type === "video");
  const a = (info.streams || []).find((s) => s.codec_type === "audio");
  let fps = 0;
  if (v && v.avg_frame_rate && v.avg_frame_rate !== "0/0") {
    const [n, d] = v.avg_frame_rate.split("/").map(Number);
    if (d) fps = Math.round((n / d) * 100) / 100;
  }
  const pixFmt = (v && v.pix_fmt) || "";
  return {
    duration: Math.round(parseFloat((info.format && info.format.duration) || (v && v.duration) || (a && a.duration) || 0) * 1000) / 1000,
    width: (v && v.width) || 0,
    height: (v && v.height) || 0,
    fps,
    hasVideo: !!v && !["mjpeg", "png"].includes(v.codec_name || ""), // ignore embedded cover art
    hasAudio: !!a,
    hasAlpha: /yuva|rgba|argb|abgr|bgra|gbrap|ya8|ya16/.test(pixFmt),
    pixFmt,
    channels: (a && a.channels) || 0,
    sampleRate: (a && parseInt(a.sample_rate, 10)) || 0,
    streams: (info.streams || []).length,
  };
}

function slug(name) {
  return String(name)
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "untitled";
}

function readJson(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }
function writeJson(file, obj) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = file + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2), "utf8");
  fs.renameSync(tmp, file);
}

/** stable operating-system temp build directory for heavy intermediates */
function buildDir(slugName) {
  const d = path.join(os.tmpdir(), "lf-build", slugName);
  fs.mkdirSync(d, { recursive: true });
  return d;
}

/** concat-demuxer list: forward slashes, single quotes escaped the ffmpeg way */
function writeConcatList(listPath, files) {
  const body = files.map((f) => `file '${f.replace(/\\/g, "/").replace(/'/g, "'\\''")}'`).join("\n");
  fs.writeFileSync(listPath, body + "\n", "utf8");
  return listPath;
}

function fmtTime(sec) {
  const s = Math.max(0, Number(sec) || 0);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${r.toFixed(1).padStart(4, "0")}`;
}

/** first existing Windows font for drawtext timecode burns (copied into cwd as font.ttf) */
function systemFont() {
  for (const f of ["C:/Windows/Fonts/consola.ttf", "C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/segoeui.ttf"]) {
    if (fs.existsSync(f)) return f;
  }
  throw new Error("no system font found for drawtext");
}

function newestVideoIn(dir) {
  if (!fs.existsSync(dir)) return null;
  const vids = fs.readdirSync(dir)
    .filter((f) => VIDEO_EXT.has(path.extname(f).toLowerCase()))
    .map((f) => ({ f: path.join(dir, f), mtime: fs.statSync(path.join(dir, f)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);
  return vids.length ? vids[0].f : null;
}

/**
 * Resolve a plan.source path that may be missing due to drive-letter case or
 * near-miss basenames ("longform" vs "long form"). Returns existing absolute path or null.
 */
function resolveExistingPath(p) {
  if (!p) return null;
  if (fs.existsSync(p)) return p;
  const abs = path.resolve(p);
  if (fs.existsSync(abs)) return abs;
  const dir = path.dirname(abs);
  const want = path.basename(abs).toLowerCase().replace(/\s+/g, "");
  try {
    const hit = fs.readdirSync(dir).find((n) => n.toLowerCase().replace(/\s+/g, "") === want);
    if (hit) {
      const joined = path.join(dir, hit);
      if (fs.existsSync(joined)) return joined;
    }
  } catch (_) { /* ignore */ }
  return null;
}

module.exports = {
  ROOT, LONGFORM, DIRS, INDEX_PATH,
  VIDEO_EXT, AUDIO_EXT, IMAGE_EXT, LUT_EXT, FONT_EXT, MEDIA_EXT,
  run, runOk, ffprobeJson, probeMedia, slug, readJson, writeJson,
  buildDir, writeConcatList, fmtTime, systemFont, newestVideoIn, resolveExistingPath,
};
