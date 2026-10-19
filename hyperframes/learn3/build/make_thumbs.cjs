// node make_thumbs.cjs <outDir>  -> 3 YouTube thumbnails (1280x720) for LEARN #3 "Animal Sounds Dance Party"
// design rules: 2-3 words of huge text, big expressive faces with OPEN mouths, one curiosity hook ("WHO SAYS MOO?"), strong contrast, readable at phone size
const puppeteer = require('../../../node_modules/puppeteer'); const fs = require('fs'), path = require('path');
global.window = global; global.SONG = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/song.json'), 'utf8'));
require('./kv_chars.js'); require('./kv_worlds.js'); require('./edu_worlds.js'); require('./edu_objects.js'); require('./color_objects.js'); require('./color_worlds.js'); require('./animal_art.js'); require('./kv_logo.js');
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
const head = (kind, x, y, s, rot = 0, talk = true) => `<g class="${talk ? 'talk' : ''}" transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><ellipse cx="0" cy="118" rx="96" ry="13" fill="rgba(36,27,94,.25)"/>${O.draw(kind)}</g>`;
const silhouette = (kind, x, y, s, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><g style="filter:brightness(0) invert(1)" transform="scale(1.07)">${O.draw(kind)}</g><g style="filter:brightness(0)">${O.draw(kind)}</g></g>`;
const scene = (w, h, inner) => `<svg viewBox="0 0 1920 1080" width="${w}" height="${h}" style="position:absolute;left:0;top:0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
const logoSmall = `<div style="position:absolute;right:30px;top:20px;transform-origin:top right;transform:scale(.62)">${KVLogo.html(78)}</div>`;
const note = (x, y, s, col, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><ellipse cx="-14" cy="46" rx="26" ry="19" fill="${col}" stroke="#2B1B5E" stroke-width="9" transform="rotate(-20 -14 46)"/><path d="M8,40 L8,-48 Q36,-30 50,-6" fill="none" stroke="#2B1B5E" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M8,40 L8,-48 Q36,-30 50,-6" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g>`;

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'], timeout: 240000, protocolTimeout: 240000 });
  const shot = async (html, w, h, file) => { const p = await b.newPage(); await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 }); const tmp = path.join(OUT, '_tmp.html'); fs.writeFileSync(tmp, html); await p.goto('file:///' + slash(tmp)); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 400));
    await p.screenshot({ path: file, type: 'jpeg', quality: 92 }); await p.close(); };
  /* A: ANIMAL SOUNDS! - big title left, cow / duck / pig shouting their sound right */
  await shot(page(scene(1280, 720, world('c_green') + note(1120, 90, .9, '#FFE14D', -12) + note(1850, 520, .9, '#fff', 14)
    + head('cow', 1480, 340, 1.6, -4) + head('pig', 1250, 800, 1.35, -6) + head('duck', 1730, 790, 1.4, 6)
    + STROKE('ANIMAL', 480, 400, 250, '#FFE14D', -3) + STROKE('SOUNDS!', 530, 690, 250, '#fff', -3)
    + STROKE('MOO!', 1255, 235, 96, '#fff', -8) + STROKE('OINK!', 1040, 960, 84, '#FFD1DC', -6) + STROKE('QUACK!', 1730, 990, 78, '#FFF1A8', 4)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_A_ANIMAL-SOUNDS.jpg'));
  /* B: WHO SAYS MOO? - the mystery silhouette (curiosity hook) */
  await shot(page(scene(1280, 720, world('c_purple') + silhouette('cow', 1490, 540, 2.5, 5)
    + STROKE('?', 1490, 640, 380, '#FFE14D', 5, 'middle', 52) 
    + STROKE('WHO SAYS', 585, 360, 200, '#fff', -3) + STROKE('MOO?', 520, 690, 330, '#FFE14D', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_B_WHO-SAYS-MOO.jpg'));
  /* C: ANIMAL DANCE PARTY - the crew dances with the lion and the cat */
  await shot(page(scene(1280, 720, world('c_orange') + note(900, 120, 1.0, '#FFE14D', -12) + note(1000, 560, .8, '#fff', 10)
    + head('lion', 1500, 250, 1.55, -4) + head('cat', 1830, 640, 1.0, 8)
    + actor('luma', 1290, 1085, 1.32, { cls: 'hp', arms: [25, -150], flip: true }) + actor('kiko', 1640, 1085, 1.36, { cls: 'hp', arms: [-150, 25] })
    + STROKE('ANIMAL', 480, 400, 250, '#FFE14D', -3) + STROKE('DANCE!', 510, 690, 290, '#fff', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_C_ANIMAL-DANCE.jpg'));
  await b.close(); fs.rmSync(path.join(OUT, '_tmp.html'), { force: true }); console.log('thumbnails written to', OUT);
})();
