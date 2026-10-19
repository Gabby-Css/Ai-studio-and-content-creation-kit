// node export_assets.cjs <outDir>  -> logos, characters, cards, thumbnails, banner, avatar (PNG/JPG/SVG) + bible images
const puppeteer = require('../../../node_modules/puppeteer'); const fs = require('fs'), path = require('path');
global.window = global; global.SONG = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/song.json'), 'utf8'));
require('./kv_chars.js'); require('./kv_worlds.js'); require('./kv_logo.js');
const KV = global.KV, KVW = global.KVW, KVLogo = global.KVLogo;
const OUT = path.resolve(process.argv[2] || path.join(__dirname, '../deliver/assets_out')); const mk = (...p) => { const d = path.join(OUT, ...p); fs.mkdirSync(d, { recursive: true }); return d; };
const slash = (s) => s.split('\\').join('/'); const FONTS = slash(path.resolve(__dirname, '../assets/fonts'));
const CSS = `@font-face{font-family:Fredoka;src:url('file:///${FONTS}/fredoka-latin-700-normal.woff2');font-weight:700}@font-face{font-family:'Baloo 2';src:url('file:///${FONTS}/baloo-2-latin-800-normal.woff2');font-weight:800}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Fredoka;font-weight:700}
.logo{display:flex;align-items:center;gap:calc(var(--fs)*.1);font-size:var(--fs);line-height:1}.logo .planet{width:calc(var(--fs)*1.6);height:calc(var(--fs)*1.6);overflow:visible;margin-right:calc(var(--fs)*.04)}
.logo .lw b{display:inline-block;font-weight:700;-webkit-text-stroke:calc(var(--fs)*.13) #2B1B5E;paint-order:stroke fill;text-shadow:0 calc(var(--fs)*.07) 0 rgba(43,27,94,.55);letter-spacing:calc(var(--fs)*.01)}
.hp .m-smile{opacity:0}.hp .m-open{opacity:1!important}.hp .ep-open{opacity:0}.hp .ep-happy{opacity:1!important}.wow .m-smile{opacity:0}.wow .m-wide{opacity:1!important}.wow .ep-open{opacity:0}.wow .ep-wide{opacity:1!important}`;
const defs = `<svg width="0" height="0" style="position:absolute"><defs>${KV.DEFS}${KVW.DEFS}</defs></svg>`;
const page = (body, w, h, bg = 'transparent') => `<!doctype html><meta charset="utf-8"><style>${CSS}html,body{width:${w}px;height:${h}px;background:${bg};overflow:hidden}</style>${defs}${body}`;
const STROKE = (t, x, y, size, fill, rot = 0, anchor = 'middle', sw) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Fredoka" font-weight="700" font-size="${size}" fill="${fill}" stroke="#2B1B5E" stroke-width="${sw || size * .17}" stroke-linejoin="round" paint-order="stroke" transform="rotate(${rot} ${x} ${y})">${t}</text>`;
const world = (n, layers = ['far', 'mid', 'ground', 'fg']) => layers.map((l) => `<g>${KVW.WORLDS[n][l]}</g>`).join('');
const pose = (svg, o = {}) => { let s = svg; if (o.arms) s = s.replace('class="armL"', `class="armL" transform="rotate(${o.arms[0]})"`).replace('class="armR"', `class="armR" transform="rotate(${o.arms[1]})"`); return s; };
const actor = (c, x, y, s, o = {}) => `<g class="${o.cls || ''}" transform="translate(${x},${y}) scale(${o.flip ? -s : s},${s})">${pose(o.pass ? KV.draw(c).replace('<g class="pass"></g>', `<g class="pass">${o.pass.map((p, i) => `<g transform="translate(${[-198, -86, 26][i]},-83) scale(.3)">${KV.draw(p)}</g>`).join('')}</g>`) : KV.draw(c), o)}</g>`;
const scene = (w, h, inner) => `<svg viewBox="0 0 1920 1080" width="${w}" height="${h}" style="position:absolute;left:0;top:0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'] });
  const shot = async (html, w, h, file, o = {}) => { const p = await b.newPage(); await p.setViewport({ width: w, height: h, deviceScaleFactor: o.dsf || 1 }); const tmp = path.join(OUT, '_tmp.html'); fs.writeFileSync(tmp, html); await p.goto('file:///' + slash(tmp)); await p.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 350));
    const opts = { path: file, omitBackground: !!o.transparent, type: /\.jpg$/.test(file) ? 'jpeg' : 'png' }; if (opts.type === 'jpeg') opts.quality = 92; if (o.clip) opts.clip = o.clip; if (o.el) { const el = await p.$(o.el); await el.screenshot(opts); } else await p.screenshot(opts); await p.close(); };

  /* ---------- logos ---------- */
  const L = mk('Logo');
  await shot(page(`<div id="e" style="display:inline-block;padding:40px">${KVLogo.html(260)}</div>`, 2600, 900), 2600, 900, path.join(L, 'KiddoVerse_logo_transparent.png'), { transparent: true, el: '#e' });
  await shot(page(`<div id="e" style="display:inline-block;padding:70px;background:linear-gradient(160deg,#2B1B5E,#6C4CF1);border-radius:60px">${KVLogo.html(260)}</div>`, 2600, 900, '#ffffff'), 2600, 900, path.join(L, 'KiddoVerse_logo_on_violet.png'), { el: '#e' });
  await shot(page(`<div id="e" style="display:inline-block;padding:70px;background:#fff;border-radius:60px">${KVLogo.html(260)}</div>`, 2600, 900, '#ddd'), 2600, 900, path.join(L, 'KiddoVerse_logo_on_white.png'), { el: '#e' });
  await shot(page(`<div id="e" style="width:1024px;height:1024px;display:flex;align-items:center;justify-content:center"><div style="--fs:600px;font-size:600px">${KVLogo.planet().replace('class="planet"', 'class="planet" style="width:1000px;height:1000px"')}</div></div>`, 1024, 1024), 1024, 1024, path.join(L, 'KiddoVerse_icon_planet.png'), { transparent: true });
  await shot(page(`<div style="width:800px;height:800px;background:radial-gradient(circle at 35% 30%,#8E6BFF,#2B1B5E);display:flex;align-items:center;justify-content:center">${KVLogo.planet().replace('class="planet"', 'class="planet" style="width:640px;height:640px"')}</div>`, 800, 800), 800, 800, path.join(L, 'KiddoVerse_avatar_800.png'));
  fs.mkdirSync(path.join(OUT, '_bible'), { recursive: true }); fs.copyFileSync(path.join(L, 'KiddoVerse_logo_transparent.png'), path.join(OUT, '_bible', 'logo_full.png')); fs.copyFileSync(path.join(L, 'KiddoVerse_icon_planet.png'), path.join(OUT, '_bible', 'logo_icon.png'));

  /* ---------- characters ---------- */
  const C = mk('Characters'); const ids = Object.keys(KV.CHARS);
  for (const id of ids) {
    const c = KV.CHARS[id], w = c.w + 160, h = c.h + 220;
    for (const [tag, cls] of [['default', ''], ['singing', 'hp'], ['wow', 'wow']]) {
      await shot(page(`<svg viewBox="${-w / 2} ${-h + 80} ${w} ${h}" width="${w * 2}" height="${h * 2}" class="${cls}">${KV.draw(id)}</svg>`, w * 2, h * 2), w * 2, h * 2, path.join(C, `${c.name.replace(/ /g, '_')}_${tag}.png`), { transparent: true });
    }
    fs.copyFileSync(path.join(C, `${c.name}_default.png`), path.join(OUT, '_bible', id + '.png'));
    const lines = { kiko: '“Adventure o’clock!”', luma: '“Sing it with me!”', bloop: '“Bloop bloop!”', rumble: '“Stomp stomp, hooray!”', gizmo: '“Calculating… FUN!”', nimbus: '“It’s okay to feel!”', zoom: '“Beep beep, all aboard!”' };
    const cw = 1080, chh = 1350, sc = id === 'zoom' ? 1.15 : id === 'bloop' ? 2.4 : id === 'rumble' ? 1.65 : 1.6;
    await shot(page(`<div style="position:relative;width:${cw}px;height:${chh}px;background:linear-gradient(160deg,${c.bg[0]},${c.bg[1]});overflow:hidden"><div style="position:absolute;left:-120px;top:-100px;width:520px;height:520px;border-radius:50%;background:rgba(255,255,255,.35)"></div><div style="position:absolute;right:-90px;top:380px;width:380px;height:380px;border-radius:50%;background:rgba(255,255,255,.3)"></div>${scene(cw, chh, '').replace('viewBox="0 0 1920 1080"', 'viewBox="0 0 1080 1350"')}<svg viewBox="0 0 1080 1350" width="1080" height="1350" style="position:absolute;left:0;top:0"><g transform="translate(540,1010) scale(${sc})" class="hp">${KV.draw(id)}</g></svg><div style="position:absolute;left:0;right:0;top:50px;text-align:center"><div style="display:inline-block;transform:scale(.55)">${KVLogo.html(78)}</div></div><div style="position:absolute;left:0;right:0;bottom:92px;text-align:center;font-size:104px;color:#fff;-webkit-text-stroke:18px #2B1B5E;paint-order:stroke fill;text-shadow:0 8px 0 rgba(43,27,94,.4)">${c.name}</div><div style="position:absolute;left:0;right:0;bottom:36px;text-align:center;font:800 40px 'Baloo 2';color:#2B1B5E">${lines[id]}</div></div>`, cw, chh), cw, chh, path.join(mk('Character_Cards'), `${c.name.replace(/ /g, '_')}_card.png`));
  }

  /* ---------- crew poster ---------- */
  const order = ['kiko', 'luma', 'bloop', 'rumble', 'gizmo', 'nimbus'], xs = [330, 620, 905, 1195, 1490, 1780];
  const crew = order.map((c, i) => actor(c, xs[i] - 40 + (c === 'rumble' ? 10 : 0), 900, .96, { cls: 'hp' })).join('') + actor('zoom', 960, 1010, .0001);
  await shot(page(scene(3840, 2160, world('hub') + crew) + `<div style="position:absolute;left:0;right:0;top:140px;display:flex;justify-content:center">${KVLogo.html(250)}</div><div style="position:absolute;left:0;right:0;bottom:70px;text-align:center;font:800 70px 'Baloo 2';letter-spacing:14px;color:#fff;-webkit-text-stroke:14px #2B1B5E;paint-order:stroke fill">MEET THE CREW</div>`, 3840, 2160), 3840, 2160, path.join(mk('Posters'), 'KiddoVerse_Crew_Poster_4K.png'));

  /* ---------- thumbnails (1280x720) ---------- */
  const T = mk('Thumbnails'); const badge = (x, y, n, col) => `<g transform="translate(${x},${y})"><circle r="60" fill="${col}" stroke="#2B1B5E" stroke-width="9"/>${STROKE(n, 0, 24, 78, '#fff', 0, 'middle', 12)}</g>`;
  const egg = (x, y, col, n) => `<g transform="translate(${x},${y})"><path d="M0,-124 C-40,-120 -62,-70 -62,-6 C-62,20 -34,44 0,44 C34,44 62,20 62,-6 C62,-70 40,-120 0,-124Z" fill="#FFF6DC" stroke="#2B1B5E" stroke-width="7"/><circle cx="-24" cy="-70" r="11" fill="${col}"/><circle cx="24" cy="-84" r="9" fill="${col}"/><circle cx="30" cy="-48" r="8" fill="${col}"/></g>${badge(x, y - 170, n, col)}`;
  const logoSmall = `<div style="position:absolute;right:30px;top:20px;transform-origin:top right;transform:scale(.62)">${KVLogo.html(78)}</div>`;
  await shot(page(scene(1280, 720, world('space', ['far', 'mid']) + actor('zoom', 640, 980, 1.05, { pass: ['kiko', 'luma', 'bloop'] }) + actor('kiko', 1500, 1040, 1.75, { cls: 'hp', arms: [-150, 20] }) + actor('luma', 1240, 1060, 1.35, { cls: 'hp' }) + STROKE('ZOOM', 520, 330, 260, '#FFE14D', -5) + STROKE('ZOOM!', 560, 560, 260, '#fff', -5)) + logoSmall, 1280, 720), 1280, 720, path.join(T, 'Thumb_A_ZOOM-ZOOM.jpg'));
  await shot(page(scene(1280, 720, world('dino') + actor('rumble', 470, 1050, 2.0, { cls: 'wow' }) + [0, 1, 2, 3, 4].map((i) => egg(930 + i * 150, 980, ['#7ED957', '#FFB84D', '#4CC9F0', '#FF9BD0', '#B06BFF'][i], i + 1)).join('') + STROKE('COUNT', 1250, 330, 230, '#FFE14D', -4) + STROKE('TO 5!', 1230, 520, 230, '#fff', -4)) + logoSmall, 1280, 720), 1280, 720, path.join(T, 'Thumb_B_COUNT-TO-5.jpg'));
  await shot(page(scene(1280, 720, world('disco') + actor('luma', 1240, 1010, 1.2, { cls: 'hp', arms: [-150, 150] }) + actor('bloop', 1580, 1010, 1.0, { cls: 'hp' }) + actor('kiko', 800, 1050, 1.9, { cls: 'hp', arms: [-155, 40] }) + STROKE('WIGGLE', 480, 330, 230, '#FFE14D', -5) + STROKE('TIME!', 460, 540, 230, '#fff', -5)) + logoSmall, 1280, 720), 1280, 720, path.join(T, 'Thumb_C_WIGGLE-TIME.jpg'));

  /* ---------- channel banner 2560x1440 (safe area = centre 1546x423) ---------- */
  await shot(page(scene(2560, 1440, world('hub') + [['kiko', 170, .72], ['luma', 470, .72], ['bloop', 770, .6], ['rumble', 1150, .74], ['gizmo', 1450, .72], ['nimbus', 1750, .7]].map(([c, x, s]) => actor(c, x, 1010, s, { cls: 'hp' })).join('')) + `<div style="position:absolute;left:0;right:0;top:440px;display:flex;justify-content:center">${KVLogo.html(212)}</div><div style="position:absolute;left:0;right:0;top:748px;text-align:center;font:800 62px 'Baloo 2';letter-spacing:12px;color:#fff;-webkit-text-stroke:13px #2B1B5E;paint-order:stroke fill">SONGS · STORIES · ADVENTURES</div>`, 2560, 1440), 2560, 1440, path.join(mk('Channel_Art'), 'YouTube_Banner_2560x1440.png'));

  await b.close(); console.log('assets written to', OUT);
})();
