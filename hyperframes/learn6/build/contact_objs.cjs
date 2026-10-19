// node contact_objs.cjs <out.png>  -> grid of every object in KVOBJ (visual check)
const puppeteer = require('../../../node_modules/puppeteer'); const fs = require('fs'), path = require('path');
global.window = global; require('./edu_objects.js'); require('./color_objects.js'); const O = global.KVOBJ;
const cell = 230, cols = 7, rows = Math.ceil(O.kinds.length / cols);
const items = O.kinds.map((k, i) => `<g transform="translate(${(i % cols) * cell + cell / 2},${Math.floor(i / cols) * (cell + 24) + cell / 2 - 6}) scale(.9)">${O.draw(k)}</g><text x="${(i % cols) * cell + cell / 2}" y="${Math.floor(i / cols) * (cell + 24) + cell + 12}" text-anchor="middle" font-family="Arial" font-weight="700" font-size="20" fill="#fff">${k}</text>`).join('');
const html = `<html><body style="margin:0;background:#3a2a8a"><svg xmlns="http://www.w3.org/2000/svg" width="${cols * cell}" height="${rows * (cell + 24)}" style="font-family:Fredoka">${items}</svg></body></html>`;
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu'], timeout: 240000, protocolTimeout: 240000 }); const p = await b.newPage(); await p.setViewport({ width: cols * cell, height: rows * (cell + 24) });
  await p.setContent(html); await new Promise((r) => setTimeout(r, 400)); await p.screenshot({ path: process.argv[2] || 'objs.png' }); await b.close(); console.log('saved', O.kinds.length, 'objects');
})();
