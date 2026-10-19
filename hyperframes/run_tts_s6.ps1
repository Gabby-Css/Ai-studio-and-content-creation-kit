# Season 6: voice lines (Kokoro) + word timings (Whisper) for toon26..toon30, one at a time; then plan.json (line start times)
# Launch detached:  Invoke-CimMethod Win32_Process -MethodName Create -Arguments @{CommandLine='powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File <this file>'}
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$env:PATH += ';C:\Users\softenic\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin'
$env:PYTHONIOENCODING='utf-8'
foreach ($n in 26,27,28,29,30) {
  Set-Location "$h\toon$n"
  if (-not (Test-Path words.json)) { python tts.py *> tts.out }
  Set-Location $h
  if (Test-Path "$h\toon$n\words.json") { python mk_s6_setup.py plan $n *>> "$h\tts_chain6.log" }
  Add-Content "$h\tts_chain6.log" ("tts $n done " + (Get-Date -Format HH:mm:ss))
}
Add-Content "$h\tts_chain6.log" ("all done " + (Get-Date -Format HH:mm:ss))
