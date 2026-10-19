/* KiddoVerse worlds — layered, outline-free "painted" backgrounds. Each world = {far, mid, ground, fg, floor}
   Coordinates: visible stage is 0..1920 x 0..1080; art overscans to -140..2060 x -80..1160 so the camera can pan/zoom. */
(function (root) {
  const X0 = -140, X1 = 2060, Y0 = -80, Y1 = 1160, W = X1 - X0, H = Y1 - Y0;
  const P = (d, fill, x = '') => `<path d="${d}" fill="${fill}" ${x}/>`;
  const E = (cx, cy, rx, ry, fill, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${x}/>`;
  const C = (cx, cy, r, fill, x = '') => E(cx, cy, r, r, fill, x);
  const R = (x, y, w, h, r, fill, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${ex}/>`;
  const rect = (fill) => R(X0, Y0, W, H, 0, fill);
  const lg = (id, stops, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
  const rg = (id, stops, r = .5) => `<radialGradient id="${id}" cx=".5" cy=".5" r="${r}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a == null ? 1 : a}"/>`).join('')}</radialGradient>`;
  const STAR = (r) => `M0,${-r} L${r * .27},${-r * .33} L${r},${-r * .31} L${r * .44},${r * .14} L${r * .62},${r * .84} L0,${r * .46} L${-r * .62},${r * .84} L${-r * .44},${r * .14} L${-r},${-r * .31} L${-r * .27},${-r * .33}Z`;
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const stars = (n, y0, y1, rmax = 3.2, col = '#fff', op = .9) => { let o = ''; for (let i = 0; i < n; i++) { const r = .8 + rnd() * rmax; o += C(X0 + rnd() * W, y0 + rnd() * (y1 - y0), r, col, `opacity="${(.35 + rnd() * op).toFixed(2)}"`); } return o; };
  const cloud = (x, y, s, fill = '#fff', sh = '#DDEBFF') => `<g transform="translate(${x},${y}) scale(${s})">${E(0, 28, 150, 36, sh)}${C(-70, 0, 54, fill)}${C(0, -26, 74, fill)}${C(78, -2, 56, fill)}${R(-130, -10, 270, 50, 25, fill)}</g>`;
  const tree = (x, y, s, c1 = '#43C463', c2 = '#2DA64F') => `<g transform="translate(${x},${y}) scale(${s})">${R(-14, -120, 28, 120, 10, '#B9783E')}${C(0, -170, 76, c2)}${C(-20, -186, 62, c1)}${C(24, -158, 44, c1, 'opacity=".8"')}</g>`;
  const flower = (x, y, c, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">${R(-2.5, -34, 5, 34, 2, '#2DA64F')}${[0, 72, 144, 216, 288].map((a) => E(0, -46, 9, 14, c, `transform="rotate(${a} 0 -34)"`)).join('')}${C(0, -34, 7, '#FFD23F')}</g>`;
  const tuft = (x, y, s, c = '#2DA64F') => `<g transform="translate(${x},${y}) scale(${s})">${P('M-22,0 Q-20,-34 -12,-44 Q-8,-20 0,0Z M-4,0 Q0,-52 10,-62 Q12,-26 14,0Z M10,0 Q20,-34 32,-42 Q26,-14 28,0Z', c)}</g>`;
  const bokeh = (n, cols) => { let o = ''; for (let i = 0; i < n; i++) o += C(X0 + rnd() * W, Y0 + rnd() * H, 20 + rnd() * 50, cols[i % cols.length], `opacity="${(.08 + rnd() * .12).toFixed(2)}"`); return o; };

  const DEFS = [
    lg('wSkyHills', [[0, '#5CC8FF'], [.6, '#A8E6FF'], [1, '#EAFBFF']]), lg('wSkyDino', [[0, '#FFC48A'], [.55, '#FFE2A8'], [1, '#FFF4D2']]), lg('wSkyCloud', [[0, '#9BD3FF'], [.55, '#D9C8FF'], [1, '#FFD9EC']]),
    lg('wSkyHub', [[0, '#1F1650'], [.45, '#5B35C9'], [.8, '#C45BD6'], [1, '#FF9BB8']]), lg('wSkySpace', [[0, '#0E0B3A'], [.6, '#2A1A7A'], [1, '#5A2BA8']]), lg('wSkyNight', [[0, '#0F0B3F'], [.6, '#2C1B86'], [1, '#6A3BBE']]),
    lg('wWork', [[0, '#C8E0FF'], [1, '#9CC1F5']]), lg('wDisco', [[0, '#2B1260'], [1, '#6B2BB0']]), lg('wHillMid', [[0, '#7FE08A'], [1, '#3FBF6A']]), lg('wHillNear', [[0, '#5ED36E'], [1, '#2FA85A']]),
    lg('wFloor', [[0, '#6B3FD0'], [1, '#2B1A6A']]), lg('wBelt', [[0, '#5B6396'], [1, '#2F3566']]), lg('wCloudFloor', [[0, '#FFFFFF'], [1, '#C9DFFF']]), lg('wDinoGround', [[0, '#E7C07A'], [1, '#C79552']]),
    lg('wLava', [[0, '#FFE066'], [1, '#FF5A36']]), lg('wBeam', [[0, '#FFFFFF', ], [1, '#FFFFFF']]),
    rg('wSun', [[0, '#FFF6B0', 1], [.45, '#FFE066', .9], [1, '#FFE066', 0]], .5), rg('wGlowViolet', [[0, '#C79BFF', .9], [1, '#7B4DFF', 0]], .5), rg('wGlowGold', [[0, '#FFF3A0', 1], [1, '#FFC93C', 0]], .5), rg('wPlanetA', [[0, '#FF9BD0'], [1, '#B04BFF']], .75),
    rg('wPlanetB', [[0, '#7BE8FF'], [1, '#3C7BFF']], .75), rg('wPlanetC', [[0, '#FFE066'], [1, '#FF8A3D']], .75),
  ].join('');

  const W_ = {};

  /* ------------------------------------------------------------- HUB: Kiddoverse Launch Garden (dusk) */
  W_.hub = {
    far: rect('url(#wSkyHub)') + stars(90, Y0, 700) + C(300, 250, 190, 'url(#wGlowViolet)') + C(300, 250, 120, 'url(#wPlanetA)') + E(300, 250, 230, 40, 'none', 'stroke="#FFE08A" stroke-width="12" transform="rotate(-18 300 250)" opacity=".9"')
      + C(1620, 190, 80, '#FFF6C9') + C(1640, 176, 66, '#FFE9A0', 'opacity=".5"') + C(1620, 190, 170, 'url(#wGlowGold)', 'opacity=".5"')
      + `<g transform="translate(1180,170)">${E(0, 36, 150, 26, '#7A4BD0')}${P('M-150,36 Q-120,-70 0,-76 Q120,-70 150,36Z', '#9A6BFF')}${R(-14, -140, 28, 70, 8, '#FFE08A')}${P('M14,-140 L74,-118 L14,-96Z', '#FF6B9B')}</g>`
      + `<g transform="translate(560,300) scale(.8)">${E(0, 30, 120, 22, '#7A4BD0')}${P('M-120,30 Q-90,-50 0,-56 Q90,-50 120,30Z', '#B08BFF')}${C(0, -92, 18, '#FFD23F')}</g>`,
    mid: P(`M${X0},760 Q300,640 640,720 T1260,700 T1800,690 T2060,730 L2060,1160 L${X0},1160Z`, '#4A2FB0') + P(`M${X0},820 Q400,740 800,800 T1500,780 T2060,820 L2060,1160 L${X0},1160Z`, '#5E3BCE')
      + [200, 520, 1320, 1700].map((x, i) => `<g transform="translate(${x},${760 + (i % 2) * 30})">${R(-6, -150, 12, 150, 5, '#3A2690')}${C(0, -158, 24, '#FFE08A')}${C(0, -158, 58, 'url(#wGlowGold)', 'opacity=".7"')}</g>`).join('')
      + `<path d="M${X0},640 Q480,560 960,630 T2060,610" fill="none" stroke="#FFE08A" stroke-width="5" stroke-dasharray="4 16" stroke-linecap="round" opacity=".8"/>` + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => C(-100 + i * 220, 628 + Math.sin(i) * 26, 9, ['#FF6B9B', '#FFD23F', '#5CF0C3', '#7BE8FF'][i % 4])).join(''),
    ground: P(`M${X0},880 Q480,830 960,860 T2060,850 L2060,1160 L${X0},1160Z`, 'url(#wFloor)') + P(`M${X0},900 Q480,870 960,890 T2060,880`, 'none', 'stroke="#9A7BFF" stroke-width="6" opacity=".6"')
      + [...Array(14)].map((_, i) => `<g transform="translate(${-80 + i * 160},${960 + (i % 2) * 70}) scale(1,.4)">${P(`M0,-60 L52,-30 L52,30 L0,60 L-52,30 L-52,-30Z`, i % 3 ? '#7B58E8' : '#8E6BFF', 'opacity=".5"')}</g>`).join(''),
    fg: bokeh(14, ['#FFE08A', '#FF9BD0', '#7BE8FF']) + `<g transform="translate(-60,1100)">${tuft(0, 0, 3, '#3B2A99')}${tuft(120, 20, 2.4, '#4A35B8')}</g><g transform="translate(1980,1110)">${tuft(0, 0, 3, '#3B2A99')}${tuft(-110, 14, 2.5, '#4A35B8')}</g>`, floor: 905,
  };

  /* ------------------------------------------------------------- HILLS: Rainbow Hills */
  const rainbow = (cx, cy, r0, bw) => ['#FF5E7E', '#FF9F43', '#FFD23F', '#4CD964', '#4CC9F0', '#6C7BFF', '#B06BFF'].map((c, i) => `<path d="M${cx - r0 + i * bw},${cy} A${r0 - i * bw},${r0 - i * bw} 0 0 1 ${cx + r0 - i * bw},${cy}" fill="none" stroke="${c}" stroke-width="${bw + 1}"/>`).join('');
  W_.hills = {
    far: rect('url(#wSkyHills)') + C(1560, 170, 260, 'url(#wSun)') + C(1560, 170, 96, '#FFE066') + C(1560, 170, 70, '#FFF0A0', 'opacity=".7"')
      + `<g opacity=".95">${rainbow(900, 780, 520, 34)}</g>` + cloud(300, 220, 1.1) + cloud(1180, 120, .8) + cloud(1780, 360, .9) + cloud(120, 520, .7)
      + P(`M${X0},700 Q200,520 520,640 T1000,620 T1500,600 T2060,660 L2060,1160 L${X0},1160Z`, '#B9A8FF', 'opacity=".75"'),
    mid: P(`M${X0},760 Q300,640 700,730 T1300,700 T1900,720 T2060,740 L2060,1160 L${X0},1160Z`, 'url(#wHillMid)') + tree(260, 760, .9) + tree(1500, 740, 1) + tree(1780, 760, .8) + tree(620, 790, .7, '#5CD6A6', '#34B98A')
      + [[420, 790, '#FF6B9B'], [700, 800, '#FFD23F'], [1200, 770, '#fff'], [1650, 780, '#FF9F43'], [1000, 790, '#B06BFF']].map(([x, y, c]) => flower(x, y, c, 1.1)).join(''),
    ground: P(`M${X0},870 Q380,800 880,850 T1700,830 T2060,860 L2060,1160 L${X0},1160Z`, 'url(#wHillNear)') + P(`M${X0},900 Q300,880 640,900 T1300,890 T2060,910 L2060,1160 L${X0},1160Z`, '#3DBE62', 'opacity=".55"')
      + [[100, 930, '#FF6B9B'], [360, 990, '#FFD23F'], [820, 960, '#fff'], [1400, 980, '#B06BFF'], [1780, 950, '#FF9F43'], [1120, 1010, '#FF6B9B']].map(([x, y, c]) => flower(x, y, c, 1.3)).join(''),
    fg: tuft(-40, 1130, 3.4) + tuft(180, 1150, 2.6) + tuft(1860, 1130, 3.4) + tuft(2020, 1150, 2.8) + flower(120, 1120, '#FF6B9B', 2) + flower(1830, 1110, '#FFD23F', 2.2), floor: 905,
  };

  /* ------------------------------------------------------------- DINO: Dino Valley */
  const fern = (x, y, s, c = '#2FA85A') => `<g transform="translate(${x},${y}) scale(${s})">${[-60, -35, -12, 12, 35, 60].map((a) => P('M0,0 Q-12,-120 0,-190 Q12,-120 0,0Z', c, `transform="rotate(${a})"`)).join('')}</g>`;
  const palm = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})">${P('M-16,0 Q-6,-170 -26,-300 L8,-300 Q22,-170 20,0Z', '#B9783E')}${[-80, -45, -10, 25, 62, 100].map((a) => P('M0,0 Q50,-60 150,-24 Q70,-44 0,0Z', '#2FA85A', `transform="translate(-6,-300) rotate(${a})"`)).join('')}${C(-4, -296, 14, '#7A4A22')}</g>`;
  W_.dino = {
    far: rect('url(#wSkyDino)') + C(300, 260, 240, 'url(#wSun)') + C(300, 260, 100, '#FFD05A') + cloud(1400, 190, 1, '#FFF8E8', '#FFE2B0') + cloud(900, 120, .7, '#FFF8E8', '#FFE2B0')
      + P(`M${X0},720 L180,520 L360,660 L560,470 L780,690 L1000,560 L1240,700 L1500,520 L1760,690 L2060,600 L2060,1160 L${X0},1160Z`, '#C69BE8', 'opacity=".7"')
      + `<g transform="translate(1420,0)">${P('M-330,780 L-160,420 Q-110,360 -60,360 L60,360 Q110,360 160,420 L330,780Z', '#8E5AA8')}${P('M-120,380 Q0,300 120,380 Q60,420 0,410 Q-60,420 -120,380Z', 'url(#wLava)')}${P('M-30,400 Q-60,520 -40,640 Q-10,560 0,420Z', 'url(#wLava)', 'opacity=".85"')}${C(-40, 300, 50, '#E8D8F5', 'opacity=".8"')}${C(10, 230, 66, '#F3E9FA', 'opacity=".75"')}${C(70, 140, 80, '#FFFFFF', 'opacity=".6"')}</g>`,
    mid: P(`M${X0},780 Q400,720 900,770 T2060,760 L2060,1160 L${X0},1160Z`, '#6FCB6F') + palm(200, 800, 1) + palm(1700, 800, .9) + fern(560, 800, .9) + fern(1240, 790, 1.1) + fern(1900, 800, .8) + fern(40, 810, .8)
      + [[800, 790, 40], [1000, 800, 30], [1550, 790, 50]].map(([x, y, r]) => E(x, y, r * 1.6, r, '#9A8F9C') + E(x - 10, y - 8, r * 1.1, r * .6, '#B8AEB9')).join(''),
    ground: P(`M${X0},860 Q480,810 960,850 T2060,840 L2060,1160 L${X0},1160Z`, 'url(#wDinoGround)') + P(`M${X0},880 Q300,860 700,880 T1500,870 T2060,890 L2060,1160 L${X0},1160Z`, '#D5A560', 'opacity=".6"')
      + [[300, 980], [520, 1020], [1500, 990], [1740, 1030]].map(([x, y]) => `<g transform="translate(${x},${y})">${E(0, 0, 26, 18, '#A97A3A', 'opacity=".5"')}${[-20, 0, 20].map((d) => C(d, -22, 7, '#A97A3A', 'opacity=".5"')).join('')}</g>`).join(''),
    fg: fern(-60, 1180, 1.8, '#238F49') + fern(1960, 1180, 1.7, '#238F49') + fern(100, 1200, 1.2, '#2FA85A'), floor: 910,
  };

  /* ------------------------------------------------------------- CLOUD: Cloud Kingdom */
  const tower = (x, y, w, h, roof) => `<g transform="translate(${x},${y})">${R(-w / 2, -h, w, h, 18, '#fff')}${R(-w / 2 + 10, -h + 20, 14, 36, 7, '#BFD8FF')}${P(`M${-w / 2 - 12},${-h} L0,${-h - w * .9} L${w / 2 + 12},${-h}Z`, roof)}${R(-2, -h - w * .9 - 40, 4, 44, 2, '#8A7BC8')}${P(`M2,${-h - w * .9 - 40} L38,${-h - w * .9 - 28} L2,${-h - w * .9 - 16}Z`, '#FF6B9B')}</g>`;
  W_.cloud = {
    far: rect('url(#wSkyCloud)') + C(1500, 190, 220, 'url(#wSun)') + C(1500, 190, 84, '#FFE066') + cloud(260, 200, 1.2) + cloud(900, 120, .8) + cloud(1750, 420, 1)
      + `<g opacity=".95">${rainbow(1100, 640, 420, 22)}</g>`
      + `<g transform="translate(860,820)">${E(0, 40, 360, 50, '#fff')}${tower(-170, 20, 110, 220, '#FF8FCB')}${tower(0, 20, 150, 330, '#8E6BFF')}${tower(180, 20, 100, 200, '#5CC8FF')}${R(-90, -70, 180, 90, 22, '#F4F8FF')}${P('M-24,20 L-24,-30 Q0,-56 24,-30 L24,20Z', '#8E6BFF')}</g>`,
    mid: cloud(180, 780, 1.6, '#fff', '#CFE0FF') + cloud(620, 820, 1.2) + cloud(1500, 800, 1.7) + cloud(1900, 850, 1.3)
      + [[420, 560], [1320, 520], [1660, 640]].map(([x, y]) => `<g transform="translate(${x},${y})">${E(0, 20, 110, 24, '#fff')}${E(0, 36, 90, 16, '#BFD8FF')}</g>`).join('') + [...Array(10)].map((_, i) => `<g transform="translate(${rnd() * 2000 - 100},${rnd() * 500 + 120})">${P(STAR(10 + rnd() * 10), '#fff', 'opacity=".8"')}</g>`).join(''),
    ground: P(`M${X0},880 Q200,820 420,860 Q640,800 900,850 Q1200,800 1500,850 Q1800,810 2060,860 L2060,1160 L${X0},1160Z`, 'url(#wCloudFloor)')
      + [[100, 940, 1.2], [520, 990, 1.5], [900, 960, 1], [1300, 1000, 1.4], [1700, 950, 1.3]].map(([x, y, s]) => `<g transform="translate(${x},${y}) scale(${s})">${E(0, 30, 130, 26, '#C9DFFF', 'opacity=".5"')}</g>`).join(''),
    fg: cloud(60, 1120, 1.9) + cloud(1900, 1130, 2) + cloud(1000, 1190, 2.6, '#fff', '#D4E4FF'), floor: 915,
  };

  /* ------------------------------------------------------------- WORKSHOP: Robot Workshop */
  const gear = (x, y, r, c, teeth = 10) => `<g transform="translate(${x},${y})">${[...Array(teeth)].map((_, i) => R(-r * .14, -r * 1.12, r * .28, r * .34, 4, c, `transform="rotate(${i * 360 / teeth})"`)).join('')}${C(0, 0, r, c)}${C(0, 0, r * .55, '#7B8FD0', 'opacity=".5"')}${C(0, 0, r * .22, '#fff', 'opacity=".6"')}</g>`;
  W_.workshop = {
    far: rect('url(#wWork)') + [...Array(12)].map((_, i) => R(X0 + i * 190, Y0, 8, H, 0, '#fff', 'opacity=".25"')).join('') + [...Array(8)].map((_, i) => R(X0, Y0 + i * 160, W, 6, 0, '#fff', 'opacity=".22"')).join('')
      + R(620, 140, 680, 400, 40, '#2A2A66') + R(644, 164, 632, 352, 28, '#12123A') + stars(40, 170, 510, 2.2).replace(/cx="(-?\d+\.?\d*)"/g, (m, v) => `cx="${644 + ((+v + 140) / W) * 632}"`)
      + C(960, 340, 70, 'url(#wPlanetA)') + E(960, 340, 110, 20, 'none', 'stroke="#FFE08A" stroke-width="8" transform="rotate(-16 960 340)"')
      + gear(220, 280, 120, '#FFB84D') + gear(1700, 240, 150, '#FF8FCB', 12),
    mid: R(X0, 700, W, 140, 0, '#7E9BE0', 'opacity=".5"') + [[150, 640], [480, 660], [1450, 650], [1780, 640]].map(([x, y], i) => `<g transform="translate(${x},${y})">${R(-110, 0, 220, 200, 14, '#fff')}${R(-92, 16, 184, 120, 10, '#1B1B4B')}${[C(-40, 76, 28, '#FF6B8B'), R(-26, 52, 52, 48, 4, '#FFD23F'), P('M0,-34 L32,28 L-32,28Z', '#5CF0C3', 'transform="translate(40,76)"'), P(STAR(30), '#5CF0FF', 'transform="translate(0,76)"')][i % 4]}</g>`).join('')
      + gear(80, 880, 80, '#FFD23F') + gear(1840, 900, 96, '#5CF0C3', 12),
    ground: R(X0, 900, W, 260, 0, 'url(#wBelt)') + R(X0, 892, W, 14, 0, '#FFD23F') + [...Array(24)].map((_, i) => P(`M${X0 + i * 100},1000 l36,0 l24,28 l-36,0 l-24,-28Z`, '#FFD23F', 'opacity=".55"')).join('') + [...Array(24)].map((_, i) => R(X0 + i * 100, 1090, 54, 8, 4, '#8FA0E8', 'opacity=".5"')).join(''),
    fg: `<g transform="translate(120,-80)">${R(-6, 0, 12, 260, 5, '#2A2A66')}${P('M-70,260 Q0,180 70,260Z', '#FFD23F')}${C(0, 262, 40, 'url(#wGlowGold)', 'opacity=".7"')}</g><g transform="translate(1800,-80)">${R(-6, 0, 12, 240, 5, '#2A2A66')}${P('M-70,240 Q0,160 70,240Z', '#FFD23F')}${C(0, 242, 40, 'url(#wGlowGold)', 'opacity=".7"')}</g>`, floor: 925,
  };

  /* ------------------------------------------------------------- DISCO: Wiggle Stage */
  W_.disco = {
    far: rect('url(#wDisco)') + [...Array(12)].map((_, r) => [...Array(14)].map((_, c) => R(X0 + 10 + c * 160, Y0 + 20 + r * 100, 140, 80, 14, ['#FF5E7E', '#FFD23F', '#4CC9F0', '#B06BFF', '#4CD964'][(r * 3 + c * 2) % 5], 'opacity=".16"')).join('')).join('')
      + [[300, '#FF5E7E'], [700, '#4CC9F0'], [1100, '#FFD23F'], [1500, '#B06BFF']].map(([x, c]) => P(`M${x - 20},${Y0} L${x + 20},${Y0} L${x + 220},900 L${x - 220},900Z`, c, 'opacity=".22"')).join(''),
    mid: `<g transform="translate(960,40)">${R(-4, -120, 8, 120, 3, '#fff')}${C(0, 90, 86, '#E8E8FF')}${[...Array(6)].map((_, i) => P(`M-86,${90 - 60 + i * 24} Q0,${90 - 40 + i * 24} 86,${90 - 60 + i * 24}`, 'none', 'stroke="#9A9AD8" stroke-width="3"')).join('')}${[...Array(8)].map((_, i) => R(-90 + i * 24, 36 + (i % 3) * 40, 14, 14, 2, '#fff', 'opacity=".7"')).join('')}${C(0, 90, 150, 'url(#wGlowViolet)', 'opacity=".6"')}</g>`
      + [[130, 660], [1790, 660]].map(([x, y]) => `<g transform="translate(${x},${y})">${R(-90, 0, 180, 300, 20, '#1B1B4B')}${C(0, 90, 56, '#4B4B96')}${C(0, 90, 28, '#2B2B66')}${C(0, 210, 38, '#4B4B96')}${C(0, 210, 18, '#2B2B66')}${R(-70, 14, 140, 6, 3, '#FF5E7E')}</g>`).join(''),
    ground: P(`M${X0},800 L2060,800 L2060,1160 L${X0},1160Z`, 'url(#wFloor)') + [...Array(8)].map((_, r) => [...Array(18)].map((_, c) => P(`M${X0 + c * 140 + (r % 2) * 70},${800 + r * 46} l140,0 l0,46 l-140,0Z`, ['#FF5E7E', '#FFD23F', '#4CC9F0', '#B06BFF', '#4CD964'][(r + c) % 5], `opacity="${(.22 + r * .05).toFixed(2)}"`)).join('')).join(''),
    fg: [...Array(26)].map((_, i) => `<g transform="translate(${rnd() * 2100 - 100},${rnd() * 1200 - 100}) rotate(${rnd() * 360})">${R(-7, -4, 14, 8, 2, ['#FF5E7E', '#FFD23F', '#4CC9F0', '#B06BFF'][i % 4], 'opacity=".75"')}</g>`).join(''), floor: 930,
  };

  /* ------------------------------------------------------------- SPACE: the Kiddo Lane */
  W_.space = {
    far: rect('url(#wSkySpace)') + C(420, 330, 360, 'url(#wGlowViolet)', 'opacity=".5"') + C(1500, 760, 420, 'url(#wGlowGold)', 'opacity=".18"') + stars(160, Y0, Y1, 3.4),
    mid: C(1560, 260, 150, 'url(#wPlanetA)') + E(1560, 260, 240, 38, 'none', 'stroke="#FFE08A" stroke-width="14" transform="rotate(-16 1560 260)" opacity=".95"')
      + C(300, 760, 110, 'url(#wPlanetB)') + E(300, 760, 74, 14, '#fff', 'opacity=".25" transform="rotate(-12 300 760)"') + C(760, 160, 54, 'url(#wPlanetC)') + stars(30, Y0, Y1, 5, '#FFE9A0'),
    ground: `<path d="M${X0},1080 Q480,950 1000,1020 T2060,970" fill="none" stroke="#FF5E7E" stroke-width="20" opacity=".55"/><path d="M${X0},1108 Q480,978 1000,1048 T2060,998" fill="none" stroke="#FFD23F" stroke-width="20" opacity=".55"/><path d="M${X0},1136 Q480,1006 1000,1076 T2060,1026" fill="none" stroke="#4CC9F0" stroke-width="20" opacity=".55"/>`,
    fg: [...Array(18)].map(() => P(STAR(6 + rnd() * 10), '#fff', `transform="translate(${rnd() * 2100 - 100},${rnd() * 1200 - 100})" opacity="${(.4 + rnd() * .5).toFixed(2)}"`)).join(''), floor: 1000,
  };

  /* ------------------------------------------------------------- FINALE: starlit Kiddoverse */
  W_.finale = {
    far: rect('url(#wSkyNight)') + stars(140, Y0, 760, 3.6) + `<g opacity=".55"><path d="M${X0},300 Q500,100 960,260 T2060,200 L2060,420 Q1500,340 960,420 T${X0},420Z" fill="#5CF0C3" opacity=".25"/><path d="M${X0},360 Q500,160 960,320 T2060,260 L2060,470 Q1500,400 960,470 T${X0},480Z" fill="#B06BFF" opacity=".25"/></g>`,
    mid: C(960, 360, 280, 'url(#wGlowGold)', 'opacity=".55"') + `<g transform="translate(960,360)">${P(STAR(130), '#FFD23F', 'stroke="#FFF6B0" stroke-width="10" stroke-linejoin="round"')}${P(STAR(70), '#FFF6B0', 'opacity=".8"')}</g>` + P(`M${X0},780 Q400,700 860,770 T1700,740 T2060,780 L2060,1160 L${X0},1160Z`, '#2D1D90'),
    ground: W_.hub.ground, fg: W_.hub.fg + [...Array(24)].map(() => C(rnd() * 2100 - 100, 700 + rnd() * 400, 4 + rnd() * 4, '#FFF3A0', `opacity="${(.5 + rnd() * .5).toFixed(2)}"`)).join(''), floor: 905,
  };

  root.KVW = { DEFS, WORLDS: W_, X0, X1, Y0, Y1, helpers: { cloud, tree, flower, tuft, STAR, bokeh, stars, gear } };
})(typeof window !== 'undefined' ? window : globalThis);
