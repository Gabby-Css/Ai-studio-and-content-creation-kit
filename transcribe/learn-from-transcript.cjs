#!/usr/bin/env node
'use strict';
// transcribe/learn-from-transcript.cjs — extract reusable craft from a video transcript.
//
//   node transcribe/learn-from-transcript.cjs <transcript.txt>
//   node transcribe/learn-from-transcript.cjs --text="...transcript..."
//   type transcript.txt | node transcribe/learn-from-transcript.cjs --stdin
//   flags: --niche="your audience" --no-apply --title="video name" --prompt-only
//   --digest=<reviewed.md> imports a manually generated digest and resumes the workflow.
//
// FLOW (bring your own model via pipeline/generators/llm.cjs; provider charges may apply):
//   1. DIGEST   — extract transferable craft, or save a prompt when no model is configured.
//   2. LEARN    — writes a playbook (pipeline/playbooks/) AND appends to the growing VIDEO-CRAFT-LEARNED.md (compounds).
//   3. RECORD   — append an ingestion receipt; performance remains unverified.
//   4. APPLY    — produce a concept for the requested niche, or save its prompt.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(process.env.STUDIO_ROOT || path.resolve(__dirname, '..'));
const MG = path.join(ROOT, 'pipeline');
const PLAYBOOKS = path.join(MG, 'playbooks');
const KNOWLEDGE = path.join(MG, 'VIDEO-CRAFT-LEARNED.md'); // the growing recursive-learn base
const PROMPTS = path.join(MG, 'transcript-prompts');
const HISTORY = path.join(PLAYBOOKS, 'transcript-history.jsonl');
const LLM = path.resolve(__dirname, '..', 'pipeline', 'generators', 'llm.cjs');

function slugify(s) { return String(s || 'video').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'video'; }
function nowIso() { return new Date().toISOString(); }
function argVal(argv, name, dflt) { const a = argv.find((x) => x.startsWith(`--${name}=`)); return a ? a.slice(name.length + 3) : dflt; }

function readTranscript(argv) {
  const t = argVal(argv, 'text', null);
  if (t) return t;
  if (argv.includes('--stdin')) { try { return fs.readFileSync(0, 'utf8'); } catch (_) { return ''; } }
  const file = argv.find((a) => !a.startsWith('--'));
  if (file && fs.existsSync(file)) return fs.readFileSync(file, 'utf8');
  return '';
}

async function generate(task) {
  const { callLLM } = require(LLM);
  return String(await callLLM(DIGEST_SYS, task) || '').trim();
}

function savePrompt(slug, phase, prompt) {
  fs.mkdirSync(PROMPTS, { recursive: true });
  const file = path.join(PROMPTS, `${slug}-${phase}.md`);
  fs.writeFileSync(file, prompt + '\n');
  console.log(`Prompt saved: ${path.relative(ROOT, file)}`);
  return file;
}

const DIGEST_SYS = 'You are a world-class short-form + YouTube director/editor studying a reference video via its TRANSCRIPT. Extract only TRANSFERABLE CRAFT we can reuse — never the specific topic. Be concrete, quote the hook, give reusable rules.';

function digestPrompt(transcript) {
  return `${DIGEST_SYS}\n\nStudy this TRANSCRIPT and return these sections:
1. FORMAT & PACING (video type, cut rhythm, approx length)
2. HOOK (first 3-5s technique — exactly how it grabs; QUOTE the opening line)
3. STRUCTURE (beat-by-beat skeleton: hook -> ... -> payoff -> CTA)
4. RETENTION TACTICS (open loops, pattern interrupts, re-hooks, but/so momentum)
5. SCRIPTING PATTERNS (sentence rhythm, specificity, how claims/proof are framed)
6. CTA STYLE (how it drives the next action)
7. TRANSFERABLE RULES (5-10 crisp "when X, do Y because Z" rules we can APPLY to our own videos)

TRANSCRIPT:
"""
${String(transcript).slice(0, 12000)}
"""`;
}

function applyPrompt(digest, niche) {
  return `Using these EXTRACTED video-craft rules, produce a ready-to-shoot SHORT-FORM video concept for OUR niche: ${niche}.
Output — TITLE · HOOK (exact first line) · STRUCTURE (beats w/ approx seconds) · FULL SCRIPT/VO · ON-SCREEN + EDIT NOTES (cuts, captions, b-roll) · CTA. Apply the strongest learned rules explicitly (name which rule each choice uses).

EXTRACTED CRAFT:
${digest}`;
}

