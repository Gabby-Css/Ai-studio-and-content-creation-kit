// node fps_check.cjs <startSec> : sequential-frame cost (what a real render does): seek +1/30 s, screenshot, repeat 45x
const puppeteer = require('../../../node_modules/puppeteer'); const path = require('path');
const start = +(process.argv[2] || 110), N = 45;
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080 });
  await p.goto('file:///' + path.resolve(__dirname, '../index.html').split('\\').join('/')); await p.evaluate(() => document.fonts.ready);
  await p.evaluate((t) => { window.__timelines.main.pause(); window.__timelines.main.seek(t, false); }, start);   // one big jump, then sequential
  let seekMs = 0, shotMs = 0;
  for (let i = 1; i <= N; i++) {
    let s = Date.now(); await p.evaluate((t) => { window.__timelines.main.seek(t, false); }, start + i / 30); seekMs += Date.now() - s;
    s = Date.now(); await p.screenshot({ type: 'jpeg', quality: 70 }); shotMs += Date.now() - s;
  }
  console.log(JSON.stringify({ startSec: start, frames: N, seekMsPerFrame: Math.round(seekMs / N), shotMsPerFrame: Math.round(shotMs / N) }));
  await b.close();
})();
