/* KiddoVerse character kit — 7 original characters drawn in code (SVG). Origin (0,0) = feet centre, drawn upward.
   Rig contract (class names the animation engine looks for):
   .sq squash root · .body · .head · .armL/.armR · .legL/.legR · .eye (blink) · .pupil · .ep-open/.ep-happy/.ep-wide
   .m-smile/.m-open/.m-wide/.m-o/.m-sad (mouth visemes) · .tail · .ant · .hairA · .glow                              */
(function (root) {
  const OL = '#2B1B5E';
  const sw = (w) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const E = (cx, cy, rx, ry, fill, w = 6, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${w ? sw(w) : ''} ${x}/>`;
  const C = (cx, cy, r, fill, w = 6, x = '') => E(cx, cy, r, r, fill, w, x);
  const P = (d, fill, w = 6, x = '') => `<path d="${d}" fill="${fill}" ${w ? sw(w) : ''} ${x}/>`;
  const L = (d, w = 6, c = OL, x = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
  const R = (x, y, w, h, r, fill, s = 6, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${s ? sw(s) : ''} ${ex}/>`;
  const G = (t, inner, cls = '') => `<g ${cls ? `class="${cls}"` : ''} ${t ? `transform="${t}"` : ''}>${inner}</g>`;
  const STAR = 'M0,-30 L8,-10 L30,-9 L13,5 L19,27 L0,15 L-19,27 L-13,5 L-30,-9 L-8,-10Z';
  const HEART = 'M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z';
  // pivot wrapper: inner part is drawn around (0,0) = joint
  const J = (x, y, cls, inner) => `<g transform="translate(${x},${y})"><g class="${cls}">${inner}</g></g>`;

  /* ---------- gradients (defined once, shared by every instance) ---------- */
  const rg = (id, a, b, cx = .38, cy = .3, r = .8) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
  const lg = (id, a, b, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
  const DEFS = [
    rg('gSkinK', '#E3A56A', '#B9763E'), rg('gSkinL', '#F7D2A8', '#E0A878'), lg('gHood', '#FFA24D', '#FF6A2B'), lg('gShorts', '#2EC4B6', '#1B8F9A'),
    lg('gDress', '#5CF0C3', '#25B98C'), rg('gBloop', '#8FFFE0', '#17B6A6', .35, .25, .85), rg('gDino', '#B6F36B', '#4DB84A', .35, .25, .85), lg('gBelly', '#FFF3C4', '#FFD98A'),
    lg('gFrill', '#FF9A6B', '#FF5E7E'), lg('gRobo', '#F2F7FF', '#8FB0EA'), lg('gVisor', '#2A2A66', '#12123A'), rg('gCloud', '#FFFFFF', '#CFE3FF', .4, .25, .9),
    lg('gBus', '#8E6BFF', '#5B3CE0'), lg('gBusGlass', '#BFF1FF', '#5CC8FF'), lg('gFlame', '#FFF3A0', '#FF6A3D'), rg('gCheek', '#FF8FA3', '#FF8FA3'),
  ].join('') + `<mask id="busMask" maskUnits="userSpaceOnUse" x="-420" y="-420" width="900" height="520"><rect x="-420" y="-420" width="900" height="520" fill="#fff"/>${[-244, -132, -20].map((x) => `<rect x="${x}" y="-228" width="92" height="74" rx="22" fill="#000"/>`).join('')}</mask>`;

  /* ---------- face parts ---------- */
  function eye(x, y, r, o = {}) {
    const iris = o.iris || '#5B3A22', ink = '#1B1033';
    return `<g transform="translate(${x},${y})"><g class="eye">
      <g class="ep-open">${E(0, 0, r, r * 1.14, '#fff', o.lw || 5)}<g class="pupil">${C(0, r * .05, r * .64, iris, 0)}${C(0, r * .05, r * .36, ink, 0)}${C(-r * .22, -r * .3, r * .21, '#fff', 0)}${C(r * .2, r * .24, r * .09, '#fff', 0)}</g></g>
      <g class="ep-happy" opacity="0">${L(`M${-r * .85},${r * .3} Q0,${-r * 1.05} ${r * .85},${r * .3}`, o.lw ? o.lw + 2 : 8)}</g>
      <g class="ep-wide" opacity="0">${E(0, 0, r * 1.16, r * 1.3, '#fff', o.lw || 5)}${C(0, 0, r * .34, ink, 0)}${C(-r * .1, -r * .12, r * .12, '#fff', 0)}</g>
    </g></g>`;
  }
  function mouth(cx, cy, s = 1, o = {}) {
    const dark = '#7A1F3D', tg = '#FF8FA3';
    return `<g transform="translate(${cx},${cy}) scale(${s})" class="mouth">
      <g class="m-smile">${L('M-30,-2 Q0,28 30,-2', 7)}</g>
      <g class="m-open" opacity="0">${P('M-30,-4 Q0,2 30,-4 Q30,36 0,40 Q-30,36 -30,-4Z', dark, 6)}${E(0, 28, 17, 10, tg, 0)}</g>
      <g class="m-wide" opacity="0">${P('M-40,-6 Q0,2 40,-6 Q42,52 0,58 Q-42,52 -40,-6Z', dark, 6)}${E(0, 42, 24, 14, tg, 0)}${R(-22, -4, 18, 11, 3, '#fff', 3)}${R(4, -4, 18, 11, 3, '#fff', 3)}</g>
      <g class="m-o" opacity="0">${E(0, 14, 15, 20, dark, 6)}</g>
      <g class="m-sad" opacity="0">${L('M-26,16 Q0,-8 26,16', 7)}</g>
    </g>`;
  }
  const cheeks = (x, y, s = 1, c = '#FF7A8F', op = .45) => E(-x, y, 22 * s, 13 * s, c, 0, `opacity="${op}"`) + E(x, y, 22 * s, 13 * s, c, 0, `opacity="${op}"`);
  const brows = (x, y, w = 30, c = OL) => J(-x, y, 'browL', L(`M${-w},4 Q0,-12 ${w},4`, 8, c)) + J(x, y, 'browR', L(`M${-w},4 Q0,-12 ${w},4`, 8, c));
  const shadow = (rx = 110) => E(0, 2, rx, 16, 'rgba(36,27,94,.20)', 0, 'class="shadow"');

  /* ================================================================= KIKO — explorer boy, 6 ================================================================= */
  function kiko() {
    const hair = '#1E1636';
    return shadow(105) + G('', `
      ${J(-36, -120, 'legL', P('M-24,0 L-24,86 Q-24,98 -10,98 L10,98 Q24,98 24,86 L24,0Z', 'url(#gSkinK)', 6) + P('M-30,-6 L30,-6 L32,40 L-32,40Z', 'url(#gShorts)', 6) + E(-2, 100, 40, 22, '#fff', 6) + E(-2, 112, 40, 10, '#FF8A3D', 0) + L('M-28,104 L26,104', 5, '#FF8A3D'))}
      ${J(36, -120, 'legR', P('M-24,0 L-24,86 Q-24,98 -10,98 L10,98 Q24,98 24,86 L24,0Z', 'url(#gSkinK)', 6) + P('M-30,-6 L30,-6 L32,40 L-32,40Z', 'url(#gShorts)', 6) + E(2, 100, 40, 22, '#fff', 6) + E(2, 112, 40, 10, '#FF8A3D', 0) + L('M-26,104 L28,104', 5, '#FF8A3D'))}
      <g class="body">
        ${P('M-92,-118 Q-98,-250 -62,-268 L62,-268 Q98,-250 92,-118 Q0,-96 -92,-118Z', 'url(#gHood)', 7)}
        ${P('M-56,-262 Q0,-236 56,-262 Q40,-292 0,-292 Q-40,-292 -56,-262Z', '#FF8F45', 6)}
        ${G('translate(0,-190) scale(1.5)', P(STAR, '#FFD23F', 4))}
        ${P('M-52,-136 Q0,-120 52,-136 L46,-110 Q0,-98 -46,-110Z', '#E8571E', 5, 'opacity=".5"')}
        ${J(-88, -246, 'armL', P('M-22,-6 Q-34,50 -30,86 L10,92 Q24,50 20,-6Z', 'url(#gHood)', 6) + C(-6, 104, 22, 'url(#gSkinK)', 6))}
        ${J(88, -246, 'armR', P('M22,-6 Q34,50 30,86 L-10,92 Q-24,50 -20,-6Z', 'url(#gHood)', 6) + C(6, 104, 22, 'url(#gSkinK)', 6))}
      </g>
      ${J(0, -262, 'head', `
        ${C(-100, -96, 24, 'url(#gSkinK)', 6)}${C(100, -96, 24, 'url(#gSkinK)', 6)}
        ${E(0, -100, 106, 98, 'url(#gSkinK)', 7)}
        ${P('M-104,-112 Q-112,-206 -40,-204 Q-8,-236 14,-206 Q80,-214 104,-118 Q92,-160 50,-166 Q0,-176 -50,-158 Q-96,-148 -104,-112Z', hair, 6)}
        ${P('M-30,-206 Q-18,-244 4,-250 Q-4,-232 12,-216Z', hair, 5)}
        ${G('translate(-62,-182) rotate(-20) scale(.72)', P(STAR, '#FFD23F', 5), 'clip')}
        ${P('M-72,-168 Q-30,-190 10,-182', 'none', 0, 'stroke="#fff" stroke-opacity=".28" stroke-width="7" stroke-linecap="round"')}
        ${brows(48, -124, 28, hair)}
        ${eye(-48, -98, 27, { iris: '#4A2B17' })}${eye(48, -98, 27, { iris: '#4A2B17' })}
        ${E(0, -66, 9, 6, '#9C5F31', 0)}
        ${cheeks(78, -54, 1)}
        ${mouth(0, -44, 1)}
      `)}
    `, 'sq');
  }

  /* ================================================================= LUMA — singer girl, 6 ================================================================= */
  function luma() {
    const hair = '#3B1E6E';
    return shadow(105) + G('', `
      ${J(-30, -124, 'legL', P('M-18,0 L-18,84 Q-18,94 -8,94 L8,94 Q18,94 18,84 L18,0Z', 'url(#gSkinL)', 6) + P('M-26,60 L26,60 L28,96 Q0,108 -28,96Z', '#FFD23F', 6, 'transform="translate(0,4)"') + E(0, 104, 34, 20, '#FFC21F', 6) + L('M-18,102 L18,102', 4, '#fff'))}
      ${J(30, -124, 'legR', P('M-18,0 L-18,84 Q-18,94 -8,94 L8,94 Q18,94 18,84 L18,0Z', 'url(#gSkinL)', 6) + P('M-26,60 L26,60 L28,96 Q0,108 -28,96Z', '#FFD23F', 6, 'transform="translate(0,4)"') + E(0, 104, 34, 20, '#FFC21F', 6) + L('M-18,102 L18,102', 4, '#fff'))}
      <g class="body">
        ${P('M-70,-262 Q-68,-286 0,-286 Q68,-286 70,-262 L118,-96 Q0,-70 -118,-96Z', 'url(#gDress)', 7)}
        ${P('M-104,-120 Q0,-96 104,-120', 'none', 0, 'stroke="#fff" stroke-opacity=".4" stroke-width="8" stroke-linecap="round" stroke-dasharray="2 16"')}
        ${P('M-40,-262 Q0,-240 40,-262 Q30,-290 0,-290 Q-30,-290 -40,-262Z', '#F7FFFB', 6)}
        ${G('translate(0,-196)', C(0, 0, 34, '#FFD23F', 6) + P('M-8,-16 L-8,12 M-8,-16 L12,-10 L12,16', 'none', 0, 'stroke="#2B1B5E" stroke-width="6" stroke-linecap="round"') + C(-14, 14, 8, OL, 0) + C(6, 18, 8, OL, 0))}
        ${J(-66, -258, 'armL', P('M-16,-6 Q-28,46 -24,82 L10,86 Q20,46 14,-6Z', 'url(#gSkinL)', 6) + P('M-18,-8 Q-22,10 -22,22 L12,26 Q14,10 14,-8Z', 'url(#gDress)', 6) + C(-6, 98, 20, 'url(#gSkinL)', 6))}
        ${J(66, -258, 'armR', P('M16,-6 Q28,46 24,82 L-10,86 Q-20,46 -14,-6Z', 'url(#gSkinL)', 6) + P('M18,-8 Q22,10 22,22 L-12,26 Q-14,10 -14,-8Z', 'url(#gDress)', 6) + C(6, 98, 20, 'url(#gSkinL)', 6))}
      </g>
      ${J(0, -284, 'head', `
        ${C(-112, -208, 52, hair, 6)}${C(112, -208, 52, hair, 6)}
        ${G('translate(-118,-232) rotate(-14) scale(.8)', P(STAR, '#FFD23F', 5))}${G('translate(118,-232) rotate(14) scale(.8)', P(STAR, '#FFD23F', 5))}
        ${C(-98, -92, 22, 'url(#gSkinL)', 6)}${C(98, -92, 22, 'url(#gSkinL)', 6)}
        ${E(0, -98, 104, 96, 'url(#gSkinL)', 7)}
        ${P('M-106,-104 Q-116,-200 -36,-198 Q0,-222 40,-200 Q116,-200 106,-104 Q92,-150 56,-158 Q10,-134 -30,-160 Q-90,-150 -106,-104Z', hair, 6)}
        ${P('M-60,-172 Q-20,-190 24,-178', 'none', 0, 'stroke="#fff" stroke-opacity=".25" stroke-width="7" stroke-linecap="round"')}
        ${brows(46, -122, 26, hair)}
        ${eye(-46, -96, 27, { iris: '#7A3B8F' })}${eye(46, -96, 27, { iris: '#7A3B8F' })}
        ${E(0, -64, 8, 5, '#D79A68', 0)}
        ${cheeks(76, -52, 1)}
        ${mouth(0, -42, 1)}
      `)}
    `, 'sq');
  }

  /* ================================================================= BLOOP — jelly alien ================================================================= */
  function bloop() {
    return shadow(120) + G('', `
      ${J(-44, -22, 'legL', E(0, 8, 34, 18, '#17B6A6', 6))}${J(44, -22, 'legR', E(0, 8, 34, 18, '#17B6A6', 6))}
      <g class="body">
        ${J(0, -236, 'ant', L('M0,0 Q-14,-50 0,-84', 8) + C(0, -98, 20, '#FF7AC6', 6) + C(-6, -104, 6, '#fff', 0, 'opacity=".8"') + G('', C(0, -98, 34, '#FF7AC6', 0, 'opacity=".25"'), 'glow'))}
        ${P('M-132,-100 Q-146,-250 0,-252 Q146,-250 132,-100 Q130,-18 0,-18 Q-130,-18 -132,-100Z', 'url(#gBloop)', 7)}
        ${E(-58, -196, 34, 18, '#fff', 0, 'opacity=".55" transform="rotate(-28 -58 -196)"')}
        ${C(-92, -72, 9, '#7BFFE8', 0, 'opacity=".7"')}${C(70, -60, 12, '#7BFFE8', 0, 'opacity=".7"')}${C(98, -96, 6, '#7BFFE8', 0, 'opacity=".7"')}
        ${J(-130, -118, 'armL', E(-12, 8, 26, 16, '#17B6A6', 6, 'transform="rotate(30 -12 8)"'))}${J(130, -118, 'armR', E(12, 8, 26, 16, '#17B6A6', 6, 'transform="rotate(-30 12 8)"'))}
      </g>
      ${J(0, -150, 'head', `${eye(-48, -22, 34, { iris: '#0E5A66' })}${eye(48, -22, 34, { iris: '#0E5A66' })}${cheeks(86, 22, 1.1, '#FF8FD0', .75)}${mouth(0, 32, 1.1)}`)}
    `, 'sq');
  }

  /* ================================================================= RUMBLE — baby dino ================================================================= */
  function rumble() {
    return shadow(130) + G('', `
      ${J(-140, -110, 'tail', P('M10,10 Q-70,40 -126,-6 Q-150,-30 -128,-50 Q-100,-6 -30,-34Z', 'url(#gDino)', 7) + P('M-110,-26 L-132,-60 L-96,-44Z', '#FF8A5B', 5))}
      ${J(-44, -112, 'legL', P('M-26,0 L-28,84 Q-28,100 -8,100 L24,100 Q34,100 30,84 L26,0Z', 'url(#gDino)', 7) + E(0, 100, 40, 14, '#FFE7B0', 5) + C(-18, 100, 6, '#fff', 0) + C(0, 104, 6, '#fff', 0) + C(18, 100, 6, '#fff', 0))}
      ${J(44, -112, 'legR', P('M-26,0 L-28,84 Q-28,100 -8,100 L24,100 Q34,100 30,84 L26,0Z', 'url(#gDino)', 7) + E(0, 100, 40, 14, '#FFE7B0', 5) + C(-18, 100, 6, '#fff', 0) + C(0, 104, 6, '#fff', 0) + C(18, 100, 6, '#fff', 0))}
      <g class="body">
        ${P('M-30,-248 L-52,-300 L-6,-262Z M10,-260 L0,-320 L36,-268Z M46,-248 L74,-298 L86,-236Z', '#FF8A5B', 6)}
        ${E(0, -180, 128, 124, 'url(#gDino)', 7)}
        ${E(8, -160, 82, 92, 'url(#gBelly)', 0)}
        ${[[-34, -200], [10, -214], [48, -190], [-8, -150], [34, -130], [-46, -138]].map(([x, y]) => C(x + 12, y, 6, '#FFC76B', 0, 'opacity=".7"')).join('')}
        ${J(-112, -176, 'armL', E(-8, 20, 20, 34, 'url(#gDino)', 6, 'transform="rotate(14 -8 20)"') + C(-14, 52, 12, '#FFE7B0', 5))}
        ${J(112, -176, 'armR', E(8, 20, 20, 34, 'url(#gDino)', 6, 'transform="rotate(-14 8 20)"') + C(14, 52, 12, '#FFE7B0', 5))}
      </g>
      ${J(0, -262, 'head', `
        ${P('M-142,-100 Q-150,-250 0,-254 Q150,-250 142,-100 Q112,-150 0,-142 Q-112,-150 -142,-100Z', 'url(#gFrill)', 7)}
        ${[[-92, -168], [-52, -214], [0, -228], [52, -214], [92, -168]].map(([x, y]) => C(x, y, 13, '#FFE16B', 5)).join('')}
        ${E(0, -72, 112, 90, 'url(#gDino)', 7)}
        ${P('M-40,-148 L-30,-196 L-8,-148Z', '#FFF3C4', 6)}${P('M8,-148 L30,-196 L40,-148Z', '#FFF3C4', 6)}
        ${P('M-12,-110 Q0,-146 12,-110Z', '#FFF3C4', 5)}
        ${E(0, -40, 74, 46, '#B8F57E', 0, 'opacity=".7"')}
        ${eye(-52, -84, 27, { iris: '#3B2A14' })}${eye(52, -84, 27, { iris: '#3B2A14' })}
        ${C(-18, -64, 5, '#2E7A38', 0)}${C(18, -64, 5, '#2E7A38', 0)}
        ${cheeks(88, -40, 1)}
        ${mouth(0, -30, 1)}
      `)}
    `, 'sq');
  }

  /* ================================================================= GIZMO — little robot ================================================================= */
  function gizmo() {
    return shadow(100) + G('', `
      ${J(-42, -60, 'legL', R(-30, -4, 60, 62, 18, '#3B3F73', 6) + E(0, 60, 36, 14, '#FFB84D', 5) + C(0, 36, 10, '#FFD23F', 4))}
      ${J(42, -60, 'legR', R(-30, -4, 60, 62, 18, '#3B3F73', 6) + E(0, 60, 36, 14, '#FFB84D', 5) + C(0, 36, 10, '#FFD23F', 4))}
      <g class="body">
        ${R(-96, -208, 192, 156, 40, 'url(#gRobo)', 7)}
        ${R(-58, -184, 116, 78, 18, '#1B1B4B', 5)}
        ${G('translate(0,-146)', `<path d="M0,-27 L8,-9 L27,-8 L12,4 L17,23 L0,13 L-17,23 L-12,4 L-27,-8 L-8,-9Z" fill="#5CF0FF" stroke="#5CF0FF" stroke-width="3" stroke-linejoin="round"/>`, 'num')}
        ${C(-70, -90, 8, '#FF6B8B', 3)}${C(-44, -80, 8, '#FFD23F', 3)}${C(-18, -72, 8, '#5CF0C3', 3)}
        ${J(-96, -176, 'armL', R(-18, 0, 36, 70, 16, '#CFE0FF', 6) + C(0, 84, 24, '#FFB84D', 6) + P('M-16,98 L0,122 L16,98Z', '#FFB84D', 5))}
        ${J(96, -176, 'armR', R(-18, 0, 36, 70, 16, '#CFE0FF', 6) + C(0, 84, 24, '#FFB84D', 6) + P('M-16,98 L0,122 L16,98Z', '#FFB84D', 5))}
      </g>
      ${J(0, -204, 'head', `
        ${J(0, -150, 'ant', L('M0,0 L0,-40', 8) + C(0, -52, 15, '#FF6B8B', 6) + G('', C(0, -52, 28, '#FF6B8B', 0, 'opacity=".28"'), 'glow'))}
        ${C(-126, -76, 26, '#FFB84D', 6)}${C(126, -76, 26, '#FFB84D', 6)}${C(-126, -76, 10, '#fff', 0, 'opacity=".6"')}${C(126, -76, 10, '#fff', 0, 'opacity=".6"')}
        ${R(-112, -152, 224, 156, 54, 'url(#gRobo)', 7)}
        ${R(-90, -130, 180, 108, 36, 'url(#gVisor)', 6)}
        ${P('M-70,-120 Q-30,-132 20,-124', 'none', 0, 'stroke="#fff" stroke-opacity=".25" stroke-width="8" stroke-linecap="round"')}
        ${eye(-38, -86, 21, { iris: '#00D4FF', lw: 0 }).replace(/fill="#fff"/g, 'fill="#bff7ff"')}${eye(38, -86, 21, { iris: '#00D4FF', lw: 0 }).replace(/fill="#fff"/g, 'fill="#bff7ff"')}
        ${cheeks(62, -52, .8).replace(/#FF7A8F/g, '#FF6B8B')}
        ${mouth(0, -52, .85).replace(/stroke="#2B1B5E"/g, 'stroke="#5CF0FF"')}
      `)}
    `, 'sq');
  }

  /* ================================================================= NIMBUS — cloud lamb (feelings) ================================================================= */
  function nimbus() {
    const puff = (x, y, r) => C(x, y, r, 'url(#gCloud)', 7);
    return shadow(120) + G('', `
      ${J(-52, -62, 'legL', R(-16, -2, 32, 64, 14, '#9DB8E8', 6) + E(0, 62, 26, 12, '#6F8FD0', 5))}${J(52, -62, 'legR', R(-16, -2, 32, 64, 14, '#9DB8E8', 6) + E(0, 62, 26, 12, '#6F8FD0', 5))}
      <g class="body">
        <g class="glow" opacity="0">${C(0, -150, 190, '#FFE27A', 0)}</g>
        ${puff(-104, -130, 54)}${puff(104, -130, 54)}${puff(-76, -70, 52)}${puff(76, -70, 52)}${puff(0, -64, 56)}${puff(-112, -196, 46)}${puff(112, -196, 46)}
        ${E(0, -150, 110, 96, 'url(#gCloud)', 0)}
        ${J(-110, -150, 'armL', E(-8, 14, 18, 30, '#CFE3FF', 6, 'transform="rotate(20 -8 14)"'))}${J(110, -150, 'armR', E(8, 14, 18, 30, '#CFE3FF', 6, 'transform="rotate(-20 8 14)"'))}
      </g>
      ${J(0, -246, 'head', `
        ${P('M-110,-120 Q-150,-130 -140,-90 Q-128,-70 -100,-86Z', '#FFB6D0', 6)}${P('M110,-120 Q150,-130 140,-90 Q128,-70 100,-86Z', '#FFB6D0', 6)}
        ${puff(-62, -178, 40)}${puff(0, -196, 46)}${puff(62, -178, 40)}
        ${E(0, -90, 100, 90, '#F6FAFF', 7)}
        ${P('M-80,-150 Q-30,-168 20,-156', 'none', 0, 'stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-opacity=".9"')}
        ${brows(44, -118, 24, '#6F8FD0')}
        ${eye(-44, -92, 26, { iris: '#4C7BD6' })}${eye(44, -92, 26, { iris: '#4C7BD6' })}
        ${E(0, -62, 8, 6, '#FF8FA3', 0)}
        ${cheeks(72, -52, 1.1)}
        ${mouth(0, -40, 1)}
      `)}
    `, 'sq');
  }

  /* ================================================================= ZOOM — the Zoomie rocket-bus ================================================================= */
  function zoom() {
    const WX = [-244, -132, -20];
    const glass = WX.map((x) => R(x, -228, 92, 74, 22, 'url(#gBusGlass)', 6, 'opacity=".16"') + R(x, -228, 92, 74, 22, 'none', 6) + P(`M${x + 14},-168 L${x + 40},-214`, 'none', 0, 'stroke="#fff" stroke-opacity=".75" stroke-width="9" stroke-linecap="round"')).join('');
    return E(20, 2, 300, 20, 'rgba(36,27,94,.20)', 0, 'class="shadow"') + G('', `
      ${J(-250, -110, 'tail', P('M0,-30 L-70,-70 L-84,10 L0,24Z', '#FFB84D', 7) + G('', P('M-84,-10 Q-180,-30 -230,10 Q-170,40 -84,22Z', 'url(#gFlame)', 5), 'flame'))}
      ${P('M-250,-262 L-312,-356 L-170,-262Z', '#FF5E7E', 7)}${P('M-180,-262 L-206,-312 L-130,-262Z', '#FFB84D', 6)}
      <g class="pass"></g>
      <g class="body" mask="url(#busMask)">
        ${R(-290, -264, 590, 232, 70, 'url(#gBus)', 8)}
        ${R(-290, -128, 590, 38, 0, '#FFD23F', 0)}${L('M-284,-128 L296,-128', 6)}${L('M-284,-90 L296,-90', 6)}
      </g>
      ${glass}
      ${P('M110,-268 L210,-268 Q290,-268 296,-170 L296,-150 L110,-150Z', 'url(#gBusGlass)', 7)}
      ${P('M130,-248 L170,-248 L140,-176 L128,-176Z', '#fff', 0, 'opacity=".55"')}
      ${J(-210, -296, 'ant', L('M0,0 L0,-42', 8) + C(0, -54, 14, '#FFD23F', 6) + G('', C(0, -54, 26, '#FFD23F', 0, 'opacity=".3"'), 'glow'))}
      ${R(226, -122, 84, 52, 22, '#FFF6D0', 7)}${C(268, -96, 12, '#FF5E7E', 0, 'opacity=".6"')}
      ${J(0, 0, 'head', `${eye(160, -208, 24, { iris: '#3B2A8F' })}${eye(236, -208, 24, { iris: '#3B2A8F' })}${mouth(214, -176, .8)}${cheeks(160, -186, .6)}${cheeks(250, -186, .6).replace(/cx="-250"/g, 'cx="-250"')}`)}
      ${J(-170, -30, 'legL', C(0, 0, 52, '#2F2B63', 8) + C(0, 0, 22, '#FFD23F', 5) + L('M-22,0 L22,0 M0,-22 L0,22', 4))}
      ${J(160, -30, 'legR', C(0, 0, 52, '#2F2B63', 8) + C(0, 0, 22, '#FFD23F', 5) + L('M-22,0 L22,0 M0,-22 L0,22', 4))}
    `, 'sq');
  }

  const CHARS = {
    kiko: { name: 'Kiko', draw: kiko, w: 300, h: 420, pitch: 1.0, bg: ['#FFE0B8', '#FF9F5A'] },
    luma: { name: 'Luma', draw: luma, w: 300, h: 430, pitch: 1.0, bg: ['#D9F7EA', '#6EE7B7'] },
    bloop: { name: 'Bloop', draw: bloop, w: 300, h: 340, bg: ['#C8FFF0', '#4FD1C5'] },
    rumble: { name: 'Rumble', draw: rumble, w: 420, h: 420, bg: ['#E6FFC2', '#8EDB5A'] },
    gizmo: { name: 'Gizmo', draw: gizmo, w: 290, h: 420, bg: ['#E3EEFF', '#8FB4F5'] },
    nimbus: { name: 'Nimbus', draw: nimbus, w: 330, h: 450, bg: ['#E4F1FF', '#9CC4FF'] },
    zoom: { name: 'Zoom', draw: zoom, w: 800, h: 400, bg: ['#E7DEFF', '#8E6BFF'] },
  };

  root.KV = root.KV || {};
  Object.assign(root.KV, { OL, DEFS, CHARS, draw: (id) => CHARS[id].draw(), h: { E, C, P, L, R, G, J, STAR, HEART, sw, eye, mouth, cheeks, brows, shadow } });
})(typeof window !== 'undefined' ? window : globalThis);
