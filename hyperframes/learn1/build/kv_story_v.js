/* KiddoVerse vertical (9:16) shorts storyboard. Local time starts at 0; world coords are the same 1920x1080 painting, camera shows a phone-shaped window. */
(function () {
  const SONG = window.SONG, BEAT = 60 / SONG.bpm;
  const FL = { hub: 905, hills: 905, dino: 910, cloud: 915, workshop: 925, disco: 930, finale: 905, space: 1000 };
  const A = (w) => (c, x, s = 1, o = {}) => Object.assign({ c, x, y: FL[w], s }, o);
  const M = () => window.__KVM, RIDERS = ['kiko', 'luma', 'bloop'];
  const V = [960, 700, 1.62, 960, 688, 1.72], VW = [960, 700, 1.7, 960, 688, 1.62];
  const board = (shots) => { let b = 0; const out = shots.map((sh) => { const o = Object.assign({ sec: 'v' }, sh, { t0: b * BEAT, t1: (b + sh.b) * BEAT }); b += sh.b; return o; }); if (Math.abs(b * BEAT - SONG.duration) > .01) throw new Error(`short board is ${b * BEAT}s, audio is ${SONG.duration}s`); return out; };
  const shake = (...bs) => (g, c) => bs.forEach((b) => { window.__LOG(c.T(b), 'thud'); for (let i = 0; i < 6; i++) c.tl.to(c.punch, { x: (i % 2 ? 1 : -1) * 14 * (1 - i / 6), y: (i % 2 ? -1 : 1) * 10 * (1 - i / 6), duration: .045 }, c.T(b) + i * .045); c.tl.to(c.punch, { x: 0, y: 0, duration: .05 }, c.T(b) + .28); });
  const arc = (x0, y0, x1, y1, dip, t0, t1) => (a, _a, _b, tl) => { const N = 14; for (let i = 0; i < N; i++) { const k0 = i / N, k1 = (i + 1) / N, X = (k) => x0 + (x1 - x0) * k, Y = (k) => y0 + (y1 - y0) * k + dip * Math.sin(Math.PI * k); tl.fromTo(a.g, { x: X(k0), y: Y(k0) }, { x: X(k1), y: Y(k1), duration: (t1 - t0) / N, ease: 'none' }, t0 + (t1 - t0) * k0); tl.to(a.sq, { rotation: Math.atan2(Y(k1) - Y(k0), X(k1) - X(k0)) * 180 / Math.PI * .6, duration: (t1 - t0) / N, ease: 'none' }, t0 + (t1 - t0) * k0); } };
  const stage = (T) => [['spot', 'back', 700, '#FF5E7E', T(0), T(8), 0], ['spot', 'back', 960, '#4CC9F0', T(0), T(8), 6], ['spot', 'back', 1230, '#FFD23F', T(0), T(8), 0]];
  const wig = (dir) => (a, t0, t1, tl) => { for (let b = 0; b < (t1 - t0) / BEAT - .01; b++) { tl.to(a.sq, { rotation: (b < 2 ? -1 : 1) * 10 * dir, x: (b < 2 ? -1 : 1) * 30 * dir, duration: .16, ease: 'sine.inOut' }, t0 + b * BEAT); tl.to(a.sq, { rotation: (b < 2 ? 1 : -1) * 10 * dir, x: (b < 2 ? 1 : -1) * 30 * dir, duration: .2, ease: 'sine.inOut' }, t0 + b * BEAT + .17); } tl.to(a.sq, { rotation: 0, x: 0, duration: .15 }, t1 - .15); };
  const spinJump = (a, t0) => { M().jump(a, t0, 130); M().spin(a, t0 + BEAT * 2, .5); M().jump(a, t0 + BEAT * 2, 70, false); };
  const clapStomp = (a, t0, t1, tl) => { [0, .5].forEach((b) => { if (a.armL) { tl.to(a.armL, { rotation: -75, duration: .08 }, t0 + b * BEAT - .05); tl.to(a.armR, { rotation: 75, duration: .08 }, t0 + b * BEAT - .05); tl.to([a.armL, a.armR], { rotation: 0, duration: .12 }, t0 + b * BEAT + .06); } }); [2, 2.5].forEach((b, i) => { M().hop(a, t0 + b * BEAT, 22, 1.8); if (a.legL) { tl.to(i ? a.legR : a.legL, { rotation: i ? -28 : 28, duration: .1 }, t0 + b * BEAT - .05); tl.to([a.legL, a.legR], { rotation: 0, duration: .12 }, t0 + b * BEAT + .1); } }); };
  const CH = 'chip';
  const BOARDS = {};

  /* ============================================================ HOOK — "Zoom, zoom, Kiddoverse!" (3-2-1 + chorus) 18 s */
  (function () {
    if ('__SHORT__' !== 'hook') return;
    const h = A('hub'), sp = A('space');
    BOARDS.hook = board([
      { b: 1, w: 'hub', cam: { face: 0, z: [2.0, 2.15] }, A: [h('kiko', 960, 1.0, { mv: 'cheer' })], P: (T) => [['badge', 'over', 800, 640, 3, T(0), '#FF5E7E', 150]] },
      { b: 1, w: 'hub', cam: { face: 0, z: [2.0, 2.15] }, A: [h('luma', 960, 1.0, { mv: 'cheer' })], P: (T) => [['badge', 'over', 800, 640, 2, T(0), '#FFB938', 150]] },
      { b: 1, w: 'hub', cam: { face: 0, z: [2.0, 2.15] }, A: [h('gizmo', 960, 1.05, { mv: 'cheer' })], P: (T) => [['badge', 'over', 800, 640, 1, T(0), '#4CD964', 150]] },
      { b: 1, w: 'hub', cam: V, flash: .9, A: [h('zoom', 640, .75, { mv: 'zoomer', go: { x: 2300, d: .5, ease: 'power3.in' } })], P: (T) => [['speed', 'front', T(0), T(1), 1, 14], ['text', 'over', 540, 900, 'ZOOM!', T(0), '#FFE14D', 300, -6, .45]] },
      { b: 4, w: 'space', cam: V, flash: .9, punch: 2, A: [sp('zoom', 520, .72, { y: 620, mv: 'zoomer', pass: RIDERS, go: { x: 1400, d: 2, ease: 'power1.out' } })], P: (T, t1) => [['speed', 'front', T(0), t1, 1, 12], ['text', 'front', 880, 430, 'ZOOM!', T(0), '#FFE14D', 150, -8, .45], ['text', 'front', 1040, 580, 'ZOOM!', T(1), '#7BE8FF', 150, 7, .45], ['text', 'front', 960, 250, 'KIDDOVERSE!', T(2), '#FFFFFF', 130, 0, 1.3], ['burst', 'front', 960, 300, T(2), '#FFE14D', 240]] },
      { b: 4, w: 'space', cam: [960, 740, 1.7, 960, 740, 1.85], A: [sp('zoom', 960, .98, { y: 760, mv: 'zoomer', pass: RIDERS })], P: (T, t1) => [['notes', 'front', 960, 380, T(0), t1], ['sparkles', 'front', 960, 420, T(2), 6, 300, 40]] },
      { b: 8, w: 'hub', cam: V, punch: 1, A: [h('kiko', 800, .85, { mv: 'dance', sing: 1 }), h('luma', 1120, .85, { mv: 'dance', sing: 1 })], P: (T, t1) => [['confetti', 'front', T(2), T(7), 26], ['chip', 'over', 540, 360, 'CLAP CLAP!', '#4CD964', T(4), 80], ['sparkles', 'front', 960, 420, T(4), 6, 280, 38], ['notes', 'front', 960, 300, T(0), t1]] },
      { b: 4, w: 'space', cam: VW, A: [sp('zoom', -200, .72, { y: 620, mv: 'zoomer', pass: RIDERS })], fx: [(g, c) => { arc(420, 820, 1500, 820, -330, c.t0, c.t1)(c.acts[0], 0, 0, c.tl); c.P.sparkles(c.front, 960, 420, c.T(1), 8, 320, 40); }] },
      { b: 4, w: 'hub', cam: V, A: [h('bloop', 790, .66, { mv: 'wave', sing: 1 }), h('rumble', 990, .66, { mv: 'wave', sing: 1 }), h('nimbus', 1170, .66, { mv: 'wave', sing: 1 })], P: (T) => [['text', 'front', 960, 300, 'WELCOME!', T(2.4), '#FFE14D', 150, -4, 1.4], ['hearts', 'front', 960, 480, T(2), 6]] },
      { b: 4, w: 'hub', cam: [960, 740, 1.7, 960, 700, 1.85], punch: 1, A: [h('rumble', 790, .8, { mv: 'cheer', sing: 1, jumps: [0, 2] }), h('gizmo', 1140, .85, { mv: 'cheer', sing: 1, jumps: [0, 2] })], P: (T) => [['fireworks', 'back', 800, 330, T(2), '#FFE14D', 240], ['fireworks', 'back', 1130, 300, T(2.2), '#FF9BD0', 220], ['confetti', 'front', T(2), T(4), 22]] },
      { b: 2, w: 'hub', cam: { face: 0, z: [1.9, 2.1], dx: 160, dy: 200 }, A: [h('kiko', 800, .95, { mv: 'cheer', sing: 1 }), h('luma', 1130, .95, { mv: 'cheer', sing: 1 })] },
      { b: 2, w: 'space', cam: V, A: [sp('zoom', 960, .5, { y: 780, mv: 'zoomer', fn: [(a, t0, t1, tl) => tl.fromTo(a.g, { scaleX: .45, scaleY: .45 }, { scaleX: 1.7, scaleY: 1.7, duration: t1 - t0, ease: 'power2.in' }, t0)] })], P: (T, t1) => [['speed', 'front', T(0), t1, 1, 16], ['text', 'over', 540, 760, 'KIDDOVERSE!', T(.6), '#FFFFFF', 150, -3, 1.2]] },
    ]);
  })();

  /* ============================================================ WIGGLE — 16 s */
  (function () {
    if ('__SHORT__' !== 'wiggle') return;
    const D = A('disco');
    BOARDS.wiggle = board([
      { b: 4, w: 'disco', cam: [960, 700, 1.7, 960, 688, 1.85], flash: .9, A: [D('kiko', 960, 1.0, { mv: 'dance' })], P: (T) => [...stage(T), ['text', 'front', 960, 430, 'KIDDO WIGGLE!', T(1.2), '#FFE14D', 80, -5, 1.8], ['confetti', 'front', T(0), T(4), 22]] },
      { b: 4, w: 'disco', cam: V, A: [D('luma', 800, .86, { sing: 1, fn: [wig(1)] }), D('bloop', 1120, .86, { sing: 1, fn: [wig(1)] })], P: (T) => [...stage(T), ['chip', 'over', 280, 370, 'LEFT', '#FF5E7E', T(0), 76], ['chip', 'over', 800, 370, 'RIGHT', '#4CC9F0', T(2), 76]] },
      { b: 4, w: 'disco', cam: V, A: [D('rumble', 800, .78, { sing: 1, fn: [wig(1)] }), D('gizmo', 1120, .88, { sing: 1, fn: [wig(1)] })], P: (T) => stage(T) },
      { b: 4, w: 'disco', cam: V, A: [D('kiko', 770, .72, { sing: 1, fn: [spinJump] }), D('luma', 960, .72, { sing: 1, fn: [spinJump] }), D('bloop', 1150, .66, { sing: 1, fn: [spinJump] })], P: (T) => [...stage(T), ['chip', 'over', 540, 370, 'JUMP UP HIGH!', '#FFB938', T(0), 70], ['chip', 'over', 540, 470, 'SPIN AROUND!', '#B06BFF', T(2), 70]] },
      { b: 4, w: 'disco', cam: VW, A: [D('nimbus', 800, .85, { sing: 1, fn: [spinJump] }), D('rumble', 1130, .8, { sing: 1, fn: [spinJump] })], P: (T) => [...stage(T), ['sparkles', 'front', 960, 420, T(.2), 8, 300, 36], ['sparkles', 'front', 960, 420, T(2.2), 8, 300, 36]] },
      { b: 4, w: 'disco', cam: V, A: [D('kiko', 800, .9, { sing: 1, fn: [clapStomp] }), D('gizmo', 1130, .9, { sing: 1, fn: [clapStomp] })], fx: [shake(2, 2.5)], P: (T) => [...stage(T), ['chip', 'over', 540, 370, 'CLAP CLAP!', '#4CD964', T(0), 76], ['chip', 'over', 540, 470, 'STOMP STOMP!', '#FF9F43', T(2), 76]] },
      { b: 4, w: 'disco', cam: [960, 720, 1.62, 960, 700, 1.7], A: [D('kiko', 800, .52, { y: 800, sing: 1, fn: [clapStomp] }), D('luma', 960, .52, { y: 800, sing: 1, fn: [clapStomp] }), D('nimbus', 1120, .52, { y: 800, sing: 1, fn: [clapStomp] }), D('bloop', 790, .62, { sing: 1, fn: [clapStomp] }), D('rumble', 975, .62, { sing: 1, fn: [clapStomp] }), D('gizmo', 1150, .62, { sing: 1, fn: [clapStomp] })], fx: [shake(2, 2.5)], P: (T) => stage(T) },
      { b: 4, w: 'disco', cam: V, A: [D('kiko', 790, .52, { y: 800, mv: 'still', sing: 0, eye: 'wide' }), D('luma', 960, .52, { y: 800, mv: 'still', sing: 0, eye: 'wide' }), D('nimbus', 1130, .52, { y: 800, mv: 'still', sing: 0, eye: 'wide' }), D('bloop', 790, .62, { mv: 'still', sing: 0, eye: 'wide' }), D('rumble', 975, .62, { mv: 'still', sing: 0, eye: 'wide' }), D('gizmo', 1150, .62, { mv: 'still', sing: 0, eye: 'wide' })], P: (T, t1) => [['tint', 'over', '#9BE7FF', .4, T(0), t1], ['text', 'over', 540, 760, 'FREEZE!', T(0), '#FFFFFF', 250, -4, 1.9]],
        fx: [(g, c) => c.acts.forEach((a, i) => { c.tl.set(a.sq, { rotation: (i % 2 ? 6 : -6) }, c.t0 + .05); c.tl.set(a.armL || a.sq, { rotation: i % 2 ? -140 : 40 }, c.t0 + .05); })] },
    ]);
  })();

  /* ============================================================ COUNT — Count with Rumble, 16 s */
  (function () {
    if ('__SHORT__' !== 'count') return;
    const d = A('dino'), EX = [730, 845, 960, 1075, 1190], EC = ['#7ED957', '#FFB84D', '#4CC9F0', '#FF9BD0', '#B06BFF'];
    const eggs = (spec) => EX.map((x, i) => ['egg', 'front', x, 935, i + 1, ...spec(i)]);
    const R = (extra) => d('rumble', 960, .9, Object.assign({ y: 790, mv: 'bob', sing: 1 }, extra));
    BOARDS.count = board([
      { b: 4, w: 'dino', cam: V, flash: .9, A: [d('rumble', 700, 1.0, { mv: 'bob', sing: 1, walk: true, go: { x: 960, d: 1.9, ease: 'power1.out' } })], P: (T) => [['chip', 'over', 540, 380, 'DINO VALLEY', '#4CD964', T(0), 76]] },
      { b: 4, w: 'dino', cam: { face: 0, z: [1.7, 1.85] }, A: [d('rumble', 960, 1.2, { mv: 'bob', sing: 1 })], fx: [shake(1, 2, 3)], P: (T) => [['text', 'front', 850, 460, 'STOMP!', T(1), '#FF9F43', 120, -10, .38], ['text', 'front', 1070, 560, 'STOMP!', T(2), '#FFE14D', 120, 9, .38], ['text', 'front', 960, 380, 'STOMP!', T(3), '#FF5E7E', 140, -4, .38]] },
      { b: 4, w: 'dino', cam: V, A: [R()], P: (T) => eggs((i) => [T(.2 + i * .25), i === 0 ? T(3) : null, null, EC[i]]) },
      { b: 4, w: 'dino', cam: V, A: [R()], P: (T) => eggs((i) => [T(0), i === 1 ? T(0) : i === 2 ? T(1) : i === 0 ? T(2.2) : null, null, EC[i]]) },
      { b: 4, w: 'dino', cam: V, A: [R({ mv: 'cheer' })], P: (T) => eggs((i) => [T(0), null, i === 0 ? T(.05) : i === 1 ? T(1.5) : i === 2 ? T(3) : null, EC[i], 'whole']) },
      { b: 4, w: 'dino', cam: V, A: [R({ mv: 'cheer' })], P: (T) => eggs((i) => [T(0), null, i === 3 ? T(.5) : i === 4 ? T(2) : null, EC[i], i < 3 ? 'hatched' : 'whole']) },
      { b: 4, w: 'dino', cam: [960, 700, 1.62, 960, 660, 1.8], A: [R({ mv: 'dance' })], P: (T) => eggs((i) => [T(0), null, null, EC[i], 'hatched']).concat([['sparkles', 'front', 960, 700, T(1), 8, 320, 34]]) },
      { b: 4, w: 'dino', cam: [960, 700, 1.7, 960, 660, 1.85], punch: 1, A: [R({ mv: 'dance' })], P: (T) => eggs((i) => [T(0), null, null, EC[i], 'hatched']).concat([['confetti', 'front', T(1.5), T(4), 26], ['hearts', 'front', 960, 560, T(1.6), 6]]) },
    ]);
  })();

  window.SB = BOARDS['__SHORT__'];
})();
