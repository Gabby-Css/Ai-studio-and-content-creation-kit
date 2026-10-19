#!/usr/bin/env python3
"""
resolve_lib.py -- live connection + timeline operations for the Claude <-> DaVinci
Resolve bridge.

This is the shared engine. It connects to an ALREADY-RUNNING DaVinci Resolve via the
first-party DaVinciResolveScript API, performs one operation, and returns a plain dict.
No server, no daemon, no watchdog -- an external process (resolve_ctl.py, driven by
Claude Code) imports this, calls dispatch(name, args), and exits. Because Resolve stays
open, connecting fresh each call is sub-second.

Object model: Resolve -> ProjectManager -> Project -> {MediaPool, Timeline -> TimelineItem}.

Requires (one-time): Resolve open + Preferences > System > General >
"External scripting using" = Local.
"""

import importlib
import os
import sys

# --- Resolve scripting environment -------------------------------------------
def seed_env():
    """Set the standard Blackmagic scripting env vars if not already present."""
    program_data = os.environ.get("PROGRAMDATA", r"C:\ProgramData")
    program_files = os.environ.get("PROGRAMFILES", r"C:\Program Files")
    api = os.environ.get("RESOLVE_SCRIPT_API") or os.path.join(
        program_data, "Blackmagic Design", "DaVinci Resolve", "Support", "Developer", "Scripting"
    )
    lib = os.environ.get("RESOLVE_SCRIPT_LIB") or os.path.join(
        program_files, "Blackmagic Design", "DaVinci Resolve", "fusionscript.dll"
    )
    os.environ["RESOLVE_SCRIPT_API"] = api
    os.environ["RESOLVE_SCRIPT_LIB"] = lib
    modules = os.path.join(api, "Modules")
    if modules not in sys.path:
        sys.path.append(modules)


def connect():
    """Return a live Resolve handle (raises with a clear message if unreachable)."""
    seed_env()
    try:
        bmd = importlib.import_module("DaVinciResolveScript")
    except Exception as e:
        raise RuntimeError(
            "Could not import DaVinciResolveScript. Check RESOLVE_SCRIPT_API points at "
            "the Blackmagic Scripting folder and you're on 64-bit Python. Details: %s" % e
        )
    resolve = bmd.scriptapp("Resolve")
    if resolve is None:
        raise RuntimeError(
            "Resolve handle is None. Is DaVinci Resolve running with External scripting "
            "enabled? (Preferences > System > General > External scripting using = Local)"
        )
    return resolve


def context(require_timeline=False):
    """Fresh Resolve -> project -> timeline -> media_pool chain."""
    resolve = connect()
    pm = resolve.GetProjectManager()
    project = pm.GetCurrentProject() if pm else None
    if not project:
        raise RuntimeError("No project is open in Resolve.")
    timeline = project.GetCurrentTimeline()
    if require_timeline and not timeline:
        raise RuntimeError("No timeline is open. Open a timeline in Resolve.")
    media_pool = project.GetMediaPool()
    return resolve, pm, project, timeline, media_pool


def fps_of(project, timeline):
    for src in (timeline, project):
        if not src:
            continue
        try:
            v = src.GetSetting("timelineFrameRate")
            if v:
                return float(v)
        except Exception:
            pass
    return 24.0


# --- Media pool enumeration --------------------------------------------------
def _flatten_media(folder, out, path=""):
    if not folder:
        return
    name = folder.GetName() if hasattr(folder, "GetName") else ""
    here = ("%s/%s" % (path, name)).strip("/")
    try:
        for clip in folder.GetClipList() or []:
            out.append((clip, here))
    except Exception:
        pass
    try:
        for sub in folder.GetSubFolderList() or []:
            _flatten_media(sub, out, here)
    except Exception:
        pass


def media_items(media_pool):
    out = []
    try:
        _flatten_media(media_pool.GetRootFolder(), out)
    except Exception:
        pass
    return out


def pick_media(media_pool, media_index=None, media_name=None):
    items = media_items(media_pool)
    if media_index is not None and 0 <= int(media_index) < len(items):
        return items[int(media_index)][0]
    if media_name:
        low = str(media_name).lower()
        for clip, _ in items:  # exact match first
            if clip.GetName().lower() == low:
                return clip
        for clip, _ in items:  # then substring
            if low in clip.GetName().lower():
                return clip
    return None


