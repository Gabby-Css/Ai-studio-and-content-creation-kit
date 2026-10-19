#!/bin/bash
# Resume of run_vocals_v3.sh after an interruption: lead mels + gang prompt are done, so only the unfinished gang
# lines, the vocoder pass and the aligned tracks are left.  Safe to re-run (every step skips finished work).
cd "$(dirname "$0")"
PY=../../../tools/sxenv/Scripts/python.exe
export SX_Q8=1
log() { echo "== $(date +%H:%M:%S) $*"; }

log "gang mel (resume)"; $PY -u sx_local.py mel gang sx/prompt_gang2 777 32 4 || exit 1
log "vocoder";           $PY -u sx_local.py voc lead || exit 1
                         $PY -u sx_local.py voc gang || exit 1
$PY sx_local.py place lead sx/lead_sx.wav && $PY sx_local.py place gang sx/gang_sx.wav || exit 1
log "ALL DONE"
