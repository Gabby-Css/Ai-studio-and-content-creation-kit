/* KiddoVerse LEARN #3 - animal props (extends KVP): a talking animal head, a mystery silhouette, the animal answer cards.  Seek-safe tweens only. */
(function () {
  const baseKVP = window.KVP;
  window.KVP = function (tl, mk, rnd, S, BEAT) {
    const api = baseKVP(tl, mk, rnd, S, BEAT);
    const OL = '#2B1B5E', CAP = window.SONG.duration;
    const LOG = (t, k, v) => window.__LOG && window.__LOG(t, k, v);
    const grp = (layer, x, y, markup) => { const o = mk('g', { transform: `translate(${x},${y})` }, layer); const p = mk('g', { class: 'p' }, o); p.innerHTML = markup; gsap.set(p, { svgOrigin: '0 0' }); return p; };
    const rr = (x, y, w, h, r, f, sw = 9) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    const gone = (p, until, d = .2) => { if (until != null) tl.to(p, { opacity: 0, scale: .5, duration: d, ease: 'power2.in' }, S(until)); };
    const popIn = (p, t, rot = -12, d = .45, ease = 'elastic.out(1,.5)') => tl.fromTo(p, { scale: 0, rotation: rot, opacity: 1 }, { scale: 1, rotation: 0, duration: d, ease }, S(t));

    /* ---------- a talking animal head: pops in, the mouth OPENS on every sung sound word (talk = [[t, seconds], ...]) and the head squashes to the beat */
    api.animal = (layer, kind, x, y, s, t, until, talk = [], o = {}) => {
      const p = grp(layer, x, y, (o.shadow === false ? '' : `<ellipse cx="0" cy="${112 * s}" rx="${88 * s}" ry="${12 * s}" fill="rgba(36,27,94,.2)"/>`) + `<g transform="scale(${s})">${window.KVOBJ.draw(kind)}</g>`);
      const mc = p.querySelector('.mc'), mo = p.querySelector('.mo');
      LOG(t, o.quiet ? 'chip' : 'boing', 70); popIn(p, t, o.rot0 == null ? -14 : o.rot0, .5);
      talk.forEach(([tt, dd]) => {
        tl.set(mc, { opacity: 0 }, S(tt)); tl.set(mo, { opacity: 1 }, S(tt)); tl.set(mo, { opacity: 0 }, S(tt + dd)); tl.set(mc, { opacity: 1 }, S(tt + dd));
        tl.fromTo(p, { scaleX: 1.1, scaleY: .92 }, { scaleX: 1, scaleY: 1, duration: .22, ease: 'back.out(2.2)', immediateRender: false }, S(tt));
      });
      if (o.bob !== false) { const t1 = until != null ? until : t + 3, start = t + .6, n = Math.max(0, Math.min(Math.floor((t1 - start) / .5), Math.floor((CAP - start) / .5)) - 1); if (n > 0) tl.to(p, { y: -(o.amp || 10), duration: .25, yoyo: true, repeat: n, ease: 'sine.inOut' }, S(start)); }
      gone(p, until); return p;
    };
    /* ---------- the mystery silhouette ("Who says moo?"): a dark shape of the animal that wobbles and a question mark */
    api.shadowAnimal = (layer, kind, x, y, s, t, until) => {
      const p = grp(layer, x, y, `<g transform="scale(${s})">${window.KVOBJ.drawShadow(kind)}</g><text x="0" y="${22 * s}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${150 * s}" fill="#fff" stroke="${OL}" stroke-width="${14 * s}" stroke-linejoin="round" paint-order="stroke">?</text>`);
      LOG(t, 'chip'); popIn(p, t, -8, .4);
      const t1 = until != null ? until : t + 2, n = Math.max(0, Math.min(Math.floor((t1 - t - .5) / .5), Math.floor((CAP - t - .5) / .5)) - 1);
      if (n > 0) tl.to(p, { rotation: 5, duration: .25, yoyo: true, repeat: n, ease: 'sine.inOut' }, S(t + .5));
      gone(p, until); return p;
    };
    /* ---------- answer cards for the game: three animal heads, the right one grows, the others fade */
    api.animalCards = (layer, kinds, cx, cy, tIn, tReveal, correct, o = {}) => {
      const gap = o.gap || 400;
      kinds.forEach((kind, i) => {
        const x = cx + (i - (kinds.length - 1) / 2) * gap;
        const p = grp(layer, x, cy, rr(-156, -158, 312, 330, 50, '#E9E3FF', 10) + rr(-156, -172, 312, 330, 50, '#fff', 10) + `<g transform="translate(0,-4) scale(.98)">${window.KVOBJ.draw(kind)}</g>`);
        const ti = tIn + i * .3; LOG(ti, 'tile'); popIn(p, ti, i % 2 ? 8 : -8, .4);
        if (i === correct) {
          const g = grp(layer, x, cy, `<circle r="215" fill="#FFE14D" opacity=".38"/><circle r="170" fill="#FFF6B0" opacity=".4"/>`); tl.set(g, { opacity: 0 }, 0); layer.insertBefore(g.parentNode, p.parentNode);
          tl.fromTo(g, { scale: .4, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: 'back.out(2)' }, S(tReveal)); gone(g, o.until);
          tl.to(p, { scale: 1.22, rotation: 0, duration: .35, ease: 'elastic.out(1,.5)' }, S(tReveal));
          const mo = p.querySelector('.mo'), mc = p.querySelector('.mc'); tl.set(mc, { opacity: 0 }, S(tReveal + .1)); tl.set(mo, { opacity: 1 }, S(tReveal + .1));        // the winner opens its mouth and makes its sound
        } else tl.to(p, { scale: .8, opacity: .3, duration: .35, ease: 'power2.out' }, S(tReveal));
        gone(p, o.until);
      });
      LOG(tReveal, 'tada'); api.confetti(layer, S(tReveal), S(tReveal + 1.8), 30);
    };
    return api;
  };
})();
