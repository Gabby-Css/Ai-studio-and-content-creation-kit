#!/usr/bin/env node
'use strict';
// Compatibility entry point for the portable generator included in this kit.
// Run from the extracted kit root. All arguments pass through unchanged.
if (require.main === module) {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log('This command forwards to pipeline/generators/build-video-skills.cjs.');
    console.log('Run node pipeline/generators/build-video-skills.cjs with the arguments documented in pipeline/00-START-HERE.md.');
    console.log('Generation uses your configured provider, or exports a prompt when no model is configured.');
  } else require('../generators/build-video-skills.cjs');
}
