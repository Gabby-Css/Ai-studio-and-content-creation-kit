/**
 * lib/video-transcript.cjs — pull video transcripts for outlier remake.
 *
 * (2026-05-07). you directive: "figure out a system where u watch
 * the video online and rewrite script from clicking regenerate script."
 *
 * YouTube: shell out to yt-dlp (2026.03.17 available locally), pull
 * auto-generated captions, parse to plain text.
 * Instagram: not yet supported (no clean public transcript path; would need
 * Apify or custom scraper). Returns null with a clear reason.
 *
 * Cached to memory/transcript-cache/<video-id>.txt so re-clicks for the
 * same outlier don't re-fetch.
 *
 * Public API:
 *   fetchTranscript(url) → Promise<{ ok, transcript, source, cached, reason? }>
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const CACHE_DIR = path.join(ROOT, 'memory', 'transcript-cache');
try { fs.mkdirSync(CACHE_DIR, { recursive: true }); } catch {}

const YT_DLP = 'yt-dlp'; // assumed on PATH (verified 2026.03.17 on your machine)

function cacheKey(url) {
  // YT video id, IG shortcode — URL-safe slug
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{8,})/);
  if (ytMatch) return 'yt-' + ytMatch[1];
  const igMatch = url.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]{8,})/);
  if (igMatch) return 'ig-' + igMatch[1];
  return 'misc-' + Buffer.from(url).toString('base64url').slice(0, 16);
}

function srtToPlainText(srt) {
  // Strip indices, timestamps, blank lines. Collapse to a single paragraph.
  const lines = srt.split('\n');
  const text = [];
  for (const line of lines) {
    if (/^\d+$/.test(line.trim())) continue;       // index
    if (/-->/.test(line)) continue;                 // timestamp
    if (!line.trim()) continue;
    // Strip <c> formatting tags yt-dlp leaves in
    text.push(line.replace(/<[^>]+>/g, '').trim());
  }
  // Dedupe consecutive identical lines (yt auto-cap repeats)
  const dedup = [];
  for (const l of text) if (l !== dedup[dedup.length - 1]) dedup.push(l);
  return dedup.join(' ').replace(/\s+/g, ' ').trim();
}

async function fetchTranscript(url) {
  if (!url) return { ok: false, reason: 'no url' };
  const key = cacheKey(url);
  const cachePath = path.join(CACHE_DIR, key + '.txt');
  if (fs.existsSync(cachePath)) {
    return { ok: true, transcript: fs.readFileSync(cachePath, 'utf8'), source: 'cache', cached: true };
  }

  // Instagram: no public transcript path
  if (/instagram\.com/.test(url)) {
    return { ok: false, reason: 'IG transcripts require paid Apify/custom scraper (not yet wired). Use caption-only fallback.', source: 'ig-skip' };
  }

  // YouTube via yt-dlp
  if (/youtube\.com|youtu\.be/.test(url)) {
    const tmpBase = path.join(CACHE_DIR, '_tmp_' + key);
    try {
      execSync(`${YT_DLP} --skip-download --write-auto-sub --sub-lang en --sub-format vtt --convert-subs srt -o "${tmpBase}.%(ext)s" "${url}"`, {
        stdio: ['ignore', 'pipe', 'pipe'], timeout: 30000, encoding: 'utf8',
      });
      // yt-dlp writes <tmpBase>.en.srt
      const srtPath = tmpBase + '.en.srt';
      if (!fs.existsSync(srtPath)) {
        return { ok: false, reason: 'no .srt produced (video may have no captions)', source: 'yt-dlp' };
      }
      const srt = fs.readFileSync(srtPath, 'utf8');
      const plain = srtToPlainText(srt);
      // Cache + cleanup
      fs.writeFileSync(cachePath, plain);
      try { fs.unlinkSync(srtPath); } catch {}
      // yt-dlp also produces a .info.json sometimes
      try {
        for (const f of fs.readdirSync(CACHE_DIR)) {
          if (f.startsWith('_tmp_' + key)) try { fs.unlinkSync(path.join(CACHE_DIR, f)); } catch {}
        }
      } catch {}
      return { ok: true, transcript: plain, source: 'yt-dlp', cached: false, length: plain.length };
    } catch (e) {
      return { ok: false, reason: 'yt-dlp failed: ' + e.message.slice(0, 200), source: 'yt-dlp-error' };
    }
  }

  return { ok: false, reason: 'unsupported url', source: 'unsupported' };
}

module.exports = { fetchTranscript };

if (require.main === module) {
  const url = process.argv[2];
  if (!url) { console.log('usage: node video-transcript.cjs <url>'); process.exit(1); }
  fetchTranscript(url).then((r) => {
    console.log(JSON.stringify({ ...r, transcript: r.transcript?.slice(0, 500) }, null, 2));
    if (r.ok && r.transcript) console.log('\n--- transcript (full) ---\n' + r.transcript);
  });
}
