#!/usr/bin/env node
'use strict';
// Compatibility entry point. Run from the extracted kit root:
// node pipeline/bin/learn-from-transcript.cjs <transcript.txt> [--prompt-only] [--no-apply]
// The shared implementation stores playbooks and learned craft under pipeline/.
const learner = require('../../transcribe/learn-from-transcript.cjs');
if (require.main === module) learner.main().catch(error => {
  console.error('ERR:', error && error.message ? error.message : error);
  process.exitCode = 1;
});
module.exports = learner;
