// WebEx Viewer Module
// https://github.com/randomcontrol/webex-viewer
//
// API key for domain verification.
// A wrong key or an access from a non-verified domain will cause the viewer to blink.
// You may have to add https://api.maverickexcelsior.com to your server's CSP.
window.WEBEX_API_KEY = window.WEBEX_API_KEY || '';

// Viewer base path (auto-detected from script URL if not set).
window.g_webex_basedir = window.g_webex_basedir || (function () {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scripts[i].src.includes('webex-viewer-module.js')) {
            return scripts[i].src.substring(0, scripts[i].src.lastIndexOf('/') + 1);
        }
    }
    return './';
})();

window.Module = {
    canvas_id: 'canvas-viewer',
    canvas: null,
    preRun: [function () {
        Module.canvas = document.getElementById(Module.canvas_id);
        if (!Module.canvas) {
            console.warn('Viewer canvas not found: ', Module.canvas_id);
        }
    }],
    postRun: [],
    locateFile: function (path, prefix) {
        const basedir = window.g_webex_basedir;
        // Strip version number from filename (e.g., webex-viewer-121250.wasm -> webex-viewer.wasm).
        const stripped = path.replace(/webex-viewer-\d+\./, 'webex-viewer.');
        if (path.endsWith('.wasm')) { return basedir + stripped; }
        if (path.endsWith('.data')) { return basedir + stripped; }
        return prefix + path;
    },
    json: {
        api_key: window.WEBEX_API_KEY
    },
    onRuntimeInitialized: function () { }
};

// Send commands to the WASM module.
// Refer to the Viewer API documentation for the full list of supported commands.
window.wasm_i = function (op, d0 = "", d1 = "", d2 = "") {
    if (Module.ccall) {
        Module.ccall('wasm_i', null, ['string', 'string', 'string', 'string'], [op, d0, d1, d2]);
    } else {
        console.error('Module.ccall not available yet');
    }
};

// Receive callbacks from the WASM module (dispatched as CustomEvent).
// Refer to the Viewer API documentation for the full list of callback events.
window.addEventListener('wasm_o', function (e) {
    var detail = e.detail;
    var op = detail.op, d0 = detail.d0, d1 = detail.d1, d2 = detail.d2;
    // Forward to window.wasm_o function if defined (legacy compatibility).
    if (typeof window.wasm_o === 'function') {
        window.wasm_o(op, d0, d1, d2);
    }
});
