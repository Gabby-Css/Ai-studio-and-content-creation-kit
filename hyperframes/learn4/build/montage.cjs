// node montage.cjs <dir> <out.jpg> [cols] [width]   -> contact sheet of the f_<t>.jpg stills made by preview_frames.cjs, with time labels
const sharp = require('../../../node_modules/sharp'); const fs = require('fs'), path = require('path');
const D = process.argv[2], OUT = process.argv[3], COLS = +(process.argv[4] || 2), W = +(process.argv[5] || 800), H = Math.round(W * 9 / 16);
const files = fs.readdirSync(D).filter(f => /^f_.*\.jpg$/.test(f)).sort((a, b) => parseFloat(a.slice(2).replace('_', '.')) - parseFloat(b.slice(2).replace('_', '.')));
(async () => {
  const comps = [];
  for (let i = 0; i < files.length; i++) {
    const t = parseFloat(files[i].slice(2, -4).replace('_', '.')); const b = await sharp(path.join(D, files[i])).resize(W, H).jpeg({ quality: 82 }).toBuffer(); const x = (i % COLS) * W, y = Math.floor(i / COLS) * H;
    comps.push({ input: b, left: x, top: y });
    comps.push({ input: Buffer.from(`<svg width="150" height="38" xmlns="http://www.w3.org/2000/svg"><rect width="150" height="38" rx="6" fill="#000" opacity=".65"/><text x="75" y="27" font-size="23" font-family="Arial" font-weight="700" fill="#fff" text-anchor="middle">${t.toFixed(1)} s</text></svg>`), left: x + 6, top: y + 6 });
  }
  await sharp({ create: { width: W * COLS, height: H * Math.ceil(files.length / COLS), channels: 3, background: '#222' } }).composite(comps).jpeg({ quality: 84 }).toFile(OUT); console.log(files.length, 'frames ->', OUT);
})();
