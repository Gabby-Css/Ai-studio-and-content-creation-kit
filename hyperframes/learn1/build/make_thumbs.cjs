// node make_thumbs.cjs <outDir>  -> 3 YouTube thumbnails (1280x720) + 1 square avatar for the LEARN video
const puppeteer = require('../../../node_modules/puppeteer'); const fs = require('fs'), path = require('path');
global.window = global; global.SONG = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/song.json'), 'utf8'));
require('./kv_chars.js'); require('./kv_worlds.js'); require('./edu_worlds.js'); require('./edu_objects.js'); require('./kv_logo.js');
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
  /* A: ABC 123 */
  await shot(page(scene(1280, 720, world('abc') + obj('apple', 1180, 560, 1.5, null, -8) + obj('ball', 1560, 760, 1.0, null, 10) + tile('A', 760, 760, PAL[0], .8, -6) + actor('kiko', 1500, 1060, 1.7, { cls: 'hp', arms: [-150, 25] })
    + STROKE('ABC', 500, 380, 330, '#FFE14D', -5) + STROKE('123', 520, 690, 330, '#fff', -5)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_A_ABC-123.jpg'));
  /* B: COUNT TO 10 */
  await shot(page(scene(1280, 720, world('numland') + [0, 1, 2, 3, 4].map((i) => obj('balloon', 1030 + i * 150, 330 + (i % 2) * 90, .95, PAL[i % 6], (i - 2) * 5)).join('') + actor('luma', 1400, 1060, 1.5, { cls: 'hp', arms: [-150, 150] }) + actor('bloop', 1030, 1040, 1.7, { cls: 'wow' })
    + STROKE('COUNT', 470, 330, 270, '#FFE14D', -4) + STROKE('TO 10!', 480, 590, 270, '#fff', -4)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_B_COUNT-TO-10.jpg'));
  /* C: LEARN TO READ */
  await shot(page(scene(1280, 720, world('workshop') + tile('u', 1330, 430, PAL[0], 1.3, -7) + tile('p', 1640, 470, PAL[2], 1.3, 6) + actor('gizmo', 1560, 1070, 1.35, { cls: 'wow' }) + actor('kiko', 1240, 1070, 1.15, { cls: 'hp', arms: [-150, 20] })
    + STROKE('READ', 450, 360, 280, '#FFE14D', -4) + STROKE('WORDS!', 470, 610, 225, '#fff', -4)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_C_READ-WORDS.jpg'));
  await b.close(); fs.rmSync(path.join(OUT, '_tmp.html'), { force: true }); console.log('thumbnails written to', OUT);
})();
