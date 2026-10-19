/* KiddoVerse LEARN #3 - eight animal HEADS for "Animal Sounds Dance Party" (same outlined cartoon style as the characters).
   KVOBJ.draw('cow' | 'duck' | 'pig' | 'sheep' | 'dog' | 'cat' | 'horse' | 'lion') -> markup centred on (0,0), about 240 x 240 px at scale 1.
   Every head has <g class="mc"> (closed mouth) and <g class="mo"> (open mouth, hidden): the animal prop swaps them on the sung sound word.
   KVOBJ.drawShadow(kind) -> the same head as a dark mystery silhouette. */
(function (root) {
  const OL = '#2B1B5E';
  const sw = (w) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const P = (d, f, w = 7, x = '') => `<path d="${d}" fill="${f}" ${w ? sw(w) : ''} ${x}/>`;
  const E = (cx, cy, rx, ry, f, w = 7, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${w ? sw(w) : ''} ${x}/>`;
  const C = (cx, cy, r, f, w = 7, x = '') => E(cx, cy, r, r, f, w, x);
  const L = (d, w = 6, c = OL, x = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
  const HL = (cx, cy, rx, ry, rot = -30, op = .5) => E(cx, cy, rx, ry, '#fff', 0, `opacity="${op}" transform="rotate(${rot} ${cx} ${cy})"`);
  const eye = (x, y, r = 14) => C(x, y, r, '#fff', 5) + C(x + r * .12, y + r * .12, r * .55, OL, 0) + C(x + r * .32, y - r * .1, r * .2, '#fff', 0);
  const cheek = (x, y) => E(x, y, 15, 9, '#FF7A8F', 0, 'opacity=".5"');
  const mouths = (closed, open) => `<g class="mc">${closed}</g><g class="mo" opacity="0">${open}</g>`;
  const inner = (cx, cy, rx, ry) => E(cx, cy, rx, ry, '#7A1F3D', 6) + E(cx, cy + ry * .45, rx * .6, ry * .42, '#FF7A8F', 0);

  const A = {};
  A.cow = () => P('M-52,-78 Q-66,-122 -34,-114 Q-42,-98 -30,-80Z', '#F6E7B6', 6) + P('M52,-78 Q66,-122 34,-114 Q42,-98 30,-80Z', '#F6E7B6', 6)
    + E(-100, -34, 30, 19, '#fff', 7, 'transform="rotate(-24 -100 -34)"') + E(100, -34, 30, 19, '#fff', 7, 'transform="rotate(24 100 -34)"') + E(-100, -34, 16, 9, '#FFB8C9', 0, 'transform="rotate(-24 -100 -34)"') + E(100, -34, 16, 9, '#FFB8C9', 0, 'transform="rotate(24 100 -34)"')
    + E(0, -4, 94, 88, '#fff') + E(-54, -42, 28, 24, '#3B3350', 0, 'transform="rotate(-20 -54 -42)"') + E(58, -62, 18, 14, '#3B3350', 0)
    + eye(-36, -18, 15) + eye(36, -18, 15) + E(0, 44, 60, 40, '#FFB8C9') + C(-20, 36, 7, OL, 0) + C(20, 36, 7, OL, 0) + cheek(-70, 22) + cheek(70, 22)
    + mouths(L('M-26,62 Q0,76 26,62', 6), E(0, 66, 34, 20, '#7A1F3D', 6) + E(0, 74, 18, 9, '#FF7A8F', 0)) + HL(-56, -60, 14, 8, -30, .55);
  A.duck = () => P('M-8,-96 Q-30,-132 -2,-118 Q10,-132 14,-96Z', '#FFD23F', 6) + C(0, 0, 92, '#FFD23F') + HL(-48, -52, 18, 10, -30, .55) + eye(-34, -20, 15) + eye(34, -20, 15) + cheek(-60, 20) + cheek(60, 20)
    + mouths(E(0, 40, 54, 22, '#FF9F43', 7) + L('M-34,44 Q0,54 34,44', 5), P('M-56,28 Q0,6 56,28 Q0,40 -56,28Z', '#FF9F43', 7) + E(0, 54, 44, 22, '#7A1F3D', 7) + P('M-40,56 Q0,40 40,56 Q0,76 -40,56Z', '#F28A2E', 6));
  A.pig = () => P('M-62,-60 L-98,-104 L-30,-84Z', '#FF86A8', 7) + P('M62,-60 L98,-104 L30,-84Z', '#FF86A8', 7) + E(0, 0, 94, 84, '#FF9BB8') + HL(-50, -50, 18, 10, -30, .5)
    + eye(-38, -20, 14) + eye(38, -20, 14) + cheek(-70, 26) + cheek(70, 26) + E(0, 26, 46, 34, '#FFB3CC') + E(-15, 24, 7, 11, '#C2557A', 0) + E(15, 24, 7, 11, '#C2557A', 0)
    + mouths(L('M-24,64 Q0,76 24,64', 6), E(0, 66, 30, 17, '#7A1F3D', 6) + E(0, 72, 15, 7, '#FF7A8F', 0));
  A.sheep = () => [[-78, -40, 38], [-30, -78, 40], [30, -78, 40], [78, -40, 38], [-88, 14, 34], [88, 14, 34], [-64, 62, 32], [64, 62, 32], [0, -88, 38]].map(([x, y, r]) => C(x, y, r, '#fff', 7)).join('')
    + E(-98, 8, 26, 16, '#6B5A7E', 7, 'transform="rotate(-20 -98 8)"') + E(98, 8, 26, 16, '#6B5A7E', 7, 'transform="rotate(20 98 8)"') + E(0, 12, 66, 78, '#6B5A7E') + HL(-34, -34, 14, 9, -30, .35)
    + eye(-28, -6, 15) + eye(28, -6, 15) + cheek(-48, 24) + cheek(48, 24) + E(0, 30, 30, 20, '#8A7899', 0) + E(-9, 28, 4, 5, OL, 0) + E(9, 28, 4, 5, OL, 0)
    + mouths(L('M-20,52 Q0,64 20,52', 6), E(0, 56, 22, 16, '#7A1F3D', 6) + E(0, 62, 12, 7, '#FF7A8F', 0));
  A.dog = () => E(-92, 12, 28, 60, '#8A5A2B', 7, 'transform="rotate(14 -92 12)"') + E(92, 12, 28, 60, '#8A5A2B', 7, 'transform="rotate(-14 92 12)"') + E(0, 0, 84, 82, '#D9955A') + E(-34, -22, 26, 24, '#8A5A2B', 0, 'opacity=".85"')
    + HL(-44, -52, 16, 9, -30, .45) + eye(-30, -18, 15) + eye(30, -18, 15) + E(0, 38, 50, 38, '#FFF1D9') + E(0, 18, 20, 13, OL, 0) + C(-6, 14, 4, '#fff', 0) + cheek(-62, 26) + cheek(62, 26)
    + mouths(L('M0,30 L0,44 M0,44 Q-14,58 -28,48 M0,44 Q14,58 28,48', 6), E(0, 54, 30, 20, '#7A1F3D', 6) + P('M-14,60 Q0,96 16,60Z', '#FF7A8F', 6));
  A.cat = () => P('M-84,-26 L-74,-104 L-24,-62Z', '#FFA94D', 7) + P('M84,-26 L74,-104 L24,-62Z', '#FFA94D', 7) + P('M-68,-52 L-64,-84 L-40,-66Z', '#FF9BB8', 0) + P('M68,-52 L64,-84 L40,-66Z', '#FF9BB8', 0)
    + E(0, 8, 94, 80, '#FFA94D') + L('M-16,-66 L-12,-44 M0,-70 L0,-44 M16,-66 L12,-44', 7, '#E8761F') + HL(-50, -40, 16, 9, -30, .45) + eye(-36, -2, 16) + eye(36, -2, 16) + cheek(-66, 28) + cheek(66, 28)
    + P('M-9,24 L9,24 L0,35Z', '#FF6B8B', 4) + L('M-62,28 L-104,18 M-62,42 L-104,46 M62,28 L104,18 M62,42 L104,46', 4)
    + mouths(L('M0,35 Q-10,50 -24,42 M0,35 Q10,50 24,42', 5), E(0, 56, 24, 20, '#7A1F3D', 6) + E(0, 64, 14, 9, '#FF7A8F', 0));
  A.horse = () => P('M-34,-92 L-42,-134 L-6,-102Z', '#9B6130', 7) + P('M34,-92 L42,-134 L6,-102Z', '#9B6130', 7) + P('M-30,-104 Q-86,-96 -92,-18 Q-70,-46 -48,-44 Q-60,-70 -22,-92Z', '#5A341A', 7) + P('M-14,-110 Q0,-146 22,-108 Q4,-100 -14,-110Z', '#5A341A', 7)
    + E(0, -2, 78, 94, '#B9783E') + HL(-34, -50, 14, 20, -20, .4) + eye(-36, -28, 15) + eye(36, -28, 15) + P('M-6,-96 L6,-96 L10,-40 L-10,-40Z', '#fff', 0, 'opacity=".75"')
    + E(0, 58, 52, 36, '#E7BE8E') + E(-18, 54, 7, 10, '#7A4A22', 0) + E(18, 54, 7, 10, '#7A4A22', 0) + cheek(-62, 8) + cheek(62, 8)
    + mouths(L('M-26,78 Q0,90 26,78', 6), E(0, 80, 32, 18, '#7A1F3D', 6) + E(0, 86, 16, 8, '#FF7A8F', 0));
  A.lion = () => [...Array(14)].map((_, i) => E(0, -92, 24, 38, i % 2 ? '#FF9F43' : '#F28A2E', 7, `transform="rotate(${i * 360 / 14} 0 0)"`)).join('') + C(0, 0, 104, '#FF9F43', 7) + E(-84, -44, 26, 22, '#FFC966', 7) + E(84, -44, 26, 22, '#FFC966', 7) + C(0, 8, 72, '#FFC966')
    + HL(-40, -40, 16, 9, -30, .5) + eye(-30, -14, 15) + eye(30, -14, 15) + cheek(-54, 22) + cheek(54, 22) + E(0, 40, 40, 28, '#FFE8B0') + P('M-12,20 L12,20 L0,34Z', '#C2557A', 5)
    + mouths(L('M0,34 L0,46 M0,46 Q-14,60 -28,50 M0,46 Q14,60 28,50', 6), E(0, 56, 32, 24, '#7A1F3D', 6) + P('M-18,40 L-12,56 L-6,40Z', '#fff', 3) + P('M18,40 L12,56 L6,40Z', '#fff', 3) + E(0, 68, 18, 9, '#FF7A8F', 0));

  const base = root.KVOBJ.draw;
  root.KVOBJ.draw = (kind, col) => (A[kind] ? A[kind](col) : base(kind, col));
  root.KVOBJ.drawShadow = (kind) => `<g style="filter:brightness(0)" opacity=".5">${A[kind]()}</g>`;
  root.KVOBJ.kinds = root.KVOBJ.kinds.concat(Object.keys(A));
})(window);
