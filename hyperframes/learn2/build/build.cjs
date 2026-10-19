// node build.cjs  ->  ../index.html   (single-file composition; data + code inlined)
const fs = require('fs'), path = require('path');
const R = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');
const song = JSON.parse(R('../data/song.json'));
global.window = global; global.SONG = song; require('./kv_logo.js');
const L = global.KVLogo;
let t = R('template.html');
const sub = { __DURATION__: song.duration, __SONG__: JSON.stringify(song), __CHARS__: R('kv_chars.js'), __WORLDS__: R('kv_worlds.js'), __EDUWORLDS__: R('edu_worlds.js'), __EDUOBJ__: R('edu_objects.js'), __COLOROBJ__: R('color_objects.js'), __COLORWORLDS__: R('color_worlds.js'), __COLORPROPS__: R('color_props.js'), __PROPS__: R('kv_props.js'), __EDUPROPS__: R('edu_props.js'), __LOGO__: R('kv_logo.js'), __STORY__: R('color_story.js'), __ENGINE__: R('kv_engine.js'),
  __LOGO_SMALL__: L.html(62), __LOGO_BIG__: L.html(200), __LOGO_END__: L.html(170) };
for (const k in sub) t = t.split(k).join(String(sub[k]));      // split/join: no $-pattern surprises
fs.writeFileSync(path.join(__dirname, '..', 'index.html'), t);
console.log('built index.html', (t.length / 1024).toFixed(0), 'KB');
