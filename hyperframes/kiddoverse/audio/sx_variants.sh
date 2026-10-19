#!/bin/bash
# Full-song mixes with different consonant-clarity settings -> reel score for each (+ the current master as baseline).
cd "$(dirname "$0")"; mkdir -p sx/ab; OUT=sx/reel.txt; : > $OUT
run() {   # <name> <env...>
  local name=$1; shift
  env -u MIX_LEAD -u MIX_GANG -u MIX_RANGE MIX_OUTTAG=$name "$@" python mix3.py 6 > sx/ab/var_$name.log 2>&1 || { echo "mix failed $name" >> $OUT; return; }
  mv -f master_v3_$name.wav sx/ab/; mv -f premaster_v3_$name.wav sx/ab/; rm -f vocals_v3_dry_$name.wav
}
run V1 M3_LOOK=0.04 M3_HFCUT=3.5 M3_HFPRES=3
run V2 M3_LOOK=0.04 M3_HFCUT=3.5 M3_HFPRES=3 M3_CV=4
run V3 M3_LOOK=0.04 M3_HFCUT=6 M3_HFPRES=5 M3_DSTH=-28
python sx_reel.py base=master_v3.wav V1=sx/ab/master_v3_V1.wav V2=sx/ab/master_v3_V2.wav V3=sx/ab/master_v3_V3.wav 2>&1 | grep -v -i warn >> $OUT
echo "VARIANTS DONE" >> $OUT
