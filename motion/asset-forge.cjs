#!/usr/bin/env node
/**
 * asset-forge.cjs — procedurally build transparent motion-graphics overlays with a configurable
 * starter palette. Dependency-free (writes SVG), deterministic (seeded PRNG), and re-runnable.
 * Review generated artwork and any downstream additions before distribution.
 *
 *   node motion/asset-forge.cjs [--only <category>] [--per 48]
 *
 * Output: motion/overlays/<category>/<category>-NNN.svg  +  INDEX.json
 * Transparent; full-frame (1920x1080) or square (1024) as fits. Drop straight into Hyperframes /
 * Remotion 2D layers as <img> or inline, or rasterize to PNG on demand.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = (process.env.STUDIO_ROOT || path.resolve(__dirname, '..'));
const OUT = path.join(ROOT, 'motion', 'overlays');
const A = {};
for (let i = 2; i < process.argv.length; i++) { const k = process.argv[i]; if (k.startsWith("--")) { A[k.slice(2)] = (process.argv[i + 1] && !process.argv[i + 1].startsWith("--")) ? process.argv[++i] : true; } }
const PER = +(A.per || 48);

const PAL = { gold: "#FFC24D", gold2: "#FF9A3D", cyan: "#4DD8FF", cyan2: "#22D3EE", violet: "#7C3AED", white: "#F1F0F5", red: "#FF3B3B", green: "#4DE8A6" };
const ACCENTS = ["gold", "cyan", "violet", "white"];
function rng(seed) { return function () { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const R = (r, a, b) => a + (b - a) * r();
const RI = (r, a, b) => Math.floor(R(r, a, b + 1));
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const f2 = n => (Math.round(n * 100) / 100);
const svg = (w, h, body, defs = "") => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}${body}</svg>\n`;

const USAGE = {
  speedlines: "whoosh / horizontal motion pass behind a fast entrance",
  streaks: "anamorphic light streak — lens-flare bar behind a hero element",
  lightleaks: "warm/cool gradient wash for mood over a flat fill",
  bokeh: "soft out-of-focus disc layer for depth (parallax back layer)",
  glows: "radial bloom behind any element (cheap, robust)",
  bursts: "spark/star burst on impact — the punchline hit",
  grain: "film grain / noise plate over flat fills for texture",
  shapes: "rings/arcs/plus-grid/brackets — HUD / tech accents",
  arrows: "directional eye-leads and flow markers",
  greenscreen: "keyable solid field for compositing/mask tests",
  confetti: "celebratory scattered particles on a win beat",
  dust: "fine drifting particles for atmosphere",
  vignette: "edge darkening to focus the center",
  flares: "lens flare — streak + rings + core",
  rings: "concentric pulse / ripple rings radiating out",
  swooshes: "curved bezier motion-trail ribbon",
  halftone: "dot-gradient field (retro / pop accent)",
  scanlines: "horizontal tech lines / CRT overlay",
  frames: "borders, callout boxes, corner brackets",
  sparkles: "twinkle stars / sparkle accents",
  money: "gold coin & dollar vector marks for money beats",
  gridfloor: "perspective grid floor — synthwave / tech environment",
};

const GEN = {
  speedlines(i) { const r = rng(1000 + i), w = 1920, h = 1080, ac = PAL[pick(r, ACCENTS)], n = RI(r, 14, 34), ang = R(r, -8, 8);
    let b = `<g transform="rotate(${f2(ang)} ${w / 2} ${h / 2})">`;
    for (let k = 0; k < n; k++) { const y = R(r, 40, h - 40), len = R(r, 300, 1500), x = R(r, -200, w - len + 200), th = R(r, 1.5, 6), op = R(r, 0.15, 0.75), g = `sl${i}_${k}`;
      b += `<defs><linearGradient id="${g}"><stop offset="0" stop-color="${ac}" stop-opacity="0"/><stop offset=".5" stop-color="${ac}" stop-opacity="${f2(op)}"/><stop offset="1" stop-color="${ac}" stop-opacity="0"/></linearGradient></defs><rect x="${f2(x)}" y="${f2(y)}" width="${f2(len)}" height="${f2(th)}" rx="${f2(th / 2)}" fill="url(#${g})"/>`; }
    return svg(w, h, b + `</g>`); },
  streaks(i) { const r = rng(2000 + i), w = 1920, h = 1080, ac = PAL[pick(r, ["gold", "cyan", "white", "violet"])], n = RI(r, 1, 3);
    let defs = `<defs><filter id="bs${i}" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="${f2(R(r, 6, 20))}"/></filter>`, b = "";
    for (let k = 0; k < n; k++) { const cy = R(r, 200, h - 200), len = R(r, 900, 1900), th = R(r, 6, 22), x = (w - len) / 2 + R(r, -200, 200), g = `st${i}_${k}`;
      defs += `<linearGradient id="${g}"><stop offset="0" stop-color="${ac}" stop-opacity="0"/><stop offset=".5" stop-color="${ac}" stop-opacity="${f2(R(r, 0.5, 0.95))}"/><stop offset="1" stop-color="${ac}" stop-opacity="0"/></linearGradient>`;
      b += `<rect x="${f2(x)}" y="${f2(cy - th / 2)}" width="${f2(len)}" height="${f2(th)}" fill="url(#${g})" filter="url(#bs${i})"/><circle cx="${f2(w / 2 + R(r, -150, 150))}" cy="${f2(cy)}" r="${f2(R(r, 20, 60))}" fill="${ac}" opacity=".5" filter="url(#bs${i})"/>`; }
    return svg(w, h, b, defs + `</defs>`); },
  lightleaks(i) { const r = rng(3000 + i), w = 1920, h = 1080, c1 = PAL[pick(r, ["gold", "gold2", "cyan", "violet", "red"])], c2 = PAL[pick(r, ["gold2", "cyan2", "violet", "white"])], g = `ll${i}`;
    const defs = `<defs><radialGradient id="${g}" cx="${f2(R(r, 0, 1))}" cy="${f2(R(r, 0, 1))}" r="0.9"><stop offset="0" stop-color="${c1}" stop-opacity="${f2(R(r, 0.4, 0.8))}"/><stop offset=".5" stop-color="${c2}" stop-opacity="${f2(R(r, 0.1, 0.35))}"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient></defs>`;
    return svg(w, h, `<rect width="${w}" height="${h}" fill="url(#${g})"/>`, defs); },
  bokeh(i) { const r = rng(4000 + i), w = 1024, h = 1024, ac = PAL[pick(r, ACCENTS)], n = RI(r, 10, 26);
    let defs = `<defs><filter id="bk${i}"><feGaussianBlur stdDeviation="${f2(R(r, 3, 10))}"/></filter></defs>`, b = "";
    for (let k = 0; k < n; k++) b += `<circle cx="${f2(R(r, 0, w))}" cy="${f2(R(r, 0, h))}" r="${f2(R(r, 8, 70))}" fill="${ac}" opacity="${f2(R(r, 0.08, 0.5))}" filter="url(#bk${i})"/>`;
    return svg(w, h, b, defs); },
  glows(i) { const r = rng(5000 + i), s = 1024, ac = PAL[pick(r, ACCENTS)], g = `gl${i}`, hard = R(r, 0, 0.35);
    return svg(s, s, `<rect width="${s}" height="${s}" fill="url(#${g})"/>`, `<defs><radialGradient id="${g}"><stop offset="0" stop-color="${ac}" stop-opacity="1"/><stop offset="${f2(hard)}" stop-color="${ac}" stop-opacity=".85"/><stop offset=".55" stop-color="${ac}" stop-opacity=".35"/><stop offset="1" stop-color="${ac}" stop-opacity="0"/></radialGradient></defs>`); },
  bursts(i) { const r = rng(6000 + i), s = 1024, cx = 512, cy = 512, ac = PAL[pick(r, ["gold", "cyan", "white"])], n = RI(r, 18, 46);
    let b = `<defs><radialGradient id="bc${i}"><stop offset="0" stop-color="${ac}" stop-opacity=".9"/><stop offset="1" stop-color="${ac}" stop-opacity="0"/></radialGradient></defs><circle cx="${cx}" cy="${cy}" r="${f2(R(r, 60, 160))}" fill="url(#bc${i})"/>`;
    for (let k = 0; k < n; k++) { const a = (k / n) * 6.283 + R(r, -0.1, 0.1), r0 = R(r, 60, 160), r1 = R(r, 260, 500), th = R(r, 1.5, 5), op = R(r, 0.3, 0.9);
      b += `<line x1="${f2(cx + Math.cos(a) * r0)}" y1="${f2(cy + Math.sin(a) * r0)}" x2="${f2(cx + Math.cos(a) * r1)}" y2="${f2(cy + Math.sin(a) * r1)}" stroke="${ac}" stroke-width="${f2(th)}" stroke-linecap="round" opacity="${f2(op)}"/>`; }
    return svg(s, s, b); },
  grain(i) { const r = rng(7000 + i), w = 1024, h = 1024, freq = f2(R(r, 0.5, 0.95)), op = f2(R(r, 0.05, 0.16));
    return svg(w, h, `<rect width="${w}" height="${h}" filter="url(#gr${i})"/>`, `<defs><filter id="gr${i}"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="${i}" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 ${op} 0"/></filter></defs>`); },
  shapes(i) { const r = rng(8000 + i), w = 1024, h = 1024, ac = PAL[pick(r, ACCENTS)], kind = i % 4; let b = "";
    if (kind === 0) for (let k = 0; k < RI(r, 2, 4); k++) b += `<circle cx="512" cy="512" r="${f2(120 + k * R(r, 70, 140))}" fill="none" stroke="${ac}" stroke-width="${f2(R(r, 2, 6))}" opacity="${f2(R(r, 0.3, 0.8))}"/>`;
    else if (kind === 1) { const a0 = R(r, 0, 6.28), a1 = a0 + R(r, 1.2, 4.2), rr = R(r, 200, 400); b += `<path d="M ${f2(512 + Math.cos(a0) * rr)} ${f2(512 + Math.sin(a0) * rr)} A ${f2(rr)} ${f2(rr)} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${f2(512 + Math.cos(a1) * rr)} ${f2(512 + Math.sin(a1) * rr)}" fill="none" stroke="${ac}" stroke-width="${f2(R(r, 3, 8))}" stroke-linecap="round" opacity=".85"/>`; }
    else if (kind === 2) { const step = RI(r, 90, 150); for (let x = step; x < w; x += step) for (let y = step; y < h; y += step) { const s = R(r, 5, 11); b += `<path d="M ${f2(x - s)} ${y} H ${f2(x + s)} M ${x} ${f2(y - s)} V ${f2(y + s)}" stroke="${ac}" stroke-width="2" opacity="${f2(R(r, 0.2, 0.5))}"/>`; } }
    else { const m = 120, L = R(r, 120, 220); for (const [cx, cy, sx, sy] of [[m, m, 1, 1], [w - m, m, -1, 1], [m, h - m, 1, -1], [w - m, h - m, -1, -1]]) b += `<path d="M ${cx} ${f2(cy + sy * L)} V ${cy} H ${f2(cx + sx * L)}" fill="none" stroke="${ac}" stroke-width="${f2(R(r, 3, 7))}" opacity=".8"/>`; }
    return svg(w, h, b); },
  arrows(i) { const r = rng(9000 + i), w = 1024, h = 512, ac = PAL[pick(r, ACCENTS)], kind = i % 3; let b = ""; const n = RI(r, 3, 6);
    if (kind === 0) for (let k = 0; k < n; k++) { const x = 150 + k * 160, op = f2(0.3 + 0.7 * (k / n)); b += `<path d="M ${x} 156 L ${x + 90} 256 L ${x} 356" fill="none" stroke="${ac}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`; }
    else if (kind === 1) b += `<path d="M 120 256 H 780 M 700 176 L 820 256 L 700 336" fill="none" stroke="${ac}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`;
    else { const g = `ar${i}`; b += `<defs><linearGradient id="${g}"><stop offset="0" stop-color="${ac}" stop-opacity="0"/><stop offset="1" stop-color="${ac}" stop-opacity="1"/></linearGradient></defs><path d="M 100 256 H 820" stroke="url(#${g})" stroke-width="14" stroke-linecap="round"/><path d="M 740 186 L 860 256 L 740 326" fill="none" stroke="${ac}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>`; }
    return svg(w, h, b); },
  greenscreen(i) { const w = 1920, h = 1080, colors = ["#00B140", "#0047BB", "#00B140"]; return svg(w, h, `<rect width="${w}" height="${h}" fill="${colors[i % colors.length]}"/>`); },
  confetti(i) { const r = rng(11000 + i), w = 1920, h = 1080, n = RI(r, 60, 140); let b = "";
    for (let k = 0; k < n; k++) { const x = R(r, 0, w), y = R(r, 0, h), s = R(r, 6, 22), rot = R(r, 0, 360), ac = PAL[pick(r, ["gold", "cyan", "violet", "red", "green", "white"])];
      b += `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(s)}" height="${f2(s * R(r, 0.4, 1))}" fill="${ac}" opacity="${f2(R(r, 0.5, 1))}" transform="rotate(${f2(rot)} ${f2(x)} ${f2(y)})"/>`; }
    return svg(w, h, b); },
  dust(i) { const r = rng(12000 + i), w = 1920, h = 1080, n = RI(r, 120, 280), ac = PAL[pick(r, ["white", "gold", "cyan"])]; let b = "";
    for (let k = 0; k < n; k++) b += `<circle cx="${f2(R(r, 0, w))}" cy="${f2(R(r, 0, h))}" r="${f2(R(r, 0.8, 3.2))}" fill="${ac}" opacity="${f2(R(r, 0.15, 0.7))}"/>`;
    return svg(w, h, b); },
  vignette(i) { const r = rng(13000 + i), w = 1920, h = 1080, g = `vg${i}`, str = f2(R(r, 0.4, 0.85)), inner = f2(R(r, 0.35, 0.6));
    return svg(w, h, `<rect width="${w}" height="${h}" fill="url(#${g})"/>`, `<defs><radialGradient id="${g}" cx="0.5" cy="0.5" r="0.75"><stop offset="${inner}" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${str}"/></radialGradient></defs>`); },
  flares(i) { const r = rng(14000 + i), w = 1920, h = 1080, cx = R(r, 300, w - 300), cy = R(r, 200, h - 200), ac = PAL[pick(r, ["gold", "cyan", "white"])];
    let defs = `<defs><filter id="fl${i}"><feGaussianBlur stdDeviation="8"/></filter><radialGradient id="fc${i}"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".3" stop-color="${ac}" stop-opacity=".8"/><stop offset="1" stop-color="${ac}" stop-opacity="0"/></radialGradient></defs>`;
    let b = `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(R(r, 60, 130))}" fill="url(#fc${i})"/><rect x="0" y="${f2(cy - 3)}" width="${w}" height="6" fill="${ac}" opacity=".55" filter="url(#fl${i})"/><rect x="${f2(cx - 3)}" y="0" width="6" height="${h}" fill="${ac}" opacity=".35" filter="url(#fl${i})"/>`;
    for (let k = 0; k < RI(r, 2, 5); k++) { const t = R(r, 0.2, 0.9), x = cx + (w / 2 - cx) * t, y = cy + (h / 2 - cy) * t; b += `<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(R(r, 14, 44))}" fill="${ac}" opacity="${f2(R(r, 0.1, 0.35))}"/>`; }
    return svg(w, h, b, defs); },
  rings(i) { const r = rng(15000 + i), s = 1024, ac = PAL[pick(r, ACCENTS)], n = RI(r, 3, 6); let b = "";
    for (let k = 0; k < n; k++) { const rr = 60 + k * (440 / n); b += `<circle cx="512" cy="512" r="${f2(rr)}" fill="none" stroke="${ac}" stroke-width="${f2(R(r, 2, 7) * (1 - k / n) + 1)}" opacity="${f2((1 - k / n) * R(r, 0.5, 0.9))}"/>`; }
    return svg(s, s, b); },
  swooshes(i) { const r = rng(16000 + i), w = 1920, h = 1080, ac = PAL[pick(r, ACCENTS)], g = `sw${i}`;
    const x0 = R(r, 0, 400), y0 = R(r, 200, h - 200), x1 = R(r, w - 400, w), y1 = R(r, 200, h - 200), cx = R(r, 400, w - 400), cy = R(r, 0, h);
    const defs = `<defs><linearGradient id="${g}"><stop offset="0" stop-color="${ac}" stop-opacity="0"/><stop offset=".5" stop-color="${ac}" stop-opacity="${f2(R(r, 0.6, 1))}"/><stop offset="1" stop-color="${ac}" stop-opacity="0"/></linearGradient></defs>`;
    return svg(w, h, `<path d="M ${f2(x0)} ${f2(y0)} Q ${f2(cx)} ${f2(cy)} ${f2(x1)} ${f2(y1)}" fill="none" stroke="url(#${g})" stroke-width="${f2(R(r, 6, 20))}" stroke-linecap="round"/>`, defs); },
  halftone(i) { const r = rng(17000 + i), s = 1024, ac = PAL[pick(r, ACCENTS)], step = RI(r, 26, 46); let b = "";
    for (let x = step / 2; x < s; x += step) for (let y = step / 2; y < s; y += step) { const d = Math.hypot(x - 512, y - 512) / 724; b += `<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2((1 - d) * step * 0.45)}" fill="${ac}" opacity="${f2(0.25 + (1 - d) * 0.5)}"/>`; }
    return svg(s, s, b); },
  scanlines(i) { const r = rng(18000 + i), w = 1920, h = 1080, ac = PAL[pick(r, ["cyan", "white", "green"])], step = RI(r, 4, 9); let b = "";
    for (let y = 0; y < h; y += step) b += `<rect x="0" y="${y}" width="${w}" height="${f2(step * 0.5)}" fill="${ac}" opacity="${f2(R(r, 0.04, 0.12))}"/>`;
    return svg(w, h, b); },
  frames(i) { const r = rng(19000 + i), w = 1920, h = 1080, ac = PAL[pick(r, ACCENTS)], kind = i % 3; let b = "";
    if (kind === 0) b += `<rect x="60" y="60" width="${w - 120}" height="${h - 120}" fill="none" stroke="${ac}" stroke-width="${f2(R(r, 3, 8))}" rx="24" opacity=".85"/>`;
    else if (kind === 1) { const L = R(r, 140, 240), m = 80; for (const [cx, cy, sx, sy] of [[m, m, 1, 1], [w - m, m, -1, 1], [m, h - m, 1, -1], [w - m, h - m, -1, -1]]) b += `<path d="M ${cx} ${f2(cy + sy * L)} V ${cy} H ${f2(cx + sx * L)}" fill="none" stroke="${ac}" stroke-width="${f2(R(r, 4, 9))}" opacity=".9"/>`; }
    else { const bw = R(r, 700, 1100), bh = R(r, 150, 260); b += `<rect x="${f2((w - bw) / 2)}" y="${f2(h - bh - 120)}" width="${f2(bw)}" height="${f2(bh)}" rx="20" fill="#080810" opacity=".78" stroke="${ac}" stroke-width="2"/>`; }
    return svg(w, h, b); },
  sparkles(i) { const r = rng(20000 + i), w = 1920, h = 1080, n = RI(r, 20, 50); let b = "";
    for (let k = 0; k < n; k++) { const x = R(r, 0, w), y = R(r, 0, h), s = R(r, 6, 26), ac = PAL[pick(r, ["gold", "white", "cyan"])], op = f2(R(r, 0.5, 1));
      b += `<path d="M ${f2(x)} ${f2(y - s)} Q ${f2(x)} ${f2(y)} ${f2(x + s)} ${f2(y)} Q ${f2(x)} ${f2(y)} ${f2(x)} ${f2(y + s)} Q ${f2(x)} ${f2(y)} ${f2(x - s)} ${f2(y)} Q ${f2(x)} ${f2(y)} ${f2(x)} ${f2(y - s)} Z" fill="${ac}" opacity="${op}"/>`; }
    return svg(w, h, b); },
  money(i) { const r = rng(21000 + i), s = 512, kind = i % 2; let b = "";
    if (kind === 0) { b += `<circle cx="256" cy="256" r="200" fill="${PAL.gold}" stroke="${PAL.gold2}" stroke-width="18"/><circle cx="256" cy="256" r="160" fill="none" stroke="${PAL.gold2}" stroke-width="8" opacity=".7"/><text x="256" y="330" font-family="Arial" font-weight="900" font-size="220" fill="${PAL.gold2}" text-anchor="middle">$</text>`; }
    else { b += `<rect x="56" y="176" width="400" height="200" rx="14" fill="${PAL.green}" stroke="#2fa87a" stroke-width="10"/><circle cx="256" cy="276" r="60" fill="none" stroke="#1f7a56" stroke-width="8"/><text x="256" y="312" font-family="Arial" font-weight="900" font-size="90" fill="#1f7a56" text-anchor="middle">$</text>`; }
    return svg(s, s, b); },
  gridfloor(i) { const r = rng(22000 + i), w = 1920, h = 1080, ac = PAL[pick(r, ["cyan", "violet", "gold"])], hz = R(r, 380, 520); let b = `<g opacity="${f2(R(r, 0.5, 0.85))}">`;
    for (let k = 0; k <= 24; k++) { const x = (k / 24) * w, vx = w / 2 + (x - w / 2) * 3.2; b += `<line x1="${f2(x)}" y1="${h}" x2="${f2(vx)}" y2="${f2(hz)}" stroke="${ac}" stroke-width="2"/>`; }
    for (let k = 1; k <= 12; k++) { const t = k / 12, y = hz + (h - hz) * (t * t); b += `<line x1="0" y1="${f2(y)}" x2="${w}" y2="${f2(y)}" stroke="${ac}" stroke-width="${f2(1 + t * 2)}"/>`; }
    return svg(w, h, b + `</g>`); },
};

const CATS = Object.keys(GEN);
const only = A.only ? String(A.only) : null;
fs.mkdirSync(OUT, { recursive: true });
const idxPath = path.join(OUT, "INDEX.json");
let index = { generatedBy: "asset-forge.cjs", palette: PAL, note: "Procedural transparent motion overlays using the included starter palette.", categories: {} };
if (fs.existsSync(idxPath)) { try { index = JSON.parse(fs.readFileSync(idxPath, "utf-8")); index.categories = index.categories || {}; } catch { /* fresh */ } }
index.generatedBy = "asset-forge.cjs";
index.palette = PAL;
index.note = "Procedural transparent motion overlays using the included starter palette.";
delete index.video_references;
delete index.motionStudy;
delete index.techniquesNote;

let forged = 0;
for (const cat of CATS) {
  if (only && cat !== only) continue;
  const dir = path.join(OUT, cat); fs.mkdirSync(dir, { recursive: true });
  const per = (cat === "greenscreen") ? 6 : (cat === "money") ? 24 : PER;
  const files = [];
  for (let i = 0; i < per; i++) { const name = `${cat}-${String(i + 1).padStart(3, "0")}.svg`; fs.writeFileSync(path.join(dir, name), GEN[cat](i)); files.push(`${cat}/${name}`); forged++; }
  index.categories[cat] = { count: per, usage: USAGE[cat], files };
}
fs.writeFileSync(idxPath, JSON.stringify(index, null, 2));
const grand = Object.values(index.categories).reduce((s, c) => s + (c.count || 0), 0);
console.log(`forged ${forged} this run · arsenal total ${grand} SVGs across ${Object.keys(index.categories).length} categories -> ${path.relative(ROOT, OUT)}`);
