# one-off patch: HUD API, readable silhouette, stop shots that draw their own props
p = "shape_props.js"
s = open(p, encoding="utf8").read()
old = s[s.index("    api.shapeHud = ("):s.index("    /* ---------- the sides / points of a shape counted")]
new = """    api.shapeHud = (layer, kinds, done, popIdx, tPop, tFrom, until, o = {}) => {
      const x0 = o.x || 1540, y0 = o.y || 34, cw = 76;
      return kinds.map((k, i) => {
        const cx = x0 + (i % 4) * cw + cw / 2, cy = y0 + Math.floor(i / 4) * cw + cw / 2;
        const bg = grp(layer, cx, cy, rr(-34, -34, 68, 68, 16, 'rgba(36,27,94,.55)', 4)); show(bg, tFrom); gone(bg, until, .15);
        if (i < done || i === popIdx) {
          const ic = grp(layer, cx, cy, `<g transform="scale(.26)">${O.drawPlain(k)}</g>`);
          if (i === popIdx) { LOG(tPop, 'tile'); popIn(ic, tPop, -20, .45); } else show(ic, tFrom);
          gone(ic, until, .15);
        }
        return bg;
      });
    };
"""
s = s.replace(old, new)
open(p, "w", encoding="utf8").write(s)

a = open("shape_art.js", encoding="utf8").read()
old = 'root.KVOBJ.drawShadow = (kind) => `<g style="filter:brightness(0)" opacity=".5">${plain(kind)}</g>`;'
assert old in a
a = a.replace(old, 'root.KVOBJ.drawShadow = (kind) => `<g style="filter:brightness(0) invert(1)" opacity=".9" transform="scale(1.07)">${plain(kind)}</g><g style="filter:brightness(0)" opacity=".82">${plain(kind)}</g>`;')
open("shape_art.js", "w", encoding="utf8").write(a)

