/* KiddoVerse LEARN #2 "The Color Train" storyboard - every shot is generated from the song data (sections, lines, words) and the colour table,
   so every picture lands exactly on the sung word.  beat = 0.556 s, bar = 4 beats. */
(function () {
  const SONG = window.SONG, BEAT = 60 / SONG.bpm, BAR = SONG.bar, SB = [], HEX = window.KVW.COLORHEX, CK = SONG.colors.map((c) => c.key);
  const FL = { hub: 905, hills: 905, dino: 910, cloud: 915, workshop: 925, disco: 930, finale: 905, space: 1000, numland: 905, abc: 905, c_gray: 905 };
  CK.forEach((k) => { FL['c_' + k] = 905; });
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

  /* ---------- song-data helpers: exact sung times */
  const flat = (l) => l.words.flatMap((w) => w.subs || [w]);
  const linesOfSec = (s) => SONG.lines.filter((l) => l.sec === s.i);
  const PAIRS = [['kiko', 'luma'], ['bloop', 'rumble'], ['gizmo', 'nimbus'], ['luma', 'rumble'], ['kiko', 'gizmo'], ['bloop', 'nimbus']];
  const NAMEUP = { red: 'RED', orange: 'ORANGE', yellow: 'YELLOW', green: 'GREEN', blue: 'BLUE', purple: 'PURPLE' };
  const OBJSCALE = { whale: 1.3, apple: 1.1, heart: 1.2, cherry: 1.15, orange: 1.15, carrot: 1.15, fish: 1.2, sun: 1.1, duck: 1.2, star: 1.15, tree: .95, frog: 1.2, leaf: 1.25, balloon: 1.2, blueball: 1.2, grapes: 1.15, flower: 1.15, hat: 1.15 };
  const GRAYS = ['#8F95AC', '#9CA2B8', '#A9AFC3', '#B6BBCD', '#C3C8D7', '#D0D4E0'];
  const HEXES = CK.map((k) => HEX[k]);
  const ban = (T, a, b, title, sub, col) => ['banner', 'over', title, sub, T(a), T(b), col];
  const scan = (dir, from = 1.4, to = 5.4) => (a, t0, t1, tl) => { const m = M(); for (let t = t0 + from, i = 0; t < t0 + to; t += .7, i++) m.look(a, S_(t), (i % 2 ? -1 : 1) * 12 * dir, -6, .2); m.look(a, S_(t0 + to + .4), 0, 0, .2); m.eye(a, S_(t0 + from - .1), 'wide'); m.eye(a, S_(t0 + to + .3), 'open'); };

  /* =========================================================================================== INTRO (4 bars) */
  section('intro', 0, [
    { b: 4, w: 'hub', cam: [960, 540, 1, 960, 500, 1.1], dust: 20, A: [],
      P: (T) => [['burst', 'front', 960, 520, T(0), '#FFE14D', 220], ['burst', 'front', 960, 520, T(1), '#FF9BD0', 250], ['burst', 'front', 960, 520, T(2), '#7BE8FF', 330], ['sparkles', 'front', 960, 500, T(2), 12, 460, 50], ['star', 'back', 1560, 220, 64, '#FFD23F', T(0), true]],
      fx: [(g, c) => window.KVTitle(c.tl, c.t0)] },
    { b: 4, w: 'hub', cam: 'wideIn', flash: .6, A: [A('hub')('kiko', 640, 1.08, { mv: 'wave' }), A('hub')('bloop', 960, .8, { mv: 'cheer' }), A('hub')('zoom', 1450, .78, { f: 1, mv: 'bob' })],
      P: (T) => [['chip', 'over', 960, 250, 'THE COLOR TRAIN', '#FF5E7E', T(1), 74]] },
    { b: 2, w: 'hub', cam: { face: 0, z: [1.9, 2.1] }, A: [A('hub')('luma', 960, 1.25)] },
    { b: 2, w: 'hub', cam: 'wide', A: crew('hub', .8, 'cheer', { jumps: [0], sing: 0 }), P: (T) => [['sparkles', 'front', 960, 500, T(0), 8, 700, 40]] },
    { b: 1, w: 'hub', cam: { face: 0, z: [1.7, 1.85] }, A: [A('hub')('kiko', 960, 1.2, { mv: 'cheer' })], P: (T) => [['badge', 'over', 1540, 330, 3, T(0), '#FF5E7E', 130]] },
    { b: 1, w: 'hub', cam: { face: 0, z: [1.7, 1.85] }, A: [A('hub')('luma', 960, 1.2, { mv: 'cheer' })], P: (T) => [['badge', 'over', 1540, 330, 2, T(0), '#FFB938', 130]] },
    { b: 1, w: 'hub', cam: { face: 0, z: [1.7, 1.85] }, A: [A('hub')('gizmo', 960, 1.25, { mv: 'cheer' })], P: (T) => [['badge', 'over', 1540, 330, 1, T(0), '#4CD964', 130]] },
    { b: 1, w: 'hub', cam: 'wide', A: [A('hub')('zoom', 700, 1.0, { mv: 'zoomer', go: { x: 2500, d: .5, ease: 'power3.in' } })], flash: .9, P: (T) => [['speed', 'front', T(0), T(1), 1, 14], ['text', 'over', 960, 520, 'GO!', T(0), '#FFE14D', 300, -6, .45]] },
  ]);

  /* =========================================================================================== THE HOOK (4 lines x 2 bars) */
  function hook(kind, nth, V) {
    const s = secs(kind)[nth], L = linesOfSec(s), W = L.map(flat), big = kind !== 'chorus', fin2 = kind === 'fin2';
    const tToot = [W[0][0].t0, W[0][1].t0], tTrainEnd = s.t0 + 7 * BEAT;
    const allHex = HEXES.slice();
    const colorT = (li, text) => (W[li].find((x) => x.text.toLowerCase().startsWith(text)) || W[li][0]).t0;
    place(s, [
      /* "Toot, toot! Here comes the train!" */
      { b: 8, w: V.W1, cam: V.camA || 'wide', flash: V.flash || 0, punch: 2, A: [A(V.W1)('kiko', 170, .85, { mv: 'bob', sing: 1 }), A(V.W1)('nimbus', 1760, .85, { f: 1, mv: 'bob', sing: 1 })],
        P: (T) => [['train', 'back', 1500, 800, .62, allHex, s.t0 - .1, s.t0 + 5.6 * BEAT, { toots: tToot, until: s.t1 }], ['text', 'over', 960, 250, 'TOOT! TOOT!', tToot[0], '#FFE14D', 170, -5, 1.3], ['sparkles', 'front', 960, 500, W[0][5].t0, 8, 700, 40]] },
      /* "Rainbow colors, big and bright!" the rainbow lights up band by band */
      { b: 8, w: V.W2, cam: 'wideIn', punch: 1, A: crew(V.W2, .7, 'dance'),
        P: (T) => [['rainbow', 'back', 960, 760, 600, 66, allHex, allHex.map((_, k) => s.t0 + 2 * BAR + (k + 1) * .26), { t0: T(0), until: s.t0 + 4 * BAR, ghostOp: .3 }], ['sparkles', 'front', 960, 380, W[1][2].t0, 8, 640, 38], ['confetti', 'front', T(3), T(8), 28]] },
      /* "Red and blue and yellow too!" three big colour orbs */
      { b: 8, w: V.W3, cam: [960, 560, 1, 960, 520, 1.08], punch: 1, A: crew(V.W3, .66, 'dance'),
        P: (T) => [['orb', 'front', 560, 470, 120, HEX.red, colorT(2, 'red'), s.t0 + 6 * BAR], ['text', 'over', 560, 250, 'RED', colorT(2, 'red') + .05, HEX.red, 120, -4, 1.2],
          ['orb', 'front', 960, 470, 120, HEX.blue, colorT(2, 'blue'), s.t0 + 6 * BAR], ['text', 'over', 960, 250, 'BLUE', colorT(2, 'blue') + .05, HEX.blue, 120, 3, 1.2],
          ['orb', 'front', 1360, 470, 120, HEX.yellow, colorT(2, 'yellow'), s.t0 + 6 * BAR], ['text', 'over', 1360, 250, 'YELLOW', colorT(2, 'yellow') + .05, HEX.yellow, 110, -3, 1.2]] },
      /* "Let's find the colors with me!" */
      { b: 8, w: V.W4, cam: 'low', punch: 1, A: fin2 ? crewV(V.W4, 'cheer', { jumps: [0, 2, 4, 6] }) : crewArc(V.W4, .84, 'cheer', { jumps: [4, 6] }),
        P: (T) => (fin2 ? [['text', 'over', 960, 300, 'WE LOVE COLORS!', W[3][4].t0, '#FFE14D', 130, -3, 2.6], ['fireworks', 'back', 520, 360, T(4), HEX.red, 240], ['fireworks', 'back', 1400, 340, T(4.6), HEX.blue, 230], ['fireworks', 'back', 960, 300, T(5.2), HEX.yellow, 250], ['hearts', 'front', 960, 560, T(5), 8], ['confetti', 'front', T(3), T(8), 40]]
          : [['text', 'over', 960, 300, 'LET\'S GO!', W[3][4].t0, '#FFE14D', 150, -4, 1.6], ['fireworks', 'back', 520, 360, T(4), HEX.green, 230], ['fireworks', 'back', 1400, 340, T(4.6), HEX.purple, 220], ['confetti', 'front', T(4), T(8), 30]]) },
    ]);
  }
  hook('chorus', 0, { W1: 'hills', W2: 'numland', W3: 'hub', W4: 'hills', camA: 'panR' });

  /* =========================================================================================== STORY: the grey rainbow (4 lines x 2 bars) */
  (function () {
    const s = secs('story')[0], L = linesOfSec(s), W = L.map(flat);
    const sadEyes = (a, t0, t1, tl) => { const m = M(); m.eye(a, S_(t0 + .1), 'wide'); m.brow(a, S_(t0 + .3), -14, 14, 6); };
    place(s, [
      { b: 8, w: 'c_gray', cam: 'wideIn', A: [A('c_gray')('kiko', 520, 1.0, { mv: 'sway', sing: 1, fn: [sadEyes] }), A('c_gray')('luma', 760, 1.0, { mv: 'sway', sing: 1, fn: [sadEyes] }), A('c_gray')('bloop', 1160, .9, { mv: 'sway', sing: 1, f: 1 }), A('c_gray')('gizmo', 1420, 1.0, { mv: 'sway', sing: 1, f: 1, fn: [sadEyes] })],
        P: (T) => [['rainbow', 'back', 960, 700, 560, 62, GRAYS, GRAYS.map(() => 'pre'), { t0: T(0), ghost: false }], ['text', 'over', 960, 230, 'OH NO!', W[0][0].t0, '#C9CCDA', 190, -4, 1.4], ['rcloud', 'back', 520, 190, .8, T(0), T(8), true, '#9AA0BD'], ['rcloud', 'back', 1400, 170, .9, T(0), T(8), true, '#9AA0BD']] },
      { b: 8, w: 'c_gray', cam: [960, 560, 1, 1000, 530, 1.06], A: [A('c_gray')('kiko', 420, 1.0, { mv: 'bob', sing: 1, fn: [scan(1, 1, 7)] }), A('c_gray')('luma', 700, 1.0, { mv: 'bob', sing: 1, fn: [scan(-1, 1, 7)] }), A('c_gray')('rumble', 1220, .95, { mv: 'bob', sing: 1, f: 1, fn: [scan(1, 1.2, 7)] }), A('c_gray')('nimbus', 1500, .95, { mv: 'bob', sing: 1, f: 1, fn: [scan(-1, 1.2, 7)] })],
        P: (T) => [['qmark', 'front', 560, 330, W[1][0].t0, s.t0 + 4 * BAR, 170, '#C9CCDA'], ['qmark', 'front', 1360, 330, W[1][3].t0, s.t0 + 4 * BAR, 170, '#C9CCDA']] },
      { b: 8, w: 'c_gray', cam: 'wide', A: crew('c_gray', .6, 'cheer', { jumps: [4, 6] }).filter((a, i) => i < 3),
        P: (T) => [['train', 'back', 1500, 790, .64, [], s.t0 + 4 * BAR, s.t0 + 4 * BAR + 3 * BEAT, { body: '#8F95AC' }], ['sparkles', 'front', 960, 480, W[2][3].t0, 6, 520, 36]] },
      { b: 8, w: 'c_gray', cam: [960, 560, 1, 960, 520, 1.12], flash: .9, A: [A('c_gray')('kiko', 520, 1.0, { mv: 'cheer', sing: 1 }), A('c_gray')('luma', 800, 1.0, { mv: 'cheer', sing: 1 })],
        P: (T) => [['train', 'back', 1560, 800, .68, [], s.t0 + 6 * BAR - .1, s.t0 + 6 * BAR + .2, { body: '#6C4CE0', toots: [W[3][2].t0, W[3][3].t0], until: s.t1 }], ['text', 'over', 760, 270, 'ALL ABOARD!', W[3][0].t0, '#FFE14D', 140, -4, 1.6], ['burst', 'front', 1400, 560, W[3][3].t0, '#FFE14D', 260]] },
    ]);
  })();

  /* =========================================================================================== THE SIX COLOUR STOPS (12 bars each) */
  secs('stop').forEach((s) => {
    const ci = s.meta.i, key = s.meta.color, hex = HEX[key], world = 'c_' + key, pair = PAIRS[ci], L = linesOfSec(s), W = L.map(flat);
    const hexes = HEXES.slice(0, ci + 1), nm = NAMEUP[key], objs = SONG.colors[ci].objs;
    const tAns = W[5][W[5].length - 1].t0;                                           // the kids' answer
    const hud = (tl_) => ['rainbow', 'over', 1690, 215, 128, 21, HEXES, HEXES.map((_, k) => (k < ci ? 'pre' : k === ci ? tl_ : null)), { t0: s.t0, ghostOp: .7, pop: false, plate: '#2B1B5E', plateOp: .42 }];
    const side = (w, o1 = {}, o2 = {}) => [A(w)(pair[0], 250, .95, Object.assign({ mv: 'bob', sing: 1 }, o1)), A(w)(pair[1], 1670, .95, Object.assign({ f: 1, mv: 'bob', sing: 1 }, o2))];
    const tBeat = (b) => s.t0 + b * BEAT, shots = [];
    /* A: the train rolls in and stops - "Toot, toot, stop, stop! Here's RED!" */
    const tHere = W[0][4].t0, tCol = W[0][5].t0;
    shots.push({ b: 8, w: world, cam: 'wide', flash: .9, A: side(world),
      P: (T) => [['train', 'back', 1500, 810, .8 - .03 * ci, hexes, s.t0 - .05, s.t0 + 3.3 * BEAT, { newCar: ci, toots: [W[0][0].t0, W[0][1].t0], tOut: s.t0 + 6.3 * BEAT, dOut: 1.0 }], ban(T, 0, 4, nm + ' STOP', 'STATION ' + (ci + 1) + ' OF 6', hex),
        ['orb', 'front', 960, 410, 110, hex, tHere, s.t0 + 8 * BEAT], ['text', 'over', 960, 410, nm + '!', tCol, '#FFFFFF', nm.length > 5 ? 120 : 160, -4, 1.4], ['burst', 'front', 960, 410, tCol, hex, 260], ['sparkles', 'front', 960, 420, tCol + .1, 8, 520, 40], hud(null)] });
    /* B: the kids echo the colour word */
    const echoW = W[1];
    shots.push({ b: 8, w: world, cam: 'wideIn', punch: 2, A: side(world, { mv: 'cheer' }, { mv: 'cheer' }),
      P: (T) => [['orb', 'front', 960, 520, 160, hex, s.t0 + 8 * BEAT, s.t0 + 16 * BEAT]].concat(echoW.map((w, i) => ['burst', 'front', 960, 520, w.t0, hex, 170 + 24 * i, false])).concat([['text', 'over', 960, 270, nm + '!', echoW[echoW.length - 1].t0, '#FFFFFF', nm.length > 5 ? 130 : 180, -4, 1.4], ['confetti', 'front', echoW[0].t0, T(8), 28], hud(null)]) });
    /* C1-C3: "<objects> are <colour>!" - three of the object pop in, the noun label, the colour word, the kids echo */
    objs.forEach((kind, oi) => {
      const lw = W[2 + oi], tObj = lw[0].t0, tIs = lw[2].t0, tEcho = lw[3].t0, noun = lw[0].disp.toUpperCase(), sc = OBJSCALE[kind] || 1.15, tEnd = s.t0 + (16 + 8 * (oi + 1)) * BEAT;
      shots.push({ b: 8, w: world, cam: oi % 2 ? 'wideIn' : [960, 540, 1, 960, 520, 1.06], punch: 2, A: side(world, { fn: [scan(1, .6, 3.8)] }, { fn: [scan(-1, .6, 3.8)] }),
        P: (T) => [['obj', 'front', kind, 640, 560, sc, tObj, { col: hex, until: tEnd }], ['obj', 'front', kind, 960, 540, sc * 1.1, tObj + .3, { col: hex, until: tEnd }], ['obj', 'front', kind, 1280, 560, sc, tObj + .6, { col: hex, until: tEnd }],
          ['chip', 'over', 960, 800, noun, hex, tObj + .1, 80], ['text', 'over', 960, 270, nm + '!', tIs, '#FFFFFF', nm.length > 5 ? 120 : 160, -4, 1.0], ['burst', 'front', 960, 540, tEcho, hex, 250], ['sparkles', 'front', 960, 480, tEcho + .1, 8, 560, 38], hud(null)] });
    });
    /* D+E: the question ("What colour is it?"), thinking time, then the answer - TA-DA (one continuous 8-beat shot) */
    const tIt = W[5][3].t0, jb = (tAns - (s.t0 + 40 * BEAT)) / BEAT;
    shots.push({ b: 8, w: world, cam: 'wideIn', punch: 1, A: side(world, { fn: [scan(1, .3, 3.0)], jumps: [jb] }, { fn: [scan(-1, .3, 3.0)], jumps: [jb] }),
      P: (T) => [['obj', 'front', objs[0], 640, 590, (OBJSCALE[objs[0]] || 1.1) * .9, T(0), { col: hex, until: tAns - .05, bob: false, quiet: true }], ['obj', 'front', objs[1], 960, 580, (OBJSCALE[objs[1]] || 1.1) * .9, T(.2), { col: hex, until: tAns - .05, bob: false, quiet: true }], ['obj', 'front', objs[2], 1280, 590, (OBJSCALE[objs[2]] || 1.1) * .9, T(.4), { col: hex, until: tAns - .05, bob: false, quiet: true }],
        ['qmark', 'over', 960, 270, tIt, tAns - .05, 230],
        ['orb', 'front', 960, 480, 190, hex, tAns, s.t1], ['text', 'over', 960, 480, nm + '!', tAns + .05, '#FFFFFF', nm.length > 5 ? 150 : 210, -3, 1.6], ['confetti', 'front', tAns, T(8), 36], ['sparkles', 'front', 960, 480, tAns + .1, 10, 640, 44], ['burst', 'front', 960, 480, tAns, hex, 300], hud(tAns)] });
    place(s, shots);
  });

  /* =========================================================================================== THE RAINBOW SONG (8 bars) */
  (function () {
    const s = secs('rainbow')[0], L = linesOfSec(s), W = L.map(flat);
    const cw = [W[0][0], W[0][1], W[0][2], W[1][0], W[1][1], W[1][2]].map((w) => w.t0);                    // red, orange, yellow, green, blue, purple
    place(s, [
      { b: 16, w: 'numland', cam: [960, 560, 1, 960, 520, 1.06], punch: 1, A: crew('numland', .7, 'dance'),
        P: (T) => [['rainbow', 'back', 960, 740, 640, 72, HEXES, cw, { t0: T(0), until: s.t0 + 4 * 4 * BEAT + 8 * BEAT, ghostOp: .45 }]].concat(HEXES.map((h, k) => ['text', 'over', 960, 500, NAMEUP[CK[k]], cw[k] + .05, h, 150, (k % 2 ? 4 : -4), .75])) },
      { b: 8, w: 'numland', cam: 'wideIn', punch: 1, A: crew('numland', .72, 'cheer', { jumps: [0, 2, 4] }),
        P: (T) => [['rainbow', 'back', 960, 740, 640, 72, HEXES, HEXES.map(() => 'pre'), { t0: T(0), ghostOp: 0, until: s.t1 + 2 }], ['text', 'over', 960, 250, 'RAINBOW!', W[2][1].t0, '#FFE14D', 190, -4, 1.8], ['fireworks', 'back', 520, 330, T(1), HEX.red, 230], ['fireworks', 'back', 1400, 330, T(1.5), HEX.blue, 230], ['confetti', 'front', T(.5), T(8), 36]] },
      { b: 8, w: 'numland', cam: 'low', punch: 1, A: crewV('numland', 'cheer', { jumps: [0, 2, 4] }),
        P: (T) => [['rainbow', 'back', 960, 740, 640, 72, HEXES, HEXES.map(() => 'pre'), { t0: T(0), ghostOp: 0, until: s.t1 + 2, pop: false }], ['hearts', 'front', 960, 520, T(1), 8], ['text', 'over', 960, 280, 'HOORAY!', W[3][4].t0, '#FFE14D', 190, -5, 1.6], ['fireworks', 'back', 520, 360, T(2), HEX.green, 230], ['fireworks', 'back', 1400, 340, T(2.5), HEX.purple, 220], ['confetti', 'front', T(1), T(8), 40]] },
    ]);
  })();

  /* =========================================================================================== COLOUR GAME */
  section('gameintro', 0, [
    { b: 4, w: 'disco', cam: [900, 540, 1, 980, 540, 1.08], flash: .9, A: [A('disco')('zoom', -300, .72, { mv: 'zoomer', go: { x: 560, d: 1.6, ease: 'power2.out' } }), A('disco')('rumble', 1260, 1.0, { mv: 'wave', sing: 1 }), A('disco')('bloop', 1520, .9, { sing: 1 })],
      P: (T) => [ban(T, 0, 4, 'COLOR GAME', 'CAN YOU FIND IT?', '#FF5E7E')] },
    { b: 4, w: 'disco', cam: 'wideIn', A: [A('disco')('rumble', 640, 1.0, { mv: 'cheer', sing: 1 }), A('disco')('bloop', 960, .85, { mv: 'cheer', sing: 1 }), A('disco')('nimbus', 1300, 1.0, { mv: 'cheer', sing: 1, f: 1 })],
      P: (T) => [['text', 'over', 960, 340, 'POINT & SAY!', T(1.4), '#FFE14D', 150, -4, 2.2], ['sparkles', 'front', 960, 420, T(3), 8, 760, 36]] },
  ]);
  secs('game').forEach((s, k) => {
    const cards = s.meta.cards, correct = cards.indexOf(s.meta.color), who = [['kiko', 'luma'], ['bloop', 'gizmo'], ['rumble', 'nimbus']][k], tReveal = s.t0 + 12 * BEAT;
    place(s, [{ b: 16, w: 'disco', cam: [960, 560, 1.0, 960, 540, 1.06], punch: 1,
      A: [A('disco')(who[0], 260, .95, { mv: 'bob', sing: 1, fn: [scan(1, 2.2, 5.8)] }), A('disco')(who[1], 1660, .95, { f: 1, mv: 'bob', sing: 1, fn: [scan(-1, 2.2, 5.8)] })],
      P: (T) => [['colorCards', 'front', cards, 960, 520, T(1.2), tReveal, correct, { until: s.t1 }], ['countdown', 'front', 960, 270, T(4.2), 3, 1.3, tReveal - .2], ['text', 'over', 960, 160, 'THINK...', T(4.6), '#FFFFFF', 76, 0, 3.4]] }]);
  });

  /* =========================================================================================== FINALE (the hook, key up) + OUTRO */
  hook('fin', 0, { W1: 'space', W2: 'cloud', W3: 'disco', W4: 'finale', camA: 'panL', flash: .9 });
  hook('fin2', 0, { W1: 'finale', W2: 'numland', W3: 'hills', W4: 'finale', flash: .9 });
  section('outro', 0, [
    { b: 4, w: 'finale', cam: 'wideIn', A: crewArc('finale', .84, 'wave'), P: (T) => [['hearts', 'front', 960, 430, T(1.5), 7], ['sparkles', 'front', 960, 450, T(2), 8, 760, 36]] },
    { b: 8, w: 'finale', cam: 'wide', A: crewArc('finale', .84, 'wave'), P: (T) => [['text', 'front', 960, 270, 'SEE YOU SOON!', T(.4), '#FFE14D', 120, -3, 3.4], ['hearts', 'front', 960, 430, T(2), 7], ['confetti', 'front', T(2.5), T(6), 24]] },
    { b: 12, w: 'finale', cam: [960, 540, 1.04, 960, 520, 1.0], A: crewArc('finale', .84, 'wave'), P: (T) => [['sparkles', 'front', 960, 450, T(0), 8, 760, 36], ['sparkles', 'front', 960, 450, T(5), 8, 760, 36], ['sparkles', 'front', 960, 450, T(10), 8, 760, 36]] },
  ]);

  window.SB = SB;
})();
