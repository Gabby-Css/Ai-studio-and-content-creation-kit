// node stageshot.cjs toonN t out.png [layout.json]
//   Freezes episode N at time t, optionally moves the camera / characters to trial marks, saves a screenshot.
//   layout.json = {"cam":[x0,y0,s], "chars":{"bo":[x,y,s],...}, "order":["gmMount",...], "hide":["#id"], "show":["#id"]}
const puppeteer = require('puppeteer');
const fs = require('fs');
const [dir, t, out, lay] = process.argv.slice(2);
(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], protocolTimeout: 600000 });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  p.on('pageerror', e => console.log('PAGEERROR:', e.message.split('\n')[0]));
  await p.goto('file:///C:/Users/softenic/Downloads/ai-video-studio-kit/hyperframes/' + dir + '/index.html', { waitUntil: 'load', timeout: 600000 });
  await new Promise(r => setTimeout(r, 2500));
  const L = lay ? JSON.parse(fs.readFileSync(lay, 'utf8')) : {};
  await p.evaluate(async (t, L) => {
    const tl = window.__timelines.main; tl.pause(); tl.seek(t, false);
    if (L.order) { const bm = document.getElementById(L.orderBefore || 'boMount'); for (const id of L.order) bm.before(document.getElementById(id)); }
    if (L.cam) { const [x, y, s] = L.cam; gsap.set('#cam', { x: -x * s, y: -y * s, scale: s }); }
    for (const [id, [x, y, s]] of Object.entries(L.chars || {})) gsap.set('#' + id, { x, y, scale: s, opacity: 1 });
    for (const h of L.hide || []) gsap.set(h, { opacity: 0 });
    for (const h of L.show || []) gsap.set(h, { opacity: 1 });
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  }, +t, L);
  await p.screenshot({ path: out });
  await b.close(); console.log('saved', out);
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
