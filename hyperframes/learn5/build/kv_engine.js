/* KiddoVerse engine — turns SONG (lyrics/timing) + SB (storyboard) into one deterministic GSAP timeline. */
(function () {
  const SONG = window.SONG, SB = window.SB, KV = window.KV, KVW = window.KVW;
  const CFG = window.KV_CFG || { W: 1920, H: 1080, v: false }, VW = CFG.W, VH = CFG.H;
  const BEAT = 60 / SONG.bpm, BAR = SONG.bar, DUR = SONG.duration;
  const NS = 'http://www.w3.org/2000/svg';
  const tl = gsap.timeline({ paused: true });
  window.__timelines = window.__timelines || {}; window.__timelines.main = tl;
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in (attrs || {})) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const fill = (g, markup) => { g.innerHTML = markup; return g; };
  let RN = 12345; const rnd = () => (RN = (RN * 16807) % 2147483647) / 2147483647;
  const FACEY = { kiko: 362, luma: 384, bloop: 190, rumble: 330, gizmo: 290, nimbus: 335, zoom: 200 };
  const S = (t) => +t.toFixed(4);

  /* ------------------------------------------------------------ stage + defs + world layer symbols */
  const stage = document.getElementById('stage');
  const defs = mk('defs', {}, stage);
  defs.innerHTML = KV.DEFS + KVW.DEFS;
  for (const [name, w] of Object.entries(KVW.WORLDS)) for (const layer of ['far', 'mid', 'ground', 'fg']) { const g = mk('g', { id: `W_${name}_${layer}` }, defs); g.innerHTML = w[layer]; }
  const shotsLayer = mk('g', { id: 'shots' }, stage);

  /* ------------------------------------------------------------ actors */
  function mkActor(parent, c, x, y, s = 1, flip = 0) {
    const g = mk('g', { class: 'act ' + c }, parent); g.innerHTML = KV.draw(c);
    const q = (sel) => g.querySelector(sel), qa = (sel) => [...g.querySelectorAll(sel)];
    const a = { g, c, s, x, y, flip, sq: q('.sq'), head: q('.head'), body: q('.body'), armL: q('.armL'), armR: q('.armR'), legL: q('.legL'), legR: q('.legR'), tail: q('.tail'), ant: q('.ant'), glow: q('.glow'), flame: q('.flame'), passG: q('.pass'),
      eyes: qa('.eye'), pupils: qa('.pupil'), opens: qa('.ep-open'), happies: qa('.ep-happy'), wides: qa('.ep-wide'), browL: q('.browL'), browR: q('.browR'),
      ms: { smile: qa('.m-smile'), open: qa('.m-open'), wide: qa('.m-wide'), o: qa('.m-o'), sad: qa('.m-sad') } };
    gsap.set([a.sq, a.head, a.armL, a.armR, a.legL, a.legR, a.tail, a.ant, a.flame, ...a.eyes, ...a.pupils, a.browL, a.browR].filter(Boolean), { svgOrigin: '0 0' });
    if (a.body) gsap.set(a.body, { svgOrigin: '0 -120' });
    gsap.set(g, { x, y, scaleX: flip ? -s : s, scaleY: s, svgOrigin: '0 0' });
    return a;
  }
  const pos = (a, t, x, y) => tl.set(a.g, { x, y }, t);
  const eye = (a, t, st) => { if (!a.opens.length) return; tl.set(a.opens, { opacity: st === 'open' ? 1 : 0 }, t); tl.set(a.happies, { opacity: st === 'happy' ? 1 : 0 }, t); tl.set(a.wides, { opacity: st === 'wide' ? 1 : 0 }, t); };
  const mouth = (a, t, m) => { for (const k in a.ms) if (a.ms[k].length) tl.set(a.ms[k], { opacity: k === m ? 1 : 0 }, t); };
  const blink = (a, t) => { if (!a.eyes.length) return; tl.to(a.eyes, { scaleY: .08, duration: .05, ease: 'none' }, t); tl.to(a.eyes, { scaleY: 1, duration: .08, ease: 'none' }, t + .06); };
  const look = (a, t, dx, dy, d = .12) => { if (a.pupils.length) tl.to(a.pupils, { x: dx, y: dy, duration: d, ease: 'power2.out' }, t); };
  const brow = (a, t, l, r, y = 0) => { if (a.browL) { tl.to(a.browL, { rotation: l, y, duration: .12 }, t); tl.to(a.browR, { rotation: r, y, duration: .12 }, t); } };
  const beatsIn = (t0, t1, step = BEAT) => { const o = []; for (let t = Math.ceil(t0 / step - 1e-6) * step; t < t1 - .02; t += step) o.push(S(t)); return o; };

  /* ---------- movement behaviours ---------- */
  function hop(a, t, amp = 16, sq = 1) { // squash-anticipate, spring up, land
    tl.to(a.sq, { scaleY: 1 - .05 * sq, scaleX: 1 + .035 * sq, y: 0, duration: .06, ease: 'power1.in' }, S(t - .06));
    tl.to(a.sq, { y: -amp, scaleY: 1 + .035 * sq, scaleX: 1 - .02 * sq, duration: .13, ease: 'power2.out' }, S(t));
    tl.to(a.sq, { y: 0, scaleY: 1, scaleX: 1, duration: .18, ease: 'power2.in' }, S(t + .13));
  }
  const MOVES = {
    bob(a, t0, t1) { beatsIn(t0 + .06, t1).forEach((t, i) => { hop(a, t, 14); if (a.head) tl.to(a.head, { rotation: i % 2 ? 4 : -4, duration: .4, ease: 'sine.inOut' }, t); if (a.armL) { tl.to(a.armL, { rotation: i % 2 ? 10 : -4, duration: .4, ease: 'sine.inOut' }, t); tl.to(a.armR, { rotation: i % 2 ? 4 : -10, duration: .4, ease: 'sine.inOut' }, t); } if (a.tail) tl.to(a.tail, { rotation: i % 2 ? 8 : -8, duration: .4, ease: 'sine.inOut' }, t); if (a.ant) tl.to(a.ant, { rotation: i % 2 ? 9 : -9, duration: .4, ease: 'sine.inOut' }, t); }); },
    dance(a, t0, t1) { beatsIn(t0 + .06, t1).forEach((t, i) => { hop(a, t, 26, 1.4); if (a.head) tl.to(a.head, { rotation: i % 2 ? 9 : -9, duration: .45, ease: 'sine.inOut' }, t); if (a.armL) { tl.to(a.armL, { rotation: i % 2 ? -150 : 12, duration: .22, ease: 'back.out(2)' }, t); tl.to(a.armR, { rotation: i % 2 ? -12 : 150, duration: .22, ease: 'back.out(2)' }, t); } if (a.tail) tl.to(a.tail, { rotation: i % 2 ? 14 : -14, duration: .4, ease: 'sine.inOut' }, t); if (a.ant) tl.to(a.ant, { rotation: i % 2 ? 14 : -14, duration: .4, ease: 'sine.inOut' }, t); tl.to(a.sq, { rotation: i % 2 ? 3 : -3, duration: .4, ease: 'sine.inOut' }, t); }); },
    wave(a, t0, t1) { MOVES.bob(a, t0, t1); if (!a.armR) return; tl.to(a.armR, { rotation: 140, duration: .25, ease: 'back.out(2)' }, t0); for (let t = t0 + .25, k = 0; t < t1 - .2; t += .22, k++) tl.to(a.armR, { rotation: k % 2 ? 150 : 118, duration: .22, ease: 'sine.inOut' }, S(t)); tl.to(a.armR, { rotation: 0, duration: .2 }, S(t1 - .2)); },
    cheer(a, t0, t1) { beatsIn(t0 + .06, t1).forEach((t, i) => { hop(a, t, 34, 1.6); if (a.armL) { tl.to(a.armL, { rotation: -160, duration: .2, ease: 'back.out(2)' }, t); tl.to(a.armR, { rotation: 160, duration: .2, ease: 'back.out(2)' }, t); } }); },
    sway(a, t0, t1) { beatsIn(t0, t1, BAR / 2).forEach((t, i) => tl.to(a.sq, { rotation: i % 2 ? 4 : -4, x: 0, duration: BAR / 2, ease: 'sine.inOut' }, t)); },
    zoomer(a, t0, t1) { beatsIn(t0, t1, BEAT / 2).forEach((t, i) => tl.to(a.sq, { y: i % 2 ? -10 : 6, rotation: i % 2 ? -1.2 : 1.2, duration: BEAT / 2, ease: 'sine.inOut' }, t)); if (a.flame) tl.fromTo(a.flame, { scaleX: .8 }, { scaleX: 1.25, duration: .09, yoyo: true, repeat: Math.floor((t1 - t0) / .09) - 1, ease: 'none' }, t0); if (a.legL) { tl.to(a.legL, { rotation: -360 * (t1 - t0) * 2, duration: t1 - t0, ease: 'none' }, t0); tl.to(a.legR, { rotation: -360 * (t1 - t0) * 2, duration: t1 - t0, ease: 'none' }, t0); } },
    still() {},
  };
  const jump = (a, t, amp = 130, arms = true) => { window.__LOG && window.__LOG(t, 'boing', amp); tl.to(a.sq, { scaleY: .9, scaleX: 1.08, duration: .09 }, S(t - .09)); tl.to(a.sq, { y: -amp, scaleY: 1.08, scaleX: .94, duration: .22, ease: 'power2.out' }, S(t)); tl.to(a.sq, { y: 0, scaleY: 1, scaleX: 1, duration: .24, ease: 'power2.in' }, S(t + .22)); if (arms && a.armL) { tl.to(a.armL, { rotation: -165, duration: .2, ease: 'back.out(2)' }, S(t)); tl.to(a.armR, { rotation: 165, duration: .2, ease: 'back.out(2)' }, S(t)); tl.to([a.armL, a.armR], { rotation: 0, duration: .25 }, S(t + .5)); } };
  const walk = (a, t0, t1, amp = 24) => { const h = .2; let k = 0; for (let t = t0; t < t1 - h; t += h, k++) { const d = k % 2 ? 1 : -1; if (a.legL) { tl.to(a.legL, { rotation: amp * d, duration: h, ease: 'sine.inOut' }, S(t)); tl.to(a.legR, { rotation: -amp * d, duration: h, ease: 'sine.inOut' }, S(t)); } tl.to(a.sq, { y: -8, duration: h / 2, ease: 'power1.out' }, S(t)); tl.to(a.sq, { y: 0, duration: h / 2, ease: 'power1.in' }, S(t + h / 2)); } };
  const spin = (a, t, d = .5) => { window.__LOG && window.__LOG(t, 'swish'); const s0 = a.flip ? -a.s : a.s; tl.to(a.g, { scaleX: -s0, duration: d / 2, ease: 'sine.in' }, S(t)); tl.to(a.g, { scaleX: s0, duration: d / 2, ease: 'sine.out' }, S(t + d / 2)); };

  window.__KVM = { hop, jump, walk, spin, MOVES, eye, mouth, look, brow, blink, beatsIn, mkActor, pos };

  /* ------------------------------------------------------------ lyric events -> mouths */
  const SYL = [];
  SONG.lines.forEach((ln) => { if (ln.voice === 'lead' || (ln.kind === 'dance' && ln.voice === 'gang')) ln.words.forEach((w) => (w.subs || [w]).forEach((x) => x.syl.forEach((s, i) => SYL.push({ t0: s.t0, t1: s.t0 + s.dur, note: s.note, txt: x.parts[i] || '', last: i === x.syl.length - 1 && x === (w.subs ? w.subs[w.subs.length - 1] : w) && w === ln.words[ln.words.length - 1] })))); });
  SYL.sort((a, b) => a.t0 - b.t0);
  const shapeOf = (s) => (/(oo|ow|o$|oh|ou|ew|ue|ough|ro)/i.test(s.txt) ? 'o' : s.note >= 69 ? 'wide' : 'open');
  function singSched(a, t0, t1) {
    const list = SYL.filter((s) => s.t0 >= t0 - .05 && s.t0 < t1 - .02);
    list.forEach((s, i) => {
      mouth(a, S(s.t0), shapeOf(s));
      const nxt = list[i + 1], endT = Math.min(s.t1 - .05, t1 - .02);
      if (!nxt || nxt.t0 - endT > .1) mouth(a, S(endT), 'smile');
      if (s.t1 - s.t0 >= .9) { eye(a, S(s.t0 + .12), 'happy'); eye(a, S(Math.min(s.t1, t1 - .03)), 'open'); }
    });
    if (!list.length || list[list.length - 1].t1 < t1) mouth(a, S(t1 - .01), 'smile');
  }
  function talkSched(a, t0, t1) {
    for (let t = t0, k = 0; t < t1 - .05; t += .14, k++) mouth(a, S(t), k % 3 === 2 ? 'o' : k % 2 ? 'open' : 'wide');
    mouth(a, S(t1), 'smile');
  }
  const blinks = (a, t0, t1) => { for (let t = t0 + .8 + rnd() * 1.2; t < t1 - .2; t += 2.2 + rnd() * 1.6) blink(a, S(t)); };

  /* ------------------------------------------------------------ props / fx */
  window.__SFX = []; const LOG = (t, k, v) => window.__SFX.push([+(+t).toFixed(3), k, v]); window.__LOG = LOG;
  const P = window.KVP(tl, mk, rnd, S, BEAT);

  /* ------------------------------------------------------------ shots */
  const camFor = (S_, actors) => {
    let c = S_.cam || 'wide';
    if (typeof c === 'string') {
      const m = { wide: [960, 540, 1, 960, 540, 1.06], wideIn: [960, 560, 1, 960, 520, 1.12], wideOut: [960, 520, 1.12, 960, 540, 1], panL: [1060, 540, 1.04, 860, 540, 1.04], panR: [860, 540, 1.04, 1060, 540, 1.04], low: [960, 600, 1.05, 960, 560, 1.14], up: [960, 440, 1.05, 960, 520, 1.1] };
      c = m[c] || m.wide;
    } else if (!Array.isArray(c)) {   // {face: idx, z:[z0,z1], dx, dy}
      const a = actors[c.face || 0]; const fy = (FACEY[a.c] || 300) * a.s;
      const cx = a.x + (c.dx || 0), cy = a.y - fy * (c.yk == null ? 0.9 : c.yk) + (c.dy || 0);
      const [z0, z1] = c.z || [1.7, 2.0];
      c = [cx, cy, z0, cx + (c.mx || 0), cy + (c.my || 0), z1];
    }
    return c;
  };
  const clampCam = (c) => { if (!CFG.v) return c; const f = (cx, cy, s) => [Math.min(Math.max(cx, KVW.X0 + VW / (2 * s)), KVW.X1 - VW / (2 * s)), Math.min(Math.max(cy, KVW.Y0 + VH / (2 * s)), KVW.Y1 - VH / (2 * s)), s]; return [...f(c[0], c[1], c[2]), ...f(c[3], c[4], c[5])]; };
  const camXf = (c) => ({ x: VW / 2 - c[0] * c[2], y: VH / 2 - c[1] * c[2], scale: c[2] });

  const created = [];
  SB.forEach((sh, idx) => {
    const t0 = S(sh.t0), t1 = S(sh.t1), dur = t1 - t0;
    const g = mk('g', { id: 'sh' + idx, class: 'shot' }, shotsLayer); g.style.display = 'none';
    const punch = mk('g', { class: 'punch' }, g), cam = mk('g', { class: 'cam' }, punch);
    const lf = mk('use', { href: `#W_${sh.w}_far` }, cam), lm = mk('use', { href: `#W_${sh.w}_mid` }, cam), lg = mk('use', { href: `#W_${sh.w}_ground` }, cam);
    const back = mk('g', { class: 'back' }, cam), actG = mk('g', { class: 'actors' }, cam), front = mk('g', { class: 'front' }, cam);
    const lfg = mk('use', { href: `#W_${sh.w}_fg` }, cam), over = mk('g', { class: 'over' }, g);
    gsap.set([punch, cam], { svgOrigin: '0 0' }); gsap.set(punch, { svgOrigin: (VW / 2) + ' ' + (VH / 2) });
    tl.set(g, { display: 'block' }, t0); tl.set(g, { display: 'none' }, t1);
    if (sh.flash) LOG(t0 - .05, 'whoosh', sh.flash);

    // camera + parallax
    const cc = clampCam(camFor(sh, (sh.A || []).map((d) => ({ c: d.c, s: d.s || 1, x: d.x, y: d.y }))));
    const a0 = camXf(cc.slice(0, 3).concat([0])), a1 = camXf(cc.slice(3).concat([0]));
    tl.fromTo(cam, { x: a0.x, y: a0.y, scale: a0.scale }, { x: a1.x, y: a1.y, scale: a1.scale, duration: dur, ease: sh.ease || 'sine.inOut' }, t0);
    const drift = (sh.drift == null ? 1 : sh.drift);
    tl.fromTo(lf, { x: 0 }, { x: -22 * drift, duration: dur, ease: 'none' }, t0); tl.fromTo(lm, { x: 0 }, { x: -46 * drift, duration: dur, ease: 'none' }, t0);
    tl.fromTo(lg, { x: 0 }, { x: -70 * drift, duration: dur, ease: 'none' }, t0);

    // beat punch on bar downbeats (energy) + soft pop-in
    if (sh.punch) beatsIn(t0, t1, sh.punch === 2 ? BEAT * 2 : BAR).forEach((t) => { tl.fromTo(punch, { scale: 1.022 }, { scale: 1, duration: .24, ease: 'power2.out' }, t); });
    tl.fromTo(punch, { scale: 1.05 }, { scale: 1, duration: .22, ease: 'power2.out' }, t0);

    // ambient dust
    P.dust(front, t0, t1, sh.dust == null ? 8 : sh.dust, sh.dustCol);

    // actors
    const acts = [];
    (sh.A || []).forEach((d, i) => {
      const a = mkActor(actG, d.c, d.x, d.y, d.s || 1, d.f || 0);
      a.cfg = d; acts.push(a);
      if (d.z != null) actG.appendChild(a.g);
      const mv = d.mv || 'bob';
      if (d.go) { const gx = d.go; tl.fromTo(a.g, { x: d.x, y: d.y }, { x: gx.x == null ? d.x : gx.x, y: gx.y == null ? d.y : gx.y, duration: gx.d || dur, ease: gx.ease || 'none' }, S(t0 + (gx.at || 0))); }
      if (d.walk) walk(a, t0, t1);
      if (MOVES[mv]) MOVES[mv](a, t0, t1);
      if (a.passG && d.pass) {                         // riders in the Zoomie windows
        d.pass.forEach((pc, k) => { const p = mkActor(a.passG, pc, [-198, -86, 26][k], -83, .3, 0); a.pass = (a.pass || []).concat([p]); MOVES.bob(p, t0, t1); if (d.sing !== 0) singSched(p, t0, t1); blinks(p, t0, t1); });
      }
      if (d.sing !== 0 && d.sing !== undefined && d.sing !== false) singSched(a, t0, t1);
      if (d.eye) eye(a, t0, d.eye);
      if (d.look) look(a, t0, d.look[0], d.look[1]);
      if (d.mouth) mouth(a, t0, d.mouth);
      if (d.pop !== 0) tl.fromTo(a.g, { opacity: .35, scaleY: (d.s || 1) * .75 }, { opacity: 1, scaleY: d.s || 1, duration: .16, ease: 'back.out(2.4)' }, S(t0 + (d.pop || 0) + i * .04));
      blinks(a, t0, t1);
      (d.jumps || []).forEach((b) => jump(a, S(t0 + b * BEAT)));
      (d.spins || []).forEach((b) => spin(a, S(t0 + b * BEAT)));
      (d.fn || []).forEach((f) => f(a, t0, t1, tl));
    });
    // spoken lines (intro shouts etc.)
    SONG.speech.forEach((sp) => {
      const dd = Math.max(.5, sp.text.split(' ').length * .34 + .2);
      if (sp.t < t1 - .05 && sp.t + dd > t0 + .05) acts.forEach((a) => { if (sp.who === 'all' || sp.who === a.c) { talkSched(a, Math.max(sp.t, t0), Math.min(sp.t + dd, t1)); } });
    });
    // props / fx  (P may be a function of T(beat) -> absolute time, so storyboards can time props to lyric beats)
    const T = (b) => S(t0 + b * BEAT);
    const plist = typeof sh.P === 'function' ? sh.P(T, t1) : (sh.P || []);
    plist.forEach((p) => { const fn = P[p[0]]; if (!fn) throw new Error('unknown prop ' + p[0] + ' in shot ' + idx); fn(p[1] === 'back' ? back : p[1] === 'over' ? over : front, ...p.slice(2)); });
    if (sh.fx) sh.fx.forEach((f) => f(g, { back, front, over, acts, cam, punch, t0, t1, tl, P, T }));
    if (sh.flash) tl.fromTo('#flash', { opacity: +Math.min(.5, sh.flash * .55).toFixed(2) }, { opacity: 0, duration: .33, ease: 'power1.out', immediateRender: false }, t0);   // soft section flash: ~50% peak, 10-frame decay
    created.push({ g, acts, t0, t1 });
  });

  /* ------------------------------------------------------------ captions (karaoke lyrics) */
  const capsEl = document.getElementById('caps');
  const addCap = (words, tStart, tEnd, cls) => {
    const d = document.createElement('div'); d.className = 'cap ' + (cls || ''); capsEl.appendChild(d);
    const nch = words.reduce((n, w) => n + w.disp.length + 1, 0); d.style.fontSize = (nch > 52 ? 56 : nch > 44 ? 62 : nch > 36 ? 68 : 74) + 'px';
    const spans = words.map((w) => { const s = document.createElement('span'); s.className = 'w'; s.textContent = w.disp; d.appendChild(s); if (!w.glue) d.appendChild(document.createTextNode(' ')); return s; });
    gsap.set(d, { opacity: 0 }); gsap.set(spans, { transformOrigin: '50% 80%' });
    tl.fromTo(d, { opacity: 0, scale: .86, y: 14 }, { opacity: 1, scale: 1, y: 0, duration: .14, ease: 'back.out(2.2)' }, S(tStart));
    words.forEach((w, i) => { const sp = spans[i]; tl.fromTo(sp, { color: '#FFFFFF', scale: 1 }, { color: (cls === 'echo' || w.who === 'kids') ? '#FF9BD0' : '#FFE14D', scale: 1.16, duration: .08, ease: 'back.out(3)' }, S(w.t0)); tl.to(sp, { scale: 1, duration: .16, ease: 'power2.out' }, S(w.t0 + .08)); });
    tl.set(d, { opacity: 0 }, S(tEnd));
  };
  /* one list for sung + spoken captions; an outgoing caption ends EXACTLY where the next one starts (never two lines on screen at once).
     KEEP IN SYNC with audio/make_texts.py (SRT uses the same rules). */
  const CAPS = [];
  const capLines = SONG.lines.filter((l) => !l.hidden && l.kind !== 'intro');
  capLines.forEach((ln, i) => {
    const nxt = capLines[i + 1]; let end = ln.t1 + .3; if (nxt && nxt.t0 < end) end = nxt.t0 - .02;
    if (ln.kind === 'game' && ln.meta && ln.meta.part === 'q' && nxt) end = nxt.t0;           // the question stays up through the thinking time, until the answer
    CAPS.push({ words: ln.words, first: ln.t0, start: ln.t0 - .12, core: ln.t1, end, cls: ln.voice === 'gang' ? 'echo' : '' });
  });
  SONG.speech.forEach((sp) => { const ws = sp.text.split(' '); const dd = Math.max(.6, ws.length * .34 + .2); CAPS.push({ words: ws.map((w, k) => ({ disp: w, t0: sp.t + k * (dd - .2) / ws.length })), first: sp.t, start: sp.t - .05, core: sp.t + .1 + .3 * ws.length, end: sp.t + dd + .35, cls: sp.who === 'all' ? 'echo' : '' }); });
  CAPS.sort((a, b) => a.start - b.start);
  for (let i = 1; i < CAPS.length; i++) { const p = CAPS[i - 1], c = CAPS[i]; if (c.start < p.end) { c.start = Math.max(c.start, Math.min(p.core, c.first - .03)); p.end = Math.min(p.end, c.start); } }
  CAPS.forEach((c) => addCap(c.words, c.start, c.end, c.cls));

  /* ------------------------------------------------------------ brand bug (top) + end card */
  const bug = document.getElementById('brand');
  if (CFG.v) {                                         // vertical shorts: logo on top from the start, "follow" pill at the end
    tl.set(bug, { opacity: 0 }, 0); tl.fromTo(bug, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(2)' }, .2);
    tl.fromTo(bug.querySelector('svg'), { rotation: -6 }, { rotation: 6, duration: 1.6, yoyo: true, repeat: Math.max(0, Math.floor(DUR / 1.6) - 1), ease: 'sine.inOut' }, 0);
    const fp = document.getElementById('follow'); if (fp) { gsap.set(fp, { opacity: 0 }); tl.fromTo(fp, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: .5, ease: 'elastic.out(1,.55)' }, S(DUR - 2.4)); tl.to(fp, { scale: 1.06, duration: .4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, S(DUR - 1.8)); }
  } else {
    const secs = SONG.sections, introEnd = secs[0].t1, outro = secs[secs.length - 1];
    tl.set(bug, { opacity: 0 }, 0); tl.fromTo(bug, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(2)' }, S(introEnd - 2));
    tl.fromTo(bug.querySelector('svg'), { rotation: -6 }, { rotation: 6, duration: 1.6, yoyo: true, repeat: Math.floor(DUR / 1.6) - 1, ease: 'sine.inOut' }, 0);
    tl.set(bug, { opacity: 0 }, S(outro.t0 + 3 * BAR));
    if (window.KVEnd) window.KVEnd(tl, outro.t0 + 3 * BAR, DUR, mk, S);
  }

  window.__KV = { tl, created, SYL, BEAT, S };
  tl.set({}, {}, DUR);   // make sure timeline length == composition length
})();
