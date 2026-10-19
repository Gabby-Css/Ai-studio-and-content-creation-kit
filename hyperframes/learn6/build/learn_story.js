/* KiddoVerse LEARN #1 storyboard - every shot is generated from the song data (units: numbers, letters, words, game rounds)
   and timed to the sung syllables.  beat = 0.5 s, bar = 4 beats. */
(function () {
  const SONG = window.SONG, BEAT = 60 / SONG.bpm, SB = [];
  const FL = { hub: 905, hills: 905, dino: 910, cloud: 915, workshop: 925, disco: 930, finale: 905, space: 1000, numland: 905, abc: 905 };
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
  const RIDERS = ['kiko', 'luma', 'bloop'];
  const M = () => window.__KVM;
  const PAL = ['#FF5E7E', '#FFD23F', '#4CC9F0', '#B06BFF', '#4CD964', '#FF9F43'];
  const shake = (...bs) => (g, c) => bs.forEach((b) => { window.__LOG(c.T(b), 'thud'); for (let i = 0; i < 6; i++) c.tl.to(c.punch, { x: (i % 2 ? 1 : -1) * 16 * (1 - i / 6), y: (i % 2 ? -1 : 1) * 12 * (1 - i / 6), duration: .045 }, c.T(b) + i * .045); c.tl.to(c.punch, { x: 0, y: 0, duration: .05 }, c.T(b) + .28); });
  const arc = (x0, y0, x1, y1, dip, t0, t1, tilt = 1) => (a, _a, _b, tl) => { const N = 14; for (let i = 0; i < N; i++) { const k0 = i / N, k1 = (i + 1) / N, X = (k) => x0 + (x1 - x0) * k, Y = (k) => y0 + (y1 - y0) * k + dip * Math.sin(Math.PI * k);
    tl.fromTo(a.g, { x: X(k0), y: Y(k0) }, { x: X(k1), y: Y(k1), duration: (t1 - t0) / N, ease: 'none' }, t0 + (t1 - t0) * k0); tl.to(a.sq, { rotation: tilt * Math.atan2(Y(k1) - Y(k0), X(k1) - X(k0)) * 180 / Math.PI * .6, duration: (t1 - t0) / N, ease: 'none' }, t0 + (t1 - t0) * k0); } };

  /* ---------- song-data helpers: exact sung times */
  const flat = (l) => l.words.flatMap((w) => w.subs || [w]);
  const lines = (kind, pred) => SONG.lines.filter((l) => l.kind === kind && (!pred || pred(l.meta || {})));
  const lineOf = (kind, pred) => lines(kind, pred)[0];
  const wt = (l, text, nth = 0) => { const w = flat(l).filter((x) => x.text.toLowerCase() === text.toLowerCase())[nth]; if (!w) throw new Error('word not found: ' + text); return w.t0; };
  const NUMW = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  const numTimes = (l) => flat(l).filter((x) => NUMW.includes(x.text.toLowerCase())).map((x) => x.t0);
  const PAIRS = [['kiko', 'luma'], ['bloop', 'rumble'], ['gizmo', 'nimbus'], ['kiko', 'bloop'], ['luma', 'gizmo'], ['rumble', 'nimbus']];
  const NUMBERS = [['star', '#FFD23F'], ['ball', '#FF5E7E'], ['apple', '#FF4D5E'], ['fish', '#4CC9F0'], ['flower', '#FF6B9B'], ['bee', '#FFD23F'], ['heart', '#FF5E7E'], ['cookie', '#FF9F43'], ['duck', '#FFD23F'], ['balloon', '#B06BFF']];
  const NCOL = ['#FF5E7E', '#FF9F43', '#FFD23F', '#4CD964', '#4CC9F0', '#6C7BFF', '#B06BFF', '#FF6B9B', '#4CD964', '#FF9F43'];
  const NWORD = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN'];
  const ban = (T, a, b, title, sub, col) => ['banner', 'over', title, sub, T(a), T(b), col];

  /* =========================================================================================== INTRO (4 bars) */
  section('intro', 0, [
    { b: 4, w: 'hub', cam: [960, 540, 1, 960, 500, 1.1], dust: 20, A: [],
      P: (T) => [['burst', 'front', 960, 520, T(0), '#FFE14D', 220], ['burst', 'front', 960, 520, T(1), '#FF9BD0', 250], ['burst', 'front', 960, 520, T(2), '#7BE8FF', 330], ['sparkles', 'front', 960, 500, T(2), 12, 460, 50], ['star', 'back', 1560, 220, 64, '#FFD23F', T(0), true]],
      fx: [(g, c) => window.KVTitle(c.tl, c.t0)] },
    { b: 4, w: 'hub', cam: 'wideIn', flash: .6, A: [A('hub')('kiko', 640, 1.08, { mv: 'wave' }), A('hub')('bloop', 960, .8, { mv: 'cheer' }), A('hub')('zoom', 1450, .78, { f: 1, mv: 'bob' })],
      P: (T) => [['chip', 'over', 960, 250, 'LEARNING EXPRESS', '#4CC9F0', T(1), 74]] },
    { b: 2, w: 'hub', cam: { face: 0, z: [1.9, 2.1] }, A: [A('hub')('luma', 960, 1.25)] },
    { b: 2, w: 'hub', cam: 'wide', A: crew('hub', .8, 'cheer', { jumps: [0], sing: 0 }), P: (T) => [['sparkles', 'front', 960, 500, T(0), 8, 700, 40]] },
    { b: 1, w: 'hub', cam: { face: 0, z: [1.7, 1.85] }, A: [A('hub')('kiko', 960, 1.2, { mv: 'cheer' })], P: (T) => [['badge', 'over', 1540, 330, 3, T(0), '#FF5E7E', 130]] },
    { b: 1, w: 'hub', cam: { face: 0, z: [1.7, 1.85] }, A: [A('hub')('luma', 960, 1.2, { mv: 'cheer' })], P: (T) => [['badge', 'over', 1540, 330, 2, T(0), '#FFB938', 130]] },
    { b: 1, w: 'hub', cam: { face: 0, z: [1.7, 1.85] }, A: [A('hub')('gizmo', 960, 1.25, { mv: 'cheer' })], P: (T) => [['badge', 'over', 1540, 330, 1, T(0), '#4CD964', 130]] },
    { b: 1, w: 'hub', cam: 'wide', A: [A('hub')('zoom', 700, 1.0, { mv: 'zoomer', go: { x: 2500, d: .5, ease: 'power3.in' } })], flash: .9, P: (T) => [['speed', 'front', T(0), T(1), 1, 14], ['text', 'over', 960, 520, 'ZOOM!', T(0), '#FFE14D', 280, -6, .45]] },
  ]);

  /* =========================================================================================== THEME CHORUS (4 lines x 2 bars) */
  function chorus(kind, nth, V) {
    const a = A(V.A), s = secs(kind)[nth], l2 = lines(kind).filter((l) => l.t0 >= s.t0 && l.t0 < s.t1)[1], flyY = V.A === 'space' ? 600 : 420;
    const tA = wt(l2, 'A'), tB = wt(l2, 'B'), tC = wt(l2, 'C');
    place(s, [
      { b: 4, w: V.A, cam: V.camA || 'wide', flash: V.flash || 0, punch: 2, A: [a('zoom', 0, .85, { y: flyY, mv: 'zoomer', pass: RIDERS, go: { x: 1250, d: 2, ease: 'power1.out' } })],
        P: (T, t1) => [['speed', 'front', T(0), t1, 1, 14], ['text', 'front', 620, 330, 'ZOOM!', T(0), '#FFE14D', 160, -8, .45], ['text', 'front', 1250, 420, 'ZOOM!', T(1), '#7BE8FF', 160, 7, .45], ['text', 'front', 960, 250, 'KIDDOVERSE!', T(2), '#FFFFFF', 140, 0, 1.3], ['burst', 'front', 960, 300, T(2), '#FFE14D', 260]] },
      { b: 4, w: V.A, cam: 'wideIn', A: [a('zoom', 960, 1.12, { y: flyY + 120, mv: 'zoomer', pass: RIDERS })], P: (T, t1) => [['notes', 'front', 960, 380, T(0), t1], ['sparkles', 'front', 960, 420, T(2), 6, 420, 40]] },
      /* "Count and sing and say, A B C hooray!" */
      { b: 8, w: V.D, cam: V.camC || [960, 560, 1, 960, 520, 1.1], punch: 1, A: crew(V.D, .8, 'dance'),
        P: (T, t1) => [['tile', 'front', 560, 400, 'A', tA, '#FF5E7E', tA + 1.3], ['tile', 'front', 960, 400, 'B', tB, '#4CC9F0', tB + 1.2], ['tile', 'front', 1360, 400, 'C', tC, '#FFD23F', tC + 1.1], ['confetti', 'front', tC + .8, T(7), 30], ['notes', 'front', 960, 300, T(0), t1]] },
      /* "Numbers, letters, words to" */
      { b: 4, w: V.A === 'finale' ? 'finale' : 'space', cam: 'wide', A: [A('space')('zoom', -200, .8, { y: 620, mv: 'zoomer', pass: RIDERS })],
        P: (T) => [['chip', 'over', 560, 250, '1  2  3', '#FF5E7E', T(.3), 84], ['chip', 'over', 960, 250, 'A  B  C', '#4CC9F0', T(1.3), 84], ['chip', 'over', 1380, 250, 'UP  GO  NO', '#4CD964', T(2.3), 84]],
        fx: [(g, c) => { const a2 = c.acts[0]; arc(-250, 780, 2150, 780, -300, c.t0, c.t1)(a2, 0, 0, c.tl); c.P.sparkles(c.front, 960, 420, c.T(1), 8, 700, 40); }] },
      /* "know, learning more each day!" */
      { b: 4, w: V.E, cam: 'wideIn', A: crewArc(V.E, .84, 'wave'), P: (T) => [['text', 'front', 960, 270, 'LEARN!', T(2.4), '#FFE14D', 130, -4, 1.4], ['hearts', 'front', 960, 430, T(2), 7], ['sparkles', 'front', 960, 450, T(2.5), 8, 760, 36]] },
      /* "Zoom, zoom, Kiddoverse!" */
      { b: 4, w: V.D, cam: 'low', punch: 1, A: crewV(V.D, 'cheer', { jumps: [0, 2] }), P: (T) => [['fireworks', 'back', 520, 330, T(2), '#FFE14D', 240], ['fireworks', 'back', 1400, 300, T(2.2), '#FF9BD0', 220], ['confetti', 'front', T(2), T(4), 24]] },
      /* "Let's learn" */
      { b: 2, w: V.D, cam: { face: 0, z: [1.5, 1.7], dx: 140 }, A: [A(V.D)('kiko', 760, 1.0, { mv: 'cheer', sing: 1 }), A(V.D)('luma', 1100, 1.0, { mv: 'cheer', sing: 1 })] },
      /* "and play!" -> bus blasts toward camera */
      { b: 2, w: V.A, cam: 'wide', A: [a('zoom', 960, .5, { y: flyY + 180, mv: 'zoomer', fn: [(a2, t0, t1, tl) => tl.fromTo(a2.g, { scaleX: .45, scaleY: .45 }, { scaleX: 2.3, scaleY: 2.3, duration: t1 - t0, ease: 'power2.in' }, t0)] })], P: (T, t1) => [['speed', 'front', T(0), t1, 1, 18]] },
    ]);
  }
  chorus('chorus', 0, { A: 'space', D: 'hub', E: 'hub' });
  chorus('chorus', 1, { A: 'hills', D: 'hills', E: 'hills', camA: 'panR', flash: .9 });
  chorus('fin', 0, { A: 'space', D: 'disco', E: 'cloud', camA: 'panL', flash: .9 });
  chorus('fin2', 0, { A: 'finale', D: 'finale', E: 'finale', flash: .9 });

  /* =========================================================================================== NUMBER MEADOW */
  section('numintro', 0, [
    { b: 4, w: 'numland', cam: [900, 540, 1, 980, 540, 1.08], flash: .9, A: [A('numland')('zoom', -300, .72, { mv: 'zoomer', go: { x: 560, d: 1.6, ease: 'power2.out' } }), A('numland')('kiko', 1260, 1.0, { mv: 'wave', sing: 1 }), A('numland')('luma', 1520, 1.0, { sing: 1 })],
      P: (T) => [ban(T, 0, 4, 'NUMBER MEADOW', 'LET\'S COUNT TO TEN', '#FF9F43')] },
    { b: 4, w: 'numland', cam: 'wideIn', A: [A('numland')('kiko', 700, 1.05, { mv: 'cheer', sing: 1 }), A('numland')('bloop', 1000, .85, { mv: 'cheer', sing: 1 }), A('numland')('luma', 1260, 1.05, { mv: 'cheer', sing: 1 })],
      P: (T) => [['text', 'over', 960, 340, '1 2 3 ...', T(1.6), '#FFE14D', 150, -4, 1.7], ['sparkles', 'front', 960, 420, T(3), 8, 760, 36]] },
  ]);
  secs('num').forEach((s) => {
    const n = s.meta.n, [item, ic] = NUMBERS[n - 1], pr = PAIRS[(n - 1) % 6], lc = lineOf('num', (m) => m.n === n && m.part === 'count'), times = numTimes(lc), tEnd = s.t1;
    const pair = (hop) => [A('numland')(pr[0], 250, .98, { mv: hop ? 'cheer' : 'bob', sing: 1 }), A('numland')(pr[1], 1670, .98, { f: 1, mv: hop ? 'cheer' : 'bob', sing: 1 })];
    const SPC = { 5: 225, 7: 282, 8: 282, 9: 228, 10: 228 };      // tighter rows keep the counted objects off the side characters
    place(s, [
      { b: 4, w: 'numland', cam: [940, 540, 1.0, 980, 530, 1.06], punch: 2, A: pair(false),
        P: (T) => [['numeral', 'front', 960, 400, n, T(0), NCOL[n - 1], T(4)], ['chip', 'front', 960, 640, NWORD[n - 1], NCOL[n - 1], T(.6), 92], ['burst', 'front', 960, 400, T(0), NCOL[n - 1], 230]] },
      { b: (s.bars - 1) * 4, w: 'numland', cam: 'wide', A: pair(true),
        P: (T) => [['numeral', 'front', 960, 250, n, s.t0 + BEAT * 4 + .05, NCOL[n - 1], tEnd, { size: 190 }], ['counter', 'front', item, n, 960, n <= 5 ? 610 : 655, times, Object.assign({ until: tEnd }, SPC[n] ? { spacing: SPC[n] } : {})]] },
    ]);
  });
  section('numrev', 0, [
    { b: 11, w: 'numland', cam: [960, 560, 1, 960, 520, 1.08], punch: 1, A: crew('numland', .74, 'dance'),
      P: (T, t1) => { const l = lineOf('numrev'); return [['numRow', 'front', 960, 330, numTimes(l), { t0: T(0), until: T(11) }], ['notes', 'back', 960, 640, T(0), t1, .55]]; } },
    { b: 5, w: 'numland', cam: 'low', punch: 1, A: crewV('numland', 'cheer', { jumps: [0, 2] }), P: (T) => [['text', 'over', 960, 330, 'HOORAY!', T(.5), '#FFE14D', 190, -5, 1.8], ['confetti', 'front', T(.4), T(4), 34], ['fireworks', 'back', 520, 360, T(1), '#FFE14D', 240], ['fireworks', 'back', 1400, 340, T(1.3), '#FF9BD0', 220]] },
  ]);

  /* =========================================================================================== ALPHABET GARDEN */
  section('abcintro', 0, [
    { b: 4, w: 'abc', cam: [900, 540, 1, 980, 540, 1.08], flash: .9, A: [A('abc')('zoom', -300, .72, { mv: 'zoomer', go: { x: 560, d: 1.6, ease: 'power2.out' } }), A('abc')('luma', 1260, 1.0, { mv: 'wave', sing: 1 }), A('abc')('nimbus', 1520, 1.0, { sing: 1 })],
      P: (T) => [ban(T, 0, 4, 'ALPHABET GARDEN', 'LET\'S LEARN THE ABCs', '#B06BFF')] },
    { b: 4, w: 'abc', cam: 'wideIn', A: [A('abc')('luma', 560, 1.05, { mv: 'cheer', sing: 1 }), A('abc')('bloop', 1360, .9, { mv: 'cheer', sing: 1, f: 1 })],
      P: (T) => [['chip', 'over', 560, 300, 'LETTER', '#FF5E7E', T(0), 88], ['chip', 'over', 960, 300, 'SOUND', '#4CC9F0', T(2), 88], ['chip', 'over', 1380, 300, 'WORD', '#4CD964', T(3), 88], ['sparkles', 'front', 960, 420, T(3), 8, 760, 36]] },
  ]);
  secs('abc').forEach((s, gi) => {
    const L = lines('abc', (m) => true).filter((l) => l.t0 >= s.t0 && l.t0 < s.t1);
    place(s, L.map((ln, j) => {
      const ch = ln.meta.ch, word = ln.meta.word, idx = ch.charCodeAt(0) - 65, who = ORDER[idx % 6], left = idx % 2 === 0, t0 = ln.t0, base = s.t0 + j * 6 * BEAT, tEnd = base + 6 * BEAT;
      const tTile = base, tSound = flat(ln)[1].t0, tWord = flat(ln)[2].t0;
      const charX = left ? 1580 : 340, tileX = left ? 470 : 1450, bubX = left ? 1320 : 600;
      return { b: 6, w: 'abc', cam: j % 2 ? 'wideIn' : [960, 540, 1, 940, 530, 1.07], punch: 1,
        A: [A('abc')(who, charX, 1.12, { f: left ? 1 : 0, mv: 'bob', sing: 1 })],
        P: () => [['tile', 'front', tileX, 470, ch, tTile, PAL[idx % 6], tEnd], ['bubble', 'front', bubX, 300, flat(ln)[1].disp, tSound, PAL[(idx + 2) % 6], tEnd, { side: left ? 1 : -1, size: 96 }],
          ['obj', 'front', word.replace('-', ''), 960, 560, 1.3, tWord, { until: tEnd }], ['wordLabel', 'front', 960, 790, word.charAt(0).toUpperCase() + word.slice(1), tWord + .15, tEnd, { size: 118, end: ch === 'X' }], ['sparkles', 'front', 960, 520, tWord + .3, 5, 300, 30]] };
    }));
  });
  /* the objects are keyed by name: normalise the few whose drawing key differs */
  section('abcsong', 0, [
    { b: 32, w: 'abc', cam: [960, 560, 1, 960, 520, 1.06], punch: 1, A: crew('abc', .68, 'dance', { y: 925 }),
      P: (T, t1) => { const t = {}; lines('abcsong', (m) => m.li < 4).forEach((l) => flat(l).forEach((w) => { if (/^[A-Z]$/.test(w.text) && !(w.text in t)) t[w.text] = w.t0; })); return [['alphaGrid', 'front', 960, 353, t, { t0: T(0), until: T(32), k: .85 }], ['notes', 'back', 960, 720, T(0), T(32), .5]]; } },
    { b: 8, w: 'abc', cam: 'low', punch: 1, A: crewV('abc', 'cheer', { jumps: [0, 2, 4] }), P: (T) => [['text', 'over', 960, 300, 'I KNOW MY ABCs!', T(2.4), '#FFE14D', 120, -3, 4.8], ['confetti', 'front', T(.5), T(7), 40], ['fireworks', 'back', 520, 340, T(2), '#FFE14D', 240], ['fireworks', 'back', 1400, 320, T(2.6), '#FF9BD0', 220], ['hearts', 'front', 960, 560, T(5), 7]] },
  ]);

  /* =========================================================================================== BRAIN BREAK */
  (function () {
    const s = secs('dance')[0], d = A('disco'), DL = lines('dance'), D = (i) => DL[i];
    const tx = (l, text, nth, label, x, y, col, sz = 150, rot = 0) => ['text', 'front', x, y, label, wt(l, text, nth), col, sz, rot, .5];
    place(s, [
      { b: 4, w: 'disco', cam: { face: 0, z: [1.35, 1.5] }, A: [d('kiko', 960, 1.2, { mv: 'cheer', sing: 0 })], P: (T) => [ban(T, 0, 4, 'BRAIN BREAK', 'MOVE & LEARN', '#4CD964'), ['sparkles', 'front', 960, 420, T(1), 8, 700, 40]] },
      { b: 8, w: 'disco', cam: [960, 560, 1, 960, 520, 1.08], punch: 1, A: crew('disco', .78, 'dance'),
        P: () => { const l = D(0); return [tx(l, 'clap', 0, 'CLAP!', 520, 330, '#FF9F43'), tx(l, 'clap', 1, 'CLAP!', 1400, 330, '#FFE14D'), ['chip', 'over', 560, 200, 'A', '#FF5E7E', wt(l, 'A'), 90], ['chip', 'over', 760, 200, 'B', '#4CC9F0', wt(l, 'B'), 90], ['chip', 'over', 960, 200, 'C', '#FFD23F', wt(l, 'C'), 90],
          tx(l, 'stomp', 0, 'STOMP!', 520, 400, '#B06BFF'), tx(l, 'stomp', 1, 'STOMP!', 1400, 400, '#4CD964'), ['chip', 'over', 1100, 200, '1', '#FF5E7E', wt(l, 'one'), 90], ['chip', 'over', 1300, 200, '2', '#4CC9F0', wt(l, 'two'), 90], ['chip', 'over', 1500, 200, '3', '#FFD23F', wt(l, 'three'), 90]]; },
        fx: [shake(5, 6)] },
      { b: 8, w: 'disco', cam: 'wideIn', punch: 1, A: crew('disco', .78, 'cheer', { jumps: [0, 1, 2, 3] }).map((a, i) => Object.assign(a, i % 2 ? { spins: [10, 12] } : {})),
        P: () => { const l = D(1); return [tx(l, 'jump', 0, 'JUMP!', 520, 360, '#FF9F43'), tx(l, 'jump', 1, 'JUMP!', 1400, 360, '#FFE14D'), tx(l, 'up', 0, 'UP!', 700, 260, '#4CC9F0', 130), tx(l, 'up', 1, 'UP!', 960, 220, '#4CD964', 150), tx(l, 'up', 2, 'UP!', 1220, 170, '#FF5E7E', 180),
          tx(l, 'Spin', 0, 'SPIN!', 700, 400, '#B06BFF'), tx(l, 'shake', 0, 'SHAKE!', 1300, 400, '#FFE14D')]; } },
      { b: 8, w: 'disco', cam: [960, 560, 1, 960, 520, 1.1], punch: 1, A: crew('disco', .78, 'dance'),
        P: (T) => { const l = D(2); return [tx(l, 'left', 0, 'LEFT', 520, 320, '#4CC9F0', 140, -6), tx(l, 'right', 0, 'RIGHT', 1400, 320, '#FF5E7E', 140, 6), tx(l, 'ten', 0, '10!', 960, 380, '#FFE14D', 260, -4), ['confetti', 'front', wt(l, 'ten'), T(8), 30]]; } },
      { b: 4, w: 'disco', cam: 'wide', A: crew('disco', .82, 'still', { sing: 0, eye: 'wide', mouth: 'o' }), P: (T) => [['tint', 'front', '#9BE8FF', .3, T(0), T(4)], ['text', 'over', 960, 420, 'FREEZE!', T(0), '#FFFFFF', 250, -3, 3.6]] },
    ]);
  })();

  /* =========================================================================================== WORD WORKSHOP */
  section('wordsintro', 0, [
    { b: 4, w: 'workshop', cam: [900, 540, 1, 980, 540, 1.08], flash: .9, A: [A('workshop')('zoom', -300, .72, { mv: 'zoomer', go: { x: 560, d: 1.6, ease: 'power2.out' } }), A('workshop')('gizmo', 1260, 1.0, { mv: 'wave', sing: 1 }), A('workshop')('kiko', 1520, 1.0, { sing: 1 })],
      P: (T) => [ban(T, 0, 4, 'WORD WORKSHOP', 'TWO-LETTER WORDS', '#4CC9F0')] },
    { b: 4, w: 'workshop', cam: 'wideIn', A: [A('workshop')('gizmo', 640, 1.05, { mv: 'cheer', sing: 1 }), A('workshop')('luma', 1280, 1.05, { mv: 'cheer', sing: 1, f: 1 })],
      P: (T) => [['chip', 'over', 700, 260, '2 LETTERS', '#FF5E7E', T(0.6), 82], ['chip', 'over', 1250, 260, '= 1 WORD', '#4CD964', T(2), 82], ['sparkles', 'front', 960, 420, T(3), 8, 760, 36]] },
  ]);
  /* the picture for each two-letter word (second bar): [actors, props(T, tw = time of the word in the sentence)] */
  const WP = {
    at: (T, l) => ({ A: [A('workshop')('kiko', 520, 1.05, { sing: 1, look: [0, -16], eye: 'wide' }), A('workshop')('luma', 1400, 1.05, { sing: 1, look: [0, -16], eye: 'wide', f: 1 })], P: [['star', 'back', 600, 330, 54, '#FFD23F', T(.2), true, false], ['star', 'back', 960, 470, 70, '#FFE14D', T(1), true, false], ['star', 'back', 1360, 330, 54, '#FFD23F', T(2), true, false], ['sparkles', 'front', 960, 300, T(2.4), 8, 700, 34]] }),   /* arc below the word label */
    in: (T) => ({ A: [A('workshop')('bloop', 560, 1.0, { sing: 1, mv: 'cheer' }), A('workshop')('rumble', 1360, .95, { sing: 1, mv: 'bob', f: 1 })], P: [['drop', 'front', 'ball', 960, 560, .9, T(.8), { from: 420, fall: .55 }], ['obj', 'front', 'box', 960, 700, 1.5, T(0), { bob: false, shadow: true }], ['hearts', 'front', 960, 420, T(2.3), 5]] }),
    on: (T) => ({ A: [A('workshop')('kiko', 960, 1.25, { sing: 1, mv: 'bob' })], P: [['drop', 'front', 'hat', 960, 395, .62, T(.9), { from: 380, fall: .55 }], ['sparkles', 'front', 960, 400, T(1.7), 8, 300, 34]] }),
    up: (T) => ({ A: crew('workshop', .74, 'cheer', { jumps: [.5, 1.5, 2.5] }), P: [['arrow', 'front', 700, 430, -90, T(.2), '#4CC9F0', T(4)], ['arrow', 'front', 960, 400, -90, T(1.2), '#4CD964', T(4)], ['arrow', 'front', 1220, 430, -90, T(2.2), '#FF5E7E', T(4)]] }),   /* clear of the word label */
    go: (T) => ({ A: [A('workshop')('zoom', 700, .95, { mv: 'zoomer', go: { x: 2500, d: 1.4, ease: 'power3.in', at: .4 } })], P: [['speed', 'front', T(.4), T(4), 1, 14], ['text', 'front', 700, 330, 'GO!', T(.3), '#4CD964', 170, -6, .4], ['text', 'front', 1000, 400, 'GO!', T(1.1), '#FFE14D', 190, 5, .4], ['text', 'front', 1300, 330, 'GO!', T(1.9), '#FF5E7E', 210, -4, .5]] }),
    no: (T) => ({ A: [A('workshop')('luma', 960, 1.2, { sing: 1, fn: [(a, t0, t1, tl) => { for (let t = t0 + .5, k = 0; t < t1 - .3; t += .26, k++) tl.to(a.head, { rotation: k % 2 ? 16 : -16, duration: .24, ease: 'sine.inOut' }, t); tl.to(a.head, { rotation: 0, duration: .2 }, t1 - .2); }] })], P: [['noSign', 'front', 1380, 400, T(.4)], ['noSign', 'front', 540, 400, T(1.4)]] }),
    me: (T) => ({ A: [A('workshop')('kiko', 1100, 1.25, { sing: 1, mv: 'cheer' })], P: [['arrow', 'front', 560, 560, 0, T(.3), '#FF5E7E', T(4)], ['text', 'front', 620, 345, 'ME!', T(.4), '#FFE14D', 200, -6, .5], ['hearts', 'front', 1100, 380, T(1.6), 6]] }),
    be: (T) => ({ A: [A('workshop')('bloop', 640, 1.0, { sing: 1, mv: 'cheer' }), A('workshop')('nimbus', 1300, 1.05, { sing: 1, mv: 'cheer', f: 1 })], P: [['hearts', 'front', 640, 400, T(1.1), 7], ['text', 'front', 640, 250, 'KIND', T(1.0), '#FF9BD0', 130, -5, .9], ['star', 'back', 1300, 300, 80, '#FFD23F', T(2.9), true, false], ['text', 'front', 1300, 200, 'BRAVE', T(2.9), '#FFE14D', 130, 4, .9]] }),
    it: (T) => ({ A: [A('workshop')('rumble', 540, 1.0, { sing: 1, look: [10, 10] }), A('workshop')('gizmo', 1380, 1.0, { sing: 1, f: 1 })], P: [['glass', 'front', 760, 520, T(.1), T(2.6)], ['obj', 'front', 'star', 1100, 560, .8, T(2.65), { until: T(4) }], ['sparkles', 'front', 1100, 520, T(2.9), 8, 400, 34]] }),
    my: (T) => ({ A: [A('workshop')('kiko', 960, 1.15, { sing: 1, mv: 'bob' })], P: [['obj', 'front', 'hat', 520, 560, .9, T(1.05), { until: T(4) }], ['obj', 'front', 'ball', 1400, 560, .9, T(3.0), { until: T(4) }], ['hearts', 'front', 520, 400, T(1.3), 4], ['hearts', 'front', 1400, 400, T(3.2), 4]] }),
  };
  secs('word').forEach((s) => {
    const w = s.meta.w, ln = lines('word').filter((l) => l.t0 >= s.t0 && l.t0 < s.t1)[0], W = flat(ln), tj = W[2].t0;
    const scene = WP[w](((base) => (b) => S_(base + b * BEAT))(s.t0 + 4 * BEAT));
    place(s, [
      { b: 4, w: 'workshop', cam: 'wideIn', punch: 2, A: [A('workshop')('kiko', 250, .9, { mv: 'cheer', sing: 1 }), A('workshop')('luma', 1670, .9, { mv: 'cheer', sing: 1, f: 1 })],
        P: () => [['wordTiles', 'front', w, 960, 480, W[0].t0, tj, s.t0 + 4 * BEAT], ['sparkles', 'front', 960, 420, tj + .3, 8, 500, 38]] },
      { b: 4, w: 'workshop', cam: 'wide', A: scene.A, P: () => [['wordLabel', 'over', 960, 212, w, s.t0 + 4 * BEAT + .05, s.t1, { size: 120 }]].concat(scene.P) },
    ]);
  });
  function S_(t) { return +t.toFixed(4); }
  section('wordrev', 0, [
    { b: 10, w: 'workshop', cam: [960, 560, 1, 960, 520, 1.08], punch: 1, A: crew('workshop', .74, 'dance'),
      P: () => { const l = lineOf('wordrev'), ws = ['at', 'in', 'on', 'up', 'go', 'no', 'me', 'be', 'it', 'my']; return ws.map((w, i) => ['chip', 'over', 520 + (i % 5) * 220, i < 5 ? 250 : 400, w, PAL[i % 6], wt(l, w), 84]); } },
    { b: 6, w: 'workshop', cam: 'low', punch: 1, A: crewV('workshop', 'cheer', { jumps: [0, 2] }), P: (T) => [['text', 'over', 960, 330, 'WE CAN READ!', T(.2), '#FFE14D', 150, -4, 2.8], ['confetti', 'front', T(.3), T(5), 34], ['fireworks', 'back', 520, 360, T(.8), '#FFE14D', 240], ['fireworks', 'back', 1400, 340, T(1.2), '#FF9BD0', 220]] },
  ]);

  /* =========================================================================================== GAME GALAXY */
  section('gameintro', 0, [
    { b: 4, w: 'disco', cam: [900, 540, 1, 980, 540, 1.08], flash: .9, A: [A('disco')('zoom', -300, .72, { mv: 'zoomer', go: { x: 560, d: 1.6, ease: 'power2.out' } }), A('disco')('rumble', 1260, 1.0, { mv: 'wave', sing: 1 }), A('disco')('bloop', 1520, .9, { sing: 1 })],
      P: (T) => [ban(T, 0, 4, 'GAME GALAXY', 'CAN YOU FIND IT?', '#FF5E7E')] },
    { b: 4, w: 'disco', cam: 'wideIn', A: [A('disco')('rumble', 640, 1.0, { mv: 'cheer', sing: 1 }), A('disco')('bloop', 960, .85, { mv: 'cheer', sing: 1 }), A('disco')('nimbus', 1300, 1.0, { mv: 'cheer', sing: 1, f: 1 })],
      P: (T) => [['text', 'over', 960, 340, 'POINT & SAY!', T(1.4), '#FFE14D', 150, -4, 2.2], ['sparkles', 'front', 960, 420, T(3), 8, 760, 36]] },
  ]);
  const GAMECARDS = [{ labels: ['3', '5', '8'], correct: 1, size: 210 }, { labels: ['S', 'T', 'M'], correct: 2, size: 210 }, { labels: ['go', 'up', 'no'], correct: 0, size: 150 }];
  secs('game').forEach((s, k) => {
    const G = GAMECARDS[k], who = [['kiko', 'luma'], ['bloop', 'gizmo'], ['rumble', 'nimbus']][k], tReveal = s.t0 + 12 * BEAT;
    const scan = (dir) => (a, t0, t1, tl) => { const m = M(); for (let t = t0 + 2.2, i = 0; t < t0 + 5.8; t += .7, i++) m.look(a, S_(t), (i % 2 ? -1 : 1) * 12 * dir, -6, .2); m.look(a, S_(t0 + 6.2), 0, 0, .2); m.eye(a, S_(t0 + 2.1), 'wide'); m.eye(a, S_(t0 + 6.1), 'open'); };
    place(s, [{ b: 16, w: 'disco', cam: [960, 560, 1.0, 960, 540, 1.06], punch: 1,
      A: [A('disco')(who[0], 260, .95, { mv: 'bob', sing: 1, fn: [scan(1)] }), A('disco')(who[1], 1660, .95, { f: 1, mv: 'bob', sing: 1, fn: [scan(-1)] })],
      P: (T) => [['cards', 'front', G.labels, 960, 520, T(1.2), tReveal, G.correct, { size: G.size, until: s.t1 }], ['countdown', 'front', 960, 270, T(4.2), 3, 1.3, tReveal - .2], ['text', 'over', 960, 160, 'THINK...', T(4.6), '#FFFFFF', 76, 0, 3.4]] }]);
  });

  /* =========================================================================================== OUTRO */
  section('outro', 0, [
    { b: 4, w: 'finale', cam: 'wideIn', A: crewArc('finale', .84, 'wave'), P: (T) => [['hearts', 'front', 960, 430, T(1.5), 7], ['sparkles', 'front', 960, 450, T(2), 8, 760, 36]] },
    { b: 8, w: 'finale', cam: 'wide', A: crewArc('finale', .84, 'wave'), P: (T) => [['text', 'front', 960, 270, 'SEE YOU SOON!', T(.4), '#FFE14D', 120, -3, 3.4], ['hearts', 'front', 960, 430, T(2), 7], ['confetti', 'front', T(2.5), T(6), 24]] },
    { b: 20, w: 'finale', cam: [960, 540, 1.04, 960, 520, 1.0], A: crewArc('finale', .84, 'wave'), P: (T) => [['sparkles', 'front', 960, 450, T(0), 8, 760, 36], ['sparkles', 'front', 960, 450, T(8), 8, 760, 36], ['sparkles', 'front', 960, 450, T(16), 8, 760, 36]] },
  ]);

  window.SB = SB;
})();
