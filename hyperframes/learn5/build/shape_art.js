/* KiddoVerse LEARN #4 "The Shape Workshop" - art: eight friendly SHAPE characters (circle, square, triangle, rectangle, oval, star, heart, diamond)
   and 15 everyday objects that have those shapes.  Same outlined cartoon style as the characters.
   KVOBJ.draw('sh_circle' ...)      -> a shape character with a face, about 240 px, <g class="mc"> closed mouth / <g class="mo" opacity="0"> open mouth
   KVOBJ.drawPlain(kind, col?)       -> the bare coloured shape (cards, HUD, house)
   KVOBJ.SHAPE_D[kind]               -> the outline path (for the tracing animation)       KVOBJ.SHAPE_COL[kind] -> its colour
   KVOBJ.drawShadow(kind)            -> dark mystery silhouette */
(function (root) {
  const OL = '#2B1B5E';
  const sw = (w) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const P = (d, f, w = 7, x = '') => `<path d="${d}" fill="${f}" ${w ? sw(w) : ''} ${x}/>`;
  const E = (cx, cy, rx, ry, f, w = 7, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${w ? sw(w) : ''} ${x}/>`;
  const C = (cx, cy, r, f, w = 7, x = '') => E(cx, cy, r, r, f, w, x);
  const R = (x, y, w_, h, r, f, w = 7, ex = '') => `<rect x="${x}" y="${y}" width="${w_}" height="${h}" rx="${r}" fill="${f}" ${w ? sw(w) : ''} ${ex}/>`;
  const L = (d, w = 6, c = OL, x = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
  const HL = (cx, cy, rx, ry, rot = -30, op = .5) => E(cx, cy, rx, ry, '#fff', 0, `opacity="${op}" transform="rotate(${rot} ${cx} ${cy})"`);
  const eye = (x, y, r = 15) => C(x, y, r, '#fff', 5) + C(x + r * .12, y + r * .12, r * .55, OL, 0) + C(x + r * .32, y - r * .1, r * .2, '#fff', 0);
  const cheek = (x, y) => E(x, y, 15, 9, '#FF7A8F', 0, 'opacity=".5"');
  const mouths = (closed, open) => `<g class="mc">${closed}</g><g class="mo" opacity="0">${open}</g>`;
  const STAR = (r) => `M0,${-r} L${r * .27},${-r * .33} L${r},${-r * .31} L${r * .44},${r * .14} L${r * .62},${r * .84} L0,${r * .46} L${-r * .62},${r * .84} L${-r * .44},${r * .14} L${-r},${-r * .31} L${-r * .27},${-r * .33}Z`;
  const HEARTBIG = 'M0,92 C-60,52 -118,10 -118,-42 C-118,-80 -92,-100 -62,-100 C-34,-100 -12,-84 0,-60 C12,-84 34,-100 62,-100 C92,-100 118,-80 118,-42 C118,10 60,52 0,92Z';

  const SHAPE_COL = { circle: '#F23B4E', square: '#2F9BFF', triangle: '#FFC21F', rectangle: '#39C95B', oval: '#A66BFF', star: '#FF9F1C', heart: '#FF6FA5', diamond: '#19CFC8' };
  const SHAPE_D = {
    circle: 'M-100,0 A100,100 0 1 0 100,0 A100,100 0 1 0 -100,0Z',
    square: 'M-70,-96 L70,-96 Q96,-96 96,-70 L96,70 Q96,96 70,96 L-70,96 Q-96,96 -96,70 L-96,-70 Q-96,-96 -70,-96Z',
    triangle: 'M0,-104 L118,88 L-118,88Z',
    rectangle: 'M-96,-68 L96,-68 Q116,-68 116,-48 L116,48 Q116,68 96,68 L-96,68 Q-116,68 -116,48 L-116,-48 Q-116,-68 -96,-68Z',
    oval: 'M-80,0 A80,112 0 1 0 80,0 A80,112 0 1 0 -80,0Z',
    star: STAR(128),
    heart: HEARTBIG,
    diamond: 'M0,-124 L94,0 L0,124 L-94,0Z',
  };
  // where the face sits on each shape: eyes (x apart, y), mouth y, cheeks
  const FACE = { circle: [34, -14, 28], square: [36, -14, 26], triangle: [30, 24, 58], rectangle: [44, -12, 22], oval: [30, -22, 18], star: [28, -6, 24], heart: [32, -16, 14], diamond: [26, -12, 20] };
  const HLP = { circle: [-44, -50, 24, 12], square: [-52, -62, 30, 12], triangle: [-18, -36, 12, 22], rectangle: [-68, -42, 30, 10], oval: [-34, -64, 14, 28], star: [-30, -62, 14, 24], heart: [-60, -64, 24, 12], diamond: [-34, -52, 12, 30] };
  const SIDEPTS = {    // where the numbers 1,2,3.. go when the shape's sides / points are counted
    triangle: [[-62, 0], [62, 0], [0, 88]], square: [[0, -96], [96, 0], [0, 96], [-96, 0]], rectangle: [[0, -68], [116, 0], [0, 68], [-116, 0]], diamond: [[47, -62], [47, 62], [-47, 62], [-47, -62]],
    star: [[0, -128], [128, -40], [79, 108], [-79, 108], [-128, -40]],
  };

  const char = (k) => {
    const [ex, ey, my] = FACE[k], col = SHAPE_COL[k], h = HLP[k];
    return P(SHAPE_D[k], col, 8) + E(h[0], h[1], h[2], h[3], '#fff', 0, 'opacity=".42" transform="rotate(-24 ' + h[0] + ' ' + h[1] + ')"')
      + eye(-ex, ey) + eye(ex, ey) + cheek(-ex - 24, ey + 30) + cheek(ex + 24, ey + 30)
      + mouths(L(`M-24,${my} Q0,${my + 22} 24,${my}`, 6), E(0, my + 8, 26, 20, '#7A1F3D', 6) + E(0, my + 18, 14, 9, '#FF7A8F', 0));
  };
  const plain = (k, c) => P(SHAPE_D[k], c || SHAPE_COL[k], 8) + E(HLP[k][0], HLP[k][1], HLP[k][2], HLP[k][3], '#fff', 0, `opacity=".42" transform="rotate(-24 ${HLP[k][0]} ${HLP[k][1]})"`);

  // ------------------------------------------------------------------ the 15 objects
  const X = {};
  X.window = () => R(-84, -84, 168, 168, 16, '#FFB86B', 8) + [[-68, -68], [4, -68], [-68, 4], [4, 4]].map(([x, y]) => R(x, y, 64, 64, 8, '#BDEBFF', 5) + L(`M${x + 12},${y + 40} L${x + 36},${y + 14}`, 5, '#fff')).join('') + R(-98, 72, 196, 20, 8, '#E58F3C', 6) + C(60, -100, 0, '#fff', 0);
  X.gift = () => R(-80, -52, 160, 132, 10, '#4CC9F0', 8) + R(-92, -78, 184, 38, 10, '#2FA7D6', 8) + R(-17, -78, 34, 158, 0, '#FF5E7E', 6) + E(-30, -96, 30, 19, '#FF5E7E', 6, 'transform="rotate(-22 -30 -96)"') + E(30, -96, 30, 19, '#FF5E7E', 6, 'transform="rotate(22 30 -96)"') + C(0, -90, 13, '#FF8FA3', 5) + HL(-56, -22, 10, 30, 12, .45);
  X.tent = () => L('M0,-104 L0,-146', 6) + P('M0,-146 L40,-132 L0,-118Z', '#FF5E7E', 5) + P('M0,-104 L112,86 L-112,86Z', '#FF9F43', 8) + P('M0,-104 L36,86 L-36,86Z', '#FFC27A', 0, 'opacity=".7"') + P('M0,-12 L38,86 L-38,86Z', '#7A3E1D', 6) + L('M-130,92 L130,92', 8, '#4CD964') + HL(-52, -4, 8, 34, 28, .45);
  X.sail = () => P('M-98,44 L98,44 L68,92 L-68,92Z', '#B06BFF', 8) + L('M0,-104 L0,46', 7) + P('M10,-96 L10,36 L88,36Z', '#fff', 7) + P('M-10,-66 L-10,36 L-74,36Z', '#FFD23F', 7) + P('M0,-104 L30,-93 L0,-82Z', '#FF5E7E', 5) + L('M-104,104 q17,-13 34,0 t34,0 t34,0 t34,0 t34,0 t34,0', 6, '#4CC9F0');
  X.door = () => R(-64, -102, 128, 204, 12, '#8A5A2B', 8) + R(-52, -90, 104, 180, 6, '#E58F3C', 6) + R(-38, -74, 76, 64, 6, '#F2A65A', 4) + R(-38, 6, 76, 70, 6, '#F2A65A', 4) + C(30, 2, 9, '#FFD23F', 4) + HL(-30, -58, 6, 20, 18, .5);
  X.book = () => R(-72, -98, 144, 196, 10, '#FF5E7E', 8) + R(-72, -98, 24, 196, 8, '#D93A5E', 6) + R(64, -88, 12, 176, 3, '#FFF6DC', 4) + L('M-26,-56 L42,-56', 9, '#fff') + L('M-26,-30 L26,-30', 7, '#FFD6E0') + P(STAR(30), '#FFD23F', 5, 'transform="translate(8,40)"');
  X.flag = () => R(-72, -112, 11, 236, 5, '#B8B8D0', 5) + C(-66, -118, 10, '#FFD23F', 5) + R(-62, -104, 152, 104, 6, '#fff', 7) + R(-62, -104, 152, 36, 6, '#FF5E7E', 0) + R(-62, -36, 152, 36, 6, '#4CC9F0', 0) + R(-62, -104, 152, 104, 6, 'none', 7) + P(STAR(26), '#FFD23F', 4, 'transform="translate(14,-52)"');
  X.starfish = () => P(STAR(112), '#FF9F43', 8) + [[0, -70], [58, -22], [38, 52], [-38, 52], [-58, -22]].map(([x, y]) => C(x, y, 7, '#FFD08A', 0)).join('') + [[0, -40], [34, -10], [22, 30], [-22, 30], [-34, -10]].map(([x, y]) => C(x, y, 5, '#FFD08A', 0)).join('') + eye(-18, -2, 11) + eye(18, -2, 11) + L('M-14,22 Q0,36 14,22', 5) + HL(-26, -62, 10, 22, 30, .45);
  X.badge = () => P(STAR(116), '#FFD23F', 8) + [[0, -116], [114, -36], [72, 98], [-72, 98], [-114, -36]].map(([x, y]) => C(x * .97, y * .97, 12, '#FFC21F', 5)).join('') + P(STAR(52), '#FFF1A8', 4) + C(0, 4, 14, '#FFC21F', 4) + HL(-30, -58, 10, 24, 30, .5);
  X.sticker = () => P(STAR(112), '#fff', 12) + P(STAR(94), '#FFB300', 6) + P('M-40,-34 L0,-86 L14,-36Z', '#FFE08A', 0, 'opacity=".8"') + HL(-28, -52, 8, 18, 28, .6) + L('M-20,12 Q0,34 20,12', 6) + eye(-20, -6, 10) + eye(20, -6, 10);
  X.card = () => R(-92, -68, 184, 136, 14, '#FFF6DC', 8) + R(-76, -52, 152, 104, 8, 'none', 5, 'stroke-dasharray="2 12" ') + P(HEARTBIG, '#FF5E7E', 0, 'transform="translate(0,6) scale(.5)"') + P(HEARTBIG, 'none', 12, 'transform="translate(0,6) scale(.5)"') + HL(-22, -22, 9, 16, 30, .5) + C(-66, -44, 7, '#FF9BB8', 0) + C(66, 46, 7, '#FF9BB8', 0);
  X.heartballoon = () => L('M0,66 Q-14,96 6,124', 5) + P('M0,60 L-12,76 L12,76Z', '#FF5E7E', 5) + P(HEARTBIG, '#FF5E7E', 9, 'transform="translate(0,-26) scale(.72)"') + HL(-46, -64, 12, 24, 30, .55);
  X.heartcookie = () => P(HEARTBIG, '#E9A95C', 10, 'transform="translate(0,4) scale(.8)"') + P(HEARTBIG, '#FF9BB8', 0, 'transform="translate(0,6) scale(.6)"') + [[-30, -28, '#fff'], [22, -36, '#FFD23F'], [-6, 10, '#4CC9F0'], [34, 4, '#fff'], [-34, 12, '#FFD23F'], [6, 40, '#B06BFF']].map(([x, y, c]) => R(x - 7, y - 3, 14, 6, 3, c, 0, `transform="rotate(${(x * 7 + y * 3) % 90} ${x} ${y})"`)).join('');
  X.gem = () => P('M0,-104 L76,0 L0,104 L-76,0Z', '#4CC9F0', 0) + P('M0,-104 L76,0 L0,0Z', '#9BEBFF', 0) + P('M0,0 L76,0 L0,104Z', '#2F9BFF', 0) + P('M0,-104 L-76,0 L0,0Z', '#6FDAFF', 0) + L('M-76,0 L76,0 M0,-104 L0,104 M-38,-52 L38,-52 M-38,52 L38,52', 4, 'rgba(43,27,94,.45)') + P('M0,-104 L76,0 L0,104 L-76,0Z', 'none', 8) + HL(-26, -44, 8, 22, 30, .7);
  X.sign = () => R(-8, 60, 16, 70, 4, '#9AA3C7', 5) + R(-70, -118, 140, 140, 14, '#FFD23F', 9, 'transform="rotate(45 0 -48)"') + R(-52, -100, 104, 104, 8, 'none', 5, 'transform="rotate(45 0 -48)"') + L('M-22,-26 L-22,-58 Q-22,-76 -4,-76 L26,-76 M10,-92 L28,-76 L10,-60', 12, OL);

  const base = root.KVOBJ.draw;
  root.KVOBJ.draw = (kind, col) => (kind.startsWith('sh_') ? char(kind.slice(3)) : X[kind] ? X[kind](col) : base(kind, col));
  root.KVOBJ.drawPlain = (kind, col) => plain(kind, col);
  root.KVOBJ.drawShadow = (kind) => `<g style="filter:brightness(0) invert(1)" opacity=".9" transform="scale(1.07)">${plain(kind)}</g><g style="filter:brightness(0)" opacity=".82">${plain(kind)}</g>`;
  root.KVOBJ.SHAPE_D = SHAPE_D; root.KVOBJ.SHAPE_COL = SHAPE_COL; root.KVOBJ.SIDEPTS = SIDEPTS; root.KVOBJ.FACE = FACE; root.KVOBJ.STAR = STAR; root.KVOBJ.HEARTBIG = HEARTBIG;
  root.KVOBJ.kinds = root.KVOBJ.kinds.concat(Object.keys(X), Object.keys(SHAPE_D).map((k) => 'sh_' + k));
})(window);
