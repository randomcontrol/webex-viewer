# Maverick Excelsior Viewer

A high-performance WebAssembly-based 3D viewer for interactive real-time visualization of jewelry and products created with Maverick Excelsior.

## Overview

This repository contains a pre-packaged WebAssembly viewer component for rendering interactive 3D models with real-time material customization, advanced lighting, and photorealistic quality. The viewer supports WebGL 2.0 and provides professional-grade visualization capabilities.

## Installation

### Via CDN (Recommended)

```html
<script src="https://cdn.jsdelivr.net/gh/randomcontrol/webex-viewer@latest/webex-viewer-module.js"></script>
```

For a specific version:
```html
<script src="https://cdn.jsdelivr.net/gh/randomcontrol/webex-viewer@v1.0.1/webex-viewer-module.js"></script>
```

## Basic Usage

```javascript
webex_viewer.init({
    cdn_base: 'https://cdn.jsdelivr.net/gh/randomcontrol/webex-viewer@latest',
    scripts: {
        module: 'webex-viewer-module.js',
        viewer: 'webex-viewer.js'
    }
});
```

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

Read `LICENSE.md` for details.