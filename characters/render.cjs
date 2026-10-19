'use strict';
/* node characters/render.cjs --preview <out.png>          -> contact sheet only (quick check)
   node characters/render.cjs --out "<folder>"              -> full pack: sheet + per-character folders */
const puppeteer = require('puppeteer');
const fs = require('fs'), path = require('path');
const { CAST, svgFor, EXPRESSIONS } = require('./cast.cjs');

const arg = (k) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : null; };
const FONT = fs.readFileSync(path.join(__dirname, '..', 'hyperframes', 'toon', 'assets', 'fonts', 'ToonBlack.ttf')).toString('base64');
const FONTCSS = `@font-face{font-family:'ToonBlack';src:url(data:font/ttf;base64,${FONT});font-weight:900}`;
const slug = (s) => s.replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '');
const pad = (n) => String(n).padStart(2, '0');

function sheetHtml() {
  const cells = CAST.map((c, i) => `<div class="cell"><div class="art">${svgFor(c, 'happy', true).replace('width="1000" height="1200" viewBox="0 0 1000 1200"', 'width="440" height="600" viewBox="100 30 800 1090"')}</div><div class="nm">${pad(i + 1)} · ${c.name}</div><div class="sp">${c.species}</div></div>`).join('');
  return `<!doctype html><meta charset="utf-8"><style>${FONTCSS}
  body{margin:0;background:#FFF8EC;font-family:'ToonBlack',sans-serif;font-weight:900;width:2760px}
  h1{margin:0;padding:50px 0 6px;text-align:center;font-size:84px;color:#2b1a14;letter-spacing:2px}
  h2{margin:0 0 30px;text-align:center;font-size:36px;color:#B35A12;letter-spacing:6px}
  .grid{display:grid;grid-template-columns:repeat(6,440px);gap:24px;justify-content:center;padding:0 30px 60px}
  .cell{background:#fff;border:8px solid #2b1a14;border-radius:34px;overflow:hidden;box-shadow:0 10px 0 rgba(43,26,20,.35)}
  .art{width:440px;height:600px;line-height:0}.nm{padding:14px 10px 0;text-align:center;font-size:30px;color:#2b1a14}.sp{padding:0 10px 18px;text-align:center;font-size:21px;color:#8a6a55}</style>
  <h1>CONTENT CREATION · CHARACTER CAST</h1><h2>${CAST.length} ORIGINAL CHARACTERS · DAY ONE</h2><div class="grid">${cells}</div>`;
}

function cardHtml(c, i) {
  return `<!doctype html><meta charset="utf-8"><style>${FONTCSS}
  body{margin:0;width:1080px;height:1350px;position:relative;overflow:hidden;font-family:'ToonBlack',sans-serif;font-weight:900;background:linear-gradient(160deg,${c.bg[0]},${c.bg[1]})}
  .dot{position:absolute;border-radius:50%;background:rgba(255,255,255,.35)}.art{position:absolute;left:136px;top:20px;width:807px;height:1100px;line-height:0}
  .name{position:absolute;left:0;right:0;bottom:78px;text-align:center;font-size:84px;color:#fff;-webkit-text-stroke:16px #2b1a14;paint-order:stroke fill;text-shadow:0 8px 0 rgba(43,26,20,.4)}
  .tag{position:absolute;left:0;right:0;bottom:24px;text-align:center;font-size:38px;color:#2b1a14;opacity:.75}</style>
  <div class="dot" style="width:520px;height:520px;left:-120px;top:-100px"></div><div class="dot" style="width:380px;height:380px;right:-90px;top:380px"></div>
  <div class="art">${svgFor(c, 'happy', false).replace('width="1000" height="1200" viewBox="0 0 1000 1200"', 'width="807" height="1100" viewBox="100 30 800 1090"')}</div>
  <div class="name">${c.name}</div><div class="tag">${c.line}</div>`;
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  const prev = arg('--preview'), out = arg('--out');

  await page.setViewport({ width: 2760, height: 1000, deviceScaleFactor: 1 });
  await page.setContent(sheetHtml(), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const sheetPath = prev || path.join(out, '00_ALL_CHARACTERS.png');
  fs.mkdirSync(path.dirname(sheetPath), { recursive: true });
  await page.screenshot({ path: sheetPath, fullPage: true });
  console.log('sheet ->', sheetPath);

  if (out) {
    const NL = '\n';
    const lines = CAST.map((c, i) => [`${pad(i + 1)}. ${c.name}  (${c.species})`, `    Personality : ${c.vibe}`, `    Catchphrase : ${c.line}`, `    Folder      : Characters\${pad(i + 1)}_${slug(c.name)}`, ''].join(NL));
    fs.writeFileSync(path.join(out, '00_CAST_LIST.txt'), ['CONTENT CREATION - CHARACTER CAST (Day One)', `${CAST.length} original characters. Every one has 4 expressions (happy, shocked, sad, love).`, ''].join(NL) + NL + lines.join(NL));
    fs.writeFileSync(path.join(out, '00_HOW_TO_USE.txt'), [
      'HOW TO USE THESE CHARACTERS',
      '',
      '- *_happy / *_shocked / *_sad / *_love .png : transparent background, 1500x1800. Drop them into CapCut, Canva, Premiere, DaVinci Resolve, etc.',
      '- *_CARD.png : ready-made 1080x1350 poster of the character (good for intros, thumbnails, profile pictures).',
      '- *.svg : editable vector. Open in Figma / Illustrator / Inkscape to change colours or make your own pose.',
      '- 00_ALL_CHARACTERS.png : the whole cast on one sheet.',
      '- 00_CAST_LIST.txt : names, personalities and catchphrases so your stories stay consistent.',
      '',
      'All characters are original artwork generated for you with code - no stock images, no third-party characters, no paid AI service.',
      'Tomorrow: tell me your video idea and I will pick characters from this cast, write the script, animate it, add voice, music and captions.',
      ''].join(NL));
    const root = path.join(out, 'Characters');
    for (let i = 0; i < CAST.length; i++) {
      const c = CAST[i], dir = path.join(root, `${pad(i + 1)}_${slug(c.name)}`);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, `${slug(c.name)}.svg`), svgFor(c, 'happy', false));
      await page.setViewport({ width: 1000, height: 1200, deviceScaleFactor: 1.5 });
      for (const ex of EXPRESSIONS) {
        await page.setContent(`<!doctype html><body style="margin:0;background:transparent">${svgFor(c, ex, false)}`, { waitUntil: 'load' });
        await page.screenshot({ path: path.join(dir, `${slug(c.name)}_${ex}.png`), omitBackground: true, clip: { x: 0, y: 0, width: 1000, height: 1200 } });
      }
      await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });
      await page.setContent(cardHtml(c, i), { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: path.join(dir, `${slug(c.name)}_CARD.png`) });
      console.log('done', pad(i + 1), c.name);
    }
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
