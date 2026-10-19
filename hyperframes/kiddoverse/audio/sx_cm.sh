#!/bin/bash
# New sampled-instrument music + human vocals -> full mix CM, then the same three clarity checks used for F.
cd "$(dirname "$0")"; OUT=sx/cm_check.txt; : > $OUT
env -u MIX_LEAD -u MIX_GANG -u MIX_RANGE MIX_MUSIC=music_stem_cm.wav MIX_OUTTAG=CM M3_LOOK=0.04 M3_HFCUT=4 M3_HFPRES=3.5 M3_CV=3 M3_DSTH=-31 python mix3.py 7 > sx/ab/var_CM.log 2>&1 || { echo "mix failed" >> $OUT; exit 1; }
echo "MIX CM BUILT" >> $OUT
python sx_stoi.py premaster_v3_CM.wav vocals_v3_dry_CM.wav 0 CM_estoi 2>&1 | grep -v -i warn | tail -1 >> $OUT
python sx_reel.py CM=master_v3_CM.wav 2>&1 | grep -v -i warn >> $OUT
QA_ROBUST=1 python qa_asr_mix.py master_v3_CM.wav 2>&1 | grep -v -i warn > sx/asr_CM_robust.txt; grep OVERALL sx/asr_CM_robust.txt >> $OUT
echo "CM CHECK DONE" >> $OUT
