/* KiddoVerse storyboard — every shot is mapped to the lyric beat it illustrates (beat = 0.5 s, bar = 4 beats). */
(function () {
  const SONG = window.SONG, BEAT = 60 / SONG.bpm, SB = [];
  const FL = { hub: 905, hills: 905, dino: 910, cloud: 915, workshop: 925, disco: 930, finale: 905, space: 1000 };
  const sec = (kind, nth) => SONG.sections.filter((s) => s.kind === kind)[nth];
  function section(kind, nth, shots) {
    const s = sec(kind, nth); let b = 0;
    shots.forEach((sh) => { SB.push(Object.assign({ sec: kind }, sh, { t0: s.t0 + b * BEAT, t1: s.t0 + (b + sh.b) * BEAT })); b += sh.b; });
    if (b !== s.bars * 4) throw new Error(`storyboard ${kind}#${nth}: ${b} beats, expected ${s.bars * 4}`);
  }
  const A = (w) => (c, x, s = 1, o = {}) => Object.assign({ c, x, y: FL[w], s }, o);
  const ORDER = ['kiko', 'luma', 'bloop', 'rumble', 'gizmo', 'nimbus'], XS = [390, 650, 910, 1170, 1430, 1690];
  const crew = (w, s = .76, mv = 'bob', o = {}) => ORDER.map((c, i) => A(w)(c, XS[i], s, Object.assign({ mv, sing: 1 }, o)));
  const crewArc = (w, s = .82, mv = 'bob', o = {}) => ORDER.map((c, i) => { const x = [380, 650, 900, 1150, 1400, 1670][i], k = [1, .45, 0, 0, .45, 1][i]; return A(w)(c, x, s * (1 - .1 * (1 - k)), Object.assign({ y: FL[w] + 36 * k - 36, mv, sing: 1 }, o)); }).sort((a, b) => a.y - b.y);
  const crewV = (w, mv = 'bob', o = {}) => [['kiko', 740], ['luma', 1180], ['nimbus', 1650]].map(([c, x]) => A(w)(c, x, .66, Object.assign({ y: FL[w] - 80, mv, sing: 1 }, o))).concat([['bloop', 520], ['rumble', 960], ['gizmo', 1400]].map(([c, x]) => A(w)(c, x, .95, Object.assign({ mv, sing: 1 }, o))));
  const RIDERS = ['kiko', 'luma', 'bloop'];
  const M = () => window.__KVM;
  const shake = (...bs) => (g, c) => bs.forEach((b) => { window.__LOG(c.T(b), 'thud'); for (let i = 0; i < 6; i++) c.tl.to(c.punch, { x: (i % 2 ? 1 : -1) * 16 * (1 - i / 6), y: (i % 2 ? -1 : 1) * 12 * (1 - i / 6), duration: .045 }, c.T(b) + i * .045); c.tl.to(c.punch, { x: 0, y: 0, duration: .05 }, c.T(b) + .28); });
  const glowOn = (col, op, at = 0) => (a, t0, t1, tl) => { if (a.glow) { tl.set(a.glow.querySelector('circle'), { fill: col }, t0 + at); tl.to(a.glow, { opacity: op, duration: .3 }, t0 + at); } };
  const arc = (x0, y0, x1, y1, dip, t0, t1, tilt = 1) => (a, _a, _b, tl) => {   // fly along an arc with banking
    const N = 14; for (let i = 0; i < N; i++) { const k0 = i / N, k1 = (i + 1) / N, X = (k) => x0 + (x1 - x0) * k, Y = (k) => y0 + (y1 - y0) * k + dip * Math.sin(Math.PI * k);
      tl.fromTo(a.g, { x: X(k0), y: Y(k0) }, { x: X(k1), y: Y(k1), duration: (t1 - t0) / N, ease: 'none' }, t0 + (t1 - t0) * k0);
      tl.to(a.sq, { rotation: tilt * Math.atan2(Y(k1) - Y(k0), X(k1) - X(k0)) * 180 / Math.PI * .6, duration: (t1 - t0) / N, ease: 'none' }, t0 + (t1 - t0) * k0); } };

  /* =========================================================================================== INTRO (4 bars) */
  section('intro', 0, [
    { b: 4, w: 'hub', cam: [960, 540, 1, 960, 500, 1.1], dust: 20, A: [],
      P: (T) => [['burst', 'front', 960, 520, T(0), '#FFE14D', 220], ['burst', 'front', 960, 520, T(1), '#FF9BD0', 250], ['burst', 'front', 960, 520, T(2), '#7BE8FF', 330], ['sparkles', 'front', 960, 500, T(2), 12, 460, 50], ['star', 'back', 1560, 220, 64, '#FFD23F', T(0), true]],
      fx: [(g, c) => window.KVTitle(c.tl, c.t0)] },
    { b: 4, w: 'hub', cam: 'wideIn', flash: .6, A: [A('hub')('kiko', 640, 1.08, { mv: 'wave' }), A('hub')('bloop', 960, .8, { mv: 'cheer' }), A('hub')('zoom', 1450, .78, { f: 1, mv: 'bob' })] },
    { b: 2, w: 'hub', cam: { face: 0, z: [1.9, 2.1] }, A: [A('hub')('luma', 960, 1.25)] },
    { b: 2, w: 'hub', cam: 'wide', A: crew('hub', .8, 'cheer', { jumps: [0], sing: 0 }), P: (T) => [['sparkles', 'front', 960, 500, T(0), 8, 700, 40]] },
    { b: 1, w: 'hub', cam: { face: 0, z: [1.7, 1.85] }, A: [A('hub')('kiko', 960, 1.2, { mv: 'cheer' })], P: (T) => [['badge', 'over', 1540, 330, 3, T(0), '#FF5E7E', 130]] },
    { b: 1, w: 'hub', cam: { face: 0, z: [1.7, 1.85] }, A: [A('hub')('luma', 960, 1.2, { mv: 'cheer' })], P: (T) => [['badge', 'over', 1540, 330, 2, T(0), '#FFB938', 130]] },
    { b: 1, w: 'hub', cam: { face: 0, z: [1.7, 1.85] }, A: [A('hub')('gizmo', 960, 1.25, { mv: 'cheer' })], P: (T) => [['badge', 'over', 1540, 330, 1, T(0), '#4CD964', 130]] },
    { b: 1, w: 'hub', cam: 'wide', A: [A('hub')('zoom', 700, 1.0, { mv: 'zoomer', go: { x: 2500, d: .5, ease: 'power3.in' } })], flash: .9, P: (T) => [['speed', 'front', T(0), T(1), 1, 14], ['text', 'over', 960, 520, 'ZOOM!', T(0), '#FFE14D', 280, -6, .45]] },
  ]);

  /* =========================================================================================== CHORUS template */
  function chorus(kind, nth, V) {
    const a = A(V.A), d = A(V.D), e = A(V.E);
    const flyY = V.A === 'space' ? 600 : 420;
    section(kind, nth, [
      /* "Zoom, zoom, Kid-do-verse!" */
      { b: 4, w: V.A, cam: V.camA || 'wide', flash: V.flash || 0, punch: 2, A: [a('zoom', 0, .85, { y: flyY, mv: 'zoomer', pass: RIDERS, go: { x: 1250, d: 2, ease: 'power1.out' } })],
        P: (T, t1) => [['speed', 'front', T(0), t1, 1, 14], ['text', 'front', 620, 330, 'ZOOM!', T(0), '#FFE14D', 160, -8, .45], ['text', 'front', 1250, 420, 'ZOOM!', T(1), '#7BE8FF', 160, 7, .45], ['text', 'front', 960, 250, 'KIDDOVERSE!', T(2), '#FFFFFF', 140, 0, 1.3], ['burst', 'front', 960, 300, T(2), '#FFE14D', 260]] },
      /* "Hop on board, let's go!" */
      { b: 4, w: V.A, cam: 'wideIn', A: [a('zoom', 960, 1.12, { y: flyY + 120, mv: 'zoomer', pass: RIDERS })], P: (T, t1) => [['notes', 'front', 960, 380, T(0), t1], ['sparkles', 'front', 960, 420, T(2), 6, 420, 40]] },
      /* "Zoom, zoom, Kiddoverse! Clap clap, here we go!" */
      { b: 8, w: V.D, cam: V.camC || [960, 560, 1, 960, 520, 1.1], punch: 1, A: crew(V.D, .8, 'dance'),
        P: (T, t1) => [['confetti', 'front', T(2), T(7), 30], ['sparkles', 'front', 960, 420, T(4), 6, 520, 38], ['sparkles', 'front', 960, 420, T(4.5), 6, 520, 38], ['notes', 'front', 960, 300, T(0), t1]] },
      /* "Round the stars and back again," */
      { b: 4, w: V.A === 'finale' ? 'finale' : 'space', cam: 'wide', A: [A('space')('zoom', -200, .8, { y: 620, mv: 'zoomer', pass: RIDERS })], fx: [(g, c) => { const a = c.acts[0]; arc(-250, 780, 2150, 780, -300, c.t0, c.t1)(a, 0, 0, c.tl); c.P.sparkles(c.front, 960, 420, c.T(1), 8, 700, 40); }] },
      /* "everybody's welcome in!" */
      { b: 4, w: V.E, cam: 'wideIn', A: crewArc(V.E, .84, 'wave'), P: (T) => [['text', 'front', 960, 270, 'WELCOME!', T(2.4), '#FFE14D', 130, -4, 1.4], ['hearts', 'front', 960, 430, T(2), 7], ['sparkles', 'front', 960, 450, T(2.5), 8, 760, 36]] },
      /* "Zoom, zoom, Kiddoverse!" */
      { b: 4, w: V.D, cam: 'low', punch: 1, A: crewV(V.D, 'cheer', { jumps: [0, 2] }), P: (T) => [['fireworks', 'back', 520, 330, T(2), '#FFE14D', 240], ['fireworks', 'back', 1400, 300, T(2.2), '#FF9BD0', 220], ['confetti', 'front', T(2), T(4), 24]] },
      /* "Let's go, let's go," */
      { b: 2, w: V.D, cam: { face: 0, z: [1.5, 1.7], dx: 140 }, A: [A(V.D)('kiko', 760, 1.0, { mv: 'cheer', sing: 1 }), A(V.D)('luma', 1100, 1.0, { mv: 'cheer', sing: 1 })] },
      /* "let's go!" -> bus blasts toward camera */
      { b: 2, w: V.A, cam: 'wide', A: [a('zoom', 960, .5, { y: flyY + 180, mv: 'zoomer', fn: [(a2, t0, t1, tl) => tl.fromTo(a2.g, { scaleX: .45, scaleY: .45 }, { scaleX: 2.3, scaleY: 2.3, duration: t1 - t0, ease: 'power2.in' }, t0)] })], P: (T, t1) => [['speed', 'front', T(0), t1, 1, 18]] },
    ]);
  }
  chorus('chorus', 0, { A: 'space', D: 'hub', E: 'hub' });
  chorus('chorus', 1, { A: 'hills', D: 'hills', E: 'hills', camA: 'panR', flash: .9 });
  chorus('chorus', 2, { A: 'dino', D: 'dino', E: 'cloud', camA: 'panL', flash: .9 });

  /* =========================================================================================== V1  Rainbow Hills (colors) */
  (function () {
    const h = A('hills');
    section('v1', 0, [
      { b: 4, w: 'hills', cam: [900, 540, 1, 980, 540, 1.08], flash: .9, A: [h('zoom', -300, .72, { y: FL.hills, mv: 'zoomer', go: { x: 520, d: 1.6, ease: 'power2.out' } }), h('kiko', 1160, 1.0, { mv: 'wave', sing: 1 }), h('luma', 1440, 1.0, { sing: 1 })], P: (T) => [['banner', 'over', 'RAINBOW HILLS', 'NEXT STOP · WORLD 1', T(0), T(4), '#FF9F43']] },
      { b: 4, w: 'hills', cam: { face: 0, z: [1.5, 1.65], dx: 160, dy: -20 }, A: [h('kiko', 800, 1.0, { sing: 1, eye: 'wide', look: [0, -14] }), h('luma', 1100, 1.0, { sing: 1, eye: 'wide', look: [0, -14] })], P: (T) => [['sparkles', 'front', 960, 300, T(1), 4, 260, 30]] },
      { b: 8, w: 'hills', cam: 'up', A: [h('kiko', 700, 1.0, { mv: 'cheer', sing: 1 }), h('luma', 1220, 1.0, { mv: 'cheer', sing: 1 })],
        P: (T) => [['chip', 'over', 960, 222, 'RED', '#FF3B5C', T(0), 78], ...[[300, 'red', 0], [560, 'red', .25], [900, 'red', .5], [1240, 'red', .2], [1520, 'red', .45], [1760, 'red', .7]].map(([x, , dl], i) => ['balloon', 'back', x, 330 + (i % 3) * 90, '#FF3B5C', T(0), T(8), dl]), ['sparkles', 'front', 960, 380, T(2), 8, 760, 34], ['sparkles', 'front', 960, 380, T(5), 8, 760, 34]] },
      { b: 4, w: 'hills', cam: 'up', A: [h('luma', 900, .95, { mv: 'wave', sing: 1 }), h('bloop', 1240, .8, { mv: 'cheer', sing: 1 })], P: (T) => [['chip', 'over', 960, 222, 'YELLOW', '#FFC21F', T(0), 78], ['sun', 'back', 1500, 250, 120, T(2)], ['sparkles', 'front', 1500, 250, T(2.2), 8, 220, 34]] },
      { b: 4, w: 'hills', cam: 'wide', A: [h('bloop', 640, .9, { mv: 'cheer', sing: 1 }), h('rumble', 1180, .85, { mv: 'dance', sing: 1 })], P: (T, t1) => [['chip', 'over', 960, 222, 'BLUE', '#3C8DFF', T(1), 78], ['water', 'back', 760, T(0.5), t1], ['sparkles', 'front', 960, 800, T(2), 8, 760, 34]] },
      { b: 4, w: 'hills', cam: 'wideIn', A: [h('kiko', 760, 1.0, { mv: 'dance', sing: 1 }), h('luma', 1160, 1.0, { mv: 'dance', sing: 1 })], P: (T) => [['chip', 'over', 960, 222, 'GREEN', '#2FBF5A', T(0), 78], ['grass', 'back', 880, T(0), 14]] },
      { b: 4, w: 'hills', cam: [960, 560, 1, 960, 520, 1.08], punch: 1, A: crewV('hills', 'dance'), P: (T) => [['confetti', 'front', T(3), T(4), 26], ['sparkles', 'front', 960, 400, T(3), 10, 760, 38]] },
    ]);
  })();

  /* =========================================================================================== V2  Dino Valley (counting) */
  (function () {
    const d = A('dino'), EX = [700, 940, 1180, 1420, 1660], EC = ['#7ED957', '#FFB84D', '#4CC9F0', '#FF9BD0', '#B06BFF'];
    const eggs = (T, spec) => EX.map((x, i) => ['egg', 'back', x, 900, i + 1, ...spec(i, T)]);
    section('v2', 0, [
      { b: 4, w: 'dino', cam: [900, 540, 1, 1000, 540, 1.08], flash: .9, A: [d('rumble', 380, 1.15, { mv: 'bob', sing: 1, walk: true, go: { x: 960, d: 1.9, ease: 'power1.out' } })], P: (T) => [['banner', 'over', 'DINO VALLEY', 'NEXT STOP · WORLD 2', T(0), T(4), '#4CD964']] },
      { b: 4, w: 'dino', cam: { face: 0, z: [1.05, 1.2] }, A: [d('rumble', 960, 1.4, { mv: 'bob', sing: 1 })], fx: [shake(1, 2, 3)], P: (T) => [['text', 'front', 560, 420, 'STOMP!', T(1), '#FF9F43', 130, -10, .38], ['text', 'front', 1380, 520, 'STOMP!', T(2), '#FFE14D', 130, 9, .38], ['text', 'front', 960, 340, 'STOMP!', T(3), '#FF5E7E', 150, -4, .38]] },
      { b: 4, w: 'dino', cam: 'wide', A: [d('rumble', 360, 1.0, { mv: 'bob', sing: 1 })], P: (T) => [...eggs(T, (i) => [T(.2 + i * .25), i === 0 ? T(3) : null, null, EC[i]])] },
      { b: 4, w: 'dino', cam: 'wideIn', A: [d('rumble', 360, 1.0, { mv: 'bob', sing: 1 })], P: (T) => [...eggs(T, (i) => [T(0), i === 1 ? T(0) : i === 2 ? T(1) : i === 0 ? T(2.2) : null, null, EC[i]])] },
      { b: 4, w: 'dino', cam: 'wide', A: [d('rumble', 360, 1.0, { mv: 'cheer', sing: 1 })], P: (T) => eggs(T, (i) => [T(0), null, i === 0 ? T(0.05) : i === 1 ? T(1.5) : i === 2 ? T(3) : null, EC[i], 'whole']) },
      { b: 4, w: 'dino', cam: 'wideIn', A: [d('rumble', 360, 1.0, { mv: 'cheer', sing: 1 })], P: (T) => eggs(T, (i) => [T(0), null, i === 3 ? T(.5) : i === 4 ? T(2) : null, EC[i], i < 3 ? 'hatched' : 'whole']) },
      { b: 4, w: 'dino', cam: [960, 540, 1.0, 960, 480, 1.18], A: [d('rumble', 360, 1.05, { mv: 'dance', sing: 1 })], P: (T) => eggs(T, (i) => [T(0), null, null, EC[i], 'hatched']).concat([['sparkles', 'front', 1180, 700, T(1), 8, 560, 34]]) },
      { b: 4, w: 'dino', cam: [960, 540, 1.05, 960, 480, 1.18], punch: 1, A: [d('rumble', 360, 1.05, { mv: 'dance', sing: 1 })], P: (T) => eggs(T, (i) => [T(0), null, null, EC[i], 'hatched']).concat([['confetti', 'front', T(1.5), T(4), 30], ['hearts', 'front', 960, 500, T(1.6), 7]]) },
    ]);
  })();

  /* =========================================================================================== V3  Cloud Kingdom (feelings) */
  (function () {
    const c = A('cloud');
    section('v3', 0, [
      { b: 4, w: 'cloud', cam: [900, 540, 1, 960, 520, 1.1], flash: .9, A: [c('nimbus', 960, 1.25, { mv: 'bob', sing: 1, eye: 'open', fn: [glowOn('#FFE27A', .85, .4)] })], P: (T) => [['banner', 'over', 'CLOUD KINGDOM', 'NEXT STOP · WORLD 3', T(0), T(4), '#5CC8FF']] },
      { b: 4, w: 'cloud', cam: { face: 0, z: [1.7, 1.95] }, A: [c('nimbus', 960, 1.3, { mv: 'bob', sing: 1, fn: [glowOn('#FFE27A', .9, 0)] })], P: (T) => [['sun', 'back', 1450, 300, 90, T(1)], ['sparkles', 'front', 960, 380, T(1.5), 9, 300, 34]] },
      { b: 4, w: 'cloud', cam: 'wideIn', A: [c('nimbus', 960, 1.25, { mv: 'sway', sing: 1, fn: [(a, t0, t1, tl) => { M().eye(a, t0, 'open'); tl.to(a.browL, { rotation: -14, y: -4, duration: .2 }, t0 + .1); tl.to(a.browR, { rotation: 14, y: -4, duration: .2 }, t0 + .1); }] })],
        fx: [(g, cx) => { cx.P.tint(cx.over, '#26397A', .35, cx.t0, cx.t1); cx.P.rcloud(cx.front, 960, 330, 1.2, cx.T(.4), cx.t1, true); }] },
      { b: 4, w: 'cloud', cam: { face: 0, z: [1.7, 1.9] }, A: [c('nimbus', 960, 1.3, { mv: 'sway', sing: 1 })],
        fx: [(g, cx) => { cx.P.tint(cx.over, '#26397A', .35, cx.t0, cx.t1); cx.P.rcloud(cx.front, 960, 160, 1.3, cx.T(0), cx.t1, true); }] },
      { b: 4, w: 'cloud', cam: 'wide', A: [c('kiko', 520, .95, { sing: 1 }), c('nimbus', 960, 1.1, { sing: 1 }), c('luma', 1400, .95, { sing: 1 })], P: (T) => [['ring', 'back', 960, 620, 150, T(0), T(4), '#fff'], ['text', 'front', 960, 280, 'IN...', T(0.1), '#FFFFFF', 100, 0, 1.2], ['text', 'front', 960, 280, 'OUT...', T(2), '#FFE14D', 100, 0, 1.6]] },
      { b: 4, w: 'cloud', cam: 'wideIn', A: [c('kiko', 520, .95, { sing: 1 }), c('nimbus', 960, 1.1, { sing: 1 }), c('luma', 1400, .95, { sing: 1 })], P: (T) => [['badge', 'over', 760, 240, 1, T(.5), '#FF5E7E', 90], ['badge', 'over', 1160, 240, 2, T(1.5), '#FFB938', 90], ['ring', 'back', 960, 620, 150, T(0), T(4), '#fff']] },
      { b: 4, w: 'cloud', cam: [960, 560, 1.08, 960, 520, 1.3], A: [c('kiko', 760, 1.0, { mv: 'sway', sing: 1 }), c('nimbus', 960, 1.1, { sing: 1, mv: 'sway' }), c('luma', 1180, 1.0, { mv: 'sway', sing: 1 })], P: (T) => [['hearts', 'front', 960, 420, T(.2), 7], ['hearts', 'front', 960, 380, T(2), 7]] },
      { b: 4, w: 'cloud', cam: 'wideIn', punch: 1, A: [c('kiko', 520, .9, { mv: 'cheer', sing: 1 }), c('nimbus', 960, 1.2, { mv: 'bob', sing: 1, fn: [glowOn('#FFE27A', .9, .3)] }), c('luma', 1400, .9, { mv: 'cheer', sing: 1 }), c('bloop', 1700, .7, { mv: 'cheer', sing: 1 })], P: (T) => [['sun', 'back', 960, 260, 150, T(1.2)], ['sparkles', 'front', 960, 420, T(1.5), 12, 760, 38], ['confetti', 'front', T(2), T(4), 18]] },
    ]);
  })();

  /* =========================================================================================== DANCE BREAK  "The Kiddo Wiggle" */
  (function () {
    const D = A('disco'), C6 = (mv, o = {}) => crew('disco', .8, mv, Object.assign({ sing: 1 }, o));
    const wig = (dir) => (a, t0, t1, tl) => { for (let b = 0; b < (t1 - t0) / BEAT - .01; b++) { const k = (b < 2 ? -dir : dir) * (b % 1 ? 1 : 1); tl.to(a.sq, { rotation: (b < 2 ? -1 : 1) * 10 * dir, x: (b < 2 ? -1 : 1) * 36 * dir, duration: .16, ease: 'sine.inOut' }, t0 + b * BEAT); tl.to(a.sq, { rotation: (b < 2 ? 1 : -1) * 10 * dir, x: (b < 2 ? 1 : -1) * 36 * dir, duration: .2, ease: 'sine.inOut' }, t0 + b * BEAT + .17); } tl.to(a.sq, { rotation: 0, x: 0, duration: .15 }, t1 - .15); };
    const spinJump = (a, t0, t1) => { M().jump(a, t0, 140); M().spin(a, t0 + BEAT * 2, .5); M().jump(a, t0 + BEAT * 2, 70, false); };
    const clapStomp = (a, t0, t1, tl) => { [0, .5].forEach((b) => { if (a.armL) { tl.to(a.armL, { rotation: -75, duration: .08 }, t0 + b * BEAT - .05); tl.to(a.armR, { rotation: 75, duration: .08 }, t0 + b * BEAT - .05); tl.to([a.armL, a.armR], { rotation: 0, duration: .12 }, t0 + b * BEAT + .06); } }); [2, 2.5].forEach((b, i) => { M().hop(a, t0 + b * BEAT, 22, 1.8); if (a.legL) { tl.to(i ? a.legR : a.legL, { rotation: i ? -28 : 28, duration: .1 }, t0 + b * BEAT - .05); tl.to([a.legL, a.legR], { rotation: 0, duration: .12 }, t0 + b * BEAT + .1); } }); };
    const stage = (T) => [['spot', 'back', 300, '#FF5E7E', T(0), T(8), 0], ['spot', 'back', 700, '#4CC9F0', T(0), T(8), 6], ['spot', 'back', 1250, '#FFD23F', T(0), T(8), 0], ['spot', 'back', 1650, '#B06BFF', T(0), T(8), 6]];
    section('dance', 0, [
      { b: 4, w: 'disco', cam: 'wideIn', flash: .9, A: [D('kiko', 960, 1.2, { mv: 'dance' }), D('luma', 560, .9, { mv: 'dance' }), D('bloop', 1360, .85, { mv: 'dance' })], P: (T, t1) => [...stage(T), ['text', 'front', 960, 300, 'KIDDO WIGGLE!', T(1.2), '#FFE14D', 150, -5, 1.8], ['confetti', 'front', T(0), T(4), 24]] },
      { b: 4, w: 'disco', cam: 'wide', A: C6('bob', { fn: [wig(1)] }), P: (T) => [...stage(T), ['chip', 'over', 560, 222, 'LEFT', '#FF5E7E', T(0), 76], ['chip', 'over', 1360, 222, 'RIGHT', '#4CC9F0', T(2), 76]] },
      { b: 4, w: 'disco', cam: { face: 0, z: [1.3, 1.45], dx: 0 }, A: [D('bloop', 760, 1.0, { sing: 1, fn: [wig(1)] }), D('rumble', 1180, .95, { sing: 1, fn: [wig(1)] })], P: (T) => stage(T) },
      { b: 4, w: 'disco', cam: 'wideIn', A: C6('bob', { fn: [spinJump] }), P: (T) => [...stage(T), ['chip', 'over', 560, 222, 'JUMP UP HIGH!', '#FFB938', T(0), 70], ['chip', 'over', 1360, 222, 'SPIN AROUND!', '#B06BFF', T(2), 70]] },
      { b: 4, w: 'disco', cam: 'low', A: crewV('disco', 'bob', { fn: [spinJump] }), P: (T) => [...stage(T), ['sparkles', 'front', 960, 420, T(0.2), 8, 800, 36], ['sparkles', 'front', 960, 420, T(2.2), 8, 800, 36]] },
      { b: 4, w: 'disco', cam: 'wide', A: C6('bob', { fn: [clapStomp] }), fx: [shake(2, 2.5)], P: (T) => [...stage(T), ['chip', 'over', 560, 222, 'CLAP CLAP!', '#4CD964', T(0), 76], ['chip', 'over', 1360, 222, 'STOMP STOMP!', '#FF9F43', T(2), 76]] },
      { b: 4, w: 'disco', cam: { face: 0, z: [1.2, 1.35] }, A: [D('kiko', 700, 1.0, { sing: 1, fn: [clapStomp] }), D('luma', 1100, 1.0, { sing: 1, fn: [clapStomp] }), D('gizmo', 1450, .9, { sing: 1, fn: [clapStomp] })], fx: [shake(2, 2.5)], P: (T) => stage(T) },
      { b: 4, w: 'disco', cam: 'wide', A: crew('disco', .8, 'still', { sing: 0, eye: 'wide' }), P: (T, t1) => [...stage(T).slice(0, 2), ['tint', 'over', '#9BE7FF', .4, T(0), t1], ['text', 'over', 960, 480, 'FREEZE!', T(0), '#FFFFFF', 230, -4, 1.9]],
        fx: [(g, c) => c.acts.forEach((a, i) => { c.tl.set(a.sq, { rotation: (i % 2 ? 6 : -6) }, c.t0 + .05); c.tl.set(a.armL || a.sq, { rotation: i % 2 ? -140 : 40 }, c.t0 + .05); })] },
    ]);
  })();

  /* =========================================================================================== V4  Robot Workshop (shapes) */
  (function () {
    const w = A('workshop'), CH = (kind, x, y, s, col, T0) => ['shape', 'front', kind, x, y, s, col, T0, true];
    section('v4', 0, [
      { b: 4, w: 'workshop', cam: [940, 540, 1, 980, 540, 1.08], flash: .9, A: [w('gizmo', 960, 1.15, { mv: 'bob', sing: 1 })], P: (T, t1) => [['banner', 'over', 'ROBOT WORKSHOP', 'NEXT STOP · WORLD 4', T(0), T(4), '#5B8CFF'], CH('circle', 520, 470, 90, '#FF5E7E', T(0)), CH('circle', 1400, 470, 90, '#FFC21F', T(2)), ['chip', 'over', 960, 226, 'CIRCLE', '#FF5E7E', T(0), 70]] },
      { b: 4, w: 'workshop', cam: 'wide', A: [w('zoom', -300, .72, { mv: 'zoomer', go: { x: 1350, d: 3.2, ease: 'power1.out' } }), w('gizmo', 460, 1.0, { mv: 'cheer', sing: 1 })], P: (T) => [['sparkles', 'front', 1300, 700, T(2), 6, 300, 34]] },
      { b: 4, w: 'workshop', cam: 'wideIn', A: [w('gizmo', 960, 1.15, { mv: 'bob', sing: 1 })], P: (T) => [CH('square', 520, 470, 80, '#4CC9F0', T(0)), CH('square', 1400, 470, 80, '#B06BFF', T(1)), ['chip', 'over', 960, 226, 'SQUARE', '#4CC9F0', T(0), 70]] },
      { b: 4, w: 'workshop', cam: 'wide', A: [w('bloop', 480, .85, { mv: 'cheer', sing: 1 }), w('rumble', 1480, .9, { mv: 'cheer', sing: 1 })],
        fx: [(g, c) => { [[820, 4, '#4CC9F0', 2], [1100, 3, '#B06BFF', 2.5], [960, 5, '#FFC21F', 3]].forEach(([x, k, col, b], i) => { const p = c.P.shape(c.front, 'square', x, 820 - (i === 2 ? 150 : 0), 70, col, c.T(b)); c.tl.fromTo(p, { y: -900 }, { y: 0, duration: .55, ease: 'bounce.out' }, c.T(b)); c.P.sparkles(c.front, x, 800, c.T(b + .5), 3, 80, 26); }); }] },
      { b: 4, w: 'workshop', cam: 'wideIn', A: [w('gizmo', 960, 1.15, { mv: 'bob', sing: 1 })], P: (T) => [CH('triangle', 520, 470, 85, '#FF9F43', T(0)), CH('triangle', 1400, 470, 85, '#4CD964', T(2)), ['chip', 'over', 960, 226, 'TRIANGLE', '#FF9F43', T(0), 70]] },
      { b: 4, w: 'workshop', cam: 'wide', A: [w('kiko', 420, .95, { mv: 'cheer', sing: 1 }), w('luma', 1500, .95, { mv: 'cheer', sing: 1 })],
        fx: [(g, c) => { const sq = c.P.shape(c.front, 'square', 960, 820, 110, '#4CC9F0', c.T(0)); const tr = c.P.shape(c.front, 'triangle', 960, 620, 120, '#FF5E7E', c.T(1.6)); c.tl.fromTo(tr, { y: -900 }, { y: 0, duration: .6, ease: 'bounce.out' }, c.T(1.6)); c.P.sparkles(c.front, 960, 640, c.T(2.2), 8, 220, 34); }] },
      { b: 4, w: 'workshop', cam: 'wideIn', A: [w('gizmo', 960, 1.15, { mv: 'bob', sing: 1 })], P: (T) => [CH('star', 520, 470, 85, '#FFD23F', T(0)), CH('star', 1400, 470, 85, '#FF9BD0', T(2)), ['chip', 'over', 960, 226, 'STAR', '#FFB938', T(0), 70]] },
      { b: 4, w: 'workshop', cam: [960, 560, 1, 960, 520, 1.1], punch: 1, A: crew('workshop', .8, 'dance'), P: (T) => [CH('star', 300, 300, 60, '#FFD23F', T(0)), CH('star', 1620, 300, 60, '#FF9BD0', T(.3)), CH('star', 960, 200, 70, '#7BE8FF', T(.6)), ['confetti', 'front', T(2), T(4), 26], ['sparkles', 'front', 960, 400, T(2), 12, 800, 38]] },
    ]);
  })();

  /* =========================================================================================== BRIDGE  "Everyone's a star" */
  (function () {
    const h = A('hub'), plan = (T, x, y, r, col) => ['shape', 'back', 'circle', x, y, r, col, T(0), false];
    section('bridge', 0, [
      { b: 8, w: 'hub', cam: [960, 540, 1.14, 960, 540, 1], A: [h('rumble', 560, 1.35, { mv: 'sway', sing: 1 }), h('bloop', 1010, .6, { mv: 'sway', sing: 1 }), h('kiko', 1500, .38, { y: 780, mv: 'sway', sing: 1 })], P: (T) => [['chip', 'over', 560, 226, 'BIG', '#FF9F43', T(0), 66], ['chip', 'over', 1010, 226, 'small', '#4CC9F0', T(1), 56], ['chip', 'over', 1500, 226, 'far', '#B06BFF', T(4.2), 56]] },
      { b: 8, w: 'hub', cam: 'wideIn', A: crew('hub', .8, 'sway'), fx: [(g, c) => XS.forEach((x, i) => { const p = c.P.star(c.front, x, 300 + (i % 2) * 20, 46, ['#FFD23F', '#FF9BD0', '#7BE8FF', '#4CD964', '#FFB938', '#B06BFF'][i], c.T(1 + i * .7), false); }), (g, c) => { c.P.sparkles(c.front, 960, 300, c.T(5), 14, 820, 42); c.P.burst(c.front, 960, 400, c.T(5), '#FFE14D', 360); }] },
      { b: 4, w: 'space', cam: 'wideOut', A: [h('kiko', 480, .7, { y: 650, sing: 1, mv: 'sway' }), h('luma', 960, .7, { y: 520, sing: 1, mv: 'sway' }), h('bloop', 1440, .6, { y: 700, sing: 1, mv: 'sway' })], P: (T) => [plan(T, 480, 830, 170, '#FF9BD0'), plan(T, 960, 700, 150, '#7BE8FF'), plan(T, 1440, 860, 160, '#FFC21F'), ['chip', 'over', 960, 226, 'FRIENDS FROM EVERYWHERE!', '#8E6BFF', T(1), 56]] },
      { b: 4, w: 'space', cam: 'wideIn', A: [h('rumble', 480, .7, { y: 650, sing: 1, mv: 'sway' }), h('gizmo', 960, .7, { y: 560, sing: 1, mv: 'sway' }), h('nimbus', 1440, .7, { y: 700, sing: 1, mv: 'sway' })], P: (T) => [plan(T, 480, 830, 170, '#B6F36B'), plan(T, 960, 700, 150, '#8FB4F5'), plan(T, 1440, 880, 170, '#E4F1FF'), ['sparkles', 'front', 960, 400, T(1), 8, 800, 38]] },
      { b: 4, w: 'space', cam: 'wide', A: [A('space')('zoom', 960, 1.0, { y: 760, mv: 'zoomer', pass: RIDERS, sing: 1 })], P: (T, t1) => [['notes', 'front', 960, 360, T(0), t1], ['sparkles', 'front', 960, 400, T(2), 8, 520, 38]] },
      { b: 4, w: 'finale', cam: [960, 560, 1, 960, 500, 1.12], A: crew('finale', .8, 'sway'), fx: [(g, c) => { c.P.glowStar(c.back, 960, 300, 120, c.T(0), c.t1); c.P.hearts(c.front, 960, 520, c.T(1.5), 7); c.P.sparkles(c.front, 960, 420, c.T(2.5), 14, 800, 42); }] },
    ]);
  })();

  /* =========================================================================================== FINAL CHORUSES (key change +2) */
  chorus('fin', 0, { A: 'space', D: 'finale', E: 'finale', flash: .95 });
  (function () {                                       // fin2: same energy, but last bar is the big KIDDOVERSE! hit
    const f = A('finale'), flyY = 600;
    const shots = [];
    section('fin2', 0, [
      { b: 4, w: 'finale', cam: 'wide', flash: .9, punch: 2, A: [A('space')('zoom', 0, .85, { y: flyY, mv: 'zoomer', pass: RIDERS, go: { x: 1250, d: 2, ease: 'power1.out' } })], P: (T, t1) => [['speed', 'front', T(0), t1, 1, 14], ['text', 'front', 620, 330, 'ZOOM!', T(0), '#FFE14D', 160, -8, .45], ['text', 'front', 1250, 420, 'ZOOM!', T(1), '#7BE8FF', 160, 7, .45], ['fireworks', 'back', 960, 300, T(2), '#FFE14D', 300], ['text', 'front', 960, 250, 'KIDDOVERSE!', T(2), '#FFFFFF', 140, 0, 1.3]] },
      { b: 4, w: 'finale', cam: 'wideIn', A: [f('zoom', 960, 1.12, { y: 760, mv: 'zoomer', pass: RIDERS })], P: (T, t1) => [['notes', 'front', 960, 380, T(0), t1], ['fireworks', 'back', 400, 300, T(1), '#FF9BD0', 240], ['fireworks', 'back', 1520, 320, T(2), '#7BE8FF', 240]] },
      { b: 8, w: 'finale', cam: [960, 560, 1, 960, 500, 1.12], punch: 1, A: crew('finale', .85, 'dance'), P: (T, t1) => [['confetti', 'front', T(0), T(8), 34], ['fireworks', 'back', 520, 300, T(2), '#FFE14D', 260], ['fireworks', 'back', 1400, 280, T(3.5), '#FF9BD0', 240], ['fireworks', 'back', 960, 240, T(5), '#7BE8FF', 280], ['sparkles', 'front', 960, 420, T(4), 8, 800, 40]] },
      { b: 4, w: 'space', cam: 'wide', A: [A('space')('zoom', -200, .8, { y: 620, mv: 'zoomer', pass: RIDERS })], fx: [(g, c) => { arc(-250, 780, 2150, 780, -300, c.t0, c.t1)(c.acts[0], 0, 0, c.tl); c.P.sparkles(c.front, 960, 420, c.T(1), 8, 700, 40); }] },
      { b: 4, w: 'finale', cam: 'wideIn', A: crewArc('finale', .84, 'wave'), P: (T) => [['hearts', 'front', 960, 430, T(2), 8], ['sparkles', 'front', 960, 450, T(2.5), 10, 820, 36]] },
      { b: 4, w: 'finale', cam: 'low', punch: 1, A: crewV('finale', 'cheer', { jumps: [0, 2] }), P: (T) => [['fireworks', 'back', 520, 330, T(0), '#FFE14D', 260], ['fireworks', 'back', 1400, 300, T(2), '#FF9BD0', 240], ['confetti', 'front', T(2), T(4), 24]] },
      { b: 4, w: 'finale', cam: [960, 540, 1.4, 960, 500, 1.0], punch: 2, flash: .9, A: crew('finale', .85, 'cheer', { jumps: [0, 1, 2, 3] }),
        P: (T) => [['text', 'front', 960, 300, 'KIDDOVERSE!', T(0), '#FFFFFF', 220, 0, 3.2], ['burst', 'front', 960, 320, T(0), '#FFE14D', 420], ['fireworks', 'back', 500, 280, T(.5), '#FFE14D', 280], ['fireworks', 'back', 1420, 280, T(1), '#FF9BD0', 280], ['fireworks', 'back', 960, 220, T(1.5), '#7BE8FF', 320], ['confetti', 'front', T(0), T(4), 40]] },
    ]);
  })();

  /* =========================================================================================== OUTRO */
  (function () {
    const h = A('hub');
    section('outro', 0, [
      { b: 4, w: 'hub', cam: 'wideIn', flash: .6, A: [...crew('hub', .72, 'wave', { sing: 1 }).slice(0, 5), h('zoom', 1700, .5, { f: 1, mv: 'bob' })], P: (T) => [['hearts', 'front', 960, 420, T(1.5), 6]] },
      { b: 4, w: 'hub', cam: { face: 0, z: [1.4, 1.55], dx: 130 }, A: [h('kiko', 780, 1.05, { mv: 'wave' }), h('luma', 1140, 1.05, { mv: 'wave' })], P: (T) => [['hearts', 'front', 960, 380, T(.3), 6], ['sparkles', 'front', 960, 400, T(2), 10, 520, 36]] },
      { b: 4, w: 'space', cam: 'wideOut', A: [A('space')('zoom', 700, 1.0, { y: 640, mv: 'zoomer', pass: RIDERS, fn: [(a, t0, t1, tl) => { tl.fromTo(a.g, { x: 700, scaleX: 1.0, scaleY: 1.0 }, { x: 1700, scaleX: .18, scaleY: .18, duration: t1 - t0, ease: 'power2.in' }, t0); tl.to(a.g, { y: 420, duration: t1 - t0, ease: 'power2.in' }, t0); }] })], P: (T, t1) => [['speed', 'front', T(0), t1, 1, 10], ['sparkles', 'front', 1500, 520, T(2), 10, 360, 30]] },
      { b: 12, w: 'hub', cam: [960, 520, 1.12, 960, 540, 1], A: crew('hub', .72, 'wave', { sing: 0 }), P: (T) => [['hearts', 'front', 960, 420, T(1), 7], ['sparkles', 'front', 960, 450, T(3), 10, 820, 36], ['sparkles', 'front', 960, 450, T(7), 10, 820, 36]] },
    ]);
  })();

  SB.sort((a, b) => a.t0 - b.t0);
  window.SB = SB;
})();
