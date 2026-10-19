'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
function buildInvocation(argv, root = __dirname) {
  const [command = 'help', output, ...extra] = argv;
  if (!['help', 'doctor', 'lint', 'preview', 'render'].includes(command) || extra.length || (output !== undefined && command !== 'render')) {
    throw new Error('Usage: node run.cjs help|doctor|lint|preview|render [output.mp4]');
  }
  const cli = path.join(root, 'node_modules/hyperframes/bin/hyperframes.mjs');
  const args = [cli, command === 'help' ? '--help' : command];
  if (['lint', 'preview', 'render'].includes(command)) args.push(path.join(root, 'starter'));
  let destination;
  if (command === 'render') {
    destination = path.resolve(root, output || 'output/starter.mp4');
    if (path.extname(destination).toLowerCase() !== '.mp4') throw new Error('Choose an .mp4 output path.');
    if (fs.existsSync(destination)) throw new Error('Output already exists. Choose a new filename; no overwrite.');
    args.push('--output', destination, '--workers', '1', '--fps', '30');
  }
  return { executable: process.execPath, cli, args, destination, options: { cwd: root, shell: false, windowsHide: true, stdio: 'inherit' } };
}
function main(argv = process.argv.slice(2), root = __dirname) {
  try {
    const invocation = buildInvocation(argv, root);
    if (!fs.existsSync(invocation.cli)) throw new Error('Runtime missing. In the hyperframes folder, run npm ci, then npm run doctor.');
    // Keep the composition independent of a CDN and of parent-directory HTTP serving.
    const gsap = path.join(root, 'node_modules/gsap/dist/gsap.min.js');
    if (!fs.existsSync(gsap)) throw new Error('GSAP missing. Run npm ci in the hyperframes folder.');
    const vendor = path.join(root, 'starter/vendor');
    fs.mkdirSync(vendor, { recursive: true });
    fs.copyFileSync(gsap, path.join(vendor, 'gsap.min.js'));
    if (invocation.destination) fs.mkdirSync(path.dirname(invocation.destination), { recursive: true });
    const result = spawnSync(invocation.executable, invocation.args, invocation.options);
    if (result.error) throw result.error;
    return result.status ?? 1;
  } catch (error) { console.error(error.message); return 1; }
}
module.exports = { buildInvocation, main };
if (require.main === module) process.exitCode = main();
