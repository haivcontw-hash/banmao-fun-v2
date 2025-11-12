(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/assets/wallet-logo.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.walletLogo = void 0;
const walletLogo = (type, width)=>{
    let height;
    switch(type){
        case 'standard':
            height = width;
            return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `;
        case 'circle':
            height = width;
            return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 999.81 999.81'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052fe;%7D.cls-2%7Bfill:%23fefefe;%7D.cls-3%7Bfill:%230152fe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M655-115.9h56c.83,1.59,2.36.88,3.56,1a478,478,0,0,1,75.06,10.42C891.4-81.76,978.33-32.58,1049.19,44q116.7,126,131.94,297.61c.38,4.14-.34,8.53,1.78,12.45v59c-1.58.84-.91,2.35-1,3.56a482.05,482.05,0,0,1-10.38,74.05c-24,106.72-76.64,196.76-158.83,268.93s-178.18,112.82-287.2,122.6c-4.83.43-9.86-.25-14.51,1.77H654c-1-1.68-2.69-.91-4.06-1a496.89,496.89,0,0,1-105.9-18.59c-93.54-27.42-172.78-77.59-236.91-150.94Q199.34,590.1,184.87,426.58c-.47-5.19.25-10.56-1.77-15.59V355c1.68-1,.91-2.7,1-4.06a498.12,498.12,0,0,1,18.58-105.9c26-88.75,72.64-164.9,140.6-227.57q126-116.27,297.21-131.61C645.32-114.57,650.35-113.88,655-115.9Zm377.92,500c0-192.44-156.31-349.49-347.56-350.15-194.13-.68-350.94,155.13-352.29,347.42-1.37,194.55,155.51,352.1,348.56,352.47C876.15,734.23,1032.93,577.84,1032.93,384.11Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-2' d='M1032.93,384.11c0,193.73-156.78,350.12-351.29,349.74-193-.37-349.93-157.92-348.56-352.47C334.43,189.09,491.24,33.28,685.37,34,876.62,34.62,1032.94,191.67,1032.93,384.11ZM683,496.81q43.74,0,87.48,0c15.55,0,25.32-9.72,25.33-25.21q0-87.48,0-175c0-15.83-9.68-25.46-25.59-25.46H595.77c-15.88,0-25.57,9.64-25.58,25.46q0,87.23,0,174.45c0,16.18,9.59,25.7,25.84,25.71Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-3' d='M683,496.81H596c-16.25,0-25.84-9.53-25.84-25.71q0-87.23,0-174.45c0-15.82,9.7-25.46,25.58-25.46H770.22c15.91,0,25.59,9.63,25.59,25.46q0,87.47,0,175c0,15.49-9.78,25.2-25.33,25.21Q726.74,496.84,683,496.81Z' transform='translate(-183.1 115.9)'/%3E%3C/svg%3E`;
        case 'text':
            height = (0.1 * width).toFixed(2);
            return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`;
        case 'textWithLogo':
            height = (0.25 * width).toFixed(2);
            return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`;
        case 'textLight':
            height = (0.1 * width).toFixed(2);
            return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`;
        case 'textWithLogoLight':
            height = (0.25 * width).toFixed(2);
            return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`;
        default:
            height = width;
            return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `;
    }
};
exports.walletLogo = walletLogo;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/constants.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LINK_API_URL = void 0;
exports.LINK_API_URL = 'https://www.walletlink.org';
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/constants.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.errorValues = exports.standardErrorCodes = void 0;
exports.standardErrorCodes = {
    rpc: {
        invalidInput: -32000,
        resourceNotFound: -32001,
        resourceUnavailable: -32002,
        transactionRejected: -32003,
        methodNotSupported: -32004,
        limitExceeded: -32005,
        parse: -32700,
        invalidRequest: -32600,
        methodNotFound: -32601,
        invalidParams: -32602,
        internal: -32603
    },
    provider: {
        userRejectedRequest: 4001,
        unauthorized: 4100,
        unsupportedMethod: 4200,
        disconnected: 4900,
        chainDisconnected: 4901,
        unsupportedChain: 4902
    }
};
exports.errorValues = {
    '-32700': {
        standard: 'JSON RPC 2.0',
        message: 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.'
    },
    '-32600': {
        standard: 'JSON RPC 2.0',
        message: 'The JSON sent is not a valid Request object.'
    },
    '-32601': {
        standard: 'JSON RPC 2.0',
        message: 'The method does not exist / is not available.'
    },
    '-32602': {
        standard: 'JSON RPC 2.0',
        message: 'Invalid method parameter(s).'
    },
    '-32603': {
        standard: 'JSON RPC 2.0',
        message: 'Internal JSON-RPC error.'
    },
    '-32000': {
        standard: 'EIP-1474',
        message: 'Invalid input.'
    },
    '-32001': {
        standard: 'EIP-1474',
        message: 'Resource not found.'
    },
    '-32002': {
        standard: 'EIP-1474',
        message: 'Resource unavailable.'
    },
    '-32003': {
        standard: 'EIP-1474',
        message: 'Transaction rejected.'
    },
    '-32004': {
        standard: 'EIP-1474',
        message: 'Method not supported.'
    },
    '-32005': {
        standard: 'EIP-1474',
        message: 'Request limit exceeded.'
    },
    '4001': {
        standard: 'EIP-1193',
        message: 'User rejected the request.'
    },
    '4100': {
        standard: 'EIP-1193',
        message: 'The requested account and/or method has not been authorized by the user.'
    },
    '4200': {
        standard: 'EIP-1193',
        message: 'The requested method is not supported by this Ethereum provider.'
    },
    '4900': {
        standard: 'EIP-1193',
        message: 'The provider is disconnected from all chains.'
    },
    '4901': {
        standard: 'EIP-1193',
        message: 'The provider is disconnected from the specified chain.'
    },
    '4902': {
        standard: 'EIP-3085',
        message: 'Unrecognized chain ID.'
    }
};
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serialize = exports.getErrorCode = exports.isValidCode = exports.getMessageFromCode = exports.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;
const constants_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/constants.js [app-client] (ecmascript)");
const FALLBACK_MESSAGE = 'Unspecified error message.';
exports.JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.';
/**
 * Gets the message for a given code, or a fallback message if the code has
 * no corresponding message.
 */ function getMessageFromCode(code, fallbackMessage = FALLBACK_MESSAGE) {
    if (code && Number.isInteger(code)) {
        const codeString = code.toString();
        if (hasKey(constants_1.errorValues, codeString)) {
            return constants_1.errorValues[codeString].message;
        }
        if (isJsonRpcServerError(code)) {
            return exports.JSON_RPC_SERVER_ERROR_MESSAGE;
        }
    }
    return fallbackMessage;
}
exports.getMessageFromCode = getMessageFromCode;
/**
 * Returns whether the given code is valid.
 * A code is only valid if it has a message.
 */ function isValidCode(code) {
    if (!Number.isInteger(code)) {
        return false;
    }
    const codeString = code.toString();
    if (constants_1.errorValues[codeString]) {
        return true;
    }
    if (isJsonRpcServerError(code)) {
        return true;
    }
    return false;
}
exports.isValidCode = isValidCode;
/**
 * Returns the error code from an error object.
 */ function getErrorCode(error) {
    var _a;
    if (typeof error === 'number') {
        return error;
    } else if (isErrorWithCode(error)) {
        return (_a = error.code) !== null && _a !== void 0 ? _a : error.errorCode;
    }
    return undefined;
}
exports.getErrorCode = getErrorCode;
function isErrorWithCode(error) {
    return typeof error === 'object' && error !== null && (typeof error.code === 'number' || typeof error.errorCode === 'number');
}
function serialize(error, { shouldIncludeStack = false } = {}) {
    const serialized = {};
    if (error && typeof error === 'object' && !Array.isArray(error) && hasKey(error, 'code') && isValidCode(error.code)) {
        const _error = error;
        serialized.code = _error.code;
        if (_error.message && typeof _error.message === 'string') {
            serialized.message = _error.message;
            if (hasKey(_error, 'data')) {
                serialized.data = _error.data;
            }
        } else {
            serialized.message = getMessageFromCode(serialized.code);
            serialized.data = {
                originalError: assignOriginalError(error)
            };
        }
    } else {
        serialized.code = constants_1.standardErrorCodes.rpc.internal;
        serialized.message = hasStringProperty(error, 'message') ? error.message : FALLBACK_MESSAGE;
        serialized.data = {
            originalError: assignOriginalError(error)
        };
    }
    if (shouldIncludeStack) {
        serialized.stack = hasStringProperty(error, 'stack') ? error.stack : undefined;
    }
    return serialized;
}
exports.serialize = serialize;
// Internal
function isJsonRpcServerError(code) {
    return code >= -32099 && code <= -32000;
}
function assignOriginalError(error) {
    if (error && typeof error === 'object' && !Array.isArray(error)) {
        return Object.assign({}, error);
    }
    return error;
}
function hasKey(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
function hasStringProperty(obj, prop) {
    return typeof obj === 'object' && obj !== null && prop in obj && typeof obj[prop] === 'string';
}
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/errors.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.standardErrors = void 0;
const constants_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/constants.js [app-client] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/utils.js [app-client] (ecmascript)");
exports.standardErrors = {
    rpc: {
        parse: (arg)=>getEthJsonRpcError(constants_1.standardErrorCodes.rpc.parse, arg),
        invalidRequest: (arg)=>getEthJsonRpcError(constants_1.standardErrorCodes.rpc.invalidRequest, arg),
        invalidParams: (arg)=>getEthJsonRpcError(constants_1.standardErrorCodes.rpc.invalidParams, arg),
        methodNotFound: (arg)=>getEthJsonRpcError(constants_1.standardErrorCodes.rpc.methodNotFound, arg),
        internal: (arg)=>getEthJsonRpcError(constants_1.standardErrorCodes.rpc.internal, arg),
        server: (opts)=>{
            if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
                throw new Error('Ethereum RPC Server errors must provide single object argument.');
            }
            const { code } = opts;
            if (!Number.isInteger(code) || code > -32005 || code < -32099) {
                throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
            }
            return getEthJsonRpcError(code, opts);
        },
        invalidInput: (arg)=>getEthJsonRpcError(constants_1.standardErrorCodes.rpc.invalidInput, arg),
        resourceNotFound: (arg)=>getEthJsonRpcError(constants_1.standardErrorCodes.rpc.resourceNotFound, arg),
        resourceUnavailable: (arg)=>getEthJsonRpcError(constants_1.standardErrorCodes.rpc.resourceUnavailable, arg),
        transactionRejected: (arg)=>getEthJsonRpcError(constants_1.standardErrorCodes.rpc.transactionRejected, arg),
        methodNotSupported: (arg)=>getEthJsonRpcError(constants_1.standardErrorCodes.rpc.methodNotSupported, arg),
        limitExceeded: (arg)=>getEthJsonRpcError(constants_1.standardErrorCodes.rpc.limitExceeded, arg)
    },
    provider: {
        userRejectedRequest: (arg)=>{
            return getEthProviderError(constants_1.standardErrorCodes.provider.userRejectedRequest, arg);
        },
        unauthorized: (arg)=>{
            return getEthProviderError(constants_1.standardErrorCodes.provider.unauthorized, arg);
        },
        unsupportedMethod: (arg)=>{
            return getEthProviderError(constants_1.standardErrorCodes.provider.unsupportedMethod, arg);
        },
        disconnected: (arg)=>{
            return getEthProviderError(constants_1.standardErrorCodes.provider.disconnected, arg);
        },
        chainDisconnected: (arg)=>{
            return getEthProviderError(constants_1.standardErrorCodes.provider.chainDisconnected, arg);
        },
        unsupportedChain: (arg)=>{
            return getEthProviderError(constants_1.standardErrorCodes.provider.unsupportedChain, arg);
        },
        custom: (opts)=>{
            if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {
                throw new Error('Ethereum Provider custom errors must provide single object argument.');
            }
            const { code, message, data } = opts;
            if (!message || typeof message !== 'string') {
                throw new Error('"message" must be a nonempty string');
            }
            return new EthereumProviderError(code, message, data);
        }
    }
};
// Internal
function getEthJsonRpcError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new EthereumRpcError(code, message || (0, utils_1.getMessageFromCode)(code), data);
}
function getEthProviderError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new EthereumProviderError(code, message || (0, utils_1.getMessageFromCode)(code), data);
}
function parseOpts(arg) {
    if (arg) {
        if (typeof arg === 'string') {
            return [
                arg
            ];
        } else if (typeof arg === 'object' && !Array.isArray(arg)) {
            const { message, data } = arg;
            if (message && typeof message !== 'string') {
                throw new Error('Must specify string message.');
            }
            return [
                message || undefined,
                data
            ];
        }
    }
    return [];
}
class EthereumRpcError extends Error {
    constructor(code, message, data){
        if (!Number.isInteger(code)) {
            throw new Error('"code" must be an integer.');
        }
        if (!message || typeof message !== 'string') {
            throw new Error('"message" must be a nonempty string.');
        }
        super(message);
        this.code = code;
        if (data !== undefined) {
            this.data = data;
        }
    }
}
class EthereumProviderError extends EthereumRpcError {
    /**
     * Create an Ethereum Provider JSON-RPC error.
     * `code` must be an integer in the 1000 <= 4999 range.
     */ constructor(code, message, data){
        if (!isValidEthProviderCode(code)) {
            throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        }
        super(code, message, data);
    }
}
function isValidEthProviderCode(code) {
    return Number.isInteger(code) && code >= 1000 && code <= 4999;
}
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/type/Web3Response.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isErrorResponse = void 0;
// TODO: revisit if this is still needed
function isErrorResponse(response) {
    return response.errorMessage !== undefined;
}
exports.isErrorResponse = isErrorResponse;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/version.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LIB_VERSION = void 0;
exports.LIB_VERSION = '3.9.3';
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/serialize.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serializeError = void 0;
// TODO: error should not depend on walletlink. revisit this.
const Web3Response_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/type/Web3Response.js [app-client] (ecmascript)");
const version_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/version.js [app-client] (ecmascript)");
const constants_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/constants.js [app-client] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/utils.js [app-client] (ecmascript)");
/**
 * Serializes an error to a format that is compatible with the Ethereum JSON RPC error format.
 * See https://docs.cloud.coinbase.com/wallet-sdk/docs/errors
 * for more information.
 */ function serializeError(error, requestOrMethod) {
    const serialized = (0, utils_1.serialize)(getErrorObject(error), {
        shouldIncludeStack: true
    });
    const docUrl = new URL('https://docs.cloud.coinbase.com/wallet-sdk/docs/errors');
    docUrl.searchParams.set('version', version_1.LIB_VERSION);
    docUrl.searchParams.set('code', serialized.code.toString());
    const method = getMethod(serialized.data, requestOrMethod);
    if (method) {
        docUrl.searchParams.set('method', method);
    }
    docUrl.searchParams.set('message', serialized.message);
    return Object.assign(Object.assign({}, serialized), {
        docUrl: docUrl.href
    });
}
exports.serializeError = serializeError;
/**
 * Converts an error to a serializable object.
 */ function getErrorObject(error) {
    if (typeof error === 'string') {
        return {
            message: error,
            code: constants_1.standardErrorCodes.rpc.internal
        };
    } else if ((0, Web3Response_1.isErrorResponse)(error)) {
        return Object.assign(Object.assign({}, error), {
            message: error.errorMessage,
            code: error.errorCode,
            data: {
                method: error.method
            }
        });
    }
    return error;
}
/**
 * Gets the method name from the serialized data or the request.
 */ function getMethod(serializedData, request) {
    const methodInData = serializedData === null || serializedData === void 0 ? void 0 : serializedData.method;
    if (methodInData) {
        return methodInData;
    }
    if (request === undefined) {
        return undefined;
    } else if (typeof request === 'string') {
        return request;
    } else if (!Array.isArray(request)) {
        return request.method;
    } else if (request.length > 0) {
        return request[0].method;
    }
    return undefined;
}
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.standardErrors = exports.standardErrorCodes = exports.serializeError = exports.getMessageFromCode = exports.getErrorCode = void 0;
const constants_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/constants.js [app-client] (ecmascript)");
Object.defineProperty(exports, "standardErrorCodes", {
    enumerable: true,
    get: function() {
        return constants_1.standardErrorCodes;
    }
});
const errors_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/errors.js [app-client] (ecmascript)");
Object.defineProperty(exports, "standardErrors", {
    enumerable: true,
    get: function() {
        return errors_1.standardErrors;
    }
});
const serialize_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/serialize.js [app-client] (ecmascript)");
Object.defineProperty(exports, "serializeError", {
    enumerable: true,
    get: function() {
        return serialize_1.serializeError;
    }
});
const utils_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/utils.js [app-client] (ecmascript)");
Object.defineProperty(exports, "getErrorCode", {
    enumerable: true,
    get: function() {
        return utils_1.getErrorCode;
    }
});
Object.defineProperty(exports, "getMessageFromCode", {
    enumerable: true,
    get: function() {
        return utils_1.getMessageFromCode;
    }
});
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/type.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProviderType = exports.RegExpString = exports.IntNumber = exports.BigIntString = exports.AddressString = exports.HexString = exports.OpaqueType = void 0;
function OpaqueType() {
    return (value)=>value;
}
exports.OpaqueType = OpaqueType;
exports.HexString = OpaqueType();
exports.AddressString = OpaqueType();
exports.BigIntString = OpaqueType();
function IntNumber(num) {
    return Math.floor(num);
}
exports.IntNumber = IntNumber;
exports.RegExpString = OpaqueType();
var ProviderType;
(function(ProviderType) {
    ProviderType["CoinbaseWallet"] = "CoinbaseWallet";
    ProviderType["MetaMask"] = "MetaMask";
    ProviderType["Unselected"] = "";
})(ProviderType || (exports.ProviderType = ProviderType = {}));
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/util.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
"use strict";
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isMobileWeb = exports.getLocation = exports.isInIFrame = exports.createQrUrl = exports.getFavicon = exports.range = exports.isBigNumber = exports.ensureParsedJSONObject = exports.ensureBN = exports.ensureRegExpString = exports.ensureIntNumber = exports.ensureBuffer = exports.ensureAddressString = exports.ensureEvenLengthHexString = exports.ensureHexString = exports.isHexString = exports.prepend0x = exports.strip0x = exports.has0xPrefix = exports.hexStringFromIntNumber = exports.intNumberFromHexString = exports.bigIntStringFromBN = exports.hexStringFromBuffer = exports.hexStringToUint8Array = exports.uint8ArrayToHex = exports.randomBytesHex = void 0;
const bn_js_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/bn.js/lib/bn.js [app-client] (ecmascript)"));
const error_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/index.js [app-client] (ecmascript)");
const type_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/type.js [app-client] (ecmascript)");
const INT_STRING_REGEX = /^[0-9]*$/;
const HEXADECIMAL_STRING_REGEX = /^[a-f0-9]*$/;
/**
 * @param length number of bytes
 */ function randomBytesHex(length) {
    return uint8ArrayToHex(crypto.getRandomValues(new Uint8Array(length)));
}
exports.randomBytesHex = randomBytesHex;
function uint8ArrayToHex(value) {
    return [
        ...value
    ].map((b)=>b.toString(16).padStart(2, '0')).join('');
}
exports.uint8ArrayToHex = uint8ArrayToHex;
function hexStringToUint8Array(hexString) {
    return new Uint8Array(hexString.match(/.{1,2}/g).map((byte)=>parseInt(byte, 16)));
}
exports.hexStringToUint8Array = hexStringToUint8Array;
function hexStringFromBuffer(buf, includePrefix = false) {
    const hex = buf.toString('hex');
    return (0, type_1.HexString)(includePrefix ? `0x${hex}` : hex);
}
exports.hexStringFromBuffer = hexStringFromBuffer;
function bigIntStringFromBN(bn) {
    return (0, type_1.BigIntString)(bn.toString(10));
}
exports.bigIntStringFromBN = bigIntStringFromBN;
function intNumberFromHexString(hex) {
    return (0, type_1.IntNumber)(new bn_js_1.default(ensureEvenLengthHexString(hex, false), 16).toNumber());
}
exports.intNumberFromHexString = intNumberFromHexString;
function hexStringFromIntNumber(num) {
    return (0, type_1.HexString)(`0x${new bn_js_1.default(num).toString(16)}`);
}
exports.hexStringFromIntNumber = hexStringFromIntNumber;
function has0xPrefix(str) {
    return str.startsWith('0x') || str.startsWith('0X');
}
exports.has0xPrefix = has0xPrefix;
function strip0x(hex) {
    if (has0xPrefix(hex)) {
        return hex.slice(2);
    }
    return hex;
}
exports.strip0x = strip0x;
function prepend0x(hex) {
    if (has0xPrefix(hex)) {
        return `0x${hex.slice(2)}`;
    }
    return `0x${hex}`;
}
exports.prepend0x = prepend0x;
function isHexString(hex) {
    if (typeof hex !== 'string') {
        return false;
    }
    const s = strip0x(hex).toLowerCase();
    return HEXADECIMAL_STRING_REGEX.test(s);
}
exports.isHexString = isHexString;
function ensureHexString(hex, includePrefix = false) {
    if (typeof hex === 'string') {
        const s = strip0x(hex).toLowerCase();
        if (HEXADECIMAL_STRING_REGEX.test(s)) {
            return (0, type_1.HexString)(includePrefix ? `0x${s}` : s);
        }
    }
    throw error_1.standardErrors.rpc.invalidParams(`"${String(hex)}" is not a hexadecimal string`);
}
exports.ensureHexString = ensureHexString;
function ensureEvenLengthHexString(hex, includePrefix = false) {
    let h = ensureHexString(hex, false);
    if (h.length % 2 === 1) {
        h = (0, type_1.HexString)(`0${h}`);
    }
    return includePrefix ? (0, type_1.HexString)(`0x${h}`) : h;
}
exports.ensureEvenLengthHexString = ensureEvenLengthHexString;
function ensureAddressString(str) {
    if (typeof str === 'string') {
        const s = strip0x(str).toLowerCase();
        if (isHexString(s) && s.length === 40) {
            return (0, type_1.AddressString)(prepend0x(s));
        }
    }
    throw error_1.standardErrors.rpc.invalidParams(`Invalid Ethereum address: ${String(str)}`);
}
exports.ensureAddressString = ensureAddressString;
function ensureBuffer(str) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(str)) {
        return str;
    }
    if (typeof str === 'string') {
        if (isHexString(str)) {
            const s = ensureEvenLengthHexString(str, false);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(s, 'hex');
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(str, 'utf8');
    }
    throw error_1.standardErrors.rpc.invalidParams(`Not binary data: ${String(str)}`);
}
exports.ensureBuffer = ensureBuffer;
function ensureIntNumber(num) {
    if (typeof num === 'number' && Number.isInteger(num)) {
        return (0, type_1.IntNumber)(num);
    }
    if (typeof num === 'string') {
        if (INT_STRING_REGEX.test(num)) {
            return (0, type_1.IntNumber)(Number(num));
        }
        if (isHexString(num)) {
            return (0, type_1.IntNumber)(new bn_js_1.default(ensureEvenLengthHexString(num, false), 16).toNumber());
        }
    }
    throw error_1.standardErrors.rpc.invalidParams(`Not an integer: ${String(num)}`);
}
exports.ensureIntNumber = ensureIntNumber;
function ensureRegExpString(regExp) {
    if (regExp instanceof RegExp) {
        return (0, type_1.RegExpString)(regExp.toString());
    }
    throw error_1.standardErrors.rpc.invalidParams(`Not a RegExp: ${String(regExp)}`);
}
exports.ensureRegExpString = ensureRegExpString;
function ensureBN(val) {
    if (val !== null && (bn_js_1.default.isBN(val) || isBigNumber(val))) {
        return new bn_js_1.default(val.toString(10), 10);
    }
    if (typeof val === 'number') {
        return new bn_js_1.default(ensureIntNumber(val));
    }
    if (typeof val === 'string') {
        if (INT_STRING_REGEX.test(val)) {
            return new bn_js_1.default(val, 10);
        }
        if (isHexString(val)) {
            return new bn_js_1.default(ensureEvenLengthHexString(val, false), 16);
        }
    }
    throw error_1.standardErrors.rpc.invalidParams(`Not an integer: ${String(val)}`);
}
exports.ensureBN = ensureBN;
function ensureParsedJSONObject(val) {
    if (typeof val === 'string') {
        return JSON.parse(val);
    }
    if (typeof val === 'object') {
        return val;
    }
    throw error_1.standardErrors.rpc.invalidParams(`Not a JSON string or an object: ${String(val)}`);
}
exports.ensureParsedJSONObject = ensureParsedJSONObject;
function isBigNumber(val) {
    if (val == null || typeof val.constructor !== 'function') {
        return false;
    }
    const { constructor } = val;
    return typeof constructor.config === 'function' && typeof constructor.EUCLID === 'number';
}
exports.isBigNumber = isBigNumber;
function range(start, stop) {
    return Array.from({
        length: stop - start
    }, (_, i)=>start + i);
}
exports.range = range;
function getFavicon() {
    const el = document.querySelector('link[sizes="192x192"]') || document.querySelector('link[sizes="180x180"]') || document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
    const { protocol, host } = document.location;
    const href = el ? el.getAttribute('href') : null;
    if (!href || href.startsWith('javascript:') || href.startsWith('vbscript:')) {
        return null;
    }
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('data:')) {
        return href;
    }
    if (href.startsWith('//')) {
        return protocol + href;
    }
    return `${protocol}//${host}${href}`;
}
exports.getFavicon = getFavicon;
function createQrUrl(sessionId, sessionSecret, serverUrl, isParentConnection, version, chainId) {
    const sessionIdKey = isParentConnection ? 'parent-id' : 'id';
    const query = new URLSearchParams({
        [sessionIdKey]: sessionId,
        secret: sessionSecret,
        server: serverUrl,
        v: version,
        chainId: chainId.toString()
    }).toString();
    const qrUrl = `${serverUrl}/#/link?${query}`;
    return qrUrl;
}
exports.createQrUrl = createQrUrl;
function isInIFrame() {
    try {
        return window.frameElement !== null;
    } catch (e) {
        return false;
    }
}
exports.isInIFrame = isInIFrame;
function getLocation() {
    try {
        if (isInIFrame() && window.top) {
            return window.top.location;
        }
        return window.location;
    } catch (e) {
        return window.location;
    }
}
exports.getLocation = getLocation;
function isMobileWeb() {
    var _a;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent);
}
exports.isMobileWeb = isMobileWeb;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/lib/ScopedLocalStorage.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ScopedLocalStorage = void 0;
class ScopedLocalStorage {
    // eslint-disable-next-line no-useless-constructor
    constructor(scope){
        this.scope = scope;
    }
    setItem(key, value) {
        localStorage.setItem(this.scopedKey(key), value);
    }
    getItem(key) {
        return localStorage.getItem(this.scopedKey(key));
    }
    removeItem(key) {
        localStorage.removeItem(this.scopedKey(key));
    }
    clear() {
        const prefix = this.scopedKey('');
        const keysToRemove = [];
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            if (typeof key === 'string' && key.startsWith(prefix)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach((key)=>localStorage.removeItem(key));
    }
    scopedKey(key) {
        return `${this.scope}:${key}`;
    }
}
exports.ScopedLocalStorage = ScopedLocalStorage;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/DiagnosticLogger.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// DiagnosticLogger for debugging purposes only
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVENTS = void 0;
exports.EVENTS = {
    STARTED_CONNECTING: 'walletlink_sdk.started.connecting',
    CONNECTED_STATE_CHANGE: 'walletlink_sdk.connected',
    DISCONNECTED: 'walletlink_sdk.disconnected',
    METADATA_DESTROYED: 'walletlink_sdk_metadata_destroyed',
    LINKED: 'walletlink_sdk.linked',
    FAILURE: 'walletlink_sdk.generic_failure',
    SESSION_CONFIG_RECEIVED: 'walletlink_sdk.session_config_event_received',
    ETH_ACCOUNTS_STATE: 'walletlink_sdk.eth_accounts_state',
    SESSION_STATE_CHANGE: 'walletlink_sdk.session_state_change',
    UNLINKED_ERROR_STATE: 'walletlink_sdk.unlinked_error_state',
    SKIPPED_CLEARING_SESSION: 'walletlink_sdk.skipped_clearing_session',
    GENERAL_ERROR: 'walletlink_sdk.general_error',
    WEB3_REQUEST: 'walletlink_sdk.web3.request',
    WEB3_REQUEST_PUBLISHED: 'walletlink_sdk.web3.request_published',
    WEB3_RESPONSE: 'walletlink_sdk.web3.response',
    METHOD_NOT_IMPLEMENTED: 'walletlink_sdk.method_not_implemented',
    UNKNOWN_ADDRESS_ENCOUNTERED: 'walletlink_sdk.unknown_address_encountered'
};
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/RelayAbstract.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RelayAbstract = exports.APP_VERSION_KEY = exports.LOCAL_STORAGE_ADDRESSES_KEY = exports.WALLET_USER_NAME_KEY = void 0;
const error_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/index.js [app-client] (ecmascript)");
exports.WALLET_USER_NAME_KEY = 'walletUsername';
exports.LOCAL_STORAGE_ADDRESSES_KEY = 'Addresses';
exports.APP_VERSION_KEY = 'AppVersion';
class RelayAbstract {
    async makeEthereumJSONRPCRequest(request, jsonRpcUrl) {
        if (!jsonRpcUrl) throw new Error('Error: No jsonRpcUrl provided');
        return window.fetch(jsonRpcUrl, {
            method: 'POST',
            body: JSON.stringify(request),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res)=>res.json()).then((json)=>{
            if (!json) {
                throw error_1.standardErrors.rpc.parse({});
            }
            const response = json;
            const { error } = response;
            if (error) {
                throw (0, error_1.serializeError)(error, request.method);
            }
            return response;
        });
    }
}
exports.RelayAbstract = RelayAbstract;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/Session.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Session = void 0;
const sha_js_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/sha.js/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/util.js [app-client] (ecmascript)");
const STORAGE_KEY_SESSION_ID = 'session:id';
const STORAGE_KEY_SESSION_SECRET = 'session:secret';
const STORAGE_KEY_SESSION_LINKED = 'session:linked';
class Session {
    constructor(storage, id, secret, linked){
        this._storage = storage;
        this._id = id || (0, util_1.randomBytesHex)(16);
        this._secret = secret || (0, util_1.randomBytesHex)(32);
        this._key = new sha_js_1.sha256().update(`${this._id}, ${this._secret} WalletLink`) // ensure old sessions stay connected
        .digest('hex');
        this._linked = !!linked;
    }
    static load(storage) {
        const id = storage.getItem(STORAGE_KEY_SESSION_ID);
        const linked = storage.getItem(STORAGE_KEY_SESSION_LINKED);
        const secret = storage.getItem(STORAGE_KEY_SESSION_SECRET);
        if (id && secret) {
            return new Session(storage, id, secret, linked === '1');
        }
        return null;
    }
    /**
     * Takes in a session ID and returns the sha256 hash of it.
     * @param sessionId session ID
     */ static hash(sessionId) {
        return new sha_js_1.sha256().update(sessionId).digest('hex');
    }
    get id() {
        return this._id;
    }
    get secret() {
        return this._secret;
    }
    get key() {
        return this._key;
    }
    get linked() {
        return this._linked;
    }
    set linked(val) {
        this._linked = val;
        this.persistLinked();
    }
    save() {
        this._storage.setItem(STORAGE_KEY_SESSION_ID, this._id);
        this._storage.setItem(STORAGE_KEY_SESSION_SECRET, this._secret);
        this.persistLinked();
        return this;
    }
    persistLinked() {
        this._storage.setItem(STORAGE_KEY_SESSION_LINKED, this._linked ? '1' : '0');
    }
}
exports.Session = Session;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/lib/Cipher.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Cipher = void 0;
const util_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/util.js [app-client] (ecmascript)");
class Cipher {
    // @param secret hex representation of 32-byte secret
    constructor(secret){
        this.secret = secret;
    }
    /**
     *
     * @param plainText string to be encrypted
     * returns hex string representation of bytes in the order: initialization vector (iv),
     * auth tag, encrypted plaintext. IV is 12 bytes. Auth tag is 16 bytes. Remaining bytes are the
     * encrypted plainText.
     */ async encrypt(plainText) {
        const secret = this.secret;
        if (secret.length !== 64) throw Error(`secret must be 256 bits`);
        const ivBytes = crypto.getRandomValues(new Uint8Array(12));
        const secretKey = await crypto.subtle.importKey('raw', (0, util_1.hexStringToUint8Array)(secret), {
            name: 'aes-gcm'
        }, false, [
            'encrypt',
            'decrypt'
        ]);
        const enc = new TextEncoder();
        // Will return encrypted plainText with auth tag (ie MAC or checksum) appended at the end
        const encryptedResult = await window.crypto.subtle.encrypt({
            name: 'AES-GCM',
            iv: ivBytes
        }, secretKey, enc.encode(plainText));
        const tagLength = 16;
        const authTag = encryptedResult.slice(encryptedResult.byteLength - tagLength);
        const encryptedPlaintext = encryptedResult.slice(0, encryptedResult.byteLength - tagLength);
        const authTagBytes = new Uint8Array(authTag);
        const encryptedPlaintextBytes = new Uint8Array(encryptedPlaintext);
        const concatted = new Uint8Array([
            ...ivBytes,
            ...authTagBytes,
            ...encryptedPlaintextBytes
        ]);
        return (0, util_1.uint8ArrayToHex)(concatted);
    }
    /**
     *
     * @param cipherText hex string representation of bytes in the order: initialization vector (iv),
     * auth tag, encrypted plaintext. IV is 12 bytes. Auth tag is 16 bytes.
     */ async decrypt(cipherText) {
        const secret = this.secret;
        if (secret.length !== 64) throw Error(`secret must be 256 bits`);
        return new Promise((resolve, reject)=>{
            void async function() {
                const secretKey = await crypto.subtle.importKey('raw', (0, util_1.hexStringToUint8Array)(secret), {
                    name: 'aes-gcm'
                }, false, [
                    'encrypt',
                    'decrypt'
                ]);
                const encrypted = (0, util_1.hexStringToUint8Array)(cipherText);
                const ivBytes = encrypted.slice(0, 12);
                const authTagBytes = encrypted.slice(12, 28);
                const encryptedPlaintextBytes = encrypted.slice(28);
                const concattedBytes = new Uint8Array([
                    ...encryptedPlaintextBytes,
                    ...authTagBytes
                ]);
                const algo = {
                    name: 'AES-GCM',
                    iv: new Uint8Array(ivBytes)
                };
                try {
                    const decrypted = await window.crypto.subtle.decrypt(algo, secretKey, concattedBytes);
                    const decoder = new TextDecoder();
                    resolve(decoder.decode(decrypted));
                } catch (err) {
                    reject(err);
                }
            }();
        });
    }
}
exports.Cipher = Cipher;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/connection/WalletLinkHTTP.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WalletLinkHTTP = void 0;
class WalletLinkHTTP {
    constructor(linkAPIUrl, sessionId, sessionKey){
        this.linkAPIUrl = linkAPIUrl;
        this.sessionId = sessionId;
        const credentials = `${sessionId}:${sessionKey}`;
        this.auth = `Basic ${btoa(credentials)}`;
    }
    // mark unseen events as seen
    async markUnseenEventsAsSeen(events) {
        return Promise.all(events.map((e)=>fetch(`${this.linkAPIUrl}/events/${e.eventId}/seen`, {
                method: 'POST',
                headers: {
                    Authorization: this.auth
                }
            }))).catch((error)=>console.error('Unabled to mark event as failed:', error));
    }
    async fetchUnseenEvents() {
        var _a;
        const response = await fetch(`${this.linkAPIUrl}/events?unseen=true`, {
            headers: {
                Authorization: this.auth
            }
        });
        if (response.ok) {
            const { events, error } = await response.json();
            if (error) {
                throw new Error(`Check unseen events failed: ${error}`);
            }
            const responseEvents = (_a = events === null || events === void 0 ? void 0 : events.filter((e)=>e.event === 'Web3Response').map((e)=>({
                    type: 'Event',
                    sessionId: this.sessionId,
                    eventId: e.id,
                    event: e.event,
                    data: e.data
                }))) !== null && _a !== void 0 ? _a : [];
            this.markUnseenEventsAsSeen(responseEvents);
            return responseEvents;
        }
        throw new Error(`Check unseen events failed: ${response.status}`);
    }
}
exports.WalletLinkHTTP = WalletLinkHTTP;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/connection/WalletLinkWebSocket.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WalletLinkWebSocket = exports.ConnectionState = void 0;
var ConnectionState;
(function(ConnectionState) {
    ConnectionState[ConnectionState["DISCONNECTED"] = 0] = "DISCONNECTED";
    ConnectionState[ConnectionState["CONNECTING"] = 1] = "CONNECTING";
    ConnectionState[ConnectionState["CONNECTED"] = 2] = "CONNECTED";
})(ConnectionState || (exports.ConnectionState = ConnectionState = {}));
class WalletLinkWebSocket {
    setConnectionStateListener(listener) {
        this.connectionStateListener = listener;
    }
    setIncomingDataListener(listener) {
        this.incomingDataListener = listener;
    }
    /**
     * Constructor
     * @param url WebSocket server URL
     * @param [WebSocketClass] Custom WebSocket implementation
     */ constructor(url, WebSocketClass = WebSocket){
        this.WebSocketClass = WebSocketClass;
        this.webSocket = null;
        this.pendingData = [];
        this.url = url.replace(/^http/, 'ws');
    }
    /**
     * Make a websocket connection
     * @returns a Promise that resolves when connected
     */ async connect() {
        if (this.webSocket) {
            throw new Error('webSocket object is not null');
        }
        return new Promise((resolve, reject)=>{
            var _a;
            let webSocket;
            try {
                this.webSocket = webSocket = new this.WebSocketClass(this.url);
            } catch (err) {
                reject(err);
                return;
            }
            (_a = this.connectionStateListener) === null || _a === void 0 ? void 0 : _a.call(this, ConnectionState.CONNECTING);
            webSocket.onclose = (evt)=>{
                var _a;
                this.clearWebSocket();
                reject(new Error(`websocket error ${evt.code}: ${evt.reason}`));
                (_a = this.connectionStateListener) === null || _a === void 0 ? void 0 : _a.call(this, ConnectionState.DISCONNECTED);
            };
            webSocket.onopen = (_)=>{
                var _a;
                resolve();
                (_a = this.connectionStateListener) === null || _a === void 0 ? void 0 : _a.call(this, ConnectionState.CONNECTED);
                if (this.pendingData.length > 0) {
                    const pending = [
                        ...this.pendingData
                    ];
                    pending.forEach((data)=>this.sendData(data));
                    this.pendingData = [];
                }
            };
            webSocket.onmessage = (evt)=>{
                var _a, _b;
                if (evt.data === 'h') {
                    (_a = this.incomingDataListener) === null || _a === void 0 ? void 0 : _a.call(this, {
                        type: 'Heartbeat'
                    });
                } else {
                    try {
                        const message = JSON.parse(evt.data);
                        (_b = this.incomingDataListener) === null || _b === void 0 ? void 0 : _b.call(this, message);
                    } catch (_c) {
                    /* empty */ }
                }
            };
        });
    }
    /**
     * Disconnect from server
     */ disconnect() {
        var _a;
        const { webSocket } = this;
        if (!webSocket) {
            return;
        }
        this.clearWebSocket();
        (_a = this.connectionStateListener) === null || _a === void 0 ? void 0 : _a.call(this, ConnectionState.DISCONNECTED);
        this.connectionStateListener = undefined;
        this.incomingDataListener = undefined;
        try {
            webSocket.close();
        } catch (_b) {
        // noop
        }
    }
    /**
     * Send data to server
     * @param data text to send
     */ sendData(data) {
        const { webSocket } = this;
        if (!webSocket) {
            this.pendingData.push(data);
            this.connect();
            return;
        }
        webSocket.send(data);
    }
    clearWebSocket() {
        const { webSocket } = this;
        if (!webSocket) {
            return;
        }
        this.webSocket = null;
        webSocket.onclose = null;
        webSocket.onerror = null;
        webSocket.onmessage = null;
        webSocket.onopen = null;
    }
}
exports.WalletLinkWebSocket = WalletLinkWebSocket;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/connection/WalletLinkConnection.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WalletLinkConnection = void 0;
const type_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/type.js [app-client] (ecmascript)");
const Cipher_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/lib/Cipher.js [app-client] (ecmascript)");
const DiagnosticLogger_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/DiagnosticLogger.js [app-client] (ecmascript)");
const RelayAbstract_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/RelayAbstract.js [app-client] (ecmascript)");
const Session_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/Session.js [app-client] (ecmascript)");
const WalletLinkHTTP_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/connection/WalletLinkHTTP.js [app-client] (ecmascript)");
const WalletLinkWebSocket_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/connection/WalletLinkWebSocket.js [app-client] (ecmascript)");
const HEARTBEAT_INTERVAL = 10000;
const REQUEST_TIMEOUT = 60000;
/**
 * Coinbase Wallet Connection
 */ class WalletLinkConnection {
    /**
     * Constructor
     * @param session Session
     * @param linkAPIUrl Coinbase Wallet link server URL
     * @param listener WalletLinkConnectionUpdateListener
     * @param [WebSocketClass] Custom WebSocket implementation
     */ constructor({ session, linkAPIUrl, listener, diagnostic, WebSocketClass = WebSocket }){
        this.destroyed = false;
        this.lastHeartbeatResponse = 0;
        this.nextReqId = (0, type_1.IntNumber)(1);
        /**
         * true if connected and authenticated, else false
         * runs listener when connected status changes
         */ this._connected = false;
        /**
         * true if linked (a guest has joined before)
         * runs listener when linked status changes
         */ this._linked = false;
        this.shouldFetchUnseenEventsOnConnect = false;
        this.requestResolutions = new Map();
        this.handleSessionMetadataUpdated = (metadata)=>{
            if (!metadata) return;
            // Map of metadata key to handler function
            const handlers = new Map([
                [
                    '__destroyed',
                    this.handleDestroyed
                ],
                [
                    'EthereumAddress',
                    this.handleAccountUpdated
                ],
                [
                    'WalletUsername',
                    this.handleWalletUsernameUpdated
                ],
                [
                    'AppVersion',
                    this.handleAppVersionUpdated
                ],
                [
                    'ChainId',
                    (v)=>metadata.JsonRpcUrl && this.handleChainUpdated(v, metadata.JsonRpcUrl)
                ]
            ]);
            // call handler for each metadata key if value is defined
            handlers.forEach((handler, key)=>{
                const value = metadata[key];
                if (value === undefined) return;
                handler(value);
            });
        };
        this.handleDestroyed = (__destroyed)=>{
            var _a, _b;
            if (__destroyed !== '1') return;
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.resetAndReload();
            (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.METADATA_DESTROYED, {
                alreadyDestroyed: this.isDestroyed,
                sessionIdHash: Session_1.Session.hash(this.session.id)
            });
        };
        this.handleAccountUpdated = async (encryptedEthereumAddress)=>{
            var _a, _b;
            try {
                const address = await this.cipher.decrypt(encryptedEthereumAddress);
                (_a = this.listener) === null || _a === void 0 ? void 0 : _a.accountUpdated(address);
            } catch (_c) {
                (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
                    message: 'Had error decrypting',
                    value: 'selectedAddress'
                });
            }
        };
        this.handleMetadataUpdated = async (key, encryptedMetadataValue)=>{
            var _a, _b;
            try {
                const decryptedValue = await this.cipher.decrypt(encryptedMetadataValue);
                (_a = this.listener) === null || _a === void 0 ? void 0 : _a.metadataUpdated(key, decryptedValue);
            } catch (_c) {
                (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
                    message: 'Had error decrypting',
                    value: key
                });
            }
        };
        this.handleWalletUsernameUpdated = async (walletUsername)=>{
            this.handleMetadataUpdated(RelayAbstract_1.WALLET_USER_NAME_KEY, walletUsername);
        };
        this.handleAppVersionUpdated = async (appVersion)=>{
            this.handleMetadataUpdated(RelayAbstract_1.APP_VERSION_KEY, appVersion);
        };
        this.handleChainUpdated = async (encryptedChainId, encryptedJsonRpcUrl)=>{
            var _a, _b;
            try {
                const chainId = await this.cipher.decrypt(encryptedChainId);
                const jsonRpcUrl = await this.cipher.decrypt(encryptedJsonRpcUrl);
                (_a = this.listener) === null || _a === void 0 ? void 0 : _a.chainUpdated(chainId, jsonRpcUrl);
            } catch (_c) {
                (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
                    message: 'Had error decrypting',
                    value: 'chainId|jsonRpcUrl'
                });
            }
        };
        this.session = session;
        this.cipher = new Cipher_1.Cipher(session.secret);
        this.diagnostic = diagnostic;
        this.listener = listener;
        const ws = new WalletLinkWebSocket_1.WalletLinkWebSocket(`${linkAPIUrl}/rpc`, WebSocketClass);
        ws.setConnectionStateListener(async (state)=>{
            var _a;
            // attempt to reconnect every 5 seconds when disconnected
            (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.CONNECTED_STATE_CHANGE, {
                state,
                sessionIdHash: Session_1.Session.hash(session.id)
            });
            let connected = false;
            switch(state){
                case WalletLinkWebSocket_1.ConnectionState.DISCONNECTED:
                    // if DISCONNECTED and not destroyed
                    if (!this.destroyed) {
                        const connect = async ()=>{
                            // wait 5 seconds
                            await new Promise((resolve)=>setTimeout(resolve, 5000));
                            // check whether it's destroyed again
                            if (!this.destroyed) {
                                // reconnect
                                ws.connect().catch(()=>{
                                    connect();
                                });
                            }
                        };
                        connect();
                    }
                    break;
                case WalletLinkWebSocket_1.ConnectionState.CONNECTED:
                    // perform authentication upon connection
                    try {
                        // if CONNECTED, authenticate, and then check link status
                        await this.authenticate();
                        this.sendIsLinked();
                        this.sendGetSessionConfig();
                        connected = true;
                    } catch (_b) {
                    /* empty */ }
                    // send heartbeat every n seconds while connected
                    // if CONNECTED, start the heartbeat timer
                    // first timer event updates lastHeartbeat timestamp
                    // subsequent calls send heartbeat message
                    this.updateLastHeartbeat();
                    setInterval(()=>{
                        this.heartbeat();
                    }, HEARTBEAT_INTERVAL);
                    // check for unseen events
                    if (this.shouldFetchUnseenEventsOnConnect) {
                        this.fetchUnseenEventsAPI();
                    }
                    break;
                case WalletLinkWebSocket_1.ConnectionState.CONNECTING:
                    break;
            }
            // distinctUntilChanged
            if (this.connected !== connected) {
                this.connected = connected;
            }
        });
        ws.setIncomingDataListener((m)=>{
            var _a, _b, _c;
            switch(m.type){
                // handle server's heartbeat responses
                case 'Heartbeat':
                    this.updateLastHeartbeat();
                    return;
                // handle link status updates
                case 'IsLinkedOK':
                case 'Linked':
                    {
                        const linked = m.type === 'IsLinkedOK' ? m.linked : undefined;
                        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.LINKED, {
                            sessionIdHash: Session_1.Session.hash(session.id),
                            linked,
                            type: m.type,
                            onlineGuests: m.onlineGuests
                        });
                        this.linked = linked || m.onlineGuests > 0;
                        break;
                    }
                // handle session config updates
                case 'GetSessionConfigOK':
                case 'SessionConfigUpdated':
                    {
                        (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.SESSION_CONFIG_RECEIVED, {
                            sessionIdHash: Session_1.Session.hash(session.id),
                            metadata_keys: m && m.metadata ? Object.keys(m.metadata) : undefined
                        });
                        this.handleSessionMetadataUpdated(m.metadata);
                        break;
                    }
                case 'Event':
                    {
                        this.handleIncomingEvent(m);
                        break;
                    }
            }
            // resolve request promises
            if (m.id !== undefined) {
                (_c = this.requestResolutions.get(m.id)) === null || _c === void 0 ? void 0 : _c(m);
            }
        });
        this.ws = ws;
        this.http = new WalletLinkHTTP_1.WalletLinkHTTP(linkAPIUrl, session.id, session.key);
    }
    /**
     * Make a connection to the server
     */ connect() {
        var _a;
        if (this.destroyed) {
            throw new Error('instance is destroyed');
        }
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.STARTED_CONNECTING, {
            sessionIdHash: Session_1.Session.hash(this.session.id)
        });
        this.ws.connect();
    }
    /**
     * Terminate connection, and mark as destroyed. To reconnect, create a new
     * instance of WalletSDKConnection
     */ destroy() {
        var _a;
        this.destroyed = true;
        this.ws.disconnect();
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.DISCONNECTED, {
            sessionIdHash: Session_1.Session.hash(this.session.id)
        });
        this.listener = undefined;
    }
    get isDestroyed() {
        return this.destroyed;
    }
    get connected() {
        return this._connected;
    }
    set connected(connected) {
        var _a, _b;
        this._connected = connected;
        if (connected) (_a = this.onceConnected) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.listener) === null || _b === void 0 ? void 0 : _b.connectedUpdated(connected);
    }
    setOnceConnected(callback) {
        return new Promise((resolve)=>{
            if (this.connected) {
                callback().then(resolve);
            } else {
                this.onceConnected = ()=>{
                    callback().then(resolve);
                    this.onceConnected = undefined;
                };
            }
        });
    }
    get linked() {
        return this._linked;
    }
    set linked(linked) {
        var _a, _b;
        this._linked = linked;
        if (linked) (_a = this.onceLinked) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.listener) === null || _b === void 0 ? void 0 : _b.linkedUpdated(linked);
    }
    setOnceLinked(callback) {
        return new Promise((resolve)=>{
            if (this.linked) {
                callback().then(resolve);
            } else {
                this.onceLinked = ()=>{
                    callback().then(resolve);
                    this.onceLinked = undefined;
                };
            }
        });
    }
    async handleIncomingEvent(m) {
        var _a, _b;
        if (m.type !== 'Event' || m.event !== 'Web3Response') {
            return;
        }
        try {
            const decryptedData = await this.cipher.decrypt(m.data);
            const message = JSON.parse(decryptedData);
            if (message.type !== 'WEB3_RESPONSE') return;
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.handleWeb3ResponseMessage(message);
        } catch (_c) {
            (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
                message: 'Had error decrypting',
                value: 'incomingEvent'
            });
        }
    }
    async checkUnseenEvents() {
        if (!this.connected) {
            this.shouldFetchUnseenEventsOnConnect = true;
            return;
        }
        await new Promise((resolve)=>setTimeout(resolve, 250));
        try {
            await this.fetchUnseenEventsAPI();
        } catch (e) {
            console.error('Unable to check for unseen events', e);
        }
    }
    async fetchUnseenEventsAPI() {
        this.shouldFetchUnseenEventsOnConnect = false;
        const responseEvents = await this.http.fetchUnseenEvents();
        responseEvents.forEach((e)=>this.handleIncomingEvent(e));
    }
    /**
     * Set session metadata in SessionConfig object
     * @param key
     * @param value
     * @returns a Promise that completes when successful
     */ async setSessionMetadata(key, value) {
        const message = {
            type: 'SetSessionConfig',
            id: (0, type_1.IntNumber)(this.nextReqId++),
            sessionId: this.session.id,
            metadata: {
                [key]: value
            }
        };
        return this.setOnceConnected(async ()=>{
            const res = await this.makeRequest(message);
            if (res.type === 'Fail') {
                throw new Error(res.error || 'failed to set session metadata');
            }
        });
    }
    /**
     * Publish an event and emit event ID when successful
     * @param event event name
     * @param unencryptedData unencrypted event data
     * @param callWebhook whether the webhook should be invoked
     * @returns a Promise that emits event ID when successful
     */ async publishEvent(event, unencryptedData, callWebhook = false) {
        const data = await this.cipher.encrypt(JSON.stringify(Object.assign(Object.assign({}, unencryptedData), {
            origin: location.origin,
            relaySource: window.coinbaseWalletExtension ? 'injected_sdk' : 'sdk'
        })));
        const message = {
            type: 'PublishEvent',
            id: (0, type_1.IntNumber)(this.nextReqId++),
            sessionId: this.session.id,
            event,
            data,
            callWebhook
        };
        return this.setOnceLinked(async ()=>{
            const res = await this.makeRequest(message);
            if (res.type === 'Fail') {
                throw new Error(res.error || 'failed to publish event');
            }
            return res.eventId;
        });
    }
    sendData(message) {
        this.ws.sendData(JSON.stringify(message));
    }
    updateLastHeartbeat() {
        this.lastHeartbeatResponse = Date.now();
    }
    heartbeat() {
        if (Date.now() - this.lastHeartbeatResponse > HEARTBEAT_INTERVAL * 2) {
            this.ws.disconnect();
            return;
        }
        try {
            this.ws.sendData('h');
        } catch (_a) {
        // noop
        }
    }
    async makeRequest(message, timeout = REQUEST_TIMEOUT) {
        const reqId = message.id;
        this.sendData(message);
        // await server message with corresponding id
        let timeoutId;
        return Promise.race([
            new Promise((_, reject)=>{
                timeoutId = window.setTimeout(()=>{
                    reject(new Error(`request ${reqId} timed out`));
                }, timeout);
            }),
            new Promise((resolve)=>{
                this.requestResolutions.set(reqId, (m)=>{
                    clearTimeout(timeoutId); // clear the timeout
                    resolve(m);
                    this.requestResolutions.delete(reqId);
                });
            })
        ]);
    }
    async authenticate() {
        const m = {
            type: 'HostSession',
            id: (0, type_1.IntNumber)(this.nextReqId++),
            sessionId: this.session.id,
            sessionKey: this.session.key
        };
        const res = await this.makeRequest(m);
        if (res.type === 'Fail') {
            throw new Error(res.error || 'failed to authentcate');
        }
    }
    sendIsLinked() {
        const m = {
            type: 'IsLinked',
            id: (0, type_1.IntNumber)(this.nextReqId++),
            sessionId: this.session.id
        };
        this.sendData(m);
    }
    sendGetSessionConfig() {
        const m = {
            type: 'GetSessionConfig',
            id: (0, type_1.IntNumber)(this.nextReqId++),
            sessionId: this.session.id
        };
        this.sendData(m);
    }
}
exports.WalletLinkConnection = WalletLinkConnection;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/lib/cssReset-css.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = (()=>`@namespace svg "http://www.w3.org/2000/svg";.-cbwsdk-css-reset,.-cbwsdk-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;counter-increment:none;counter-reset:none;direction:ltr;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;word-spacing:normal;z-index:auto}.-cbwsdk-css-reset strong{font-weight:bold}.-cbwsdk-css-reset *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-cbwsdk-css-reset [class*=container]{margin:0;padding:0}.-cbwsdk-css-reset style{display:none}`)();
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/lib/cssReset.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.injectCssReset = void 0;
const cssReset_css_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/lib/cssReset-css.js [app-client] (ecmascript)"));
function injectCssReset() {
    const styleEl = document.createElement('style');
    styleEl.type = 'text/css';
    styleEl.appendChild(document.createTextNode(cssReset_css_1.default));
    document.documentElement.appendChild(styleEl);
}
exports.injectCssReset = injectCssReset;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/CloseIcon.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CloseIcon = void 0;
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
function CloseIcon(props) {
    return (0, preact_1.h)("svg", Object.assign({
        width: "40",
        height: "40",
        viewBox: "0 0 40 40",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, props), (0, preact_1.h)("path", {
        d: "M13.7677 13L12.3535 14.4142L18.3535 20.4142L12.3535 26.4142L13.7677 27.8284L19.7677 21.8284L25.7677 27.8284L27.1819 26.4142L21.1819 20.4142L27.1819 14.4142L25.7677 13L19.7677 19L13.7677 13Z"
    }));
}
exports.CloseIcon = CloseIcon;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/CoinbaseWalletRound.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CoinbaseWalletRound = void 0;
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
function CoinbaseWalletRound(props) {
    return (0, preact_1.h)("svg", Object.assign({
        width: "28",
        height: "28",
        viewBox: "0 0 28 28",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, props), (0, preact_1.h)("circle", {
        cx: "14",
        cy: "14",
        r: "14",
        fill: "#0052FF"
    }), (0, preact_1.h)("path", {
        d: "M23.8521 14.0003C23.8521 19.455 19.455 23.8521 14.0003 23.8521C8.54559 23.8521 4.14844 19.455 4.14844 14.0003C4.14844 8.54559 8.54559 4.14844 14.0003 4.14844C19.455 4.14844 23.8521 8.54559 23.8521 14.0003Z",
        fill: "white"
    }), (0, preact_1.h)("path", {
        d: "M11.1855 12.5042C11.1855 12.0477 11.1855 11.7942 11.2835 11.642C11.3814 11.4899 11.4793 11.3377 11.6261 11.287C11.8219 11.1855 12.0178 11.1855 12.5073 11.1855H15.4934C15.983 11.1855 16.1788 11.1855 16.3746 11.287C16.5215 11.3884 16.6683 11.4899 16.7173 11.642C16.8152 11.8449 16.8152 12.0477 16.8152 12.5042V15.4965C16.8152 15.953 16.8152 16.2066 16.7173 16.3587C16.6194 16.5109 16.5215 16.663 16.3746 16.7137C16.1788 16.8152 15.983 16.8152 15.4934 16.8152H12.5073C12.0178 16.8152 11.8219 16.8152 11.6261 16.7137C11.4793 16.6123 11.3324 16.5109 11.2835 16.3587C11.1855 16.1558 11.1855 15.953 11.1855 15.4965V12.5042Z",
        fill: "#0052FF"
    }));
}
exports.CoinbaseWalletRound = CoinbaseWalletRound;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/QRCodeIcon.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QRCodeIcon = void 0;
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
function QRCodeIcon(props) {
    return (0, preact_1.h)("svg", Object.assign({
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
    }, props), (0, preact_1.h)("path", {
        d: "M3 3V8.99939L5 8.99996V5H9V3H3Z"
    }), (0, preact_1.h)("path", {
        d: "M15 21L21 21V15.0006L19 15V19L15 19V21Z"
    }), (0, preact_1.h)("path", {
        d: "M21 9H19V5H15.0006L15 3H21V9Z"
    }), (0, preact_1.h)("path", {
        d: "M3 15V21H8.99939L8.99996 19H5L5 15H3Z"
    }));
}
exports.QRCodeIcon = QRCodeIcon;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/vendor-js/qrcode-svg/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * @fileoverview
 * - modified davidshimjs/qrcodejs library for use in node.js
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 *
 * @version 0.9.1 (2016-02-12)
 * @author davidshimjs, papnkukn
 * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
 * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
 * @see <a href="https://github.com/davidshimjs/qrcodejs" target="_blank">https://github.com/davidshimjs/qrcodejs</a>
 */ //---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
    this.parsedData = [];
    // Added to support UTF-8 Characters
    for(var i = 0, l = this.data.length; i < l; i++){
        var byteArray = [];
        var code = this.data.charCodeAt(i);
        if (code > 0x10000) {
            byteArray[0] = 0xF0 | (code & 0x1C0000) >>> 18;
            byteArray[1] = 0x80 | (code & 0x3F000) >>> 12;
            byteArray[2] = 0x80 | (code & 0xFC0) >>> 6;
            byteArray[3] = 0x80 | code & 0x3F;
        } else if (code > 0x800) {
            byteArray[0] = 0xE0 | (code & 0xF000) >>> 12;
            byteArray[1] = 0x80 | (code & 0xFC0) >>> 6;
            byteArray[2] = 0x80 | code & 0x3F;
        } else if (code > 0x80) {
            byteArray[0] = 0xC0 | (code & 0x7C0) >>> 6;
            byteArray[1] = 0x80 | code & 0x3F;
        } else {
            byteArray[0] = code;
        }
        this.parsedData.push(byteArray);
    }
    this.parsedData = Array.prototype.concat.apply([], this.parsedData);
    if (this.parsedData.length != this.data.length) {
        this.parsedData.unshift(191);
        this.parsedData.unshift(187);
        this.parsedData.unshift(239);
    }
}
QR8bitByte.prototype = {
    getLength: function(buffer) {
        return this.parsedData.length;
    },
    write: function(buffer) {
        for(var i = 0, l = this.parsedData.length; i < l; i++){
            buffer.put(this.parsedData[i], 8);
        }
    }
};
function QRCodeModel(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = [];
}
QRCodeModel.prototype = {
    addData: function(data) {
        var newData = new QR8bitByte(data);
        this.dataList.push(newData);
        this.dataCache = null;
    },
    isDark: function(row, col) {
        if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
            throw new Error(row + "," + col);
        }
        return this.modules[row][col];
    },
    getModuleCount: function() {
        return this.moduleCount;
    },
    make: function() {
        this.makeImpl(false, this.getBestMaskPattern());
    },
    makeImpl: function(test, maskPattern) {
        this.moduleCount = this.typeNumber * 4 + 17;
        this.modules = new Array(this.moduleCount);
        for(var row = 0; row < this.moduleCount; row++){
            this.modules[row] = new Array(this.moduleCount);
            for(var col = 0; col < this.moduleCount; col++){
                this.modules[row][col] = null;
            }
        }
        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(test, maskPattern);
        if (this.typeNumber >= 7) {
            this.setupTypeNumber(test);
        }
        if (this.dataCache == null) {
            this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
        }
        this.mapData(this.dataCache, maskPattern);
    },
    setupPositionProbePattern: function(row, col) {
        for(var r = -1; r <= 7; r++){
            if (row + r <= -1 || this.moduleCount <= row + r) continue;
            for(var c = -1; c <= 7; c++){
                if (col + c <= -1 || this.moduleCount <= col + c) continue;
                if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
                    this.modules[row + r][col + c] = true;
                } else {
                    this.modules[row + r][col + c] = false;
                }
            }
        }
    },
    getBestMaskPattern: function() {
        var minLostPoint = 0;
        var pattern = 0;
        for(var i = 0; i < 8; i++){
            this.makeImpl(true, i);
            var lostPoint = QRUtil.getLostPoint(this);
            if (i == 0 || minLostPoint > lostPoint) {
                minLostPoint = lostPoint;
                pattern = i;
            }
        }
        return pattern;
    },
    createMovieClip: function(target_mc, instance_name, depth) {
        var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
        var cs = 1;
        this.make();
        for(var row = 0; row < this.modules.length; row++){
            var y = row * cs;
            for(var col = 0; col < this.modules[row].length; col++){
                var x = col * cs;
                var dark = this.modules[row][col];
                if (dark) {
                    qr_mc.beginFill(0, 100);
                    qr_mc.moveTo(x, y);
                    qr_mc.lineTo(x + cs, y);
                    qr_mc.lineTo(x + cs, y + cs);
                    qr_mc.lineTo(x, y + cs);
                    qr_mc.endFill();
                }
            }
        }
        return qr_mc;
    },
    setupTimingPattern: function() {
        for(var r = 8; r < this.moduleCount - 8; r++){
            if (this.modules[r][6] != null) {
                continue;
            }
            this.modules[r][6] = r % 2 == 0;
        }
        for(var c = 8; c < this.moduleCount - 8; c++){
            if (this.modules[6][c] != null) {
                continue;
            }
            this.modules[6][c] = c % 2 == 0;
        }
    },
    setupPositionAdjustPattern: function() {
        var pos = QRUtil.getPatternPosition(this.typeNumber);
        for(var i = 0; i < pos.length; i++){
            for(var j = 0; j < pos.length; j++){
                var row = pos[i];
                var col = pos[j];
                if (this.modules[row][col] != null) {
                    continue;
                }
                for(var r = -2; r <= 2; r++){
                    for(var c = -2; c <= 2; c++){
                        if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                            this.modules[row + r][col + c] = true;
                        } else {
                            this.modules[row + r][col + c] = false;
                        }
                    }
                }
            }
        }
    },
    setupTypeNumber: function(test) {
        var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        for(var i = 0; i < 18; i++){
            var mod = !test && (bits >> i & 1) == 1;
            this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
        }
        for(var i = 0; i < 18; i++){
            var mod = !test && (bits >> i & 1) == 1;
            this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
        }
    },
    setupTypeInfo: function(test, maskPattern) {
        var data = this.errorCorrectLevel << 3 | maskPattern;
        var bits = QRUtil.getBCHTypeInfo(data);
        for(var i = 0; i < 15; i++){
            var mod = !test && (bits >> i & 1) == 1;
            if (i < 6) {
                this.modules[i][8] = mod;
            } else if (i < 8) {
                this.modules[i + 1][8] = mod;
            } else {
                this.modules[this.moduleCount - 15 + i][8] = mod;
            }
        }
        for(var i = 0; i < 15; i++){
            var mod = !test && (bits >> i & 1) == 1;
            if (i < 8) {
                this.modules[8][this.moduleCount - i - 1] = mod;
            } else if (i < 9) {
                this.modules[8][15 - i - 1 + 1] = mod;
            } else {
                this.modules[8][15 - i - 1] = mod;
            }
        }
        this.modules[this.moduleCount - 8][8] = !test;
    },
    mapData: function(data, maskPattern) {
        var inc = -1;
        var row = this.moduleCount - 1;
        var bitIndex = 7;
        var byteIndex = 0;
        for(var col = this.moduleCount - 1; col > 0; col -= 2){
            if (col == 6) col--;
            while(true){
                for(var c = 0; c < 2; c++){
                    if (this.modules[row][col - c] == null) {
                        var dark = false;
                        if (byteIndex < data.length) {
                            dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                        }
                        var mask = QRUtil.getMask(maskPattern, row, col - c);
                        if (mask) {
                            dark = !dark;
                        }
                        this.modules[row][col - c] = dark;
                        bitIndex--;
                        if (bitIndex == -1) {
                            byteIndex++;
                            bitIndex = 7;
                        }
                    }
                }
                row += inc;
                if (row < 0 || this.moduleCount <= row) {
                    row -= inc;
                    inc = -inc;
                    break;
                }
            }
        }
    }
};
QRCodeModel.PAD0 = 0xEC;
QRCodeModel.PAD1 = 0x11;
QRCodeModel.createData = function(typeNumber, errorCorrectLevel, dataList) {
    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
    var buffer = new QRBitBuffer();
    for(var i = 0; i < dataList.length; i++){
        var data = dataList[i];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
        data.write(buffer);
    }
    var totalDataCount = 0;
    for(var i = 0; i < rsBlocks.length; i++){
        totalDataCount += rsBlocks[i].dataCount;
    }
    if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
    }
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
    }
    while(buffer.getLengthInBits() % 8 != 0){
        buffer.putBit(false);
    }
    while(true){
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
        }
        buffer.put(QRCodeModel.PAD0, 8);
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
        }
        buffer.put(QRCodeModel.PAD1, 8);
    }
    return QRCodeModel.createBytes(buffer, rsBlocks);
};
QRCodeModel.createBytes = function(buffer, rsBlocks) {
    var offset = 0;
    var maxDcCount = 0;
    var maxEcCount = 0;
    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);
    for(var r = 0; r < rsBlocks.length; r++){
        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for(var i = 0; i < dcdata[r].length; i++){
            dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        }
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for(var i = 0; i < ecdata[r].length; i++){
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
            ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
    }
    var totalCodeCount = 0;
    for(var i = 0; i < rsBlocks.length; i++){
        totalCodeCount += rsBlocks[i].totalCount;
    }
    var data = new Array(totalCodeCount);
    var index = 0;
    for(var i = 0; i < maxDcCount; i++){
        for(var r = 0; r < rsBlocks.length; r++){
            if (i < dcdata[r].length) {
                data[index++] = dcdata[r][i];
            }
        }
    }
    for(var i = 0; i < maxEcCount; i++){
        for(var r = 0; r < rsBlocks.length; r++){
            if (i < ecdata[r].length) {
                data[index++] = ecdata[r][i];
            }
        }
    }
    return data;
};
var QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3
};
var QRErrorCorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
};
var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
};
var QRUtil = {
    PATTERN_POSITION_TABLE: [
        [],
        [
            6,
            18
        ],
        [
            6,
            22
        ],
        [
            6,
            26
        ],
        [
            6,
            30
        ],
        [
            6,
            34
        ],
        [
            6,
            22,
            38
        ],
        [
            6,
            24,
            42
        ],
        [
            6,
            26,
            46
        ],
        [
            6,
            28,
            50
        ],
        [
            6,
            30,
            54
        ],
        [
            6,
            32,
            58
        ],
        [
            6,
            34,
            62
        ],
        [
            6,
            26,
            46,
            66
        ],
        [
            6,
            26,
            48,
            70
        ],
        [
            6,
            26,
            50,
            74
        ],
        [
            6,
            30,
            54,
            78
        ],
        [
            6,
            30,
            56,
            82
        ],
        [
            6,
            30,
            58,
            86
        ],
        [
            6,
            34,
            62,
            90
        ],
        [
            6,
            28,
            50,
            72,
            94
        ],
        [
            6,
            26,
            50,
            74,
            98
        ],
        [
            6,
            30,
            54,
            78,
            102
        ],
        [
            6,
            28,
            54,
            80,
            106
        ],
        [
            6,
            32,
            58,
            84,
            110
        ],
        [
            6,
            30,
            58,
            86,
            114
        ],
        [
            6,
            34,
            62,
            90,
            118
        ],
        [
            6,
            26,
            50,
            74,
            98,
            122
        ],
        [
            6,
            30,
            54,
            78,
            102,
            126
        ],
        [
            6,
            26,
            52,
            78,
            104,
            130
        ],
        [
            6,
            30,
            56,
            82,
            108,
            134
        ],
        [
            6,
            34,
            60,
            86,
            112,
            138
        ],
        [
            6,
            30,
            58,
            86,
            114,
            142
        ],
        [
            6,
            34,
            62,
            90,
            118,
            146
        ],
        [
            6,
            30,
            54,
            78,
            102,
            126,
            150
        ],
        [
            6,
            24,
            50,
            76,
            102,
            128,
            154
        ],
        [
            6,
            28,
            54,
            80,
            106,
            132,
            158
        ],
        [
            6,
            32,
            58,
            84,
            110,
            136,
            162
        ],
        [
            6,
            26,
            54,
            82,
            110,
            138,
            166
        ],
        [
            6,
            30,
            58,
            86,
            114,
            142,
            170
        ]
    ],
    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
    getBCHTypeInfo: function(data) {
        var d = data << 10;
        while(QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0){
            d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
        }
        return (data << 10 | d) ^ QRUtil.G15_MASK;
    },
    getBCHTypeNumber: function(data) {
        var d = data << 12;
        while(QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0){
            d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
        }
        return data << 12 | d;
    },
    getBCHDigit: function(data) {
        var digit = 0;
        while(data != 0){
            digit++;
            data >>>= 1;
        }
        return digit;
    },
    getPatternPosition: function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },
    getMask: function(maskPattern, i, j) {
        switch(maskPattern){
            case QRMaskPattern.PATTERN000:
                return (i + j) % 2 == 0;
            case QRMaskPattern.PATTERN001:
                return i % 2 == 0;
            case QRMaskPattern.PATTERN010:
                return j % 3 == 0;
            case QRMaskPattern.PATTERN011:
                return (i + j) % 3 == 0;
            case QRMaskPattern.PATTERN100:
                return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
            case QRMaskPattern.PATTERN101:
                return i * j % 2 + i * j % 3 == 0;
            case QRMaskPattern.PATTERN110:
                return (i * j % 2 + i * j % 3) % 2 == 0;
            case QRMaskPattern.PATTERN111:
                return (i * j % 3 + (i + j) % 2) % 2 == 0;
            default:
                throw new Error("bad maskPattern:" + maskPattern);
        }
    },
    getErrorCorrectPolynomial: function(errorCorrectLength) {
        var a = new QRPolynomial([
            1
        ], 0);
        for(var i = 0; i < errorCorrectLength; i++){
            a = a.multiply(new QRPolynomial([
                1,
                QRMath.gexp(i)
            ], 0));
        }
        return a;
    },
    getLengthInBits: function(mode, type) {
        if (1 <= type && type < 10) {
            switch(mode){
                case QRMode.MODE_NUMBER:
                    return 10;
                case QRMode.MODE_ALPHA_NUM:
                    return 9;
                case QRMode.MODE_8BIT_BYTE:
                    return 8;
                case QRMode.MODE_KANJI:
                    return 8;
                default:
                    throw new Error("mode:" + mode);
            }
        } else if (type < 27) {
            switch(mode){
                case QRMode.MODE_NUMBER:
                    return 12;
                case QRMode.MODE_ALPHA_NUM:
                    return 11;
                case QRMode.MODE_8BIT_BYTE:
                    return 16;
                case QRMode.MODE_KANJI:
                    return 10;
                default:
                    throw new Error("mode:" + mode);
            }
        } else if (type < 41) {
            switch(mode){
                case QRMode.MODE_NUMBER:
                    return 14;
                case QRMode.MODE_ALPHA_NUM:
                    return 13;
                case QRMode.MODE_8BIT_BYTE:
                    return 16;
                case QRMode.MODE_KANJI:
                    return 12;
                default:
                    throw new Error("mode:" + mode);
            }
        } else {
            throw new Error("type:" + type);
        }
    },
    getLostPoint: function(qrCode) {
        var moduleCount = qrCode.getModuleCount();
        var lostPoint = 0;
        for(var row = 0; row < moduleCount; row++){
            for(var col = 0; col < moduleCount; col++){
                var sameCount = 0;
                var dark = qrCode.isDark(row, col);
                for(var r = -1; r <= 1; r++){
                    if (row + r < 0 || moduleCount <= row + r) {
                        continue;
                    }
                    for(var c = -1; c <= 1; c++){
                        if (col + c < 0 || moduleCount <= col + c) {
                            continue;
                        }
                        if (r == 0 && c == 0) {
                            continue;
                        }
                        if (dark == qrCode.isDark(row + r, col + c)) {
                            sameCount++;
                        }
                    }
                }
                if (sameCount > 5) {
                    lostPoint += 3 + sameCount - 5;
                }
            }
        }
        for(var row = 0; row < moduleCount - 1; row++){
            for(var col = 0; col < moduleCount - 1; col++){
                var count = 0;
                if (qrCode.isDark(row, col)) count++;
                if (qrCode.isDark(row + 1, col)) count++;
                if (qrCode.isDark(row, col + 1)) count++;
                if (qrCode.isDark(row + 1, col + 1)) count++;
                if (count == 0 || count == 4) {
                    lostPoint += 3;
                }
            }
        }
        for(var row = 0; row < moduleCount; row++){
            for(var col = 0; col < moduleCount - 6; col++){
                if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
                    lostPoint += 40;
                }
            }
        }
        for(var col = 0; col < moduleCount; col++){
            for(var row = 0; row < moduleCount - 6; row++){
                if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
                    lostPoint += 40;
                }
            }
        }
        var darkCount = 0;
        for(var col = 0; col < moduleCount; col++){
            for(var row = 0; row < moduleCount; row++){
                if (qrCode.isDark(row, col)) {
                    darkCount++;
                }
            }
        }
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;
        return lostPoint;
    }
};
var QRMath = {
    glog: function(n) {
        if (n < 1) {
            throw new Error("glog(" + n + ")");
        }
        return QRMath.LOG_TABLE[n];
    },
    gexp: function(n) {
        while(n < 0){
            n += 255;
        }
        while(n >= 256){
            n -= 255;
        }
        return QRMath.EXP_TABLE[n];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256)
};
for(var i = 0; i < 8; i++){
    QRMath.EXP_TABLE[i] = 1 << i;
}
for(var i = 8; i < 256; i++){
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}
for(var i = 0; i < 255; i++){
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}
function QRPolynomial(num, shift) {
    if (num.length == undefined) {
        throw new Error(num.length + "/" + shift);
    }
    var offset = 0;
    while(offset < num.length && num[offset] == 0){
        offset++;
    }
    this.num = new Array(num.length - offset + shift);
    for(var i = 0; i < num.length - offset; i++){
        this.num[i] = num[i + offset];
    }
}
QRPolynomial.prototype = {
    get: function(index) {
        return this.num[index];
    },
    getLength: function() {
        return this.num.length;
    },
    multiply: function(e) {
        var num = new Array(this.getLength() + e.getLength() - 1);
        for(var i = 0; i < this.getLength(); i++){
            for(var j = 0; j < e.getLength(); j++){
                num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
            }
        }
        return new QRPolynomial(num, 0);
    },
    mod: function(e) {
        if (this.getLength() - e.getLength() < 0) {
            return this;
        }
        var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
        var num = new Array(this.getLength());
        for(var i = 0; i < this.getLength(); i++){
            num[i] = this.get(i);
        }
        for(var i = 0; i < e.getLength(); i++){
            num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        }
        return new QRPolynomial(num, 0).mod(e);
    }
};
function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
}
QRRSBlock.RS_BLOCK_TABLE = [
    [
        1,
        26,
        19
    ],
    [
        1,
        26,
        16
    ],
    [
        1,
        26,
        13
    ],
    [
        1,
        26,
        9
    ],
    [
        1,
        44,
        34
    ],
    [
        1,
        44,
        28
    ],
    [
        1,
        44,
        22
    ],
    [
        1,
        44,
        16
    ],
    [
        1,
        70,
        55
    ],
    [
        1,
        70,
        44
    ],
    [
        2,
        35,
        17
    ],
    [
        2,
        35,
        13
    ],
    [
        1,
        100,
        80
    ],
    [
        2,
        50,
        32
    ],
    [
        2,
        50,
        24
    ],
    [
        4,
        25,
        9
    ],
    [
        1,
        134,
        108
    ],
    [
        2,
        67,
        43
    ],
    [
        2,
        33,
        15,
        2,
        34,
        16
    ],
    [
        2,
        33,
        11,
        2,
        34,
        12
    ],
    [
        2,
        86,
        68
    ],
    [
        4,
        43,
        27
    ],
    [
        4,
        43,
        19
    ],
    [
        4,
        43,
        15
    ],
    [
        2,
        98,
        78
    ],
    [
        4,
        49,
        31
    ],
    [
        2,
        32,
        14,
        4,
        33,
        15
    ],
    [
        4,
        39,
        13,
        1,
        40,
        14
    ],
    [
        2,
        121,
        97
    ],
    [
        2,
        60,
        38,
        2,
        61,
        39
    ],
    [
        4,
        40,
        18,
        2,
        41,
        19
    ],
    [
        4,
        40,
        14,
        2,
        41,
        15
    ],
    [
        2,
        146,
        116
    ],
    [
        3,
        58,
        36,
        2,
        59,
        37
    ],
    [
        4,
        36,
        16,
        4,
        37,
        17
    ],
    [
        4,
        36,
        12,
        4,
        37,
        13
    ],
    [
        2,
        86,
        68,
        2,
        87,
        69
    ],
    [
        4,
        69,
        43,
        1,
        70,
        44
    ],
    [
        6,
        43,
        19,
        2,
        44,
        20
    ],
    [
        6,
        43,
        15,
        2,
        44,
        16
    ],
    [
        4,
        101,
        81
    ],
    [
        1,
        80,
        50,
        4,
        81,
        51
    ],
    [
        4,
        50,
        22,
        4,
        51,
        23
    ],
    [
        3,
        36,
        12,
        8,
        37,
        13
    ],
    [
        2,
        116,
        92,
        2,
        117,
        93
    ],
    [
        6,
        58,
        36,
        2,
        59,
        37
    ],
    [
        4,
        46,
        20,
        6,
        47,
        21
    ],
    [
        7,
        42,
        14,
        4,
        43,
        15
    ],
    [
        4,
        133,
        107
    ],
    [
        8,
        59,
        37,
        1,
        60,
        38
    ],
    [
        8,
        44,
        20,
        4,
        45,
        21
    ],
    [
        12,
        33,
        11,
        4,
        34,
        12
    ],
    [
        3,
        145,
        115,
        1,
        146,
        116
    ],
    [
        4,
        64,
        40,
        5,
        65,
        41
    ],
    [
        11,
        36,
        16,
        5,
        37,
        17
    ],
    [
        11,
        36,
        12,
        5,
        37,
        13
    ],
    [
        5,
        109,
        87,
        1,
        110,
        88
    ],
    [
        5,
        65,
        41,
        5,
        66,
        42
    ],
    [
        5,
        54,
        24,
        7,
        55,
        25
    ],
    [
        11,
        36,
        12
    ],
    [
        5,
        122,
        98,
        1,
        123,
        99
    ],
    [
        7,
        73,
        45,
        3,
        74,
        46
    ],
    [
        15,
        43,
        19,
        2,
        44,
        20
    ],
    [
        3,
        45,
        15,
        13,
        46,
        16
    ],
    [
        1,
        135,
        107,
        5,
        136,
        108
    ],
    [
        10,
        74,
        46,
        1,
        75,
        47
    ],
    [
        1,
        50,
        22,
        15,
        51,
        23
    ],
    [
        2,
        42,
        14,
        17,
        43,
        15
    ],
    [
        5,
        150,
        120,
        1,
        151,
        121
    ],
    [
        9,
        69,
        43,
        4,
        70,
        44
    ],
    [
        17,
        50,
        22,
        1,
        51,
        23
    ],
    [
        2,
        42,
        14,
        19,
        43,
        15
    ],
    [
        3,
        141,
        113,
        4,
        142,
        114
    ],
    [
        3,
        70,
        44,
        11,
        71,
        45
    ],
    [
        17,
        47,
        21,
        4,
        48,
        22
    ],
    [
        9,
        39,
        13,
        16,
        40,
        14
    ],
    [
        3,
        135,
        107,
        5,
        136,
        108
    ],
    [
        3,
        67,
        41,
        13,
        68,
        42
    ],
    [
        15,
        54,
        24,
        5,
        55,
        25
    ],
    [
        15,
        43,
        15,
        10,
        44,
        16
    ],
    [
        4,
        144,
        116,
        4,
        145,
        117
    ],
    [
        17,
        68,
        42
    ],
    [
        17,
        50,
        22,
        6,
        51,
        23
    ],
    [
        19,
        46,
        16,
        6,
        47,
        17
    ],
    [
        2,
        139,
        111,
        7,
        140,
        112
    ],
    [
        17,
        74,
        46
    ],
    [
        7,
        54,
        24,
        16,
        55,
        25
    ],
    [
        34,
        37,
        13
    ],
    [
        4,
        151,
        121,
        5,
        152,
        122
    ],
    [
        4,
        75,
        47,
        14,
        76,
        48
    ],
    [
        11,
        54,
        24,
        14,
        55,
        25
    ],
    [
        16,
        45,
        15,
        14,
        46,
        16
    ],
    [
        6,
        147,
        117,
        4,
        148,
        118
    ],
    [
        6,
        73,
        45,
        14,
        74,
        46
    ],
    [
        11,
        54,
        24,
        16,
        55,
        25
    ],
    [
        30,
        46,
        16,
        2,
        47,
        17
    ],
    [
        8,
        132,
        106,
        4,
        133,
        107
    ],
    [
        8,
        75,
        47,
        13,
        76,
        48
    ],
    [
        7,
        54,
        24,
        22,
        55,
        25
    ],
    [
        22,
        45,
        15,
        13,
        46,
        16
    ],
    [
        10,
        142,
        114,
        2,
        143,
        115
    ],
    [
        19,
        74,
        46,
        4,
        75,
        47
    ],
    [
        28,
        50,
        22,
        6,
        51,
        23
    ],
    [
        33,
        46,
        16,
        4,
        47,
        17
    ],
    [
        8,
        152,
        122,
        4,
        153,
        123
    ],
    [
        22,
        73,
        45,
        3,
        74,
        46
    ],
    [
        8,
        53,
        23,
        26,
        54,
        24
    ],
    [
        12,
        45,
        15,
        28,
        46,
        16
    ],
    [
        3,
        147,
        117,
        10,
        148,
        118
    ],
    [
        3,
        73,
        45,
        23,
        74,
        46
    ],
    [
        4,
        54,
        24,
        31,
        55,
        25
    ],
    [
        11,
        45,
        15,
        31,
        46,
        16
    ],
    [
        7,
        146,
        116,
        7,
        147,
        117
    ],
    [
        21,
        73,
        45,
        7,
        74,
        46
    ],
    [
        1,
        53,
        23,
        37,
        54,
        24
    ],
    [
        19,
        45,
        15,
        26,
        46,
        16
    ],
    [
        5,
        145,
        115,
        10,
        146,
        116
    ],
    [
        19,
        75,
        47,
        10,
        76,
        48
    ],
    [
        15,
        54,
        24,
        25,
        55,
        25
    ],
    [
        23,
        45,
        15,
        25,
        46,
        16
    ],
    [
        13,
        145,
        115,
        3,
        146,
        116
    ],
    [
        2,
        74,
        46,
        29,
        75,
        47
    ],
    [
        42,
        54,
        24,
        1,
        55,
        25
    ],
    [
        23,
        45,
        15,
        28,
        46,
        16
    ],
    [
        17,
        145,
        115
    ],
    [
        10,
        74,
        46,
        23,
        75,
        47
    ],
    [
        10,
        54,
        24,
        35,
        55,
        25
    ],
    [
        19,
        45,
        15,
        35,
        46,
        16
    ],
    [
        17,
        145,
        115,
        1,
        146,
        116
    ],
    [
        14,
        74,
        46,
        21,
        75,
        47
    ],
    [
        29,
        54,
        24,
        19,
        55,
        25
    ],
    [
        11,
        45,
        15,
        46,
        46,
        16
    ],
    [
        13,
        145,
        115,
        6,
        146,
        116
    ],
    [
        14,
        74,
        46,
        23,
        75,
        47
    ],
    [
        44,
        54,
        24,
        7,
        55,
        25
    ],
    [
        59,
        46,
        16,
        1,
        47,
        17
    ],
    [
        12,
        151,
        121,
        7,
        152,
        122
    ],
    [
        12,
        75,
        47,
        26,
        76,
        48
    ],
    [
        39,
        54,
        24,
        14,
        55,
        25
    ],
    [
        22,
        45,
        15,
        41,
        46,
        16
    ],
    [
        6,
        151,
        121,
        14,
        152,
        122
    ],
    [
        6,
        75,
        47,
        34,
        76,
        48
    ],
    [
        46,
        54,
        24,
        10,
        55,
        25
    ],
    [
        2,
        45,
        15,
        64,
        46,
        16
    ],
    [
        17,
        152,
        122,
        4,
        153,
        123
    ],
    [
        29,
        74,
        46,
        14,
        75,
        47
    ],
    [
        49,
        54,
        24,
        10,
        55,
        25
    ],
    [
        24,
        45,
        15,
        46,
        46,
        16
    ],
    [
        4,
        152,
        122,
        18,
        153,
        123
    ],
    [
        13,
        74,
        46,
        32,
        75,
        47
    ],
    [
        48,
        54,
        24,
        14,
        55,
        25
    ],
    [
        42,
        45,
        15,
        32,
        46,
        16
    ],
    [
        20,
        147,
        117,
        4,
        148,
        118
    ],
    [
        40,
        75,
        47,
        7,
        76,
        48
    ],
    [
        43,
        54,
        24,
        22,
        55,
        25
    ],
    [
        10,
        45,
        15,
        67,
        46,
        16
    ],
    [
        19,
        148,
        118,
        6,
        149,
        119
    ],
    [
        18,
        75,
        47,
        31,
        76,
        48
    ],
    [
        34,
        54,
        24,
        34,
        55,
        25
    ],
    [
        20,
        45,
        15,
        61,
        46,
        16
    ]
];
QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
    if (rsBlock == undefined) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }
    var length = rsBlock.length / 3;
    var list = [];
    for(var i = 0; i < length; i++){
        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];
        for(var j = 0; j < count; j++){
            list.push(new QRRSBlock(totalCount, dataCount));
        }
    }
    return list;
};
QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
    switch(errorCorrectLevel){
        case QRErrorCorrectLevel.L:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case QRErrorCorrectLevel.M:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case QRErrorCorrectLevel.Q:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case QRErrorCorrectLevel.H:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default:
            return undefined;
    }
};
function QRBitBuffer() {
    this.buffer = [];
    this.length = 0;
}
QRBitBuffer.prototype = {
    get: function(index) {
        var bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    },
    put: function(num, length) {
        for(var i = 0; i < length; i++){
            this.putBit((num >>> length - i - 1 & 1) == 1);
        }
    },
    getLengthInBits: function() {
        return this.length;
    },
    putBit: function(bit) {
        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
        }
        if (bit) {
            this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
        }
        this.length++;
    }
};
var QRCodeLimitLength = [
    [
        17,
        14,
        11,
        7
    ],
    [
        32,
        26,
        20,
        14
    ],
    [
        53,
        42,
        32,
        24
    ],
    [
        78,
        62,
        46,
        34
    ],
    [
        106,
        84,
        60,
        44
    ],
    [
        134,
        106,
        74,
        58
    ],
    [
        154,
        122,
        86,
        64
    ],
    [
        192,
        152,
        108,
        84
    ],
    [
        230,
        180,
        130,
        98
    ],
    [
        271,
        213,
        151,
        119
    ],
    [
        321,
        251,
        177,
        137
    ],
    [
        367,
        287,
        203,
        155
    ],
    [
        425,
        331,
        241,
        177
    ],
    [
        458,
        362,
        258,
        194
    ],
    [
        520,
        412,
        292,
        220
    ],
    [
        586,
        450,
        322,
        250
    ],
    [
        644,
        504,
        364,
        280
    ],
    [
        718,
        560,
        394,
        310
    ],
    [
        792,
        624,
        442,
        338
    ],
    [
        858,
        666,
        482,
        382
    ],
    [
        929,
        711,
        509,
        403
    ],
    [
        1003,
        779,
        565,
        439
    ],
    [
        1091,
        857,
        611,
        461
    ],
    [
        1171,
        911,
        661,
        511
    ],
    [
        1273,
        997,
        715,
        535
    ],
    [
        1367,
        1059,
        751,
        593
    ],
    [
        1465,
        1125,
        805,
        625
    ],
    [
        1528,
        1190,
        868,
        658
    ],
    [
        1628,
        1264,
        908,
        698
    ],
    [
        1732,
        1370,
        982,
        742
    ],
    [
        1840,
        1452,
        1030,
        790
    ],
    [
        1952,
        1538,
        1112,
        842
    ],
    [
        2068,
        1628,
        1168,
        898
    ],
    [
        2188,
        1722,
        1228,
        958
    ],
    [
        2303,
        1809,
        1283,
        983
    ],
    [
        2431,
        1911,
        1351,
        1051
    ],
    [
        2563,
        1989,
        1423,
        1093
    ],
    [
        2699,
        2099,
        1499,
        1139
    ],
    [
        2809,
        2213,
        1579,
        1219
    ],
    [
        2953,
        2331,
        1663,
        1273
    ]
];
/** Constructor */ function QRCode(options) {
    var instance = this;
    //Default options
    this.options = {
        padding: 4,
        width: 256,
        height: 256,
        typeNumber: 4,
        color: "#000000",
        background: "#ffffff",
        ecl: "M",
        image: {
            svg: "",
            width: 0,
            height: 0
        }
    };
    //In case the options is string
    if (typeof options === 'string') {
        options = {
            content: options
        };
    }
    //Merge options
    if (options) {
        for(var i in options){
            this.options[i] = options[i];
        }
    }
    if (typeof this.options.content !== 'string') {
        throw new Error("Expected 'content' as string!");
    }
    if (this.options.content.length === 0 /* || this.options.content.length > 7089 */ ) {
        throw new Error("Expected 'content' to be non-empty!");
    }
    if (!(this.options.padding >= 0)) {
        throw new Error("Expected 'padding' value to be non-negative!");
    }
    if (!(this.options.width > 0) || !(this.options.height > 0)) {
        throw new Error("Expected 'width' or 'height' value to be higher than zero!");
    }
    //Gets the error correction level
    function _getErrorCorrectLevel(ecl) {
        switch(ecl){
            case "L":
                return QRErrorCorrectLevel.L;
            case "M":
                return QRErrorCorrectLevel.M;
            case "Q":
                return QRErrorCorrectLevel.Q;
            case "H":
                return QRErrorCorrectLevel.H;
            default:
                throw new Error("Unknwon error correction level: " + ecl);
        }
    }
    //Get type number
    function _getTypeNumber(content, ecl) {
        var length = _getUTF8Length(content);
        var type = 1;
        var limit = 0;
        for(var i = 0, len = QRCodeLimitLength.length; i <= len; i++){
            var table = QRCodeLimitLength[i];
            if (!table) {
                throw new Error("Content too long: expected " + limit + " but got " + length);
            }
            switch(ecl){
                case "L":
                    limit = table[0];
                    break;
                case "M":
                    limit = table[1];
                    break;
                case "Q":
                    limit = table[2];
                    break;
                case "H":
                    limit = table[3];
                    break;
                default:
                    throw new Error("Unknwon error correction level: " + ecl);
            }
            if (length <= limit) {
                break;
            }
            type++;
        }
        if (type > QRCodeLimitLength.length) {
            throw new Error("Content too long");
        }
        return type;
    }
    //Gets text length
    function _getUTF8Length(content) {
        var result = encodeURI(content).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
        return result.length + (result.length != content ? 3 : 0);
    }
    //Generate QR Code matrix
    var content = this.options.content;
    var type = _getTypeNumber(content, this.options.ecl);
    var ecl = _getErrorCorrectLevel(this.options.ecl);
    this.qrcode = new QRCodeModel(type, ecl);
    this.qrcode.addData(content);
    this.qrcode.make();
}
/** Generates QR Code as SVG image */ QRCode.prototype.svg = function(opt) {
    var options = this.options || {};
    var modules = this.qrcode.modules;
    if (typeof opt == "undefined") {
        opt = {
            container: options.container || "svg"
        };
    }
    //Apply new lines and indents in SVG?
    var pretty = typeof options.pretty != "undefined" ? !!options.pretty : true;
    var indent = pretty ? '  ' : '';
    var EOL = pretty ? '\r\n' : '';
    var width = options.width;
    var height = options.height;
    var length = modules.length;
    var xsize = width / (length + 2 * options.padding);
    var ysize = height / (length + 2 * options.padding);
    //Join (union, merge) rectangles into one shape?
    var join = typeof options.join != "undefined" ? !!options.join : false;
    //Swap the X and Y modules, pull request #2
    var swap = typeof options.swap != "undefined" ? !!options.swap : false;
    //Apply <?xml...?> declaration in SVG?
    var xmlDeclaration = typeof options.xmlDeclaration != "undefined" ? !!options.xmlDeclaration : true;
    //Populate with predefined shape instead of "rect" elements, thanks to @kkocdko
    var predefined = typeof options.predefined != "undefined" ? !!options.predefined : false;
    var defs = predefined ? indent + '<defs><path id="qrmodule" d="M0 0 h' + ysize + ' v' + xsize + ' H0 z" style="fill:' + options.color + ';shape-rendering:crispEdges;" /></defs>' + EOL : '';
    //Background rectangle
    var bgrect = indent + '<rect x="0" y="0" width="' + width + '" height="' + height + '" style="fill:' + options.background + ';shape-rendering:crispEdges;"/>' + EOL;
    //Rectangles representing modules
    var modrect = '';
    var pathdata = '';
    for(var y = 0; y < length; y++){
        for(var x = 0; x < length; x++){
            var module1 = modules[x][y];
            if (module1) {
                var px = x * xsize + options.padding * xsize;
                var py = y * ysize + options.padding * ysize;
                //Some users have had issues with the QR Code, thanks to @danioso for the solution
                if (swap) {
                    var t = px;
                    px = py;
                    py = t;
                }
                if (join) {
                    //Module as a part of svg path data, thanks to @danioso
                    var w = xsize + px;
                    var h = ysize + py;
                    px = Number.isInteger(px) ? Number(px) : px.toFixed(2);
                    py = Number.isInteger(py) ? Number(py) : py.toFixed(2);
                    w = Number.isInteger(w) ? Number(w) : w.toFixed(2);
                    h = Number.isInteger(h) ? Number(h) : h.toFixed(2);
                    pathdata += 'M' + px + ',' + py + ' V' + h + ' H' + w + ' V' + py + ' H' + px + ' Z ';
                } else if (predefined) {
                    //Module as a predefined shape, thanks to @kkocdko
                    modrect += indent + '<use x="' + px.toString() + '" y="' + py.toString() + '" href="#qrmodule" />' + EOL;
                } else {
                    //Module as rectangle element
                    modrect += indent + '<rect x="' + px.toString() + '" y="' + py.toString() + '" width="' + xsize + '" height="' + ysize + '" style="fill:' + options.color + ';shape-rendering:crispEdges;"/>' + EOL;
                }
            }
        }
    }
    if (join) {
        modrect = indent + '<path x="0" y="0" style="fill:' + options.color + ';shape-rendering:crispEdges;" d="' + pathdata + '" />';
    }
    let imgSvg = "";
    if (this.options.image !== undefined && this.options.image.svg) {
        const imgWidth = width * this.options.image.width / 100;
        const imgHeight = height * this.options.image.height / 100;
        const imgX = width / 2 - imgWidth / 2;
        const imgY = height / 2 - imgHeight / 2;
        imgSvg += `<svg x="${imgX}" y="${imgY}" width="${imgWidth}" height="${imgHeight}" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">`;
        imgSvg += this.options.image.svg + EOL;
        imgSvg += '</svg>';
    }
    var svg = "";
    switch(opt.container){
        //Wrapped in SVG document
        case "svg":
            if (xmlDeclaration) {
                svg += '<?xml version="1.0" standalone="yes"?>' + EOL;
            }
            svg += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + width + '" height="' + height + '">' + EOL;
            svg += defs + bgrect + modrect;
            svg += imgSvg;
            svg += '</svg>';
            break;
        //Viewbox for responsive use in a browser, thanks to @danioso
        case "svg-viewbox":
            if (xmlDeclaration) {
                svg += '<?xml version="1.0" standalone="yes"?>' + EOL;
            }
            svg += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' + width + ' ' + height + '">' + EOL;
            svg += defs + bgrect + modrect;
            svg += imgSvg;
            svg += '</svg>';
            break;
        //Wrapped in group element
        case "g":
            svg += '<g width="' + width + '" height="' + height + '">' + EOL;
            svg += defs + bgrect + modrect;
            svg += imgSvg;
            svg += '</g>';
            break;
        //Without a container
        default:
            svg += (defs + bgrect + modrect + imgSvg).replace(/^\s+/, ""); //Clear indents on each line
            break;
    }
    return svg;
};
module.exports = QRCode;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/QRCode.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
"use strict";
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QRCode = void 0;
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
const hooks_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/hooks/dist/hooks.module.js [app-client] (ecmascript)");
const qrcode_svg_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/vendor-js/qrcode-svg/index.js [app-client] (ecmascript)"));
const QRCode = (props)=>{
    const [svg, setSvg] = (0, hooks_1.useState)('');
    (0, hooks_1.useEffect)(()=>{
        var _a, _b;
        const qrcode = new qrcode_svg_1.default({
            content: props.content,
            background: props.bgColor || '#ffffff',
            color: props.fgColor || '#000000',
            container: 'svg',
            ecl: 'M',
            width: (_a = props.width) !== null && _a !== void 0 ? _a : 256,
            height: (_b = props.height) !== null && _b !== void 0 ? _b : 256,
            padding: 0,
            image: props.image
        });
        const base64 = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(qrcode.svg(), 'utf8').toString('base64');
        setSvg(`data:image/svg+xml;base64,${base64}`);
    }, [
        props.bgColor,
        props.content,
        props.fgColor,
        props.height,
        props.image,
        props.width
    ]);
    return svg ? (0, preact_1.h)("img", {
        src: svg,
        alt: "QR Code"
    }) : null;
};
exports.QRCode = QRCode;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/Spinner/Spinner-css.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = (()=>`.-cbwsdk-css-reset .-cbwsdk-spinner{display:inline-block}.-cbwsdk-css-reset .-cbwsdk-spinner svg{display:inline-block;animation:2s linear infinite -cbwsdk-spinner-svg}.-cbwsdk-css-reset .-cbwsdk-spinner svg circle{animation:1.9s ease-in-out infinite both -cbwsdk-spinner-circle;display:block;fill:rgba(0,0,0,0);stroke-dasharray:283;stroke-dashoffset:280;stroke-linecap:round;stroke-width:10px;transform-origin:50% 50%}@keyframes -cbwsdk-spinner-svg{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}@keyframes -cbwsdk-spinner-circle{0%,25%{stroke-dashoffset:280;transform:rotate(0)}50%,75%{stroke-dashoffset:75;transform:rotate(45deg)}100%{stroke-dashoffset:280;transform:rotate(360deg)}}`)();
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/Spinner/Spinner.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Spinner = void 0;
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
const Spinner_css_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/Spinner/Spinner-css.js [app-client] (ecmascript)"));
const Spinner = (props)=>{
    var _a;
    const size = (_a = props.size) !== null && _a !== void 0 ? _a : 64;
    const color = props.color || '#000';
    return (0, preact_1.h)("div", {
        class: "-cbwsdk-spinner"
    }, (0, preact_1.h)("style", null, Spinner_css_1.default), (0, preact_1.h)("svg", {
        viewBox: "0 0 100 100",
        xmlns: "http://www.w3.org/2000/svg",
        style: {
            width: size,
            height: size
        }
    }, (0, preact_1.h)("circle", {
        style: {
            cx: 50,
            cy: 50,
            r: 45,
            stroke: color
        }
    })));
};
exports.Spinner = Spinner;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/ConnectContent/ConnectContent-css.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = (()=>`.-cbwsdk-css-reset .-cbwsdk-connect-content{height:430px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-connect-content.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-header{display:flex;align-items:center;justify-content:space-between;margin:0 0 30px}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading{font-style:normal;font-weight:500;font-size:28px;line-height:36px;margin:0}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-layout{display:flex;flex-direction:row}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-left{margin-right:30px;display:flex;flex-direction:column;justify-content:space-between}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-right{flex:25%;margin-right:34px}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-wrapper{width:220px;height:220px;border-radius:12px;display:flex;justify-content:center;align-items:center;background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light{background-color:rgba(255,255,255,.95)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light>p{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark{background-color:rgba(10,11,13,.9)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark>p{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting>p{font-size:12px;font-weight:bold;margin-top:16px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app{border-radius:8px;font-size:14px;line-height:20px;padding:12px;width:339px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.light{background:#eef0f3;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.dark{background:#1e2025;color:#8a919e}.-cbwsdk-css-reset .-cbwsdk-cancel-button{-webkit-appearance:none;border:none;background:none;cursor:pointer;padding:0;margin:0}.-cbwsdk-css-reset .-cbwsdk-cancel-button-x{position:relative;display:block;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-wallet-steps{padding:0 0 0 16px;margin:0;width:100%;list-style:decimal}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item{list-style-type:decimal;display:list-item;font-style:normal;font-weight:400;font-size:16px;line-height:24px;margin-top:20px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item-wrapper{display:flex;align-items:center}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-pad-left{margin-left:6px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon{display:flex;border-radius:50%;height:24px;width:24px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.light{background:#0052ff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.dark{background:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item{align-items:center;display:flex;flex-direction:row;padding:16px 24px;gap:12px;cursor:pointer;border-radius:100px;font-weight:600}.-cbwsdk-css-reset .-cbwsdk-connect-item.light{background:#f5f8ff;color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-connect-item.dark{background:#001033;color:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item-copy-wrapper{margin:0 4px 0 8px}.-cbwsdk-css-reset .-cbwsdk-connect-item-title{margin:0 0 0;font-size:16px;line-height:24px;font-weight:500}.-cbwsdk-css-reset .-cbwsdk-connect-item-description{font-weight:400;font-size:14px;line-height:20px;margin:0}`)();
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/ConnectContent/ConnectContent.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CoinbaseWalletSteps = exports.ConnectContent = void 0;
const clsx_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/clsx/dist/clsx.m.js [app-client] (ecmascript)"));
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/util.js [app-client] (ecmascript)");
const version_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/version.js [app-client] (ecmascript)");
const CloseIcon_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/CloseIcon.js [app-client] (ecmascript)");
const CoinbaseWalletRound_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/CoinbaseWalletRound.js [app-client] (ecmascript)");
const QRCodeIcon_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/QRCodeIcon.js [app-client] (ecmascript)");
const QRCode_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/QRCode.js [app-client] (ecmascript)");
const Spinner_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/Spinner/Spinner.js [app-client] (ecmascript)");
const ConnectContent_css_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/ConnectContent/ConnectContent-css.js [app-client] (ecmascript)"));
const wallet = {
    title: 'Coinbase Wallet app',
    description: 'Connect with your self-custody wallet',
    steps: CoinbaseWalletSteps
};
const makeIconColor = (theme)=>{
    return theme === 'light' ? '#FFFFFF' : '#0A0B0D';
};
function ConnectContent(props) {
    const { theme } = props;
    const qrUrl = (0, util_1.createQrUrl)(props.sessionId, props.sessionSecret, props.linkAPIUrl, props.isParentConnection, props.version, props.chainId);
    const WalletSteps = wallet.steps;
    return (0, preact_1.h)("div", {
        "data-testid": "connect-content",
        className: (0, clsx_1.default)('-cbwsdk-connect-content', theme)
    }, (0, preact_1.h)("style", null, ConnectContent_css_1.default), (0, preact_1.h)("div", {
        className: "-cbwsdk-connect-content-header"
    }, (0, preact_1.h)("h2", {
        className: (0, clsx_1.default)('-cbwsdk-connect-content-heading', theme)
    }, "Scan to connect with our mobile app"), props.onCancel && (0, preact_1.h)("button", {
        type: "button",
        className: '-cbwsdk-cancel-button',
        onClick: props.onCancel
    }, (0, preact_1.h)(CloseIcon_1.CloseIcon, {
        fill: theme === 'light' ? '#0A0B0D' : '#FFFFFF'
    }))), (0, preact_1.h)("div", {
        className: "-cbwsdk-connect-content-layout"
    }, (0, preact_1.h)("div", {
        className: "-cbwsdk-connect-content-column-left"
    }, (0, preact_1.h)(ConnectItem, {
        title: wallet.title,
        description: wallet.description,
        theme: theme
    })), (0, preact_1.h)("div", {
        className: "-cbwsdk-connect-content-column-right"
    }, (0, preact_1.h)("div", {
        className: "-cbwsdk-connect-content-qr-wrapper"
    }, (0, preact_1.h)(QRCode_1.QRCode, {
        content: qrUrl,
        width: 200,
        height: 200,
        fgColor: "#000",
        bgColor: "transparent"
    }), (0, preact_1.h)("input", {
        type: "hidden",
        name: "cbw-cbwsdk-version",
        value: version_1.LIB_VERSION
    }), (0, preact_1.h)("input", {
        type: "hidden",
        value: qrUrl
    })), (0, preact_1.h)(WalletSteps, {
        theme: theme
    }), !props.isConnected && (0, preact_1.h)("div", {
        "data-testid": "connecting-spinner",
        className: (0, clsx_1.default)('-cbwsdk-connect-content-qr-connecting', theme)
    }, (0, preact_1.h)(Spinner_1.Spinner, {
        size: 36,
        color: theme === 'dark' ? '#FFF' : '#000'
    }), (0, preact_1.h)("p", null, "Connecting...")))));
}
exports.ConnectContent = ConnectContent;
function ConnectItem({ title, description, theme }) {
    return (0, preact_1.h)("div", {
        className: (0, clsx_1.default)('-cbwsdk-connect-item', theme)
    }, (0, preact_1.h)("div", null, (0, preact_1.h)(CoinbaseWalletRound_1.CoinbaseWalletRound, null)), (0, preact_1.h)("div", {
        className: "-cbwsdk-connect-item-copy-wrapper"
    }, (0, preact_1.h)("h3", {
        className: "-cbwsdk-connect-item-title"
    }, title), (0, preact_1.h)("p", {
        className: "-cbwsdk-connect-item-description"
    }, description)));
}
function CoinbaseWalletSteps({ theme }) {
    return (0, preact_1.h)("ol", {
        className: "-cbwsdk-wallet-steps"
    }, (0, preact_1.h)("li", {
        className: (0, clsx_1.default)('-cbwsdk-wallet-steps-item', theme)
    }, (0, preact_1.h)("div", {
        className: "-cbwsdk-wallet-steps-item-wrapper"
    }, "Open Coinbase Wallet app")), (0, preact_1.h)("li", {
        className: (0, clsx_1.default)('-cbwsdk-wallet-steps-item', theme)
    }, (0, preact_1.h)("div", {
        className: "-cbwsdk-wallet-steps-item-wrapper"
    }, (0, preact_1.h)("span", null, "Tap ", (0, preact_1.h)("strong", null, "Scan"), ' '), (0, preact_1.h)("span", {
        className: (0, clsx_1.default)('-cbwsdk-wallet-steps-pad-left', '-cbwsdk-wallet-steps-icon', theme)
    }, (0, preact_1.h)(QRCodeIcon_1.QRCodeIcon, {
        fill: makeIconColor(theme)
    })))));
}
exports.CoinbaseWalletSteps = CoinbaseWalletSteps;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/ArrowLeftIcon.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArrowLeftIcon = void 0;
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
function ArrowLeftIcon(props) {
    return (0, preact_1.h)("svg", Object.assign({
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg"
    }, props), (0, preact_1.h)("path", {
        d: "M8.60675 0.155884L7.37816 1.28209L12.7723 7.16662H0V8.83328H12.6548L6.82149 14.6666L8 15.8451L15.8201 8.02501L8.60675 0.155884Z"
    }));
}
exports.ArrowLeftIcon = ArrowLeftIcon;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/LaptopIcon.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LaptopIcon = void 0;
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
function LaptopIcon(props) {
    return (0, preact_1.h)("svg", Object.assign({
        width: "14",
        height: "14",
        viewBox: "0 0 14 14",
        xmlns: "http://www.w3.org/2000/svg"
    }, props), (0, preact_1.h)("path", {
        d: "M1.8001 2.2002H12.2001V9.40019H1.8001V2.2002ZM3.4001 3.8002V7.80019H10.6001V3.8002H3.4001Z"
    }), (0, preact_1.h)("path", {
        d: "M13.4001 10.2002H0.600098C0.600098 11.0838 1.31644 11.8002 2.2001 11.8002H11.8001C12.6838 11.8002 13.4001 11.0838 13.4001 10.2002Z"
    }));
}
exports.LaptopIcon = LaptopIcon;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/SafeIcon.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SafeIcon = void 0;
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
function SafeIcon(props) {
    return (0, preact_1.h)("svg", Object.assign({
        width: "14",
        height: "14",
        viewBox: "0 0 14 14",
        xmlns: "http://www.w3.org/2000/svg"
    }, props), (0, preact_1.h)("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M0.600098 0.600098V11.8001H13.4001V0.600098H0.600098ZM7.0001 9.2001C5.3441 9.2001 4.0001 7.8561 4.0001 6.2001C4.0001 4.5441 5.3441 3.2001 7.0001 3.2001C8.6561 3.2001 10.0001 4.5441 10.0001 6.2001C10.0001 7.8561 8.6561 9.2001 7.0001 9.2001ZM0.600098 12.6001H3.8001V13.4001H0.600098V12.6001ZM10.2001 12.6001H13.4001V13.4001H10.2001V12.6001ZM8.8001 6.2001C8.8001 7.19421 7.99421 8.0001 7.0001 8.0001C6.00598 8.0001 5.2001 7.19421 5.2001 6.2001C5.2001 5.20598 6.00598 4.4001 7.0001 4.4001C7.99421 4.4001 8.8001 5.20598 8.8001 6.2001Z"
    }));
}
exports.SafeIcon = SafeIcon;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/TryExtensionContent/TryExtensionContent-css.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = (()=>`.-cbwsdk-css-reset .-cbwsdk-try-extension{display:flex;margin-top:12px;height:202px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-try-extension.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-column-half{flex:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading{font-style:normal;font-weight:500;font-size:25px;line-height:32px;margin:0;max-width:204px}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta{appearance:none;border:none;background:none;color:#0052ff;cursor:pointer;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.light{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.dark{color:#588af5}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-wrapper{display:flex;align-items:center;margin-top:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-icon{display:block;margin-left:4px;height:14px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0;padding:0;list-style:none;height:100%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item{display:flex;align-items:center;flex-flow:nowrap;margin-top:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item:first-of-type{margin-top:0}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon-wrapper{display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon{display:flex;height:32px;width:32px;border-radius:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.light{background:#eef0f3}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.dark{background:#1e2025}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy{display:block;font-weight:400;font-size:14px;line-height:20px;padding-left:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.light{color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.dark{color:#8a919e}`)();
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/TryExtensionContent/TryExtensionContent.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TryExtensionContent = void 0;
const clsx_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/clsx/dist/clsx.m.js [app-client] (ecmascript)"));
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
const hooks_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/hooks/dist/hooks.module.js [app-client] (ecmascript)");
const ArrowLeftIcon_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/ArrowLeftIcon.js [app-client] (ecmascript)");
const LaptopIcon_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/LaptopIcon.js [app-client] (ecmascript)");
const SafeIcon_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/icons/SafeIcon.js [app-client] (ecmascript)");
const TryExtensionContent_css_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/TryExtensionContent/TryExtensionContent-css.js [app-client] (ecmascript)"));
function TryExtensionContent({ theme }) {
    const [clicked, setClicked] = (0, hooks_1.useState)(false);
    const handleInstallClick = (0, hooks_1.useCallback)(()=>{
        window.open('https://api.wallet.coinbase.com/rpc/v2/desktop/chrome', '_blank');
    }, []);
    const handleClick = (0, hooks_1.useCallback)(()=>{
        if (clicked) {
            window.location.reload();
        } else {
            handleInstallClick();
            setClicked(true);
        }
    }, [
        handleInstallClick,
        clicked
    ]);
    return (0, preact_1.h)("div", {
        class: (0, clsx_1.default)('-cbwsdk-try-extension', theme)
    }, (0, preact_1.h)("style", null, TryExtensionContent_css_1.default), (0, preact_1.h)("div", {
        class: "-cbwsdk-try-extension-column-half"
    }, (0, preact_1.h)("h3", {
        class: (0, clsx_1.default)('-cbwsdk-try-extension-heading', theme)
    }, "Or try the Coinbase Wallet browser extension"), (0, preact_1.h)("div", {
        class: "-cbwsdk-try-extension-cta-wrapper"
    }, (0, preact_1.h)("button", {
        class: (0, clsx_1.default)('-cbwsdk-try-extension-cta', theme),
        onClick: handleClick
    }, clicked ? 'Refresh' : 'Install'), (0, preact_1.h)("div", null, !clicked && (0, preact_1.h)(ArrowLeftIcon_1.ArrowLeftIcon, {
        class: "-cbwsdk-try-extension-cta-icon",
        fill: theme === 'light' ? '#0052FF' : '#588AF5'
    })))), (0, preact_1.h)("div", {
        class: "-cbwsdk-try-extension-column-half"
    }, (0, preact_1.h)("ul", {
        class: "-cbwsdk-try-extension-list"
    }, (0, preact_1.h)("li", {
        class: "-cbwsdk-try-extension-list-item"
    }, (0, preact_1.h)("div", {
        class: "-cbwsdk-try-extension-list-item-icon-wrapper"
    }, (0, preact_1.h)("span", {
        class: (0, clsx_1.default)('-cbwsdk-try-extension-list-item-icon', theme)
    }, (0, preact_1.h)(LaptopIcon_1.LaptopIcon, {
        fill: theme === 'light' ? '#0A0B0D' : '#FFFFFF'
    }))), (0, preact_1.h)("div", {
        class: (0, clsx_1.default)('-cbwsdk-try-extension-list-item-copy', theme)
    }, "Connect with dapps with just one click on your desktop browser")), (0, preact_1.h)("li", {
        class: "-cbwsdk-try-extension-list-item"
    }, (0, preact_1.h)("div", {
        class: "-cbwsdk-try-extension-list-item-icon-wrapper"
    }, (0, preact_1.h)("span", {
        class: (0, clsx_1.default)('-cbwsdk-try-extension-list-item-icon', theme)
    }, (0, preact_1.h)(SafeIcon_1.SafeIcon, {
        fill: theme === 'light' ? '#0A0B0D' : '#FFFFFF'
    }))), (0, preact_1.h)("div", {
        class: (0, clsx_1.default)('-cbwsdk-try-extension-list-item-copy', theme)
    }, "Add an additional layer of security by using a supported Ledger hardware wallet")))));
}
exports.TryExtensionContent = TryExtensionContent;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/ConnectDialog/ConnectDialog-css.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = (()=>`.-cbwsdk-css-reset .-cbwsdk-connect-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.light{background-color:rgba(0,0,0,.5)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.dark{background-color:rgba(50,53,61,.4)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box{display:flex;position:relative;flex-direction:column;transform:scale(1);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container{display:block}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container-hidden{display:none}`)();
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/ConnectDialog/ConnectDialog.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectDialog = void 0;
const clsx_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/clsx/dist/clsx.m.js [app-client] (ecmascript)"));
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
const hooks_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/hooks/dist/hooks.module.js [app-client] (ecmascript)");
const ConnectContent_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/ConnectContent/ConnectContent.js [app-client] (ecmascript)");
const TryExtensionContent_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/TryExtensionContent/TryExtensionContent.js [app-client] (ecmascript)");
const ConnectDialog_css_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/ConnectDialog/ConnectDialog-css.js [app-client] (ecmascript)"));
const ConnectDialog = (props)=>{
    const { isOpen, darkMode } = props;
    const [containerHidden, setContainerHidden] = (0, hooks_1.useState)(!isOpen);
    const [dialogHidden, setDialogHidden] = (0, hooks_1.useState)(!isOpen);
    (0, hooks_1.useEffect)(()=>{
        const timers = [
            window.setTimeout(()=>{
                setDialogHidden(!isOpen);
            }, 10)
        ];
        if (isOpen) {
            setContainerHidden(false);
        } else {
            timers.push(window.setTimeout(()=>{
                setContainerHidden(true);
            }, 360));
        }
        return ()=>{
            timers.forEach(window.clearTimeout);
        };
    }, [
        isOpen
    ]);
    const theme = darkMode ? 'dark' : 'light';
    return (0, preact_1.h)("div", {
        class: (0, clsx_1.default)('-cbwsdk-connect-dialog-container', containerHidden && '-cbwsdk-connect-dialog-container-hidden')
    }, (0, preact_1.h)("style", null, ConnectDialog_css_1.default), (0, preact_1.h)("div", {
        class: (0, clsx_1.default)('-cbwsdk-connect-dialog-backdrop', theme, dialogHidden && '-cbwsdk-connect-dialog-backdrop-hidden')
    }), (0, preact_1.h)("div", {
        class: "-cbwsdk-connect-dialog"
    }, (0, preact_1.h)("div", {
        class: (0, clsx_1.default)('-cbwsdk-connect-dialog-box', dialogHidden && '-cbwsdk-connect-dialog-box-hidden')
    }, !props.connectDisabled ? (0, preact_1.h)(ConnectContent_1.ConnectContent, {
        theme: theme,
        version: props.version,
        sessionId: props.sessionId,
        sessionSecret: props.sessionSecret,
        linkAPIUrl: props.linkAPIUrl,
        isConnected: props.isConnected,
        isParentConnection: props.isParentConnection,
        chainId: props.chainId,
        onCancel: props.onCancel
    }) : null, (0, preact_1.h)(TryExtensionContent_1.TryExtensionContent, {
        theme: theme
    }))));
};
exports.ConnectDialog = ConnectDialog;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/LinkFlow/LinkFlow.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LinkFlow = void 0;
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
const ConnectDialog_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/ConnectDialog/ConnectDialog.js [app-client] (ecmascript)");
class LinkFlow {
    constructor(options){
        this.connected = false;
        this.chainId = 1;
        this.isOpen = false;
        this.onCancel = null;
        this.root = null;
        // if true, hide QR code in LinkFlow (which happens if no jsonRpcUrl is provided)
        this.connectDisabled = false;
        this.darkMode = options.darkMode;
        this.version = options.version;
        this.sessionId = options.sessionId;
        this.sessionSecret = options.sessionSecret;
        this.linkAPIUrl = options.linkAPIUrl;
        this.isParentConnection = options.isParentConnection;
    }
    attach(el) {
        this.root = document.createElement('div');
        this.root.className = '-cbwsdk-link-flow-root';
        el.appendChild(this.root);
        this.render();
    }
    setConnected(v) {
        if (this.connected !== v) {
            this.connected = v;
            this.render();
        }
    }
    setChainId(chainId) {
        if (this.chainId !== chainId) {
            this.chainId = chainId;
            this.render();
        }
    }
    detach() {
        var _a;
        if (!this.root) {
            return;
        }
        (0, preact_1.render)(null, this.root);
        (_a = this.root.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.root);
    }
    setConnectDisabled(connectDisabled) {
        this.connectDisabled = connectDisabled;
    }
    open(options) {
        this.isOpen = true;
        this.onCancel = options.onCancel;
        this.render();
    }
    close() {
        this.isOpen = false;
        this.onCancel = null;
        this.render();
    }
    render() {
        if (!this.root) {
            return;
        }
        (0, preact_1.render)((0, preact_1.h)(ConnectDialog_1.ConnectDialog, {
            darkMode: this.darkMode,
            version: this.version,
            sessionId: this.sessionId,
            sessionSecret: this.sessionSecret,
            linkAPIUrl: this.linkAPIUrl,
            isOpen: this.isOpen,
            isConnected: this.connected,
            isParentConnection: this.isParentConnection,
            chainId: this.chainId,
            onCancel: this.onCancel,
            connectDisabled: this.connectDisabled
        }), this.root);
    }
}
exports.LinkFlow = LinkFlow;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/Snackbar/Snackbar-css.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = (()=>`.-cbwsdk-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-cbwsdk-css-reset .-gear-container *{user-select:none}.-cbwsdk-css-reset .-gear-container svg{opacity:0;position:absolute}.-cbwsdk-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-cbwsdk-css-reset .-cbwsdk-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-cbwsdk-css-reset .-cbwsdk-snackbar *{user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-expanded .-cbwsdk-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}`)();
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/Snackbar/Snackbar.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SnackbarInstance = exports.SnackbarContainer = exports.Snackbar = void 0;
const clsx_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/clsx/dist/clsx.m.js [app-client] (ecmascript)"));
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
const hooks_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/hooks/dist/hooks.module.js [app-client] (ecmascript)");
const Snackbar_css_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/Snackbar/Snackbar-css.js [app-client] (ecmascript)"));
const cblogo = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+`;
const gearIcon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=`;
class Snackbar {
    constructor(options){
        this.items = new Map();
        this.nextItemKey = 0;
        this.root = null;
        this.darkMode = options.darkMode;
    }
    attach(el) {
        this.root = document.createElement('div');
        this.root.className = '-cbwsdk-snackbar-root';
        el.appendChild(this.root);
        this.render();
    }
    presentItem(itemProps) {
        const key = this.nextItemKey++;
        this.items.set(key, itemProps);
        this.render();
        return ()=>{
            this.items.delete(key);
            this.render();
        };
    }
    clear() {
        this.items.clear();
        this.render();
    }
    render() {
        if (!this.root) {
            return;
        }
        (0, preact_1.render)((0, preact_1.h)("div", null, (0, preact_1.h)(exports.SnackbarContainer, {
            darkMode: this.darkMode
        }, Array.from(this.items.entries()).map(([key, itemProps])=>(0, preact_1.h)(exports.SnackbarInstance, Object.assign({}, itemProps, {
                key: key
            }))))), this.root);
    }
}
exports.Snackbar = Snackbar;
const SnackbarContainer = (props)=>(0, preact_1.h)("div", {
        class: (0, clsx_1.default)('-cbwsdk-snackbar-container')
    }, (0, preact_1.h)("style", null, Snackbar_css_1.default), (0, preact_1.h)("div", {
        class: "-cbwsdk-snackbar"
    }, props.children));
