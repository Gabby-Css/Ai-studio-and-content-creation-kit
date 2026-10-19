#!/usr/bin/env bash
# AI Video Studio Kit — setup. Installs the Node dependencies, then reports what's ready.
set -e
cd "$(dirname "$0")"

echo "AI Video Studio Kit — setup"
echo

if ! command -v node >/dev/null 2>&1; then
  echo "Node is not installed. Get Node 22.12.0 or newer from https://nodejs.org and run this again."
  exit 1
fi
node -e "const v=process.versions.node.split('.').map(Number);process.exit(v[0]>22||(v[0]===22&&v[1]>=12)?0:1)" || {
  echo "Node 22.12.0 or newer is required."
  exit 1
}
echo "node $(node --version)"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not on PATH. It ships with Node — reinstall Node from https://nodejs.org"
  exit 1
fi

echo
echo "Installing Node dependencies..."
# puppeteer and sharp are optionalDependencies: if their platform build fails, npm carries on and
# the studio still works minus the motion renderer / SVG rasteriser. check-deps.js says which.
npm ci --no-audit --no-fund || echo "(some optional dependencies did not install — check-deps.js will report the affected capabilities)"

echo
node check-deps.js || true

echo
echo "ffmpeg is the one thing npm cannot install for you. If check-deps flagged it:"
echo "  mac:     brew install ffmpeg"
echo "  linux:   sudo apt install ffmpeg"
echo "  windows: choco install ffmpeg"
