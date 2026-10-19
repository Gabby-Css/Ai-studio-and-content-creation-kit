# Season 12: voice lines (Kokoro) + word timings (Whisper) for toon56..toon60, one at a time; then plan.json
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$env:PATH += ';C:\Users\softenic\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin'
$env:PYTHONIOENCODING='utf-8'
foreach ($n in 56,57,58,59,60) {
  while ((Get-CimInstance Win32_OperatingSystem).FreeVirtualMemory -lt 2600000) { Start-Sleep -Seconds 15 }
  Set-Location "$h\toon$n"
  if (-not (Test-Path words.json)) { python tts.py *> tts.out }
  Set-Location $h
  if (Test-Path "$h\toon$n\words.json") { python mk_s6_setup.py plan $n *>> "$h\tts_chain12.log" }
  Add-Content "$h\tts_chain12.log" ("tts $n done " + (Get-Date -Format HH:mm:ss))
}
Add-Content "$h\tts_chain12.log" ("all done " + (Get-Date -Format HH:mm:ss))