exports.SnackbarContainer = SnackbarContainer;
const SnackbarInstance = ({ autoExpand, message, menuItems })=>{
    const [hidden, setHidden] = (0, hooks_1.useState)(true);
    const [expanded, setExpanded] = (0, hooks_1.useState)(autoExpand !== null && autoExpand !== void 0 ? autoExpand : false);
    (0, hooks_1.useEffect)(()=>{
        const timers = [
            window.setTimeout(()=>{
                setHidden(false);
            }, 1),
            window.setTimeout(()=>{
                setExpanded(true);
            }, 10000)
        ];
        return ()=>{
            timers.forEach(window.clearTimeout);
        };
    });
    const toggleExpanded = ()=>{
        setExpanded(!expanded);
    };
    return (0, preact_1.h)("div", {
        class: (0, clsx_1.default)('-cbwsdk-snackbar-instance', hidden && '-cbwsdk-snackbar-instance-hidden', expanded && '-cbwsdk-snackbar-instance-expanded')
    }, (0, preact_1.h)("div", {
        class: "-cbwsdk-snackbar-instance-header",
        onClick: toggleExpanded
    }, (0, preact_1.h)("img", {
        src: cblogo,
        class: "-cbwsdk-snackbar-instance-header-cblogo"
    }), ' ', (0, preact_1.h)("div", {
        class: "-cbwsdk-snackbar-instance-header-message"
    }, message), (0, preact_1.h)("div", {
        class: "-gear-container"
    }, !expanded && (0, preact_1.h)("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, (0, preact_1.h)("circle", {
        cx: "12",
        cy: "12",
        r: "12",
        fill: "#F5F7F8"
    })), (0, preact_1.h)("img", {
        src: gearIcon,
        class: "-gear-icon",
        title: "Expand"
    }))), menuItems && menuItems.length > 0 && (0, preact_1.h)("div", {
        class: "-cbwsdk-snackbar-instance-menu"
    }, menuItems.map((action, i)=>(0, preact_1.h)("div", {
            class: (0, clsx_1.default)('-cbwsdk-snackbar-instance-menu-item', action.isRed && '-cbwsdk-snackbar-instance-menu-item-is-red'),
            onClick: action.onClick,
            key: i
        }, (0, preact_1.h)("svg", {
            width: action.svgWidth,
            height: action.svgHeight,
            viewBox: "0 0 10 11",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
        }, (0, preact_1.h)("path", {
            "fill-rule": action.defaultFillRule,
            "clip-rule": action.defaultClipRule,
            d: action.path,
            fill: "#AAAAAA"
        })), (0, preact_1.h)("span", {
            class: (0, clsx_1.default)('-cbwsdk-snackbar-instance-menu-item-info', action.isRed && '-cbwsdk-snackbar-instance-menu-item-info-is-red')
        }, action.info)))));
};
exports.SnackbarInstance = SnackbarInstance;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/WalletLinkRelayUI.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WalletLinkRelayUI = void 0;
const cssReset_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/lib/cssReset.js [app-client] (ecmascript)");
const LinkFlow_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/LinkFlow/LinkFlow.js [app-client] (ecmascript)");
const Snackbar_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/Snackbar/Snackbar.js [app-client] (ecmascript)");
class WalletLinkRelayUI {
    constructor(options){
        this.standalone = null;
        this.attached = false;
        this.snackbar = new Snackbar_1.Snackbar({
            darkMode: options.darkMode
        });
        this.linkFlow = new LinkFlow_1.LinkFlow({
            darkMode: options.darkMode,
            version: options.version,
            sessionId: options.session.id,
            sessionSecret: options.session.secret,
            linkAPIUrl: options.linkAPIUrl,
            isParentConnection: false
        });
    }
    attach() {
        if (this.attached) {
            throw new Error('Coinbase Wallet SDK UI is already attached');
        }
        const el = document.documentElement;
        const container = document.createElement('div');
        container.className = '-cbwsdk-css-reset';
        el.appendChild(container);
        this.linkFlow.attach(container);
        this.snackbar.attach(container);
        this.attached = true;
        (0, cssReset_1.injectCssReset)();
    }
    setConnected(connected) {
        this.linkFlow.setConnected(connected);
    }
    setChainId(chainId) {
        this.linkFlow.setChainId(chainId);
    }
    setConnectDisabled(connectDisabled) {
        this.linkFlow.setConnectDisabled(connectDisabled);
    }
    /* istanbul ignore next */ addEthereumChain() {}
    /* istanbul ignore next */ watchAsset() {}
    /* istanbul ignore next */ switchEthereumChain() {}
    requestEthereumAccounts(options) {
        this.linkFlow.open({
            onCancel: options.onCancel
        });
    }
    hideRequestEthereumAccounts() {
        this.linkFlow.close();
    }
    /* istanbul ignore next */ signEthereumMessage() {}
    /* istanbul ignore next */ signEthereumTransaction() {}
    /* istanbul ignore next */ submitEthereumTransaction() {}
    /* istanbul ignore next */ ethereumAddressFromSignedMessage() {}
    showConnecting(options) {
        let snackbarProps;
        if (options.isUnlinkedErrorState) {
            snackbarProps = {
                autoExpand: true,
                message: 'Connection lost',
                menuItems: [
                    {
                        isRed: false,
                        info: 'Reset connection',
                        svgWidth: '10',
                        svgHeight: '11',
                        path: 'M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z',
                        defaultFillRule: 'evenodd',
                        defaultClipRule: 'evenodd',
                        onClick: options.onResetConnection
                    }
                ]
            };
        } else {
            snackbarProps = {
                message: 'Confirm on phone',
                menuItems: [
                    {
                        isRed: true,
                        info: 'Cancel transaction',
                        svgWidth: '11',
                        svgHeight: '11',
                        path: 'M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z',
                        defaultFillRule: 'inherit',
                        defaultClipRule: 'inherit',
                        onClick: options.onCancel
                    },
                    {
                        isRed: false,
                        info: 'Reset connection',
                        svgWidth: '10',
                        svgHeight: '11',
                        path: 'M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z',
                        defaultFillRule: 'evenodd',
                        defaultClipRule: 'evenodd',
                        onClick: options.onResetConnection
                    }
                ]
            };
        }
        return this.snackbar.presentItem(snackbarProps);
    }
    /* istanbul ignore next */ reloadUI() {
        document.location.reload();
    }
    /* istanbul ignore next */ inlineAccountsResponse() {
        return false;
    }
    /* istanbul ignore next */ inlineAddEthereumChain() {
        return false;
    }
    /* istanbul ignore next */ inlineWatchAsset() {
        return false;
    }
    /* istanbul ignore next */ inlineSwitchEthereumChain() {
        return false;
    }
    /* istanbul ignore next */ setStandalone(status) {
        this.standalone = status;
    }
    /* istanbul ignore next */ isStandalone() {
        var _a;
        return (_a = this.standalone) !== null && _a !== void 0 ? _a : false;
    }
}
exports.WalletLinkRelayUI = WalletLinkRelayUI;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/WalletLinkRelay.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WalletLinkRelay = void 0;
const error_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/index.js [app-client] (ecmascript)");
const type_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/type.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/util.js [app-client] (ecmascript)");
const DiagnosticLogger_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/DiagnosticLogger.js [app-client] (ecmascript)");
const RelayAbstract_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/RelayAbstract.js [app-client] (ecmascript)");
const Session_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/Session.js [app-client] (ecmascript)");
const WalletLinkConnection_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/connection/WalletLinkConnection.js [app-client] (ecmascript)");
const Web3Response_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/type/Web3Response.js [app-client] (ecmascript)");
const WalletLinkRelayUI_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/WalletLinkRelayUI.js [app-client] (ecmascript)");
class WalletLinkRelay extends RelayAbstract_1.RelayAbstract {
    constructor(options){
        var _a;
        super();
        this.accountsCallback = null;
        this.chainCallbackParams = {
            chainId: '',
            jsonRpcUrl: ''
        }; // to implement distinctUntilChanged
        this.chainCallback = null;
        this.dappDefaultChain = 1;
        this.appName = '';
        this.appLogoUrl = null;
        this.linkedUpdated = (linked)=>{
            var _a;
            this.isLinked = linked;
            const cachedAddresses = this.storage.getItem(RelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY);
            if (linked) {
                // Only set linked session variable one way
                this.session.linked = linked;
            }
            this.isUnlinkedErrorState = false;
            if (cachedAddresses) {
                const addresses = cachedAddresses.split(' ');
                const wasConnectedViaStandalone = this.storage.getItem('IsStandaloneSigning') === 'true';
                if (addresses[0] !== '' && !linked && this.session.linked && !wasConnectedViaStandalone) {
                    this.isUnlinkedErrorState = true;
                    const sessionIdHash = this.getSessionIdHash();
                    (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.UNLINKED_ERROR_STATE, {
                        sessionIdHash
                    });
                }
            }
        };
        this.metadataUpdated = (key, value)=>{
            this.storage.setItem(key, value);
        };
        this.chainUpdated = (chainId, jsonRpcUrl)=>{
            if (this.chainCallbackParams.chainId === chainId && this.chainCallbackParams.jsonRpcUrl === jsonRpcUrl) {
                return;
            }
            this.chainCallbackParams = {
                chainId,
                jsonRpcUrl
            };
            if (this.chainCallback) {
                this.chainCallback(chainId, jsonRpcUrl);
            }
        };
        this.accountUpdated = (selectedAddress)=>{
            if (this.accountsCallback) {
                this.accountsCallback([
                    selectedAddress
                ]);
            }
            if (WalletLinkRelay.accountRequestCallbackIds.size > 0) {
                // We get the ethereum address from the metadata.  If for whatever
                // reason we don't get a response via an explicit web3 message
                // we can still fulfill the eip1102 request.
                Array.from(WalletLinkRelay.accountRequestCallbackIds.values()).forEach((id)=>{
                    const message = {
                        type: 'WEB3_RESPONSE',
                        id,
                        response: {
                            method: 'requestEthereumAccounts',
                            result: [
                                selectedAddress
                            ]
                        }
                    };
                    this.invokeCallback(Object.assign(Object.assign({}, message), {
                        id
                    }));
                });
                WalletLinkRelay.accountRequestCallbackIds.clear();
            }
        };
        this.connectedUpdated = (connected)=>{
            this.ui.setConnected(connected);
        };
        this.resetAndReload = this.resetAndReload.bind(this);
        this.linkAPIUrl = options.linkAPIUrl;
        this.storage = options.storage;
        this.options = options;
        const { session, ui, connection } = this.subscribe();
        this._session = session;
        this.connection = connection;
        this.relayEventManager = options.relayEventManager;
        this.diagnostic = options.diagnosticLogger;
        this._reloadOnDisconnect = (_a = options.reloadOnDisconnect) !== null && _a !== void 0 ? _a : true;
        this.ui = ui;
    }
    subscribe() {
        const session = Session_1.Session.load(this.storage) || new Session_1.Session(this.storage).save();
        const { linkAPIUrl, diagnostic } = this;
        const connection = new WalletLinkConnection_1.WalletLinkConnection({
            session,
            linkAPIUrl,
            diagnostic,
            listener: this
        });
        const { version, darkMode } = this.options;
        const ui = this.options.uiConstructor({
            linkAPIUrl,
            version,
            darkMode,
            session
        });
        connection.connect();
        return {
            session,
            ui,
            connection
        };
    }
    attachUI() {
        this.ui.attach();
    }
    resetAndReload() {
        Promise.race([
            this.connection.setSessionMetadata('__destroyed', '1'),
            new Promise((resolve)=>setTimeout(()=>resolve(null), 1000))
        ]).then(()=>{
            var _a, _b;
            const isStandalone = this.ui.isStandalone();
            (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.SESSION_STATE_CHANGE, {
                method: 'relay::resetAndReload',
                sessionMetadataChange: '__destroyed, 1',
                sessionIdHash: this.getSessionIdHash()
            });
            this.connection.destroy();
            /**
             * Only clear storage if the session id we have in memory matches the one on disk
             * Otherwise, in the case where we have 2 tabs, another tab might have cleared
             * storage already.  In that case if we clear storage again, the user will be in
             * a state where the first tab allows the user to connect but the session that
             * was used isn't persisted.  This leaves the user in a state where they aren't
             * connected to the mobile app.
             */ const storedSession = Session_1.Session.load(this.storage);
            if ((storedSession === null || storedSession === void 0 ? void 0 : storedSession.id) === this._session.id) {
                this.storage.clear();
            } else if (storedSession) {
                (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.SKIPPED_CLEARING_SESSION, {
                    sessionIdHash: this.getSessionIdHash(),
                    storedSessionIdHash: Session_1.Session.hash(storedSession.id)
                });
            }
            if (this._reloadOnDisconnect) {
                this.ui.reloadUI();
                return;
            }
            if (this.accountsCallback) {
                this.accountsCallback([], true);
            }
            const { session, ui, connection } = this.subscribe();
            this._session = session;
            this.connection = connection;
            this.ui = ui;
            if (isStandalone && this.ui.setStandalone) this.ui.setStandalone(true);
            if (!this.options.headlessMode) this.attachUI();
        }).catch((err)=>{
            var _a;
            (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.FAILURE, {
                method: 'relay::resetAndReload',
                message: `failed to reset and reload with ${err}`,
                sessionIdHash: this.getSessionIdHash()
            });
        });
    }
    setAppInfo(appName, appLogoUrl) {
        this.appName = appName;
        this.appLogoUrl = appLogoUrl;
    }
    getStorageItem(key) {
        return this.storage.getItem(key);
    }
    get session() {
        return this._session;
    }
    setStorageItem(key, value) {
        this.storage.setItem(key, value);
    }
    signEthereumMessage(message, address, addPrefix, typedDataJson) {
        return this.sendRequest({
            method: 'signEthereumMessage',
            params: {
                message: (0, util_1.hexStringFromBuffer)(message, true),
                address,
                addPrefix,
                typedDataJson: typedDataJson || null
            }
        });
    }
    ethereumAddressFromSignedMessage(message, signature, addPrefix) {
        return this.sendRequest({
            method: 'ethereumAddressFromSignedMessage',
            params: {
                message: (0, util_1.hexStringFromBuffer)(message, true),
                signature: (0, util_1.hexStringFromBuffer)(signature, true),
                addPrefix
            }
        });
    }
    signEthereumTransaction(params) {
        return this.sendRequest({
            method: 'signEthereumTransaction',
            params: {
                fromAddress: params.fromAddress,
                toAddress: params.toAddress,
                weiValue: (0, util_1.bigIntStringFromBN)(params.weiValue),
                data: (0, util_1.hexStringFromBuffer)(params.data, true),
                nonce: params.nonce,
                gasPriceInWei: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
                maxFeePerGas: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
                maxPriorityFeePerGas: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
                gasLimit: params.gasLimit ? (0, util_1.bigIntStringFromBN)(params.gasLimit) : null,
                chainId: params.chainId,
                shouldSubmit: false
            }
        });
    }
    signAndSubmitEthereumTransaction(params) {
        return this.sendRequest({
            method: 'signEthereumTransaction',
            params: {
                fromAddress: params.fromAddress,
                toAddress: params.toAddress,
                weiValue: (0, util_1.bigIntStringFromBN)(params.weiValue),
                data: (0, util_1.hexStringFromBuffer)(params.data, true),
                nonce: params.nonce,
                gasPriceInWei: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
                maxFeePerGas: params.maxFeePerGas ? (0, util_1.bigIntStringFromBN)(params.maxFeePerGas) : null,
                maxPriorityFeePerGas: params.maxPriorityFeePerGas ? (0, util_1.bigIntStringFromBN)(params.maxPriorityFeePerGas) : null,
                gasLimit: params.gasLimit ? (0, util_1.bigIntStringFromBN)(params.gasLimit) : null,
                chainId: params.chainId,
                shouldSubmit: true
            }
        });
    }
    submitEthereumTransaction(signedTransaction, chainId) {
        return this.sendRequest({
            method: 'submitEthereumTransaction',
            params: {
                signedTransaction: (0, util_1.hexStringFromBuffer)(signedTransaction, true),
                chainId
            }
        });
    }
    scanQRCode(regExp) {
        return this.sendRequest({
            method: 'scanQRCode',
            params: {
                regExp
            }
        });
    }
    getQRCodeUrl() {
        return (0, util_1.createQrUrl)(this._session.id, this._session.secret, this.linkAPIUrl, false, this.options.version, this.dappDefaultChain);
    }
    genericRequest(data, action) {
        return this.sendRequest({
            method: 'generic',
            params: {
                action,
                data
            }
        });
    }
    sendGenericMessage(request) {
        return this.sendRequest(request);
    }
    sendRequest(request) {
        let hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error)=>{
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        const promise = new Promise((resolve, reject)=>{
            if (!this.ui.isStandalone()) {
                hideSnackbarItem = this.ui.showConnecting({
                    isUnlinkedErrorState: this.isUnlinkedErrorState,
                    onCancel: cancel,
                    onResetConnection: this.resetAndReload
                });
            }
            this.relayEventManager.callbacks.set(id, (response)=>{
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            if (this.ui.isStandalone()) {
                this.sendRequestStandalone(id, request);
            } else {
                this.publishWeb3RequestEvent(id, request);
            }
        });
        return {
            promise,
            cancel
        };
    }
    setConnectDisabled(disabled) {
        this.ui.setConnectDisabled(disabled);
    }
    setAccountsCallback(accountsCallback) {
        this.accountsCallback = accountsCallback;
    }
    setChainCallback(chainCallback) {
        this.chainCallback = chainCallback;
    }
    setDappDefaultChainCallback(chainId) {
        this.dappDefaultChain = chainId;
        if (this.ui instanceof WalletLinkRelayUI_1.WalletLinkRelayUI) {
            this.ui.setChainId(chainId);
        }
    }
    publishWeb3RequestEvent(id, request) {
        var _a;
        const message = {
            type: 'WEB3_REQUEST',
            id,
            request
        };
        const storedSession = Session_1.Session.load(this.storage);
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.WEB3_REQUEST, {
            eventId: message.id,
            method: `relay::${request.method}`,
            sessionIdHash: this.getSessionIdHash(),
            storedSessionIdHash: storedSession ? Session_1.Session.hash(storedSession.id) : '',
            isSessionMismatched: ((storedSession === null || storedSession === void 0 ? void 0 : storedSession.id) !== this._session.id).toString()
        });
        this.publishEvent('Web3Request', message, true).then((_)=>{
            var _a;
            (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.WEB3_REQUEST_PUBLISHED, {
                eventId: message.id,
                method: `relay::${request.method}`,
                sessionIdHash: this.getSessionIdHash(),
                storedSessionIdHash: storedSession ? Session_1.Session.hash(storedSession.id) : '',
                isSessionMismatched: ((storedSession === null || storedSession === void 0 ? void 0 : storedSession.id) !== this._session.id).toString()
            });
        }).catch((err)=>{
            this.handleWeb3ResponseMessage({
                type: 'WEB3_RESPONSE',
                id: message.id,
                response: {
                    method: request.method,
                    errorMessage: err.message
                }
            });
        });
    }
    publishWeb3RequestCanceledEvent(id) {
        const message = {
            type: 'WEB3_REQUEST_CANCELED',
            id
        };
        this.publishEvent('Web3RequestCanceled', message, false).then();
    }
    publishEvent(event, message, callWebhook) {
        return this.connection.publishEvent(event, message, callWebhook);
    }
    handleWeb3ResponseMessage(message) {
        var _a;
        const { response } = message;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.WEB3_RESPONSE, {
            eventId: message.id,
            method: `relay::${response.method}`,
            sessionIdHash: this.getSessionIdHash()
        });
        if (response.method === 'requestEthereumAccounts') {
            WalletLinkRelay.accountRequestCallbackIds.forEach((id)=>this.invokeCallback(Object.assign(Object.assign({}, message), {
                    id
                })));
            WalletLinkRelay.accountRequestCallbackIds.clear();
            return;
        }
        this.invokeCallback(message);
    }
    handleErrorResponse(id, method, error, errorCode) {
        var _a;
        const errorMessage = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : (0, error_1.getMessageFromCode)(errorCode);
        this.handleWeb3ResponseMessage({
            type: 'WEB3_RESPONSE',
            id,
            response: {
                method,
                errorMessage,
                errorCode
            }
        });
    }
    invokeCallback(message) {
        const callback = this.relayEventManager.callbacks.get(message.id);
        if (callback) {
            callback(message.response);
            this.relayEventManager.callbacks.delete(message.id);
        }
    }
    requestEthereumAccounts() {
        const request = {
            method: 'requestEthereumAccounts',
            params: {
                appName: this.appName,
                appLogoUrl: this.appLogoUrl || null
            }
        };
        const hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error)=>{
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ("TURBOPACK compile-time truthy", 1) ? void 0 : "TURBOPACK unreachable";
        };
        const promise = new Promise((resolve, reject)=>{
            this.relayEventManager.callbacks.set(id, (response)=>{
                this.ui.hideRequestEthereumAccounts();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ("TURBOPACK compile-time truthy", 1) ? void 0 : "TURBOPACK unreachable";
                if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            if (this.ui.inlineAccountsResponse()) {
                const onAccounts = (accounts)=>{
                    this.handleWeb3ResponseMessage({
                        type: 'WEB3_RESPONSE',
                        id,
                        response: {
                            method: 'requestEthereumAccounts',
                            result: accounts
                        }
                    });
                };
                this.ui.requestEthereumAccounts({
                    onCancel: cancel,
                    onAccounts
                });
            } else {
                // Error if user closes TryExtensionLinkDialog without connecting
                const err = error_1.standardErrors.provider.userRejectedRequest('User denied account authorization');
                this.ui.requestEthereumAccounts({
                    onCancel: ()=>cancel(err)
                });
            }
            WalletLinkRelay.accountRequestCallbackIds.add(id);
            if (!this.ui.inlineAccountsResponse() && !this.ui.isStandalone()) {
                this.publishWeb3RequestEvent(id, request);
            }
        });
        return {
            promise,
            cancel
        };
    }
    selectProvider(providerOptions) {
        const request = {
            method: 'selectProvider',
            params: {
                providerOptions
            }
        };
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error)=>{
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
        };
        const promise = new Promise((resolve, reject)=>{
            this.relayEventManager.callbacks.set(id, (response)=>{
                if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            const _cancel = (_error)=>{
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'selectProvider',
                        result: type_1.ProviderType.Unselected
                    }
                });
            };
            const approve = (selectedProviderKey)=>{
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'selectProvider',
                        result: selectedProviderKey
                    }
                });
            };
            if (this.ui.selectProvider) this.ui.selectProvider({
                onApprove: approve,
                onCancel: _cancel,
                providerOptions
            });
        });
        return {
            cancel,
            promise
        };
    }
    watchAsset(type, address, symbol, decimals, image, chainId) {
        const request = {
            method: 'watchAsset',
            params: {
                type,
                options: {
                    address,
                    symbol,
                    decimals,
                    image
                },
                chainId
            }
        };
        let hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error)=>{
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        if (!this.ui.inlineWatchAsset()) {
            hideSnackbarItem = this.ui.showConnecting({
                isUnlinkedErrorState: this.isUnlinkedErrorState,
                onCancel: cancel,
                onResetConnection: this.resetAndReload
            });
        }
        const promise = new Promise((resolve, reject)=>{
            this.relayEventManager.callbacks.set(id, (response)=>{
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            const _cancel = (_error)=>{
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'watchAsset',
                        result: false
                    }
                });
            };
            const approve = ()=>{
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'watchAsset',
                        result: true
                    }
                });
            };
            if (this.ui.inlineWatchAsset()) {
                this.ui.watchAsset({
                    onApprove: approve,
                    onCancel: _cancel,
                    type,
                    address,
                    symbol,
                    decimals,
                    image,
                    chainId
                });
            }
            if (!this.ui.inlineWatchAsset() && !this.ui.isStandalone()) {
                this.publishWeb3RequestEvent(id, request);
            }
        });
        return {
            cancel,
            promise
        };
    }
    addEthereumChain(chainId, rpcUrls, iconUrls, blockExplorerUrls, chainName, nativeCurrency) {
        const request = {
            method: 'addEthereumChain',
            params: {
                chainId,
                rpcUrls,
                blockExplorerUrls,
                chainName,
                iconUrls,
                nativeCurrency
            }
        };
        let hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error)=>{
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        if (!this.ui.inlineAddEthereumChain(chainId)) {
            hideSnackbarItem = this.ui.showConnecting({
                isUnlinkedErrorState: this.isUnlinkedErrorState,
                onCancel: cancel,
                onResetConnection: this.resetAndReload
            });
        }
        const promise = new Promise((resolve, reject)=>{
            this.relayEventManager.callbacks.set(id, (response)=>{
                hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
                if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            const _cancel = (_error)=>{
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'addEthereumChain',
                        result: {
                            isApproved: false,
                            rpcUrl: ''
                        }
                    }
                });
            };
            const approve = (rpcUrl)=>{
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'addEthereumChain',
                        result: {
                            isApproved: true,
                            rpcUrl
                        }
                    }
                });
            };
            if (this.ui.inlineAddEthereumChain(chainId)) {
                this.ui.addEthereumChain({
                    onCancel: _cancel,
                    onApprove: approve,
                    chainId: request.params.chainId,
                    rpcUrls: request.params.rpcUrls,
                    blockExplorerUrls: request.params.blockExplorerUrls,
                    chainName: request.params.chainName,
                    iconUrls: request.params.iconUrls,
                    nativeCurrency: request.params.nativeCurrency
                });
            }
            if (!this.ui.inlineAddEthereumChain(chainId) && !this.ui.isStandalone()) {
                this.publishWeb3RequestEvent(id, request);
            }
        });
        return {
            promise,
            cancel
        };
    }
    switchEthereumChain(chainId, address) {
        const request = {
            method: 'switchEthereumChain',
            params: Object.assign({
                chainId
            }, {
                address
            })
        };
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error)=>{
            this.publishWeb3RequestCanceledEvent(id);
            this.handleErrorResponse(id, request.method, error);
        };
        const promise = new Promise((resolve, reject)=>{
            this.relayEventManager.callbacks.set(id, (response)=>{
                if ((0, Web3Response_1.isErrorResponse)(response) && response.errorCode) {
                    return reject(error_1.standardErrors.provider.custom({
                        code: response.errorCode,
                        message: `Unrecognized chain ID. Try adding the chain using addEthereumChain first.`
                    }));
                } else if ((0, Web3Response_1.isErrorResponse)(response)) {
                    return reject(new Error(response.errorMessage));
                }
                resolve(response);
            });
            const _cancel = (error)=>{
                var _a;
                if (error) {
                    // backward compatibility
                    const errorCode = (_a = (0, error_1.getErrorCode)(error)) !== null && _a !== void 0 ? _a : error_1.standardErrorCodes.provider.unsupportedChain;
                    this.handleErrorResponse(id, 'switchEthereumChain', error instanceof Error ? error : error_1.standardErrors.provider.unsupportedChain(chainId), errorCode);
                } else {
                    this.handleWeb3ResponseMessage({
                        type: 'WEB3_RESPONSE',
                        id,
                        response: {
                            method: 'switchEthereumChain',
                            result: {
                                isApproved: false,
                                rpcUrl: ''
                            }
                        }
                    });
                }
            };
            const approve = (rpcUrl)=>{
                this.handleWeb3ResponseMessage({
                    type: 'WEB3_RESPONSE',
                    id,
                    response: {
                        method: 'switchEthereumChain',
                        result: {
                            isApproved: true,
                            rpcUrl
                        }
                    }
                });
            };
            this.ui.switchEthereumChain({
                onCancel: _cancel,
                onApprove: approve,
                chainId: request.params.chainId,
                address: request.params.address
            });
            if (!this.ui.inlineSwitchEthereumChain() && !this.ui.isStandalone()) {
                this.publishWeb3RequestEvent(id, request);
            }
        });
        return {
            promise,
            cancel
        };
    }
    inlineAddEthereumChain(chainId) {
        return this.ui.inlineAddEthereumChain(chainId);
    }
    getSessionIdHash() {
        return Session_1.Session.hash(this._session.id);
    }
    sendRequestStandalone(id, request) {
        const _cancel = (error)=>{
            this.handleErrorResponse(id, request.method, error);
        };
        const onSuccess = (response)=>{
            this.handleWeb3ResponseMessage({
                type: 'WEB3_RESPONSE',
                id,
                response
            });
        };
        switch(request.method){
            case 'signEthereumMessage':
                this.ui.signEthereumMessage({
                    request,
                    onSuccess,
                    onCancel: _cancel
                });
                break;
            case 'signEthereumTransaction':
                this.ui.signEthereumTransaction({
                    request,
                    onSuccess,
                    onCancel: _cancel
                });
                break;
            case 'submitEthereumTransaction':
                this.ui.submitEthereumTransaction({
                    request,
                    onSuccess,
                    onCancel: _cancel
                });
                break;
            case 'ethereumAddressFromSignedMessage':
                this.ui.ethereumAddressFromSignedMessage({
                    request,
                    onSuccess
                });
                break;
            default:
                _cancel();
                break;
        }
    }
}
exports.WalletLinkRelay = WalletLinkRelay;
WalletLinkRelay.accountRequestCallbackIds = new Set();
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/Snackbar/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/Snackbar/Snackbar.js [app-client] (ecmascript)"), exports);
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/RedirectDialog/RedirectDialog-css.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = (()=>`.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s;background-color:rgba(10,11,13,.5)}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box{display:block;position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);padding:20px;border-radius:8px;background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box p{display:block;font-weight:400;font-size:14px;line-height:20px;padding-bottom:12px;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box button{appearance:none;border:none;background:none;color:#0052ff;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark{background-color:#0a0b0d;color:#fff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark button{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light{background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light button{color:#0052ff}`)();
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/RedirectDialog/RedirectDialog.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RedirectDialog = void 0;
const clsx_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/clsx/dist/clsx.m.js [app-client] (ecmascript)"));
const preact_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/node_modules/preact/dist/preact.module.js [app-client] (ecmascript)");
const cssReset_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/lib/cssReset.js [app-client] (ecmascript)");
const Snackbar_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/Snackbar/index.js [app-client] (ecmascript)");
const RedirectDialog_css_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/RedirectDialog/RedirectDialog-css.js [app-client] (ecmascript)"));
class RedirectDialog {
    constructor(){
        this.root = null;
    }
    attach() {
        const el = document.documentElement;
        this.root = document.createElement('div');
        this.root.className = '-cbwsdk-css-reset';
        el.appendChild(this.root);
        (0, cssReset_1.injectCssReset)();
    }
    present(props) {
        this.render(props);
    }
    clear() {
        this.render(null);
    }
    render(props) {
        if (!this.root) return;
        (0, preact_1.render)(null, this.root);
        if (!props) return;
        (0, preact_1.render)((0, preact_1.h)(RedirectDialogContent, Object.assign({}, props, {
            onDismiss: ()=>{
                this.clear();
            }
        })), this.root);
    }
}
exports.RedirectDialog = RedirectDialog;
const RedirectDialogContent = ({ title, buttonText, darkMode, onButtonClick, onDismiss })=>{
    const theme = darkMode ? 'dark' : 'light';
    return (0, preact_1.h)(Snackbar_1.SnackbarContainer, {
        darkMode: darkMode
    }, (0, preact_1.h)("div", {
        class: "-cbwsdk-redirect-dialog"
    }, (0, preact_1.h)("style", null, RedirectDialog_css_1.default), (0, preact_1.h)("div", {
        class: "-cbwsdk-redirect-dialog-backdrop",
        onClick: onDismiss
    }), (0, preact_1.h)("div", {
        class: (0, clsx_1.default)('-cbwsdk-redirect-dialog-box', theme)
    }, (0, preact_1.h)("p", null, title), (0, preact_1.h)("button", {
        onClick: onButtonClick
    }, buttonText))));
};
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/mobile/MobileRelayUI.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MobileRelayUI = void 0;
const RedirectDialog_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/components/RedirectDialog/RedirectDialog.js [app-client] (ecmascript)");
// TODO: Implement & present in-page wallet picker instead of navigating to www.coinbase.com/connect-dapp
class MobileRelayUI {
    constructor(options){
        this.attached = false;
        this.darkMode = false;
        this.redirectDialog = new RedirectDialog_1.RedirectDialog();
        this.darkMode = options.darkMode;
    }
    attach() {
        if (this.attached) {
            throw new Error('Coinbase Wallet SDK UI is already attached');
        }
        this.redirectDialog.attach();
        this.attached = true;
    }
    setConnected(_connected) {}
    redirectToCoinbaseWallet(walletLinkUrl) {
        const url = new URL('https://go.cb-w.com/walletlink');
        url.searchParams.append('redirect_url', window.location.href);
        if (walletLinkUrl) {
            url.searchParams.append('wl_url', walletLinkUrl);
        }
        const anchorTag = document.createElement('a');
        anchorTag.target = 'cbw-opener';
        anchorTag.href = url.href;
        anchorTag.rel = 'noreferrer noopener';
        anchorTag.click();
    }
    openCoinbaseWalletDeeplink(walletLinkUrl) {
        this.redirectDialog.present({
            title: 'Redirecting to Coinbase Wallet...',
            buttonText: 'Open',
            darkMode: this.darkMode,
            onButtonClick: ()=>{
                this.redirectToCoinbaseWallet(walletLinkUrl);
            }
        });
        setTimeout(()=>{
            this.redirectToCoinbaseWallet(walletLinkUrl);
        }, 99);
    }
    showConnecting(_options) {
        // it uses the return callback to clear the dialog
        return ()=>{
            this.redirectDialog.clear();
        };
    }
    hideRequestEthereumAccounts() {
        this.redirectDialog.clear();
    }
    // -- Methods below are not needed for mobile
    requestEthereumAccounts() {}
    addEthereumChain() {}
    watchAsset() {}
    selectProvider() {}
    switchEthereumChain() {}
    signEthereumMessage() {}
    signEthereumTransaction() {}
    submitEthereumTransaction() {}
    ethereumAddressFromSignedMessage() {}
    reloadUI() {}
    setStandalone() {}
    setConnectDisabled() {}
    inlineAccountsResponse() {
        return false;
    }
    inlineAddEthereumChain() {
        return false;
    }
    inlineWatchAsset() {
        return false;
    }
    inlineSwitchEthereumChain() {
        return false;
    }
    isStandalone() {
        return false;
    }
}
exports.MobileRelayUI = MobileRelayUI;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/mobile/MobileRelay.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MobileRelay = void 0;
const util_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/util.js [app-client] (ecmascript)");
const WalletLinkRelay_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/WalletLinkRelay.js [app-client] (ecmascript)");
const MobileRelayUI_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/mobile/MobileRelayUI.js [app-client] (ecmascript)");
class MobileRelay extends WalletLinkRelay_1.WalletLinkRelay {
    constructor(options){
        var _a;
        super(options);
        this._enableMobileWalletLink = (_a = options.enableMobileWalletLink) !== null && _a !== void 0 ? _a : false;
    }
    // override
    requestEthereumAccounts() {
        if (this._enableMobileWalletLink) {
            return super.requestEthereumAccounts();
        }
        // TODO: Implement & present in-page wallet picker instead of navigating to www.coinbase.com/connect-dapp
        return {
            promise: new Promise(()=>{
                const location = (0, util_1.getLocation)();
                location.href = `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(location.href)}`;
            }),
            cancel: ()=>{}
        };
    }
    // override
    publishWeb3RequestEvent(id, request) {
        super.publishWeb3RequestEvent(id, request);
        if (!(this._enableMobileWalletLink && this.ui instanceof MobileRelayUI_1.MobileRelayUI)) return;
        let navigatedToCBW = false;
        // For mobile relay requests, open the Coinbase Wallet app
        switch(request.method){
            case 'requestEthereumAccounts':
            case 'connectAndSignIn':
                navigatedToCBW = true;
                this.ui.openCoinbaseWalletDeeplink(this.getQRCodeUrl());
                break;
            case 'switchEthereumChain':
                // switchEthereumChain doesn't need to open the app
                return;
            default:
                navigatedToCBW = true;
                this.ui.openCoinbaseWalletDeeplink();
                break;
        }
        // If the user navigated to the Coinbase Wallet app, then we need to check
        // for unseen events once the user returns to the browser
        if (navigatedToCBW) {
            window.addEventListener('blur', ()=>{
                window.addEventListener('focus', ()=>{
                    this.connection.checkUnseenEvents();
                }, {
                    once: true
                });
            }, {
                once: true
            });
        }
    }
    // override
    handleWeb3ResponseMessage(message) {
        super.handleWeb3ResponseMessage(message);
    }
    connectAndSignIn(params) {
        if (!this._enableMobileWalletLink) {
            throw new Error('connectAndSignIn is supported only when enableMobileWalletLink is on');
        }
        return this.sendRequest({
            method: 'connectAndSignIn',
            params: {
                appName: this.appName,
                appLogoUrl: this.appLogoUrl,
                domain: window.location.hostname,
                aud: window.location.href,
                version: '1',
                type: 'eip4361',
                nonce: params.nonce,
                iat: new Date().toISOString(),
                chainId: `eip155:${this.dappDefaultChain}`,
                statement: params.statement,
                resources: params.resources
            }
        });
    }
}
exports.MobileRelay = MobileRelay;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/vendor-js/eth-eip712-util/util.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Extracted from https://github.com/ethereumjs/ethereumjs-util and stripped out irrelevant code
// Original code licensed under the Mozilla Public License Version 2.0
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
const createKeccakHash = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/keccak/js.js [app-client] (ecmascript)");
const BN = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/bn.js/lib/bn.js [app-client] (ecmascript)");
/**
 * Returns a buffer filled with 0s
 * @method zeros
 * @param {Number} bytes  the number of bytes the buffer should be
 * @return {Buffer}
 */ function zeros(bytes) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(bytes).fill(0);
}
/**
 * Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @method setLength
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @param {Boolean} [right=false] whether to start padding form the left or right
 * @return {Buffer|Array}
 */ function setLength(msg, length, right) {
    const buf = zeros(length);
    msg = toBuffer(msg);
    if (right) {
        if (msg.length < length) {
            msg.copy(buf);
            return buf;
        }
        return msg.slice(0, length);
    } else {
        if (msg.length < length) {
            msg.copy(buf, length - msg.length);
            return buf;
        }
        return msg.slice(-length);
    }
}
/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @return {Buffer|Array}
 */ function setLengthRight(msg, length) {
    return setLength(msg, length, true);
}
/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.
 * @param {*} v the value
 */ function toBuffer(v) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(v)) {
        if (Array.isArray(v)) {
            v = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(v);
        } else if (typeof v === 'string') {
            if (isHexString(v)) {
                v = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(padToEven(stripHexPrefix(v)), 'hex');
            } else {
                v = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(v);
            }
        } else if (typeof v === 'number') {
            v = intToBuffer(v);
        } else if (v === null || v === undefined) {
            v = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].allocUnsafe(0);
        } else if (BN.isBN(v)) {
            v = v.toArrayLike(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"]);
        } else if (v.toArray) {
            // converts a BN to a Buffer
            v = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(v.toArray());
        } else {
            throw new Error('invalid type');
        }
    }
    return v;
}
/**
 * Converts a `Buffer` into a hex `String`
 * @param {Buffer} buf
 * @return {String}
 */ function bufferToHex(buf) {
    buf = toBuffer(buf);
    return '0x' + buf.toString('hex');
}
/**
 * Creates Keccak hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Number} [bits=256] the Keccak width
 * @return {Buffer}
 */ function keccak(a, bits) {
    a = toBuffer(a);
    if (!bits) bits = 256;
    return createKeccakHash('keccak' + bits).update(a).digest();
}
function padToEven(str) {
    return str.length % 2 ? '0' + str : str;
}
function isHexString(str) {
    return typeof str === 'string' && str.match(/^0x[0-9A-Fa-f]*$/);
}
function stripHexPrefix(str) {
    if (typeof str === 'string' && str.startsWith('0x')) {
        return str.slice(2);
    }
    return str;
}
module.exports = {
    zeros,
    setLength,
    setLengthRight,
    isHexString,
    stripHexPrefix,
    toBuffer,
    bufferToHex,
    keccak
};
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/vendor-js/eth-eip712-util/abi.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Extracted from https://github.com/ethereumjs/ethereumjs-abi and stripped out irrelevant code
// Original code licensed under the MIT License - Copyright (c) 2015 Alex Beregszaszi
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
const util = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/vendor-js/eth-eip712-util/util.js [app-client] (ecmascript)");
const BN = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/bn.js/lib/bn.js [app-client] (ecmascript)");
// Convert from short to canonical names
// FIXME: optimise or make this nicer?
function elementaryName(name) {
    if (name.startsWith('int[')) {
        return 'int256' + name.slice(3);
    } else if (name === 'int') {
        return 'int256';
    } else if (name.startsWith('uint[')) {
        return 'uint256' + name.slice(4);
    } else if (name === 'uint') {
        return 'uint256';
    } else if (name.startsWith('fixed[')) {
        return 'fixed128x128' + name.slice(5);
    } else if (name === 'fixed') {
        return 'fixed128x128';
    } else if (name.startsWith('ufixed[')) {
        return 'ufixed128x128' + name.slice(6);
    } else if (name === 'ufixed') {
        return 'ufixed128x128';
    }
    return name;
}
// Parse N from type<N>
function parseTypeN(type) {
    return parseInt(/^\D+(\d+)$/.exec(type)[1], 10);
}
// Parse N,M from type<N>x<M>
function parseTypeNxM(type) {
    var tmp = /^\D+(\d+)x(\d+)$/.exec(type);
    return [
        parseInt(tmp[1], 10),
        parseInt(tmp[2], 10)
    ];
}
// Parse N in type[<N>] where "type" can itself be an array type.
function parseTypeArray(type) {
    var tmp = type.match(/(.*)\[(.*?)\]$/);
    if (tmp) {
        return tmp[2] === '' ? 'dynamic' : parseInt(tmp[2], 10);
    }
    return null;
}
function parseNumber(arg) {
    var type = typeof arg;
    if (type === 'string') {
        if (util.isHexString(arg)) {
            return new BN(util.stripHexPrefix(arg), 16);
        } else {
            return new BN(arg, 10);
        }
    } else if (type === 'number') {
        return new BN(arg);
    } else if (arg.toArray) {
        // assume this is a BN for the moment, replace with BN.isBN soon
        return arg;
    } else {
        throw new Error('Argument is not a number');
    }
}
// Encodes a single item (can be dynamic array)
// @returns: Buffer
function encodeSingle(type, arg) {
    var size, num, ret, i;
    if (type === 'address') {
        return encodeSingle('uint160', parseNumber(arg));
    } else if (type === 'bool') {
        return encodeSingle('uint8', arg ? 1 : 0);
    } else if (type === 'string') {
        return encodeSingle('bytes', new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"](arg, 'utf8'));
    } else if (isArray(type)) {
        // this part handles fixed-length ([2]) and variable length ([]) arrays
        // NOTE: we catch here all calls to arrays, that simplifies the rest
        if (typeof arg.length === 'undefined') {
            throw new Error('Not an array?');
        }
        size = parseTypeArray(type);
        if (size !== 'dynamic' && size !== 0 && arg.length > size) {
            throw new Error('Elements exceed array size: ' + size);
        }
        ret = [];
        type = type.slice(0, type.lastIndexOf('['));
        if (typeof arg === 'string') {
            arg = JSON.parse(arg);
        }
        for(i in arg){
            ret.push(encodeSingle(type, arg[i]));
        }
        if (size === 'dynamic') {
            var length = encodeSingle('uint256', arg.length);
            ret.unshift(length);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].concat(ret);
    } else if (type === 'bytes') {
        arg = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"](arg);
        ret = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].concat([
            encodeSingle('uint256', arg.length),
            arg
        ]);
        if (arg.length % 32 !== 0) {
            ret = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].concat([
                ret,
                util.zeros(32 - arg.length % 32)
            ]);
        }
        return ret;
    } else if (type.startsWith('bytes')) {
        size = parseTypeN(type);
        if (size < 1 || size > 32) {
            throw new Error('Invalid bytes<N> width: ' + size);
        }
        return util.setLengthRight(arg, 32);
    } else if (type.startsWith('uint')) {
        size = parseTypeN(type);
        if (size % 8 || size < 8 || size > 256) {
            throw new Error('Invalid uint<N> width: ' + size);
        }
        num = parseNumber(arg);
        if (num.bitLength() > size) {
            throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
        }
        if (num < 0) {
            throw new Error('Supplied uint is negative');
        }
        return num.toArrayLike(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"], 'be', 32);
    } else if (type.startsWith('int')) {
        size = parseTypeN(type);
        if (size % 8 || size < 8 || size > 256) {
            throw new Error('Invalid int<N> width: ' + size);
        }
        num = parseNumber(arg);
        if (num.bitLength() > size) {
            throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
        }
        return num.toTwos(256).toArrayLike(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"], 'be', 32);
    } else if (type.startsWith('ufixed')) {
        size = parseTypeNxM(type);
        num = parseNumber(arg);
        if (num < 0) {
            throw new Error('Supplied ufixed is negative');
        }
        return encodeSingle('uint256', num.mul(new BN(2).pow(new BN(size[1]))));
    } else if (type.startsWith('fixed')) {
        size = parseTypeNxM(type);
        return encodeSingle('int256', parseNumber(arg).mul(new BN(2).pow(new BN(size[1]))));
    }
    throw new Error('Unsupported or invalid type: ' + type);
}
// Is a type dynamic?
function isDynamic(type) {
    // FIXME: handle all types? I don't think anything is missing now
    return type === 'string' || type === 'bytes' || parseTypeArray(type) === 'dynamic';
}
// Is a type an array?
function isArray(type) {
    return type.lastIndexOf(']') === type.length - 1;
}
// Encode a method/event with arguments
// @types an array of string type names
// @args  an array of the appropriate values
function rawEncode(types, values) {
    var output = [];
    var data = [];
    var headLength = 32 * types.length;
    for(var i in types){
        var type = elementaryName(types[i]);
        var value = values[i];
        var cur = encodeSingle(type, value);
        // Use the head/tail method for storing dynamic data
        if (isDynamic(type)) {
            output.push(encodeSingle('uint256', headLength));
            data.push(cur);
            headLength += cur.length;
        } else {
            output.push(cur);
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].concat(output.concat(data));
}
function solidityPack(types, values) {
    if (types.length !== values.length) {
        throw new Error('Number of types are not matching the values');
    }
    var size, num;
    var ret = [];
    for(var i = 0; i < types.length; i++){
        var type = elementaryName(types[i]);
        var value = values[i];
        if (type === 'bytes') {
            ret.push(value);
        } else if (type === 'string') {
            ret.push(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"](value, 'utf8'));
        } else if (type === 'bool') {
            ret.push(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"](value ? '01' : '00', 'hex'));
        } else if (type === 'address') {
            ret.push(util.setLength(value, 20));
        } else if (type.startsWith('bytes')) {
            size = parseTypeN(type);
            if (size < 1 || size > 32) {
                throw new Error('Invalid bytes<N> width: ' + size);
            }
            ret.push(util.setLengthRight(value, size));
        } else if (type.startsWith('uint')) {
            size = parseTypeN(type);
            if (size % 8 || size < 8 || size > 256) {
                throw new Error('Invalid uint<N> width: ' + size);
            }
            num = parseNumber(value);
            if (num.bitLength() > size) {
                throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
            }
            ret.push(num.toArrayLike(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"], 'be', size / 8));
        } else if (type.startsWith('int')) {
            size = parseTypeN(type);
            if (size % 8 || size < 8 || size > 256) {
                throw new Error('Invalid int<N> width: ' + size);
            }
            num = parseNumber(value);
            if (num.bitLength() > size) {
                throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
            }
            ret.push(num.toTwos(size).toArrayLike(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"], 'be', size / 8));
        } else {
            // FIXME: support all other types
            throw new Error('Unsupported or invalid type: ' + type);
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].concat(ret);
}
function soliditySHA3(types, values) {
    return util.keccak(solidityPack(types, values));
}
module.exports = {
    rawEncode,
    solidityPack,
    soliditySHA3
};
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/vendor-js/eth-eip712-util/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
const util = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/vendor-js/eth-eip712-util/util.js [app-client] (ecmascript)");
const abi = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/vendor-js/eth-eip712-util/abi.js [app-client] (ecmascript)");
const TYPED_MESSAGE_SCHEMA = {
    type: 'object',
    properties: {
        types: {
            type: 'object',
            additionalProperties: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        type: {
                            type: 'string'
                        }
                    },
                    required: [
                        'name',
                        'type'
                    ]
                }
            }
        },
        primaryType: {
            type: 'string'
        },
        domain: {
            type: 'object'
        },
        message: {
            type: 'object'
        }
    },
    required: [
        'types',
        'primaryType',
        'domain',
        'message'
    ]
};
/**
 * A collection of utility functions used for signing typed data
 */ const TypedDataUtils = {
    /**
   * Encodes an object by encoding and concatenating each of its members
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of an object
   */ encodeData (primaryType, data, types, useV4 = true) {
        const encodedTypes = [
            'bytes32'
        ];
        const encodedValues = [
            this.hashType(primaryType, types)
        ];
        if (useV4) {
            const encodeField = (name, type, value)=>{
                if (types[type] !== undefined) {
                    return [
                        'bytes32',
                        value == null ? '0x0000000000000000000000000000000000000000000000000000000000000000' : util.keccak(this.encodeData(type, value, types, useV4))
                    ];
                }
                if (value === undefined) throw new Error(`missing value for field ${name} of type ${type}`);
                if (type === 'bytes') {
                    return [
                        'bytes32',
                        util.keccak(value)
                    ];
                }
                if (type === 'string') {
                    // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
                    if (typeof value === 'string') {
                        value = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(value, 'utf8');
                    }
                    return [
                        'bytes32',
                        util.keccak(value)
                    ];
                }
                if (type.lastIndexOf(']') === type.length - 1) {
                    const parsedType = type.slice(0, type.lastIndexOf('['));
                    const typeValuePairs = value.map((item)=>encodeField(name, parsedType, item));
                    return [
                        'bytes32',
                        util.keccak(abi.rawEncode(typeValuePairs.map(([type])=>type), typeValuePairs.map(([, value])=>value)))
                    ];
                }
                return [
                    type,
                    value
                ];
            };
            for (const field of types[primaryType]){
                const [type, value] = encodeField(field.name, field.type, data[field.name]);
                encodedTypes.push(type);
                encodedValues.push(value);
            }
        } else {
            for (const field of types[primaryType]){
                let value = data[field.name];
                if (value !== undefined) {
                    if (field.type === 'bytes') {
                        encodedTypes.push('bytes32');
                        value = util.keccak(value);
                        encodedValues.push(value);
                    } else if (field.type === 'string') {
                        encodedTypes.push('bytes32');
                        // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
                        if (typeof value === 'string') {
                            value = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(value, 'utf8');
                        }
                        value = util.keccak(value);
                        encodedValues.push(value);
                    } else if (types[field.type] !== undefined) {
                        encodedTypes.push('bytes32');
                        value = util.keccak(this.encodeData(field.type, value, types, useV4));
                        encodedValues.push(value);
                    } else if (field.type.lastIndexOf(']') === field.type.length - 1) {
                        throw new Error('Arrays currently unimplemented in encodeData');
                    } else {
                        encodedTypes.push(field.type);
                        encodedValues.push(value);
                    }
                }
            }
        }
        return abi.rawEncode(encodedTypes, encodedValues);
    },
    /**
   * Encodes the type of an object by encoding a comma delimited list of its members
   *
   * @param {string} primaryType - Root type to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of the type of an object
   */ encodeType (primaryType, types) {
        let result = '';
        let deps = this.findTypeDependencies(primaryType, types).filter((dep)=>dep !== primaryType);
        deps = [
            primaryType
        ].concat(deps.sort());
        for (const type of deps){
            const children = types[type];
            if (!children) {
                throw new Error('No type definition specified: ' + type);
            }
            result += type + '(' + types[type].map(({ name, type })=>type + ' ' + name).join(',') + ')';
        }
        return result;
    },
    /**
   * Finds all types within a type defintion object
   *
   * @param {string} primaryType - Root type
   * @param {Object} types - Type definitions
   * @param {Array} results - current set of accumulated types
   * @returns {Array} - Set of all types found in the type definition
   */ findTypeDependencies (primaryType, types, results = []) {
        primaryType = primaryType.match(/^\w*/)[0];
        if (results.includes(primaryType) || types[primaryType] === undefined) {
            return results;
        }
        results.push(primaryType);
        for (const field of types[primaryType]){
            for (const dep of this.findTypeDependencies(field.type, types, results)){
                !results.includes(dep) && results.push(dep);
            }
        }
        return results;
    },
    /**
   * Hashes an object
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to hash
   * @param {Object} types - Type definitions
   * @returns {Buffer} - Hash of an object
   */ hashStruct (primaryType, data, types, useV4 = true) {
        return util.keccak(this.encodeData(primaryType, data, types, useV4));
    },
    /**
   * Hashes the type of an object
   *
   * @param {string} primaryType - Root type to hash
   * @param {Object} types - Type definitions
   * @returns {string} - Hash of an object
   */ hashType (primaryType, types) {
        return util.keccak(this.encodeType(primaryType, types));
    },
    /**
   * Removes properties from a message object that are not defined per EIP-712
   *
   * @param {Object} data - typed message object
   * @returns {Object} - typed message object with only allowed fields
   */ sanitizeData (data) {
        const sanitizedData = {};
        for(const key in TYPED_MESSAGE_SCHEMA.properties){
            data[key] && (sanitizedData[key] = data[key]);
        }
        if (sanitizedData.types) {
            sanitizedData.types = Object.assign({
                EIP712Domain: []
            }, sanitizedData.types);
        }
        return sanitizedData;
    },
    /**
   * Returns the hash of a typed message as per EIP-712 for signing
   *
   * @param {Object} typedData - Types message data to sign
   * @returns {string} - sha3 hash for signing
   */ hash (typedData, useV4 = true) {
        const sanitizedData = this.sanitizeData(typedData);
        const parts = [
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from('1901', 'hex')
        ];
        parts.push(this.hashStruct('EIP712Domain', sanitizedData.domain, sanitizedData.types, useV4));
        if (sanitizedData.primaryType !== 'EIP712Domain') {
            parts.push(this.hashStruct(sanitizedData.primaryType, sanitizedData.message, sanitizedData.types, useV4));
        }
        return util.keccak(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].concat(parts));
    }
};
module.exports = {
    TYPED_MESSAGE_SCHEMA,
    TypedDataUtils,
    hashForSignTypedDataLegacy: function(msgParams) {
        return typedSignatureHashLegacy(msgParams.data);
    },
    hashForSignTypedData_v3: function(msgParams) {
        return TypedDataUtils.hash(msgParams.data, false);
    },
    hashForSignTypedData_v4: function(msgParams) {
        return TypedDataUtils.hash(msgParams.data);
    }
};
/**
 * @param typedData - Array of data along with types, as per EIP712.
 * @returns Buffer
 */ function typedSignatureHashLegacy(typedData) {
    const error = new Error('Expect argument to be non-empty array');
    if (typeof typedData !== 'object' || !typedData.length) throw error;
    const data = typedData.map(function(e) {
        return e.type === 'bytes' ? util.toBuffer(e.value) : e.value;
    });
    const types = typedData.map(function(e) {
        return e.type;
    });
    const schema = typedData.map(function(e) {
        if (!e.name) throw error;
        return e.type + ' ' + e.name;
    });
    return abi.soliditySHA3([
        'bytes32',
        'bytes32'
    ], [
        abi.soliditySHA3(new Array(typedData.length).fill('string'), schema),
        abi.soliditySHA3(types, data)
    ]);
}
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/FilterPolyfill.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterFromParam = exports.FilterPolyfill = void 0;
const type_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/type.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/util.js [app-client] (ecmascript)");
const TIMEOUT = 5 * 60 * 1000; // 5 minutes
const JSONRPC_TEMPLATE = {
    jsonrpc: '2.0',
    id: 0
};
class FilterPolyfill {
    constructor(provider){
        this.logFilters = new Map(); // <id, filter>
        this.blockFilters = new Set(); // <id>
        this.pendingTransactionFilters = new Set(); // <id, true>
        this.cursors = new Map(); // <id, cursor>
        this.timeouts = new Map(); // <id, setTimeout id>
        this.nextFilterId = (0, type_1.IntNumber)(1);
        this.REQUEST_THROTTLE_INTERVAL = 1000; // in milliseconds
        this.lastFetchTimestamp = new Date(0);
        this.resolvers = [];
        this.provider = provider;
    }
    async newFilter(param) {
        const filter = filterFromParam(param);
        const id = this.makeFilterId();
        const cursor = await this.setInitialCursorPosition(id, filter.fromBlock);
        console.info(`Installing new log filter(${id}):`, filter, 'initial cursor position:', cursor);
        this.logFilters.set(id, filter);
        this.setFilterTimeout(id);
        return (0, util_1.hexStringFromIntNumber)(id);
    }
    async newBlockFilter() {
        const id = this.makeFilterId();
        const cursor = await this.setInitialCursorPosition(id, 'latest');
        console.info(`Installing new block filter (${id}) with initial cursor position:`, cursor);
        this.blockFilters.add(id);
        this.setFilterTimeout(id);
        return (0, util_1.hexStringFromIntNumber)(id);
    }
    async newPendingTransactionFilter() {
        const id = this.makeFilterId();
        const cursor = await this.setInitialCursorPosition(id, 'latest');
        console.info(`Installing new block filter (${id}) with initial cursor position:`, cursor);
        this.pendingTransactionFilters.add(id);
        this.setFilterTimeout(id);
        return (0, util_1.hexStringFromIntNumber)(id);
    }
    uninstallFilter(filterId) {
        const id = (0, util_1.intNumberFromHexString)(filterId);
        console.info(`Uninstalling filter (${id})`);
        this.deleteFilter(id);
        return true;
    }
    getFilterChanges(filterId) {
        const id = (0, util_1.intNumberFromHexString)(filterId);
        if (this.timeouts.has(id)) {
            // extend timeout
            this.setFilterTimeout(id);
        }
        if (this.logFilters.has(id)) {
            return this.getLogFilterChanges(id);
        } else if (this.blockFilters.has(id)) {
            return this.getBlockFilterChanges(id);
        } else if (this.pendingTransactionFilters.has(id)) {
            return this.getPendingTransactionFilterChanges(id);
        }
        return Promise.resolve(filterNotFoundError());
    }
    async getFilterLogs(filterId) {
        const id = (0, util_1.intNumberFromHexString)(filterId);
        const filter = this.logFilters.get(id);
        if (!filter) {
            return filterNotFoundError();
        }
        return this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
            method: 'eth_getLogs',
            params: [
                paramFromFilter(filter)
            ]
        }));
    }
    makeFilterId() {
        return (0, type_1.IntNumber)(++this.nextFilterId);
    }
    sendAsyncPromise(request) {
        return new Promise((resolve, reject)=>{
            this.provider.sendAsync(request, (err, response)=>{
                if (err) {
                    return reject(err);
                }
                if (Array.isArray(response) || response == null) {
                    return reject(new Error(`unexpected response received: ${JSON.stringify(response)}`));
                }
                resolve(response);
            });
        });
    }
    deleteFilter(id) {
        console.info(`Deleting filter (${id})`);
        this.logFilters.delete(id);
        this.blockFilters.delete(id);
        this.pendingTransactionFilters.delete(id);
        this.cursors.delete(id);
        this.timeouts.delete(id);
    }
    async getLogFilterChanges(id) {
        const filter = this.logFilters.get(id);
        const cursorPosition = this.cursors.get(id);
        if (!cursorPosition || !filter) {
            return filterNotFoundError();
        }
        const currentBlockHeight = await this.getCurrentBlockHeight();
        const toBlock = filter.toBlock === 'latest' ? currentBlockHeight : filter.toBlock;
        if (cursorPosition > currentBlockHeight) {
            return emptyResult();
        }
        if (cursorPosition > Number(filter.toBlock)) {
            return emptyResult();
        }
        console.info(`Fetching logs from ${cursorPosition} to ${toBlock} for filter ${id}`);
        const response = await this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
            method: 'eth_getLogs',
            params: [
                paramFromFilter(Object.assign(Object.assign({}, filter), {
                    fromBlock: cursorPosition,
                    toBlock
                }))
            ]
        }));
        if (Array.isArray(response.result)) {
            const blocks = response.result.map((log)=>(0, util_1.intNumberFromHexString)(log.blockNumber || '0x0'));
            const highestBlock = Math.max(...blocks);
            if (highestBlock && highestBlock > cursorPosition) {
                const newCursorPosition = (0, type_1.IntNumber)(highestBlock + 1);
                console.info(`Moving cursor position for filter (${id}) from ${cursorPosition} to ${newCursorPosition}`);
                this.cursors.set(id, newCursorPosition);
            }
        }
        return response;
    }
    async getBlockFilterChanges(id) {
        const cursorPosition = this.cursors.get(id);
        if (!cursorPosition) {
            return filterNotFoundError();
        }
        const currentBlockHeight = await this.getCurrentBlockHeight();
        if (cursorPosition > currentBlockHeight) {
            return emptyResult();
        }
        console.info(`Fetching blocks from ${cursorPosition} to ${currentBlockHeight} for filter (${id})`);
        const blocks = (await Promise.all(// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        (0, util_1.range)(cursorPosition, currentBlockHeight + 1).map((i)=>this.getBlockHashByNumber((0, type_1.IntNumber)(i))))).filter((hash)=>!!hash);
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const newCursorPosition = (0, type_1.IntNumber)(cursorPosition + blocks.length);
        console.info(`Moving cursor position for filter (${id}) from ${cursorPosition} to ${newCursorPosition}`);
        this.cursors.set(id, newCursorPosition);
        return Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
            result: blocks
        });
    }
    async getPendingTransactionFilterChanges(_id) {
        // pending transaction filters are not supported
        return Promise.resolve(emptyResult());
    }
    async setInitialCursorPosition(id, startBlock) {
        const currentBlockHeight = await this.getCurrentBlockHeight();
        const initialCursorPosition = typeof startBlock === 'number' && startBlock > currentBlockHeight ? startBlock : currentBlockHeight;
        this.cursors.set(id, initialCursorPosition);
        return initialCursorPosition;
    }
    setFilterTimeout(id) {
        const existing = this.timeouts.get(id);
        if (existing) {
            window.clearTimeout(existing);
        }
        const timeout = window.setTimeout(()=>{
            console.info(`Filter (${id}) timed out`);
            this.deleteFilter(id);
        }, TIMEOUT);
        this.timeouts.set(id, timeout);
    }
    // throttle eth_blockNumber requests
    async getCurrentBlockHeight() {
        const now = new Date();
        if (now.getTime() - this.lastFetchTimestamp.getTime() > this.REQUEST_THROTTLE_INTERVAL) {
            this.lastFetchTimestamp = now;
            const height = await this._getCurrentBlockHeight();
            this.currentBlockHeight = height;
            this.resolvers.forEach((resolve)=>resolve(height));
            this.resolvers = [];
        }
        if (!this.currentBlockHeight) {
            return new Promise((resolve)=>this.resolvers.push(resolve));
        }
        return this.currentBlockHeight;
    }
    async _getCurrentBlockHeight() {
        const { result } = await this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
            method: 'eth_blockNumber',
            params: []
        }));
        return (0, util_1.intNumberFromHexString)((0, util_1.ensureHexString)(result));
    }
    async getBlockHashByNumber(blockNumber) {
        const response = await this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
            method: 'eth_getBlockByNumber',
            params: [
                (0, util_1.hexStringFromIntNumber)(blockNumber),
                false
            ]
        }));
        if (response.result && typeof response.result.hash === 'string') {
            return (0, util_1.ensureHexString)(response.result.hash);
        }
        return null;
    }
}
exports.FilterPolyfill = FilterPolyfill;
function filterFromParam(param) {
    return {
        fromBlock: intBlockHeightFromHexBlockHeight(param.fromBlock),
        toBlock: intBlockHeightFromHexBlockHeight(param.toBlock),
        addresses: param.address === undefined ? null : Array.isArray(param.address) ? param.address : [
            param.address
        ],
        topics: param.topics || []
    };
}
exports.filterFromParam = filterFromParam;
function paramFromFilter(filter) {
    const param = {
        fromBlock: hexBlockHeightFromIntBlockHeight(filter.fromBlock),
        toBlock: hexBlockHeightFromIntBlockHeight(filter.toBlock),
        topics: filter.topics
    };
    if (filter.addresses !== null) {
        param.address = filter.addresses;
    }
    return param;
}
function intBlockHeightFromHexBlockHeight(value) {
    if (value === undefined || value === 'latest' || value === 'pending') {
        return 'latest';
    } else if (value === 'earliest') {
        return (0, type_1.IntNumber)(0);
    } else if ((0, util_1.isHexString)(value)) {
        return (0, util_1.intNumberFromHexString)(value);
    }
    throw new Error(`Invalid block option: ${String(value)}`);
}
function hexBlockHeightFromIntBlockHeight(value) {
    if (value === 'latest') {
        return value;
    }
    return (0, util_1.hexStringFromIntNumber)(value);
}
function filterNotFoundError() {
    return Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
        error: {
            code: -32000,
            message: 'filter not found'
        }
    });
}
function emptyResult() {
    return Object.assign(Object.assign({}, JSONRPC_TEMPLATE), {
        result: []
    });
}
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/SubscriptionManager.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubscriptionManager = void 0;
const eth_block_tracker_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/eth-block-tracker/dist/index.js [app-client] (ecmascript)");
// TODO: When we update this package we should be able to fix this
//  eslint-disable-next-line @typescript-eslint/no-var-requires
const createSubscriptionManager = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/eth-json-rpc-filters/subscriptionManager.js [app-client] (ecmascript)");
const noop = ()=>{};
class SubscriptionManager {
    constructor(provider){
        const blockTracker = new eth_block_tracker_1.PollingBlockTracker({
            provider: provider,
            pollingInterval: 15000,
            setSkipCacheFlag: true
        });
        const { events, middleware } = createSubscriptionManager({
            blockTracker,
            provider
        });
        this.events = events;
        this.subscriptionMiddleware = middleware;
    }
    async handleRequest(request) {
        const result = {};
        await this.subscriptionMiddleware(request, result, noop, noop);
        return result;
    }
    destroy() {
        this.subscriptionMiddleware.destroy();
    }
}
exports.SubscriptionManager = SubscriptionManager;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/CoinbaseWalletProvider.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */ // TODO: Address linting issues
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CoinbaseWalletProvider = void 0;
// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
const bn_js_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/bn.js/lib/bn.js [app-client] (ecmascript)"));
const eventemitter3_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/eventemitter3/index.js [app-client] (ecmascript)");
const error_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/error/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/util.js [app-client] (ecmascript)");
const MobileRelay_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/mobile/MobileRelay.js [app-client] (ecmascript)");
const RelayAbstract_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/RelayAbstract.js [app-client] (ecmascript)");
const Session_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/Session.js [app-client] (ecmascript)");
const Web3Response_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/type/Web3Response.js [app-client] (ecmascript)");
const eth_eip712_util_1 = __importDefault(__turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/vendor-js/eth-eip712-util/index.js [app-client] (ecmascript)"));
const DiagnosticLogger_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/DiagnosticLogger.js [app-client] (ecmascript)");
const FilterPolyfill_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/FilterPolyfill.js [app-client] (ecmascript)");
const SubscriptionManager_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/SubscriptionManager.js [app-client] (ecmascript)");
const DEFAULT_CHAIN_ID_KEY = 'DefaultChainId';
const DEFAULT_JSON_RPC_URL = 'DefaultJsonRpcUrl';
class CoinbaseWalletProvider extends eventemitter3_1.EventEmitter {
    constructor(options){
        var _a, _b;
        super();
        this._filterPolyfill = new FilterPolyfill_1.FilterPolyfill(this);
        this._subscriptionManager = new SubscriptionManager_1.SubscriptionManager(this);
        this._relay = null;
        this._addresses = [];
        this.hasMadeFirstChainChangedEmission = false;
        this.setProviderInfo = this.setProviderInfo.bind(this);
        this.updateProviderInfo = this.updateProviderInfo.bind(this);
        this.getChainId = this.getChainId.bind(this);
        this.setAppInfo = this.setAppInfo.bind(this);
        this.enable = this.enable.bind(this);
        this.close = this.close.bind(this);
        this.send = this.send.bind(this);
        this.sendAsync = this.sendAsync.bind(this);
        this.request = this.request.bind(this);
        this._setAddresses = this._setAddresses.bind(this);
        this.scanQRCode = this.scanQRCode.bind(this);
        this.genericRequest = this.genericRequest.bind(this);
        this._chainIdFromOpts = options.chainId;
        this._jsonRpcUrlFromOpts = options.jsonRpcUrl;
        this._overrideIsMetaMask = options.overrideIsMetaMask;
        this._relayProvider = options.relayProvider;
        this._storage = options.storage;
        this._relayEventManager = options.relayEventManager;
        this.diagnostic = options.diagnosticLogger;
        this.reloadOnDisconnect = true;
        this.isCoinbaseWallet = (_a = options.overrideIsCoinbaseWallet) !== null && _a !== void 0 ? _a : true;
        this.isCoinbaseBrowser = (_b = options.overrideIsCoinbaseBrowser) !== null && _b !== void 0 ? _b : false;
        this.qrUrl = options.qrUrl;
        const chainId = this.getChainId();
        const chainIdStr = (0, util_1.prepend0x)(chainId.toString(16));
        // indicate that we've connected, for EIP-1193 compliance
        this.emit('connect', {
            chainIdStr
        });
        const cachedAddresses = this._storage.getItem(RelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY);
        if (cachedAddresses) {
            const addresses = cachedAddresses.split(' ');
            if (addresses[0] !== '') {
                this._addresses = addresses.map((address)=>(0, util_1.ensureAddressString)(address));
                this.emit('accountsChanged', addresses);
            }
        }
        this._subscriptionManager.events.on('notification', (notification)=>{
            this.emit('message', {
                type: notification.method,
                data: notification.params
            });
        });
        if (this._isAuthorized()) {
            void this.initializeRelay();
        }
        window.addEventListener('message', (event)=>{
            var _a;
            // Used to verify the source and window are correct before proceeding
            if (event.origin !== location.origin || event.source !== window) {
                return;
            }
            if (event.data.type !== 'walletLinkMessage') return; // compatibility with CBW extension
            if (event.data.data.action === 'dappChainSwitched') {
                const _chainId = event.data.data.chainId;
                const jsonRpcUrl = (_a = event.data.data.jsonRpcUrl) !== null && _a !== void 0 ? _a : this.jsonRpcUrl;
                this.updateProviderInfo(jsonRpcUrl, Number(_chainId));
            }
        });
    }
    /** @deprecated Use `.request({ method: 'eth_accounts' })` instead. */ get selectedAddress() {
        return this._addresses[0] || undefined;
    }
    /** @deprecated Use the chain ID. If you still need the network ID, use `.request({ method: 'net_version' })`. */ get networkVersion() {
        return this.getChainId().toString(10);
    }
    /** @deprecated Use `.request({ method: 'eth_chainId' })` instead. */ get chainId() {
        return (0, util_1.prepend0x)(this.getChainId().toString(16));
    }
    get isWalletLink() {
        // backward compatibility
        return true;
    }
    /**
     * Some DApps (i.e. Alpha Homora) seem to require the window.ethereum object return
     * true for this method.
     */ get isMetaMask() {
        return this._overrideIsMetaMask;
    }
    get host() {
        return this.jsonRpcUrl;
    }
    get connected() {
        return true;
    }
    isConnected() {
        return true;
    }
    get jsonRpcUrl() {
        var _a;
        return (_a = this._storage.getItem(DEFAULT_JSON_RPC_URL)) !== null && _a !== void 0 ? _a : this._jsonRpcUrlFromOpts;
    }
    set jsonRpcUrl(value) {
        this._storage.setItem(DEFAULT_JSON_RPC_URL, value);
    }
    disableReloadOnDisconnect() {
        this.reloadOnDisconnect = false;
    }
    setProviderInfo(jsonRpcUrl, chainId) {
        if (!this.isCoinbaseBrowser) {
            this._chainIdFromOpts = chainId;
            this._jsonRpcUrlFromOpts = jsonRpcUrl;
        }
        this.updateProviderInfo(this.jsonRpcUrl, this.getChainId());
    }
    updateProviderInfo(jsonRpcUrl, chainId) {
        this.jsonRpcUrl = jsonRpcUrl;
        // emit chainChanged event if necessary
        const originalChainId = this.getChainId();
        this._storage.setItem(DEFAULT_CHAIN_ID_KEY, chainId.toString(10));
        const chainChanged = (0, util_1.ensureIntNumber)(chainId) !== originalChainId;
        if (chainChanged || !this.hasMadeFirstChainChangedEmission) {
            this.emit('chainChanged', this.getChainId());
            this.hasMadeFirstChainChangedEmission = true;
        }
    }
    async watchAsset(type, address, symbol, decimals, image, chainId) {
        const relay = await this.initializeRelay();
        const result = await relay.watchAsset(type, address, symbol, decimals, image, chainId === null || chainId === void 0 ? void 0 : chainId.toString()).promise;
        if ((0, Web3Response_1.isErrorResponse)(result)) return false;
        return !!result.result;
    }
    async addEthereumChain(chainId, rpcUrls, blockExplorerUrls, chainName, iconUrls, nativeCurrency) {
        var _a, _b;
        if ((0, util_1.ensureIntNumber)(chainId) === this.getChainId()) {
            return false;
        }
        const relay = await this.initializeRelay();
        const isWhitelistedNetworkOrStandalone = relay.inlineAddEthereumChain(chainId.toString());
        if (!this._isAuthorized() && !isWhitelistedNetworkOrStandalone) {
            await relay.requestEthereumAccounts().promise;
        }
        const res = await relay.addEthereumChain(chainId.toString(), rpcUrls, iconUrls, blockExplorerUrls, chainName, nativeCurrency).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) return false;
        if (((_a = res.result) === null || _a === void 0 ? void 0 : _a.isApproved) === true) {
            this.updateProviderInfo(rpcUrls[0], chainId);
        }
        return ((_b = res.result) === null || _b === void 0 ? void 0 : _b.isApproved) === true;
    }
    async switchEthereumChain(chainId) {
        const relay = await this.initializeRelay();
        const res = await relay.switchEthereumChain(chainId.toString(10), this.selectedAddress || undefined).promise;
        // backward compatibility
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            if (!res.errorCode) return;
            if (res.errorCode === error_1.standardErrorCodes.provider.unsupportedChain) {
                throw error_1.standardErrors.provider.unsupportedChain();
            } else {
                throw error_1.standardErrors.provider.custom({
                    message: res.errorMessage,
                    code: res.errorCode
                });
            }
        }
        const switchResponse = res.result;
        if (switchResponse.isApproved && switchResponse.rpcUrl.length > 0) {
            this.updateProviderInfo(switchResponse.rpcUrl, chainId);
        }
    }
    setAppInfo(appName, appLogoUrl) {
        void this.initializeRelay().then((relay)=>relay.setAppInfo(appName, appLogoUrl));
    }
    /** @deprecated Use `.request({ method: 'eth_requestAccounts' })` instead. */ async enable() {
        var _a;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.ETH_ACCOUNTS_STATE, {
            method: 'provider::enable',
            addresses_length: this._addresses.length,
            sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : undefined
        });
        if (this._isAuthorized()) {
            return [
                ...this._addresses
            ];
        }
        return await this.send('eth_requestAccounts');
    }
    async close() {
        const relay = await this.initializeRelay();
        relay.resetAndReload();
    }
    send(requestOrMethod, callbackOrParams) {
        // send<T>(method, params): Promise<T>
        try {
            const result = this._send(requestOrMethod, callbackOrParams);
            if (result instanceof Promise) {
                return result.catch((error)=>{
                    throw (0, error_1.serializeError)(error, requestOrMethod);
                });
            }
        } catch (error) {
            throw (0, error_1.serializeError)(error, requestOrMethod);
        }
    }
    _send(requestOrMethod, callbackOrParams) {
        if (typeof requestOrMethod === 'string') {
            const method = requestOrMethod;
            const params = Array.isArray(callbackOrParams) ? callbackOrParams : callbackOrParams !== undefined ? [
                callbackOrParams
            ] : [];
            const request = {
                jsonrpc: '2.0',
                id: 0,
                method,
                params
            };
            return this._sendRequestAsync(request).then((res)=>res.result);
        }
        // send(JSONRPCRequest | JSONRPCRequest[], callback): void
        if (typeof callbackOrParams === 'function') {
            const request = requestOrMethod;
            const callback = callbackOrParams;
            return this._sendAsync(request, callback);
        }
        // send(JSONRPCRequest[]): JSONRPCResponse[]
        if (Array.isArray(requestOrMethod)) {
            const requests = requestOrMethod;
            return requests.map((r)=>this._sendRequest(r));
        }
        // send(JSONRPCRequest): JSONRPCResponse
        const req = requestOrMethod;
        return this._sendRequest(req);
    }
    async sendAsync(request, callback) {
        try {
            return this._sendAsync(request, callback).catch((error)=>{
                throw (0, error_1.serializeError)(error, request);
            });
        } catch (error) {
            return Promise.reject((0, error_1.serializeError)(error, request));
        }
    }
    async _sendAsync(request, callback) {
        if (typeof callback !== 'function') {
            throw new Error('callback is required');
        }
        // send(JSONRPCRequest[], callback): void
        if (Array.isArray(request)) {
            const arrayCb = callback;
            this._sendMultipleRequestsAsync(request).then((responses)=>arrayCb(null, responses)).catch((err)=>arrayCb(err, null));
            return;
        }
        // send(JSONRPCRequest, callback): void
        const cb = callback;
        return this._sendRequestAsync(request).then((response)=>cb(null, response)).catch((err)=>cb(err, null));
    }
    async request(args) {
        try {
            return this._request(args).catch((error)=>{
                throw (0, error_1.serializeError)(error, args.method);
            });
        } catch (error) {
            return Promise.reject((0, error_1.serializeError)(error, args.method));
        }
    }
    async _request(args) {
        if (!args || typeof args !== 'object' || Array.isArray(args)) {
            throw error_1.standardErrors.rpc.invalidRequest({
                message: 'Expected a single, non-array, object argument.',
                data: args
            });
        }
        const { method, params } = args;
        if (typeof method !== 'string' || method.length === 0) {
            throw error_1.standardErrors.rpc.invalidRequest({
                message: "'args.method' must be a non-empty string.",
                data: args
            });
        }
        if (params !== undefined && !Array.isArray(params) && (typeof params !== 'object' || params === null)) {
            throw error_1.standardErrors.rpc.invalidRequest({
                message: "'args.params' must be an object or array if provided.",
                data: args
            });
        }
        const newParams = params === undefined ? [] : params;
        // Coinbase Wallet Requests
        const id = this._relayEventManager.makeRequestId();
        const result = await this._sendRequestAsync({
            method,
            params: newParams,
            jsonrpc: '2.0',
            id
        });
        return result.result;
    }
    async scanQRCode(match) {
        const relay = await this.initializeRelay();
        const res = await relay.scanQRCode((0, util_1.ensureRegExpString)(match)).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw (0, error_1.serializeError)(res.errorMessage, 'scanQRCode');
        } else if (typeof res.result !== 'string') {
            throw (0, error_1.serializeError)('result was not a string', 'scanQRCode');
        }
        return res.result;
    }
    async genericRequest(data, action) {
        const relay = await this.initializeRelay();
        const res = await relay.genericRequest(data, action).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw (0, error_1.serializeError)(res.errorMessage, 'generic');
        } else if (typeof res.result !== 'string') {
            throw (0, error_1.serializeError)('result was not a string', 'generic');
        }
        return res.result;
    }
    /**
     * @beta
     * This method is currently in beta. While it is available for use, please note that it is still under testing and may undergo significant changes.
     *
     * @remarks
     * IMPORTANT: Signature validation is not performed by this method. Users of this method are advised to perform their own signature validation.
     * Common web3 frontend libraries such as ethers.js and viem provide the `verifyMessage` utility function that can be used for signature validation.
     *
     * It combines `eth_requestAccounts` and "Sign-In with Ethereum" (EIP-4361) into a single call.
     * The returned account and signed message can be used to authenticate the user.
     *
     * @param {Object} params - An object with the following properties:
     * - `nonce` {string}: A unique string to prevent replay attacks.
     * - `statement` {string}: An optional human-readable ASCII assertion that the user will sign.
     * - `resources` {string[]}: An optional list of information the user wishes to have resolved as part of authentication by the relying party.
     *
     * @returns {Promise<ConnectAndSignInResponse>} A promise that resolves to an object with the following properties:
     * - `accounts` {string[]}: The Ethereum accounts of the user.
     * - `message` {string}: The overall message that the user signed. Hex encoded.
     * - `signature` {string}: The signature of the message, signed with the user's private key. Hex encoded.
     */ async connectAndSignIn(params) {
        // NOTE: It was intentionally built by following the pattern of the existing eth_requestAccounts method
        // to maintain consistency and avoid introducing a new pattern.
        // We acknowledge the need for a better design, and it is planned to address and improve it in a future refactor.
        var _a;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.ETH_ACCOUNTS_STATE, {
            method: 'provider::connectAndSignIn',
            sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : undefined
        });
        let res;
        try {
            const relay = await this.initializeRelay();
            if (!(relay instanceof MobileRelay_1.MobileRelay)) {
                throw new Error('connectAndSignIn is only supported on mobile');
            }
            res = await relay.connectAndSignIn(params).promise;
            if ((0, Web3Response_1.isErrorResponse)(res)) {
                throw new Error(res.errorMessage);
            }
        } catch (err) {
            if (typeof err.message === 'string' && err.message.match(/(denied|rejected)/i)) {
                throw error_1.standardErrors.provider.userRejectedRequest('User denied account authorization');
            }
            throw err;
        }
        if (!res.result) {
            throw new Error('accounts received is empty');
        }
        const { accounts } = res.result;
        this._setAddresses(accounts);
        if (!this.isCoinbaseBrowser) {
            await this.switchEthereumChain(this.getChainId());
        }
        return res.result;
    }
    async selectProvider(providerOptions) {
        const relay = await this.initializeRelay();
        const res = await relay.selectProvider(providerOptions).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw (0, error_1.serializeError)(res.errorMessage, 'selectProvider');
        } else if (typeof res.result !== 'string') {
            throw (0, error_1.serializeError)('result was not a string', 'selectProvider');
        }
        return res.result;
    }
    supportsSubscriptions() {
        return false;
    }
    subscribe() {
        throw new Error('Subscriptions are not supported');
    }
    unsubscribe() {
        throw new Error('Subscriptions are not supported');
    }
    disconnect() {
        return true;
    }
    _sendRequest(request) {
        const response = {
            jsonrpc: '2.0',
            id: request.id
        };
        const { method } = request;
        response.result = this._handleSynchronousMethods(request);
        if (response.result === undefined) {
            throw new Error(`Coinbase Wallet does not support calling ${method} synchronously without ` + `a callback. Please provide a callback parameter to call ${method} ` + `asynchronously.`);
        }
        return response;
    }
    _setAddresses(addresses, _) {
        if (!Array.isArray(addresses)) {
            throw new Error('addresses is not an array');
        }
        const newAddresses = addresses.map((address)=>(0, util_1.ensureAddressString)(address));
        if (JSON.stringify(newAddresses) === JSON.stringify(this._addresses)) {
            return;
        }
        this._addresses = newAddresses;
        this.emit('accountsChanged', this._addresses);
        this._storage.setItem(RelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY, newAddresses.join(' '));
    }
    _sendRequestAsync(request) {
        return new Promise((resolve, reject)=>{
            try {
                const syncResult = this._handleSynchronousMethods(request);
                if (syncResult !== undefined) {
                    return resolve({
                        jsonrpc: '2.0',
                        id: request.id,
                        result: syncResult
                    });
                }
                const filterPromise = this._handleAsynchronousFilterMethods(request);
                if (filterPromise !== undefined) {
                    filterPromise.then((res)=>resolve(Object.assign(Object.assign({}, res), {
                            id: request.id
                        }))).catch((err)=>reject(err));
                    return;
                }
                const subscriptionPromise = this._handleSubscriptionMethods(request);
                if (subscriptionPromise !== undefined) {
                    subscriptionPromise.then((res)=>resolve({
                            jsonrpc: '2.0',
                            id: request.id,
                            result: res.result
                        })).catch((err)=>reject(err));
                    return;
                }
            } catch (err) {
                return reject(err);
            }
            this._handleAsynchronousMethods(request).then((res)=>res && resolve(Object.assign(Object.assign({}, res), {
                    id: request.id
                }))).catch((err)=>reject(err));
        });
    }
    _sendMultipleRequestsAsync(requests) {
        return Promise.all(requests.map((r)=>this._sendRequestAsync(r)));
    }
    _handleSynchronousMethods(request) {
        const { method } = request;
        const params = request.params || [];
        switch(method){
            case 'eth_accounts':
                return this._eth_accounts();
            case 'eth_coinbase':
                return this._eth_coinbase();
            case 'eth_uninstallFilter':
                return this._eth_uninstallFilter(params);
            case 'net_version':
                return this._net_version();
            case 'eth_chainId':
                return this._eth_chainId();
            default:
                return undefined;
        }
    }
    async _handleAsynchronousMethods(request) {
        const { method } = request;
        const params = request.params || [];
        switch(method){
            case 'eth_requestAccounts':
                return this._eth_requestAccounts();
            case 'eth_sign':
                return this._eth_sign(params);
            case 'eth_ecRecover':
                return this._eth_ecRecover(params);
            case 'personal_sign':
                return this._personal_sign(params);
            case 'personal_ecRecover':
                return this._personal_ecRecover(params);
            case 'eth_signTransaction':
                return this._eth_signTransaction(params);
            case 'eth_sendRawTransaction':
                return this._eth_sendRawTransaction(params);
            case 'eth_sendTransaction':
                return this._eth_sendTransaction(params);
            case 'eth_signTypedData_v1':
                return this._eth_signTypedData_v1(params);
            case 'eth_signTypedData_v2':
                return this._throwUnsupportedMethodError();
            case 'eth_signTypedData_v3':
                return this._eth_signTypedData_v3(params);
            case 'eth_signTypedData_v4':
            case 'eth_signTypedData':
                return this._eth_signTypedData_v4(params);
            case 'cbWallet_arbitrary':
                return this._cbwallet_arbitrary(params);
            case 'wallet_addEthereumChain':
                return this._wallet_addEthereumChain(params);
            case 'wallet_switchEthereumChain':
                return this._wallet_switchEthereumChain(params);
            case 'wallet_watchAsset':
                return this._wallet_watchAsset(params);
        }
        const relay = await this.initializeRelay();
        return relay.makeEthereumJSONRPCRequest(request, this.jsonRpcUrl).catch((err)=>{
            var _a;
            if (err.code === error_1.standardErrorCodes.rpc.methodNotFound || err.code === error_1.standardErrorCodes.rpc.methodNotSupported) {
                (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.METHOD_NOT_IMPLEMENTED, {
                    method: request.method,
                    sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : undefined
                });
            }
            throw err;
        });
    }
    _handleAsynchronousFilterMethods(request) {
        const { method } = request;
        const params = request.params || [];
        switch(method){
            case 'eth_newFilter':
                return this._eth_newFilter(params);
            case 'eth_newBlockFilter':
                return this._eth_newBlockFilter();
            case 'eth_newPendingTransactionFilter':
                return this._eth_newPendingTransactionFilter();
            case 'eth_getFilterChanges':
                return this._eth_getFilterChanges(params);
            case 'eth_getFilterLogs':
                return this._eth_getFilterLogs(params);
        }
        return undefined;
    }
    _handleSubscriptionMethods(request) {
        switch(request.method){
            case 'eth_subscribe':
            case 'eth_unsubscribe':
                return this._subscriptionManager.handleRequest(request);
        }
        return undefined;
    }
    _isKnownAddress(addressString) {
        try {
            const addressStr = (0, util_1.ensureAddressString)(addressString);
            const lowercaseAddresses = this._addresses.map((address)=>(0, util_1.ensureAddressString)(address));
            return lowercaseAddresses.includes(addressStr);
        } catch (_a) {
        // noop
        }
        return false;
    }
    _ensureKnownAddress(addressString) {
        var _a;
        if (!this._isKnownAddress(addressString)) {
            (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.UNKNOWN_ADDRESS_ENCOUNTERED);
            throw new Error('Unknown Ethereum address');
        }
    }
    _prepareTransactionParams(tx) {
        const fromAddress = tx.from ? (0, util_1.ensureAddressString)(tx.from) : this.selectedAddress;
        if (!fromAddress) {
            throw new Error('Ethereum address is unavailable');
        }
        this._ensureKnownAddress(fromAddress);
        const toAddress = tx.to ? (0, util_1.ensureAddressString)(tx.to) : null;
        const weiValue = tx.value != null ? (0, util_1.ensureBN)(tx.value) : new bn_js_1.default(0);
        const data = tx.data ? (0, util_1.ensureBuffer)(tx.data) : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$banmaogame$2f$banmao$2d$fun__2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].alloc(0);
        const nonce = tx.nonce != null ? (0, util_1.ensureIntNumber)(tx.nonce) : null;
        const gasPriceInWei = tx.gasPrice != null ? (0, util_1.ensureBN)(tx.gasPrice) : null;
        const maxFeePerGas = tx.maxFeePerGas != null ? (0, util_1.ensureBN)(tx.maxFeePerGas) : null;
        const maxPriorityFeePerGas = tx.maxPriorityFeePerGas != null ? (0, util_1.ensureBN)(tx.maxPriorityFeePerGas) : null;
        const gasLimit = tx.gas != null ? (0, util_1.ensureBN)(tx.gas) : null;
        const chainId = tx.chainId ? (0, util_1.ensureIntNumber)(tx.chainId) : this.getChainId();
        return {
            fromAddress,
            toAddress,
            weiValue,
            data,
            nonce,
            gasPriceInWei,
            maxFeePerGas,
            maxPriorityFeePerGas,
            gasLimit,
            chainId
        };
    }
    _isAuthorized() {
        return this._addresses.length > 0;
    }
    _requireAuthorization() {
        if (!this._isAuthorized()) {
            throw error_1.standardErrors.provider.unauthorized({});
        }
    }
    _throwUnsupportedMethodError() {
        throw error_1.standardErrors.provider.unsupportedMethod({});
    }
    async _signEthereumMessage(message, address, addPrefix, typedDataJson) {
        this._ensureKnownAddress(address);
        try {
            const relay = await this.initializeRelay();
            const res = await relay.signEthereumMessage(message, address, addPrefix, typedDataJson).promise;
            if ((0, Web3Response_1.isErrorResponse)(res)) {
                throw new Error(res.errorMessage);
            }
            return {
                jsonrpc: '2.0',
                id: 0,
                result: res.result
            };
        } catch (err) {
            if (typeof err.message === 'string' && err.message.match(/(denied|rejected)/i)) {
                throw error_1.standardErrors.provider.userRejectedRequest('User denied message signature');
            }
            throw err;
        }
    }
    async _ethereumAddressFromSignedMessage(message, signature, addPrefix) {
        const relay = await this.initializeRelay();
        const res = await relay.ethereumAddressFromSignedMessage(message, signature, addPrefix).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw new Error(res.errorMessage);
        }
        return {
            jsonrpc: '2.0',
            id: 0,
            result: res.result
        };
    }
    _eth_accounts() {
        return [
            ...this._addresses
        ];
    }
    _eth_coinbase() {
        return this.selectedAddress || null;
    }
    _net_version() {
        return this.getChainId().toString(10);
    }
    _eth_chainId() {
        return (0, util_1.hexStringFromIntNumber)(this.getChainId());
    }
    getChainId() {
        const chainIdStr = this._storage.getItem(DEFAULT_CHAIN_ID_KEY);
        if (!chainIdStr) {
            return (0, util_1.ensureIntNumber)(this._chainIdFromOpts);
        }
        const chainId = parseInt(chainIdStr, 10);
        return (0, util_1.ensureIntNumber)(chainId);
    }
    async _eth_requestAccounts() {
        var _a;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.ETH_ACCOUNTS_STATE, {
            method: 'provider::_eth_requestAccounts',
            addresses_length: this._addresses.length,
            sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : undefined
        });
        if (this._isAuthorized()) {
            return Promise.resolve({
                jsonrpc: '2.0',
                id: 0,
                result: this._addresses
            });
        }
        let res;
        try {
            const relay = await this.initializeRelay();
            res = await relay.requestEthereumAccounts().promise;
            if ((0, Web3Response_1.isErrorResponse)(res)) {
                throw new Error(res.errorMessage);
            }
        } catch (err) {
            if (typeof err.message === 'string' && err.message.match(/(denied|rejected)/i)) {
                throw error_1.standardErrors.provider.userRejectedRequest('User denied account authorization');
            }
            throw err;
        }
        if (!res.result) {
            throw new Error('accounts received is empty');
        }
        this._setAddresses(res.result);
        if (!this.isCoinbaseBrowser) {
            await this.switchEthereumChain(this.getChainId());
        }
        return {
            jsonrpc: '2.0',
            id: 0,
            result: this._addresses
        };
    }
    _eth_sign(params) {
        this._requireAuthorization();
        const address = (0, util_1.ensureAddressString)(params[0]);
        const message = (0, util_1.ensureBuffer)(params[1]);
        return this._signEthereumMessage(message, address, false);
    }
    _eth_ecRecover(params) {
        const message = (0, util_1.ensureBuffer)(params[0]);
        const signature = (0, util_1.ensureBuffer)(params[1]);
        return this._ethereumAddressFromSignedMessage(message, signature, false);
    }
    _personal_sign(params) {
        this._requireAuthorization();
        const message = (0, util_1.ensureBuffer)(params[0]);
        const address = (0, util_1.ensureAddressString)(params[1]);
        return this._signEthereumMessage(message, address, true);
    }
    _personal_ecRecover(params) {
        const message = (0, util_1.ensureBuffer)(params[0]);
        const signature = (0, util_1.ensureBuffer)(params[1]);
        return this._ethereumAddressFromSignedMessage(message, signature, true);
    }
    async _eth_signTransaction(params) {
        this._requireAuthorization();
        const tx = this._prepareTransactionParams(params[0] || {});
        try {
            const relay = await this.initializeRelay();
            const res = await relay.signEthereumTransaction(tx).promise;
            if ((0, Web3Response_1.isErrorResponse)(res)) {
                throw new Error(res.errorMessage);
            }
            return {
                jsonrpc: '2.0',
                id: 0,
                result: res.result
            };
        } catch (err) {
            if (typeof err.message === 'string' && err.message.match(/(denied|rejected)/i)) {
                throw error_1.standardErrors.provider.userRejectedRequest('User denied transaction signature');
            }
            throw err;
        }
    }
    async _eth_sendRawTransaction(params) {
        const signedTransaction = (0, util_1.ensureBuffer)(params[0]);
        const relay = await this.initializeRelay();
        const res = await relay.submitEthereumTransaction(signedTransaction, this.getChainId()).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw new Error(res.errorMessage);
        }
        return {
            jsonrpc: '2.0',
            id: 0,
            result: res.result
        };
    }
    async _eth_sendTransaction(params) {
        this._requireAuthorization();
        const tx = this._prepareTransactionParams(params[0] || {});
        try {
            const relay = await this.initializeRelay();
            const res = await relay.signAndSubmitEthereumTransaction(tx).promise;
            if ((0, Web3Response_1.isErrorResponse)(res)) {
                throw new Error(res.errorMessage);
            }
            return {
                jsonrpc: '2.0',
                id: 0,
                result: res.result
            };
        } catch (err) {
            if (typeof err.message === 'string' && err.message.match(/(denied|rejected)/i)) {
                throw error_1.standardErrors.provider.userRejectedRequest('User denied transaction signature');
            }
            throw err;
        }
    }
    async _eth_signTypedData_v1(params) {
        this._requireAuthorization();
        const typedData = (0, util_1.ensureParsedJSONObject)(params[0]);
        const address = (0, util_1.ensureAddressString)(params[1]);
        this._ensureKnownAddress(address);
        const message = eth_eip712_util_1.default.hashForSignTypedDataLegacy({
            data: typedData
        });
        const typedDataJSON = JSON.stringify(typedData, null, 2);
        return this._signEthereumMessage(message, address, false, typedDataJSON);
    }
    async _eth_signTypedData_v3(params) {
        this._requireAuthorization();
        const address = (0, util_1.ensureAddressString)(params[0]);
        const typedData = (0, util_1.ensureParsedJSONObject)(params[1]);
        this._ensureKnownAddress(address);
        const message = eth_eip712_util_1.default.hashForSignTypedData_v3({
            data: typedData
        });
        const typedDataJSON = JSON.stringify(typedData, null, 2);
        return this._signEthereumMessage(message, address, false, typedDataJSON);
    }
    async _eth_signTypedData_v4(params) {
        this._requireAuthorization();
        const address = (0, util_1.ensureAddressString)(params[0]);
        const typedData = (0, util_1.ensureParsedJSONObject)(params[1]);
        this._ensureKnownAddress(address);
        const message = eth_eip712_util_1.default.hashForSignTypedData_v4({
            data: typedData
        });
        const typedDataJSON = JSON.stringify(typedData, null, 2);
        return this._signEthereumMessage(message, address, false, typedDataJSON);
    }
    /** @deprecated */ async _cbwallet_arbitrary(params) {
        const action = params[0];
        const data = params[1];
        if (typeof data !== 'string') {
            throw new Error('parameter must be a string');
        }
        if (typeof action !== 'object' || action === null) {
            throw new Error('parameter must be an object');
        }
        const result = await this.genericRequest(action, data);
        return {
            jsonrpc: '2.0',
            id: 0,
            result
        };
    }
    async _wallet_addEthereumChain(params) {
        var _a, _b, _c, _d;
        const request = params[0];
        if (((_a = request.rpcUrls) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return {
                jsonrpc: '2.0',
                id: 0,
                error: {
                    code: 2,
                    message: `please pass in at least 1 rpcUrl`
                }
            };
        }
        if (!request.chainName || request.chainName.trim() === '') {
            throw error_1.standardErrors.rpc.invalidParams('chainName is a required field');
        }
        if (!request.nativeCurrency) {
            throw error_1.standardErrors.rpc.invalidParams('nativeCurrency is a required field');
        }
        const chainIdNumber = parseInt(request.chainId, 16);
        const success = await this.addEthereumChain(chainIdNumber, (_b = request.rpcUrls) !== null && _b !== void 0 ? _b : [], (_c = request.blockExplorerUrls) !== null && _c !== void 0 ? _c : [], request.chainName, (_d = request.iconUrls) !== null && _d !== void 0 ? _d : [], request.nativeCurrency);
        if (success) {
            return {
                jsonrpc: '2.0',
                id: 0,
                result: null
            };
        }
        return {
            jsonrpc: '2.0',
            id: 0,
            error: {
                code: 2,
                message: `unable to add ethereum chain`
            }
        };
    }
    async _wallet_switchEthereumChain(params) {
        const request = params[0];
        await this.switchEthereumChain(parseInt(request.chainId, 16));
        return {
            jsonrpc: '2.0',
            id: 0,
            result: null
        };
    }
    async _wallet_watchAsset(params) {
        const request = Array.isArray(params) ? params[0] : params;
        if (!request.type) {
            throw error_1.standardErrors.rpc.invalidParams('Type is required');
        }
        if ((request === null || request === void 0 ? void 0 : request.type) !== 'ERC20') {
            throw error_1.standardErrors.rpc.invalidParams(`Asset of type '${request.type}' is not supported`);
        }
        if (!(request === null || request === void 0 ? void 0 : request.options)) {
            throw error_1.standardErrors.rpc.invalidParams('Options are required');
        }
        if (!(request === null || request === void 0 ? void 0 : request.options.address)) {
            throw error_1.standardErrors.rpc.invalidParams('Address is required');
        }
        const chainId = this.getChainId();
        const { address, symbol, image, decimals } = request.options;
        const res = await this.watchAsset(request.type, address, symbol, decimals, image, chainId);
        return {
            jsonrpc: '2.0',
            id: 0,
            result: res
        };
    }
    _eth_uninstallFilter(params) {
        const filterId = (0, util_1.ensureHexString)(params[0]);
        return this._filterPolyfill.uninstallFilter(filterId);
    }
    async _eth_newFilter(params) {
        const param = params[0];
        const filterId = await this._filterPolyfill.newFilter(param);
        return {
            jsonrpc: '2.0',
            id: 0,
            result: filterId
        };
    }
    async _eth_newBlockFilter() {
        const filterId = await this._filterPolyfill.newBlockFilter();
        return {
            jsonrpc: '2.0',
            id: 0,
            result: filterId
        };
    }
    async _eth_newPendingTransactionFilter() {
        const filterId = await this._filterPolyfill.newPendingTransactionFilter();
        return {
            jsonrpc: '2.0',
            id: 0,
            result: filterId
        };
    }
    _eth_getFilterChanges(params) {
        const filterId = (0, util_1.ensureHexString)(params[0]);
        return this._filterPolyfill.getFilterChanges(filterId);
    }
    _eth_getFilterLogs(params) {
        const filterId = (0, util_1.ensureHexString)(params[0]);
        return this._filterPolyfill.getFilterLogs(filterId);
    }
    initializeRelay() {
        if (this._relay) {
            return Promise.resolve(this._relay);
        }
        return this._relayProvider().then((relay)=>{
            relay.setAccountsCallback((accounts, isDisconnect)=>this._setAddresses(accounts, isDisconnect));
            relay.setChainCallback((chainId, jsonRpcUrl)=>{
                this.updateProviderInfo(jsonRpcUrl, parseInt(chainId, 10));
            });
            relay.setDappDefaultChainCallback(this._chainIdFromOpts);
            this._relay = relay;
            return relay;
        });
    }
}
exports.CoinbaseWalletProvider = CoinbaseWalletProvider;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/RelayEventManager.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RelayEventManager = void 0;
const util_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/util.js [app-client] (ecmascript)");
class RelayEventManager {
    constructor(){
        this._nextRequestId = 0;
        this.callbacks = new Map();
    }
    makeRequestId() {
        // max nextId == max int32 for compatibility with mobile
        this._nextRequestId = (this._nextRequestId + 1) % 0x7fffffff;
        const id = this._nextRequestId;
        const idStr = (0, util_1.prepend0x)(id.toString(16));
        // unlikely that this will ever be an issue, but just to be safe
        const callback = this.callbacks.get(idStr);
        if (callback) {
            this.callbacks.delete(idStr);
        }
        return id;
    }
}
exports.RelayEventManager = RelayEventManager;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/CoinbaseWalletSDK.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CoinbaseWalletSDK = void 0;
const wallet_logo_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/assets/wallet-logo.js [app-client] (ecmascript)");
const constants_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/constants.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/core/util.js [app-client] (ecmascript)");
const ScopedLocalStorage_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/lib/ScopedLocalStorage.js [app-client] (ecmascript)");
const CoinbaseWalletProvider_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/CoinbaseWalletProvider.js [app-client] (ecmascript)");
const MobileRelay_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/mobile/MobileRelay.js [app-client] (ecmascript)");
const MobileRelayUI_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/mobile/MobileRelayUI.js [app-client] (ecmascript)");
const RelayEventManager_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/RelayEventManager.js [app-client] (ecmascript)");
const WalletLinkRelayUI_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/ui/WalletLinkRelayUI.js [app-client] (ecmascript)");
const WalletLinkRelay_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/relay/walletlink/WalletLinkRelay.js [app-client] (ecmascript)");
const version_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/version.js [app-client] (ecmascript)");
class CoinbaseWalletSDK {
    /**
     * Constructor
     * @param options Coinbase Wallet SDK constructor options
     */ constructor(options){
        var _a, _b, _c;
        this._appName = '';
        this._appLogoUrl = null;
        this._relay = null;
        this._relayEventManager = null;
        const linkAPIUrl = options.linkAPIUrl || constants_1.LINK_API_URL;
        if (typeof options.overrideIsMetaMask === 'undefined') {
            this._overrideIsMetaMask = false;
        } else {
            this._overrideIsMetaMask = options.overrideIsMetaMask;
        }
        this._overrideIsCoinbaseWallet = (_a = options.overrideIsCoinbaseWallet) !== null && _a !== void 0 ? _a : true;
        this._overrideIsCoinbaseBrowser = (_b = options.overrideIsCoinbaseBrowser) !== null && _b !== void 0 ? _b : false;
        this._diagnosticLogger = options.diagnosticLogger;
        this._reloadOnDisconnect = (_c = options.reloadOnDisconnect) !== null && _c !== void 0 ? _c : true;
        const url = new URL(linkAPIUrl);
        const origin = `${url.protocol}//${url.host}`;
        this._storage = new ScopedLocalStorage_1.ScopedLocalStorage(`-walletlink:${origin}`); // needs migration to preserve local states
        this._storage.setItem('version', CoinbaseWalletSDK.VERSION);
        if (this.walletExtension || this.coinbaseBrowser) {
            return;
        }
        this._relayEventManager = new RelayEventManager_1.RelayEventManager();
        const isMobile = (0, util_1.isMobileWeb)();
        const uiConstructor = options.uiConstructor || ((opts)=>isMobile ? new MobileRelayUI_1.MobileRelayUI(opts) : new WalletLinkRelayUI_1.WalletLinkRelayUI(opts));
        const relayOption = {
            linkAPIUrl,
            version: version_1.LIB_VERSION,
            darkMode: !!options.darkMode,
            headlessMode: !!options.headlessMode,
            uiConstructor,
            storage: this._storage,
            relayEventManager: this._relayEventManager,
            diagnosticLogger: this._diagnosticLogger,
            reloadOnDisconnect: this._reloadOnDisconnect,
            enableMobileWalletLink: options.enableMobileWalletLink
        };
        this._relay = isMobile ? new MobileRelay_1.MobileRelay(relayOption) : new WalletLinkRelay_1.WalletLinkRelay(relayOption);
        this.setAppInfo(options.appName, options.appLogoUrl);
        if (options.headlessMode) return;
        this._relay.attachUI();
    }
    /**
     * Create a Web3 Provider object
     * @param jsonRpcUrl Ethereum JSON RPC URL (Default: "")
     * @param chainId Ethereum Chain ID (Default: 1)
     * @returns A Web3 Provider
     */ makeWeb3Provider(jsonRpcUrl = '', chainId = 1) {
        const extension = this.walletExtension;
        if (extension) {
            if (!this.isCipherProvider(extension)) {
                extension.setProviderInfo(jsonRpcUrl, chainId);
            }
            if (this._reloadOnDisconnect === false && typeof extension.disableReloadOnDisconnect === 'function') extension.disableReloadOnDisconnect();
            return extension;
        }
        const dappBrowser = this.coinbaseBrowser;
        if (dappBrowser) {
            return dappBrowser;
        }
        const relay = this._relay;
        if (!relay || !this._relayEventManager || !this._storage) {
            throw new Error('Relay not initialized, should never happen');
        }
        if (!jsonRpcUrl) relay.setConnectDisabled(true);
        return new CoinbaseWalletProvider_1.CoinbaseWalletProvider({
            relayProvider: ()=>Promise.resolve(relay),
            relayEventManager: this._relayEventManager,
            storage: this._storage,
            jsonRpcUrl,
            chainId,
            qrUrl: this.getQrUrl(),
            diagnosticLogger: this._diagnosticLogger,
            overrideIsMetaMask: this._overrideIsMetaMask,
            overrideIsCoinbaseWallet: this._overrideIsCoinbaseWallet,
            overrideIsCoinbaseBrowser: this._overrideIsCoinbaseBrowser
        });
    }
    /**
     * Set application information
     * @param appName Application name
     * @param appLogoUrl Application logo image URL
     */ setAppInfo(appName, appLogoUrl) {
        var _a;
        this._appName = appName || 'DApp';
        this._appLogoUrl = appLogoUrl || (0, util_1.getFavicon)();
        const extension = this.walletExtension;
        if (extension) {
            if (!this.isCipherProvider(extension)) {
                extension.setAppInfo(this._appName, this._appLogoUrl);
            }
        } else {
            (_a = this._relay) === null || _a === void 0 ? void 0 : _a.setAppInfo(this._appName, this._appLogoUrl);
        }
    }
    /**
     * Disconnect. After disconnecting, this will reload the web page to ensure
     * all potential stale state is cleared.
     */ disconnect() {
        var _a;
        const extension = this === null || this === void 0 ? void 0 : this.walletExtension;
        if (extension) {
            void extension.close();
        } else {
            (_a = this._relay) === null || _a === void 0 ? void 0 : _a.resetAndReload();
        }
    }
    /**
     * Return QR URL for mobile wallet connection, will return null if extension is installed
     */ getQrUrl() {
        var _a, _b;
        return (_b = (_a = this._relay) === null || _a === void 0 ? void 0 : _a.getQRCodeUrl()) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Official Coinbase Wallet logo for developers to use on their frontend
     * @param type Type of wallet logo: "standard" | "circle" | "text" | "textWithLogo" | "textLight" | "textWithLogoLight"
     * @param width Width of the logo (Optional)
     * @returns SVG Data URI
     */ getCoinbaseWalletLogo(type, width = 240) {
        return (0, wallet_logo_1.walletLogo)(type, width);
    }
    get walletExtension() {
        var _a;
        return (_a = window.coinbaseWalletExtension) !== null && _a !== void 0 ? _a : window.walletLinkExtension;
    }
    get coinbaseBrowser() {
        var _a, _b;
        try {
            // Coinbase DApp browser does not inject into iframes so grab provider from top frame if it exists
            const ethereum = (_a = window.ethereum) !== null && _a !== void 0 ? _a : (_b = window.top) === null || _b === void 0 ? void 0 : _b.ethereum;
            if (!ethereum) {
                return undefined;
            }
            if ('isCoinbaseBrowser' in ethereum && ethereum.isCoinbaseBrowser) {
                return ethereum;
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    }
    isCipherProvider(provider) {
        // @ts-expect-error isCipher walletlink property
        return typeof provider.isCipher === 'boolean' && provider.isCipher;
    }
}
exports.CoinbaseWalletSDK = CoinbaseWalletSDK;
CoinbaseWalletSDK.VERSION = version_1.LIB_VERSION;
}),
"[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CoinbaseWalletProvider = exports.CoinbaseWalletSDK = void 0;
const CoinbaseWalletSDK_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/CoinbaseWalletSDK.js [app-client] (ecmascript)");
const CoinbaseWalletProvider_1 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/CoinbaseWalletProvider.js [app-client] (ecmascript)");
var CoinbaseWalletSDK_2 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/CoinbaseWalletSDK.js [app-client] (ecmascript)");
Object.defineProperty(exports, "CoinbaseWalletSDK", {
    enumerable: true,
    get: function() {
        return CoinbaseWalletSDK_2.CoinbaseWalletSDK;
    }
});
var CoinbaseWalletProvider_2 = __turbopack_context__.r("[project]/Downloads/banmaogame/banmao-fun 2/node_modules/cbw-sdk/dist/provider/CoinbaseWalletProvider.js [app-client] (ecmascript)");
Object.defineProperty(exports, "CoinbaseWalletProvider", {
    enumerable: true,
    get: function() {
        return CoinbaseWalletProvider_2.CoinbaseWalletProvider;
    }
});
exports.default = CoinbaseWalletSDK_1.CoinbaseWalletSDK;
if (typeof window !== 'undefined') {
    window.CoinbaseWalletSDK = CoinbaseWalletSDK_1.CoinbaseWalletSDK;
    window.CoinbaseWalletProvider = CoinbaseWalletProvider_1.CoinbaseWalletProvider;
    /**
     * @deprecated Use `window.CoinbaseWalletSDK`
     */ window.WalletLink = CoinbaseWalletSDK_1.CoinbaseWalletSDK;
    /**
     * @deprecated Use `window.CoinbaseWalletProvider`
     */ window.WalletLinkProvider = CoinbaseWalletProvider_1.CoinbaseWalletProvider;
}
}),
]);

//# sourceMappingURL=2ba46_cbw-sdk_dist_a617925d._.js.map