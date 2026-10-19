// node export_logo_svg.cjs <out.svg>  -> fully outlined vector logo (no font needed): planet mascot + rainbow wordmark
const fs = require('fs'), path = require('path');
const opentype = require('../_fonttmp/node_modules/opentype.js');
global.window = global; global.SONG = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/song.json'), 'utf8')); require('./kv_logo.js');
const L = global.KVLogo, BRAND = global.SONG.brand;
const buf = fs.readFileSync(path.join(__dirname, '../_fonttmp/node_modules/@fontsource/fredoka/files/fredoka-latin-700-normal.woff'));
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const SIZE = 220, OL = '#2B1B5E', scale = SIZE / font.unitsPerEm;
let x = 0; const letters = [];
[...BRAND].forEach((ch, i) => { const g = font.charToGlyph(ch); const p = g.getPath(x, 0, SIZE); letters.push({ d: p.toPathData(2), col: L.COLS[i % L.COLS.length] }); x += g.advanceWidth * scale + (i + 1 < BRAND.length ? font.getKerningValue(g, font.charToGlyph(BRAND[i + 1])) * scale : 0) + SIZE * .012; });
const wordW = x, PL = SIZE * 1.6, GAP = SIZE * .14, PAD = 60, H = Math.round(PL + PAD * 2), W = Math.round(PAD * 2 + PL + GAP + wordW);
const baseY = PAD + PL / 2 + SIZE * .36;                                   // vertical centre of lowercase/cap text on the planet's axis
const planet = L.planet().replace('<svg class="planet"', `<svg x="${PAD}" y="${PAD}" width="${PL}" height="${PL}"`).replace('xmlns="http://www.w3.org/2000/svg"', '').replace(/class="planet"/, '');
const ox = PAD + PL + GAP;
const out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<title>${BRAND}</title>
<g transform="translate(${ox},${baseY + SIZE * .07})" opacity=".55">${letters.map((l) => `<path d="${l.d}" fill="${OL}" stroke="${OL}" stroke-width="${SIZE * .13}" stroke-linejoin="round"/>`).join('')}</g>
<g transform="translate(${ox},${baseY})">${letters.map((l) => `<path d="${l.d}" fill="${OL}" stroke="${OL}" stroke-width="${SIZE * .13}" stroke-linejoin="round"/>`).join('')}${letters.map((l) => `<path d="${l.d}" fill="${l.col}"/>`).join('')}</g>
${planet}
</svg>`;
fs.mkdirSync(path.dirname(path.resolve(process.argv[2])), { recursive: true }); fs.writeFileSync(path.resolve(process.argv[2]), out);
console.log('logo svg', out.length, 'bytes', W + 'x' + H);
