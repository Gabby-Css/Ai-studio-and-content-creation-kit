#!/bin/bash
cd "$(dirname "$0")"
export PATH="$PATH:/c/Users/softenic/AppData/Local/Microsoft/WinGet/Links"
set -e
echo "STEP sfx"; python -u sfx.py
echo "STEP sing"; python -u sing_song.py lead double harm kidsA kidsB kidsC > sing3.log 2>&1
echo "STEP music"; cat music2_head.py music5_tail.py > music2.py; python -u cm_render.py > cm_render2.log 2>&1; python music_cm_mix.py > cm_mix2.log 2>&1
echo "STEP mix"; python -u -c "import stages; print('mix', stages.stage_mix(force=True))" > mix3.log 2>&1
echo "CHAIN DONE"
