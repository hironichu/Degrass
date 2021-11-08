

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
};

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
* @param {string} p
* @param {string} format
* @returns {string}
*/
export function grass(p, format) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        var ptr0 = passStringToWasm0(p, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(format, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.grass(retptr, ptr0, len0, ptr1, len1);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(r0, r1);
    }
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

const imports = {
    __wbindgen_placeholder__: {
        __wbindgen_string_new: function(arg0, arg1) {
            var ret = getStringFromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbg_randomFillSync_64cc7d048f228ca8: function() { return handleError(function (arg0, arg1, arg2) {
            getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
        }, arguments) },
        __wbindgen_object_drop_ref: function(arg0) {
            takeObject(arg0);
        },
        __wbg_getRandomValues_98117e9a7e993920: function() { return handleError(function (arg0, arg1) {
            getObject(arg0).getRandomValues(getObject(arg1));
        }, arguments) },
        __wbg_process_2f24d6544ea7b200: function(arg0) {
            var ret = getObject(arg0).process;
            return addHeapObject(ret);
        },
        __wbindgen_is_object: function(arg0) {
            const val = getObject(arg0);
            var ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg_versions_6164651e75405d4a: function(arg0) {
            var ret = getObject(arg0).versions;
            return addHeapObject(ret);
        },
        __wbg_node_4b517d861cbcb3bc: function(arg0) {
            var ret = getObject(arg0).node;
            return addHeapObject(ret);
        },
        __wbindgen_is_string: function(arg0) {
            var ret = typeof(getObject(arg0)) === 'string';
            return ret;
        },
        __wbg_modulerequire_3440a4bcf44437db: function() { return handleError(function (arg0, arg1) {
            var ret = module.require(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        }, arguments) },
        __wbg_crypto_98fc271021c7d2ad: function(arg0) {
            var ret = getObject(arg0).crypto;
            return addHeapObject(ret);
        },
        __wbg_msCrypto_a2cdb043d2bfe57f: function(arg0) {
            var ret = getObject(arg0).msCrypto;
            return addHeapObject(ret);
        },
        __wbg_newnoargs_be86524d73f67598: function(arg0, arg1) {
            var ret = new Function(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        },
        __wbg_call_888d259a5fefc347: function() { return handleError(function (arg0, arg1) {
            var ret = getObject(arg0).call(getObject(arg1));
            return addHeapObject(ret);
        }, arguments) },
        __wbindgen_object_clone_ref: function(arg0) {
            var ret = getObject(arg0);
            return addHeapObject(ret);
        },
        __wbg_self_c6fbdfc2918d5e58: function() { return handleError(function () {
            var ret = self.self;
            return addHeapObject(ret);
        }, arguments) },
        __wbg_window_baec038b5ab35c54: function() { return handleError(function () {
            var ret = window.window;
            return addHeapObject(ret);
        }, arguments) },
        __wbg_globalThis_3f735a5746d41fbd: function() { return handleError(function () {
            var ret = globalThis.globalThis;
            return addHeapObject(ret);
        }, arguments) },
        __wbg_global_1bc0b39582740e95: function() { return handleError(function () {
            var ret = global.global;
            return addHeapObject(ret);
        }, arguments) },
        __wbindgen_is_undefined: function(arg0) {
            var ret = getObject(arg0) === undefined;
            return ret;
        },
        __wbg_buffer_397eaa4d72ee94dd: function(arg0) {
            var ret = getObject(arg0).buffer;
            return addHeapObject(ret);
        },
        __wbg_new_a7ce447f15ff496f: function(arg0) {
            var ret = new Uint8Array(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_set_969ad0a60e51d320: function(arg0, arg1, arg2) {
            getObject(arg0).set(getObject(arg1), arg2 >>> 0);
        },
        __wbg_length_1eb8fc608a0d4cdb: function(arg0) {
            var ret = getObject(arg0).length;
            return ret;
        },
        __wbg_newwithlength_929232475839a482: function(arg0) {
            var ret = new Uint8Array(arg0 >>> 0);
            return addHeapObject(ret);
        },
        __wbg_subarray_8b658422a224f479: function(arg0, arg1, arg2) {
            var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
            return addHeapObject(ret);
        },
        __wbindgen_throw: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_rethrow: function(arg0) {
            throw takeObject(arg0);
        },
        __wbindgen_memory: function() {
            var ret = wasm.memory;
            return addHeapObject(ret);
        },
    },

};

const wasm_url = new URL('grass_bg.wasm', import.meta.url);
let wasmCode = '';
switch (wasm_url.protocol) {
    case 'file:':
    wasmCode = await Deno.readFile(wasm_url);
    break
    case 'https:':
    case 'http:':
    wasmCode = await (await fetch(wasm_url)).arrayBuffer();
    break
    default:
    throw new Error(`Unsupported protocol: ${wasm_url.protocol}`);
    break
}

const wasmInstance = (await WebAssembly.instantiate(wasmCode, imports)).instance;
const wasm = wasmInstance.exports;
