#!/usr/bin/env node
/**
 * html-to-png.cjs — render any static HTML file to a high-DPI PNG (diagrams, infographics, social cards).
 * Reuses the package's Puppeteer installation (same as html3d-render). Local and deterministic.
 * Usage: node pipeline/bin/html-to-png.cjs --html <file.html> --out <file.png> [--w 1600 --h 1000 --scale 2]
 */
const puppeteer = require('puppeteer');
const path = require('path');
const A = {};
for (let i = 2; i < process.argv.length; i++) { const k = process.argv[i]; if (k.startsWith('--')) { A[k.slice(2)] = process.argv[i + 1]; i++; } }
const W = +(A.w || 1600), H = +(A.h || 1000), SCALE = +(A.scale || 2);
const htmlPath = path.resolve(A.html), out = path.resolve(A.out || 'out.png');
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-color-profile=srgb', '--hide-scrollbars', `--window-size=${W},${H}`] });
  try {
    const p = await b.newPage();
    await p.setViewport({ width: W, height: H, deviceScaleFactor: SCALE });
    await p.goto('file://' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 25000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 700)); // let fonts/layout settle
    await p.screenshot({ path: out, type: 'png' });
    console.log('png ->', out);
  } finally { await b.close(); }
})().catch(e => { console.error(e.message); process.exit(1); });
