/* KiddoVerse LEARN #2 - extra objects for "The Color Train" (same outlined cartoon style as edu_objects.js).
   Adds: cherry, orange, carrot, frog, leaf, whale, blueball  to KVOBJ.draw(kind, colour?).  Every object is centred on (0,0), about 200 x 200 px. */
(function (root) {
  const OL = '#2B1B5E';
  const sw = (w) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const P = (d, f, w = 7, x = '') => `<path d="${d}" fill="${f}" ${w ? sw(w) : ''} ${x}/>`;
  const E = (cx, cy, rx, ry, f, w = 7, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${w ? sw(w) : ''} ${x}/>`;
  const C = (cx, cy, r, f, w = 7, x = '') => E(cx, cy, r, r, f, w, x);
  const R = (x, y, w_, h, r, f, w = 7, ex = '') => `<rect x="${x}" y="${y}" width="${w_}" height="${h}" rx="${r}" fill="${f}" ${w ? sw(w) : ''} ${ex}/>`;
  const L = (d, w = 7, c = OL, x = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
  const HL = (cx, cy, rx, ry, rot = -30, op = .55) => E(cx, cy, rx, ry, '#fff', 0, `opacity="${op}" transform="rotate(${rot} ${cx} ${cy})"`);
  const eye = (x, y, r = 12) => C(x, y, r, '#fff', 5) + C(x + r * .12, y + r * .1, r * .52, OL, 0) + C(x + r * .3, y - r * .12, r * .2, '#fff', 0);
  const smile = (x, y, w = 22, d = 12) => L(`M${x - w},${y} Q${x},${y + d * 2} ${x + w},${y}`, 5);
  const cheek = (x, y, c = '#FF7A8F') => E(x, y, 14, 8, c, 0, 'opacity=".5"');
  const leaf = (x, y, rot = 0, s = 1, c = '#4CD964') => P('M0,0 C22,-30 62,-24 66,-8 C46,10 16,8 0,0Z', c, 6, `transform="translate(${x},${y}) rotate(${rot}) scale(${s})"`);

  const O = {};
  O.cherry = (c = '#E8122E') => L('M-40,0 Q-34,-62 8,-96 M42,12 Q38,-52 8,-96', 7, '#5E8C2A') + leaf(10, -94, -12, .85) + C(-42, 38, 46, c) + C(44, 52, 46, c) + HL(-56, 22, 9, 15, 25, .6) + HL(30, 36, 9, 15, 25, .6);
  O.orange = () => C(0, 10, 86, '#FF9F1C') + [[-40, -6], [30, -26], [44, 30], [-12, 44], [-46, 46], [6, 4]].map(([x, y]) => C(x, y, 3.5, '#E07B00', 0, 'opacity=".7"')).join('') + R(-5, -84, 10, 20, 3, '#8A5A2B', 5) + leaf(6, -72, -16, .85) + HL(-38, -26, 15, 27, 28, .5);
  O.carrot = () => `<g transform="rotate(-18)">` + P('M0,-50 C-30,-100 -52,-84 -44,-58Z', '#3FBF5A', 6) + P('M0,-50 C-6,-112 20,-112 18,-56Z', '#4CD964', 6) + P('M0,-50 C30,-98 56,-80 42,-56Z', '#3FBF5A', 6)
    + P('M-38,-52 Q0,-70 38,-52 L12,100 Q0,112 -12,100Z', '#FF8A1F') + L('M-24,-26 L-6,-30 M20,-6 L4,-10 M-16,24 L0,20 M12,52 L2,48', 5, '#D96A00') + HL(-20, -34, 7, 22, 10, .45) + `</g>`;
  O.frog = () => E(0, 28, 88, 64, '#3FCB5E') + C(-46, -34, 28, '#3FCB5E') + C(46, -34, 28, '#3FCB5E') + eye(-46, -36, 17) + eye(46, -36, 17) + E(0, 50, 54, 32, '#C8F7CC', 0, 'opacity=".9"')
    + smile(0, 22, 34, 14) + cheek(-62, 30) + cheek(62, 30) + E(-62, 86, 26, 12, '#34B552') + E(62, 86, 26, 12, '#34B552') + HL(-60, 4, 14, 8, -20, .4);
  O.leaf = () => P('M0,-100 C74,-70 84,22 0,100 C-84,22 -74,-70 0,-100Z', '#38C65A') + L('M0,-82 L0,98', 6, '#1E8F3A') + L('M0,-34 L38,-56 M0,8 L42,-16 M0,48 L36,26 M0,-34 L-38,-56 M0,8 L-42,-16 M0,48 L-36,26', 5, '#1E8F3A') + HL(-32, -40, 10, 26, 18, .45);
  O.whale = () => L('M-18,-64 Q-22,-96 -40,-110 M-18,-64 Q-6,-96 14,-106', 7, '#9FD0FF') + P('M-100,12 C-100,-50 -30,-76 30,-64 C84,-54 104,-14 96,20 C88,58 20,78 -30,74 C-72,70 -100,50 -100,12Z', '#2F8BFF')
    + P('M92,4 C112,-22 128,-40 130,-66 C112,-56 96,-50 84,-34Z', '#2F8BFF') + E(-6, 42, 72, 26, '#A9D2FF', 0, 'opacity=".9"') + eye(-54, -8, 13) + smile(-58, 24, 20, 9) + cheek(-82, 18) + HL(-40, -40, 22, 9, -20, .45);
  O.blueball = () => { const ws = [...Array(6)].map((_, i) => { const a0 = (i * 60 - 90) * Math.PI / 180, a1 = ((i + 1) * 60 - 90) * Math.PI / 180, r = 90; return P(`M0,0 L${(r * Math.cos(a0)).toFixed(1)},${(r * Math.sin(a0)).toFixed(1)} A${r},${r} 0 0 1 ${(r * Math.cos(a1)).toFixed(1)},${(r * Math.sin(a1)).toFixed(1)}Z`, i % 2 ? '#8EC3FF' : '#2F8BFF', 0); }).join(''); return ws + C(0, 0, 90, 'none', 8) + C(0, 0, 15, '#fff', 5) + HL(-38, -46, 15, 26, 35, .45); };

  const base = root.KVOBJ.draw;
  root.KVOBJ.draw = (kind, col) => (O[kind] ? O[kind](col) : base(kind, col));
  root.KVOBJ.kinds = root.KVOBJ.kinds.concat(Object.keys(O));
})(window);
