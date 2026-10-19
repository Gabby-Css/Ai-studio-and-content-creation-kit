# Season 13 ("The Spooky Pancake Night", ep61-65, Halloween) in TikTok format (576x1024 main file, 1080x1920 master in Videos\HD_1080x1920). Resumable; pass episode numbers to render only those:
#   powershell -File run_queue_s13.ps1 -Only 61        or        powershell -Command "& 'run_queue_s13.ps1' -Only 61,62"
# Gate: no peer render / mix / singing / ASR job running (qa_sing, mixtest, sing_song, run_all, render_only, hyperframes render) and enough free commit.
param([int[]]$Only)
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$v='C:\Users\softenic\Desktop\Content Creation\Videos'
$env:PYTHONIOENCODING='utf-8'
$peer='qa_sing|mixtest|sing_song|run_all\.py|render_only|hyperframes\.mjs render '
$gate={ while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match $peer }) { Start-Sleep -Seconds 30 } }
& $gate
Add-Content "$h\run_episode.log" ("s13 queue started " + (Get-Date -Format HH:mm:ss))
$eps = @(@(61,'The_Pumpkin_Patch'), @(62,'Boos_Big_Scare'), @(63,'The_Haunted_House'), @(64,'The_Giant_Shadow'), @(65,'The_Ghost_Party'))
foreach ($e in $eps) {
  $n=$e[0]
  if ($Only -and ($Only -notcontains $n)) { continue }
  $dst="$v\${n}_Bo_and_the_Pancake_${n}_$($e[1]).mp4"
  if ((Test-Path $dst) -and ((Get-Item $dst).LastWriteTime -gt (Get-Item "$h\toon$n\index.html").LastWriteTime)) { Add-Content "$h\run_episode.log" ("ep $n already up to date, skipped"); continue }
  & $gate
  while ((Get-CimInstance Win32_OperatingSystem).FreeVirtualMemory -lt 2800000) { Start-Sleep -Seconds 15 }
  $cover = (& python -c "import json;p=json.load(open(r'$h\toon$n\plan.json'));w=json.load(open(r'$h\toon$n\words.json'));print(round(p['LINE_T']['11']+w['dur']['11']+.2,2))").Trim()
  & powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_episode.ps1" -N $n -Title $e[1] -Cover $cover -Tiktok
}
Add-Content "$h\run_episode.log" ("s13 queue finished " + (Get-Date -Format HH:mm:ss))
