#!/usr/bin/env node
/**
 * lf-motion.cjs — LONGFORM motion-graphics renderer. Renders an HTML comp (CSS/JS animations,
 * deterministic via window.__seek(t) + window.__ready — the Hyperframes contract) to a
 * TRANSPARENT-alpha .mov (qtrle) that lf-assemble overlays full-frame on the spine.
 *
 * This is what makes callouts/sequences MOTION DESIGN (springs, shadows, gradients, stagger)
 * instead of static PNGs in corners. Doctrine: longform/docs/EDIT-MEGA-PROMPT.md §3.
 *
 *   node longform/bin/lf-motion.cjs --html <comp.html> --out <out.mov> --dur <sec> [--fps 30 --w 1920 --h 1080]
 *   node longform/bin/lf-motion.cjs --html <comp.html> --still <sec> --stillout frame.png   # one frame to LOOK at
 */
"use strict";
const fs = require("fs");
const path = require("path");
const os = require("os");
const http = require("http");
const puppeteer = require("puppeteer");
const { runOk } = require("./lf-lib.cjs");

const MIME = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".json": "application/json", ".woff2": "font/woff2", ".ttf": "font/ttf",
  ".glb": "model/gltf-binary", ".gltf": "model/gltf+json", ".bin": "application/octet-stream", ".hdr": "application/octet-stream" };

const A = {};
for (let i = 2; i < process.argv.length; i++) {
  const k = process.argv[i];
  if (k.startsWith("--")) { A[k.slice(2)] = process.argv[i + 1]; i++; }
}
const htmlPath = path.resolve(A.html || "");
if (!fs.existsSync(htmlPath)) { console.error("comp html not found: " + htmlPath); process.exit(1); }
const W = +(A.w || 1920), H = +(A.h || 1080), FPS = +(A.fps || 30);
const still = A.still != null ? +A.still : null;
if (still == null && !A.dur) { console.error("--dur <seconds> required for a render (or --still <sec>)"); process.exit(1); }
const DUR = +(A.dur || 0);
const compDir = path.dirname(htmlPath);

// vendor Three.js + jsm addons next to the comp so ESM `import from './three.module.js'` resolves —
// this is what lets a motion comp use a WebGL canvas (3D layer) alongside the DOM (2D layer). Mirrors
// html3d-render.cjs. Only copies when missing/stale; a pure-DOM comp simply never imports them.
const THREE_BUILD = path.resolve(__dirname, "..", "..", "motion", "compositions");
for (const f of ["three.module.js", "three.core.js"]) {
  const src = path.join(THREE_BUILD, f), dst = path.join(compDir, f);
  if (fs.existsSync(src) && (!fs.existsSync(dst) || fs.statSync(src).mtimeMs > fs.statSync(dst).mtimeMs)) fs.copyFileSync(src, dst);
}
const THREE_JSM = path.join(THREE_BUILD, "jsm");
for (const sub of ["postprocessing", "shaders"]) {
  const src = path.join(THREE_JSM, sub), dst = path.join(compDir, "jsm", sub);
  if (fs.existsSync(src) && !fs.existsSync(dst)) { try { fs.cpSync(src, dst, { recursive: true }); } catch { /* best-effort */ } }
}
for (const [sub, file] of [["loaders", "FontLoader.js"], ["geometries", "TextGeometry.js"], ["loaders", "GLTFLoader.js"], ["loaders", "RGBELoader.js"]]) {
  const src = path.join(THREE_JSM, sub, file), dst = path.join(compDir, "jsm", sub, file);
  if (fs.existsSync(src) && !fs.existsSync(dst)) { try { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); } catch { /* best-effort */ } }
}
const fontSrc = path.join(THREE_JSM, "..", "fonts", "helvetiker_bold.typeface.json");
const fontDst = path.join(compDir, "fonts", "helvetiker_bold.typeface.json");
if (fs.existsSync(fontSrc) && !fs.existsSync(fontDst)) { try { fs.mkdirSync(path.dirname(fontDst), { recursive: true }); fs.copyFileSync(fontSrc, fontDst); } catch { /* best-effort */ } }

