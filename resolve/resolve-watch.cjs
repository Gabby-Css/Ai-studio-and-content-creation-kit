#!/usr/bin/env node
/**
 * resolve-watch.cjs — makes the in-Resolve Claude panel INSTANT-APPLY.
 *
 * The panel writes what you types to memory/resolve-inbox.jsonl. Without a watcher
 * nothing runs until an agent happens to read the inbox — so the panel "doesn't work."
 * This process polls the inbox ~every second and, the moment a new unread instruction
 * lands, ACTS on it: a deterministic router handles the core editing verbs live (dead-air
 * cut, markers, delete, playhead, status) via the proven short-lived resolve_ctl calls,
 * and pushes a reply the panel shows. Anything it can't safely map is handed off to the
 * full agent (left flagged) with an honest panel reply — never a silent no-op.
 *
 *   node resolve-watch.cjs            # poll forever
 *   node resolve-watch.cjs --once     # process current backlog once and exit (for tests)
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const HERE = __dirname;
const MEMORY = path.join(HERE, '..', '..', 'memory');
const INBOX = path.join(MEMORY, 'resolve-inbox.jsonl');
const HANDOFF = path.join(MEMORY, 'resolve-agent-queue.jsonl'); // instructions needing the full agent
const POLL_MS = 1200;
const ONCE = process.argv.includes('--once');

function ctl(args) {
  // One short-lived resolve_ctl dispatch (the segfault-safe path). Returns parsed JSON.
  try {
    const out = execFileSync('py', ['resolve_ctl.py', ...args], { cwd: HERE, encoding: 'utf8', timeout: 120000 });
    return JSON.parse(out);
  } catch (e) {
    const so = (e.stdout || '').toString();
    try { return JSON.parse(so); } catch (_) { return { success: false, message: (e.message || 'ctl failed').split('\n')[0] }; }
  }
}

function reply(text) {
  try { execFileSync('py', ['resolve_ctl.py', 'reply', text], { cwd: HERE, timeout: 30000 }); } catch (_) {}
  log('reply: ' + text);
}

function log(msg) {
  process.stdout.write(`[resolve-watch ${new Date().toISOString().slice(11, 19)}] ${msg}\n`);
}

function fps() {
  const s = ctl(['status']);
  return (s.data && s.data.fps) || 59.94;
}

function tcToFrames(tc, f) {
  const [h, m, s, fr] = String(tc).replace(/;/g, ':').split(':').map(Number);
  return Math.round((h * 3600 + m * 60 + s) * f) + fr;
}

// --- intent router ----------------------------------------------------------
function route(text) {
  const t = text.toLowerCase().trim();

  // dead air / silence cut. Full rebuild path — goes AROUND Resolve's missing blade API by
  // reconstructing a silence-free timeline (cuts silence inside speech clips too, not just
  // whole-dead ones). Optional "N sec" → minimum silence length to cut.
  if (/(dead\s*space|dead\s*air|silence|silent|empty\s*space|dead\s*point|tighten|pauses?)/.test(t)) {
    const durM = t.match(/([\d.]+)\s*(s|sec|second)/);
    const minsil = durM ? parseFloat(durM[1]) : 0.8;
    log(`silence-free rebuild (minsil=${minsil})`);
    try {
      // 1) pull current clip source ranges via the reliable raw path
      const raw = ctl(['raw', '--arg', "expr=[[it.GetLeftOffset(),it.GetDuration(),it.GetMediaPoolItem().GetClipProperty('File Path'),it.GetMediaPoolItem().GetName()] for it in timeline.GetItemListInTrack('video',1)]"]);
      if (!raw.success) return `Couldn't read the timeline: ${raw.message}`;
      fs.writeFileSync(path.join(HERE, 'sc_raw.json'), JSON.stringify(raw));
      // 2) compute speech segments (pure ffmpeg, no Resolve)
      execFileSync('py', ['sc_segments.py', `--minsil=${minsil}`], { cwd: HERE, encoding: 'utf8', timeout: 900000 });
      const seg = JSON.parse(fs.readFileSync(path.join(HERE, 'sc_segments.json'), 'utf8'));
      const cutS = (seg.cut_frames / seg.fps).toFixed(1);
      // 3) rebuild a fresh silence-free timeline (original untouched)
      const name = `Timeline tight ${new Date().toISOString().slice(11, 16).replace(':', '')}`;
      const rb = ctl(['rebuild_tight', '--arg', `timeline_name=${name}`]);
      if (!rb.success) return `Rebuild failed: ${rb.message}`;
      return `Cut ${cutS}s of dead space (silences ≥${minsil}s) → new '${name}': ${rb.data.appended} tight segments. Your original timeline is untouched — switch back anytime.`;
    } catch (e) {
      return `Silence rebuild hit an error: ${(e.stdout || e.message || e).toString().split('\n').slice(-2).join(' ')}`;
    }
  }

  // marker at playhead (or timecode)
  if (/\bmark(er)?\b/.test(t)) {
    const tcM = t.match(/(\d{1,2}:\d{2}(:\d{2}){0,2})/);
    const args = ['add_marker', '--arg', 'color=Green', '--arg', 'name=panel'];
    if (tcM) args.push('--arg', `timecode=${tcM[1].split(':').length === 2 ? '00:' + tcM[1] + ':00' : tcM[1]}`);
    const r = ctl(args);
    return r.success ? `Marker added${tcM ? ' at ' + tcM[1] : ' at playhead'}.` : `Marker failed: ${r.message}`;
  }

  // move playhead
  const goM = t.match(/(?:go to|playhead|jump to|move to|seek)\s*(\d{1,2}:\d{2}(?::\d{2}){0,2})/);
  if (goM) {
    let tc = goM[1];
    if (tc.split(':').length === 2) tc = '00:' + tc + ':00';
    else if (tc.split(':').length === 3) tc = tc + ':00';
    const r = ctl(['set_playhead', '--arg', `timecode=${tc}`]);
    return r.success ? `Playhead → ${tc}.` : `Playhead move failed: ${r.message}`;
  }

  // status / what's on the timeline
  if (/(status|what.?s on|how many clips|timeline state|summary)/.test(t)) {
    const s = ctl(['status']);
    if (!s.success) return `Not connected: ${s.message}`;
    const ts = ctl(['timeline_state']);
    let n = '?';
    try { n = ts.data.video_tracks.find(v => v.index === 1).items.length; } catch (_) {}
    return `${s.data.project} / ${s.data.timeline} — ${n} clips on Video 1, ${s.data.fps}fps.`;
  }

  // unmapped → hand to the full agent, honest reply
  fs.appendFileSync(HANDOFF, JSON.stringify({ ts: new Date().toISOString(), text }) + '\n');
  return `On it — "${text}" needs the full editor (concept replication / titles / Fusion). Queued for Claude; I'll act and reply here.`;
}

// --- inbox loop -------------------------------------------------------------
function readInbox() {
  if (!fs.existsSync(INBOX)) return [];
  return fs.readFileSync(INBOX, 'utf8').split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch (_) { return null; } }).filter(Boolean);
}

function writeInbox(recs) {
  fs.writeFileSync(INBOX, recs.map(r => JSON.stringify(r)).join('\n') + '\n');
}

function tick() {
  const recs = readInbox();
  let changed = false;
  for (const rec of recs) {
    if (rec.read || rec.from !== 'you') continue;
    rec.read = true; changed = true;
    writeInbox(recs); // mark-read BEFORE acting so a long op can't double-fire
    log(`instruction: ${rec.text}`);
    let out;
    try { out = route(rec.text); } catch (e) { out = `Hit an error: ${(e.message || e).toString().split('\n')[0]}`; }
    reply(out);
  }
  if (changed) writeInbox(readInbox()); // persist any marks
}

if (ONCE) { tick(); process.exit(0); }
log(`watching ${INBOX} every ${POLL_MS}ms — panel is now instant-apply.`);
setInterval(tick, POLL_MS);
