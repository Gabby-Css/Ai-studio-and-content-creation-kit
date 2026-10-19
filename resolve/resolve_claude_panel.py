#!/usr/bin/env python3
"""
resolve_claude_panel.py -- a little "talk to Claude" panel that runs INSIDE DaVinci Resolve.

Run it from Resolve: Workspace > Scripts > resolve_claude_panel  (or paste into
Workspace > Console with the language set to Py3). A small floating window appears,
built with Resolve's own UIManager, with:
  - a text box where you type what you want done to the timeline
  - [Send to Claude]  -> writes your instruction to memory/resolve-inbox.jsonl
  - [Refresh replies] -> shows what Claude has done (from memory/resolve-outbox.jsonl)

There is NO background watcher. You type here; then in Claude Code you say "check the
panel" (or run /resolve-edit). Claude reads the inbox, edits your live timeline through
the scripting API, and pushes a reply back that this panel shows on Refresh.

The only thing you may need to edit is REPO_MEMORY below if your repo lives elsewhere
(or set the RESOLVE_BRIDGE_MEMORY environment variable).
"""

import json
import os
from datetime import datetime

# --- Where the inbox/outbox live -------------------------------------------------------------
# This was a pinned absolute path to one machine. The kit's sanitiser rewrites workspace absolutes
# into a placeholder token, so the shipped copy became that token joined to \memory — a literal
# resolving to nothing, silently, because the panel only touches it when you press a button.
# (The token is described rather than quoted here on purpose: the build's placeholder gate fails on
# ANY occurrence in a shipped code file, and a gate with a comments-are-fine exception is a gate
# with a hole. Cheaper to write the sentence differently than to teach it to parse comments.)
#
# A relative climb is not a fix either: the builder's depth-correction pass only rewrites .cjs/.js,
# so a hardcoded "../../memory" would be right here and wrong in the product. Discover it instead:
# honour the env var, else walk up for a real memory/ dir, else keep one beside this script so the
# bridge has somewhere valid to write rather than failing on an unwritable path.
_HERE = os.path.dirname(os.path.abspath(__file__))


def _discover_memory():
    """Find the tree root, then take its memory/ dir.

    Keyed on package.json, NOT on the nearest memory/ dir. Searching for memory/ directly looked
    right and was wrong: scripts/memory/ exists mid-tree, so the walk stopped there and the bridge
    would have written its inbox somewhere the reader never looks. package.json sits at the repo
    root and at each product root and nowhere between, which is exactly the boundary wanted here.
    """
    d = _HERE
    for _ in range(6):
        if os.path.isfile(os.path.join(d, "package.json")):
            return os.path.join(d, "memory")
        parent = os.path.dirname(d)
        if parent == d:
            break
        d = parent
    return os.path.join(_HERE, "memory")


REPO_MEMORY = os.environ.get("RESOLVE_BRIDGE_MEMORY") or _discover_memory()
os.makedirs(REPO_MEMORY, exist_ok=True)
INBOX = os.path.join(REPO_MEMORY, "resolve-inbox.jsonl")
OUTBOX = os.path.join(REPO_MEMORY, "resolve-outbox.jsonl")

# --- Get Resolve's UI toolkit (globals are injected when run from Resolve) ----
try:
    bmd  # noqa: F821 - injected by Resolve's script host
except NameError:
    import DaVinciResolveScript as bmd  # noqa: N813

try:
    resolve  # noqa: F821
except NameError:
    resolve = bmd.scriptapp("Resolve")

fusion = resolve.Fusion()
ui = fusion.UIManager
disp = bmd.UIDispatcher(ui)

WIN_ID = "ClaudeResolvePanel"


def _append_inbox(text):
    os.makedirs(REPO_MEMORY, exist_ok=True)
    rec = {"ts": datetime.now().isoformat(timespec="seconds"), "from": "you", "text": text, "read": False}
    with open(INBOX, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(rec) + "\n")


def _read_replies(limit=12):
    if not os.path.exists(OUTBOX):
        return "(no replies yet)"
    lines = []
    with open(OUTBOX, "r", encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except ValueError:
                continue
            lines.append("[%s] %s" % (rec.get("ts", ""), rec.get("text", "")))
    return "\n".join(lines[-limit:]) if lines else "(no replies yet)"


win = disp.AddWindow(
    {"ID": WIN_ID, "WindowTitle": "Claude ↔ Resolve", "Geometry": [200, 200, 460, 460]},
    [
        ui.VGroup([
            ui.Label({"Text": "Tell Claude what to do to the timeline:", "Weight": 0}),
            ui.TextEdit({"ID": "Input", "PlaceholderText": "e.g. add a 2s gap after clip 3, then drop B-roll at 00:14", "Weight": 1}),
            ui.HGroup({"Weight": 0}, [
                ui.Button({"ID": "Send", "Text": "Send to Claude"}),
                ui.Button({"ID": "Refresh", "Text": "Refresh replies"}),
            ]),
            ui.Label({"ID": "Status", "Text": "", "Weight": 0}),
            ui.Label({"Text": "Claude:", "Weight": 0}),
            ui.TextEdit({"ID": "Log", "ReadOnly": True, "Text": _read_replies(), "Weight": 2}),
        ]),
    ],
)

items = win.GetItems()


def _on_send(ev):
    text = (items["Input"].PlainText or "").strip()
    if not text:
        items["Status"].Text = "Type an instruction first."
        return
    _append_inbox(text)
    items["Input"].PlainText = ""
    items["Status"].Text = "Sent → now say 'check the panel' in Claude Code."


def _on_refresh(ev):
    items["Log"].Text = _read_replies()
    items["Status"].Text = "Refreshed."


def _on_close(ev):
    disp.ExitLoop()


win.On.Send.Clicked = _on_send
win.On.Refresh.Clicked = _on_refresh
win.On[WIN_ID].Close = _on_close

win.Show()
disp.RunLoop()
win.Hide()
