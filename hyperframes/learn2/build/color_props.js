/* KiddoVerse LEARN #2 - props for "The Color Train" (extends KVP): the train, the rainbow, colour cards, colour orb, question mark.
   Seek-safe: everything is explicit tweens on the shared timeline. */
(function () {
  const baseKVP = window.KVP;
  window.KVP = function (tl, mk, rnd, S, BEAT) {
    const api = baseKVP(tl, mk, rnd, S, BEAT);
    const OL = '#2B1B5E', CAP = window.SONG.duration, HEX = window.KVW.COLORHEX;
    const LOG = (t, k, v) => window.__LOG && window.__LOG(t, k, v);
    const grp = (layer, x, y, markup) => { const o = mk('g', { transform: `translate(${x},${y})` }, layer); const p = mk('g', { class: 'p' }, o); p.innerHTML = markup; gsap.set(p, { svgOrigin: '0 0' }); return p; };
    const txt = (s, size, fillc = '#fff', sw = 14) => `<text x="0" y="${size * .35}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${size}" fill="${fillc}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke">${s}</text>`;
    const rr = (x, y, w, h, r, f, sw = 9) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    const mixc = (a, b, k) => { const f = (hx) => { const n = parseInt(hx.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }; const x = f(a), y = f(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
    const dk = (hx, k) => mixc(hx, '#2A1B63', k), lt = (hx, k) => mixc(hx, '#FFFFFF', k);
    const gone = (p, until, d = .22) => { if (until != null) tl.to(p, { opacity: 0, scale: .55, duration: d, ease: 'power2.in' }, S(until)); };
    const popIn = (p, t, rot = -14, d = .5, ease = 'elastic.out(1,.5)') => tl.fromTo(p, { scale: 0, rotation: rot, opacity: 1 }, { scale: 1, rotation: 0, duration: d, ease }, S(t));

    /* ---------- big colour orb: "this is RED" */
    api.orb = (layer, x, y, r, hex, t, until, o = {}) => {
      const p = grp(layer, x, y, `<circle r="${r}" fill="${hex}" stroke="${OL}" stroke-width="9"/><circle r="${r * .72}" fill="${lt(hex, .22)}" opacity=".55"/><ellipse cx="${-r * .34}" cy="${-r * .4}" rx="${r * .22}" ry="${r * .12}" fill="#fff" opacity=".7" transform="rotate(-32 ${-r * .34} ${-r * .4})"/>`);
      LOG(t, 'objpop'); popIn(p, t, -10, .55);
      const t1 = until != null ? until : t + 3, n = Math.max(0, Math.min(Math.floor((t1 - t - .7) / .56), Math.floor((CAP - t - .7) / .56)) - 1);
      if (n > 0) tl.to(p, { scale: 1.07, duration: .28, yoyo: true, repeat: n, ease: 'sine.inOut' }, S(t + .7));
      gone(p, until); return p;
    };
    /* ---------- a big question mark that bounces (thinking time) */
    api.qmark = (layer, x, y, t, until, size = 220, col = '#FFE14D') => {
      const p = grp(layer, x, y, txt('?', size, col, size * .1)); LOG(t, 'chip'); popIn(p, t, -12, .5);
      const t1 = until != null ? until : t + 3, n = Math.max(0, Math.min(Math.floor((t1 - t - .6) / .42), Math.floor((CAP - t - .6) / .42)) - 1);
      if (n > 0) tl.to(p, { y: -22, rotation: 6, duration: .21, yoyo: true, repeat: n, ease: 'sine.inOut' }, S(t + .6));
      gone(p, until); return p;
    };

    /* ---------- the rainbow: 6 bands; lit[k] = time the band k is revealed (left to right), or 'pre' = already there when the prop pops in, or null = ghost only */
    api.rainbow = (layer, cx, cy, R, bw, hexes, lit, o = {}) => {
      const r_ = (k) => R - k * bw;
      const bands = hexes.map((hx, k) => { const r = r_(k), d = `M${-r},0 A${r},${r} 0 0 1 ${r},0`;
        return (o.ghost === false ? '' : `<path d="${d}" fill="none" stroke="${o.gray || '#fff'}" stroke-opacity="${o.ghostOp || .4}" stroke-width="${bw * .86}" stroke-linecap="round"/>`)
          + `<path class="rbo" data-k="${k}" d="${d}" fill="none" stroke="${OL}" stroke-opacity=".3" stroke-width="${bw * .86 + 6}" stroke-linecap="round" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="1" opacity="0"/>`
          + `<path class="rb" data-k="${k}" d="${d}" fill="none" stroke="${hx}" stroke-width="${bw * .86}" stroke-linecap="round" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="1" opacity="0"/>`; }).join('');
      const plate = o.plate ? `<rect x="${-R - bw * .8}" y="${-R - bw * .8}" width="${2 * R + bw * 1.6}" height="${R + bw * 2.1}" rx="${bw * 1.4}" fill="${o.plate}" opacity="${o.plateOp || .4}"/>` : '';
      const p = grp(layer, cx, cy, plate + bands);
      const t0 = o.t0 != null ? o.t0 : 0;
      if (o.pop !== false) tl.fromTo(p, { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, S(t0));
      hexes.forEach((hx, k) => {
        const a = p.querySelector(`.rb[data-k="${k}"]`), b = p.querySelector(`.rbo[data-k="${k}"]`), when = lit[k];
        if (when == null) return;
        if (when === 'pre') { tl.set([a, b], { opacity: 1, attr: { 'stroke-dashoffset': 0 } }, S(t0)); return; }
        tl.set([a, b], { opacity: 1 }, S(when));
        tl.fromTo(b, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: .7, ease: 'power2.out', immediateRender: false }, S(when));
        tl.fromTo(a, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: .7, ease: 'power2.out', immediateRender: false }, S(when));
        LOG(when, 'ding', k + 1); api.sparkle(layer, cx - r_(k) * .55, cy - r_(k) * .8, when + .25, 38, hx, true); api.sparkle(layer, cx + r_(k) * .6, cy - r_(k) * .75, when + .5, 30, '#fff', true);
      });
      gone(p, o.until, .3); return p;
    };

    /* ---------- the Color Train: engine (with a face) + one car per colour found so far.  Drives in from the left, stops, toots, optionally leaves to the right.
       xStop = x of the engine's front when stopped, y = rail level, s = scale, hexes = colours of the cars (rear car = newest),
       tIn..tStop = arrival, o.newCar = index of a car that is coupled on at tStop, o.toots = [times], o.tOut/o.dOut = departure, o.until = hide time */
    api.train = (layer, xStop, y, s, hexes, tIn, tStop, o = {}) => {
      const BODY = o.body || '#6C4CE0', TRIM = '#FFD23F', DARK = '#3A2A8C', n = hexes.length, CW = 240;
      const wheel = (cx, r) => `<g transform="translate(${cx},${-r - 4})"><g class="wh" data-r="${r}"><circle r="${r}" fill="#fff" stroke="${OL}" stroke-width="7"/>${[0, 72, 144, 216, 288].map((a) => `<line x1="0" y1="0" x2="${((r - 8) * Math.cos(a * Math.PI / 180)).toFixed(1)}" y2="${((r - 8) * Math.sin(a * Math.PI / 180)).toFixed(1)}" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>`).join('')}<circle r="${(r * .3).toFixed(1)}" fill="${TRIM}" stroke="${OL}" stroke-width="5"/></g></g>`;
      const eyeM = (x, yy, r) => `<circle cx="${x}" cy="${yy}" r="${r}" fill="#fff" stroke="${OL}" stroke-width="5"/><circle cx="${x + r * .15}" cy="${yy + r * .12}" r="${r * .52}" fill="${OL}"/><circle cx="${x + r * .34}" cy="${yy - r * .1}" r="${r * .2}" fill="#fff"/>`;
      let loco = `<path d="M0,-62 L58,-2 L0,-2Z" fill="${TRIM}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>`
        + rr(-382, -80, 424, 24, 10, DARK, 7) + rr(-300, -178, 300, 106, 48, BODY, 8) + rr(-386, -266, 122, 194, 18, BODY, 8) + rr(-402, -284, 154, 28, 12, TRIM, 7) + rr(-366, -240, 86, 64, 14, '#BFEFFF', 6)
        + `<path d="M-122,-176 L-122,-230 L-154,-252 L-58,-252 L-90,-230 L-90,-176Z" fill="${DARK}" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/>`
        + `<ellipse cx="-212" cy="-184" rx="36" ry="28" fill="${TRIM}" stroke="${OL}" stroke-width="7"/>` + rr(-296, -134, 296, 14, 7, TRIM, 0)
        + `<circle cx="14" cy="-136" r="22" fill="#FFF3A0" stroke="${OL}" stroke-width="6"/>`
        + eyeM(-86, -146, 16) + eyeM(-38, -146, 16) + `<path d="M-92,-112 Q-62,-86 -32,-112" fill="none" stroke="${OL}" stroke-width="6" stroke-linecap="round"/><ellipse cx="-112" cy="-120" rx="12" ry="7" fill="#FF7A8F" opacity=".5"/><ellipse cx="-12" cy="-120" rx="12" ry="7" fill="#FF7A8F" opacity=".5"/>`
        + wheel(-322, 40) + wheel(-232, 40) + wheel(-116, 32) + `<path d="M-322,-44 L-116,-36" stroke="${OL}" stroke-width="9" stroke-linecap="round"/>`;
      let cars = '', coup = '';
      hexes.forEach((hx, k) => {
        const cx = -396 - 34 - 100 - k * CW;
        cars += `<g class="car" data-k="${k}"><g transform="translate(${cx},0)">${rr(-100, -156, 200, 104, 20, hx, 8)}${rr(-112, -170, 224, 20, 10, dk(hx, .28), 7)}${rr(-74, -134, 66, 52, 14, '#fff', 6)}${rr(8, -134, 66, 52, 14, '#fff', 6)}<rect x="-62" y="-128" width="30" height="8" rx="4" fill="#BFEFFF"/><rect x="20" y="-128" width="30" height="8" rx="4" fill="#BFEFFF"/>${wheel(-56, 26)}${wheel(56, 26)}</g><path d="M${cx + 100},-70 L${cx + 134},-70" stroke="${OL}" stroke-width="10" stroke-linecap="round"/></g>`;
      });
      const p = grp(layer, 0, y, `<g transform="scale(${s})">${cars}${loco}</g>`);
      const total = (402 + 34 + n * CW) * s, xStart = -160 - 0, dist = xStop - xStart;
      const whs = [...p.querySelectorAll('.wh')]; gsap.set(whs, { svgOrigin: '0 0' });
      tl.fromTo(p, { x: xStart }, { x: xStop, duration: tStop - tIn, ease: 'power3.out' }, S(tIn));
      whs.forEach((w) => { const r = +w.getAttribute('data-r') * s; tl.fromTo(w, { rotation: 0 }, { rotation: dist / r * 57.3 / 1, duration: tStop - tIn, ease: 'power3.out' }, S(tIn)); });
      LOG(tIn, 'whoosh', .8);
      // the newest car pops in (coupled on) at tStop
      if (o.newCar != null) { const car = p.querySelector(`.car[data-k="${o.newCar}"]`); tl.set(car, { opacity: 0 }, 0); gsap.set(car, { svgOrigin: `${-396 - 34 - 100 - o.newCar * CW} -80` }); tl.fromTo(car, { opacity: 1, scale: .1 }, { opacity: 1, scale: 1, duration: .5, ease: 'elastic.out(1,.5)', immediateRender: false }, S(tStop + (o.carDelay != null ? o.carDelay : .1))); LOG(tStop + .1, 'tada'); }
      // steam: small puffs while moving, big puffs on every toot, a few while waiting
      const puff = (t, big) => { const q = grp(layer, 0, y, `<circle r="${big ? 30 : 17}" fill="#fff" stroke="${OL}" stroke-width="4" opacity=".92"/>`); const hx = (-104 * s), hy = -258 * s;
        tl.set(q, { x: xStop + hx - (dist) * 0, y: hy, opacity: 0 }, 0);
        const frac = Math.min(1, Math.max(0, (t - tIn) / (tStop - tIn))), xNow = xStart + dist * (1 - Math.pow(1 - frac, 3));
        tl.fromTo(q, { x: xNow + hx, y: hy, scale: .4, opacity: .95 }, { x: xNow + hx - 60 * s, y: hy - (big ? 150 : 100) * s, scale: big ? 2.5 : 1.9, opacity: 0, duration: big ? 1.1 : .9, ease: 'power1.out', immediateRender: false }, S(t)); };
      for (let t = tIn + .1; t < tStop; t += .34) puff(t, false);
      const idleEnd = Math.min(o.until != null ? o.until : tStop + 3, o.tOut != null ? o.tOut : 1e9);
      for (let t = tStop + .3; t < idleEnd - .3; t += .9) puff(t, false);
      (o.toots || []).forEach((t) => { puff(t, true); LOG(t, 'toot'); tl.fromTo(p, { y: 0 }, { y: -8 * s, duration: .08, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, S(t)); });
      if (o.tOut != null) { const d = o.dOut || 1.5, dx = 2500 - xStop; tl.to(p, { x: xStop + dx, duration: d, ease: 'power2.in' }, S(o.tOut)); whs.forEach((w) => { const r = +w.getAttribute('data-r') * s; tl.to(w, { rotation: '+=' + (dx / r * 57.3), duration: d, ease: 'power2.in' }, S(o.tOut)); }); LOG(o.tOut, 'whoosh', .7); }
      if (o.until != null && o.tOut == null) gone(p, o.until, .3);
      p.__total = total; return p;
    };

    /* ---------- colour cards for the game: three cards with a big coloured circle each; the right one grows, the others fade */
    api.colorCards = (layer, keys, cx, cy, tIn, tReveal, correct, o = {}) => {
      const gap = o.gap || 400, size = o.size || 118;
      keys.forEach((key, i) => {
        const hx = HEX[key], x = cx + (i - (keys.length - 1) / 2) * gap;
        const p = grp(layer, x, cy, rr(-156, -158, 312, 330, 50, '#E9E3FF', 10) + rr(-156, -172, 312, 330, 50, '#fff', 10) + `<circle cx="0" cy="-8" r="${size}" fill="${hx}" stroke="${OL}" stroke-width="10"/><circle cx="0" cy="-8" r="${size * .72}" fill="${lt(hx, .22)}" opacity=".5"/><ellipse cx="${-size * .36}" cy="${-size * .5}" rx="${size * .22}" ry="${size * .12}" fill="#fff" opacity=".7" transform="rotate(-32 ${-size * .36} ${-size * .5})"/>`);
        const ti = tIn + i * .35; LOG(ti, 'tile'); popIn(p, ti, i % 2 ? 8 : -8, .45);
        if (i === correct) {
          const g = grp(layer, x, cy, `<circle r="215" fill="#FFE14D" opacity=".38"/><circle r="170" fill="#FFF6B0" opacity=".4"/>`); tl.set(g, { opacity: 0 }, 0); layer.insertBefore(g.parentNode, p.parentNode);             // glow sits BEHIND its card
          tl.fromTo(g, { scale: .4, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: 'back.out(2)' }, S(tReveal)); gone(g, o.until);
          tl.to(p, { scale: 1.22, rotation: 0, duration: .35, ease: 'elastic.out(1,.5)' }, S(tReveal));
        } else tl.to(p, { scale: .8, opacity: .3, duration: .35, ease: 'power2.out' }, S(tReveal));
        gone(p, o.until);
      });
      LOG(tReveal, 'tada'); api.confetti(layer, S(tReveal), S(tReveal + 1.8), 30);
    };
    return api;
  };
})();
