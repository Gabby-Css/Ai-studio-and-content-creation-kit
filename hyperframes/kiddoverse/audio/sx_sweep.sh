#!/bin/bash
# Clarity sweep: mix excerpts with different clarity settings, score ASR word recognition for each.
# usage: bash sx_sweep.sh   (writes sx/ab/*.wav and sx/sweep.txt)
cd "$(dirname "$0")"; mkdir -p sx/ab; : > sx/sweep.txt
# name | VMR | env overrides
VARIANTS=(
  "A 6 "
  "B 8 "
  "C 6 M3_REV=0.15"
  "D 6 M3_PRES=6 M3_CARVE=1.4"
)
for ex in "72 104" "152 184"; do
  set -- $ex; T0=$1; T1=$2; ARGS=()
  for v in "${VARIANTS[@]}"; do
    set -- $v; name=$1; vmr=$2; shift 2
    tag="sw_${name}_${T0}"
    env -u MIX_LEAD -u MIX_GANG MIX_RANGE=$T0,$T1 MIX_TAG=$tag "$@" python mix3.py $vmr > sx/ab/$tag.log 2>&1 || { echo "mix failed $tag" >> sx/sweep.txt; continue; }
    mv -f master_v3_$tag.wav sx/ab/; rm -f premaster_v3_$tag.wav vocals_v3_dry_$tag.wav
    ARGS+=("${name}=sx/ab/master_v3_$tag.wav")
  done
  echo "### excerpt $T0-$T1 s" >> sx/sweep.txt
  python sx_ab.py $T0 $T1 "${ARGS[@]}" 2>&1 | grep -v -i warn | cut -c1-200 >> sx/sweep.txt
done
echo "SWEEP DONE" >> sx/sweep.txt
