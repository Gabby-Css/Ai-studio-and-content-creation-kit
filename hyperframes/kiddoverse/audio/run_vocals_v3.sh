#!/bin/bash
# Human-sounding vocals (v3), unattended + resumable: lead -> natural gang prompt -> gang -> vocoder -> aligned tracks.
# Each step skips lines that are already rendered, so this can simply be re-run after an interruption.
cd "$(dirname "$0")"
PY=../../../tools/sxenv/Scripts/python.exe
export SX_Q8=1
log() { echo "== $(date +%H:%M:%S) $*"; }

log "lead mel";        $PY -u sx_local.py mel lead sx/prompt_lead2 12306 32 4 || exit 1
log "gang prompt mel"; SX_OUT=mel_gangboot SX_ONLY=8f091929c6,1ef013a454 $PY -u sx_local.py mel gang sx/prompt_sky 4242 32 4 || exit 1
log "gang prompt voc"; SX_OUT=mel_gangboot $PY -u sx_local.py voc gang || exit 1
$PY sx_boot.py gang wav_gangboot 8000,12000 sx/prompt_gang2 || exit 1
log "gang mel";        $PY -u sx_local.py mel gang sx/prompt_gang2 777 32 4 || exit 1
log "vocoder";         $PY -u sx_local.py voc lead || exit 1
                       $PY -u sx_local.py voc gang || exit 1
$PY sx_local.py place lead sx/lead_sx.wav && $PY sx_local.py place gang sx/gang_sx.wav || exit 1
log "ALL DONE"
