# usage: powershell -File run_episode.ps1 -N 21 -Title The_Great_Pancake_Festival -Cover 24.0 [-Tiktok]
#   -Tiktok : the main delivered file is the 576x1024 TikTok version (captions/end card are already placed above the platform UI zone); the 1080x1920 master goes to Videos\HD_1080x1920
param([int]$N,[string]$Title,[double]$Cover=24.0,[switch]$Tiktok)
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$ff='C:\Users\softenic\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin'
$env:PATH += ";$ff"; $env:PYTHONIOENCODING='utf-8'
$env:PRODUCER_PAGE_NAVIGATION_TIMEOUT_MS='300000'; $env:PRODUCER_PLAYER_READY_TIMEOUT_MS='300000'; $env:PRODUCER_RENDER_READY_TIMEOUT_MS='300000'; $env:PRODUCER_PUPPETEER_PROTOCOL_TIMEOUT_MS='300000'
Set-Location $h
New-Item -ItemType Directory -Force "toon$N\output" | Out-Null
Remove-Item "toon$N\output\*.mp4" -ErrorAction SilentlyContinue
node node_modules/hyperframes/bin/hyperframes.mjs render "toon$N" --output "toon$N/output/bo-and-the-pancake-$N.mp4" --workers 1 --fps 30 *> "toon$N\render.log"
python qa_episode.py $N *> "toon$N\qa.out"
$v='C:\Users\softenic\Desktop\Content Creation\Videos'
$fin="toon$N\output\bo-and-the-pancake-$N-final.mp4"
if ((Test-Path $fin) -and $Tiktok) {
  $tk="toon$N\output\bo-and-the-pancake-$N-576x1024.mp4"
  ffmpeg -y -v error -i $fin -vf "scale=576:1024:flags=lanczos,format=yuv420p" -c:v libx264 -preset slow -crf 17 -profile:v high -r 30 -c:a copy -movflags +faststart $tk
  New-Item -ItemType Directory -Force "$v\HD_1080x1920" | Out-Null
  Copy-Item $fin "$v\HD_1080x1920\${N}_Bo_and_the_Pancake_${N}_$Title.mp4" -Force
  Copy-Item $tk "$v\${N}_Bo_and_the_Pancake_${N}_$Title.mp4" -Force
  ffmpeg -y -v error -ss $Cover -i $tk -frames:v 1 "$v\${N}_Bo_and_the_Pancake_${N}_COVER.png"
  Add-Content "$h\run_episode.log" ("ep $N delivered (tiktok 576x1024) " + (Get-Date -Format HH:mm:ss))
} elseif (Test-Path $fin) {
  Copy-Item $fin "$v\${N}_Bo_and_the_Pancake_${N}_$Title.mp4" -Force
  ffmpeg -y -v error -ss $Cover -i $fin -frames:v 1 "$v\${N}_Bo_and_the_Pancake_${N}_COVER.png"
  Add-Content "$h\run_episode.log" ("ep $N delivered " + (Get-Date -Format HH:mm:ss))
} else { Add-Content "$h\run_episode.log" ("ep $N FAILED " + (Get-Date -Format HH:mm:ss)) }
