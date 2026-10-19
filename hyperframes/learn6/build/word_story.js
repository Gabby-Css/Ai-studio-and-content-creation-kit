/* KiddoVerse LEARN #6 "Sound It Out" storyboard - TikTok-speed: a new shot every 1-2 s, every picture lands on the sung sound / word.
   Everything is generated from the song data (sections, lines, words) and the word tables.  beat = 0.5 s, bar = 4 beats. */
(function () {
  const SONG = window.SONG, BEAT = 60 / SONG.bpm, BAR = SONG.bar, SB = [], WD = SONG.words, WORDS = WD.map((x) => x.w), BYW = {};
  WD.forEach((x) => { BYW[x.w] = x; });
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
  const flat = (l) => l.words.flatMap((w) => w.subs || [w]);
  const linesOfSec = (s) => SONG.lines.filter((l) => l.sec === s.i);
  const PAIRS = [['kiko', 'luma'], ['gizmo', 'rumble'], ['bloop', 'nimbus'], ['luma', 'gizmo'], ['kiko', 'bloop'], ['rumble', 'nimbus'], ['luma', 'rumble'], ['kiko', 'gizmo']];
  const UP = (s) => s.toUpperCase();
  const scan = (dir, from = .4, to = 3.4) => (a, t0, t1, tl) => { const m = M(); for (let t = t0 + from, i = 0; t < t0 + to; t += .6, i++) m.look(a, S_(t), (i % 2 ? -1 : 1) * 12 * dir, -6, .2); m.look(a, S_(t0 + to + .3), 0, 0, .2); };
  const side = (w, pair, o1 = {}, o2 = {}) => [A(w)(pair[0], 210, .85, Object.assign({ mv: 'bob', sing: 1 }, o1)), A(w)(pair[1], 1710, .85, Object.assign({ f: 1, mv: 'bob', sing: 1 }, o2))];
  const ANIMALS = ['cat', 'dog', 'pig'];
  const FLASH = { cat: [2, 3, 4], dog: [2, 3, 4], sun: [2, 3, 4], hat: [1, 3, 5], pig: [2, 3, 4], bus: [2, 3, 4], cup: [3, 4], red: [0, 1, 2], big: [0, 1, 2], run: [0, 1, 2, 3, 4] };
  const FPOS = [[1330, 360], [1430, 560], [1300, 760], [1450, 420], [1330, 640]];
  const FCOL = ['#FFE14D', '#FF9BD0', '#7BE8FF', '#B8FF8F', '#FFB84D'];
  /* a picture that "acts": the animal heads talk on every flashed word, the other pictures bob */
  const pic = (kind, x, y, sc, t, until, talkTimes, o = {}) => (ANIMALS.includes(kind) ? ['animal', 'front', kind, x, y, sc, t, until, talkTimes.map((tt) => [tt, .45]), o] : ['obj', 'front', kind, x, y, sc, t, Object.assign({ until }, o)]);

  /* =========================================================================================== INTRO (2 bars) */
  section('intro', 0, [
    { b: 4, w: 'hub', cam: [960, 540, 1, 960, 500, 1.1], dust: 20, A: [],
      P: (T) => [['burst', 'front', 960, 520, T(0), '#FFE14D', 220], ['burst', 'front', 960, 520, T(1), '#FF9BD0', 250], ['burst', 'front', 960, 520, T(2), '#7BE8FF', 330], ['sparkles', 'front', 960, 500, T(2), 12, 460, 50]],
      fx: [(g, c) => window.KVTitle(c.tl, c.t0)] },
    { b: 4, w: 'abc', cam: 'wideIn', flash: .6, A: crew('abc', .8, 'cheer', { jumps: [2] }),
      P: (T) => [['wordTiles', 'front', 'cat', ['kuh', 'a', 'tuh'], 960, 430, .8, [T(.3), T(.8), T(1.3)], T(2.2), T(3), T(4), {}], ['text', 'over', 960, 170, 'WORD MACHINE!', T(0), '#FFE14D', 120, -3, 1.9], ['confetti', 'front', T(2.6), T(4), 24]] },
  ]);

  /* =========================================================================================== THE HOOK: sound it out, slide it, read it */
  { const s = secs('hook')[0], L = linesOfSec(s).map(flat), sn = ['suh', 'u', 'nuh'];
    place(s, [
      { b: 4, w: 'abc', cam: 'wideIn', punch: 2, A: side('abc', ['gizmo', 'kiko'], { mv: 'bob' }, { mv: 'bob' }),
        P: (T) => [['wordTiles', 'front', 'sun', sn, 960, 590, 1.0, [L[0][2].t0, L[0][3].t0, L[0][4].t0], null, null, T(4), { chips: true }], ['text', 'over', 960, 185, 'BEEP BOOP!', L[0][0].t0, '#FFE14D', 120, -4, .95], ['text', 'over', 960, 185, 'SOUND IT OUT!', L[0][2].t0, '#FFFFFF', 100, 3, 1.9]] },
      { b: 4, w: 'abc', cam: 'low', punch: 2, A: side('abc', ['gizmo', 'kiko'], { mv: 'cheer' }, { mv: 'cheer' }),
        P: (T) => [['wordTiles', 'front', 'sun', sn, 960, 590, 1.0, [T(0), T(0), T(0)], T(.3), T(1.2), T(4), { noPop: true, pulses: [T(.4), T(.7), T(1.0)] }], ['obj', 'front', 'sun', 960, 300, 1.2, T(1.5), { until: T(4) }], ['text', 'over', 960, 185, 'SUN!', T(1.2), '#FFE14D', 150, -3, 1.6]] },
      { b: 4, w: 'abc', cam: 'wideIn', punch: 2, A: crew('abc', .74, 'cheer', { jumps: [0, 2] }),
        P: (T) => [['text', 'over', 960, 220, 'SLIDE IT!', L[1][0].t0, '#7BE8FF', 130, -3, .95], ['text', 'over', 960, 220, 'SAY IT!', L[1][2].t0, '#FF9BD0', 130, 3, 1.0], ['notes', 'front', 960, 520, T(0), T(4)]] },
      { b: 4, w: 'abc', cam: 'low', punch: 2, A: crewArc('abc', .82, 'dance'),
        P: (T) => [['confetti', 'front', T(0), T(4), 34], ['text', 'over', 960, 220, 'READ IT!', L[1][4].t0, '#FFE14D', 170, -4, 1.7]] },
    ]); }

  /* =========================================================================================== THE TEN WORD STOPS (5 bars = 20 beats) */
  secs('stop').forEach((s) => {
    const i = s.meta.i, wd = WD[i], word = wd.w, world = wd.world, kind = wd.pic, pair = PAIRS[i % 8], L = linesOfSec(s).map(flat), tb = (b) => s.t0 + b * BEAT;
    const sounds = wd.letters.map((x) => x.say), tSnd = L[0].map((x) => x.t0), tBl = L[1].slice(0, 3).map((x) => x.t0), tWord = L[1][3].t0, tSay = L[2].map((x) => x.t0), sent = L[3];
    const hud = (T, pop) => ['wordHud', 'over', WORDS, i, pop ? tSnd[0] : null, T(0), s.t1];
    const shots = [];
    /* beats 0-4: the three sounds: tiles pop into the word machine one by one and say "kuh - a - tuh" */
    shots.push({ b: 4, w: 'abc', cam: 'wideIn', flash: i === 0 ? .9 : 0, A: side('abc', pair, {}, {}),
      P: (T) => [['wordTiles', 'front', word, sounds, 960, 600, 1.0, tSnd, null, null, T(4), { chips: true }], ['text', 'over', 960, 195, 'SOUND IT OUT!', T(0), '#FFFFFF', 92, -2, 1.9], hud(T, true)] });
    /* beats 4-8: blend it: the tiles slide together ... the word! */
    shots.push({ b: 4, w: 'abc', cam: [960, 540, 1, 960, 540, 1.1], punch: 2, A: side('abc', pair, { mv: 'cheer' }, { mv: 'cheer' }),
      P: (T) => [['wordTiles', 'front', word, sounds, 960, 600, 1.0, [T(0), T(0), T(0)], tBl[0], tWord, T(4), { noPop: true, pulses: tBl }], ['text', 'over', 960, 195, word, tWord, '#FFE14D', 190, -3, 1.4], ['sparkles', 'front', 960, 600, tWord + .05, 10, 560, 40], hud(T, false)] });
    /* beats 8-12: the kids shout it twice and the picture pops out */
    shots.push({ b: 4, w: world, cam: [960, 560, 1.0, 960, 545, 1.2], punch: 2, A: side(world, pair, { mv: 'cheer', jumps: [0] }, { mv: 'cheer', jumps: [1] }),
      P: (T) => [pic(kind, 960, 560, 2.1, tSay[0], T(4), tSay), ['wordLabel', 'over', 960, 195, UP(word), tSay[0], T(4), { size: 150 }], ['burst', 'front', 960, 560, tSay[0], '#FFE14D', 300], ['burst', 'front', 960, 560, tSay[1], '#FF9BD0', 260], hud(T, false)] });
    /* beats 12-20: the word in a little sentence; the picture acts it out and the key word flashes on every sung time */
    [12, 16].forEach((b0, q) => {
      const a = tb(b0), bnd = tb(b0 + 4), idx = FLASH[word], hits = idx.map((k) => sent[k]).filter(Boolean).filter((x) => x.t0 >= a - .01 && x.t0 < bnd);
      const texts = hits.map((x, j) => ['text', 'over', FPOS[(q * 2 + j) % 5][0], FPOS[(q * 2 + j) % 5][1], wd.flash, x.t0, FCOL[(q * 2 + j) % 5], 130, j % 2 ? 4 : -4, .8]);
      const fx = [];
      if (word === 'sun') fx.push(['ring', 'back', 700, 560, 260, T0(a), tb(b0 + 4), '#FFE14D']);
      if (word === 'bus' || word === 'run') fx.push(['speed', 'back', a, bnd, 1, 12]);
      if (word === 'cup') hits.forEach((x) => fx.push(['hearts', 'front', 700, 420, x.t0, 4]));
      if (word === 'red') fx.push(['tint', 'over', '#FF4D5E', .16, a, bnd]);
      shots.push({ b: 4, w: world, cam: q ? 'low' : 'wideIn', punch: 2, A: side(world, pair, { mv: q ? 'cheer' : 'dance' }, { mv: q ? 'cheer' : 'dance' }),
        P: (T) => [pic(kind, 700, 580, word === 'big' ? 2.7 : 2.0, a - .02, T(4), hits.map((x) => x.t0), { quiet: true })].concat(texts, fx, [hud(T, false)]) });
    });
    place(s, shots);
  });
  function T0(t) { return t; }

  /* =========================================================================================== RHYME TIME (4 bars = 16 beats) */
  secs('rhyme').forEach((s) => {
    const r = SONG.rhymes[s.meta.r], L = linesOfSec(s).map(flat), A_ = BYW[r.a], B_ = BYW[r.b], pairC = PAIRS[(s.meta.r + 4) % 8], tb = (b) => s.t0 + b * BEAT;
    const plates = (T, tA, tB, pulses) => ['rhymePair', 'front', r.a, r.b, r.end, A_.pic, B_.pic, 960, 590, .85, tA, tB, pulses, T(4)];
    place(s, [
      { b: 4, w: 'abc', cam: 'wideIn', punch: 2, A: side('abc', pairC, { mv: 'cheer' }, { mv: 'cheer' }), P: (T) => [plates(T, L[0][0].t0, L[0][1].t0, [L[0][2].t0, L[0][3].t0]), ['text', 'over', 960, 185, 'RHYME TIME!', T(0), '#FFE14D', 110, -3, 1.9]] },
      { b: 4, w: 'abc', cam: 'low', punch: 2, A: side('abc', pairC, { mv: 'dance' }, { mv: 'dance' }), P: (T) => [plates(T, null, null, []), ['text', 'over', 960, 185, 'THEY RHYME!', L[0][4].t0, '#FF9BD0', 120, 3, 1.5], ['sparkles', 'front', 960, 580, L[0][5].t0, 10, 560, 40], ['hearts', 'front', 960, 420, L[0][5].t0 + .1, 6]] },
      { b: 4, w: 'abc', cam: 'wideIn', punch: 2, A: side('abc', pairC, { mv: 'cheer', jumps: [0, 2] }, { mv: 'cheer', jumps: [1, 3] }),
        P: (T) => [plates(T, null, null, L[1].map((x) => x.t0))].concat(L[1].map((x, j) => ['text', 'over', 960, 185, r.end, x.t0, ['#FFE14D', '#FF9BD0', '#7BE8FF', '#B8FF8F'][j % 4], 150, j % 2 ? 3 : -3, .45])) },
      { b: 4, w: 'abc', cam: 'low', punch: 2, A: crew('abc', .74, 'cheer', { jumps: [1, 3] }), P: (T) => [['text', 'over', 960, 215, 'SAME END SOUND!', T(.3), '#FFFFFF', 100, -2, 3.2], ['confetti', 'front', T(.2), T(4), 30], ['notes', 'front', 960, 520, T(0), T(4)]] },
    ]);
  });

  /* =========================================================================================== QUIZ ROUNDS */
  secs('game').forEach((s, k) => {
    const g = SONG.games[k], cards = g.cards, correct = cards.indexOf(g.w), who = [['kiko', 'luma'], ['gizmo', 'bloop'], ['rumble', 'nimbus']][k], tReveal = s.t0 + 12 * BEAT;
    place(s, [{ b: 16, w: 'disco', cam: [960, 560, 1.0, 960, 540, 1.06], punch: 1,
      A: [A('disco')(who[0], 210, .85, { mv: 'bob', sing: 1, fn: [scan(1, 2, 5.6)] }), A('disco')(who[1], 1710, .85, { f: 1, mv: 'bob', sing: 1, fn: [scan(-1, 2, 5.6)] })],
      P: (T) => [['text', 'over', 960, 185, `WHICH WORD SAYS ${UP(g.w)}?`, T(0), '#FFFFFF', 72, -2, 3.8], ['obj', 'front', BYW[g.w].pic, 960, 385, 1.05, T(.6), { until: s.t1 }],
        ['cards', 'front', cards, 960, 790, T(1.2), tReveal, correct, { until: s.t1, size: 150 }], ['countdown', 'front', 960, 575, T(4.2), 3, 1.3, tReveal - .2]] }]);
  });

  /* =========================================================================================== RECAP: we can read all ten words (6 bars = 24 beats) */
  { const s = secs('recap')[0], L = linesOfSec(s).map(flat), pics = WD.map((x) => x.pic);
    const txt_ = (T) => ['text', 'over', 960, 185, 'WE CAN READ!', T(.2), '#FFE14D', 110, -3, 7.5];
    place(s, [
      { b: 8, w: 'finale', cam: 'wideIn', punch: 2, A: crew('finale', .8, 'dance'), P: (T) => [['text', 'over', 960, 250, 'WE CAN READ!', L[0][2].t0, '#FFE14D', 190, -4, 1.7], ['text', 'over', 960, 250, 'WE CAN READ!', L[0][5].t0, '#FF9BD0', 190, 3, 1.7], ['confetti', 'front', T(0), T(8), 44], ['notes', 'front', 960, 640, T(0), T(8)]] },
      { b: 8, w: 'abc', cam: 'wideIn', punch: 1, A: side('abc', ['kiko', 'luma'], { mv: 'cheer' }, { mv: 'cheer' }),
        P: (T) => [txt_(T), ['wordGrid', 'front', WORDS, pics, 960, 560, .8, WORDS.map((w, j) => (j < 5 ? L[1][j].t0 : -1)), T(8)]] },
      { b: 8, w: 'abc', cam: 'low', punch: 1, A: side('abc', ['gizmo', 'bloop'], { mv: 'cheer' }, { mv: 'cheer' }),
        P: (T) => [txt_(T), ['wordGrid', 'front', WORDS, pics, 960, 560, .8, WORDS.map((w, j) => (j < 5 ? null : L[2][j - 5].t0)), T(8)], ['fireworks', 'back', 520, 330, L[2][4].t0, '#FF5E7E', 230], ['fireworks', 'back', 1400, 330, L[2][4].t0 + .3, '#4CC9F0', 230], ['confetti', 'front', L[2][4].t0, T(8), 30]] },
    ]); }

  /* =========================================================================================== FINALE (key up) + OUTRO */
  { const s = secs('fin')[0], L = linesOfSec(s).map(flat);
    place(s, [
      { b: 4, w: 'finale', cam: 'wideIn', punch: 2, A: crew('finale', .74, 'dance'), P: (T) => [['text', 'over', 960, 200, 'BYE BYE, WORDS!', L[0][0].t0, '#FFE14D', 130, -4, 1.9], ['hearts', 'front', 960, 540, T(1.5), 6], ['notes', 'front', 960, 640, T(0), T(4)]] },
      { b: 4, w: 'finale', cam: 'low', punch: 2, A: crew('finale', .74, 'cheer', { jumps: [0, 2, 4] }), P: (T) => [['fireworks', 'back', 520, 330, T(1), '#FF5E7E', 230], ['fireworks', 'back', 1400, 330, T(1.5), '#4CC9F0', 230], ['confetti', 'front', T(0), T(4), 34], ['text', 'over', 960, 220, 'KEEP READING!', T(.3), '#7BE8FF', 120, 3, 1.8]] },
    ]); }
  section('outro', 0, [
    { b: 4, w: 'finale', cam: 'wideIn', A: crewArc('finale', .84, 'wave'), P: (T) => [['hearts', 'front', 960, 430, T(1.5), 7], ['sparkles', 'front', 960, 450, T(2), 8, 760, 36]] },
    { b: 6, w: 'finale', cam: 'wide', A: crewArc('finale', .84, 'wave'), P: (T) => [['text', 'front', 960, 270, 'SEE YOU SOON!', T(.4), '#FFE14D', 120, -3, 3.4], ['hearts', 'front', 960, 430, T(2), 7], ['confetti', 'front', T(2.5), T(6), 24]] },
    { b: 6, w: 'finale', cam: [960, 540, 1.04, 960, 520, 1.0], A: crewArc('finale', .84, 'wave'), P: (T) => [['sparkles', 'front', 960, 450, T(0), 8, 760, 36], ['sparkles', 'front', 960, 450, T(4), 8, 760, 36]] },
  ]);

  window.SB = SB;
})();
