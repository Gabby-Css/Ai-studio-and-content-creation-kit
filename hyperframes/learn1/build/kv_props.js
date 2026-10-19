/* KiddoVerse props & FX. Every prop is built from SVG and animated on the shared timeline (seek-safe, seeded randomness). */
window.KVP = function (tl, mk, rnd, S, BEAT) {
  const OL = '#2B1B5E', PAL = ['#FF5E7E', '#FFD23F', '#4CC9F0', '#B06BFF', '#4CD964', '#FF9F43'];
  const H = window.KV.h;
  const STAR = (r) => `M0,${-r} L${r * .27},${-r * .33} L${r},${-r * .31} L${r * .44},${r * .14} L${r * .62},${r * .84} L0,${r * .46} L${-r * .62},${r * .84} L${-r * .44},${r * .14} L${-r},${-r * .31} L${-r * .27},${-r * .33}Z`;
  const SP4 = 'M0,-1 Q.14,-.14 1,0 Q.14,.14 0,1 Q-.14,.14 -1,0 Q-.14,-.14 0,-1Z';
  const grp = (layer, x, y, markup) => { const o = mk('g', { transform: `translate(${x},${y})` }, layer); const p = mk('g', { class: 'p' }, o); p.innerHTML = markup; gsap.set(p, { svgOrigin: '0 0' }); return p; };
  const txt = (s, size, fillc = '#fff', sw = 14) => `<text x="0" y="${size * .35}" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="${size}" fill="${fillc}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke">${s}</text>`;
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const CAP = window.SONG.duration, reps = (t, d) => Math.max(0, Math.floor((CAP - t) / d) - 1);
  const LOG = (t, k, v) => window.__LOG && window.__LOG(t, k, v);
  const api = {};

  api.dust = (layer, t0, t1, n = 8, col = '#fff') => {
    for (let i = 0; i < n; i++) {
      const p = grp(layer, rnd() * 1920, 140 + rnd() * 900, `<circle r="${(2 + rnd() * 4).toFixed(1)}" fill="${col}" opacity="${(.25 + rnd() * .4).toFixed(2)}"/>`);
      tl.fromTo(p, { x: 0, y: 0 }, { x: (rnd() - .5) * 120, y: -60 - rnd() * 80, duration: t1 - t0, ease: 'none' }, t0);
    }
  };
  api.sparkle = (layer, x, y, t, size = 44, col = '#FFE14D', quiet = false) => {
    if (!quiet) LOG(t, 'sparkle');
    const p = grp(layer, x, y, `<path d="${SP4}" fill="${col}" stroke="#fff" stroke-width="0.06" transform="scale(${size})"/>`);
    tl.fromTo(p, { scale: 0, rotation: 0, opacity: 1 }, { scale: 1, rotation: 80, duration: .22, ease: 'back.out(3)' }, t); tl.to(p, { scale: 0, opacity: 0, rotation: 160, duration: .32, ease: 'power2.in' }, S(t + .22));
  };
  api.sparkles = (layer, cx, cy, t, n = 6, spread = 160, size = 36) => { LOG(t, 'sparkle'); for (let i = 0; i < n; i++) api.sparkle(layer, cx + (rnd() - .5) * spread * 2, cy + (rnd() - .5) * spread, S(t + i * .06), size * (.6 + rnd() * .8), pick(['#FFE14D', '#fff', '#FF9BD0', '#7BE8FF']), true); };
  api.burst = (layer, x, y, t, col = '#FFE14D', r = 170, ring = true) => {
    LOG(t, 'burst');
    const p = grp(layer, x, y, (ring ? `<circle r="40" fill="none" stroke="${col}" stroke-width="16"/>` : '') + [...Array(10)].map((_, i) => `<rect x="${r * .55}" y="-5" width="${r * .3}" height="10" rx="5" fill="${col}" transform="rotate(${i * 36})"/>`).join(''));
    tl.fromTo(p, { scale: .15, opacity: 1 }, { scale: 1.25, duration: .34, ease: 'power3.out' }, t); tl.to(p, { opacity: 0, duration: .16 }, S(t + .24));
    return p;
  };
  api.confetti = (layer, t0, t1, n = 28) => {
    LOG(t0, 'confetti');
    for (let i = 0; i < n; i++) {
      const x0 = rnd() * 2000 - 40, d = 1.5 + rnd() * 1.4, dl = rnd() * .5;
      const p = grp(layer, x0, -60, `<rect x="-9" y="-5" width="${(12 + rnd() * 8).toFixed(0)}" height="${(7 + rnd() * 5).toFixed(0)}" rx="2" fill="${pick(PAL)}"/>`);
      tl.fromTo(p, { y: -60 - rnd() * 200, x: 0, rotation: 0, opacity: 1 }, { y: 1160, x: (rnd() - .5) * 200, rotation: (rnd() < .5 ? -1 : 1) * (360 + rnd() * 480), duration: d, ease: 'none' }, S(t0 + dl));
      tl.set(p, { opacity: 0 }, S(t0 + dl + d));
    }
  };
  api.notes = (layer, x, y, t0, t1, k = 1) => {      // k < 1: a shorter rise (the notes over the letter grid / number row must fade out before they reach the tiles)
    const NOTE = 'M0,-26 L0,18 M0,-26 Q22,-22 22,-2 M-11,18 a11,8 -20 1,0 .1,0Z';
    for (let t = t0, i = 0; t < t1 - .4; t += .55, i++) {
      const p = grp(layer, x + (i % 3 - 1) * 46, y, `<path d="${NOTE}" fill="${PAL[i % 6]}" stroke="${OL}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" transform="scale(1.5)"/>`);
      tl.fromTo(p, { y: 0, opacity: 0, scale: .4, rotation: -14 }, { y: -190 * k, opacity: 1, scale: 1, rotation: 14, duration: .4, ease: 'power1.out' }, S(t)); tl.to(p, { y: -270 * k, opacity: 0, duration: .45, ease: 'power1.in' }, S(t + .4));
    }
  };
  api.speed = (layer, t0, t1, dir = 1, n = 16) => {
    LOG(t0, 'whoosh', .8);
    for (let i = 0; i < n; i++) {
      const y = 60 + rnd() * 960, w = 240 + rnd() * 420, p = grp(layer, 0, y, `<rect x="0" y="-3" width="${w.toFixed(0)}" height="${(4 + rnd() * 4).toFixed(0)}" rx="3" fill="#fff" opacity="${(.35 + rnd() * .4).toFixed(2)}"/>`);
      const d = .28 + rnd() * .22, reps = Math.ceil((t1 - t0) / d);
      tl.fromTo(p, { x: dir > 0 ? 2200 : -700 }, { x: dir > 0 ? -800 : 2300, duration: d, ease: 'none', repeat: reps, delay: 0 }, S(t0 + rnd() * .2));
    }
  };
  api.balloon = (layer, x, y, col, t0, t1, delay = 0) => {
    LOG(t0 + delay + .5, 'balloon');
    const p = grp(layer, x, y, `<line x1="0" y1="64" x2="0" y2="190" stroke="#fff" stroke-width="4" opacity=".9"/><path d="M0,60 L-12,80 L12,80Z" fill="${col}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="0" rx="58" ry="70" fill="${col}" stroke="${OL}" stroke-width="7"/><ellipse cx="-20" cy="-26" rx="12" ry="22" fill="#fff" opacity=".55" transform="rotate(20 -20 -26)"/>`);
    tl.fromTo(p, { y: 1100 - y + 0, x: 0, opacity: 1 }, { y: 0, duration: .9, ease: 'back.out(1.1)' }, S(t0 + delay));
    for (let t = t0 + delay + .9, k = 0; t < t1 - .05; t += .8, k++) tl.to(p, { x: k % 2 ? 16 : -16, y: -k * 6, rotation: k % 2 ? 4 : -4, duration: .8, ease: 'sine.inOut' }, S(t));
  };
  api.egg = (layer, x, y, n, tIn, tCrack, tHatch, col = '#7ED957', state = 'whole') => {
    const top = 'M-62,-6 L-30,-26 L-8,-2 L16,-28 L40,-4 L62,-22 C62,-70 40,-120 0,-124 C-40,-120 -62,-70 -62,-6Z';
    const bot = 'M-62,-6 L-30,-26 L-8,-2 L16,-28 L40,-4 L62,-22 C62,20 34,44 0,44 C-34,44 -62,20 -62,-6Z';
    const spots = [[-26, -70, 11], [22, -84, 9], [30, -52, 8], [-34, -34, 7]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="${col}" opacity=".75"/>`).join('');
    const p = grp(layer, x, y - 44, `<ellipse cx="0" cy="48" rx="76" ry="14" fill="rgba(36,27,94,.18)"/><g class="eb"><path d="${bot}" fill="#FFF6DC" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/></g>
      <g class="baby" opacity="0"><circle cx="0" cy="-34" r="50" fill="${col}" stroke="${OL}" stroke-width="7"/><circle cx="-18" cy="-42" r="12" fill="#fff" stroke="${OL}" stroke-width="4"/><circle cx="18" cy="-42" r="12" fill="#fff" stroke="${OL}" stroke-width="4"/><circle cx="-16" cy="-42" r="6" fill="${OL}"/><circle cx="20" cy="-42" r="6" fill="${OL}"/><path d="M-16,-16 Q0,-2 16,-16" fill="none" stroke="${OL}" stroke-width="5" stroke-linecap="round"/><path d="M-50,-52 L-58,-84 L-30,-66Z M50,-52 L58,-84 L30,-66Z" fill="#FFB84D" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/></g>
      <g class="et"><path d="${top}" fill="#FFF6DC" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/>${spots}</g>`);
    const et = p.querySelector('.et'), baby = p.querySelector('.baby'); gsap.set([et, baby], { svgOrigin: '0 -20' });
    LOG(tIn, 'eggin'); if (tCrack != null) LOG(tCrack, 'crack'); if (tHatch != null) LOG(tHatch, 'hatch', n);
    tl.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .3, ease: 'back.out(2.4)' }, tIn);
    if (state === 'hatched') {
      gsap.set(et, { opacity: 0 }); gsap.set(baby, { opacity: 1 });
      tl.to(baby, { y: -16, duration: .25, yoyo: true, repeat: 15, ease: 'sine.inOut' }, S(tIn + .2)); api.badge(layer, x, y - 250, n, S(tIn + .1), col, 54); return p;
    }
    if (tCrack != null) { for (let k = 0; k < 5; k++) tl.to(p, { rotation: k % 2 ? 7 : -7, duration: .07, ease: 'none' }, S(tCrack + k * .07)); tl.to(p, { rotation: 0, duration: .06 }, S(tCrack + .35)); api.sparkles(layer, x, y - 120, tCrack, 3, 70, 26); }
    if (tHatch != null) {
      tl.to(et, { y: -170, x: 40, rotation: 48, opacity: 0, duration: .45, ease: 'power2.out' }, tHatch);
      tl.fromTo(baby, { opacity: 0, scale: .2, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: .4, ease: 'elastic.out(1,.5)' }, tHatch);
      tl.to(baby, { y: -16, duration: .25, yoyo: true, repeat: 7, ease: 'sine.inOut' }, S(tHatch + .5));
      api.badge(layer, x, y - 250, n, S(tHatch + .08), col, 54); api.sparkles(layer, x, y - 120, tHatch, 4, 100, 30);
    }
    return p;
  };
  api.badge = (layer, x, y, n, t, col = '#FFD23F', r = 70) => {
    LOG(t, 'ding', n);
    const p = grp(layer, x, y, `<circle r="${r}" fill="${col}" stroke="${OL}" stroke-width="9"/><circle r="${r - 12}" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>` + txt(n, r * 1.25, '#fff', 12));
    tl.fromTo(p, { scale: 0, rotation: -25 }, { scale: 1, rotation: 0, duration: .4, ease: 'elastic.out(1,.55)' }, t);
  };
  api.chip = (layer, x, y, text, col, t, size = 64, tcol = '#fff') => {
    LOG(t, 'chip');
    const w = text.length * size * .62 + 70;
    const p = grp(layer, x, y, `<rect x="${-w / 2}" y="${-size * .75}" width="${w}" height="${size * 1.5}" rx="${size * .75}" fill="${col}" stroke="${OL}" stroke-width="9"/><rect x="${-w / 2 + 14}" y="${-size * .62}" width="${w - 28}" height="${size * .36}" rx="${size * .18}" fill="#fff" opacity=".28"/>` + txt(text, size, tcol, 12));
    tl.fromTo(p, { scale: 0, rotation: -8 }, { scale: 1, rotation: -2, duration: .38, ease: 'back.out(2.6)' }, t);
  };
  api.shape = (layer, kind, x, y, size, col, t, spinning = false) => {
    LOG(t, 'boing2', kind);
    const body = { circle: `<circle r="${size}" fill="${col}" stroke="${OL}" stroke-width="10"/><ellipse cx="${-size * .3}" cy="${-size * .38}" rx="${size * .22}" ry="${size * .12}" fill="#fff" opacity=".6" transform="rotate(-30 ${-size * .3} ${-size * .38})"/>`,
      square: `<rect x="${-size}" y="${-size}" width="${size * 2}" height="${size * 2}" rx="${size * .2}" fill="${col}" stroke="${OL}" stroke-width="10"/><rect x="${-size * .78}" y="${-size * .8}" width="${size * .8}" height="${size * .2}" rx="${size * .1}" fill="#fff" opacity=".55"/>`,
      triangle: `<path d="M0,${-size * 1.05} L${size * 1.1},${size * .8} L${-size * 1.1},${size * .8}Z" fill="${col}" stroke="${OL}" stroke-width="10" stroke-linejoin="round"/>`,
      star: `<path d="${STAR(size * 1.15)}" fill="${col}" stroke="${OL}" stroke-width="10" stroke-linejoin="round"/>` }[kind];
    const p = grp(layer, x, y, body);
    tl.fromTo(p, { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: .45, ease: 'elastic.out(1,.55)' }, t);
    if (spinning) tl.to(p, { rotation: 360, duration: 2, ease: 'none', repeat: Math.min(2, reps(t + .5, 2)) }, S(t + .5));
    return p;
  };
  api.text = (layer, x, y, str, t, col = '#FFE14D', size = 150, rot = -6, hold = .9) => {
    LOG(t, 'text', str);
    const p = grp(layer, x, y, txt(str, size, col, size * .12));
    tl.fromTo(p, { scale: 0, rotation: rot - 14, opacity: 1 }, { scale: 1, rotation: rot, duration: .42, ease: 'elastic.out(1,.5)' }, t);
    tl.to(p, { scale: 1.12, duration: .12, yoyo: true, repeat: 1 }, S(t + .5));
    tl.to(p, { scale: 1.5, opacity: 0, duration: .3, ease: 'power2.in' }, S(t + hold));
  };
  api.rain = (layer, x, y, w, t0, t1, n = 16, col = '#7BD0FF') => {
    for (let i = 0; i < n; i++) {
      const p = grp(layer, x - w / 2 + rnd() * w, y, `<path d="M0,-16 C9,-2 12,6 0,14 C-12,6 -9,-2 0,-16Z" fill="${col}" stroke="${OL}" stroke-width="3" opacity=".95"/>`);
      const d = .5 + rnd() * .25;
      tl.fromTo(p, { y: 0, opacity: 0 }, { y: 360, opacity: 1, duration: d, ease: 'power1.in', repeat: Math.ceil((t1 - t0) / d), delay: 0 }, S(t0 + rnd() * .5));
    }
  };
  api.heart = (layer, x, y, t, col = '#FF5E7E', size = 1.1) => {
    const p = grp(layer, x, y, `<path d="${H.HEART}" fill="${col}" stroke="${OL}" stroke-width="4" transform="scale(${size})"/>`);
    tl.fromTo(p, { scale: 0, y: 0, opacity: 1 }, { scale: 1, y: -50, duration: .3, ease: 'back.out(2.4)' }, t); tl.to(p, { y: -190, opacity: 0, duration: .8, ease: 'power1.out' }, S(t + .3));
  };
  api.hearts = (layer, x, y, t, n = 5) => { LOG(t, 'hearts'); for (let i = 0; i < n; i++) api.heart(layer, x + (i - n / 2) * 52, y + (i % 2) * 30, S(t + i * .1), pick(['#FF5E7E', '#FF9BD0', '#FFB84D']), 1 + rnd() * .7); };
  api.ring = (layer, x, y, r, t0, t1, col = '#fff') => {
    const p = grp(layer, x, y, `<circle r="${r}" fill="${col}" opacity=".28" stroke="#fff" stroke-width="10"/><circle r="${r * .7}" fill="${col}" opacity=".25"/>`);
    tl.fromTo(p, { scale: .45, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'sine.inOut' }, t0); tl.to(p, { scale: .45, duration: 1, ease: 'sine.inOut' }, S(t0 + 1)); tl.to(p, { opacity: 0, duration: .2 }, S(t1 - .2));
  };
  api.star = (layer, x, y, r, col, t, spin = true, glow = true) => {
    const p = grp(layer, x, y, (glow ? `<circle r="${r * 1.7}" fill="#FFF3A0" opacity=".25"/>` : '') + `<path d="${STAR(r)}" fill="${col}" stroke="${OL}" stroke-width="10" stroke-linejoin="round"/><path d="${STAR(r * .5)}" fill="#FFF6B0" opacity=".85"/>`);
    tl.fromTo(p, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: .6, ease: 'elastic.out(1,.5)' }, t);
    if (spin) tl.to(p, { rotation: 360, duration: 6, ease: 'none', repeat: Math.min(6, reps(t + .6, 6)) }, S(t + .6));
    return p;
  };
  api.fireworks = (layer, x, y, t, col = '#FFE14D', r = 230) => {
    LOG(t, 'firework');
    const rays = [...Array(18)].map((_, i) => `<rect x="${r * .35}" y="-4" width="${r * .3}" height="8" rx="4" fill="${i % 2 ? col : '#fff'}" transform="rotate(${i * 20})"/>`).join('');
    const dots = [...Array(18)].map((_, i) => `<circle cx="${r * .9}" cy="0" r="7" fill="${col}" transform="rotate(${i * 20 + 10})"/>`).join('');
    const p = grp(layer, x, y, rays + dots);
    tl.fromTo(p, { scale: .1, opacity: 1 }, { scale: 1.1, duration: .55, ease: 'power3.out' }, t); tl.to(p, { opacity: 0, scale: 1.25, duration: .4, ease: 'power1.in' }, S(t + .35));
  };
  api.gear = (layer, x, y, r, col, t0, t1, dir = 1) => {
    const teeth = [...Array(10)].map((_, i) => `<rect x="${-r * .14}" y="${-r * 1.14}" width="${r * .28}" height="${r * .36}" rx="4" fill="${col}" transform="rotate(${i * 36})"/>`).join('');
    const p = grp(layer, x, y, teeth + `<circle r="${r}" fill="${col}"/><circle r="${r * .5}" fill="#fff" opacity=".35"/><circle r="${r * .2}" fill="#fff" opacity=".7"/>`);
    tl.fromTo(p, { rotation: 0 }, { rotation: 360 * dir, duration: 6, ease: 'none', repeat: Math.max(0, Math.min(Math.ceil((t1 - t0) / 6), reps(t0, 6))) }, t0);
  };
  api.spot = (layer, x, col, t0, t1, ph = 0) => {
    const p = grp(layer, x, -80, `<path d="M-14,0 L14,0 L220,1200 L-220,1200Z" fill="${col}" opacity=".2"/>`);
    tl.fromTo(p, { rotation: -16 + ph }, { rotation: 16 - ph, duration: 1, ease: 'sine.inOut', yoyo: true, repeat: Math.max(0, Math.min(Math.ceil(t1 - t0), reps(t0, 1))) }, t0);
  };
  api.rcloud = (layer, x, y, s, t0, t1, rain = true, col = '#8FA6D8') => {
    LOG(t0, 'raincloud');
    const p = grp(layer, x, y, `<g transform="scale(${s})"><ellipse cx="0" cy="26" rx="140" ry="30" fill="${col}" stroke="${OL}" stroke-width="7"/><circle cx="-62" cy="-2" r="48" fill="${col}" stroke="${OL}" stroke-width="7"/><circle cx="6" cy="-26" r="64" fill="${col}" stroke="${OL}" stroke-width="7"/><circle cx="66" cy="0" r="46" fill="${col}" stroke="${OL}" stroke-width="7"/><ellipse cx="0" cy="20" rx="132" ry="26" fill="${col}"/></g>`);
    tl.fromTo(p, { scale: 0 }, { scale: 1, duration: .4, ease: 'back.out(2)' }, t0); tl.to(p, { y: -10, duration: 1, yoyo: true, repeat: 6, ease: 'sine.inOut' }, S(t0 + .4));
    if (rain) api.rain(layer, x, y + 40 * s, 190 * s, S(t0 + .3), t1, 14);
    return p;
  };
  api.sun = (layer, x, y, r, t) => {
    LOG(t, 'sunrise');
    const rays = [...Array(12)].map((_, i) => `<rect x="${r * 1.2}" y="-8" width="${r * .5}" height="16" rx="8" fill="#FFD23F" transform="rotate(${i * 30})"/>`).join('');
    const p = grp(layer, x, y, `<g class="rays">${rays}</g><circle r="${r}" fill="#FFE066" stroke="${OL}" stroke-width="8"/><circle cx="${-r * .3}" cy="${-r * .3}" r="${r * .25}" fill="#fff" opacity=".6"/>`);
    tl.fromTo(p, { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, duration: .5, ease: 'back.out(2)' }, t); tl.to(p.querySelector('.rays'), { rotation: 360, duration: 8, ease: 'none', repeat: Math.min(1, reps(t + .5, 8)), svgOrigin: '0 0' }, S(t + .5));
    return p;
  };
  api.banner = (over, title, sub, t0, t1, col = '#FF5E7E') => {
    const p = grp(over, 70, 70, `<rect x="0" y="0" width="${Math.max(420, title.length * 40 + 120)}" height="132" rx="40" fill="${col}" stroke="${OL}" stroke-width="9"/><rect x="14" y="12" width="${Math.max(420, title.length * 40 + 120) - 28}" height="34" rx="17" fill="#fff" opacity=".22"/><text x="40" y="52" font-family="Baloo 2" font-weight="800" font-size="28" fill="#2B1B5E" letter-spacing="3">${sub}</text><text x="40" y="106" font-family="Fredoka" font-weight="700" font-size="58" fill="#fff" stroke="${OL}" stroke-width="10" paint-order="stroke" stroke-linejoin="round">${title}</text>`);
    tl.fromTo(p, { x: -700, opacity: 1 }, { x: 0, duration: .5, ease: 'back.out(1.6)' }, t0); tl.to(p, { x: -800, duration: .4, ease: 'power2.in' }, S(t1 - .45));
  };
  api.glowStar = (layer, x, y, r, t0, t1) => { const p = api.star(layer, x, y, r, '#FFD23F', t0, true); tl.to(p, { scale: 1.08, duration: .5, yoyo: true, repeat: Math.max(0, Math.min(Math.ceil((t1 - t0) * 2), reps(t0 + .7, .5))), ease: 'sine.inOut' }, S(t0 + .7)); return p; };

  api.grass = (layer, y, t0, n = 14) => {
    LOG(t0, 'grass');
    for (let i = 0; i < n; i++) {
      const x = 80 + i * (1760 / n) + rnd() * 40, k = .8 + rnd() * .7;
      const p = grp(layer, x, y + rnd() * 60, `<path d="M-22,0 Q-20,-34 -12,-44 Q-8,-20 0,0Z M-4,0 Q0,-52 10,-62 Q12,-26 14,0Z M10,0 Q20,-34 32,-42 Q26,-14 28,0Z" fill="#2DA64F" stroke="${OL}" stroke-width="4" stroke-linejoin="round" transform="scale(${(k * 1.25).toFixed(2)})"/>`);
      tl.fromTo(p, { scaleY: 0, scaleX: .5 }, { scaleY: 1, scaleX: 1, duration: .45, ease: 'back.out(2.2)' }, S(t0 + i * .06));
    }
  };
  api.water = (layer, y, t0, t1) => {
    LOG(t0, 'splash');
    const d = `M-200,40 Q-100,0 0,40 T200,40 T400,40 T600,40 T800,40 T1000,40 T1200,40 T1400,40 T1600,40 T1800,40 T2000,40 T2200,40 L2200,700 L-200,700Z`;
    const p = grp(layer, 0, y, `<path d="${d}" fill="#4CC9F0" stroke="${OL}" stroke-width="7"/><path d="${d}" fill="#7BE8FF" opacity=".5" transform="translate(0,26)"/>`);
    tl.fromTo(p, { y: 520 }, { y: 0, duration: .7, ease: 'power2.out' }, t0); tl.fromTo(p, { x: 0 }, { x: -200, duration: 1.2, ease: 'none', repeat: Math.ceil((t1 - t0) / 1.2) }, S(t0 + .7));
  };
  api.tint = (layer, col, op, t0, t1) => {
    const p = mk('g', {}, layer); p.innerHTML = `<rect x="-200" y="-200" width="2400" height="1500" fill="${col}"/>`; gsap.set(p, { opacity: 0 });
    tl.to(p, { opacity: op, duration: .25 }, t0); tl.to(p, { opacity: 0, duration: .3 }, S(t1 - .3));
  };
  return api;
};
