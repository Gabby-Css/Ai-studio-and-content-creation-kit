// node build_v.cjs <shortId>   (hook | wiggle | count)  ->  ../../kv_short_<id>/ (index.html + assets + audio/short.wav), ready to render
const fs = require('fs'), path = require('path'), cp = require('child_process');
const id = process.argv[2]; const R = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');
const WIN = { hook: [6, 24, 'Zoom Zoom Kiddoverse'], wiggle: [104, 120, 'Kiddo Wiggle'], count: [56, 72, 'Count with Rumble'] }[id];
if (!WIN) throw new Error('unknown short ' + id);
const [s, e, name] = WIN, T = e - s;
const song = JSON.parse(R('../data/song.json')); const sh = (x) => +(x - s).toFixed(4);
const d = JSON.parse(JSON.stringify(song)); d.duration = T;
d.sections = d.sections.map((x) => Object.assign(x, { t0: sh(x.t0), t1: sh(x.t1) }));
d.lines = d.lines.filter((l) => l.t0 >= s - .05 && l.t1 <= e + .35).map((l) => {
  l.t0 = sh(l.t0); l.t1 = sh(l.t1);
  l.words.forEach((w) => { w.t0 = sh(w.t0); w.t1 = sh(w.t1); w.syl.forEach((y) => (y.t0 = sh(y.t0))); (w.subs || []).forEach((x) => { x.t0 = sh(x.t0); x.t1 = sh(x.t1); x.syl.forEach((y) => (y.t0 = sh(y.t0))); }); });
  return l; });
d.speech = d.speech.filter((x) => x.t >= s - .02 && x.t < e).map((x) => Object.assign(x, { t: sh(x.t) }));
global.window = global; global.SONG = d; require('./kv_logo.js');
const out = path.resolve(__dirname, '../../kv_short_' + id);
fs.mkdirSync(path.join(out, 'audio'), { recursive: true }); fs.mkdirSync(path.join(out, 'assets/fonts'), { recursive: true }); fs.mkdirSync(path.join(out, 'vendor'), { recursive: true });
fs.copyFileSync(path.join(__dirname, '../vendor/gsap.min.js'), path.join(out, 'vendor/gsap.min.js'));
['fredoka-latin-700-normal.woff2', 'baloo-2-latin-800-normal.woff2'].forEach((f) => fs.copyFileSync(path.join(__dirname, '../assets/fonts', f), path.join(out, 'assets/fonts', f)));
cp.execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', String(s), '-t', String(T), '-i', path.join(__dirname, '../audio/master.wav'), '-af', `afade=t=in:d=0.04,afade=t=out:st=${T - 0.5}:d=0.5`, path.join(out, 'audio/short.wav')]);
let t = R('template_v.html');
const story = R('kv_story_v.js').split('__SHORT__').join(id);
const sub = { __NAME__: name, __DURATION__: T, __SONG__: JSON.stringify(d), __CHARS__: R('kv_chars.js'), __WORLDS__: R('kv_worlds.js').split('1160').join('1560').split('900, W, 260').join('900, W, 660'), __PROPS__: R('kv_props.js'), __LOGO__: R('kv_logo.js'), __STORY__: story, __ENGINE__: R('kv_engine.js'), __LOGO_SMALL__: global.KVLogo.html(74) };
for (const k in sub) t = t.split(k).join(String(sub[k]));
fs.writeFileSync(path.join(out, 'index.html'), t); console.log('built', out, T + 's', (t.length / 1024).toFixed(0) + 'KB');
