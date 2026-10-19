// Gathers every finished KiddoVerse + Bo-and-the-Pancake video into one Desktop folder and writes a playable index.html.
// Re-runnable: node build_gallery.cjs   (hard-links the files, so no extra disk space; poster frames come from ffmpeg)
const fs = require('fs'), path = require('path'), cp = require('child_process');
const HOME = process.env.USERPROFILE || 'C:\\Users\\softenic';
const KIT = path.join(HOME, 'Downloads', 'ai-video-studio-kit', 'hyperframes');
const OUT = path.join(HOME, 'Desktop', 'KiddoVerse_ALL_VIDEOS');
const FFBIN = path.join(HOME, 'AppData', 'Local', 'Microsoft', 'WinGet', 'Packages', 'Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe', 'ffmpeg-9.0.2-full_build', 'bin');
const FFMPEG = fs.existsSync(path.join(FFBIN, 'ffmpeg.exe')) ? path.join(FFBIN, 'ffmpeg.exe') : 'ffmpeg';
const FFPROBE = fs.existsSync(path.join(FFBIN, 'ffprobe.exe')) ? path.join(FFBIN, 'ffprobe.exe') : 'ffprobe';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ls = d => { try { return fs.readdirSync(d); } catch { return []; } };
const mp4s = d => ls(d).filter(f => /\.mp4$/i.test(f)).map(f => path.join(d, f));

