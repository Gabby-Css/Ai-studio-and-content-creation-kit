#!/bin/bash
# CM5 = new music + the F knobs + more music carve (1.4) + voice 8 dB over music; NO onset lift (it hurt).
cd "$(dirname "$0")"; OUT=sx/cm3_check.txt; : > $OUT
env -u MIX_LEAD -u MIX_GANG -u MIX_RANGE MIX_MUSIC=music_stem_cm.wav MIX_OUTTAG=CM5 M3_LOOK=0.04 M3_HFCUT=4 M3_HFPRES=3.5 M3_CV=3 M3_DSTH=-31 M3_CARVE=1.4 python mix3.py 8 > sx/ab/var_CM5.log 2>&1 || { echo "mix failed" >> $OUT; exit 1; }
echo "MIX CM5 BUILT" >> $OUT
python sx_stoi.py premaster_v3_CM5.wav vocals_v3_dry_CM5.wav 0 CM5_estoi 2>&1 | grep -v -i warn | tail -1 >> $OUT
python sx_reel.py CM5=master_v3_CM5.wav 2>&1 | grep -v -i warn >> $OUT
QA_ROBUST=1 python qa_asr_mix.py master_v3_CM5.wav 2>&1 | grep -v -i warn > sx/asr_CM5_robust.txt; grep OVERALL sx/asr_CM5_robust.txt >> $OUT
echo "CM5 CHECK DONE" >> $OUT
