@echo off
REM Always-on panel watcher — makes the in-Resolve Claude panel instant-apply.
cd /d "%~dp0"
:loop
node "%~dp0resolve-watch.cjs" >> "%~dp0..\..\memory\resolve-watch.log" 2>&1
REM if it ever exits (crash / reboot), wait 5s and relaunch so it's genuinely always-on
timeout /t 5 /nobreak >nul
goto loop
