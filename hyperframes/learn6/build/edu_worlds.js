/* KiddoVerse LEARN - two new worlds for the lessons (added to KVW before the engine reads it):
   numland = "Number Meadow" (polka-dot hills + sunflowers: dots to count)      abc = "Alphabet Garden" (pastel toy-block land) */
(function () {
  const KVW = window.KVW, { X0, X1, Y0, Y1 } = KVW, W = X1 - X0, H = Y1 - Y0, h = KVW.helpers;
  const P = (d, fill, x = '') => `<path d="${d}" fill="${fill}" ${x}/>`;
  const E = (cx, cy, rx, ry, fill, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${x}/>`;
  const C = (cx, cy, r, fill, x = '') => E(cx, cy, r, r, fill, x);
  const R = (x, y, w, hh, r, fill, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="${r}" fill="${fill}" ${ex}/>`;
  const rect = (fill) => R(X0, Y0, W, H, 0, fill);
  const lg = (id, stops) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
  const rg = (id, stops) => `<radialGradient id="${id}" cx=".5" cy=".5" r=".5">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a == null ? 1 : a}"/>`).join('')}</radialGradient>`;
  let seed = 31; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  const DEFS = [
    lg('wSkyNum', [[0, '#35CFC4'], [.5, '#8EEBD8'], [1, '#F6FFDF']]), lg('wHillNum', [[0, '#C4EE62'], [1, '#79D14C']]), lg('wHillNumNear', [[0, '#8EDC5A'], [1, '#49B547']]),
    lg('wSkyAbc', [[0, '#FFA9DC'], [.5, '#FFD3EE'], [1, '#FFF3D4']]), lg('wHillAbc', [[0, '#B8F0D6'], [1, '#6FD6B0']]), lg('wHillAbcNear', [[0, '#A6E8C4'], [1, '#52C79A']]),
    rg('wSunSoft', [[0, '#FFFBD0', 1], [.5, '#FFE98A', .85], [1, '#FFE98A', 0]]),
  ].join('');

  const sunflower = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">${R(-5, -150, 10, 150, 4, '#2DA64F')}<path d="M0,-70 C30,-96 66,-86 70,-70 C48,-52 20,-54 0,-70Z" fill="#43C463"/><g transform="translate(0,-170)">${[...Array(14)].map((_, i) => E(0, -44, 14, 30, i % 2 ? '#FFC21F' : '#FFD84A', `transform="rotate(${i * 25.7})"`)).join('')}${C(0, 0, 32, '#8A5A2B')}${C(-8, -8, 9, '#A8743C')}</g></g>`;
  const dots = (xs, y0, y1, cols) => xs.map((x, i) => C(x, y0 + rnd() * (y1 - y0), 12 + (i % 3) * 8, cols[i % cols.length], 'opacity=".55"')).join('');
  const bunting = (y0) => { const n = 14, cols = ['#FF5E7E', '#FFD23F', '#4CC9F0', '#B06BFF', '#4CD964', '#FF9F43']; let o = `<path d="M${X0},${y0} Q480,${y0 + 70} 960,${y0 + 6} T2060,${y0 + 20}" fill="none" stroke="#fff" stroke-width="5" opacity=".9"/>`;
    for (let i = 0; i < n; i++) { const x = X0 + 60 + i * (W - 120) / (n - 1), y = y0 + 22 + 30 * Math.sin(i * .5); o += P(`M${x - 26},${y} L${x + 26},${y} L${x},${y + 56}Z`, cols[i % 6], 'opacity=".95"'); } return o; };
  const block = (x, y, s, c, icon, lightc, darkc) => `<g transform="translate(${x},${y}) scale(${s})">${R(0, 0, 100, 100, 10, c)}${P('M0,10 L18,-14 L118,-14 L100,10Z', lightc)}${P('M100,10 L118,-14 L118,86 L100,100Z', darkc)}${icon === 'c' ? C(50, 50, 22, '#fff', 'opacity=".85"') : icon === 's' ? P(h.STAR(26), '#fff', 'opacity=".85" transform="translate(50,52)"') : icon === 't' ? P('M50,24 L78,74 L22,74Z', '#fff', 'opacity=".85"') : R(28, 28, 44, 44, 8, '#fff', 'opacity=".85"')}</g>`;
  const balloon = (x, y, s, c1, c2) => `<g transform="translate(${x},${y}) scale(${s})">${E(0, 0, 60, 74, c1)}${P('M-60,0 Q0,-90 60,0 Q30,70 0,74 Q-30,70 -60,0Z', c2, 'opacity=".5"')}${R(-18, 96, 36, 26, 5, '#C98B4F')}<path d="M-40,60 L-14,96 M40,60 L14,96" stroke="#7A4A22" stroke-width="3"/></g>`;

  const WORLDS = {};
  /* ------------------------------------------------------------- Number Meadow */
  WORLDS.numland = {
    far: rect('url(#wSkyNum)') + C(1500, 190, 250, 'url(#wSunSoft)') + C(1500, 190, 92, '#FFE98A') + C(1500, 190, 66, '#FFF6B8', 'opacity=".8"') + h.cloud(300, 210, 1.15) + h.cloud(980, 120, .8) + h.cloud(1800, 420, .9) + h.cloud(120, 540, .7)
      + P(`M${X0},720 Q220,540 560,660 T1080,630 T1560,620 T2060,680 L2060,1160 L${X0},1160Z`, '#A8E8A0', 'opacity=".7"') + bunting(40),
    mid: P(`M${X0},770 Q300,650 700,740 T1300,710 T1900,730 T2060,750 L2060,1160 L${X0},1160Z`, 'url(#wHillNum)') + dots([200, 420, 640, 900, 1150, 1380, 1620, 1850], 770, 880, ['#FFF', '#FFE14D', '#FF9BB8'])
      + sunflower(150, 790, .9) + sunflower(560, 800, .75) + sunflower(1400, 790, .85) + sunflower(1800, 800, 1) + h.tree(1020, 800, .7, '#7BD65A', '#4CB848'),
    ground: P(`M${X0},880 Q380,820 880,860 T1700,840 T2060,870 L2060,1160 L${X0},1160Z`, 'url(#wHillNumNear)') + P(`M${X0},905 Q300,885 640,905 T1300,895 T2060,915 L2060,1160 L${X0},1160Z`, '#3FB454', 'opacity=".5"')
      + [[100, 940, '#fff'], [380, 1000, '#FFE14D'], [840, 970, '#FF9BB8'], [1400, 990, '#fff'], [1780, 955, '#FFE14D'], [1130, 1020, '#FF9BB8']].map(([x, y, c]) => h.flower(x, y, c, 1.2)).join(''),
    fg: h.tuft(-40, 1130, 3.4, '#3DAA4D') + h.tuft(200, 1150, 2.6, '#3DAA4D') + h.tuft(1860, 1130, 3.4, '#3DAA4D') + h.tuft(2020, 1150, 2.8, '#3DAA4D') + sunflower(60, 1160, 1.5) + sunflower(1860, 1170, 1.7), floor: 905,
  };
  /* ------------------------------------------------------------- Alphabet Garden */
  const BC = [['#FF6B8B', '#FF9DB4', '#D94868'], ['#FFC21F', '#FFDD6B', '#D99A00'], ['#4CC9F0', '#8EDFF8', '#2A9CC4'], ['#B06BFF', '#CFA2FF', '#8446D6'], ['#4CD964', '#8FEBA0', '#2DA845']];
  const stack = (x, y, s, pat) => pat.map(([dx, dy, ci, ic]) => block(x + dx * 100 * s, y + dy * 100 * s, s, BC[ci][0], ic, BC[ci][1], BC[ci][2])).join('');
  WORLDS.abc = {
    far: rect('url(#wSkyAbc)') + C(300, 200, 250, 'url(#wSunSoft)') + C(300, 200, 84, '#FFE98A') + h.cloud(900, 140, 1, '#fff', '#FFD9EE') + h.cloud(1500, 260, 1.2, '#fff', '#FFD9EE') + h.cloud(1850, 90, .7, '#fff', '#FFD9EE') + h.cloud(120, 520, .7, '#fff', '#FFD9EE')
      + balloon(1180, 360, .8, '#FF6B8B', '#FFC21F') + balloon(1700, 520, .6, '#4CC9F0', '#B06BFF') + balloon(560, 460, .55, '#4CD964', '#FFC21F')
      + P(`M${X0},700 Q260,560 600,660 T1100,640 T1600,630 T2060,690 L2060,1160 L${X0},1160Z`, '#E8D8FF', 'opacity=".75"'),
    mid: P(`M${X0},770 Q300,660 700,745 T1300,720 T1900,740 T2060,760 L2060,1160 L${X0},1160Z`, 'url(#wHillAbc)')
      + stack(130, 690, .9, [[0, 0, 0, 'c'], [1, 0, 1, 's'], [.5, -1, 2, 't']]) + stack(1480, 700, 1, [[0, 0, 3, 's'], [1, 0, 4, 'c'], [2, 0, 0, 'q'], [.5, -1, 1, 't'], [1.5, -1, 2, 'c']])
      + stack(520, 740, .6, [[0, 0, 4, 't'], [1, 0, 3, 'c']]),      /* was x=760: touched the first letter of the picture-word label */
    ground: P(`M${X0},880 Q380,830 880,865 T1700,845 T2060,875 L2060,1160 L${X0},1160Z`, 'url(#wHillAbcNear)') + P(`M${X0},905 Q300,888 640,905 T1300,896 T2060,915 L2060,1160 L${X0},1160Z`, '#47BE92', 'opacity=".5"')
      + [[110, 945, '#fff'], [400, 1000, '#FFC21F'], [860, 975, '#FF9BB8'], [1420, 992, '#fff'], [1790, 958, '#FFC21F'], [1140, 1022, '#FF9BB8']].map(([x, y, c]) => h.flower(x, y, c, 1.2)).join(''),
    fg: h.tuft(-40, 1130, 3.4, '#35B58A') + h.tuft(210, 1150, 2.6, '#35B58A') + h.tuft(1860, 1130, 3.4, '#35B58A') + h.tuft(2020, 1150, 2.8, '#35B58A')
      + block(-90, 930, 1.6, '#FF6B8B', 's', '#FF9DB4', '#D94868') + block(1860, 960, 1.4, '#4CC9F0', 'c', '#8EDFF8', '#2A9CC4'), floor: 905,
  };

  KVW.DEFS += DEFS;
  Object.assign(KVW.WORLDS, WORLDS);
})();
