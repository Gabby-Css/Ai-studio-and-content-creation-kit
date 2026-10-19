/* KiddoVerse LEARN #5 - counting props (extends KVP): Gizmo's number DISPLAY, the TEN-FRAME board (counters that drop in, number badges), the 11-20 progress HUD
   (one single group), and the skip-counting ROW (socks / hands / train cars with the running total).  Seek-safe tweens only. */
(function () {
  const baseKVP = window.KVP;
  window.KVP = function (tl, mk, rnd, S, BEAT) {
    const api = baseKVP(tl, mk, rnd, S, BEAT);
    const OL = '#2B1B5E', CAP = window.SONG.duration, C = window.CNT, PAL = C.PAL;
    const LOG = (t, k, v) => window.__LOG && window.__LOG(t, k, v);
    const grp = (layer, x, y, markup) => { const o = mk('g', { transform: `translate(${x},${y})` }, layer); const p = mk('g', { class: 'p' }, o); p.innerHTML = markup; gsap.set(p, { svgOrigin: '0 0' }); return p; };
    const txt = (s, size, fillc = '#fff', sw = 14, extra = '') => `<text x="0" y="${size * .35}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${size}" fill="${fillc}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke" ${extra}>${s}</text>`;
    const rr = (x, y, w, h, r, f, sw = 9) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    const gone = (p, until, d = .2) => { if (until != null) tl.to(p, { opacity: 0, scale: .5, duration: d, ease: 'power2.in' }, S(until)); };
    const popIn = (p, t, rot = -12, d = .45, ease = 'elastic.out(1,.5)') => tl.fromTo(p, { scale: 0, rotation: rot, opacity: 1 }, { scale: 1, rotation: 0, duration: d, ease }, S(t));
    const kid = (el, t, rot = -18, d = .34) => { gsap.set(el, { svgOrigin: '0 0' }); tl.fromTo(el, { scale: 0, rotation: rot, opacity: 1 }, { scale: 1, rotation: 0, duration: d, ease: 'back.out(2.6)' }, S(t)); };

    /* ---------- Gizmo's counting-machine DISPLAY: a robot screen with glowing green digits; seq = [[t, '13'], [t2, '14 ?'] ...] (each text shows until the next one) */
    api.display = (layer, x, y, s, seq, t, until, o = {}) => {
      const W = 360, H = 230, led = o.led || '#6CFFB0', size = (str) => (str.length <= 2 ? 172 : str.length <= 4 ? 132 : 96);
      const items = seq.map(([, str]) => `<g class="d" opacity="0"><text x="0" y="${size(str) * .35}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${size(str)}" fill="${led}" stroke="#0B3B2A" stroke-width="9" paint-order="stroke" stroke-linejoin="round">${str}</text></g>`).join('');
      const p = grp(layer, x, y, `<g transform="scale(${s})"><rect x="${-W / 2 + 40}" y="${H / 2 - 4}" width="70" height="26" rx="8" fill="#2E3158" stroke="${OL}" stroke-width="6"/><rect x="${W / 2 - 110}" y="${H / 2 - 4}" width="70" height="26" rx="8" fill="#2E3158" stroke="${OL}" stroke-width="6"/>`
        + `<path d="M${W / 2 - 70},${-H / 2} L${W / 2 - 70},${-H / 2 - 44}" stroke="${OL}" stroke-width="8" stroke-linecap="round"/><circle cx="${W / 2 - 70}" cy="${-H / 2 - 56}" r="14" fill="#FF5E7E" stroke="${OL}" stroke-width="6"/>`
        + rr(-W / 2, -H / 2, W, H, 40, '#5B60A0', 9) + rr(-W / 2 + 24, -H / 2 + 24, W - 48, H - 48, 24, '#0E1A2B', 6) + `<rect x="${-W / 2 + 40}" y="${-H / 2 + 36}" width="${W - 80}" height="22" rx="11" fill="#fff" opacity=".07"/>`
        + [['#FF5E7E', 60], ['#FFD23F', 96], ['#4CD964', 132]].map(([c, dx]) => `<circle cx="${-W / 2 + dx}" cy="${-H / 2 + 12}" r="6" fill="${c}"/>`).join('') + `<g transform="translate(0,2)">${items}</g></g>`);
      LOG(t, 'chip'); popIn(p, t, -6, .5);
      const ds = p.querySelectorAll('.d');
      seq.forEach(([tt], i) => {
        const el = ds[i]; gsap.set(el, { svgOrigin: '0 0' });
        tl.set(el, { opacity: 1 }, S(tt)); tl.fromTo(el, { scale: .55 }, { scale: 1, duration: .24, ease: 'back.out(3)', immediateRender: false }, S(tt));
        if (i + 1 < seq.length) tl.set(el, { opacity: 0 }, S(seq[i + 1][0]));
        if (o.beep !== false && /^\d+$/.test(seq[i][1])) LOG(tt, 'ding', +seq[i][1]);
      });
      gone(p, until); return p;
    };

    /* ---------- the TEN-FRAME board(s): kind = counter picture, N = how many counters (1-20; 11-20 = a full ten + a second frame).
       o.t10: when the first ten pop in; o.extra: pop times of the counters 11..N; o.static: everything is simply there; o.tick: a click per extra counter;
       o.badges: [[index, time | null, label, colour]] a number badge above/below a counter (null = already there) */
    api.tenFrame = (layer, kind, N, cx, cy, s, t, until, o = {}) => {
      const c = 92, fx = N > 10 ? [-270, 270] : [0], pos = [], col = C.COL[kind];
      for (let i = 0; i < N; i++) { const f = i < 10 ? 0 : 1, j = i % 10; pos.push([fx[f] + ((j % 5) - 2) * c, (Math.floor(j / 5) - .5) * c]); }
      let boards = '';
      fx.forEach((x0) => { boards += `<rect x="${x0 - 246}" y="-108" width="492" height="216" rx="34" fill="#fff" fill-opacity=".94" stroke="${OL}" stroke-width="8"/><path d="M${x0 - 230},0 H${x0 + 230}${[-1.5, -.5, .5, 1.5].map((k) => ` M${x0 + k * c},-92 V92`).join('')}" fill="none" stroke="#B7BEE8" stroke-width="5" stroke-linecap="round"/>`; });
      const cnt = pos.map(([x, y]) => `<g transform="translate(${x},${y})"><g class="k"><g transform="scale(.8)">${C.mini(kind)}</g></g></g>`).join('');
      const bds = (o.badges || []).map(([i, , label, bc]) => { const [x, y] = pos[i], up = y < 0; return `<g transform="translate(${x},${y + (up ? -76 : 76)})"><g class="b"><circle r="31" fill="${bc || col}" stroke="${OL}" stroke-width="7"/>${txt(label, 34, '#fff', 7)}</g></g>`; }).join('');
      const p = grp(layer, cx, cy, `<g transform="scale(${s})">${boards}${cnt}${bds}</g>`);
      if (o.noPop) { } else { LOG(t, 'chip'); popIn(p, t, -3, .45); }
      if (!o.static) {
        const ks = p.querySelectorAll('.k'), t10 = o.t10 == null ? t + .12 : o.t10, st = o.step == null ? .03 : o.step;
        ks.forEach((el, i) => {
          const tt = i < 10 ? t10 + i * st : (o.extra ? o.extra[i - 10] : t10 + .4 + (i - 10) * .03);
          kid(el, tt); if (o.tick && i >= 10) LOG(tt, 'tile');
        });
      }
      const bs = p.querySelectorAll('.b');
      (o.badges || []).forEach(([, tb, label], k) => { if (tb != null) { kid(bs[k], tb, -24, .38); LOG(tb, 'ding', +label || k + 1); } });
      gone(p, until); return p;
    };

    /* ---------- the 11..20 progress tray (top right): ONE group; the current number pops in at tPop (null = already there) */
    api.numHud = (layer, n, tPop, tFrom, until) => {
      const x0 = 1556, y0 = 28, cw = 64; let m = rr(x0 - 10, y0 - 10, cw * 5 + 20, cw * 2 + 20, 24, 'rgba(36,27,94,.62)', 5);
      for (let k = 0; k < 10; k++) {
        const v = 11 + k, cur = v === n, done = v < n, px = x0 + (k % 5) * cw + cw / 2, py = y0 + Math.floor(k / 5) * cw + cw / 2;
        m += `<g transform="translate(${px},${py})"><g class="${cur ? 'cur' : 'o'}"><circle r="26" fill="${cur ? '#FFE14D' : done ? '#4CC9F0' : 'rgba(255,255,255,.16)'}" stroke="${OL}" stroke-width="${cur ? 5 : 3}"/><text x="0" y="10" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${v > 19 ? 25 : 27}" fill="${cur ? OL : done ? '#fff' : 'rgba(255,255,255,.55)'}">${v}</text></g></g>`;
      }
      const p = grp(layer, 0, 0, m); gsap.set(p, { opacity: 0 }); tl.set(p, { opacity: 1 }, S(tFrom)); gone(p, until, .15);
      const cur = p.querySelector('.cur'); if (cur && tPop != null) { gsap.set(cur, { svgOrigin: '0 0' }); LOG(tPop, 'tile'); tl.fromTo(cur, { scale: 0, rotation: -25 }, { scale: 1, rotation: 0, duration: .5, ease: 'elastic.out(1,.5)' }, S(tPop)); }
      return p;
    };

    /* ---------- one big skip-counting thing (a pair of socks, a hand, a train car) */
    api.skipItem = (layer, kind, x, y, s, t, until, o = {}) => {
      const p = grp(layer, x, y, `<ellipse cx="0" cy="${100 * s}" rx="${84 * s}" ry="${12 * s}" fill="rgba(36,27,94,.18)"/><g transform="scale(${s})">${C.item(kind, o.i || 0)}</g>`);
      LOG(t, 'objpop'); popIn(p, t, -12, .5);
      const t1 = until != null ? until : t + 3, start = t + .6, n = Math.max(0, Math.min(Math.floor((t1 - start) / .5), Math.floor((CAP - start) / .5)) - 1); if (n > 0) tl.to(p, { y: -(o.amp || 10), duration: .25, yoyo: true, repeat: n, ease: 'sine.inOut' }, S(start));
      gone(p, until); return p;
    };

    /* ---------- a ROW of skip-counting things; each one carries the running total (2, 4, 6 ...) in a badge.
       times[i]: when item i pops in (null = already there).  o.dim + o.lights[i]: all items are there but dim, and light up (a bounce) when the kids say their number */
    api.skipRow = (layer, kind, vals, cx, cy, gap, s, times, until, o = {}) => {
      const n = vals.length;
      vals.forEach((v, i) => {
        const x = cx + (i - (n - 1) / 2) * gap, col = PAL[(i * 2 + 3) % 6];
        const it = grp(layer, x, cy, `<ellipse cx="0" cy="${100 * s}" rx="${84 * s}" ry="${12 * s}" fill="rgba(36,27,94,.18)"/><g transform="scale(${s})">${C.item(kind, i)}</g>`);
        const by = cy + 100 * s + 62, bd = grp(layer, x, by, rr(-72, -44, 144, 88, 34, col, 9) + `<rect x="-52" y="-34" width="104" height="22" rx="11" fill="#fff" opacity=".28"/>` + txt(String(v), v > 99 ? 56 : 66, '#fff', 11));
        const tt = times ? times[i] : null;
        if (tt != null) { LOG(tt, 'ding', i + 1); popIn(it, tt, -12, .5); popIn(bd, tt + .1, 10, .45); }
        if (o.dim && o.lights[i] != null) {
          gsap.set([it, bd], { opacity: .42 });
          const tl_ = o.lights[i]; LOG(tl_, 'ding', i + 1);
          tl.to([it, bd], { opacity: 1, duration: .12 }, S(tl_)); tl.fromTo([it, bd], { scale: 1 }, { scale: 1.22, duration: .16, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, S(tl_));
        }
        gone(it, until); gone(bd, until);
      });
    };
    return api;
  };
})();