# --- Result helpers ----------------------------------------------------------
def ok(message, data=None):
    return {"success": True, "message": message, "data": data or {}}


def err(message, data=None):
    return {"success": False, "message": message, "data": data or {}}


def tc_to_frames(timecode, fps):
    """HH:MM:SS:FF -> integer frame count."""
    h, m, s, f = (int(x) for x in str(timecode).replace(";", ":").split(":"))
    return int(round((h * 3600 + m * 60 + s) * fps)) + f


def secs_to_frames(seconds, fps):
    return int(round(float(seconds) * fps))


# --- Tool handlers -----------------------------------------------------------
def tool_status(_args):
    resolve, pm, project, timeline, media_pool = context()
    data = {
        "connected": True,
        "product": resolve.GetProductName() if hasattr(resolve, "GetProductName") else None,
        "version": resolve.GetVersionString() if hasattr(resolve, "GetVersionString") else None,
        "project": project.GetName(),
        "timeline": timeline.GetName() if timeline else None,
        "fps": fps_of(project, timeline),
        "resolution": {
            "width": project.GetSetting("timelineResolutionWidth"),
            "height": project.GetSetting("timelineResolutionHeight"),
        },
        "media_pool_items": len(media_items(media_pool)),
    }
    return ok("Connected to '%s'" % project.GetName(), data)


def _track_items(timeline, track_type):
    count = timeline.GetTrackCount(track_type) or 0
    tracks = []
    for i in range(1, count + 1):
        items = []
        for it in timeline.GetItemListInTrack(track_type, i) or []:
            try:
                items.append({
                    "name": it.GetName(), "start": it.GetStart(),
                    "end": it.GetEnd(), "duration": it.GetDuration(),
                })
            except Exception:
                pass
        tracks.append({
            "index": i,
            "name": timeline.GetTrackName(track_type, i) if hasattr(timeline, "GetTrackName") else "%s %d" % (track_type, i),
            "items": items,
        })
    return tracks


def tool_timeline_state(_args):
    resolve, pm, project, timeline, media_pool = context(require_timeline=True)
    data = {
        "timeline": timeline.GetName(),
        "fps": fps_of(project, timeline),
        "start_frame": timeline.GetStartFrame(),
        "end_frame": timeline.GetEndFrame(),
        "playhead_timecode": timeline.GetCurrentTimecode(),
        "video_tracks": _track_items(timeline, "video"),
        "audio_tracks": _track_items(timeline, "audio"),
    }
    return ok("Timeline '%s' state" % timeline.GetName(), data)


def tool_list_media(_args):
    resolve, pm, project, timeline, media_pool = context()
    out = []
    for idx, (clip, folder) in enumerate(media_items(media_pool)):
        try:
            out.append({
                "index": idx, "name": clip.GetName(), "folder": folder,
                "duration": clip.GetClipProperty("Duration"),
                "fps": clip.GetClipProperty("FPS"), "type": clip.GetClipProperty("Type"),
            })
        except Exception:
            pass
    return ok("%d media-pool item(s)" % len(out), {"items": out})


def tool_append_clip(args):
    """Place a media-pool item on the timeline. record_frame leaves a GAP before it."""
    resolve, pm, project, timeline, media_pool = context(require_timeline=True)
    clip = pick_media(media_pool, args.get("media_index"), args.get("media_name"))
    if not clip:
        return err("Media item not found. Call list_media to see indices/names.")

    fps = fps_of(project, timeline)
    clip_info = {"mediaPoolItem": clip}
    # Accept record_frame directly, or record_seconds / record_timecode for convenience.
    if args.get("record_frame") is not None:
        clip_info["recordFrame"] = int(args["record_frame"])
    elif args.get("record_seconds") is not None:
        clip_info["recordFrame"] = timeline.GetStartFrame() + secs_to_frames(args["record_seconds"], fps)
    elif args.get("record_timecode") is not None:
        clip_info["recordFrame"] = tc_to_frames(args["record_timecode"], fps)
    for k_in, k_api in (("start_frame", "startFrame"), ("end_frame", "endFrame"), ("track_index", "trackIndex")):
        if args.get(k_in) is not None:
            clip_info[k_api] = int(args[k_in])
    if args.get("media_type") is not None:
        clip_info["mediaType"] = int(args["media_type"])  # 1=video, 2=audio

    appended = media_pool.AppendToTimeline([clip_info])
    if not appended:
        return err("AppendToTimeline returned nothing. Check record_frame >= timeline start "
                   "and the clip in/out are valid.")
    placed = appended[0] if isinstance(appended, list) else appended
    data = {"name": clip.GetName()}
    try:
        data.update({"start": placed.GetStart(), "end": placed.GetEnd()})
    except Exception:
        pass
    rec = clip_info.get("recordFrame")
    note = (" at record frame %s (gap before it)" % rec) if rec is not None else " at playhead/end"
    return ok("Appended '%s'%s" % (clip.GetName(), note), data)


