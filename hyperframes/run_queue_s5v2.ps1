# Season 5 re-staged (v2: depth rows + depth sorting + speaker framing): re-render, level and re-deliver episodes 21..25, one at a time.
# Resumable: an episode whose delivered video is already newer than its index.html is skipped, so a restart only redoes what is missing.
# The first versions are kept in hyperframes\season5_v1\ (videos + covers).
# Launch detached:  Invoke-CimMethod Win32_Process -MethodName Create -Arguments @{CommandLine='powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File <this file>'}
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$v='C:\Users\softenic\Desktop\Content Creation\Videos'
while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render ' }) { Start-Sleep -Seconds 30 }
Add-Content "$h\run_episode.log" ("v2 queue started " + (Get-Date -Format HH:mm:ss))
$eps = @(@(21,'The_Great_Pancake_Festival',5.6), @(22,'The_Missing_Spatula',22.4), @(23,'The_Balloon_Chase',24.6), @(24,'The_Great_Flip_Off',23.8), @(25,'Festival_Finale',21.6))
foreach ($e in $eps) {
  $n=$e[0]; $dst="$v\${n}_Bo_and_the_Pancake_${n}_$($e[1]).mp4"
  if ((Test-Path $dst) -and ((Get-Item $dst).LastWriteTime -gt (Get-Item "$h\toon$n\index.html").LastWriteTime)) { Add-Content "$h\run_episode.log" ("ep $n already up to date, skipped"); continue }
  & powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_episode.ps1" -N $n -Title $e[1] -Cover $e[2]
}
Add-Content "$h\run_episode.log" ("v2 queue finished " + (Get-Date -Format HH:mm:ss))
