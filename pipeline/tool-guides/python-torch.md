# Python and model dependencies

Python runs the transcription wrapper and Resolve bridge. Optional local AI models may also require PyTorch, transformers, or other packages according to their selected upstream releases. Not every kit tool uses those libraries.

No Python environment, GPU driver, model cache, or `tools/` junction is preinstalled by extracting this package. Create isolated environments as appropriate, and install the versions documented for the tool you choose. Follow `transcribe/WHISPER-GUIDE.md`, `voice/VOXCPM-GUIDE.md`, or `resolve/README.md`.

CPU/GPU support is not automatic: it depends on model code, package build, driver/runtime compatibility, and available memory. Some workflows require explicit device configuration. Package/model downloads need network access; local inference consumes storage and compute. Hosted alternatives may send data externally and charge separately.

Use the interpreter from the correct environment when running a wrapper. Check a small input before starting a batch; there is no inherited installation state or performance guarantee. Review `LICENSES.md` and exact upstream terms.
