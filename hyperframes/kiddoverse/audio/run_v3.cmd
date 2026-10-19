@echo off
cd /d "%~dp0"
"C:\Program Files\Git\bin\bash.exe" run_vocals_v3_resume.sh >> sx\pipeline3.log 2>&1
