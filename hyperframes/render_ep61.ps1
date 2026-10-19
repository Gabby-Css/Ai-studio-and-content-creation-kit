# Episode 61 ("The Surprise Party"): gated render + QA + 576x1024 TikTok encode. Everything stays in toon61\output (nothing is copied to Content Creation\Videos).
# Resumable: up to 4 attempts; each attempt first waits until no other python job / render is running (the PC has 2 cores and is shared with peer sessions) and enough commit is free.
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$ff='C:\Users\softenic\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin'
$env:PATH += ";$ff"; $env:PYTHONIOENCODING='utf-8'
$env:PRODUCER_PAGE_NAVIGATION_TIMEOUT_MS='300000'; $env:PRODUCER_PLAYER_READY_TIMEOUT_MS='300000'; $env:PRODUCER_RENDER_READY_TIMEOUT_MS='300000'; $env:PRODUCER_PUPPETEER_PROTOCOL_TIMEOUT_MS='300000'
Set-Location $h
New-Item -ItemType Directory -Force "toon61\output" | Out-Null
for ($try = 1; $try -le 4; $try++) {
  # gate: no other python job / render running, and enough free commit
  while (Get-CimInstance Win32_Process | Where-Object { ($_.Name -eq 'python.exe') -or ($_.CommandLine -match 'hyperframes\.mjs render ') }) { Start-Sleep -Seconds 20 }
  while ((Get-CimInstance Win32_OperatingSystem).FreeVirtualMemory -lt 2800000) { Start-Sleep -Seconds 15 }
  Remove-Item "toon61\output\*" -Recurse -Force -ErrorAction SilentlyContinue
  Add-Content "$h\run_episode.log" ("ep 61 render started (try $try) " + (Get-Date -Format HH:mm:ss))
  node node_modules/hyperframes/bin/hyperframes.mjs render toon61 --output toon61/output/bo-and-the-pancake-61.mp4 --workers 1 --fps 30 *> toon61\render.log
  if (Test-Path 'toon61\output\bo-and-the-pancake-61.mp4') { break }
  Add-Content "$h\run_episode.log" ("ep 61 render attempt $try died " + (Get-Date -Format HH:mm:ss))
  Start-Sleep -Seconds 30
}
$fin='toon61\output\bo-and-the-pancake-61-final.mp4'
if (Test-Path 'toon61\output\bo-and-the-pancake-61.mp4') {
  python qa_episode.py 61 *> toon61\qa.out
}
if (Test-Path $fin) {
  ffmpeg -y -v error -i $fin -vf "scale=576:1024:flags=lanczos,format=yuv420p" -c:v libx264 -preset slow -crf 17 -profile:v high -r 30 -c:a copy -movflags +faststart toon61\output\bo-and-the-pancake-61-576x1024.mp4
  Add-Content "$h\run_episode.log" ("ep 61 rendered + encoded (not delivered to Videos) " + (Get-Date -Format HH:mm:ss))
} else { Add-Content "$h\run_episode.log" ("ep 61 FAILED " + (Get-Date -Format HH:mm:ss)) }
