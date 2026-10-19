#!/bin/bash
# LEARN video vocals: first pass = one example of every kind of line (for a quality check), then everything else. Resumable.
cd "$(dirname "$0")"
PY=../../../tools/sxenv/Scripts/python.exe
export SX_Q8=1
log() { echo "== $(date +%H:%M:%S) $*"; }
log "first pass (diverse lines)"; SX_ONLY=$(cat sx/first_pass_keys.txt) $PY -u sx_local.py mel lead sx/prompt_lead2 12306 32 4 || exit 1
log "FIRST PASS DONE"
log "all remaining lines";       $PY -u sx_local.py mel lead sx/prompt_lead2 12306 32 4 || exit 1
log "vocoder";                    $PY -u sx_local.py voc lead || exit 1
$PY sx_local.py place lead sx/lead_sx.wav || exit 1
log "ALL DONE"
