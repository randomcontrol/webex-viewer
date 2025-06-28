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
        const basedir = window.g_webex_basedir || './js/components/';
        if (path.endsWith('.wasm')) { return basedir + path; }
        if (path.endsWith('.data')) { return basedir + path; }
        return prefix + path;
    },
    onRuntimeInitialized: function () {
        console.log('WebAssembly runtime initialized');
    }
};

window.webex_in = function (op, d0 = "", d1 = "", d2 = "") {
    if (Module.ccall) {
        Module.ccall('wasm_i', null, ['string', 'string', 'string', 'string'], [op, d0, d1, d2]);
    } else {
        console.error('Module.ccall not available yet');
    }
};

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

window.webex_parse_query_Module_json = function (qstr) {
    const params = webex_parse_query_string(qstr);
    const theurl = webex_parse_query_string_url(params);
    return {
        'set_clear_color': 'white',
        'open_scene': theurl,
    };
};