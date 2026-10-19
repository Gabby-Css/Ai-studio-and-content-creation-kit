'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const { buildInvocation, main } = require('./run.cjs');
test('pinned local CLI, explicit argv, no shell', () => {
  const root = path.resolve('test folder');
  const command = buildInvocation(['render'], root);
  assert.equal(command.executable, process.execPath);
  assert.equal(command.options.shell, false);
  assert.deepEqual(command.args, [path.join(root, 'node_modules/hyperframes/bin/hyperframes.mjs'), 'render', path.join(root, 'starter'), '--output', path.join(root, 'output/starter.mp4'), '--workers', '1', '--fps', '30']);
});
test('commands reject unsupported arguments and formats', () => {
  for (const args of [['publish'], ['doctor', 'extra'], ['render', 'a.mp4', 'extra'], ['render', 'a.txt']]) assert.throws(() => buildInvocation(args));
  assert.equal(buildInvocation([]).args[1], '--help');
  assert.equal(buildInvocation(['lint']).args[1], 'lint');
});
test('existing output remains untouched; missing runtime returns failure', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-hf-test-'));
  try {
    const output = path.join(root, 'existing.mp4'); fs.writeFileSync(output, 'keep');
    assert.throws(() => buildInvocation(['render', output], root), /already exists/);
    assert.equal(fs.readFileSync(output, 'utf8'), 'keep');
    assert.equal(main(['doctor'], root), 1);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
