// node make_thumbs.cjs <outDir>  -> 3 YouTube thumbnails (1280x720) for LEARN #5 "Gizmo's Counting Machine"
// design rules: 2-3 words of huge text, big expressive faces with OPEN mouths, one curiosity hook ("WHAT NEXT?"), strong contrast, readable at phone size
const puppeteer = require('../../../node_modules/puppeteer'); const fs = require('fs'), path = require('path');
global.window = global; global.SONG = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/song.json'), 'utf8'));
require('./kv_chars.js'); require('./kv_worlds.js'); require('./edu_worlds.js'); require('./edu_objects.js'); require('./color_objects.js'); require('./color_worlds.js'); require('./count_art.js'); require('./kv_logo.js');
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
const frame = (kind, n, x, y, s) => { const c = 92; let m = `<rect x="-246" y="-108" width="492" height="216" rx="34" fill="#fff" fill-opacity=".95" stroke="${OLC}" stroke-width="8"/><path d="M-230,0 H230 ${[-1.5, -.5, .5, 1.5].map((k) => `M${k * c},-92 V92`).join(' ')}" fill="none" stroke="#B7BEE8" stroke-width="5" stroke-linecap="round"/>`;
  for (let i = 0; i < n; i++) m += `<g transform="translate(${((i % 5) - 2) * c},${(Math.floor(i / 5) - .5) * c}) scale(.8)">${CNT.mini(kind)}</g>`; return `<g transform="translate(${x},${y}) scale(${s})">${m}</g>`; };
const display = (str, x, y, s) => { const W = 360, H = 230, sz = str.length <= 2 ? 172 : str.length <= 4 ? 132 : 96;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="${-W / 2 + 40}" y="${H / 2 - 4}" width="70" height="26" rx="8" fill="#2E3158" stroke="${OLC}" stroke-width="6"/><rect x="${W / 2 - 110}" y="${H / 2 - 4}" width="70" height="26" rx="8" fill="#2E3158" stroke="${OLC}" stroke-width="6"/>`
    + `<path d="M${W / 2 - 70},${-H / 2} L${W / 2 - 70},${-H / 2 - 44}" stroke="${OLC}" stroke-width="8" stroke-linecap="round"/><circle cx="${W / 2 - 70}" cy="${-H / 2 - 56}" r="14" fill="#FF5E7E" stroke="${OLC}" stroke-width="6"/>`
    + `<rect x="${-W / 2}" y="${-H / 2}" width="${W}" height="${H}" rx="40" fill="#5B60A0" stroke="${OLC}" stroke-width="9"/><rect x="${-W / 2 + 24}" y="${-H / 2 + 24}" width="${W - 48}" height="${H - 48}" rx="24" fill="#0E1A2B" stroke="${OLC}" stroke-width="6"/>`
    + `<text x="0" y="${sz * .35 + 2}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${sz}" fill="#6CFFB0" stroke="#0B3B2A" stroke-width="9" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`; };
const item = (kind, i, x, y, s, label) => `<g transform="translate(${x},${y}) scale(${s})">${CNT.item(kind, i)}</g><g transform="translate(${x},${y + 150 * s + 70})"><rect x="-80" y="-48" width="160" height="96" rx="38" fill="${CNT.PAL[(i * 2 + 3) % 6]}" stroke="${OLC}" stroke-width="10"/>${STROKE(label, 0, 24, 76, '#fff', 0, 'middle', 12)}</g>`;
const scene = (w, h, inner) => `<svg viewBox="0 0 1920 1080" width="${w}" height="${h}" style="position:absolute;left:0;top:0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
const logoSmall = `<div style="position:absolute;right:30px;top:20px;transform-origin:top right;transform:scale(.62)">${KVLogo.html(78)}</div>`;

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'], timeout: 240000, protocolTimeout: 240000 });
  const shot = async (html, w, h, file) => { const p = await b.newPage(); await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 }); const tmp = path.join(OUT, '_tmp.html'); fs.writeFileSync(tmp, html); await p.goto('file:///' + slash(tmp)); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 400));
    await p.screenshot({ path: file, type: 'jpeg', quality: 92 }); await p.close(); };
  /* A: COUNT TO 20! - big title left, two full ten-frames of stars and Gizmo right */
  await shot(page(scene(1280, 720, world('numland') + frame('star', 10, 1400, 290, 1.25) + frame('star', 10, 1400, 600, 1.25) + actor('gizmo', 1780, 1090, 1.2, { cls: 'wow' })
    + STROKE('COUNT', 480, 400, 270, '#FFE14D', -3) + STROKE('TO 20!', 500, 690, 270, '#fff', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_A_COUNT-TO-20.jpg'));
  /* B: WHAT NEXT? - Gizmo's display shows "14 ?" (curiosity hook) */
  await shot(page(scene(1280, 720, world('workshop') + display('14 ?', 1440, 420, 2.0) + actor('gizmo', 1780, 1090, 1.3, { cls: 'wow' })
    + STROKE('WHAT', 440, 330, 250, '#fff', -3) + STROKE('NEXT?', 480, 650, 280, '#FFE14D', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_B_WHAT-NEXT.jpg'));
  /* C: COUNT BY 2s 5s 10s - socks, a hand, a ten-frame train car */
  await shot(page(scene(1280, 720, world('hills') + item('sock', 0, 1080, 470, 1.45, '2') + item('hand', 1, 1430, 480, 1.55, '5') + item('car', 2, 1770, 520, 1.15, '10')
    + STROKE('COUNT BY', 470, 360, 170, '#FFE14D', -3) + STROKE('2s 5s 10s', 480, 640, 175, '#fff', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_C_COUNT-BY-2-5-10.jpg'));
  await b.close(); fs.rmSync(path.join(OUT, '_tmp.html'), { force: true }); console.log('thumbnails written to', OUT);
})();
