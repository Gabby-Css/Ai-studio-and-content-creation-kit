# Season 7 ("The Great Pancake Race", ep31-35): render, level (-14.2 LUFS), contact-sheet + ASR check and deliver to Content Creation\Videos, one episode at a time.
# Resumable (an episode whose delivered video is newer than its index.html is skipped). Launch detached:
#   Invoke-CimMethod Win32_Process -MethodName Create -Arguments @{CommandLine='powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File <this file>'; CurrentDirectory='<hyperframes dir>'}
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$v='C:\Users\softenic\Desktop\Content Creation\Videos'
while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render ' }) { Start-Sleep -Seconds 30 }
Add-Content "$h\run_episode.log" ("s7 queue started " + (Get-Date -Format HH:mm:ss))
$eps = @(@(31,'The_Great_Pancake_Race',23.4), @(32,'The_Syrup_River',23.6), @(33,'Flat_Tire',22.2), @(34,'The_Dark_Tunnel',21.4), @(35,'Photo_Finish',21.6))
foreach ($e in $eps) {
  $n=$e[0]; $dst="$v\${n}_Bo_and_the_Pancake_${n}_$($e[1]).mp4"
  if ((Test-Path $dst) -and ((Get-Item $dst).LastWriteTime -gt (Get-Item "$h\toon$n\index.html").LastWriteTime)) { Add-Content "$h\run_episode.log" ("ep $n already up to date, skipped"); continue }
  & powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_episode.ps1" -N $n -Title $e[1] -Cover $e[2]
}
Add-Content "$h\run_episode.log" ("s7 queue finished " + (Get-Date -Format HH:mm:ss))
