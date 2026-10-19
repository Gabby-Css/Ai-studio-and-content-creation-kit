#!/bin/bash
# Re-score old robotic mix + current/new variants on the reel with the deterministic ASR settings.
cd "$(dirname "$0")"; OUT=sx/reel_robust.txt; : > $OUT
python sx_reel.py old_v2=master_v2.wav base=master_v3.wav V1=sx/ab/master_v3_V1.wav V2=sx/ab/master_v3_V2.wav V3=sx/ab/master_v3_V3.wav 2>&1 | grep -v -i warn >> $OUT
echo "RESCORE DONE" >> $OUT
