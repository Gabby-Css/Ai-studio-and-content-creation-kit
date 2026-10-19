# Season 13: voice lines (Kokoro) + word timings (Whisper) for toon61..toon65, one at a time (waits for free commit memory); then plan.json
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$env:PATH += ';C:\Users\softenic\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin'
$env:PYTHONIOENCODING='utf-8'
Remove-Item Env:SSLKEYLOGFILE -ErrorAction SilentlyContinue
foreach ($n in 61,62,63,64,65) {
  while ((Get-CimInstance Win32_OperatingSystem).FreeVirtualMemory -lt 2600000) { Start-Sleep -Seconds 15 }
  Set-Location "$h\toon$n"
  if (-not (Test-Path words.json)) { python tts.py *> tts.out }
  Set-Location $h
  if (Test-Path "$h\toon$n\words.json") { python mk_s6_setup.py plan $n *>> "$h\tts_chain13.log" }
  Add-Content "$h\tts_chain13.log" ("tts $n done " + (Get-Date -Format HH:mm:ss))
}
Add-Content "$h\tts_chain13.log" ("all done " + (Get-Date -Format HH:mm:ss))
