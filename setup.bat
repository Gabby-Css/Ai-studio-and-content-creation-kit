@echo off
REM AI Video Studio Kit - setup. Installs the Node dependencies, then reports what's ready.
cd /d "%~dp0"

echo AI Video Studio Kit - setup
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node is not installed. Get Node 22.12.0 or newer from https://nodejs.org and run this again.
  exit /b 1
)
node -e "let v=process.versions.node.split('.').map(Number);process.exit(Math.max(0,Math.sign(22012-v[0]*1000-v[1])))"
if errorlevel 1 (
  echo Node 22.12.0 or newer is required.
  exit /b 1
)
for /f "delims=" %%v in ('node --version') do echo node %%v

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not on PATH. It ships with Node - reinstall Node from https://nodejs.org
  exit /b 1
)

echo.
echo Installing Node dependencies...
REM puppeteer and sharp are optionalDependencies: if their platform build fails, npm carries on and
REM the studio still works minus the motion renderer / SVG rasteriser. check-deps.js says which.
call npm ci --no-audit --no-fund
if errorlevel 1 echo (some optional dependencies did not install - check-deps.js will report the affected capabilities)

echo.
node check-deps.js

echo.
echo ffmpeg is the one thing npm cannot install for you. If check-deps flagged it:
echo   windows: choco install ffmpeg
echo   ...or download from ffmpeg.org and add bin\ to PATH
