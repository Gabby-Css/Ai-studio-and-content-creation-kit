/**
 * unreal.cjs — thin HTTP driver for the live UnrealClaude bridge (localhost:3000).
 * Studio arsenal. Drives UE5.8 over HTTP (works without a Claude restart, unlike the native MCP tools).
 *
 *   node pipeline/bin/unreal.cjs <tool> '<json-args>' [out.jpg]
 *   node pipeline/bin/unreal.cjs capture_viewport '{}' shot.jpg     # saves the frame, decoded
 *   node pipeline/bin/unreal.cjs get_level_actors '{}'
 *   node pipeline/bin/unreal.cjs spawn_actor '{"class_path":"PointLight","location":{"x":0,"y":0,"z":300}}'
 *
 * If the response carries a base64 image, it's decoded to a file so you can Read/LOOK at it.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const A = process.argv.slice(2);
const tool = A[0];
if (!tool) { console.error('usage: node unreal.cjs <tool> [jsonArgs] [out.jpg]'); process.exit(1); }
let args = {};
if (A[1]) { try { args = JSON.parse(A[1]); } catch { console.error('bad JSON args:', A[1]); process.exit(1); } }
const base = process.env.UNREAL_URL || (process.env.UNREAL_URL || 'http://localhost:3000');

function findB64(o, depth = 0) {
  if (!o || depth > 4) return null;
  if (typeof o === 'string') return o.length > 2000 && /^[A-Za-z0-9+/=\r\n]+$|^data:image/.test(o.slice(0, 80)) ? o : null;
  if (typeof o !== 'object') return null;
  for (const k of ['image', 'image_base64', 'imageBase64', 'base64', 'jpeg', 'png', 'data', 'frame']) {
    if (typeof o[k] === 'string' && o[k].length > 2000) return o[k];
  }
  for (const v of Object.values(o)) { const r = findB64(v, depth + 1); if (r) return r; }
  return null;
}

(async () => {
  const res = await fetch(`${base}/mcp/tool/${tool}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(args), signal: AbortSignal.timeout(120000),
  });
  const txt = await res.text();
  let j; try { j = JSON.parse(txt); } catch { console.log('HTTP', res.status, txt.slice(0, 600)); return; }
  const b64 = findB64(j);
  if (b64) {
    const outp = A[2] || path.join(process.env.TEMP || '.', `unreal_${tool}.jpg`);
    fs.writeFileSync(outp, Buffer.from(b64.replace(/^data:image\/\w+;base64,/, ''), 'base64'));
    console.log('IMAGE →', outp, '(' + (fs.statSync(outp).size / 1024).toFixed(0) + 'KB)');
  } else {
    console.log('HTTP', res.status);
    console.log(JSON.stringify(j, null, 2).slice(0, 1500));
  }
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
