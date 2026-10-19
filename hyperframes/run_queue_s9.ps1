# Season 9 ("Flapjack's Family Reunion", ep41-45) in TikTok format (576x1024 main file, 1080x1920 master in Videos\HD_1080x1920). Resumable.
#   Invoke-CimMethod Win32_Process -MethodName Create -Arguments @{CommandLine='powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File <this file>'; CurrentDirectory='<hyperframes dir>'}
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$v='C:\Users\softenic\Desktop\Content Creation\Videos'
while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render ' }) { Start-Sleep -Seconds 30 }
Add-Content "$h\run_episode.log" ("s9 queue started " + (Get-Date -Format HH:mm:ss))
$eps = @(@(41,'Grandmas_Picnic',25.74), @(42,'The_Three_Cousins',26.56), @(43,'The_Lost_Recipe',25.85), @(44,'The_Secret_Ingredient',25.39), @(45,'The_Family_Photo',26.28))
foreach ($e in $eps) {
  $n=$e[0]; $dst="$v\${n}_Bo_and_the_Pancake_${n}_$($e[1]).mp4"
  if ((Test-Path $dst) -and ((Get-Item $dst).LastWriteTime -gt (Get-Item "$h\toon$n\index.html").LastWriteTime)) { Add-Content "$h\run_episode.log" ("ep $n already up to date, skipped"); continue }
  while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render ' }) { Start-Sleep -Seconds 30 }
  & powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_episode.ps1" -N $n -Title $e[1] -Cover $e[2] -Tiktok
}
Add-Content "$h\run_episode.log" ("s9 queue finished " + (Get-Date -Format HH:mm:ss))
