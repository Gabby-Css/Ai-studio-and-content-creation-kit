// node spaceprobe.cjs toonN [times|auto] [--ids]  -> character spacing audit
//   For each time: which characters are on screen, how much of each is cut off by the frame edge,
//   how much of each FACE is actually visible (sampled with elementsFromPoint, so z-order counts),
//   and which characters' bodies overlap. Prints one line per problem + a summary.
const puppeteer = require('puppeteer');
const dir = process.argv[2];
const arg = process.argv[3] || 'auto';
const idsMode = process.argv.includes('--ids');
const CH = ['bo', 'tf', 'mc', 'cm', 'nm', 'zp', 'bp', 'pt', 'gm', 'kg', 'gh', 'j1', 'j2', 'j3', 'j4', 'mn', 'rk', 'pb'];
(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], protocolTimeout: 600000 });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  p.on('pageerror', e => console.log('PAGEERROR:', e.message.split('\n')[0]));
  await p.goto('file:///C:/Users/softenic/Downloads/ai-video-studio-kit/hyperframes/' + dir + '/index.html', { waitUntil: 'load', timeout: 600000 });
  await new Promise(r => setTimeout(r, 2500));
  if (idsMode) {
    const r = await p.evaluate((CH) => CH.map(c => {
      const el = document.getElementById(c); if (!el) return c + ': (none)';
      const sub = [...el.querySelectorAll('[id]')].map(e => e.id).filter(i => /Head|Face|Eye|Sq$/.test(i));
      return c + ': ' + sub.slice(0, 12).join(' ');
    }), CH);
    console.log(r.join('\n')); await b.close(); return;
  }
  if (process.argv.includes('--sizes')) {   // world-unit size of every visible character at time `arg`
    const r = await p.evaluate(async (CH, t) => {
      const tl = window.__timelines.main; tl.pause(); tl.seek(t, false); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      const cs = gsap.getProperty('#cam', 'scale'), cx = gsap.getProperty('#cam', 'x'), cy = gsap.getProperty('#cam', 'y');
      return CH.filter(c => document.getElementById(c)).map(c => {
        const el = document.getElementById(c), s = gsap.getProperty(el, 'scale') || 1, x = gsap.getProperty(el, 'x'), y = gsap.getProperty(el, 'y');
        let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        for (const l of el.querySelectorAll('path,circle,ellipse,rect,polygon')) { let o = 1; for (let e = l; e && e !== el.parentNode; e = e.parentNode) o *= +getComputedStyle(e).opacity; if (o < .05) continue; const b = l.getBoundingClientRect(); if (b.width * b.height < 4) continue; x0 = Math.min(x0, b.left); y0 = Math.min(y0, b.top); x1 = Math.max(x1, b.right); y1 = Math.max(y1, b.bottom); }
        const wx0 = (x0 - cx) / cs, wx1 = (x1 - cx) / cs, wy0 = (y0 - cy) / cs, wy1 = (y1 - cy) / cs;
        const hd = el.querySelector('#' + c + 'Eyes') || el.querySelector('#' + c + 'Head');
        let face = '';
        if (hd) { const b = hd.getBoundingClientRect(); face = `  eyes@(${Math.round(((b.left + b.right) / 2 - cx) / cs)},${Math.round(((b.top + b.bottom) / 2 - cy) / cs)}) => dx ${Math.round((((b.left + b.right) / 2 - cx) / cs - x) / s)} dy ${Math.round((((b.top + b.bottom) / 2 - cy) / cs - y) / s)} @1`; }
        return face + '  ' + `${c.padEnd(3)} x=${Math.round(x)} y=${Math.round(y)} s=${(+s).toFixed(2)}  world box x ${Math.round(wx0)}..${Math.round(wx1)} y ${Math.round(wy0)}..${Math.round(wy1)}  => size@1 ${Math.round((wx1 - wx0) / s)}x${Math.round((wy1 - wy0) / s)}  left/right of x: ${Math.round((x - wx0) / s)}/${Math.round((wx1 - x) / s)}  top above y: ${Math.round((y - wy0) / s)}`;
      });
    }, CH, +arg);
    console.log(r.join('\n')); await b.close(); return;
  }
  const brief = process.argv.includes('--brief');
  const dur = await p.evaluate(() => window.__timelines.main.duration());
  const times = arg === 'auto' ? Array.from({ length: Math.floor(dur * 2) }, (_, i) => +(i * .5 + .25).toFixed(2)) : arg.split(',').map(Number);
  const out = await p.evaluate(async (CH, times) => {
    const tl = window.__timelines.main; tl.pause();
    const world = document.getElementById('world');
    const effOp = (el, stop) => { let o = 1; for (let e = el; e && e !== stop; e = e.parentNode) { if (!(e instanceof Element)) break; const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return 0; o *= +cs.opacity; if (o < .02) return 0; } return o; };
    const SHAPES = 'path,circle,ellipse,rect,polygon,polyline,line,use,text';
    const chars = CH.map(c => document.getElementById(c)).filter(Boolean);
    const leaves = new Map(chars.map(el => [el.id, [...el.querySelectorAll(SHAPES)]]));
    const headEl = new Map(chars.map(el => [el.id, el.querySelector(`#${el.id}Head`) || null]));
    const owner = (node) => { for (let e = node; e && e !== world; e = e.parentNode) if (e.id && CH.includes(e.id) && e.parentNode && !(e.parentNode.closest && CH.some(c => e.parentNode.closest('#' + c)))) return e.id; return null; };
    const box = (els, root) => { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, n = 0; for (const l of els) { if (effOp(l, root) < .05) continue; const r = l.getBoundingClientRect(); if (r.width * r.height < 4) continue; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); n++; } return n ? [x0, y0, x1, y1] : null; };
    const res = [];
    for (const t of times) {
      tl.seek(t, false); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      const vis = [];
      for (const el of chars) {
        if (effOp(el, document.body) < .2) continue;
        const bb = box(leaves.get(el.id), el); if (!bb) continue;
        const area = (bb[2] - bb[0]) * (bb[3] - bb[1]);
        const cx0 = Math.max(0, bb[0]), cy0 = Math.max(0, bb[1]), cx1 = Math.min(1080, bb[2]), cy1 = Math.min(1920, bb[3]);
        const inA = Math.max(0, cx1 - cx0) * Math.max(0, cy1 - cy0);
        if (inA / area < .02) continue;                               // fully off screen
        // face box: the #xxHead group when there is one, else the top 42% of the body box
        let hb = headEl.get(el.id) ? box([...headEl.get(el.id).querySelectorAll(SHAPES)], el) : null;
        if (!hb) hb = [bb[0] + (bb[2] - bb[0]) * .15, bb[1], bb[2] - (bb[2] - bb[0]) * .15, bb[1] + (bb[3] - bb[1]) * .42];
        // sample the face: who is really drawn on top at each point?
        let own = 0, tot = 0, offF = 0; const cover = {};
        for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
          const x = hb[0] + (hb[2] - hb[0]) * (i + .5) / 7, y = hb[1] + (hb[3] - hb[1]) * (j + .5) / 7; tot++;
          if (x < 0 || x > 1080 || y < 0 || y > 1920) { offF++; continue; }
          // only samples that land on this character's own shapes count; then: is someone else drawn over it?
          const stack = document.elementsFromPoint(x, y);
          let top = null, mine = false;
          for (const s of stack) { if (!world.contains(s)) continue; const o = owner(s); if (!o) continue; if (effOp(s, document.body) < .3) continue; if (!top) top = o; if (o === el.id) { mine = true; break; } }
          if (!mine) continue;
          if (top === el.id) own++; else cover[top] = (cover[top] || 0) + 1;
        }
        // a sample that hits nothing of ours (gaps between shapes) is not an occlusion: normalise by hits
        const hits = own + Object.values(cover).reduce((a, b) => a + b, 0);
        vis.push({ id: el.id, bb: bb.map(Math.round), cut: +(1 - inA / area).toFixed(2), faceVis: hits ? +(own / hits).toFixed(2) : 1, faceOff: +(offF / tot).toFixed(2), cover });
      }
      // body overlaps (box intersection / smaller box)
      const ov = [];
      for (let a = 0; a < vis.length; a++) for (let c = a + 1; c < vis.length; c++) {
        const A = vis[a].bb, B = vis[c].bb;
        const iw = Math.min(A[2], B[2]) - Math.max(A[0], B[0]), ih = Math.min(A[3], B[3]) - Math.max(A[1], B[1]);
        if (iw <= 0 || ih <= 0) continue;
        const f = iw * ih / Math.min((A[2] - A[0]) * (A[3] - A[1]), (B[2] - B[0]) * (B[3] - B[1]));
        if (f > .25) ov.push(`${vis[a].id}/${vis[c].id}:${f.toFixed(2)}`);
      }
      res.push({ t, vis, ov });
    }
    return res;
  }, CH, times);
  const SKIP_FACE = new Set(['gh']);
  let nFace = 0, nCut = 0, worst = {}, lastKey = null;
  for (const r of out) {
    const probs = [];
    for (const v of r.vis) {
      if (v.faceVis < .7 && !SKIP_FACE.has(v.id)) { probs.push(`${v.id} face ${Math.round(v.faceVis * 100)}% (by ${Object.entries(v.cover).sort((a, b) => b[1] - a[1]).map(e => e[0]).join(',')})`); nFace++; worst[v.id] = (worst[v.id] || 0) + 1; }
      if (v.faceOff > .25) { probs.push(`${v.id} face ${Math.round(v.faceOff * 100)}% off-frame`); nCut++; }
      else if (v.cut > .3) { probs.push(`${v.id} body ${Math.round(v.cut * 100)}% off-frame`); nCut++; }
    }
    if (brief) {   // one line per run of frames with the same problems
      const key = probs.map(s => s.replace(/\d+%/g, '').replace(/\(by .*\)/, '')).join('|');
      if (key !== lastKey) console.log(`t=${String(r.t).padEnd(5)} ${probs.length ? probs.join(' | ') : 'OK'}`);
      lastKey = key; continue;
    }
    console.log(`t=${String(r.t).padEnd(5)} on=${r.vis.map(v => v.id).join(',').padEnd(44)} ${probs.join(' | ')}${r.ov.length ? '  ov: ' + r.ov.join(' ') : ''}`);
  }
  console.log(`SUMMARY ${dir}: frames=${out.length} hiddenFaces=${nFace} cutOff=${nCut} worst=${JSON.stringify(worst)}`);
  await b.close();
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
