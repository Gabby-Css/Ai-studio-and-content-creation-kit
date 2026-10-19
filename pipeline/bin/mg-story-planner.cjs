#!/usr/bin/env node
/**
 * mg-story-planner.cjs — the DISTRIBUTION producer for the MG engine. Rotates the rendered FUSION-REEL library
 * (4 angle variants) + the hero FORM clips into a 7-day IG STORY/REEL candidate plan: one ready-to-post candidate per day
 * (visual asset + hook + caption + keyword-CTA), reel-days and form-b-roll-days alternated so no reel repeats inside a week.
 * Prepares a candidate calendar from recipient-supplied assets. It reads clips/input metadata and writes local
 * planning files only. Publishing requires separate review and manual action; no historical autopost permission,
 * recurring task, reach result, or zero-cost claim is inherited.
 *
 *   node pipeline/bin/mg-story-planner.cjs            # 7-day plan → memory/mg-story-calendar.{json,md}
 *   node pipeline/bin/mg-story-planner.cjs --days=14  # longer horizon (cycles the rotation)
 */
const fs = require('fs');
const path = require('path');

const MEM = path.resolve(__dirname, '..', '..', 'memory');
const KIT = path.join(MEM, 'reel-publish-kit.json');
const DAYS = (() => { const a = process.argv.find(s => s.startsWith('--days=')); return a ? Math.max(1, +a.split('=')[1] || 7) : 7; })();

if (!fs.existsSync(KIT)) {
  console.error('Missing input: memory/reel-publish-kit.json. Supply your own JSON with reels and form_clips arrays; the original publish-kit producer is not included. This tool only prepares a manual posting plan.');
  process.exit(1);
}
const kit = JSON.parse(fs.readFileSync(KIT, 'utf8'));
const reels = (kit.reels || []).filter(r => r.exists);
// consume forms NEWEST-FIRST (the kit appends new forms) so a freshly-rendered hero (e.g. the streak-enhanced SDF-BLOB)
// reaches the live 7-day queue immediately instead of waiting a full rotation to surface.
const forms = (kit.form_clips || []).filter(f => f.exists).reverse();

// AI-tip captions for FORM-b-roll story days (the form clip is the visual; the tip is the value). Each pairs a fresh
// keyword-CTA examples. Replace claims with verified facts; no reach or conversion result is implied.
const FORM_TIPS = [
  { tip: 'Provide relevant context for the task, then check whether the model used it correctly.', cta: 'Comment CONTEXT' },
  { tip: 'Compare models on your tasks and record actual cost and quality before changing the route.', cta: 'Comment STACK' },
  { tip: 'Reuse style references and inspect consistency across the outputs.', cta: 'Comment STYLE' },
  { tip: 'Give an agent a bounded task, explicit permissions, and a review step before delivery.', cta: 'Comment AGENT' },
  { tip: 'This example uses code-driven Three.js motion; dependencies, compute, and asset rights still matter.', cta: 'Comment ENGINE' },
];

function isoPlus(n) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function dayName(iso) { return DOW[new Date(iso + 'T12:00:00').getDay()]; }

// Rotation: REEL on even index, FORM-b-roll on odd → no reel repeats within a week (4 reels cover 4 of 7 reel-slots).
const plan = [];
let reelI = 0, formI = 0, tipI = 0, lastCta = null;
for (let i = 0; i < DAYS; i++) {
  const date = isoPlus(i);
  const useReel = (i % 2 === 0) && reels.length > 0;
  if (useReel) {
    const r = reels[reelI % reels.length]; reelI++;
    plan.push({
      date, day: dayName(date), kind: 'reel', asset: r.file, angle: r.angle, aspect: r.aspect || '1080x1920 (9:16)',
      hook: r.hook, caption: r.caption, hashtags: r.hashtags || [], cta: r.cta, onscreen: r.onscreen || [],
    });
    lastCta = r.cta;
  } else {
    // skip a tip whose CTA matches the PREVIOUS day's CTA OR the NEXT reel-day's CTA (no back-to-back dupes either side)
    const nextReelCta = reels.length ? reels[reelI % reels.length].cta : null;
    let t = FORM_TIPS[tipI % FORM_TIPS.length];
    for (let g = 0; g < FORM_TIPS.length && (t.cta === lastCta || t.cta === nextReelCta); g++) { tipI++; t = FORM_TIPS[tipI % FORM_TIPS.length]; }
    tipI++;
    const f = forms[formI % forms.length]; formI++;
    lastCta = t.cta;
    plan.push({
      date, day: dayName(date), kind: 'story', asset: f.file, angle: 'AI tip (form b-roll)', aspect: '1080x1920 (9:16)',
      hook: t.tip.split('.')[0], caption: `${t.tip} ${t.cta}.`, hashtags: ['#AI', '#LLM', '#AItools'], cta: t.cta,
      onscreen: [t.tip.split('.')[0], t.cta],
    });
  }
}

const out = {
  generated_at: new Date().toISOString(),
  horizon_days: DAYS,
  source: 'memory/reel-publish-kit.json',
  note: 'CANDIDATE QUEUE — review each entry and publish manually through your own account. No posting automation is enabled.',
  assets: { reels: reels.length, form_clips: forms.length },
  rotation: 'reel-days + form-b-roll-days alternated; reels cycle without in-week repeat',
  plan,
};
fs.writeFileSync(path.join(MEM, 'mg-story-calendar.json'), JSON.stringify(out, null, 2));

// human-readable, copy-paste-per-day .md
let md = `# MG Story/Reel — ${DAYS}-Day Candidate Plan\n\n`;
md += `_Generated ${out.generated_at.slice(0, 10)}. PREP ONLY — review and publish manually; no scheduling or posting service is started._\n\n`;
md += `Assets: ${reels.length} reels + ${forms.length} form clips. Asset locations come from the recipient-supplied input kit.\n\n`;
for (const p of plan) {
  const icon = p.kind === 'reel' ? '🎬' : '✨';
  md += `## ${p.date} (${p.day}) — ${icon} ${p.kind.toUpperCase()}: ${p.angle}\n`;
  md += `- **Asset:** \`${p.asset}\` (${p.aspect})\n`;
  md += `- **Hook (frame 0):** ${p.hook}\n`;
  md += `- **Caption:** ${p.caption}\n`;
  md += `- **CTA:** ${p.cta}\n`;
  md += `- **Hashtags:** ${p.hashtags.join(' ')}\n`;
  if (p.onscreen.length) md += `- **On-screen:** ${p.onscreen.join(' / ')}\n`;
  md += `\n`;
}
md += `---\n_${plan.filter(p => p.kind === 'reel').length} reel-days · ${plan.filter(p => p.kind === 'story').length} form-b-roll-days. Re-run after rendering new reels/forms to refresh the queue._\n`;
fs.writeFileSync(path.join(MEM, 'mg-story-calendar.md'), md);

console.log(`mg-story-planner: ${DAYS}-day plan (${plan.filter(p => p.kind === 'reel').length} reels + ${plan.filter(p => p.kind === 'story').length} form-stories) → memory/mg-story-calendar.{json,md}`);
