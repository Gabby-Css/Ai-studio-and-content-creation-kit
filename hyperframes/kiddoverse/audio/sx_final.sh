#!/bin/bash
# Final candidate F: look-ahead duck, moderate high-band carve/presence, light consonant lift, voice 7 dB over music.
# Then: objective ESTOI, reel score, and deterministic whole-song word score for old v2 and F (same protocol).
cd "$(dirname "$0")"; OUT=sx/final_check.txt; : > $OUT
env -u MIX_LEAD -u MIX_GANG -u MIX_RANGE MIX_OUTTAG=F M3_LOOK=0.04 M3_HFCUT=4 M3_HFPRES=3.5 M3_CV=3 M3_DSTH=-31 python mix3.py 7 > sx/ab/var_F.log 2>&1 || { echo "mix failed" >> $OUT; exit 1; }
echo "MIX F BUILT" >> $OUT
python sx_stoi.py premaster_v3_F.wav vocals_v3_dry_F.wav 0 F_estoi 2>&1 | grep -v -i warn | tail -1 >> $OUT
python sx_reel.py F=master_v3_F.wav 2>&1 | grep -v -i warn >> $OUT
QA_ROBUST=1 python qa_asr_mix.py master_v2.wav 2>&1 | grep OVERALL >> $OUT
QA_ROBUST=1 python qa_asr_mix.py master_v3_F.wav 2>&1 | grep -v -i warn > sx/asr_F_robust.txt; grep OVERALL sx/asr_F_robust.txt >> $OUT
echo "FINAL CHECK DONE" >> $OUT
