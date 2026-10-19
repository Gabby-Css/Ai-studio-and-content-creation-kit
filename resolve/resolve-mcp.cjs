#!/usr/bin/env node
/**
 * resolve-mcp.cjs — zero-dependency MCP stdio server exposing FULL-AUTHORITY DaVinci
 * Resolve control as native mcp__resolve__* tools. Each tool call shells one short-lived
 * `resolve_ctl.py` dispatch (the segfault-safe path — never a long-lived Resolve process).
 *
 * Register resolve/resolve-mcp.cjs in your editor's MCP configuration. No SDK dep —
 * speaks newline-delimited JSON-RPC 2.0 over stdio directly, so it can't break on a partial
 * @modelcontextprotocol install.
 */
const { execFile } = require('child_process');
const path = require('path');
const readline = require('readline');

const HERE = __dirname;
const PROTOCOL_VERSION = '2024-11-05';

// --- tool catalog: name -> {desc, schema, ctlCommand} -----------------------
const TOOLS = [
  { name: 'status', ctl: 'status', description: 'Is Resolve reachable? Current project/timeline, fps, resolution.', schema: {} },
  { name: 'timeline_state', ctl: 'timeline_state', description: 'Full timeline: every video/audio clip (name,start,end,duration) + playhead. Read this BEFORE any edit.', schema: {} },
  { name: 'list_media', ctl: 'list_media', description: 'Media-pool items available to place (index, name, duration, fps).', schema: {} },
  { name: 'append_clip', ctl: 'append_clip', description: 'Place a media item on the timeline. record_frame/record_seconds/record_timecode leaves a gap before it.', schema: {
      media_index: { type: 'number' }, media_name: { type: 'string' }, record_seconds: { type: 'number' },
      record_timecode: { type: 'string' }, record_frame: { type: 'number' }, start_frame: { type: 'number' },
      end_frame: { type: 'number' }, track_index: { type: 'number' } } },
  { name: 'delete_item', ctl: 'delete_item', description: 'Delete a clip by track/index. ripple=true closes the gap.', schema: {
      track_index: { type: 'number' }, item_index: { type: 'number' }, ripple: { type: 'boolean' }, track_type: { type: 'string' } } },
  { name: 'add_track', ctl: 'add_track', description: 'Add a video or audio track.', schema: { track_type: { type: 'string' } } },
  { name: 'add_marker', ctl: 'add_marker', description: 'Add a marker at a frame/timecode.', schema: {
      timecode: { type: 'string' }, frame: { type: 'number' }, color: { type: 'string' }, name: { type: 'string' }, note: { type: 'string' } } },
  { name: 'set_playhead', ctl: 'set_playhead', description: 'Move the playhead to HH:MM:SS:FF.', schema: { timecode: { type: 'string' } } },
  { name: 'rebuild_tight', ctl: 'rebuild_tight', description: 'Rebuild a silence-free timeline from sc_segments.json (goes around the missing blade API). Creates a new timeline; original untouched.', schema: {
      segments_file: { type: 'string' }, timeline_name: { type: 'string' } } },
  { name: 'raw', ctl: 'raw', description: 'Evaluate a read/traverse Resolve expression. Vars: resolve, pm, project, timeline, media_pool. No builtins.', schema: { expr: { type: 'string' } } },
  { name: 'exec', ctl: 'exec', description: 'FULL AUTHORITY: run an arbitrary Python body against the live Resolve (full builtins, no denylist). Set result=... . Vars: resolve, pm, project, timeline, media_pool, json, os, subprocess.', schema: {
      code: { type: 'string' }, expr: { type: 'string' } }, required: [] },
];

function runCtl(command, args) {
  return new Promise((resolve) => {
    const argv = [path.join(HERE, 'resolve_ctl.py'), command];
    if (args && Object.keys(args).length) argv.push('--json', JSON.stringify(args));
    execFile('py', argv, { cwd: HERE, timeout: 900000, maxBuffer: 32 * 1024 * 1024 }, (err, stdout, stderr) => {
      let text = (stdout || '').trim();
      if (!text && err) text = JSON.stringify({ success: false, message: (stderr || err.message || 'ctl failed').split('\n')[0] });
      resolve(text || '{"success":false,"message":"no output"}');
    });
  });
}

// --- JSON-RPC over stdio -----------------------------------------------------
function send(msg) { process.stdout.write(JSON.stringify(msg) + '\n'); }

function reply(id, result) { send({ jsonrpc: '2.0', id, result }); }
function replyError(id, code, message) { send({ jsonrpc: '2.0', id, error: { code, message } }); }

async function handle(msg) {
  const { id, method, params } = msg;
  if (method === 'initialize') {
    return reply(id, { protocolVersion: PROTOCOL_VERSION, capabilities: { tools: {} },
      serverInfo: { name: 'resolve', version: '1.0.0' } });
  }
  if (method === 'notifications/initialized' || method === 'notifications/cancelled') return;
  if (method === 'ping') return reply(id, {});
  if (method === 'tools/list') {
    return reply(id, { tools: TOOLS.map(t => ({
      name: t.name, description: t.description,
      inputSchema: { type: 'object', properties: t.schema || {}, required: t.required || [] } })) });
  }
  if (method === 'tools/call') {
    const t = TOOLS.find(x => x.name === (params && params.name));
    if (!t) return replyError(id, -32602, `unknown tool '${params && params.name}'`);
    const out = await runCtl(t.ctl, (params && params.arguments) || {});
    let isError = false;
    try { isError = JSON.parse(out).success === false; } catch (_) {}
    return reply(id, { content: [{ type: 'text', text: out }], isError });
  }
  if (id !== undefined) return replyError(id, -32601, `method not found: ${method}`);
}

const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
  line = line.trim();
  if (!line) return;
  let msg;
  try { msg = JSON.parse(line); } catch (_) { return; }
  Promise.resolve(handle(msg)).catch((e) => { if (msg && msg.id !== undefined) replyError(msg.id, -32603, (e.message || e).toString()); });
});
process.stdin.on('close', () => process.exit(0));
