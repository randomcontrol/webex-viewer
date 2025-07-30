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
        const scripts = document.getElementsByTagName('script');
        let moduleScriptUrl = '';
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src && scripts[i].src.includes('webex-viewer-module.js')) {
                moduleScriptUrl = scripts[i].src;
                break;
            }
        }
        const basePath = moduleScriptUrl.substring(0, moduleScriptUrl.lastIndexOf('/') + 1);
        if (path.endsWith('.wasm')) return basePath + 'webex-viewer.wasm';
        if (path.endsWith('.data')) return basePath + 'webex-viewer.data';
        return prefix + path;
    },
    onRuntimeInitialized: function () {}
};

// - Define wasm_i() to send commands to the WASM module.
// - Supported "op" values:
//
//   - "open_scene":      d0=webex_url  / d1=""            / d2="".
//   - "close_scene":     d0=""         / d1=""            / d2="".
//   - "set_clear_color": d0=hex_color  / d1=""            / d2="".
//   - "apply_mtl":       d0=layer_name / d1=material_name / d2="".
window.webex_in = function (op, d0 = "", d1 = "", d2 = "") {
    if (Module.ccall) {
        Module.ccall('wasm_i', null, ['string', 'string', 'string', 'string'], [op, d0, d1, d2]);
    } else {
        console.error('Module.ccall not available yet');
    }
};

/*
// - Define wasm_o() to receive callbacks from the WASM module.
// - Supported "op" values:
//
//   - "open_scene_starting": d0=filename / d1="" / d2="".
//   - "open_scene_progress": d0=0..100   / d1="" / d2="".
//   - "open_scene_complete": d0=""       / d1="" / d2="".
window.wasm_o = function (op, d0, d1, d2) {
    console.log('[wasm_o]', op, d0, d1, d2);
};
*/

window.webex_parse_query_string = function (qstr) {
    const params_obj = {};
    const params = new URLSearchParams(qstr);
    for (const [key, value] of params) {
        params_obj[key] = value.replace(/^'|'$/g, '');
    }
    return params_obj;
};

window.webex_parse_query_string_url = function (params) {
    let theurl = '';
    if ('fileid' in params) {
        let cf_fileid = params.fileid;
        let cf_cors = 'https://api-v2-o65v3sebrq-uc.a.run.app/cors?url=';
        let cf_uri = encodeURIComponent('https://drive.google.com/uc?export=download&id=' + cf_fileid);
        theurl = (cf_cors + cf_uri);
    }
    else if ('url' in params) {
        const https = 'https://';
        theurl = params.url;
        if (!theurl.startsWith(https)) {
            theurl = (https + theurl);
        }
    }
    return theurl;
};

/*
window.webex_parse_query_Module_json = function (qstr) {
    // qstr: window.location.search.
    const params = webex_parse_query_string(qstr);
    const theurl = webex_parse_query_string_url(params);
    return {
        'set_clear_color': 'white',
        'open_scene': theurl,
    };
};
*/