// node dump_sfx.cjs -> ../data/sfx.json : every sound-effect event the animation logs (time, kind, value)
const puppeteer = require('../../../node_modules/puppeteer'); const fs = require('fs'), path = require('path');
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'], timeout: 240000, protocolTimeout: 240000 });
  const p = await b.newPage(); p.setDefaultNavigationTimeout(240000); p.setDefaultTimeout(240000); await p.goto('file:///' + path.resolve(__dirname, '../index.html').split('\\').join('/')); await new Promise((r) => setTimeout(r, 1500));
  const sfx = await p.evaluate(() => window.__SFX); fs.writeFileSync(path.resolve(__dirname, '../data/sfx.json'), JSON.stringify(sfx));
  const kinds = {}; sfx.forEach((e) => (kinds[e[1]] = (kinds[e[1]] || 0) + 1)); console.log(sfx.length, 'events', JSON.stringify(kinds)); await b.close();
})();
