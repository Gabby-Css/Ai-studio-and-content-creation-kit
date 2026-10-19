/* KiddoVerse LEARN #5 "Gizmo's Counting Machine" - art: ten cheap little COUNTERS for the ten-frames (CNT.mini), the three skip-counting things
   (a pair of socks, a hand with five fingers, a train car carrying ten) and a big 'gem' for the object pops.  Same outlined cartoon style.
   CNT.mini(kind)            -> a counter, about 92 px across, centred on (0,0)            kinds: star cookie apple balloon heart fish ball gem flower bee
   CNT.item(kind, i)         -> a skip-counting item, about 200 px across, centred          kinds: sock (a PAIR), hand, car   (i = colour index)
   CNT.COL[kind]             -> the counter's main colour (for badges and bursts)          */
(function (root) {
  const OL = '#2B1B5E';
  const sw = (w) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const P = (d, f, w = 5, x = '') => `<path d="${d}" fill="${f}" ${w ? sw(w) : ''} ${x}/>`;
  const E = (cx, cy, rx, ry, f, w = 5, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${w ? sw(w) : ''} ${x}/>`;
  const C = (cx, cy, r, f, w = 5, x = '') => E(cx, cy, r, r, f, w, x);
  const R = (x, y, w_, h, r, f, w = 5, ex = '') => `<rect x="${x}" y="${y}" width="${w_}" height="${h}" rx="${r}" fill="${f}" ${w ? sw(w) : ''} ${ex}/>`;
  const L = (d, w = 5, c = OL, x = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
  const HL = (cx, cy, rx, ry, rot = -30, op = .55) => E(cx, cy, rx, ry, '#fff', 0, `opacity="${op}" transform="rotate(${rot} ${cx} ${cy})"`);
  const STAR = (r) => `M0,${-r} L${r * .27},${-r * .33} L${r},${-r * .31} L${r * .44},${r * .14} L${r * .62},${r * .84} L0,${r * .46} L${-r * .62},${r * .84} L${-r * .44},${r * .14} L${-r},${-r * .31} L${-r * .27},${-r * .33}Z`;
  const PAL = ['#FF5E7E', '#FFD23F', '#4CC9F0', '#B06BFF', '#4CD964', '#FF9F43'];
  const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16), f = (v) => Math.max(0, Math.min(255, Math.round(v * k))); return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => f(v).toString(16).padStart(2, '0')).join(''); };

  const COL = { star: '#FFD23F', cookie: '#E9A95C', apple: '#FF4D5E', balloon: '#4CC9F0', heart: '#FF5E7E', fish: '#FF9F43', ball: '#4CC9F0', gem: '#4CC9F0', flower: '#FF7EB6', bee: '#FFD23F' };
  const MINI = {
    star: () => P(STAR(50), '#FFD23F', 6) + HL(-14, -18, 7, 14, 30, .6),
    cookie: () => C(0, 0, 44, '#E9A95C', 6) + [[-16, -14, 6], [14, -20, 6], [20, 12, 6], [-20, 14, 5], [0, 2, 6]].map(([x, y, r]) => C(x, y, r, '#6B3F1E', 0)).join(''),
    apple: () => P('M0,-24 C-30,-48 -56,-24 -50,10 C-44,40 -22,52 0,44 C22,52 44,40 50,10 C56,-24 30,-48 0,-24Z', '#FF4D5E', 6) + R(-3, -50, 6, 24, 3, '#8A5A2B', 3) + P('M2,-42 C16,-60 36,-54 38,-46 C28,-34 12,-36 2,-42Z', '#4CD964', 4) + HL(-24, -6, 7, 14, 20, .55),
    balloon: () => E(0, -6, 36, 44, '#4CC9F0', 6) + P('M0,38 L-8,50 L8,50Z', '#4CC9F0', 4) + HL(-14, -22, 7, 14, 20, .6),
    heart: () => P('M0,42 C-50,6 -46,-30 -22,-34 C-8,-36 0,-26 0,-18 C0,-26 8,-36 22,-34 C46,-30 50,6 0,42Z', '#FF5E7E', 6) + HL(-22, -16, 7, 12, 30, .6),
    fish: () => P('M24,0 L52,-24 L52,24Z', '#FFC21F', 5) + E(-6, 0, 38, 26, '#FF9F43', 6) + C(-24, -6, 6, '#fff', 3) + C(-23, -6, 3, OL, 0) + L('M6,-20 Q14,0 6,20', 4, '#FFC21F'),
    ball: () => [...Array(6)].map((_, i) => { const a0 = (i * 60 - 90) * Math.PI / 180, a1 = ((i + 1) * 60 - 90) * Math.PI / 180, r = 44; return P(`M0,0 L${(r * Math.cos(a0)).toFixed(1)},${(r * Math.sin(a0)).toFixed(1)} A${r},${r} 0 0 1 ${(r * Math.cos(a1)).toFixed(1)},${(r * Math.sin(a1)).toFixed(1)}Z`, ['#FF5E7E', '#fff', '#4CC9F0', '#FFD23F', '#fff', '#4CD964'][i], 0); }).join('') + C(0, 0, 44, 'none', 6) + C(0, 0, 7, '#fff', 4) + HL(-16, -22, 7, 12, 30, .6),
    gem: () => P('M0,-46 L38,0 L0,46 L-38,0Z', '#4CC9F0', 6) + P('M0,-46 L38,0 L0,0 L-38,0Z', '#9BEBFF', 0) + L('M-38,0 L38,0 M0,-46 L0,46', 3, 'rgba(43,27,94,.45)') + P('M0,-46 L38,0 L0,46 L-38,0Z', 'none', 6) + HL(-12, -20, 5, 12, 30, .7),
    flower: () => [0, 60, 120, 180, 240, 300].map((a) => E(0, -24, 13, 20, '#FF7EB6', 4, `transform="rotate(${a})"`)).join('') + C(0, 0, 13, '#FFD23F', 4),
    bee: () => E(-14, -30, 15, 11, '#BDEBFF', 4, 'transform="rotate(-24 -14 -30)"') + E(10, -32, 14, 10, '#BDEBFF', 4, 'transform="rotate(20 10 -32)"') + E(0, 6, 38, 28, '#FFD23F', 6) + L('M-8,-18 Q-14,6 -8,30', 8) + L('M12,-20 Q6,6 12,30', 8) + C(-26, 2, 5, OL, 0),
  };

  // ------------------------------------------------------------------ skip-counting things (about 200 px)
  const sockOne = (c) => P('M-26,-86 L24,-86 L24,-10 Q58,0 72,28 Q82,62 52,78 L-8,78 Q-34,78 -32,50 Z', c, 7) + [-56, -30, -4].map((y) => R(-22, y, 42, 14, 0, '#fff', 0, 'opacity=".85"')).join('') + R(-30, -92, 58, 28, 10, shade(c, 1.18), 6) + L('M-16,-86 L-16,-66 M-4,-86 L-4,-66 M8,-86 L8,-66 M20,-86 L20,-66', 3, 'rgba(43,27,94,.4)') + E(-8, 58, 20, 16, '#FFF1A8', 4) + E(58, 56, 15, 14, '#FFF1A8', 4) + HL(-12, 16, 5, 14, 6, .45);
  const ITEM = {
    sock: (i) => { const c = PAL[(i * 2 + 3) % 6]; return `<g transform="translate(-60,6) scale(.9)">${sockOne(c)}</g><g transform="translate(46,6) rotate(5) scale(.9)">${sockOne(shade(c, 1.12))}</g>`; },
    hand: (i) => {
      const skin = '#FFD3A8', fing = [[-48, 62, 80], [-16, 52, 98], [16, 54, 92], [48, 62, 76]].map(([x, y0, h]) => R(x - 14, y0 - h, 28, h + 30, 14, skin, 6)).join('');
      return fing + R(-66, 0, 132, 112, 42, skin, 7) + `<g transform="translate(-70,64) rotate(-48)">${R(-14, -66, 28, 84, 14, skin, 6)}</g>` + R(-66, 0, 132, 112, 42, skin, 0) + E(-24, 36, 14, 20, '#fff', 0, 'opacity=".4"');
    },
    car: (i) => { const c = PAL[(i * 2 + 1) % 6]; return R(-96, -52, 192, 104, 24, c, 8) + R(-78, -82, 156, 36, 14, shade(c, .8), 7) + R(-70, -36, 140, 62, 12, '#fff', 5) + [0, 1, 2, 3, 4].map((k) => C(-48 + k * 24, -22, 8, c, 3) + C(-48 + k * 24, 6, 8, c, 3)).join('') + [-60, 0, 60].map((x) => C(x, 56, 20, '#4B4F77', 7) + C(x, 56, 7, '#B8BCE0', 0)).join('') + R(96, 30, 36, 12, 5, '#8A8FB8', 5) + R(-132, 30, 36, 12, 5, '#8A8FB8', 5); },
  };

  const base = root.KVOBJ.draw;
  const BIGGEM = () => P('M0,-104 L76,0 L0,104 L-76,0Z', '#4CC9F0', 0) + P('M0,-104 L76,0 L0,0 L-76,0Z', '#9BEBFF', 0) + P('M0,0 L76,0 L0,104Z', '#2F9BFF', 0) + P('M0,-104 L-76,0 L0,0Z', '#6FDAFF', 0) + L('M-76,0 L76,0 M0,-104 L0,104 M-38,-52 L38,-52 M-38,52 L38,52', 4, 'rgba(43,27,94,.45)') + P('M0,-104 L76,0 L0,104 L-76,0Z', 'none', 8) + HL(-26, -44, 8, 22, 30, .7);
  root.KVOBJ.draw = (kind, col) => (kind === 'gem' ? BIGGEM() : ITEM[kind] ? ITEM[kind](col || 0) : base(kind, col));
  root.CNT = { mini: (k) => MINI[k](), item: (k, i = 0) => ITEM[k](i), COL, PAL, shade, STAR };
})(window);
