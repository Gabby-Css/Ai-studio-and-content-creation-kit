// node preview_worlds.cjs <out.png> [names...]  -> contact sheet of worlds (far/mid/ground/fg), 3 columns
const puppeteer = require('../../../node_modules/puppeteer'); const fs = require('fs'), path = require('path');
global.window = global; global.SONG = JSON.parse(fs.readFileSync(path.join(__dirname, '../../learn3/data/song.json'), 'utf8'));
require('./kv_chars.js'); require('./kv_worlds.js'); require('./edu_worlds.js'); require('./color_worlds.js');
const KV = global.KV, KVW = global.KVW; const names = process.argv.slice(3).length ? process.argv.slice(3) : Object.keys(KVW.WORLDS);
const cols = 3, w = 640, h = 360, rows = Math.ceil(names.length / cols);
const cell = (n, i) => `<div style="position:absolute;left:${(i % cols) * w}px;top:${Math.floor(i / cols) * h}px;width:${w}px;height:${h}px;overflow:hidden"><svg viewBox="0 0 1920 1080" width="${w}" height="${h}">${['far', 'mid', 'ground', 'fg'].map((l) => `<g>${KVW.WORLDS[n][l] || ''}</g>`).join('')}</svg><div style="position:absolute;left:8px;top:6px;font:700 22px Arial;background:#000a;color:#fff;padding:2px 8px;border-radius:6px">${n}</div></div>`;
const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#222"><svg width="0" height="0" style="position:absolute"><defs>${KV.DEFS}${KVW.DEFS}</defs></svg>${names.map(cell).join('')}`;
(async () => { const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu'] }); const p = await b.newPage(); await p.setViewport({ width: cols * w, height: rows * h }); await p.setContent(html); await new Promise((r) => setTimeout(r, 500)); await p.screenshot({ path: process.argv[2] || 'worlds.png' }); await b.close(); console.log('saved', names.length); })();
