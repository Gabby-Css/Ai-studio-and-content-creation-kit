# Season 11 ("The Great Beach Day", ep51-55) in TikTok format (576x1024 main file, 1080x1920 master in Videos\HD_1080x1920). Resumable.
# The cover frame time is computed from plan.json + words.json (end of line 11 + 0.2 s), so nothing to edit after the voices change.
#   Invoke-CimMethod Win32_Process -MethodName Create -Arguments @{CommandLine='powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File <this file>'; CurrentDirectory='<hyperframes dir>'}
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$v='C:\Users\softenic\Desktop\Content Creation\Videos'
$env:PYTHONIOENCODING='utf-8'
while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render ' }) { Start-Sleep -Seconds 30 }
Add-Content "$h\run_episode.log" ("s11 queue started " + (Get-Date -Format HH:mm:ss))
$eps = @(@(51,'Beach_Day'), @(52,'The_Ice_Cream_Stand'), @(53,'The_Sandcastle_Contest'), @(54,'The_Message_in_a_Bottle'), @(55,'The_Penguin_Family'))
foreach ($e in $eps) {
  $n=$e[0]; $dst="$v\${n}_Bo_and_the_Pancake_${n}_$($e[1]).mp4"
  if ((Test-Path $dst) -and ((Get-Item $dst).LastWriteTime -gt (Get-Item "$h\toon$n\index.html").LastWriteTime)) { Add-Content "$h\run_episode.log" ("ep $n already up to date, skipped"); continue }
  while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render ' }) { Start-Sleep -Seconds 30 }
  $cover = (& python -c "import json;p=json.load(open(r'$h\toon$n\plan.json'));w=json.load(open(r'$h\toon$n\words.json'));print(round(p['LINE_T']['11']+w['dur']['11']+.2,2))").Trim()
  & powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_episode.ps1" -N $n -Title $e[1] -Cover $cover -Tiktok
}
Add-Content "$h\run_episode.log" ("s11 queue finished " + (Get-Date -Format HH:mm:ss))
