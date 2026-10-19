#!/bin/bash
# renders the three vertical shorts one after another (low-RAM machine: 1 worker)
cd "$(dirname "$0")"
for s in hook wiggle count; do
  echo "START $s $(date +%H:%M:%S)"
  node node_modules/hyperframes/bin/hyperframes.mjs render kv_short_$s --workers 1 --fps 30 --quality looks --output kiddoverse/output/KiddoVerse_Short_$s.mp4 > kiddoverse/output/render_$s.log 2>&1
  echo "DONE $s exit=$? $(date +%H:%M:%S)"
done
echo "ALL SHORTS DONE"
