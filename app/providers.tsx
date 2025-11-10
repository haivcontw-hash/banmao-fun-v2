// app/providers.tsx
"use client";

import "../lib/serverStoragePolyfill";

import { ReactNode, useEffect, useMemo } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  okxWallet,
  metaMaskWallet,
  walletConnectWallet,
  rainbowWallet,
  rabbyWallet,
  trustWallet,
  bitgetWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { Chain } from "viem";
import "@rainbow-me/rainbowkit/styles.css";
import { createRateLimitedFetch } from "../lib/rateLimitedFetch";

// ==== ENV (đổi lại nếu cần) ====
const WC_PROJECT_ID =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID || "df8d376695ef6244fbb2accd6a85f00a";
const RPC = process.env.NEXT_PUBLIC_RPC_URL || "https://xlayerrpc.okx.com";
const RPC_MAX_RPS = Number(process.env.NEXT_PUBLIC_RPC_MAX_RPS ?? "90");
const RPC_RATE_LIMIT_INTERVAL_MS = Number(
  process.env.NEXT_PUBLIC_RPC_RATE_INTERVAL_MS ?? "1000"
);

const rateLimitedFetch = createRateLimitedFetch({
  requestsPerInterval: Number.isFinite(RPC_MAX_RPS) ? Math.max(RPC_MAX_RPS, 1) : 90,
  intervalMs: Number.isFinite(RPC_RATE_LIMIT_INTERVAL_MS)
    ? Math.max(RPC_RATE_LIMIT_INTERVAL_MS, 0)
    : 1000,
});

// ==== Khai báo chain XLayer (id 196) ====
const xlayer: Chain = {
  id: 196,
  name: "XLayer",
  nativeCurrency: { name: "OKB", symbol: "OKB", decimals: 18 },
  rpcUrls: {
    default: { http: [RPC] },
    public: { http: [RPC] },
  },
  blockExplorers: {
    default: { name: "OKLink", url: "https://www.oklink.com/xlayer" },
  },
};

// ==== Connectors (deeplink mobile tốt) ====
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [okxWallet, metaMaskWallet, walletConnectWallet],
    },
    {
      groupName: "More wallets",
      wallets: [rainbowWallet, rabbyWallet, trustWallet, bitgetWallet, coinbaseWallet],
    },
  ],
  {
    appName: "BANMAO RPS — XLayer",
    projectId: WC_PROJECT_ID, // WalletConnect v2
  }
);

// ==== wagmi config ====
const config = createConfig({
  chains: [xlayer],
  connectors,
  transports: {
    [xlayer.id]: http(RPC, {
      batch: true,
      fetchFn: rateLimitedFetch,
    }),
  },
  ssr: true,
  // Tắt quét nhiều injected provider để modal mở nhanh, giảm log rác
  multiInjectedProviderDiscovery: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // giữ dữ liệu 30s trước khi refetch
      gcTime: 5 * 60_000, // giảm số lần dọn cache
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  const theme = useMemo(
    () =>
      darkTheme({
        accentColor: "#FFD700",
        accentColorForeground: "#000",
        borderRadius: "medium",
        overlayBlur: "small",
      }),
    []
  );

  useEffect(() => {
    const INACTIVITY_TIMEOUT_MS = 60_000;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const resetTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        window.location.reload();
      }, INACTIVITY_TIMEOUT_MS);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        resetTimer();
      }
    };

    const activityEvents: Array<keyof WindowEventMap> = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resetTimer();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* initialChain đảm bảo modal chọn sẵn XLayer trên mobile */}
        <RainbowKitProvider theme={theme} modalSize="compact" initialChain={196}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}