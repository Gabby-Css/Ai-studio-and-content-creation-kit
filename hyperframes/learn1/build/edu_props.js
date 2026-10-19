/* KiddoVerse LEARN - lesson props (extends KVP). Every prop is SVG on the shared GSAP timeline: seek-safe, no randomness at render time.
   Usage in the storyboard:  P: (T) => [['tile','front', x, y, 'A', T(0), '#FF5E7E', T(6)], ...]   (first arg after the name = layer)  */
(function () {
  const baseKVP = window.KVP;
  window.KVP = function (tl, mk, rnd, S, BEAT) {
    const api = baseKVP(tl, mk, rnd, S, BEAT);
    const OL = '#2B1B5E', PAL = ['#FF5E7E', '#FFD23F', '#4CC9F0', '#B06BFF', '#4CD964', '#FF9F43'], CAP = window.SONG.duration;
    const LOG = (t, k, v) => window.__LOG && window.__LOG(t, k, v);
    const grp = (layer, x, y, markup) => { const o = mk('g', { transform: `translate(${x},${y})` }, layer); const p = mk('g', { class: 'p' }, o); p.innerHTML = markup; gsap.set(p, { svgOrigin: '0 0' }); return p; };
    const txt = (s, size, fillc = '#fff', sw = 14, extra = '') => `<text x="0" y="${size * .35}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${size}" fill="${fillc}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke" ${extra}>${s}</text>`;
    const rr = (x, y, w, h, r, f, sw = 9) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16), f = (v) => Math.max(0, Math.min(255, Math.round(v * k))); return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => f(v).toString(16).padStart(2, '0')).join(''); };
    const gone = (p, until, d = .22) => { if (until != null) tl.to(p, { opacity: 0, scale: .55, duration: d, ease: 'power2.in' }, S(until)); };
    const popIn = (p, t, rot = -14, d = .5, ease = 'elastic.out(1,.5)') => tl.fromTo(p, { scale: 0, rotation: rot, opacity: 1 }, { scale: 1, rotation: 0, duration: d, ease }, S(t));
    const bobFor = (p, t, until, amp = 12, per = .5) => { const t1 = until != null ? until : t + 3, start = t + .6, n = Math.max(0, Math.min(Math.floor((t1 - start) / (per / 2)), Math.floor((CAP - start) / (per / 2))) - 1); if (n > 0) tl.to(p, { y: -amp, duration: per / 2, yoyo: true, repeat: n, ease: 'sine.inOut' }, S(start)); };

    /* ---------- a drawn object popping in (apple, ball, cat, ...) */
    api.obj = (layer, kind, x, y, s, t, o = {}) => {
      const p = grp(layer, x, y, (o.shadow === false ? '' : `<ellipse cx="0" cy="${104 * s}" rx="${78 * s}" ry="${12 * s}" fill="rgba(36,27,94,.18)"/>`) + `<g transform="scale(${s})">${window.KVOBJ.draw(kind, o.col)}</g>`);
      if (!o.quiet) LOG(t, 'objpop');
      popIn(p, t, o.rot0 == null ? -16 : o.rot0);
      if (o.bob !== false) bobFor(p, t, o.until, o.amp || 12);
      gone(p, o.until); return p;
    };
    /* ---------- an object that falls onto a spot and bounces (hat on head, ball into box) */
    api.drop = (layer, kind, x, y, s, t, o = {}) => {
      const p = grp(layer, x, y, `<g transform="scale(${s})">${window.KVOBJ.draw(kind, o.col)}</g>`);
      LOG(t + (o.fall || .5), 'thud');
      gsap.set(p, { opacity: 0 }); tl.set(p, { opacity: 1 }, S(t));       // hidden until it starts falling (it used to sit visible at its drop height = a 'blob' behind the label)
      tl.fromTo(p, { y: -(o.from || 420), rotation: -12 }, { y: 0, rotation: 0, duration: o.fall || .5, ease: 'bounce.out' }, S(t));
      gone(p, o.until); return p;
    };
    /* ---------- big letter tile "Aa" */
    api.tile = (layer, x, y, ch, t, col, until, o = {}) => {
      const up = ch.toUpperCase(), lo = ch.toLowerCase(), c = col || PAL[(up.charCodeAt(0) - 65) % 6];
      const p = grp(layer, x, y, rr(-150, -138, 300, 300, 46, shade(c, .72), 10) + rr(-150, -152, 300, 290, 46, c, 10) + `<rect x="-124" y="-136" width="170" height="22" rx="11" fill="#fff" opacity=".38"/>`
        + `<g transform="translate(-56,-4)">${txt(up, 210, '#fff', 17)}</g><g transform="translate(88,24)">${txt(lo, 150, '#FFF3A0', 15)}</g>`);
      LOG(t, 'tile'); popIn(p, t, -10, .5); if (o.pulse) tl.to(p, { scale: 1.07, duration: .3, yoyo: true, repeat: Math.max(1, Math.floor((until - t - .6) / .3) - 1), ease: 'sine.inOut' }, S(t + .6));
      gone(p, until); return p;
    };
    /* ---------- speech bubble with the letter's sound ("ah!") */
    api.bubble = (layer, x, y, text, t, col, until, o = {}) => {
      const size = o.size || 92, w = Math.max(200, text.length * size * .58 + 90), h = size * 1.55, side = o.side || -1;
      const p = grp(layer, x, y, `<path d="M${side * w * .28},${h / 2 - 6} L${side * w * .46},${h / 2 + 52} L${side * w * .06},${h / 2 - 6}Z" fill="#fff" stroke="${OL}" stroke-width="9" stroke-linejoin="round"/>` + rr(-w / 2, -h / 2, w, h, h / 2, '#fff', 9)
        + `<path d="M${side * w * .28 - 10},${h / 2 - 12} L${side * w * .06 + 10},${h / 2 - 12}" stroke="#fff" stroke-width="14"/>` + `<text x="0" y="${size * .34}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${size}" fill="${col || PAL[2]}">${text}</text>`);
      LOG(t, 'bubble'); tl.fromTo(p, { scale: 0, rotation: side * -8, opacity: 1 }, { scale: 1, rotation: 0, duration: .4, ease: 'back.out(2.4)' }, S(t)); gone(p, until); return p;
    };
    /* ---------- the word with its first letter highlighted ("Apple"); o.end highlights the last letter instead */
    api.wordLabel = (layer, x, y, word, t, until, o = {}) => {
      const size = o.size || 132, hi = o.hi || '#FFE14D', k = o.end ? word.length - 1 : 0;      // o.end: highlight the LAST letter (X in "box")
      const p = grp(layer, x, y, `<text x="0" y="${size * .35}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${size}" stroke="${OL}" stroke-width="${size * .12}" stroke-linejoin="round" paint-order="stroke"><tspan fill="#fff">${word.slice(0, k)}</tspan><tspan fill="${hi}">${word[k]}</tspan><tspan fill="#fff">${word.slice(k + 1)}</tspan></text>`);
      LOG(t, 'chip'); tl.fromTo(p, { scale: 0, y: 40, opacity: 1 }, { scale: 1, y: 0, duration: .42, ease: 'back.out(2.2)' }, S(t)); gone(p, until); return p;
    };
    /* ---------- huge numeral */
    api.numeral = (layer, x, y, n, t, col, until, o = {}) => {
      const size = o.size || 330, p = grp(layer, x, y, txt(String(n), size, col || '#FFE14D', size * .09, `style="filter:drop-shadow(0 10px 0 rgba(43,27,94,.35))"`));
      LOG(t, 'chip'); popIn(p, t, -12, .55); tl.to(p, { scale: 1.06, duration: .35, yoyo: true, repeat: Math.max(1, Math.floor(((until || t + 3) - t - .6) / .35) - 1), ease: 'sine.inOut' }, S(t + .6)); gone(p, until); return p;
    };
    /* ---------- counting: n items pop one by one at times[k], each with a numbered badge and a rising ding */
    api.counter = (layer, kind, n, cx, cy, times, o = {}) => {
      const s = o.scale || (n <= 3 ? 1.3 : n === 4 ? 1.1 : n === 5 ? 1.0 : n <= 8 ? .9 : .86), rows = n <= 5 ? [n] : [Math.ceil(n / 2), Math.floor(n / 2)];
      const sp = o.spacing || (n <= 3 ? 340 : n === 4 ? 280 : n === 5 ? 250 : n <= 8 ? 300 : 250), rowY = rows.length === 1 ? [cy] : [cy - 118, cy + 172], pos = [];     // 290 px between the rows (was 250), 6-8 objects slightly smaller (.9, was .98): the row-2 number badges no longer touch the objects above (row 1 stays put: the badges keep their gap to the big numeral)
      rows.forEach((m, ri) => { for (let i = 0; i < m; i++) pos.push([cx + (i - (m - 1) / 2) * sp, rowY[ri]]); });
      const multi = ['balloon', 'flower', 'heart'].includes(kind) || o.rainbow;
      pos.forEach(([x, y], k) => {
        const t = times[k];
        api.obj(layer, kind, x, y, s, t, { col: multi ? PAL[k % 6] : undefined, until: o.until, quiet: true, shadow: false, amp: 10 });
        LOG(t, 'ding', k + 1);
        const b = grp(layer, x, y - 128 * s - 30, `<circle r="38" fill="${PAL[k % 6]}" stroke="${OL}" stroke-width="8"/>` + txt(String(k + 1), 48, '#fff', 8));
        tl.fromTo(b, { scale: 0, opacity: 1 }, { scale: 1, duration: .32, ease: 'back.out(3)' }, S(t + .06)); gone(b, o.until);
      });
      if (o.cheer !== false) api.sparkles(layer, cx, cy, S(times[n - 1] + .25), 8, 640, 38);
    };
    /* ---------- two letter tiles slide together to make a word */
    api.wordTiles = (layer, word, cx, cy, t0, tj, until, o = {}) => {
      const tileMk = (ch, c) => rr(-112, -122, 224, 250, 40, shade(c, .72), 9) + rr(-112, -134, 224, 240, 40, c, 9) + `<rect x="-90" y="-118" width="120" height="18" rx="9" fill="#fff" opacity=".38"/>` + `<g transform="translate(0,-6)">${txt(ch, 190, '#fff', 15)}</g>`;
      const a = grp(layer, cx - 200, cy, tileMk(word[0], PAL[0])), b = grp(layer, cx + 200, cy, tileMk(word[1], PAL[2]));
      LOG(t0, 'tile'); tl.fromTo(a, { x: -900, opacity: 1, rotation: -12 }, { x: 0, rotation: 0, duration: .45, ease: 'back.out(1.6)' }, S(t0));
      LOG(t0 + .5, 'tile'); tl.fromTo(b, { x: 900, opacity: 1, rotation: 12 }, { x: 0, rotation: 0, duration: .45, ease: 'back.out(1.6)' }, S(t0 + .5));
      tl.to(a, { x: 82, duration: .3, ease: 'power2.in' }, S(tj - .05)); tl.to(b, { x: -82, duration: .3, ease: 'power2.in' }, S(tj - .05));
      tl.to([a, b], { scale: 1.16, duration: .14, yoyo: true, repeat: 1, ease: 'power2.out' }, S(tj + .28)); tl.to([a, b], { scale: 1.06, duration: .3, yoyo: true, repeat: Math.max(1, Math.floor((until - tj - .8) / .3) - 1), ease: 'sine.inOut' }, S(tj + .75));
      LOG(tj + .28, 'ding', 5); const bu = api.burst(layer, cx, cy, S(tj + .28), '#FFE14D', 240, false); layer.insertBefore(bu.parentNode, a.parentNode); gone(a, until); gone(b, until);   // rays only (a ring reads as an extra letter 'o'), drawn BEHIND the tiles
    };
    /* ---------- answer cards for the game rounds */
    api.cards = (layer, labels, cx, cy, tIn, tReveal, correct, o = {}) => {
      const size = o.size || 190, gap = o.gap || 380;
      labels.forEach((lb, i) => {
        const x = cx + (i - (labels.length - 1) / 2) * gap, c = PAL[(i * 2 + 1) % 6];
        const p = grp(layer, x, cy, rr(-156, -158, 312, 330, 50, '#E9E3FF', 10) + rr(-156, -172, 312, 330, 50, '#fff', 10) + `<rect x="-132" y="-158" width="130" height="20" rx="10" fill="${c}" opacity=".35"/>` + `<text x="0" y="${size * .34 - 6}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${size}" fill="${c}" stroke="${OL}" stroke-width="${size * .06}" paint-order="stroke" stroke-linejoin="round">${lb}</text>`);
        const ti = tIn + i * .35; LOG(ti, 'tile'); popIn(p, ti, i % 2 ? 8 : -8, .45);
        if (i === correct) { const g = grp(layer, x, cy, `<circle r="215" fill="#FFE14D" opacity=".38"/><circle r="170" fill="#FFF6B0" opacity=".4"/>`); tl.set(g, { opacity: 0 }, 0); tl.fromTo(g, { scale: .4, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: 'back.out(2)' }, S(tReveal)); gone(g, o.until);
          tl.to(p, { scale: 1.22, rotation: 0, duration: .35, ease: 'elastic.out(1,.5)' }, S(tReveal)); } else tl.to(p, { scale: .8, opacity: .3, duration: .35, ease: 'power2.out' }, S(tReveal));
        gone(p, o.until);
      });
      LOG(tReveal, 'tada'); api.confetti(layer, S(tReveal), S(tReveal + 1.8), 30);
    };
    /* ---------- "thinking time" star countdown (kids answer out loud) */
    api.countdown = (layer, x, y, t0, n, step, until) => {
      for (let k = 0; k < n; k++) { const p = grp(layer, x + (k - (n - 1) / 2) * 150, y, `<path d="${window.KVOBJ.STAR(62)}" fill="${PAL[(k + 1) % 6]}" stroke="${OL}" stroke-width="9" stroke-linejoin="round"/>` + `<path d="${window.KVOBJ.STAR(30)}" fill="#fff" opacity=".5"/>`);
        LOG(t0 + k * step, 'tick'); tl.fromTo(p, { scale: 0, rotation: -60, opacity: 1 }, { scale: 1, rotation: 0, duration: .35, ease: 'back.out(3)' }, S(t0 + k * step)); tl.to(p, { scale: 1.12, duration: .25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, S(t0 + k * step + .4)); gone(p, until); }
    };
    /* ---------- small helpers for the word pictures */
    api.arrow = (layer, x, y, rot, t, col, until) => {
      const p = grp(layer, x, y, `<g transform="rotate(${rot})"><path d="M-70,-26 L18,-26 L18,-62 L88,0 L18,62 L18,26 L-70,26Z" fill="${col || '#FFE14D'}" stroke="${OL}" stroke-width="9" stroke-linejoin="round"/></g>`);
      popIn(p, t, 0, .4, 'back.out(2.4)'); tl.to(p, { x: Math.cos(rot * Math.PI / 180) * 26, y: Math.sin(rot * Math.PI / 180) * 26, duration: .3, yoyo: true, repeat: Math.max(1, Math.floor(((until || t + 3) - t - .5) / .3) - 1), ease: 'sine.inOut' }, S(t + .5)); gone(p, until); return p;
    };
    api.noSign = (layer, x, y, t, until) => { const p = grp(layer, x, y, `<circle r="92" fill="#fff" fill-opacity=".85" stroke="#FF3B5C" stroke-width="24"/><path d="M-62,-62 L62,62" stroke="#FF3B5C" stroke-width="24" stroke-linecap="round"/>`); LOG(t, 'chip'); popIn(p, t, -14, .45); gone(p, until); return p; };
    api.glass = (layer, x, y, t, until) => { const p = grp(layer, x, y, `<path d="M42,42 L96,96" stroke="${OL}" stroke-width="30" stroke-linecap="round"/><path d="M42,42 L96,96" stroke="#FF9F43" stroke-width="16" stroke-linecap="round"/><circle r="66" fill="#BFEFFF" fill-opacity=".4" stroke="${OL}" stroke-width="12"/><circle r="66" fill="none" stroke="#fff" stroke-width="5" opacity=".7" transform="scale(.8)"/>`);
      LOG(t, 'chip'); popIn(p, t, 0, .4); tl.to(p, { x: 150, y: -40, duration: .5, yoyo: true, repeat: Math.max(1, Math.floor(((until || t + 3) - t - .5) / .5) - 1), ease: 'sine.inOut' }, S(t + .5)); gone(p, until); return p; };
    /* ---------- the whole alphabet: tiles light up as each letter is sung */
    api.alphaGrid = (layer, cx, cy, times, o = {}) => {
      const k0 = o.k || 1, letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), sx = 168 * k0, sy = 150 * k0, rows = [9, 9, 8], pos = [];
      rows.forEach((m, ri) => { for (let i = 0; i < m; i++) pos.push([cx + (i - (m - 1) / 2) * sx, cy + (ri - 1) * sy]); });
      letters.forEach((ch, k) => {
        const c = PAL[k % 6], [x, y] = pos[k];
        const p = grp(layer, x, y, rr(-62, -56, 124, 124, 26, shade(c, .7), 8) + rr(-62, -66, 124, 124, 26, c, 8) + `<g transform="translate(0,-4)">${txt(ch, 92, '#fff', 13)}</g>`);
        tl.fromTo(p, { scale: 0, opacity: 0 }, { scale: .9 * k0, opacity: .55, duration: .3, ease: 'back.out(2)' }, S(o.t0 + k * .03));
        tl.to(p, { scale: 1.32 * k0, opacity: 1, duration: .16, ease: 'back.out(3)' }, S(times[ch])); tl.to(p, { scale: 1.0 * k0, duration: .3, ease: 'power2.out' }, S(times[ch] + .2)); LOG(times[ch], 'tile');
        gone(p, o.until);
      });
    };
    /* ---------- a row of 1..10 that lights up as the numbers are sung */
    api.numRow = (layer, cx, cy, times, o = {}) => {
      for (let k = 0; k < 10; k++) {
        const x = cx + (k - 4.5) * 172, c = PAL[k % 6];
        const p = grp(layer, x, cy, `<circle r="70" fill="${shade(c, .7)}" cy="8" stroke="${OL}" stroke-width="9"/><circle r="70" fill="${c}" stroke="${OL}" stroke-width="9"/>` + txt(String(k + 1), k === 9 ? 74 : 94, '#fff', 13));
        tl.fromTo(p, { scale: 0, opacity: 0 }, { scale: .86, opacity: .55, duration: .3, ease: 'back.out(2)' }, S(o.t0 + k * .05));
        tl.to(p, { scale: 1.3, opacity: 1, duration: .16, ease: 'back.out(3)' }, S(times[k])); tl.to(p, { scale: 1.0, duration: .3, ease: 'power2.out' }, S(times[k] + .2)); LOG(times[k], 'ding', k + 1); gone(p, o.until);
      }
    };
    return api;
  };
})();
