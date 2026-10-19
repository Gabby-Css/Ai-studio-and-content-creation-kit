// node preview_frames.cjs <outDir> <t1,t2,...>   -> outDir/f_<t>.jpg  (seeks the real timeline; reports page errors)
const puppeteer = require('../../../node_modules/puppeteer');
const fs = require('fs'), path = require('path');
const out = process.argv[2]; let times;
const arg3 = process.argv[3];
const scale = +(process.argv[4] || 1);
fs.mkdirSync(out, { recursive: true });
const url = 'file:///' + path.resolve(process.env.KV_PAGE || path.join(__dirname, '../index.html')).split('\\').join('/');
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files', '--force-device-scale-factor=' + scale] });
  const p = await b.newPage(); const VP = (process.env.KV_VP || '1920x1080').split('x').map(Number); await p.setViewport({ width: VP[0], height: VP[1] });
  const errs = []; p.on('pageerror', (e) => errs.push('PAGEERR ' + e.message)); p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ' ' + m.text()); });
  await p.goto(url); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 800));
  const info = await p.evaluate(() => ({ tl: !!(window.__timelines && window.__timelines.main), dur: window.__timelines && window.__timelines.main.duration(), shots: window.SB && window.SB.length }));
  console.log('timeline', JSON.stringify(info));
  if (arg3.startsWith('shots:')) { const [a, b, step] = arg3.slice(6).split('-').map(Number); const mids = await p.evaluate(() => window.SB.map((s) => +((s.t0 + s.t1) / 2).toFixed(2))); times = []; for (let i = a; i <= b; i += (step || 1)) times.push(mids[i]); } else times = arg3.split(',').map(Number);
  for (const t of times) {
    await p.evaluate((tt) => { window.__timelines.main.pause(); window.__timelines.main.seek(tt, false); }, t);
    await new Promise((r) => setTimeout(r, 120));
    await p.screenshot({ path: path.join(out, 'f_' + String(t).replace('.', '_') + '.jpg'), type: 'jpeg', quality: 72 });
  }
  console.log(errs.slice(0, 12).join('\n') || 'no page errors');
  await b.close();
})();
