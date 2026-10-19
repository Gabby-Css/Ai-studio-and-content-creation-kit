---
description: Edit the live DaVinci Resolve timeline — read the in-Resolve panel inbox and act, or take a direct instruction.
---

Live-edit the user's open DaVinci Resolve timeline. **First load `EDITING-CRAFT.md`
for editing principles and `resolve/README.md` for bridge setup.** Also load
`.claude/skills/davinci-resolve/SKILL.md` for the included command reference and frame model, then:

1. **Confirm the connection** — from the extracted kit root:
   `py resolve/resolve_ctl.py status`. If `connected:false`, surface the reason (Resolve not open, or
   External scripting not enabled) and stop.
2. **Read state first** — `py resolve/resolve_ctl.py timeline_state` (and `list_media` if placing clips)
   so all frame math is against the real timeline.
3. **Get the instruction:**
   - If `$ARGUMENTS` is non-empty, treat it as the edit to perform.
   - Otherwise pull from the in-Resolve panel: `py resolve/resolve_ctl.py inbox` (prints + marks-read
     the panel's pending instructions). Nothing pending and no `$ARGUMENTS` → tell you to
     type in the panel or here.
4. **Act** — run the matching `resolve_ctl.py` op(s) (append_clip / add_marker / delete_item /
   add_track / set_playhead / raw). One op per intent; verify each result.
5. **Report back** — summarize what changed, and if the instruction came from the panel push a
   reply: `py resolve/resolve_ctl.py reply "Done — <what you did>"` (the user sees it on the panel's Refresh).

Rules: use the `py` launcher. Read before you write. Never leave test artifacts on the real
timeline. If an op isn't supported by Resolve's API (moving an item, ripple-inserting a gap),
do it as delete + re-append and say so — don't claim a move you can't make.

Instruction (optional): $ARGUMENTS
