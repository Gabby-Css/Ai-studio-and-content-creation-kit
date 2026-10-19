/* KiddoVerse LEARN #2 - one "Colour Land" world per colour (c_red ... c_purple) + a grey world for the story.
   The sky, hills, trees and the big sun-orb of a stop are all tints of THAT colour, so the whole screen teaches the colour;
   the saturated objects of the verse pop against the pale tints. */
(function () {
  const KVW = window.KVW, { X0, X1, Y0, Y1 } = KVW, W = X1 - X0, h = KVW.helpers;
  const P = (d, fill, x = '') => `<path d="${d}" fill="${fill}" ${x}/>`;
  const E = (cx, cy, rx, ry, fill, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${x}/>`;
  const C = (cx, cy, r, fill, x = '') => E(cx, cy, r, r, fill, x);
  const R = (x, y, w, hh, r, fill, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="${r}" fill="${fill}" ${ex}/>`;
  const hexRGB = (hx) => { const n = parseInt(hx.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const toHex = (a) => '#' + a.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const mixc = (a, b, k) => { const x = hexRGB(a), y = hexRGB(b); return toHex(x.map((v, i) => v + (y[i] - v) * k)); };
  const tint = (hx, k) => mixc(hx, '#FFFFFF', k), dark = (hx, k) => mixc(hx, '#2A1B63', k);
  const lg = (id, stops) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
  let seed = 77; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const bunting = (y0, cols) => { const n = 14; let o = `<path d="M${X0},${y0} Q480,${y0 + 70} 960,${y0 + 6} T2060,${y0 + 20}" fill="none" stroke="#fff" stroke-width="5" opacity=".9"/>`;
    for (let i = 0; i < n; i++) { const x = X0 + 60 + i * (W - 120) / (n - 1), y = y0 + 22 + 30 * Math.sin(i * .5); o += P(`M${x - 26},${y} L${x + 26},${y} L${x},${y + 56}Z`, cols[i % cols.length], 'opacity=".95"'); } return o; };
  const dots = (xs, y0, y1, col, op = .4) => xs.map((x, i) => C(x, y0 + ((i * 37) % 100) / 100 * (y1 - y0), 12 + (i % 3) * 9, col, `opacity="${op}"`)).join('');

  const DEFS = [], WORLDS = {};
  function colorWorld(key, H, opt = {}) {
    const sat = opt.gray ? 0 : 1;
    DEFS.push(lg('wSkyC_' + key, [[0, tint(H, .26)], [.55, tint(H, .6)], [1, '#FFFCF2']]), lg('wHillC_' + key, [[0, tint(H, .42)], [1, tint(H, .2)]]), lg('wNearC_' + key, [[0, tint(H, .22)], [1, mixc(H, '#2A1B63', .25)]]));
    const t1 = tint(H, .18), t2 = H, orb = opt.gray ? '#C9CCDA' : H;
    const far = R(X0, Y0, W, Y1 - Y0, 0, `url(#wSkyC_${key})`)
      + C(1500, 230, 250, orb, 'opacity=".22"') + C(1500, 230, 190, orb, 'opacity=".9"') + C(1500, 230, 140, tint(H, .38), 'opacity=".9"') + E(1450, 176, 44, 22, '#fff', 'opacity=".55" transform="rotate(-24 1450 176)"')
      + h.cloud(300, 210, 1.15, '#fff', tint(H, .8)) + h.cloud(980, 120, .8, '#fff', tint(H, .8)) + h.cloud(1820, 450, .9, '#fff', tint(H, .8)) + h.cloud(120, 540, .7, '#fff', tint(H, .8))
      + P(`M${X0},720 Q220,540 560,660 T1080,630 T1560,620 T2060,680 L2060,1160 L${X0},1160Z`, tint(H, .6), 'opacity=".85"') + bunting(40, [H, '#FFFFFF', tint(H, .45), dark(H, .12)]);
    const mid = P(`M${X0},770 Q300,650 700,740 T1300,710 T1900,730 T2060,750 L2060,1160 L${X0},1160Z`, `url(#wHillC_${key})`) + dots([200, 420, 640, 900, 1150, 1380, 1620, 1850], 770, 880, H, .38)
      + h.tree(150, 790, .9, t1, t2) + h.tree(560, 800, .72, t1, t2) + h.tree(1400, 790, .85, t1, t2) + h.tree(1800, 800, 1, t1, t2);
    const ground = P(`M${X0},880 Q380,820 880,860 T1700,840 T2060,870 L2060,1160 L${X0},1160Z`, `url(#wNearC_${key})`) + P(`M${X0},905 Q300,885 640,905 T1300,895 T2060,915 L2060,1160 L${X0},1160Z`, dark(H, .3), 'opacity=".35"')
      + [[100, 940, '#fff'], [380, 1000, tint(H, .2)], [840, 970, '#fff'], [1400, 990, tint(H, .2)], [1780, 955, '#fff'], [1130, 1020, '#fff']].map(([x, y, c]) => h.flower(x, y, c, 1.2)).join('');
    const fg = h.tuft(-40, 1130, 3.4, dark(H, .25)) + h.tuft(200, 1150, 2.6, dark(H, .25)) + h.tuft(1860, 1130, 3.4, dark(H, .25)) + h.tuft(2020, 1150, 2.8, dark(H, .25)) + h.flower(60, 1160, tint(H, .1), 2.4) + h.flower(1860, 1170, tint(H, .1), 2.6);
    WORLDS['c_' + key] = { far, mid, ground, fg, floor: 905 };
  }
  const COL = { red: '#FF3B4E', orange: '#FF9F1C', yellow: '#FFD60A', green: '#2FCB5A', blue: '#2F8BFF', purple: '#9B5CFF' };
  Object.keys(COL).forEach((k) => colorWorld(k, COL[k]));
  colorWorld('gray', '#8E94AB', { gray: true });
  KVW.COLORHEX = COL;
  KVW.DEFS += DEFS.join('');
  Object.assign(KVW.WORLDS, WORLDS);
})();
