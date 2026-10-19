@echo off
cd /d "%~dp0"
"C:\Program Files\Git\bin\bash.exe" run_vocals_learn.sh >> sx\pipeline_learn.log 2>&1
