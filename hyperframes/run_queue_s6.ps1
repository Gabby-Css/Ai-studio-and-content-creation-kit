# Season 6 ("The Mystery Egg", ep26-30): render, level (-14.2 LUFS), contact-sheet + ASR check and deliver to Content Creation\Videos, one episode at a time.
# Resumable (an episode whose delivered video is newer than its index.html is skipped). Launch detached:
#   Invoke-CimMethod Win32_Process -MethodName Create -Arguments @{CommandLine='powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File <this file>'; CurrentDirectory='<hyperframes dir>'}
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$v='C:\Users\softenic\Desktop\Content Creation\Videos'
while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render ' }) { Start-Sleep -Seconds 30 }
Add-Content "$h\run_episode.log" ("s6 queue started " + (Get-Date -Format HH:mm:ss))
$eps = @(@(26,'The_Big_Gray_Egg',24.5), @(27,'Keep_It_Warm',18.9), @(28,'Crack',21.9), @(29,'Pebbles_Big_Day',19.2), @(30,'Happy_Hatching_Day',22.0))
foreach ($e in $eps) {
  $n=$e[0]; $dst="$v\${n}_Bo_and_the_Pancake_${n}_$($e[1]).mp4"
  if ((Test-Path $dst) -and ((Get-Item $dst).LastWriteTime -gt (Get-Item "$h\toon$n\index.html").LastWriteTime)) { Add-Content "$h\run_episode.log" ("ep $n already up to date, skipped"); continue }
  & powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_episode.ps1" -N $n -Title $e[1] -Cover $e[2]
}
Add-Content "$h\run_episode.log" ("s6 queue finished " + (Get-Date -Format HH:mm:ss))
