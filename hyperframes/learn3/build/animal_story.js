/* KiddoVerse LEARN #3 "Animal Sounds Dance Party" storyboard - TikTok-speed: a new shot every 1-1.5 s, every picture lands on the sung word.
   Everything is generated from the song data (sections, lines, words) and the animal table.  beat = 0.5 s, bar = 4 beats. */
(function () {
  const SONG = window.SONG, BEAT = 60 / SONG.bpm, BAR = SONG.bar, SB = [], HEX = window.KVW.COLORHEX, AN = SONG.animals;
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
  const ORDER = ['kiko', 'luma', 'bloop', 'rumble', 'gizmo', 'nimbus'], XS = [390, 650, 910, 1170, 1430, 1690];
  const crew = (w, s = .76, mv = 'bob', o = {}) => ORDER.map((c, i) => A(w)(c, XS[i], s, Object.assign({ mv, sing: 1 }, o)));
  const crewArc = (w, s = .82, mv = 'bob', o = {}) => ORDER.map((c, i) => { const x = [380, 650, 900, 1150, 1400, 1670][i], k = [1, .45, 0, 0, .45, 1][i]; return A(w)(c, x, s * (1 - .1 * (1 - k)), Object.assign({ y: FL[w] + 36 * k - 36, mv, sing: 1 }, o)); }).sort((a, b) => a.y - b.y);
  const crewV = (w, mv = 'bob', o = {}) => [['kiko', 740], ['luma', 1180], ['nimbus', 1650]].map(([c, x]) => A(w)(c, x, .66, Object.assign({ y: FL[w] - 80, mv, sing: 1 }, o))).concat([['bloop', 520], ['rumble', 960], ['gizmo', 1400]].map(([c, x]) => A(w)(c, x, .95, Object.assign({ mv, sing: 1 }, o))));
  const M = () => window.__KVM;
  const S_ = (t) => +t.toFixed(4);
  const shake = (...bs) => (g, c) => bs.forEach((b) => { window.__LOG(c.T(b), 'thud'); for (let i = 0; i < 6; i++) c.tl.to(c.punch, { x: (i % 2 ? 1 : -1) * 16 * (1 - i / 6), y: (i % 2 ? -1 : 1) * 12 * (1 - i / 6), duration: .045 }, c.T(b) + i * .045); c.tl.to(c.punch, { x: 0, y: 0, duration: .05 }, c.T(b) + .28); });
  const flat = (l) => l.words.flatMap((w) => w.subs || [w]);
  const linesOfSec = (s) => SONG.lines.filter((l) => l.sec === s.i);
  const PAIRS = [['kiko', 'luma'], ['bloop', 'rumble'], ['gizmo', 'nimbus'], ['luma', 'rumble'], ['kiko', 'gizmo'], ['bloop', 'nimbus'], ['luma', 'nimbus'], ['kiko', 'rumble']];
  const UP = (s) => s.toUpperCase();
  const ban = (T, a, b, title, sub, col) => ['banner', 'over', title, sub, T(a), T(b), col];
  const scan = (dir, from = .4, to = 3.4) => (a, t0, t1, tl) => { const m = M(); for (let t = t0 + from, i = 0; t < t0 + to; t += .6, i++) m.look(a, S_(t), (i % 2 ? -1 : 1) * 12 * dir, -6, .2); m.look(a, S_(t0 + to + .3), 0, 0, .2); };
  const inWin = (list, a, b) => list.filter(([t]) => t >= a - .01 && t < b);

  /* =========================================================================================== INTRO (2 bars) */
  section('intro', 0, [
    { b: 4, w: 'hub', cam: [960, 540, 1, 960, 500, 1.1], dust: 20, A: [],
      P: (T) => [['burst', 'front', 960, 520, T(0), '#FFE14D', 220], ['burst', 'front', 960, 520, T(1), '#FF9BD0', 250], ['burst', 'front', 960, 520, T(2), '#7BE8FF', 330], ['sparkles', 'front', 960, 500, T(2), 12, 460, 50]],
      fx: [(g, c) => window.KVTitle(c.tl, c.t0)] },
    { b: 4, w: 'hills', cam: 'wideIn', flash: .6, A: crew('hills', .8, 'cheer', { jumps: [2] }),
      P: (T) => [['text', 'over', 960, 280, 'ANIMAL PARTY!', T(0), '#FFE14D', 190, -4, 1.6], ['animal', 'back', 'cow', 560, 470, .7, T(.5), T(4), [], { quiet: true }], ['animal', 'back', 'duck', 1360, 470, .7, T(1), T(4), [], { quiet: true }], ['confetti', 'front', T(2), T(4), 30]] },
  ]);

  /* =========================================================================================== THE HOOK: intro, roll call, dance */
  const GRID = [[360, 380], [760, 380], [1160, 380], [1560, 380], [360, 770], [760, 770], [1160, 770], [1560, 770]];
  const rollCall = (W, t0, until, soundIdx) => AN.flatMap((a, i) => {
    const t = W[i].t0, [x, y] = GRID[i];
    return [['orb', 'back', x, y, 140, HEX[a.world.slice(2)], t - .05, until], ['animal', 'front', a.key, x, y, 1.0, t, until, [[t, .42]], { quiet: true, amp: 6 }], ['text', 'over', x, y - 165, UP(a.sound) + '!', t + .02, '#FFFFFF', 84, (i % 2 ? 4 : -4), .6]];
  });
  function hookShots(s, lineIdx, W, opts) {
    const out = [];
    if (lineIdx === 0) {
      out.push({ b: 4, w: opts.w1, cam: 'wideIn', punch: 2, A: crew(opts.w1, .74, 'dance'), P: (T) => [['text', 'over', 960, 270, 'ANIMALS!', W[0][0].t0, '#FFE14D', 180, -4, 1.6]].concat(AN.slice(0, 4).map((a, i) => ['animal', 'front', a.key, 330 + i * 420, 450, .72, T(.4 + i * .5), T(4), [], { quiet: true }])) });
      out.push({ b: 4, w: opts.w1, cam: 'low', punch: 2, A: crew(opts.w1, .74, 'cheer', { jumps: [0, 2] }), P: (T) => AN.slice(4).map((a, i) => ['animal', 'front', a.key, 330 + i * 420, 450, .72, T(i * .5), T(4), [], { quiet: true }]).concat([['sparkles', 'front', 960, 520, T(1), 8, 700, 40]]) });
    } else if (lineIdx === 1) {
      out.push({ b: 8, w: opts.w2, cam: [960, 540, 1, 960, 520, 1.1], punch: 1, A: [], P: (T) => rollCall(W[1], T(0), s.t0 + s.bars * 4 * BEAT + 2).concat([['confetti', 'front', T(6), T(8), 24]]) });
    } else {
      out.push({ b: 4, w: opts.w3, cam: 'wideIn', punch: 2, A: crewArc(opts.w3, .82, 'dance'), P: (T) => [['text', 'over', 960, 280, 'SING!', W[2][2].t0, '#FFE14D', 190, -4, 1.0], ['text', 'over', 960, 280, 'DANCE!', W[2][4].t0, '#4CC9F0', 190, 4, 1.0], ['notes', 'front', 960, 520, T(0), T(4)]] });
      out.push({ b: 4, w: opts.w3, cam: 'low', punch: 1, A: crewV(opts.w3, 'cheer', { jumps: [0, 1, 2, 3] }), P: (T) => [['confetti', 'front', T(0), T(4), 34], ['hearts', 'front', 960, 520, T(1.5), 6], ['fireworks', 'back', 520, 340, T(1), HEX.red, 220], ['fireworks', 'back', 1400, 340, T(1.5), HEX.blue, 220]] });
    }
    return out;
  }
  const hookSec = secs('hook')[0]; { const L = linesOfSec(hookSec).map(flat); place(hookSec, [].concat(hookShots(hookSec, 0, L, { w1: 'hills' }), hookShots(hookSec, 1, L, { w2: 'numland' }), hookShots(hookSec, 2, L, { w3: 'hub' }))); }

  /* =========================================================================================== THE EIGHT ANIMAL STOPS (6 bars = 24 beats, ~10 shots) */
  secs('stop').forEach((s) => {
    const ai = s.meta.i, an = AN[ai], key = an.key, snd = an.sound, SND = UP(snd), world = an.world, pair = PAIRS[ai], L = linesOfSec(s).map(flat);
    const tAsk = L[0][0].t0, tQ = L[0][2].t0, tThe = L[0][3].t0, tName = L[0][4].t0;
    const talkAll = [[L[1][0].t0, .85], [L[1][1].t0, .85], [L[1][2].t0, .85], [L[2][3].t0, .85], [L[2][4].t0, .85]];
    const side = (w, o1 = {}, o2 = {}) => [A(w)(pair[0], 250, .95, Object.assign({ mv: 'bob', sing: 1 }, o1)), A(w)(pair[1], 1670, .95, Object.assign({ f: 1, mv: 'bob', sing: 1 }, o2))];
    const shots = [], tb = (b) => s.t0 + b * BEAT;
    const sh = (len, spec) => shots.push(Object.assign({ b: len, w: world }, spec));
    /* line 1: "Who says moo?"  ->  kids: "The cow!" */
    sh(4, { cam: 'wideIn', flash: ai === 0 || ai === 4 ? .9 : 0, A: side(world, { fn: [scan(1)] }, { fn: [scan(-1)] }), P: (T) => [['text', 'over', 960, 250, `WHO SAYS ${SND}?`, tAsk, '#FFFFFF', SND.length > 4 ? 120 : 150, -3, 1.9], ['shadowAnimal', 'front', key, 960, 610, 2.2, T(.9), T(4)], ['orb', 'back', 1500, 330, 90, HEX[world.slice(2)], T(0), T(4)]] });
    sh(2, { cam: [960, 540, 1, 960, 540, 1.18], punch: 2, A: side(world, { mv: 'cheer' }, { mv: 'cheer' }), P: (T) => [['animal', 'front', key, 960, 600, 1.9, tThe, tb(6), [], {}], ['chip', 'over', 960, 880, 'THE ' + UP(an.name) + '!', HEX[world.slice(2)], tName, 90], ['burst', 'front', 960, 600, tName, HEX[world.slice(2)], 260]] });
    sh(2, { cam: [960, 560, 1.0, 960, 540, 1.3], A: side(world, { mv: 'cheer', jumps: [1] }, { mv: 'cheer', jumps: [1] }), P: (T) => [['animal', 'front', key, 960, 600, 2.0, tb(6) - .02, tb(8), [], { rot0: 0, quiet: true }], ['sparkles', 'front', 960, 520, T(.3), 8, 600, 40]] });
    /* line 2: "moo, moo, (kids) moo!" - three close-ups, the mouth opens on every sound */
    sh(2, { cam: [960, 560, 1.0, 960, 520, 1.12], punch: 2, A: side(world), P: (T) => [['animal', 'front', key, 960, 580, 2.4, tb(8) - .3, tb(10), inWin(talkAll, tb(8), tb(10)), { quiet: true, amp: 0 }], ['text', 'over', 960, 220, SND + '!', L[1][0].t0, '#FFFFFF', 210, -4, .95]] });
    sh(2, { cam: 'panR', A: side(world, { mv: 'cheer' }, { mv: 'cheer' }), P: (T) => [['animal', 'front', key, 700, 600, 2.1, tb(10) - .3, tb(12), inWin(talkAll, tb(10), tb(12)), { quiet: true, amp: 0 }], ['text', 'over', 1340, 380, SND + '!', L[1][1].t0, '#FFE14D', 200, 5, .95], ['notes', 'front', 1340, 560, T(0), T(2)]] });
    sh(2, { cam: 'low', punch: 2, A: side(world, { mv: 'cheer', jumps: [0] }, { mv: 'cheer', jumps: [0] }), P: (T) => [['animal', 'front', key, 960, 600, 2.0, tb(12) - .3, tb(14), inWin(talkAll, tb(12), tb(14)), { quiet: true, amp: 0 }], ['text', 'over', 960, 220, SND + '!', L[1][2].t0, '#FF9BD0', 220, -3, .95], ['confetti', 'front', T(0), T(2), 26], ['burst', 'front', 960, 600, L[1][2].t0, '#FF9BD0', 280]] });
    sh(2, { cam: [960, 540, 1.08, 960, 540, 1.0], A: side(world, { mv: 'dance' }, { mv: 'dance' }), P: (T) => [['animal', 'front', key, 960, 600, 1.6, tb(14) - .2, tb(16), [], { quiet: true, amp: 18 }], ['notes', 'front', 960, 380, T(0), T(2)], ['sparkles', 'front', 960, 480, T(.5), 6, 560, 36]] });
    /* line 3: "The cow says moo!"  (kids) moo! */
    sh(3, { cam: 'wideIn', punch: 2, A: side(world, { mv: 'dance' }, { mv: 'dance' }), P: (T) => [['animal', 'front', key, 960, 600, 1.55, tb(16) - .2, tb(19), [], { quiet: true, amp: 12 }], ['chip', 'over', 960, 880, `THE ${UP(an.name)} SAYS...`, HEX[world.slice(2)], L[2][0].t0, 76]] });
    sh(3, { cam: [960, 560, 1.0, 960, 530, 1.22], A: side(world, { mv: 'cheer' }, { mv: 'cheer' }), P: (T) => [['animal', 'front', key, 960, 590, 2.3, tb(19) - .2, tb(22), inWin(talkAll, tb(19), tb(22)), { quiet: true, amp: 0 }], ['text', 'over', 960, 215, SND + '!', L[2][3].t0, '#FFFFFF', 230, -4, 1.3], ['burst', 'front', 960, 590, L[2][3].t0, '#FFFFFF', 300]] });
    sh(2, { cam: 'low', punch: 2, A: side(world, { mv: 'cheer', jumps: [0, 1] }, { mv: 'cheer', jumps: [0, 1] }), P: (T) => [['animal', 'front', key, 960, 600, 2.0, tb(22) - .2, s.t1, inWin(talkAll, tb(22), s.t1), { quiet: true, amp: 8 }], ['text', 'over', 960, 215, SND + '!', L[2][4].t0, '#FF9BD0', 230, 3, 1.2], ['confetti', 'front', T(0), T(2), 34], ['fireworks', 'back', 520, 340, T(.2), HEX[world.slice(2)], 230], ['fireworks', 'back', 1400, 330, T(.6), '#FF9BD0', 220]] });
    place(s, shots);
  });

  /* =========================================================================================== MID HOOK (roll call again + dance) */
  { const s = secs('midhook')[0], L = linesOfSec(s).map(flat), rc = (t0, until) => AN.flatMap((a, i) => {
      const t = L[0][i].t0, x = 235 + i * 207, y = 560 + (i % 2 ? -85 : 85); return [['animal', 'front', a.key, x, y, .88, t, until, [[t, .42]], { quiet: true, amp: 6 }], ['text', 'over', x, y - 150, UP(a.sound) + '!', t + .02, '#FFFFFF', 70, (i % 2 ? 4 : -4), .6]]; });
    place(s, [{ b: 8, w: 'cloud', cam: 'panL', punch: 1, A: [], P: (T) => rc(T(0), s.t0 + 8 * BEAT + 1).concat([['rainbow', 'back', 960, 700, 640, 70, ['#FF3B4E', '#FF9F1C', '#FFD60A', '#2FCB5A', '#2F8BFF', '#9B5CFF'], ['#FF3B4E', '#FF9F1C', '#FFD60A', '#2FCB5A', '#2F8BFF', '#9B5CFF'].map(() => 'pre'), { t0: T(0), ghost: false }]]) },
      { b: 4, w: 'hills', cam: 'wideIn', punch: 2, A: crewArc('hills', .82, 'dance'), P: (T) => [['text', 'over', 960, 280, 'SING!', L[1][2].t0, '#FFE14D', 190, -4, 1.0], ['text', 'over', 960, 280, 'DANCE!', L[1][4].t0, '#4CC9F0', 190, 4, 1.0], ['notes', 'front', 960, 520, T(0), T(4)]] },
      { b: 4, w: 'hills', cam: 'low', punch: 1, A: crewV('hills', 'cheer', { jumps: [0, 1, 2, 3] }), P: (T) => [['confetti', 'front', T(0), T(4), 34], ['hearts', 'front', 960, 520, T(1.5), 6]] }]); }

  /* =========================================================================================== DANCE BREAK: move like the animals */
  { const s = secs('dance')[0], L = linesOfSec(s).map(flat), moves = [['duck', 'FLAP!', 'c_blue'], ['cat', 'JUMP!', 'c_yellow'], ['lion', 'STOMP!', 'c_orange']], shots = [];
    moves.forEach(([key, word, world], i) => {
      const W = L[i], tb = (b) => s.t0 + (i * 8 + b) * BEAT, hex = HEX[world.slice(2)];
      shots.push({ b: 4, w: world, cam: i === 2 ? [960, 560, 1, 960, 530, 1.15] : 'wideIn', punch: 2, A: crew(world, .7, 'dance'), P: (T) => [['animal', 'back', key, 960, 420, 1.25, tb(0), tb(8), [], { quiet: true, amp: 22 }], ['text', 'over', 480, 250, word, W[0].t0, '#FFFFFF', 150, -5, .9], ['text', 'over', 1440, 250, word, W[1].t0, '#FFE14D', 150, 5, .9]] });
      shots.push({ b: 4, w: world, cam: 'low', punch: 1, A: crewV(world, 'cheer', { jumps: [0, 2] }), fx: i === 2 ? [shake(2)] : [],
        P: (T) => [['animal', 'back', key, 960, 400, 1.4, tb(4), s.t0 + (i * 8 + 8) * BEAT, i === 2 ? [[W[W.length - 1].t0, 1.0]] : [], { quiet: true, amp: 16 }], ['confetti', 'front', T(0), T(4), 28]].concat(i === 2 ? [['text', 'over', 960, 220, 'ROAR!', W[W.length - 1].t0, '#FF9BD0', 250, -3, 1.3], ['burst', 'front', 960, 420, W[W.length - 1].t0, hex, 320]] : [['hearts', 'front', 960, 480, T(1.5), 5]]) });
    });
    place(s, shots); }

  /* =========================================================================================== GAME: who says it? */
  secs('game').forEach((s, k) => {
    const cards = s.meta.cards, correct = cards.indexOf(s.meta.animal), who = [['kiko', 'luma'], ['bloop', 'gizmo'], ['rumble', 'nimbus']][k], an = AN.find((a) => a.key === s.meta.animal), tReveal = s.t0 + 12 * BEAT;
    place(s, [{ b: 16, w: 'disco', cam: [960, 560, 1.0, 960, 540, 1.06], punch: 1,
      A: [A('disco')(who[0], 260, .95, { mv: 'bob', sing: 1, fn: [scan(1, 2, 5.6)] }), A('disco')(who[1], 1660, .95, { f: 1, mv: 'bob', sing: 1, fn: [scan(-1, 2, 5.6)] })],
      P: (T) => [k === 0 ? ban(T, 0, 3, 'WHO SAYS IT?', 'ANIMAL GAME', '#FF5E7E') : ['text', 'over', 960, 195, `WHO SAYS ${UP(an.sound)}?`, T(0), '#FFFFFF', 86, -2, 3.6], ['animalCards', 'front', cards, 960, 560, T(1.2), tReveal, correct, { until: s.t1 }], ['countdown', 'front', 960, 372, T(4.2), 3, 1.3, tReveal - .2], ['text', 'over', 960, 272, 'THINK...', T(4.6), '#FFFFFF', 66, 0, 3.4]] }]);
  });

  /* =========================================================================================== FINALE (key up) + OUTRO */
  { const s = secs('fin')[0], L = linesOfSec(s).map(flat), bs = [];
    bs.push({ b: 4, w: 'finale', cam: 'wideIn', punch: 2, A: crew('finale', .74, 'dance'), P: (T) => [['text', 'over', 960, 270, 'ANIMALS!', L[0][0].t0, '#FFE14D', 190, -4, 1.6]].concat(AN.slice(0, 4).map((a, i) => ['animal', 'front', a.key, 330 + i * 420, 450, .72, T(.4 + i * .5), T(4), [], { quiet: true }])) });
    bs.push({ b: 4, w: 'finale', cam: 'low', punch: 2, A: crew('finale', .74, 'cheer', { jumps: [0, 2] }), P: (T) => AN.slice(4).map((a, i) => ['animal', 'front', a.key, 330 + i * 420, 450, .72, T(i * .5), T(4), [], { quiet: true }]).concat([['fireworks', 'back', 520, 330, T(1), HEX.red, 230], ['fireworks', 'back', 1400, 330, T(1.5), HEX.blue, 230]]) });
    bs.push({ b: 8, w: 'cloud', cam: [960, 540, 1, 960, 520, 1.1], punch: 1, A: [], P: (T) => rollCall(L[1], T(0), s.t0 + 16 * BEAT).concat([['confetti', 'front', T(0), T(8), 40]]) });
    bs.push({ b: 8, w: 'finale', cam: 'low', punch: 1, A: crewV('finale', 'cheer', { jumps: [0, 2, 4, 6] }), P: (T) => [['text', 'over', 960, 250, 'SING & DANCE!', L[2][2].t0, '#FFE14D', 150, -3, 2.4], ['confetti', 'front', T(0), T(8), 44], ['fireworks', 'back', 520, 360, T(2), HEX.green, 240], ['fireworks', 'back', 1400, 340, T(2.6), HEX.purple, 230], ['hearts', 'front', 960, 560, T(4), 7]] });
    bs.push({ b: 8, w: 'finale', cam: 'wideIn', punch: 1, A: crewArc('finale', .84, 'wave'), P: (T) => AN.map((a, i) => ['animal', 'front', a.key, 235 + i * 207, 420 + (i % 2 ? 45 : -45), .8, T(.2 + i * .2), s.t1, [], { quiet: true, amp: 8 }]).concat([['text', 'over', 960, 250, 'BYE BYE!', L[3][0].t0, '#FFE14D', 190, -4, 1.4], ['hearts', 'front', 960, 480, T(3), 7], ['confetti', 'front', T(4), T(8), 30]]) });
    place(s, bs); }
  section('outro', 0, [
    { b: 4, w: 'finale', cam: 'wideIn', A: crewArc('finale', .84, 'wave'), P: (T) => [['hearts', 'front', 960, 430, T(1.5), 7], ['sparkles', 'front', 960, 450, T(2), 8, 760, 36]] },
    { b: 8, w: 'finale', cam: 'wide', A: crewArc('finale', .84, 'wave'), P: (T) => [['text', 'front', 960, 270, 'SEE YOU SOON!', T(.4), '#FFE14D', 120, -3, 3.4], ['hearts', 'front', 960, 430, T(2), 7], ['confetti', 'front', T(2.5), T(6), 24]] },
    { b: 8, w: 'finale', cam: [960, 540, 1.04, 960, 520, 1.0], A: crewArc('finale', .84, 'wave'), P: (T) => [['sparkles', 'front', 960, 450, T(0), 8, 760, 36], ['sparkles', 'front', 960, 450, T(4), 8, 760, 36]] },
  ]);

  window.SB = SB;
})();
