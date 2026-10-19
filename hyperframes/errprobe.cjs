// node errprobe.cjs toonN  -> prints page errors / console errors on load
const puppeteer = require('puppeteer');
const dir = process.argv[2];
(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], protocolTimeout: 300000 });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  p.on('pageerror', e => console.log('PAGEERROR:', e.message.split('\n')[0]));
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('CONSOLE', m.type(), m.text().slice(0, 200)); });
  await p.goto('file:///C:/Users/softenic/Downloads/ai-video-studio-kit/hyperframes/' + dir + '/index.html', { waitUntil: 'load', timeout: 300000 });
  await new Promise(r => setTimeout(r, 3000));
  const r = await p.evaluate(() => ({ tl: !!(window.__timelines && window.__timelines.main), dur: window.__timelines && window.__timelines.main && window.__timelines.main.duration() }));
  console.log(JSON.stringify(r));
  await b.close();
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
