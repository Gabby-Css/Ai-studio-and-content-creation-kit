/* KiddoVerse LEARN #6 - phonics props (extends KVP): the WORD MACHINE (three letter tiles that pop in with their sounds, then slide together),
   the rhyme plates, the ten-word grid and the little learned-words tray.  Seek-safe tweens only. */
(function () {
  const baseKVP = window.KVP;
  window.KVP = function (tl, mk, rnd, S, BEAT) {
    const api = baseKVP(tl, mk, rnd, S, BEAT);
    const OL = '#2B1B5E', CAP = window.SONG.duration, O = window.KVOBJ;
    const LOG = (t, k, v) => window.__LOG && window.__LOG(t, k, v);
    const grp = (layer, x, y, markup) => { const o = mk('g', { transform: `translate(${x},${y})` }, layer); const p = mk('g', { class: 'p' }, o); p.innerHTML = markup; gsap.set(p, { svgOrigin: '0 0' }); return p; };
    const txt = (s, size, fillc = '#fff', sw = 14, extra = '') => `<text x="0" y="${size * .35}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${size}" fill="${fillc}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke" ${extra}>${s}</text>`;
    const rr = (x, y, w, h, r, f, sw = 9) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    const gone = (p, until, d = .2) => { if (until != null) tl.to(p, { opacity: 0, scale: .5, duration: d, ease: 'power2.in' }, S(until)); };
    const popIn = (p, t, rot = -12, d = .45, ease = 'elastic.out(1,.5)') => tl.fromTo(p, { scale: 0, rotation: rot, opacity: 1 }, { scale: 1, rotation: 0, duration: d, ease }, S(t));
    const kid = (el, t, rot = -14, d = .4) => { gsap.set(el, { svgOrigin: '0 0' }); tl.fromTo(el, { scale: 0, rotation: rot, opacity: 1 }, { scale: 1, rotation: 0, duration: d, ease: 'back.out(2.6)' }, S(t)); };
    const COL = { vowel: '#FF5E7E', c1: '#2F9BFF', c2: '#39C95B' };
    const VOWELS = 'aeiou';
    const tileColor = (word, i) => (VOWELS.includes(word[i]) ? COL.vowel : i === 0 ? COL.c1 : COL.c2);

    /* ---------- THE WORD MACHINE: three slots; tSnd[i] = when letter i pops in and says its sound; tBlend..tWord = the tiles slide together (blend), pulses[i] = a little bounce
       o.noPop: the tiles are simply there (spread), o.joined: already slid together, o.chips: show the sound under each tile ('kuh'), o.panel: draw the machine plate */
    api.wordTiles = (layer, word, sounds, cx, cy, s, tSnd, tBlend, tWord, until, o = {}) => {
      const gap = o.joined ? 214 : 300, tiles = [0, 1, 2].map((i) => {
        const c = tileColor(word, i);
        return `<g transform="translate(${(i - 1) * gap},0)"><g class="t"><g transform="scale(1)">${rr(-108, -108, 216, 244, 42, c, 10)}<rect x="-84" y="-92" width="130" height="20" rx="10" fill="#fff" opacity=".4"/>${txt(word[i], 210, '#fff', 17, 'transform="translate(0,-8)"')}</g></g></g>`;
      }).join('');
      const chips = o.chips ? [0, 1, 2].map((i) => `<g transform="translate(${(i - 1) * gap},0)"><g class="c"><g transform="translate(0,190)">${rr(-84, -40, 168, 80, 40, '#fff', 8)}${txt(sounds[i], 56, tileColor(word, i), 0, 'stroke="none"')}</g></g></g>`).join('') : '';
      const slots = [0, 1, 2].map((i) => `<rect x="${(i - 1) * 300 - 116}" y="-116" width="232" height="260" rx="46" fill="#1B2150" stroke="${OL}" stroke-width="7" opacity=".85"/>`).join('');
      const panel = o.panel === false ? '' : `${rr(-540, -190, 1080, 400, 60, '#5B60A0', 10)}<rect x="-500" y="-172" width="1000" height="26" rx="13" fill="#fff" opacity=".13"/>${[['#FF5E7E', -470], ['#FFD23F', -434], ['#4CD964', -398]].map(([c, x]) => `<circle cx="${x}" cy="-158" r="9" fill="${c}"/>`).join('')}${o.joined ? '' : slots}`;
      const p = grp(layer, cx, cy, `<g transform="scale(${s})">${panel}${tiles}${chips}</g>`);
      if (!o.noPop) { LOG(tSnd[0], 'chip'); popIn(p, tSnd[0] - .02, -3, .3); }
      const ts = p.querySelectorAll('.t'), cs = p.querySelectorAll('.c');
      ts.forEach((el, i) => {
        gsap.set(el, { svgOrigin: '0 0' });
        if (o.noPop || o.joined) { /* already there */ } else { kid(el, tSnd[i]); LOG(tSnd[i], 'tile'); }
        if (tBlend != null && !o.joined) tl.to(el, { x: (i - 1) * (214 - 300), duration: Math.max(.3, tWord - tBlend - .1), ease: 'power2.inOut' }, S(tBlend));
        (o.pulses ? [o.pulses[i]] : []).forEach((tp) => tl.fromTo(el, { scale: 1 }, { scale: 1.16, duration: .12, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, S(tp)));
      });
      cs.forEach((el, i) => { if (o.noPop) return; kid(el, tSnd[i] + .06); if (tBlend != null) tl.to(el, { opacity: 0, duration: .15 }, S(tBlend - .02)); });
      if (tWord != null && !o.joined) { tl.to([...ts], { scale: 1.12, duration: .14, yoyo: true, repeat: 1, ease: 'sine.inOut' }, S(tWord)); LOG(tWord, 'ding', 5); }
      gone(p, until); return p;
    };

    /* ---------- a RHYME pair: two picture plates with their words, the shared ending lit up; tA/tB = the plates pop in, pulses[] = bounce on each sung ending */
    api.rhymePair = (layer, a, b, end, picA, picB, cx, cy, s, tA, tB, pulses, until, o = {}) => {
      const mkPlate = (w, pic) => {
        const k = w.length - end.length, onset = w.slice(0, k);
        return `${rr(-250, -250, 500, 520, 54, '#fff', 10)}<rect x="-220" y="-232" width="260" height="22" rx="11" fill="#E9E3FF"/><g transform="translate(0,-60)"><g transform="scale(1.05)">${O.draw(pic)}</g></g>`
          + `<text x="0" y="206" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="150" stroke="${OL}" stroke-width="16" stroke-linejoin="round" paint-order="stroke"><tspan fill="#8FA6D8">${onset}</tspan><tspan fill="#FF5E7E">${end}</tspan></text>`;
      };
      const pa = grp(layer, cx - 330 * s, cy, `<g transform="scale(${s})">${mkPlate(a, picA)}</g>`), pb = grp(layer, cx + 330 * s, cy, `<g transform="scale(${s})">${mkPlate(b, picB)}</g>`);
      if (tA != null) { LOG(tA, 'objpop'); popIn(pa, tA, -8, .5); } if (tB != null) { LOG(tB, 'objpop'); popIn(pb, tB, 8, .5); }
      (pulses || []).forEach((tp) => { tl.fromTo([pa, pb], { scale: 1 }, { scale: 1.07, duration: .14, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, S(tp)); LOG(tp, 'tile'); });
      gone(pa, until); gone(pb, until); return [pa, pb];
    };

    /* ---------- the TEN-WORD grid (recap): each card = picture + word; times[i] = pops at that time (null = already there) */
    api.wordGrid = (layer, words, pics, cx, cy, s, times, until, o = {}) => {
      words.forEach((w, i) => {
        if (times[i] === -1) return;                                  // -1 = this card is not in this shot yet
        const col = i % 5, row = Math.floor(i / 5), x = cx + (col - 2) * 330 * s, y = cy + (row - .5) * 330 * s;
        const p = grp(layer, x, y, `<g transform="scale(${s})">${rr(-140, -150, 280, 310, 42, '#fff', 9)}<rect x="-114" y="-134" width="150" height="18" rx="9" fill="#E9E3FF"/><g transform="translate(0,-34) scale(.74)">${O.draw(pics[i])}</g><text x="0" y="128" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="92" fill="${['#2F9BFF', '#39C95B', '#FF9F1C', '#A66BFF', '#FF5E7E'][col]}" stroke="${OL}" stroke-width="12" stroke-linejoin="round" paint-order="stroke">${w}</text></g>`);
        if (times[i] != null) { LOG(times[i], 'objpop'); popIn(p, times[i], i % 2 ? 8 : -8, .45); tl.fromTo(p, { scale: 1 }, { scale: 1.12, duration: .15, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, S(times[i] + .5)); }
        gone(p, until);
      });
    };

    /* ---------- the learned-words tray (top right): ONE group of ten little word pills; done ones are blue, the current one pops in at tPop (null = already there) */
    api.wordHud = (layer, words, n, tPop, tFrom, until) => {
      const x0 = 1486, y0 = 26, cw = 76, ch = 52; let m = rr(x0 - 10, y0 - 10, cw * 5 + 20, ch * 2 + 20, 22, 'rgba(36,27,94,.62)', 5);
      words.forEach((w, k) => {
        const cur = k === n, done = k < n, px = x0 + (k % 5) * cw + cw / 2, py = y0 + Math.floor(k / 5) * ch + ch / 2;
        m += `<g transform="translate(${px},${py})"><g class="${cur ? 'cur' : 'o'}"><rect x="-34" y="-21" width="68" height="42" rx="14" fill="${cur ? '#FFE14D' : done ? '#4CC9F0' : 'rgba(255,255,255,.16)'}" stroke="${OL}" stroke-width="${cur ? 5 : 3}"/><text x="0" y="9" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="25" fill="${cur ? OL : done ? '#fff' : 'rgba(255,255,255,.55)'}">${w}</text></g></g>`;
      });
      const p = grp(layer, 0, 0, m); gsap.set(p, { opacity: 0 }); tl.set(p, { opacity: 1 }, S(tFrom)); gone(p, until, .15);
      const cur = p.querySelector('.cur'); if (cur && tPop != null) { gsap.set(cur, { svgOrigin: '0 0' }); LOG(tPop, 'tile'); tl.fromTo(cur, { scale: 0, rotation: -25 }, { scale: 1, rotation: 0, duration: .5, ease: 'elastic.out(1,.5)' }, S(tPop)); }
      return p;
    };
    return api;
  };
})();
