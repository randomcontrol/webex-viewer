# Maverick Excelsior Viewer

A high-performance WebAssembly-based 3D viewer for interactive real-time visualization of
fine jewelry. It runs in the browser, with nothing to install, on every device from phones
to workstations, leveraging WebGL 2.0 for photorealistic quality with real-time material
customization.

## Documentation

The full reference lives at
[docs.maverickexcelsior.com](https://docs.maverickexcelsior.com/viewer-sdk/index.html):
the messaging API, every scene property, the content library names, and a set of live,
view-source-friendly working examples.

## Installation

You need an API key (created in your
[Maverick Excelsior dashboard](https://maverickexcelsior.com/dashboard/api-keys) with a
Viewer SDK subscription; keys are locked to your domain), a canvas with the id
`canvas-viewer`, and the two runtime scripts. Define the key BEFORE the module script.

### Via CDN (recommended)

```html
<canvas id="canvas-viewer"></canvas>

<!-- 0. Your API key (must be defined before the module script). -->
<script> window.WEBEX_API_KEY = 'ak_xxxxxxxxxxxxxxxx'; </script>

<!-- 1. Module config. -->
<script src="https://cdn.jsdelivr.net/gh/randomcontrol/webex-viewer@v1.6.1/webex-viewer-module.js"></script>

<!-- 2. Your app logic. -->
<script src="js/app.js"></script>

<!-- 3. Boot the WASM. -->
<script src="https://cdn.jsdelivr.net/gh/randomcontrol/webex-viewer@v1.6.1/webex-viewer.js"></script>
```

Pin both scripts to the same release tag: the module and the loader travel as a pair. The
module fetches its `.wasm` and `.data` companions from the same folder automatically.

### Self-hosted

Download the four runtime files from this repository, place them in a folder of your site,
and reference the two scripts with relative paths. The module auto-detects its folder.

## Basic usage

Your `app.js` sets the startup values and talks to the viewer over two string channels:
`wasm_i(op, d0, d1, d2)` to send commands, and `CustomEvent('wasm_o')` on `window` to
receive events.

```javascript
// Scene to load at boot (relative to your page, or a full URL).
window.Module.json.open_scene = './scenes/scene.webex';
window.Module.json.set_clear_color = 'white';

window.addEventListener('wasm_o', function (e) {
  if (e.detail.op === 'open_scene_complete') {
    wasm_i('apply_mtl', 'Metal 01', 'Yellow Gold 18k');
    wasm_i('set_quality', 'ultra');
  }
});
```

See the [working examples](https://docs.maverickexcelsior.com/viewer-sdk/viewer-api.html#working-examples)
for complete, annotated pages: a material switcher, a multi-part configurator, a CDN embed,
and an iframe embed.

## Features

- Real-time 3D model rendering with WebGL 2.0.
- Interactive camera controls (rotate, pan, zoom).
- Dynamic material customization.
- Multiple quality presets (Medium, High, Ultra).
- Adjustable rendering resolution.
- Fullscreen mode support.
- Touch and mouse interaction.
- Mobile-optimized performance.
- Share functionality for collaborative viewing.

## Files

- `webex-viewer-module.js` - Runtime configuration and initialization.
- `webex-viewer.js` - JavaScript glue code.
- `webex-viewer.wasm` - Compiled WebAssembly binary.
- `webex-viewer.data` - Preloaded viewer data.
- `version.txt` - Current version tracking.

## License

Read `LICENSE` for details.
