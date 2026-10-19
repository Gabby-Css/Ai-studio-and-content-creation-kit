# the house: every shot has its own prop layers, so each shot redraws the shapes placed earlier (static) and drops the new ones
t = open("shape_story.js", encoding="utf8").read()
i0 = t.index("  /* =========================================================================================== BUILD A HOUSE")
i1 = t.index("  /* =========================================================================================== FINALE (key up) + OUTRO")
new = """  /* =========================================================================================== BUILD A HOUSE (the finale: every shape has a job) */
  { const s = secs('house')[0], L = linesOfSec(s).map(flat), tb = (b) => s.t0 + b * BEAT, pair = [['kiko', 'luma'], ['gizmo', 'bloop'], ['rumble', 'nimbus'], ['luma', 'kiko']];
    const side = (j, mv = 'dance', o = {}) => [A('hills')(pair[j][0], 250, .95, Object.assign({ mv, sing: 1 }, o)), A('hills')(pair[j][1], 1670, .95, Object.assign({ f: 1, mv, sing: 1 }, o))];
    // shape, x, y, scale, options, the sung word that drops it, the shot (4 beats each) it arrives in
    const PARTS = [['square', 960, 700, 1.55, {}, L[0][0].t0, 0], ['triangle', 960, 428, 1.45, {}, L[0][2].t0, 1], ['rectangle', 960, 770, .62, { rot: 90 }, L[1][0].t0, 2], ['circle', 850, 650, .36, {}, L[1][2].t0, 3], ['circle', 1070, 650, .36, {}, L[1][2].t0 + .3, 3],
      ['star', 960, 282, .55, {}, L[2][0].t0, 4], ['heart', 960, 660, .3, {}, L[2][3].t0, 5], ['oval', 1480, 880, .55, { rot: 90 }, L[3][0].t0, 6], ['diamond', 1420, 400, .5, {}, L[3][2].t0 + .1, 6]];
    const parts = (n) => PARTS.filter((p) => p[6] <= n).map(([k, x, y, sc, o, t, sh]) => ['dropShape', 'front', k, x, y, sc, sh === n ? t : s.t0 - 1, Object.assign({}, o, sh === n ? {} : { fall: .01, from: 0, silent: true })]);
    const TXT = [['SQUARE WALLS!', L[0][0].t0, '#2F9BFF', 120, -3], ['TRIANGLE ROOF!', L[0][2].t0, '#FFC21F', 120, 3], ['RECTANGLE DOOR!', L[1][0].t0, '#39C95B', 110, -3], ['CIRCLE WINDOWS!', L[1][2].t0, '#F23B4E', 110, 3], ['STAR ON TOP!', L[2][0].t0, '#FF9F1C', 130, -3], ['HEART SO SWEET!', L[2][3].t0, '#FF6FA5', 110, 3], ['OVAL POND, DIAMOND KITE!', L[3][0].t0, '#A66BFF', 84, -2]];
    const shots = TXT.map(([txt, tt, col, sz, rot], n) => ({ b: 4, w: 'hills', cam: n % 2 ? 'wide' : 'wideIn', punch: 2, A: side(n >> 1, n % 2 ? 'cheer' : 'dance', n % 2 ? { jumps: [0, 2] } : {}),
      P: (T) => parts(n).concat([['text', 'over', 960, n === 4 ? 200 : 215, txt, tt, col, sz, rot, n === 6 ? 2.6 : 1.9]].concat(n === 5 ? [['hearts', 'front', 960, 560, L[2][3].t0 + .5, 6]] : [])) }));
    shots.push({ b: 4, w: 'hills', cam: 'low', punch: 2, A: crewV('hills', 'cheer', { jumps: [0, 1, 2, 3] }), P: (T) => parts(7).concat([['text', 'over', 960, 200, 'TA-DA!', L[3][4].t0, '#FFE14D', 230, -3, 1.8], ['confetti', 'front', L[3][4].t0 - .2, T(4), 40], ['fireworks', 'back', 520, 340, L[3][4].t0, '#FF5E7E', 230], ['fireworks', 'back', 1400, 330, L[3][4].t0 + .4, '#4CC9F0', 220], ['hearts', 'front', 960, 520, L[3][5].t0, 6]]) });
    place(s, shots); }

"""
t = t[:i0] + new + t[i1:]
open("shape_story.js", "w", encoding="utf8").write(t)
# the dropShape prop: 'silent' = already placed (no thud sound)
p = open("shape_props.js", encoding="utf8").read()
old = "      LOG(t + (o.fall || .45), 'thud'); show(p, t);"
assert old in p
p = p.replace(old, "      if (!o.silent) LOG(t + (o.fall || .45), 'thud'); show(p, t);")
open("shape_props.js", "w", encoding="utf8").write(p)
print("house patched")
