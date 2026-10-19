/* KiddoVerse LEARN #4 "The Shape Workshop" storyboard - TikTok-speed: a new shot every 1-2 s, every picture lands on the sung word.
   Everything is generated from the song data (sections, lines, words) and the shape table.  beat = 0.5 s, bar = 4 beats. */
(function () {
  const SONG = window.SONG, BEAT = 60 / SONG.bpm, BAR = SONG.bar, SB = [], SH = SONG.shapes, KEYS = SH.map((s) => s.key), O = window.KVOBJ, COL = O.SHAPE_COL;
  const FL = { hub: 905, hills: 905, dino: 910, cloud: 915, workshop: 925, disco: 930, finale: 905, space: 1000, numland: 905, abc: 905 };
  ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'].forEach((k) => { FL['c_' + k] = 905; });
  const secs = (kind) => SONG.sections.filter((s) => s.kind === kind);
  function place(s, shots) {
    let b = 0;
    shots.forEach((sh) => { SB.push(Object.assign({ sec: s.kind }, sh, { t0: s.t0 + b * BEAT, t1: s.t0 + (b + sh.b) * BEAT })); b += sh.b; });
    if (b !== s.bars * 4) throw new Error(`storyboard ${s.kind}#${s.i}: ${b} beats, expected ${s.bars * 4}`);
  }
  const section = (kind, nth, shots) => place(secs(kind)[nth], shots);
  const A = (w) => (c, x, s = 1, o = {}) => Object.assign({ c, x, y: FL[w], s }, o);
  const ORDER = ['kiko', 'luma', 'gizmo', 'bloop', 'rumble', 'nimbus'], XS = [390, 650, 910, 1170, 1430, 1690];
  const crew = (w, s = .76, mv = 'bob', o = {}) => ORDER.map((c, i) => A(w)(c, XS[i], s, Object.assign({ mv, sing: 1 }, o)));
  const crewArc = (w, s = .82, mv = 'bob', o = {}) => ORDER.map((c, i) => { const x = [380, 650, 900, 1150, 1400, 1670][i], k = [1, .45, 0, 0, .45, 1][i]; return A(w)(c, x, s * (1 - .1 * (1 - k)), Object.assign({ y: FL[w] + 36 * k - 36, mv, sing: 1 }, o)); }).sort((a, b) => a.y - b.y);
  const crewV = (w, mv = 'bob', o = {}) => [['kiko', 740], ['luma', 1180], ['nimbus', 1650]].map(([c, x]) => A(w)(c, x, .66, Object.assign({ y: FL[w] - 80, mv, sing: 1 }, o))).concat([['gizmo', 520], ['rumble', 960], ['bloop', 1400]].map(([c, x]) => A(w)(c, x, .95, Object.assign({ mv, sing: 1 }, o))));
  const M = () => window.__KVM;
  const S_ = (t) => +t.toFixed(4);
  const shake = (...bs) => (g, c) => bs.forEach((b) => { window.__LOG(c.T(b), 'thud'); for (let i = 0; i < 6; i++) c.tl.to(c.punch, { x: (i % 2 ? 1 : -1) * 16 * (1 - i / 6), y: (i % 2 ? -1 : 1) * 12 * (1 - i / 6), duration: .045 }, c.T(b) + i * .045); c.tl.to(c.punch, { x: 0, y: 0, duration: .05 }, c.T(b) + .28); });
  const flat = (l) => l.words.flatMap((w) => w.subs || [w]);
  const linesOfSec = (s) => SONG.lines.filter((l) => l.sec === s.i);
  const PAIRS = [['kiko', 'luma'], ['gizmo', 'rumble'], ['bloop', 'nimbus'], ['luma', 'gizmo'], ['kiko', 'bloop'], ['rumble', 'nimbus'], ['luma', 'rumble'], ['kiko', 'gizmo']];
  const UP = (s) => s.toUpperCase();
  const ban = (T, a, b, title, sub, col) => ['banner', 'over', title, sub, T(a), T(b), col];
  const scan = (dir, from = .4, to = 3.4) => (a, t0, t1, tl) => { const m = M(); for (let t = t0 + from, i = 0; t < t0 + to; t += .6, i++) m.look(a, S_(t), (i % 2 ? -1 : 1) * 12 * dir, -6, .2); m.look(a, S_(t0 + to + .3), 0, 0, .2); };
  const inWin = (list, a, b) => list.filter(([t]) => t >= a - .01 && t < b);
  const talkOf = (words, name, cap = 1.1) => words.filter((x) => x.text.toLowerCase() === name).map((x) => [x.t0, Math.min(cap, Math.max(.4, x.t1 - x.t0))]);
  const rot = (arr, n) => arr.slice(n % arr.length).concat(arr.slice(0, n % arr.length));

  /* =========================================================================================== INTRO (2 bars) */
  section('intro', 0, [
    { b: 4, w: 'hub', cam: [960, 540, 1, 960, 500, 1.1], dust: 20, A: [],
      P: (T) => [['burst', 'front', 960, 520, T(0), '#FFE14D', 220], ['burst', 'front', 960, 520, T(1), '#FF9BD0', 250], ['burst', 'front', 960, 520, T(2), '#7BE8FF', 330], ['sparkles', 'front', 960, 500, T(2), 12, 460, 50]],
      fx: [(g, c) => window.KVTitle(c.tl, c.t0)] },
    { b: 4, w: 'workshop', cam: 'wideIn', flash: .6, A: crew('workshop', .8, 'cheer', { jumps: [2] }),
      P: (T) => [['text', 'over', 960, 250, 'SHAPE WORKSHOP!', T(0), '#FFE14D', 150, -3, 1.9], ['shapeChar', 'back', 'circle', 560, 560, .5, T(.5), T(4), [], { quiet: true }], ['shapeChar', 'back', 'triangle', 960, 540, .5, T(1), T(4), [], { quiet: true }], ['shapeChar', 'back', 'square', 1360, 560, .5, T(1.5), T(4), [], { quiet: true }], ['confetti', 'front', T(2), T(4), 30]] },
  ]);

  /* =========================================================================================== THE HOOK: the machine is jumbled */
  { const s = secs('hook')[0], L = linesOfSec(s).map(flat), jumble = [[560, 640, 'star', .55, 14], [820, 760, 'circle', .5, -10], [1100, 620, 'heart', .5, 8], [1350, 780, 'triangle', .55, -16], [700, 520, 'diamond', .5, 20], [1250, 500, 'square', .5, -8], [1500, 640, 'oval', .5, 12], [960, 650, 'rectangle', .5, -6]];
    place(s, [
      { b: 4, w: 'workshop', cam: 'wideIn', punch: 2, A: [A('workshop')('gizmo', 960, .95, { mv: 'bob', sing: 1 }), A('workshop')('kiko', 300, .8, { mv: 'bob', sing: 1 }), A('workshop')('luma', 1620, .8, { f: 1, mv: 'bob', sing: 1 })],
        P: (T) => [['belt', 'back', 800, T(0), T(4), rot(KEYS, 3), { s: .5 }], ['text', 'over', 960, 240, 'BEEP BOOP!', L[0][0].t0, '#FFE14D', 190, -4, 1.7]] },
      { b: 4, w: 'workshop', cam: 'low', punch: 2, A: [A('workshop')('gizmo', 960, .95, { mv: 'bob', sing: 1 }), A('workshop')('kiko', 300, .8, { mv: 'cheer', sing: 1 }), A('workshop')('luma', 1620, .8, { f: 1, mv: 'cheer', sing: 1 })], fx: [shake(0, 1.5, 3)],
        P: (T) => jumble.map(([x, y, k, sc, r], i) => ['dropShape', 'front', k, x, y, sc, T(.2 + i * .35), { rot: r, from: 560 }]).concat([['text', 'over', 960, 220, 'ALL MIXED UP!', L[0][3].t0, '#FF9BD0', 150, 3, 1.8]]) },
      { b: 4, w: 'workshop', cam: 'wideIn', punch: 1, A: crew('workshop', .74, 'cheer', { jumps: [0, 2] }),
        P: (T) => [['text', 'over', 960, 250, "LET'S SORT THEM!", L[1][2].t0, '#7BE8FF', 120, -3, 2], ['belt', 'back', 800, T(0), T(4), rot(KEYS, 5), { s: .5 }], ['sparkles', 'front', 960, 520, T(1), 8, 700, 40]] },
      { b: 4, w: 'workshop', cam: 'low', punch: 2, A: crewArc('workshop', .82, 'dance'), P: (T) => [['confetti', 'front', T(0), T(4), 34], ['text', 'over', 960, 250, 'SORT!', L[1][5].t0, '#FFE14D', 200, -4, 1.4], ['notes', 'front', 960, 520, T(0), T(4)]] },
    ]); }

  /* =========================================================================================== THE EIGHT SHAPE STOPS (7 bars = 28 beats, 12 shots) */
  const ASKCOL = { circle: '#F23B4E', square: '#2F9BFF', triangle: '#FFC21F', rectangle: '#39C95B', oval: '#A66BFF', star: '#FF9F1C', heart: '#FF6FA5', diamond: '#19CFC8' };
  const DESC = { circle: 'ROUND AND ROUND!', square: 'FOUR SIDES!', triangle: 'THREE SIDES!', rectangle: 'LONG AND WIDE!', oval: 'LIKE AN EGG!', star: 'FIVE POINTS!', heart: 'FULL OF LOVE!', diamond: 'SHINE AND GLOW!' };
  const GHOST = { circle: [2.4, 0, 0, 0], square: [2.3, 0, 0, 0], triangle: [2.4, 0, 18, 0], rectangle: [2.1, 0, 0, 0], oval: [2.1, 0, 0, 0], star: [2.1, 0, 0, 0], heart: [2.2, 0, -10, 0], diamond: [1.9, 0, 0, 0] };   // scale, dx, dy, rot
  const TALL = { door: 90, book: 90 };      // rectangle ghosts turn upright behind tall objects
  secs('stop').forEach((s) => {
    const i = s.meta.i, sh = SH[i], key = sh.key, name = sh.name, world = sh.world, hex = ASKCOL[key], pair = PAIRS[i], L = linesOfSec(s).map(flat);
    const tAsk = L[0][0].t0, tAnswer = L[0][4].t0, tName = L[0][5].t0, tb = (b) => s.t0 + b * BEAT;
    const side = (w, o1 = {}, o2 = {}) => [A(w)(pair[0], 250, .95, Object.assign({ mv: 'bob', sing: 1 }, o1)), A(w)(pair[1], 1670, .95, Object.assign({ f: 1, mv: 'bob', sing: 1 }, o2))];
    const talk1 = inWin(talkOf(L[1], name).concat([[tName, 1.0]]), tb(4), tb(8)), talk2 = talkOf(L[1], name, .9);
    const gt = GHOST[key], shots = [], sh_ = (len, spec) => shots.push(Object.assign({ b: len, w: world }, spec));
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
    place(s, shots);
  });

  /* =========================================================================================== GAME: where is the ...? */
  secs('game').forEach((s, k) => {
    const cards = s.meta.cards, correct = cards.indexOf(s.meta.shape), who = [['kiko', 'luma'], ['gizmo', 'bloop'], ['rumble', 'nimbus']][k], sh = SH.find((x) => x.key === s.meta.shape), tReveal = s.t0 + 12 * BEAT;
    place(s, [{ b: 16, w: 'disco', cam: [960, 560, 1.0, 960, 540, 1.06], punch: 1,
      A: [A('disco')(who[0], 260, .95, { mv: 'bob', sing: 1, fn: [scan(1, 2, 5.6)] }), A('disco')(who[1], 1660, .95, { f: 1, mv: 'bob', sing: 1, fn: [scan(-1, 2, 5.6)] })],
      P: (T) => [k === 0 ? ban(T, 0, 3, 'WHERE IS IT?', 'SHAPE GAME', '#2F9BFF') : ['text', 'over', 960, 195, `WHERE IS THE ${UP(sh.name)}?`, T(0), '#FFFFFF', 80, -2, 3.6], ['shapeCards', 'front', cards, 960, 560, T(1.2), tReveal, correct, { until: s.t1 }], ['countdown', 'front', 960, 372, T(4.2), 3, 1.3, tReveal - .2], ['text', 'over', 960, 272, 'THINK...', T(4.6), '#FFFFFF', 66, 0, 3.4]] }]);
  });

  /* =========================================================================================== SHAPE YOGA (brain break) */
  { const s = secs('yoga')[0], L = linesOfSec(s).map(flat), tb = (b) => s.t0 + b * BEAT;
    const ring = (k, scl, t, until, extra = {}) => ['shapeOutline', 'back', k, 960, 540, scl, t, until, COL[k], Object.assign({ fill: .22, dur: .5 }, extra)];
    place(s, [
      { b: 4, w: 'disco', cam: 'wideIn', punch: 2, A: crew('disco', .74, 'cheer', { jumps: [0, 3] }), P: (T) => [ring('circle', 3.1, L[0][0].t0, tb(4)), ['text', 'over', 960, 215, 'CIRCLE ARMS!', L[0][0].t0, '#FFFFFF', 130, -3, 1.9]] },
      { b: 4, w: 'disco', cam: 'low', punch: 2, A: crew('disco', .74, 'cheer', { jumps: [1, 4] }), P: (T) => [ring('triangle', 3.0, L[0][2].t0, tb(8)), ['text', 'over', 960, 215, 'TRIANGLE HANDS!', L[0][2].t0, '#FFE14D', 120, 3, 1.9]] },
      { b: 4, w: 'disco', cam: 'wideIn', punch: 2, A: crew('disco', .74, 'dance'), P: (T) => [ring('star', 2.6, L[1][0].t0, tb(12)), ['text', 'over', 960, 215, 'STAR POSE!', L[1][0].t0, '#FF9F1C', 150, -3, 1.9]] },
      { b: 4, w: 'disco', cam: [960, 540, 1.0, 960, 540, 1.02], A: crew('disco', .74, 'bob'), P: (T) => [['tint', 'over', '#BDEBFF', .38, L[1][2].t0 - .1, tb(16)], ['text', 'over', 960, 270, 'FREEZE!', L[1][2].t0, '#FFFFFF', 230, 0, 3.2]] },
    ]); }

  /* =========================================================================================== BUILD A HOUSE (the finale: every shape has a job) */
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

  /* =========================================================================================== FINALE (key up) + OUTRO */
  { const s = secs('fin')[0], L = linesOfSec(s).map(flat), tb = (b) => s.t0 + b * BEAT;
    place(s, [
      { b: 4, w: 'finale', cam: 'wideIn', punch: 2, A: crew('finale', .74, 'dance'), P: (T) => KEYS.slice(0, 4).map((k, i) => ['shapeChar', 'front', k, 330 + i * 420, 450, .64, T(.1 + i * .3), T(4), [], { quiet: true }]).concat([['text', 'over', 960, 240, 'BYE BYE, SHAPES!', L[0][0].t0, '#FFE14D', 130, -4, 1.9]]) },
      { b: 4, w: 'finale', cam: 'low', punch: 2, A: crew('finale', .74, 'cheer', { jumps: [0, 2, 4] }), P: (T) => KEYS.slice(4).map((k, i) => ['shapeChar', 'front', k, 330 + i * 420, 450, .64, T(.1 + i * .3), T(4), [], { quiet: true }]).concat([['fireworks', 'back', 520, 330, T(1), '#FF5E7E', 230], ['fireworks', 'back', 1400, 330, T(1.5), '#4CC9F0', 230], ['confetti', 'front', T(0), T(4), 34]]) },
    ]); }
  section('outro', 0, [
    { b: 4, w: 'finale', cam: 'wideIn', A: crewArc('finale', .84, 'wave'), P: (T) => [['hearts', 'front', 960, 430, T(1.5), 7], ['sparkles', 'front', 960, 450, T(2), 8, 760, 36]] },
    { b: 6, w: 'finale', cam: 'wide', A: crewArc('finale', .84, 'wave'), P: (T) => [['text', 'front', 960, 270, 'SEE YOU SOON!', T(.4), '#FFE14D', 120, -3, 3.4], ['hearts', 'front', 960, 430, T(2), 7], ['confetti', 'front', T(2.5), T(6), 24]] },
    { b: 6, w: 'finale', cam: [960, 540, 1.04, 960, 520, 1.0], A: crewArc('finale', .84, 'wave'), P: (T) => [['sparkles', 'front', 960, 450, T(0), 8, 760, 36], ['sparkles', 'front', 960, 450, T(4), 8, 760, 36]] },
  ]);

  window.SB = SB;
})();