t = open("shape_story.js", encoding="utf8").read()
i0 = t.index("    const gt = GHOST[key], shots = []")
i1 = t.index("    place(s, shots);\n  });\n\n  /* =========================================================================================== GAME")
new = """    const gt = GHOST[key], shots = [], sh_ = (len, spec) => shots.push(Object.assign({ b: len, w: world }, spec));
    const hud = (T, done, pop) => ['shapeHud', 'over', KEYS, done, pop ? i : -1, tName, T(0), s.t1];       // every shot has its own prop layers, so the tray is drawn in each of them
    /* beats 0-4: "What shape is this?"  (the workshop, a conveyor belt of mixed shapes, the mystery silhouette) */
    shots.push({ b: 4, w: 'workshop', cam: 'wideIn', flash: i === 0 ? .9 : 0, A: side('workshop', { fn: [scan(1)] }, { fn: [scan(-1)] }),
      P: (T) => [['belt', 'back', 810, T(0), T(4), rot(KEYS, i * 3 + 1), { s: .46 }], ['shadowShape', 'front', key, 960, 500, 1.55, T(1), T(4)], ['text', 'over', 960, 215, 'WHAT SHAPE IS THIS?', tAsk, '#FFFFFF', 96, -2, 1.95], hud(T, i, false)] });
    /* beats 4-8: kids: "A circle!" */
    sh_(2, { cam: [960, 540, 1, 960, 540, 1.16], punch: 2, A: side(world, { mv: 'cheer' }, { mv: 'cheer' }), P: (T) => [['shapeChar', 'front', key, 960, 580, 1.9, tName, tb(8), talk1, { amp: 0 }], ['burst', 'front', 960, 580, tName, hex, 300], ['text', 'over', 960, 215, UP(name) + '!', tName, '#FFFFFF', 190, -4, 1.4], hud(T, i, true)] });
    sh_(2, { cam: [960, 560, 1.0, 960, 540, 1.3], A: side(world, { mv: 'cheer', jumps: [1] }, { mv: 'cheer', jumps: [1] }), P: (T) => [['shapeChar', 'front', key, 960, 580, 1.9, T(0) - .02, tb(8), talk1, { quiet: true, rot0: 0, amp: 0 }], ['chip', 'over', 960, 900, 'A ' + UP(name) + '!', hex, T(.3), 86], ['sparkles', 'front', 960, 500, T(.2), 8, 600, 40], hud(T, i + 1, false)] });
    /* beats 8-16: the chant - the shape says its name, then one fact about itself */
    const dStart = L[1][2].t0, dEnd = L[1][L[1].length - 1].t0;
    sh_(3, { cam: [960, 540, 1.06, 960, 540, 1.0], punch: 2, A: side(world, { mv: 'dance' }, { mv: 'dance' }), P: (T) => [['shapeChar', 'front', key, 700, 600, 1.6, T(0) - .02, T(3), talk2, { quiet: true, amp: 0, spin: key === 'circle' ? 1.4 : 0 }], ['notes', 'front', 1330, 560, T(0), T(3)], ['text', 'over', 1330, 330, UP(name) + '!', T(.1), '#FFFFFF', 120, 4, 1.3], hud(T, i + 1, false)] });
    sh_(5, { cam: 'wideIn', punch: 1, A: side(world, { mv: 'cheer', jumps: [1, 3] }, { mv: 'cheer', jumps: [1, 3] }), P: (T) => {
      const base = [['shapeChar', 'front', key, 640, 600, 1.55, T(0) - .02, T(5), talk2, { quiet: true, amp: 0, spin: key === 'circle' ? 2.4 : 0 }], ['text', 'over', 1330, 330, DESC[key], dStart, '#FFFFFF', 78, 4, 2.6], ['confetti', 'front', dEnd, T(5), 22], hud(T, i + 1, false)];
      if (key === 'square' || key === 'triangle' || key === 'star') base.push(['countSides', 'front', key, 640, 600, 1.55, dStart, .34, T(5)]);
      if (key === 'oval') base.push(['obj', 'front', 'egg', 1330, 620, 1.6, dEnd, { until: T(5) }]);
      if (key === 'heart') base.push(['hearts', 'front', 640, 440, dEnd, 7]);
      if (key === 'diamond') base.push(['sparkles', 'front', 640, 560, dStart, 12, 380, 44]);
      if (key === 'rectangle') base.push(['sparkles', 'front', 640, 600, dEnd, 8, 330, 36]);
      return base; } });
    /* beats 16-28: three everyday things that have this shape; the shape's outline traces round each one */
    sh.objs.forEach((ob, j) => {
      const Lo = L[2 + j], b0 = 16 + j * 4, tObj = Lo[0].t0, tShape = Lo[Lo.length - 1].t0, kind = ob.kind, rotG = TALL[kind] || 0, ox = 960, oy = 590;
      sh_(4, { cam: [960, 560, 1.0, 960, 545, 1.2], punch: 2, A: side(world, { mv: 'cheer', jumps: [j] }, { mv: 'dance' }),
        P: (T) => [['obj', 'front', kind, ox, oy, 1.8, tObj, { until: T(4) }], ['wordLabel', 'over', 960, 240, UP(ob.word), tObj, T(4), { size: 128 }], ['burst', 'front', ox, oy, tObj, hex, 240, false],
          ['shapeOutline', 'back', key, ox + gt[1], oy + gt[2], gt[0], tShape - .05, T(4), hex, { fill: .26, rot: rotG || gt[3], dur: .55 }], ['chip', 'over', 960, 900, UP(name) + '!', hex, tShape, 90], ['sparkles', 'front', ox, oy, tShape, 7, 330, 34], hud(T, i + 1, false)] });
    });
"""
t = t[:i0] + new + t[i1:]
old_g = "const GHOST = { circle: [2.0, 0, 0, 0], square: [1.9, 0, 0, 0], triangle: [2.0, 0, 16, 0], rectangle: [1.75, 0, 0, 0], oval: [1.8, 0, 0, 0], star: [1.75, 0, 0, 0], heart: [1.8, 0, -8, 0], diamond: [1.65, 0, 0, 0] };"
assert old_g in t
t = t.replace(old_g, "const GHOST = { circle: [2.4, 0, 0, 0], square: [2.3, 0, 0, 0], triangle: [2.4, 0, 18, 0], rectangle: [2.1, 0, 0, 0], oval: [2.1, 0, 0, 0], star: [2.1, 0, 0, 0], heart: [2.2, 0, -10, 0], diamond: [1.9, 0, 0, 0] };")
open("shape_story.js", "w", encoding="utf8").write(t)
print("patched")
