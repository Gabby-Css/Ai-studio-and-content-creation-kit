# Season 11: voice lines (Kokoro) + word timings (Whisper) for toon51..toon55, one at a time; then plan.json
$h='C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$env:PATH += ';C:\Users\softenic\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin'
$env:PYTHONIOENCODING='utf-8'
foreach ($n in 51,52,53,54,55) {
  Set-Location "$h\toon$n"
  if (-not (Test-Path words.json)) { python tts.py *> tts.out }
  Set-Location $h
  if (Test-Path "$h\toon$n\words.json") { python mk_s6_setup.py plan $n *>> "$h\tts_chain11.log" }
  Add-Content "$h\tts_chain11.log" ("tts $n done " + (Get-Date -Format HH:mm:ss))
}
Add-Content "$h\tts_chain11.log" ("all done " + (Get-Date -Format HH:mm:ss))
