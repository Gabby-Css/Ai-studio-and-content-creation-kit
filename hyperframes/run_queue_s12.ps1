# Season 12 ("The Pancake Circus", ep56-60) in TikTok format (576x1024 main file, 1080x1920 master in Videos\HD_1080x1920). Resumable; pass episode numbers to render only those:  -File run_queue_s12.ps1 56 57
# The cover frame time is computed from plan.json + words.json (end of line 11 + 0.2 s), so nothing to edit after the voices change.
param([int[]]$Only)
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$v='C:\Users\softenic\Desktop\Content Creation\Videos'
$env:PYTHONIOENCODING='utf-8'
while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render ' }) { Start-Sleep -Seconds 30 }
Add-Content "$h\run_episode.log" ("s12 queue started " + (Get-Date -Format HH:mm:ss))
$eps = @(@(56,'The_Big_Top'), @(57,'The_Juggling_Act'), @(58,'The_Flying_Coco'), @(59,'The_Magic_Hat'), @(60,'The_Grand_Finale'))
foreach ($e in $eps) {
  $n=$e[0]
  if ($Only -and ($Only -notcontains $n)) { continue }
  $dst="$v\${n}_Bo_and_the_Pancake_${n}_$($e[1]).mp4"
  if ((Test-Path $dst) -and ((Get-Item $dst).LastWriteTime -gt (Get-Item "$h\toon$n\index.html").LastWriteTime)) { Add-Content "$h\run_episode.log" ("ep $n already up to date, skipped"); continue }
  while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render ' }) { Start-Sleep -Seconds 30 }
  while ((Get-CimInstance Win32_OperatingSystem).FreeVirtualMemory -lt 2800000) { Start-Sleep -Seconds 15 }
  $cover = (& python -c "import json;p=json.load(open(r'$h\toon$n\plan.json'));w=json.load(open(r'$h\toon$n\words.json'));print(round(p['LINE_T']['11']+w['dur']['11']+.2,2))").Trim()
  & powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_episode.ps1" -N $n -Title $e[1] -Cover $cover -Tiktok
}
Add-Content "$h\run_episode.log" ("s12 queue finished " + (Get-Date -Format HH:mm:ss))
