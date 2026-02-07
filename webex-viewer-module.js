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
        if (path.endsWith('.wasm')) { return basedir + path; }
        if (path.endsWith('.data')) { return basedir + path; }
        return prefix + path;
    },
    json: {
        api_key: window.WEBEX_API_KEY
    },
    onRuntimeInitialized: function () { }
};

// Send commands to the WASM module:
//
//   - "open_scene":      d0=webex_url  / d1=""            / d2="".
//   - "close_scene":     d0=""         / d1=""            / d2="".
//   - "set_clear_color": d0=hex_color  / d1=""            / d2="".
//   - "apply_mtl":       d0=layer_name / d1=material_name / d2="".
//   - "set_autospin":    d0="0"|"1"    / d1=""            / d2="".
//   - "set_quality":     d0=quality    / d1=""            / d2="".
//   - "zoom":            d0="+1"|"-1"  / d1=""            / d2="".
//   - "resize":          d0=""         / d1=""            / d2="".
window.wasm_i = function (op, d0 = "", d1 = "", d2 = "") {
    if (Module.ccall) {
        Module.ccall('wasm_i', null, ['string', 'string', 'string', 'string'], [op, d0, d1, d2]);
    } else {
        console.error('Module.ccall not available yet');
    }
};

// Receive callbacks from the WASM module (dispatched as CustomEvent by C++):
//
//   - "open_scene_starting": d0=filename / d1="" / d2="".
//   - "open_scene_progress": d0=0..100   / d1="" / d2="".
//   - "open_scene_complete": d0=""       / d1="" / d2="".
window.addEventListener('wasm_o', function (e) {
    var detail = e.detail;
    var op = detail.op, d0 = detail.d0, d1 = detail.d1, d2 = detail.d2;
    // Forward to window.wasm_o function if defined (for nodejs-webex-viewer compatibility).
    if (typeof window.wasm_o === 'function') {
        window.wasm_o(op, d0, d1, d2);
    }
});
