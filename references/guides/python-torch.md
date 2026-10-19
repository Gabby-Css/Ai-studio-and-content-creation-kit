# Python + PyTorch + transformers — the engine room

**What it is:** Python is the language almost all the AI tools in this studio are written in. PyTorch (the `torch` package) is the math engine that actually *runs* every neural network here. `transformers` is the standard library of ready-made model designs plus a universal loader that fetches and starts them.

**Why it's in the pipeline / what job it does:** Think of these three as the engine under the hood — you never touch them directly, but nothing moves without them. When TribeV2 scores a video, when Whisper turns speech into text, or when VoxCPM speaks a line of voiceover, the model's "thinking" is really a pile of math, and PyTorch is what crunches that math. It runs on your CPU here, and automatically uses a GPU if one is present (faster). `transformers` is the helper that knows how to load each pretrained model so the tools don't have to reinvent that wiring.

**Where it lives:** These are open-source tools you install into your own project. To avoid version clashes, *each* big tool keeps its own private set of packages in a `.venv` folder (a "virtual environment" — an isolated, self-contained Python install you create with `python -m venv .venv`). So the voice tool gets its own `.venv`, the viral-analyser gets its own `.venv`, and so on — each isolated from the others.

Seeing 50+ supporting packages inside one of these is completely normal — a single model leans on many helpers.

**How to use it:** You don't run Python or PyTorch yourself. You run a *tool*, and the tool reaches into its own `.venv`, loads its model through `transformers`, and lets PyTorch do the heavy lifting. For example, when you ask VoxCPM for a voiceover, it quietly activates its own `.venv`, loads its speech model, and PyTorch generates the audio — no commands from you required.

**Complements:** Powers VoxCPM (voice), Whisper (transcription), and TribeV2 (viral analysis) — the shared foundation all three stand on.
