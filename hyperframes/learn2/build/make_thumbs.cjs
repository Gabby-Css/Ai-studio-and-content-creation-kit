// node make_thumbs.cjs <outDir>  -> 3 YouTube thumbnails (1280x720) + 1 square avatar for the LEARN video
const puppeteer = require('../../../node_modules/puppeteer'); const fs = require('fs'), path = require('path');
global.window = global; global.SONG = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/song.json'), 'utf8'));
require('./kv_chars.js'); require('./kv_worlds.js'); require('./edu_worlds.js'); require('./edu_objects.js'); require('./color_objects.js'); require('./color_worlds.js'); require('./kv_logo.js');
const KV = global.KV, KVW = global.KVW, KVLogo = global.KVLogo, O = global.KVOBJ;
const OUT = path.resolve(process.argv[2] || path.join(__dirname, '../deliver/thumbs')); fs.mkdirSync(OUT, { recursive: true });
const slash = (s) => s.split('\\').join('/'); const FONTS = slash(path.resolve(__dirname, '../assets/fonts'));
const CSS = `@font-face{font-family:Fredoka;src:url('file:///${FONTS}/fredoka-latin-700-normal.woff2');font-weight:700}@font-face{font-family:Fredoka;src:url('file:///${FONTS}/baloo-2-latin-800-normal.woff2');font-weight:700;unicode-range:U+0042}@font-face{font-family:'Baloo 2';src:url('file:///${FONTS}/baloo-2-latin-800-normal.woff2');font-weight:800}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Fredoka;font-weight:700}
.logo{display:flex;align-items:center;gap:calc(var(--fs)*.1);font-size:var(--fs);line-height:1}.logo .planet{width:calc(var(--fs)*1.6);height:calc(var(--fs)*1.6);overflow:visible;margin-right:calc(var(--fs)*.04)}
.logo .lw b{display:inline-block;font-weight:700;-webkit-text-stroke:calc(var(--fs)*.13) #2B1B5E;paint-order:stroke fill;text-shadow:0 calc(var(--fs)*.07) 0 rgba(43,27,94,.55);letter-spacing:calc(var(--fs)*.01)}
.hp .m-smile{opacity:0}.hp .m-open{opacity:1!important}.hp .ep-open{opacity:0}.hp .ep-happy{opacity:1!important}.wow .m-smile{opacity:0}.wow .m-wide{opacity:1!important}.wow .ep-open{opacity:0}.wow .ep-wide{opacity:1!important}`;
const defs = `<svg width="0" height="0" style="position:absolute"><defs>${KV.DEFS}${KVW.DEFS}</defs></svg>`;
const page = (body, w, h) => `<!doctype html><meta charset="utf-8"><style>${CSS}html,body{width:${w}px;height:${h}px;overflow:hidden}</style>${defs}${body}`;
const STROKE = (t, x, y, size, fill, rot = 0, anchor = 'middle', sw) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Fredoka" font-weight="700" font-size="${size}" fill="${fill}" stroke="#2B1B5E" stroke-width="${sw || size * .17}" stroke-linejoin="round" paint-order="stroke" transform="rotate(${rot} ${x} ${y})">${t}</text>`;
const world = (n, layers = ['far', 'mid', 'ground', 'fg']) => layers.map((l) => `<g>${KVW.WORLDS[n][l]}</g>`).join('');
const pose = (svg, o = {}) => { let s = svg; if (o.arms) s = s.replace('class="armL"', `class="armL" transform="rotate(${o.arms[0]})"`).replace('class="armR"', `class="armR" transform="rotate(${o.arms[1]})"`); return s; };
const actor = (c, x, y, s, o = {}) => `<g class="${o.cls || ''}" transform="translate(${x},${y}) scale(${o.flip ? -s : s},${s})">${pose(KV.draw(c), o)}</g>`;
const obj = (kind, x, y, s, col, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">${O.draw(kind, col == null ? undefined : col)}</g>`;
const tile = (ch, x, y, col, s = 1, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-112" y="-122" width="224" height="250" rx="40" fill="#00000030" stroke="#2B1B5E" stroke-width="9"/><rect x="-112" y="-134" width="224" height="240" rx="40" fill="${col}" stroke="#2B1B5E" stroke-width="9"/><rect x="-90" y="-118" width="120" height="18" rx="9" fill="#fff" opacity=".38"/>${STROKE(ch, 0, 56, 190, '#fff', 0, 'middle', 15)}</g>`;
const scene = (w, h, inner) => `<svg viewBox="0 0 1920 1080" width="${w}" height="${h}" style="position:absolute;left:0;top:0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
const logoSmall = `<div style="position:absolute;right:30px;top:20px;transform-origin:top right;transform:scale(.62)">${KVLogo.html(78)}</div>`;
const PAL = O.PAL;

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'], timeout: 240000, protocolTimeout: 240000 });
  const shot = async (html, w, h, file) => { const p = await b.newPage(); await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 }); const tmp = path.join(OUT, '_tmp.html'); fs.writeFileSync(tmp, html); await p.goto('file:///' + slash(tmp)); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 400));
    await p.screenshot({ path: file, type: 'jpeg', quality: 92 }); await p.close(); };
  const HEX = KVW.COLORHEX, HX = Object.values(HEX);
  const rainbow = (cx, cy, R, bw) => HX.map((h, k) => { const r = R - k * bw; return `<path d="M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy}" fill="none" stroke="#2B1B5E" stroke-opacity=".3" stroke-width="${bw * .9 + 7}" stroke-linecap="round"/><path d="M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy}" fill="none" stroke="${h}" stroke-width="${bw * .9}" stroke-linecap="round"/>`; }).join('');
  const orb = (x, y, r, h) => `<g transform="translate(${x},${y})"><circle r="${r}" fill="${h}" stroke="#2B1B5E" stroke-width="12"/><circle r="${r * .72}" fill="#fff" opacity=".18"/><ellipse cx="${-r * .34}" cy="${-r * .4}" rx="${r * .22}" ry="${r * .12}" fill="#fff" opacity=".75" transform="rotate(-32 ${-r * .34} ${-r * .4})"/></g>`;
  /* A: LEARN COLORS - title left, the crew right, big rainbow behind */
  await shot(page(scene(1280, 720, world('numland') + rainbow(1180, 860, 700, 78) + obj('apple', 800, 880, 1.2, HEX.red, -8) + obj('duck', 1860, 880, 1.0, null, 8) + actor('luma', 1320, 1070, 1.5, { cls: 'hp', arms: [25, -150], flip: true }) + actor('kiko', 1640, 1070, 1.6, { cls: 'hp', arms: [-150, 25] })
    + STROKE('LEARN', 500, 400, 270, '#FFE14D', -3) + STROKE('COLORS!', 540, 700, 270, '#fff', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_A_LEARN-COLORS.jpg'));
  /* B: RED BLUE YELLOW - the name sits ON each colour orb */
  await shot(page(scene(1280, 720, world('c_blue') + orb(440, 480, 230, HEX.red) + orb(960, 480, 230, HEX.blue) + orb(1480, 480, 230, HEX.yellow) + actor('bloop', 960, 1075, 1.2, { cls: 'wow' })
    + STROKE('RED', 440, 500, 150, '#fff', -4) + STROKE('BLUE', 960, 500, 150, '#fff', 0) + STROKE('YELLOW', 1480, 500, 105, '#fff', 4)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_B_RED-BLUE-YELLOW.jpg'));
  /* C: THE COLOR TRAIN - title left, balloons and rainbow right */
  await shot(page(scene(1280, 720, world('c_green') + rainbow(1280, 800, 560, 62) + [0, 1, 2, 3, 4, 5].map((i) => obj('balloon', 900 + i * 125, 300 + (i % 2) * 90, .85, HX[i], (i - 2) * 6)).join('') + actor('kiko', 1660, 1075, 1.6, { cls: 'hp', arms: [-150, 150] })
    + STROKE('COLOR', 480, 420, 280, '#FFE14D', -4) + STROKE('TRAIN!', 500, 700, 280, '#fff', -4)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_C_COLOR-TRAIN.jpg'));
  await b.close(); fs.rmSync(path.join(OUT, '_tmp.html'), { force: true }); console.log('thumbnails written to', OUT);
})();
