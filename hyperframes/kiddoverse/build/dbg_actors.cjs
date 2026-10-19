// node dbg_actors.cjs <t>  -> reports visible shot + its actors' transforms/opacity at time t (seeking real timeline)
const puppeteer = require('../../../node_modules/puppeteer');
const path = require('path');
const url = 'file:///' + path.resolve(__dirname, '../index.html').split('\\').join('/');
const ts = process.argv.slice(2).map(Number);
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080 });
  p.on('console', (m) => console.log('[console]', m.type(), m.text().slice(0, 200)));
  p.on('pageerror', (e) => console.log('PAGEERR', e.message));
  await p.goto(url); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 800));
  for (const t of ts) {
    await p.evaluate((tt) => { window.__timelines.main.pause(); window.__timelines.main.seek(tt, false); }, t);
    const r = await p.evaluate(() => {
      const shots = [...document.querySelectorAll('.shot')].filter((s) => s.style.display !== 'none');
      return shots.map((s) => ({ id: s.id, actors: [...s.querySelectorAll('.actors > .act')].map((a) => ({ cls: a.getAttribute('class'), tr: a.getAttribute('transform'), op: getComputedStyle(a).opacity, disp: getComputedStyle(a).display, vis: getComputedStyle(a).visibility, bb: (() => { try { const r = a.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; } catch (e) { return 'err'; } })() })), camTr: s.querySelector('.cam').getAttribute('transform'), nActG: s.querySelectorAll('.actors').length }));
    });
    console.log('t=' + t, JSON.stringify(r, null, 1));
  }
  await b.close();
})();
