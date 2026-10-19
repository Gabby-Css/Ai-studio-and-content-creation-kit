#!/bin/bash
# Put a finished master into every delivered video WITHOUT touching the picture (stream copy).
# usage: bash deliver_cm.sh <master.wav> <archive-folder-name>
# The files currently on the Desktop are MOVED (never deleted) into Desktop\KiddoVerse\_previous_versions\<archive-folder-name>.
# Each Short is cut from the master and levelled to the same loudness (TARGET LUFS) with a peak limiter.
set -e
cd "$(dirname "$0")"
M=${1:?master wav}; ARCH=${2:?archive folder name}; TARGET=${TARGET:--14.0}
DK=/c/Users/softenic/Desktop/KiddoVerse
OLD=$DK/_previous_versions/$ARCH
TMP=../output/cmtmp; rm -rf "$TMP"; mkdir -p "$TMP" "$OLD"

mux() {  # <video in> <audio in> <out>
  ffmpeg -y -v error -i "$1" -i "$2" -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart "$3"
}
lufs() { ffmpeg -v info -i "$1" -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1 | awk '{print $2}'; }

# 1) build everything in a temp folder first (picture streams come from the files now on the Desktop)
mux "$DK/1_Main_Video/KIDDOVERSE_01.mp4"       $M "$TMP/KIDDOVERSE_01.mp4"
mux "$DK/1_Main_Video/KIDDOVERSE_01_1080p.mp4" $M "$TMP/KIDDOVERSE_01_1080p.mp4"
for s in "Short1_Zoom-Zoom-Kiddoverse 6 24" "Short2_Count-with-Rumble 56 72" "Short3_Kiddo-Wiggle 104 120"; do
  set -- $s; name=$1; a=$2; b=$3; len=$(( b - a ))
  ffmpeg -y -v error -ss "$a" -t "$len" -i $M -af "afade=t=in:d=0.04,afade=t=out:st=$(( len - 1 )).5:d=0.5" -ar 48000 "$TMP/$name.raw.wav"
  g=$(python -c "print(round($TARGET - $(lufs "$TMP/$name.raw.wav"), 2))")
  ffmpeg -y -v error -i "$TMP/$name.raw.wav" -af "volume=${g}dB,alimiter=limit=0.89:attack=3:release=60" -ar 48000 "$TMP/$name.wav"
  echo "  $name: level change ${g} dB"
  mux "$DK/2_Shorts_Vertical/KIDDOVERSE_01_$name.mp4" "$TMP/$name.wav" "$TMP/KIDDOVERSE_01_$name.mp4"
done
cp $M "$TMP/KIDDOVERSE_01_master_48k.wav"
ffmpeg -y -v error -i $M -c:a libmp3lame -b:a 320k "$TMP/KIDDOVERSE_01_song.mp3"

# 2) archive what is on the Desktop now, then put the new files in place
for f in 1_Main_Video/KIDDOVERSE_01.mp4 1_Main_Video/KIDDOVERSE_01_1080p.mp4 \
         2_Shorts_Vertical/KIDDOVERSE_01_Short1_Zoom-Zoom-Kiddoverse.mp4 2_Shorts_Vertical/KIDDOVERSE_01_Short2_Count-with-Rumble.mp4 \
         2_Shorts_Vertical/KIDDOVERSE_01_Short3_Kiddo-Wiggle.mp4 3_Audio/KIDDOVERSE_01_master_48k.wav 3_Audio/KIDDOVERSE_01_song.mp3; do
  [ -f "$OLD/$(basename "$f")" ] || mv "$DK/$f" "$OLD/"
  cp "$TMP/$(basename "$f")" "$DK/$f"
done
echo "delivered $M to $DK (previous files in $OLD)"
