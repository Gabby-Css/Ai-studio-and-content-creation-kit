#!/bin/bash
# Lead-only song (no backing voices except the dance-break echo) on the new music.  NG1 = voice 8 dB over music, NG2 = 9.5 dB.
cd "$(dirname "$0")"; OUT=sx/ng_check.txt; : > $OUT
K="M3_LOOK=0.04 M3_HFCUT=4 M3_HFPRES=3.5 M3_CV=3 M3_DSTH=-31 M3_CARVE=1.4 M3_GANGZONE=104,120"
for v in "NG1 8" "NG2 9.5"; do set -- $v
  env -u MIX_LEAD -u MIX_GANG -u MIX_RANGE MIX_MUSIC=music_stem_cm.wav MIX_OUTTAG=$1 $K python mix3.py $2 > sx/ab/var_$1.log 2>&1 || { echo "mix failed $1" >> $OUT; continue; }
  echo "MIX $1 BUILT" >> $OUT
  python sx_stoi.py premaster_v3_$1.wav vocals_v3_dry_$1.wav 0 $1_estoi 2>&1 | grep -v -i warn | tail -1 >> $OUT
done
python sx_reel.py NG1=master_v3_NG1.wav NG2=master_v3_NG2.wav 2>&1 | grep -v -i warn >> $OUT
for n in NG1 NG2; do QA_ROBUST=1 python qa_asr_mix.py master_v3_$n.wav 2>&1 | grep OVERALL >> $OUT; done
echo "NG CHECK DONE" >> $OUT
