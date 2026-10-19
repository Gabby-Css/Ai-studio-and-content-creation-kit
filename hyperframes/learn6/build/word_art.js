/* KiddoVerse LEARN #6 "Sound It Out" - art: three more pictures for the three-letter words (a school bus, a milk cup, a running shoe).
   cat / dog / pig come from animal_art.js (talking heads with <g class="mc"> / <g class="mo">), sun / hat / apple / whale from the object libraries.
   KVOBJ.draw('bus' | 'cup' | 'shoe') -> markup centred on (0,0), about 240 px across. */
(function (root) {
  const OL = '#2B1B5E';
  const sw = (w) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const P = (d, f, w = 7, x = '') => `<path d="${d}" fill="${f}" ${w ? sw(w) : ''} ${x}/>`;
  const E = (cx, cy, rx, ry, f, w = 7, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${w ? sw(w) : ''} ${x}/>`;
  const C = (cx, cy, r, f, w = 7, x = '') => E(cx, cy, r, r, f, w, x);
  const R = (x, y, w_, h, r, f, w = 7, ex = '') => `<rect x="${x}" y="${y}" width="${w_}" height="${h}" rx="${r}" fill="${f}" ${w ? sw(w) : ''} ${ex}/>`;
  const L = (d, w = 6, c = OL, x = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
  const HL = (cx, cy, rx, ry, rot = -30, op = .55) => E(cx, cy, rx, ry, '#fff', 0, `opacity="${op}" transform="rotate(${rot} ${cx} ${cy})"`);
  const eye = (x, y, r = 11) => C(x, y, r, '#fff', 5) + C(x + r * .12, y + r * .1, r * .52, OL, 0) + C(x + r * .3, y - r * .12, r * .2, '#fff', 0);

  const X = {};
  X.bus = () => R(-122, -54, 244, 108, 26, '#FFC21F', 8) + R(-122, 14, 244, 12, 0, OL, 0) + [0, 1, 2, 3].map((i) => R(-104 + i * 50, -38, 40, 36, 8, '#BDEBFF', 5) + HL(-96 + i * 50, -26, 5, 11, 20, .6)).join('')
    + R(88, -38, 28, 50, 8, '#BDEBFF', 5) + C(114, 36, 8, '#FFF6B0', 4) + [-68, 66].map((x) => C(x, 56, 26, '#4B4F77', 8) + C(x, 56, 10, '#B8BCE0', 0)).join('') + L('M-122,-54 L-122,-80 L-60,-80 L-60,-54', 0) + HL(-70, -44, 20, 6, 0, .35);
  X.cup = () => L('M54,-30 Q112,-34 104,12 Q96,56 46,48', 18, OL) + L('M54,-30 Q112,-34 104,12 Q96,56 46,48', 8, '#4CC9F0')
    + P('M-64,-58 L64,-58 L50,72 Q48,90 30,90 L-30,90 Q-48,90 -50,72Z', '#4CC9F0', 8) + E(0, -58, 64, 18, '#fff', 7) + E(0, -56, 50, 11, '#FFF6DC', 0)
    + eye(-22, 6, 12) + eye(22, 6, 12) + L('M-16,36 Q0,52 16,36', 5) + E(-34, 30, 12, 8, '#FF7A8F', 0, 'opacity=".5"') + E(34, 30, 12, 8, '#FF7A8F', 0, 'opacity=".5"') + HL(-42, 20, 8, 28, 8, .45)
    + L('M-14,-92 Q-24,-108 -12,-122 Q0,-136 -10,-150', 6, 'rgba(255,255,255,.85)') + L('M18,-92 Q8,-108 20,-122', 6, 'rgba(255,255,255,.7)');
  X.shoe = () => L('M-118,70 L118,70', 0) + P('M-104,30 L-104,-24 Q-104,-62 -66,-62 L-26,-62 L6,-20 L74,2 Q112,14 112,48 L112,50 L-104,50Z', '#FF5E7E', 8) + R(-110, 42, 228, 28, 14, '#fff', 8)
    + P('M-26,-62 L6,-20 L-30,-22Z', '#FF9BB8', 5) + L('M-8,-40 L18,-22 M6,-30 L28,-12 M20,-20 L40,-4', 6, '#fff') + P('M-76,-6 L-60,-34 L-46,-6 L-82,-26 L-40,-26Z', '#FFD23F', 4) + HL(-78, -34, 10, 20, 10, .5)
    + L('M-150,-20 L-122,-20 M-160,10 L-124,10 M-146,38 L-120,38', 8, '#4CC9F0');

  const base = root.KVOBJ.draw;
  root.KVOBJ.draw = (kind, col) => (X[kind] ? X[kind](col) : base(kind, col));
  root.KVOBJ.kinds = root.KVOBJ.kinds.concat(Object.keys(X));
})(window);
