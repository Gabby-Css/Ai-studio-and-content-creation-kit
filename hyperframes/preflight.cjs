// node preflight.cjs N   -> automated pre-render checks for toonN (recursive learning from seasons 5-7: the mistakes that cost renders)
//  1 page errors / failed script   2 timeline length <= 30 s   3 tweens whose target does not exist (typos)
//  4 audio files present and 30 s  5 SPEAKER CHECK: at the start of every spoken line the speaker's face must be on screen and not covered
//  6 Pebble/any character parked off-screen is fine; characters whose head is hidden >30% while someone else speaks are only reported as notes
const puppeteer = require('puppeteer'); const fs = require('fs'); const path = require('path');
const N = process.argv[2]; const dir = 'toon' + N; const ROOT = __dirname;
const TAG = { BO: 'bo', MOCHI: 'mc', TRUFFLE: 'tf', ZAP: 'zp', COCO: 'cm', GUMDROP: 'gm', BOO: 'gh', BLIP: 'bp', PEANUT: 'pt', KING: 'kg', MUNCH: 'mn', PEBBLE: 'pb', ROCKY: 'rk', FLAPJACK: 'pan', NIBBLES: 'nb', JIGGLES: 'j1', GRANDMA: 'gma', WADDLES: 'wd', MOM: 'pm', DAD: 'pd', BLUEBERRY: 'cz1', CHOCO: 'cz2', BERRY: 'cz3', EVERYBODY: '', BABY: 'pb' };
const CH = ['bo', 'tf', 'mc', 'cm', 'nm', 'nb', 'zp', 'bp', 'pt', 'gm', 'kg', 'gh', 'j1', 'j2', 'j3', 'j4', 'mn', 'rk', 'pb', 'pan', 'gma', 'wd', 'pm', 'pd', 'pk', 'cz1', 'cz2', 'cz3'];
(async () => {
  const out = []; let fail = 0; const ok = (m) => out.push('  ok   ' + m); const bad = (m) => { fail++; out.push('  FAIL ' + m); }; const note = (m) => out.push('  note ' + m);
  const W = JSON.parse(fs.readFileSync(path.join(ROOT, dir, 'words.json'), 'utf8')); const P = JSON.parse(fs.readFileSync(path.join(ROOT, dir, 'plan.json'), 'utf8'));
  for (const f of ['vo.wav', 'music.wav', 'sfx.wav']) { const p = path.join(ROOT, dir, 'assets', f); if (!fs.existsSync(p)) bad('missing assets/' + f); else { const sz = fs.statSync(p).size; (Math.abs(sz - 2646044) < 400 ? ok : bad)(f + ' ' + sz + ' bytes (30 s, 44.1 kHz, 16-bit mono = 2646044)'); } }
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], protocolTimeout: 600000 });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  const errs = []; p.on('pageerror', e => errs.push(e.message.split('\n')[0])); p.on('console', m => { const t = m.text(); if (/GSAP target .* not found|Invalid property|is not defined/.test(t)) errs.push('console: ' + t.slice(0, 160)); });
  await p.goto('file:///' + ROOT.replace(/\\/g, '/') + '/' + dir + '/index.html', { waitUntil: 'load', timeout: 600000 });
  await new Promise(r => setTimeout(r, 2500));
  errs.length ? errs.forEach(e => bad('page: ' + e)) : ok('no page errors');
  const info = await p.evaluate((TAG, CH, lines) => {
    const tl = window.__timelines && window.__timelines.main; if (!tl) return { err: 'no timeline' };
    const res = { dur: tl.duration(), orphans: [], speakers: [], notes: [], cams: [] };
    (function walk(t) { t.getChildren(false, true, true).forEach(c => { if (c.getChildren) walk(c); else { try { if (c.targets && c.targets().length && c.targets()[0] && c.targets()[0].id === 'cam' && c.vars && c.vars.duration > 0.01) { let s0 = c.startTime(), pp = c.parent; while (pp && pp !== tl.parent) { s0 += pp.startTime ? pp.startTime() : 0; pp = pp.parent; if (pp === tl.parent) break; } res.cams.push([s0, s0 + c.duration()]); } if (c.targets && c.targets().length === 0 && c.vars && c.vars.duration !== undefined && !c.vars.onComplete) res.orphans.push(Object.keys(c.vars).slice(0, 4).join(',') + ' @' + c.startTime().toFixed(2)); } catch (e) {} } }); })(tl);
    const world = document.getElementById('world');
    const effOp = (el, stop) => { let o = 1; for (let e = el; e && e !== stop; e = e.parentNode) { if (!(e instanceof Element)) break; const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return 0; o *= +cs.opacity; if (o < .02) return 0; } return o; };
    const SH = 'path,circle,ellipse,rect,polygon,polyline,line,use,text';
    const owner = (node) => { for (let e = node; e && e !== world; e = e.parentNode) if (e.id && CH.includes(e.id) && !(e.parentNode.closest && CH.some(c => e.parentNode.closest('#' + c)))) return e.id; return null; };
    const headBox = (el) => { const hd = el.querySelector('#' + el.id + 'Head') || el; let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, n = 0; for (const l of hd.querySelectorAll(SH)) { if (effOp(l, el) < .05) continue; const r = l.getBoundingClientRect(); if (r.width * r.height < 4) continue; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); n++; } return n ? [x0, y0, x1, y1] : null; };
    for (const L of lines) {
      let id = TAG[L.tag]; if (!id) continue; tl.seek(L.t, false); if (id === 'pan' && document.getElementById('bo') && effOp(document.getElementById('pan'), document.body) < .2) id = 'bo'; /* Flapjack riding on Bo's head (#bh lives inside #bo): check Bo's face instead */ const el = document.getElementById(id); if (!el) { res.speakers.push({ ln: L.ln, tag: L.tag, id, why: 'element missing' }); continue; }
      tl.seek(L.t, false); gsap.ticker.tick && 0;
      if (effOp(el, document.body) < .2) { res.speakers.push({ ln: L.ln, tag: L.tag, id, why: 'speaker invisible' }); continue; }
      const hb = headBox(el); if (!hb) { res.speakers.push({ ln: L.ln, tag: L.tag, id, why: 'no head box' }); continue; }
      let own = 0, hits = 0, off = 0, tot = 0; const cov = {};
      for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) { const x = hb[0] + (hb[2] - hb[0]) * (i + .5) / 7, y = hb[1] + (hb[3] - hb[1]) * (j + .5) / 7; tot++; if (x < 0 || x > 1080 || y < 0 || y > 1920) { off++; continue; } let top = null, mine = false; for (const s of document.elementsFromPoint(x, y)) { if (!world.contains(s)) continue; const o = owner(s); if (!o) continue; if (effOp(s, document.body) < .3) continue; if (!top) top = o; if (o === id) { mine = true; break; } } if (!mine) continue; hits++; if (top === id) own++; else cov[top] = (cov[top] || 0) + 1; }
      const vis = hits ? own / hits : 1, offf = off / tot;
      if (vis < .75 || offf > .25) res.speakers.push({ ln: L.ln, tag: L.tag, id, why: 'face ' + Math.round(vis * 100) + '% uncovered, ' + Math.round(offf * 100) + '% off-frame at t=' + L.t.toFixed(2) + (Object.keys(cov).length ? ' covered by ' + Object.entries(cov).map(([k, v]) => k + ':' + v).join(',') : '') });
    }
    return res;
  }, TAG, CH, Object.keys(W.tags).map(ln => ({ ln: +ln, tag: (W.tags[ln] || '').toUpperCase(), t: P.LINE_T[ln] + Math.min(.55, W.dur[ln] * .35) })).filter(L => L.tag));
  if (info.err) bad(info.err); else {
    (info.dur <= 30.5 ? ok : bad)('timeline ' + info.dur.toFixed(2) + ' s (must be <= 30.5)');
    { const cs = info.cams.sort((a, b) => a[0] - b[0]); const ov = []; for (let i = 1; i < cs.length; i++) if (cs[i][0] < cs[i - 1][1] - .02) ov.push(cs[i - 1].map(x => x.toFixed(2)).join('-') + ' vs ' + cs[i].map(x => x.toFixed(2)).join('-')); ov.length ? ov.forEach(o => bad('camera tweens overlap: ' + o)) : ok('camera moves do not overlap (' + cs.length + ' moves)'); }
    info.orphans.length ? info.orphans.slice(0, 8).forEach(o => bad('tween without a target: ' + o)) : ok('every tween has a target');
    info.speakers.length ? info.speakers.forEach(s => bad(`line ${s.ln} (${s.tag}): ${s.why}`)) : ok('every speaker is visible and uncovered at the start of their line');
  }
  await b.close();
  console.log('PREFLIGHT ' + dir + '\n' + out.join('\n') + '\n=> ' + (fail ? fail + ' problem(s)' : 'PASS')); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('ERR', e.message); process.exit(2); });
