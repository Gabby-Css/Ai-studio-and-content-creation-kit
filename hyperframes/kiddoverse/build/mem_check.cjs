// node mem_check.cjs : how heavy is the composition page? (DOM nodes, JS heap, tween count, per-frame seek time)
const puppeteer = require('../../../node_modules/puppeteer'); const path = require('path');
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080 });
  const t0 = Date.now(); await p.goto('file:///' + path.resolve(__dirname, '../index.html').split('\\').join('/')); await p.evaluate(() => document.fonts.ready);
  const load = Date.now() - t0;
  const m = await p.metrics(); const tw = await p.evaluate(() => window.__timelines.main.getChildren(false).length);
  const times = [20, 60, 100, 140, 180]; const seek = [];
  for (const t of times) { const s = Date.now(); await p.evaluate((tt) => { window.__timelines.main.seek(tt, false); }, t); await p.screenshot({ type: 'jpeg', quality: 60 }); seek.push(Date.now() - s); }
  const m2 = await p.metrics();
  console.log(JSON.stringify({ loadMs: load, nodes: m.Nodes, jsHeapMB: +(m.JSHeapUsedSize / 1048576).toFixed(0), jsHeapAfterMB: +(m2.JSHeapUsedSize / 1048576).toFixed(0), tweens: tw, seekAndShotMs: seek }));
  await b.close();
})();
