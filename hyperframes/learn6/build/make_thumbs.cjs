// node make_thumbs.cjs <outDir>  -> 3 YouTube thumbnails (1280x720) for LEARN #6 "Sound It Out! Three-Letter Words"
// design rules: 2-3 words of huge text, big expressive faces with OPEN mouths, one curiosity hook ("WHICH WORD?"), strong contrast, readable at phone size
const puppeteer = require('../../../node_modules/puppeteer'); const fs = require('fs'), path = require('path');
global.window = global; global.SONG = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/song.json'), 'utf8'));
require('./kv_chars.js'); require('./kv_worlds.js'); require('./edu_worlds.js'); require('./edu_objects.js'); require('./color_objects.js'); require('./color_worlds.js'); require('./animal_art.js'); require('./word_art.js'); require('./kv_logo.js');
const KV = global.KV, KVW = global.KVW, KVLogo = global.KVLogo, O = global.KVOBJ;
const OUT = path.resolve(process.argv[2] || path.join(__dirname, '../deliver/thumbs')); fs.mkdirSync(OUT, { recursive: true });
const slash = (s) => s.split('\\').join('/'); const FONTS = slash(path.resolve(__dirname, '../assets/fonts'));
const CSS = `@font-face{font-family:Fredoka;src:url('file:///${FONTS}/fredoka-latin-700-normal.woff2');font-weight:700}@font-face{font-family:Fredoka;src:url('file:///${FONTS}/baloo-2-latin-800-normal.woff2');font-weight:700;unicode-range:U+0042}@font-face{font-family:'Baloo 2';src:url('file:///${FONTS}/baloo-2-latin-800-normal.woff2');font-weight:800}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Fredoka;font-weight:700}
.logo{display:flex;align-items:center;gap:calc(var(--fs)*.1);font-size:var(--fs);line-height:1}.logo .planet{width:calc(var(--fs)*1.6);height:calc(var(--fs)*1.6);overflow:visible;margin-right:calc(var(--fs)*.04)}
.logo .lw b{display:inline-block;font-weight:700;-webkit-text-stroke:calc(var(--fs)*.13) #2B1B5E;paint-order:stroke fill;text-shadow:0 calc(var(--fs)*.07) 0 rgba(43,27,94,.55);letter-spacing:calc(var(--fs)*.01)}
.hp .m-smile{opacity:0}.hp .m-open{opacity:1!important}.hp .ep-open{opacity:0}.hp .ep-happy{opacity:1!important}.wow .m-smile{opacity:0}.wow .m-wide{opacity:1!important}.wow .ep-open{opacity:0}.wow .ep-wide{opacity:1!important}
.talk .mc{opacity:0}.talk .mo{opacity:1!important}`;
const defs = `<svg width="0" height="0" style="position:absolute"><defs>${KV.DEFS}${KVW.DEFS}</defs></svg>`;
const page = (body, w, h) => `<!doctype html><meta charset="utf-8"><style>${CSS}html,body{width:${w}px;height:${h}px;overflow:hidden}</style>${defs}${body}`;
const STROKE = (t, x, y, size, fill, rot = 0, anchor = 'middle', sw) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Fredoka" font-weight="700" font-size="${size}" fill="${fill}" stroke="#2B1B5E" stroke-width="${sw || size * .17}" stroke-linejoin="round" paint-order="stroke" transform="rotate(${rot} ${x} ${y})">${t}</text>`;
const world = (n, layers = ['far', 'mid', 'ground', 'fg']) => layers.map((l) => `<g>${KVW.WORLDS[n][l]}</g>`).join('');
const pose = (svg, o = {}) => { let s = svg; if (o.arms) s = s.replace('class="armL"', `class="armL" transform="rotate(${o.arms[0]})"`).replace('class="armR"', `class="armR" transform="rotate(${o.arms[1]})"`); return s; };
const actor = (c, x, y, s, o = {}) => `<g class="${o.cls || ''}" transform="translate(${x},${y}) scale(${o.flip ? -s : s},${s})">${pose(KV.draw(c), o)}</g>`;
const OLC = '#2B1B5E';
const tiles = (word, x, y, s) => { const col = (i) => ('aeiou'.includes(word[i]) ? '#FF5E7E' : i === 0 ? '#2F9BFF' : '#39C95B');
  const t = [0, 1, 2].map((i) => `<g transform="translate(${(i - 1) * 250},0)"><rect x="-108" y="-108" width="216" height="244" rx="42" fill="${col(i)}" stroke="${OLC}" stroke-width="10"/><rect x="-84" y="-92" width="130" height="20" rx="10" fill="#fff" opacity=".4"/>${STROKE(word[i], 0, 72, 210, '#fff', 0, 'middle', 17)}</g>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-440" y="-190" width="880" height="400" rx="60" fill="#5B60A0" stroke="${OLC}" stroke-width="10"/>${t}</g>`; };
const card = (word, pic, x, y, s, hi) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-170" width="300" height="340" rx="46" fill="${hi ? '#FFF6B0' : '#fff'}" stroke="${OLC}" stroke-width="10"/><g transform="translate(0,-50) scale(.8)">${O.draw(pic)}</g>${STROKE(word, 0, 118, 110, hi ? '#FF5E7E' : '#2F9BFF', 0, 'middle', 14)}</g>`;
const wordcard = (word, x, y, s, hi) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-156" y="-110" width="312" height="220" rx="46" fill="${hi ? '#FFF6B0' : '#fff'}" stroke="${OLC}" stroke-width="10"/>${STROKE(word, 0, 30, 150, hi ? '#FF5E7E' : '#2F9BFF', 0, 'middle', 16)}</g>`;
const scene = (w, h, inner) => `<svg viewBox="0 0 1920 1080" width="${w}" height="${h}" style="position:absolute;left:0;top:0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
const logoSmall = `<div style="position:absolute;right:30px;top:20px;transform-origin:top right;transform:scale(.62)">${KVLogo.html(78)}</div>`;

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'], timeout: 240000, protocolTimeout: 240000 });
  const shot = async (html, w, h, file) => { const p = await b.newPage(); await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 }); const tmp = path.join(OUT, '_tmp.html'); fs.writeFileSync(tmp, html); await p.goto('file:///' + slash(tmp)); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 400));
    await p.screenshot({ path: file, type: 'jpeg', quality: 92 }); await p.close(); };
  /* A: READ WORDS! - big title left, the c-a-t letter tiles and the cat right */
  await shot(page(scene(1280, 720, world('hills') + tiles('cat', 1420, 330, .9) + `<g transform="translate(1420,790) scale(1.85)">${O.draw('cat')}</g>`
    + STROKE('READ', 450, 390, 280, '#FFE14D', -3) + STROKE('WORDS!', 480, 690, 235, '#fff', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_A_READ-WORDS.jpg'));
  /* B: SOUND IT OUT! - Gizmo and the d-o-g tiles */
  await shot(page(scene(1280, 720, world('abc') + tiles('dog', 1400, 330, .9) + actor('gizmo', 1450, 1090, 1.3, { cls: 'wow' }) + `<g transform="translate(990,830) scale(1.45)">${O.draw('dog')}</g>`
    + STROKE('SOUND', 450, 360, 250, '#fff', -3) + STROKE('IT OUT!', 480, 670, 250, '#FFE14D', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_B_SOUND-IT-OUT.jpg'));
  /* C: WHICH WORD? - three reading cards and the sun */
  await shot(page(scene(1280, 720, world('numland') + wordcard('bus', 1090, 820, .95, false) + wordcard('sun', 1410, 820, .95, true) + wordcard('cup', 1730, 820, .95, false) + `<g transform="translate(1470,400) scale(1.6)">${O.draw('sun')}</g>`
    + STROKE('WHICH', 440, 360, 270, '#fff', -3) + STROKE('WORD?', 470, 670, 270, '#FFE14D', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_C_WHICH-WORD.jpg'));
  await b.close(); fs.rmSync(path.join(OUT, '_tmp.html'), { force: true }); console.log('thumbnails written to', OUT);
})();
