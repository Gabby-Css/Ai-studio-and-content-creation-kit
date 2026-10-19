// node chk_js.cjs toonN  -> syntax check of the page script + a crude "called but never declared" check
const fs = require('fs'), path = require('path');
const dir = process.argv[2];
const s = fs.readFileSync(path.join(__dirname, dir, 'index.html'), 'utf8');
let ok = true;
[...s.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach((x, i) => {
  try { new Function(x[1]); console.log('script', i, 'syntax ok', x[1].length); } catch (e) { ok = false; console.log('script', i, 'SYNTAX ERROR', e.message); }
});
const body = s.slice(s.indexOf('/* ===== captions ===== */'));
const calls = new Set([...body.matchAll(/(?<![\w.$#'"])([A-Za-z_]\w*)\(/g)].map(m => m[1]));
const decl = new Set([...s.matchAll(/(?:const|let|function|var)\s+([A-Za-z_]\w*)/g)].map(m => m[1]));
const builtin = new Set(['if', 'for', 'while', 'switch', 'function', 'return', 'Math', 'Array', 'Object', 'Number', 'String', 'parseInt', 'parseFloat', 'gsap', 'Date', 'Set', 'JSON', 'catch', 'require', 'of', 'in', 'new', 'typeof', 'Boolean']);
const bad = [...calls].filter(c => !decl.has(c) && !builtin.has(c));
console.log('undeclared calls:', bad.join(', ') || 'none');
// every getElementById('xMount') must exist in the markup
const miss = [...s.matchAll(/getElementById\('(\w+)'\)/g)].map(m => m[1]).filter(id => !new RegExp('id="' + id + '"').test(s.slice(0, s.indexOf('<script>'))));
console.log('missing mount ids:', [...new Set(miss)].join(', ') || 'none');
process.exit(ok && !bad.length && !miss.length ? 0 : 1);
