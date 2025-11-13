module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/lib/serverStoragePolyfill.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/serverStoragePolyfill.ts
// Polyfill `localStorage` in the Node.js environment used by Next.js during SSR or
// build steps. Some third-party SDKs expect a Storage-like object to exist even
// when rendering on the server. Next 16 ships with an experimental storage
// implementation, but when it is unavailable (or lacks the full API) we provide
// a lightweight in-memory fallback that satisfies the interface used at runtime.
__turbopack_context__.s([]);
const globalWithStorage = globalThis;
if ("TURBOPACK compile-time truthy", 1) {
    const needsPolyfill = !globalWithStorage.localStorage || typeof globalWithStorage.localStorage.getItem !== "function" || typeof globalWithStorage.localStorage.setItem !== "function";
    if (needsPolyfill) {
        const store = new Map();
        const storage = {
            clear () {
                store.clear();
            },
            getItem (key) {
                return store.has(key) ? store.get(key) : null;
            },
            key (index) {
                return Array.from(store.keys())[index] ?? null;
            },
            removeItem (key) {
                store.delete(key);
            },
            setItem (key, value) {
                store.set(key, String(value));
            }
        };
        Object.defineProperty(storage, "length", {
            get: ()=>store.size
        });
        globalWithStorage.localStorage = storage;
    }
}
;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/lib/rateLimitedFetch.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRateLimitedFetch",
    ()=>createRateLimitedFetch
]);
const ABORT_ERROR_NAME = "AbortError";
function createAbortError() {
    return new DOMException("The operation was aborted.", ABORT_ERROR_NAME);
}
function createRateLimitedFetch({ requestsPerInterval, intervalMs }) {
    const globalFetch = (...args)=>fetch(...args);
    if (!Number.isFinite(requestsPerInterval) || requestsPerInterval <= 0) {
        return globalFetch;
    }
    const effectiveInterval = Math.max(0, intervalMs);
    if (effectiveInterval === 0) {
        return globalFetch;
    }
    const maxRequests = Math.max(1, Math.floor(requestsPerInterval));
    const queue = [];
    const startTimestamps = [];
    let cooldownUntil = 0;
    let activeCount = 0;
    let timer = null;
    const prune = (now)=>{
        while(startTimestamps.length > 0 && now - startTimestamps[0] >= effectiveInterval){
            startTimestamps.shift();
        }
    };
    const schedule = (delay)=>{
        if (timer) return;
        timer = setTimeout(()=>{
            timer = null;
            tryStart();
        }, delay);
    };
    const markCooldown = (ms)=>{
        if (!Number.isFinite(ms) || ms <= 0) return;
        cooldownUntil = Math.max(cooldownUntil, Date.now() + ms);
    };
    const looksLikeRateLimit = (error)=>{
        if (!error) return false;
        if (typeof error === "object") {
            const status = error?.status;
            if (status === 429) return true;
            const message = String(error?.message ?? "").toLowerCase();
            if (message.includes("429") || message.includes("rate limit")) {
                return true;
            }
        } else if (typeof error === "string") {
            const lower = error.toLowerCase();
            if (lower.includes("429") || lower.includes("rate limit")) {
                return true;
            }
        }
        return false;
    };
    const tryStart = ()=>{
        if (queue.length === 0) {
            return;
        }
        const now = Date.now();
        prune(now);
        if (activeCount >= maxRequests) {
            schedule(1);
            return;
        }
        const quotaWait = startTimestamps.length >= maxRequests ? Math.max(0, effectiveInterval - (now - startTimestamps[0])) : 0;
        const cooldownWait = Math.max(0, cooldownUntil - now);
        const wait = Math.max(quotaWait, cooldownWait);
        if (wait > 0) {
            schedule(wait);
            return;
        }
        const job = queue.shift();
        job.cleanup?.();
        if (job.aborted) {
            tryStart();
            return;
        }
        activeCount++;
        const start = Date.now();
        startTimestamps.push(start);
        prune(start);
        Promise.resolve(globalFetch(job.input, job.init)).then((response)=>{
            if (response?.status === 429) {
                markCooldown(effectiveInterval);
            }
            job.resolve(response);
        }).catch((error)=>{
            if (looksLikeRateLimit(error)) {
                markCooldown(effectiveInterval);
            }
            job.reject(error);
        }).finally(()=>{
            activeCount = Math.max(0, activeCount - 1);
            const later = Date.now();
            prune(later);
            tryStart();
        });
        // Attempt to dispatch additional queued requests if capacity allows
        tryStart();
    };
    return function rateLimitedFetch(input, init) {
        return new Promise((resolve, reject)=>{
            const job = {
                input,
                init,
                resolve,
                reject,
                aborted: false
            };
            const signal = init?.signal;
            if (signal) {
                if (signal.aborted) {
                    reject(createAbortError());
                    return;
                }
                const onAbort = ()=>{
                    job.aborted = true;
                    job.cleanup?.();
                    const idx = queue.indexOf(job);
                    if (idx >= 0) {
                        queue.splice(idx, 1);
                    }
                    reject(createAbortError());
                };
                signal.addEventListener("abort", onAbort, {
                    once: true
                });
                job.cleanup = ()=>{
                    signal.removeEventListener("abort", onAbort);
                };
            }
            queue.push(job);
            tryStart();
        });
    };
}
}),
"[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/app/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/providers.tsx
__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$lib$2f$serverStoragePolyfill$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/lib/serverStoragePolyfill.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/wagmi/dist/esm/context.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@wagmi/core/dist/esm/createConfig.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$transports$2f$fallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@wagmi/core/dist/esm/transports/fallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/viem/_esm/clients/transports/http.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$webSocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/viem/_esm/clients/transports/webSocket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@rainbow-me/rainbowkit/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$chunk$2d$RZWDCITT$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@rainbow-me/rainbowkit/dist/chunk-RZWDCITT.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$NUFOGFBK$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@rainbow-me/rainbowkit/dist/wallets/walletConnectors/chunk-NUFOGFBK.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$O3RZEMKP$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@rainbow-me/rainbowkit/dist/wallets/walletConnectors/chunk-O3RZEMKP.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$VDGPURUM$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@rainbow-me/rainbowkit/dist/wallets/walletConnectors/chunk-VDGPURUM.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$M5WDWYXW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@rainbow-me/rainbowkit/dist/wallets/walletConnectors/chunk-M5WDWYXW.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$T4E2VVAF$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@rainbow-me/rainbowkit/dist/wallets/walletConnectors/chunk-T4E2VVAF.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$ZOBCO773$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@rainbow-me/rainbowkit/dist/wallets/walletConnectors/chunk-ZOBCO773.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$274WD4IM$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@rainbow-me/rainbowkit/dist/wallets/walletConnectors/chunk-274WD4IM.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$A7AXY633$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/node_modules/@rainbow-me/rainbowkit/dist/wallets/walletConnectors/chunk-A7AXY633.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$lib$2f$rateLimitedFetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/lib/rateLimitedFetch.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
// ==== ENV (đổi lại nếu cần) ====
const WC_PROJECT_ID = ("TURBOPACK compile-time value", "df8d376695ef6244fbb2accd6a85f00a") || "df8d376695ef6244fbb2accd6a85f00a";
const RPC = ("TURBOPACK compile-time value", "https://xlayerrpc.okx.com") || "https://xlayerrpc.okx.com";
const RPC_WS_FALLBACKS = [
    "wss://xlayerws.okx.com",
    "wss://ws.xlayer.tech"
];
const RPC_WS = Array.from(new Set((process.env.NEXT_PUBLIC_RPC_WS_URL || "").split(",").map((entry)=>entry.trim()).filter((entry)=>entry.length > 0).concat(RPC_WS_FALLBACKS))).filter((entry)=>entry.length > 0);
const RPC_MAX_RPS = Number(process.env.NEXT_PUBLIC_RPC_MAX_RPS ?? "90");
const RPC_RATE_LIMIT_INTERVAL_MS = Number(process.env.NEXT_PUBLIC_RPC_RATE_INTERVAL_MS ?? "1000");
const rateLimitedFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$lib$2f$rateLimitedFetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRateLimitedFetch"])({
    requestsPerInterval: Number.isFinite(RPC_MAX_RPS) ? Math.max(RPC_MAX_RPS, 1) : 90,
    intervalMs: Number.isFinite(RPC_RATE_LIMIT_INTERVAL_MS) ? Math.max(RPC_RATE_LIMIT_INTERVAL_MS, 0) : 1000
});
// ==== Khai báo chain XLayer (id 196) ====
const xlayer = {
    id: 196,
    name: "XLayer",
    nativeCurrency: {
        name: "OKB",
        symbol: "OKB",
        decimals: 18
    },
    rpcUrls: {
        default: {
            http: [
                RPC
            ],
            webSocket: RPC_WS.length ? RPC_WS : undefined
        },
        public: {
            http: [
                RPC
            ],
            webSocket: RPC_WS.length ? RPC_WS : undefined
        }
    },
    blockExplorers: {
        default: {
            name: "OKLink",
            url: "https://www.oklink.com/xlayer"
        }
    }
};
// ==== Connectors (deeplink mobile tốt) ====
const connectors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["connectorsForWallets"])([
    {
        groupName: "Recommended",
        wallets: [
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$NUFOGFBK$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["okxWallet"],
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$O3RZEMKP$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metaMaskWallet"],
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$VDGPURUM$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walletConnectWallet"]
        ]
    },
    {
        groupName: "More wallets",
        wallets: [
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$M5WDWYXW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rainbowWallet"],
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$T4E2VVAF$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rabbyWallet"],
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$ZOBCO773$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trustWallet"],
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$274WD4IM$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bitgetWallet"],
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$wallets$2f$walletConnectors$2f$chunk$2d$A7AXY633$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coinbaseWallet"]
        ]
    }
], {
    appName: "BANMAO RPS — XLayer",
    projectId: WC_PROJECT_ID
});
// ==== wagmi config ====
const httpTransport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"])(RPC, {
    batch: true,
    fetchFn: rateLimitedFetch
});
const webSocketFallbacks = RPC_WS.map((url)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$webSocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["webSocket"])(url));
const transportChain = webSocketFallbacks.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$transports$2f$fallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallback"])([
    ...webSocketFallbacks,
    httpTransport
]) : httpTransport;
const webSocketTransports = webSocketFallbacks.length > 0 ? {
    [xlayer.id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$transports$2f$fallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallback"])(webSocketFallbacks)
} : undefined;
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createConfig"])({
    chains: [
        xlayer
    ],
    connectors,
    transports: {
        [xlayer.id]: transportChain
    },
    ...webSocketTransports ? {
        webSocketTransport: webSocketTransports
    } : {},
    ssr: true,
    // Tắt quét nhiều injected provider để modal mở nhanh, giảm log rác
    multiInjectedProviderDiscovery: false
});
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1
        }
    }
});
function Providers({ children }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$chunk$2d$RZWDCITT$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["darkTheme"])({
            accentColor: "#FFD700",
            accentColorForeground: "#000",
            borderRadius: "medium",
            overlayBlur: "small"
        }), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const viewport = undefined;
        const MOBILE_UA_REGEX = undefined;
        const DEFAULT_CONTENT = undefined;
        const TARGET_VIEWPORT_WIDTH = undefined;
        const updateViewport = undefined;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const INACTIVITY_TIMEOUT_MS = 60_000;
        let timeoutId;
        const resetTimer = ()=>{
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(()=>{
                window.location.reload();
            }, INACTIVITY_TIMEOUT_MS);
        };
        const handleVisibilityChange = ()=>{
            if (!document.hidden) {
                resetTimer();
            }
        };
        const activityEvents = [
            "mousemove",
            "mousedown",
            "keydown",
            "touchstart",
            "scroll"
        ];
        activityEvents.forEach((event)=>window.addEventListener(event, resetTimer));
        document.addEventListener("visibilitychange", handleVisibilityChange);
        resetTimer();
        return ()=>{
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            activityEvents.forEach((event)=>window.removeEventListener(event, resetTimer));
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WagmiProvider"], {
        config: config,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$rps2$2f$banmao$2d$fun$2d$v2$2d$main$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RainbowKitProvider"], {
                theme: theme,
                modalSize: "compact",
                initialChain: 196,
                children: children
            }, void 0, false, {
                fileName: "[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/app/providers.tsx",
                lineNumber: 240,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/app/providers.tsx",
            lineNumber: 238,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/banmaogame/rps2/banmao-fun-v2-main/app/providers.tsx",
        lineNumber: 237,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__664d0a98._.js.map