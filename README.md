# Maverick Excelsior WebEx Viewer

Browser-based WebAssembly 3D viewer for interactive fine-jewelry visualization.

## Install

Until the first npm-registry publication, npm can install an immutable GitHub
release directly:

```bash
npm install github:randomcontrol/webex-viewer#v1.6.15
```

Then import the typed ESM package:

```ts
import { WebexViewer } from '@randomcontrol/webex-viewer';

const viewer = await WebexViewer.mount({
  container: '#viewer',
  apiKey: 'ak_xxxxxxxxxxxxxxxx',
  scene: './scene.webex'
});

viewer.setMaterial('Metal 01', 'Yellow Gold 18k');
```

After the public npm package is published, installation becomes:

```bash
npm install @randomcontrol/webex-viewer
```

The package is ready for public publication with:

```bash
npm publish --access public
```

## CDN

Classic script-tag applications can use the immutable release directly:

```html
<div id="viewer"></div>
<script src="https://cdn.jsdelivr.net/gh/randomcontrol/webex-viewer@v1.6.15/webex-viewer.js"></script>
<script>
  WebexViewer.mount({
    container: '#viewer',
    apiKey: 'ak_xxxxxxxxxxxxxxxx',
    scene: './scene.webex'
  });
</script>
```

Native browser ESM is also available:

```js
import { WebexViewer } from
  'https://cdn.jsdelivr.net/gh/randomcontrol/webex-viewer@v1.6.15/webex-viewer.mjs';
```

## Package contents

- `webex-viewer.mjs` — ESM package entry.
- `webex-viewer.d.ts` — generated TypeScript declarations covering all 84
  accepted viewer protocol commands.
- `webex-viewer.js` — classic browser-global entry.
- `webex-viewer-engine.js` — private modular engine loader.
- `webex-viewer-engine.wasm` — WebAssembly engine.
- `webex-viewer-engine.data` — runtime assets.

The only public runtime class is `WebexViewer`. Emscripten `Module`, `wasm_i`,
and `wasm_o` are private implementation details and are not browser globals.

For self-hosting, copy the engine trio beside the selected JavaScript entry, or
pass an explicit `baseUrl`/`engine` when mounting.

## License

Read `LICENSE` for details.