def tool_add_track(args):
    resolve, pm, project, timeline, media_pool = context(require_timeline=True)
    track_type = args.get("track_type", "video")
    if not timeline.AddTrack(track_type):
        return err("AddTrack(%s) failed." % track_type)
    return ok("Added a %s track" % track_type, {"count": timeline.GetTrackCount(track_type)})


def tool_delete_item(args):
    resolve, pm, project, timeline, media_pool = context(require_timeline=True)
    if not hasattr(timeline, "DeleteClips"):
        return err("This Resolve version lacks Timeline.DeleteClips (needs 18.1+).")
    track_type = args.get("track_type", "video")
    track_index = int(args.get("track_index", 1))
    items = timeline.GetItemListInTrack(track_type, track_index) or []
    if not items:
        return err("No items on %s track %d." % (track_type, track_index))
    pos = args.get("item_index")
    if pos is None:
        targets = items
    elif 0 <= int(pos) < len(items):
        targets = [items[int(pos)]]
    else:
        return err("item_index %s out of range (0..%d)." % (pos, len(items) - 1))
    ripple = bool(args.get("ripple", False))
    timeline.DeleteClips(targets, ripple)
    return ok("Deleted %d item(s) from %s track %d" % (len(targets), track_type, track_index), {"ripple": ripple})


def tool_add_marker(args):
    resolve, pm, project, timeline, media_pool = context(require_timeline=True)
    fps = fps_of(project, timeline)
    if args.get("frame") is not None:
        frame = int(args["frame"])
    elif args.get("timecode") is not None:
        frame = tc_to_frames(args["timecode"], fps)
    else:
        frame = timeline.GetStartFrame()
    color = args.get("color", "Blue")
    if not timeline.AddMarker(frame, color, args.get("name", ""), args.get("note", ""),
                              int(args.get("duration", 1)), args.get("custom_data", "")):
        return err("AddMarker at frame %d failed (a marker may already exist there)." % frame)
    return ok("Added %s marker at frame %d" % (color, frame), {"frame": frame})


def tool_set_playhead(args):
    resolve, pm, project, timeline, media_pool = context(require_timeline=True)
    tc = args.get("timecode")
    if not tc:
        return err("Provide 'timecode' as HH:MM:SS:FF.")
    if not timeline.SetCurrentTimecode(str(tc)):
        return err("SetCurrentTimecode(%s) failed. Use HH:MM:SS:FF within timeline range." % tc)
    return ok("Playhead -> %s" % tc, {"timecode": timeline.GetCurrentTimecode()})