async function main(argv = process.argv.slice(2)) {
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log('Usage: node transcribe/learn-from-transcript.cjs <transcript.txt> [--niche="..."] [--title="..."] [--no-apply] [--prompt-only] [--digest=<reviewed.md>]');
    console.log('Run from the extracted kit root. --text and --stdin are also supported. STUDIO_ROOT overrides the output root.');
    return;
  }
  const transcript = readTranscript(argv);
  if (!transcript || transcript.trim().length < 50) {
    console.error('Usage: node transcribe/learn-from-transcript.cjs <transcript.txt> [--niche="..."] [--title="..."] [--no-apply]');
    console.error('   or: --text="...transcript..."   or:  type file.txt | node ... --stdin   (need >=50 chars)');
    process.exit(1);
  }
  const niche = argVal(argv, 'niche', 'Practical AI tools for local businesses');
  const title = argVal(argv, 'title', (transcript.trim().split('\n')[0] || 'video').slice(0, 60));
  const slug = slugify(title);
  const doApply = !argv.includes('--no-apply');

  const digestFile = argVal(argv, 'digest', null);
  const canGenerate = !argv.includes('--prompt-only') && require(LLM).llmConfigured();
  if (!digestFile && !canGenerate) {
    savePrompt(slug, 'digest', digestPrompt(transcript));
    console.log('No model call made. Generate and review the digest, save it as Markdown, then rerun with --digest=<file>.');
    return;
  }
  console.log('⚙️  DIGEST…');
  const digest = digestFile ? fs.readFileSync(path.resolve(digestFile), 'utf8').trim() : await generate(digestPrompt(transcript));
  if (!digest) throw new Error('Digest is empty; no learning files were changed.');

  // 2. LEARN — playbook + growing knowledge base (recursive-learn: each ingest compounds)
  fs.mkdirSync(PLAYBOOKS, { recursive: true });
  const pbPath = path.join(PLAYBOOKS, `transcript-${slug}.md`);
  fs.writeFileSync(pbPath, `# Transcript playbook — ${title}\n_learned ${nowIso()}_\n\n${digest}\n`);
  const kbHeader = fs.existsSync(KNOWLEDGE) ? '' : '# VIDEO-CRAFT-LEARNED — transferable rules distilled from studied transcripts\n_Each entry compounds; apply these before shooting._\n';
  fs.appendFileSync(KNOWLEDGE, `${kbHeader}\n## ${title} (${nowIso()})\n${digest}\n`);

  // 3. Record ingestion separately from performance evidence. This does not train model weights.
  fs.appendFileSync(HISTORY, JSON.stringify({ at: nowIso(), slug, title, playbook: path.relative(ROOT, pbPath).split(path.sep).join('/'), status: 'ingested', performance: 'unverified' }) + '\n');

  console.log(`\n===== EXTRACTED CRAFT =====\n${digest}\n`);
  console.log(`📚 playbook: ${path.relative(ROOT, pbPath)}`);
  console.log(`📈 compounded into: ${path.relative(ROOT, KNOWLEDGE)}`);

  // 4. APPLY — a ready-to-shoot concept for our niche using the learned craft
  if (doApply) {
    if (!canGenerate) {
      savePrompt(slug, 'concept', applyPrompt(digest, niche));
      console.log('Digest saved and ingestion recorded. Generate the concept from the exported prompt.');
      return;
    }
    console.log('\n⚙️  APPLY → concept for the requested niche…');
    const concept = await generate(applyPrompt(digest, niche));
    if (concept) {
      const cPath = path.join(MG, `concept-${slug}.md`);
      fs.writeFileSync(cPath, `# Concept from learned craft — ${title}\n_${nowIso()} · niche: ${niche}_\n\n${concept}\n`);
      console.log(`\n===== READY-TO-SHOOT CONCEPT =====\n${concept}\n`);
      console.log(`🎬 concept: ${path.relative(ROOT, cPath)}`);
    }
  }
  console.log('\n✅ Digest saved and ingestion recorded. Verify the rules against real work before claiming improved performance.');
}

if (require.main === module) main().catch((e) => { console.error('ERR:', e && e.message ? e.message : e); process.exitCode = 1; });
module.exports = { main, digestPrompt, applyPrompt, ROOT, MG, PLAYBOOKS, KNOWLEDGE, PROMPTS, HISTORY };
