# Season 8 ("The Treasure of Pancake Island", ep36-40) in TikTok format (576x1024 main file, 1080x1920 master in Videos\HD_1080x1920) + the fixed re-renders of ep33 and ep35 (1080x1920 like the rest of Season 7).
# Resumable (an episode whose delivered video is newer than its index.html is skipped). Launch detached:
#   Invoke-CimMethod Win32_Process -MethodName Create -Arguments @{CommandLine='powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File <this file>'; CurrentDirectory='<hyperframes dir>'}
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$v='C:\Users\softenic\Desktop\Content Creation\Videos'
while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render ' }) { Start-Sleep -Seconds 30 }
Add-Content "$h\run_episode.log" ("s8 queue started " + (Get-Date -Format HH:mm:ss))
# n, title, cover second, tiktok?
$eps = @(@(36,'The_Map_in_the_Pan',24.35,$true), @(37,'Rough_Seas',22.4,$true), @(38,'The_Riddle_Gate',24.9,$true), @(39,'The_Wobbly_Bridge',23.4,$true), @(40,'The_Real_Treasure',26.4,$true), @(33,'Flat_Tire',22.2,$false), @(35,'Photo_Finish',21.6,$false))
foreach ($e in $eps) {
  $n=$e[0]; $dst="$v\${n}_Bo_and_the_Pancake_${n}_$($e[1]).mp4"
  if ((Test-Path $dst) -and ((Get-Item $dst).LastWriteTime -gt (Get-Item "$h\toon$n\index.html").LastWriteTime)) { Add-Content "$h\run_episode.log" ("ep $n already up to date, skipped"); continue }
  while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render ' }) { Start-Sleep -Seconds 30 }
  if ($e[3]) { & powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_episode.ps1" -N $n -Title $e[1] -Cover $e[2] -Tiktok }
  else { & powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_episode.ps1" -N $n -Title $e[1] -Cover $e[2] }
}
Add-Content "$h\run_episode.log" ("s8 queue finished " + (Get-Date -Format HH:mm:ss))
