const puppeteer = require('../../../node_modules/puppeteer');
const fs = require('fs'), path = require('path');
global.window = global; require('./kv_chars.js');
const KV = global.KV;
const out = process.argv[2];
const ids = (process.argv[3] || Object.keys(KV.CHARS).join(',')).split(',');
const slash = (s) => s.split('\\').join('/');
const fonts = slash(path.resolve(__dirname, '../assets/fonts'));
const cells = ids.map((id, i) => {
  const c = KV.CHARS[id]; const sing = i % 2 === 1;
  return `<div class="cell"><svg viewBox="${-c.w / 2 - 20} ${-c.h - 150} ${c.w + 40} ${c.h + 190}" width="${(c.w + 40) * .95}" height="${(c.h + 190) * .95}" class="${sing ? 'sing' : ''}">${KV.draw(id)}</svg><div class="nm">${c.name}</div></div>`;
}).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Fredoka;src:url('file:///${fonts}/fredoka-latin-700-normal.woff2');font-weight:700}
body{margin:0;background:linear-gradient(160deg,#FFF3D6,#CFE8FF);font-family:Fredoka;font-weight:700;width:2200px}
.row{display:flex;flex-wrap:wrap;gap:10px;padding:20px;justify-content:center}.cell{background:rgba(255,255,255,.55);border-radius:30px;text-align:center;padding:6px}
.nm{font-size:34px;color:#2B1B5E}
.sing .m-smile{opacity:0}.sing .m-open{opacity:1!important}.sing .ep-open{opacity:0}.sing .ep-happy{opacity:1!important}
</style><svg width="0" height="0" style="position:absolute"><defs>${KV.DEFS}</defs></svg><div class="row">${cells}</div>`;
const f = path.join(path.dirname(out), 'preview_chars.html'); fs.writeFileSync(f, html);
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 2200, height: 900 });
  await p.goto('file:///' + slash(f)); await new Promise(r => setTimeout(r, 600));
  await p.screenshot({ path: out, fullPage: true }); await b.close(); console.log('ok');
})();
