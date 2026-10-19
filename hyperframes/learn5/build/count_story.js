/* KiddoVerse LEARN #5 "Gizmo's Counting Machine" storyboard - TikTok-speed: a new shot every 1-2 s, every picture lands on the sung word.
   Everything is generated from the song data (sections, lines, words) and the number tables.  beat = 0.5 s, bar = 4 beats. */
(function () {
  const SONG = window.SONG, BEAT = 60 / SONG.bpm, BAR = SONG.bar, SB = [], NUMS = SONG.nums, SKIPS = SONG.skips, C = window.CNT, PAL = C.PAL;
  const FL = { hub: 905, hills: 905, dino: 910, cloud: 915, workshop: 925, disco: 930, finale: 905, space: 1000, numland: 905, abc: 905 };
  ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'].forEach((k) => { FL['c_' + k] = 905; });
  const secs = (kind) => SONG.sections.filter((s) => s.kind === kind);
  function place(s, shots) {
    let b = 0;
    shots.forEach((sh) => { SB.push(Object.assign({ sec: s.kind }, sh, { t0: s.t0 + b * BEAT, t1: s.t0 + (b + sh.b) * BEAT })); b += sh.b; });
    if (Math.abs(b - s.bars * 4) > 1e-6) throw new Error(`storyboard ${s.kind}#${s.i}: ${b} beats, expected ${s.bars * 4}`);
  }
  const section = (kind, nth, shots) => place(secs(kind)[nth], shots);
  const A = (w) => (c, x, s = 1, o = {}) => Object.assign({ c, x, y: FL[w], s }, o);
  const ORDER = ['kiko', 'luma', 'gizmo', 'bloop', 'rumble', 'nimbus'], XS = [390, 650, 910, 1170, 1430, 1690];
  const crew = (w, s = .76, mv = 'bob', o = {}) => ORDER.map((c, i) => A(w)(c, XS[i], s, Object.assign({ mv, sing: 1 }, o)));
  const crewArc = (w, s = .82, mv = 'bob', o = {}) => ORDER.map((c, i) => { const x = [380, 650, 900, 1150, 1400, 1670][i], k = [1, .45, 0, 0, .45, 1][i]; return A(w)(c, x, s * (1 - .1 * (1 - k)), Object.assign({ y: FL[w] + 36 * k - 36, mv, sing: 1 }, o)); }).sort((a, b) => a.y - b.y);
  const M = () => window.__KVM;
  const S_ = (t) => +t.toFixed(4);
  const shake = (...bs) => (g, c) => bs.forEach((b) => { window.__LOG(c.T(b), 'thud'); for (let i = 0; i < 6; i++) c.tl.to(c.punch, { x: (i % 2 ? 1 : -1) * 16 * (1 - i / 6), y: (i % 2 ? -1 : 1) * 12 * (1 - i / 6), duration: .045 }, c.T(b) + i * .045); c.tl.to(c.punch, { x: 0, y: 0, duration: .05 }, c.T(b) + .28); });
  const flat = (l) => l.words.flatMap((w) => w.subs || [w]);
  const linesOfSec = (s) => SONG.lines.filter((l) => l.sec === s.i);
  const PAIRS = [['kiko', 'luma'], ['gizmo', 'rumble'], ['bloop', 'nimbus'], ['luma', 'gizmo'], ['kiko', 'bloop'], ['rumble', 'nimbus'], ['luma', 'rumble'], ['kiko', 'gizmo']];
  const UP = (s) => s.toUpperCase();
  const scan = (dir, from = .4, to = 3.4) => (a, t0, t1, tl) => { const m = M(); for (let t = t0 + from, i = 0; t < t0 + to; t += .6, i++) m.look(a, S_(t), (i % 2 ? -1 : 1) * 12 * dir, -6, .2); m.look(a, S_(t0 + to + .3), 0, 0, .2); };
  const side = (w, pair, o1 = {}, o2 = {}) => [A(w)(pair[0], 210, .85, Object.assign({ mv: 'bob', sing: 1 }, o1)), A(w)(pair[1], 1710, .85, Object.assign({ f: 1, mv: 'bob', sing: 1 }, o2))];
  const TCOL = ['#FFFFFF', '#FFE14D', '#7BE8FF'];

  /* =========================================================================================== INTRO (2 bars) */
  section('intro', 0, [
    { b: 4, w: 'hub', cam: [960, 540, 1, 960, 500, 1.1], dust: 20, A: [],
      P: (T) => [['burst', 'front', 960, 520, T(0), '#FFE14D', 220], ['burst', 'front', 960, 520, T(1), '#FF9BD0', 250], ['burst', 'front', 960, 520, T(2), '#7BE8FF', 330], ['sparkles', 'front', 960, 500, T(2), 12, 460, 50]],
      fx: [(g, c) => window.KVTitle(c.tl, c.t0)] },
    { b: 4, w: 'workshop', cam: 'wideIn', flash: .6, A: crew('workshop', .8, 'cheer', { jumps: [2] }),
      P: (T) => [['display', 'front', 960, 420, 1.1, [[T(.3), '1'], [T(.7), '2'], [T(1.1), '3'], [T(1.5), '4'], [T(2), '5'], [T(2.4), '...'], [T(3), '20']], T(0), T(4)], ['text', 'over', 960, 160, 'COUNTING MACHINE!', T(0), '#FFE14D', 120, -3, 1.9], ['confetti', 'front', T(2), T(4), 30]] },
  ]);

  /* =========================================================================================== THE HOOK: ten is full, count to twenty */
  { const s = secs('hook')[0], L = linesOfSec(s).map(flat);
    place(s, [
      { b: 2, w: 'workshop', cam: 'wideIn', punch: 2, A: [A('workshop')('gizmo', 960, .95, { mv: 'bob', sing: 1 }), A('workshop')('kiko', 300, .8, { mv: 'bob', sing: 1 }), A('workshop')('luma', 1620, .8, { f: 1, mv: 'bob', sing: 1 })],
        P: (T) => [['display', 'front', 960, 420, 1.1, [[T(.1), '10'], [T(.6), '..'], [T(1), '10']], T(0), T(2)], ['text', 'over', 960, 150, 'BEEP BOOP!', L[0][0].t0, '#FFE14D', 150, -4, 1.0]] },
      { b: 2, w: 'workshop', cam: 'low', punch: 2, A: [A('workshop')('gizmo', 300, .85, { mv: 'bob', sing: 1 }), A('workshop')('bloop', 1620, .85, { f: 1, mv: 'bob', sing: 1 })],
        P: (T) => [['tenFrame', 'front', 'star', 10, 960, 610, 1.5, T(0), T(2), { t10: T(.15) }], ['text', 'over', 960, 215, 'TEN...', L[0][2].t0, '#FFFFFF', 150, -3, 1.0]] },
      { b: 4, w: 'workshop', cam: 'wideIn', punch: 2, A: [A('workshop')('gizmo', 300, .85, { mv: 'cheer', sing: 1, jumps: [0] }), A('workshop')('bloop', 1620, .85, { f: 1, mv: 'cheer', sing: 1, jumps: [0] })],
        P: (T) => [['tenFrame', 'front', 'star', 10, 960, 610, 1.5, T(0), T(4), { static: true, noPop: true }], ['text', 'over', 960, 215, 'TEN IS FULL!', L[0][4].t0, '#FFE14D', 150, -3, 1.9], ['burst', 'front', 960, 610, L[0][4].t0, '#FFE14D', 360], ['sparkles', 'front', 960, 610, L[0][4].t0, 10, 560, 40]] },
      { b: 4, w: 'numland', cam: 'wideIn', punch: 2, A: side('numland', ['kiko', 'luma'], { mv: 'cheer' }, { mv: 'cheer' }),
        P: (T) => [['tenFrame', 'front', 'star', 20, 960, 610, 1.1, T(0), T(4), { t10: T(.05), extra: [...Array(10)].map((_, k) => S_(T(1.2) + k * .09)), tick: true }], ['text', 'over', 960, 215, 'COUNT TO...', L[1][2].t0, '#FFFFFF', 130, -3, 1.9]] },
      { b: 4, w: 'numland', cam: 'low', punch: 2, A: crewArc('numland', .82, 'dance'),
        P: (T) => [['display', 'front', 960, 430, 1.1, [[L[1][4].t0 + .05, '20']], T(0), T(4)], ['text', 'over', 960, 170, 'TWENTY!', L[1][4].t0, '#FF9BD0', 150, -4, 1.8], ['confetti', 'front', L[1][4].t0 + .1, T(4), 36], ['notes', 'front', 960, 640, T(0), T(4)]] },
    ]); }

  /* =========================================================================================== THE TEN COUNTING STOPS (5 bars = 20 beats) */
  secs('stop').forEach((s) => {
    const i = s.meta.i, nm = NUMS[i], n = nm.n, m = n - 10, world = nm.world, kind = nm.obj, pair = PAIRS[i % 8], L = linesOfSec(s).map(flat), col = C.COL[kind];
    const word = UP(nm.word), plural = UP(nm.plural), tb = (b) => s.t0 + b * BEAT;
    const tPlus = L[0][0].t0, tM = L[0][2].t0, tMore = L[0][3].t0, tSay = L[1][0].t0, tOn = L[2].map((w) => w.t0), tObjN = L[3][0].t0, tObjP = L[3][1].t0;
    const hud = (T, pop) => ['numHud', 'over', n, pop ? tPlus : null, T(0), s.t1];       // every shot has its own prop layers, so the tray is drawn in each of them
    const shots = [];
    /* beats 0-4: "Ten and three more!"  the full ten-frame, the extra counters drop into the second frame */
    const dt = Math.min(.4, (tMore + .35 - tM) / m), extra = [...Array(m)].map((_, k) => S_(tM - .05 + k * dt));
    shots.push({ b: 4, w: 'workshop', cam: 'wideIn', flash: i === 0 ? .9 : 0, A: side('workshop', pair, {}, {}),
      P: (T) => [['tenFrame', 'front', kind, n, 960, 610, 1.1, T(0), T(4), { t10: T(.1), extra, tick: true }], ['text', 'over', 960, 215, `TEN AND ${m} MORE!`, tPlus, '#FFFFFF', 100, -2, 1.9], hud(T, true)] });
    /* beats 4-8: the kids say the number; Gizmo's display lights up */
    shots.push({ b: 4, w: world, cam: [960, 540, 1, 960, 540, 1.12], punch: 2, A: side(world, pair, { mv: 'cheer' }, { mv: 'cheer' }),
      P: (T) => [['display', 'front', 960, 355, 1.1, [[tSay + .05, String(n)]], T(0), T(4)], ['burst', 'front', 960, 355, tSay, '#6CFFB0', 300], ['wordLabel', 'over', 960, 560, word, tSay, T(4), { size: 130 }],
        ['tenFrame', 'front', kind, n, 960, 800, .62, T(0), T(4), { static: true, noPop: true }], ['sparkles', 'front', 960, 355, tSay + .1, 8, 500, 40], hud(T, false)] });
    /* beats 8-16: counting on - the last three numbers, a badge on each of the three last counters */
    const trio = [n - 2, n - 1, n], idxs = [n - 3, n - 2, n - 1];
    [8, 12].forEach((b0, q) => {
      const a = tb(b0), bnd = tb(b0 + 4);
      const badges = trio.map((v, j) => [idxs[j], tOn[j] >= a - .01 ? tOn[j] : null, String(v), PAL[(j * 2 + 1) % 6]]).filter((bd, j) => tOn[j] < bnd);
      const texts = trio.map((v, j) => [v, j]).filter(([, j]) => tOn[j] >= a - .01 && tOn[j] < bnd).map(([v, j]) => ['text', 'over', 960, 215, String(v), tOn[j], TCOL[j], 170, j % 2 ? 3 : -3, Math.max(.5, (j < 2 ? tOn[j + 1] - tOn[j] : 1.8) - .04)]);
      shots.push({ b: 4, w: world, cam: q ? 'low' : 'wideIn', punch: 2, A: side(world, pair, { mv: q ? 'cheer' : 'dance' }, { mv: q ? 'cheer' : 'dance' }),
        P: (T) => [['tenFrame', 'front', kind, n, 960, 630, 1.1, T(0), T(4), { static: true, noPop: true, badges }]].concat(texts, texts.length ? [] : [['numeral', 'over', 960, 240, n, T(0), '#FFE14D', T(4), { size: 230 }], ['sparkles', 'front', 960, 300, T(.3), 8, 600, 40]], [hud(T, false)]) });
    });
    /* beats 16-20: "Thirteen apples!"  the number, then what the machine counted */
    const bNum = Math.max(1, Math.min(3, Math.floor((tObjP - tb(16)) / BEAT + 1e-6)));
    shots.push({ b: bNum, w: world, cam: 'wideIn', punch: 2, A: side(world, pair, { mv: 'cheer', jumps: [0] }, { mv: 'cheer', jumps: [0] }),
      P: (T) => [['numeral', 'front', 960, 540, n, tObjN, '#FFE14D', T(bNum), { size: 400 }], ['burst', 'front', 960, 540, tObjN, col, 300], hud(T, false)] });
    shots.push({ b: 4 - bNum, w: world, cam: [960, 560, 1.0, 960, 545, 1.15], punch: 2, A: side(world, pair, { mv: 'cheer', jumps: [1] }, { mv: 'dance' }),
      P: (T) => [['obj', 'front', kind, 960, 590, 2.2, tObjP, { until: T(4 - bNum) }], ['wordLabel', 'over', 960, 215, plural, tObjP, T(4 - bNum), { size: 128 }], ['chip', 'over', 960, 900, `${n} ${plural}!`, col, tObjP + .1, 86], ['sparkles', 'front', 960, 590, tObjP, 9, 380, 40], hud(T, false)] });
    place(s, shots);
  });

  /* =========================================================================================== QUIZ ROUNDS */
  const QTXT = ['WHAT COMES AFTER 14?', 'HOW MANY STARS?', 'WHAT COMES NEXT?'];
  secs('game').forEach((s, k) => {
    const g = SONG.games[k], cards = g.cards.map(String), correct = g.cards.indexOf(g.ans), who = [['kiko', 'luma'], ['gizmo', 'bloop'], ['rumble', 'nimbus']][k], tReveal = s.t0 + 12 * BEAT, Lq = linesOfSec(s).map(flat)[0];
    const top = (T) => {
      if (k === 0) return [['display', 'front', 960, 385, .85, [[T(.8), '14'], [T(2.6), '14 ?'], [tReveal, String(g.ans)]], T(.2), s.t1]];
      if (k === 1) return [['tenFrame', 'front', g.item, g.items, 960, 350, .62, T(.4), s.t1, { t10: T(1), step: .17, extra: [...Array(g.items - 10)].map((_, q) => S_(T(1) + (q + 10) * .17)), tick: true }]];
      const gap = 300, tw = Lq.slice(0, 3).map((w) => w.t0);
      return [['skipRow', 'front', 'sock', [2, 4, 6], 960 - gap / 2, 315, gap, .8, tw, s.t1, {}], ['numeral', 'front', 960 + 1.5 * gap, 345, '?', T(2.2), '#FFE14D', s.t1, { size: 230 }]];
    };
    place(s, [{ b: 16, w: 'disco', cam: [960, 560, 1.0, 960, 540, 1.06], punch: 1,
      A: [A('disco')(who[0], 210, .85, { mv: 'bob', sing: 1, fn: [scan(1, 2, 5.6)] }), A('disco')(who[1], 1710, .85, { f: 1, mv: 'bob', sing: 1, fn: [scan(-1, 2, 5.6)] })],
      P: (T) => [['text', 'over', 960, 185, QTXT[k], T(0), '#FFFFFF', 72, -2, 3.8]].concat(top(T), [['cards', 'front', cards, 960, 785, T(1.2), tReveal, correct, { until: s.t1 }], ['countdown', 'front', 960, 560, T(4.2), 3, 1.3, tReveal - .2]]) }]);
  });

  /* =========================================================================================== SKIP COUNTING: twos, fives, tens (6 bars = 24 beats) */
  const SKP = { twos: { item: 'sock', gap: 270, sc: .9, tit: 'COUNT BY TWOS!', res: 'FIVE PAIRS = TEN SOCKS!', unit: 'PAIRS OF SOCKS' }, fives: { item: 'hand', gap: 340, sc: 1.1, tit: 'COUNT BY FIVES!', res: 'TWENTY FINGERS!', unit: '5 FINGERS ON A HAND' }, tens: { item: 'car', gap: 270, sc: .85, tit: 'COUNT BY TENS!', res: 'FIVE TENS = FIFTY!', unit: 'TEN-FRAME TRAIN' } };
  secs('skip').forEach((s, q) => {
    const sk = SKIPS.find((x) => x.key === s.meta.skip), cf = SKP[sk.key], world = sk.world, vals = sk.vals, pair = PAIRS[(q + 3) % 8], L = linesOfSec(s).map(flat), tb = (b) => s.t0 + b * BEAT;
    const tN = L[1].map((w) => w.t0), tE = L[2].map((w) => w.t0), cy = 600;
    const seqFor = (ts, a, b) => { const out = []; ts.forEach((t, i) => { const tt = t + .05; if (tt <= a + .02) out.length = 0, out.push([a + .02, String(vals[i])]); else if (tt < b) out.push([tt, String(vals[i])]); }); return out; };
    const A_ = (mv, o = {}) => side(world, pair, Object.assign({ mv }, o), Object.assign({ mv }, o));
    const rowShot = (b0, ts, dim) => {
      const a = tb(b0), bnd = tb(b0 + 4), seq = seqFor(ts, a, bnd);
      return { b: 4, w: world, cam: (b0 / 4) % 2 ? 'low' : 'wideIn', punch: 2, A: A_(dim ? 'cheer' : 'dance'),
        P: (T) => [['skipRow', 'front', cf.item, vals, 960, cy, cf.gap, cf.sc, dim ? null : ts.map((t) => (t >= a - .01 ? t : null)), s.t1, dim ? { dim: true, lights: ts.map((t) => (t >= a - .01 ? t : null)) } : {}]].concat(seq.length ? [['display', 'front', 960, 270, .78, seq, T(0), T(4)]] : [])
          .concat([['sparkles', 'front', 960, 300, T(1), 6, 600, 36]]) };
    };
    place(s, [
      { b: 4, w: world, cam: 'wideIn', punch: 2, A: A_('cheer', { jumps: [0] }),
        P: (T) => [['text', 'over', 960, 170, cf.tit, L[0][0].t0, '#FFFFFF', 120, -3, 1.9], ['skipItem', 'front', cf.item, 960, 620, cf.item === 'car' ? 1.9 : 1.8, T(.3), T(4), {}], ['chip', 'over', 960, 920, cf.unit, '#FF5E7E', T(1), 70]] },
      rowShot(4, tN, false), rowShot(8, tN, false), rowShot(12, tE, true), rowShot(16, tE, true),
      { b: 4, w: world, cam: 'low', punch: 2, A: A_('cheer', { jumps: [0, 1] }),
        P: (T) => [['skipRow', 'front', cf.item, vals, 960, cy, cf.gap, cf.sc, null, s.t1, {}], ['text', 'over', 960, 235, cf.res, L[3][0].t0, '#FFE14D', 100, -2, 1.9], ['confetti', 'front', L[3][L[3].length - 1].t0 - .3, T(4), 36], ['sparkles', 'front', 960, 600, L[3][L[3].length - 1].t0, 10, 640, 40]] },
    ]);
  });

  /* =========================================================================================== FINALE (key up) + OUTRO */
  { const s = secs('fin')[0], L = linesOfSec(s).map(flat);
    place(s, [
      { b: 4, w: 'finale', cam: 'wideIn', punch: 2, A: crew('finale', .74, 'dance'), P: (T) => [['display', 'front', 960, 440, 1.1, [[T(.1), '20']], T(0), T(4)], ['text', 'over', 960, 160, 'BYE BYE, NUMBERS!', L[0][0].t0, '#FFE14D', 120, -4, 1.9], ['hearts', 'front', 960, 720, T(1.5), 6]] },
      { b: 4, w: 'finale', cam: 'low', punch: 2, A: crew('finale', .74, 'cheer', { jumps: [0, 2, 4] }), P: (T) => [['fireworks', 'back', 520, 330, T(1), '#FF5E7E', 230], ['fireworks', 'back', 1400, 330, T(1.5), '#4CC9F0', 230], ['confetti', 'front', T(0), T(4), 34], ['text', 'over', 960, 210, '1 2 3 ... 20!', T(.2), '#7BE8FF', 130, 3, 1.8]] },
    ]); }
  section('outro', 0, [
    { b: 4, w: 'finale', cam: 'wideIn', A: crewArc('finale', .84, 'wave'), P: (T) => [['hearts', 'front', 960, 430, T(1.5), 7], ['sparkles', 'front', 960, 450, T(2), 8, 760, 36]] },
    { b: 6, w: 'finale', cam: 'wide', A: crewArc('finale', .84, 'wave'), P: (T) => [['text', 'front', 960, 270, 'SEE YOU SOON!', T(.4), '#FFE14D', 120, -3, 3.4], ['hearts', 'front', 960, 430, T(2), 7], ['confetti', 'front', T(2.5), T(6), 24]] },
    { b: 6, w: 'finale', cam: [960, 540, 1.04, 960, 520, 1.0], A: crewArc('finale', .84, 'wave'), P: (T) => [['sparkles', 'front', 960, 450, T(0), 8, 760, 36], ['sparkles', 'front', 960, 450, T(4), 8, 760, 36]] },
  ]);

  window.SB = SB;
})();