// serve the comp dir so <img>/fonts resolve without file:// restrictions
const server = http.createServer((req, res) => {
  const rel = decodeURIComponent((req.url || "/").split("?")[0]).replace(/^\/+/, "");
  const fp = path.join(compDir, rel);
  if (!fp.startsWith(compDir) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) { res.writeHead(404); res.end("nf"); return; }
  res.writeHead(200, { "Content-Type": MIME[path.extname(fp).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(fp).pipe(res);
});
server.on("error", (e) => console.error("[lf-motion] server error:", e.message));

(async () => {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const url = `http://127.0.0.1:${server.address().port}/${encodeURIComponent(path.basename(htmlPath))}`;
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", `--window-size=${W},${H}`, "--hide-scrollbars", "--force-color-profile=srgb",
      // WebGL via SwiftShader/ANGLE so Three.js comps render headless (same as html3d-render.cjs)
      "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--enable-webgl"],
  });
  try {
    const page = await browser.newPage();
    page.on("pageerror", (e) => console.log("  [pageerror]", e.message));
    page.on("console", (m) => { const t = m.text(); if (/error/i.test(t)) console.log("  [page]", t); });
    await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction("window.__ready === true", { timeout: 30000 });

    // omitBackground => the page's transparent background captures as real alpha
    const seekShot = async (t, out) => {
      await page.evaluate((s) => window.__seek(s), t);
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      await page.screenshot({ path: out, type: "png", omitBackground: true });
    };

    if (still != null) {
      const out = path.resolve(A.stillout || "motion-still.png");
      await seekShot(still, out);
      console.log("LOOK -> " + out);
      return;
    }

    const framesDir = fs.mkdtempSync(path.join(os.tmpdir(), "lfmo-"));
    const N = Math.round(DUR * FPS);
    process.stdout.write(`rendering ${N} alpha frames @ ${W}x${H} ${FPS}fps `);
    for (let n = 0; n < N; n++) {
      await seekShot(n / FPS, path.join(framesDir, `f${String(n).padStart(5, "0")}.png`));
      if (n % 60 === 0) process.stdout.write(".");
    }
    process.stdout.write(" done\n");

    const out = path.resolve(A.out);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    // qtrle keeps the alpha channel; lf-scan's probe sees argb => classified as overlay.
    // --codec prores switches to ProRes 4444 (yuva444p10le, also alpha — lf-lib's hasAlpha
    // regex already matches /yuva/).
    // SIZE NOTE, measured not guessed: qtrle is run-length, so it only stays small when the
    // frame is mostly empty. A FULL-SCREEN graphics layer with a per-frame grain pass defeats
    // it — 63.9s came out at 6.19 GB. ProRes 4444 on the same content is only ~1.4x smaller
    // (520 MB -> 367 MB over a 5s slice), because the grain is incompressible either way.
    // So this flag is NOT the fix for layer size; deleting the intermediate after assemble is.
    // The real lever would be moving the grain out of the layer and into the assemble filter.
    const enc = String(A.codec || "qtrle").toLowerCase() === "prores"
      ? ["-c:v", "prores_ks", "-profile:v", "4444", "-pix_fmt", "yuva444p10le"]
      : ["-c:v", "qtrle"];
    await runOk("ffmpeg", ["-y", "-framerate", String(FPS), "-i", path.join(framesDir, "f%05d.png"), ...enc, out]);
    fs.rmSync(framesDir, { recursive: true, force: true });
    console.log(`motion layer -> ${out} (${(fs.statSync(out).size / 1048576).toFixed(1)} MB, ${DUR}s alpha)`);
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => { console.error("lf-motion failed:", e.message); process.exit(1); });
