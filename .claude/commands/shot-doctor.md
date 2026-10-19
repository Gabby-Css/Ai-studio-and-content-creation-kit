---
description: "SHOT DOCTOR — pre-render hook/retention check for the video studio. Scores the planned HOOK + opening beats BEFORE rendering (vidIQ + Higgsfield virality_predictor as advisory + the TribeV2 logic moved upstream) so we never burn a render on a dud. Fixes the weak beat, then hands the locked plan to /video-prompt. 'add skills … to help prompting and much more.'"
---

# /shot-doctor — diagnose the hook before you render

The studio already gates FINISHED videos at **TribeV2 ≥ 60** ([[video-studio]]). Shot Doctor moves that judgment **upstream to the plan**:
a render costs minutes (and Unreal/AI passes cost more), so score the hook and opening 3 seconds while they're still cheap text.

## Run

1. **Pull the candidate hook + first 3 beats** from the brief or `/video-prompt` output (the first frame, the first line, the first motion).
2. **Score it (advisory, pick what's available):**
   - `vidiq_generate_titles` + `vidiq_score_title` (short-form) → CTR potential of the spoken/on-screen hook; keep the top-scoring variant.
   - Higgsfield `virality_predictor` → hook strength / attention / retention-risk read on a still or storyboard frame (credits-aware — explicit ask).
   - TribeV2 logic at the plan stage: does beat 1 give an immediate visual PAYOFF (motion, reveal, contrast) in <1s, or does it ramp slowly?
3. **Diagnose the weak beat.** Common kills: slow ramp (no motion in frame 1), no AI-legibility (looks generic), buried payoff, palette mush,
   hook line that explains instead of provokes.
4. **Fix it, don't ship it.** Rewrite the hook line / re-block beat 1 (cold-open on the reveal, add an impact speed-ramp, raise detail density,
   sharpen the AI read). Re-score. Loop until the hook clears the bar.
5. **Lock + hand off.** Pass the fixed hook + beats to [[video-prompt]] to build the engine-ready prompt, then render.

## Gates & honesty
- External research/scoring is night-only ([[no-daytime-harvest]]); vidIQ/Higgsfield calls may cost credits — only on explicit ask, and say
  when a check was skipped rather than implying it passed ([[buyers-eye-verification]], §0-PRE).
- Advisory only — these tools **rank and diagnose**; the render still happens in our $0 engines. This is the cheap pre-flight, not the final gate
  (TribeV2 ≥ 60 on the finished cut still applies). Related: [[video-prompt]], [[render-frame-and-look-verify]].
