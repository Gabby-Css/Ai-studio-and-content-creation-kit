# Unreal Engine — optional recipient setup

The kit includes adapter scripts, not an Unreal installation, compiled editor plugin, project, or running bridge. Use this lane only after configuring a compatible editor and bridge on your own machine. Hardware needs, build times, supported engine versions, and licensing depend on the components you choose.

## Included files

- `pipeline/bin/unreal.cjs`: HTTP tool caller. It uses `UNREAL_URL`, defaulting to `http://localhost:3000`, and requests `/mcp/tool/<tool>`.
- `pipeline/unreal/ue.cjs`: additional scene-control helper; inspect its expected bridge protocol before use.
- `pipeline/unreal/scene-office.py` and `pipeline/unreal/import-assets.py`: example editor scripts. Review and adapt them to your project and owned/licensed assets.

The UnrealClaude plugin and its MCP bridge are external dependencies. Source names in old workflow examples are not proof of compatibility or an installed configuration.

## Configure your environment

1. Choose a supported Unreal version and obtain it through the official distribution. Review its terms and the requirements of your chosen plugin.
2. Install the platform build tools required by that engine/plugin if compiling C++ components. Do not assume a particular Visual Studio, SDK, or compiler version is compatible.
3. Create a test project in a location suitable for your editor and backup workflow. Do not use a production project for the first bridge test.
4. Obtain and inspect a compatible editor plugin/bridge. Follow its own installation, build, port, authentication, and tool-registration instructions.
5. Configure the bridge to listen on loopback and avoid exposing an unauthenticated editor-control service to a network. Set `UNREAL_URL` if its address differs from the adapter default.
6. Open the editor and test the bridge's own status/read-only endpoint. Match the endpoint schema to the included adapter before sending commands.

No plugin is copied, compiled, registered, launched, or connected merely by extracting the kit.

## Read-only smoke test

After confirming your bridge supports this tool and protocol, run from the extracted kit root:

```bash
node pipeline/bin/unreal.cjs get_level_actors '{}'
```

Inspect the response and confirm it identifies your test project. A connection failure means setup is incomplete; it does not authorize a fallback to a different project or remote endpoint.

For agent/MCP use, register the external bridge using the configuration documented by that bridge and your agent host. Use your own absolute installation path and credentials where required; there is no preinstalled global configuration in this package. Hosted agents may send project context to their provider and may charge.

## Production workflow

Prepare licensed assets → build a scene in the test project → inspect a preview → configure Sequencer/Movie Render Queue → export footage → assemble it using `longform/docs/README.md` or `pipeline/generators/remotion/README.md`.

Back up projects before commands that spawn, move, delete, import, or render assets. Verify the resulting frames, duration, color, and audio. This guide makes no claim that any particular editor/plugin pair compiles, is live, or meets a speed or visual-quality target.
