#!/usr/bin/env python3
"""
resolve_ctl.py -- the direct CLI Claude Code drives to edit a live DaVinci Resolve.

No daemon, no watchdog. Each call connects fresh to the already-open Resolve, does ONE
thing, prints a JSON result, and exits (sub-second because Resolve stays open).

Timeline ops (dispatched to resolve_lib):
    python resolve_ctl.py status
    python resolve_ctl.py timeline_state
    python resolve_ctl.py list_media
    python resolve_ctl.py append_clip --json '{"media_index":0,"record_seconds":14}'
    python resolve_ctl.py append_clip --arg media_name=broll --arg record_timecode=00:00:14:00
    python resolve_ctl.py add_marker --arg timecode=00:00:05:00 --arg color=Green --arg name=hook
    python resolve_ctl.py delete_item --arg track_index=1 --arg item_index=2 --arg ripple=true
    python resolve_ctl.py set_playhead --arg timecode=00:00:10:00

Panel ferry (the in-Resolve panel talks to Claude through two JSONL files under memory/):
    python resolve_ctl.py inbox            # print + mark-read the panel's pending instructions
    python resolve_ctl.py inbox --peek     # print without marking read
    python resolve_ctl.py reply "text"     # push a reply the panel will display
"""

import argparse
import json
import os
import sys
from datetime import datetime

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import resolve_lib  # noqa: E402

_MEMORY = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "memory"
)
INBOX = os.path.join(_MEMORY, "resolve-inbox.jsonl")
OUTBOX = os.path.join(_MEMORY, "resolve-outbox.jsonl")


def _coerce(v):
    """Turn a --arg string into bool/number/json where obvious, else keep string."""
    low = v.lower()
    if low in ("true", "false"):
        return low == "true"
    if low in ("null", "none"):
        return None
    try:
        return int(v)
    except ValueError:
        pass
    try:
        return float(v)
    except ValueError:
        pass
    if v[:1] in "[{":
        try:
            return json.loads(v)
        except ValueError:
            pass
    return v


def _emit(obj):
    print(json.dumps(obj, default=str, indent=2))
    return 0 if obj.get("success", True) else 1


def cmd_inbox(peek=False):
    if not os.path.exists(INBOX):
        return _emit({"success": True, "message": "inbox empty", "data": {"pending": []}})
    pending, keep = [], []
    with open(INBOX, "r", encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except ValueError:
                continue
            if rec.get("read"):
                keep.append(rec)
            else:
                pending.append(rec)
                if not peek:
                    rec["read"] = True
                    keep.append(rec)
    if not peek and pending:
        with open(INBOX, "w", encoding="utf-8") as fh:
            for rec in keep:
                fh.write(json.dumps(rec) + "\n")
    return _emit({"success": True, "message": "%d pending" % len(pending), "data": {"pending": pending}})


def cmd_reply(text):
    os.makedirs(_MEMORY, exist_ok=True)
    rec = {"ts": datetime.now().isoformat(timespec="seconds"), "from": "claude", "text": text, "read": False}
    with open(OUTBOX, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(rec) + "\n")
    return _emit({"success": True, "message": "reply queued", "data": rec})


def main():
    ap = argparse.ArgumentParser(description="Direct CLI for live DaVinci Resolve editing.")
    ap.add_argument("command", help="a timeline tool (status, append_clip, ...) or inbox|reply")
    ap.add_argument("text", nargs="?", help="reply text (for the 'reply' command)")
    ap.add_argument("--json", dest="json_args", help="JSON object of tool args")
    ap.add_argument("--arg", action="append", default=[], metavar="key=value",
                    help="repeatable key=value arg (auto-typed)")
    ap.add_argument("--peek", action="store_true", help="inbox: don't mark read")
    args = ap.parse_args()

    if args.command == "inbox":
        sys.exit(cmd_inbox(peek=args.peek))
    if args.command == "reply":
        if not args.text:
            sys.exit(_emit({"success": False, "message": "reply needs text"}))
        sys.exit(cmd_reply(args.text))

    tool_args = {}
    if args.json_args:
        tool_args.update(json.loads(args.json_args))
    for pair in args.arg:
        if "=" not in pair:
            sys.exit(_emit({"success": False, "message": "bad --arg %r (want key=value)" % pair}))
        k, v = pair.split("=", 1)
        tool_args[k] = _coerce(v)

    sys.exit(_emit(resolve_lib.dispatch(args.command, tool_args)))


if __name__ == "__main__":
    main()
