// node make_thumbs.cjs <outDir>  -> 3 YouTube thumbnails (1280x720) for LEARN #4 "The Shape Workshop"
// design rules: 2-3 words of huge text, big expressive faces with OPEN mouths, one curiosity hook ("WHAT SHAPE?"), strong contrast, readable at phone size
const puppeteer = require('../../../node_modules/puppeteer'); const fs = require('fs'), path = require('path');
global.window = global; global.SONG = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/song.json'), 'utf8'));
require('./kv_chars.js'); require('./kv_worlds.js'); require('./edu_worlds.js'); require('./edu_objects.js'); require('./color_objects.js'); require('./color_worlds.js'); require('./shape_art.js'); require('./kv_logo.js');
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
const shape = (kind, x, y, s, rot = 0, talk = true) => `<g class="${talk ? 'talk' : ''}" transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><ellipse cx="0" cy="${kind === 'triangle' ? 104 : 120}" rx="96" ry="13" fill="rgba(36,27,94,.25)"/>${O.draw('sh_' + kind)}</g>`;
const plain = (kind, x, y, s, rot = 0, col) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">${O.drawPlain(kind, col)}</g>`;
const silhouette = (kind, x, y, s, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><g style="filter:brightness(0) invert(1)" transform="scale(1.07)">${O.drawPlain(kind)}</g><g style="filter:brightness(0)">${O.drawPlain(kind)}</g></g>`;
const scene = (w, h, inner) => `<svg viewBox="0 0 1920 1080" width="${w}" height="${h}" style="position:absolute;left:0;top:0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
const logoSmall = `<div style="position:absolute;right:30px;top:20px;transform-origin:top right;transform:scale(.62)">${KVLogo.html(78)}</div>`;

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'], timeout: 240000, protocolTimeout: 240000 });
  const shot = async (html, w, h, file) => { const p = await b.newPage(); await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 }); const tmp = path.join(OUT, '_tmp.html'); fs.writeFileSync(tmp, html); await p.goto('file:///' + slash(tmp)); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 400));
    await p.screenshot({ path: file, type: 'jpeg', quality: 92 }); await p.close(); };
  /* A: LEARN SHAPES! - big title left, five cheerful shapes with open mouths right */
  await shot(page(scene(1280, 720, world('numland') + shape('circle', 1330, 330, 1.35, -6) + shape('triangle', 1700, 360, 1.3, 8) + shape('star', 1500, 760, 1.2, 4) + shape('heart', 1170, 800, 1.0, -8) + shape('square', 1780, 790, 1.0, 6)
    + STROKE('LEARN', 480, 400, 260, '#FFE14D', -3) + STROKE('SHAPES!', 520, 690, 260, '#fff', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_A_LEARN-SHAPES.jpg'));
  /* B: WHAT SHAPE? - the mystery silhouette (curiosity hook) next to Gizmo */
  await shot(page(scene(1280, 720, world('workshop') + silhouette('triangle', 1370, 470, 2.0, 4) + STROKE('?', 1370, 600, 330, '#FFE14D', 4, 'middle', 46) + actor('gizmo', 1800, 1080, 1.25, { cls: 'wow' })
    + STROKE('WHAT', 440, 330, 230, '#fff', -3) + STROKE('SHAPE?', 480, 640, 260, '#FFE14D', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_B_WHAT-SHAPE.jpg'));
  /* C: BUILD A HOUSE - the finished house made of shapes with the crew */
  await shot(page(scene(1280, 720, world('hills') + plain('square', 1400, 760, 1.5) + plain('triangle', 1400, 488, 1.45) + plain('rectangle', 1400, 830, .62, 90) + plain('circle', 1290, 720, .36) + plain('star', 1400, 340, .55) + plain('heart', 1500, 720, .3) + plain('diamond', 1660, 400, .5)
    + actor('luma', 1030, 1085, 1.15, { cls: 'hp', arms: [25, -150], flip: true }) + actor('kiko', 1740, 1085, 1.2, { cls: 'hp', arms: [-150, 25] })
    + STROKE('BUILD A', 470, 400, 230, '#FFE14D', -3) + STROKE('HOUSE!', 500, 690, 260, '#fff', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_C_BUILD-A-HOUSE.jpg'));
  await b.close(); fs.rmSync(path.join(OUT, '_tmp.html'), { force: true }); console.log('thumbnails written to', OUT);
})();
