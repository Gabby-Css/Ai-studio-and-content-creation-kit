$env:PATH += ';C:\Users\softenic\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin'
$env:PYTHONIOENCODING='utf-8'
foreach ($n in 21,22,23,24,25) {
  Set-Location 'C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes\toon'+$n
  Set-Location ('C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes\toon' + $n)
  if (-not (Test-Path words.json)) { python tts.py *> tts.out }
  Add-Content 'C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes\tts_chain5.log' ('tts ' + $n + ' done ' + (Get-Date -Format HH:mm:ss))
}
