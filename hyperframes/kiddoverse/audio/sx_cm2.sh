#!/bin/bash
# New music + word-onset consonant lift. CM3 = lift 6 dB; CM4 = lift 6 dB + more music carve + voice 8 dB over music.
cd "$(dirname "$0")"; OUT=sx/cm2_check.txt; : > $OUT
F="M3_LOOK=0.04 M3_HFCUT=4 M3_HFPRES=3.5 M3_CV=3 M3_DSTH=-31 M3_ONSET=6"
run() {  # name vmr extra-env...
  local name=$1 vmr=$2; shift 2
  env -u MIX_LEAD -u MIX_GANG -u MIX_RANGE MIX_MUSIC=music_stem_cm.wav MIX_OUTTAG=$name $F "$@" python mix3.py $vmr > sx/ab/var_$name.log 2>&1 || { echo "mix failed $name" >> $OUT; return 1; }
  echo "MIX $name BUILT" >> $OUT
  python sx_stoi.py premaster_v3_$name.wav vocals_v3_dry_$name.wav 0 ${name}_estoi 2>&1 | grep -v -i warn | tail -1 >> $OUT
}
run CM3 7 && run CM4 8 M3_CARVE=1.4
python sx_reel.py CM3=master_v3_CM3.wav CM4=master_v3_CM4.wav 2>&1 | grep -v -i warn >> $OUT
for n in CM3 CM4; do QA_ROBUST=1 python qa_asr_mix.py master_v3_$n.wav 2>&1 | grep OVERALL >> $OUT; done
echo "CM2 CHECK DONE" >> $OUT
