// words.json (tts.py) + plan.json (line start times) -> index.html
const fs = require('fs');
const words = JSON.parse(fs.readFileSync(__dirname + '/words.json', 'utf8'));
const plan = JSON.parse(fs.readFileSync(__dirname + '/plan.json', 'utf8'));
const PLAN = Object.assign({}, words, { LINE_T: plan.LINE_T });
const t = fs.readFileSync(__dirname + '/build/template.tpl', 'utf8').replace('__PLAN__', JSON.stringify(PLAN));
fs.writeFileSync(__dirname + '/index.html', t);
console.log('built index.html', t.length);
