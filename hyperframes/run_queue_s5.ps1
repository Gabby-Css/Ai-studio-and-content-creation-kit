# waits until the other session's learn1 render has finished, then renders + levels + delivers episodes 22..25 one at a time
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
while (Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'hyperframes\.mjs render learn1' }) { Start-Sleep -Seconds 30 }
Add-Content "$h\run_episode.log" ("queue started " + (Get-Date -Format HH:mm:ss))
$eps = @(@(22,'The_Missing_Spatula',22.6), @(23,'The_Balloon_Chase',24.4), @(24,'The_Great_Flip_Off',24.3), @(25,'Festival_Finale',21.6))
foreach ($e in $eps) {
  & powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_episode.ps1" -N $e[0] -Title $e[1] -Cover $e[2]
}
Add-Content "$h\run_episode.log" ("queue finished " + (Get-Date -Format HH:mm:ss))
