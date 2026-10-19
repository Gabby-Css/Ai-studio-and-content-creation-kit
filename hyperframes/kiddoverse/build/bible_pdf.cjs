// node bible_pdf.cjs <bible.html> <out.pdf>  -> one PDF page per .page section, each page sized to its content (no orphan splits), merged with PyMuPDF
const puppeteer = require('../../../node_modules/puppeteer');
const path = require('path'), fs = require('fs'), cp = require('child_process');
const src = path.resolve(process.argv[2]), out = path.resolve(process.argv[3]);
const tmp = path.join(path.dirname(out), '_pdfparts'); fs.mkdirSync(tmp, { recursive: true });
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'] });
  const p = await b.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push('PAGEERR ' + e.message));
  p.on('requestfailed', (r) => errs.push('REQFAIL ' + r.url().slice(-60)));
  await p.setViewport({ width: 1000, height: 1400 });
  await p.goto('file:///' + src.split('\\').join('/'), { waitUntil: 'networkidle0', timeout: 60000 });
  await p.evaluate(() => document.fonts.ready.then(() => Promise.all([...document.images].map((i) => i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; })))));
  await p.addStyleTag({ content: 'html,body{margin:0!important;padding:0!important}.page{width:1000px!important;margin:0!important;page-break-after:auto!important;break-inside:auto}@page{margin:0}' });
  const n = await p.evaluate(() => document.querySelectorAll('.page').length);
  const broken = await p.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.getAttribute('src')));
  const parts = [];
  for (let i = 0; i < n; i++) {
    const h = await p.evaluate((k) => { const ps = [...document.querySelectorAll('.page')]; ps.forEach((e, j) => (e.style.display = j === k ? 'block' : 'none')); return Math.ceil(ps[k].getBoundingClientRect().height); }, i);
    const f = path.join(tmp, 'part_' + String(i).padStart(2, '0') + '.pdf');
    await p.pdf({ path: f, printBackground: true, width: '1000px', height: (h + 2) + 'px', pageRanges: '1', margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    parts.push(f);
  }
  await b.close();
  const py = `import fitz,sys\nout=fitz.open()\nfor f in sys.argv[2:]:\n    d=fitz.open(f); out.insert_pdf(d); d.close()\nout.save(sys.argv[1], garbage=3, deflate=True)\nprint('merged',len(out),'pages')`;
  fs.writeFileSync(path.join(tmp, 'merge.py'), py);
  const r = cp.spawnSync('python', [path.join(tmp, 'merge.py'), out, ...parts], { encoding: 'utf8' });
  console.log(r.stdout.trim(), r.stderr.trim());
  parts.forEach((f) => fs.unlinkSync(f)); fs.unlinkSync(path.join(tmp, 'merge.py')); fs.rmdirSync(tmp);
  console.log('pdf ok', out, 'sections=' + n, 'broken imgs=' + JSON.stringify(broken), errs.length ? errs.join(' | ') : 'no errors');
})();
