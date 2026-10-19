'use strict';
/* Cartoon cast generator — every character is drawn in code (original art, no stock, no AI service).
   svgFor(character, expression) -> full <svg>.  Expressions: happy | shocked | sad | love */

const OL = '#2b1a14', MW = '#7B1E2C', TG = '#FF8FA0';
const st = (w) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const E = (cx, cy, rx, ry, fill, w = 7, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${w ? st(w) : ''} ${x}/>`;
const P = (d, fill, w = 7, x = '') => `<path d="${d}" fill="${fill}" ${w ? st(w) : ''} ${x}/>`;
const L = (d, w = 7, c = OL) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const RC = (x, y, w, h, r, fill, sw = 7) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${sw ? st(sw) : ''}/>`;
const G = (t, inner) => `<g transform="${t}">${inner}</g>`;
const sides = (f) => f(-1) + f(1);
const HEART = 'M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z';
const CIRC = (cx, cy, r, fill, w = 7) => E(cx, cy, r, r, fill, w);

/* ---------- face: eyes, brows, nose, mouth, blush, tears ---------- */
function face(h, fcfg, ex) {
  const f = Object.assign({ dx: 72, dy: -12, s: 1, mdy: 62, ms: 1, mw: 1, nose: 'oval', ndy: 28, nc: OL, nw: 38, blush: true, brows: true, mouth: true, cyclops: false, teeth: false, eyeCol: '#fff' }, fcfg || {});
  const cx = h.cx, cy = h.cy, ey = cy + f.dy, s = f.s;
  let o = '';
  const eye = (x, y, k, side) => {
    if (ex === 'love') return G(`translate(${x},${y}) scale(${k * 1.9})`, P(HEART, '#FF3D6E', 2.4));
    const rx = (ex === 'shocked' ? 46 : ex === 'sad' ? 39 : 41) * k, ry = (ex === 'shocked' ? 56 : ex === 'sad' ? 44 : 49) * k;
    const pr = (ex === 'shocked' ? 13 : 23) * k, py = (ex === 'sad' ? -9 : ex === 'happy' ? 2 : 0) * k;
    let r = E(x, y, rx, ry, f.eyeCol, 6) + E(x, y + py, pr, pr, OL, 0) + `<circle cx="${x - 7 * k}" cy="${y + py - 9 * k}" r="${(ex === 'shocked' ? 5 : 8) * k}" fill="#fff"/>`;
    if (ex === 'sad') r += G(`translate(${x + side * 22 * k},${y + ry - 4 * k})`, P('M0,-4 C10,12 14,22 0,30 C-14,22 -10,12 0,-4Z', '#8AD7FF', 4));
    return r;
  };
  const brow = (x, y, k, side) => {
    const w = 32 * k; let d;
    if (ex === 'shocked') d = `M${x - w},${y - 14 * k} Q${x},${y - 34 * k} ${x + w},${y - 14 * k}`;
    else if (ex === 'sad') d = side < 0 ? `M${x - w},${y + 8 * k} Q${x},${y - 4 * k} ${x + w},${y - 16 * k}` : `M${x - w},${y - 16 * k} Q${x},${y - 4 * k} ${x + w},${y + 8 * k}`;
    else d = `M${x - w},${y + 2 * k} Q${x},${y - 14 * k} ${x + w},${y + 2 * k}`;
    return L(d, 9 * k);
  };
  if (f.cyclops) o += eye(cx, ey, s * 1.75, 0);
  else o += sides((sd) => eye(cx + sd * f.dx, ey, s, sd));
  if (f.brows && !f.cyclops && ex !== 'love') o += sides((sd) => brow(cx + sd * f.dx, ey - 64 * s, s, sd));
  if (f.nose === 'oval') o += E(cx, cy + f.ndy, 24, 16, f.nc, 0) + `<circle cx="${cx - 8}" cy="${cy + f.ndy - 5}" r="5" fill="#fff"/>`;
  if (f.nose === 'tri') o += P(`M${cx - 20},${cy + f.ndy - 8} Q${cx},${cy + f.ndy - 14} ${cx + 20},${cy + f.ndy - 8} Q${cx},${cy + f.ndy + 18} ${cx - 20},${cy + f.ndy - 8}Z`, f.nc === OL ? '#FF8FA0' : f.nc, 5);
  if (f.nose === 'big') o += E(cx, cy + f.ndy, f.nw, f.nw * .68, f.nc, 0) + `<ellipse cx="${cx - f.nw * .35}" cy="${cy + f.ndy - f.nw * .25}" rx="${f.nw * .22}" ry="${f.nw * .13}" fill="#fff" opacity=".85"/>`;
  if (f.mouth) {
    const my = cy + f.mdy, m = f.ms, mw = f.mw, mx = (v) => cx + v * mw * m;
    if (ex === 'happy' || ex === 'love') {
      o += P(`M${mx(-44)},${my - 4 * m} Q${cx},${my - 12 * m} ${mx(44)},${my - 4 * m} Q${mx(40)},${my + 46 * m} ${cx},${my + 52 * m} Q${mx(-40)},${my + 46 * m} ${mx(-44)},${my - 4 * m}Z`, MW, 6);
      o += E(cx, my + 36 * m, 22 * mw * m, 11 * m, TG, 0);
      if (f.teeth) o += RC(cx - 26 * m, my - 7 * m, 22 * m, 18 * m, 3, '#fff', 3) + RC(cx + 4 * m, my - 7 * m, 22 * m, 18 * m, 3, '#fff', 3);
    } else if (ex === 'shocked') o += E(cx, my + 18 * m, 26 * m * Math.min(mw, 1.4), 34 * m, MW, 6);
    else o += L(`M${mx(-36)},${my + 24 * m} Q${cx},${my - 10 * m} ${mx(36)},${my + 24 * m}`, 7);
  }
  if (f.blush) o += sides((sd) => E(cx + sd * (f.dx + 40 * s), ey + 38 * s, (ex === 'love' ? 28 : 22) * s, 12 * s, '#FF7A7A', 0, `opacity="${ex === 'love' ? .6 : .42}"`));
  if (ex === 'shocked') o += G(`translate(${cx + f.dx + 70 * s},${ey - 50 * s})`, P('M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z', '#8AD7FF', 4));
  return o;
}

/* ---------- bird beak that opens with the expression ---------- */
function beak(x, y, w, color, ex) {
  const oa = { happy: .25, love: .3, shocked: .75, sad: 0 }[ex];
  let o = '';
  if (oa > 0) o += E(x, y + 10 + oa * w * .2, w * .7, oa * w * .35 + 5, MW, 0);
  o += P(`M${x - w * .85},${y + 8} Q${x},${y + 8 + oa * w * .7 + w * .32} ${x + w * .85},${y + 8}Z`, color, 6);
  o += P(`M${x - w},${y} Q${x},${y - w * .55} ${x + w},${y} Q${x},${y + w * .3} ${x - w},${y}Z`, color, 6);
  return o;
}

/* ---------- shared animal template ---------- */
const BASE = { head: { cx: 500, cy: 500, rx: 190, ry: 150 }, body: { cx: 500, cy: 850, rx: 150, ry: 175 } };
function animal(C, ex) {
  const h = Object.assign({}, BASE.head, C.head || {}), b = Object.assign({}, BASE.body, C.body || {});
  let o = E(500, 1068, 230, 28, 'rgba(60,30,10,.2)', 0);
  if (C.back) o += C.back(C, h, b);
  o += sides((s) => E(500 + s * 88, 1030, 62, 30, C.dark));
  o += E(b.cx, b.cy, b.rx, b.ry, C.main);
  if (C.belly) o += E(b.cx, b.cy + 22, b.rx * (C.bellyS || .62), b.ry * (C.bellyS ? C.bellyS * 1.08 : .68), C.belly, 0);
  if (C.bodyDeco) o += C.bodyDeco(C, h, b);
  o += sides((s) => G(`rotate(${-s * 14} ${500 + s * (b.rx - 12)} 770)`, E(500 + s * (b.rx + 2), 835, 34, 76, C.armC || C.main) + E(500 + s * (b.rx + 2), 905, 32, 28, C.handC || C.dark)));
  if (C.pre) o += C.pre(C, h, b);
  o += E(h.cx, h.cy, h.rx, h.ry, C.headC || C.main);
  if (C.deco) o += C.deco(C, h, b, ex);
  if (C.neck) o += C.neck(C, h, b);
  o += face(h, C.face, ex);
  if (C.top) o += C.top(C, h, b, ex);
  return o;
}

/* ---------- reusable pieces ---------- */
const foxEar = (main, inner, tip) => `${P('M-60,8 Q-100,-100 -42,-150 Q22,-104 46,2 Z', main)}${P('M-38,-4 Q-62,-78 -40,-108 Q-2,-80 12,-6 Z', inner, 0)}${P('M-74,-100 Q-60,-132 -42,-150 Q-20,-130 -8,-104 Q-38,-122 -74,-100Z', tip, 0)}`;
const roundEars = (main, inner, dx, y, r, ir) => sides((s) => CIRC(500 + s * dx, y, r, main) + (inner ? CIRC(500 + s * dx, y + 3, ir, inner, 0) : ''));
const bow = (x, y, c, k = 1) => G(`translate(${x},${y}) scale(${k})`, P('M0,0 L-58,-34 L-58,34Z', c, 6) + P('M0,0 L58,-34 L58,34Z', c, 6) + CIRC(0, 0, 15, c, 6));
const stripes = (cx, y, c = OL) => L(`M${cx},${y} L${cx},${y + 42}`, 10, c) + L(`M${cx - 46},${y + 10} L${cx - 38},${y + 46}`, 10, c) + L(`M${cx + 46},${y + 10} L${cx + 38},${y + 46}`, 10, c);

/* ====================================================================== CAST ====================================================================== */
const CAST = [];
const add = (id, name, species, vibe, line, bg, draw) => CAST.push({ id, name, species, vibe, line, bg, draw });

// 1 — Bo the Fox (the hero from video #1)
add('bo', 'Bo the Fox', 'Fox', 'Curious, a bit greedy, always up to something. The hero of the very first video.', '"Just one tiny bite!"', ['#FFE6BE', '#FFB874'], (ex) => animal({
  main: '#F58A2B', dark: '#7A3E1D', belly: '#FFEBCB',
  back: () => G('translate(398,905) scale(1.3)', P('M0,20 C-60,50 -150,10 -170,-70 C-185,-130 -140,-200 -85,-215 C-100,-160 -80,-110 -30,-80 C0,-62 20,-30 0,20Z', '#F58A2B') + P('M-170,-70 C-185,-130 -140,-200 -85,-215 C-95,-185 -118,-165 -140,-150 C-160,-130 -172,-100 -170,-70Z', '#FFEBCB')),
  pre: () => sides((s) => G(`translate(${500 + s * 108},398) scale(${-s * 1.2},1.2)`, foxEar('#F58A2B', '#FFC8A2', '#7A3E1D'))),
  deco: (C, h) => E(h.cx - 88, h.cy + 50, 78, 54, '#FFEBCB', 0) + E(h.cx + 88, h.cy + 50, 78, 54, '#FFEBCB', 0) + E(h.cx, h.cy + 44, 92, 58, '#FFEBCB', 0),
  neck: () => E(500, 668, 150, 34, '#2EBE85') + `<g fill="#FFEBCB" opacity=".9">${[-90, -35, 35, 90].map((x) => E(500 + x, 676 - Math.abs(x) * .05, 9, 14, '#FFEBCB', 0)).join('')}</g>` + G('translate(590,690)', P('M-24,0 L40,4 Q66,70 50,140 L-16,144 Q-4,70 -24,0Z', '#2EBE85') + L('M-10,70 L52,74 M-14,110 L50,112', 9, '#FFEBCB')),
}, ex));

// 2 — Flapjack the Pancake (the villain-hero from video #1)
add('flapjack', 'Flapjack the Pancake', 'Living pancake', 'Cheeky runaway breakfast. Fast, dramatic, secretly sweet.', '"Catch me if you can!"', ['#FFF1C9', '#FFC978'], (ex) => {
  const h = { cx: 500, cy: 820 };
  return E(500, 1068, 250, 28, 'rgba(60,30,10,.2)', 0)
    + sides((s) => L(`M${500 + s * 90},960 L${500 + s * 96},1020`, 14) + E(500 + s * 100, 1034, 46, 22, '#fff', 7))
    + P('M285,700 L285,880 Q285,965 360,965 L640,965 Q715,965 715,880 L715,700Z', '#D9902F')
    + E(500, 700, 215, 62, '#F9CE72') + E(500, 700, 165, 40, '#EDB04A', 0, 'opacity=".8"')
    + E(500, 706, 125, 32, '#B35A12', 0) + P('M395,712 L395,770 Q415,790 435,770 L435,718Z M560,716 L560,790 Q582,806 604,790 L604,716Z', '#B35A12', 0)
    + RC(462, 618, 106, 62, 14, '#FFE98A', 7) + L('M480,640 L530,640', 9, '#fff')
    + sides((s) => G(`rotate(${-s * 10} ${500 + s * 215} 820)`, L(`M${500 + s * 215},820 Q${500 + s * 275},820 ${500 + s * 296},760`, 14) + CIRC(500 + s * 296, 756, 20, '#FFE3B8', 7)))
    + face(h, { dx: 78, dy: -4, s: .95, nose: 'none', mdy: 74, ms: 1.05, brows: true }, ex);
});

// 3 — Mochi the Cat
add('mochi', 'Mochi the Cat', 'Tabby cat', 'Lazy, sarcastic, secretly the smartest. Acts like she does not care.', '"Hmph. Obviously."', ['#E8F0FF', '#B7C9F0'], (ex) => animal({
  main: '#A9B4C2', dark: '#7C8796', belly: '#FFFFFF',
  back: () => P('M630,960 C770,960 810,820 750,710 C728,672 690,700 708,730 C745,800 705,880 620,880Z', '#A9B4C2'),
  pre: () => sides((s) => G(`translate(${500 + s * 110},395) scale(${-s},1)`, P('M-50,14 L60,-132 L84,14Z', '#A9B4C2') + P('M-24,2 L54,-94 L68,2Z', '#FFB6C8', 0))),
  deco: (C, h) => stripes(500, h.cy - h.ry + 8) + E(500, h.cy + 52, 72, 48, '#fff', 0) + sides((s) => L(`M${500 + s * 150},${h.cy + 30} L${500 + s * 250},${h.cy + 10}`, 5) + L(`M${500 + s * 150},${h.cy + 52} L${500 + s * 250},${h.cy + 56}`, 5)),
  neck: () => P('M388,655 Q500,705 612,655 Q500,725 388,655Z', '#E8484F', 6) + CIRC(500, 712, 24, '#FFD84A', 6) + L('M500,712 L500,728', 5),
  face: { nose: 'tri', ndy: 30, mdy: 66 },
}, ex));

// 4 — Biscuit the Dog
add('biscuit', 'Biscuit the Dog', 'Golden pup', 'Endlessly happy, loyal, a little clumsy. Loves everyone instantly.', '"Best day EVER!"', ['#FFF2D6', '#F5C67C'], (ex) => animal({
  main: '#E3A862', dark: '#8B5A2B', belly: '#FFF1D6',
  back: () => G('rotate(-30 650 950)', E(668, 944, 30, 62, '#E3A862')),
  pre: () => sides((s) => G(`rotate(${s * 18} ${500 + s * 150} 430)`, E(500 + s * 188, 505, 58, 114, '#8B5A2B'))),
  deco: (C, h) => E(580, h.cy - 12, 60, 64, '#8B5A2B', 0, 'opacity=".92"') + E(500, h.cy + 56, 96, 62, '#FFF1D6', 0),
  neck: () => P('M385,652 Q500,702 615,652 L500,785Z', '#4DA3FF', 6) + `<g fill="#fff">${[[470, 690], [530, 690], [500, 735]].map(([x, y]) => CIRC(x, y, 9, '#fff', 0)).join('')}</g>`,
  face: { nose: 'big', nw: 38, ndy: 24, nc: OL, mdy: 74, ms: .9 },
}, ex));

// 5 — Clover the Bunny
add('clover', 'Clover the Bunny', 'Bunny', 'Sweet, bubbly, always dressed cute. Gets scared easily but brave when it counts.', '"Eeek! ...okay, I am ready!"', ['#FFEAF1', '#FFB6CC'], (ex) => animal({
  main: '#FFF4F4', dark: '#FFC9D4', belly: '#FFE1E8',
  back: () => CIRC(655, 965, 40, '#fff', 7),
  pre: () => sides((s) => G(`rotate(${s * 9} ${500 + s * 75} 380)`, E(500 + s * 75, 225, 46, 168, '#FFF4F4') + E(500 + s * 75, 238, 24, 120, '#FFB6C8', 0))),
  top: () => bow(405, 372, '#FF6B9C', .8),
  face: { nose: 'oval', nc: '#FF8FA0', ndy: 24, mdy: 62, teeth: true },
}, ex));

// 6 — Barnaby the Bear
add('barnaby', 'Barnaby the Bear', 'Brown bear', 'Big, gentle, loves honey and naps. The warm-hearted friend of the group.', '"Is it snack time yet?"', ['#FFEBD3', '#E0A875'], (ex) => animal({
  main: '#B5722F', dark: '#8A4E1E', belly: '#F0CFA0',
  pre: () => roundEars('#B5722F', '#F0CFA0', 130, 372, 58, 32),
  deco: (C, h) => E(500, h.cy + 52, 92, 62, '#F0CFA0', 0),
  neck: () => G('translate(500,676)', P('M0,0 L-64,-36 L-64,36Z', '#E8484F', 6) + P('M0,0 L64,-36 L64,36Z', '#E8484F', 6) + CIRC(0, 0, 16, '#C93A40', 6)),
  face: { mdy: 70, ms: .95 },
}, ex));

// 7 — Pixel the Panda
add('pixel', 'Pixel the Panda', 'Giant panda', 'Chill gamer vibes, headphones always on. Sleepy, funny, secretly competitive.', '"One more round."', ['#E9F7EC', '#9FD8B0'], (ex) => animal({
  main: '#FFFFFF', dark: '#2b2b33', armC: '#2b2b33',
  pre: () => roundEars('#2b2b33', null, 135, 372, 58),
  deco: (C, h) => sides((s) => G(`rotate(${-s * 20} ${500 + s * 75} ${h.cy - 5})`, E(500 + s * 75, h.cy - 5, 50, 62, '#2b2b33', 0))) + E(500, h.cy + 56, 80, 52, '#fff', 0),
  top: () => L('M322,440 Q500,185 678,440', 22, OL) + L('M322,440 Q500,185 678,440', 12, '#3A3A52') + RC(298, 420, 50, 92, 20, '#4F8BFF', 7) + RC(652, 420, 50, 92, 20, '#4F8BFF', 7),
  face: { brows: false, nc: '#2b2b33', mdy: 66 },
}, ex));

// 8 — Waddles the Penguin
add('waddles', 'Waddles the Penguin', 'Penguin', 'Clumsy, cheerful, slips on everything. Never stops smiling even when falling.', '"Whoa— I am okay!"', ['#E6F4FF', '#8FC8F5'], (ex) => animal({
  main: '#2E3A59', dark: '#FF9F2E', belly: '#FFFFFF', bellyS: .8, handC: '#2E3A59',
  deco: (C, h) => E(h.cx - 62, h.cy + 24, 92, 88, '#fff', 0) + E(h.cx + 62, h.cy + 24, 92, 88, '#fff', 0) + E(h.cx, h.cy + 42, 100, 70, '#fff', 0),
  top: (C, h, b, ex) => beak(500, h.cy + 40, 36, '#FF9F2E', ex) + P('M322,432 C322,300 420,250 500,250 C580,250 678,300 678,432Z', '#E8484F') + RC(318,412,364,42,20,'#fff',7) + CIRC(500, 246, 30, '#fff', 7),
  face: { nose: 'none', mouth: false, dy: -22 },
}, ex));

// 9 — Ribbit the Frog
add('ribbit', 'Ribbit the Frog', 'Tree frog', 'Hyper, dramatic, crown-wearing prince of the pond. Jumps first, thinks later.', '"Behold, the great Ribbit!"', ['#EAF9D9', '#A5DE7B'], (ex) => animal({
  main: '#69C24E', dark: '#4E9F3A', belly: '#E6F7B8', head: { rx: 205, ry: 128, cy: 525 },
  pre: () => sides((s) => CIRC(500 + s * 105, 405, 66, '#69C24E', 7)),
  deco: (C, h) => `<g fill="#4E9F3A" opacity=".8">${[[390, 560, 14], [610, 575, 12], [455, 610, 10], [560, 470, 9]].map(([x, y, r]) => CIRC(x, y, r, '#4E9F3A', 0)).join('')}</g>`,
  top: () => P('M452,350 L448,302 L474,328 L500,296 L526,328 L552,302 L548,350Z', '#FFD84A', 6),
  face: { dx: 105, dy: -128, s: .95, nose: 'none', mdy: 28, mw: 1.9, ms: .95, brows: true },
}, ex));

// 10 — Hootie the Owl
add('hootie', 'Hootie the Owl', 'Owl', 'The "professor". Knows a fact about everything and loves sharing it.', '"Actually... let me explain."', ['#F1E8FF', '#C5A8F0'], (ex) => animal({
  main: '#A97C50', dark: '#FF9F2E', belly: '#F5DEB3', bellyS: .72, armC: '#7A5030', handC: '#7A5030', head: { rx: 200, ry: 145, cy: 505 },
  bodyDeco: () => `<g>${[0, 1, 2].map((r) => [-50, 0, 50].map((x) => L(`M${500 + x - 22},${800 + r * 52} q22,26 44,0`, 6, '#B89462')).join('')).join('')}</g>`,
  pre: () => sides((s) => P(`M${500 + s * 70},370 L${500 + s * 150},296 L${500 + s * 168},408Z`, '#7A5030')),
  deco: (C, h) => sides((s) => E(500 + s * 84, h.cy - 4, 86, 88, '#F5DEB3', 6)),
  top: (C, h, b, ex) => beak(500, h.cy + 44, 26, '#FF9F2E', ex) + P('M352,372 L500,308 L648,372 L500,436Z', '#2b2b33') + P('M410,392 L410,424 Q500,458 590,424 L590,392', '#2b2b33') + L('M640,372 L652,436', 6, '#FFD84A') + CIRC(652, 440, 10, '#FFD84A', 5),
  face: { dx: 84, dy: -6, s: 1.3, nose: 'none', mouth: false, brows: false },
}, ex));

// 11 — Truffle the Pig
add('truffle', 'Truffle the Pig', 'Pig', 'Foodie chef with big dreams. Cooks with love, tastes everything first.', '"Needs a pinch more love!"', ['#FFE9EE', '#FFA7BD'], (ex) => animal({
  main: '#FFA6B8', dark: '#E0788F', belly: '#FFC7D3',
  back: () => L('M648,950 q64,-20 42,-62 q-22,-30 -50,0', 9, '#E0788F'),
  pre: () => sides((s) => P(`M${500 + s * 70},378 L${500 + s * 170},325 L${500 + s * 150},448Z`, '#E0788F')),
  deco: (C, h) => E(500, h.cy + 46, 70, 46, '#FF8FA8', 6) + E(478, h.cy + 46, 9, 14, OL, 0) + E(522, h.cy + 46, 9, 14, OL, 0),
  top: () => `<g>${CIRC(432, 330, 52, '#fff', 7)}${CIRC(500, 304, 62, '#fff', 7)}${CIRC(568, 330, 52, '#fff', 7)}${RC(382, 366, 236, 50, 12, '#fff', 7)}</g>`,
  face: { nose: 'none', mdy: 92, ms: .8 },
}, ex));

// 12 — Leo the Lion
add('leo', 'Leo the Lion', 'Lion', 'Proud, loud, and secretly a softie. Thinks he is the king of everything.', '"Bow to the king! ...please?"', ['#FFF3D1', '#F5C45A'], (ex) => animal({
  main: '#F2B13B', dark: '#C98A1E', belly: '#FFE3A3', head: { rx: 158, ry: 135, cy: 505 },
  back: () => L('M648,950 q70,-10 60,-80', 12, OL) + L('M648,950 q70,-10 60,-80', 6, '#F2B13B') + E(708, 862, 24, 30, '#B8642A', 6),
  pre: (C, h) => `<g>${Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return CIRC(Math.round(500 + Math.cos(a) * 168), Math.round(h.cy + Math.sin(a) * 148), 62, '#B8642A', 7); }).join('')}${E(500, h.cy, 190, 165, '#B8642A', 0)}${roundEars('#F2B13B', '#FFE3A3', 112, 372, 40, 22)}</g>`,
  deco: (C, h) => E(500, h.cy + 52, 80, 52, '#FFE3A3', 0),
  top: () => P('M410,326 L418,262 L458,296 L500,246 L542,296 L582,262 L590,326Z', '#FFD84A', 7),
  face: { nose: 'tri', nc: '#B8642A', ndy: 30, mdy: 68 },
}, ex));

// 13 — Coco the Monkey
add('coco', 'Coco the Monkey', 'Monkey', 'Prankster with endless energy. Swings into every scene and steals the snacks.', '"Ooh-ooh, bananas!"', ['#FFEFD9', '#D9A66E'], (ex) => animal({
  main: '#8B5A3C', dark: '#6B3F27', belly: '#F0C99A',
  back: () => L('M640,990 q112,-10 100,-124 q-8,-72 -62,-60', 24, OL) + L('M640,990 q112,-10 100,-124 q-8,-72 -62,-60', 13, '#8B5A3C'),
  pre: () => sides((s) => E(500 + s * 188, 498, 52, 58, '#8B5A3C') + E(500 + s * 188, 500, 30, 36, '#F0C99A', 0)),
  deco: (C, h) => E(h.cx - 62, h.cy - 6, 72, 66, '#F0C99A', 0) + E(h.cx + 62, h.cy - 6, 72, 66, '#F0C99A', 0) + E(500, h.cy + 52, 100, 64, '#F0C99A', 0),
  top: () => P('M690,872 Q752,918 706,998 Q696,944 652,908Z', '#FFE04A', 6),
  face: { mdy: 70, ms: .95 },
}, ex));

// 14 — Peanut the Elephant
add('peanut', 'Peanut the Elephant', 'Baby elephant', 'Gentle giant with a huge heart. Never forgets a birthday — or a snack.', '"I remember everything!"', ['#E9F1FA', '#A9C3E0'], (ex) => animal({
  main: '#9DB4CC', dark: '#7C95AF', belly: '#C9D8E8', head: { rx: 175, ry: 145, cy: 505 },
  pre: () => sides((s) => E(500 + s * 218, 505, 115, 136, '#9DB4CC') + E(500 + s * 218, 510, 76, 100, '#F4B6C8', 0)),
  deco: (C, h) => P(`M456,${h.cy + 24} Q436,${h.cy + 150} 478,${h.cy + 206} Q518,${h.cy + 248} 562,${h.cy + 206} Q540,${h.cy + 190} 540,${h.cy + 150} Q552,${h.cy + 70} 544,${h.cy + 24}Z`, '#9DB4CC', 7) + L(`M470,${h.cy + 90} q30,10 62,0 M468,${h.cy + 130} q32,12 66,0`, 5, '#7C95AF'),
  top: () => P('M436,380 L500,226 L564,380Z', '#4DA3FF', 7) + L('M458,336 L542,336 M446,362 L554,362', 8, '#fff') + CIRC(500, 224, 20, '#FFD84A', 6),
  face: { dx: 72, dy: -24, nose: 'none', mouth: false },
}, ex));

// 15 — Tora the Tiger
add('tora', 'Tora the Tiger', 'Tiger cub', 'Sporty and fearless, always racing someone. Hates losing, loves a rematch.', '"Race you there!"', ['#FFF0D6', '#FFB05E'], (ex) => animal({
  main: '#F5922B', dark: '#6B3A12', belly: '#FFF1D9',
  back: () => L('M640,960 q100,10 96,-90', 24, OL) + L('M640,960 q100,10 96,-90', 13, '#F5922B') + L('M722,904 l24,-6 M724,880 l26,0', 8),
  bodyDeco: (C, h, b) => sides((s) => L(`M${500 + s * 150},790 Q${500 + s * 108},808 ${500 + s * 92},840`, 12) + L(`M${500 + s * 152},880 Q${500 + s * 112},890 ${500 + s * 94},918`, 12)),
  pre: () => roundEars('#F5922B', '#FFF1D9', 120, 372, 52, 28),
  deco: (C, h) => E(500, h.cy + 52, 92, 60, '#FFF1D9', 0) + stripes(500, h.cy - h.ry + 10) + sides((s) => L(`M${500 + s * 186},${h.cy - 6} L${500 + s * 128},${h.cy + 10}`, 10) + L(`M${500 + s * 188},${h.cy + 40} L${500 + s * 134},${h.cy + 46}`, 10)),
  top: () => P('M318,412 Q500,350 682,412 L684,446 Q500,388 316,446Z', '#E8484F', 6),
  face: { nose: 'tri', nc: '#E0788F', ndy: 28, mdy: 68 },
}, ex));

// 16 — Kiki the Koala
add('kiki', 'Kiki the Koala', 'Koala', 'Sleepy, gentle, dreamy. Hugs everything and naps in the middle of the action.', '"Five more minutes..."', ['#EEF1F6', '#B5BFD0'], (ex) => animal({
  main: '#B7BFC9', dark: '#8A94A1', belly: '#EEF1F5',
  pre: () => sides((s) => CIRC(500 + s * 165, 402, 84, '#B7BFC9', 7) + CIRC(500 + s * 165, 405, 52, '#fff', 0)),
  top: () => P('M692,884 Q766,830 778,764 Q704,786 692,884Z', '#6CC24A', 6) + L('M692,884 Q730,820 770,770', 5),
  face: { nose: 'big', nw: 42, ndy: 24, nc: '#3a3f4a', mdy: 84, ms: .85 },
}, ex));

// 17 — Rocky the Raccoon
add('rocky', 'Rocky the Raccoon', 'Raccoon', 'Sneaky snack thief with a heart of gold. Always has a plan (it usually fails).', '"Nobody saw anything."', ['#EDEFF4', '#A3A9C2'], (ex) => animal({
  main: '#A3A9B5', dark: '#4B5160', belly: '#E4E7EC',
  back: () => `<g>${[0, 1, 2, 3, 4].map((i) => G(`rotate(-35 ${660 + i * 20} ${960 - i * 26})`, E(660 + i * 20, 960 - i * 26, 42, 32, i % 2 ? '#4B5160' : '#A3A9B5', 6))).join('')}</g>`,
  pre: () => sides((s) => G(`rotate(${s * 12} ${500 + s * 125} 380)`, E(500 + s * 125, 372, 50, 58, '#A3A9B5') + E(500 + s * 125, 378, 28, 34, '#4B5160', 0))),
  deco: (C, h) => P(`M326,${h.cy - 36} Q500,${h.cy - 82} 674,${h.cy - 36} Q652,${h.cy + 34} 560,${h.cy + 28} Q500,${h.cy + 4} 440,${h.cy + 28} Q348,${h.cy + 34} 326,${h.cy - 36}Z`, '#4B5160', 0) + E(500, h.cy + 58, 78, 50, '#F4F5F8', 0),
  top: () => P('M372,398 Q500,296 628,398 Q500,372 372,398Z', '#2b2b33', 6) + P('M598,376 L690,386 L610,408Z', '#2b2b33', 6),
  face: { brows: false, mdy: 70, ms: .9 },
}, ex));

// 18 — Quackers the Duck
add('quackers', 'Quackers the Duck', 'Duck', 'Loud, funny, always has a joke. Makes a splash in every scene.', '"Quack! Did you hear that?"', ['#FFF9D6', '#FFDE6A'], (ex) => animal({
  main: '#FFD84A', dark: '#FF9F2E', belly: '#FFF0A6', armC: '#F2C12B', handC: '#F2C12B', head: { rx: 175, ry: 150, cy: 510 },
  back: () => P('M636,930 L706,886 L696,962Z', '#FFD84A', 7),
  neck: () => G('translate(500,682)', P('M0,0 L-60,-32 L-60,32Z', '#4DA3FF', 6) + P('M0,0 L60,-32 L60,32Z', '#4DA3FF', 6) + CIRC(0, 0, 15, '#2F7FE0', 6)),
  top: (C, h, b, ex) => beak(500, h.cy + 46, 66, '#FF9F2E', ex) + L('M500,362 q-8,-44 -34,-54', 9) + L('M510,364 q8,-50 38,-58', 9),
  face: { nose: 'none', mouth: false, dy: -14 },
}, ex));

// 19 — Pip the Chick
add('pip', 'Pip the Chick', 'Baby chick', 'Tiny but fearless. Wears half an eggshell and thinks it is a helmet.', '"I am NOT small!"', ['#FFFBDB', '#FFE680'], (ex) => animal({
  main: '#FFE97A', dark: '#FF9F2E', belly: '#FFF6C2', armC: '#FFE97A', body: { cx: 500, cy: 885, rx: 132, ry: 150 }, head: { rx: 180, ry: 150, cy: 525 },
  top: (C, h, b, ex) => beak(500, h.cy + 40, 30, '#FF9F2E', ex) + P('M338,452 L358,398 L394,440 L432,372 L472,436 L506,368 L542,436 L582,376 L610,440 L646,396 L664,452 Q500,502 338,452Z', '#FFFFFF', 7),
  face: { nose: 'none', mouth: false, dy: -10 },
}, ex));

// 20 — Nibbles the Mouse
add('nibbles', 'Nibbles the Mouse', 'Mouse', 'Tiny, quick, and obsessed with cheese. Hides everywhere and sees everything.', '"Squeak! Cheese?"', ['#F3F4F8', '#C4C9D8'], (ex) => animal({
  main: '#CFD3DC', dark: '#F4A6B7', belly: '#FFFFFF',
  back: () => L('M640,970 q112,22 112,-84 q0,-72 -52,-92', 16, OL) + L('M640,970 q112,22 112,-84 q0,-72 -52,-92', 9, '#F4A6B7'),
  pre: () => sides((s) => CIRC(500 + s * 165, 384, 86, '#CFD3DC', 7) + CIRC(500 + s * 165, 388, 54, '#FFB6C8', 0)),
  top: () => P('M668,884 L772,910 L700,968Z', '#FFD84A', 6) + CIRC(716, 922, 7, '#E8B52E', 0) + CIRC(700, 946, 6, '#E8B52E', 0),
  face: { nose: 'oval', nc: '#FF8FA0', ndy: 24, teeth: true },
}, ex));

// 21 — Hugo the Hippo
add('hugo', 'Hugo the Hippo', 'Hippo', 'Big, bouncy, loves splashing. Accidentally causes chaos, then apologises politely.', '"Oops! Sorry, sorry!"', ['#F1EDFA', '#BCAEE0'], (ex) => animal({
  main: '#A99CC7', dark: '#8777AE', belly: '#D7CFEA', head: { rx: 195, ry: 150 },
  pre: () => sides((s) => E(500 + s * 125, 372, 40, 46, '#A99CC7') + E(500 + s * 125, 376, 22, 28, '#F4B6C8', 0)),
  deco: (C, h) => E(500, h.cy + 62, 140, 80, '#CFC5E6', 0) + E(452, h.cy + 40, 12, 9, OL, 0) + E(548, h.cy + 40, 12, 9, OL, 0),
  neck: () => G('translate(500,684)', P('M0,0 L-62,-34 L-62,34Z', '#FFD84A', 6) + P('M0,0 L62,-34 L62,34Z', '#FFD84A', 6) + CIRC(0, 0, 16, '#F2B31A', 6)),
  face: { nose: 'none', mdy: 98, mw: 1.5, ms: .95 },
}, ex));

// 22 — Zap the Robot
add('zap', 'Zap the Robot', 'Helper robot', 'Super-smart sidekick. Takes jokes literally, beeps when excited.', '"Beep boop! Processing fun!"', ['#E6F4FF', '#87C4F5'], (ex) => {
  const eyes = ex === 'love'
    ? sides((s) => G(`translate(${500 + s * 62},458) scale(1.5)`, P(HEART, '#FF5C9A', 0)))
    : ex === 'shocked' ? sides((s) => `<circle cx="${500 + s * 62}" cy="456" r="30" fill="none" stroke="#5CF2FF" stroke-width="12"/>`)
      : ex === 'sad' ? sides((s) => L(`M${500 + s * 62 - 30},470 Q${500 + s * 62},440 ${500 + s * 62 + 30},470`, 14, '#5CF2FF')) + `<path d="M424,500 q0,26 10,26 q10,0 0,-26Z" fill="#8AD7FF"/>`
        : sides((s) => L(`M${500 + s * 62 - 30},472 Q${500 + s * 62},430 ${500 + s * 62 + 30},472`, 14, '#5CF2FF'));
  const mouth = ex === 'shocked' ? E(500, 522, 18, 22, '#5CF2FF', 0) : ex === 'sad' ? L('M470,532 Q500,510 530,532', 10, '#5CF2FF') : L('M464,512 Q500,552 536,512', 11, '#5CF2FF');
  return E(500, 1068, 230, 28, 'rgba(60,30,10,.2)', 0)
    + sides((s) => RC(500 + s * 70 - 30, 960, 60, 70, 18, '#8FA3B8', 7) + E(500 + s * 70, 1040, 56, 26, '#5C6F85', 7))
    + RC(352, 620, 296, 350, 70, '#C6D2DE', 7) + RC(398, 676, 204, 160, 30, '#5BA8FF', 7)
    + CIRC(446, 726, 14, '#FF5C5C', 4) + CIRC(500, 726, 14, '#FFD84A', 4) + CIRC(554, 726, 14, '#5CE68A', 4) + G('translate(500,790) scale(1.2)', P(HEART, '#FF5C9A', 3))
    + sides((s) => G(`rotate(${-s * 12} ${500 + s * 150} 680)`, RC(500 + s * 150 - 26 + (s > 0 ? 8 : -8), 670, 52, 190, 26, '#8FA3B8', 7) + CIRC(500 + s * 158, 880, 32, '#C6D2DE', 7)))
    + sides((s) => RC(500 + s * 180 - 14, 430, 28, 90, 12, '#8FA3B8', 7))
    + RC(334, 332, 332, 288, 78, '#C6D2DE', 7) + RC(364, 362, 272, 214, 50, '#1F2A44', 7)
    + eyes + mouth
    + L('M500,332 L500,268', 10) + CIRC(500, 252, 24, '#FF5C5C', 7)
    + (ex === 'shocked' ? G('translate(646,350)', P('M0,-22 C12,-4 18,8 0,18 C-18,8 -12,-4 0,-22Z', '#8AD7FF', 4)) : '');
});

// 23 — Blip the Alien
add('blip', 'Blip the Alien', 'Alien from Planet Gloop', 'Curious visitor learning human life. Misunderstands everything in the cutest way.', '"Is this... a sandwich?"', ['#EDE8FF', '#B9A4FF'], (ex) => animal({
  main: '#7ADE9A', dark: '#58B97A', belly: '#C6F3D4', head: { rx: 205, ry: 160, cy: 505 },
  back: () => '',
  pre: () => sides((s) => L(`M${500 + s * 74},372 Q${500 + s * 118},286 ${500 + s * 90},226`, 11) + CIRC(500 + s * 90, 218, 28, '#FFE04A', 7)),
  deco: (C, h) => `<g>${[[392, 420, 18], [610, 430, 16], [540, 392, 12], [440, 560, 11], [588, 596, 13]].map(([x, y, r]) => CIRC(x, y, r, '#B58CFF', 0)).join('')}</g>`,
  neck: () => P('M376,660 Q500,712 624,660 Q500,740 376,660Z', '#D6DEE8', 6) + CIRC(500, 718, 12, '#5CF2FF', 4),
  face: { dx: 84, dy: -12, s: 1.2, nose: 'none', mdy: 70, ms: .85 },
}, ex));

// 24 — Dex the Dino
add('dex', 'Dex the Dino', 'Baby T-rex', 'Tiny arms, huge dreams. Stomps in, roars softly, apologises for the mess.', '"Rawr! ...hi."', ['#E3F8E6', '#8FD9A0'], (ex) => animal({
  main: '#5CC77B', dark: '#3E9F5C', belly: '#FFF1B8', head: { rx: 192, ry: 148 },
  back: () => P('M636,940 C770,958 826,900 846,790 C790,860 712,870 636,826Z', '#5CC77B', 7) + sides((s) => s > 0 ? [[700, 880], [760, 872], [806, 836]].map(([x, y]) => P(`M${x - 18},${y} L${x},${y - 38} L${x + 18},${y}Z`, '#FF8A3D', 5)).join('') : ''),
  bodyDeco: () => `<g>${[[420, 780, 14], [586, 800, 12], [452, 940, 11]].map(([x, y, r]) => CIRC(x, y, r, '#3E9F5C', 0)).join('')}</g>`,
  pre: () => `<g>${[-80, 0, 80].map((x) => P(`M${500 + x - 30},378 L${500 + x},316 L${500 + x + 30},378Z`, '#FF8A3D', 6)).join('')}</g>`,
  deco: (C, h) => E(500, h.cy + 46, 126, 80, '#9BE3AE', 0) + E(454, h.cy + 22, 8, 11, OL, 0) + E(546, h.cy + 22, 8, 11, OL, 0),
  face: { nose: 'none', mdy: 72, teeth: true },
}, ex));

// 25 — Boo the Ghost
add('boo', 'Boo the Ghost', 'Friendly ghost', 'Shy, floaty and super friendly. Scares nobody — gets scared by everyone.', '"B-boo?"', ['#EEF0FF', '#B7BEF2'], (ex) => {
  const h = { cx: 500, cy: 560 };
  return E(500, 1088, 200, 22, 'rgba(60,30,120,.18)', 0)
    + P('M330,1000 C330,560 380,330 500,330 C620,330 670,560 670,1000 q-42,52 -85,0 q-42,52 -85,0 q-42,52 -85,0 q-42,52 -85,0Z', '#F6F7FF')
    + sides((s) => G(`rotate(${-s * 26} ${500 + s * 150} 760)`, E(500 + s * 168, 830, 36, 74, '#F6F7FF')))
    + face(h, { dx: 70, dy: -12, nose: 'none', mdy: 62, ms: .95 }, ex)
    + bow(580, 352, '#FF6B9C', .75);
});

// 26 — Gumdrop the Monster
add('gumdrop', 'Gumdrop the Monster', 'Fuzzy monster', 'Looks scary, acts sweet. One huge eye, one huge appetite, zero scary intentions.', '"Roar! ...did that work?"', ['#EEEAFF', '#A89BFF'], (ex) => animal({
  main: '#8A7BFF', dark: '#5F51D9', belly: '#C7C0FF', body: { rx: 165, ry: 180 }, head: { rx: 195, ry: 152 },
  back: () => P('M650,950 C740,960 780,900 770,820 C730,870 700,880 650,860Z', '#8A7BFF', 7),
  bodyDeco: () => `<g>${[[430, 760, 16], [580, 790, 13], [450, 930, 12], [560, 940, 15]].map(([x, y, r]) => CIRC(x, y, r, '#A89BFF', 0)).join('')}</g>`,
  pre: () => sides((s) => P(`M${500 + s * 62},384 L${500 + s * 112},298 L${500 + s * 134},398Z`, '#FFF1D0', 7)),
  deco: (C, h) => `<g>${[[400, 440, 18], [606, 452, 15], [560, 420, 11]].map(([x, y, r]) => CIRC(x, y, r, '#A89BFF', 0)).join('')}</g>`,
  face: { cyclops: true, dy: -22, nose: 'none', mdy: 62, mw: 1.15, teeth: true, brows: false },
}, ex));

// 27 — Avo the Avocado
add('avo', 'Avo the Avocado', 'Avocado', 'Calm, wise, always "just chilling". Gives questionable but very relaxed advice.', '"It is all good, my friend."', ['#F1FADB', '#B6DE7E'], (ex) => {
  const h = { cx: 500, cy: 745 };
  return E(500, 1068, 220, 26, 'rgba(60,30,10,.2)', 0)
    + sides((s) => E(500 + s * 72, 1030, 56, 28, '#3E6B2B', 7))
    + P('M500,300 C380,300 300,450 300,640 C300,820 380,1010 500,1010 C620,1010 700,820 700,640 C700,450 620,300 500,300Z', '#4F8A3A')
    + P('M500,338 C404,338 340,470 340,640 C340,800 410,972 500,972 C590,972 660,800 660,640 C660,470 596,338 500,338Z', '#C5E384', 0)
    + CIRC(500, 748, 140, '#8B5A2B', 7) + E(452, 676, 28, 17, '#B07A47', 0, 'transform="rotate(-30 452 676)" opacity=".7"')
    + sides((s) => G(`rotate(${-s * 14} ${500 + s * 185} 790)`, E(500 + s * 205, 830, 30, 62, '#4F8A3A', 7) + CIRC(500 + s * 208, 890, 26, '#3E6B2B', 7)))
    + face(h, { dx: 54, dy: -14, s: .9, nose: 'none', mdy: 58, ms: .82, brows: true }, ex);
});

// 28 — Dumpling the Bao Bun
add('dumpling', 'Dumpling the Bao', 'Steamed bun', 'Soft, squishy, cheerful. Always warm, always ready for a hug (and a dip).', '"Fresh and steamy!"', ['#FFF6E6', '#F2D3A0'], (ex) => {
  const h = { cx: 500, cy: 810 };
  return E(500, 1075, 250, 26, 'rgba(60,30,10,.2)', 0)
    + P('M290,960 L320,1050 L680,1050 L710,960Z', '#E0B77C', 7) + L('M310,1005 L690,1005 M300,982 L700,982', 5, '#B88A4A')
    + P('M280,830 C280,640 380,600 500,600 C620,600 720,640 720,830 C720,950 620,985 500,985 C380,985 280,950 280,830Z', '#FFF6E8')
    + L('M500,602 Q460,660 430,700 M500,602 Q490,670 480,716 M500,602 Q520,670 530,716 M500,602 Q540,660 570,700', 7) + CIRC(500, 598, 18, '#FFF6E8', 7)
    + sides((s) => E(500 + s * 232, 850, 30, 56, '#FFF6E8', 7))
    + face(h, { dx: 78, dy: 6, s: .95, nose: 'none', mdy: 84, ms: .95 }, ex);
});

// 29 — Berry the Strawberry
add('berry', 'Berry the Strawberry', 'Strawberry', 'Sweet, bubbly and a little dramatic. Blushes at everything, even compliments.', '"Aww, stop it, you!"', ['#FFE8EC', '#FF9AAB'], (ex) => {
  const h = { cx: 500, cy: 715 };
  const seeds = [[420, 580], [580, 585], [500, 560], [380, 680], [620, 690], [420, 800], [580, 810], [500, 860], [450, 930], [550, 930]];
  return E(500, 1068, 210, 26, 'rgba(60,30,10,.2)', 0)
    + sides((s) => E(500 + s * 68, 1034, 52, 26, '#C9303F', 7))
    + P('M500,380 C300,350 270,600 330,790 C382,950 450,1012 500,1012 C550,1012 618,950 670,790 C730,600 700,350 500,380Z', '#F2475A')
    + seeds.map(([x, y]) => G(`translate(${x},${y})`, P('M0,-10 Q8,0 0,12 Q-8,0 0,-10Z', '#FFE07A', 0))).join('')
    + sides((s) => G(`rotate(${-s * 14} ${500 + s * 190} 760)`, E(500 + s * 214, 810, 30, 62, '#F2475A', 7) + CIRC(500 + s * 218, 870, 26, '#C9303F', 7)))
    + P('M500,396 L426,350 L452,420 L360,418 L440,462 L420,516 L500,470 L580,516 L560,462 L640,418 L548,420 L574,350Z', '#4FB84E', 7)
    + face(h, { dx: 78, dy: 4, s: .95, nose: 'none', mdy: 72, ms: 1 }, ex);
});

function svgFor(ch, ex, withBg) {
  const bgDef = withBg ? `<defs><linearGradient id="bgg_${ch.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${ch.bg[0]}"/><stop offset="1" stop-color="${ch.bg[1]}"/></linearGradient></defs><rect width="1000" height="1200" fill="url(#bgg_${ch.id})"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1200" viewBox="0 0 1000 1200">${bgDef}${ch.draw(ex)}</svg>`;
}
module.exports = { CAST, svgFor, EXPRESSIONS: ['happy', 'shocked', 'sad', 'love'] };
