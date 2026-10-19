# VoxCPM — optional local voiceover

VoxCPM is an external text-to-speech option, not a preinstalled engine in this package. Install a compatible upstream release, its Python dependencies, and model weights in your own environment. Verify model licensing, reference-voice consent, storage, and hardware requirements.

Follow `voice/VOXCPM-GUIDE.md` for the delivery boundary and workflow. There is no bundled local voice environment or inherited CPU/GPU status. Do not assume a particular model size, language count, sample rate, speed, or voice-quality result without checking the selected version.

The scripts in `voice/` call ElevenLabs using recipient credentials; they are hosted alternatives, not local VoxCPM wrappers. Hosted calls submit narration to the provider and may charge. Local inference also consumes compute and may need network downloads during setup.

Export and review your narration, then use the transcription and assembly tools. See `LICENSES.md`.
