@echo off
set "PATH=C:\Program Files\nodejs\;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Users\softenic\AppData\Local\Programs\Python\Python312\;C:\Users\softenic\AppData\Local\Programs\Python\Python312\Scripts\;C:\Users\softenic\AppData\Local\Microsoft\WinGet\Links;C:\Users\softenic\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin"
set PYTHONIOENCODING=utf-8
set PYTHONUTF8=1
cd /d "%~dp0"
"C:\Users\softenic\AppData\Local\Programs\Python\Python312\python.exe" -u run_all.py >> ..\deliver\run_all.stdout.log 2>&1
