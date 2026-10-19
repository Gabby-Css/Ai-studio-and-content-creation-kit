# one heavy job at a time: first the last Season-9 render (ep45), then the Season-10 voices
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
Set-Location $h
& powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_queue_s9.ps1"
Add-Content "$h\run_episode.log" ("chain A: s9 done, starting s10 voices " + (Get-Date -Format HH:mm:ss))
& powershell -NoProfile -ExecutionPolicy Bypass -File "$h\run_tts_s10.ps1"
Add-Content "$h\run_episode.log" ("chain A finished " + (Get-Date -Format HH:mm:ss))