function place(src, subdir, name) {
  const dir = path.join(OUT, subdir); fs.mkdirSync(dir, { recursive: true });
  const dst = path.join(dir, name);
  try { if (fs.existsSync(dst)) { if (fs.statSync(dst).mtimeMs >= fs.statSync(src).mtimeMs && fs.statSync(dst).size === fs.statSync(src).size) return dst; fs.unlinkSync(dst); } fs.linkSync(src, dst); }
  catch { try { fs.copyFileSync(src, dst); } catch (e) { console.error('cannot place', src, e.message); return null; } }
  return dst;
}
function probe(f) {
  try {
    const o = cp.execFileSync(FFPROBE, ['-v', 'error', '-show_entries', 'format=duration:stream=width,height', '-of', 'json', f], { encoding: 'utf8' });
    const j = JSON.parse(o); const s = (j.streams || []).find(x => x.width) || {};
    return { dur: +j.format.duration, w: s.width, h: s.height };
  } catch { return { dur: 0, w: 0, h: 0 }; }
}
function poster(f, at) {
  const p = f.replace(/\.mp4$/i, '.jpg');
  if (!fs.existsSync(p)) { try { cp.execFileSync(FFMPEG, ['-y', '-v', 'error', '-ss', String(at), '-i', f, '-frames:v', '1', '-vf', 'scale=640:-2', '-q:v', '4', p]); } catch { } }
  return fs.existsSync(p) ? p : null;
}
const fmt = s => { s = Math.round(s); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const items = [];   // {group,title,note,file,rel,poster,dur,w,h,mb}
function add(group, title, note, src, subdir, name, order) {
  if (!src || !fs.existsSync(src)) return;
  const dst = place(src, subdir, name || path.basename(src)); if (!dst) return;
  const pr = probe(dst), po = poster(dst, Math.min(8, pr.dur / 3 || 1));
  items.push({ group, title, note, order: order || 0, rel: path.relative(OUT, dst).replace(/\\/g, '/'), poster: po ? path.relative(OUT, po).replace(/\\/g, '/') : '', dur: pr.dur, w: pr.w, h: pr.h, mb: fs.statSync(dst).size / 1048576 });
}

// ---- KiddoVerse Learn #1 (the new one) ----
const L1 = path.join(HOME, 'Desktop', 'KiddoVerse_Learn1');
const l1all = mp4s(L1).concat(mp4s(path.join(L1, 'Shorts')));
const l1main720 = l1all.find(f => /_720p\.mp4$/i.test(f)), l1main1080 = l1all.find(f => /_1080p\.mp4$/i.test(f));
add('learn1', 'Count, ABC & Read with KiddoVerse (main, 720p)', 'Learn #1: numbers 1-10, alphabet A-Z, two-letter words, game and sing-along', l1main720, 'KiddoVerse_Learn1', null, 0);
add('learn1', 'Count, ABC & Read with KiddoVerse (1080p, best quality)', 'Upload this one to YouTube', l1main1080, 'KiddoVerse_Learn1', null, 1);
l1all.filter(f => f !== l1main720 && f !== l1main1080).sort().forEach((f, i) => add('learn1', path.basename(f, '.mp4').replace(/_/g, ' '), 'vertical Short', f, 'KiddoVerse_Learn1', null, 2 + i));

// ---- KiddoVerse Learn #2 (colors) and Learn #3 (animal sounds) ----
for (const [g, folder, title, note] of [['learn2', 'KiddoVerse_Learn2', 'The Color Train: Learn 6 Colors', 'Learn #2: red, orange, yellow, green, blue, purple, the rainbow song and a color game'],
                                       ['learn3', 'KiddoVerse_Learn3', 'Animal Sounds Dance Party', 'Learn #3: 8 animals and their sounds, dance break and a Who-says-it quiz (3 min, fast TikTok-style cuts)'],
                                       ['learn4', 'KiddoVerse_Learn4', 'The Shape Workshop', 'Learn #4: 8 shapes with 3 everyday things each, a quiz, shape yoga and a house built from shapes (3 min)'],
                                       ['learn5', 'KiddoVerse_Learn5', "Gizmo's Counting Machine", 'Learn #5: count 11 to 20 with ten-frames, count by 2s, 5s and 10s, three quiz rounds (3 min)']]) {
  const D = path.join(HOME, 'Desktop', folder), all = mp4s(D).concat(mp4s(path.join(D, 'Shorts')));
  const m720 = all.find(f => /_720p\.mp4$/i.test(f)), m1080 = all.find(f => /_1080p\.mp4$/i.test(f));
  add(g, title + ' (main, 720p)', note, m720, folder, null, 0);
  add(g, title + ' (1080p, best quality)', 'Upload this one to YouTube', m1080, folder, null, 1);
  all.filter(f => f !== m720 && f !== m1080).sort().forEach((f, i) => add(g, path.basename(f, '.mp4').replace(/_/g, ' '), 'vertical Short', f, folder, null, 2 + i));
}

// ---- KiddoVerse Episode 1 ----
const E1 = path.join(HOME, 'Desktop', 'KiddoVerse');
add('ep1', 'Zoom, Zoom, KiddoVerse! (720p)', 'Episode 1 sing-along, 3:16', path.join(E1, '1_Main_Video', 'KIDDOVERSE_01.mp4'), 'KiddoVerse_Episode1', null, 0);
add('ep1', 'Zoom, Zoom, KiddoVerse! (1080p)', 'Episode 1, sharper and bigger file', path.join(E1, '1_Main_Video', 'KIDDOVERSE_01_1080p.mp4'), 'KiddoVerse_Episode1', null, 1);
mp4s(path.join(E1, '2_Shorts_Vertical')).sort().forEach((f, i) => add('ep1', path.basename(f, '.mp4').replace(/KIDDOVERSE_01_/, '').replace(/[_-]/g, ' '), 'vertical Short', f, 'KiddoVerse_Episode1', null, 2 + i));

// ---- Bo and the Pancake (every episode, best file) ----
for (const d of ls(KIT).filter(x => /^toon\d*$/.test(x))) {
  const n = d === 'toon' ? 1 : +d.slice(4);
  const fs_ = mp4s(path.join(KIT, d, 'output')).sort((a, b) => (/final/i.test(b) - /final/i.test(a)) || (fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs));
  if (fs_[0]) add('bo', 'Bo and the Pancake - episode ' + n, '30 s vertical cartoon', fs_[0], 'Bo_and_the_Pancake', 'Bo_and_the_Pancake_ep' + String(n).padStart(2, '0') + '.mp4', n);
}

const G = {
  learn5: ["New: Learn #5 - Gizmo's Counting Machine", 'The newest KiddoVerse video: count from 11 to 20, then count by 2s, 5s and 10s.'],
  learn4: ['Learn #4 - The Shape Workshop', 'Circle, square, triangle, rectangle, oval, star, heart and diamond.'],
  learn3: ['Learn #3 - Animal Sounds Dance Party', 'The newest KiddoVerse video: moo, quack, oink and more, with a dance break and a quiz.'],
  learn2: ['Learn #2 - The Color Train', 'Six colors, the rainbow song and a color game.'],
  learn1: ['KiddoVerse Learn #1', 'The next KiddoVerse video: counting, the alphabet and two-letter words.'],
  ep1: ['KiddoVerse Episode 1', 'The first sing-along and its three vertical Shorts.'],
  bo: ['Bo and the Pancake', 'The cartoon series, newest episode last.'],
};
const card = it => `<figure class="card ${it.h > it.w ? 'tall' : 'wide'}"><video controls preload="none" playsinline ${it.poster ? `poster="${esc(it.poster)}"` : ''} src="${esc(it.rel)}"></video>
<figcaption><b>${esc(it.title)}</b><span>${esc(it.note)}</span><em>${fmt(it.dur)} &middot; ${it.w}&times;${it.h} &middot; ${it.mb.toFixed(0)} MB</em></figcaption></figure>`;
let sections = '';
for (const g of ['learn5', 'learn4', 'learn3', 'learn2', 'learn1', 'ep1', 'bo']) {
  const its = items.filter(i => i.group === g).sort((a, b) => a.order - b.order);
  const body = its.length ? its.map(card).join('\n') : '<p class="wait">Not finished yet. Run the gallery builder again when it is done.</p>';
  sections += `<section id="${g}"><h2>${esc(G[g][0])} <small>${its.length} video${its.length === 1 ? '' : 's'}</small></h2><p class="sub">${esc(G[g][1])}</p><div class="grid ${g}">${body}</div></section>`;
}
const total = items.length, totalDur = items.reduce((s, i) => s + i.dur, 0);
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>KiddoVerse All Videos</title>
<style>
:root{--bg:#f6f3ff;--ink:#241b4b;--mut:#6b6394;--card:#fff;--line:#e2dcf7;--acc:#6d3df5;--acc2:#ff8a3d}
@media (prefers-color-scheme:dark){:root{--bg:#171230;--ink:#f1edff;--mut:#a79fd2;--card:#221b45;--line:#372e66;--acc:#9d7cff;--acc2:#ffa05c}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 "Baloo 2","Fredoka",system-ui,Segoe UI,sans-serif}
header{padding:32px 16px 8px;max-width:1200px;margin:0 auto}h1{margin:0;font-size:clamp(28px,5vw,44px);letter-spacing:-.5px}
h1 span{color:var(--acc)}header p{margin:6px 0 0;color:var(--mut)}nav{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
nav a{padding:6px 14px;border-radius:99px;background:var(--card);border:1px solid var(--line);color:var(--ink);text-decoration:none;font-weight:600}nav a:hover{border-color:var(--acc)}
main{max-width:1200px;margin:0 auto;padding:0 16px 48px}section{margin-top:36px}h2{margin:0;font-size:26px}h2 small{font-size:14px;color:var(--mut);font-weight:500;margin-left:8px}
.sub{margin:2px 0 14px;color:var(--mut)}.grid{display:grid;gap:16px}.grid.learn5,.grid.learn4,.grid.learn3,.grid.learn2,.grid.learn1,.grid.ep1{grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))}.grid.bo{grid-template-columns:repeat(auto-fill,minmax(min(100%,190px),1fr))}
.card{margin:0;background:var(--card);border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column}
.card video{width:100%;background:#000;display:block}.card.wide video{aspect-ratio:16/9}.card.tall video{aspect-ratio:9/16;object-fit:contain}
figcaption{padding:10px 12px 12px;display:flex;flex-direction:column;gap:2px}figcaption b{font-size:15px;line-height:1.25}figcaption span{font-size:13px;color:var(--mut)}figcaption em{font-size:12px;color:var(--acc);font-style:normal;font-weight:600}
.wait{color:var(--mut);padding:16px;border:1px dashed var(--line);border-radius:12px}footer{max-width:1200px;margin:0 auto;padding:0 16px 32px;color:var(--mut);font-size:13px}
</style></head><body><header><h1>Kiddo<span>Verse</span> &mdash; all videos</h1><p>${total} videos, ${fmt(totalDur)} in total. Click any video to play it. Files are in the folders next to this page.</p>
<nav><a href="#learn5">New: Learn #5</a><a href="#learn4">Learn #4</a><a href="#learn3">Learn #3</a><a href="#learn2">Learn #2</a><a href="#learn1">Learn #1</a><a href="#ep1">Episode 1</a><a href="#bo">Bo and the Pancake</a></nav></header><main>${sections}</main>
<footer>Voices and music are AI-generated. Check licences and the KIDDOVERSE trademark note in the upload kit before publishing.</footer></body></html>`;
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'index.html'), html, 'utf8');
console.log('gallery:', path.join(OUT, 'index.html'), '|', total, 'videos', '|', fmt(totalDur));
for (const g of ['learn5', 'learn4', 'learn3', 'learn2', 'learn1', 'ep1', 'bo']) console.log(' ', g, items.filter(i => i.group === g).length);
