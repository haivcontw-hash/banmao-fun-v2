(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/events/events.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
} else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target);
    };
}
function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function EventEmitter() {
    EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
    if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
        return defaultMaxListeners;
    },
    set: function(arg) {
        if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
        }
        defaultMaxListeners = arg;
    }
});
EventEmitter.init = function() {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for(var i = 1; i < arguments.length; i++)args.push(arguments[i]);
    var doError = type === 'error';
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;
    else if (!doError) return false;
    // If there is no 'error' event listener then throw.
    if (doError) {
        var er;
        if (args.length > 0) er = args[0];
        if (er instanceof Error) {
            // Note: The comments on the `throw` lines are intentional, they show
            // up in Node's output if this results in an unhandled exception.
            throw er; // Unhandled 'error' event
        }
        // At least give some kind of context to the user
        var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
        err.context = er;
        throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined) return false;
    if (typeof handler === 'function') {
        ReflectApply(handler, this, args);
    } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for(var i = 0; i < len; ++i)ReflectApply(listeners[i], this, args);
    }
    return true;
};
function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
            target.emit('newListener', type, listener.listener ? listener.listener : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] = prepend ? [
                listener,
                existing
            ] : [
                existing,
                listener
            ];
        // If we've already got an array, just append.
        } else if (prepend) {
            existing.unshift(listener);
        } else {
            existing.push(listener);
        }
        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
};
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type, listener) {
    var state = {
        fired: false,
        wrapFn: undefined,
        target: target,
        type: type,
        listener: listener
    };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
};
// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    checkListener(listener);
    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;
    if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) this._events = Object.create(null);
        else {
            delete events[type];
            if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
        }
    } else if (typeof list !== 'function') {
        position = -1;
        for(i = list.length - 1; i >= 0; i--){
            if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
            }
        }
        if (position < 0) return this;
        if (position === 0) list.shift();
        else {
            spliceOne(list, position);
        }
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
    }
    return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this;
    // not listening for removeListener, no need to emit
    if (events.removeListener === undefined) {
        if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
        } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0) this._events = Object.create(null);
            else delete events[type];
        }
        return this;
    }
    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for(i = 0; i < keys.length; ++i){
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
    }
    listeners = events[type];
    if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
    } else if (listeners !== undefined) {
        // LIFO order
        for(i = listeners.length - 1; i >= 0; i--){
            this.removeListener(type, listeners[i]);
        }
    }
    return this;
};
function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === 'function') return unwrap ? [
        evlistener.listener || evlistener
    ] : [
        evlistener
    ];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
    } else {
        return listenerCount.call(emitter, type);
    }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === 'function') {
            return 1;
        } else if (evlistener !== undefined) {
            return evlistener.length;
        }
    }
    return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
    var copy = new Array(n);
    for(var i = 0; i < n; ++i)copy[i] = arr[i];
    return copy;
}
function spliceOne(list, index) {
    for(; index + 1 < list.length; index++)list[index] = list[index + 1];
    list.pop();
}
function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for(var i = 0; i < ret.length; ++i){
        ret[i] = arr[i].listener || arr[i];
    }
    return ret;
}
function once(emitter, name) {
    return new Promise(function(resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === 'function') {
                emitter.removeListener('error', errorListener);
            }
            resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, {
            once: true
        });
        if (name !== 'error') {
            addErrorHandlerIfEventEmitter(emitter, errorListener, {
                once: true
            });
        }
    });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
        eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
        if (flags.once) {
            emitter.once(name, listener);
        } else {
            emitter.on(name, listener);
        }
    } else if (typeof emitter.addEventListener === 'function') {
        // EventTarget does not have `error` event semantics like Node
        // EventEmitters, we do not listen for `error` events here.
        emitter.addEventListener(name, function wrapListener(arg) {
            // IE does not have builtin `{ once: true }` support so we
            // have to do it manually.
            if (flags.once) {
                emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
        });
    } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function() {
    var e = {
        675: function(e, r) {
            "use strict";
            r.byteLength = byteLength;
            r.toByteArray = toByteArray;
            r.fromByteArray = fromByteArray;
            var t = [];
            var f = [];
            var n = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
            var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for(var o = 0, u = i.length; o < u; ++o){
                t[o] = i[o];
                f[i.charCodeAt(o)] = o;
            }
            f["-".charCodeAt(0)] = 62;
            f["_".charCodeAt(0)] = 63;
            function getLens(e) {
                var r = e.length;
                if (r % 4 > 0) {
                    throw new Error("Invalid string. Length must be a multiple of 4");
                }
                var t = e.indexOf("=");
                if (t === -1) t = r;
                var f = t === r ? 0 : 4 - t % 4;
                return [
                    t,
                    f
                ];
            }
            function byteLength(e) {
                var r = getLens(e);
                var t = r[0];
                var f = r[1];
                return (t + f) * 3 / 4 - f;
            }
            function _byteLength(e, r, t) {
                return (r + t) * 3 / 4 - t;
            }
            function toByteArray(e) {
                var r;
                var t = getLens(e);
                var i = t[0];
                var o = t[1];
                var u = new n(_byteLength(e, i, o));
                var a = 0;
                var s = o > 0 ? i - 4 : i;
                var h;
                for(h = 0; h < s; h += 4){
                    r = f[e.charCodeAt(h)] << 18 | f[e.charCodeAt(h + 1)] << 12 | f[e.charCodeAt(h + 2)] << 6 | f[e.charCodeAt(h + 3)];
                    u[a++] = r >> 16 & 255;
                    u[a++] = r >> 8 & 255;
                    u[a++] = r & 255;
                }
                if (o === 2) {
                    r = f[e.charCodeAt(h)] << 2 | f[e.charCodeAt(h + 1)] >> 4;
                    u[a++] = r & 255;
                }
                if (o === 1) {
                    r = f[e.charCodeAt(h)] << 10 | f[e.charCodeAt(h + 1)] << 4 | f[e.charCodeAt(h + 2)] >> 2;
                    u[a++] = r >> 8 & 255;
                    u[a++] = r & 255;
                }
                return u;
            }
            function tripletToBase64(e) {
                return t[e >> 18 & 63] + t[e >> 12 & 63] + t[e >> 6 & 63] + t[e & 63];
            }
            function encodeChunk(e, r, t) {
                var f;
                var n = [];
                for(var i = r; i < t; i += 3){
                    f = (e[i] << 16 & 16711680) + (e[i + 1] << 8 & 65280) + (e[i + 2] & 255);
                    n.push(tripletToBase64(f));
                }
                return n.join("");
            }
            function fromByteArray(e) {
                var r;
                var f = e.length;
                var n = f % 3;
                var i = [];
                var o = 16383;
                for(var u = 0, a = f - n; u < a; u += o){
                    i.push(encodeChunk(e, u, u + o > a ? a : u + o));
                }
                if (n === 1) {
                    r = e[f - 1];
                    i.push(t[r >> 2] + t[r << 4 & 63] + "==");
                } else if (n === 2) {
                    r = (e[f - 2] << 8) + e[f - 1];
                    i.push(t[r >> 10] + t[r >> 4 & 63] + t[r << 2 & 63] + "=");
                }
                return i.join("");
            }
        },
        72: function(e, r, t) {
            "use strict";
            /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ var f = t(675);
            var n = t(783);
            var i = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
            r.Buffer = Buffer;
            r.SlowBuffer = SlowBuffer;
            r.INSPECT_MAX_BYTES = 50;
            var o = 2147483647;
            r.kMaxLength = o;
            Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
            if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
                console.error("This browser lacks typed array (Uint8Array) support which is required by " + "`buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
            }
            function typedArraySupport() {
                try {
                    var e = new Uint8Array(1);
                    var r = {
                        foo: function() {
                            return 42;
                        }
                    };
                    Object.setPrototypeOf(r, Uint8Array.prototype);
                    Object.setPrototypeOf(e, r);
                    return e.foo() === 42;
                } catch (e) {
                    return false;
                }
            }
            Object.defineProperty(Buffer.prototype, "parent", {
                enumerable: true,
                get: function() {
                    if (!Buffer.isBuffer(this)) return undefined;
                    return this.buffer;
                }
            });
            Object.defineProperty(Buffer.prototype, "offset", {
                enumerable: true,
                get: function() {
                    if (!Buffer.isBuffer(this)) return undefined;
                    return this.byteOffset;
                }
            });
            function createBuffer(e) {
                if (e > o) {
                    throw new RangeError('The value "' + e + '" is invalid for option "size"');
                }
                var r = new Uint8Array(e);
                Object.setPrototypeOf(r, Buffer.prototype);
                return r;
            }
            function Buffer(e, r, t) {
                if (typeof e === "number") {
                    if (typeof r === "string") {
                        throw new TypeError('The "string" argument must be of type string. Received type number');
                    }
                    return allocUnsafe(e);
                }
                return from(e, r, t);
            }
            Buffer.poolSize = 8192;
            function from(e, r, t) {
                if (typeof e === "string") {
                    return fromString(e, r);
                }
                if (ArrayBuffer.isView(e)) {
                    return fromArrayLike(e);
                }
                if (e == null) {
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, " + "or Array-like Object. Received type " + typeof e);
                }
                if (isInstance(e, ArrayBuffer) || e && isInstance(e.buffer, ArrayBuffer)) {
                    return fromArrayBuffer(e, r, t);
                }
                if (typeof SharedArrayBuffer !== "undefined" && (isInstance(e, SharedArrayBuffer) || e && isInstance(e.buffer, SharedArrayBuffer))) {
                    return fromArrayBuffer(e, r, t);
                }
                if (typeof e === "number") {
                    throw new TypeError('The "value" argument must not be of type number. Received type number');
                }
                var f = e.valueOf && e.valueOf();
                if (f != null && f !== e) {
                    return Buffer.from(f, r, t);
                }
                var n = fromObject(e);
                if (n) return n;
                if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof e[Symbol.toPrimitive] === "function") {
                    return Buffer.from(e[Symbol.toPrimitive]("string"), r, t);
                }
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, " + "or Array-like Object. Received type " + typeof e);
            }
            Buffer.from = function(e, r, t) {
                return from(e, r, t);
            };
            Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
            Object.setPrototypeOf(Buffer, Uint8Array);
            function assertSize(e) {
                if (typeof e !== "number") {
                    throw new TypeError('"size" argument must be of type number');
                } else if (e < 0) {
                    throw new RangeError('The value "' + e + '" is invalid for option "size"');
                }
            }
            function alloc(e, r, t) {
                assertSize(e);
                if (e <= 0) {
                    return createBuffer(e);
                }
                if (r !== undefined) {
                    return typeof t === "string" ? createBuffer(e).fill(r, t) : createBuffer(e).fill(r);
                }
                return createBuffer(e);
            }
            Buffer.alloc = function(e, r, t) {
                return alloc(e, r, t);
            };
            function allocUnsafe(e) {
                assertSize(e);
                return createBuffer(e < 0 ? 0 : checked(e) | 0);
            }
            Buffer.allocUnsafe = function(e) {
                return allocUnsafe(e);
            };
            Buffer.allocUnsafeSlow = function(e) {
                return allocUnsafe(e);
            };
            function fromString(e, r) {
                if (typeof r !== "string" || r === "") {
                    r = "utf8";
                }
                if (!Buffer.isEncoding(r)) {
                    throw new TypeError("Unknown encoding: " + r);
                }
                var t = byteLength(e, r) | 0;
                var f = createBuffer(t);
                var n = f.write(e, r);
                if (n !== t) {
                    f = f.slice(0, n);
                }
                return f;
            }
            function fromArrayLike(e) {
                var r = e.length < 0 ? 0 : checked(e.length) | 0;
                var t = createBuffer(r);
                for(var f = 0; f < r; f += 1){
                    t[f] = e[f] & 255;
                }
                return t;
            }
            function fromArrayBuffer(e, r, t) {
                if (r < 0 || e.byteLength < r) {
                    throw new RangeError('"offset" is outside of buffer bounds');
                }
                if (e.byteLength < r + (t || 0)) {
                    throw new RangeError('"length" is outside of buffer bounds');
                }
                var f;
                if (r === undefined && t === undefined) {
                    f = new Uint8Array(e);
                } else if (t === undefined) {
                    f = new Uint8Array(e, r);
                } else {
                    f = new Uint8Array(e, r, t);
                }
                Object.setPrototypeOf(f, Buffer.prototype);
                return f;
            }
            function fromObject(e) {
                if (Buffer.isBuffer(e)) {
                    var r = checked(e.length) | 0;
                    var t = createBuffer(r);
                    if (t.length === 0) {
                        return t;
                    }
                    e.copy(t, 0, 0, r);
                    return t;
                }
                if (e.length !== undefined) {
                    if (typeof e.length !== "number" || numberIsNaN(e.length)) {
                        return createBuffer(0);
                    }
                    return fromArrayLike(e);
                }
                if (e.type === "Buffer" && Array.isArray(e.data)) {
                    return fromArrayLike(e.data);
                }
            }
            function checked(e) {
                if (e >= o) {
                    throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + o.toString(16) + " bytes");
                }
                return e | 0;
            }
            function SlowBuffer(e) {
                if (+e != e) {
                    e = 0;
                }
                return Buffer.alloc(+e);
            }
            Buffer.isBuffer = function isBuffer(e) {
                return e != null && e._isBuffer === true && e !== Buffer.prototype;
            };
            Buffer.compare = function compare(e, r) {
                if (isInstance(e, Uint8Array)) e = Buffer.from(e, e.offset, e.byteLength);
                if (isInstance(r, Uint8Array)) r = Buffer.from(r, r.offset, r.byteLength);
                if (!Buffer.isBuffer(e) || !Buffer.isBuffer(r)) {
                    throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                }
                if (e === r) return 0;
                var t = e.length;
                var f = r.length;
                for(var n = 0, i = Math.min(t, f); n < i; ++n){
                    if (e[n] !== r[n]) {
                        t = e[n];
                        f = r[n];
                        break;
                    }
                }
                if (t < f) return -1;
                if (f < t) return 1;
                return 0;
            };
            Buffer.isEncoding = function isEncoding(e) {
                switch(String(e).toLowerCase()){
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return true;
                    default:
                        return false;
                }
            };
            Buffer.concat = function concat(e, r) {
                if (!Array.isArray(e)) {
                    throw new TypeError('"list" argument must be an Array of Buffers');
                }
                if (e.length === 0) {
                    return Buffer.alloc(0);
                }
                var t;
                if (r === undefined) {
                    r = 0;
                    for(t = 0; t < e.length; ++t){
                        r += e[t].length;
                    }
                }
                var f = Buffer.allocUnsafe(r);
                var n = 0;
                for(t = 0; t < e.length; ++t){
                    var i = e[t];
                    if (isInstance(i, Uint8Array)) {
                        i = Buffer.from(i);
                    }
                    if (!Buffer.isBuffer(i)) {
                        throw new TypeError('"list" argument must be an Array of Buffers');
                    }
                    i.copy(f, n);
                    n += i.length;
                }
                return f;
            };
            function byteLength(e, r) {
                if (Buffer.isBuffer(e)) {
                    return e.length;
                }
                if (ArrayBuffer.isView(e) || isInstance(e, ArrayBuffer)) {
                    return e.byteLength;
                }
                if (typeof e !== "string") {
                    throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + "Received type " + typeof e);
                }
                var t = e.length;
                var f = arguments.length > 2 && arguments[2] === true;
                if (!f && t === 0) return 0;
                var n = false;
                for(;;){
                    switch(r){
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return t;
                        case "utf8":
                        case "utf-8":
                            return utf8ToBytes(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return t * 2;
                        case "hex":
                            return t >>> 1;
                        case "base64":
                            return base64ToBytes(e).length;
                        default:
                            if (n) {
                                return f ? -1 : utf8ToBytes(e).length;
                            }
                            r = ("" + r).toLowerCase();
                            n = true;
                    }
                }
            }
            Buffer.byteLength = byteLength;
            function slowToString(e, r, t) {
                var f = false;
                if (r === undefined || r < 0) {
                    r = 0;
                }
                if (r > this.length) {
                    return "";
                }
                if (t === undefined || t > this.length) {
                    t = this.length;
                }
                if (t <= 0) {
                    return "";
                }
                t >>>= 0;
                r >>>= 0;
                if (t <= r) {
                    return "";
                }
                if (!e) e = "utf8";
                while(true){
                    switch(e){
                        case "hex":
                            return hexSlice(this, r, t);
                        case "utf8":
                        case "utf-8":
                            return utf8Slice(this, r, t);
                        case "ascii":
                            return asciiSlice(this, r, t);
                        case "latin1":
                        case "binary":
                            return latin1Slice(this, r, t);
                        case "base64":
                            return base64Slice(this, r, t);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return utf16leSlice(this, r, t);
                        default:
                            if (f) throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase();
                            f = true;
                    }
                }
            }
            Buffer.prototype._isBuffer = true;
            function swap(e, r, t) {
                var f = e[r];
                e[r] = e[t];
                e[t] = f;
            }
            Buffer.prototype.swap16 = function swap16() {
                var e = this.length;
                if (e % 2 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 16-bits");
                }
                for(var r = 0; r < e; r += 2){
                    swap(this, r, r + 1);
                }
                return this;
            };
            Buffer.prototype.swap32 = function swap32() {
                var e = this.length;
                if (e % 4 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 32-bits");
                }
                for(var r = 0; r < e; r += 4){
                    swap(this, r, r + 3);
                    swap(this, r + 1, r + 2);
                }
                return this;
            };
            Buffer.prototype.swap64 = function swap64() {
                var e = this.length;
                if (e % 8 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 64-bits");
                }
                for(var r = 0; r < e; r += 8){
                    swap(this, r, r + 7);
                    swap(this, r + 1, r + 6);
                    swap(this, r + 2, r + 5);
                    swap(this, r + 3, r + 4);
                }
                return this;
            };
            Buffer.prototype.toString = function toString() {
                var e = this.length;
                if (e === 0) return "";
                if (arguments.length === 0) return utf8Slice(this, 0, e);
                return slowToString.apply(this, arguments);
            };
            Buffer.prototype.toLocaleString = Buffer.prototype.toString;
            Buffer.prototype.equals = function equals(e) {
                if (!Buffer.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                if (this === e) return true;
                return Buffer.compare(this, e) === 0;
            };
            Buffer.prototype.inspect = function inspect() {
                var e = "";
                var t = r.INSPECT_MAX_BYTES;
                e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim();
                if (this.length > t) e += " ... ";
                return "<Buffer " + e + ">";
            };
            if (i) {
                Buffer.prototype[i] = Buffer.prototype.inspect;
            }
            Buffer.prototype.compare = function compare(e, r, t, f, n) {
                if (isInstance(e, Uint8Array)) {
                    e = Buffer.from(e, e.offset, e.byteLength);
                }
                if (!Buffer.isBuffer(e)) {
                    throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + "Received type " + typeof e);
                }
                if (r === undefined) {
                    r = 0;
                }
                if (t === undefined) {
                    t = e ? e.length : 0;
                }
                if (f === undefined) {
                    f = 0;
                }
                if (n === undefined) {
                    n = this.length;
                }
                if (r < 0 || t > e.length || f < 0 || n > this.length) {
                    throw new RangeError("out of range index");
                }
                if (f >= n && r >= t) {
                    return 0;
                }
                if (f >= n) {
                    return -1;
                }
                if (r >= t) {
                    return 1;
                }
                r >>>= 0;
                t >>>= 0;
                f >>>= 0;
                n >>>= 0;
                if (this === e) return 0;
                var i = n - f;
                var o = t - r;
                var u = Math.min(i, o);
                var a = this.slice(f, n);
                var s = e.slice(r, t);
                for(var h = 0; h < u; ++h){
                    if (a[h] !== s[h]) {
                        i = a[h];
                        o = s[h];
                        break;
                    }
                }
                if (i < o) return -1;
                if (o < i) return 1;
                return 0;
            };
            function bidirectionalIndexOf(e, r, t, f, n) {
                if (e.length === 0) return -1;
                if (typeof t === "string") {
                    f = t;
                    t = 0;
                } else if (t > 2147483647) {
                    t = 2147483647;
                } else if (t < -2147483648) {
                    t = -2147483648;
                }
                t = +t;
                if (numberIsNaN(t)) {
                    t = n ? 0 : e.length - 1;
                }
                if (t < 0) t = e.length + t;
                if (t >= e.length) {
                    if (n) return -1;
                    else t = e.length - 1;
                } else if (t < 0) {
                    if (n) t = 0;
                    else return -1;
                }
                if (typeof r === "string") {
                    r = Buffer.from(r, f);
                }
                if (Buffer.isBuffer(r)) {
                    if (r.length === 0) {
                        return -1;
                    }
                    return arrayIndexOf(e, r, t, f, n);
                } else if (typeof r === "number") {
                    r = r & 255;
                    if (typeof Uint8Array.prototype.indexOf === "function") {
                        if (n) {
                            return Uint8Array.prototype.indexOf.call(e, r, t);
                        } else {
                            return Uint8Array.prototype.lastIndexOf.call(e, r, t);
                        }
                    }
                    return arrayIndexOf(e, [
                        r
                    ], t, f, n);
                }
                throw new TypeError("val must be string, number or Buffer");
            }
            function arrayIndexOf(e, r, t, f, n) {
                var i = 1;
                var o = e.length;
                var u = r.length;
                if (f !== undefined) {
                    f = String(f).toLowerCase();
                    if (f === "ucs2" || f === "ucs-2" || f === "utf16le" || f === "utf-16le") {
                        if (e.length < 2 || r.length < 2) {
                            return -1;
                        }
                        i = 2;
                        o /= 2;
                        u /= 2;
                        t /= 2;
                    }
                }
                function read(e, r) {
                    if (i === 1) {
                        return e[r];
                    } else {
                        return e.readUInt16BE(r * i);
                    }
                }
                var a;
                if (n) {
                    var s = -1;
                    for(a = t; a < o; a++){
                        if (read(e, a) === read(r, s === -1 ? 0 : a - s)) {
                            if (s === -1) s = a;
                            if (a - s + 1 === u) return s * i;
                        } else {
                            if (s !== -1) a -= a - s;
                            s = -1;
                        }
                    }
                } else {
                    if (t + u > o) t = o - u;
                    for(a = t; a >= 0; a--){
                        var h = true;
                        for(var c = 0; c < u; c++){
                            if (read(e, a + c) !== read(r, c)) {
                                h = false;
                                break;
                            }
                        }
                        if (h) return a;
                    }
                }
                return -1;
            }
            Buffer.prototype.includes = function includes(e, r, t) {
                return this.indexOf(e, r, t) !== -1;
            };
            Buffer.prototype.indexOf = function indexOf(e, r, t) {
                return bidirectionalIndexOf(this, e, r, t, true);
            };
            Buffer.prototype.lastIndexOf = function lastIndexOf(e, r, t) {
                return bidirectionalIndexOf(this, e, r, t, false);
            };
            function hexWrite(e, r, t, f) {
                t = Number(t) || 0;
                var n = e.length - t;
                if (!f) {
                    f = n;
                } else {
                    f = Number(f);
                    if (f > n) {
                        f = n;
                    }
                }
                var i = r.length;
                if (f > i / 2) {
                    f = i / 2;
                }
                for(var o = 0; o < f; ++o){
                    var u = parseInt(r.substr(o * 2, 2), 16);
                    if (numberIsNaN(u)) return o;
                    e[t + o] = u;
                }
                return o;
            }
            function utf8Write(e, r, t, f) {
                return blitBuffer(utf8ToBytes(r, e.length - t), e, t, f);
            }
            function asciiWrite(e, r, t, f) {
                return blitBuffer(asciiToBytes(r), e, t, f);
            }
            function latin1Write(e, r, t, f) {
                return asciiWrite(e, r, t, f);
            }
            function base64Write(e, r, t, f) {
                return blitBuffer(base64ToBytes(r), e, t, f);
            }
            function ucs2Write(e, r, t, f) {
                return blitBuffer(utf16leToBytes(r, e.length - t), e, t, f);
            }
            Buffer.prototype.write = function write(e, r, t, f) {
                if (r === undefined) {
                    f = "utf8";
                    t = this.length;
                    r = 0;
                } else if (t === undefined && typeof r === "string") {
                    f = r;
                    t = this.length;
                    r = 0;
                } else if (isFinite(r)) {
                    r = r >>> 0;
                    if (isFinite(t)) {
                        t = t >>> 0;
                        if (f === undefined) f = "utf8";
                    } else {
                        f = t;
                        t = undefined;
                    }
                } else {
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                }
                var n = this.length - r;
                if (t === undefined || t > n) t = n;
                if (e.length > 0 && (t < 0 || r < 0) || r > this.length) {
                    throw new RangeError("Attempt to write outside buffer bounds");
                }
                if (!f) f = "utf8";
                var i = false;
                for(;;){
                    switch(f){
                        case "hex":
                            return hexWrite(this, e, r, t);
                        case "utf8":
                        case "utf-8":
                            return utf8Write(this, e, r, t);
                        case "ascii":
                            return asciiWrite(this, e, r, t);
                        case "latin1":
                        case "binary":
                            return latin1Write(this, e, r, t);
                        case "base64":
                            return base64Write(this, e, r, t);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return ucs2Write(this, e, r, t);
                        default:
                            if (i) throw new TypeError("Unknown encoding: " + f);
                            f = ("" + f).toLowerCase();
                            i = true;
                    }
                }
            };
            Buffer.prototype.toJSON = function toJSON() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                };
            };
            function base64Slice(e, r, t) {
                if (r === 0 && t === e.length) {
                    return f.fromByteArray(e);
                } else {
                    return f.fromByteArray(e.slice(r, t));
                }
            }
            function utf8Slice(e, r, t) {
                t = Math.min(e.length, t);
                var f = [];
                var n = r;
                while(n < t){
                    var i = e[n];
                    var o = null;
                    var u = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
                    if (n + u <= t) {
                        var a, s, h, c;
                        switch(u){
                            case 1:
                                if (i < 128) {
                                    o = i;
                                }
                                break;
                            case 2:
                                a = e[n + 1];
                                if ((a & 192) === 128) {
                                    c = (i & 31) << 6 | a & 63;
                                    if (c > 127) {
                                        o = c;
                                    }
                                }
                                break;
                            case 3:
                                a = e[n + 1];
                                s = e[n + 2];
                                if ((a & 192) === 128 && (s & 192) === 128) {
                                    c = (i & 15) << 12 | (a & 63) << 6 | s & 63;
                                    if (c > 2047 && (c < 55296 || c > 57343)) {
                                        o = c;
                                    }
                                }
                                break;
                            case 4:
                                a = e[n + 1];
                                s = e[n + 2];
                                h = e[n + 3];
                                if ((a & 192) === 128 && (s & 192) === 128 && (h & 192) === 128) {
                                    c = (i & 15) << 18 | (a & 63) << 12 | (s & 63) << 6 | h & 63;
                                    if (c > 65535 && c < 1114112) {
                                        o = c;
                                    }
                                }
                        }
                    }
                    if (o === null) {
                        o = 65533;
                        u = 1;
                    } else if (o > 65535) {
                        o -= 65536;
                        f.push(o >>> 10 & 1023 | 55296);
                        o = 56320 | o & 1023;
                    }
                    f.push(o);
                    n += u;
                }
                return decodeCodePointsArray(f);
            }
            var u = 4096;
            function decodeCodePointsArray(e) {
                var r = e.length;
                if (r <= u) {
                    return String.fromCharCode.apply(String, e);
                }
                var t = "";
                var f = 0;
                while(f < r){
                    t += String.fromCharCode.apply(String, e.slice(f, f += u));
                }
                return t;
            }
            function asciiSlice(e, r, t) {
                var f = "";
                t = Math.min(e.length, t);
                for(var n = r; n < t; ++n){
                    f += String.fromCharCode(e[n] & 127);
                }
                return f;
            }
            function latin1Slice(e, r, t) {
                var f = "";
                t = Math.min(e.length, t);
                for(var n = r; n < t; ++n){
                    f += String.fromCharCode(e[n]);
                }
                return f;
            }
            function hexSlice(e, r, t) {
                var f = e.length;
                if (!r || r < 0) r = 0;
                if (!t || t < 0 || t > f) t = f;
                var n = "";
                for(var i = r; i < t; ++i){
                    n += s[e[i]];
                }
                return n;
            }
            function utf16leSlice(e, r, t) {
                var f = e.slice(r, t);
                var n = "";
                for(var i = 0; i < f.length; i += 2){
                    n += String.fromCharCode(f[i] + f[i + 1] * 256);
                }
                return n;
            }
            Buffer.prototype.slice = function slice(e, r) {
                var t = this.length;
                e = ~~e;
                r = r === undefined ? t : ~~r;
                if (e < 0) {
                    e += t;
                    if (e < 0) e = 0;
                } else if (e > t) {
                    e = t;
                }
                if (r < 0) {
                    r += t;
                    if (r < 0) r = 0;
                } else if (r > t) {
                    r = t;
                }
                if (r < e) r = e;
                var f = this.subarray(e, r);
                Object.setPrototypeOf(f, Buffer.prototype);
                return f;
            };
            function checkOffset(e, r, t) {
                if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + r > t) throw new RangeError("Trying to access beyond buffer length");
            }
            Buffer.prototype.readUIntLE = function readUIntLE(e, r, t) {
                e = e >>> 0;
                r = r >>> 0;
                if (!t) checkOffset(e, r, this.length);
                var f = this[e];
                var n = 1;
                var i = 0;
                while(++i < r && (n *= 256)){
                    f += this[e + i] * n;
                }
                return f;
            };
            Buffer.prototype.readUIntBE = function readUIntBE(e, r, t) {
                e = e >>> 0;
                r = r >>> 0;
                if (!t) {
                    checkOffset(e, r, this.length);
                }
                var f = this[e + --r];
                var n = 1;
                while(r > 0 && (n *= 256)){
                    f += this[e + --r] * n;
                }
                return f;
            };
            Buffer.prototype.readUInt8 = function readUInt8(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 1, this.length);
                return this[e];
            };
            Buffer.prototype.readUInt16LE = function readUInt16LE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 2, this.length);
                return this[e] | this[e + 1] << 8;
            };
            Buffer.prototype.readUInt16BE = function readUInt16BE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 2, this.length);
                return this[e] << 8 | this[e + 1];
            };
            Buffer.prototype.readUInt32LE = function readUInt32LE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
            };
            Buffer.prototype.readUInt32BE = function readUInt32BE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
            };
            Buffer.prototype.readIntLE = function readIntLE(e, r, t) {
                e = e >>> 0;
                r = r >>> 0;
                if (!t) checkOffset(e, r, this.length);
                var f = this[e];
                var n = 1;
                var i = 0;
                while(++i < r && (n *= 256)){
                    f += this[e + i] * n;
                }
                n *= 128;
                if (f >= n) f -= Math.pow(2, 8 * r);
                return f;
            };
            Buffer.prototype.readIntBE = function readIntBE(e, r, t) {
                e = e >>> 0;
                r = r >>> 0;
                if (!t) checkOffset(e, r, this.length);
                var f = r;
                var n = 1;
                var i = this[e + --f];
                while(f > 0 && (n *= 256)){
                    i += this[e + --f] * n;
                }
                n *= 128;
                if (i >= n) i -= Math.pow(2, 8 * r);
                return i;
            };
            Buffer.prototype.readInt8 = function readInt8(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 1, this.length);
                if (!(this[e] & 128)) return this[e];
                return (255 - this[e] + 1) * -1;
            };
            Buffer.prototype.readInt16LE = function readInt16LE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 2, this.length);
                var t = this[e] | this[e + 1] << 8;
                return t & 32768 ? t | 4294901760 : t;
            };
            Buffer.prototype.readInt16BE = function readInt16BE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 2, this.length);
                var t = this[e + 1] | this[e] << 8;
                return t & 32768 ? t | 4294901760 : t;
            };
            Buffer.prototype.readInt32LE = function readInt32LE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
            };
            Buffer.prototype.readInt32BE = function readInt32BE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
            };
            Buffer.prototype.readFloatLE = function readFloatLE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return n.read(this, e, true, 23, 4);
            };
            Buffer.prototype.readFloatBE = function readFloatBE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 4, this.length);
                return n.read(this, e, false, 23, 4);
            };
            Buffer.prototype.readDoubleLE = function readDoubleLE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 8, this.length);
                return n.read(this, e, true, 52, 8);
            };
            Buffer.prototype.readDoubleBE = function readDoubleBE(e, r) {
                e = e >>> 0;
                if (!r) checkOffset(e, 8, this.length);
                return n.read(this, e, false, 52, 8);
            };
            function checkInt(e, r, t, f, n, i) {
                if (!Buffer.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (r > n || r < i) throw new RangeError('"value" argument is out of bounds');
                if (t + f > e.length) throw new RangeError("Index out of range");
            }
            Buffer.prototype.writeUIntLE = function writeUIntLE(e, r, t, f) {
                e = +e;
                r = r >>> 0;
                t = t >>> 0;
                if (!f) {
                    var n = Math.pow(2, 8 * t) - 1;
                    checkInt(this, e, r, t, n, 0);
                }
                var i = 1;
                var o = 0;
                this[r] = e & 255;
                while(++o < t && (i *= 256)){
                    this[r + o] = e / i & 255;
                }
                return r + t;
            };
            Buffer.prototype.writeUIntBE = function writeUIntBE(e, r, t, f) {
                e = +e;
                r = r >>> 0;
                t = t >>> 0;
                if (!f) {
                    var n = Math.pow(2, 8 * t) - 1;
                    checkInt(this, e, r, t, n, 0);
                }
                var i = t - 1;
                var o = 1;
                this[r + i] = e & 255;
                while(--i >= 0 && (o *= 256)){
                    this[r + i] = e / o & 255;
                }
                return r + t;
            };
            Buffer.prototype.writeUInt8 = function writeUInt8(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 1, 255, 0);
                this[r] = e & 255;
                return r + 1;
            };
            Buffer.prototype.writeUInt16LE = function writeUInt16LE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 2, 65535, 0);
                this[r] = e & 255;
                this[r + 1] = e >>> 8;
                return r + 2;
            };
            Buffer.prototype.writeUInt16BE = function writeUInt16BE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 2, 65535, 0);
                this[r] = e >>> 8;
                this[r + 1] = e & 255;
                return r + 2;
            };
            Buffer.prototype.writeUInt32LE = function writeUInt32LE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 4, 4294967295, 0);
                this[r + 3] = e >>> 24;
                this[r + 2] = e >>> 16;
                this[r + 1] = e >>> 8;
                this[r] = e & 255;
                return r + 4;
            };
            Buffer.prototype.writeUInt32BE = function writeUInt32BE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 4, 4294967295, 0);
                this[r] = e >>> 24;
                this[r + 1] = e >>> 16;
                this[r + 2] = e >>> 8;
                this[r + 3] = e & 255;
                return r + 4;
            };
            Buffer.prototype.writeIntLE = function writeIntLE(e, r, t, f) {
                e = +e;
                r = r >>> 0;
                if (!f) {
                    var n = Math.pow(2, 8 * t - 1);
                    checkInt(this, e, r, t, n - 1, -n);
                }
                var i = 0;
                var o = 1;
                var u = 0;
                this[r] = e & 255;
                while(++i < t && (o *= 256)){
                    if (e < 0 && u === 0 && this[r + i - 1] !== 0) {
                        u = 1;
                    }
                    this[r + i] = (e / o >> 0) - u & 255;
                }
                return r + t;
            };
            Buffer.prototype.writeIntBE = function writeIntBE(e, r, t, f) {
                e = +e;
                r = r >>> 0;
                if (!f) {
                    var n = Math.pow(2, 8 * t - 1);
                    checkInt(this, e, r, t, n - 1, -n);
                }
                var i = t - 1;
                var o = 1;
                var u = 0;
                this[r + i] = e & 255;
                while(--i >= 0 && (o *= 256)){
                    if (e < 0 && u === 0 && this[r + i + 1] !== 0) {
                        u = 1;
                    }
                    this[r + i] = (e / o >> 0) - u & 255;
                }
                return r + t;
            };
            Buffer.prototype.writeInt8 = function writeInt8(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 1, 127, -128);
                if (e < 0) e = 255 + e + 1;
                this[r] = e & 255;
                return r + 1;
            };
            Buffer.prototype.writeInt16LE = function writeInt16LE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 2, 32767, -32768);
                this[r] = e & 255;
                this[r + 1] = e >>> 8;
                return r + 2;
            };
            Buffer.prototype.writeInt16BE = function writeInt16BE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 2, 32767, -32768);
                this[r] = e >>> 8;
                this[r + 1] = e & 255;
                return r + 2;
            };
            Buffer.prototype.writeInt32LE = function writeInt32LE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 4, 2147483647, -2147483648);
                this[r] = e & 255;
                this[r + 1] = e >>> 8;
                this[r + 2] = e >>> 16;
                this[r + 3] = e >>> 24;
                return r + 4;
            };
            Buffer.prototype.writeInt32BE = function writeInt32BE(e, r, t) {
                e = +e;
                r = r >>> 0;
                if (!t) checkInt(this, e, r, 4, 2147483647, -2147483648);
                if (e < 0) e = 4294967295 + e + 1;
                this[r] = e >>> 24;
                this[r + 1] = e >>> 16;
                this[r + 2] = e >>> 8;
                this[r + 3] = e & 255;
                return r + 4;
            };
            function checkIEEE754(e, r, t, f, n, i) {
                if (t + f > e.length) throw new RangeError("Index out of range");
                if (t < 0) throw new RangeError("Index out of range");
            }
            function writeFloat(e, r, t, f, i) {
                r = +r;
                t = t >>> 0;
                if (!i) {
                    checkIEEE754(e, r, t, 4, 34028234663852886e22, -34028234663852886e22);
                }
                n.write(e, r, t, f, 23, 4);
                return t + 4;
            }
            Buffer.prototype.writeFloatLE = function writeFloatLE(e, r, t) {
                return writeFloat(this, e, r, true, t);
            };
            Buffer.prototype.writeFloatBE = function writeFloatBE(e, r, t) {
                return writeFloat(this, e, r, false, t);
            };
            function writeDouble(e, r, t, f, i) {
                r = +r;
                t = t >>> 0;
                if (!i) {
                    checkIEEE754(e, r, t, 8, 17976931348623157e292, -17976931348623157e292);
                }
                n.write(e, r, t, f, 52, 8);
                return t + 8;
            }
            Buffer.prototype.writeDoubleLE = function writeDoubleLE(e, r, t) {
                return writeDouble(this, e, r, true, t);
            };
            Buffer.prototype.writeDoubleBE = function writeDoubleBE(e, r, t) {
                return writeDouble(this, e, r, false, t);
            };
            Buffer.prototype.copy = function copy(e, r, t, f) {
                if (!Buffer.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                if (!t) t = 0;
                if (!f && f !== 0) f = this.length;
                if (r >= e.length) r = e.length;
                if (!r) r = 0;
                if (f > 0 && f < t) f = t;
                if (f === t) return 0;
                if (e.length === 0 || this.length === 0) return 0;
                if (r < 0) {
                    throw new RangeError("targetStart out of bounds");
                }
                if (t < 0 || t >= this.length) throw new RangeError("Index out of range");
                if (f < 0) throw new RangeError("sourceEnd out of bounds");
                if (f > this.length) f = this.length;
                if (e.length - r < f - t) {
                    f = e.length - r + t;
                }
                var n = f - t;
                if (this === e && typeof Uint8Array.prototype.copyWithin === "function") {
                    this.copyWithin(r, t, f);
                } else if (this === e && t < r && r < f) {
                    for(var i = n - 1; i >= 0; --i){
                        e[i + r] = this[i + t];
                    }
                } else {
                    Uint8Array.prototype.set.call(e, this.subarray(t, f), r);
                }
                return n;
            };
            Buffer.prototype.fill = function fill(e, r, t, f) {
                if (typeof e === "string") {
                    if (typeof r === "string") {
                        f = r;
                        r = 0;
                        t = this.length;
                    } else if (typeof t === "string") {
                        f = t;
                        t = this.length;
                    }
                    if (f !== undefined && typeof f !== "string") {
                        throw new TypeError("encoding must be a string");
                    }
                    if (typeof f === "string" && !Buffer.isEncoding(f)) {
                        throw new TypeError("Unknown encoding: " + f);
                    }
                    if (e.length === 1) {
                        var n = e.charCodeAt(0);
                        if (f === "utf8" && n < 128 || f === "latin1") {
                            e = n;
                        }
                    }
                } else if (typeof e === "number") {
                    e = e & 255;
                } else if (typeof e === "boolean") {
                    e = Number(e);
                }
                if (r < 0 || this.length < r || this.length < t) {
                    throw new RangeError("Out of range index");
                }
                if (t <= r) {
                    return this;
                }
                r = r >>> 0;
                t = t === undefined ? this.length : t >>> 0;
                if (!e) e = 0;
                var i;
                if (typeof e === "number") {
                    for(i = r; i < t; ++i){
                        this[i] = e;
                    }
                } else {
                    var o = Buffer.isBuffer(e) ? e : Buffer.from(e, f);
                    var u = o.length;
                    if (u === 0) {
                        throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                    }
                    for(i = 0; i < t - r; ++i){
                        this[i + r] = o[i % u];
                    }
                }
                return this;
            };
            var a = /[^+/0-9A-Za-z-_]/g;
            function base64clean(e) {
                e = e.split("=")[0];
                e = e.trim().replace(a, "");
                if (e.length < 2) return "";
                while(e.length % 4 !== 0){
                    e = e + "=";
                }
                return e;
            }
            function utf8ToBytes(e, r) {
                r = r || Infinity;
                var t;
                var f = e.length;
                var n = null;
                var i = [];
                for(var o = 0; o < f; ++o){
                    t = e.charCodeAt(o);
                    if (t > 55295 && t < 57344) {
                        if (!n) {
                            if (t > 56319) {
                                if ((r -= 3) > -1) i.push(239, 191, 189);
                                continue;
                            } else if (o + 1 === f) {
                                if ((r -= 3) > -1) i.push(239, 191, 189);
                                continue;
                            }
                            n = t;
                            continue;
                        }
                        if (t < 56320) {
                            if ((r -= 3) > -1) i.push(239, 191, 189);
                            n = t;
                            continue;
                        }
                        t = (n - 55296 << 10 | t - 56320) + 65536;
                    } else if (n) {
                        if ((r -= 3) > -1) i.push(239, 191, 189);
                    }
                    n = null;
                    if (t < 128) {
                        if ((r -= 1) < 0) break;
                        i.push(t);
                    } else if (t < 2048) {
                        if ((r -= 2) < 0) break;
                        i.push(t >> 6 | 192, t & 63 | 128);
                    } else if (t < 65536) {
                        if ((r -= 3) < 0) break;
                        i.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
                    } else if (t < 1114112) {
                        if ((r -= 4) < 0) break;
                        i.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
                    } else {
                        throw new Error("Invalid code point");
                    }
                }
                return i;
            }
            function asciiToBytes(e) {
                var r = [];
                for(var t = 0; t < e.length; ++t){
                    r.push(e.charCodeAt(t) & 255);
                }
                return r;
            }
            function utf16leToBytes(e, r) {
                var t, f, n;
                var i = [];
                for(var o = 0; o < e.length; ++o){
                    if ((r -= 2) < 0) break;
                    t = e.charCodeAt(o);
                    f = t >> 8;
                    n = t % 256;
                    i.push(n);
                    i.push(f);
                }
                return i;
            }
            function base64ToBytes(e) {
                return f.toByteArray(base64clean(e));
            }
            function blitBuffer(e, r, t, f) {
                for(var n = 0; n < f; ++n){
                    if (n + t >= r.length || n >= e.length) break;
                    r[n + t] = e[n];
                }
                return n;
            }
            function isInstance(e, r) {
                return e instanceof r || e != null && e.constructor != null && e.constructor.name != null && e.constructor.name === r.name;
            }
            function numberIsNaN(e) {
                return e !== e;
            }
            var s = function() {
                var e = "0123456789abcdef";
                var r = new Array(256);
                for(var t = 0; t < 16; ++t){
                    var f = t * 16;
                    for(var n = 0; n < 16; ++n){
                        r[f + n] = e[t] + e[n];
                    }
                }
                return r;
            }();
        },
        783: function(e, r) {
            /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ r.read = function(e, r, t, f, n) {
                var i, o;
                var u = n * 8 - f - 1;
                var a = (1 << u) - 1;
                var s = a >> 1;
                var h = -7;
                var c = t ? n - 1 : 0;
                var l = t ? -1 : 1;
                var p = e[r + c];
                c += l;
                i = p & (1 << -h) - 1;
                p >>= -h;
                h += u;
                for(; h > 0; i = i * 256 + e[r + c], c += l, h -= 8){}
                o = i & (1 << -h) - 1;
                i >>= -h;
                h += f;
                for(; h > 0; o = o * 256 + e[r + c], c += l, h -= 8){}
                if (i === 0) {
                    i = 1 - s;
                } else if (i === a) {
                    return o ? NaN : (p ? -1 : 1) * Infinity;
                } else {
                    o = o + Math.pow(2, f);
                    i = i - s;
                }
                return (p ? -1 : 1) * o * Math.pow(2, i - f);
            };
            r.write = function(e, r, t, f, n, i) {
                var o, u, a;
                var s = i * 8 - n - 1;
                var h = (1 << s) - 1;
                var c = h >> 1;
                var l = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
                var p = f ? 0 : i - 1;
                var y = f ? 1 : -1;
                var g = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
                r = Math.abs(r);
                if (isNaN(r) || r === Infinity) {
                    u = isNaN(r) ? 1 : 0;
                    o = h;
                } else {
                    o = Math.floor(Math.log(r) / Math.LN2);
                    if (r * (a = Math.pow(2, -o)) < 1) {
                        o--;
                        a *= 2;
                    }
                    if (o + c >= 1) {
                        r += l / a;
                    } else {
                        r += l * Math.pow(2, 1 - c);
                    }
                    if (r * a >= 2) {
                        o++;
                        a /= 2;
                    }
                    if (o + c >= h) {
                        u = 0;
                        o = h;
                    } else if (o + c >= 1) {
                        u = (r * a - 1) * Math.pow(2, n);
                        o = o + c;
                    } else {
                        u = r * Math.pow(2, c - 1) * Math.pow(2, n);
                        o = 0;
                    }
                }
                for(; n >= 8; e[t + p] = u & 255, p += y, u /= 256, n -= 8){}
                o = o << n | u;
                s += n;
                for(; s > 0; e[t + p] = o & 255, p += y, o /= 256, s -= 8){}
                e[t + p - y] |= g * 128;
            };
        }
    };
    var r = {};
    function __nccwpck_require__(t) {
        var f = r[t];
        if (f !== undefined) {
            return f.exports;
        }
        var n = r[t] = {
            exports: {}
        };
        var i = true;
        try {
            e[t](n, n.exports, __nccwpck_require__);
            i = false;
        } finally{
            if (i) delete r[t];
        }
        return n.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/next/dist/compiled/buffer") + "/";
    var t = __nccwpck_require__(72);
    module.exports = t;
})();
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/detect-browser/es/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BotInfo",
    ()=>BotInfo,
    "BrowserInfo",
    ()=>BrowserInfo,
    "NodeInfo",
    ()=>NodeInfo,
    "ReactNativeInfo",
    ()=>ReactNativeInfo,
    "SearchBotDeviceInfo",
    ()=>SearchBotDeviceInfo,
    "browserName",
    ()=>browserName,
    "detect",
    ()=>detect,
    "detectOS",
    ()=>detectOS,
    "getNodeVersion",
    ()=>getNodeVersion,
    "parseUserAgent",
    ()=>parseUserAgent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __spreadArray = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var BrowserInfo = function() {
    function BrowserInfo(name, version, os) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.type = 'browser';
    }
    return BrowserInfo;
}();
;
var NodeInfo = function() {
    function NodeInfo(version) {
        this.version = version;
        this.type = 'node';
        this.name = 'node';
        this.os = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform;
    }
    return NodeInfo;
}();
;
var SearchBotDeviceInfo = function() {
    function SearchBotDeviceInfo(name, version, os, bot) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.bot = bot;
        this.type = 'bot-device';
    }
    return SearchBotDeviceInfo;
}();
;
var BotInfo = function() {
    function BotInfo() {
        this.type = 'bot';
        this.bot = true; // NOTE: deprecated test name instead
        this.name = 'bot';
        this.version = null;
        this.os = null;
    }
    return BotInfo;
}();
;
var ReactNativeInfo = function() {
    function ReactNativeInfo() {
        this.type = 'react-native';
        this.name = 'react-native';
        this.version = null;
        this.os = null;
    }
    return ReactNativeInfo;
}();
;
// tslint:disable-next-line:max-line-length
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
    [
        'aol',
        /AOLShield\/([0-9\._]+)/
    ],
    [
        'edge',
        /Edge\/([0-9\._]+)/
    ],
    [
        'edge-ios',
        /EdgiOS\/([0-9\._]+)/
    ],
    [
        'yandexbrowser',
        /YaBrowser\/([0-9\._]+)/
    ],
    [
        'kakaotalk',
        /KAKAOTALK\s([0-9\.]+)/
    ],
    [
        'samsung',
        /SamsungBrowser\/([0-9\.]+)/
    ],
    [
        'silk',
        /\bSilk\/([0-9._-]+)\b/
    ],
    [
        'miui',
        /MiuiBrowser\/([0-9\.]+)$/
    ],
    [
        'beaker',
        /BeakerBrowser\/([0-9\.]+)/
    ],
    [
        'edge-chromium',
        /EdgA?\/([0-9\.]+)/
    ],
    [
        'chromium-webview',
        /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
    ],
    [
        'chrome',
        /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
    ],
    [
        'phantomjs',
        /PhantomJS\/([0-9\.]+)(:?\s|$)/
    ],
    [
        'crios',
        /CriOS\/([0-9\.]+)(:?\s|$)/
    ],
    [
        'firefox',
        /Firefox\/([0-9\.]+)(?:\s|$)/
    ],
    [
        'fxios',
        /FxiOS\/([0-9\.]+)/
    ],
    [
        'opera-mini',
        /Opera Mini.*Version\/([0-9\.]+)/
    ],
    [
        'opera',
        /Opera\/([0-9\.]+)(?:\s|$)/
    ],
    [
        'opera',
        /OPR\/([0-9\.]+)(:?\s|$)/
    ],
    [
        'pie',
        /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/
    ],
    [
        'pie',
        /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/
    ],
    [
        'netfront',
        /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/
    ],
    [
        'ie',
        /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/
    ],
    [
        'ie',
        /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/
    ],
    [
        'ie',
        /MSIE\s(7\.0)/
    ],
    [
        'bb10',
        /BB10;\sTouch.*Version\/([0-9\.]+)/
    ],
    [
        'android',
        /Android\s([0-9\.]+)/
    ],
    [
        'ios',
        /Version\/([0-9\._]+).*Mobile.*Safari.*/
    ],
    [
        'safari',
        /Version\/([0-9\._]+).*Safari/
    ],
    [
        'facebook',
        /FB[AS]V\/([0-9\.]+)/
    ],
    [
        'instagram',
        /Instagram\s([0-9\.]+)/
    ],
    [
        'ios-webview',
        /AppleWebKit\/([0-9\.]+).*Mobile/
    ],
    [
        'ios-webview',
        /AppleWebKit\/([0-9\.]+).*Gecko\)$/
    ],
    [
        'curl',
        /^curl\/([0-9\.]+)$/
    ],
    [
        'searchbot',
        SEARCHBOX_UA_REGEX
    ]
];
var operatingSystemRules = [
    [
        'iOS',
        /iP(hone|od|ad)/
    ],
    [
        'Android OS',
        /Android/
    ],
    [
        'BlackBerry OS',
        /BlackBerry|BB10/
    ],
    [
        'Windows Mobile',
        /IEMobile/
    ],
    [
        'Amazon OS',
        /Kindle/
    ],
    [
        'Windows 3.11',
        /Win16/
    ],
    [
        'Windows 95',
        /(Windows 95)|(Win95)|(Windows_95)/
    ],
    [
        'Windows 98',
        /(Windows 98)|(Win98)/
    ],
    [
        'Windows 2000',
        /(Windows NT 5.0)|(Windows 2000)/
    ],
    [
        'Windows XP',
        /(Windows NT 5.1)|(Windows XP)/
    ],
    [
        'Windows Server 2003',
        /(Windows NT 5.2)/
    ],
    [
        'Windows Vista',
        /(Windows NT 6.0)/
    ],
    [
        'Windows 7',
        /(Windows NT 6.1)/
    ],
    [
        'Windows 8',
        /(Windows NT 6.2)/
    ],
    [
        'Windows 8.1',
        /(Windows NT 6.3)/
    ],
    [
        'Windows 10',
        /(Windows NT 10.0)/
    ],
    [
        'Windows ME',
        /Windows ME/
    ],
    [
        'Windows CE',
        /Windows CE|WinCE|Microsoft Pocket Internet Explorer/
    ],
    [
        'Open BSD',
        /OpenBSD/
    ],
    [
        'Sun OS',
        /SunOS/
    ],
    [
        'Chrome OS',
        /CrOS/
    ],
    [
        'Linux',
        /(Linux)|(X11)/
    ],
    [
        'Mac OS',
        /(Mac_PowerPC)|(Macintosh)/
    ],
    [
        'QNX',
        /QNX/
    ],
    [
        'BeOS',
        /BeOS/
    ],
    [
        'OS/2',
        /OS\/2/
    ]
];
function detect(userAgent) {
    if (!!userAgent) {
        return parseUserAgent(userAgent);
    }
    if (typeof document === 'undefined' && typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return new ReactNativeInfo();
    }
    if (typeof navigator !== 'undefined') {
        return parseUserAgent(navigator.userAgent);
    }
    return getNodeVersion();
}
function matchUserAgent(ua) {
    // opted for using reduce here rather than Array#first with a regex.test call
    // this is primarily because using the reduce we only perform the regex
    // execution once rather than once for the test and for the exec again below
    // probably something that needs to be benchmarked though
    return ua !== '' && userAgentRules.reduce(function(matched, _a) {
        var browser = _a[0], regex = _a[1];
        if (matched) {
            return matched;
        }
        var uaMatch = regex.exec(ua);
        return !!uaMatch && [
            browser,
            uaMatch
        ];
    }, false);
}
function browserName(ua) {
    var data = matchUserAgent(ua);
    return data ? data[0] : null;
}
function parseUserAgent(ua) {
    var matchedRule = matchUserAgent(ua);
    if (!matchedRule) {
        return null;
    }
    var name = matchedRule[0], match = matchedRule[1];
    if (name === 'searchbot') {
        return new BotInfo();
    }
    // Do not use RegExp for split operation as some browser do not support it (See: http://blog.stevenlevithan.com/archives/cross-browser-split)
    var versionParts = match[1] && match[1].split('.').join('_').split('_').slice(0, 3);
    if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) {
            versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
        }
    } else {
        versionParts = [];
    }
    var version = versionParts.join('.');
    var os = detectOS(ua);
    var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
    if (searchBotMatch && searchBotMatch[1]) {
        return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
    }
    return new BrowserInfo(name, version, os);
}
function detectOS(ua) {
    for(var ii = 0, count = operatingSystemRules.length; ii < count; ii++){
        var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
        var match = regex.exec(ua);
        if (match) {
            return os;
        }
    }
    return null;
}
function getNodeVersion() {
    var isNode = typeof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].version;
    return isNode ? new NodeInfo(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].version.slice(1)) : null;
}
function createVersionParts(count) {
    var output = [];
    for(var ii = 0; ii < count; ii++){
        output.push('0');
    }
    return output;
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ __turbopack_context__.s([
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__spread",
    ()=>__spread,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values
]);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}
function __exportStar(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
;
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ __turbopack_context__.s([
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__spread",
    ()=>__spread,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values
]);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}
function __exportStar(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
;
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/utils/delay.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delay = void 0;
function delay(timeout) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(true);
        }, timeout);
    });
}
exports.delay = delay; //# sourceMappingURL=delay.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/constants/misc.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
exports.ONE_HUNDRED = 100;
exports.ONE_THOUSAND = 1000; //# sourceMappingURL=misc.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/constants/time.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
exports.ONE_SECOND = 1;
exports.FIVE_SECONDS = 5;
exports.TEN_SECONDS = 10;
exports.THIRTY_SECONDS = 30;
exports.SIXTY_SECONDS = 60;
exports.ONE_MINUTE = exports.SIXTY_SECONDS;
exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
exports.ONE_HOUR = exports.SIXTY_MINUTES;
exports.THREE_HOURS = exports.ONE_HOUR * 3;
exports.SIX_HOURS = exports.ONE_HOUR * 6;
exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
exports.THREE_DAYS = exports.ONE_DAY * 3;
exports.FIVE_DAYS = exports.ONE_DAY * 5;
exports.SEVEN_DAYS = exports.ONE_DAY * 7;
exports.THIRTY_DAYS = exports.ONE_DAY * 30;
exports.ONE_WEEK = exports.SEVEN_DAYS;
exports.TWO_WEEKS = exports.ONE_WEEK * 2;
exports.THREE_WEEKS = exports.ONE_WEEK * 3;
exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
exports.ONE_YEAR = exports.ONE_DAY * 365; //# sourceMappingURL=time.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/constants/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js [app-client] (ecmascript)");
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/constants/misc.js [app-client] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/constants/time.js [app-client] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/utils/convert.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fromMiliseconds = exports.toMiliseconds = void 0;
const constants_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/constants/index.js [app-client] (ecmascript)");
function toMiliseconds(seconds) {
    return seconds * constants_1.ONE_THOUSAND;
}
exports.toMiliseconds = toMiliseconds;
function fromMiliseconds(miliseconds) {
    return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
}
exports.fromMiliseconds = fromMiliseconds; //# sourceMappingURL=convert.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/utils/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js [app-client] (ecmascript)");
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/utils/delay.js [app-client] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/utils/convert.js [app-client] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/watch.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Watch = void 0;
class Watch {
    constructor(){
        this.timestamps = new Map();
    }
    start(label) {
        if (this.timestamps.has(label)) {
            throw new Error(`Watch already started for label: ${label}`);
        }
        this.timestamps.set(label, {
            started: Date.now()
        });
    }
    stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") {
            throw new Error(`Watch already stopped for label: ${label}`);
        }
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, {
            started: timestamp.started,
            elapsed
        });
    }
    get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") {
            throw new Error(`No timestamp found for label: ${label}`);
        }
        return timestamp;
    }
    elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
    }
}
exports.Watch = Watch;
exports.default = Watch; //# sourceMappingURL=watch.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/types/watch.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IWatch = void 0;
class IWatch {
}
exports.IWatch = IWatch; //# sourceMappingURL=watch.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/types/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js [app-client] (ecmascript)");
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/types/watch.js [app-client] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js [app-client] (ecmascript)");
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/utils/index.js [app-client] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/watch.js [app-client] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/types/index.js [app-client] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/constants/index.js [app-client] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/window-getters/dist/cjs/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
function getFromWindow(name) {
    let res = undefined;
    if (typeof window !== "undefined" && typeof window[name] !== "undefined") {
        res = window[name];
    }
    return res;
}
exports.getFromWindow = getFromWindow;
function getFromWindowOrThrow(name) {
    const res = getFromWindow(name);
    if (!res) {
        throw new Error(`${name} is not defined in Window`);
    }
    return res;
}
exports.getFromWindowOrThrow = getFromWindowOrThrow;
function getDocumentOrThrow() {
    return getFromWindowOrThrow("document");
}
exports.getDocumentOrThrow = getDocumentOrThrow;
function getDocument() {
    return getFromWindow("document");
}
exports.getDocument = getDocument;
function getNavigatorOrThrow() {
    return getFromWindowOrThrow("navigator");
}
exports.getNavigatorOrThrow = getNavigatorOrThrow;
function getNavigator() {
    return getFromWindow("navigator");
}
exports.getNavigator = getNavigator;
function getLocationOrThrow() {
    return getFromWindowOrThrow("location");
}
exports.getLocationOrThrow = getLocationOrThrow;
function getLocation() {
    return getFromWindow("location");
}
exports.getLocation = getLocation;
function getCryptoOrThrow() {
    return getFromWindowOrThrow("crypto");
}
exports.getCryptoOrThrow = getCryptoOrThrow;
function getCrypto() {
    return getFromWindow("crypto");
}
exports.getCrypto = getCrypto;
function getLocalStorageOrThrow() {
    return getFromWindowOrThrow("localStorage");
}
exports.getLocalStorageOrThrow = getLocalStorageOrThrow;
function getLocalStorage() {
    return getFromWindow("localStorage");
}
exports.getLocalStorage = getLocalStorage; //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/window-metadata/dist/cjs/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWindowMetadata = void 0;
const window_getters_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/window-getters/dist/cjs/index.js [app-client] (ecmascript)");
function getWindowMetadata() {
    let doc;
    let loc;
    try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
    } catch (e) {
        return null;
    }
    function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons = [];
        for(let i = 0; i < links.length; i++){
            const link = links[i];
            const rel = link.getAttribute("rel");
            if (rel) {
                if (rel.toLowerCase().indexOf("icon") > -1) {
                    const href = link.getAttribute("href");
                    if (href) {
                        if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                            let absoluteHref = loc.protocol + "//" + loc.host;
                            if (href.indexOf("/") === 0) {
                                absoluteHref += href;
                            } else {
                                const path = loc.pathname.split("/");
                                path.pop();
                                const finalPath = path.join("/");
                                absoluteHref += finalPath + "/" + href;
                            }
                            icons.push(absoluteHref);
                        } else if (href.indexOf("//") === 0) {
                            const absoluteUrl = loc.protocol + href;
                            icons.push(absoluteUrl);
                        } else {
                            icons.push(href);
                        }
                    }
                }
            }
        }
        return icons;
    }
    function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for(let i = 0; i < metaTags.length; i++){
            const tag = metaTags[i];
            const attributes = [
                "itemprop",
                "property",
                "name"
            ].map((target)=>tag.getAttribute(target)).filter((attr)=>{
                if (attr) {
                    return args.includes(attr);
                }
                return false;
            });
            if (attributes.length && attributes) {
                const content = tag.getAttribute("content");
                if (content) {
                    return content;
                }
            }
        }
        return "";
    }
    function getName() {
        let name = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name) {
            name = doc.title;
        }
        return name;
    }
    function getDescription() {
        const description = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description;
    }
    const name = getName();
    const description = getDescription();
    const url = loc.origin;
    const icons = getIcons();
    const meta = {
        description,
        url,
        icons,
        name
    };
    return meta;
}
exports.getWindowMetadata = getWindowMetadata; //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/version.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
const version = '2.23.2'; //# sourceMappingURL=version.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseError",
    ()=>BaseError,
    "setErrorConfig",
    ()=>setErrorConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/version.js [app-client] (ecmascript)");
;
let errorConfig = {
    getDocsUrl: ({ docsBaseUrl, docsPath = '', docsSlug })=>docsPath ? `${docsBaseUrl ?? 'https://viem.sh'}${docsPath}${docsSlug ? `#${docsSlug}` : ''}` : undefined,
    version: `viem@${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]}`
};
function setErrorConfig(config) {
    errorConfig = config;
}
class BaseError extends Error {
    constructor(shortMessage, args = {}){
        const details = (()=>{
            if (args.cause instanceof BaseError) return args.cause.details;
            if (args.cause?.message) return args.cause.message;
            return args.details;
        })();
        const docsPath = (()=>{
            if (args.cause instanceof BaseError) return args.cause.docsPath || args.docsPath;
            return args.docsPath;
        })();
        const docsUrl = errorConfig.getDocsUrl?.({
            ...args,
            docsPath
        });
        const message = [
            shortMessage || 'An error occurred.',
            '',
            ...args.metaMessages ? [
                ...args.metaMessages,
                ''
            ] : [],
            ...docsUrl ? [
                `Docs: ${docsUrl}`
            ] : [],
            ...details ? [
                `Details: ${details}`
            ] : [],
            ...errorConfig.version ? [
                `Version: ${errorConfig.version}`
            ] : []
        ].join('\n');
        super(message, args.cause ? {
            cause: args.cause
        } : undefined);
        Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'BaseError'
        });
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = args.metaMessages;
        this.name = args.name ?? this.name;
        this.shortMessage = shortMessage;
        this.version = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"];
    }
    walk(fn) {
        return walk(this, fn);
    }
}
function walk(err, fn) {
    if (fn?.(err)) return err;
    if (err && typeof err === 'object' && 'cause' in err && err.cause !== undefined) return walk(err.cause, fn);
    return fn ? null : err;
} //# sourceMappingURL=base.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/address.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidAddressError",
    ()=>InvalidAddressError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class InvalidAddressError extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ address }){
        super(`Address "${address}" is invalid.`, {
            metaMessages: [
                '- Address must be a hex value of 20 bytes (40 hex characters).',
                '- Address must match its checksum counterpart.'
            ],
            name: 'InvalidAddressError'
        });
    }
} //# sourceMappingURL=address.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isHex",
    ()=>isHex
]);
function isHex(value, { strict = true } = {}) {
    if (!value) return false;
    if (typeof value !== 'string') return false;
    return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith('0x');
} //# sourceMappingURL=isHex.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/data.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidBytesLengthError",
    ()=>InvalidBytesLengthError,
    "SizeExceedsPaddingSizeError",
    ()=>SizeExceedsPaddingSizeError,
    "SliceOffsetOutOfBoundsError",
    ()=>SliceOffsetOutOfBoundsError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class SliceOffsetOutOfBoundsError extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ offset, position, size }){
        super(`Slice ${position === 'start' ? 'starting' : 'ending'} at offset "${offset}" is out-of-bounds (size: ${size}).`, {
            name: 'SliceOffsetOutOfBoundsError'
        });
    }
}
class SizeExceedsPaddingSizeError extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ size, targetSize, type }){
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size}) exceeds padding size (${targetSize}).`, {
            name: 'SizeExceedsPaddingSizeError'
        });
    }
}
class InvalidBytesLengthError extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ size, targetSize, type }){
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} is expected to be ${targetSize} ${type} long, but is ${size} ${type} long.`, {
            name: 'InvalidBytesLengthError'
        });
    }
} //# sourceMappingURL=data.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pad",
    ()=>pad,
    "padBytes",
    ()=>padBytes,
    "padHex",
    ()=>padHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/data.js [app-client] (ecmascript)");
;
function pad(hexOrBytes, { dir, size = 32 } = {}) {
    if (typeof hexOrBytes === 'string') return padHex(hexOrBytes, {
        dir,
        size
    });
    return padBytes(hexOrBytes, {
        dir,
        size
    });
}
function padHex(hex_, { dir, size = 32 } = {}) {
    if (size === null) return hex_;
    const hex = hex_.replace('0x', '');
    if (hex.length > size * 2) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SizeExceedsPaddingSizeError"]({
        size: Math.ceil(hex.length / 2),
        targetSize: size,
        type: 'hex'
    });
    return `0x${hex[dir === 'right' ? 'padEnd' : 'padStart'](size * 2, '0')}`;
}
function padBytes(bytes, { dir, size = 32 } = {}) {
    if (size === null) return bytes;
    if (bytes.length > size) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SizeExceedsPaddingSizeError"]({
        size: bytes.length,
        targetSize: size,
        type: 'bytes'
    });
    const paddedBytes = new Uint8Array(size);
    for(let i = 0; i < size; i++){
        const padEnd = dir === 'right';
        paddedBytes[padEnd ? i : size - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
    }
    return paddedBytes;
} //# sourceMappingURL=pad.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/encoding.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntegerOutOfRangeError",
    ()=>IntegerOutOfRangeError,
    "InvalidBytesBooleanError",
    ()=>InvalidBytesBooleanError,
    "InvalidHexBooleanError",
    ()=>InvalidHexBooleanError,
    "InvalidHexValueError",
    ()=>InvalidHexValueError,
    "SizeOverflowError",
    ()=>SizeOverflowError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class IntegerOutOfRangeError extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ max, min, signed, size, value }){
        super(`Number "${value}" is not in safe ${size ? `${size * 8}-bit ${signed ? 'signed' : 'unsigned'} ` : ''}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, {
            name: 'IntegerOutOfRangeError'
        });
    }
}
class InvalidBytesBooleanError extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(bytes){
        super(`Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, {
            name: 'InvalidBytesBooleanError'
        });
    }
}
class InvalidHexBooleanError extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(hex){
        super(`Hex value "${hex}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`, {
            name: 'InvalidHexBooleanError'
        });
    }
}
class InvalidHexValueError extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(value){
        super(`Hex value "${value}" is an odd length (${value.length}). It must be an even length.`, {
            name: 'InvalidHexValueError'
        });
    }
}
class SizeOverflowError extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ givenSize, maxSize }){
        super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, {
            name: 'SizeOverflowError'
        });
    }
} //# sourceMappingURL=encoding.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/size.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
;
function size(value) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    })) return Math.ceil((value.length - 2) / 2);
    return value.length;
} //# sourceMappingURL=size.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/trim.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trim",
    ()=>trim
]);
function trim(hexOrBytes, { dir = 'left' } = {}) {
    let data = typeof hexOrBytes === 'string' ? hexOrBytes.replace('0x', '') : hexOrBytes;
    let sliceLength = 0;
    for(let i = 0; i < data.length - 1; i++){
        if (data[dir === 'left' ? i : data.length - i - 1].toString() === '0') sliceLength++;
        else break;
    }
    data = dir === 'left' ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
    if (typeof hexOrBytes === 'string') {
        if (data.length === 1 && dir === 'right') data = `${data}0`;
        return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
    }
    return data;
} //# sourceMappingURL=trim.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertSize",
    ()=>assertSize,
    "fromHex",
    ()=>fromHex,
    "hexToBigInt",
    ()=>hexToBigInt,
    "hexToBool",
    ()=>hexToBool,
    "hexToNumber",
    ()=>hexToNumber,
    "hexToString",
    ()=>hexToString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/encoding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/size.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/trim.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
;
;
;
;
function assertSize(hexOrBytes, { size }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["size"])(hexOrBytes) > size) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SizeOverflowError"]({
        givenSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["size"])(hexOrBytes),
        maxSize: size
    });
}
function fromHex(hex, toOrOpts) {
    const opts = typeof toOrOpts === 'string' ? {
        to: toOrOpts
    } : toOrOpts;
    const to = opts.to;
    if (to === 'number') return hexToNumber(hex, opts);
    if (to === 'bigint') return hexToBigInt(hex, opts);
    if (to === 'string') return hexToString(hex, opts);
    if (to === 'boolean') return hexToBool(hex, opts);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBytes"])(hex, opts);
}
function hexToBigInt(hex, opts = {}) {
    const { signed } = opts;
    if (opts.size) assertSize(hex, {
        size: opts.size
    });
    const value = BigInt(hex);
    if (!signed) return value;
    const size = (hex.length - 2) / 2;
    const max = (1n << BigInt(size) * 8n - 1n) - 1n;
    if (value <= max) return value;
    return value - BigInt(`0x${'f'.padStart(size * 2, 'f')}`) - 1n;
}
function hexToBool(hex_, opts = {}) {
    let hex = hex_;
    if (opts.size) {
        assertSize(hex, {
            size: opts.size
        });
        hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(hex);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(hex) === '0x00') return false;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(hex) === '0x01') return true;
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidHexBooleanError"](hex);
}
function hexToNumber(hex, opts = {}) {
    return Number(hexToBigInt(hex, opts));
}
function hexToString(hex, opts = {}) {
    let bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBytes"])(hex);
    if (opts.size) {
        assertSize(bytes, {
            size: opts.size
        });
        bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(bytes, {
            dir: 'right'
        });
    }
    return new TextDecoder().decode(bytes);
} //# sourceMappingURL=fromHex.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boolToHex",
    ()=>boolToHex,
    "bytesToHex",
    ()=>bytesToHex,
    "numberToHex",
    ()=>numberToHex,
    "stringToHex",
    ()=>stringToHex,
    "toHex",
    ()=>toHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/encoding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)");
;
;
;
const hexes = /*#__PURE__*/ Array.from({
    length: 256
}, (_v, i)=>i.toString(16).padStart(2, '0'));
function toHex(value, opts = {}) {
    if (typeof value === 'number' || typeof value === 'bigint') return numberToHex(value, opts);
    if (typeof value === 'string') {
        return stringToHex(value, opts);
    }
    if (typeof value === 'boolean') return boolToHex(value, opts);
    return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
    const hex = `0x${Number(value)}`;
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
            size: opts.size
        });
    }
    return hex;
}
function bytesToHex(value, opts = {}) {
    let string = '';
    for(let i = 0; i < value.length; i++){
        string += hexes[value[i]];
    }
    const hex = `0x${string}`;
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
            dir: 'right',
            size: opts.size
        });
    }
    return hex;
}
function numberToHex(value_, opts = {}) {
    const { signed, size } = opts;
    const value = BigInt(value_);
    let maxValue;
    if (size) {
        if (signed) maxValue = (1n << BigInt(size) * 8n - 1n) - 1n;
        else maxValue = 2n ** (BigInt(size) * 8n) - 1n;
    } else if (typeof value_ === 'number') {
        maxValue = BigInt(Number.MAX_SAFE_INTEGER);
    }
    const minValue = typeof maxValue === 'bigint' && signed ? -maxValue - 1n : 0;
    if (maxValue && value > maxValue || value < minValue) {
        const suffix = typeof value_ === 'bigint' ? 'n' : '';
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntegerOutOfRangeError"]({
            max: maxValue ? `${maxValue}${suffix}` : undefined,
            min: `${minValue}${suffix}`,
            signed,
            size,
            value: `${value_}${suffix}`
        });
    }
    const hex = `0x${(signed && value < 0 ? (1n << BigInt(size * 8)) + BigInt(value) : value).toString(16)}`;
    if (size) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
        size
    });
    return hex;
}
const encoder = /*#__PURE__*/ new TextEncoder();
function stringToHex(value_, opts = {}) {
    const value = encoder.encode(value_);
    return bytesToHex(value, opts);
} //# sourceMappingURL=toHex.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boolToBytes",
    ()=>boolToBytes,
    "hexToBytes",
    ()=>hexToBytes,
    "numberToBytes",
    ()=>numberToBytes,
    "stringToBytes",
    ()=>stringToBytes,
    "toBytes",
    ()=>toBytes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
;
;
const encoder = /*#__PURE__*/ new TextEncoder();
function toBytes(value, opts = {}) {
    if (typeof value === 'number' || typeof value === 'bigint') return numberToBytes(value, opts);
    if (typeof value === 'boolean') return boolToBytes(value, opts);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value)) return hexToBytes(value, opts);
    return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
    const bytes = new Uint8Array(1);
    bytes[0] = Number(value);
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(bytes, {
            size: opts.size
        });
    }
    return bytes;
}
// We use very optimized technique to convert hex string to byte array
const charCodeMap = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function charCodeToBase16(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine) return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F) return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f) return char - (charCodeMap.a - 10);
    return undefined;
}
function hexToBytes(hex_, opts = {}) {
    let hex = hex_;
    if (opts.size) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
            dir: 'right',
            size: opts.size
        });
    }
    let hexString = hex.slice(2);
    if (hexString.length % 2) hexString = `0${hexString}`;
    const length = hexString.length / 2;
    const bytes = new Uint8Array(length);
    for(let index = 0, j = 0; index < length; index++){
        const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
        const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
        if (nibbleLeft === undefined || nibbleRight === undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"](`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
        }
        bytes[index] = nibbleLeft * 16 + nibbleRight;
    }
    return bytes;
}
function numberToBytes(value, opts) {
    const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(value, opts);
    return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
    const bytes = encoder.encode(value);
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(bytes, {
            dir: 'right',
            size: opts.size
        });
    }
    return bytes;
} //# sourceMappingURL=toBytes.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "keccak256",
    ()=>keccak256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/sha3.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
;
function keccak256(value, to_) {
    const to = to_ || 'hex';
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak_256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    }) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(value) : value);
    if (to === 'bytes') return bytes;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(bytes);
} //# sourceMappingURL=keccak256.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/lru.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Map with a LRU (Least recently used) policy.
 *
 * @link https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU
 */ __turbopack_context__.s([
    "LruMap",
    ()=>LruMap
]);
class LruMap extends Map {
    constructor(size){
        super();
        Object.defineProperty(this, "maxSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxSize = size;
    }
    get(key) {
        const value = super.get(key);
        if (super.has(key) && value !== undefined) {
            this.delete(key);
            super.set(key, value);
        }
        return value;
    }
    set(key, value) {
        super.set(key, value);
        if (this.maxSize && this.size > this.maxSize) {
            const firstKey = this.keys().next().value;
            if (firstKey) this.delete(firstKey);
        }
        return this;
    }
} //# sourceMappingURL=lru.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAddress",
    ()=>isAddress,
    "isAddressCache",
    ()=>isAddressCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/lru.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
;
;
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
const isAddressCache = /*#__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LruMap"](8192);
function isAddress(address, options) {
    const { strict = true } = options ?? {};
    const cacheKey = `${address}.${strict}`;
    if (isAddressCache.has(cacheKey)) return isAddressCache.get(cacheKey);
    const result = (()=>{
        if (!addressRegex.test(address)) return false;
        if (address.toLowerCase() === address) return true;
        if (strict) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checksumAddress"])(address) === address;
        return true;
    })();
    isAddressCache.set(cacheKey, result);
    return result;
} //# sourceMappingURL=isAddress.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checksumAddress",
    ()=>checksumAddress,
    "getAddress",
    ()=>getAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/lru.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)");
;
;
;
;
;
const checksumAddressCache = /*#__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LruMap"](8192);
function checksumAddress(address_, /**
 * Warning: EIP-1191 checksum addresses are generally not backwards compatible with the
 * wider Ethereum ecosystem, meaning it will break when validated against an application/tool
 * that relies on EIP-55 checksum encoding (checksum without chainId).
 *
 * It is highly recommended to not use this feature unless you
 * know what you are doing.
 *
 * See more: https://github.com/ethereum/EIPs/issues/1121
 */ chainId) {
    if (checksumAddressCache.has(`${address_}.${chainId}`)) return checksumAddressCache.get(`${address_}.${chainId}`);
    const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
    const hash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringToBytes"])(hexAddress), 'bytes');
    const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split('');
    for(let i = 0; i < 40; i += 2){
        if (hash[i >> 1] >> 4 >= 8 && address[i]) {
            address[i] = address[i].toUpperCase();
        }
        if ((hash[i >> 1] & 0x0f) >= 8 && address[i + 1]) {
            address[i + 1] = address[i + 1].toUpperCase();
        }
    }
    const result = `0x${address.join('')}`;
    checksumAddressCache.set(`${address_}.${chainId}`, result);
    return result;
}
function getAddress(address, /**
 * Warning: EIP-1191 checksum addresses are generally not backwards compatible with the
 * wider Ethereum ecosystem, meaning it will break when validated against an application/tool
 * that relies on EIP-55 checksum encoding (checksum without chainId).
 *
 * It is highly recommended to not use this feature unless you
 * know what you are doing.
 *
 * See more: https://github.com/ethereum/EIPs/issues/1121
 */ chainId) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(address, {
        strict: false
    })) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidAddressError"]({
        address
    });
    return checksumAddress(address, chainId);
} //# sourceMappingURL=getAddress.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "publicKeyToAddress",
    ()=>publicKeyToAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)");
;
;
function publicKeyToAddress(publicKey) {
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])(`0x${publicKey.substring(4)}`).substring(26);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checksumAddress"])(`0x${address}`);
} //# sourceMappingURL=publicKeyToAddress.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverPublicKey.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recoverPublicKey",
    ()=>recoverPublicKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
async function recoverPublicKey({ hash, signature }) {
    const hashHex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(hash) ? hash : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(hash);
    const { secp256k1 } = await __turbopack_context__.A("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/curves/esm/secp256k1.js [app-client] (ecmascript, async loader)");
    const signature_ = (()=>{
        // typeof signature: `Signature`
        if (typeof signature === 'object' && 'r' in signature && 's' in signature) {
            const { r, s, v, yParity } = signature;
            const yParityOrV = Number(yParity ?? v);
            const recoveryBit = toRecoveryBit(yParityOrV);
            return new secp256k1.Signature((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBigInt"])(r), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBigInt"])(s)).addRecoveryBit(recoveryBit);
        }
        // typeof signature: `Hex | ByteArray`
        const signatureHex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(signature) ? signature : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(signature);
        const yParityOrV = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToNumber"])(`0x${signatureHex.slice(130)}`);
        const recoveryBit = toRecoveryBit(yParityOrV);
        return secp256k1.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
    })();
    const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
    return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
    if (yParityOrV === 0 || yParityOrV === 1) return yParityOrV;
    if (yParityOrV === 27) return 0;
    if (yParityOrV === 28) return 1;
    throw new Error('Invalid yParityOrV value');
} //# sourceMappingURL=recoverPublicKey.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverAddress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recoverAddress",
    ()=>recoverAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$publicKeyToAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$recoverPublicKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverPublicKey.js [app-client] (ecmascript)");
;
;
async function recoverAddress({ hash, signature }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$publicKeyToAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicKeyToAddress"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$recoverPublicKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recoverPublicKey"])({
        hash: hash,
        signature
    }));
} //# sourceMappingURL=recoverAddress.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/_assert.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Internal assertion helpers.
 * @module
 */ /** Asserts something is positive integer. */ __turbopack_context__.s([
    "abytes",
    ()=>abytes,
    "aexists",
    ()=>aexists,
    "ahash",
    ()=>ahash,
    "anumber",
    ()=>anumber,
    "aoutput",
    ()=>aoutput
]);
function anumber(n) {
    if (!Number.isSafeInteger(n) || n < 0) throw new Error('positive integer expected, got ' + n);
}
/** Is number an Uint8Array? Copied from utils for perf. */ function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array';
}
/** Asserts something is Uint8Array. */ function abytes(b, ...lengths) {
    if (!isBytes(b)) throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error('Uint8Array expected of length ' + lengths + ', got length=' + b.length);
}
/** Asserts something is hash */ function ahash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function') throw new Error('Hash should be wrapped by utils.wrapConstructor');
    anumber(h.outputLen);
    anumber(h.blockLen);
}
/** Asserts a hash instance has not been destroyed / finished */ function aexists(instance, checkFinished = true) {
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
/** Asserts output is properly-sized byte array */ function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error('digestInto() expects output buffer of length at least ' + min);
    }
}
;
 //# sourceMappingURL=_assert.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/_u64.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Internal helpers for u64. BigUint64Array is too slow as per 2025, so we implement it using Uint32Array.
 * @todo re-check https://issues.chromium.org/issues/42212588
 * @module
 */ __turbopack_context__.s([
    "add",
    ()=>add,
    "add3H",
    ()=>add3H,
    "add3L",
    ()=>add3L,
    "add4H",
    ()=>add4H,
    "add4L",
    ()=>add4L,
    "add5H",
    ()=>add5H,
    "add5L",
    ()=>add5L,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fromBig",
    ()=>fromBig,
    "rotlBH",
    ()=>rotlBH,
    "rotlBL",
    ()=>rotlBL,
    "rotlSH",
    ()=>rotlSH,
    "rotlSL",
    ()=>rotlSL,
    "rotr32H",
    ()=>rotr32H,
    "rotr32L",
    ()=>rotr32L,
    "rotrBH",
    ()=>rotrBH,
    "rotrBL",
    ()=>rotrBL,
    "rotrSH",
    ()=>rotrSH,
    "rotrSL",
    ()=>rotrSL,
    "shrSH",
    ()=>shrSH,
    "shrSL",
    ()=>shrSL,
    "split",
    ()=>split,
    "toBig",
    ()=>toBig
]);
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
    if (le) return {
        h: Number(n & U32_MASK64),
        l: Number(n >> _32n & U32_MASK64)
    };
    return {
        h: Number(n >> _32n & U32_MASK64) | 0,
        l: Number(n & U32_MASK64) | 0
    };
}
function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for(let i = 0; i < lst.length; i++){
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [
            h,
            l
        ];
    }
    return [
        Ah,
        Al
    ];
}
const toBig = (h, l)=>BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
// for Shift in [0, 32)
const shrSH = (h, _l, s)=>h >>> s;
const shrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s)=>h >>> s | l << 32 - s;
const rotrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s)=>h << 64 - s | l >>> s - 32;
const rotrBL = (h, l, s)=>h >>> s - 32 | l << 64 - s;
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l)=>l;
const rotr32L = (h, _l)=>h;
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s)=>h << s | l >>> 32 - s;
const rotlSL = (h, l, s)=>l << s | h >>> 32 - s;
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s)=>l << s - 32 | h >>> 64 - s;
const rotlBL = (h, l, s)=>h << s - 32 | l >>> 64 - s;
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return {
        h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
        l: l | 0
    };
}
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch)=>Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
const add4L = (Al, Bl, Cl, Dl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh)=>Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
const add5L = (Al, Bl, Cl, Dl, El)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh)=>Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
;
// prettier-ignore
const u64 = {
    fromBig,
    split,
    toBig,
    shrSH,
    shrSL,
    rotrSH,
    rotrSL,
    rotrBH,
    rotrBL,
    rotr32H,
    rotr32L,
    rotlSH,
    rotlSL,
    rotlBH,
    rotlBL,
    add,
    add3L,
    add3H,
    add4L,
    add4H,
    add5H,
    add5L
};
const __TURBOPACK__default__export__ = u64;
 //# sourceMappingURL=_u64.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/crypto.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "crypto",
    ()=>crypto
]);
const crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined; //# sourceMappingURL=crypto.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utilities for hex, bytes, CSPRNG.
 * @module
 */ /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ // We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated (2025-04-30), we can just drop the import.
__turbopack_context__.s([
    "Hash",
    ()=>Hash,
    "asyncLoop",
    ()=>asyncLoop,
    "byteSwap",
    ()=>byteSwap,
    "byteSwap32",
    ()=>byteSwap32,
    "byteSwapIfBE",
    ()=>byteSwapIfBE,
    "bytesToHex",
    ()=>bytesToHex,
    "checkOpts",
    ()=>checkOpts,
    "concatBytes",
    ()=>concatBytes,
    "createView",
    ()=>createView,
    "hexToBytes",
    ()=>hexToBytes,
    "isBytes",
    ()=>isBytes,
    "isLE",
    ()=>isLE,
    "nextTick",
    ()=>nextTick,
    "randomBytes",
    ()=>randomBytes,
    "rotl",
    ()=>rotl,
    "rotr",
    ()=>rotr,
    "toBytes",
    ()=>toBytes,
    "u32",
    ()=>u32,
    "u8",
    ()=>u8,
    "utf8ToBytes",
    ()=>utf8ToBytes,
    "wrapConstructor",
    ()=>wrapConstructor,
    "wrapConstructorWithOpts",
    ()=>wrapConstructorWithOpts,
    "wrapXOFConstructorWithOpts",
    ()=>wrapXOFConstructorWithOpts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/crypto.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/_assert.js [app-client] (ecmascript)");
;
;
function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array';
}
function u8(arr) {
    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
    return word << 32 - shift | word >>> shift;
}
function rotl(word, shift) {
    return word << shift | word >>> 32 - shift >>> 0;
}
const isLE = /* @__PURE__ */ (()=>new Uint8Array(new Uint32Array([
        0x11223344
    ]).buffer)[0] === 0x44)();
function byteSwap(word) {
    return word << 24 & 0xff000000 | word << 8 & 0xff0000 | word >>> 8 & 0xff00 | word >>> 24 & 0xff;
}
const byteSwapIfBE = isLE ? (n)=>n : (n)=>byteSwap(n);
function byteSwap32(arr) {
    for(let i = 0; i < arr.length; i++){
        arr[i] = byteSwap(arr[i]);
    }
}
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
function bytesToHex(bytes) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(bytes);
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
// We use optimized technique to convert hex string to byte array
const asciis = {
    _0: 48,
    _9: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0; // '2' => 50-48
    if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10); // 'B' => 66-(65-10)
    if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10); // 'b' => 98-(97-10)
    return;
}
function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new Error('hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for(let ai = 0, hi = 0; ai < al; ai++, hi += 2){
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
    }
    return array;
}
const nextTick = async ()=>{};
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await nextTick();
        ts += diff;
    }
}
function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error('utf8ToBytes expected string, got ' + typeof str);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
function toBytes(data) {
    if (typeof data === 'string') data = utf8ToBytes(data);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(data);
    return data;
}
function concatBytes(...arrays) {
    let sum = 0;
    for(let i = 0; i < arrays.length; i++){
        const a = arrays[i];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for(let i = 0, pad = 0; i < arrays.length; i++){
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
class Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
function checkOpts(defaults, opts) {
    if (opts !== undefined && ({}).toString.call(opts) !== '[object Object]') throw new Error('Options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
function wrapConstructor(hashCons) {
    const hashC = (msg)=>hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = ()=>hashCons();
    return hashC;
}
function wrapConstructorWithOpts(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
function randomBytes(bytesLength = 32) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].getRandomValues === 'function') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].getRandomValues(new Uint8Array(bytesLength));
    }
    // Legacy Node.js compatibility
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].randomBytes === 'function') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].randomBytes(bytesLength);
    }
    throw new Error('crypto.getRandomValues must be defined');
} //# sourceMappingURL=utils.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/sha3.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SHA3 (keccak) hash function, based on a new "Sponge function" design.
 * Different from older hashes, the internal state is bigger than output size.
 *
 * Check out [FIPS-202](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf),
 * [Website](https://keccak.team/keccak.html),
 * [the differences between SHA-3 and Keccak](https://crypto.stackexchange.com/questions/15727/what-are-the-key-differences-between-the-draft-sha-3-standard-and-the-keccak-sub).
 *
 * Check out `sha3-addons` module for cSHAKE, k12, and others.
 * @module
 */ __turbopack_context__.s([
    "Keccak",
    ()=>Keccak,
    "keccakP",
    ()=>keccakP,
    "keccak_224",
    ()=>keccak_224,
    "keccak_256",
    ()=>keccak_256,
    "keccak_384",
    ()=>keccak_384,
    "keccak_512",
    ()=>keccak_512,
    "sha3_224",
    ()=>sha3_224,
    "sha3_256",
    ()=>sha3_256,
    "sha3_384",
    ()=>sha3_384,
    "sha3_512",
    ()=>sha3_512,
    "shake128",
    ()=>shake128,
    "shake256",
    ()=>shake256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/_assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/_u64.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
;
;
// Various per round constants calculations
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
const _0n = /* @__PURE__ */ BigInt(0);
const _1n = /* @__PURE__ */ BigInt(1);
const _2n = /* @__PURE__ */ BigInt(2);
const _7n = /* @__PURE__ */ BigInt(7);
const _256n = /* @__PURE__ */ BigInt(256);
const _0x71n = /* @__PURE__ */ BigInt(0x71);
for(let round = 0, R = _1n, x = 1, y = 0; round < 24; round++){
    // Pi
    [x, y] = [
        y,
        (2 * x + 3 * y) % 5
    ];
    SHA3_PI.push(2 * (5 * y + x));
    // Rotational
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    // Iota
    let t = _0n;
    for(let j = 0; j < 7; j++){
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n) t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
    }
    _SHA3_IOTA.push(t);
}
const [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["split"])(_SHA3_IOTA, true);
// Left rotation (without 0, 32, 64)
const rotlH = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlBH"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlSH"])(h, l, s);
const rotlL = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlBL"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlSL"])(h, l, s);
function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    // NOTE: all indices are x2 since we store state as u32 instead of u64 (bigints to slow in js)
    for(let round = 24 - rounds; round < 24; round++){
        // Theta θ
        for(let x = 0; x < 10; x++)B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for(let x = 0; x < 10; x += 2){
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for(let y = 0; y < 50; y += 10){
                s[x + y] ^= Th;
                s[x + y + 1] ^= Tl;
            }
        }
        // Rho (ρ) and Pi (π)
        let curH = s[2];
        let curL = s[3];
        for(let t = 0; t < 24; t++){
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
        }
        // Chi (χ)
        for(let y = 0; y < 50; y += 10){
            for(let x = 0; x < 10; x++)B[x] = s[y + x];
            for(let x = 0; x < 10; x++)s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        // Iota (ι)
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
    }
    B.fill(0);
}
class Keccak extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hash"] {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24){
        super();
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        // Can be passed from user as dkLen
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(outputLen);
        // 1600 = 5x5 matrix of 64bit.  1600 bits === 200 bytes
        // 0 < blockLen < 200
        if (0 >= this.blockLen || this.blockLen >= 200) throw new Error('Sha3 supports only keccak-f1600 function');
        this.state = new Uint8Array(200);
        this.state32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(this.state);
    }
    keccak() {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLE"]) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["byteSwap32"])(this.state32);
        keccakP(this.state32, this.rounds);
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLE"]) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["byteSwap32"])(this.state32);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this);
        const { blockLen, state } = this;
        data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(data);
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            for(let i = 0; i < take; i++)state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen) this.keccak();
        }
        return this;
    }
    finish() {
        if (this.finished) return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        // Do the padding
        state[pos] ^= suffix;
        if ((suffix & 0x80) !== 0 && pos === blockLen - 1) this.keccak();
        state[blockLen - 1] ^= 0x80;
        this.keccak();
    }
    writeInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this, false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for(let pos = 0, len = out.length; pos < len;){
            if (this.posOut >= blockLen) this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
        }
        return out;
    }
    xofInto(out) {
        // Sha3/Keccak usage with XOF is probably mistake, only SHAKE instances can do XOF
        if (!this.enableXOF) throw new Error('XOF is not possible for this instance');
        return this.writeInto(out);
    }
    xof(bytes) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
        if (this.finished) throw new Error('digest() was already called');
        this.writeInto(out);
        this.destroy();
        return out;
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
        this.destroyed = true;
        this.state.fill(0);
    }
    _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        // Suffix can change in cSHAKE
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
    }
}
const gen = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapConstructor"])(()=>new Keccak(blockLen, suffix, outputLen));
const sha3_224 = /* @__PURE__ */ gen(0x06, 144, 224 / 8);
const sha3_256 = /* @__PURE__ */ gen(0x06, 136, 256 / 8);
const sha3_384 = /* @__PURE__ */ gen(0x06, 104, 384 / 8);
const sha3_512 = /* @__PURE__ */ gen(0x06, 72, 512 / 8);
const keccak_224 = /* @__PURE__ */ gen(0x01, 144, 224 / 8);
const keccak_256 = /* @__PURE__ */ gen(0x01, 136, 256 / 8);
const keccak_384 = /* @__PURE__ */ gen(0x01, 104, 384 / 8);
const keccak_512 = /* @__PURE__ */ gen(0x01, 72, 512 / 8);
const genShake = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapXOFConstructorWithOpts"])((opts = {})=>new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
const shake128 = /* @__PURE__ */ genShake(0x1f, 168, 128 / 8);
const shake256 = /* @__PURE__ */ genShake(0x1f, 136, 256 / 8); //# sourceMappingURL=sha3.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/base-x/src/esm/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
function base(ALPHABET) {
    if (ALPHABET.length >= 255) {
        throw new TypeError('Alphabet too long');
    }
    const BASE_MAP = new Uint8Array(256);
    for(let j = 0; j < BASE_MAP.length; j++){
        BASE_MAP[j] = 255;
    }
    for(let i = 0; i < ALPHABET.length; i++){
        const x = ALPHABET.charAt(i);
        const xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
            throw new TypeError(x + ' is ambiguous');
        }
        BASE_MAP[xc] = i;
    }
    const BASE = ALPHABET.length;
    const LEADER = ALPHABET.charAt(0);
    const FACTOR = Math.log(BASE) / Math.log(256) // log(BASE) / log(256), rounded up
    ;
    const iFACTOR = Math.log(256) / Math.log(BASE) // log(256) / log(BASE), rounded up
    ;
    function encode(source) {
        // eslint-disable-next-line no-empty
        if (source instanceof Uint8Array) {} else if (ArrayBuffer.isView(source)) {
            source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        } else if (Array.isArray(source)) {
            source = Uint8Array.from(source);
        }
        if (!(source instanceof Uint8Array)) {
            throw new TypeError('Expected Uint8Array');
        }
        if (source.length === 0) {
            return '';
        }
        // Skip & count leading zeroes.
        let zeroes = 0;
        let length = 0;
        let pbegin = 0;
        const pend = source.length;
        while(pbegin !== pend && source[pbegin] === 0){
            pbegin++;
            zeroes++;
        }
        // Allocate enough space in big-endian base58 representation.
        const size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        const b58 = new Uint8Array(size);
        // Process the bytes.
        while(pbegin !== pend){
            let carry = source[pbegin];
            // Apply "b58 = b58 * 256 + ch".
            let i = 0;
            for(let it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++){
                carry += 256 * b58[it1] >>> 0;
                b58[it1] = carry % BASE >>> 0;
                carry = carry / BASE >>> 0;
            }
            if (carry !== 0) {
                throw new Error('Non-zero carry');
            }
            length = i;
            pbegin++;
        }
        // Skip leading zeroes in base58 result.
        let it2 = size - length;
        while(it2 !== size && b58[it2] === 0){
            it2++;
        }
        // Translate the result into a string.
        let str = LEADER.repeat(zeroes);
        for(; it2 < size; ++it2){
            str += ALPHABET.charAt(b58[it2]);
        }
        return str;
    }
    function decodeUnsafe(source) {
        if (typeof source !== 'string') {
            throw new TypeError('Expected String');
        }
        if (source.length === 0) {
            return new Uint8Array();
        }
        let psz = 0;
        // Skip and count leading '1's.
        let zeroes = 0;
        let length = 0;
        while(source[psz] === LEADER){
            zeroes++;
            psz++;
        }
        // Allocate enough space in big-endian base256 representation.
        const size = (source.length - psz) * FACTOR + 1 >>> 0 // log(58) / log(256), rounded up.
        ;
        const b256 = new Uint8Array(size);
        // Process the characters.
        while(psz < source.length){
            // Find code of next character
            const charCode = source.charCodeAt(psz);
            // Base map can not be indexed using char code
            if (charCode > 255) {
                return;
            }
            // Decode character
            let carry = BASE_MAP[charCode];
            // Invalid character
            if (carry === 255) {
                return;
            }
            let i = 0;
            for(let it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++){
                carry += BASE * b256[it3] >>> 0;
                b256[it3] = carry % 256 >>> 0;
                carry = carry / 256 >>> 0;
            }
            if (carry !== 0) {
                throw new Error('Non-zero carry');
            }
            length = i;
            psz++;
        }
        // Skip leading zeroes in b256.
        let it4 = size - length;
        while(it4 !== size && b256[it4] === 0){
            it4++;
        }
        const vch = new Uint8Array(zeroes + (size - it4));
        let j = zeroes;
        while(it4 !== size){
            vch[j++] = b256[it4++];
        }
        return vch;
    }
    function decode(string) {
        const buffer = decodeUnsafe(string);
        if (buffer) {
            return buffer;
        }
        throw new Error('Non-base' + BASE + ' character');
    }
    return {
        encode,
        decodeUnsafe,
        decode
    };
}
const __TURBOPACK__default__export__ = base;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/bs58/src/esm/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$base$2d$x$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/base-x/src/esm/index.js [app-client] (ecmascript)");
;
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$base$2d$x$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(ALPHABET);
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "safeJsonParse",
    ()=>safeJsonParse,
    "safeJsonStringify",
    ()=>safeJsonStringify
]);
const JSONStringify = (data)=>JSON.stringify(data, (_, value)=>typeof value === "bigint" ? value.toString() + "n" : value);
const JSONParse = (json)=>{
    const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
    const serializedData = json.replace(numbersBiggerThanMaxInt, "$1\"$2n\"$3");
    return JSON.parse(serializedData, (_, value)=>{
        const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
        if (isCustomFormatBigInt) return BigInt(value.substring(0, value.length - 1));
        return value;
    });
};
function safeJsonParse(value) {
    if (typeof value !== "string") {
        throw new Error(`Cannot safe json parse value of type ${typeof value}`);
    }
    try {
        return JSONParse(value);
    } catch (_a) {
        return value;
    }
}
function safeJsonStringify(value) {
    return typeof value === "string" ? value : JSONStringify(value) || "";
} //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/relay-auth/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DATA_ENCODING",
    ()=>xt,
    "DID_DELIMITER",
    ()=>Vt,
    "DID_METHOD",
    ()=>Jt,
    "DID_PREFIX",
    ()=>Yt,
    "JSON_ENCODING",
    ()=>Gt,
    "JWT_DELIMITER",
    ()=>ut,
    "JWT_ENCODING",
    ()=>Dt,
    "JWT_IRIDIUM_ALG",
    ()=>jt,
    "JWT_IRIDIUM_TYP",
    ()=>Zt,
    "KEY_PAIR_SEED_LENGTH",
    ()=>Ne,
    "MULTICODEC_ED25519_BASE",
    ()=>Kt,
    "MULTICODEC_ED25519_ENCODING",
    ()=>dt,
    "MULTICODEC_ED25519_HEADER",
    ()=>Wt,
    "MULTICODEC_ED25519_LENGTH",
    ()=>Fe,
    "decodeData",
    ()=>Xo,
    "decodeIss",
    ()=>tn,
    "decodeJSON",
    ()=>lt,
    "decodeJWT",
    ()=>sn,
    "decodeSig",
    ()=>nn,
    "encodeData",
    ()=>rn,
    "encodeIss",
    ()=>Qe,
    "encodeJSON",
    ()=>bt,
    "encodeJWT",
    ()=>on,
    "encodeSig",
    ()=>en,
    "generateKeyPair",
    ()=>Po,
    "signJWT",
    ()=>Qo,
    "verifyJWT",
    ()=>ts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-client] (ecmascript)");
;
;
function En(t) {
    return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function fe(t, ...e) {
    if (!En(t)) throw new Error("Uint8Array expected");
    if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function De(t, e = !0) {
    if (t.destroyed) throw new Error("Hash instance has been destroyed");
    if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function gn(t, e) {
    fe(t);
    const n = e.outputLen;
    if (t.length < n) throw new Error("digestInto() expects output buffer of length at least " + n);
}
const it = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0; /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ 
const _t = (t)=>new DataView(t.buffer, t.byteOffset, t.byteLength);
function yn(t) {
    if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
    return new Uint8Array(new TextEncoder().encode(t));
}
function de(t) {
    return typeof t == "string" && (t = yn(t)), fe(t), t;
}
class xn {
    clone() {
        return this._cloneInto();
    }
}
function Bn(t) {
    const e = (r)=>t().update(de(r)).digest(), n = t();
    return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = ()=>t(), e;
}
function he(t = 32) {
    if (it && typeof it.getRandomValues == "function") return it.getRandomValues(new Uint8Array(t));
    if (it && typeof it.randomBytes == "function") return it.randomBytes(t);
    throw new Error("crypto.getRandomValues must be defined");
}
function Cn(t, e, n, r) {
    if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, n, r);
    const o = BigInt(32), s = BigInt(4294967295), a = Number(n >> o & s), u = Number(n & s), i = r ? 4 : 0, D = r ? 0 : 4;
    t.setUint32(e + i, a, r), t.setUint32(e + D, u, r);
}
class An extends xn {
    constructor(e, n, r, o){
        super(), this.blockLen = e, this.outputLen = n, this.padOffset = r, this.isLE = o, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = _t(this.buffer);
    }
    update(e) {
        De(this);
        const { view: n, buffer: r, blockLen: o } = this;
        e = de(e);
        const s = e.length;
        for(let a = 0; a < s;){
            const u = Math.min(o - this.pos, s - a);
            if (u === o) {
                const i = _t(e);
                for(; o <= s - a; a += o)this.process(i, a);
                continue;
            }
            r.set(e.subarray(a, a + u), this.pos), this.pos += u, a += u, this.pos === o && (this.process(n, 0), this.pos = 0);
        }
        return this.length += e.length, this.roundClean(), this;
    }
    digestInto(e) {
        De(this), gn(e, this), this.finished = !0;
        const { buffer: n, view: r, blockLen: o, isLE: s } = this;
        let { pos: a } = this;
        n[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > o - a && (this.process(r, 0), a = 0);
        for(let l = a; l < o; l++)n[l] = 0;
        Cn(r, o - 8, BigInt(this.length * 8), s), this.process(r, 0);
        const u = _t(e), i = this.outputLen;
        if (i % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
        const D = i / 4, c = this.get();
        if (D > c.length) throw new Error("_sha2: outputLen bigger than state");
        for(let l = 0; l < D; l++)u.setUint32(4 * l, c[l], s);
    }
    digest() {
        const { buffer: e, outputLen: n } = this;
        this.digestInto(e);
        const r = e.slice(0, n);
        return this.destroy(), r;
    }
    _cloneInto(e) {
        e || (e = new this.constructor), e.set(...this.get());
        const { blockLen: n, buffer: r, length: o, finished: s, destroyed: a, pos: u } = this;
        return e.length = o, e.pos = u, e.finished = s, e.destroyed = a, o % n && e.buffer.set(r), e;
    }
}
const wt = BigInt(2 ** 32 - 1), St = BigInt(32);
function le(t, e = !1) {
    return e ? {
        h: Number(t & wt),
        l: Number(t >> St & wt)
    } : {
        h: Number(t >> St & wt) | 0,
        l: Number(t & wt) | 0
    };
}
function mn(t, e = !1) {
    let n = new Uint32Array(t.length), r = new Uint32Array(t.length);
    for(let o = 0; o < t.length; o++){
        const { h: s, l: a } = le(t[o], e);
        [n[o], r[o]] = [
            s,
            a
        ];
    }
    return [
        n,
        r
    ];
}
const _n = (t, e)=>BigInt(t >>> 0) << St | BigInt(e >>> 0), Sn = (t, e, n)=>t >>> n, vn = (t, e, n)=>t << 32 - n | e >>> n, In = (t, e, n)=>t >>> n | e << 32 - n, Un = (t, e, n)=>t << 32 - n | e >>> n, Tn = (t, e, n)=>t << 64 - n | e >>> n - 32, Fn = (t, e, n)=>t >>> n - 32 | e << 64 - n, Nn = (t, e)=>e, Ln = (t, e)=>t, On = (t, e, n)=>t << n | e >>> 32 - n, Hn = (t, e, n)=>e << n | t >>> 32 - n, zn = (t, e, n)=>e << n - 32 | t >>> 64 - n, Mn = (t, e, n)=>t << n - 32 | e >>> 64 - n;
function qn(t, e, n, r) {
    const o = (e >>> 0) + (r >>> 0);
    return {
        h: t + n + (o / 2 ** 32 | 0) | 0,
        l: o | 0
    };
}
const $n = (t, e, n)=>(t >>> 0) + (e >>> 0) + (n >>> 0), kn = (t, e, n, r)=>e + n + r + (t / 2 ** 32 | 0) | 0, Rn = (t, e, n, r)=>(t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0), jn = (t, e, n, r, o)=>e + n + r + o + (t / 2 ** 32 | 0) | 0, Zn = (t, e, n, r, o)=>(t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0) + (o >>> 0), Gn = (t, e, n, r, o, s)=>e + n + r + o + s + (t / 2 ** 32 | 0) | 0, x = {
    fromBig: le,
    split: mn,
    toBig: _n,
    shrSH: Sn,
    shrSL: vn,
    rotrSH: In,
    rotrSL: Un,
    rotrBH: Tn,
    rotrBL: Fn,
    rotr32H: Nn,
    rotr32L: Ln,
    rotlSH: On,
    rotlSL: Hn,
    rotlBH: zn,
    rotlBL: Mn,
    add: qn,
    add3L: $n,
    add3H: kn,
    add4L: Rn,
    add4H: jn,
    add5H: Gn,
    add5L: Zn
}, [Vn, Yn] = (()=>x.split([
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817"
    ].map((t)=>BigInt(t))))(), P = new Uint32Array(80), Q = new Uint32Array(80);
class Jn extends An {
    constructor(){
        super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
    }
    get() {
        const { Ah: e, Al: n, Bh: r, Bl: o, Ch: s, Cl: a, Dh: u, Dl: i, Eh: D, El: c, Fh: l, Fl: p, Gh: w, Gl: h, Hh: g, Hl: S } = this;
        return [
            e,
            n,
            r,
            o,
            s,
            a,
            u,
            i,
            D,
            c,
            l,
            p,
            w,
            h,
            g,
            S
        ];
    }
    set(e, n, r, o, s, a, u, i, D, c, l, p, w, h, g, S) {
        this.Ah = e | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = o | 0, this.Ch = s | 0, this.Cl = a | 0, this.Dh = u | 0, this.Dl = i | 0, this.Eh = D | 0, this.El = c | 0, this.Fh = l | 0, this.Fl = p | 0, this.Gh = w | 0, this.Gl = h | 0, this.Hh = g | 0, this.Hl = S | 0;
    }
    process(e, n) {
        for(let d = 0; d < 16; d++, n += 4)P[d] = e.getUint32(n), Q[d] = e.getUint32(n += 4);
        for(let d = 16; d < 80; d++){
            const m = P[d - 15] | 0, F = Q[d - 15] | 0, q = x.rotrSH(m, F, 1) ^ x.rotrSH(m, F, 8) ^ x.shrSH(m, F, 7), z = x.rotrSL(m, F, 1) ^ x.rotrSL(m, F, 8) ^ x.shrSL(m, F, 7), I = P[d - 2] | 0, O = Q[d - 2] | 0, ot = x.rotrSH(I, O, 19) ^ x.rotrBH(I, O, 61) ^ x.shrSH(I, O, 6), tt = x.rotrSL(I, O, 19) ^ x.rotrBL(I, O, 61) ^ x.shrSL(I, O, 6), st = x.add4L(z, tt, Q[d - 7], Q[d - 16]), at = x.add4H(st, q, ot, P[d - 7], P[d - 16]);
            P[d] = at | 0, Q[d] = st | 0;
        }
        let { Ah: r, Al: o, Bh: s, Bl: a, Ch: u, Cl: i, Dh: D, Dl: c, Eh: l, El: p, Fh: w, Fl: h, Gh: g, Gl: S, Hh: v, Hl: L } = this;
        for(let d = 0; d < 80; d++){
            const m = x.rotrSH(l, p, 14) ^ x.rotrSH(l, p, 18) ^ x.rotrBH(l, p, 41), F = x.rotrSL(l, p, 14) ^ x.rotrSL(l, p, 18) ^ x.rotrBL(l, p, 41), q = l & w ^ ~l & g, z = p & h ^ ~p & S, I = x.add5L(L, F, z, Yn[d], Q[d]), O = x.add5H(I, v, m, q, Vn[d], P[d]), ot = I | 0, tt = x.rotrSH(r, o, 28) ^ x.rotrBH(r, o, 34) ^ x.rotrBH(r, o, 39), st = x.rotrSL(r, o, 28) ^ x.rotrBL(r, o, 34) ^ x.rotrBL(r, o, 39), at = r & s ^ r & u ^ s & u, Ct = o & a ^ o & i ^ a & i;
            v = g | 0, L = S | 0, g = w | 0, S = h | 0, w = l | 0, h = p | 0, ({ h: l, l: p } = x.add(D | 0, c | 0, O | 0, ot | 0)), D = u | 0, c = i | 0, u = s | 0, i = a | 0, s = r | 0, a = o | 0;
            const At = x.add3L(ot, st, Ct);
            r = x.add3H(At, O, tt, at), o = At | 0;
        }
        ({ h: r, l: o } = x.add(this.Ah | 0, this.Al | 0, r | 0, o | 0)), ({ h: s, l: a } = x.add(this.Bh | 0, this.Bl | 0, s | 0, a | 0)), ({ h: u, l: i } = x.add(this.Ch | 0, this.Cl | 0, u | 0, i | 0)), ({ h: D, l: c } = x.add(this.Dh | 0, this.Dl | 0, D | 0, c | 0)), ({ h: l, l: p } = x.add(this.Eh | 0, this.El | 0, l | 0, p | 0)), ({ h: w, l: h } = x.add(this.Fh | 0, this.Fl | 0, w | 0, h | 0)), ({ h: g, l: S } = x.add(this.Gh | 0, this.Gl | 0, g | 0, S | 0)), ({ h: v, l: L } = x.add(this.Hh | 0, this.Hl | 0, v | 0, L | 0)), this.set(r, o, s, a, u, i, D, c, l, p, w, h, g, S, v, L);
    }
    roundClean() {
        P.fill(0), Q.fill(0);
    }
    destroy() {
        this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
const Kn = Bn(()=>new Jn); /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ 
const vt = BigInt(0), be = BigInt(1), Wn = BigInt(2);
function It(t) {
    return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Ut(t) {
    if (!It(t)) throw new Error("Uint8Array expected");
}
function Tt(t, e) {
    if (typeof e != "boolean") throw new Error(t + " boolean expected, got " + e);
}
const Xn = Array.from({
    length: 256
}, (t, e)=>e.toString(16).padStart(2, "0"));
function Ft(t) {
    Ut(t);
    let e = "";
    for(let n = 0; n < t.length; n++)e += Xn[t[n]];
    return e;
}
function pe(t) {
    if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
    return t === "" ? vt : BigInt("0x" + t);
}
const K = {
    _0: 48,
    _9: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function we(t) {
    if (t >= K._0 && t <= K._9) return t - K._0;
    if (t >= K.A && t <= K.F) return t - (K.A - 10);
    if (t >= K.a && t <= K.f) return t - (K.a - 10);
}
function Ee(t) {
    if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
    const e = t.length, n = e / 2;
    if (e % 2) throw new Error("hex string expected, got unpadded hex of length " + e);
    const r = new Uint8Array(n);
    for(let o = 0, s = 0; o < n; o++, s += 2){
        const a = we(t.charCodeAt(s)), u = we(t.charCodeAt(s + 1));
        if (a === void 0 || u === void 0) {
            const i = t[s] + t[s + 1];
            throw new Error('hex string expected, got non-hex character "' + i + '" at index ' + s);
        }
        r[o] = a * 16 + u;
    }
    return r;
}
function Pn(t) {
    return pe(Ft(t));
}
function Et(t) {
    return Ut(t), pe(Ft(Uint8Array.from(t).reverse()));
}
function ge(t, e) {
    return Ee(t.toString(16).padStart(e * 2, "0"));
}
function Nt(t, e) {
    return ge(t, e).reverse();
}
function W(t, e, n) {
    let r;
    if (typeof e == "string") try {
        r = Ee(e);
    } catch (s) {
        throw new Error(t + " must be hex string or Uint8Array, cause: " + s);
    }
    else if (It(e)) r = Uint8Array.from(e);
    else throw new Error(t + " must be hex string or Uint8Array");
    const o = r.length;
    if (typeof n == "number" && o !== n) throw new Error(t + " of length " + n + " expected, got " + o);
    return r;
}
function ye(...t) {
    let e = 0;
    for(let r = 0; r < t.length; r++){
        const o = t[r];
        Ut(o), e += o.length;
    }
    const n = new Uint8Array(e);
    for(let r = 0, o = 0; r < t.length; r++){
        const s = t[r];
        n.set(s, o), o += s.length;
    }
    return n;
}
const Lt = (t)=>typeof t == "bigint" && vt <= t;
function Qn(t, e, n) {
    return Lt(t) && Lt(e) && Lt(n) && e <= t && t < n;
}
function ft(t, e, n, r) {
    if (!Qn(e, n, r)) throw new Error("expected valid " + t + ": " + n + " <= n < " + r + ", got " + e);
}
function tr(t) {
    let e;
    for(e = 0; t > vt; t >>= be, e += 1);
    return e;
}
const er = (t)=>(Wn << BigInt(t - 1)) - be, nr = {
    bigint: (t)=>typeof t == "bigint",
    function: (t)=>typeof t == "function",
    boolean: (t)=>typeof t == "boolean",
    string: (t)=>typeof t == "string",
    stringOrUint8Array: (t)=>typeof t == "string" || It(t),
    isSafeInteger: (t)=>Number.isSafeInteger(t),
    array: (t)=>Array.isArray(t),
    field: (t, e)=>e.Fp.isValid(t),
    hash: (t)=>typeof t == "function" && Number.isSafeInteger(t.outputLen)
};
function Ot(t, e, n = {}) {
    const r = (o, s, a)=>{
        const u = nr[s];
        if (typeof u != "function") throw new Error("invalid validator function");
        const i = t[o];
        if (!(a && i === void 0) && !u(i, t)) throw new Error("param " + String(o) + " is invalid. Expected " + s + ", got " + i);
    };
    for (const [o, s] of Object.entries(e))r(o, s, !1);
    for (const [o, s] of Object.entries(n))r(o, s, !0);
    return t;
}
function xe(t) {
    const e = new WeakMap;
    return (n, ...r)=>{
        const o = e.get(n);
        if (o !== void 0) return o;
        const s = t(n, ...r);
        return e.set(n, s), s;
    };
}
const M = BigInt(0), N = BigInt(1), nt = BigInt(2), rr = BigInt(3), Ht = BigInt(4), Be = BigInt(5), Ce = BigInt(8);
function H(t, e) {
    const n = t % e;
    return n >= M ? n : e + n;
}
function or(t, e, n) {
    if (e < M) throw new Error("invalid exponent, negatives unsupported");
    if (n <= M) throw new Error("invalid modulus");
    if (n === N) return M;
    let r = N;
    for(; e > M;)e & N && (r = r * t % n), t = t * t % n, e >>= N;
    return r;
}
function J(t, e, n) {
    let r = t;
    for(; e-- > M;)r *= r, r %= n;
    return r;
}
function Ae(t, e) {
    if (t === M) throw new Error("invert: expected non-zero number");
    if (e <= M) throw new Error("invert: expected positive modulus, got " + e);
    let n = H(t, e), r = e, o = M, s = N;
    for(; n !== M;){
        const u = r / n, i = r % n, D = o - s * u;
        r = n, n = i, o = s, s = D;
    }
    if (r !== N) throw new Error("invert: does not exist");
    return H(o, e);
}
function sr(t) {
    const e = (t - N) / nt;
    let n, r, o;
    for(n = t - N, r = 0; n % nt === M; n /= nt, r++);
    for(o = nt; o < t && or(o, e, t) !== t - N; o++)if (o > 1e3) throw new Error("Cannot find square root: likely non-prime P");
    if (r === 1) {
        const a = (t + N) / Ht;
        return function(i, D) {
            const c = i.pow(D, a);
            if (!i.eql(i.sqr(c), D)) throw new Error("Cannot find square root");
            return c;
        };
    }
    const s = (n + N) / nt;
    return function(u, i) {
        if (u.pow(i, e) === u.neg(u.ONE)) throw new Error("Cannot find square root");
        let D = r, c = u.pow(u.mul(u.ONE, o), n), l = u.pow(i, s), p = u.pow(i, n);
        for(; !u.eql(p, u.ONE);){
            if (u.eql(p, u.ZERO)) return u.ZERO;
            let w = 1;
            for(let g = u.sqr(p); w < D && !u.eql(g, u.ONE); w++)g = u.sqr(g);
            const h = u.pow(c, N << BigInt(D - w - 1));
            c = u.sqr(h), l = u.mul(l, h), p = u.mul(p, c), D = w;
        }
        return l;
    };
}
function ir(t) {
    if (t % Ht === rr) {
        const e = (t + N) / Ht;
        return function(r, o) {
            const s = r.pow(o, e);
            if (!r.eql(r.sqr(s), o)) throw new Error("Cannot find square root");
            return s;
        };
    }
    if (t % Ce === Be) {
        const e = (t - Be) / Ce;
        return function(r, o) {
            const s = r.mul(o, nt), a = r.pow(s, e), u = r.mul(o, a), i = r.mul(r.mul(u, nt), a), D = r.mul(u, r.sub(i, r.ONE));
            if (!r.eql(r.sqr(D), o)) throw new Error("Cannot find square root");
            return D;
        };
    }
    return sr(t);
}
const ur = (t, e)=>(H(t, e) & N) === N, cr = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
];
function ar(t) {
    const e = {
        ORDER: "bigint",
        MASK: "bigint",
        BYTES: "isSafeInteger",
        BITS: "isSafeInteger"
    }, n = cr.reduce((r, o)=>(r[o] = "function", r), e);
    return Ot(t, n);
}
function fr(t, e, n) {
    if (n < M) throw new Error("invalid exponent, negatives unsupported");
    if (n === M) return t.ONE;
    if (n === N) return e;
    let r = t.ONE, o = e;
    for(; n > M;)n & N && (r = t.mul(r, o)), o = t.sqr(o), n >>= N;
    return r;
}
function Dr(t, e) {
    const n = new Array(e.length), r = e.reduce((s, a, u)=>t.is0(a) ? s : (n[u] = s, t.mul(s, a)), t.ONE), o = t.inv(r);
    return e.reduceRight((s, a, u)=>t.is0(a) ? s : (n[u] = t.mul(s, n[u]), t.mul(s, a)), o), n;
}
function me(t, e) {
    const n = e !== void 0 ? e : t.toString(2).length, r = Math.ceil(n / 8);
    return {
        nBitLength: n,
        nByteLength: r
    };
}
function _e(t, e, n = !1, r = {}) {
    if (t <= M) throw new Error("invalid field: expected ORDER > 0, got " + t);
    const { nBitLength: o, nByteLength: s } = me(t, e);
    if (s > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let a;
    const u = Object.freeze({
        ORDER: t,
        isLE: n,
        BITS: o,
        BYTES: s,
        MASK: er(o),
        ZERO: M,
        ONE: N,
        create: (i)=>H(i, t),
        isValid: (i)=>{
            if (typeof i != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof i);
            return M <= i && i < t;
        },
        is0: (i)=>i === M,
        isOdd: (i)=>(i & N) === N,
        neg: (i)=>H(-i, t),
        eql: (i, D)=>i === D,
        sqr: (i)=>H(i * i, t),
        add: (i, D)=>H(i + D, t),
        sub: (i, D)=>H(i - D, t),
        mul: (i, D)=>H(i * D, t),
        pow: (i, D)=>fr(u, i, D),
        div: (i, D)=>H(i * Ae(D, t), t),
        sqrN: (i)=>i * i,
        addN: (i, D)=>i + D,
        subN: (i, D)=>i - D,
        mulN: (i, D)=>i * D,
        inv: (i)=>Ae(i, t),
        sqrt: r.sqrt || ((i)=>(a || (a = ir(t)), a(u, i))),
        invertBatch: (i)=>Dr(u, i),
        cmov: (i, D, c)=>c ? D : i,
        toBytes: (i)=>n ? Nt(i, s) : ge(i, s),
        fromBytes: (i)=>{
            if (i.length !== s) throw new Error("Field.fromBytes: expected " + s + " bytes, got " + i.length);
            return n ? Et(i) : Pn(i);
        }
    });
    return Object.freeze(u);
}
const Se = BigInt(0), gt = BigInt(1);
function zt(t, e) {
    const n = e.negate();
    return t ? n : e;
}
function ve(t, e) {
    if (!Number.isSafeInteger(t) || t <= 0 || t > e) throw new Error("invalid window size, expected [1.." + e + "], got W=" + t);
}
function Mt(t, e) {
    ve(t, e);
    const n = Math.ceil(e / t) + 1, r = 2 ** (t - 1);
    return {
        windows: n,
        windowSize: r
    };
}
function dr(t, e) {
    if (!Array.isArray(t)) throw new Error("array expected");
    t.forEach((n, r)=>{
        if (!(n instanceof e)) throw new Error("invalid point at index " + r);
    });
}
function hr(t, e) {
    if (!Array.isArray(t)) throw new Error("array of scalars expected");
    t.forEach((n, r)=>{
        if (!e.isValid(n)) throw new Error("invalid scalar at index " + r);
    });
}
const qt = new WeakMap, Ie = new WeakMap;
function $t(t) {
    return Ie.get(t) || 1;
}
function lr(t, e) {
    return {
        constTimeNegate: zt,
        hasPrecomputes (n) {
            return $t(n) !== 1;
        },
        unsafeLadder (n, r, o = t.ZERO) {
            let s = n;
            for(; r > Se;)r & gt && (o = o.add(s)), s = s.double(), r >>= gt;
            return o;
        },
        precomputeWindow (n, r) {
            const { windows: o, windowSize: s } = Mt(r, e), a = [];
            let u = n, i = u;
            for(let D = 0; D < o; D++){
                i = u, a.push(i);
                for(let c = 1; c < s; c++)i = i.add(u), a.push(i);
                u = i.double();
            }
            return a;
        },
        wNAF (n, r, o) {
            const { windows: s, windowSize: a } = Mt(n, e);
            let u = t.ZERO, i = t.BASE;
            const D = BigInt(2 ** n - 1), c = 2 ** n, l = BigInt(n);
            for(let p = 0; p < s; p++){
                const w = p * a;
                let h = Number(o & D);
                o >>= l, h > a && (h -= c, o += gt);
                const g = w, S = w + Math.abs(h) - 1, v = p % 2 !== 0, L = h < 0;
                h === 0 ? i = i.add(zt(v, r[g])) : u = u.add(zt(L, r[S]));
            }
            return {
                p: u,
                f: i
            };
        },
        wNAFUnsafe (n, r, o, s = t.ZERO) {
            const { windows: a, windowSize: u } = Mt(n, e), i = BigInt(2 ** n - 1), D = 2 ** n, c = BigInt(n);
            for(let l = 0; l < a; l++){
                const p = l * u;
                if (o === Se) break;
                let w = Number(o & i);
                if (o >>= c, w > u && (w -= D, o += gt), w === 0) continue;
                let h = r[p + Math.abs(w) - 1];
                w < 0 && (h = h.negate()), s = s.add(h);
            }
            return s;
        },
        getPrecomputes (n, r, o) {
            let s = qt.get(r);
            return s || (s = this.precomputeWindow(r, n), n !== 1 && qt.set(r, o(s))), s;
        },
        wNAFCached (n, r, o) {
            const s = $t(n);
            return this.wNAF(s, this.getPrecomputes(s, n, o), r);
        },
        wNAFCachedUnsafe (n, r, o, s) {
            const a = $t(n);
            return a === 1 ? this.unsafeLadder(n, r, s) : this.wNAFUnsafe(a, this.getPrecomputes(a, n, o), r, s);
        },
        setWindowSize (n, r) {
            ve(r, e), Ie.set(n, r), qt.delete(n);
        }
    };
}
function br(t, e, n, r) {
    if (dr(n, t), hr(r, e), n.length !== r.length) throw new Error("arrays of points and scalars must have equal length");
    const o = t.ZERO, s = tr(BigInt(n.length)), a = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, u = (1 << a) - 1, i = new Array(u + 1).fill(o), D = Math.floor((e.BITS - 1) / a) * a;
    let c = o;
    for(let l = D; l >= 0; l -= a){
        i.fill(o);
        for(let w = 0; w < r.length; w++){
            const h = r[w], g = Number(h >> BigInt(l) & BigInt(u));
            i[g] = i[g].add(n[w]);
        }
        let p = o;
        for(let w = i.length - 1, h = o; w > 0; w--)h = h.add(i[w]), p = p.add(h);
        if (c = c.add(p), l !== 0) for(let w = 0; w < a; w++)c = c.double();
    }
    return c;
}
function pr(t) {
    return ar(t.Fp), Ot(t, {
        n: "bigint",
        h: "bigint",
        Gx: "field",
        Gy: "field"
    }, {
        nBitLength: "isSafeInteger",
        nByteLength: "isSafeInteger"
    }), Object.freeze({
        ...me(t.n, t.nBitLength),
        ...t,
        p: t.Fp.ORDER
    });
}
const G = BigInt(0), j = BigInt(1), yt = BigInt(2), wr = BigInt(8), Er = {
    zip215: !0
};
function gr(t) {
    const e = pr(t);
    return Ot(t, {
        hash: "function",
        a: "bigint",
        d: "bigint",
        randomBytes: "function"
    }, {
        adjustScalarBytes: "function",
        domain: "function",
        uvRatio: "function",
        mapToCurve: "function"
    }), Object.freeze({
        ...e
    });
}
function yr(t) {
    const e = gr(t), { Fp: n, n: r, prehash: o, hash: s, randomBytes: a, nByteLength: u, h: i } = e, D = yt << BigInt(u * 8) - j, c = n.create, l = _e(e.n, e.nBitLength), p = e.uvRatio || ((y, f)=>{
        try {
            return {
                isValid: !0,
                value: n.sqrt(y * n.inv(f))
            };
        } catch  {
            return {
                isValid: !1,
                value: G
            };
        }
    }), w = e.adjustScalarBytes || ((y)=>y), h = e.domain || ((y, f, b)=>{
        if (Tt("phflag", b), f.length || b) throw new Error("Contexts/pre-hash are not supported");
        return y;
    });
    function g(y, f) {
        ft("coordinate " + y, f, G, D);
    }
    function S(y) {
        if (!(y instanceof d)) throw new Error("ExtendedPoint expected");
    }
    const v = xe((y, f)=>{
        const { ex: b, ey: E, ez: B } = y, C = y.is0();
        f == null && (f = C ? wr : n.inv(B));
        const A = c(b * f), U = c(E * f), _ = c(B * f);
        if (C) return {
            x: G,
            y: j
        };
        if (_ !== j) throw new Error("invZ was invalid");
        return {
            x: A,
            y: U
        };
    }), L = xe((y)=>{
        const { a: f, d: b } = e;
        if (y.is0()) throw new Error("bad point: ZERO");
        const { ex: E, ey: B, ez: C, et: A } = y, U = c(E * E), _ = c(B * B), T = c(C * C), $ = c(T * T), R = c(U * f), V = c(T * c(R + _)), Y = c($ + c(b * c(U * _)));
        if (V !== Y) throw new Error("bad point: equation left != right (1)");
        const Z = c(E * B), X = c(C * A);
        if (Z !== X) throw new Error("bad point: equation left != right (2)");
        return !0;
    });
    class d {
        constructor(f, b, E, B){
            this.ex = f, this.ey = b, this.ez = E, this.et = B, g("x", f), g("y", b), g("z", E), g("t", B), Object.freeze(this);
        }
        get x() {
            return this.toAffine().x;
        }
        get y() {
            return this.toAffine().y;
        }
        static fromAffine(f) {
            if (f instanceof d) throw new Error("extended point not allowed");
            const { x: b, y: E } = f || {};
            return g("x", b), g("y", E), new d(b, E, j, c(b * E));
        }
        static normalizeZ(f) {
            const b = n.invertBatch(f.map((E)=>E.ez));
            return f.map((E, B)=>E.toAffine(b[B])).map(d.fromAffine);
        }
        static msm(f, b) {
            return br(d, l, f, b);
        }
        _setWindowSize(f) {
            q.setWindowSize(this, f);
        }
        assertValidity() {
            L(this);
        }
        equals(f) {
            S(f);
            const { ex: b, ey: E, ez: B } = this, { ex: C, ey: A, ez: U } = f, _ = c(b * U), T = c(C * B), $ = c(E * U), R = c(A * B);
            return _ === T && $ === R;
        }
        is0() {
            return this.equals(d.ZERO);
        }
        negate() {
            return new d(c(-this.ex), this.ey, this.ez, c(-this.et));
        }
        double() {
            const { a: f } = e, { ex: b, ey: E, ez: B } = this, C = c(b * b), A = c(E * E), U = c(yt * c(B * B)), _ = c(f * C), T = b + E, $ = c(c(T * T) - C - A), R = _ + A, V = R - U, Y = _ - A, Z = c($ * V), X = c(R * Y), et = c($ * Y), pt = c(V * R);
            return new d(Z, X, pt, et);
        }
        add(f) {
            S(f);
            const { a: b, d: E } = e, { ex: B, ey: C, ez: A, et: U } = this, { ex: _, ey: T, ez: $, et: R } = f;
            if (b === BigInt(-1)) {
                const re = c((C - B) * (T + _)), oe = c((C + B) * (T - _)), mt = c(oe - re);
                if (mt === G) return this.double();
                const se = c(A * yt * R), ie = c(U * yt * $), ue = ie + se, ce = oe + re, ae = ie - se, Dn = c(ue * mt), dn = c(ce * ae), hn = c(ue * ae), ln = c(mt * ce);
                return new d(Dn, dn, ln, hn);
            }
            const V = c(B * _), Y = c(C * T), Z = c(U * E * R), X = c(A * $), et = c((B + C) * (_ + T) - V - Y), pt = X - Z, ee = X + Z, ne = c(Y - b * V), un = c(et * pt), cn = c(ee * ne), an = c(et * ne), fn = c(pt * ee);
            return new d(un, cn, fn, an);
        }
        subtract(f) {
            return this.add(f.negate());
        }
        wNAF(f) {
            return q.wNAFCached(this, f, d.normalizeZ);
        }
        multiply(f) {
            const b = f;
            ft("scalar", b, j, r);
            const { p: E, f: B } = this.wNAF(b);
            return d.normalizeZ([
                E,
                B
            ])[0];
        }
        multiplyUnsafe(f, b = d.ZERO) {
            const E = f;
            return ft("scalar", E, G, r), E === G ? F : this.is0() || E === j ? this : q.wNAFCachedUnsafe(this, E, d.normalizeZ, b);
        }
        isSmallOrder() {
            return this.multiplyUnsafe(i).is0();
        }
        isTorsionFree() {
            return q.unsafeLadder(this, r).is0();
        }
        toAffine(f) {
            return v(this, f);
        }
        clearCofactor() {
            const { h: f } = e;
            return f === j ? this : this.multiplyUnsafe(f);
        }
        static fromHex(f, b = !1) {
            const { d: E, a: B } = e, C = n.BYTES;
            f = W("pointHex", f, C), Tt("zip215", b);
            const A = f.slice(), U = f[C - 1];
            A[C - 1] = U & -129;
            const _ = Et(A), T = b ? D : n.ORDER;
            ft("pointHex.y", _, G, T);
            const $ = c(_ * _), R = c($ - j), V = c(E * $ - B);
            let { isValid: Y, value: Z } = p(R, V);
            if (!Y) throw new Error("Point.fromHex: invalid y coordinate");
            const X = (Z & j) === j, et = (U & 128) !== 0;
            if (!b && Z === G && et) throw new Error("Point.fromHex: x=0 and x_0=1");
            return et !== X && (Z = c(-Z)), d.fromAffine({
                x: Z,
                y: _
            });
        }
        static fromPrivateKey(f) {
            return O(f).point;
        }
        toRawBytes() {
            const { x: f, y: b } = this.toAffine(), E = Nt(b, n.BYTES);
            return E[E.length - 1] |= f & j ? 128 : 0, E;
        }
        toHex() {
            return Ft(this.toRawBytes());
        }
    }
    d.BASE = new d(e.Gx, e.Gy, j, c(e.Gx * e.Gy)), d.ZERO = new d(G, j, j, G);
    const { BASE: m, ZERO: F } = d, q = lr(d, u * 8);
    function z(y) {
        return H(y, r);
    }
    function I(y) {
        return z(Et(y));
    }
    function O(y) {
        const f = n.BYTES;
        y = W("private key", y, f);
        const b = W("hashed private key", s(y), 2 * f), E = w(b.slice(0, f)), B = b.slice(f, 2 * f), C = I(E), A = m.multiply(C), U = A.toRawBytes();
        return {
            head: E,
            prefix: B,
            scalar: C,
            point: A,
            pointBytes: U
        };
    }
    function ot(y) {
        return O(y).pointBytes;
    }
    function tt(y = new Uint8Array, ...f) {
        const b = ye(...f);
        return I(s(h(b, W("context", y), !!o)));
    }
    function st(y, f, b = {}) {
        y = W("message", y), o && (y = o(y));
        const { prefix: E, scalar: B, pointBytes: C } = O(f), A = tt(b.context, E, y), U = m.multiply(A).toRawBytes(), _ = tt(b.context, U, C, y), T = z(A + _ * B);
        ft("signature.s", T, G, r);
        const $ = ye(U, Nt(T, n.BYTES));
        return W("result", $, n.BYTES * 2);
    }
    const at = Er;
    function Ct(y, f, b, E = at) {
        const { context: B, zip215: C } = E, A = n.BYTES;
        y = W("signature", y, 2 * A), f = W("message", f), b = W("publicKey", b, A), C !== void 0 && Tt("zip215", C), o && (f = o(f));
        const U = Et(y.slice(A, 2 * A));
        let _, T, $;
        try {
            _ = d.fromHex(b, C), T = d.fromHex(y.slice(0, A), C), $ = m.multiplyUnsafe(U);
        } catch  {
            return !1;
        }
        if (!C && _.isSmallOrder()) return !1;
        const R = tt(B, T.toRawBytes(), _.toRawBytes(), f);
        return T.add(_.multiplyUnsafe(R)).subtract($).clearCofactor().equals(d.ZERO);
    }
    return m._setWindowSize(8), {
        CURVE: e,
        getPublicKey: ot,
        sign: st,
        verify: Ct,
        ExtendedPoint: d,
        utils: {
            getExtendedPublicKey: O,
            randomPrivateKey: ()=>a(n.BYTES),
            precompute (y = 8, f = d.BASE) {
                return f._setWindowSize(y), f.multiply(BigInt(3)), f;
            }
        }
    };
}
BigInt(0), BigInt(1);
const kt = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"), Ue = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
const xr = BigInt(1), Te = BigInt(2);
BigInt(3);
const Br = BigInt(5), Cr = BigInt(8);
function Ar(t) {
    const e = BigInt(10), n = BigInt(20), r = BigInt(40), o = BigInt(80), s = kt, u = t * t % s * t % s, i = J(u, Te, s) * u % s, D = J(i, xr, s) * t % s, c = J(D, Br, s) * D % s, l = J(c, e, s) * c % s, p = J(l, n, s) * l % s, w = J(p, r, s) * p % s, h = J(w, o, s) * w % s, g = J(h, o, s) * w % s, S = J(g, e, s) * c % s;
    return {
        pow_p_5_8: J(S, Te, s) * t % s,
        b2: u
    };
}
function mr(t) {
    return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
function _r(t, e) {
    const n = kt, r = H(e * e * e, n), o = H(r * r * e, n), s = Ar(t * o).pow_p_5_8;
    let a = H(t * r * s, n);
    const u = H(e * a * a, n), i = a, D = H(a * Ue, n), c = u === t, l = u === H(-t, n), p = u === H(-t * Ue, n);
    return c && (a = i), (l || p) && (a = D), ur(a, n) && (a = H(-a, n)), {
        isValid: c || l,
        value: a
    };
}
const Sr = (()=>_e(kt, void 0, !0))(), vr = (()=>({
        a: BigInt(-1),
        d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
        Fp: Sr,
        n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
        h: Cr,
        Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
        Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
        hash: Kn,
        randomBytes: he,
        adjustScalarBytes: mr,
        uvRatio: _r
    }))(), Rt = (()=>yr(vr))(), jt = "EdDSA", Zt = "JWT", ut = ".", Dt = "base64url", Gt = "utf8", xt = "utf8", Vt = ":", Yt = "did", Jt = "key", dt = "base58btc", Kt = "z", Wt = "K36", Fe = 32, Ne = 32;
function Xt(t) {
    return globalThis.Buffer != null ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t;
}
function Le(t = 0) {
    return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Xt(globalThis.Buffer.allocUnsafe(t)) : new Uint8Array(t);
}
function Oe(t, e) {
    e || (e = t.reduce((o, s)=>o + s.length, 0));
    const n = Le(e);
    let r = 0;
    for (const o of t)n.set(o, r), r += o.length;
    return Xt(n);
}
function Ir(t, e) {
    if (t.length >= 255) throw new TypeError("Alphabet too long");
    for(var n = new Uint8Array(256), r = 0; r < n.length; r++)n[r] = 255;
    for(var o = 0; o < t.length; o++){
        var s = t.charAt(o), a = s.charCodeAt(0);
        if (n[a] !== 255) throw new TypeError(s + " is ambiguous");
        n[a] = o;
    }
    var u = t.length, i = t.charAt(0), D = Math.log(u) / Math.log(256), c = Math.log(256) / Math.log(u);
    function l(h) {
        if (h instanceof Uint8Array || (ArrayBuffer.isView(h) ? h = new Uint8Array(h.buffer, h.byteOffset, h.byteLength) : Array.isArray(h) && (h = Uint8Array.from(h))), !(h instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
        if (h.length === 0) return "";
        for(var g = 0, S = 0, v = 0, L = h.length; v !== L && h[v] === 0;)v++, g++;
        for(var d = (L - v) * c + 1 >>> 0, m = new Uint8Array(d); v !== L;){
            for(var F = h[v], q = 0, z = d - 1; (F !== 0 || q < S) && z !== -1; z--, q++)F += 256 * m[z] >>> 0, m[z] = F % u >>> 0, F = F / u >>> 0;
            if (F !== 0) throw new Error("Non-zero carry");
            S = q, v++;
        }
        for(var I = d - S; I !== d && m[I] === 0;)I++;
        for(var O = i.repeat(g); I < d; ++I)O += t.charAt(m[I]);
        return O;
    }
    function p(h) {
        if (typeof h != "string") throw new TypeError("Expected String");
        if (h.length === 0) return new Uint8Array;
        var g = 0;
        if (h[g] !== " ") {
            for(var S = 0, v = 0; h[g] === i;)S++, g++;
            for(var L = (h.length - g) * D + 1 >>> 0, d = new Uint8Array(L); h[g];){
                var m = n[h.charCodeAt(g)];
                if (m === 255) return;
                for(var F = 0, q = L - 1; (m !== 0 || F < v) && q !== -1; q--, F++)m += u * d[q] >>> 0, d[q] = m % 256 >>> 0, m = m / 256 >>> 0;
                if (m !== 0) throw new Error("Non-zero carry");
                v = F, g++;
            }
            if (h[g] !== " ") {
                for(var z = L - v; z !== L && d[z] === 0;)z++;
                for(var I = new Uint8Array(S + (L - z)), O = S; z !== L;)I[O++] = d[z++];
                return I;
            }
        }
    }
    function w(h) {
        var g = p(h);
        if (g) return g;
        throw new Error(`Non-${e} character`);
    }
    return {
        encode: l,
        decodeUnsafe: p,
        decode: w
    };
}
var Ur = Ir, Tr = Ur;
const He = (t)=>{
    if (t instanceof Uint8Array && t.constructor.name === "Uint8Array") return t;
    if (t instanceof ArrayBuffer) return new Uint8Array(t);
    if (ArrayBuffer.isView(t)) return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    throw new Error("Unknown type, must be binary type");
}, Fr = (t)=>new TextEncoder().encode(t), Nr = (t)=>new TextDecoder().decode(t);
class Lr {
    constructor(e, n, r){
        this.name = e, this.prefix = n, this.baseEncode = r;
    }
    encode(e) {
        if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
        throw Error("Unknown type, must be binary type");
    }
}
class Or {
    constructor(e, n, r){
        if (this.name = e, this.prefix = n, n.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
        this.prefixCodePoint = n.codePointAt(0), this.baseDecode = r;
    }
    decode(e) {
        if (typeof e == "string") {
            if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            return this.baseDecode(e.slice(this.prefix.length));
        } else throw Error("Can only multibase decode strings");
    }
    or(e) {
        return ze(this, e);
    }
}
class Hr {
    constructor(e){
        this.decoders = e;
    }
    or(e) {
        return ze(this, e);
    }
    decode(e) {
        const n = e[0], r = this.decoders[n];
        if (r) return r.decode(e);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
}
const ze = (t, e)=>new Hr({
        ...t.decoders || {
            [t.prefix]: t
        },
        ...e.decoders || {
            [e.prefix]: e
        }
    });
class zr {
    constructor(e, n, r, o){
        this.name = e, this.prefix = n, this.baseEncode = r, this.baseDecode = o, this.encoder = new Lr(e, n, r), this.decoder = new Or(e, n, o);
    }
    encode(e) {
        return this.encoder.encode(e);
    }
    decode(e) {
        return this.decoder.decode(e);
    }
}
const Bt = ({ name: t, prefix: e, encode: n, decode: r })=>new zr(t, e, n, r), ht = ({ prefix: t, name: e, alphabet: n })=>{
    const { encode: r, decode: o } = Tr(n, e);
    return Bt({
        prefix: t,
        name: e,
        encode: r,
        decode: (s)=>He(o(s))
    });
}, Mr = (t, e, n, r)=>{
    const o = {};
    for(let c = 0; c < e.length; ++c)o[e[c]] = c;
    let s = t.length;
    for(; t[s - 1] === "=";)--s;
    const a = new Uint8Array(s * n / 8 | 0);
    let u = 0, i = 0, D = 0;
    for(let c = 0; c < s; ++c){
        const l = o[t[c]];
        if (l === void 0) throw new SyntaxError(`Non-${r} character`);
        i = i << n | l, u += n, u >= 8 && (u -= 8, a[D++] = 255 & i >> u);
    }
    if (u >= n || 255 & i << 8 - u) throw new SyntaxError("Unexpected end of data");
    return a;
}, qr = (t, e, n)=>{
    const r = e[e.length - 1] === "=", o = (1 << n) - 1;
    let s = "", a = 0, u = 0;
    for(let i = 0; i < t.length; ++i)for(u = u << 8 | t[i], a += 8; a > n;)a -= n, s += e[o & u >> a];
    if (a && (s += e[o & u << n - a]), r) for(; s.length * n & 7;)s += "=";
    return s;
}, k = ({ name: t, prefix: e, bitsPerChar: n, alphabet: r })=>Bt({
        prefix: e,
        name: t,
        encode (o) {
            return qr(o, r, n);
        },
        decode (o) {
            return Mr(o, r, n, t);
        }
    }), $r = Bt({
    prefix: "\0",
    name: "identity",
    encode: (t)=>Nr(t),
    decode: (t)=>Fr(t)
});
var kr = Object.freeze({
    __proto__: null,
    identity: $r
});
const Rr = k({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
});
var jr = Object.freeze({
    __proto__: null,
    base2: Rr
});
const Zr = k({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
});
var Gr = Object.freeze({
    __proto__: null,
    base8: Zr
});
const Vr = ht({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
});
var Yr = Object.freeze({
    __proto__: null,
    base10: Vr
});
const Jr = k({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
}), Kr = k({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
});
var Wr = Object.freeze({
    __proto__: null,
    base16: Jr,
    base16upper: Kr
});
const Xr = k({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
}), Pr = k({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
}), Qr = k({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
}), to = k({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
}), eo = k({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
}), no = k({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
}), ro = k({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
}), oo = k({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
}), so = k({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
});
var io = Object.freeze({
    __proto__: null,
    base32: Xr,
    base32upper: Pr,
    base32pad: Qr,
    base32padupper: to,
    base32hex: eo,
    base32hexupper: no,
    base32hexpad: ro,
    base32hexpadupper: oo,
    base32z: so
});
const uo = ht({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), co = ht({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
var ao = Object.freeze({
    __proto__: null,
    base36: uo,
    base36upper: co
});
const fo = ht({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), Do = ht({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
var ho = Object.freeze({
    __proto__: null,
    base58btc: fo,
    base58flickr: Do
});
const lo = k({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
}), bo = k({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
}), po = k({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
}), wo = k({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
});
var Eo = Object.freeze({
    __proto__: null,
    base64: lo,
    base64pad: bo,
    base64url: po,
    base64urlpad: wo
});
const Me = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}"), go = Me.reduce((t, e, n)=>(t[n] = e, t), []), yo = Me.reduce((t, e, n)=>(t[e.codePointAt(0)] = n, t), []);
function xo(t) {
    return t.reduce((e, n)=>(e += go[n], e), "");
}
function Bo(t) {
    const e = [];
    for (const n of t){
        const r = yo[n.codePointAt(0)];
        if (r === void 0) throw new Error(`Non-base256emoji character: ${n}`);
        e.push(r);
    }
    return new Uint8Array(e);
}
const Co = Bt({
    prefix: "\u{1F680}",
    name: "base256emoji",
    encode: xo,
    decode: Bo
});
var Ao = Object.freeze({
    __proto__: null,
    base256emoji: Co
}), mo = $e, qe = 128, _o = 127, So = ~_o, vo = Math.pow(2, 31);
function $e(t, e, n) {
    e = e || [], n = n || 0;
    for(var r = n; t >= vo;)e[n++] = t & 255 | qe, t /= 128;
    for(; t & So;)e[n++] = t & 255 | qe, t >>>= 7;
    return e[n] = t | 0, $e.bytes = n - r + 1, e;
}
var Io = Pt, Uo = 128, ke = 127;
function Pt(t, r) {
    var n = 0, r = r || 0, o = 0, s = r, a, u = t.length;
    do {
        if (s >= u) throw Pt.bytes = 0, new RangeError("Could not decode varint");
        a = t[s++], n += o < 28 ? (a & ke) << o : (a & ke) * Math.pow(2, o), o += 7;
    }while (a >= Uo)
    return Pt.bytes = s - r, n;
}
var To = Math.pow(2, 7), Fo = Math.pow(2, 14), No = Math.pow(2, 21), Lo = Math.pow(2, 28), Oo = Math.pow(2, 35), Ho = Math.pow(2, 42), zo = Math.pow(2, 49), Mo = Math.pow(2, 56), qo = Math.pow(2, 63), $o = function(t) {
    return t < To ? 1 : t < Fo ? 2 : t < No ? 3 : t < Lo ? 4 : t < Oo ? 5 : t < Ho ? 6 : t < zo ? 7 : t < Mo ? 8 : t < qo ? 9 : 10;
}, ko = {
    encode: mo,
    decode: Io,
    encodingLength: $o
}, Re = ko;
const je = (t, e, n = 0)=>(Re.encode(t, e, n), e), Ze = (t)=>Re.encodingLength(t), Qt = (t, e)=>{
    const n = e.byteLength, r = Ze(t), o = r + Ze(n), s = new Uint8Array(o + n);
    return je(t, s, 0), je(n, s, r), s.set(e, o), new Ro(t, n, e, s);
};
class Ro {
    constructor(e, n, r, o){
        this.code = e, this.size = n, this.digest = r, this.bytes = o;
    }
}
const Ge = ({ name: t, code: e, encode: n })=>new jo(t, e, n);
class jo {
    constructor(e, n, r){
        this.name = e, this.code = n, this.encode = r;
    }
    digest(e) {
        if (e instanceof Uint8Array) {
            const n = this.encode(e);
            return n instanceof Uint8Array ? Qt(this.code, n) : n.then((r)=>Qt(this.code, r));
        } else throw Error("Unknown type, must be binary type");
    }
}
const Ve = (t)=>async (e)=>new Uint8Array(await crypto.subtle.digest(t, e)), Zo = Ge({
    name: "sha2-256",
    code: 18,
    encode: Ve("SHA-256")
}), Go = Ge({
    name: "sha2-512",
    code: 19,
    encode: Ve("SHA-512")
});
var Vo = Object.freeze({
    __proto__: null,
    sha256: Zo,
    sha512: Go
});
const Ye = 0, Yo = "identity", Je = He, Jo = (t)=>Qt(Ye, Je(t)), Ko = {
    code: Ye,
    name: Yo,
    encode: Je,
    digest: Jo
};
var Wo = Object.freeze({
    __proto__: null,
    identity: Ko
});
new TextEncoder, new TextDecoder;
const Ke = {
    ...kr,
    ...jr,
    ...Gr,
    ...Yr,
    ...Wr,
    ...io,
    ...ao,
    ...ho,
    ...Eo,
    ...Ao
};
({
    ...Vo,
    ...Wo
});
function We(t, e, n, r) {
    return {
        name: t,
        prefix: e,
        encoder: {
            name: t,
            prefix: e,
            encode: n
        },
        decoder: {
            decode: r
        }
    };
}
const Xe = We("utf8", "u", (t)=>"u" + new TextDecoder("utf8").decode(t), (t)=>new TextEncoder().encode(t.substring(1))), te = We("ascii", "a", (t)=>{
    let e = "a";
    for(let n = 0; n < t.length; n++)e += String.fromCharCode(t[n]);
    return e;
}, (t)=>{
    t = t.substring(1);
    const e = Le(t.length);
    for(let n = 0; n < t.length; n++)e[n] = t.charCodeAt(n);
    return e;
}), Pe = {
    utf8: Xe,
    "utf-8": Xe,
    hex: Ke.base16,
    latin1: te,
    ascii: te,
    binary: te,
    ...Ke
};
function ct(t, e = "utf8") {
    const n = Pe[e];
    if (!n) throw new Error(`Unsupported encoding "${e}"`);
    return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : n.encoder.encode(t).substring(1);
}
function rt(t, e = "utf8") {
    const n = Pe[e];
    if (!n) throw new Error(`Unsupported encoding "${e}"`);
    return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Xt(globalThis.Buffer.from(t, "utf-8")) : n.decoder.decode(`${n.prefix}${t}`);
}
function lt(t) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonParse"])(ct(rt(t, Dt), Gt));
}
function bt(t) {
    return ct(rt((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonStringify"])(t), Gt), Dt);
}
function Qe(t) {
    const e = rt(Wt, dt), n = Kt + ct(Oe([
        e,
        t
    ]), dt);
    return [
        Yt,
        Jt,
        n
    ].join(Vt);
}
function tn(t) {
    const [e, n, r] = t.split(Vt);
    if (e !== Yt || n !== Jt) throw new Error('Issuer must be a DID with method "key"');
    if (r.slice(0, 1) !== Kt) throw new Error("Issuer must be a key in mulicodec format");
    const o = rt(r.slice(1), dt);
    if (ct(o.slice(0, 2), dt) !== Wt) throw new Error('Issuer must be a public key with type "Ed25519"');
    const s = o.slice(2);
    if (s.length !== Fe) throw new Error("Issuer must be a public key with length 32 bytes");
    return s;
}
function en(t) {
    return ct(t, Dt);
}
function nn(t) {
    return rt(t, Dt);
}
function rn(t) {
    return rt([
        bt(t.header),
        bt(t.payload)
    ].join(ut), xt);
}
function Xo(t) {
    const e = ct(t, xt).split(ut), n = lt(e[0]), r = lt(e[1]);
    return {
        header: n,
        payload: r
    };
}
function on(t) {
    return [
        bt(t.header),
        bt(t.payload),
        en(t.signature)
    ].join(ut);
}
function sn(t) {
    const e = t.split(ut), n = lt(e[0]), r = lt(e[1]), o = nn(e[2]), s = rt(e.slice(0, 2).join(ut), xt);
    return {
        header: n,
        payload: r,
        signature: o,
        data: s
    };
}
function Po(t = he(Ne)) {
    const e = Rt.getPublicKey(t);
    return {
        secretKey: Oe([
            t,
            e
        ]),
        publicKey: e
    };
}
async function Qo(t, e, n, r, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromMiliseconds"])(Date.now())) {
    const s = {
        alg: jt,
        typ: Zt
    }, a = Qe(r.publicKey), u = o + n, i = {
        iss: a,
        sub: t,
        aud: e,
        iat: o,
        exp: u
    }, D = rn({
        header: s,
        payload: i
    }), c = Rt.sign(D, r.secretKey.slice(0, 32));
    return on({
        header: s,
        payload: i,
        signature: c
    });
}
async function ts(t) {
    const { header: e, payload: n, data: r, signature: o } = sn(t);
    if (e.alg !== jt || e.typ !== Zt) throw new Error("JWT must use EdDSA algorithm");
    const s = tn(n.iss);
    return Rt.verify(o, r, s);
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/compare.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compare",
    ()=>compare
]);
function compare(a, b) {
    for(let i = 0; i < a.byteLength; i++){
        if (a[i] < b[i]) {
            return -1;
        }
        if (a[i] > b[i]) {
            return 1;
        }
    }
    if (a.byteLength > b.byteLength) {
        return 1;
    }
    if (a.byteLength < b.byteLength) {
        return -1;
    }
    return 0;
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/alloc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alloc",
    ()=>alloc,
    "allocUnsafe",
    ()=>allocUnsafe
]);
function alloc(size = 0) {
    if (globalThis.Buffer != null && globalThis.Buffer.alloc != null) {
        return globalThis.Buffer.alloc(size);
    }
    return new Uint8Array(size);
}
function allocUnsafe(size = 0) {
    if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
        return globalThis.Buffer.allocUnsafe(size);
    }
    return new Uint8Array(size);
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/concat.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "concat",
    ()=>concat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$alloc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/alloc.js [app-client] (ecmascript)");
;
function concat(arrays, length) {
    if (!length) {
        length = arrays.reduce((acc, curr)=>acc + curr.length, 0);
    }
    const output = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$alloc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allocUnsafe"])(length);
    let offset = 0;
    for (const arr of arrays){
        output.set(arr, offset);
        offset += arr.length;
    }
    return output;
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/equals.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "equals",
    ()=>equals
]);
function equals(a, b) {
    if (a === b) {
        return true;
    }
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    for(let i = 0; i < a.byteLength; i++){
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/util/bases.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$basics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/basics.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$alloc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/alloc.js [app-client] (ecmascript)");
;
;
function createCodec(name, prefix, encode, decode) {
    return {
        name,
        prefix,
        encoder: {
            name,
            prefix,
            encode
        },
        decoder: {
            decode
        }
    };
}
const string = createCodec('utf8', 'u', (buf)=>{
    const decoder = new TextDecoder('utf8');
    return 'u' + decoder.decode(buf);
}, (str)=>{
    const encoder = new TextEncoder();
    return encoder.encode(str.substring(1));
});
const ascii = createCodec('ascii', 'a', (buf)=>{
    let string = 'a';
    for(let i = 0; i < buf.length; i++){
        string += String.fromCharCode(buf[i]);
    }
    return string;
}, (str)=>{
    str = str.substring(1);
    const buf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$alloc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allocUnsafe"])(str.length);
    for(let i = 0; i < str.length; i++){
        buf[i] = str.charCodeAt(i);
    }
    return buf;
});
const BASES = {
    utf8: string,
    'utf-8': string,
    hex: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$basics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bases"].base16,
    latin1: ascii,
    ascii: ascii,
    binary: ascii,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$basics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bases"]
};
const __TURBOPACK__default__export__ = BASES;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/from-string.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromString",
    ()=>fromString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$util$2f$bases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/util/bases.js [app-client] (ecmascript)");
;
function fromString(string, encoding = 'utf8') {
    const base = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$util$2f$bases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"][encoding];
    if (!base) {
        throw new Error(`Unsupported encoding "${encoding}"`);
    }
    if ((encoding === 'utf8' || encoding === 'utf-8') && globalThis.Buffer != null && globalThis.Buffer.from != null) {
        return globalThis.Buffer.from(string, 'utf8');
    }
    return base.decoder.decode(`${base.prefix}${string}`);
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/to-string.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toString",
    ()=>toString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$util$2f$bases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/util/bases.js [app-client] (ecmascript)");
;
function toString(array, encoding = 'utf8') {
    const base = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$util$2f$bases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"][encoding];
    if (!base) {
        throw new Error(`Unsupported encoding "${encoding}"`);
    }
    if ((encoding === 'utf8' || encoding === 'utf-8') && globalThis.Buffer != null && globalThis.Buffer.from != null) {
        return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString('utf8');
    }
    return base.encoder.encode(array).substring(1);
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/xor.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "xor",
    ()=>xor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$alloc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/alloc.js [app-client] (ecmascript)");
;
function xor(a, b) {
    if (a.length !== b.length) {
        throw new Error('Inputs should have the same length');
    }
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$alloc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allocUnsafe"])(a.length);
    for(let i = 0; i < a.length; i++){
        result[i] = a[i] ^ b[i];
    }
    return result;
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$compare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/compare.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/concat.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$equals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/equals.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/from-string.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/to-string.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$xor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/uint8arrays/esm/src/xor.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/vendor/base-x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
function base(ALPHABET, name) {
    if (ALPHABET.length >= 255) {
        throw new TypeError('Alphabet too long');
    }
    var BASE_MAP = new Uint8Array(256);
    for(var j = 0; j < BASE_MAP.length; j++){
        BASE_MAP[j] = 255;
    }
    for(var i = 0; i < ALPHABET.length; i++){
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
            throw new TypeError(x + ' is ambiguous');
        }
        BASE_MAP[xc] = i;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256);
    var iFACTOR = Math.log(256) / Math.log(BASE);
    function encode(source) {
        if (source instanceof Uint8Array) ;
        else if (ArrayBuffer.isView(source)) {
            source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        } else if (Array.isArray(source)) {
            source = Uint8Array.from(source);
        }
        if (!(source instanceof Uint8Array)) {
            throw new TypeError('Expected Uint8Array');
        }
        if (source.length === 0) {
            return '';
        }
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while(pbegin !== pend && source[pbegin] === 0){
            pbegin++;
            zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while(pbegin !== pend){
            var carry = source[pbegin];
            var i = 0;
            for(var it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++){
                carry += 256 * b58[it1] >>> 0;
                b58[it1] = carry % BASE >>> 0;
                carry = carry / BASE >>> 0;
            }
            if (carry !== 0) {
                throw new Error('Non-zero carry');
            }
            length = i;
            pbegin++;
        }
        var it2 = size - length;
        while(it2 !== size && b58[it2] === 0){
            it2++;
        }
        var str = LEADER.repeat(zeroes);
        for(; it2 < size; ++it2){
            str += ALPHABET.charAt(b58[it2]);
        }
        return str;
    }
    function decodeUnsafe(source) {
        if (typeof source !== 'string') {
            throw new TypeError('Expected String');
        }
        if (source.length === 0) {
            return new Uint8Array();
        }
        var psz = 0;
        if (source[psz] === ' ') {
            return;
        }
        var zeroes = 0;
        var length = 0;
        while(source[psz] === LEADER){
            zeroes++;
            psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while(source[psz]){
            var carry = BASE_MAP[source.charCodeAt(psz)];
            if (carry === 255) {
                return;
            }
            var i = 0;
            for(var it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++){
                carry += BASE * b256[it3] >>> 0;
                b256[it3] = carry % 256 >>> 0;
                carry = carry / 256 >>> 0;
            }
            if (carry !== 0) {
                throw new Error('Non-zero carry');
            }
            length = i;
            psz++;
        }
        if (source[psz] === ' ') {
            return;
        }
        var it4 = size - length;
        while(it4 !== size && b256[it4] === 0){
            it4++;
        }
        var vch = new Uint8Array(zeroes + (size - it4));
        var j = zeroes;
        while(it4 !== size){
            vch[j++] = b256[it4++];
        }
        return vch;
    }
    function decode(string) {
        var buffer = decodeUnsafe(string);
        if (buffer) {
            return buffer;
        }
        throw new Error(`Non-${name} character`);
    }
    return {
        encode: encode,
        decodeUnsafe: decodeUnsafe,
        decode: decode
    };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
const __TURBOPACK__default__export__ = _brrp__multiformats_scope_baseX;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bytes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "coerce",
    ()=>coerce,
    "empty",
    ()=>empty,
    "equals",
    ()=>equals,
    "fromHex",
    ()=>fromHex,
    "fromString",
    ()=>fromString,
    "isBinary",
    ()=>isBinary,
    "toHex",
    ()=>toHex,
    "toString",
    ()=>toString
]);
const empty = new Uint8Array(0);
const toHex = (d)=>d.reduce((hex, byte)=>hex + byte.toString(16).padStart(2, '0'), '');
const fromHex = (hex)=>{
    const hexes = hex.match(/../g);
    return hexes ? new Uint8Array(hexes.map((b)=>parseInt(b, 16))) : empty;
};
const equals = (aa, bb)=>{
    if (aa === bb) return true;
    if (aa.byteLength !== bb.byteLength) {
        return false;
    }
    for(let ii = 0; ii < aa.byteLength; ii++){
        if (aa[ii] !== bb[ii]) {
            return false;
        }
    }
    return true;
};
const coerce = (o)=>{
    if (o instanceof Uint8Array && o.constructor.name === 'Uint8Array') return o;
    if (o instanceof ArrayBuffer) return new Uint8Array(o);
    if (ArrayBuffer.isView(o)) {
        return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    }
    throw new Error('Unknown type, must be binary type');
};
const isBinary = (o)=>o instanceof ArrayBuffer || ArrayBuffer.isView(o);
const fromString = (str)=>new TextEncoder().encode(str);
const toString = (b)=>new TextDecoder().decode(b);
;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Codec",
    ()=>Codec,
    "baseX",
    ()=>baseX,
    "from",
    ()=>from,
    "or",
    ()=>or,
    "rfc4648",
    ()=>rfc4648
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$vendor$2f$base$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/vendor/base-x.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bytes.js [app-client] (ecmascript)");
;
;
class Encoder {
    constructor(name, prefix, baseEncode){
        this.name = name;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
    }
    encode(bytes) {
        if (bytes instanceof Uint8Array) {
            return `${this.prefix}${this.baseEncode(bytes)}`;
        } else {
            throw Error('Unknown type, must be binary type');
        }
    }
}
class Decoder {
    constructor(name, prefix, baseDecode){
        this.name = name;
        this.prefix = prefix;
        if (prefix.codePointAt(0) === undefined) {
            throw new Error('Invalid prefix character');
        }
        this.prefixCodePoint = prefix.codePointAt(0);
        this.baseDecode = baseDecode;
    }
    decode(text) {
        if (typeof text === 'string') {
            if (text.codePointAt(0) !== this.prefixCodePoint) {
                throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            }
            return this.baseDecode(text.slice(this.prefix.length));
        } else {
            throw Error('Can only multibase decode strings');
        }
    }
    or(decoder) {
        return or(this, decoder);
    }
}
class ComposedDecoder {
    constructor(decoders){
        this.decoders = decoders;
    }
    or(decoder) {
        return or(this, decoder);
    }
    decode(input) {
        const prefix = input[0];
        const decoder = this.decoders[prefix];
        if (decoder) {
            return decoder.decode(input);
        } else {
            throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
        }
    }
}
const or = (left, right)=>new ComposedDecoder({
        ...left.decoders || {
            [left.prefix]: left
        },
        ...right.decoders || {
            [right.prefix]: right
        }
    });
class Codec {
    constructor(name, prefix, baseEncode, baseDecode){
        this.name = name;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
        this.baseDecode = baseDecode;
        this.encoder = new Encoder(name, prefix, baseEncode);
        this.decoder = new Decoder(name, prefix, baseDecode);
    }
    encode(input) {
        return this.encoder.encode(input);
    }
    decode(input) {
        return this.decoder.decode(input);
    }
}
const from = ({ name, prefix, encode, decode })=>new Codec(name, prefix, encode, decode);
const baseX = ({ prefix, name, alphabet })=>{
    const { encode, decode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$vendor$2f$base$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(alphabet, name);
    return from({
        prefix,
        name,
        encode,
        decode: (text)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coerce"])(decode(text))
    });
};
const decode = (string, alphabet, bitsPerChar, name)=>{
    const codes = {};
    for(let i = 0; i < alphabet.length; ++i){
        codes[alphabet[i]] = i;
    }
    let end = string.length;
    while(string[end - 1] === '='){
        --end;
    }
    const out = new Uint8Array(end * bitsPerChar / 8 | 0);
    let bits = 0;
    let buffer = 0;
    let written = 0;
    for(let i = 0; i < end; ++i){
        const value = codes[string[i]];
        if (value === undefined) {
            throw new SyntaxError(`Non-${name} character`);
        }
        buffer = buffer << bitsPerChar | value;
        bits += bitsPerChar;
        if (bits >= 8) {
            bits -= 8;
            out[written++] = 255 & buffer >> bits;
        }
    }
    if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
        throw new SyntaxError('Unexpected end of data');
    }
    return out;
};
const encode = (data, alphabet, bitsPerChar)=>{
    const pad = alphabet[alphabet.length - 1] === '=';
    const mask = (1 << bitsPerChar) - 1;
    let out = '';
    let bits = 0;
    let buffer = 0;
    for(let i = 0; i < data.length; ++i){
        buffer = buffer << 8 | data[i];
        bits += 8;
        while(bits > bitsPerChar){
            bits -= bitsPerChar;
            out += alphabet[mask & buffer >> bits];
        }
    }
    if (bits) {
        out += alphabet[mask & buffer << bitsPerChar - bits];
    }
    if (pad) {
        while(out.length * bitsPerChar & 7){
            out += '=';
        }
    }
    return out;
};
const rfc4648 = ({ name, prefix, bitsPerChar, alphabet })=>{
    return from({
        prefix,
        name,
        encode (input) {
            return encode(input, alphabet, bitsPerChar);
        },
        decode (input) {
            return decode(input, alphabet, bitsPerChar, name);
        }
    });
};
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/identity.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "identity",
    ()=>identity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bytes.js [app-client] (ecmascript)");
;
;
const identity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["from"])({
    prefix: '\0',
    name: 'identity',
    encode: (buf)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(buf),
    decode: (str)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(str)
});
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base2",
    ()=>base2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base.js [app-client] (ecmascript)");
;
const base2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: '0',
    name: 'base2',
    alphabet: '01',
    bitsPerChar: 1
});
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base8.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base8",
    ()=>base8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base.js [app-client] (ecmascript)");
;
const base8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: '7',
    name: 'base8',
    alphabet: '01234567',
    bitsPerChar: 3
});
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base10.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base10",
    ()=>base10
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base.js [app-client] (ecmascript)");
;
const base10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseX"])({
    prefix: '9',
    name: 'base10',
    alphabet: '0123456789'
});
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base16.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base16",
    ()=>base16,
    "base16upper",
    ()=>base16upper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base.js [app-client] (ecmascript)");
;
const base16 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'f',
    name: 'base16',
    alphabet: '0123456789abcdef',
    bitsPerChar: 4
});
const base16upper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'F',
    name: 'base16upper',
    alphabet: '0123456789ABCDEF',
    bitsPerChar: 4
});
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base32.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base32",
    ()=>base32,
    "base32hex",
    ()=>base32hex,
    "base32hexpad",
    ()=>base32hexpad,
    "base32hexpadupper",
    ()=>base32hexpadupper,
    "base32hexupper",
    ()=>base32hexupper,
    "base32pad",
    ()=>base32pad,
    "base32padupper",
    ()=>base32padupper,
    "base32upper",
    ()=>base32upper,
    "base32z",
    ()=>base32z
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base.js [app-client] (ecmascript)");
;
const base32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'b',
    name: 'base32',
    alphabet: 'abcdefghijklmnopqrstuvwxyz234567',
    bitsPerChar: 5
});
const base32upper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'B',
    name: 'base32upper',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
    bitsPerChar: 5
});
const base32pad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'c',
    name: 'base32pad',
    alphabet: 'abcdefghijklmnopqrstuvwxyz234567=',
    bitsPerChar: 5
});
const base32padupper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'C',
    name: 'base32padupper',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=',
    bitsPerChar: 5
});
const base32hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'v',
    name: 'base32hex',
    alphabet: '0123456789abcdefghijklmnopqrstuv',
    bitsPerChar: 5
});
const base32hexupper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'V',
    name: 'base32hexupper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
    bitsPerChar: 5
});
const base32hexpad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 't',
    name: 'base32hexpad',
    alphabet: '0123456789abcdefghijklmnopqrstuv=',
    bitsPerChar: 5
});
const base32hexpadupper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'T',
    name: 'base32hexpadupper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV=',
    bitsPerChar: 5
});
const base32z = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'h',
    name: 'base32z',
    alphabet: 'ybndrfg8ejkmcpqxot1uwisza345h769',
    bitsPerChar: 5
});
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base36.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base36",
    ()=>base36,
    "base36upper",
    ()=>base36upper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base.js [app-client] (ecmascript)");
;
const base36 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseX"])({
    prefix: 'k',
    name: 'base36',
    alphabet: '0123456789abcdefghijklmnopqrstuvwxyz'
});
const base36upper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseX"])({
    prefix: 'K',
    name: 'base36upper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
});
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base58.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base58btc",
    ()=>base58btc,
    "base58flickr",
    ()=>base58flickr
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base.js [app-client] (ecmascript)");
;
const base58btc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseX"])({
    name: 'base58btc',
    prefix: 'z',
    alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
});
const base58flickr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseX"])({
    name: 'base58flickr',
    prefix: 'Z',
    alphabet: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
});
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base64.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base64",
    ()=>base64,
    "base64pad",
    ()=>base64pad,
    "base64url",
    ()=>base64url,
    "base64urlpad",
    ()=>base64urlpad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base.js [app-client] (ecmascript)");
;
const base64 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'm',
    name: 'base64',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    bitsPerChar: 6
});
const base64pad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'M',
    name: 'base64pad',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    bitsPerChar: 6
});
const base64url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'u',
    name: 'base64url',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
    bitsPerChar: 6
});
const base64urlpad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rfc4648"])({
    prefix: 'U',
    name: 'base64urlpad',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
    bitsPerChar: 6
});
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base256emoji.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base256emoji",
    ()=>base256emoji
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base.js [app-client] (ecmascript)");
;
const alphabet = Array.from('\uD83D\uDE80\uD83E\uDE90\u2604\uD83D\uDEF0\uD83C\uDF0C\uD83C\uDF11\uD83C\uDF12\uD83C\uDF13\uD83C\uDF14\uD83C\uDF15\uD83C\uDF16\uD83C\uDF17\uD83C\uDF18\uD83C\uDF0D\uD83C\uDF0F\uD83C\uDF0E\uD83D\uDC09\u2600\uD83D\uDCBB\uD83D\uDDA5\uD83D\uDCBE\uD83D\uDCBF\uD83D\uDE02\u2764\uD83D\uDE0D\uD83E\uDD23\uD83D\uDE0A\uD83D\uDE4F\uD83D\uDC95\uD83D\uDE2D\uD83D\uDE18\uD83D\uDC4D\uD83D\uDE05\uD83D\uDC4F\uD83D\uDE01\uD83D\uDD25\uD83E\uDD70\uD83D\uDC94\uD83D\uDC96\uD83D\uDC99\uD83D\uDE22\uD83E\uDD14\uD83D\uDE06\uD83D\uDE44\uD83D\uDCAA\uD83D\uDE09\u263A\uD83D\uDC4C\uD83E\uDD17\uD83D\uDC9C\uD83D\uDE14\uD83D\uDE0E\uD83D\uDE07\uD83C\uDF39\uD83E\uDD26\uD83C\uDF89\uD83D\uDC9E\u270C\u2728\uD83E\uDD37\uD83D\uDE31\uD83D\uDE0C\uD83C\uDF38\uD83D\uDE4C\uD83D\uDE0B\uD83D\uDC97\uD83D\uDC9A\uD83D\uDE0F\uD83D\uDC9B\uD83D\uDE42\uD83D\uDC93\uD83E\uDD29\uD83D\uDE04\uD83D\uDE00\uD83D\uDDA4\uD83D\uDE03\uD83D\uDCAF\uD83D\uDE48\uD83D\uDC47\uD83C\uDFB6\uD83D\uDE12\uD83E\uDD2D\u2763\uD83D\uDE1C\uD83D\uDC8B\uD83D\uDC40\uD83D\uDE2A\uD83D\uDE11\uD83D\uDCA5\uD83D\uDE4B\uD83D\uDE1E\uD83D\uDE29\uD83D\uDE21\uD83E\uDD2A\uD83D\uDC4A\uD83E\uDD73\uD83D\uDE25\uD83E\uDD24\uD83D\uDC49\uD83D\uDC83\uD83D\uDE33\u270B\uD83D\uDE1A\uD83D\uDE1D\uD83D\uDE34\uD83C\uDF1F\uD83D\uDE2C\uD83D\uDE43\uD83C\uDF40\uD83C\uDF37\uD83D\uDE3B\uD83D\uDE13\u2B50\u2705\uD83E\uDD7A\uD83C\uDF08\uD83D\uDE08\uD83E\uDD18\uD83D\uDCA6\u2714\uD83D\uDE23\uD83C\uDFC3\uD83D\uDC90\u2639\uD83C\uDF8A\uD83D\uDC98\uD83D\uDE20\u261D\uD83D\uDE15\uD83C\uDF3A\uD83C\uDF82\uD83C\uDF3B\uD83D\uDE10\uD83D\uDD95\uD83D\uDC9D\uD83D\uDE4A\uD83D\uDE39\uD83D\uDDE3\uD83D\uDCAB\uD83D\uDC80\uD83D\uDC51\uD83C\uDFB5\uD83E\uDD1E\uD83D\uDE1B\uD83D\uDD34\uD83D\uDE24\uD83C\uDF3C\uD83D\uDE2B\u26BD\uD83E\uDD19\u2615\uD83C\uDFC6\uD83E\uDD2B\uD83D\uDC48\uD83D\uDE2E\uD83D\uDE46\uD83C\uDF7B\uD83C\uDF43\uD83D\uDC36\uD83D\uDC81\uD83D\uDE32\uD83C\uDF3F\uD83E\uDDE1\uD83C\uDF81\u26A1\uD83C\uDF1E\uD83C\uDF88\u274C\u270A\uD83D\uDC4B\uD83D\uDE30\uD83E\uDD28\uD83D\uDE36\uD83E\uDD1D\uD83D\uDEB6\uD83D\uDCB0\uD83C\uDF53\uD83D\uDCA2\uD83E\uDD1F\uD83D\uDE41\uD83D\uDEA8\uD83D\uDCA8\uD83E\uDD2C\u2708\uD83C\uDF80\uD83C\uDF7A\uD83E\uDD13\uD83D\uDE19\uD83D\uDC9F\uD83C\uDF31\uD83D\uDE16\uD83D\uDC76\uD83E\uDD74\u25B6\u27A1\u2753\uD83D\uDC8E\uD83D\uDCB8\u2B07\uD83D\uDE28\uD83C\uDF1A\uD83E\uDD8B\uD83D\uDE37\uD83D\uDD7A\u26A0\uD83D\uDE45\uD83D\uDE1F\uD83D\uDE35\uD83D\uDC4E\uD83E\uDD32\uD83E\uDD20\uD83E\uDD27\uD83D\uDCCC\uD83D\uDD35\uD83D\uDC85\uD83E\uDDD0\uD83D\uDC3E\uD83C\uDF52\uD83D\uDE17\uD83E\uDD11\uD83C\uDF0A\uD83E\uDD2F\uD83D\uDC37\u260E\uD83D\uDCA7\uD83D\uDE2F\uD83D\uDC86\uD83D\uDC46\uD83C\uDFA4\uD83D\uDE47\uD83C\uDF51\u2744\uD83C\uDF34\uD83D\uDCA3\uD83D\uDC38\uD83D\uDC8C\uD83D\uDCCD\uD83E\uDD40\uD83E\uDD22\uD83D\uDC45\uD83D\uDCA1\uD83D\uDCA9\uD83D\uDC50\uD83D\uDCF8\uD83D\uDC7B\uD83E\uDD10\uD83E\uDD2E\uD83C\uDFBC\uD83E\uDD75\uD83D\uDEA9\uD83C\uDF4E\uD83C\uDF4A\uD83D\uDC7C\uD83D\uDC8D\uD83D\uDCE3\uD83E\uDD42');
const alphabetBytesToChars = alphabet.reduce((p, c, i)=>{
    p[i] = c;
    return p;
}, []);
const alphabetCharsToBytes = alphabet.reduce((p, c, i)=>{
    p[c.codePointAt(0)] = i;
    return p;
}, []);
function encode(data) {
    return data.reduce((p, c)=>{
        p += alphabetBytesToChars[c];
        return p;
    }, '');
}
function decode(str) {
    const byts = [];
    for (const char of str){
        const byt = alphabetCharsToBytes[char.codePointAt(0)];
        if (byt === undefined) {
            throw new Error(`Non-base256emoji character: ${char}`);
        }
        byts.push(byt);
    }
    return new Uint8Array(byts);
}
const base256emoji = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["from"])({
    prefix: '\uD83D\uDE80',
    name: 'base256emoji',
    encode,
    decode
});
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/vendor/varint.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var encode_1 = encode;
var MSB = 128, REST = 127, MSBALL = ~REST, INT = Math.pow(2, 31);
function encode(num, out, offset) {
    out = out || [];
    offset = offset || 0;
    var oldOffset = offset;
    while(num >= INT){
        out[offset++] = num & 255 | MSB;
        num /= 128;
    }
    while(num & MSBALL){
        out[offset++] = num & 255 | MSB;
        num >>>= 7;
    }
    out[offset] = num | 0;
    encode.bytes = offset - oldOffset + 1;
    return out;
}
var decode = read;
var MSB$1 = 128, REST$1 = 127;
function read(buf, offset) {
    var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
    do {
        if (counter >= l) {
            read.bytes = 0;
            throw new RangeError('Could not decode varint');
        }
        b = buf[counter++];
        res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
        shift += 7;
    }while (b >= MSB$1)
    read.bytes = counter - offset;
    return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
    return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
    encode: encode_1,
    decode: decode,
    encodingLength: length
};
var _brrp_varint = varint;
const __TURBOPACK__default__export__ = _brrp_varint;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/varint.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decode",
    ()=>decode,
    "encodeTo",
    ()=>encodeTo,
    "encodingLength",
    ()=>encodingLength
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$vendor$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/vendor/varint.js [app-client] (ecmascript)");
;
const decode = (data, offset = 0)=>{
    const code = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$vendor$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].decode(data, offset);
    return [
        code,
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$vendor$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].decode.bytes
    ];
};
const encodeTo = (int, target, offset = 0)=>{
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$vendor$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].encode(int, target, offset);
    return target;
};
const encodingLength = (int)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$vendor$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].encodingLength(int);
};
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/digest.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Digest",
    ()=>Digest,
    "create",
    ()=>create,
    "decode",
    ()=>decode,
    "equals",
    ()=>equals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/varint.js [app-client] (ecmascript)");
;
;
const create = (code, digest)=>{
    const size = digest.byteLength;
    const sizeOffset = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodingLength"](code);
    const digestOffset = sizeOffset + __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodingLength"](size);
    const bytes = new Uint8Array(digestOffset + size);
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeTo"](code, bytes, 0);
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeTo"](size, bytes, sizeOffset);
    bytes.set(digest, digestOffset);
    return new Digest(code, size, digest, bytes);
};
const decode = (multihash)=>{
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coerce"])(multihash);
    const [code, sizeOffset] = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decode"](bytes);
    const [size, digestOffset] = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decode"](bytes.subarray(sizeOffset));
    const digest = bytes.subarray(sizeOffset + digestOffset);
    if (digest.byteLength !== size) {
        throw new Error('Incorrect length');
    }
    return new Digest(code, size, digest, bytes);
};
const equals = (a, b)=>{
    if (a === b) {
        return true;
    } else {
        return a.code === b.code && a.size === b.size && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equals"])(a.bytes, b.bytes);
    }
};
class Digest {
    constructor(code, size, digest, bytes){
        this.code = code;
        this.size = size;
        this.digest = digest;
        this.bytes = bytes;
    }
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/hasher.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hasher",
    ()=>Hasher,
    "from",
    ()=>from
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/digest.js [app-client] (ecmascript)");
;
const from = ({ name, code, encode })=>new Hasher(name, code, encode);
class Hasher {
    constructor(name, code, encode){
        this.name = name;
        this.code = code;
        this.encode = encode;
    }
    digest(input) {
        if (input instanceof Uint8Array) {
            const result = this.encode(input);
            return result instanceof Uint8Array ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"](this.code, result) : result.then((digest)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"](this.code, digest));
        } else {
            throw Error('Unknown type, must be binary type');
        }
    }
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/sha2-browser.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sha256",
    ()=>sha256,
    "sha512",
    ()=>sha512
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$hasher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/hasher.js [app-client] (ecmascript)");
;
const sha = (name)=>async (data)=>new Uint8Array(await crypto.subtle.digest(name, data));
const sha256 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$hasher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["from"])({
    name: 'sha2-256',
    code: 18,
    encode: sha('SHA-256')
});
const sha512 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$hasher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["from"])({
    name: 'sha2-512',
    code: 19,
    encode: sha('SHA-512')
});
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/identity.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "identity",
    ()=>identity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/digest.js [app-client] (ecmascript)");
;
;
const code = 0;
const name = 'identity';
const encode = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coerce"];
const digest = (input)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"](code, encode(input));
const identity = {
    code,
    name,
    encode,
    digest
};
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/codecs/raw.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "code",
    ()=>code,
    "decode",
    ()=>decode,
    "encode",
    ()=>encode,
    "name",
    ()=>name
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bytes.js [app-client] (ecmascript)");
;
const name = 'raw';
const code = 85;
const encode = (node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coerce"])(node);
const decode = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coerce"])(data);
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/codecs/json.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "code",
    ()=>code,
    "decode",
    ()=>decode,
    "encode",
    ()=>encode,
    "name",
    ()=>name
]);
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const name = 'json';
const code = 512;
const encode = (node)=>textEncoder.encode(JSON.stringify(node));
const decode = (data)=>JSON.parse(textDecoder.decode(data));
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/cid.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CID",
    ()=>CID
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/varint.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/digest.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base58.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base32$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base32.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bytes.js [app-client] (ecmascript)");
;
;
;
;
;
class CID {
    constructor(version, code, multihash, bytes){
        this.code = code;
        this.version = version;
        this.multihash = multihash;
        this.bytes = bytes;
        this.byteOffset = bytes.byteOffset;
        this.byteLength = bytes.byteLength;
        this.asCID = this;
        this._baseCache = new Map();
        Object.defineProperties(this, {
            byteOffset: hidden,
            byteLength: hidden,
            code: readonly,
            version: readonly,
            multihash: readonly,
            bytes: readonly,
            _baseCache: hidden,
            asCID: hidden
        });
    }
    toV0() {
        switch(this.version){
            case 0:
                {
                    return this;
                }
            default:
                {
                    const { code, multihash } = this;
                    if (code !== DAG_PB_CODE) {
                        throw new Error('Cannot convert a non dag-pb CID to CIDv0');
                    }
                    if (multihash.code !== SHA_256_CODE) {
                        throw new Error('Cannot convert non sha2-256 multihash CID to CIDv0');
                    }
                    return CID.createV0(multihash);
                }
        }
    }
    toV1() {
        switch(this.version){
            case 0:
                {
                    const { code, digest } = this.multihash;
                    const multihash = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"](code, digest);
                    return CID.createV1(this.code, multihash);
                }
            case 1:
                {
                    return this;
                }
            default:
                {
                    throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
                }
        }
    }
    equals(other) {
        return other && this.code === other.code && this.version === other.version && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equals"](this.multihash, other.multihash);
    }
    toString(base) {
        const { bytes, version, _baseCache } = this;
        switch(version){
            case 0:
                return toStringV0(bytes, _baseCache, base || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base58btc"].encoder);
            default:
                return toStringV1(bytes, _baseCache, base || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base32$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base32"].encoder);
        }
    }
    toJSON() {
        return {
            code: this.code,
            version: this.version,
            hash: this.multihash.bytes
        };
    }
    get [Symbol.toStringTag]() {
        return 'CID';
    }
    [Symbol.for('nodejs.util.inspect.custom')]() {
        return 'CID(' + this.toString() + ')';
    }
    static isCID(value) {
        deprecate(/^0\.0/, IS_CID_DEPRECATION);
        return !!(value && (value[cidSymbol] || value.asCID === value));
    }
    get toBaseEncodedString() {
        throw new Error('Deprecated, use .toString()');
    }
    get codec() {
        throw new Error('"codec" property is deprecated, use integer "code" property instead');
    }
    get buffer() {
        throw new Error('Deprecated .buffer property, use .bytes to get Uint8Array instead');
    }
    get multibaseName() {
        throw new Error('"multibaseName" property is deprecated');
    }
    get prefix() {
        throw new Error('"prefix" property is deprecated');
    }
    static asCID(value) {
        if (value instanceof CID) {
            return value;
        } else if (value != null && value.asCID === value) {
            const { version, code, multihash, bytes } = value;
            return new CID(version, code, multihash, bytes || encodeCID(version, code, multihash.bytes));
        } else if (value != null && value[cidSymbol] === true) {
            const { version, multihash, code } = value;
            const digest = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decode"](multihash);
            return CID.create(version, code, digest);
        } else {
            return null;
        }
    }
    static create(version, code, digest) {
        if (typeof code !== 'number') {
            throw new Error('String codecs are no longer supported');
        }
        switch(version){
            case 0:
                {
                    if (code !== DAG_PB_CODE) {
                        throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
                    } else {
                        return new CID(version, code, digest, digest.bytes);
                    }
                }
            case 1:
                {
                    const bytes = encodeCID(version, code, digest.bytes);
                    return new CID(version, code, digest, bytes);
                }
            default:
                {
                    throw new Error('Invalid version');
                }
        }
    }
    static createV0(digest) {
        return CID.create(0, DAG_PB_CODE, digest);
    }
    static createV1(code, digest) {
        return CID.create(1, code, digest);
    }
    static decode(bytes) {
        const [cid, remainder] = CID.decodeFirst(bytes);
        if (remainder.length) {
            throw new Error('Incorrect length');
        }
        return cid;
    }
    static decodeFirst(bytes) {
        const specs = CID.inspectBytes(bytes);
        const prefixSize = specs.size - specs.multihashSize;
        const multihashBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coerce"])(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
        if (multihashBytes.byteLength !== specs.multihashSize) {
            throw new Error('Incorrect length');
        }
        const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
        const digest = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Digest"](specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
        const cid = specs.version === 0 ? CID.createV0(digest) : CID.createV1(specs.codec, digest);
        return [
            cid,
            bytes.subarray(specs.size)
        ];
    }
    static inspectBytes(initialBytes) {
        let offset = 0;
        const next = ()=>{
            const [i, length] = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decode"](initialBytes.subarray(offset));
            offset += length;
            return i;
        };
        let version = next();
        let codec = DAG_PB_CODE;
        if (version === 18) {
            version = 0;
            offset = 0;
        } else if (version === 1) {
            codec = next();
        }
        if (version !== 0 && version !== 1) {
            throw new RangeError(`Invalid CID version ${version}`);
        }
        const prefixSize = offset;
        const multihashCode = next();
        const digestSize = next();
        const size = offset + digestSize;
        const multihashSize = size - prefixSize;
        return {
            version,
            codec,
            multihashCode,
            digestSize,
            multihashSize,
            size
        };
    }
    static parse(source, base) {
        const [prefix, bytes] = parseCIDtoBytes(source, base);
        const cid = CID.decode(bytes);
        cid._baseCache.set(prefix, source);
        return cid;
    }
}
const parseCIDtoBytes = (source, base)=>{
    switch(source[0]){
        case 'Q':
            {
                const decoder = base || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base58btc"];
                return [
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base58btc"].prefix,
                    decoder.decode(`${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base58btc"].prefix}${source}`)
                ];
            }
        case __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base58btc"].prefix:
            {
                const decoder = base || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base58btc"];
                return [
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base58btc"].prefix,
                    decoder.decode(source)
                ];
            }
        case __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base32$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base32"].prefix:
            {
                const decoder = base || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base32$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base32"];
                return [
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base32$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base32"].prefix,
                    decoder.decode(source)
                ];
            }
        default:
            {
                if (base == null) {
                    throw Error('To parse non base32 or base58btc encoded CID multibase decoder must be provided');
                }
                return [
                    source[0],
                    base.decode(source)
                ];
            }
    }
};
const toStringV0 = (bytes, cache, base)=>{
    const { prefix } = base;
    if (prefix !== __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base58btc"].prefix) {
        throw Error(`Cannot string encode V0 in ${base.name} encoding`);
    }
    const cid = cache.get(prefix);
    if (cid == null) {
        const cid = base.encode(bytes).slice(1);
        cache.set(prefix, cid);
        return cid;
    } else {
        return cid;
    }
};
const toStringV1 = (bytes, cache, base)=>{
    const { prefix } = base;
    const cid = cache.get(prefix);
    if (cid == null) {
        const cid = base.encode(bytes);
        cache.set(prefix, cid);
        return cid;
    } else {
        return cid;
    }
};
const DAG_PB_CODE = 112;
const SHA_256_CODE = 18;
const encodeCID = (version, code, multihash)=>{
    const codeOffset = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodingLength"](version);
    const hashOffset = codeOffset + __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodingLength"](code);
    const bytes = new Uint8Array(hashOffset + multihash.byteLength);
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeTo"](version, bytes, 0);
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeTo"](code, bytes, codeOffset);
    bytes.set(multihash, hashOffset);
    return bytes;
};
const cidSymbol = Symbol.for('@ipld/js-cid/CID');
const readonly = {
    writable: false,
    configurable: false,
    enumerable: true
};
const hidden = {
    writable: false,
    enumerable: false,
    configurable: false
};
const version = '0.0.0-dev';
const deprecate = (range, message)=>{
    if (range.test(version)) {
        console.warn(message);
    } else {
        throw new Error(message);
    }
};
const IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$cid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/cid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/varint.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$hasher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/hasher.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/digest.js [app-client] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/hasher.js [app-client] (ecmascript) <export * as hasher>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasher",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$hasher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$hasher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/hasher.js [app-client] (ecmascript)");
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/digest.js [app-client] (ecmascript) <export * as digest>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "digest",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/digest.js [app-client] (ecmascript)");
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/varint.js [app-client] (ecmascript) <export * as varint>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "varint",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/varint.js [app-client] (ecmascript)");
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bytes.js [app-client] (ecmascript) <export * as bytes>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bytes.js [app-client] (ecmascript)");
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/basics.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bases",
    ()=>bases,
    "codecs",
    ()=>codecs,
    "hashes",
    ()=>hashes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$identity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/identity.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base8$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base8.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base10$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base10.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base16$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base16.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base32$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base32.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base36$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base36.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base58.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base64.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base256emoji$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bases/base256emoji.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$sha2$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/sha2-browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$identity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/identity.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$codecs$2f$raw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/codecs/raw.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$codecs$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/codecs/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$cid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/cid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$hasher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__hasher$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/hasher.js [app-client] (ecmascript) <export * as hasher>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$digest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__digest$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/hashes/digest.js [app-client] (ecmascript) <export * as digest>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$varint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__varint$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/varint.js [app-client] (ecmascript) <export * as varint>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__bytes$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/multiformats/esm/src/bytes.js [app-client] (ecmascript) <export * as bytes>");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const bases = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$identity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base8$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base10$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base16$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base32$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base36$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base58$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$bases$2f$base256emoji$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
};
const hashes = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$sha2$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$hashes$2f$identity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
};
const codecs = {
    raw: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$codecs$2f$raw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    json: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$multiformats$2f$esm$2f$src$2f$codecs$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
};
;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/relay-api/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RELAY_JSONRPC",
    ()=>C,
    "isPublishMethod",
    ()=>c,
    "isPublishParams",
    ()=>h,
    "isPublishRequest",
    ()=>P,
    "isSubscribeMethod",
    ()=>b,
    "isSubscribeParams",
    ()=>a,
    "isSubscribeRequest",
    ()=>R,
    "isSubscriptionMethod",
    ()=>m,
    "isSubscriptionParams",
    ()=>d,
    "isSubscriptionRequest",
    ()=>S,
    "isUnsubscribeMethod",
    ()=>o,
    "isUnsubscribeParams",
    ()=>p,
    "isUnsubscribeRequest",
    ()=>_,
    "parsePublishRequest",
    ()=>q,
    "parseSubscribeRequest",
    ()=>g,
    "parseSubscriptionRequest",
    ()=>k,
    "parseUnsubscribeRequest",
    ()=>E
]);
function e(s, r, i = "string") {
    if (!s[r] || typeof s[r] !== i) throw new Error(`Missing or invalid "${r}" param`);
}
function l(s, r) {
    let i = !0;
    return r.forEach((t)=>{
        t in s || (i = !1);
    }), i;
}
function f(s, r) {
    return Array.isArray(s) ? s.length === r : Object.keys(s).length === r;
}
function w(s, r) {
    return Array.isArray(s) ? s.length >= r : Object.keys(s).length >= r;
}
function u(s, r, i) {
    return (i.length ? w(s, r.length) : f(s, r.length)) ? l(s, r) : !1;
}
function n(s, r, i = "_") {
    const t = s.split(i);
    return t[t.length - 1].trim().toLowerCase() === r.trim().toLowerCase();
}
function R(s) {
    return b(s.method) && a(s.params);
}
function b(s) {
    return n(s, "subscribe");
}
function a(s) {
    return u(s, [
        "topic"
    ], []);
}
function P(s) {
    return c(s.method) && h(s.params);
}
function c(s) {
    return n(s, "publish");
}
function h(s) {
    return u(s, [
        "message",
        "topic",
        "ttl"
    ], [
        "prompt",
        "tag"
    ]);
}
function _(s) {
    return o(s.method) && p(s.params);
}
function o(s) {
    return n(s, "unsubscribe");
}
function p(s) {
    return u(s, [
        "id",
        "topic"
    ], []);
}
function S(s) {
    return m(s.method) && d(s.params);
}
function m(s) {
    return n(s, "subscription");
}
function d(s) {
    return u(s, [
        "id",
        "data"
    ], []);
}
function g(s) {
    if (!b(s.method)) throw new Error("JSON-RPC Request has invalid subscribe method");
    if (!a(s.params)) throw new Error("JSON-RPC Request has invalid subscribe params");
    const r = s.params;
    return e(r, "topic"), r;
}
function q(s) {
    if (!c(s.method)) throw new Error("JSON-RPC Request has invalid publish method");
    if (!h(s.params)) throw new Error("JSON-RPC Request has invalid publish params");
    const r = s.params;
    return e(r, "topic"), e(r, "message"), e(r, "ttl", "number"), r;
}
function E(s) {
    if (!o(s.method)) throw new Error("JSON-RPC Request has invalid unsubscribe method");
    if (!p(s.params)) throw new Error("JSON-RPC Request has invalid unsubscribe params");
    const r = s.params;
    return e(r, "id"), r;
}
function k(s) {
    if (!m(s.method)) throw new Error("JSON-RPC Request has invalid subscription method");
    if (!d(s.params)) throw new Error("JSON-RPC Request has invalid subscription params");
    const r = s.params;
    return e(r, "id"), e(r, "data"), r;
}
const C = {
    waku: {
        publish: "waku_publish",
        batchPublish: "waku_batchPublish",
        subscribe: "waku_subscribe",
        batchSubscribe: "waku_batchSubscribe",
        subscription: "waku_subscription",
        unsubscribe: "waku_unsubscribe",
        batchUnsubscribe: "waku_batchUnsubscribe",
        batchFetchMessages: "waku_batchFetchMessages"
    },
    irn: {
        publish: "irn_publish",
        batchPublish: "irn_batchPublish",
        subscribe: "irn_subscribe",
        batchSubscribe: "irn_batchSubscribe",
        subscription: "irn_subscription",
        unsubscribe: "irn_unsubscribe",
        batchUnsubscribe: "irn_batchUnsubscribe",
        batchFetchMessages: "irn_batchFetchMessages"
    },
    iridium: {
        publish: "iridium_publish",
        batchPublish: "iridium_batchPublish",
        subscribe: "iridium_subscribe",
        batchSubscribe: "iridium_batchSubscribe",
        subscription: "iridium_subscription",
        unsubscribe: "iridium_unsubscribe",
        batchUnsubscribe: "iridium_batchUnsubscribe",
        batchFetchMessages: "iridium_batchFetchMessages"
    }
};
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/events/dist/esm/events.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IEvents",
    ()=>IEvents
]);
class IEvents {
} //# sourceMappingURL=events.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/events/dist/esm/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/events/dist/esm/events.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/heartbeat/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HEARTBEAT_EVENTS",
    ()=>r,
    "HEARTBEAT_INTERVAL",
    ()=>s,
    "HeartBeat",
    ()=>i,
    "IHeartBeat",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/events/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/time/dist/cjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/events/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/events/dist/esm/events.js [app-client] (ecmascript)");
;
;
;
class n extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(e){
        super();
    }
}
const s = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_SECONDS"], r = {
    pulse: "heartbeat_pulse"
};
class i extends n {
    constructor(e){
        super(e), this.events = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"], this.interval = s, this.interval = e?.interval || s;
    }
    static async init(e) {
        const t = new i(e);
        return await t.init(), t;
    }
    async init() {
        await this.initialize();
    }
    stop() {
        clearInterval(this.intervalRef);
    }
    on(e, t) {
        this.events.on(e, t);
    }
    once(e, t) {
        this.events.once(e, t);
    }
    off(e, t) {
        this.events.off(e, t);
    }
    removeListener(e, t) {
        this.events.removeListener(e, t);
    }
    async initialize() {
        this.intervalRef = setInterval(()=>this.pulse(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(this.interval));
    }
    pulse() {
        this.events.emit(r.pulse);
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/destr/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>destr,
    "destr",
    ()=>destr,
    "safeDestr",
    ()=>safeDestr
]);
const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
    if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
        warnKeyDropped(key);
        return;
    }
    return value;
}
function warnKeyDropped(key) {
    console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
    if (typeof value !== "string") {
        return value;
    }
    if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
        return value.slice(1, -1);
    }
    const _value = value.trim();
    if (_value.length <= 9) {
        switch(_value.toLowerCase()){
            case "true":
                {
                    return true;
                }
            case "false":
                {
                    return false;
                }
            case "undefined":
                {
                    return void 0;
                }
            case "null":
                {
                    return null;
                }
            case "nan":
                {
                    return Number.NaN;
                }
            case "infinity":
                {
                    return Number.POSITIVE_INFINITY;
                }
            case "-infinity":
                {
                    return Number.NEGATIVE_INFINITY;
                }
        }
    }
    if (!JsonSigRx.test(value)) {
        if (options.strict) {
            throw new SyntaxError("[destr] Invalid JSON");
        }
        return value;
    }
    try {
        if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
            if (options.strict) {
                throw new Error("[destr] Possible prototype pollution");
            }
            return JSON.parse(value, jsonParseTransform);
        }
        return JSON.parse(value);
    } catch (error) {
        if (options.strict) {
            throw error;
        }
        return value;
    }
}
function safeDestr(value, options = {}) {
    return destr(value, {
        ...options,
        strict: true
    });
}
;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/unstorage/dist/shared/unstorage.zVDD2mZo.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>normalizeKey,
    "b",
    ()=>asyncCall,
    "c",
    ()=>filterKeyByBase,
    "d",
    ()=>stringify,
    "e",
    ()=>deserializeRaw,
    "f",
    ()=>filterKeyByDepth,
    "j",
    ()=>joinKeys,
    "n",
    ()=>normalizeBaseKey,
    "p",
    ()=>prefixStorage,
    "s",
    ()=>serializeRaw
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
function wrapToPromise(value) {
    if (!value || typeof value.then !== "function") {
        return Promise.resolve(value);
    }
    return value;
}
function asyncCall(function_, ...arguments_) {
    try {
        return wrapToPromise(function_(...arguments_));
    } catch (error) {
        return Promise.reject(error);
    }
}
function isPrimitive(value) {
    const type = typeof value;
    return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
    const proto = Object.getPrototypeOf(value);
    return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
    if (isPrimitive(value)) {
        return String(value);
    }
    if (isPureObject(value) || Array.isArray(value)) {
        return JSON.stringify(value);
    }
    if (typeof value.toJSON === "function") {
        return stringify(value.toJSON());
    }
    throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
    if (typeof value === "string") {
        return value;
    }
    return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
    if (typeof value !== "string") {
        return value;
    }
    if (!value.startsWith(BASE64_PREFIX)) {
        return value;
    }
    return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
    if (globalThis.Buffer) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(input, "base64");
    }
    return Uint8Array.from(globalThis.atob(input), (c)=>c.codePointAt(0));
}
function base64Encode(input) {
    if (globalThis.Buffer) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(input).toString("base64");
    }
    return globalThis.btoa(String.fromCodePoint(...input));
}
const storageKeyProperties = [
    "has",
    "hasItem",
    "get",
    "getItem",
    "getItemRaw",
    "set",
    "setItem",
    "setItemRaw",
    "del",
    "remove",
    "removeItem",
    "getMeta",
    "setMeta",
    "removeMeta",
    "getKeys",
    "clear",
    "mount",
    "unmount"
];
function prefixStorage(storage, base) {
    base = normalizeBaseKey(base);
    if (!base) {
        return storage;
    }
    const nsStorage = {
        ...storage
    };
    for (const property of storageKeyProperties){
        nsStorage[property] = (key = "", ...args)=>// @ts-ignore
            storage[property](base + key, ...args);
    }
    nsStorage.getKeys = (key = "", ...arguments_)=>storage.getKeys(base + key, ...arguments_).then((keys)=>keys.map((key2)=>key2.slice(base.length)));
    nsStorage.keys = nsStorage.getKeys;
    nsStorage.getItems = async (items, commonOptions)=>{
        const prefixedItems = items.map((item)=>typeof item === "string" ? base + item : {
                ...item,
                key: base + item.key
            });
        const results = await storage.getItems(prefixedItems, commonOptions);
        return results.map((entry)=>({
                key: entry.key.slice(base.length),
                value: entry.value
            }));
    };
    nsStorage.setItems = async (items, commonOptions)=>{
        const prefixedItems = items.map((item)=>({
                key: base + item.key,
                value: item.value,
                options: item.options
            }));
        return storage.setItems(prefixedItems, commonOptions);
    };
    return nsStorage;
}
function normalizeKey(key) {
    if (!key) {
        return "";
    }
    return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
    return normalizeKey(keys.join(":"));
}
function normalizeBaseKey(base) {
    base = normalizeKey(base);
    return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
    if (depth === void 0) {
        return true;
    }
    let substrCount = 0;
    let index = key.indexOf(":");
    while(index > -1){
        substrCount++;
        index = key.indexOf(":", index + 1);
    }
    return substrCount <= depth;
}
function filterKeyByBase(key, base) {
    if (base) {
        return key.startsWith(base) && key[key.length - 1] !== "$";
    }
    return key[key.length - 1] !== "$";
}
;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/unstorage/dist/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "builtinDrivers",
    ()=>builtinDrivers,
    "createStorage",
    ()=>createStorage,
    "defineDriver",
    ()=>defineDriver,
    "restoreSnapshot",
    ()=>restoreSnapshot,
    "snapshot",
    ()=>snapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$destr$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/destr/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/unstorage/dist/shared/unstorage.zVDD2mZo.mjs [app-client] (ecmascript)");
;
;
;
function defineDriver(factory) {
    return factory;
}
const DRIVER_NAME = "memory";
const memory = defineDriver(()=>{
    const data = /* @__PURE__ */ new Map();
    return {
        name: DRIVER_NAME,
        getInstance: ()=>data,
        hasItem (key) {
            return data.has(key);
        },
        getItem (key) {
            return data.get(key) ?? null;
        },
        getItemRaw (key) {
            return data.get(key) ?? null;
        },
        setItem (key, value) {
            data.set(key, value);
        },
        setItemRaw (key, value) {
            data.set(key, value);
        },
        removeItem (key) {
            data.delete(key);
        },
        getKeys () {
            return [
                ...data.keys()
            ];
        },
        clear () {
            data.clear();
        },
        dispose () {
            data.clear();
        }
    };
});
function createStorage(options = {}) {
    const context = {
        mounts: {
            "": options.driver || memory()
        },
        mountpoints: [
            ""
        ],
        watching: false,
        watchListeners: [],
        unwatch: {}
    };
    const getMount = (key)=>{
        for (const base of context.mountpoints){
            if (key.startsWith(base)) {
                return {
                    base,
                    relativeKey: key.slice(base.length),
                    driver: context.mounts[base]
                };
            }
        }
        return {
            base: "",
            relativeKey: key,
            driver: context.mounts[""]
        };
    };
    const getMounts = (base, includeParent)=>{
        return context.mountpoints.filter((mountpoint)=>mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)).map((mountpoint)=>({
                relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
                mountpoint,
                driver: context.mounts[mountpoint]
            }));
    };
    const onChange = (event, key)=>{
        if (!context.watching) {
            return;
        }
        key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(key);
        for (const listener of context.watchListeners){
            listener(event, key);
        }
    };
    const startWatch = async ()=>{
        if (context.watching) {
            return;
        }
        context.watching = true;
        for(const mountpoint in context.mounts){
            context.unwatch[mountpoint] = await watch(context.mounts[mountpoint], onChange, mountpoint);
        }
    };
    const stopWatch = async ()=>{
        if (!context.watching) {
            return;
        }
        for(const mountpoint in context.unwatch){
            await context.unwatch[mountpoint]();
        }
        context.unwatch = {};
        context.watching = false;
    };
    const runBatch = (items, commonOptions, cb)=>{
        const batches = /* @__PURE__ */ new Map();
        const getBatch = (mount)=>{
            let batch = batches.get(mount.base);
            if (!batch) {
                batch = {
                    driver: mount.driver,
                    base: mount.base,
                    items: []
                };
                batches.set(mount.base, batch);
            }
            return batch;
        };
        for (const item of items){
            const isStringItem = typeof item === "string";
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(isStringItem ? item : item.key);
            const value = isStringItem ? void 0 : item.value;
            const options2 = isStringItem || !item.options ? commonOptions : {
                ...commonOptions,
                ...item.options
            };
            const mount = getMount(key);
            getBatch(mount).items.push({
                key,
                value,
                relativeKey: mount.relativeKey,
                options: options2
            });
        }
        return Promise.all([
            ...batches.values()
        ].map((batch)=>cb(batch))).then((r)=>r.flat());
    };
    const storage = {
        // Item
        hasItem (key, opts = {}) {
            key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(key);
            const { relativeKey, driver } = getMount(key);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.hasItem, relativeKey, opts);
        },
        getItem (key, opts = {}) {
            key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(key);
            const { relativeKey, driver } = getMount(key);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.getItem, relativeKey, opts).then((value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$destr$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(value));
        },
        getItems (items, commonOptions = {}) {
            return runBatch(items, commonOptions, (batch)=>{
                if (batch.driver.getItems) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(batch.driver.getItems, batch.items.map((item)=>({
                            key: item.relativeKey,
                            options: item.options
                        })), commonOptions).then((r)=>r.map((item)=>({
                                key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["j"])(batch.base, item.key),
                                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$destr$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(item.value)
                            })));
                }
                return Promise.all(batch.items.map((item)=>{
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(batch.driver.getItem, item.relativeKey, item.options).then((value)=>({
                            key: item.key,
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$destr$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(value)
                        }));
                }));
            });
        },
        getItemRaw (key, opts = {}) {
            key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(key);
            const { relativeKey, driver } = getMount(key);
            if (driver.getItemRaw) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.getItemRaw, relativeKey, opts);
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.getItem, relativeKey, opts).then((value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["e"])(value));
        },
        async setItem (key, value, opts = {}) {
            if (value === void 0) {
                return storage.removeItem(key);
            }
            key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(key);
            const { relativeKey, driver } = getMount(key);
            if (!driver.setItem) {
                return;
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.setItem, relativeKey, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["d"])(value), opts);
            if (!driver.watch) {
                onChange("update", key);
            }
        },
        async setItems (items, commonOptions) {
            await runBatch(items, commonOptions, async (batch)=>{
                if (batch.driver.setItems) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(batch.driver.setItems, batch.items.map((item)=>({
                            key: item.relativeKey,
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["d"])(item.value),
                            options: item.options
                        })), commonOptions);
                }
                if (!batch.driver.setItem) {
                    return;
                }
                await Promise.all(batch.items.map((item)=>{
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(batch.driver.setItem, item.relativeKey, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["d"])(item.value), item.options);
                }));
            });
        },
        async setItemRaw (key, value, opts = {}) {
            if (value === void 0) {
                return storage.removeItem(key, opts);
            }
            key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(key);
            const { relativeKey, driver } = getMount(key);
            if (driver.setItemRaw) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.setItemRaw, relativeKey, value, opts);
            } else if (driver.setItem) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.setItem, relativeKey, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["s"])(value), opts);
            } else {
                return;
            }
            if (!driver.watch) {
                onChange("update", key);
            }
        },
        async removeItem (key, opts = {}) {
            if (typeof opts === "boolean") {
                opts = {
                    removeMeta: opts
                };
            }
            key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(key);
            const { relativeKey, driver } = getMount(key);
            if (!driver.removeItem) {
                return;
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.removeItem, relativeKey, opts);
            if (opts.removeMeta || opts.removeMata) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.removeItem, relativeKey + "$", opts);
            }
            if (!driver.watch) {
                onChange("remove", key);
            }
        },
        // Meta
        async getMeta (key, opts = {}) {
            if (typeof opts === "boolean") {
                opts = {
                    nativeOnly: opts
                };
            }
            key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(key);
            const { relativeKey, driver } = getMount(key);
            const meta = /* @__PURE__ */ Object.create(null);
            if (driver.getMeta) {
                Object.assign(meta, await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.getMeta, relativeKey, opts));
            }
            if (!opts.nativeOnly) {
                const value = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.getItem, relativeKey + "$", opts).then((value_)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$destr$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(value_));
                if (value && typeof value === "object") {
                    if (typeof value.atime === "string") {
                        value.atime = new Date(value.atime);
                    }
                    if (typeof value.mtime === "string") {
                        value.mtime = new Date(value.mtime);
                    }
                    Object.assign(meta, value);
                }
            }
            return meta;
        },
        setMeta (key, value, opts = {}) {
            return this.setItem(key + "$", value, opts);
        },
        removeMeta (key, opts = {}) {
            return this.removeItem(key + "$", opts);
        },
        // Keys
        async getKeys (base, opts = {}) {
            base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"])(base);
            const mounts = getMounts(base, true);
            let maskedMounts = [];
            const allKeys = [];
            let allMountsSupportMaxDepth = true;
            for (const mount of mounts){
                if (!mount.driver.flags?.maxDepth) {
                    allMountsSupportMaxDepth = false;
                }
                const rawKeys = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(mount.driver.getKeys, mount.relativeBase, opts);
                for (const key of rawKeys){
                    const fullKey = mount.mountpoint + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(key);
                    if (!maskedMounts.some((p)=>fullKey.startsWith(p))) {
                        allKeys.push(fullKey);
                    }
                }
                maskedMounts = [
                    mount.mountpoint,
                    ...maskedMounts.filter((p)=>!p.startsWith(mount.mountpoint))
                ];
            }
            const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
            return allKeys.filter((key)=>(!shouldFilterByDepth || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["f"])(key, opts.maxDepth)) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(key, base));
        },
        // Utils
        async clear (base, opts = {}) {
            base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"])(base);
            await Promise.all(getMounts(base, false).map(async (m)=>{
                if (m.driver.clear) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(m.driver.clear, m.relativeBase, opts);
                }
                if (m.driver.removeItem) {
                    const keys = await m.driver.getKeys(m.relativeBase || "", opts);
                    return Promise.all(keys.map((key)=>m.driver.removeItem(key, opts)));
                }
            }));
        },
        async dispose () {
            await Promise.all(Object.values(context.mounts).map((driver)=>dispose(driver)));
        },
        async watch (callback) {
            await startWatch();
            context.watchListeners.push(callback);
            return async ()=>{
                context.watchListeners = context.watchListeners.filter((listener)=>listener !== callback);
                if (context.watchListeners.length === 0) {
                    await stopWatch();
                }
            };
        },
        async unwatch () {
            context.watchListeners = [];
            await stopWatch();
        },
        // Mount
        mount (base, driver) {
            base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"])(base);
            if (base && context.mounts[base]) {
                throw new Error(`already mounted at ${base}`);
            }
            if (base) {
                context.mountpoints.push(base);
                context.mountpoints.sort((a, b)=>b.length - a.length);
            }
            context.mounts[base] = driver;
            if (context.watching) {
                Promise.resolve(watch(driver, onChange, base)).then((unwatcher)=>{
                    context.unwatch[base] = unwatcher;
                }).catch(console.error);
            }
            return storage;
        },
        async unmount (base, _dispose = true) {
            base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"])(base);
            if (!base || !context.mounts[base]) {
                return;
            }
            if (context.watching && base in context.unwatch) {
                context.unwatch[base]?.();
                delete context.unwatch[base];
            }
            if (_dispose) {
                await dispose(context.mounts[base]);
            }
            context.mountpoints = context.mountpoints.filter((key)=>key !== base);
            delete context.mounts[base];
        },
        getMount (key = "") {
            key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(key) + ":";
            const m = getMount(key);
            return {
                driver: m.driver,
                base: m.base
            };
        },
        getMounts (base = "", opts = {}) {
            base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(base);
            const mounts = getMounts(base, opts.parents);
            return mounts.map((m)=>({
                    driver: m.driver,
                    base: m.mountpoint
                }));
        },
        // Aliases
        keys: (base, opts = {})=>storage.getKeys(base, opts),
        get: (key, opts = {})=>storage.getItem(key, opts),
        set: (key, value, opts = {})=>storage.setItem(key, value, opts),
        has: (key, opts = {})=>storage.hasItem(key, opts),
        del: (key, opts = {})=>storage.removeItem(key, opts),
        remove: (key, opts = {})=>storage.removeItem(key, opts)
    };
    return storage;
}
async function snapshot(storage, base) {
    base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"])(base);
    const keys = await storage.getKeys(base);
    const snapshot2 = {};
    await Promise.all(keys.map(async (key)=>{
        snapshot2[key.slice(base.length)] = await storage.getItem(key);
    }));
    return snapshot2;
}
async function restoreSnapshot(driver, snapshot2, base = "") {
    base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n"])(base);
    await Promise.all(Object.entries(snapshot2).map((e)=>driver.setItem(base + e[0], e[1])));
}
function watch(driver, onChange, base) {
    return driver.watch ? driver.watch((event, key)=>onChange(event, base + key)) : ()=>{};
}
async function dispose(driver) {
    if (typeof driver.dispose === "function") {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$shared$2f$unstorage$2e$zVDD2mZo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(driver.dispose);
    }
}
const builtinDrivers = {
    "azure-app-configuration": "unstorage/drivers/azure-app-configuration",
    "azureAppConfiguration": "unstorage/drivers/azure-app-configuration",
    "azure-cosmos": "unstorage/drivers/azure-cosmos",
    "azureCosmos": "unstorage/drivers/azure-cosmos",
    "azure-key-vault": "unstorage/drivers/azure-key-vault",
    "azureKeyVault": "unstorage/drivers/azure-key-vault",
    "azure-storage-blob": "unstorage/drivers/azure-storage-blob",
    "azureStorageBlob": "unstorage/drivers/azure-storage-blob",
    "azure-storage-table": "unstorage/drivers/azure-storage-table",
    "azureStorageTable": "unstorage/drivers/azure-storage-table",
    "capacitor-preferences": "unstorage/drivers/capacitor-preferences",
    "capacitorPreferences": "unstorage/drivers/capacitor-preferences",
    "cloudflare-kv-binding": "unstorage/drivers/cloudflare-kv-binding",
    "cloudflareKVBinding": "unstorage/drivers/cloudflare-kv-binding",
    "cloudflare-kv-http": "unstorage/drivers/cloudflare-kv-http",
    "cloudflareKVHttp": "unstorage/drivers/cloudflare-kv-http",
    "cloudflare-r2-binding": "unstorage/drivers/cloudflare-r2-binding",
    "cloudflareR2Binding": "unstorage/drivers/cloudflare-r2-binding",
    "db0": "unstorage/drivers/db0",
    "deno-kv-node": "unstorage/drivers/deno-kv-node",
    "denoKVNode": "unstorage/drivers/deno-kv-node",
    "deno-kv": "unstorage/drivers/deno-kv",
    "denoKV": "unstorage/drivers/deno-kv",
    "fs-lite": "unstorage/drivers/fs-lite",
    "fsLite": "unstorage/drivers/fs-lite",
    "fs": "unstorage/drivers/fs",
    "github": "unstorage/drivers/github",
    "http": "unstorage/drivers/http",
    "indexedb": "unstorage/drivers/indexedb",
    "localstorage": "unstorage/drivers/localstorage",
    "lru-cache": "unstorage/drivers/lru-cache",
    "lruCache": "unstorage/drivers/lru-cache",
    "memory": "unstorage/drivers/memory",
    "mongodb": "unstorage/drivers/mongodb",
    "netlify-blobs": "unstorage/drivers/netlify-blobs",
    "netlifyBlobs": "unstorage/drivers/netlify-blobs",
    "null": "unstorage/drivers/null",
    "overlay": "unstorage/drivers/overlay",
    "planetscale": "unstorage/drivers/planetscale",
    "redis": "unstorage/drivers/redis",
    "s3": "unstorage/drivers/s3",
    "session-storage": "unstorage/drivers/session-storage",
    "sessionStorage": "unstorage/drivers/session-storage",
    "uploadthing": "unstorage/drivers/uploadthing",
    "upstash": "unstorage/drivers/upstash",
    "vercel-blob": "unstorage/drivers/vercel-blob",
    "vercelBlob": "unstorage/drivers/vercel-blob",
    "vercel-kv": "unstorage/drivers/vercel-kv",
    "vercelKV": "unstorage/drivers/vercel-kv",
    "vercel-runtime-cache": "unstorage/drivers/vercel-runtime-cache",
    "vercelRuntimeCache": "unstorage/drivers/vercel-runtime-cache"
};
;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/idb-keyval/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clear",
    ()=>clear,
    "createStore",
    ()=>createStore,
    "del",
    ()=>del,
    "delMany",
    ()=>delMany,
    "entries",
    ()=>entries,
    "get",
    ()=>get,
    "getMany",
    ()=>getMany,
    "keys",
    ()=>keys,
    "promisifyRequest",
    ()=>promisifyRequest,
    "set",
    ()=>set,
    "setMany",
    ()=>setMany,
    "update",
    ()=>update,
    "values",
    ()=>values
]);
function promisifyRequest(request) {
    return new Promise((resolve, reject)=>{
        // @ts-ignore - file size hacks
        request.oncomplete = request.onsuccess = ()=>resolve(request.result);
        // @ts-ignore - file size hacks
        request.onabort = request.onerror = ()=>reject(request.error);
    });
}
function createStore(dbName, storeName) {
    let dbp;
    const getDB = ()=>{
        if (dbp) return dbp;
        const request = indexedDB.open(dbName);
        request.onupgradeneeded = ()=>request.result.createObjectStore(storeName);
        dbp = promisifyRequest(request);
        dbp.then((db)=>{
            // It seems like Safari sometimes likes to just close the connection.
            // It's supposed to fire this event when that happens. Let's hope it does!
            db.onclose = ()=>dbp = undefined;
        }, ()=>{});
        return dbp;
    };
    return (txMode, callback)=>getDB().then((db)=>callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
    if (!defaultGetStoreFunc) {
        defaultGetStoreFunc = createStore('keyval-store', 'keyval');
    }
    return defaultGetStoreFunc;
}
/**
 * Get a value by its key.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */ function get(key, customStore = defaultGetStore()) {
    return customStore('readonly', (store)=>promisifyRequest(store.get(key)));
}
/**
 * Set a value with a key.
 *
 * @param key
 * @param value
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */ function set(key, value, customStore = defaultGetStore()) {
    return customStore('readwrite', (store)=>{
        store.put(value, key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Set multiple values at once. This is faster than calling set() multiple times.
 * It's also atomic – if one of the pairs can't be added, none will be added.
 *
 * @param entries Array of entries, where each entry is an array of `[key, value]`.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */ function setMany(entries, customStore = defaultGetStore()) {
    return customStore('readwrite', (store)=>{
        entries.forEach((entry)=>store.put(entry[1], entry[0]));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Get multiple values by their keys
 *
 * @param keys
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */ function getMany(keys, customStore = defaultGetStore()) {
    return customStore('readonly', (store)=>Promise.all(keys.map((key)=>promisifyRequest(store.get(key)))));
}
/**
 * Update a value. This lets you see the old value and update it as an atomic operation.
 *
 * @param key
 * @param updater A callback that takes the old value and returns a new value.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */ function update(key, updater, customStore = defaultGetStore()) {
    return customStore('readwrite', (store)=>// Need to create the promise manually.
        // If I try to chain promises, the transaction closes in browsers
        // that use a promise polyfill (IE10/11).
        new Promise((resolve, reject)=>{
            store.get(key).onsuccess = function() {
                try {
                    store.put(updater(this.result), key);
                    resolve(promisifyRequest(store.transaction));
                } catch (err) {
                    reject(err);
                }
            };
        }));
}
/**
 * Delete a particular key from the store.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */ function del(key, customStore = defaultGetStore()) {
    return customStore('readwrite', (store)=>{
        store.delete(key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Delete multiple keys at once.
 *
 * @param keys List of keys to delete.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */ function delMany(keys, customStore = defaultGetStore()) {
    return customStore('readwrite', (store)=>{
        keys.forEach((key)=>store.delete(key));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Clear all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */ function clear(customStore = defaultGetStore()) {
    return customStore('readwrite', (store)=>{
        store.clear();
        return promisifyRequest(store.transaction);
    });
}
function eachCursor(store, callback) {
    store.openCursor().onsuccess = function() {
        if (!this.result) return;
        callback(this.result);
        this.result.continue();
    };
    return promisifyRequest(store.transaction);
}
/**
 * Get all keys in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */ function keys(customStore = defaultGetStore()) {
    return customStore('readonly', (store)=>{
        // Fast path for modern browsers
        if (store.getAllKeys) {
            return promisifyRequest(store.getAllKeys());
        }
        const items = [];
        return eachCursor(store, (cursor)=>items.push(cursor.key)).then(()=>items);
    });
}
/**
 * Get all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */ function values(customStore = defaultGetStore()) {
    return customStore('readonly', (store)=>{
        // Fast path for modern browsers
        if (store.getAll) {
            return promisifyRequest(store.getAll());
        }
        const items = [];
        return eachCursor(store, (cursor)=>items.push(cursor.value)).then(()=>items);
    });
}
/**
 * Get all entries in the store. Each entry is an array of `[key, value]`.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */ function entries(customStore = defaultGetStore()) {
    return customStore('readonly', (store)=>{
        // Fast path for modern browsers
        // (although, hopefully we'll get a simpler path some day)
        if (store.getAll && store.getAllKeys) {
            return Promise.all([
                promisifyRequest(store.getAllKeys()),
                promisifyRequest(store.getAll())
            ]).then(([keys, values])=>keys.map((key, i)=>[
                        key,
                        values[i]
                    ]));
        }
        const items = [];
        return customStore('readonly', (store)=>eachCursor(store, (cursor)=>items.push([
                    cursor.key,
                    cursor.value
                ])).then(()=>items));
    });
}
;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/keyvaluestorage/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KeyValueStorage",
    ()=>h,
    "default",
    ()=>h
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/unstorage/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/idb-keyval/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-client] (ecmascript)");
;
;
;
function C(i) {
    return i;
}
const x = "idb-keyval";
var z = (i = {})=>{
    const t = i.base && i.base.length > 0 ? `${i.base}:` : "", e = (s)=>t + s;
    let n;
    return i.dbName && i.storeName && (n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(i.dbName, i.storeName)), {
        name: x,
        options: i,
        async hasItem (s) {
            return !(typeof await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])(e(s), n) > "u");
        },
        async getItem (s) {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])(e(s), n) ?? null;
        },
        setItem (s, a) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["set"])(e(s), a, n);
        },
        removeItem (s) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["del"])(e(s), n);
        },
        getKeys () {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keys"])(n);
        },
        clear () {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clear"])(n);
        }
    };
};
const D = "WALLET_CONNECT_V2_INDEXED_DB", E = "keyvaluestorage";
class _ {
    constructor(){
        this.indexedDb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$unstorage$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createStorage"])({
            driver: z({
                dbName: D,
                storeName: E
            })
        });
    }
    async getKeys() {
        return this.indexedDb.getKeys();
    }
    async getEntries() {
        return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t)=>[
                t.key,
                t.value
            ]);
    }
    async getItem(t) {
        const e = await this.indexedDb.getItem(t);
        if (e !== null) return e;
    }
    async setItem(t, e) {
        await this.indexedDb.setItem(t, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonStringify"])(e));
    }
    async removeItem(t) {
        await this.indexedDb.removeItem(t);
    }
}
var l = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : ("TURBOPACK compile-time value", "object") < "u" ? /*TURBOPACK member replacement*/ __turbopack_context__.g : typeof self < "u" ? self : {}, c = {
    exports: {}
};
(function() {
    let i;
    function t() {}
    i = t, i.prototype.getItem = function(e) {
        return this.hasOwnProperty(e) ? String(this[e]) : null;
    }, i.prototype.setItem = function(e, n) {
        this[e] = String(n);
    }, i.prototype.removeItem = function(e) {
        delete this[e];
    }, i.prototype.clear = function() {
        const e = this;
        Object.keys(e).forEach(function(n) {
            e[n] = void 0, delete e[n];
        });
    }, i.prototype.key = function(e) {
        return e = e || 0, Object.keys(this)[e];
    }, i.prototype.__defineGetter__("length", function() {
        return Object.keys(this).length;
    }), typeof l < "u" && l.localStorage ? c.exports = l.localStorage : typeof window < "u" && window.localStorage ? c.exports = window.localStorage : c.exports = new t;
})();
function k(i) {
    var t;
    return [
        i[0],
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonParse"])((t = i[1]) != null ? t : "")
    ];
}
class K {
    constructor(){
        this.localStorage = c.exports;
    }
    async getKeys() {
        return Object.keys(this.localStorage);
    }
    async getEntries() {
        return Object.entries(this.localStorage).map(k);
    }
    async getItem(t) {
        const e = this.localStorage.getItem(t);
        if (e !== null) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonParse"])(e);
    }
    async setItem(t, e) {
        this.localStorage.setItem(t, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonStringify"])(e));
    }
    async removeItem(t) {
        this.localStorage.removeItem(t);
    }
}
const N = "wc_storage_version", y = 1, O = async (i, t, e)=>{
    const n = N, s = await t.getItem(n);
    if (s && s >= y) {
        e(t);
        return;
    }
    const a = await i.getKeys();
    if (!a.length) {
        e(t);
        return;
    }
    const m = [];
    for(; a.length;){
        const r = a.shift();
        if (!r) continue;
        const o = r.toLowerCase();
        if (o.includes("wc@") || o.includes("walletconnect") || o.includes("wc_") || o.includes("wallet_connect")) {
            const f = await i.getItem(r);
            await t.setItem(r, f), m.push(r);
        }
    }
    await t.setItem(n, y), e(t), j(i, m);
}, j = async (i, t)=>{
    t.length && t.forEach(async (e)=>{
        await i.removeItem(e);
    });
};
class h {
    constructor(){
        this.initialized = !1, this.setInitialized = (e)=>{
            this.storage = e, this.initialized = !0;
        };
        const t = new K;
        this.storage = t;
        try {
            const e = new _;
            O(t, e, this.setInitialized);
        } catch  {
            this.initialized = !0;
        }
    }
    async getKeys() {
        return await this.initialize(), this.storage.getKeys();
    }
    async getEntries() {
        return await this.initialize(), this.storage.getEntries();
    }
    async getItem(t) {
        return await this.initialize(), this.storage.getItem(t);
    }
    async setItem(t, e) {
        return await this.initialize(), this.storage.setItem(t, e);
    }
    async removeItem(t) {
        return await this.initialize(), this.storage.removeItem(t);
    }
    async initialize() {
        this.initialized || await new Promise((t)=>{
            const e = setInterval(()=>{
                this.initialized && (clearInterval(e), t());
            }, 20);
        });
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/quick-format-unescaped/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function tryStringify(o) {
    try {
        return JSON.stringify(o);
    } catch (e) {
        return '"[Circular]"';
    }
}
module.exports = format;
function format(f, args, opts) {
    var ss = opts && opts.stringify || tryStringify;
    var offset = 1;
    if (typeof f === 'object' && f !== null) {
        var len = args.length + offset;
        if (len === 1) return f;
        var objects = new Array(len);
        objects[0] = ss(f);
        for(var index = 1; index < len; index++){
            objects[index] = ss(args[index]);
        }
        return objects.join(' ');
    }
    if (typeof f !== 'string') {
        return f;
    }
    var argLen = args.length;
    if (argLen === 0) return f;
    var str = '';
    var a = 1 - offset;
    var lastPos = -1;
    var flen = f && f.length || 0;
    for(var i = 0; i < flen;){
        if (f.charCodeAt(i) === 37 && i + 1 < flen) {
            lastPos = lastPos > -1 ? lastPos : 0;
            switch(f.charCodeAt(i + 1)){
                case 100:
                case 102:
                    if (a >= argLen) break;
                    if (args[a] == null) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += Number(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 105:
                    if (a >= argLen) break;
                    if (args[a] == null) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += Math.floor(Number(args[a]));
                    lastPos = i + 2;
                    i++;
                    break;
                case 79:
                case 111:
                case 106:
                    if (a >= argLen) break;
                    if (args[a] === undefined) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    var type = typeof args[a];
                    if (type === 'string') {
                        str += '\'' + args[a] + '\'';
                        lastPos = i + 2;
                        i++;
                        break;
                    }
                    if (type === 'function') {
                        str += args[a].name || '<anonymous>';
                        lastPos = i + 2;
                        i++;
                        break;
                    }
                    str += ss(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 115:
                    if (a >= argLen) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += String(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 37:
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += '%';
                    lastPos = i + 2;
                    i++;
                    a--;
                    break;
            }
            ++a;
        }
        ++i;
    }
    if (lastPos === -1) return f;
    else if (lastPos < flen) {
        str += f.slice(lastPos);
    }
    return str;
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/pino/browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const format = __turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/quick-format-unescaped/index.js [app-client] (ecmascript)");
module.exports = pino;
const _console = pfGlobalThisOrFallback().console || {};
const stdSerializers = {
    mapHttpRequest: mock,
    mapHttpResponse: mock,
    wrapRequestSerializer: passthrough,
    wrapResponseSerializer: passthrough,
    wrapErrorSerializer: passthrough,
    req: mock,
    res: mock,
    err: asErrValue
};
function shouldSerialize(serialize, serializers) {
    if (Array.isArray(serialize)) {
        const hasToFilter = serialize.filter(function(k) {
            return k !== '!stdSerializers.err';
        });
        return hasToFilter;
    } else if (serialize === true) {
        return Object.keys(serializers);
    }
    return false;
}
function pino(opts) {
    opts = opts || {};
    opts.browser = opts.browser || {};
    const transmit = opts.browser.transmit;
    if (transmit && typeof transmit.send !== 'function') {
        throw Error('pino: transmit option must have a send function');
    }
    const proto = opts.browser.write || _console;
    if (opts.browser.write) opts.browser.asObject = true;
    const serializers = opts.serializers || {};
    const serialize = shouldSerialize(opts.browser.serialize, serializers);
    let stdErrSerialize = opts.browser.serialize;
    if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf('!stdSerializers.err') > -1) stdErrSerialize = false;
    const levels = [
        'error',
        'fatal',
        'warn',
        'info',
        'debug',
        'trace'
    ];
    if (typeof proto === 'function') {
        proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
    }
    if (opts.enabled === false) opts.level = 'silent';
    const level = opts.level || 'info';
    const logger = Object.create(proto);
    if (!logger.log) logger.log = noop;
    Object.defineProperty(logger, 'levelVal', {
        get: getLevelVal
    });
    Object.defineProperty(logger, 'level', {
        get: getLevel,
        set: setLevel
    });
    const setOpts = {
        transmit,
        serialize,
        asObject: opts.browser.asObject,
        levels,
        timestamp: getTimeFunction(opts)
    };
    logger.levels = pino.levels;
    logger.level = level;
    logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
    logger.serializers = serializers;
    logger._serialize = serialize;
    logger._stdErrSerialize = stdErrSerialize;
    logger.child = child;
    if (transmit) logger._logEvent = createLogEventShape();
    function getLevelVal() {
        return this.level === 'silent' ? Infinity : this.levels.values[this.level];
    }
    function getLevel() {
        return this._level;
    }
    function setLevel(level) {
        if (level !== 'silent' && !this.levels.values[level]) {
            throw Error('unknown level ' + level);
        }
        this._level = level;
        set(setOpts, logger, 'error', 'log'); // <-- must stay first
        set(setOpts, logger, 'fatal', 'error');
        set(setOpts, logger, 'warn', 'error');
        set(setOpts, logger, 'info', 'log');
        set(setOpts, logger, 'debug', 'log');
        set(setOpts, logger, 'trace', 'log');
    }
    function child(bindings, childOptions) {
        if (!bindings) {
            throw new Error('missing bindings for child Pino');
        }
        childOptions = childOptions || {};
        if (serialize && bindings.serializers) {
            childOptions.serializers = bindings.serializers;
        }
        const childOptionsSerializers = childOptions.serializers;
        if (serialize && childOptionsSerializers) {
            var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
            var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
            delete bindings.serializers;
            applySerializers([
                bindings
            ], childSerialize, childSerializers, this._stdErrSerialize);
        }
        function Child(parent) {
            this._childLevel = (parent._childLevel | 0) + 1;
            this.error = bind(parent, bindings, 'error');
            this.fatal = bind(parent, bindings, 'fatal');
            this.warn = bind(parent, bindings, 'warn');
            this.info = bind(parent, bindings, 'info');
            this.debug = bind(parent, bindings, 'debug');
            this.trace = bind(parent, bindings, 'trace');
            if (childSerializers) {
                this.serializers = childSerializers;
                this._serialize = childSerialize;
            }
            if (transmit) {
                this._logEvent = createLogEventShape([].concat(parent._logEvent.bindings, bindings));
            }
        }
        Child.prototype = this;
        return new Child(this);
    }
    return logger;
}
pino.levels = {
    values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
    },
    labels: {
        10: 'trace',
        20: 'debug',
        30: 'info',
        40: 'warn',
        50: 'error',
        60: 'fatal'
    }
};
pino.stdSerializers = stdSerializers;
pino.stdTimeFunctions = Object.assign({}, {
    nullTime,
    epochTime,
    unixTime,
    isoTime
});
function set(opts, logger, level, fallback) {
    const proto = Object.getPrototypeOf(logger);
    logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback] || noop;
    wrap(opts, logger, level);
}
function wrap(opts, logger, level) {
    if (!opts.transmit && logger[level] === noop) return;
    logger[level] = function(write) {
        return function LOG() {
            const ts = opts.timestamp();
            const args = new Array(arguments.length);
            const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
            for(var i = 0; i < args.length; i++)args[i] = arguments[i];
            if (opts.serialize && !opts.asObject) {
                applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
            }
            if (opts.asObject) write.call(proto, asObject(this, level, args, ts));
            else write.apply(proto, args);
            if (opts.transmit) {
                const transmitLevel = opts.transmit.level || logger.level;
                const transmitValue = pino.levels.values[transmitLevel];
                const methodValue = pino.levels.values[level];
                if (methodValue < transmitValue) return;
                transmit(this, {
                    ts,
                    methodLevel: level,
                    methodValue,
                    transmitLevel,
                    transmitValue: pino.levels.values[opts.transmit.level || logger.level],
                    send: opts.transmit.send,
                    val: logger.levelVal
                }, args);
            }
        };
    }(logger[level]);
}
function asObject(logger, level, args, ts) {
    if (logger._serialize) applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
    const argsCloned = args.slice();
    let msg = argsCloned[0];
    const o = {};
    if (ts) {
        o.time = ts;
    }
    o.level = pino.levels.values[level];
    let lvl = (logger._childLevel | 0) + 1;
    if (lvl < 1) lvl = 1;
    // deliberate, catching objects, arrays
    if (msg !== null && typeof msg === 'object') {
        while(lvl-- && typeof argsCloned[0] === 'object'){
            Object.assign(o, argsCloned.shift());
        }
        msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : undefined;
    } else if (typeof msg === 'string') msg = format(argsCloned.shift(), argsCloned);
    if (msg !== undefined) o.msg = msg;
    return o;
}
function applySerializers(args, serialize, serializers, stdErrSerialize) {
    for(const i in args){
        if (stdErrSerialize && args[i] instanceof Error) {
            args[i] = pino.stdSerializers.err(args[i]);
        } else if (typeof args[i] === 'object' && !Array.isArray(args[i])) {
            for(const k in args[i]){
                if (serialize && serialize.indexOf(k) > -1 && k in serializers) {
                    args[i][k] = serializers[k](args[i][k]);
                }
            }
        }
    }
}
function bind(parent, bindings, level) {
    return function() {
        const args = new Array(1 + arguments.length);
        args[0] = bindings;
        for(var i = 1; i < args.length; i++){
            args[i] = arguments[i - 1];
        }
        return parent[level].apply(this, args);
    };
}
function transmit(logger, opts, args) {
    const send = opts.send;
    const ts = opts.ts;
    const methodLevel = opts.methodLevel;
    const methodValue = opts.methodValue;
    const val = opts.val;
    const bindings = logger._logEvent.bindings;
    applySerializers(args, logger._serialize || Object.keys(logger.serializers), logger.serializers, logger._stdErrSerialize === undefined ? true : logger._stdErrSerialize);
    logger._logEvent.ts = ts;
    logger._logEvent.messages = args.filter(function(arg) {
        // bindings can only be objects, so reference equality check via indexOf is fine
        return bindings.indexOf(arg) === -1;
    });
    logger._logEvent.level.label = methodLevel;
    logger._logEvent.level.value = methodValue;
    send(methodLevel, logger._logEvent, val);
    logger._logEvent = createLogEventShape(bindings);
}
function createLogEventShape(bindings) {
    return {
        ts: 0,
        messages: [],
        bindings: bindings || [],
        level: {
            label: '',
            value: 0
        }
    };
}
function asErrValue(err) {
    const obj = {
        type: err.constructor.name,
        msg: err.message,
        stack: err.stack
    };
    for(const key in err){
        if (obj[key] === undefined) {
            obj[key] = err[key];
        }
    }
    return obj;
}
function getTimeFunction(opts) {
    if (typeof opts.timestamp === 'function') {
        return opts.timestamp;
    }
    if (opts.timestamp === false) {
        return nullTime;
    }
    return epochTime;
}
function mock() {
    return {};
}
function passthrough(a) {
    return a;
}
function noop() {}
function nullTime() {
    return false;
}
function epochTime() {
    return Date.now();
}
function unixTime() {
    return Math.round(Date.now() / 1000.0);
}
function isoTime() {
    return new Date(Date.now()).toISOString();
} // using Date.now() for testability
/* eslint-disable */ /* istanbul ignore next */ function pfGlobalThisOrFallback() {
    function defd(o) {
        return typeof o !== 'undefined' && o;
    }
    try {
        if (typeof globalThis !== 'undefined') return globalThis;
        Object.defineProperty(Object.prototype, 'globalThis', {
            get: function() {
                delete Object.prototype.globalThis;
                return this.globalThis = this;
            },
            configurable: true
        });
        return globalThis;
    } catch (e) {
        return defd(self) || defd(window) || defd(this) || {};
    }
} /* eslint-enable */ 
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/pino/browser.js [app-client] (ecmascript) <export default as pino>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pino",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/pino/browser.js [app-client] (ecmascript)");
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/logger/dist/index.es.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_LOG_SIZE_IN_BYTES_DEFAULT",
    ()=>l,
    "PINO_CUSTOM_CONTEXT_KEY",
    ()=>n,
    "PINO_LOGGER_DEFAULTS",
    ()=>c,
    "formatChildLoggerContext",
    ()=>w,
    "generateChildLogger",
    ()=>E,
    "generateClientLogger",
    ()=>C,
    "generatePlatformLogger",
    ()=>A,
    "generateServerLogger",
    ()=>I,
    "getBrowserLoggerContext",
    ()=>v,
    "getDefaultLoggerOptions",
    ()=>k,
    "getLoggerContext",
    ()=>y,
    "setBrowserLoggerContext",
    ()=>b
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/pino/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-client] (ecmascript)");
;
;
;
const c = {
    level: "info"
}, n = "custom_context", l = 1e3 * 1024;
class O {
    constructor(e){
        this.nodeValue = e, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
    }
    get value() {
        return this.nodeValue;
    }
    get size() {
        return this.sizeInBytes;
    }
}
class d {
    constructor(e){
        this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e, this.sizeInBytes = 0;
    }
    append(e) {
        const t = new O(e);
        if (t.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${e} with size ${t.size}`);
        for(; this.size + t.size > this.maxSizeInBytes;)this.shift();
        this.head ? (this.tail && (this.tail.next = t), this.tail = t) : (this.head = t, this.tail = t), this.lengthInNodes++, this.sizeInBytes += t.size;
    }
    shift() {
        if (!this.head) return;
        const e = this.head;
        this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e.size;
    }
    toArray() {
        const e = [];
        let t = this.head;
        for(; t !== null;)e.push(t.value), t = t.next;
        return e;
    }
    get length() {
        return this.lengthInNodes;
    }
    get size() {
        return this.sizeInBytes;
    }
    toOrderedArray() {
        return Array.from(this);
    }
    [Symbol.iterator]() {
        let e = this.head;
        return {
            next: ()=>{
                if (!e) return {
                    done: !0,
                    value: null
                };
                const t = e.value;
                return e = e.next, {
                    done: !1,
                    value: t
                };
            }
        };
    }
}
class L {
    constructor(e, t = l){
        this.level = e ?? "error", this.levelValue = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["levels"].values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
    }
    forwardToConsole(e, t) {
        t === __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["levels"].values.error ? console.error(e) : t === __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["levels"].values.warn ? console.warn(e) : t === __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["levels"].values.debug ? console.debug(e) : t === __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["levels"].values.trace ? console.trace(e) : console.log(e);
    }
    appendToLogs(e) {
        this.logs.append((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonStringify"])({
            timestamp: new Date().toISOString(),
            log: e
        }));
        const t = typeof e == "string" ? JSON.parse(e).level : e.level;
        t >= this.levelValue && this.forwardToConsole(e, t);
    }
    getLogs() {
        return this.logs;
    }
    clearLogs() {
        this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
    }
    getLogArray() {
        return Array.from(this.logs);
    }
    logsToBlob(e) {
        const t = this.getLogArray();
        return t.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonStringify"])({
            extraMetadata: e
        })), new Blob(t, {
            type: "application/json"
        });
    }
}
class m {
    constructor(e, t = l){
        this.baseChunkLogger = new L(e, t);
    }
    write(e) {
        this.baseChunkLogger.appendToLogs(e);
    }
    getLogs() {
        return this.baseChunkLogger.getLogs();
    }
    clearLogs() {
        this.baseChunkLogger.clearLogs();
    }
    getLogArray() {
        return this.baseChunkLogger.getLogArray();
    }
    logsToBlob(e) {
        return this.baseChunkLogger.logsToBlob(e);
    }
    downloadLogsBlobInBrowser(e) {
        const t = URL.createObjectURL(this.logsToBlob(e)), o = document.createElement("a");
        o.href = t, o.download = `walletconnect-logs-${new Date().toISOString()}.txt`, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(t);
    }
}
class B {
    constructor(e, t = l){
        this.baseChunkLogger = new L(e, t);
    }
    write(e) {
        this.baseChunkLogger.appendToLogs(e);
    }
    getLogs() {
        return this.baseChunkLogger.getLogs();
    }
    clearLogs() {
        this.baseChunkLogger.clearLogs();
    }
    getLogArray() {
        return this.baseChunkLogger.getLogArray();
    }
    logsToBlob(e) {
        return this.baseChunkLogger.logsToBlob(e);
    }
}
var x = Object.defineProperty, S = Object.defineProperties, _ = Object.getOwnPropertyDescriptors, p = Object.getOwnPropertySymbols, T = Object.prototype.hasOwnProperty, z = Object.prototype.propertyIsEnumerable, f = (r, e, t)=>e in r ? x(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, i = (r, e)=>{
    for(var t in e || (e = {}))T.call(e, t) && f(r, t, e[t]);
    if (p) for (var t of p(e))z.call(e, t) && f(r, t, e[t]);
    return r;
}, g = (r, e)=>S(r, _(e));
function k(r) {
    return g(i({}, r), {
        level: r?.level || c.level
    });
}
function v(r, e = n) {
    return r[e] || "";
}
function b(r, e, t = n) {
    return r[t] = e, r;
}
function y(r, e = n) {
    let t = "";
    return typeof r.bindings > "u" ? t = v(r, e) : t = r.bindings().context || "", t;
}
function w(r, e, t = n) {
    const o = y(r, t);
    return o.trim() ? `${o}/${e}` : e;
}
function E(r, e, t = n) {
    const o = w(r, e, t), a = r.child({
        context: o
    });
    return b(a, o, t);
}
function C(r) {
    var e, t;
    const o = new m((e = r.opts) == null ? void 0 : e.level, r.maxSizeInBytes);
    return {
        logger: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(g(i({}, r.opts), {
            level: "trace",
            browser: g(i({}, (t = r.opts) == null ? void 0 : t.browser), {
                write: (a)=>o.write(a)
            })
        })),
        chunkLoggerController: o
    };
}
function I(r) {
    var e;
    const t = new B((e = r.opts) == null ? void 0 : e.level, r.maxSizeInBytes);
    return {
        logger: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(g(i({}, r.opts), {
            level: "trace"
        }), t),
        chunkLoggerController: t
    };
}
function A(r) {
    return typeof r.loggerOverride < "u" && typeof r.loggerOverride != "string" ? {
        logger: r.loggerOverride,
        chunkLoggerController: null
    } : typeof window < "u" ? C(r) : I(r);
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/core/node_modules/@walletconnect/types/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ICore",
    ()=>h,
    "ICrypto",
    ()=>g,
    "IEchoClient",
    ()=>O,
    "IEngine",
    ()=>V,
    "IEngineEvents",
    ()=>K,
    "IEventClient",
    ()=>R,
    "IExpirer",
    ()=>S,
    "IJsonRpcHistory",
    ()=>I,
    "IKeyChain",
    ()=>j,
    "IMessageTracker",
    ()=>y,
    "IPairing",
    ()=>$,
    "IPublisher",
    ()=>m,
    "IRelayer",
    ()=>d,
    "ISignClient",
    ()=>J,
    "ISignClientEvents",
    ()=>H,
    "IStore",
    ()=>f,
    "ISubscriber",
    ()=>P,
    "ISubscriberTopicMap",
    ()=>C,
    "IVerify",
    ()=>M
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/events/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/events/dist/esm/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/events/events.js [app-client] (ecmascript)");
;
;
var a = Object.defineProperty, u = (e, s, r)=>s in e ? a(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, c = (e, s, r)=>u(e, typeof s != "symbol" ? s + "" : s, r);
class h extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s){
        super(), this.opts = s, c(this, "protocol", "wc"), c(this, "version", 2);
    }
}
class g {
    constructor(s, r, t){
        this.core = s, this.logger = r;
    }
}
var p = Object.defineProperty, b = (e, s, r)=>s in e ? p(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, v = (e, s, r)=>b(e, typeof s != "symbol" ? s + "" : s, r);
class I extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.core = s, this.logger = r, v(this, "records", new Map);
    }
}
class y {
    constructor(s, r){
        this.logger = s, this.core = r;
    }
}
class m extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.relayer = s, this.logger = r;
    }
}
class d extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s){
        super();
    }
}
class f {
    constructor(s, r, t, q){
        this.core = s, this.logger = r, this.name = t;
    }
}
var E = Object.defineProperty, x = (e, s, r)=>s in e ? E(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, w = (e, s, r)=>x(e, typeof s != "symbol" ? s + "" : s, r);
class C {
    constructor(){
        w(this, "map", new Map);
    }
}
class P extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.relayer = s, this.logger = r;
    }
}
class j {
    constructor(s, r){
        this.core = s, this.logger = r;
    }
}
class S extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.core = s, this.logger = r;
    }
}
class $ {
    constructor(s, r){
        this.logger = s, this.core = r;
    }
}
class M {
    constructor(s, r, t){
        this.core = s, this.logger = r, this.store = t;
    }
}
class O {
    constructor(s, r){
        this.projectId = s, this.logger = r;
    }
}
class R {
    constructor(s, r, t){
        this.core = s, this.logger = r, this.telemetryEnabled = t;
    }
}
var T = Object.defineProperty, k = (e, s, r)=>s in e ? T(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, i = (e, s, r)=>k(e, typeof s != "symbol" ? s + "" : s, r);
class H extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    constructor(){
        super();
    }
}
class J {
    constructor(s){
        this.opts = s, i(this, "protocol", "wc"), i(this, "version", 2);
    }
}
class K extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"] {
    constructor(){
        super();
    }
}
class V {
    constructor(s){
        this.client = s;
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/sign-client/node_modules/@walletconnect/types/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ICore",
    ()=>h,
    "ICrypto",
    ()=>g,
    "IEchoClient",
    ()=>O,
    "IEngine",
    ()=>V,
    "IEngineEvents",
    ()=>K,
    "IEventClient",
    ()=>R,
    "IExpirer",
    ()=>S,
    "IJsonRpcHistory",
    ()=>I,
    "IKeyChain",
    ()=>j,
    "IMessageTracker",
    ()=>y,
    "IPairing",
    ()=>$,
    "IPublisher",
    ()=>m,
    "IRelayer",
    ()=>d,
    "ISignClient",
    ()=>J,
    "ISignClientEvents",
    ()=>H,
    "IStore",
    ()=>f,
    "ISubscriber",
    ()=>P,
    "ISubscriberTopicMap",
    ()=>C,
    "IVerify",
    ()=>M
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/events/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/events/dist/esm/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/events/events.js [app-client] (ecmascript)");
;
;
var a = Object.defineProperty, u = (e, s, r)=>s in e ? a(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, c = (e, s, r)=>u(e, typeof s != "symbol" ? s + "" : s, r);
class h extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s){
        super(), this.opts = s, c(this, "protocol", "wc"), c(this, "version", 2);
    }
}
class g {
    constructor(s, r, t){
        this.core = s, this.logger = r;
    }
}
var p = Object.defineProperty, b = (e, s, r)=>s in e ? p(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, v = (e, s, r)=>b(e, typeof s != "symbol" ? s + "" : s, r);
class I extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.core = s, this.logger = r, v(this, "records", new Map);
    }
}
class y {
    constructor(s, r){
        this.logger = s, this.core = r;
    }
}
class m extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.relayer = s, this.logger = r;
    }
}
class d extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s){
        super();
    }
}
class f {
    constructor(s, r, t, q){
        this.core = s, this.logger = r, this.name = t;
    }
}
var E = Object.defineProperty, x = (e, s, r)=>s in e ? E(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, w = (e, s, r)=>x(e, typeof s != "symbol" ? s + "" : s, r);
class C {
    constructor(){
        w(this, "map", new Map);
    }
}
class P extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.relayer = s, this.logger = r;
    }
}
class j {
    constructor(s, r){
        this.core = s, this.logger = r;
    }
}
class S extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.core = s, this.logger = r;
    }
}
class $ {
    constructor(s, r){
        this.logger = s, this.core = r;
    }
}
class M {
    constructor(s, r, t){
        this.core = s, this.logger = r, this.store = t;
    }
}
class O {
    constructor(s, r){
        this.projectId = s, this.logger = r;
    }
}
class R {
    constructor(s, r, t){
        this.core = s, this.logger = r, this.telemetryEnabled = t;
    }
}
var T = Object.defineProperty, k = (e, s, r)=>s in e ? T(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, i = (e, s, r)=>k(e, typeof s != "symbol" ? s + "" : s, r);
class H extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    constructor(){
        super();
    }
}
class J {
    constructor(s){
        this.opts = s, i(this, "protocol", "wc"), i(this, "version", 2);
    }
}
class K extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"] {
    constructor(){
        super();
    }
}
class V {
    constructor(s){
        this.client = s;
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_ERROR",
    ()=>DEFAULT_ERROR,
    "INTERNAL_ERROR",
    ()=>INTERNAL_ERROR,
    "INVALID_PARAMS",
    ()=>INVALID_PARAMS,
    "INVALID_REQUEST",
    ()=>INVALID_REQUEST,
    "METHOD_NOT_FOUND",
    ()=>METHOD_NOT_FOUND,
    "PARSE_ERROR",
    ()=>PARSE_ERROR,
    "RESERVED_ERROR_CODES",
    ()=>RESERVED_ERROR_CODES,
    "SERVER_ERROR",
    ()=>SERVER_ERROR,
    "SERVER_ERROR_CODE_RANGE",
    ()=>SERVER_ERROR_CODE_RANGE,
    "STANDARD_ERROR_MAP",
    ()=>STANDARD_ERROR_MAP
]);
const PARSE_ERROR = "PARSE_ERROR";
const INVALID_REQUEST = "INVALID_REQUEST";
const METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
const INVALID_PARAMS = "INVALID_PARAMS";
const INTERNAL_ERROR = "INTERNAL_ERROR";
const SERVER_ERROR = "SERVER_ERROR";
const RESERVED_ERROR_CODES = [
    -32700,
    -32600,
    -32601,
    -32602,
    -32603
];
const SERVER_ERROR_CODE_RANGE = [
    -32000,
    -32099
];
const STANDARD_ERROR_MAP = {
    [PARSE_ERROR]: {
        code: -32700,
        message: "Parse error"
    },
    [INVALID_REQUEST]: {
        code: -32600,
        message: "Invalid Request"
    },
    [METHOD_NOT_FOUND]: {
        code: -32601,
        message: "Method not found"
    },
    [INVALID_PARAMS]: {
        code: -32602,
        message: "Invalid params"
    },
    [INTERNAL_ERROR]: {
        code: -32603,
        message: "Internal error"
    },
    [SERVER_ERROR]: {
        code: -32000,
        message: "Server error"
    }
};
const DEFAULT_ERROR = SERVER_ERROR; //# sourceMappingURL=constants.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getError",
    ()=>getError,
    "getErrorByCode",
    ()=>getErrorByCode,
    "isReservedErrorCode",
    ()=>isReservedErrorCode,
    "isServerErrorCode",
    ()=>isServerErrorCode,
    "isValidErrorCode",
    ()=>isValidErrorCode,
    "parseConnectionError",
    ()=>parseConnectionError,
    "validateJsonRpcError",
    ()=>validateJsonRpcError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js [app-client] (ecmascript)");
;
function isServerErrorCode(code) {
    return code <= __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SERVER_ERROR_CODE_RANGE"][0] && code >= __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SERVER_ERROR_CODE_RANGE"][1];
}
function isReservedErrorCode(code) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESERVED_ERROR_CODES"].includes(code);
}
function isValidErrorCode(code) {
    return typeof code === "number";
}
function getError(type) {
    if (!Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"]).includes(type)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"][__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_ERROR"]];
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"][type];
}
function getErrorByCode(code) {
    const match = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"]).find((e)=>e.code === code);
    if (!match) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"][__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_ERROR"]];
    }
    return match;
}
function validateJsonRpcError(response) {
    if (typeof response.error.code === "undefined") {
        return {
            valid: false,
            error: "Missing code for JSON-RPC error"
        };
    }
    if (typeof response.error.message === "undefined") {
        return {
            valid: false,
            error: "Missing message for JSON-RPC error"
        };
    }
    if (!isValidErrorCode(response.error.code)) {
        return {
            valid: false,
            error: `Invalid error code type for JSON-RPC: ${response.error.code}`
        };
    }
    if (isReservedErrorCode(response.error.code)) {
        const error = getErrorByCode(response.error.code);
        if (error.message !== __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"][__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_ERROR"]].message && response.error.message === error.message) {
            return {
                valid: false,
                error: `Invalid error code message for JSON-RPC: ${response.error.code}`
            };
        }
    }
    return {
        valid: true
    };
}
function parseConnectionError(e, url, type) {
    return e.message.includes("getaddrinfo ENOTFOUND") || e.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e;
} //# sourceMappingURL=error.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNodeJs",
    ()=>isNodeJs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$environment$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/environment/dist/cjs/index.js [app-client] (ecmascript)");
;
const isNodeJs = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$environment$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNode"];
;
 //# sourceMappingURL=env.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatErrorMessage",
    ()=>formatErrorMessage,
    "formatJsonRpcError",
    ()=>formatJsonRpcError,
    "formatJsonRpcRequest",
    ()=>formatJsonRpcRequest,
    "formatJsonRpcResult",
    ()=>formatJsonRpcResult,
    "getBigIntRpcId",
    ()=>getBigIntRpcId,
    "payloadId",
    ()=>payloadId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js [app-client] (ecmascript)");
;
;
function payloadId(entropy = 3) {
    const date = Date.now() * Math.pow(10, entropy);
    const extra = Math.floor(Math.random() * Math.pow(10, entropy));
    return date + extra;
}
function getBigIntRpcId(entropy = 6) {
    return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
    return {
        id: id || payloadId(),
        jsonrpc: "2.0",
        method,
        params
    };
}
function formatJsonRpcResult(id, result) {
    return {
        id,
        jsonrpc: "2.0",
        result
    };
}
function formatJsonRpcError(id, error, data) {
    return {
        id,
        jsonrpc: "2.0",
        error: formatErrorMessage(error, data)
    };
}
function formatErrorMessage(error, data) {
    if (typeof error === "undefined") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getError"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INTERNAL_ERROR"]);
    }
    if (typeof error === "string") {
        error = Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getError"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SERVER_ERROR"])), {
            message: error
        });
    }
    if (typeof data !== "undefined") {
        error.data = data;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isReservedErrorCode"])(error.code)) {
        error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getErrorByCode"])(error.code);
    }
    return error;
} //# sourceMappingURL=format.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isValidDefaultRoute",
    ()=>isValidDefaultRoute,
    "isValidLeadingWildcardRoute",
    ()=>isValidLeadingWildcardRoute,
    "isValidRoute",
    ()=>isValidRoute,
    "isValidTrailingWildcardRoute",
    ()=>isValidTrailingWildcardRoute,
    "isValidWildcardRoute",
    ()=>isValidWildcardRoute
]);
function isValidRoute(route) {
    if (route.includes("*")) {
        return isValidWildcardRoute(route);
    }
    if (/\W/g.test(route)) {
        return false;
    }
    return true;
}
function isValidDefaultRoute(route) {
    return route === "*";
}
function isValidWildcardRoute(route) {
    if (isValidDefaultRoute(route)) {
        return true;
    }
    if (!route.includes("*")) {
        return false;
    }
    if (route.split("*").length !== 2) {
        return false;
    }
    if (route.split("*").filter((x)=>x.trim() === "").length !== 1) {
        return false;
    }
    return true;
}
function isValidLeadingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
} //# sourceMappingURL=routing.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/types.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-types/dist/index.es.js [app-client] (ecmascript)"); //# sourceMappingURL=types.js.map
;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isHttpUrl",
    ()=>isHttpUrl,
    "isLocalhostUrl",
    ()=>isLocalhostUrl,
    "isWsUrl",
    ()=>isWsUrl
]);
const HTTP_REGEX = "^https?:";
const WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
    const matches = url.match(new RegExp(/^\w+:/, "gi"));
    if (!matches || !matches.length) return;
    return matches[0];
}
function matchRegexProtocol(url, regex) {
    const protocol = getUrlProtocol(url);
    if (typeof protocol === "undefined") return false;
    return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
    return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
    return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
    return new RegExp("wss?://localhost(:d{2,5})?").test(url);
} //# sourceMappingURL=url.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isJsonRpcError",
    ()=>isJsonRpcError,
    "isJsonRpcPayload",
    ()=>isJsonRpcPayload,
    "isJsonRpcRequest",
    ()=>isJsonRpcRequest,
    "isJsonRpcResponse",
    ()=>isJsonRpcResponse,
    "isJsonRpcResult",
    ()=>isJsonRpcResult,
    "isJsonRpcValidationInvalid",
    ()=>isJsonRpcValidationInvalid
]);
function isJsonRpcPayload(payload) {
    return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
    return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
    return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
    return "result" in payload;
}
function isJsonRpcError(payload) {
    return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
    return "error" in validation && validation.valid === false;
} //# sourceMappingURL=validators.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$routing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/types.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
;
;
;
;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/environment/dist/cjs/crypto.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
function getBrowerCrypto() {
    return (/*TURBOPACK member replacement*/ __turbopack_context__.g === null || /*TURBOPACK member replacement*/ __turbopack_context__.g === void 0 ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.crypto) || (/*TURBOPACK member replacement*/ __turbopack_context__.g === null || /*TURBOPACK member replacement*/ __turbopack_context__.g === void 0 ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.msCrypto) || {};
}
exports.getBrowerCrypto = getBrowerCrypto;
function getSubtleCrypto() {
    const browserCrypto = getBrowerCrypto();
    return browserCrypto.subtle || browserCrypto.webkitSubtle;
}
exports.getSubtleCrypto = getSubtleCrypto;
function isBrowserCryptoAvailable() {
    return !!getBrowerCrypto() && !!getSubtleCrypto();
}
exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable; //# sourceMappingURL=crypto.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/environment/dist/cjs/env.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
function isReactNative() {
    return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
}
exports.isReactNative = isReactNative;
function isNode() {
    return typeof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions !== "undefined" && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.node !== "undefined";
}
exports.isNode = isNode;
function isBrowser() {
    return !isReactNative() && !isNode();
}
exports.isBrowser = isBrowser; //# sourceMappingURL=env.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/environment/dist/cjs/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js [app-client] (ecmascript)");
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/environment/dist/cjs/crypto.js [app-client] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/environment/dist/cjs/env.js [app-client] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-types/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IBaseJsonRpcProvider",
    ()=>n,
    "IEvents",
    ()=>e,
    "IJsonRpcConnection",
    ()=>o,
    "IJsonRpcProvider",
    ()=>r
]);
class e {
}
class o extends e {
    constructor(c){
        super();
    }
}
class n extends e {
    constructor(){
        super();
    }
}
class r extends n {
    constructor(c){
        super();
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JsonRpcProvider",
    ()=>o,
    "default",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/events/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-types/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js [app-client] (ecmascript)");
;
;
class o extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IJsonRpcProvider"] {
    constructor(t){
        super(t), this.events = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"], this.hasRegisteredEventListeners = !1, this.connection = this.setConnection(t), this.connection.connected && this.registerEventListeners();
    }
    async connect(t = this.connection) {
        await this.open(t);
    }
    async disconnect() {
        await this.close();
    }
    on(t, e) {
        this.events.on(t, e);
    }
    once(t, e) {
        this.events.once(t, e);
    }
    off(t, e) {
        this.events.off(t, e);
    }
    removeListener(t, e) {
        this.events.removeListener(t, e);
    }
    async request(t, e) {
        return this.requestStrict((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])(t.method, t.params || [], t.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBigIntRpcId"])().toString()), e);
    }
    async requestStrict(t, e) {
        return new Promise(async (i, s)=>{
            if (!this.connection.connected) try {
                await this.open();
            } catch (n) {
                s(n);
            }
            this.events.on(`${t.id}`, (n)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcError"])(n) ? s(n.error) : i(n.result);
            });
            try {
                await this.connection.send(t, e);
            } catch (n) {
                s(n);
            }
        });
    }
    setConnection(t = this.connection) {
        return t;
    }
    onPayload(t) {
        this.events.emit("payload", t), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResponse"])(t) ? this.events.emit(`${t.id}`, t) : this.events.emit("message", {
            type: t.method,
            data: t.params
        });
    }
    onClose(t) {
        t && t.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason ? `(${t.reason})` : ""}`)), this.events.emit("disconnect");
    }
    async open(t = this.connection) {
        this.connection === t && this.connection.connected || (this.connection.connected && this.close(), typeof t == "string" && (await this.connection.open(t), t = this.connection), this.connection = this.setConnection(t), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
    }
    async close() {
        await this.connection.close();
    }
    registerEventListeners() {
        this.hasRegisteredEventListeners || (this.connection.on("payload", (t)=>this.onPayload(t)), this.connection.on("close", (t)=>this.onClose(t)), this.connection.on("error", (t)=>this.events.emit("error", t)), this.connection.on("register_error", (t)=>this.onClose()), this.hasRegisteredEventListeners = !0);
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/ws/browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function() {
    throw new Error('ws does not work in the browser. Browser clients must use the native ' + 'WebSocket object');
};
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WsConnection",
    ()=>f,
    "default",
    ()=>f
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/events/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$environment$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/environment/dist/cjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js [app-client] (ecmascript)");
;
;
;
const v = ()=>typeof WebSocket < "u" ? WebSocket : ("TURBOPACK compile-time value", "object") < "u" && typeof /*TURBOPACK member replacement*/ __turbopack_context__.g.WebSocket < "u" ? /*TURBOPACK member replacement*/ __turbopack_context__.g.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : __turbopack_context__.r("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/ws/browser.js [app-client] (ecmascript)"), w = ()=>typeof WebSocket < "u" || ("TURBOPACK compile-time value", "object") < "u" && typeof /*TURBOPACK member replacement*/ __turbopack_context__.g.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u", d = (r)=>r.split("?")[0], h = 10, b = v();
class f {
    constructor(e){
        if (this.url = e, this.events = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"], this.registering = !1, !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWsUrl"])(e)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
        this.url = e;
    }
    get connected() {
        return typeof this.socket < "u";
    }
    get connecting() {
        return this.registering;
    }
    on(e, t) {
        this.events.on(e, t);
    }
    once(e, t) {
        this.events.once(e, t);
    }
    off(e, t) {
        this.events.off(e, t);
    }
    removeListener(e, t) {
        this.events.removeListener(e, t);
    }
    async open(e = this.url) {
        await this.register(e);
    }
    async close() {
        return new Promise((e, t)=>{
            if (typeof this.socket > "u") {
                t(new Error("Connection already closed"));
                return;
            }
            this.socket.onclose = (n)=>{
                this.onClose(n), e();
            }, this.socket.close();
        });
    }
    async send(e) {
        typeof this.socket > "u" && (this.socket = await this.register());
        try {
            this.socket.send((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonStringify"])(e));
        } catch (t) {
            this.onError(e.id, t);
        }
    }
    register(e = this.url) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWsUrl"])(e)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
        if (this.registering) {
            const t = this.events.getMaxListeners();
            return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise((n, s)=>{
                this.events.once("register_error", (o)=>{
                    this.resetMaxListeners(), s(o);
                }), this.events.once("open", ()=>{
                    if (this.resetMaxListeners(), typeof this.socket > "u") return s(new Error("WebSocket connection is missing or invalid"));
                    n(this.socket);
                });
            });
        }
        return this.url = e, this.registering = !0, new Promise((t, n)=>{
            const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$environment$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isReactNative"])() ? void 0 : {
                rejectUnauthorized: !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLocalhostUrl"])(e)
            }, o = new b(e, [], s);
            w() ? o.onerror = (i)=>{
                const a = i;
                n(this.emitError(a.error));
            } : o.on("error", (i)=>{
                n(this.emitError(i));
            }), o.onopen = ()=>{
                this.onOpen(o), t(o);
            };
        });
    }
    onOpen(e) {
        e.onmessage = (t)=>this.onPayload(t), e.onclose = (t)=>this.onClose(t), this.socket = e, this.registering = !1, this.events.emit("open");
    }
    onClose(e) {
        this.socket = void 0, this.registering = !1, this.events.emit("close", e);
    }
    onPayload(e) {
        if (typeof e.data > "u") return;
        const t = typeof e.data == "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonParse"])(e.data) : e.data;
        this.events.emit("payload", t);
    }
    onError(e, t) {
        const n = this.parseError(t), s = n.message || n.toString(), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcError"])(e, s);
        this.events.emit("payload", o);
    }
    parseError(e, t = this.url) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseConnectionError"])(e, d(t), "WS");
    }
    resetMaxListeners() {
        this.events.getMaxListeners() > h && this.events.setMaxListeners(h);
    }
    emitError(e) {
        const t = this.parseError(new Error(e?.message || `WebSocket connection failed for host: ${d(this.url)}`));
        return this.events.emit("register_error", t), t;
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-http-connection/node_modules/cross-fetch/dist/browser-ponyfill.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Save global object in a variable
var __global__ = typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || ("TURBOPACK compile-time value", "object") !== 'undefined' && /*TURBOPACK member replacement*/ __turbopack_context__.g;
// Create an object that extends from __global__ without the fetch function
var __globalThis__ = function() {
    function F() {
        this.fetch = false;
        this.DOMException = __global__.DOMException;
    }
    F.prototype = __global__; // Needed for feature detection on whatwg-fetch's code
    return new F();
}();
// Wraps whatwg-fetch with a function scope to hijack the global object
// "globalThis" that's going to be patched
(function(globalThis1) {
    var irrelevant = function(exports1) {
        /* eslint-disable no-prototype-builtins */ var g = typeof globalThis1 !== 'undefined' && globalThis1 || typeof self !== 'undefined' && self || ("TURBOPACK compile-time value", "object") !== 'undefined' && /*TURBOPACK member replacement*/ __turbopack_context__.g || {};
        var support = {
            searchParams: 'URLSearchParams' in g,
            iterable: 'Symbol' in g && 'iterator' in Symbol,
            blob: 'FileReader' in g && 'Blob' in g && function() {
                try {
                    new Blob();
                    return true;
                } catch (e) {
                    return false;
                }
            }(),
            formData: 'FormData' in g,
            arrayBuffer: 'ArrayBuffer' in g
        };
        function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
            var viewClasses = [
                '[object Int8Array]',
                '[object Uint8Array]',
                '[object Uint8ClampedArray]',
                '[object Int16Array]',
                '[object Uint16Array]',
                '[object Int32Array]',
                '[object Uint32Array]',
                '[object Float32Array]',
                '[object Float64Array]'
            ];
            var isArrayBufferView = ArrayBuffer.isView || function(obj) {
                return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
            };
        }
        function normalizeName(name) {
            if (typeof name !== 'string') {
                name = String(name);
            }
            if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
                throw new TypeError('Invalid character in header field name: "' + name + '"');
            }
            return name.toLowerCase();
        }
        function normalizeValue(value) {
            if (typeof value !== 'string') {
                value = String(value);
            }
            return value;
        }
        // Build a destructive iterator for the value list
        function iteratorFor(items) {
            var iterator = {
                next: function() {
                    var value = items.shift();
                    return {
                        done: value === undefined,
                        value: value
                    };
                }
            };
            if (support.iterable) {
                iterator[Symbol.iterator] = function() {
                    return iterator;
                };
            }
            return iterator;
        }
        function Headers(headers) {
            this.map = {};
            if (headers instanceof Headers) {
                headers.forEach(function(value, name) {
                    this.append(name, value);
                }, this);
            } else if (Array.isArray(headers)) {
                headers.forEach(function(header) {
                    if (header.length != 2) {
                        throw new TypeError('Headers constructor: expected name/value pair to be length 2, found' + header.length);
                    }
                    this.append(header[0], header[1]);
                }, this);
            } else if (headers) {
                Object.getOwnPropertyNames(headers).forEach(function(name) {
                    this.append(name, headers[name]);
                }, this);
            }
        }
        Headers.prototype.append = function(name, value) {
            name = normalizeName(name);
            value = normalizeValue(value);
            var oldValue = this.map[name];
            this.map[name] = oldValue ? oldValue + ', ' + value : value;
        };
        Headers.prototype['delete'] = function(name) {
            delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
            name = normalizeName(name);
            return this.has(name) ? this.map[name] : null;
        };
        Headers.prototype.has = function(name) {
            return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
            this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
            for(var name in this.map){
                if (this.map.hasOwnProperty(name)) {
                    callback.call(thisArg, this.map[name], name, this);
                }
            }
        };
        Headers.prototype.keys = function() {
            var items = [];
            this.forEach(function(value, name) {
                items.push(name);
            });
            return iteratorFor(items);
        };
        Headers.prototype.values = function() {
            var items = [];
            this.forEach(function(value) {
                items.push(value);
            });
            return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
            var items = [];
            this.forEach(function(value, name) {
                items.push([
                    name,
                    value
                ]);
            });
            return iteratorFor(items);
        };
        if (support.iterable) {
            Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
            if (body._noBody) return;
            if (body.bodyUsed) {
                return Promise.reject(new TypeError('Already read'));
            }
            body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
            return new Promise(function(resolve, reject) {
                reader.onload = function() {
                    resolve(reader.result);
                };
                reader.onerror = function() {
                    reject(reader.error);
                };
            });
        }
        function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsArrayBuffer(blob);
            return promise;
        }
        function readBlobAsText(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
            var encoding = match ? match[1] : 'utf-8';
            reader.readAsText(blob, encoding);
            return promise;
        }
        function readArrayBufferAsText(buf) {
            var view = new Uint8Array(buf);
            var chars = new Array(view.length);
            for(var i = 0; i < view.length; i++){
                chars[i] = String.fromCharCode(view[i]);
            }
            return chars.join('');
        }
        function bufferClone(buf) {
            if (buf.slice) {
                return buf.slice(0);
            } else {
                var view = new Uint8Array(buf.byteLength);
                view.set(new Uint8Array(buf));
                return view.buffer;
            }
        }
        function Body() {
            this.bodyUsed = false;
            this._initBody = function(body) {
                /*
        fetch-mock wraps the Response object in an ES6 Proxy to
        provide useful test harness features such as flush. However, on
        ES5 browsers without fetch or Proxy support pollyfills must be used;
        the proxy-pollyfill is unable to proxy an attribute unless it exists
        on the object before the Proxy is created. This change ensures
        Response.bodyUsed exists on the instance, while maintaining the
        semantic of setting Request.bodyUsed in the constructor before
        _initBody is called.
      */ // eslint-disable-next-line no-self-assign
                this.bodyUsed = this.bodyUsed;
                this._bodyInit = body;
                if (!body) {
                    this._noBody = true;
                    this._bodyText = '';
                } else if (typeof body === 'string') {
                    this._bodyText = body;
                } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                    this._bodyBlob = body;
                } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                    this._bodyFormData = body;
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                    this._bodyText = body.toString();
                } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                    this._bodyArrayBuffer = bufferClone(body.buffer);
                    // IE 10-11 can't handle a DataView body.
                    this._bodyInit = new Blob([
                        this._bodyArrayBuffer
                    ]);
                } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                    this._bodyArrayBuffer = bufferClone(body);
                } else {
                    this._bodyText = body = Object.prototype.toString.call(body);
                }
                if (!this.headers.get('content-type')) {
                    if (typeof body === 'string') {
                        this.headers.set('content-type', 'text/plain;charset=UTF-8');
                    } else if (this._bodyBlob && this._bodyBlob.type) {
                        this.headers.set('content-type', this._bodyBlob.type);
                    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                    }
                }
            };
            if (support.blob) {
                this.blob = function() {
                    var rejected = consumed(this);
                    if (rejected) {
                        return rejected;
                    }
                    if (this._bodyBlob) {
                        return Promise.resolve(this._bodyBlob);
                    } else if (this._bodyArrayBuffer) {
                        return Promise.resolve(new Blob([
                            this._bodyArrayBuffer
                        ]));
                    } else if (this._bodyFormData) {
                        throw new Error('could not read FormData body as blob');
                    } else {
                        return Promise.resolve(new Blob([
                            this._bodyText
                        ]));
                    }
                };
            }
            this.arrayBuffer = function() {
                if (this._bodyArrayBuffer) {
                    var isConsumed = consumed(this);
                    if (isConsumed) {
                        return isConsumed;
                    } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
                        return Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength));
                    } else {
                        return Promise.resolve(this._bodyArrayBuffer);
                    }
                } else if (support.blob) {
                    return this.blob().then(readBlobAsArrayBuffer);
                } else {
                    throw new Error('could not read as ArrayBuffer');
                }
            };
            this.text = function() {
                var rejected = consumed(this);
                if (rejected) {
                    return rejected;
                }
                if (this._bodyBlob) {
                    return readBlobAsText(this._bodyBlob);
                } else if (this._bodyArrayBuffer) {
                    return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
                } else if (this._bodyFormData) {
                    throw new Error('could not read FormData body as text');
                } else {
                    return Promise.resolve(this._bodyText);
                }
            };
            if (support.formData) {
                this.formData = function() {
                    return this.text().then(decode);
                };
            }
            this.json = function() {
                return this.text().then(JSON.parse);
            };
            return this;
        }
        // HTTP methods whose capitalization should be normalized
        var methods = [
            'CONNECT',
            'DELETE',
            'GET',
            'HEAD',
            'OPTIONS',
            'PATCH',
            'POST',
            'PUT',
            'TRACE'
        ];
        function normalizeMethod(method) {
            var upcased = method.toUpperCase();
            return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
            if (!(this instanceof Request)) {
                throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
            }
            options = options || {};
            var body = options.body;
            if (input instanceof Request) {
                if (input.bodyUsed) {
                    throw new TypeError('Already read');
                }
                this.url = input.url;
                this.credentials = input.credentials;
                if (!options.headers) {
                    this.headers = new Headers(input.headers);
                }
                this.method = input.method;
                this.mode = input.mode;
                this.signal = input.signal;
                if (!body && input._bodyInit != null) {
                    body = input._bodyInit;
                    input.bodyUsed = true;
                }
            } else {
                this.url = String(input);
            }
            this.credentials = options.credentials || this.credentials || 'same-origin';
            if (options.headers || !this.headers) {
                this.headers = new Headers(options.headers);
            }
            this.method = normalizeMethod(options.method || this.method || 'GET');
            this.mode = options.mode || this.mode || null;
            this.signal = options.signal || this.signal || function() {
                if ('AbortController' in g) {
                    var ctrl = new AbortController();
                    return ctrl.signal;
                }
            }();
            this.referrer = null;
            if ((this.method === 'GET' || this.method === 'HEAD') && body) {
                throw new TypeError('Body not allowed for GET or HEAD requests');
            }
            this._initBody(body);
            if (this.method === 'GET' || this.method === 'HEAD') {
                if (options.cache === 'no-store' || options.cache === 'no-cache') {
                    // Search for a '_' parameter in the query string
                    var reParamSearch = /([?&])_=[^&]*/;
                    if (reParamSearch.test(this.url)) {
                        // If it already exists then set the value with the current time
                        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
                    } else {
                        // Otherwise add a new '_' parameter to the end with the current time
                        var reQueryString = /\?/;
                        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
                    }
                }
            }
        }
        Request.prototype.clone = function() {
            return new Request(this, {
                body: this._bodyInit
            });
        };
        function decode(body) {
            var form = new FormData();
            body.trim().split('&').forEach(function(bytes) {
                if (bytes) {
                    var split = bytes.split('=');
                    var name = split.shift().replace(/\+/g, ' ');
                    var value = split.join('=').replace(/\+/g, ' ');
                    form.append(decodeURIComponent(name), decodeURIComponent(value));
                }
            });
            return form;
        }
        function parseHeaders(rawHeaders) {
            var headers = new Headers();
            // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
            // https://tools.ietf.org/html/rfc7230#section-3.2
            var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
            // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
            // https://github.com/github/fetch/issues/748
            // https://github.com/zloirock/core-js/issues/751
            preProcessedHeaders.split('\r').map(function(header) {
                return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header;
            }).forEach(function(line) {
                var parts = line.split(':');
                var key = parts.shift().trim();
                if (key) {
                    var value = parts.join(':').trim();
                    try {
                        headers.append(key, value);
                    } catch (error) {
                        console.warn('Response ' + error.message);
                    }
                }
            });
            return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
            if (!(this instanceof Response)) {
                throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
            }
            if (!options) {
                options = {};
            }
            this.type = 'default';
            this.status = options.status === undefined ? 200 : options.status;
            if (this.status < 200 || this.status > 599) {
                throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
            }
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
            this.headers = new Headers(options.headers);
            this.url = options.url || '';
            this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
            return new Response(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new Headers(this.headers),
                url: this.url
            });
        };
        Response.error = function() {
            var response = new Response(null, {
                status: 200,
                statusText: ''
            });
            response.ok = false;
            response.status = 0;
            response.type = 'error';
            return response;
        };
        var redirectStatuses = [
            301,
            302,
            303,
            307,
            308
        ];
        Response.redirect = function(url, status) {
            if (redirectStatuses.indexOf(status) === -1) {
                throw new RangeError('Invalid status code');
            }
            return new Response(null, {
                status: status,
                headers: {
                    location: url
                }
            });
        };
        exports1.DOMException = g.DOMException;
        try {
            new exports1.DOMException();
        } catch (err) {
            exports1.DOMException = function(message, name) {
                this.message = message;
                this.name = name;
                var error = Error(message);
                this.stack = error.stack;
            };
            exports1.DOMException.prototype = Object.create(Error.prototype);
            exports1.DOMException.prototype.constructor = exports1.DOMException;
        }
        function fetch(input, init) {
            return new Promise(function(resolve, reject) {
                var request = new Request(input, init);
                if (request.signal && request.signal.aborted) {
                    return reject(new exports1.DOMException('Aborted', 'AbortError'));
                }
                var xhr = new XMLHttpRequest();
                function abortXhr() {
                    xhr.abort();
                }
                xhr.onload = function() {
                    var options = {
                        statusText: xhr.statusText,
                        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
                    };
                    // This check if specifically for when a user fetches a file locally from the file system
                    // Only if the status is out of a normal range
                    if (request.url.indexOf('file://') === 0 && (xhr.status < 200 || xhr.status > 599)) {
                        options.status = 200;
                    } else {
                        options.status = xhr.status;
                    }
                    options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
                    var body = 'response' in xhr ? xhr.response : xhr.responseText;
                    setTimeout(function() {
                        resolve(new Response(body, options));
                    }, 0);
                };
                xhr.onerror = function() {
                    setTimeout(function() {
                        reject(new TypeError('Network request failed'));
                    }, 0);
                };
                xhr.ontimeout = function() {
                    setTimeout(function() {
                        reject(new TypeError('Network request timed out'));
                    }, 0);
                };
                xhr.onabort = function() {
                    setTimeout(function() {
                        reject(new exports1.DOMException('Aborted', 'AbortError'));
                    }, 0);
                };
                function fixUrl(url) {
                    try {
                        return url === '' && g.location.href ? g.location.href : url;
                    } catch (e) {
                        return url;
                    }
                }
                xhr.open(request.method, fixUrl(request.url), true);
                if (request.credentials === 'include') {
                    xhr.withCredentials = true;
                } else if (request.credentials === 'omit') {
                    xhr.withCredentials = false;
                }
                if ('responseType' in xhr) {
                    if (support.blob) {
                        xhr.responseType = 'blob';
                    } else if (support.arrayBuffer) {
                        xhr.responseType = 'arraybuffer';
                    }
                }
                if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers || g.Headers && init.headers instanceof g.Headers)) {
                    var names = [];
                    Object.getOwnPropertyNames(init.headers).forEach(function(name) {
                        names.push(normalizeName(name));
                        xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
                    });
                    request.headers.forEach(function(value, name) {
                        if (names.indexOf(name) === -1) {
                            xhr.setRequestHeader(name, value);
                        }
                    });
                } else {
                    request.headers.forEach(function(value, name) {
                        xhr.setRequestHeader(name, value);
                    });
                }
                if (request.signal) {
                    request.signal.addEventListener('abort', abortXhr);
                    xhr.onreadystatechange = function() {
                        // DONE (success or failure)
                        if (xhr.readyState === 4) {
                            request.signal.removeEventListener('abort', abortXhr);
                        }
                    };
                }
                xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
            });
        }
        fetch.polyfill = true;
        if (!g.fetch) {
            g.fetch = fetch;
            g.Headers = Headers;
            g.Request = Request;
            g.Response = Response;
        }
        exports1.Headers = Headers;
        exports1.Request = Request;
        exports1.Response = Response;
        exports1.fetch = fetch;
        Object.defineProperty(exports1, '__esModule', {
            value: true
        });
        return exports1;
    }({});
})(__globalThis__);
// This is a ponyfill, so...
__globalThis__.fetch.ponyfill = true;
delete __globalThis__.fetch.polyfill;
// Choose between native implementation (__global__) or custom implementation (__globalThis__)
var ctx = __global__.fetch ? __global__ : __globalThis__;
exports = ctx.fetch; // To enable: import fetch from 'cross-fetch'
exports.default = ctx.fetch; // For TypeScript consumers without esModuleInterop.
exports.fetch = ctx.fetch; // To enable: import {fetch} from 'cross-fetch'
exports.Headers = ctx.Headers;
exports.Request = ctx.Request;
exports.Response = ctx.Response;
module.exports = exports;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-http-connection/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpConnection",
    ()=>f,
    "default",
    ()=>f
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/events/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$node_modules$2f$cross$2d$fetch$2f$dist$2f$browser$2d$ponyfill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-http-connection/node_modules/cross-fetch/dist/browser-ponyfill.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js [app-client] (ecmascript)");
;
;
;
;
var P = Object.defineProperty, w = Object.defineProperties, E = Object.getOwnPropertyDescriptors, c = Object.getOwnPropertySymbols, L = Object.prototype.hasOwnProperty, O = Object.prototype.propertyIsEnumerable, l = (r, t, e)=>t in r ? P(r, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : r[t] = e, p = (r, t)=>{
    for(var e in t || (t = {}))L.call(t, e) && l(r, e, t[e]);
    if (c) for (var e of c(t))O.call(t, e) && l(r, e, t[e]);
    return r;
}, v = (r, t)=>w(r, E(t));
const j = {
    Accept: "application/json",
    "Content-Type": "application/json"
}, T = "POST", d = {
    headers: j,
    method: T
}, g = 10;
class f {
    constructor(t, e = !1){
        if (this.url = t, this.disableProviderPing = e, this.events = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"], this.isAvailable = !1, this.registering = !1, !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHttpUrl"])(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
        this.url = t, this.disableProviderPing = e;
    }
    get connected() {
        return this.isAvailable;
    }
    get connecting() {
        return this.registering;
    }
    on(t, e) {
        this.events.on(t, e);
    }
    once(t, e) {
        this.events.once(t, e);
    }
    off(t, e) {
        this.events.off(t, e);
    }
    removeListener(t, e) {
        this.events.removeListener(t, e);
    }
    async open(t = this.url) {
        await this.register(t);
    }
    async close() {
        if (!this.isAvailable) throw new Error("Connection already closed");
        this.onClose();
    }
    async send(t) {
        this.isAvailable || await this.register();
        try {
            const e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonStringify"])(t), s = await (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$node_modules$2f$cross$2d$fetch$2f$dist$2f$browser$2d$ponyfill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(this.url, v(p({}, d), {
                body: e
            }))).json();
            this.onPayload({
                data: s
            });
        } catch (e) {
            this.onError(t.id, e);
        }
    }
    async register(t = this.url) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHttpUrl"])(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
        if (this.registering) {
            const e = this.events.getMaxListeners();
            return (this.events.listenerCount("register_error") >= e || this.events.listenerCount("open") >= e) && this.events.setMaxListeners(e + 1), new Promise((s, i)=>{
                this.events.once("register_error", (n)=>{
                    this.resetMaxListeners(), i(n);
                }), this.events.once("open", ()=>{
                    if (this.resetMaxListeners(), typeof this.isAvailable > "u") return i(new Error("HTTP connection is missing or invalid"));
                    s();
                });
            });
        }
        this.url = t, this.registering = !0;
        try {
            if (!this.disableProviderPing) {
                const e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonStringify"])({
                    id: 1,
                    jsonrpc: "2.0",
                    method: "test",
                    params: []
                });
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$node_modules$2f$cross$2d$fetch$2f$dist$2f$browser$2d$ponyfill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(t, v(p({}, d), {
                    body: e
                }));
            }
            this.onOpen();
        } catch (e) {
            const s = this.parseError(e);
            throw this.events.emit("register_error", s), this.onClose(), s;
        }
    }
    onOpen() {
        this.isAvailable = !0, this.registering = !1, this.events.emit("open");
    }
    onClose() {
        this.isAvailable = !1, this.registering = !1, this.events.emit("close");
    }
    onPayload(t) {
        if (typeof t.data > "u") return;
        const e = typeof t.data == "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonParse"])(t.data) : t.data;
        this.events.emit("payload", e);
    }
    onError(t, e) {
        const s = this.parseError(e), i = s.message || s.toString(), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcError"])(t, i);
        this.events.emit("payload", n);
    }
    parseError(t, e = this.url) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseConnectionError"])(t, e, "HTTP");
    }
    resetMaxListeners() {
        this.events.getMaxListeners() > g && this.events.setMaxListeners(g);
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/ethereum-provider/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UniversalProvider",
    ()=>es,
    "default",
    ()=>B
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$sign$2d$client$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/sign-client/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/logger/dist/index.es.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pino$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/pino/browser.js [app-client] (ecmascript) <export default as pino>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-http-connection/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/events/events.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const et = "error", St = "wss://relay.walletconnect.org", Dt = "wc", qt = "universal_provider", U = `${Dt}@2:${qt}:`, st = "https://rpc.walletconnect.org/v1/", I = "generic", jt = `${st}bundler`, u = {
    DEFAULT_CHAIN_CHANGED: "default_chain_changed"
};
function Rt() {}
function k(s) {
    return s == null || typeof s != "object" && typeof s != "function";
}
function W(s) {
    return ArrayBuffer.isView(s) && !(s instanceof DataView);
}
function _t(s) {
    if (k(s)) return s;
    if (Array.isArray(s) || W(s) || s instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s instanceof SharedArrayBuffer) return s.slice(0);
    const t = Object.getPrototypeOf(s), e = t.constructor;
    if (s instanceof Date || s instanceof Map || s instanceof Set) return new e(s);
    if (s instanceof RegExp) {
        const i = new e(s);
        return i.lastIndex = s.lastIndex, i;
    }
    if (s instanceof DataView) return new e(s.buffer.slice(0));
    if (s instanceof Error) {
        const i = new e(s.message);
        return i.stack = s.stack, i.name = s.name, i.cause = s.cause, i;
    }
    if (typeof File < "u" && s instanceof File) return new e([
        s
    ], s.name, {
        type: s.type,
        lastModified: s.lastModified
    });
    if (typeof s == "object") {
        const i = Object.create(t);
        return Object.assign(i, s);
    }
    return s;
}
function it(s) {
    return typeof s == "object" && s !== null;
}
function rt(s) {
    return Object.getOwnPropertySymbols(s).filter((t)=>Object.prototype.propertyIsEnumerable.call(s, t));
}
function nt(s) {
    return s == null ? s === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(s);
}
const Ut = "[object RegExp]", at = "[object String]", ct = "[object Number]", ot = "[object Boolean]", ht = "[object Arguments]", Ft = "[object Symbol]", Lt = "[object Date]", Mt = "[object Map]", xt = "[object Set]", Bt = "[object Array]", Gt = "[object ArrayBuffer]", Jt = "[object Object]", zt = "[object DataView]", kt = "[object Uint8Array]", Wt = "[object Uint8ClampedArray]", Kt = "[object Uint16Array]", Vt = "[object Uint32Array]", Xt = "[object Int8Array]", Yt = "[object Int16Array]", Qt = "[object Int32Array]", Zt = "[object Float32Array]", Tt = "[object Float64Array]";
function te(s, t) {
    return $(s, void 0, s, new Map, t);
}
function $(s, t, e, i = new Map, n = void 0) {
    const a = n?.(s, t, e, i);
    if (a != null) return a;
    if (k(s)) return s;
    if (i.has(s)) return i.get(s);
    if (Array.isArray(s)) {
        const r = new Array(s.length);
        i.set(s, r);
        for(let c = 0; c < s.length; c++)r[c] = $(s[c], c, e, i, n);
        return Object.hasOwn(s, "index") && (r.index = s.index), Object.hasOwn(s, "input") && (r.input = s.input), r;
    }
    if (s instanceof Date) return new Date(s.getTime());
    if (s instanceof RegExp) {
        const r = new RegExp(s.source, s.flags);
        return r.lastIndex = s.lastIndex, r;
    }
    if (s instanceof Map) {
        const r = new Map;
        i.set(s, r);
        for (const [c, o] of s)r.set(c, $(o, c, e, i, n));
        return r;
    }
    if (s instanceof Set) {
        const r = new Set;
        i.set(s, r);
        for (const c of s)r.add($(c, void 0, e, i, n));
        return r;
    }
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"] < "u" && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(s)) return s.subarray();
    if (W(s)) {
        const r = new (Object.getPrototypeOf(s)).constructor(s.length);
        i.set(s, r);
        for(let c = 0; c < s.length; c++)r[c] = $(s[c], c, e, i, n);
        return r;
    }
    if (s instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s instanceof SharedArrayBuffer) return s.slice(0);
    if (s instanceof DataView) {
        const r = new DataView(s.buffer.slice(0), s.byteOffset, s.byteLength);
        return i.set(s, r), y(r, s, e, i, n), r;
    }
    if (typeof File < "u" && s instanceof File) {
        const r = new File([
            s
        ], s.name, {
            type: s.type
        });
        return i.set(s, r), y(r, s, e, i, n), r;
    }
    if (s instanceof Blob) {
        const r = new Blob([
            s
        ], {
            type: s.type
        });
        return i.set(s, r), y(r, s, e, i, n), r;
    }
    if (s instanceof Error) {
        const r = new s.constructor;
        return i.set(s, r), r.message = s.message, r.name = s.name, r.stack = s.stack, r.cause = s.cause, y(r, s, e, i, n), r;
    }
    if (typeof s == "object" && ee(s)) {
        const r = Object.create(Object.getPrototypeOf(s));
        return i.set(s, r), y(r, s, e, i, n), r;
    }
    return s;
}
function y(s, t, e = s, i, n) {
    const a = [
        ...Object.keys(t),
        ...rt(t)
    ];
    for(let r = 0; r < a.length; r++){
        const c = a[r], o = Object.getOwnPropertyDescriptor(s, c);
        (o == null || o.writable) && (s[c] = $(t[c], c, e, i, n));
    }
}
function ee(s) {
    switch(nt(s)){
        case ht:
        case Bt:
        case Gt:
        case zt:
        case ot:
        case Lt:
        case Zt:
        case Tt:
        case Xt:
        case Yt:
        case Qt:
        case Mt:
        case ct:
        case Jt:
        case Ut:
        case xt:
        case at:
        case Ft:
        case kt:
        case Wt:
        case Kt:
        case Vt:
            return !0;
        default:
            return !1;
    }
}
function se(s, t) {
    return te(s, (e, i, n, a)=>{
        const r = t?.(e, i, n, a);
        if (r != null) return r;
        if (typeof s == "object") switch(Object.prototype.toString.call(s)){
            case ct:
            case at:
            case ot:
                {
                    const c = new s.constructor(s?.valueOf());
                    return y(c, s), c;
                }
            case ht:
                {
                    const c = {};
                    return y(c, s), c.length = s.length, c[Symbol.iterator] = s[Symbol.iterator], c;
                }
            default:
                return;
        }
    });
}
function pt(s) {
    return se(s);
}
function dt(s) {
    return s !== null && typeof s == "object" && nt(s) === "[object Arguments]";
}
function ie(s) {
    return W(s);
}
function re(s) {
    if (typeof s != "object" || s == null) return !1;
    if (Object.getPrototypeOf(s) === null) return !0;
    if (Object.prototype.toString.call(s) !== "[object Object]") {
        const e = s[Symbol.toStringTag];
        return e == null || !Object.getOwnPropertyDescriptor(s, Symbol.toStringTag)?.writable ? !1 : s.toString() === `[object ${e}]`;
    }
    let t = s;
    for(; Object.getPrototypeOf(t) !== null;)t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(s) === t;
}
function ne(s, ...t) {
    const e = t.slice(0, -1), i = t[t.length - 1];
    let n = s;
    for(let a = 0; a < e.length; a++){
        const r = e[a];
        n = F(n, r, i, new Map);
    }
    return n;
}
function F(s, t, e, i) {
    if (k(s) && (s = Object(s)), t == null || typeof t != "object") return s;
    if (i.has(t)) return _t(i.get(t));
    if (i.set(t, s), Array.isArray(t)) {
        t = t.slice();
        for(let a = 0; a < t.length; a++)t[a] = t[a] ?? void 0;
    }
    const n = [
        ...Object.keys(t),
        ...rt(t)
    ];
    for(let a = 0; a < n.length; a++){
        const r = n[a];
        let c = t[r], o = s[r];
        if (dt(c) && (c = {
            ...c
        }), dt(o) && (o = {
            ...o
        }), typeof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"] < "u" && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(c) && (c = pt(c)), Array.isArray(c)) if (typeof o == "object" && o != null) {
            const w = [], v = Reflect.ownKeys(o);
            for(let P = 0; P < v.length; P++){
                const p = v[P];
                w[p] = o[p];
            }
            o = w;
        } else o = [];
        const m = e(o, c, r, s, t, i);
        m != null ? s[r] = m : Array.isArray(c) || it(o) && it(c) ? s[r] = F(o, c, e, i) : o == null && re(c) ? s[r] = F({}, c, e, i) : o == null && ie(c) ? s[r] = pt(c) : (o === void 0 || c !== void 0) && (s[r] = c);
    }
    return s;
}
function ae(s, ...t) {
    return ne(s, ...t, Rt);
}
var ce = Object.defineProperty, oe = Object.defineProperties, he = Object.getOwnPropertyDescriptors, ut = Object.getOwnPropertySymbols, pe = Object.prototype.hasOwnProperty, de = Object.prototype.propertyIsEnumerable, lt = (s, t, e)=>t in s ? ce(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, L = (s, t)=>{
    for(var e in t || (t = {}))pe.call(t, e) && lt(s, e, t[e]);
    if (ut) for (var e of ut(t))de.call(t, e) && lt(s, e, t[e]);
    return s;
}, ue = (s, t)=>oe(s, he(t));
function d(s, t, e) {
    var i;
    const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseChainId"])(s);
    return ((i = t.rpcMap) == null ? void 0 : i[n.reference]) || `${st}?chainId=${n.namespace}:${n.reference}&projectId=${e}`;
}
function b(s) {
    return s.includes(":") ? s.split(":")[1] : s;
}
function ft(s) {
    return s.map((t)=>`${t.split(":")[0]}:${t.split(":")[1]}`);
}
function le(s, t) {
    const e = Object.keys(t.namespaces).filter((n)=>n.includes(s));
    if (!e.length) return [];
    const i = [];
    return e.forEach((n)=>{
        const a = t.namespaces[n].accounts;
        i.push(...a);
    }), i;
}
function M(s = {}, t = {}) {
    const e = mt(s), i = mt(t);
    return ae(e, i);
}
function mt(s) {
    var t, e, i, n, a;
    const r = {};
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidObject"])(s)) return r;
    for (const [c, o] of Object.entries(s)){
        const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCaipNamespace"])(c) ? [
            c
        ] : o.chains, w = o.methods || [], v = o.events || [], P = o.rpcMap || {}, p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(c);
        r[p] = ue(L(L({}, r[p]), o), {
            chains: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeArrays"])(m, (t = r[p]) == null ? void 0 : t.chains),
            methods: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeArrays"])(w, (e = r[p]) == null ? void 0 : e.methods),
            events: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeArrays"])(v, (i = r[p]) == null ? void 0 : i.events)
        }), ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidObject"])(P) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidObject"])(((n = r[p]) == null ? void 0 : n.rpcMap) || {})) && (r[p].rpcMap = L(L({}, P), (a = r[p]) == null ? void 0 : a.rpcMap));
    }
    return r;
}
function vt(s) {
    return s.includes(":") ? s.split(":")[2] : s;
}
function gt(s) {
    const t = {};
    for (const [e, i] of Object.entries(s)){
        const n = i.methods || [], a = i.events || [], r = i.accounts || [], c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCaipNamespace"])(e) ? [
            e
        ] : i.chains ? i.chains : ft(i.accounts);
        t[e] = {
            chains: c,
            methods: n,
            events: a,
            accounts: r
        };
    }
    return t;
}
function K(s) {
    return typeof s == "number" ? s : s.includes("0x") ? parseInt(s, 16) : (s = s.includes(":") ? s.split(":")[1] : s, isNaN(Number(s)) ? s : Number(s));
}
const Pt = {}, h = (s)=>Pt[s], V = (s, t)=>{
    Pt[s] = t;
};
var fe = Object.defineProperty, me = (s, t, e)=>t in s ? fe(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, O = (s, t, e)=>me(s, typeof t != "symbol" ? t + "" : t, e);
class ve {
    constructor(t){
        O(this, "name", "polkadot"), O(this, "client"), O(this, "httpProviders"), O(this, "events"), O(this, "namespace"), O(this, "chainId"), this.namespace = t.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(t) {
        this.namespace = Object.assign(this.namespace, t);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const t = this.namespace.chains[0];
        if (!t) throw new Error("ChainId not found");
        return t.split(":")[1];
    }
    request(t) {
        return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
    }
    setDefaultChain(t, e) {
        this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
    }
    getAccounts() {
        const t = this.namespace.accounts;
        return t ? t.filter((e)=>e.split(":")[1] === this.chainId.toString()).map((e)=>e.split(":")[2]) || [] : [];
    }
    createHttpProviders() {
        const t = {};
        return this.namespace.chains.forEach((e)=>{
            var i;
            const n = b(e);
            t[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[e]);
        }), t;
    }
    getHttpProvider() {
        const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
        if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
        return e;
    }
    setHttpProvider(t, e) {
        const i = this.createHttpProvider(t, e);
        i && (this.httpProviders[t] = i);
    }
    createHttpProvider(t, e) {
        const i = e || d(t, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var ge = Object.defineProperty, Pe = Object.defineProperties, we = Object.getOwnPropertyDescriptors, wt = Object.getOwnPropertySymbols, ye = Object.prototype.hasOwnProperty, be = Object.prototype.propertyIsEnumerable, X = (s, t, e)=>t in s ? ge(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, yt = (s, t)=>{
    for(var e in t || (t = {}))ye.call(t, e) && X(s, e, t[e]);
    if (wt) for (var e of wt(t))be.call(t, e) && X(s, e, t[e]);
    return s;
}, bt = (s, t)=>Pe(s, we(t)), A = (s, t, e)=>X(s, typeof t != "symbol" ? t + "" : t, e);
class Ie {
    constructor(t){
        A(this, "name", "eip155"), A(this, "client"), A(this, "chainId"), A(this, "namespace"), A(this, "httpProviders"), A(this, "events"), this.namespace = t.namespace, this.events = h("events"), this.client = h("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
    }
    async request(t) {
        switch(t.request.method){
            case "eth_requestAccounts":
                return this.getAccounts();
            case "eth_accounts":
                return this.getAccounts();
            case "wallet_switchEthereumChain":
                return await this.handleSwitchChain(t);
            case "eth_chainId":
                return parseInt(this.getDefaultChain());
            case "wallet_getCapabilities":
                return await this.getCapabilities(t);
            case "wallet_getCallsStatus":
                return await this.getCallStatus(t);
        }
        return this.namespace.methods.includes(t.request.method) ? await this.client.request(t) : this.getHttpProvider().request(t.request);
    }
    updateNamespace(t) {
        this.namespace = Object.assign(this.namespace, t);
    }
    setDefaultChain(t, e) {
        this.httpProviders[t] || this.setHttpProvider(parseInt(t), e), this.chainId = parseInt(t), this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId.toString();
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const t = this.namespace.chains[0];
        if (!t) throw new Error("ChainId not found");
        return t.split(":")[1];
    }
    createHttpProvider(t, e) {
        const i = e || d(`${this.name}:${t}`, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HttpConnection"](i, h("disableProviderPing")));
    }
    setHttpProvider(t, e) {
        const i = this.createHttpProvider(t, e);
        i && (this.httpProviders[t] = i);
    }
    createHttpProviders() {
        const t = {};
        return this.namespace.chains.forEach((e)=>{
            var i;
            const n = parseInt(b(e));
            t[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[e]);
        }), t;
    }
    getAccounts() {
        const t = this.namespace.accounts;
        return t ? [
            ...new Set(t.filter((e)=>e.split(":")[1] === this.chainId.toString()).map((e)=>e.split(":")[2]))
        ] : [];
    }
    getHttpProvider() {
        const t = this.chainId, e = this.httpProviders[t];
        if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
        return e;
    }
    async handleSwitchChain(t) {
        var e, i;
        let n = t.request.params ? (e = t.request.params[0]) == null ? void 0 : e.chainId : "0x0";
        n = n.startsWith("0x") ? n : `0x${n}`;
        const a = parseInt(n, 16);
        if (this.isChainApproved(a)) this.setDefaultChain(`${a}`);
        else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({
            topic: t.topic,
            request: {
                method: t.request.method,
                params: [
                    {
                        chainId: n
                    }
                ]
            },
            chainId: (i = this.namespace.chains) == null ? void 0 : i[0]
        }), this.setDefaultChain(`${a}`);
        else throw new Error(`Failed to switch to chain 'eip155:${a}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
        return null;
    }
    isChainApproved(t) {
        return this.namespace.chains.includes(`${this.name}:${t}`);
    }
    async getCapabilities(t) {
        var e, i, n, a, r;
        const c = (i = (e = t.request) == null ? void 0 : e.params) == null ? void 0 : i[0], o = ((a = (n = t.request) == null ? void 0 : n.params) == null ? void 0 : a[1]) || [], m = `${c}${o.join(",")}`;
        if (!c) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
        const w = this.client.session.get(t.topic), v = ((r = w?.sessionProperties) == null ? void 0 : r.capabilities) || {};
        if (v != null && v[m]) return v?.[m];
        const P = await this.client.request(t);
        try {
            await this.client.session.update(t.topic, {
                sessionProperties: bt(yt({}, w.sessionProperties || {}), {
                    capabilities: bt(yt({}, v || {}), {
                        [m]: P
                    })
                })
            });
        } catch (p) {
            console.warn("Failed to update session with capabilities", p);
        }
        return P;
    }
    async getCallStatus(t) {
        var e, i;
        const n = this.client.session.get(t.topic), a = (e = n.sessionProperties) == null ? void 0 : e.bundler_name;
        if (a) {
            const c = this.getBundlerUrl(t.chainId, a);
            try {
                return await this.getUserOperationReceipt(c, t);
            } catch (o) {
                console.warn("Failed to fetch call status from bundler", o, c);
            }
        }
        const r = (i = n.sessionProperties) == null ? void 0 : i.bundler_url;
        if (r) try {
            return await this.getUserOperationReceipt(r, t);
        } catch (c) {
            console.warn("Failed to fetch call status from custom bundler", c, r);
        }
        if (this.namespace.methods.includes(t.request.method)) return await this.client.request(t);
        throw new Error("Fetching call status not approved by the wallet.");
    }
    async getUserOperationReceipt(t, e) {
        var i;
        const n = new URL(t), a = await fetch(n, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("eth_getUserOperationReceipt", [
                (i = e.request.params) == null ? void 0 : i[0]
            ]))
        });
        if (!a.ok) throw new Error(`Failed to fetch user operation receipt - ${a.status}`);
        return await a.json();
    }
    getBundlerUrl(t, e) {
        return `${jt}?projectId=${this.client.core.projectId}&chainId=${t}&bundler=${e}`;
    }
}
var $e = Object.defineProperty, Oe = (s, t, e)=>t in s ? $e(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, C = (s, t, e)=>Oe(s, typeof t != "symbol" ? t + "" : t, e);
class Ae {
    constructor(t){
        C(this, "name", "solana"), C(this, "client"), C(this, "httpProviders"), C(this, "events"), C(this, "namespace"), C(this, "chainId"), this.namespace = t.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(t) {
        this.namespace = Object.assign(this.namespace, t);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(t) {
        return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
    }
    setDefaultChain(t, e) {
        this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const t = this.namespace.chains[0];
        if (!t) throw new Error("ChainId not found");
        return t.split(":")[1];
    }
    getAccounts() {
        const t = this.namespace.accounts;
        return t ? [
            ...new Set(t.filter((e)=>e.split(":")[1] === this.chainId.toString()).map((e)=>e.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const t = {};
        return this.namespace.chains.forEach((e)=>{
            var i;
            const n = b(e);
            t[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[e]);
        }), t;
    }
    getHttpProvider() {
        const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
        if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
        return e;
    }
    setHttpProvider(t, e) {
        const i = this.createHttpProvider(t, e);
        i && (this.httpProviders[t] = i);
    }
    createHttpProvider(t, e) {
        const i = e || d(t, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var Ce = Object.defineProperty, He = (s, t, e)=>t in s ? Ce(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, H = (s, t, e)=>He(s, typeof t != "symbol" ? t + "" : t, e);
class Ee {
    constructor(t){
        H(this, "name", "cosmos"), H(this, "client"), H(this, "httpProviders"), H(this, "events"), H(this, "namespace"), H(this, "chainId"), this.namespace = t.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(t) {
        this.namespace = Object.assign(this.namespace, t);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const t = this.namespace.chains[0];
        if (!t) throw new Error("ChainId not found");
        return t.split(":")[1];
    }
    request(t) {
        return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
    }
    setDefaultChain(t, e) {
        this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
        const t = this.namespace.accounts;
        return t ? [
            ...new Set(t.filter((e)=>e.split(":")[1] === this.chainId.toString()).map((e)=>e.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const t = {};
        return this.namespace.chains.forEach((e)=>{
            var i;
            const n = b(e);
            t[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[e]);
        }), t;
    }
    getHttpProvider() {
        const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
        if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
        return e;
    }
    setHttpProvider(t, e) {
        const i = this.createHttpProvider(t, e);
        i && (this.httpProviders[t] = i);
    }
    createHttpProvider(t, e) {
        const i = e || d(t, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var Ne = Object.defineProperty, Se = (s, t, e)=>t in s ? Ne(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, E = (s, t, e)=>Se(s, typeof t != "symbol" ? t + "" : t, e);
class De {
    constructor(t){
        E(this, "name", "algorand"), E(this, "client"), E(this, "httpProviders"), E(this, "events"), E(this, "namespace"), E(this, "chainId"), this.namespace = t.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(t) {
        this.namespace = Object.assign(this.namespace, t);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(t) {
        return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
    }
    setDefaultChain(t, e) {
        if (!this.httpProviders[t]) {
            const i = e || d(`${this.name}:${t}`, this.namespace, this.client.core.projectId);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            this.setHttpProvider(t, i);
        }
        this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const t = this.namespace.chains[0];
        if (!t) throw new Error("ChainId not found");
        return t.split(":")[1];
    }
    getAccounts() {
        const t = this.namespace.accounts;
        return t ? [
            ...new Set(t.filter((e)=>e.split(":")[1] === this.chainId.toString()).map((e)=>e.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const t = {};
        return this.namespace.chains.forEach((e)=>{
            var i;
            t[e] = this.createHttpProvider(e, (i = this.namespace.rpcMap) == null ? void 0 : i[e]);
        }), t;
    }
    getHttpProvider() {
        const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
        if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
        return e;
    }
    setHttpProvider(t, e) {
        const i = this.createHttpProvider(t, e);
        i && (this.httpProviders[t] = i);
    }
    createHttpProvider(t, e) {
        const i = e || d(t, this.namespace, this.client.core.projectId);
        return typeof i > "u" ? void 0 : new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var qe = Object.defineProperty, je = (s, t, e)=>t in s ? qe(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, N = (s, t, e)=>je(s, typeof t != "symbol" ? t + "" : t, e);
class Re {
    constructor(t){
        N(this, "name", "cip34"), N(this, "client"), N(this, "httpProviders"), N(this, "events"), N(this, "namespace"), N(this, "chainId"), this.namespace = t.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(t) {
        this.namespace = Object.assign(this.namespace, t);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const t = this.namespace.chains[0];
        if (!t) throw new Error("ChainId not found");
        return t.split(":")[1];
    }
    request(t) {
        return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
    }
    setDefaultChain(t, e) {
        this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
        const t = this.namespace.accounts;
        return t ? [
            ...new Set(t.filter((e)=>e.split(":")[1] === this.chainId.toString()).map((e)=>e.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const t = {};
        return this.namespace.chains.forEach((e)=>{
            const i = this.getCardanoRPCUrl(e), n = b(e);
            t[n] = this.createHttpProvider(n, i);
        }), t;
    }
    getHttpProvider() {
        const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
        if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
        return e;
    }
    getCardanoRPCUrl(t) {
        const e = this.namespace.rpcMap;
        if (e) return e[t];
    }
    setHttpProvider(t, e) {
        const i = this.createHttpProvider(t, e);
        i && (this.httpProviders[t] = i);
    }
    createHttpProvider(t, e) {
        const i = e || this.getCardanoRPCUrl(t);
        if (!i) throw new Error(`No RPC url provided for chainId: ${t}`);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var _e = Object.defineProperty, Ue = (s, t, e)=>t in s ? _e(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, S = (s, t, e)=>Ue(s, typeof t != "symbol" ? t + "" : t, e);
class Fe {
    constructor(t){
        S(this, "name", "elrond"), S(this, "client"), S(this, "httpProviders"), S(this, "events"), S(this, "namespace"), S(this, "chainId"), this.namespace = t.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(t) {
        this.namespace = Object.assign(this.namespace, t);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(t) {
        return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
    }
    setDefaultChain(t, e) {
        this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const t = this.namespace.chains[0];
        if (!t) throw new Error("ChainId not found");
        return t.split(":")[1];
    }
    getAccounts() {
        const t = this.namespace.accounts;
        return t ? [
            ...new Set(t.filter((e)=>e.split(":")[1] === this.chainId.toString()).map((e)=>e.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const t = {};
        return this.namespace.chains.forEach((e)=>{
            var i;
            const n = b(e);
            t[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[e]);
        }), t;
    }
    getHttpProvider() {
        const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
        if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
        return e;
    }
    setHttpProvider(t, e) {
        const i = this.createHttpProvider(t, e);
        i && (this.httpProviders[t] = i);
    }
    createHttpProvider(t, e) {
        const i = e || d(t, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var Le = Object.defineProperty, Me = (s, t, e)=>t in s ? Le(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, D = (s, t, e)=>Me(s, typeof t != "symbol" ? t + "" : t, e);
class xe {
    constructor(t){
        D(this, "name", "multiversx"), D(this, "client"), D(this, "httpProviders"), D(this, "events"), D(this, "namespace"), D(this, "chainId"), this.namespace = t.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(t) {
        this.namespace = Object.assign(this.namespace, t);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(t) {
        return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
    }
    setDefaultChain(t, e) {
        this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const t = this.namespace.chains[0];
        if (!t) throw new Error("ChainId not found");
        return t.split(":")[1];
    }
    getAccounts() {
        const t = this.namespace.accounts;
        return t ? [
            ...new Set(t.filter((e)=>e.split(":")[1] === this.chainId.toString()).map((e)=>e.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const t = {};
        return this.namespace.chains.forEach((e)=>{
            var i;
            const n = b(e);
            t[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[e]);
        }), t;
    }
    getHttpProvider() {
        const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
        if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
        return e;
    }
    setHttpProvider(t, e) {
        const i = this.createHttpProvider(t, e);
        i && (this.httpProviders[t] = i);
    }
    createHttpProvider(t, e) {
        const i = e || d(t, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var Be = Object.defineProperty, Ge = (s, t, e)=>t in s ? Be(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, q = (s, t, e)=>Ge(s, typeof t != "symbol" ? t + "" : t, e);
class Je {
    constructor(t){
        q(this, "name", "near"), q(this, "client"), q(this, "httpProviders"), q(this, "events"), q(this, "namespace"), q(this, "chainId"), this.namespace = t.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(t) {
        this.namespace = Object.assign(this.namespace, t);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const t = this.namespace.chains[0];
        if (!t) throw new Error("ChainId not found");
        return t.split(":")[1];
    }
    request(t) {
        return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
    }
    setDefaultChain(t, e) {
        if (this.chainId = t, !this.httpProviders[t]) {
            const i = e || d(`${this.name}:${t}`, this.namespace);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            this.setHttpProvider(t, i);
        }
        this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
        const t = this.namespace.accounts;
        return t ? t.filter((e)=>e.split(":")[1] === this.chainId.toString()).map((e)=>e.split(":")[2]) || [] : [];
    }
    createHttpProviders() {
        const t = {};
        return this.namespace.chains.forEach((e)=>{
            var i;
            t[e] = this.createHttpProvider(e, (i = this.namespace.rpcMap) == null ? void 0 : i[e]);
        }), t;
    }
    getHttpProvider() {
        const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
        if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
        return e;
    }
    setHttpProvider(t, e) {
        const i = this.createHttpProvider(t, e);
        i && (this.httpProviders[t] = i);
    }
    createHttpProvider(t, e) {
        const i = e || d(t, this.namespace);
        return typeof i > "u" ? void 0 : new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var ze = Object.defineProperty, ke = (s, t, e)=>t in s ? ze(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, j = (s, t, e)=>ke(s, typeof t != "symbol" ? t + "" : t, e);
class We {
    constructor(t){
        j(this, "name", "tezos"), j(this, "client"), j(this, "httpProviders"), j(this, "events"), j(this, "namespace"), j(this, "chainId"), this.namespace = t.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(t) {
        this.namespace = Object.assign(this.namespace, t);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const t = this.namespace.chains[0];
        if (!t) throw new Error("ChainId not found");
        return t.split(":")[1];
    }
    request(t) {
        return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
    }
    setDefaultChain(t, e) {
        if (this.chainId = t, !this.httpProviders[t]) {
            const i = e || d(`${this.name}:${t}`, this.namespace);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            this.setHttpProvider(t, i);
        }
        this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
        const t = this.namespace.accounts;
        return t ? t.filter((e)=>e.split(":")[1] === this.chainId.toString()).map((e)=>e.split(":")[2]) || [] : [];
    }
    createHttpProviders() {
        const t = {};
        return this.namespace.chains.forEach((e)=>{
            t[e] = this.createHttpProvider(e);
        }), t;
    }
    getHttpProvider() {
        const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
        if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
        return e;
    }
    setHttpProvider(t, e) {
        const i = this.createHttpProvider(t, e);
        i && (this.httpProviders[t] = i);
    }
    createHttpProvider(t, e) {
        const i = e || d(t, this.namespace);
        return typeof i > "u" ? void 0 : new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i));
    }
}
var Ke = Object.defineProperty, Ve = (s, t, e)=>t in s ? Ke(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, R = (s, t, e)=>Ve(s, typeof t != "symbol" ? t + "" : t, e);
class Xe {
    constructor(t){
        R(this, "name", I), R(this, "client"), R(this, "httpProviders"), R(this, "events"), R(this, "namespace"), R(this, "chainId"), this.namespace = t.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(t) {
        this.namespace.chains = [
            ...new Set((this.namespace.chains || []).concat(t.chains || []))
        ], this.namespace.accounts = [
            ...new Set((this.namespace.accounts || []).concat(t.accounts || []))
        ], this.namespace.methods = [
            ...new Set((this.namespace.methods || []).concat(t.methods || []))
        ], this.namespace.events = [
            ...new Set((this.namespace.events || []).concat(t.events || []))
        ], this.httpProviders = this.createHttpProviders();
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(t) {
        return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider(t.chainId).request(t.request);
    }
    setDefaultChain(t, e) {
        this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const t = this.namespace.chains[0];
        if (!t) throw new Error("ChainId not found");
        return t.split(":")[1];
    }
    getAccounts() {
        const t = this.namespace.accounts;
        return t ? [
            ...new Set(t.filter((e)=>e.split(":")[1] === this.chainId.toString()).map((e)=>e.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        var t, e;
        const i = {};
        return (e = (t = this.namespace) == null ? void 0 : t.accounts) == null || e.forEach((n)=>{
            const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseChainId"])(n);
            i[`${a.namespace}:${a.reference}`] = this.createHttpProvider(n);
        }), i;
    }
    getHttpProvider(t) {
        const e = this.httpProviders[t];
        if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
        return e;
    }
    setHttpProvider(t, e) {
        const i = this.createHttpProvider(t, e);
        i && (this.httpProviders[t] = i);
    }
    createHttpProvider(t, e) {
        const i = e || d(t, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var Ye = Object.defineProperty, Qe = Object.defineProperties, Ze = Object.getOwnPropertyDescriptors, It = Object.getOwnPropertySymbols, Te = Object.prototype.hasOwnProperty, ts = Object.prototype.propertyIsEnumerable, Y = (s, t, e)=>t in s ? Ye(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, x = (s, t)=>{
    for(var e in t || (t = {}))Te.call(t, e) && Y(s, e, t[e]);
    if (It) for (var e of It(t))ts.call(t, e) && Y(s, e, t[e]);
    return s;
}, Q = (s, t)=>Qe(s, Ze(t)), l = (s, t, e)=>Y(s, typeof t != "symbol" ? t + "" : t, e);
class B {
    constructor(t){
        l(this, "client"), l(this, "namespaces"), l(this, "optionalNamespaces"), l(this, "sessionProperties"), l(this, "scopedProperties"), l(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]), l(this, "rpcProviders", {}), l(this, "session"), l(this, "providerOpts"), l(this, "logger"), l(this, "uri"), l(this, "disableProviderPing", !1), this.providerOpts = t, this.logger = typeof t?.logger < "u" && typeof t?.logger != "string" ? t.logger : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pino$3e$__["pino"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultLoggerOptions"])({
            level: t?.logger || et
        })), this.disableProviderPing = t?.disableProviderPing || !1;
    }
    static async init(t) {
        const e = new B(t);
        return await e.initialize(), e;
    }
    async request(t, e, i) {
        const [n, a] = this.validateChain(e);
        if (!this.session) throw new Error("Please call connect() before request()");
        return await this.getProvider(n).request({
            request: x({}, t),
            chainId: `${n}:${a}`,
            topic: this.session.topic,
            expiry: i
        });
    }
    sendAsync(t, e, i, n) {
        const a = new Date().getTime();
        this.request(t, i, n).then((r)=>e(null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcResult"])(a, r))).catch((r)=>e(r, void 0));
    }
    async enable() {
        if (!this.client) throw new Error("Sign Client not initialized");
        return this.session || await this.connect({
            namespaces: this.namespaces,
            optionalNamespaces: this.optionalNamespaces,
            sessionProperties: this.sessionProperties,
            scopedProperties: this.scopedProperties
        }), await this.requestAccounts();
    }
    async disconnect() {
        var t;
        if (!this.session) throw new Error("Please call connect() before enable()");
        await this.client.disconnect({
            topic: (t = this.session) == null ? void 0 : t.topic,
            reason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")
        }), await this.cleanup();
    }
    async connect(t) {
        if (!this.client) throw new Error("Sign Client not initialized");
        if (this.setNamespaces(t), await this.cleanupPendingPairings(), !t.skipPairing) return await this.pair(t.pairingTopic);
    }
    async authenticate(t, e) {
        if (!this.client) throw new Error("Sign Client not initialized");
        this.setNamespaces(t), await this.cleanupPendingPairings();
        const { uri: i, response: n } = await this.client.authenticate(t, e);
        i && (this.uri = i, this.events.emit("display_uri", i));
        const a = await n();
        if (this.session = a.session, this.session) {
            const r = gt(this.session.namespaces);
            this.namespaces = M(this.namespaces, r), await this.persist("namespaces", this.namespaces), this.onConnect();
        }
        return a;
    }
    on(t, e) {
        this.events.on(t, e);
    }
    once(t, e) {
        this.events.once(t, e);
    }
    removeListener(t, e) {
        this.events.removeListener(t, e);
    }
    off(t, e) {
        this.events.off(t, e);
    }
    get isWalletConnect() {
        return !0;
    }
    async pair(t) {
        const { uri: e, approval: i } = await this.client.connect({
            pairingTopic: t,
            requiredNamespaces: this.namespaces,
            optionalNamespaces: this.optionalNamespaces,
            sessionProperties: this.sessionProperties,
            scopedProperties: this.scopedProperties
        });
        e && (this.uri = e, this.events.emit("display_uri", e));
        const n = await i();
        this.session = n;
        const a = gt(n.namespaces);
        return this.namespaces = M(this.namespaces, a), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
    }
    setDefaultChain(t, e) {
        try {
            if (!this.session) return;
            const [i, n] = this.validateChain(t), a = this.getProvider(i);
            a.name === I ? a.setDefaultChain(`${i}:${n}`, e) : a.setDefaultChain(n, e);
        } catch (i) {
            if (!/Please call connect/.test(i.message)) throw i;
        }
    }
    async cleanupPendingPairings(t = {}) {
        this.logger.info("Cleaning up inactive pairings...");
        const e = this.client.pairing.getAll();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidArray"])(e)) {
            for (const i of e)t.deletePairings ? this.client.core.expirer.set(i.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(i.topic);
            this.logger.info(`Inactive pairings cleared: ${e.length}`);
        }
    }
    abortPairingAttempt() {
        this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
    }
    async checkStorage() {
        this.namespaces = await this.getFromStore("namespaces") || {}, this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.session && this.createProviders();
    }
    async initialize() {
        this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
    }
    async createClient() {
        var t, e;
        if (this.client = this.providerOpts.client || await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$sign$2d$client$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].init({
            core: this.providerOpts.core,
            logger: this.providerOpts.logger || et,
            relayUrl: this.providerOpts.relayUrl || St,
            projectId: this.providerOpts.projectId,
            metadata: this.providerOpts.metadata,
            storageOptions: this.providerOpts.storageOptions,
            storage: this.providerOpts.storage,
            name: this.providerOpts.name,
            customStoragePrefix: this.providerOpts.customStoragePrefix,
            telemetryEnabled: this.providerOpts.telemetryEnabled
        }), this.providerOpts.session) try {
            this.session = this.client.session.get(this.providerOpts.session.topic);
        } catch (i) {
            throw this.logger.error("Failed to get session", i), new Error(`The provided session: ${(e = (t = this.providerOpts) == null ? void 0 : t.session) == null ? void 0 : e.topic} doesn't exist in the Sign client`);
        }
        else {
            const i = this.client.session.getAll();
            this.session = i[0];
        }
        this.logger.trace("SignClient Initialized");
    }
    createProviders() {
        if (!this.client) throw new Error("Sign Client not initialized");
        if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
        const t = [
            ...new Set(Object.keys(this.session.namespaces).map((e)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(e)))
        ];
        V("client", this.client), V("events", this.events), V("disableProviderPing", this.disableProviderPing), t.forEach((e)=>{
            if (!this.session) return;
            const i = le(e, this.session), n = ft(i), a = M(this.namespaces, this.optionalNamespaces), r = Q(x({}, a[e]), {
                accounts: i,
                chains: n
            });
            switch(e){
                case "eip155":
                    this.rpcProviders[e] = new Ie({
                        namespace: r
                    });
                    break;
                case "algorand":
                    this.rpcProviders[e] = new De({
                        namespace: r
                    });
                    break;
                case "solana":
                    this.rpcProviders[e] = new Ae({
                        namespace: r
                    });
                    break;
                case "cosmos":
                    this.rpcProviders[e] = new Ee({
                        namespace: r
                    });
                    break;
                case "polkadot":
                    this.rpcProviders[e] = new ve({
                        namespace: r
                    });
                    break;
                case "cip34":
                    this.rpcProviders[e] = new Re({
                        namespace: r
                    });
                    break;
                case "elrond":
                    this.rpcProviders[e] = new Fe({
                        namespace: r
                    });
                    break;
                case "multiversx":
                    this.rpcProviders[e] = new xe({
                        namespace: r
                    });
                    break;
                case "near":
                    this.rpcProviders[e] = new Je({
                        namespace: r
                    });
                    break;
                case "tezos":
                    this.rpcProviders[e] = new We({
                        namespace: r
                    });
                    break;
                default:
                    this.rpcProviders[I] ? this.rpcProviders[I].updateNamespace(r) : this.rpcProviders[I] = new Xe({
                        namespace: r
                    });
            }
        });
    }
    registerEventListeners() {
        if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
        this.client.on("session_ping", (t)=>{
            var e;
            const { topic: i } = t;
            i === ((e = this.session) == null ? void 0 : e.topic) && this.events.emit("session_ping", t);
        }), this.client.on("session_event", (t)=>{
            var e;
            const { params: i, topic: n } = t;
            if (n !== ((e = this.session) == null ? void 0 : e.topic)) return;
            const { event: a } = i;
            if (a.name === "accountsChanged") {
                const r = a.data;
                r && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidArray"])(r) && this.events.emit("accountsChanged", r.map(vt));
            } else if (a.name === "chainChanged") {
                const r = i.chainId, c = i.event.data, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(r), m = K(r) !== K(c) ? `${o}:${K(c)}` : r;
                this.onChainChanged(m);
            } else this.events.emit(a.name, a.data);
            this.events.emit("session_event", t);
        }), this.client.on("session_update", ({ topic: t, params: e })=>{
            var i, n;
            if (t !== ((i = this.session) == null ? void 0 : i.topic)) return;
            const { namespaces: a } = e, r = (n = this.client) == null ? void 0 : n.session.get(t);
            this.session = Q(x({}, r), {
                namespaces: a
            }), this.onSessionUpdate(), this.events.emit("session_update", {
                topic: t,
                params: e
            });
        }), this.client.on("session_delete", async (t)=>{
            var e;
            t.topic === ((e = this.session) == null ? void 0 : e.topic) && (await this.cleanup(), this.events.emit("session_delete", t), this.events.emit("disconnect", Q(x({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")), {
                data: t.topic
            })));
        }), this.on(u.DEFAULT_CHAIN_CHANGED, (t)=>{
            this.onChainChanged(t, !0);
        });
    }
    getProvider(t) {
        return this.rpcProviders[t] || this.rpcProviders[I];
    }
    onSessionUpdate() {
        Object.keys(this.rpcProviders).forEach((t)=>{
            var e;
            this.getProvider(t).updateNamespace((e = this.session) == null ? void 0 : e.namespaces[t]);
        });
    }
    setNamespaces(t) {
        const { namespaces: e = {}, optionalNamespaces: i = {}, sessionProperties: n, scopedProperties: a } = t;
        this.optionalNamespaces = M(e, i), this.sessionProperties = n, this.scopedProperties = a;
    }
    validateChain(t) {
        const [e, i] = t?.split(":") || [
            "",
            ""
        ];
        if (!this.namespaces || !Object.keys(this.namespaces).length) return [
            e,
            i
        ];
        if (e && !Object.keys(this.namespaces || {}).map((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(r)).includes(e)) throw new Error(`Namespace '${e}' is not configured. Please call connect() first with namespace config.`);
        if (e && i) return [
            e,
            i
        ];
        const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(Object.keys(this.namespaces)[0]), a = this.rpcProviders[n].getDefaultChain();
        return [
            n,
            a
        ];
    }
    async requestAccounts() {
        const [t] = this.validateChain();
        return await this.getProvider(t).requestAccounts();
    }
    async onChainChanged(t, e = !1) {
        if (!this.namespaces) return;
        const [i, n] = this.validateChain(t);
        if (!n) return;
        this.updateNamespaceChain(i, n), this.events.emit("chainChanged", n);
        const a = this.getProvider(i).getDefaultChain();
        e || this.getProvider(i).setDefaultChain(n), this.emitAccountsChangedOnChainChange({
            namespace: i,
            previousChainId: a,
            newChainId: t
        }), await this.persist("namespaces", this.namespaces);
    }
    emitAccountsChangedOnChainChange({ namespace: t, previousChainId: e, newChainId: i }) {
        var n, a;
        try {
            if (e === i) return;
            const r = (a = (n = this.session) == null ? void 0 : n.namespaces[t]) == null ? void 0 : a.accounts;
            if (!r) return;
            const c = r.filter((o)=>o.includes(`${i}:`)).map(vt);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidArray"])(c)) return;
            this.events.emit("accountsChanged", c);
        } catch (r) {
            this.logger.warn("Failed to emit accountsChanged on chain change", r);
        }
    }
    updateNamespaceChain(t, e) {
        if (!this.namespaces) return;
        const i = this.namespaces[t] ? t : `${t}:${e}`, n = {
            chains: [],
            methods: [],
            events: [],
            defaultChain: e
        };
        this.namespaces[i] ? this.namespaces[i] && (this.namespaces[i].defaultChain = e) : this.namespaces[i] = n;
    }
    onConnect() {
        this.createProviders(), this.events.emit("connect", {
            session: this.session
        });
    }
    async cleanup() {
        this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, await this.cleanupPendingPairings({
            deletePairings: !0
        }), await this.cleanupStorage();
    }
    async persist(t, e) {
        var i;
        const n = ((i = this.session) == null ? void 0 : i.topic) || "";
        await this.client.core.storage.setItem(`${U}/${t}${n}`, e);
    }
    async getFromStore(t) {
        var e;
        const i = ((e = this.session) == null ? void 0 : e.topic) || "";
        return await this.client.core.storage.getItem(`${U}/${t}${i}`);
    }
    async deleteFromStore(t) {
        var e;
        const i = ((e = this.session) == null ? void 0 : e.topic) || "";
        await this.client.core.storage.removeItem(`${U}/${t}${i}`);
    }
    async cleanupStorage() {
        var t;
        try {
            if (((t = this.client) == null ? void 0 : t.session.length) > 0) return;
            const e = await this.client.core.storage.getKeys();
            for (const i of e)i.startsWith(U) && await this.client.core.storage.removeItem(i);
        } catch (e) {
            this.logger.warn("Failed to cleanup storage", e);
        }
    }
}
const es = B;
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/ethereum-provider/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EthereumProvider",
    ()=>Y,
    "OPTIONAL_EVENTS",
    ()=>P,
    "OPTIONAL_METHODS",
    ()=>A,
    "REQUIRED_EVENTS",
    ()=>C,
    "REQUIRED_METHODS",
    ()=>f,
    "default",
    ()=>b
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/events/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/utils/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$ethereum$2d$provider$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@walletconnect/ethereum-provider/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)");
;
;
;
const $ = "wc", k = "ethereum_provider", q = `${$}@2:${k}:`, U = "https://rpc.walletconnect.org/v1/", f = [
    "eth_sendTransaction",
    "personal_sign"
], A = [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendRawTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "personal_sign",
    "wallet_switchEthereumChain",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_requestPermissions",
    "wallet_registerOnboarding",
    "wallet_watchAsset",
    "wallet_scanQRCode",
    "wallet_sendCalls",
    "wallet_getCapabilities",
    "wallet_getCallsStatus",
    "wallet_showCallsStatus"
], C = [
    "chainChanged",
    "accountsChanged"
], P = [
    "chainChanged",
    "accountsChanged",
    "message",
    "disconnect",
    "connect"
], D = async ()=>{
    const { createAppKit: s } = await __turbopack_context__.A("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@reown/appkit/dist/esm/exports/core.js [app-client] (ecmascript, async loader)");
    return s;
};
var z = Object.defineProperty, L = Object.defineProperties, K = Object.getOwnPropertyDescriptors, M = Object.getOwnPropertySymbols, Q = Object.prototype.hasOwnProperty, V = Object.prototype.propertyIsEnumerable, _ = (s, t, e)=>t in s ? z(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, v = (s, t)=>{
    for(var e in t || (t = {}))Q.call(t, e) && _(s, e, t[e]);
    if (M) for (var e of M(t))V.call(t, e) && _(s, e, t[e]);
    return s;
}, w = (s, t)=>L(s, K(t)), p = (s, t, e)=>_(s, typeof t != "symbol" ? t + "" : t, e);
function I(s) {
    return Number(s[0].split(":")[1]);
}
function E(s) {
    return `0x${s.toString(16)}`;
}
function G(s) {
    const { chains: t, optionalChains: e, methods: n, optionalMethods: i, events: a, optionalEvents: o, rpcMap: u } = s;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidArray"])(t)) throw new Error("Invalid chains");
    const c = {
        chains: t,
        methods: n || f,
        events: a || C,
        rpcMap: v({}, t.length ? {
            [I(t)]: u[I(t)]
        } : {})
    }, l = a?.filter((d)=>!C.includes(d)), r = n?.filter((d)=>!f.includes(d));
    if (!e && !o && !i && !(l != null && l.length) && !(r != null && r.length)) return {
        required: t.length ? c : void 0
    };
    const m = l?.length && r?.length || !e, h = {
        chains: [
            ...new Set(m ? c.chains.concat(e || []) : e)
        ],
        methods: [
            ...new Set(c.methods.concat(i != null && i.length ? i : A))
        ],
        events: [
            ...new Set(c.events.concat(o != null && o.length ? o : P))
        ],
        rpcMap: u
    };
    return {
        required: t.length ? c : void 0,
        optional: e.length ? h : void 0
    };
}
class b {
    constructor(){
        p(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"]), p(this, "namespace", "eip155"), p(this, "accounts", []), p(this, "signer"), p(this, "chainId", 1), p(this, "modal"), p(this, "rpc"), p(this, "STORAGE_KEY", q), p(this, "on", (t, e)=>(this.events.on(t, e), this)), p(this, "once", (t, e)=>(this.events.once(t, e), this)), p(this, "removeListener", (t, e)=>(this.events.removeListener(t, e), this)), p(this, "off", (t, e)=>(this.events.off(t, e), this)), p(this, "parseAccount", (t)=>this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t), this.signer = {}, this.rpc = {};
    }
    static async init(t) {
        const e = new b;
        return await e.initialize(t), e;
    }
    async request(t, e) {
        return await this.signer.request(t, this.formatChainId(this.chainId), e);
    }
    sendAsync(t, e, n) {
        this.signer.sendAsync(t, e, this.formatChainId(this.chainId), n);
    }
    get connected() {
        return this.signer.client ? this.signer.client.core.relayer.connected : !1;
    }
    get connecting() {
        return this.signer.client ? this.signer.client.core.relayer.connecting : !1;
    }
    async enable() {
        return this.session || await this.connect(), await this.request({
            method: "eth_requestAccounts"
        });
    }
    async connect(t) {
        var e;
        if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
        this.loadConnectOpts(t);
        const { required: n, optional: i } = G(this.rpc);
        try {
            const a = await new Promise(async (u, c)=>{
                var l, r;
                this.rpc.showQrModal && ((l = this.modal) == null || l.open(), (r = this.modal) == null || r.subscribeState((h)=>{
                    !h.open && !this.signer.session && (this.signer.abortPairingAttempt(), c(new Error("Connection request reset. Please try again.")));
                }));
                const m = t != null && t.scopedProperties ? {
                    [this.namespace]: t.scopedProperties
                } : void 0;
                await this.signer.connect(w(v({
                    namespaces: v({}, n && {
                        [this.namespace]: n
                    })
                }, i && {
                    optionalNamespaces: {
                        [this.namespace]: i
                    }
                }), {
                    pairingTopic: t?.pairingTopic,
                    scopedProperties: m
                })).then((h)=>{
                    u(h);
                }).catch((h)=>{
                    var d;
                    (d = this.modal) == null || d.showErrorMessage("Unable to connect"), c(new Error(h.message));
                });
            });
            if (!a) return;
            const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccountsFromNamespaces"])(a.namespaces, [
                this.namespace
            ]);
            this.setChainIds(this.rpc.chains.length ? this.rpc.chains : o), this.setAccounts(o), this.events.emit("connect", {
                chainId: E(this.chainId)
            });
        } catch (a) {
            throw this.signer.logger.error(a), a;
        } finally{
            (e = this.modal) == null || e.close();
        }
    }
    async authenticate(t, e) {
        var n;
        if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
        this.loadConnectOpts({
            chains: t?.chains
        });
        try {
            const i = await new Promise(async (o, u)=>{
                var c, l;
                this.rpc.showQrModal && ((c = this.modal) == null || c.open(), (l = this.modal) == null || l.subscribeState((r)=>{
                    !r.open && !this.signer.session && (this.signer.abortPairingAttempt(), u(new Error("Connection request reset. Please try again.")));
                })), await this.signer.authenticate(w(v({}, t), {
                    chains: this.rpc.chains
                }), e).then((r)=>{
                    o(r);
                }).catch((r)=>{
                    var m;
                    (m = this.modal) == null || m.showErrorMessage("Unable to connect"), u(new Error(r.message));
                });
            }), a = i.session;
            if (a) {
                const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccountsFromNamespaces"])(a.namespaces, [
                    this.namespace
                ]);
                this.setChainIds(this.rpc.chains.length ? this.rpc.chains : o), this.setAccounts(o), this.events.emit("connect", {
                    chainId: E(this.chainId)
                });
            }
            return i;
        } catch (i) {
            throw this.signer.logger.error(i), i;
        } finally{
            (n = this.modal) == null || n.close();
        }
    }
    async disconnect() {
        this.session && await this.signer.disconnect(), this.reset();
    }
    get isWalletConnect() {
        return !0;
    }
    get session() {
        return this.signer.session;
    }
    registerEventListeners() {
        this.signer.on("session_event", (t)=>{
            const { params: e } = t, { event: n } = e;
            n.name === "accountsChanged" ? (this.accounts = this.parseAccounts(n.data), this.events.emit("accountsChanged", this.accounts)) : n.name === "chainChanged" ? this.setChainId(this.formatChainId(n.data)) : this.events.emit(n.name, n.data), this.events.emit("session_event", t);
        }), this.signer.on("accountsChanged", (t)=>{
            this.accounts = this.parseAccounts(t), this.events.emit("accountsChanged", this.accounts);
        }), this.signer.on("chainChanged", (t)=>{
            const e = parseInt(t);
            this.chainId = e, this.events.emit("chainChanged", E(this.chainId)), this.persist();
        }), this.signer.on("session_update", (t)=>{
            this.events.emit("session_update", t);
        }), this.signer.on("session_delete", (t)=>{
            this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", w(v({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")), {
                data: t.topic,
                name: "USER_DISCONNECTED"
            }));
        }), this.signer.on("display_uri", (t)=>{
            this.events.emit("display_uri", t);
        });
    }
    switchEthereumChain(t) {
        this.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: t.toString(16)
                }
            ]
        });
    }
    isCompatibleChainId(t) {
        return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : !1;
    }
    formatChainId(t) {
        return `${this.namespace}:${t}`;
    }
    parseChainId(t) {
        return Number(t.split(":")[1]);
    }
    setChainIds(t) {
        const e = t.filter((n)=>this.isCompatibleChainId(n)).map((n)=>this.parseChainId(n));
        e.length && (this.chainId = e[0], this.events.emit("chainChanged", E(this.chainId)), this.persist());
    }
    setChainId(t) {
        if (this.isCompatibleChainId(t)) {
            const e = this.parseChainId(t);
            this.chainId = e, this.switchEthereumChain(e);
        }
    }
    parseAccountId(t) {
        const [e, n, i] = t.split(":");
        return {
            chainId: `${e}:${n}`,
            address: i
        };
    }
    setAccounts(t) {
        this.accounts = t.filter((e)=>this.parseChainId(this.parseAccountId(e).chainId) === this.chainId).map((e)=>this.parseAccountId(e).address), this.events.emit("accountsChanged", this.accounts);
    }
    getRpcConfig(t) {
        var e, n;
        const i = (e = t?.chains) != null ? e : [], a = (n = t?.optionalChains) != null ? n : [], o = i.concat(a);
        if (!o.length) throw new Error("No chains specified in either `chains` or `optionalChains`");
        const u = i.length ? t?.methods || f : [], c = i.length ? t?.events || C : [], l = t?.optionalMethods || [], r = t?.optionalEvents || [], m = t?.rpcMap || this.buildRpcMap(o, t.projectId), h = t?.qrModalOptions || void 0;
        return {
            chains: i?.map((d)=>this.formatChainId(d)),
            optionalChains: a.map((d)=>this.formatChainId(d)),
            methods: u,
            events: c,
            optionalMethods: l,
            optionalEvents: r,
            rpcMap: m,
            showQrModal: !!(t != null && t.showQrModal),
            qrModalOptions: h,
            projectId: t.projectId,
            metadata: t.metadata
        };
    }
    buildRpcMap(t, e) {
        const n = {};
        return t.forEach((i)=>{
            n[i] = this.getRpcUrl(i, e);
        }), n;
    }
    async initialize(t) {
        if (this.rpc = this.getRpcConfig(t), this.chainId = this.rpc.chains.length ? I(this.rpc.chains) : I(this.rpc.optionalChains), this.signer = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$ethereum$2d$provider$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniversalProvider"].init({
            projectId: this.rpc.projectId,
            metadata: this.rpc.metadata,
            disableProviderPing: t.disableProviderPing,
            relayUrl: t.relayUrl,
            storage: t.storage,
            storageOptions: t.storageOptions,
            customStoragePrefix: t.customStoragePrefix,
            telemetryEnabled: t.telemetryEnabled,
            logger: t.logger
        }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
            let e;
            try {
                const n = await D(), { convertWCMToAppKitOptions: i } = await Promise.resolve().then(function() {
                    return nt;
                }), a = i(w(v({}, this.rpc.qrModalOptions), {
                    chains: [
                        ...new Set([
                            ...this.rpc.chains,
                            ...this.rpc.optionalChains
                        ])
                    ],
                    metadata: this.rpc.metadata,
                    projectId: this.rpc.projectId
                }));
                if (!a.networks.length) throw new Error("No networks found for WalletConnect\xB7");
                e = n(w(v({}, a), {
                    universalProvider: this.signer,
                    manualWCControl: !0
                }));
            } catch (n) {
                throw console.warn(n), new Error("To use QR modal, please install @reown/appkit package");
            }
            if (e) try {
                this.modal = e;
            } catch (n) {
                throw this.signer.logger.error(n), new Error("Could not generate WalletConnectModal Instance");
            }
        }
    }
    loadConnectOpts(t) {
        if (!t) return;
        const { chains: e, optionalChains: n, rpcMap: i } = t;
        e && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidArray"])(e) && (this.rpc.chains = e.map((a)=>this.formatChainId(a)), e.forEach((a)=>{
            this.rpc.rpcMap[a] = i?.[a] || this.getRpcUrl(a);
        })), n && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidArray"])(n) && (this.rpc.optionalChains = [], this.rpc.optionalChains = n?.map((a)=>this.formatChainId(a)), n.forEach((a)=>{
            this.rpc.rpcMap[a] = i?.[a] || this.getRpcUrl(a);
        }));
    }
    getRpcUrl(t, e) {
        var n;
        return ((n = this.rpc.rpcMap) == null ? void 0 : n[t]) || `${U}?chainId=eip155:${t}&projectId=${e || this.rpc.projectId}`;
    }
    async loadPersistedSession() {
        if (this.session) try {
            const t = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), e = this.session.namespaces[`${this.namespace}:${t}`] ? this.session.namespaces[`${this.namespace}:${t}`] : this.session.namespaces[this.namespace];
            this.setChainIds(t ? [
                this.formatChainId(t)
            ] : e?.accounts), this.setAccounts(e?.accounts);
        } catch (t) {
            this.signer.logger.error("Failed to load persisted session, clearing state..."), this.signer.logger.error(t), await this.disconnect().catch((e)=>this.signer.logger.warn(e));
        }
    }
    reset() {
        this.chainId = 1, this.accounts = [];
    }
    persist() {
        this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
    }
    parseAccounts(t) {
        return typeof t == "string" || t instanceof String ? [
            this.parseAccount(t)
        ] : t.map((e)=>this.parseAccount(e));
    }
}
const Y = b;
var H = Object.defineProperty, B = Object.defineProperties, F = Object.getOwnPropertyDescriptors, S = Object.getOwnPropertySymbols, X = Object.prototype.hasOwnProperty, J = Object.prototype.propertyIsEnumerable, T = (s, t, e)=>t in s ? H(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, R = (s, t)=>{
    for(var e in t || (t = {}))X.call(t, e) && T(s, e, t[e]);
    if (S) for (var e of S(t))J.call(t, e) && T(s, e, t[e]);
    return s;
}, Z = (s, t)=>B(s, F(t));
function tt(s) {
    if (s) return {
        "--w3m-font-family": s["--wcm-font-family"],
        "--w3m-accent": s["--wcm-accent-color"],
        "--w3m-color-mix": s["--wcm-background-color"],
        "--w3m-z-index": s["--wcm-z-index"] ? Number(s["--wcm-z-index"]) : void 0,
        "--w3m-qr-color": s["--wcm-accent-color"],
        "--w3m-font-size-master": s["--wcm-text-medium-regular-size"],
        "--w3m-border-radius-master": s["--wcm-container-border-radius"],
        "--w3m-color-mix-strength": 0
    };
}
const et = (s)=>{
    const [t, e] = s.split(":");
    return W({
        id: e,
        caipNetworkId: s,
        chainNamespace: t,
        name: "",
        nativeCurrency: {
            name: "",
            symbol: "",
            decimals: 8
        },
        rpcUrls: {
            default: {
                http: [
                    "https://rpc.walletconnect.org/v1"
                ]
            }
        }
    });
};
function st(s) {
    var t, e, n, i, a, o, u;
    const c = (t = s.chains) == null ? void 0 : t.map(et).filter(Boolean);
    if (c.length === 0) throw new Error("At least one chain must be specified");
    const l = c.find((m)=>{
        var h;
        return m.id === ((h = s.defaultChain) == null ? void 0 : h.id);
    }), r = {
        projectId: s.projectId,
        networks: c,
        themeMode: s.themeMode,
        themeVariables: tt(s.themeVariables),
        chainImages: s.chainImages,
        connectorImages: s.walletImages,
        defaultNetwork: l,
        metadata: Z(R({}, s.metadata), {
            name: ((e = s.metadata) == null ? void 0 : e.name) || "WalletConnect",
            description: ((n = s.metadata) == null ? void 0 : n.description) || "Connect to WalletConnect-compatible wallets",
            url: ((i = s.metadata) == null ? void 0 : i.url) || "https://walletconnect.org",
            icons: ((a = s.metadata) == null ? void 0 : a.icons) || [
                "https://walletconnect.org/walletconnect-logo.png"
            ]
        }),
        showWallets: !0,
        featuredWalletIds: s.explorerRecommendedWalletIds === "NONE" ? [] : Array.isArray(s.explorerRecommendedWalletIds) ? s.explorerRecommendedWalletIds : [],
        excludeWalletIds: s.explorerExcludedWalletIds === "ALL" ? [] : Array.isArray(s.explorerExcludedWalletIds) ? s.explorerExcludedWalletIds : [],
        enableEIP6963: !1,
        enableInjected: !1,
        enableCoinbase: !0,
        enableWalletConnect: !0,
        features: {
            email: !1,
            socials: !1
        }
    };
    if ((o = s.mobileWallets) != null && o.length || (u = s.desktopWallets) != null && u.length) {
        const m = [
            ...(s.mobileWallets || []).map((g)=>({
                    id: g.id,
                    name: g.name,
                    links: g.links
                })),
            ...(s.desktopWallets || []).map((g)=>({
                    id: g.id,
                    name: g.name,
                    links: {
                        native: g.links.native,
                        universal: g.links.universal
                    }
                }))
        ], h = [
            ...r.featuredWalletIds || [],
            ...r.excludeWalletIds || []
        ], d = m.filter((g)=>!h.includes(g.id));
        d.length && (r.customWallets = d);
    }
    return r;
}
function W(s) {
    return R({
        formatters: void 0,
        fees: void 0,
        serializers: void 0
    }, s);
}
var nt = Object.freeze({
    __proto__: null,
    convertWCMToAppKitOptions: st,
    defineChain: W
});
;
 //# sourceMappingURL=index.es.js.map
}),
]);

//# sourceMappingURL=d3002_c43bf643._.js.map