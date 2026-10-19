#!/bin/bash
cd "$(dirname "$0")"
export PYTHONUTF8=1
echo "STEP sing"; python -u sing_song.py lead double harm kidsA kidsB kidsC > sing_full.log 2>&1
echo "SING DONE"
