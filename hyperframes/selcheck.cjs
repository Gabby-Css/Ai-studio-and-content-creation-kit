// node selcheck.cjs N  -> static check (no browser): every '#id' / '.class' selector used by toonN's _init/_body exists in the built page's markup
//   (literal id="x", or a rig id like id="${p}ArmL" whose prefix is a known character, or an id built by JS template strings such as `#spw${i}`)
const fs = require('fs'), path = require('path');
const N = process.argv[2], dir = path.join(__dirname, 'toon' + N);
const page = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const files = ['_init' + N + '.js', '_body' + N + '.js'].map(f => path.join(dir, f)).filter(fs.existsSync);
const lits = new Set([...page.matchAll(/id="([^"$]+)"/g)].map(m => m[1]));
const sufs = new Set([...page.matchAll(/id="\$\{(\w+)\}(\w+)"/g)].map(m => m[2]));
const cls = new Set([...page.matchAll(/class="([^"]+)"/g)].flatMap(m => m[1].split(/\s+/).map(c => c.replace(/\$\{\w+\}/g, '*'))));
const sufs2 = new Set([...page.matchAll(/id="\$\{(\w+)\}(\w+)\$\{/g)].map(m => m[2]));
const clsSuf = new Set([...page.matchAll(/class="\$\{(\w+)\}(\w+)"/g)].map(m => m[2]));
const PFX = ['bo', 'tf', 'mc', 'cm', 'nm', 'nb', 'zp', 'bp', 'pt', 'gm', 'kg', 'gh', 'j1', 'j2', 'j3', 'j4', 'mn', 'rk', 'pb', 'pan', 'bh', 'gma', 'tw', 'g1', 'g2', 'g3', 'g4', 'g5', 'ph'];
let bad = 0;
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8').replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const missing = new Set();
  for (const m of src.matchAll(/'((?:[#.][\w-]+(?:\s*,\s*)?)+)'/g)) {
    for (const sel of m[1].split(/\s*,\s*/)) {
      if (!sel) continue; const nm = sel.slice(1);
      if (sel[0] === '#') {
        if (lits.has(nm)) continue;
        if (PFX.some(p => nm.startsWith(p) && sufs.has(nm.slice(p.length)))) continue;
        if ([...sufs, ...sufs2].some(sf => nm.length > sf.length && nm.replace(/\d+$/, '').endsWith(sf.replace(/\d+$/, '')))) continue;        // rig / prop generators with any prefix (id="${p}ArmL", id="${p}S${k}")
        if (/^[a-z]{1,3}\d?$/.test(nm) || ['depthLayer', 'shake', 'cam', 'world', 'sticker'].includes(nm)) continue;                             // bare prefixes (id="${p}") and ids set from JS
        if (new RegExp('id="' + nm.replace(/\d+$/, '') + '\\$\\{').test(page) || new RegExp('id=`' + nm.replace(/\d+$/, '')).test(page)) continue;           // ids built with a counter, e.g. bg${i}
        if (new RegExp("'" + nm.replace(/\d+$/, '') + "'\\s*\\+|id=\"" + nm.replace(/\d+$/, '') + "\\$").test(page)) continue;
        if (page.includes(nm + '${') || page.includes('"' + nm.replace(/\d+$/, '') + '${')) continue;
        missing.add(sel);
      } else {
        if (cls.has(nm) || [...cls].some(c => c.includes('*') && new RegExp('^' + c.replace(/\*/g, '\\w*') + '$').test(nm)) || [...clsSuf].some(s => nm.endsWith(s)) || page.includes('class="' + nm) || page.includes('class="${') && page.includes(nm)) continue;
        if (page.includes(nm)) continue;
        missing.add(sel);
      }
    }
  }
  console.log(path.basename(f) + ': ' + (missing.size ? 'NOT FOUND -> ' + [...missing].join(' ') : 'all selectors found')); bad += missing.size;
}
process.exit(bad ? 1 : 0);
