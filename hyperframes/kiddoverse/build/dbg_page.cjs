// node dbg_page.cjs <page.html> [w] [h] -> prints page errors / console of a composition
const puppeteer = require('../../../node_modules/puppeteer'); const path = require('path');
const url = 'file:///' + path.resolve(process.argv[2]).split('\\').join('/');
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: +(process.argv[3] || 1080), height: +(process.argv[4] || 1920) });
  p.on('pageerror', (e) => console.log('PAGEERR', e.message.slice(0, 400), '|', (e.stack || '').split('\n').slice(0, 4).join(' | ').slice(0, 500)));
  p.on('console', (m) => console.log('[c]', m.type(), m.text().slice(0, 300)));
  await p.goto(url); await new Promise((r) => setTimeout(r, 1500)); await b.close();
})();
