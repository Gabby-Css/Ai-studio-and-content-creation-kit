#!/bin/bash
# Put master_v3.wav (human-singer mix) into every delivered video without re-encoding the picture.
# The current Desktop files are MOVED to _previous_versions/v2_clear_mix first (nothing is deleted).
set -e
cd "$(dirname "$0")"
M=master_v3.wav
DK=/c/Users/softenic/Desktop/KiddoVerse
OLD=$DK/_previous_versions/v2_clear_mix
TMP=../output/v3tmp; mkdir -p "$TMP" "$OLD"

mux() {  # <video in> <audio in> <out>
  ffmpeg -y -v error -i "$1" -i "$2" -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart "$3"
}
# 1) build everything in a temp folder first
mux "$DK/1_Main_Video/KIDDOVERSE_01.mp4"       $M "$TMP/KIDDOVERSE_01.mp4"
mux "$DK/1_Main_Video/KIDDOVERSE_01_1080p.mp4" $M "$TMP/KIDDOVERSE_01_1080p.mp4"
for s in "Short1_Zoom-Zoom-Kiddoverse 6 24" "Short2_Count-with-Rumble 56 72" "Short3_Kiddo-Wiggle 104 120"; do
  set -- $s
  ffmpeg -y -v error -ss "$2" -t $(( $3 - $2 )) -i $M -af "afade=t=in:d=0.04,afade=t=out:st=$(( $3 - $2 - 1 )).5:d=0.5" -ar 48000 "$TMP/$1.wav"
  mux "$DK/2_Shorts_Vertical/KIDDOVERSE_01_$1.mp4" "$TMP/$1.wav" "$TMP/KIDDOVERSE_01_$1.mp4"
done
cp $M "$TMP/KIDDOVERSE_01_master_48k.wav"
ffmpeg -y -v error -i $M -c:a libmp3lame -b:a 320k "$TMP/KIDDOVERSE_01_song.mp3"

# 2) move the old versions aside, then put the new ones in place
for f in 1_Main_Video/KIDDOVERSE_01.mp4 1_Main_Video/KIDDOVERSE_01_1080p.mp4 \
         2_Shorts_Vertical/KIDDOVERSE_01_Short1_Zoom-Zoom-Kiddoverse.mp4 2_Shorts_Vertical/KIDDOVERSE_01_Short2_Count-with-Rumble.mp4 \
         2_Shorts_Vertical/KIDDOVERSE_01_Short3_Kiddo-Wiggle.mp4 3_Audio/KIDDOVERSE_01_master_48k.wav 3_Audio/KIDDOVERSE_01_song.mp3; do
  [ -f "$OLD/$(basename "$f")" ] || mv "$DK/$f" "$OLD/"
  cp "$TMP/$(basename "$f")" "$DK/$f"
done
echo "delivered v3 to $DK (old files in $OLD)"
