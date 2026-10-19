#!/usr/bin/env bash
# Cut dead-air from the open Resolve timeline — reliable 3-stage pipeline.
# Long-lived scripts that iterate GetMediaPoolItem() over every clip segfault the
# fusionscript bridge, so each Resolve touch is a short-lived resolve_ctl dispatch call.
#   Stage 1: pull [leftOffset,duration,path] for all Video-1 clips via `ctl raw` (one call)
#   Stage 2: sc_classify.py — pure ffmpeg silencedetect, NO Resolve (can't crash bridge)
#   Stage 3: sc_apply.sh — ripple-delete dead clips via ctl delete_item, high->low
# Usage: bash sc_cut.sh [--noise=-30dB] [--dur=0.6] [--frac=0.9] [--apply]
set -u
cd "$(dirname "$0")"
APPLY=0; PASS=()
for a in "$@"; do [ "$a" = "--apply" ] && APPLY=1 || PASS+=("$a"); done

if [ -n "${PYTHON_BIN:-}" ]; then
  PYTHON_CMD="$PYTHON_BIN"
elif command -v python3 >/dev/null 2>&1; then
  PYTHON_CMD="python3"
elif command -v python >/dev/null 2>&1; then
  PYTHON_CMD="python"
elif command -v py >/dev/null 2>&1; then
  PYTHON_CMD="py"
else
  echo "Python was not found. Install Python 3 or set PYTHON_BIN to its executable."
  exit 1
fi

echo "[1/3] extracting clip source ranges from Resolve..."
"$PYTHON_CMD" resolve_ctl.py raw --arg "expr=[[it.GetLeftOffset(),it.GetDuration(),it.GetMediaPoolItem().GetClipProperty('File Path')] for it in timeline.GetItemListInTrack('video',1)]" > sc_raw.json 2>/dev/null
"$PYTHON_CMD" -c "import json;d=json.load(open('sc_raw.json'));assert d['success'];print('  ',len(d['data']['value']),'clips')" || { echo "extract failed"; exit 1; }

echo "[2/3] classifying silence (ffmpeg)..."
"$PYTHON_CMD" sc_classify.py "${PASS[@]}" || exit 1

if [ "$APPLY" = "1" ]; then
  "$PYTHON_CMD" -c "import json;d=json.load(open('sc_dead_indices.json'));assert d.get('skipped',0)==0" || { echo "Refusing --apply because one or more source clips were skipped."; exit 1; }
  echo "[3/3] applying ripple-delete..."
  PYTHON_BIN="$PYTHON_CMD" bash sc_apply.sh --apply
else
  echo "[3/3] DRY RUN — re-run with --apply to cut. dead indices in sc_dead_indices.json"
fi
