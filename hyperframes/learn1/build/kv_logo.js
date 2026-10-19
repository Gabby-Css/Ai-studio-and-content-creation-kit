/* KiddoVerse logo (mascot planet + bubbly wordmark), animated title sting and subscribe end card. */
(function (root) {
  const OL = '#2B1B5E';
  const BRAND = (root.SONG && root.SONG.brand) || 'KiddoVerse';
  const COLS = ['#FF5E7E', '#FF8A3D', '#FFC93C', '#7BD84A', '#2EC4B6', '#4CC9F0', '#5B8CFF', '#8E6BFF', '#C65BFF', '#FF5EBF'];
  const STAR = 'M0,-30 L8,-10 L30,-9 L13,5 L19,27 L0,15 L-19,27 L-13,5 L-30,-9 L-8,-10Z';
  let uid = 0;
  const planet = () => { const id = 'lgP' + (uid++); return `<svg class="planet" viewBox="-96 -96 192 192" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="${id}" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#D9BFFF"/><stop offset=".55" stop-color="#8E6BFF"/><stop offset="1" stop-color="#5B3CE0"/></radialGradient></defs>
    <g class="ringBack"><ellipse rx="88" ry="26" fill="none" stroke="${OL}" stroke-width="24" transform="rotate(-20)"/><ellipse rx="88" ry="26" fill="none" stroke="#FFD23F" stroke-width="12" transform="rotate(-20)"/></g>
    <circle r="56" fill="url(#${id})" stroke="${OL}" stroke-width="9"/><ellipse cx="-22" cy="-30" rx="18" ry="9" fill="#fff" opacity=".55" transform="rotate(-30 -22 -30)"/>
    <g><circle cx="-19" cy="-4" r="11" fill="#fff" stroke="${OL}" stroke-width="4"/><circle cx="19" cy="-4" r="11" fill="#fff" stroke="${OL}" stroke-width="4"/><circle cx="-17" cy="-3" r="5.5" fill="${OL}"/><circle cx="21" cy="-3" r="5.5" fill="${OL}"/><circle cx="-15" cy="-6" r="2" fill="#fff"/><circle cx="23" cy="-6" r="2" fill="#fff"/>
    <ellipse cx="-34" cy="14" rx="9" ry="5.5" fill="#FF8FA3" opacity=".7"/><ellipse cx="34" cy="14" rx="9" ry="5.5" fill="#FF8FA3" opacity=".7"/><path d="M-14,16 Q0,32 14,16" fill="none" stroke="${OL}" stroke-width="6" stroke-linecap="round"/></g>
    <g transform="rotate(-20)"><path d="M-88,0 A88,26 0 0 0 88,0" fill="none" stroke="${OL}" stroke-width="24" stroke-linecap="round"/><path d="M-88,0 A88,26 0 0 0 88,0" fill="none" stroke="#FFD23F" stroke-width="12" stroke-linecap="round"/></g>
    <g transform="translate(64,-62) rotate(12)"><path d="${STAR}" fill="#FFD23F" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/></g></svg>`; };
  const word = (cls = '') => `<span class="lw ${cls}">${[...BRAND].map((ch, i) => `<b class="lt" style="color:${COLS[i % COLS.length]}">${ch}</b>`).join('')}</span>`;
  const logoHTML = (fs) => `<div class="logo" style="--fs:${fs}px">${planet()}${word()}</div>`;

  /* animated title sting — letters pop on the sung K-i-d / d-o / V-e-r-s-e notes (t = 0, .5, 1.0 s) */
  function KVTitle(tl, t0) {
    const el = document.getElementById('title'), pl = el.querySelector('.planet'), lts = [...el.querySelectorAll('.lt')], tag = el.querySelector('.tag');
    gsap.set(el, { opacity: 0 }); gsap.set([pl, ...lts], { transformOrigin: '50% 80%' }); gsap.set(tag, { opacity: 0 });
    tl.set(el, { opacity: 1 }, t0);
    tl.fromTo(pl, { scale: 0, rotation: -200 }, { scale: 1, rotation: 0, duration: .7, ease: 'elastic.out(1,.55)' }, t0);
    const groups = [[0, 3, 0], [3, 5, .5], [5, 10, 1.0]];
    groups.forEach(([a, b, dt]) => lts.slice(a, b).forEach((l, i) => tl.fromTo(l, { scale: 0, y: 120, rotation: -18 }, { scale: 1, y: 0, rotation: 0, duration: .5, ease: 'back.out(2.6)' }, t0 + dt + i * .05)));
    lts.forEach((l, i) => tl.to(l, { y: -16, duration: .28, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t0 + 1.12 + i * .045));
    tl.fromTo(tag, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .4 }, t0 + 1.15);
    tl.to(pl, { rotation: 360, duration: 1.0, ease: 'power1.inOut' }, t0 + .9);
    tl.to(el, { scale: 1.3, opacity: 0, duration: .22, ease: 'power2.in' }, t0 + 1.8);
    gsap.set(el, { transformOrigin: '50% 50%' });
  }

  /* end card — friendly goodbye over the final waving shot (no end-screen slots / subscribe pill: made-for-kids videos cannot use them) */
  function KVEnd(tl, t0, dur) {
    const el = document.getElementById('endcard'), logo = el.querySelector('.logo'), sub = el.querySelector('.sub');
    gsap.set(el, { opacity: 0 }); gsap.set([logo, sub], { transformOrigin: '50% 50%' });
    tl.to(el, { opacity: 1, duration: .5 }, t0);
    tl.fromTo(logo, { scale: .3, y: 80 }, { scale: 1, y: 0, duration: .7, ease: 'elastic.out(1,.55)' }, t0 + .15);
    tl.fromTo(sub, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5 }, t0 + .8);
    tl.to(sub, { scale: 1.05, duration: .5, yoyo: true, repeat: Math.max(0, Math.floor((dur - t0 - 2.4) / .5) - 1), ease: 'sine.inOut' }, t0 + 1.6);
  }

  root.KVLogo = { html: logoHTML, planet, word, COLS };
  root.KVTitle = KVTitle; root.KVEnd = KVEnd;
})(window);