def tool_rebuild_tight(args):
    """Rebuild the timeline WITHOUT silence by re-appending only speech sub-segments.
    Goes around Resolve's missing blade/split API: reads a segment list
    [{path,in_frame,out_frame}], resolves each source path to its MediaPoolItem, creates a
    NEW timeline (original untouched = reversible), and AppendToTimeline's every segment
    back-to-back. args: {segments_file, timeline_name}."""
    resolve, pm, project, timeline, media_pool = context(require_timeline=True)
    seg_path = args.get("segments_file") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "sc_segments.json")
    if not os.path.exists(seg_path):
        return err("segments file not found: %s" % seg_path)
    with open(seg_path, "r", encoding="utf-8") as fh:
        data = __import__("json").load(fh)
    segments = data.get("segments", [])
    if not segments:
        return err("no segments to rebuild.")

    # Resolve each unique source path -> MediaPoolItem once (avoid per-clip lookups).
    by_path = {}
    for clip, _folder in media_items(media_pool):
        try:
            p = clip.GetClipProperty("File Path")
            if p and p not in by_path:
                by_path[p] = clip
        except Exception:
            pass
    missing = sorted({s["path"] for s in segments if s["path"] not in by_path})
    if missing:
        return err("media pool missing %d source(s): %s" % (len(missing), ", ".join(os.path.basename(m) for m in missing)))

    name = args.get("timeline_name") or (timeline.GetName() + " (tight)")
    new_tl = media_pool.CreateEmptyTimeline(name)
    if not new_tl:
        return err("CreateEmptyTimeline('%s') failed (name may already exist)." % name)

    clip_infos = [{"mediaPoolItem": by_path[s["path"]],
                   "startFrame": int(s["in_frame"]), "endFrame": int(s["out_frame"])} for s in segments]
    appended = media_pool.AppendToTimeline(clip_infos)
    n = len(appended) if isinstance(appended, list) else (1 if appended else 0)
    kept = sum(s["out_frame"] - s["in_frame"] for s in segments)
    fps = fps_of(project, timeline) or 59.94
    return ok("Rebuilt '%s': appended %d/%d speech segments (~%.1fs, cut %.1fs silence)."
              % (name, n, len(segments), kept / fps, data.get("cut_frames", 0) / fps),
              {"timeline": name, "appended": n, "segments": len(segments)})


def tool_raw(args):
    """Escape hatch: eval a read/traverse Resolve API expression. Token-guarded."""
    expr = args.get("expr", "")
    if not expr:
        return err("Provide 'expr'.")
    banned = ("import", "__", "open(", "exec(", "eval(", "os.", "sys.", "subprocess", "remove", "rmtree")
    if any(b in expr for b in banned):
        return err("Expression rejected (contains a disallowed token).")
    resolve, pm, project, timeline, media_pool = context()
    scope = {"resolve": resolve, "pm": pm, "project": project, "timeline": timeline, "media_pool": media_pool}
    return ok("ok", {"value": eval(expr, {"__builtins__": {}}, scope)})  # noqa: S307


def tool_exec(args):
    """FULL-AUTHORITY escape hatch. Runs an arbitrary Python body with the live Resolve
    handles in scope and full builtins — no token filtering. Set the result via `result =`
    (or the last expression). This is the 'do anything to Resolve' tool for the MCP layer;
    it is loopback-only and gated by the caller, not by a denylist."""
    body = args.get("code") or args.get("expr")
    if not body:
        return err("Provide 'code' (a Python body; set result=...) or 'expr'.")
    resolve, pm, project, timeline, media_pool = context()
    import json as _json, os as _os, sys as _sys, re as _re, subprocess as _sub
    scope = {"resolve": resolve, "pm": pm, "project": project, "timeline": timeline,
             "media_pool": media_pool, "json": _json, "os": _os, "sys": _sys, "re": _re,
             "subprocess": _sub, "result": None}
    if "expr" in args and "code" not in args:
        scope["result"] = eval(body, scope)  # noqa: S307
    else:
        exec(body, scope)  # noqa: S102
    val = scope.get("result")
    try:
        _json.dumps(val, default=str)
    except Exception:
        val = str(val)
    return ok("exec ok", {"result": val})


TOOLS = {
    "status": tool_status,
    "timeline_state": tool_timeline_state,
    "list_media": tool_list_media,
    "append_clip": tool_append_clip,
    "add_track": tool_add_track,
    "delete_item": tool_delete_item,
    "add_marker": tool_add_marker,
    "set_playhead": tool_set_playhead,
    "rebuild_tight": tool_rebuild_tight,
    "raw": tool_raw,
    "exec": tool_exec,
}


def dispatch(name, args):
    """Run one tool by name. Never raises: returns {success, message, data}."""
    fn = TOOLS.get(name)
    if not fn:
        return err("Unknown tool '%s'. Known: %s" % (name, ", ".join(TOOLS)))
    try:
        return fn(args or {})
    except Exception as e:
        return err(str(e))
