#!/usr/bin/env bash
# Execute the silence cut through the PROVEN resolve_ctl delete_item path — one fresh
# short-lived dispatch process per clip (long-lived multi-item scripts segfault the
# fusionscript bridge). Delete HIGH->LOW so ripple never shifts a not-yet-deleted index.
set -u
cd "$(dirname "$0")"
if [ "${1:-}" != "--apply" ]; then
  echo "Refusing to delete timeline clips without the explicit --apply flag."
  exit 2
fi
if [ -n "${PYTHON_BIN:-}" ]; then
  PYTHON_CMD="$PYTHON_BIN"
elif command -v python3 >/dev/null 2>&1; then
  PYTHON_CMD="python3"
elif command -v python >/dev/null 2>&1; then
  PYTHON_CMD="python"
elif command -v py >/dev/null 2>&1; then
  PYTHON_CMD="py"
else
  echo "Python was not found. Install Python 3 or set PYTHON_BIN to its executable."
  exit 1
fi
IDX=$("$PYTHON_CMD" -c "import json;d=json.load(open('sc_dead_indices.json'));assert d.get('skipped',0)==0;print(' '.join(str(i) for i in sorted(d['dead_indices'],reverse=True)))") || { echo "Invalid or incomplete sc_dead_indices.json; nothing was deleted."; exit 1; }
echo "deleting ${IDX}"
ok=0; fail=0
for i in $IDX; do
  if "$PYTHON_CMD" resolve_ctl.py delete_item --arg track_index=1 --arg item_index="$i" --arg ripple=true >/dev/null 2>&1; then
    ok=$((ok+1))
  else
    fail=$((fail+1)); echo "  FAILED index $i"
  fi
done
echo "DONE: deleted ok=$ok fail=$fail"
if [ "$fail" -ne 0 ]; then
  exit 1
fi
