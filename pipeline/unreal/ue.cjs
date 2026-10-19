// Reusable Unreal MCP HTTP helper. Usage:
//   node ue.cjs <tool> '<jsonArgs>'            → calls /mcp/tool/<tool>, prints result (base64 saved to --png if image)
//   node ue.cjs script <pyFile> [desc]         → execute_script python from a file
//   node ue.cjs capture <out.png>              → capture_viewport → png
const http = require('http'); const fs = require('fs');
function once(toolPath, method, body) {
  return new Promise((res, rej) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request({ host: 'localhost', port: 3000, path: toolPath, method, timeout: 30000,
      headers: { 'Content-Type': 'application/json', ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}) } },
      r => { let b = ''; r.on('data', c => b += c); r.on('end', () => res(b)); });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', rej); if (data) req.write(data); req.end();
  });
}
async function call(toolPath, method, body) {
  for (let i = 0; i < 6; i++) {
    try { return await once(toolPath, method, body); }
    catch (e) { if (i === 5) throw e; await new Promise(r => setTimeout(r, 1500)); }
  }
}
(async () => {
  const [, , cmd, a1, a2] = process.argv;
  if (cmd === 'capture') {
    const r = JSON.parse(await call('/mcp/tool/capture_viewport', 'POST', {}));
    if (r.base64) { fs.writeFileSync(a1, Buffer.from(r.base64, 'base64')); console.log('saved', a1, '|', r.message); }
    else console.log(JSON.stringify(r).slice(0, 400));
  } else if (cmd === 'script') {
    const py = fs.readFileSync(a1, 'utf8');
    const r = JSON.parse(await call('/mcp/tool/execute_script', 'POST', { script_type: 'python', script_content: py, description: a2 || 'scene build' }));
    console.log(JSON.stringify(r).slice(0, 2000));
  } else if (cmd === 'build') {
    // submit python file, poll to completion, then capture a2 (optional png)
    const py = fs.readFileSync(a1, 'utf8');
    const sub = JSON.parse(await call('/mcp/tool/execute_script', 'POST', { script_type: 'python', script_content: py, description: 'build' }));
    const tid = sub.data && sub.data.task_id;
    if (!tid) { console.log('no task id:', JSON.stringify(sub).slice(0, 400)); return; }
    let st = 'pending';
    for (let i = 0; i < 40; i++) {
      await new Promise(r => setTimeout(r, 1500));
      const s = JSON.parse(await call('/mcp/tool/task_status', 'POST', { task_id: tid }));
      st = (s.data && s.data.status) || s.status || JSON.stringify(s).match(/"status":"(\w+)"/)?.[1] || 'unknown';
      if (/complete|fail|error|done|success/i.test(st)) break;
    }
    const rr = await call('/mcp/tool/task_result', 'POST', { task_id: tid });
    console.log('status:', st, '| result:', rr.slice(0, 700));
    if (a2) { const cap = JSON.parse(await call('/mcp/tool/capture_viewport', 'POST', {})); if (cap.base64) { fs.writeFileSync(a2, Buffer.from(cap.base64, 'base64')); console.log('captured', a2, '|', cap.message); } }
  } else {
    const r = await call('/mcp/tool/' + cmd, 'POST', a1 ? JSON.parse(a1) : {});
    console.log(r.slice(0, 1500));
  }
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
