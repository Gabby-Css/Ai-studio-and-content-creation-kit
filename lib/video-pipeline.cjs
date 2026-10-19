'use strict';
/**
 * lib/video-pipeline.cjs — (T-10440). UNIFIED VIDEO ORCHESTRATOR.
 *
 * Build a plan from the entrypoints included in the extracted kit. Planning is read-only;
 * it does not start a model, open an editor, render footage or publish a video.
 *
 * THE STACK (each layer has one role; the orchestrator composes them):
 *   ASSETS (generate raw footage/elements):
 *     - Unreal adapter — requires your separately installed editor and bridge.
 *     - Portable shot-pack generator and local HTML motion renderer.
 *     - Your own recorded footage or externally generated avatar clips.
 *   ASSEMBLY: the included Remotion project or the longform assembler.
 *   DELIVERY: review the exported file and publish manually through your own account.
 *
 * CLI:  node lib/video-pipeline.cjs plan "<video request>"     # the unified plan for a request
 *       node lib/video-pipeline.cjs stack                       # show the full stack + each tool's status
 * API:  planVideo(request, opts) → { type, asset_sources, assembly, brand, distribute, setup_needed, steps }
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const exists = (rel) => { try { return fs.existsSync(path.join(ROOT, rel)); } catch { return false; } };

// Is the Unreal MCP live? (the editor must be running + server started; we can't bluff it.)
function unrealLive() {
  // Best-effort: a live editor writes an .mcp.json with the unreal-mcp server; presence ≠ running, so default false.
  // (A real liveness check would ping list_toolsets via the MCP — only available when the editor is up.)
  return false;
}

function videoStack() {
  return [
    { layer: 'assets', tool: 'pipeline/bin/unreal.cjs', role: 'Unreal scene control and frame capture', status: exists('pipeline/bin/unreal.cjs') ? (unrealLive() ? 'ready' : 'needs-setup') : 'missing', how: 'Follow pipeline/UNREAL-SETUP.md, then invoke node pipeline/bin/unreal.cjs <tool> <json-args> with your editor running' },
    { layer: 'assets', tool: 'Avatar footage', role: 'your recorded presenter or separately generated avatar clip', status: 'needs-input', how: 'Supply a licensed or authorized clip in longform/inbox/; no avatar provider is bundled' },
    { layer: 'assets', tool: 'pipeline/generators/generate-shot-pack.cjs', role: 'plan connected video shots using the included craft library', status: exists('pipeline/generators/generate-shot-pack.cjs') ? 'available' : 'missing', how: 'node pipeline/generators/generate-shot-pack.cjs --concept="<brief>"; uses your model configuration or exports a prompt' },
    { layer: 'assets', tool: 'motion/html3d-render.cjs', role: 'render local HTML and Three.js compositions', status: exists('motion/html3d-render.cjs') ? 'available' : 'missing', how: 'node motion/html3d-render.cjs --html motion/compositions/itm-3-ignite.html --out output/motion.mp4 --dur 5' },
    { layer: 'assets', tool: 'Supplied screen footage', role: 'your own recording or licensed b-roll', status: 'needs-input', how: 'Place your video in longform/inbox/ and follow longform/docs/README.md' },
    { layer: 'assembly', tool: 'pipeline/generators/remotion/', role: 'composite your assets, captions, CTA and visual identity', status: exists('pipeline/generators/remotion/package.json') ? 'available' : 'missing', how: 'Follow pipeline/generators/remotion/README.md; for a planned footage edit use node longform/bin/lf-assemble.cjs <slug> --check' },
    { layer: 'distribute', tool: 'output/', role: 'review and manually deliver the exported video', status: 'manual', how: 'Inspect the finished file and upload through your own chosen publishing account after approval' },
  ];
}

function classify(request) {
  const r = String(request || '').toLowerCase();
  if (/3d|cinematic|game|render|unreal|scene|fly.?through|product viz|logo animation|intro|vfx|particle|explos|environment/.test(r)) return '3d-cinematic';
  if (/talking.?head|avatar|presenter|face|spokes|heygen/.test(r)) return 'avatar';
  if (/screen|tutorial|demo|walkthrough|capture/.test(r)) return 'screen';
  return 'reel'; // default: tip/quote/hook social reel
}

function planVideo(request, opts = {}) {
  const type = opts.type || classify(request);
  const stack = videoStack();
  const pick = (names) => stack.filter(s => names.some(n => s.tool.includes(n)));
  // choose asset sources by type; ASSEMBLY is ALWAYS Remotion (the unifying layer).
  let assets;
  if (type === '3d-cinematic') assets = pick(['unreal.cjs', 'html3d-render.cjs']);
  else if (type === 'avatar') assets = pick(['Avatar footage']);
  else if (type === 'screen') assets = pick(['Supplied screen footage']);
  else assets = pick(['generate-shot-pack.cjs', 'html3d-render.cjs']);
  if (!assets.length) assets = pick(['generate-shot-pack.cjs']);
  const assembly = stack.find(s => s.layer === 'assembly');
  const distribute = stack.find(s => s.layer === 'distribute');
  const setup_needed = [...assets, assembly].filter(s => s && ['needs-setup', 'needs-key', 'needs-input', 'missing'].includes(s.status));

  const steps = [
    `1. GENERATE assets via ${assets.map(a => a.tool).join(' + ')} — ${assets.map(a => a.how).join(' ; ')}`,
    `2. ASSEMBLE via ${assembly ? assembly.tool : 'Remotion'} — composite the assets and add your captions, CTA, logo and hook`,
    `3. REVIEW the export in ${distribute ? distribute.tool : 'output/'} and publish manually through your own account`,
  ];
  return { type, request: String(request || '').slice(0, 160), asset_sources: assets, assembly, distribute, setup_needed, steps };
}

module.exports = { videoStack, planVideo, classify };

if (require.main === module) {
  const cmd = process.argv[2];
  if (cmd === 'stack') {
    console.log('UNIFIED VIDEO STACK (every video flows assets → Remotion assembly+brand → distribute):');
    for (const s of videoStack()) console.log(`  [${s.layer.padEnd(10)}] ${s.status.padEnd(11)} ${s.tool}\n               ${s.role}`);
  } else if (cmd === 'plan') {
    const req = process.argv.slice(3).join(' ');
    if (!req) { console.error('usage: node lib/video-pipeline.cjs plan "<video request>"'); process.exit(1); }
    const p = planVideo(req);
    console.log(`unified video plan — type=${p.type} · "${p.request}"`);
    p.steps.forEach(s => console.log('  ' + s));
    if (p.setup_needed.length) console.log(`  ⚙ SETUP NEEDED (don't bluff): ${p.setup_needed.map(s => s.tool + ' (' + s.status + ')').join(', ')}`);
    else console.log('  Included entrypoints found. Check dependencies, configuration and input assets before rendering.');
  } else {
    console.error('usage: node lib/video-pipeline.cjs plan "<request>" | stack'); process.exit(1);
  }
}
