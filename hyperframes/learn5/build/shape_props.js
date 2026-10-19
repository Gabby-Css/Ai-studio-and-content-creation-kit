/* KiddoVerse LEARN #4 - shape props (extends KVP): a talking shape character, the outline that traces round an object, the mystery silhouette, a conveyor belt of
   jumbled shapes, the "sorted shapes" tray, answer cards, side counters and shapes that drop into place.  Seek-safe tweens only. */
(function () {
  const baseKVP = window.KVP;
  window.KVP = function (tl, mk, rnd, S, BEAT) {
    const api = baseKVP(tl, mk, rnd, S, BEAT);
    const OL = '#2B1B5E', CAP = window.SONG.duration, O = window.KVOBJ;
    const LOG = (t, k, v) => window.__LOG && window.__LOG(t, k, v);
    const grp = (layer, x, y, markup) => { const o = mk('g', { transform: `translate(${x},${y})` }, layer); const p = mk('g', { class: 'p' }, o); p.innerHTML = markup; gsap.set(p, { svgOrigin: '0 0' }); return p; };
    const rr = (x, y, w, h, r, f, sw = 9) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    const gone = (p, until, d = .2) => { if (until != null) tl.to(p, { opacity: 0, scale: .5, duration: d, ease: 'power2.in' }, S(until)); };
    const popIn = (p, t, rot = -12, d = .45, ease = 'elastic.out(1,.5)') => tl.fromTo(p, { scale: 0, rotation: rot, opacity: 1 }, { scale: 1, rotation: 0, duration: d, ease }, S(t));
    const show = (p, t) => { gsap.set(p, { opacity: 0 }); tl.set(p, { opacity: 1 }, S(t)); };

    /* ---------- a talking shape: pops in, the mouth OPENS on every sung word (talk = [[t, seconds], ...]) and the body squashes to the beat */
    api.shapeChar = (layer, kind, x, y, s, t, until, talk = [], o = {}) => {
      const p = grp(layer, x, y, (o.shadow === false ? '' : `<ellipse cx="0" cy="${(kind === 'triangle' ? 96 : kind === 'rectangle' ? 76 : kind === 'star' ? 118 : 108) * s + 14 * s}" rx="${84 * s}" ry="${12 * s}" fill="rgba(36,27,94,.2)"/>`) + `<g transform="scale(${s})">${O.draw('sh_' + kind)}</g>`);
      const mc = p.querySelector('.mc'), mo = p.querySelector('.mo');
      LOG(t, o.quiet ? 'chip' : 'boing', 70); popIn(p, t, o.rot0 == null ? -14 : o.rot0, .5);
      talk.forEach(([tt, dd]) => {
        tl.set(mc, { opacity: 0 }, S(tt)); tl.set(mo, { opacity: 1 }, S(tt)); tl.set(mo, { opacity: 0 }, S(tt + dd)); tl.set(mc, { opacity: 1 }, S(tt + dd));
        tl.fromTo(p, { scaleX: 1.1, scaleY: .92 }, { scaleX: 1, scaleY: 1, duration: .22, ease: 'back.out(2.2)', immediateRender: false }, S(tt));
      });
      if (o.spin) tl.to(p, { rotation: 360, duration: o.spin, ease: 'power1.inOut' }, S(t + .5));
      if (o.bob !== false) { const t1 = until != null ? until : t + 3, start = t + .6, n = Math.max(0, Math.min(Math.floor((t1 - start) / .5), Math.floor((CAP - start) / .5)) - 1); if (n > 0) tl.to(p, { y: -(o.amp || 10), duration: .25, yoyo: true, repeat: n, ease: 'sine.inOut' }, S(start)); }
      gone(p, until); return p;
    };
    /* ---------- the outline of a shape traced round something (an apple... no: a ball, a window), then it pulses */
    api.shapeOutline = (layer, kind, x, y, s, t, until, col = '#fff', o = {}) => {
      const d = O.SHAPE_D[kind], w = o.w || 12;
      const p = grp(layer, x, y, `<g transform="rotate(${o.rot || 0}) scale(${s})">${o.fill ? `<path class="fl" d="${d}" fill="${col}" opacity="0"/>` : ''}<path class="ol" d="${d}" fill="none" stroke="${OL}" stroke-width="${w + 10}" stroke-linejoin="round" stroke-linecap="round"/><path class="ol" d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/></g>`);
      const dur = o.dur || .6; LOG(t, 'sparkle'); show(p, t);
      p.querySelectorAll('.ol').forEach((path) => { const len = path.getTotalLength() + 2; gsap.set(path, { strokeDasharray: len, strokeDashoffset: len }); tl.to(path, { strokeDashoffset: 0, duration: dur, ease: 'power2.inOut' }, S(t)); });
      const fl = p.querySelector('.fl'); if (fl) tl.to(fl, { opacity: o.fill, duration: .4, ease: 'power1.out' }, S(t + dur * .6));
      tl.fromTo(p, { scale: 1 }, { scale: 1.06, duration: .16, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, S(t + dur));
      gone(p, until); return p;
    };
    /* ---------- the mystery silhouette ("What shape is this?") with a question mark */
    api.shadowShape = (layer, kind, x, y, s, t, until) => {
      const p = grp(layer, x, y, `<g transform="scale(${s})">${O.drawShadow(kind)}</g><text x="0" y="${24 * s}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${150 * s}" fill="#fff" stroke="${OL}" stroke-width="${14 * s}" stroke-linejoin="round" paint-order="stroke">?</text>`);
      LOG(t, 'chip'); popIn(p, t, -8, .4);
      const t1 = until != null ? until : t + 2, n = Math.max(0, Math.min(Math.floor((t1 - t - .5) / .5), Math.floor((CAP - t - .5) / .5)) - 1);
      if (n > 0) tl.to(p, { rotation: 5, duration: .25, yoyo: true, repeat: n, ease: 'sine.inOut' }, S(t + .5));
      gone(p, until); return p;
    };
    /* ---------- the workshop conveyor belt: a belt strip with moving chevrons and small jumbled shapes riding across (all the 8 shapes in a mixed order) */
    api.belt = (layer, y, t0, t1, kinds, o = {}) => {
      const dur = Math.max(.5, t1 - t0), n = kinds.length, gap = o.gap || 300;
      const chev = [...Array(26)].map((_, i) => `<path d="M${-60 + i * 90},-16 L${-32 + i * 90},0 L${-60 + i * 90},16" fill="none" stroke="#9AA3D6" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
      const belt = grp(layer, 0, y, `<rect x="-80" y="-36" width="2080" height="72" rx="36" fill="#4B4F77" stroke="${OL}" stroke-width="9"/><g class="chev">${chev}</g><rect x="-80" y="30" width="2080" height="14" rx="7" fill="#2E3158"/>`);
      show(belt, t0); tl.fromTo(belt.querySelector('.chev'), { x: 0 }, { x: 90 * Math.max(1, Math.round(dur * 2)), duration: dur, ease: 'none', immediateRender: false }, S(t0)); gone(belt, t1, .2);
      kinds.forEach((k, i) => {
        const g = grp(layer, -200 - i * gap, y - 86, `<g transform="scale(${o.s || .46})">${O.drawPlain(k)}</g>`); show(g, t0);
        tl.fromTo(g, { x: -200 - i * gap }, { x: 2100, duration: dur * (o.speed || 1), ease: 'none', immediateRender: false }, S(t0)); gone(g, t1, .15);
        tl.fromTo(g, { y: y - 86 }, { y: y - 98, duration: .25, yoyo: true, repeat: Math.max(0, Math.floor(dur / .5) - 1), ease: 'sine.inOut', immediateRender: false }, S(t0));
      });
      return belt;
    };
    /* ---------- the tray of sorted shapes (top right): earlier shapes are already in, the current one pops in at tCurr */
    api.shapeHud = (layer, kinds, done, popIdx, tPop, tFrom, until, o = {}) => {
      const x0 = o.x || 1540, y0 = o.y || 34, cw = 76;
      return kinds.map((k, i) => {
        const cx = x0 + (i % 4) * cw + cw / 2, cy = y0 + Math.floor(i / 4) * cw + cw / 2;
        const bg = grp(layer, cx, cy, rr(-34, -34, 68, 68, 16, 'rgba(36,27,94,.55)', 4)); show(bg, tFrom); gone(bg, until, .15);
        if (i < done || i === popIdx) {
          const ic = grp(layer, cx, cy, `<g transform="scale(.26)">${O.drawPlain(k)}</g>`);
          if (i === popIdx) { LOG(tPop, 'tile'); popIn(ic, tPop, -20, .45); } else show(ic, tFrom);
          gone(ic, until, .15);
        }
        return bg;
      });
    };
    /* ---------- the sides / points of a shape counted: numbers 1, 2, 3 ... pop at the edges (x, y = shape centre, s = its scale) */
    api.countSides = (layer, kind, x, y, s, t0, step, until) => {
      const pts = O.SIDEPTS[kind] || []; const out = [];
      pts.forEach(([px, py], i) => {
        const p = grp(layer, x + px * s * 1.18, y + py * s * 1.18, `<circle r="30" fill="#fff" stroke="${OL}" stroke-width="7"/><text x="0" y="12" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="40" fill="${OL}">${i + 1}</text>`);
        LOG(t0 + i * step, 'ding', i + 1); popIn(p, t0 + i * step, -20, .35); gone(p, until, .15); out.push(p);
      });
      return out;
    };
    /* ---------- a plain shape that drops into place and bounces (the house) */
    api.dropShape = (layer, kind, x, y, s, t, o = {}) => {
      const p = grp(layer, x, y, `<g transform="${o.rot ? `rotate(${o.rot}) ` : ''}scale(${s})">${O.drawPlain(kind, o.col)}</g>`);
      if (!o.silent) LOG(t + (o.fall || .45), 'thud'); show(p, t);
      tl.fromTo(p, { y: -(o.from == null ? 520 : o.from), rotation: -10 }, { y: 0, rotation: 0, duration: o.fall || .45, ease: 'bounce.out', immediateRender: false }, S(t));
      if (o.sparkle !== false) tl.call(() => {}, [], S(t + .5));
      gone(p, o.until); return p;
    };
    /* ---------- answer cards for the game: three shapes, the right one grows, gets a face and says its name */
    api.shapeCards = (layer, kinds, cx, cy, tIn, tReveal, correct, o = {}) => {
      const gap = o.gap || 400;
      kinds.forEach((kind, i) => {
        const x = cx + (i - (kinds.length - 1) / 2) * gap;
        const p = grp(layer, x, cy, rr(-156, -158, 312, 330, 50, '#E9E3FF', 10) + rr(-156, -172, 312, 330, 50, '#fff', 10) + `<g class="pl" transform="translate(0,-4) scale(.9)">${O.drawPlain(kind)}</g><g class="ch" opacity="0" transform="translate(0,-4) scale(.9)">${O.draw('sh_' + kind)}</g>`);
        const ti = tIn + i * .3; LOG(ti, 'tile'); popIn(p, ti, i % 2 ? 8 : -8, .4);
        if (i === correct) {
          const g = grp(layer, x, cy, `<circle r="215" fill="#FFE14D" opacity=".38"/><circle r="170" fill="#FFF6B0" opacity=".4"/>`); tl.set(g, { opacity: 0 }, 0); layer.insertBefore(g.parentNode, p.parentNode);
          tl.fromTo(g, { scale: .4, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: 'back.out(2)' }, S(tReveal)); gone(g, o.until);
          tl.to(p, { scale: 1.22, rotation: 0, duration: .35, ease: 'elastic.out(1,.5)' }, S(tReveal));
          tl.set(p.querySelector('.pl'), { opacity: 0 }, S(tReveal)); tl.set(p.querySelector('.ch'), { opacity: 1 }, S(tReveal)); tl.set(p.querySelector('.mc'), { opacity: 0 }, S(tReveal + .05)); tl.set(p.querySelector('.mo'), { opacity: 1 }, S(tReveal + .05));
        } else tl.to(p, { scale: .8, opacity: .3, duration: .35, ease: 'power2.out' }, S(tReveal));
        gone(p, o.until);
      });
      LOG(tReveal, 'tada'); api.confetti(layer, S(tReveal), S(tReveal + 1.8), 30);
    };
    return api;
  };
})();
