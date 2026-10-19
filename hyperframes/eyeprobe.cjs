// node eyeprobe.cjs N id1 id2 ...  -> measures where a character's eyes are relative to its origin (unscaled units) = the EYE[id] value for ECAM
const puppeteer = require('puppeteer'); const path = require('path');
const N = process.argv[2], ids = process.argv.slice(3);
(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  await p.goto('file://' + path.join(__dirname, 'toon' + N, 'index.html').replace(/\\/g, '/'), { waitUntil: 'load', timeout: 120000 });
  await new Promise(r => setTimeout(r, 2500));
  const out = await p.evaluate((ids) => {
    const tl = window.__timelines && window.__timelines.main; if (tl) tl.seek(0.01, false);
    const res = {};
    for (const id of ids) {
      const el = document.getElementById(id); if (!el) { res[id] = 'missing'; continue; }
      const m = el.getScreenCTM(); const eyes = [...el.querySelectorAll('.' + id + 'EyeW')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0; });
      if (!eyes.length) { res[id] = 'no eyes'; continue; }
      let cx = 0, cy = 0; for (const e of eyes) { const r = e.getBoundingClientRect(); cx += (r.left + r.right) / 2; cy += (r.top + r.bottom) / 2; } cx /= eyes.length; cy /= eyes.length;
      res[id] = { EYE: [Math.round((cx - m.e) / m.a), Math.round((cy - m.f) / m.d)], scale: +m.a.toFixed(3) };
    }
    return res;
  }, ids);
  console.log(JSON.stringify(out)); await b.close();
})();
