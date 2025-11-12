(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/isows/_esm/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getNativeWebSocket",
    ()=>getNativeWebSocket
]);
function getNativeWebSocket() {
    if (typeof WebSocket !== "undefined") return WebSocket;
    if (typeof /*TURBOPACK member replacement*/ __turbopack_context__.g.WebSocket !== "undefined") return /*TURBOPACK member replacement*/ __turbopack_context__.g.WebSocket;
    if (typeof window.WebSocket !== "undefined") return window.WebSocket;
    if (typeof self.WebSocket !== "undefined") return self.WebSocket;
    throw new Error("`WebSocket` is not supported in this environment");
} //# sourceMappingURL=utils.js.map
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/isows/_esm/native.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebSocket",
    ()=>WebSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$isows$2f$_esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/isows/_esm/utils.js [app-client] (ecmascript)");
;
const WebSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$isows$2f$_esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNativeWebSocket"])(); //# sourceMappingURL=native.js.map
}),
]);

//# sourceMappingURL=2ba46_isows__esm_8efcf81a._.js.map