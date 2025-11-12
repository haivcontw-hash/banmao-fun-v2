// app/page.tsx
"use client";

import { JSX, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWatchContractEvent,
  usePublicClient,
} from "wagmi";
import { encodePacked, formatUnits, getAbiItem, isHex, keccak256, parseUnits } from "viem";
import Header from "../components/Header";
import ChoiceCard from "../components/ChoiceCard";
import FloatingSettings, {
  type HistoryLookupState,
  type HistoryLookupResult,
  type UiScale,
} from "../components/FloatingSettings";
import TelegramConnect from "../components/TelegramConnect";
import { IconDocs, IconHourglass, IconTelegram, IconToken, IconX } from "../components/Icons";
import {
  FaChevronDown,
  FaCoins,
  FaEye,
  FaEyeSlash,
  FaHandRock,
  FaSyncAlt,
  FaTrophy,
  FaWallet,
} from "react-icons/fa";
import { langs, type LocaleStrings } from "../lib/i18n";
import { RPS_ABI, ERC20_ABI } from "../lib/abis";
import toast, { Toaster } from "react-hot-toast";
import { DEFAULT_THEME, ThemeKey, isThemeKey } from "../lib/themes";
import {
  TELEGRAM_BOT_USERNAME,
  TELEGRAM_CONNECTION_STORAGE_KEY,
  TELEGRAM_LEGACY_USERNAME_STORAGE_KEY,
  buildTelegramConnectionKey,
} from "../lib/telegram";

/* ===================== CONSTS ===================== */
const RPS = process.env.NEXT_PUBLIC_RPS_ADDRESS as `0x${string}`;
const BANMAO = process.env.NEXT_PUBLIC_BANMAO as `0x${string}`;

type Choice = 1 | 2 | 3;
const STATE = ["Wait", "Committing", "Revealing", "Finished", "Canceled"];
const ZERO_ADDR = "0x0000000000000000000000000000000000000000";
const ZERO_ADDR_LOWER = ZERO_ADDR.toLowerCase();
const ZERO_COMMIT = "0x0000000000000000000000000000000000000000000000000000000000000000";
const ZERO_BIGINT = BigInt(0);
const MAX_SALT_VALUE = BigInt(`0x${"f".repeat(64)}`);
const RPC_LOG_RANGE_LIMIT = BigInt(100);
const DEFAULT_LOG_CHUNK = BigInt(90);
const DEFAULT_LOG_ATTEMPTS = 20;
const LOG_CHUNK_SIZE = (() => {
  const raw = process.env.NEXT_PUBLIC_RPC_LOG_CHUNK;
  if (!raw) return DEFAULT_LOG_CHUNK;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_LOG_CHUNK;
  const normalized = BigInt(parsed);
  if (normalized > RPC_LOG_RANGE_LIMIT) return RPC_LOG_RANGE_LIMIT;
  return normalized;
})();
const LOG_MAX_ATTEMPTS = (() => {
  const raw = process.env.NEXT_PUBLIC_RPC_LOG_ATTEMPTS;
  if (!raw) return DEFAULT_LOG_ATTEMPTS;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_LOG_ATTEMPTS;
  return parsed;
})();
const RPS_DEPLOY_BLOCK = (() => {
  const raw = process.env.NEXT_PUBLIC_RPS_DEPLOY_BLOCK;
  if (!raw) return ZERO_BIGINT;
  try {
    const parsed = BigInt(raw);
    if (parsed < ZERO_BIGINT) return ZERO_BIGINT;
    return parsed;
  } catch {
    return ZERO_BIGINT;
  }
})();
const STEP_PRESETS = [10, 100, 10000, 100000, 1000000] as const;
const DEFAULT_VIBRATION = 220;
const DEFAULT_SNOOZE_MINUTES = 2;
const FEEDBACK_COOLDOWN_MS = 120;
const READ_QUERY_BEHAVIOR = {
  staleTime: 60_000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;
const BLOCK_REFETCH_THROTTLE_MS = 1_200;
const BLOCK_WATCH_POLL_INTERVAL_MS = 1_000;
const FORFEIT_FETCH_COOLDOWN_MS = 25_000;
const FORFEIT_FETCH_DELAY_MS = 120;
const DEFAULT_FORFEIT_LOG_INTERVAL_MS = 180;
const DEFAULT_FORFEIT_RATE_LIMIT_COOLDOWN_MS = 2_000;
const FORFEIT_LOG_MIN_INTERVAL_MS = (() => {
  const raw = process.env.NEXT_PUBLIC_FORFEIT_LOG_INTERVAL_MS;
  if (!raw) return DEFAULT_FORFEIT_LOG_INTERVAL_MS;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return DEFAULT_FORFEIT_LOG_INTERVAL_MS;
  return parsed;
})();
const FORFEIT_LOG_RATE_LIMIT_COOLDOWN_MS = (() => {
  const raw = process.env.NEXT_PUBLIC_FORFEIT_LOG_RATE_LIMIT_COOLDOWN_MS;
  if (!raw) return DEFAULT_FORFEIT_RATE_LIMIT_COOLDOWN_MS;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return DEFAULT_FORFEIT_RATE_LIMIT_COOLDOWN_MS;
  }
  return parsed;
})();

// Cửa sổ thời gian (giây) để hiển thị/note trong UI
const DEFAULT_COMMIT_WINDOW = 600; // 10 phút commit/inactive
const MIN_COMMIT_WINDOW = 60; // tối thiểu 1 phút
const MAX_COMMIT_WINDOW = 24 * 60 * 60; // tối đa 24 giờ
const REVEAL_WINDOW = 900; // 15 phút reveal
const X_HANDLE = "banmao_X";
const UI_SCALE_STORAGE_KEY = "banmao_ui_scale";
const THEME_STORAGE_KEY = "banmao_theme";
const TELEGRAM_NOTIFY_ENDPOINT = process.env.NEXT_PUBLIC_TELEGRAM_NOTIFY_ENDPOINT;
const GOOGLE_DOCS_URL = "https://docs.google.com/document/d/1ObVjHuoVCjXbF5zuWqzbcUuoqT86CdCm4Z9mwMWCpp0/";
const TELEGRAM_URL = `https://t.me/${TELEGRAM_BOT_USERNAME}`;
const X_URL = `https://x.com/${X_HANDLE}`;
const ROOMS_CACHE_KEY = "banmao_rooms_cache_v1";
const INFO_CACHE_KEY = "banmao_info_cache_v1";

const RULE_ACCENTS = [
  { icon: "🎮", className: "rule-accent-start" },
  { icon: "🔒", className: "rule-accent-commit" },
  { icon: "🔍", className: "rule-accent-reveal" },
  { icon: "🏆", className: "rule-accent-outcome" },
  { icon: "⏰", className: "rule-accent-timeout" },
  { icon: "🏳️", className: "rule-accent-forfeit" },
  { icon: "♻️", className: "rule-accent-both-commit" },
  { icon: "🌀", className: "rule-accent-both-reveal" },
] as const;

/* ====== Local commit info ====== */
interface LastCommitInfo {
  roomId: string;
  stakeHuman: string;
  choice: Choice;
  salt: `0x${string}`;
}

type CommitInfoMap = Record<string, LastCommitInfo>;

type Html2CanvasFn = (element: HTMLElement | Document, options?: any) => Promise<HTMLCanvasElement>;

type ForfeitRecord = {
  loser?: `0x${string}` | null;
  winner?: `0x${string}` | null;
  payout?: bigint | null;
};

type MinimalPublicClient = {
  getBlockNumber: () => Promise<bigint>;
  getLogs: (args: any) => Promise<any[]>;
};

type VibrateOptions = {
  force?: boolean;
  allowDuringCooldown?: boolean;
};

type RoomSnapshot = {
  id: number;
  creator: `0x${string}`;
  opponent: `0x${string}`;
  stake: bigint;
  commitA: `0x${string}`;
  commitB: `0x${string}`;
  revealA: number;
  revealB: number;
  state: number;
  commitDeadline: number;
  revealDeadline: number;
};

type RoomWithForfeit = RoomSnapshot & { forfeit?: ForfeitRecord | null };

type UserStatsShape = {
  win: number;
  loss: number;
  draw: number;
  totalWinnings: bigint;
  totalLosses: bigint;
  rock: number;
  paper: number;
  scissors: number;
};

const EMPTY_STATS: UserStatsShape = {
  win: 0,
  loss: 0,
  draw: 0,
  totalWinnings: ZERO_BIGINT,
  totalLosses: ZERO_BIGINT,
  rock: 0,
  paper: 0,
  scissors: 0,
};

type CachedInfoState = {
  balance: bigint | null;
  stats: UserStatsShape;
};

type CachedRoomEntry = {
  id: number;
  creator: `0x${string}`;
  opponent: `0x${string}`;
  stake: string;
  commitA: `0x${string}`;
  commitB: `0x${string}`;
  revealA: number;
  revealB: number;
  state: number;
  commitDeadline: number;
  revealDeadline: number;
  forfeit?: {
    loser?: `0x${string}` | null;
    winner?: `0x${string}` | null;
    payout?: string | null;
  } | null;
};

type InfoTableProps = {
  balance: bigint | null | undefined;
  decimals: number;
  stats: UserStatsShape;
  strings: LocaleStrings;
};

function roomsEqual(a: RoomWithForfeit[], b: RoomWithForfeit[]) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    const left = a[i];
    const right = b[i];
    if (!left || !right) return false;
    if (left.id !== right.id) return false;
    if (left.state !== right.state) return false;
    if (left.creator !== right.creator) return false;
    if (left.opponent !== right.opponent) return false;
    if (left.commitA !== right.commitA) return false;
    if (left.commitB !== right.commitB) return false;
    if (left.revealA !== right.revealA) return false;
    if (left.revealB !== right.revealB) return false;
    if (left.commitDeadline !== right.commitDeadline) return false;
    if (left.revealDeadline !== right.revealDeadline) return false;
    if (left.stake !== right.stake) return false;
    const leftForfeit = left.forfeit ?? null;
    const rightForfeit = right.forfeit ?? null;
    if (!!leftForfeit !== !!rightForfeit) return false;
    if (leftForfeit && rightForfeit) {
      if ((leftForfeit.loser ?? null) !== (rightForfeit.loser ?? null)) return false;
      if ((leftForfeit.winner ?? null) !== (rightForfeit.winner ?? null)) return false;
      const leftPayout = leftForfeit.payout ?? null;
      const rightPayout = rightForfeit.payout ?? null;
      if (leftPayout !== rightPayout) return false;
    }
  }
  return true;
}

function serializeRoomForCache(room: RoomWithForfeit): CachedRoomEntry {
  return {
    id: Number(room.id ?? 0),
    creator: (room.creator ?? ZERO_ADDR) as `0x${string}`,
    opponent: (room.opponent ?? ZERO_ADDR) as `0x${string}`,
    stake: (room.stake ?? ZERO_BIGINT).toString(),
    commitA: (room.commitA ?? ZERO_COMMIT) as `0x${string}`,
    commitB: (room.commitB ?? ZERO_COMMIT) as `0x${string}`,
    revealA: Number(room.revealA ?? 0),
    revealB: Number(room.revealB ?? 0),
    state: Number(room.state ?? 0),
    commitDeadline: Number(room.commitDeadline ?? 0),
    revealDeadline: Number(room.revealDeadline ?? 0),
    forfeit: room.forfeit
      ? {
          loser: (room.forfeit.loser ?? null) as `0x${string}` | null,
          winner: (room.forfeit.winner ?? null) as `0x${string}` | null,
          payout:
            room.forfeit.payout != null
              ? room.forfeit.payout.toString()
              : null,
        }
      : null,
  };
}

function reviveRoomFromCache(entry: any): RoomWithForfeit | null {
  if (!entry || typeof entry !== "object") return null;
  try {
    const id = Number(entry.id ?? 0);
    if (!Number.isFinite(id) || id <= 0) return null;
    const stakeRaw = entry.stake;
    let stake = ZERO_BIGINT;
    if (typeof stakeRaw === "string" && stakeRaw) {
      try {
        stake = BigInt(stakeRaw);
      } catch {
        stake = ZERO_BIGINT;
      }
    }
    const forfeitEntry = entry.forfeit;
    let forfeit: ForfeitRecord | null = null;
    if (forfeitEntry && typeof forfeitEntry === "object") {
      let payout: bigint | null = null;
      const payoutRaw = (forfeitEntry as any).payout;
      if (typeof payoutRaw === "string" && payoutRaw) {
        try {
          payout = BigInt(payoutRaw);
        } catch {
          payout = null;
        }
      }
      forfeit = {
        loser: typeof forfeitEntry.loser === "string" ? (forfeitEntry.loser as `0x${string}`) : undefined,
        winner: typeof forfeitEntry.winner === "string" ? (forfeitEntry.winner as `0x${string}`) : undefined,
        payout,
      };
    }

    return {
      id,
      creator: (typeof entry.creator === "string" ? entry.creator : ZERO_ADDR) as `0x${string}`,
      opponent: (typeof entry.opponent === "string" ? entry.opponent : ZERO_ADDR) as `0x${string}`,
      stake,
      commitA: (typeof entry.commitA === "string" ? entry.commitA : ZERO_COMMIT) as `0x${string}`,
      commitB: (typeof entry.commitB === "string" ? entry.commitB : ZERO_COMMIT) as `0x${string}`,
      revealA: Number(entry.revealA ?? 0),
      revealB: Number(entry.revealB ?? 0),
      state: Number(entry.state ?? 0),
      commitDeadline: Number(entry.commitDeadline ?? 0),
      revealDeadline: Number(entry.revealDeadline ?? 0),
      forfeit,
    };
  } catch {
    return null;
  }
}

function userStatsEqual(a: UserStatsShape, b: UserStatsShape) {
  return (
    a.win === b.win &&
    a.loss === b.loss &&
    a.draw === b.draw &&
    a.rock === b.rock &&
    a.paper === b.paper &&
    a.scissors === b.scissors &&
    a.totalWinnings === b.totalWinnings &&
    a.totalLosses === b.totalLosses
  );
}

function serializeInfoForCache(info: CachedInfoState) {
  return {
    balance: info.balance != null ? info.balance.toString() : null,
    stats: {
      win: info.stats.win,
      loss: info.stats.loss,
      draw: info.stats.draw,
      rock: info.stats.rock,
      paper: info.stats.paper,
      scissors: info.stats.scissors,
      totalWinnings: info.stats.totalWinnings.toString(),
      totalLosses: info.stats.totalLosses.toString(),
    },
  };
}

function reviveInfoFromCache(entry: any): CachedInfoState | null {
  if (!entry || typeof entry !== "object") return null;
  const statsRaw = entry.stats;
  if (!statsRaw || typeof statsRaw !== "object") return null;
  try {
    let balance: bigint | null = null;
    if (typeof entry.balance === "string" && entry.balance) {
      try {
        balance = BigInt(entry.balance);
      } catch {
        balance = null;
      }
    }

    const totalWinningsRaw = statsRaw.totalWinnings;
    const totalLossesRaw = statsRaw.totalLosses;
    let totalWinnings = ZERO_BIGINT;
    let totalLosses = ZERO_BIGINT;
    if (typeof totalWinningsRaw === "string" && totalWinningsRaw) {
      try {
        totalWinnings = BigInt(totalWinningsRaw);
      } catch {
        totalWinnings = ZERO_BIGINT;
      }
    }
    if (typeof totalLossesRaw === "string" && totalLossesRaw) {
      try {
        totalLosses = BigInt(totalLossesRaw);
      } catch {
        totalLosses = ZERO_BIGINT;
      }
    }

    const stats: UserStatsShape = {
      win: Number(statsRaw.win ?? 0) || 0,
      loss: Number(statsRaw.loss ?? 0) || 0,
      draw: Number(statsRaw.draw ?? 0) || 0,
      rock: Number(statsRaw.rock ?? 0) || 0,
      paper: Number(statsRaw.paper ?? 0) || 0,
      scissors: Number(statsRaw.scissors ?? 0) || 0,
      totalWinnings,
      totalLosses,
    };

    return { balance, stats };
  } catch {
    return null;
  }
}

type InfoRow = {
  key: string;
  icon: JSX.Element;
  label: string;
  value: string;
  detail?: string | null;
};

type TelegramReminderMeta = {
  key: string;
  roomId: number;
  type: "commit" | "commit-urgent" | "reveal";
  title: string;
  body: string;
  deadline?: number | null;
};

function normalizeForfeitAddress(value: string | null | undefined): `0x${string}` | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();
  if (!/^0x[0-9a-f]{40}$/.test(lower)) return null;
  if (lower === ZERO_ADDR.toLowerCase()) return null;
  return lower as `0x${string}`;
}

function normalizeForfeitPayout(value: unknown): bigint | null {
  if (typeof value === "bigint") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value) || value < 0) return null;
    return BigInt(Math.floor(value));
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    try {
      return BigInt(trimmed);
    } catch {
      return null;
    }
  }
  return null;
}

function formatShortAddress(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!/^0x[0-9a-fA-F]{40}$/.test(trimmed)) return null;
  return `${trimmed.slice(0, 6)}...${trimmed.slice(-4)}`;
}

declare global {
  interface Window {
    html2canvas?: Html2CanvasFn;
  }
}

/* ===================== Utils ===================== */
function newSalt(): `0x${string}` {
  const b = new Uint8Array(32);
  crypto.getRandomValues(b);
  return `0x${[...b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

function waitMs(ms: number) {
  return new Promise<void>((resolve) => {
    if (!Number.isFinite(ms) || ms <= 0) {
      resolve();
      return;
    }
    setTimeout(resolve, ms);
  });
}

function collectErrorMessages(value: unknown, seen = new Set<unknown>()): string[] {
  if (value == null) return [];
  if (typeof value === "string") return [value];
  if (typeof value === "number" || typeof value === "boolean") {
    return [String(value)];
  }
  if (typeof value === "bigint") {
    return [value.toString()];
  }
  if (seen.has(value)) return [];
  seen.add(value);

  if (Array.isArray(value)) {
    return value.flatMap((entry) => collectErrorMessages(entry, seen));
  }

  const parts: string[] = [];
  if (value instanceof Error) {
    if (typeof value.message === "string") parts.push(value.message);
    const anyErr = value as any;
    if (typeof anyErr.shortMessage === "string") parts.push(anyErr.shortMessage);
    if (typeof anyErr.details === "string") parts.push(anyErr.details);
    if (typeof anyErr.body === "string") parts.push(anyErr.body);
    if (anyErr.cause) {
      parts.push(...collectErrorMessages(anyErr.cause, seen));
    }
    return parts;
  }

  if (typeof value === "object") {
    const anyValue = value as any;
    if (typeof anyValue.message === "string") parts.push(anyValue.message);
    if (typeof anyValue.shortMessage === "string") parts.push(anyValue.shortMessage);
    if (typeof anyValue.details === "string") parts.push(anyValue.details);
    if (typeof anyValue.body === "string") parts.push(anyValue.body);
    if (anyValue.error) {
      parts.push(...collectErrorMessages(anyValue.error, seen));
    }
    if (anyValue.cause) {
      parts.push(...collectErrorMessages(anyValue.cause, seen));
    }
  }

  return parts;
}

function isRateLimitError(error: unknown): boolean {
  const combined = collectErrorMessages(error)
    .map((msg) => msg.toLowerCase())
    .join(" ");
  if (!combined) return false;
  return (
    combined.includes("rate limit") ||
    combined.includes("429") ||
    combined.includes("too many requests")
  );
}

function createIntervalThrottle(minIntervalMs: number) {
  const interval = Number.isFinite(minIntervalMs) && minIntervalMs > 0 ? minIntervalMs : 0;
  let lastStart = 0;
  let cooldownUntil = 0;
  let queue: Promise<void> = Promise.resolve();

  async function runTask<T>(fn: () => Promise<T>) {
    const now = Date.now();
    const waitUntil = Math.max(lastStart + interval, cooldownUntil);
    const wait = waitUntil > now ? waitUntil - now : 0;
    if (wait > 0) {
      await waitMs(wait);
    }
    lastStart = Date.now();
    return fn();
  }

  return {
    run<T>(fn: () => Promise<T>): Promise<T> {
      let resolveTask!: (value: T | PromiseLike<T>) => void;
      let rejectTask!: (reason?: unknown) => void;
      const result = new Promise<T>((resolve, reject) => {
        resolveTask = resolve;
        rejectTask = reject;
      });

      const execute = () =>
        runTask(fn)
          .then((value) => {
            resolveTask(value);
          })
          .catch((error) => {
            rejectTask(error);
          });

      queue = queue.then(execute).catch(() => {});
      return result;
    },
    extendCooldown(ms: number) {
      if (!Number.isFinite(ms) || ms <= 0) return;
      const now = Date.now();
      const candidate = now + ms;
      if (candidate > cooldownUntil) {
        cooldownUntil = candidate;
      }
    },
  };
}

const forfeitLogThrottle = createIntervalThrottle(FORFEIT_LOG_MIN_INTERVAL_MS);

function formatSaltHex(value: bigint): `0x${string}` {
  const hex = value.toString(16).padStart(64, "0");
  return `0x${hex}` as `0x${string}`;
}

function parseSaltHex(value: string): bigint | null {
  if (!isHex(value) || value.length !== 66) return null;
  try {
    return BigInt(value);
  } catch {
    return null;
  }
}
function commitHash(c: Choice, salt: `0x${string}`) {
  return keccak256(encodePacked(["uint8", "bytes32"], [c, salt]));
}
function normalizeRoomId(
  value: string | number | bigint | null | undefined
): string {
  if (value == null) return "";
  const str =
    typeof value === "number" || typeof value === "bigint"
      ? value.toString()
      : String(value).trim();
  if (str === "") return "";
  const digitsOnly = str.replace(/[^0-9]/g, "");
  if (digitsOnly === "") return "";
  const normalized = digitsOnly.replace(/^0+(?=\d)/, "");
  return normalized === "" ? "0" : normalized;
}

function extractForfeitRecord(log: any): ForfeitRecord | null {
  if (!log) return null;
  const loserAddr = normalizeForfeitAddress(String(log?.args?.loser ?? ""));
  const winnerAddr = normalizeForfeitAddress(String(log?.args?.winner ?? ""));
  const payoutValue = normalizeForfeitPayout(log?.args?.winnerPayout ?? null);
  if (!loserAddr && !winnerAddr && payoutValue == null) {
    return null;
  }
  return {
    loser: loserAddr ?? null,
    winner: winnerAddr ?? null,
    payout: payoutValue ?? null,
  };
}

async function fetchLatestForfeitLog({
  publicClient,
  event,
  roomId,
  latestBlock,
  toBlock,
  minBlock,
  chunkSize,
  maxAttempts,
}: {
  publicClient: MinimalPublicClient | null | undefined;
  event: any;
  roomId: number;
  latestBlock?: bigint | null;
  toBlock?: bigint | null;
  minBlock?: bigint | null;
  chunkSize?: bigint | null;
  maxAttempts?: number | null;
}): Promise<any | null> {
  if (!publicClient || !event) return null;
  if (!Number.isFinite(roomId) || roomId < 0) return null;

  const safeMinBlock = minBlock ?? RPS_DEPLOY_BLOCK;
  const rawChunk = chunkSize ?? LOG_CHUNK_SIZE;
  const safeChunk = rawChunk <= ZERO_BIGINT
    ? DEFAULT_LOG_CHUNK
    : rawChunk > RPC_LOG_RANGE_LIMIT
    ? RPC_LOG_RANGE_LIMIT
    : rawChunk;
  const span = safeChunk > ZERO_BIGINT ? safeChunk - BigInt(1) : ZERO_BIGINT;
  const attemptsLimit = maxAttempts && maxAttempts > 0 ? maxAttempts : LOG_MAX_ATTEMPTS;

  let cursorTo = toBlock ?? latestBlock ?? (await publicClient.getBlockNumber());
  if (cursorTo < safeMinBlock) {
    cursorTo = safeMinBlock;
  }

  let attempts = 0;
  while (cursorTo >= safeMinBlock && attempts < attemptsLimit) {
    let cursorFrom = cursorTo <= safeMinBlock ? safeMinBlock : cursorTo - span;
    if (cursorFrom < safeMinBlock) {
      cursorFrom = safeMinBlock;
    }

    let logs: any[] | null = null;
    try {
      logs = await forfeitLogThrottle.run(() =>
        publicClient.getLogs({
          address: RPS,
          event,
          args: { roomId: BigInt(roomId) },
          fromBlock: cursorFrom,
          toBlock: cursorTo,
        } as any)
      );
      attempts += 1;
    } catch (error) {
      attempts += 1;
      if (isRateLimitError(error)) {
        forfeitLogThrottle.extendCooldown(FORFEIT_LOG_RATE_LIMIT_COOLDOWN_MS);
        if (process.env.NODE_ENV !== "production") {
          console.warn("Rate limited while fetching forfeit logs", error);
        }
        if (FORFEIT_LOG_RATE_LIMIT_COOLDOWN_MS > 0) {
          await waitMs(FORFEIT_LOG_RATE_LIMIT_COOLDOWN_MS);
        }
        continue;
      }
      throw error;
    }

    const safeLogs = Array.isArray(logs) ? logs : [];
    if (safeLogs.length > 0) {
      return safeLogs[safeLogs.length - 1] as any;
    }

    if (cursorFrom <= safeMinBlock) {
      break;
    }

    const nextTo = cursorFrom - BigInt(1);
    if (nextTo < safeMinBlock) {
      break;
    }
    cursorTo = nextTo;
  }

  return null;
}
function getWinner(a: number, b: number): "A" | "B" | "Draw" | null {
  if (a === 0 && b === 0) return null;
  if (a === 0) return "B";
  if (b === 0) return "A";
  if (a === b) return "Draw";
  const aWins = (a === 1 && b === 3) || (a === 3 && b === 2) || (a === 2 && b === 1);
  return aWins ? "A" : "B";
}

function formatWholeWithThousands(whole: string) {
  const isNegative = whole.startsWith("-");
  const digits = isNegative ? whole.slice(1) : whole;
  const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return isNegative ? `-${formatted}` : formatted;
}

function normalizeStakeInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withoutGrouping = trimmed.replace(/,/g, "");
  return withoutGrouping;
}

function formatStakeDisplayFromNumber(value: number, fractionLength: number) {
  if (!Number.isFinite(value)) return "0";
  const safeValue = value < 0 ? 0 : value;
  if (fractionLength > 0) {
    const factor = Math.pow(10, fractionLength);
    const rounded = Math.round(safeValue * factor) / factor;
    const [wholePart, fractionPartRaw] = rounded.toFixed(fractionLength).split(".");
    const trimmedFraction = (fractionPartRaw ?? "").replace(/0+$/, "");
    const wholeWithSeparators = formatWholeWithThousands(wholePart);
    return trimmedFraction ? `${wholeWithSeparators}.${trimmedFraction}` : wholeWithSeparators;
  }

  const roundedInt = Math.round(safeValue);
  return formatWholeWithThousands(String(roundedInt));
}

function formatStakeDisplayString(value: string) {
  const normalized = normalizeStakeInput(value);
  if (!normalized) return "";
  const base = Number.parseFloat(normalized);
  if (!Number.isFinite(base)) return "";
  const fractionLength = normalized.includes(".")
    ? Math.min((normalized.split(".")[1] ?? "").length, 4)
    : 0;
  return formatStakeDisplayFromNumber(base, fractionLength);
}

function parseStakeValue(value: string) {
  const normalized = normalizeStakeInput(value);
  const fractionLength = normalized.includes(".")
    ? Math.min((normalized.split(".")[1] ?? "").length, 4)
    : 0;
  const base = Number.parseFloat(normalized || "0");
  return {
    base: Number.isFinite(base) ? base : 0,
    fractionLength,
  };
}

function prepareStakeForContract(value: string) {
  const normalized = normalizeStakeInput(value);
  return normalized === "" ? "0" : normalized;
}

const BIGINT_ZERO = BigInt(0);

function formatTokenAmount(value: bigint, decimals: number) {
  try {
    const raw = formatUnits(value, decimals);
    const [wholePart, fractionPart] = raw.split(".");
    const wholeWithSeparators = formatWholeWithThousands(wholePart);
    if (!fractionPart) return wholeWithSeparators;
    const trimmedFraction = fractionPart.slice(0, 4).replace(/0+$/, "");
    return trimmedFraction ? `${wholeWithSeparators}.${trimmedFraction}` : wholeWithSeparators;
  } catch {
    return value.toString();
  }
}

function formatTokenAmountSigned(value: bigint, decimals: number) {
  const negative = value < BIGINT_ZERO;
  const absolute = negative ? -value : value;
  const formatted = formatTokenAmount(absolute, decimals);
  if (formatted === "0") return formatted;
  return `${negative ? "-" : "+"}${formatted}`;
}

function InfoTable({ balance, decimals, stats, strings }: InfoTableProps) {
  const rows = useMemo<InfoRow[]>(() => {
    const formattedBalance = typeof balance === "bigint" ? formatTokenAmount(balance, decimals) : "-";
    const totalMatches = stats.win + stats.loss + stats.draw;
    const winningsFormatted = formatTokenAmount(stats.totalWinnings, decimals);
    const lossesFormatted = formatTokenAmount(stats.totalLosses, decimals);
    const net = stats.totalWinnings - stats.totalLosses;
    const netFormatted = net === BIGINT_ZERO ? "0" : formatTokenAmountSigned(net, decimals);
    const moveBreakdown = `✊ ${stats.rock} / 🖐 ${stats.paper} / ✌️ ${stats.scissors}`;

    const moveOptions = [
      { key: "rock", count: stats.rock, icon: "✊", label: strings.rock },
      { key: "paper", count: stats.paper, icon: "🖐", label: strings.paper },
      { key: "scissors", count: stats.scissors, icon: "✌️", label: strings.scissors },
    ];
    const topMove = moveOptions.reduce((acc, curr) => (curr.count > acc.count ? curr : acc), moveOptions[0]);
    const topMoveDetail = topMove.count > 0 ? `★ ${topMove.icon} ${topMove.label}` : null;

    return [
      {
        key: "balance",
        icon: <FaWallet aria-hidden="true" />,
        label: strings.balance,
        value: formattedBalance,
        detail: strings.stakePH ?? "$BANMAO",
      },
      {
        key: "performance",
        icon: <FaTrophy aria-hidden="true" />,
        label: strings.winLossRatio,
        value: `${stats.win} / ${stats.loss} / ${stats.draw}`,
        detail: totalMatches > 0 ? `Σ ${totalMatches}` : "Σ 0",
      },
      {
        key: "moves",
        icon: <FaHandRock aria-hidden="true" />,
        label: strings.rps,
        value: moveBreakdown,
        detail: topMoveDetail,
      },
      {
        key: "winnings",
        icon: <FaCoins aria-hidden="true" />,
        label: strings.totalWinningsLosses ?? `${strings.totalWinnings} / ${strings.totalLosses}`,
        value: `${winningsFormatted} / ${lossesFormatted}`,
        detail: `Δ ${netFormatted}`,
      },
    ];
  }, [balance, decimals, stats, strings]);

  return (
    <table className="stake-section__info-table">
      <tbody>
        {rows.map((row) => (
          <tr key={row.key}>
            <td>
              <span className="stake-section__info-main">
                <span className="stake-section__info-icon" aria-hidden="true">
                  {row.icon}
                </span>
                <span className="stake-section__info-value">{row.value}</span>
              </span>
              <span className="stake-section__info-caption">{row.label}</span>
              {row.detail ? <span className="stake-section__info-detail">{row.detail}</span> : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type HistoryLookupRaw = {
  id: number;
  creator: `0x${string}`;
  opponent: `0x${string}`;
  stake: bigint;
  state: number;
  commitA: `0x${string}`;
  commitB: `0x${string}`;
  revealA: number;
  revealB: number;
  forfeit?: ForfeitRecord | null;
};

function formatHistoryLookup(
  raw: HistoryLookupRaw,
  t: LocaleStrings,
  decimals: number
): HistoryLookupResult {
  const hasOpponent = raw.opponent !== ZERO_ADDR;
  const shortCreator = `${raw.creator.slice(0, 6)}...${raw.creator.slice(-4)}`;
  const shortOpponent = hasOpponent ? `${raw.opponent.slice(0, 6)}...${raw.opponent.slice(-4)}` : t.historyLookupOpponentPending;
  const stateLabel = STATE[raw.state] ?? String(raw.state);
  const baseRoom = {
    state: raw.state,
    commitA: raw.commitA,
    commitB: raw.commitB,
    revealA: raw.revealA,
    revealB: raw.revealB,
    creator: raw.creator,
    opponent: raw.opponent,
    forfeit: raw.forfeit,
  };

  let resultSummary: string;
  let note: string | undefined;

  if (roomIsFinalized(baseRoom)) {
    const outcome = deriveFinalOutcome(baseRoom);
    let viaLabel: string = t.historyLookupViaUnknown;
    if (outcome.via === "normal") viaLabel = t.historyLookupViaReveal;
    else if (outcome.via === "commit-timeout") viaLabel = t.historyLookupViaCommitTimeout;
    else if (outcome.via === "reveal-timeout") viaLabel = t.historyLookupViaRevealTimeout;
    else if (outcome.via === "both-commit-timeout") viaLabel = t.historyLookupViaBothCommit;
    else if (outcome.via === "both-reveal-timeout") viaLabel = t.historyLookupViaBothReveal;
    else if (outcome.via === "forfeit") viaLabel = t.historyLookupViaForfeit ?? t.historyLookupViaUnknown;

    if (outcome.winner === "creator") {
      resultSummary = t.historyLookupResultSummary(t.creator, viaLabel);
    } else if (outcome.winner === "opponent") {
      resultSummary = t.historyLookupResultSummary(t.opponent, viaLabel);
    } else if (outcome.via === "forfeit") {
      resultSummary = t.historyLookupResultForfeit
        ? t.historyLookupResultForfeit(viaLabel)
        : t.historyLookupResultDraw(viaLabel);
    } else {
      resultSummary = t.historyLookupResultDraw(viaLabel);
    }

    if (outcome.via === "forfeit" && t.historyLookupNoteForfeit) {
      note = t.historyLookupNoteForfeit("90%", "5%", "5%");
    }
  } else if (raw.state === 4) {
    const details = getCancelDetails({ ...baseRoom, opponent: raw.opponent }, t);
    resultSummary = t.historyLookupCanceledSummary(details.reason);
    note = t.historyLookupNoteRefund(details.refund);
  } else if (!hasOpponent) {
    resultSummary = t.historyLookupNoOpponent;
  } else {
    resultSummary = t.historyLookupPending(stateLabel);
  }

  return {
    id: raw.id,
    creator: shortCreator,
    creatorFull: raw.creator,
    opponent: hasOpponent ? shortOpponent : t.historyLookupOpponentPending,
    opponentFull: raw.opponent,
    stakeFormatted: `${formatTokenAmount(raw.stake, decimals)} $BANMAO`,
    stateLabel,
    resultSummary,
    note,
    hasOpponent,
  };
}

function roomHasRevealedOutcome(room: { revealA?: number; revealB?: number }) {
  const revealA = Number(room?.revealA ?? 0);
  const revealB = Number(room?.revealB ?? 0);
  return revealA > 0 && revealB > 0;
}

type ForfeitResolution = {
  winnerSide: "creator" | "opponent" | null;
  loserSide: "creator" | "opponent" | null;
  winnerAddress: string | null;
  loserAddress: string | null;
};

function determineForfeitViewerResult(
  resolution: ForfeitResolution | null,
  options: {
    viewerAddress?: string | null;
    creator?: `0x${string}` | null;
    opponent?: `0x${string}` | null;
  }
): { viewerWon: boolean; viewerLost: boolean } {
  if (!resolution) return { viewerWon: false, viewerLost: false };

  const viewer = options.viewerAddress?.toLowerCase?.() ?? "";
  const creatorLower = options.creator?.toLowerCase?.() ?? null;
  const opponentLower = options.opponent?.toLowerCase?.() ?? null;

  const winnerAddress = resolution.winnerAddress ?? null;
  const loserAddress = resolution.loserAddress ?? null;

  let viewerWon = !!(viewer && winnerAddress && viewer === winnerAddress);
  let viewerLost = !!(viewer && loserAddress && viewer === loserAddress);

  if (!viewerWon && !viewerLost && viewer) {
    if (resolution.winnerSide === "creator" && creatorLower && viewer === creatorLower) {
      viewerWon = true;
    } else if (resolution.winnerSide === "opponent" && opponentLower && viewer === opponentLower) {
      viewerWon = true;
    } else if (resolution.loserSide === "creator" && creatorLower && viewer === creatorLower) {
      viewerLost = true;
    } else if (resolution.loserSide === "opponent" && opponentLower && viewer === opponentLower) {
      viewerLost = true;
    } else if (!resolution.winnerSide && resolution.loserSide === "creator" && opponentLower && viewer === opponentLower) {
      viewerWon = true;
    } else if (!resolution.winnerSide && resolution.loserSide === "opponent" && creatorLower && viewer === creatorLower) {
      viewerWon = true;
    } else if (!resolution.loserSide && resolution.winnerSide === "creator" && opponentLower && viewer === opponentLower) {
      viewerLost = true;
    } else if (!resolution.loserSide && resolution.winnerSide === "opponent" && creatorLower && viewer === creatorLower) {
      viewerLost = true;
    }
  }

  return { viewerWon, viewerLost };
}

function createForfeitWarning(
  room: Partial<RoomSnapshot>,
  viewerAddress: string | null,
  t: LocaleStrings,
  decimals: number
): { title: string; body: string } | null {
  if (!viewerAddress) return null;
  const viewerLower = viewerAddress.toLowerCase();
  const creatorLower = room.creator?.toLowerCase?.() ?? null;
  const opponentLower = room.opponent?.toLowerCase?.() ?? null;
  const viewerIsCreator = creatorLower === viewerLower;
  const viewerIsOpponent = opponentLower === viewerLower;
  if (!viewerIsCreator && !viewerIsOpponent) return null;

  const stakeValue = typeof room.stake === "bigint" ? room.stake : ZERO_BIGINT;
  const stakeLabel = `${formatTokenAmount(stakeValue, decimals)} $BANMAO`;
  const state = Number(room.state ?? 0);

  const viewerCommitted = viewerIsCreator
    ? room.commitA && room.commitA !== ZERO_COMMIT
    : room.commitB && room.commitB !== ZERO_COMMIT;
  const opponentCommitted = viewerIsCreator
    ? room.commitB && room.commitB !== ZERO_COMMIT
    : room.commitA && room.commitA !== ZERO_COMMIT;

  const viewerRevealed = viewerIsCreator
    ? Number(room.revealA ?? 0) !== 0
    : Number(room.revealB ?? 0) !== 0;
  const opponentRevealed = viewerIsCreator
    ? Number(room.revealB ?? 0) !== 0
    : Number(room.revealA ?? 0) !== 0;

  if (state === 1) {
    if (!viewerCommitted && !opponentCommitted) {
      return {
        title: t.forfeitWarnBothUncommittedTitle,
        body: t.forfeitWarnBothUncommittedBody(stakeLabel),
      };
    }
    if (viewerCommitted && !opponentCommitted) {
      return {
        title: t.forfeitWarnSelfCommittedTitle,
        body: t.forfeitWarnSelfCommittedBody(stakeLabel),
      };
    }
    if (!viewerCommitted && opponentCommitted) {
      return {
        title: t.forfeitWarnSelfUncommittedTitle,
        body: t.forfeitWarnSelfUncommittedBody(stakeLabel),
      };
    }
  } else if (state === 2) {
    if (!viewerRevealed && !opponentRevealed) {
      return {
        title: t.forfeitWarnBothUnrevealedTitle,
        body: t.forfeitWarnBothUnrevealedBody(stakeLabel),
      };
    }
    if (viewerRevealed && !opponentRevealed) {
      return {
        title: t.forfeitWarnSelfRevealedTitle,
        body: t.forfeitWarnSelfRevealedBody(stakeLabel),
      };
    }
    if (!viewerRevealed && opponentRevealed) {
      return {
        title: t.forfeitWarnSelfUnrevealedTitle,
        body: t.forfeitWarnSelfUnrevealedBody(stakeLabel),
      };
    }
  }

  return {
    title: t.forfeitWarnDefaultTitle,
    body: t.forfeitWarnDefaultBody(stakeLabel),
  };
}

function resolveForfeitOutcome(room: {
  forfeit?: ForfeitRecord | null;
  creator?: `0x${string}`;
  opponent?: `0x${string}`;
}): ForfeitResolution | null {
  const record = room?.forfeit;
  if (!record) return null;

  const winnerLower = record.winner?.toLowerCase?.() ?? null;
  const loserLower = record.loser?.toLowerCase?.() ?? null;
  if (!winnerLower && !loserLower) return null;

  const creatorLower = room.creator?.toLowerCase?.() ?? null;
  const opponentLower = room.opponent?.toLowerCase?.() ?? null;

  let winnerSide: "creator" | "opponent" | null = null;
  let loserSide: "creator" | "opponent" | null = null;

  if (winnerLower && creatorLower && winnerLower === creatorLower) {
    winnerSide = "creator";
  } else if (winnerLower && opponentLower && winnerLower === opponentLower) {
    winnerSide = "opponent";
  }

  if (loserLower && creatorLower && loserLower === creatorLower) {
    loserSide = "creator";
  } else if (loserLower && opponentLower && loserLower === opponentLower) {
    loserSide = "opponent";
  }

  if (!winnerSide) {
    if (loserSide === "creator" && opponentLower) {
      winnerSide = "opponent";
    } else if (loserSide === "opponent" && creatorLower) {
      winnerSide = "creator";
    }
  }

  if (!loserSide) {
    if (winnerSide === "creator" && opponentLower) {
      loserSide = "opponent";
    } else if (winnerSide === "opponent" && creatorLower) {
      loserSide = "creator";
    }
  }

  return {
    winnerSide,
    loserSide,
    winnerAddress: winnerLower,
    loserAddress: loserLower,
  };
}

function roomIsFinalized(room: {
  state?: number;
  revealA?: number;
  revealB?: number;
  forfeit?: ForfeitRecord | null;
  creator?: `0x${string}`;
  opponent?: `0x${string}`;
}) {
  if (!room) return false;
  if (resolveForfeitOutcome(room)) return true;
  if (room.state === 3) return true;
  if (room.state === 4 && roomHasRevealedOutcome(room)) return true;
  return false;
}

type FinalOutcomeVia =
  | "normal"
  | "commit-timeout"
  | "reveal-timeout"
  | "both-commit-timeout"
  | "both-reveal-timeout"
  | "forfeit"
  | "unknown";

type FinalOutcome = {
  winner: "creator" | "opponent" | "draw" | null;
  via: FinalOutcomeVia;
};

function deriveFinalOutcome(room: {
  state?: number;
  commitA?: `0x${string}`;
  commitB?: `0x${string}`;
  revealA?: number;
  revealB?: number;
  creator?: `0x${string}`;
  opponent?: `0x${string}`;
  forfeit?: ForfeitRecord | null;
}): FinalOutcome {
  if (!room || !roomIsFinalized(room)) {
    return { winner: null, via: "unknown" };
  }

  const forfeitResolution = resolveForfeitOutcome(room);
  if (forfeitResolution) {
    if (forfeitResolution.winnerSide === "creator") {
      return { winner: "creator", via: "forfeit" };
    }
    if (forfeitResolution.winnerSide === "opponent") {
      return { winner: "opponent", via: "forfeit" };
    }
    if (forfeitResolution.loserSide === "creator") {
      return { winner: "opponent", via: "forfeit" };
    }
    if (forfeitResolution.loserSide === "opponent") {
      return { winner: "creator", via: "forfeit" };
    }
    return { winner: null, via: "forfeit" };
  }

  const hasRevealed = roomHasRevealedOutcome(room);
  if (hasRevealed) {
    const winner = getWinner(room.revealA ?? 0, room.revealB ?? 0);
    if (winner === "A") return { winner: "creator", via: "normal" };
    if (winner === "B") return { winner: "opponent", via: "normal" };
    if (winner === "Draw") return { winner: "draw", via: "normal" };
    return { winner: null, via: "normal" };
  }

  const commitAZero = !room.commitA || room.commitA === ZERO_COMMIT;
  const commitBZero = !room.commitB || room.commitB === ZERO_COMMIT;
  const revealAZero = (room.revealA ?? 0) === 0;
  const revealBZero = (room.revealB ?? 0) === 0;

  if (!commitAZero && commitBZero) {
    return { winner: "creator", via: "commit-timeout" };
  }
  if (commitAZero && !commitBZero) {
    return { winner: "opponent", via: "commit-timeout" };
  }

  if (!revealAZero && revealBZero) {
    return { winner: "creator", via: "reveal-timeout" };
  }
  if (revealAZero && !revealBZero) {
    return { winner: "opponent", via: "reveal-timeout" };
  }

  if (commitAZero && commitBZero) {
    return { winner: "draw", via: "both-commit-timeout" };
  }

  if (revealAZero && revealBZero) {
    return { winner: "draw", via: "both-reveal-timeout" };
  }

  return { winner: "draw", via: "unknown" };
}
function formatTimeLeft(deadline: number, t: any, nowOverride?: number): string {
  const now = nowOverride ?? Math.floor(Date.now() / 1000);
  const timeLeft = deadline > now ? deadline - now : 0;
  if (timeLeft === 0) return t.timeout ?? "00:00:00";
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

/* LocalStorage helpers: commit cache */
function parseCommitRecord(value: unknown): LastCommitInfo | null {
  if (!value || typeof value !== "object") return null;
  const maybe = value as Partial<LastCommitInfo>;
  if (
    typeof maybe.roomId === "string" &&
    typeof maybe.stakeHuman === "string" &&
    typeof maybe.choice === "number" &&
    typeof maybe.salt === "string"
  ) {
    const saltValue = maybe.salt as string;
    if (isHex(saltValue) && saltValue.length === 66) {
      const normalizedRoomId = normalizeRoomId(maybe.roomId);
      if (!normalizedRoomId) return null;
      return {
        roomId: normalizedRoomId,
        stakeHuman: maybe.stakeHuman,
        choice: maybe.choice as Choice,
        salt: saltValue as `0x${string}`,
      };
    }
  }
  return null;
}

const COMMIT_STORAGE_PREFIX = "banmao_commit_";
const COMMIT_ARCHIVE_STORAGE_PREFIX = "banmao_commit_archive_";

function loadCommitInfoMap(storageKey: string): CommitInfoMap {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(storageKey);
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored);
    if (!parsed) return {};
    if (Array.isArray(parsed)) return {};
    if (typeof parsed === "object") {
      if ("roomId" in parsed) {
        const single = parseCommitRecord(parsed);
        if (single) {
          const normalizedMap: CommitInfoMap = { [single.roomId]: single };
          localStorage.setItem(storageKey, JSON.stringify(normalizedMap));
          return normalizedMap;
        }
        return {};
      }

      const map: CommitInfoMap = {};
      let needsRewrite = false;
      for (const [rawKey, value] of Object.entries(parsed)) {
        const info = parseCommitRecord(value);
        if (info) {
          map[info.roomId] = info;
          if (rawKey !== info.roomId) needsRewrite = true;
        } else {
          needsRewrite = true;
        }
      }
      if (needsRewrite) localStorage.setItem(storageKey, JSON.stringify(map));
      return map;
    }
  } catch {
    return {};
  }
  return {};
}

function loadCommitInfos(address: `0x${string}`): CommitInfoMap {
  return loadCommitInfoMap(`${COMMIT_STORAGE_PREFIX}${address}`);
}

function loadArchivedCommitInfos(address: `0x${string}`): CommitInfoMap {
  return loadCommitInfoMap(`${COMMIT_ARCHIVE_STORAGE_PREFIX}${address}`);
}

function saveCommitInfoToStorage(storageKey: string, info: LastCommitInfo) {
  if (typeof window === "undefined") return;
  const normalizedRoomId = normalizeRoomId(info.roomId);
  if (!normalizedRoomId) return;
  const current = loadCommitInfoMap(storageKey);
  const normalizedInfo: LastCommitInfo = { ...info, roomId: normalizedRoomId };
  current[normalizedRoomId] = normalizedInfo;
  localStorage.setItem(storageKey, JSON.stringify(current));
}

function saveCommitInfo(address: `0x${string}`, info: LastCommitInfo) {
  saveCommitInfoToStorage(`${COMMIT_STORAGE_PREFIX}${address}`, info);
}

function saveArchivedCommitInfo(address: `0x${string}`, info: LastCommitInfo) {
  saveCommitInfoToStorage(`${COMMIT_ARCHIVE_STORAGE_PREFIX}${address}`, info);
}

function clearCommitInfoFromStorage(storageKey: string, roomId?: string) {
  if (typeof window === "undefined") return;
  if (!roomId) {
    localStorage.removeItem(storageKey);
    return;
  }
  const current = loadCommitInfoMap(storageKey);
  const next = { ...current };
  let changed = false;
  const idsToDelete = new Set<string>();
  const rawKey = roomId.trim();
  if (rawKey) idsToDelete.add(rawKey);
  const normalized = normalizeRoomId(roomId);
  if (normalized) idsToDelete.add(normalized);
  idsToDelete.forEach((id) => {
    if (id in next) {
      delete next[id];
      changed = true;
    }
  });
  if (!changed) return;
  if (Object.keys(next).length === 0) localStorage.removeItem(storageKey);
  else localStorage.setItem(storageKey, JSON.stringify(next));
}

function clearCommitInfo(
  address: `0x${string}`,
  roomId?: string,
  options?: { preserveArchive?: boolean }
) {
  clearCommitInfoFromStorage(`${COMMIT_STORAGE_PREFIX}${address}`, roomId);
  if (options?.preserveArchive) return;
  clearCommitInfoFromStorage(`${COMMIT_ARCHIVE_STORAGE_PREFIX}${address}`, roomId);
}

async function ensureHtml2Canvas(): Promise<Html2CanvasFn | null> {
  if (typeof window === "undefined") return null;
  if (typeof window.html2canvas === "function") return window.html2canvas;

  try {
    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>("script[data-html2canvas]");
      if (existing) {
        if (existing.dataset.ready === "1") {
          resolve();
        } else {
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", () => reject(new Error("html2canvas failed to load")), {
            once: true,
          });
        }
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
      script.async = true;
      script.dataset.html2canvas = "1";
      script.addEventListener(
        "load",
        () => {
          script.dataset.ready = "1";
          resolve();
        },
        { once: true }
      );
      script.addEventListener("error", () => reject(new Error("html2canvas failed to load")), { once: true });
      document.head.appendChild(script);
    });
  } catch (error) {
    console.error(error);
    return null;
  }

  return typeof window.html2canvas === "function" ? window.html2canvas : null;
}

async function copyToClipboard(text: string) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/* LocalStorage helpers: lịch sử phòng đã tham gia/tạo */
const HIST_LIMIT = 12;
const ROOM_SCAN_LIMIT = 24;
const MAX_TRACKED_ROOMS = 48;
const ACTIVE_ROOM_TARGET = 16;
const ACTIVE_ROOM_BACKFILL_SCAN_LIMIT = 160;
const COMMIT_DEADLINE_CACHE_KEY = "banmao_commit_deadlines";
const REVEAL_DEADLINE_CACHE_KEY = "banmao_reveal_deadlines";

function loadJoinedRooms(address: `0x${string}`): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(`banmao_joined_${address}`) || "[]");
  } catch {
    return [];
  }
}
function saveJoinedRooms(address: `0x${string}`, ids: number[]) {
  if (typeof window === "undefined") return;
  const dedup = Array.from(new Set(ids));
  localStorage.setItem(`banmao_joined_${address}`, JSON.stringify(dedup.slice(0, HIST_LIMIT)));
}
function addRoomToHistory(addr: `0x${string}`, id: number) {
  const cur = loadJoinedRooms(addr);
  const next = [id, ...cur.filter((x) => x !== id)].slice(0, HIST_LIMIT);
  saveJoinedRooms(addr, next);
  return next;
}

function loadSeenResultRooms(address: `0x${string}`): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`banmao_results_${address}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((v) => Number(v))
      .filter((v) => Number.isFinite(v) && v >= 0);
  } catch {
    return [];
  }
}

function saveSeenResultRooms(address: `0x${string}`, ids: number[]) {
  if (typeof window === "undefined") return;
  const dedup = Array.from(new Set(ids.map((v) => Number(v)).filter((v) => Number.isFinite(v) && v >= 0)));
  localStorage.setItem(`banmao_results_${address}`, JSON.stringify(dedup.slice(0, HIST_LIMIT * 2)));
}

function prioritizeCachedRooms(rooms: RoomWithForfeit[]) {
  if (!Array.isArray(rooms) || rooms.length === 0) return [];

  const sorted = [...rooms].sort((a, b) => {
    const finalA = roomIsFinalized(a);
    const finalB = roomIsFinalized(b);
    if (finalA !== finalB) return finalA ? 1 : -1;

    const idA = Number(a?.id ?? 0);
    const idB = Number(b?.id ?? 0);
    const finiteA = Number.isFinite(idA) && idA > 0;
    const finiteB = Number.isFinite(idB) && idB > 0;

    if (finiteA && finiteB) {
      if (idA === idB) return 0;
      return idA > idB ? -1 : 1;
    }

    if (finiteA !== finiteB) {
      return finiteA ? -1 : 1;
    }

    return 0;
  });

  const activeCount = sorted.reduce((count, room) => (roomIsFinalized(room) ? count : count + 1), 0);
  const limit = Math.max(MAX_TRACKED_ROOMS, activeCount);
  if (sorted.length <= limit) return sorted;
  return sorted.slice(0, limit);
}

function loadCommitDeadlineFallbacksFromStorage() {
  const map = new Map<number, number>();
  if (typeof window === "undefined") return map;
  try {
    const raw = window.localStorage.getItem(COMMIT_DEADLINE_CACHE_KEY);
    if (!raw) return map;
    const parsed = JSON.parse(raw);
    const addEntry = (id: unknown, deadline: unknown) => {
      const idNum = Number(id);
      const deadlineNum = Number(deadline);
      if (Number.isFinite(idNum) && idNum >= 0 && Number.isFinite(deadlineNum) && deadlineNum > 0) {
        map.set(idNum, Math.floor(deadlineNum));
      }
    };
    if (Array.isArray(parsed)) {
      parsed.forEach((entry) => {
        if (Array.isArray(entry) && entry.length >= 2) {
          addEntry(entry[0], entry[1]);
        }
      });
    } else if (parsed && typeof parsed === "object") {
      Object.entries(parsed).forEach(([id, deadline]) => addEntry(id, deadline));
    }
  } catch {}
  return map;
}

function persistCommitDeadlineFallbacks(map: Map<number, number>) {
  if (typeof window === "undefined") return;
  const entries = Array.from(map.entries()).filter(([, deadline]) => Number.isFinite(deadline) && deadline > 0);
  if (entries.length === 0) {
    window.localStorage.removeItem(COMMIT_DEADLINE_CACHE_KEY);
  } else {
    window.localStorage.setItem(COMMIT_DEADLINE_CACHE_KEY, JSON.stringify(entries));
  }
}

function loadRevealDeadlineFallbacksFromStorage() {
  const map = new Map<number, number>();
  if (typeof window === "undefined") return map;
  try {
    const raw = window.localStorage.getItem(REVEAL_DEADLINE_CACHE_KEY);
    if (!raw) return map;
    const parsed = JSON.parse(raw);
    const addEntry = (id: unknown, deadline: unknown) => {
      const idNum = Number(id);
      const deadlineNum = Number(deadline);
      if (Number.isFinite(idNum) && idNum >= 0 && Number.isFinite(deadlineNum) && deadlineNum > 0) {
        map.set(idNum, Math.floor(deadlineNum));
      }
    };
    if (Array.isArray(parsed)) {
      parsed.forEach((entry) => {
        if (Array.isArray(entry) && entry.length >= 2) {
          addEntry(entry[0], entry[1]);
        }
      });
    } else if (parsed && typeof parsed === "object") {
      Object.entries(parsed).forEach(([id, deadline]) => addEntry(id, deadline));
    }
  } catch {}
  return map;
}

function persistRevealDeadlineFallbacks(map: Map<number, number>) {
  if (typeof window === "undefined") return;
  const entries = Array.from(map.entries()).filter(([, deadline]) => Number.isFinite(deadline) && deadline > 0);
  if (entries.length === 0) {
    window.localStorage.removeItem(REVEAL_DEADLINE_CACHE_KEY);
  } else {
    window.localStorage.setItem(REVEAL_DEADLINE_CACHE_KEY, JSON.stringify(entries));
  }
}

/* Helper cho UI "khả dụng/đếm ngược/claimable" + expired */
function availability(room: any, nowOverride?: number) {
  const now = nowOverride ?? Math.floor(Date.now() / 1000);
  const s = room.state as number;

  if (resolveForfeitOutcome(room)) {
    return { label: "Finished", live: false, expired: true, claimable: false, deadline: 0, phase: "" };
  }

  // WAIT: Phòng chưa có đối thủ (hiển thị joinable trong cửa sổ commit)
  if (s === 0 && room.opponent === ZERO_ADDR) {
    const hasDeadline = !!room.commitDeadline && room.commitDeadline > 0;
    const live = hasDeadline ? now < room.commitDeadline : true; // nếu contract chưa set deadline => coi như joinable
    return {
      label: live ? "Joinable" : "Wait",
      live,
      expired: !live,
      claimable: hasDeadline ? now >= room.commitDeadline : false,
      deadline: hasDeadline ? room.commitDeadline : 0,
      phase: "commit",
    };
  }

  if (s === 1) {
    const live = room.commitDeadline > 0 ? now < room.commitDeadline : true;
    return {
      label: live ? "Committing" : "Commit expired",
      live,
      expired: !live,
      claimable: room.commitDeadline > 0 ? now >= room.commitDeadline : false,
      deadline: room.commitDeadline || 0,
      phase: "commit",
    };
  }

  if (s === 2) {
    const live = room.revealDeadline > 0 ? now < room.revealDeadline : true;
    return {
      label: live ? "Revealing" : "Reveal expired",
      live,
      expired: !live,
      claimable: room.revealDeadline > 0 ? now >= room.revealDeadline : false,
      deadline: room.revealDeadline || 0,
      phase: "reveal",
    };
  }

  if (s === 3) return { label: "Finished", live: false, expired: true, claimable: false, deadline: 0, phase: "" };
  if (s === 4) {
    if (roomIsFinalized(room)) {
      return { label: "Finished", live: false, expired: true, claimable: false, deadline: 0, phase: "" };
    }
    return { label: "Canceled", live: false, expired: true, claimable: false, deadline: 0, phase: "" };
  }
  return { label: "Unknown", live: false, expired: true, claimable: false, deadline: 0, phase: "" };
}

function getCancelDetails(room: any, t: any) {
  if (room.opponent === ZERO_ADDR) {
    return {
      reason: t.canceledReasonNoJoin ?? t.canceledReasonUnknown,
      refund:
        t.canceledRefundCreatorOnly ??
        t.canceledRefundBothPartial ??
        t.canceledRefundUnknown,
    };
  }
  const commitAZero = !room.commitA || room.commitA === ZERO_COMMIT;
  const commitBZero = !room.commitB || room.commitB === ZERO_COMMIT;
  const revealAZero = room.revealA === 0;
  const revealBZero = room.revealB === 0;

  if (commitAZero && commitBZero) {
    return {
      reason: t.canceledReasonCommit,
      refund: t.canceledRefundBothFull,
    };
  }

  if (!commitAZero && !commitBZero && revealAZero && revealBZero) {
    return {
      reason: t.canceledReasonReveal,
      refund: t.canceledRefundBothPartial,
    };
  }

  return {
    reason: t.canceledReasonUnknown,
    refund: t.canceledRefundUnknown,
  };
}

/* ===================== PAGE ===================== */
export default function Page() {
  const { address, isConnected } = useAccount();
  const addressLower = useMemo(() => address?.toLowerCase() ?? null, [address]);
  const publicClient = usePublicClient();

  // i18n
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState<ThemeKey>(DEFAULT_THEME);
  const t = (langs[lang as keyof typeof langs] ?? langs.vi) as LocaleStrings;
  const docsLink = t.communityLinkDocsUrl || GOOGLE_DOCS_URL;
  const refreshLabel = t.refreshData ?? "Refresh data";
  // Fallback cho khóa mở rộng (nếu bộ ngôn ngữ của bạn chưa thêm):
  // local commit cache
  const [commitInfoMap, setCommitInfoMap] = useState<CommitInfoMap>({});
  const [archivedCommitInfoMap, setArchivedCommitInfoMap] = useState<CommitInfoMap>({});
  const forfeitEventAbi = useMemo(() => {
    try {
      return getAbiItem({ abi: RPS_ABI, name: "Forfeited" });
    } catch {
      return null;
    }
  }, []);

  // form state
  const [stakeHuman, setStakeHuman] = useState(() => formatStakeDisplayString("1000") || "1000");
  const [decimals, setDecimals] = useState(18);
  const [roomId, setRoomId] = useState<string>("");
  const [choice, setChoice] = useState<Choice>(1);
  const [salt, setSalt] = useState<`0x${string}`>(newSalt());
  const [stakeStep, setStakeStep] = useState<(typeof STEP_PRESETS)[number]>(STEP_PRESETS[0]);
  const stakeStepLabel = useMemo(
    () => formatWholeWithThousands(String(stakeStep)),
    [stakeStep]
  );
  const roomStep = 1;
  const saltStep = 1;
  const [commitDurationInput, setCommitDurationInput] = useState(
    String(DEFAULT_COMMIT_WINDOW)
  );
  const [isClient, setIsClient] = useState(false);

  // lịch sử phòng (12 gần nhất)
  const [joinedRooms, setJoinedRooms] = useState<number[]>([]);
  const [seenResultRooms, setSeenResultRooms] = useState<number[]>([]);
  const [freshResultRooms, setFreshResultRooms] = useState<number[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [vibrationMs, setVibrationMs] = useState(DEFAULT_VIBRATION);
  const [notificationSnoozeMinutes, setNotificationSnoozeMinutes] = useState(
    DEFAULT_SNOOZE_MINUTES
  );
  const [isTelegramConnected, setIsTelegramConnected] = useState(false);
  const [isTelegramPanelCollapsed, setIsTelegramPanelCollapsed] = useState(true);
  const [uiScale, setUiScale] = useState<UiScale>("normal");
  const [isSharing, setIsSharing] = useState(false);
  const [isPersonalBoardCollapsed, setIsPersonalBoardCollapsed] = useState(false);
  const [isStakeTableCollapsed, setIsStakeTableCollapsed] = useState(false);
  const [showOnlyActionableRooms, setShowOnlyActionableRooms] = useState(false);
  const [joinSectionHighlight, setJoinSectionHighlight] = useState(false);
  const [historyLookupId, setHistoryLookupId] = useState("");
  const [historyLookupState, setHistoryLookupState] = useState<HistoryLookupState>({ status: "idle" });
  const [nowTs, setNowTs] = useState(() => Math.floor(Date.now() / 1000));
  const [forfeitResults, setForfeitResults] = useState<Record<number, ForfeitRecord>>({});
  const [cachedRooms, setCachedRooms] = useState<RoomWithForfeit[]>([]);
  const [backfillRoomIds, setBackfillRoomIds] = useState<bigint[]>([]);
  const backfillStateRef = useRef<{
    cursor: number | null;
    running: boolean;
  }>({ cursor: null, running: false });
  const backfillVisitedRef = useRef<Set<number>>(new Set());
  const backfillPendingIdsRef = useRef<Set<number>>(new Set());
  const [cachedInfo, setCachedInfo] = useState<CachedInfoState | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // để tránh toast lặp lại khi theo dõi block
  const notifiedRef = useRef<Set<string>>(new Set());
  const snoozedRef = useRef<Map<string, number>>(new Map());
  const mainContentRef = useRef<HTMLDivElement | null>(null);
  const joinSectionRef = useRef<HTMLElement | null>(null);
  const joinInputRef = useRef<HTMLInputElement | null>(null);
  const alertLoopsRef = useRef<Map<string, number>>(new Map());
  const audioCtxRef = useRef<AudioContext | null>(null);
  const deepLinkHandledRef = useRef(false);
  const joinPrefillRef = useRef<string | null>(null);
  const lastBeepRef = useRef(0);
  const lastVibrationRef = useRef(0);
  const lastHistoryLookupRef = useRef<HistoryLookupRaw | null>(null);
  const forfeitResultsRef = useRef<Record<number, ForfeitRecord>>({});
  const forfeitFetchMetaRef = useRef<Map<number, { lastAttempt: number; settled: boolean }>>(new Map());
  const fetchedForfeitIdsRef = useRef<Set<number>>(new Set());
  const roomsRef = useRef<any[]>([]);
  const stableRoomsRawRef = useRef<any[] | null>(null);
  const stableTrackedRoomIdsRef = useRef<bigint[]>([]);
  const blockRefetchState = useRef<{ timer: ReturnType<typeof setTimeout> | null; last: number }>({
    timer: null,
    last: 0,
  });
  const manualRefreshRef = useRef(false);

  // Track các phòng tôi vừa tạo: id -> expireAt (now + 15m) để rung/thông báo commit/reveal
  const myCreatedRoomsRef = useRef<Map<number, number>>(new Map());
  const localCommitDeadlinesRef = useRef<Map<number, number>>(new Map());
  const localRevealDeadlinesRef = useRef<Map<number, number>>(new Map());
  const commitDurationsRef = useRef<Map<number, number>>(new Map());
  const syncCommitDeadlineFallbacks = useCallback(() => {
    if (typeof window === "undefined") return;
    persistCommitDeadlineFallbacks(localCommitDeadlinesRef.current);
  }, []);
  const syncRevealDeadlineFallbacks = useCallback(() => {
    if (typeof window === "undefined") return;
    persistRevealDeadlineFallbacks(localRevealDeadlinesRef.current);
  }, []);
  const rememberCommitDeadlineFallback = useCallback(
    (roomId: number, deadline: number) => {
      if (!Number.isFinite(roomId) || roomId < 0) return;
      if (!Number.isFinite(deadline) || deadline <= 0) return;
      const normalized = Math.floor(deadline);
      const current = localCommitDeadlinesRef.current.get(roomId);
      if (current === normalized) return;
      localCommitDeadlinesRef.current.set(roomId, normalized);
      syncCommitDeadlineFallbacks();
    },
    [syncCommitDeadlineFallbacks]
  );
  const rememberCommitDuration = useCallback((roomId: number, duration: number) => {
    if (!Number.isFinite(roomId) || roomId < 0) return;
    if (!Number.isFinite(duration) || duration <= 0) return;
    const normalizedRoomId = Math.floor(roomId);
    const normalizedDuration = Math.floor(duration);
    commitDurationsRef.current.set(normalizedRoomId, normalizedDuration);
  }, []);
  const getCommitDurationForRoom = useCallback(
    (roomId?: number | null) => {
      if (typeof roomId === "number" && Number.isFinite(roomId)) {
        const normalized = Math.floor(roomId);
        const stored = commitDurationsRef.current.get(normalized);
        if (stored && stored > 0) return stored;
      }
      return DEFAULT_COMMIT_WINDOW;
    },
    []
  );
  const rememberRevealDeadlineFallback = useCallback(
    (roomId: number, deadline: number) => {
      if (!Number.isFinite(roomId) || roomId < 0) return;
      if (!Number.isFinite(deadline) || deadline <= 0) return;
      const normalized = Math.floor(deadline);
      const current = localRevealDeadlinesRef.current.get(roomId);
      if (current === normalized) return;
      localRevealDeadlinesRef.current.set(roomId, normalized);
      syncRevealDeadlineFallbacks();
    },
    [syncRevealDeadlineFallbacks]
  );
  const refreshCommitDeadline = useCallback(
    async (roomId: number) => {
      if (!publicClient) return;
      if (!Number.isFinite(roomId) || roomId < 0) return;
      try {
        const rawRoom: any = await publicClient.readContract({
          address: RPS,
          abi: RPS_ABI,
          functionName: "rooms",
          args: [BigInt(Math.floor(roomId))],
        } as any);
        const commitDeadlineValue = Number(rawRoom?.[7] ?? rawRoom?.commitDeadline ?? 0);
        if (Number.isFinite(commitDeadlineValue) && commitDeadlineValue > 0) {
          rememberCommitDeadlineFallback(Math.floor(roomId), commitDeadlineValue);
          if (!commitDurationsRef.current.has(Math.floor(roomId))) {
            const nowSec = Math.floor(Date.now() / 1000);
            const remaining = commitDeadlineValue - nowSec;
            if (remaining > 0) {
              rememberCommitDuration(Math.floor(roomId), remaining);
            }
          }
        }
      } catch (error) {
        console.error("Failed to refresh commit deadline", error);
      }
    },
    [publicClient, rememberCommitDeadlineFallback, rememberCommitDuration]
  );
  const rememberForfeitFetch = useCallback((roomId: number, settled: boolean) => {
    if (!Number.isFinite(roomId) || roomId <= 0) return;
    const normalized = Math.floor(roomId);
    forfeitFetchMetaRef.current.set(normalized, {
      lastAttempt: Date.now(),
      settled,
    });
  }, []);
  const updateForfeitResult = useCallback(
    (roomId: number, info: ForfeitRecord | null | undefined) => {
      const normalizedId = Number.isFinite(roomId) ? Math.floor(roomId) : NaN;
      if (!Number.isFinite(normalizedId) || normalizedId < 0 || !info) return;

      const current = forfeitResultsRef.current[normalizedId] ?? {};
      const incomingLoser = normalizeForfeitAddress(info.loser ?? null);
      const incomingWinner = normalizeForfeitAddress(info.winner ?? null);
      const currentLoser = normalizeForfeitAddress(current.loser ?? null);
      const currentWinner = normalizeForfeitAddress(current.winner ?? null);
      const incomingPayout = typeof info.payout === "bigint" ? info.payout : null;
      const currentPayout = typeof current.payout === "bigint" ? current.payout : null;

      const merged: ForfeitRecord = {
        loser: incomingLoser ?? currentLoser ?? null,
        winner: incomingWinner ?? currentWinner ?? null,
        payout: incomingPayout ?? currentPayout ?? null,
      };

      const nextLoser = merged.loser ?? null;
      const nextWinner = merged.winner ?? null;
      const nextPayout = merged.payout ?? null;
      if (!nextLoser && !nextWinner && !nextPayout) return;

      if (
        currentLoser === nextLoser &&
        currentWinner === nextWinner &&
        currentPayout === nextPayout
      ) {
        return;
      }

      const next = { ...forfeitResultsRef.current, [normalizedId]: merged };
      forfeitResultsRef.current = next;
      setForfeitResults(next);
      rememberForfeitFetch(normalizedId, true);
    },
    [rememberForfeitFetch]
  );
  const fetchRoomSnapshot = useCallback(
    async (roomIdNum: number): Promise<RoomSnapshot | null> => {
      if (!Number.isFinite(roomIdNum) || roomIdNum < 0) return null;

      const cached = roomsRef.current.find((room) => room.id === roomIdNum);
      if (cached) {
        return {
          id: cached.id,
          creator: cached.creator,
          opponent: cached.opponent,
          stake: cached.stake,
          commitA: cached.commitA,
          commitB: cached.commitB,
          revealA: Number(cached.revealA ?? 0),
          revealB: Number(cached.revealB ?? 0),
          state: Number(cached.state ?? 0),
          commitDeadline: Number(cached.commitDeadline ?? 0),
          revealDeadline: Number(cached.revealDeadline ?? 0),
        };
      }

      if (!publicClient) return null;
      try {
        const rawRoom: any = await publicClient.readContract({
          address: RPS,
          abi: RPS_ABI,
          functionName: "rooms",
          args: [BigInt(roomIdNum)],
        } as any);

        return {
          id: roomIdNum,
          creator: (rawRoom?.[0] ?? rawRoom?.creator ?? ZERO_ADDR) as `0x${string}`,
          opponent: (rawRoom?.[1] ?? rawRoom?.opponent ?? ZERO_ADDR) as `0x${string}`,
          stake:
            typeof rawRoom?.[2] === "bigint"
              ? (rawRoom?.[2] as bigint)
              : BigInt(rawRoom?.[2] ?? rawRoom?.stake ?? 0),
          commitA: (rawRoom?.[3] ?? rawRoom?.commitA ?? ZERO_COMMIT) as `0x${string}`,
          commitB: (rawRoom?.[4] ?? rawRoom?.commitB ?? ZERO_COMMIT) as `0x${string}`,
          revealA: Number(rawRoom?.[5] ?? rawRoom?.revealA ?? 0),
          revealB: Number(rawRoom?.[6] ?? rawRoom?.revealB ?? 0),
          state: Number(rawRoom?.[9] ?? rawRoom?.state ?? 0),
          commitDeadline: Number(rawRoom?.[7] ?? rawRoom?.commitDeadline ?? 0),
          revealDeadline: Number(rawRoom?.[8] ?? rawRoom?.revealDeadline ?? 0),
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    [publicClient]
  );
  const clearCommitDeadlineFallbacks = useCallback(() => {
    if (localCommitDeadlinesRef.current.size === 0) {
      syncCommitDeadlineFallbacks();
      return;
    }
    localCommitDeadlinesRef.current.clear();
    syncCommitDeadlineFallbacks();
  }, [syncCommitDeadlineFallbacks]);
  const clearRevealDeadlineFallbacks = useCallback(() => {
    if (localRevealDeadlinesRef.current.size === 0) {
      syncRevealDeadlineFallbacks();
      return;
    }
    localRevealDeadlinesRef.current.clear();
    syncRevealDeadlineFallbacks();
  }, [syncRevealDeadlineFallbacks]);
  const isInMyCreatedWindow = (id: number) => {
    const exp = myCreatedRoomsRef.current.get(id);
    return !!exp && Math.floor(Date.now() / 1000) < exp;
  };
  const iCareAboutThisRoom = (r: { id: number; creator?: string; opponent?: string }) => {
    if (!address) return false;
    return (
      r.creator === address ||
      r.opponent === address ||
      joinedRooms.includes(r.id) ||
      isInMyCreatedWindow(r.id)
    );
  };

  const enhanceRoomDeadlines = useCallback(
    <T extends {
      id: number;
      creator?: string;
      opponent?: string;
      commitDeadline?: number;
      revealDeadline?: number;
      state?: number;
    }>(room: T): T & {
      commitDeadline: number;
      revealDeadline: number;
    } => {
      let commitDeadline = Number(room.commitDeadline ?? 0);
      if (!Number.isFinite(commitDeadline)) {
        commitDeadline = 0;
      }
      const commitFallback = localCommitDeadlinesRef.current.get(room.id);
      if (commitFallback && commitFallback > 0) {
        const shouldOverride =
          commitFallback > commitDeadline ||
          room.state === 1 ||
          (room.state === 0 && (!room.opponent || room.opponent === ZERO_ADDR));
        if (shouldOverride) {
          commitDeadline = commitFallback;
        }
      }

      let revealDeadline = Number(room.revealDeadline ?? 0);
      if (!Number.isFinite(revealDeadline)) {
        revealDeadline = 0;
      }
      if ((revealDeadline ?? 0) <= 0) {
        const fallback = localRevealDeadlinesRef.current.get(room.id);
        if (fallback && fallback > revealDeadline) {
          revealDeadline = fallback;
        }
      }

      return {
        ...room,
        commitDeadline,
        revealDeadline,
      };
    },
    []
  );

  const getNormalizedVibration = useCallback(() => {
    const parsed = Number(vibrationMs);
    if (!Number.isFinite(parsed)) {
      return DEFAULT_VIBRATION;
    }
    return Math.max(0, parsed);
  }, [vibrationMs]);

  const vibrate = useCallback(
    (pattern?: number | number[], options?: VibrateOptions) => {
      const { force = false, allowDuringCooldown = false } = options ?? {};
      if (typeof window === "undefined") return;
      if (!force && !notificationsEnabled) return;
      const now = Date.now();
      if (!allowDuringCooldown && now - lastVibrationRef.current < FEEDBACK_COOLDOWN_MS) return;
      const fallback = getNormalizedVibration();
      const finalPattern = pattern ?? fallback;
      try {
        if ("vibrate" in navigator) {
          (navigator as any).vibrate(finalPattern ?? fallback);
          lastVibrationRef.current = now;
        }
      } catch {}
    },
    [notificationsEnabled, getNormalizedVibration]
  );

  const playBeep = useCallback(
    (force = false) => {
      if (typeof window === "undefined") return;
      if (!force && !notificationsEnabled) return;
      const now = Date.now();
      if (now - lastBeepRef.current < FEEDBACK_COOLDOWN_MS) return;
      lastBeepRef.current = now;
      try {
        const AudioContextClass =
          (window as any).AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === "suspended") {
          ctx.resume().catch(() => {});
        }
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = "square";
        oscillator.frequency.value = 880;
        gain.gain.value = 0.08;
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.12);
        oscillator.onended = () => {
          oscillator.disconnect();
          gain.disconnect();
        };
      } catch {}
    },
    [notificationsEnabled]
  );

  const handleLangChange = useCallback((l: string) => {
    setLang(l);
    if (typeof window !== "undefined") localStorage.setItem("banmao_lang", l);
  }, []);

  const handleUiScaleChange = useCallback((value: UiScale) => {
    setUiScale(value);
  }, []);

  const triggerInteractBeep = useCallback(() => playBeep(true), [playBeep]);

  const provideButtonFeedback = useCallback(() => {
    const normalizedVibration = getNormalizedVibration();
    playBeep(true);
    vibrate([normalizedVibration, 80, normalizedVibration], { force: true });
  }, [getNormalizedVibration, playBeep, vibrate]);

  useEffect(() => {
    const shouldSkip = (button: HTMLButtonElement | null) => {
      if (!button) return true;
      if (button.disabled) return true;
      if (button.dataset.feedbackSkip === "true") return true;
      if (button.getAttribute("aria-disabled") === "true") return true;
      return false;
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const button = target.closest("button") as HTMLButtonElement | null;
      if (shouldSkip(button)) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      provideButtonFeedback();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.key !== " " && event.key !== "Spacebar" && event.key !== "Space" && event.key !== "Enter") return;
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const button = target.closest("button") as HTMLButtonElement | null;
      if (shouldSkip(button)) return;
      provideButtonFeedback();
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [provideButtonFeedback]);

  const handleSelectChoice = useCallback(
    (value: Choice) => {
      setChoice(value);
      triggerInteractBeep();
      vibrate(vibrationMs);
    },
    [triggerInteractBeep, vibrate, vibrationMs]
  );

  const handleCommitDurationStep = useCallback((delta: number) => {
    setCommitDurationInput((prev) => {
      const trimmed = prev.trim();
      const base = /^\d+$/.test(trimmed) ? Number(trimmed) : DEFAULT_COMMIT_WINDOW;
      let next = base + delta;
      if (!Number.isFinite(next)) next = DEFAULT_COMMIT_WINDOW;
      if (next < MIN_COMMIT_WINDOW) next = MIN_COMMIT_WINDOW;
      if (next > MAX_COMMIT_WINDOW) next = MAX_COMMIT_WINDOW;
      return String(Math.floor(next));
    });
  }, []);

  const handleStakeStep = useCallback((delta: number) => {
    setStakeHuman((prev) => {
      const { base, fractionLength } = parseStakeValue(prev ?? "");
      let next = base + delta;
      if (!Number.isFinite(next)) next = 0;
      if (next < 0) next = 0;
      return formatStakeDisplayFromNumber(next, fractionLength);
    });
  }, []);

  const handleRoomIdStep = useCallback((delta: number) => {
    setRoomId((prev) => {
      const normalized = normalizeRoomId(prev);
      const base = normalized ? Number.parseInt(normalized, 10) : 0;
      const safeBase = Number.isFinite(base) ? base : 0;
      let next = safeBase + delta;
      if (!Number.isFinite(next)) next = 0;
      if (next < 0) next = 0;
      return String(Math.floor(next));
    });
  }, []);

  const handleSaltStep = useCallback((delta: bigint) => {
    setSalt((prev) => {
      const current = parseSaltHex(prev) ?? ZERO_BIGINT;
      let next = current + delta;
      if (next < ZERO_BIGINT) next = ZERO_BIGINT;
      if (next > MAX_SALT_VALUE) next = MAX_SALT_VALUE;
      return formatSaltHex(next);
    });
  }, []);

  const handleNotificationsToggle = useCallback(
    (value: boolean) => {
      triggerInteractBeep();
      setNotificationsEnabled(value);
    },
    [triggerInteractBeep, setNotificationsEnabled]
  );

  const handleVibrationChange = useCallback(
    (value: number) => {
      triggerInteractBeep();
      setVibrationMs(value);
    },
    [triggerInteractBeep, setVibrationMs]
  );

  const handleTelegramConnected = useCallback(() => {
    setIsTelegramConnected(true);
    if (typeof window !== "undefined") {
      const storageKey = buildTelegramConnectionKey(address ?? null);
      window.localStorage.setItem(storageKey, "true");
      window.localStorage.removeItem(TELEGRAM_LEGACY_USERNAME_STORAGE_KEY);
      window.localStorage.removeItem(TELEGRAM_CONNECTION_STORAGE_KEY);
    }
  }, [address]);

  const pushNotification = useCallback(
    (
      renderer: Parameters<typeof toast.custom>[0],
      options?: Parameters<typeof toast.custom>[1]
    ) => {
      if (!notificationsEnabled) return;
      playBeep();
      return toast.custom(renderer, options);
    },
    [notificationsEnabled, playBeep]
  );

  const sendTelegramReminder = useCallback(
    (meta: TelegramReminderMeta) => {
      if (!TELEGRAM_NOTIFY_ENDPOINT) return;
      if (!isTelegramConnected) return;
      if (!address) return;
      if (typeof window === "undefined") return;

      const payload = {
        address,
        roomId: meta.roomId,
        type: meta.type,
        title: meta.title,
        body: meta.body,
        locale: lang,
        timestamp: Date.now(),
        deadline: meta.deadline ?? null,
      };

      void fetch(TELEGRAM_NOTIFY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((error) => {
        console.error("Failed to dispatch Telegram reminder", error);
      });
    },
    [address, isTelegramConnected, lang]
  );

  const showToast = useCallback(
    (
      type: "success" | "error" | "loading",
      message: string,
      options: { id?: string; title?: string; skipBeep?: boolean; force?: boolean } = {}
    ) => {
      const { id, title, skipBeep, force } = options;
      const shouldShow = force || notificationsEnabled || type === "error";
      if (!shouldShow) return;
      if (type !== "loading" && !skipBeep) playBeep();

      const scheduleAutoDismiss = (durationMs: number, toastId?: string) => {
        if (!Number.isFinite(durationMs)) return;
        if (typeof window === "undefined") return;
        if (!toastId) return;
        window.setTimeout(() => {
          toast.dismiss(toastId);
        }, durationMs + 100);
      };

      const normalizedTitle = title?.trim().toLowerCase();
      const normalizedMessage = message.trim().toLowerCase();
      const isPendingStatusBadge =
        type === "loading" &&
        (normalizedTitle === "pending" || normalizedMessage.startsWith("pending"));

      const shouldUseStatusBadge =
        type === "success" || type === "error" || isPendingStatusBadge;

      const duration = isPendingStatusBadge
        ? 1000
        : type === "loading"
          ? Number.POSITIVE_INFINITY
          : type === "success" || type === "error"
            ? 1000
            : 1000;

      if (shouldUseStatusBadge) {
        const statusLabel =
          type === "loading"
            ? isPendingStatusBadge
              ? "Pending"
              : message || title || "Loading"
            : title ?? (type === "success" ? "Success" : "Error");
        const createdId = toast.custom(
          () => (
            <div className={`toast-card toast-card--${type} toast-card--status`}>
              <span className="toast-status-text">{statusLabel}</span>
            </div>
          ),
          { id, duration }
        );
        scheduleAutoDismiss(duration, id ?? createdId);
        return;
      }

      const icon = type === "loading" ? "⏳" : "";
      const defaultTitle = title ?? "Processing";

      const createdId = toast.custom(
        (tt) => (
          <div className={`toast-card toast-card--${type} toast-card--simple`}>
            <div className="toast-text">
              {icon && (
                <span className="toast-card__icon" aria-hidden="true">
                  {icon}
                </span>
              )}
              <strong>{defaultTitle}</strong>
              <span>{message}</span>
            </div>
            <button
              className="toast-close"
              aria-label="Close notification"
              onClick={() => toast.dismiss(tt?.id)}
            >
              ×
            </button>
          </div>
        ),
        {
          id,
          duration,
        }
      );
      scheduleAutoDismiss(duration, id ?? createdId);
    },
    [notificationsEnabled, playBeep]
  );

  const handleResetSite = useCallback(() => {
    if (typeof window === "undefined") return;
    const confirmMessage = t.resetSiteDataConfirm ?? "Reset local data?";
    if (!window.confirm(confirmMessage)) return;

    const keysToClear: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith("banmao_")) keysToClear.push(key);
    }
    keysToClear.forEach((key) => window.localStorage.removeItem(key));

    toast.dismiss();

    setCommitInfoMap({});
    setArchivedCommitInfoMap({});
    setStakeHuman(formatStakeDisplayString("1000") || "1000");
    setRoomId("");
    setChoice(1);
    setSalt(newSalt());
    setCommitDurationInput(String(DEFAULT_COMMIT_WINDOW));
    setJoinedRooms([]);
    setSeenResultRooms([]);
    setFreshResultRooms([]);
    setNotificationsEnabled(true);
    setVibrationMs(DEFAULT_VIBRATION);
    setNotificationSnoozeMinutes(DEFAULT_SNOOZE_MINUTES);
    setIsTelegramConnected(false);
    setIsSharing(false);
    setLang("en");
    setTheme(DEFAULT_THEME);
    if (typeof document !== "undefined") {
      document.body.dataset.theme = DEFAULT_THEME;
    }

    notifiedRef.current.clear();
    snoozedRef.current.clear();
    myCreatedRoomsRef.current.clear();
    localCommitDeadlinesRef.current.clear();
    localRevealDeadlinesRef.current.clear();
    commitDurationsRef.current.clear();
    clearCommitDeadlineFallbacks();
    clearRevealDeadlineFallbacks();
    alertLoopsRef.current.forEach((intervalId) => window.clearInterval(intervalId));
    alertLoopsRef.current.clear();

    if (address) {
      clearCommitInfo(address);
    }

    showToast("success", t.resetSiteDataSuccess, { skipBeep: true });
    window.setTimeout(() => {
      window.location.reload();
    }, 200);
  }, [
    address,
    showToast,
    t.resetSiteDataConfirm,
    t.resetSiteDataSuccess,
    setCommitInfoMap,
    clearCommitDeadlineFallbacks,
    clearRevealDeadlineFallbacks,
  ]);

  const isSnoozed = useCallback((key: string) => {
    const until = snoozedRef.current.get(key);
    return !!until && until > Date.now();
  }, []);

  const snooze = useCallback(
    (key: string) => {
      const duration = Math.max(0, notificationSnoozeMinutes) * 60 * 1000;
      snoozedRef.current.set(key, Date.now() + duration);
    },
    [notificationSnoozeMinutes]
  );

  const stopAlertLoop = useCallback(
    (key: string, opts: { dismiss?: boolean } = {}) => {
      if (typeof window !== "undefined") {
        const intervalId = alertLoopsRef.current.get(key);
        if (intervalId != null) {
          window.clearInterval(intervalId);
          alertLoopsRef.current.delete(key);
        }
      }
      if (opts.dismiss !== false) toast.dismiss(key);
      notifiedRef.current.delete(key);
      if (alertLoopsRef.current.size === 0) {
        mainContentRef.current?.classList.remove("app-shake");
      }
    },
    []
  );

  const startAlertLoop = useCallback(
    (key: string, pattern?: number | number[]) => {
      if (typeof window === "undefined") return;
      if (alertLoopsRef.current.has(key)) return;
      if (!notificationsEnabled) return;
      vibrate(pattern);
      playBeep();
      mainContentRef.current?.classList.add("app-shake");
      const intervalId = window.setInterval(() => {
        vibrate(pattern);
        playBeep();
      }, Math.max(Number(vibrationMs) + 600, 1600));
      alertLoopsRef.current.set(key, intervalId);
    },
    [notificationsEnabled, vibrate, vibrationMs, playBeep]
  );

  // init client
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const timer = window.setInterval(() => {
        setNowTs(Math.floor(Date.now() / 1000));
      }, 1000);
      const storedLang = localStorage.getItem("banmao_lang");
      if (storedLang && langs[storedLang as keyof typeof langs]) setLang(storedLang);
      const storedNotif = localStorage.getItem("banmao_notify");
      if (storedNotif != null) setNotificationsEnabled(storedNotif === "1");
      const storedVibration = localStorage.getItem("banmao_vibration");
      if (storedVibration) {
        const parsed = Number(storedVibration);
        if (!Number.isNaN(parsed) && parsed >= 0) setVibrationMs(parsed);
      }
      const storedSnooze = localStorage.getItem("banmao_notify_snooze");
      if (storedSnooze) {
        const parsed = Number(storedSnooze);
        if (!Number.isNaN(parsed) && parsed >= 0) setNotificationSnoozeMinutes(parsed);
      }
      const storedUiScale = localStorage.getItem(UI_SCALE_STORAGE_KEY);
      if (
        storedUiScale === "xsmall" ||
        storedUiScale === "small" ||
        storedUiScale === "normal" ||
        storedUiScale === "large" ||
        storedUiScale === "desktop"
      ) {
        setUiScale(storedUiScale as UiScale);
        if (typeof document !== "undefined") {
          document.body.dataset.uiScale = storedUiScale;
        }
      } else if (typeof document !== "undefined") {
        document.body.dataset.uiScale = "normal";
      }
      if (typeof document !== "undefined") {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme && isThemeKey(storedTheme)) {
          setTheme(storedTheme);
          document.body.dataset.theme = storedTheme;
        } else {
          document.body.dataset.theme = DEFAULT_THEME;
        }
      }
      return () => {
        window.clearInterval(timer);
      };
    }
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;

    try {
      const storedRooms = window.localStorage.getItem(ROOMS_CACHE_KEY);
      if (storedRooms) {
        const parsed = JSON.parse(storedRooms);
        if (Array.isArray(parsed)) {
          const revived = parsed
            .map((entry) => reviveRoomFromCache(entry))
            .filter((room): room is RoomWithForfeit => !!room);
          if (revived.length > 0) {
            setCachedRooms(prioritizeCachedRooms(revived));
            const nowSeconds = Math.floor(Date.now() / 1000);
            revived.forEach((room) => {
              const remaining = Number(room.commitDeadline ?? 0) - nowSeconds;
              if (Number.isFinite(remaining) && remaining > 0) {
                rememberCommitDuration(room.id, remaining);
              }
            });
          }
        }
      }
    } catch (error) {
      console.error("Failed to restore cached rooms", error);
    }

    try {
      const storedInfo = window.localStorage.getItem(INFO_CACHE_KEY);
      if (storedInfo) {
        const parsedInfo = reviveInfoFromCache(JSON.parse(storedInfo));
        if (parsedInfo) {
          setCachedInfo(parsedInfo);
        }
      }
    } catch (error) {
      console.error("Failed to restore cached info", error);
    }
  }, [isClient, rememberCommitDuration]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.dataset.uiScale = uiScale;
    }
    if (!isClient || typeof window === "undefined") return;
    localStorage.setItem(UI_SCALE_STORAGE_KEY, uiScale);
  }, [uiScale, isClient]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.dataset.theme = theme;
    }
    if (!isClient || typeof window === "undefined") return;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, isClient]);

  useEffect(() => {
    if (!isClient || typeof window === "undefined" || !isConnected) return;
    localStorage.setItem("banmao_stake_collapsed", isStakeTableCollapsed ? "1" : "0");
  }, [isStakeTableCollapsed, isClient, isConnected]);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    if (!isConnected) {
      setIsStakeTableCollapsed(false);
      return;
    }
    const storedStakeCollapsed = localStorage.getItem("banmao_stake_collapsed");
    if (storedStakeCollapsed == null) {
      setIsStakeTableCollapsed(false);
    } else {
      setIsStakeTableCollapsed(storedStakeCollapsed === "1");
    }
  }, [isClient, isConnected]);

  useEffect(() => {
    if (!isClient) return;
    const cached = loadCommitDeadlineFallbacksFromStorage();
    if (cached.size === 0) return;
    let changed = false;
    cached.forEach((deadline, roomId) => {
      const current = localCommitDeadlinesRef.current.get(roomId);
      if (current !== deadline) {
        localCommitDeadlinesRef.current.set(roomId, deadline);
        changed = true;
      }
    });
    if (changed) syncCommitDeadlineFallbacks();
  }, [isClient, syncCommitDeadlineFallbacks]);

  useEffect(() => {
    if (!isClient) return;
    const cached = loadRevealDeadlineFallbacksFromStorage();
    if (cached.size === 0) return;
    let changed = false;
    cached.forEach((deadline, roomId) => {
      const current = localRevealDeadlinesRef.current.get(roomId);
      if (current !== deadline) {
        localRevealDeadlinesRef.current.set(roomId, deadline);
        changed = true;
      }
    });
    if (changed) syncRevealDeadlineFallbacks();
  }, [isClient, syncRevealDeadlineFallbacks]);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    localStorage.setItem("banmao_notify_snooze", notificationSnoozeMinutes.toString());
  }, [notificationSnoozeMinutes, isClient]);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    if (!address) {
      setIsTelegramConnected(false);
      return;
    }
    const storageKey = buildTelegramConnectionKey(address);
    const storedFlag = localStorage.getItem(storageKey);
    if (storedFlag === "true") {
      setIsTelegramConnected(true);
      return;
    }
    const legacyHandle = localStorage.getItem(TELEGRAM_LEGACY_USERNAME_STORAGE_KEY);
    if (legacyHandle) {
      setIsTelegramConnected(true);
      localStorage.setItem(storageKey, "true");
      localStorage.removeItem(TELEGRAM_LEGACY_USERNAME_STORAGE_KEY);
      localStorage.removeItem(TELEGRAM_CONNECTION_STORAGE_KEY);
      return;
    }
    const legacyFlag = localStorage.getItem(TELEGRAM_CONNECTION_STORAGE_KEY);
    if (legacyFlag === "true") {
      setIsTelegramConnected(true);
      localStorage.setItem(storageKey, "true");
      localStorage.removeItem(TELEGRAM_CONNECTION_STORAGE_KEY);
      return;
    }
    setIsTelegramConnected(false);
  }, [address, isClient]);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    if (!address) return;
    const storageKey = buildTelegramConnectionKey(address);
    if (isTelegramConnected) {
      localStorage.setItem(storageKey, "true");
    } else {
      localStorage.removeItem(storageKey);
    }
    localStorage.removeItem(TELEGRAM_LEGACY_USERNAME_STORAGE_KEY);
    localStorage.removeItem(TELEGRAM_CONNECTION_STORAGE_KEY);
  }, [address, isClient, isTelegramConnected]);

  useEffect(() => {
    if (!isConnected) {
      setIsTelegramPanelCollapsed(true);
    }
  }, [isConnected]);

  useEffect(() => {
    if (!joinSectionHighlight) return;
    if (typeof window === "undefined") return;
    const timer = window.setTimeout(() => setJoinSectionHighlight(false), 6000);
    return () => window.clearTimeout(timer);
  }, [joinSectionHighlight]);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    if (deepLinkHandledRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const joinParam = params.get("join");
    if (!joinParam) return;
    deepLinkHandledRef.current = true;
    const sanitized = joinParam.replace(/[^0-9]/g, "");
    const normalized = normalizeRoomId(sanitized);
    if (normalized) {
      joinPrefillRef.current = normalized;
    }
    params.delete("join");
    const search = params.toString();
    const newUrl = `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`.replace(/#$/, "");
    window.history.replaceState({}, document.title, newUrl || window.location.pathname);
    if (!normalized) return;
    setRoomId(normalized);
    setJoinSectionHighlight(true);
    const langPack = langs[lang as keyof typeof langs] ?? langs.vi;
    const baseLabel = langPack.roomIdSet ?? "Room ID set: ";
    showToast("success", `${baseLabel}${normalized}`, { skipBeep: true });
    window.setTimeout(() => {
      joinInputRef.current?.focus();
      joinSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 250);
  }, [isClient, lang, showToast, setRoomId]);

  // handle account change
  useEffect(() => {
    if (!isClient) return;
    if (!address) {
      setCommitInfoMap({});
      setArchivedCommitInfoMap({});
      setSalt(newSalt());
      setRoomId("");
      setJoinedRooms([]);
      setSeenResultRooms([]);
      setFreshResultRooms([]);
      notifiedRef.current.clear();
      myCreatedRoomsRef.current.clear();
      clearCommitDeadlineFallbacks();
      clearRevealDeadlineFallbacks();
      return;
    }
    const infos = loadCommitInfos(address);
    setCommitInfoMap(infos);
    const archivedInfos = loadArchivedCommitInfos(address);
    setArchivedCommitInfoMap(archivedInfos);
    const entries = Object.values(infos);
    const preferred = entries.length
      ? entries.slice().sort((a, b) => Number(b.roomId) - Number(a.roomId))[0]
      : null;
    const prefilledRoomId = joinPrefillRef.current;
    if (prefilledRoomId) {
      setRoomId(prefilledRoomId);
      joinPrefillRef.current = null;
    } else if (preferred) {
      setRoomId(preferred.roomId);
      setChoice(preferred.choice);
      setSalt(preferred.salt);
      setStakeHuman(formatStakeDisplayString(preferred.stakeHuman) || preferred.stakeHuman);
    } else {
      const storedSalt = localStorage.getItem("banmao_salt") as `0x${string}`;
      setSalt(storedSalt && isHex(storedSalt) ? storedSalt : newSalt());
    }
    setJoinedRooms(loadJoinedRooms(address));
    setSeenResultRooms(loadSeenResultRooms(address));
    setFreshResultRooms([]);
    notifiedRef.current.clear();
    myCreatedRoomsRef.current.clear();
  }, [address, isClient, clearCommitDeadlineFallbacks, clearRevealDeadlineFallbacks]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("banmao_salt", salt);
  }, [salt, isClient]);

  useEffect(() => {
    if (!isClient || !address) return;
    saveSeenResultRooms(address, seenResultRooms);
  }, [seenResultRooms, address, isClient]);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    localStorage.setItem("banmao_notify", notificationsEnabled ? "1" : "0");
  }, [notificationsEnabled, isClient]);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    localStorage.setItem("banmao_vibration", String(vibrationMs));
  }, [vibrationMs, isClient]);

  /* ---------- token reads ---------- */
  const { data: dec } = useReadContract({
    address: BANMAO,
    abi: ERC20_ABI,
    functionName: "decimals",
    query: {
      enabled: isClient && !!BANMAO,
      ...READ_QUERY_BEHAVIOR,
    },
  });
  useEffect(() => {
    if (typeof dec === "number") setDecimals(dec);
  }, [dec]);

  const {
    data: allowance,
    refetch: refetchAllowance,
  } = useReadContract({
    address: BANMAO,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [address ?? ZERO_ADDR, RPS],
    query: {
      enabled: isClient && !!address && !!RPS,
      ...READ_QUERY_BEHAVIOR,
    },
  });

  const {
    data: balance,
    refetch: refetchBalance,
  } = useReadContract({
    address: BANMAO,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address ?? ZERO_ADDR],
    query: {
      enabled: isClient && !!address,
      ...READ_QUERY_BEHAVIOR,
    },
  });

  /* ---------- room list ---------- */
  const {
    data: nRoom,
    refetch: refetchNextRoomId,
  } = useReadContract({
    address: RPS,
    abi: RPS_ABI,
    functionName: "nextRoomId",
    query: {
      enabled: isClient && !!RPS,
      ...READ_QUERY_BEHAVIOR,
    },
  });

  const latestIds = useMemo(() => {
    const n = Number(nRoom || 0);
    if (!Number.isFinite(n) || n <= 0) return [];

    const start = Math.max(1, n - ROOM_SCAN_LIMIT);
    const count = n - start;
    const ids = Array.from({ length: count }, (_, i) => BigInt(n - i - 1));

    return ids;
  }, [nRoom]);

  const trackedRoomIds = useMemo(() => {
    const ids = new Set<bigint>();
    latestIds.forEach((id) => ids.add(id));

    backfillRoomIds.forEach((id) => ids.add(id));

    joinedRooms.forEach((id) => {
      if (Number.isFinite(id) && id > 0) ids.add(BigInt(id));
    });

    Object.values(commitInfoMap).forEach((info) => {
      const parsed = Number(info.roomId);
      if (Number.isFinite(parsed) && parsed > 0) ids.add(BigInt(parsed));
    });

    seenResultRooms.forEach((id) => {
      if (Number.isFinite(id) && id > 0) ids.add(BigInt(id));
    });

    freshResultRooms.forEach((id) => {
      if (Number.isFinite(id) && id > 0) ids.add(BigInt(id));
    });

    const activeRoomIds = new Set<bigint>();
    cachedRooms.forEach((room) => {
      const roomId = Number(room?.id ?? 0);
      if (!Number.isFinite(roomId) || roomId <= 0) return;
      if (roomIsFinalized(room)) return;
      const normalized = BigInt(roomId);
      activeRoomIds.add(normalized);
      ids.add(normalized);
    });

    const sorted = Array.from(ids).sort((a, b) => (a === b ? 0 : a > b ? -1 : 1));
    if (sorted.length <= MAX_TRACKED_ROOMS) {
      return sorted;
    }

    const prioritized: bigint[] = [];
    const remainder: bigint[] = [];
    sorted.forEach((id) => {
      if (activeRoomIds.has(id)) {
        prioritized.push(id);
      } else {
        remainder.push(id);
      }
    });

    const limit = Math.max(MAX_TRACKED_ROOMS, prioritized.length);
    return prioritized.concat(remainder).slice(0, limit);
  }, [
    latestIds,
    backfillRoomIds,
    joinedRooms,
    commitInfoMap,
    seenResultRooms,
    freshResultRooms,
    cachedRooms,
  ]);

  const roomContracts = useMemo(
    () =>
      trackedRoomIds.map((id) => ({
        address: RPS,
        abi: RPS_ABI,
        functionName: "rooms",
        args: [id],
      })) as any[],
    [trackedRoomIds]
  );

  const {
    data: roomsRaw,
    refetch: refetchRooms,
  } = useReadContracts({
    contracts: roomContracts as any,
    query: {
      enabled: roomContracts.length > 0 && isClient,
      ...READ_QUERY_BEHAVIOR,
    },
  } as any);

  const runSharedRefetches = useCallback(() => {
    const tasks: Promise<unknown>[] = [];
    if (refetchAllowance) tasks.push(refetchAllowance());
    if (refetchNextRoomId) tasks.push(refetchNextRoomId());
    if (refetchRooms) tasks.push(refetchRooms());
    if (refetchBalance) tasks.push(refetchBalance());
    if (tasks.length === 0) return Promise.resolve();
    return Promise.allSettled(tasks).then(() => undefined);
  }, [refetchAllowance, refetchBalance, refetchNextRoomId, refetchRooms]);

  const scheduleSharedRefetch = useCallback(() => {
    const state = blockRefetchState.current;
    const now = Date.now();
    const elapsed = now - state.last;
    if (elapsed >= BLOCK_REFETCH_THROTTLE_MS) {
      state.last = now;
      if (state.timer) {
        clearTimeout(state.timer);
        state.timer = null;
      }
      void runSharedRefetches();
      return;
    }
    if (state.timer) return;
    const delay = BLOCK_REFETCH_THROTTLE_MS - elapsed;
    state.timer = setTimeout(() => {
      state.timer = null;
      state.last = Date.now();
      void runSharedRefetches();
    }, delay);
  }, [runSharedRefetches]);

  const handleManualRefresh = useCallback(async () => {
    if (manualRefreshRef.current) return;
    manualRefreshRef.current = true;
    setIsRefreshing(true);
    try {
      await runSharedRefetches();
    } catch (error) {
      console.error("Manual refresh failed", error);
    } finally {
      manualRefreshRef.current = false;
      setIsRefreshing(false);
    }
  }, [runSharedRefetches]);

  const hasFreshRooms = useMemo(
    () => Array.isArray(roomsRaw) && roomsRaw.some((entry) => entry?.result != null),
    [roomsRaw]
  );

  useEffect(() => {
    if (hasFreshRooms) {
      stableRoomsRawRef.current = roomsRaw ?? null;
      stableTrackedRoomIdsRef.current = trackedRoomIds;
    } else if (trackedRoomIds.length === 0) {
      stableRoomsRawRef.current = [];
      stableTrackedRoomIdsRef.current = [];
    }
  }, [hasFreshRooms, roomsRaw, trackedRoomIds]);

  useEffect(() => {
    if (!isClient) return;
    if (roomContracts.length === 0) return;
    scheduleSharedRefetch();
  }, [isClient, roomContracts, scheduleSharedRefetch]);

  const rooms = useMemo<RoomWithForfeit[]>(() => {
    const rawList = (hasFreshRooms ? roomsRaw : stableRoomsRawRef.current) ?? [];
    const idList = (hasFreshRooms ? trackedRoomIds : stableTrackedRoomIdsRef.current) ?? [];
    if (!rawList.length || idList.length === 0) {
      return cachedRooms;
    }
    const parsed = rawList
      .map((r, i) => {
        if (!r?.result) return null;
        const idSource = idList[i];
        const id = Number(idSource);
        if (!Number.isFinite(id) || id <= 0) return null;
        const rr: any = r.result;
        const normalizedId = Number.isFinite(id) && id > 0 ? id : NaN;
        return {
          id,
          creator: rr[0] as `0x${string}`,
          opponent: rr[1] as `0x${string}`,
          stake: rr[2] as bigint,
          commitA: rr[3] as `0x${string}`,
          commitB: rr[4] as `0x${string}`,
          revealA: Number(rr[5] ?? rr.revealA ?? 0),
          revealB: Number(rr[6] ?? rr.revealB ?? 0),
          commitDeadline: Number(rr[7] ?? rr.commitDeadline ?? 0),
          revealDeadline: Number(rr[8] ?? rr.revealDeadline ?? 0),
          state: Number(rr[9] ?? rr.state ?? 0),
          forfeit:
            Number.isFinite(normalizedId) && normalizedId > 0
              ? forfeitResults[normalizedId] ?? null
              : null,
        };
      })
      .filter((room): room is NonNullable<typeof room> => {
        if (!room) return false;
        const roomId = Number(room.id ?? 0);
        if (!Number.isFinite(roomId) || roomId <= 0) {
          return false;
        }
        const creator = room.creator?.toLowerCase?.();
        const opponent = room.opponent?.toLowerCase?.();
        const stakeValue = room.stake ?? ZERO_BIGINT;
        const commitAZero = !room.commitA || room.commitA === ZERO_COMMIT;
        const commitBZero = !room.commitB || room.commitB === ZERO_COMMIT;
        const revealsZero = Number(room.revealA ?? 0) === 0 && Number(room.revealB ?? 0) === 0;
        const zeroAddrLower = ZERO_ADDR.toLowerCase();
        if (
          Number.isFinite(room.commitDeadline) &&
          (room.commitDeadline ?? 0) > 0 &&
          !commitDurationsRef.current.has(roomId)
        ) {
          const nowSec = Math.floor(Date.now() / 1000);
          const remaining = Math.floor(Number(room.commitDeadline) - nowSec);
          if (remaining > 0) {
            rememberCommitDuration(roomId, remaining);
          }
        }
        const isEmptyRoom =
          (!creator || creator === zeroAddrLower) &&
          (!opponent || opponent === zeroAddrLower) &&
          stakeValue === ZERO_BIGINT &&
          commitAZero &&
          commitBZero &&
          revealsZero &&
          (room.state ?? 0) === 0;
        return !isEmptyRoom;
      }) as RoomWithForfeit[];

    const mergedMap = new Map<number, RoomWithForfeit>();
    parsed.forEach((room) => {
      const key = Number(room.id ?? 0);
      if (!Number.isFinite(key) || key <= 0) return;
      mergedMap.set(key, room);
    });

    cachedRooms.forEach((room) => {
      const key = Number(room?.id ?? 0);
      if (!Number.isFinite(key) || key <= 0) return;
      if (mergedMap.has(key)) return;
      if (roomIsFinalized(room)) return;
      mergedMap.set(key, room);
    });

    return Array.from(mergedMap.values()).sort((a, b) => {
      const left = Number(a.id ?? 0);
      const right = Number(b.id ?? 0);
      if (!Number.isFinite(left) && !Number.isFinite(right)) return 0;
      if (!Number.isFinite(left)) return 1;
      if (!Number.isFinite(right)) return -1;
      if (left === right) return 0;
      return left > right ? -1 : 1;
    });
  }, [
    hasFreshRooms,
    roomsRaw,
    trackedRoomIds,
    forfeitResults,
    rememberCommitDuration,
    cachedRooms,
  ]);

  useEffect(() => {
    roomsRef.current = rooms;
  }, [rooms]);

  useEffect(() => {
    if (backfillPendingIdsRef.current.size === 0) return;
    const activeIds = new Set<string>();
    const finalizedIds = new Set<string>();
    rooms.forEach((room) => {
      if (!room) return;
      const key = normalizeRoomId(room.id);
      if (key === "") return;
      if (roomIsFinalized(room)) {
        finalizedIds.add(key);
      } else {
        activeIds.add(key);
      }
    });

    const pending = backfillPendingIdsRef.current;
    pending.forEach((id) => {
      const key = normalizeRoomId(id);
      if (key === "") {
        pending.delete(id);
        return;
      }
      if (activeIds.has(key) || finalizedIds.has(key)) {
        pending.delete(id);
      }
    });
  }, [rooms]);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    if (rooms.length === 0) return;
    const normalized = prioritizeCachedRooms(rooms);
    if (roomsEqual(cachedRooms, normalized)) return;
    setCachedRooms(normalized);
    try {
      const payload = normalized.map((room) => serializeRoomForCache(room));
      window.localStorage.setItem(ROOMS_CACHE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error("Failed to cache rooms", error);
    }
  }, [rooms, isClient, cachedRooms]);

  useEffect(() => {
    if (!publicClient || !forfeitEventAbi) return;
    const pendingIds = trackedRoomIds
      .map((id) => Number(id))
      .filter((id) => {
        if (!Number.isFinite(id) || id <= 0) return false;
        if (fetchedForfeitIdsRef.current.has(id)) return false;
        if (forfeitResultsRef.current[id]) return false;
        return true;
      });
    if (pendingIds.length === 0) return;

    const now = Date.now();
    const eligibleIds = pendingIds.filter((id) => {
      const meta = forfeitFetchMetaRef.current.get(id);
      if (!meta) return true;
      if (meta.settled) return false;
      return now - meta.lastAttempt >= FORFEIT_FETCH_COOLDOWN_MS;
    });
    if (eligibleIds.length === 0) return;

    let cancelled = false;

    (async () => {
      let latestBlockNumber: bigint | null = null;
      try {
        latestBlockNumber = await publicClient.getBlockNumber();
      } catch (error) {
        console.error(error);
      }

      for (const id of eligibleIds) {
        try {
          rememberForfeitFetch(id, false);
          const latestLog = await fetchLatestForfeitLog({
            publicClient,
            event: forfeitEventAbi as any,
            roomId: id,
            latestBlock: latestBlockNumber,
          });
          if (cancelled) return;
          const record = extractForfeitRecord(latestLog);
          if (record) {
            updateForfeitResult(id, record);
            fetchedForfeitIdsRef.current.add(id);
          } else {
            rememberForfeitFetch(id, false);
          }
        } catch (error) {
          console.error(error);
          rememberForfeitFetch(id, false);
        }

        if (FORFEIT_FETCH_DELAY_MS > 0) {
          await new Promise((resolve) => setTimeout(resolve, FORFEIT_FETCH_DELAY_MS));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [publicClient, trackedRoomIds, forfeitEventAbi, updateForfeitResult, rememberForfeitFetch]);

  useEffect(() => {
    if (!publicClient) return;
    const totalRooms = Number(nRoom ?? 0);
    if (!Number.isFinite(totalRooms) || totalRooms <= 0) return;

    const target = Math.min(MAX_TRACKED_ROOMS, ACTIVE_ROOM_TARGET);
    if (target <= 0) return;

    const activeRooms = rooms.filter((room) => !roomIsFinalized(room));
    const activeCount = activeRooms.length;
    const pendingCount = backfillPendingIdsRef.current.size;

    if (activeCount + pendingCount >= target) {
      if (activeRooms.length === 0) {
        backfillStateRef.current.cursor = null;
      }
      return;
    }

    if (backfillStateRef.current.running) return;

    const visited = backfillVisitedRef.current;
    let cursor = backfillStateRef.current.cursor;

    if (!Number.isFinite(cursor)) {
      if (trackedRoomIds.length > 0) {
        cursor = Number(trackedRoomIds[trackedRoomIds.length - 1]);
      } else {
        cursor = totalRooms;
      }
    }

    if (!Number.isFinite(cursor)) {
      cursor = totalRooms;
    }

    let startCursor = Math.min(Number(cursor), totalRooms);
    if (!Number.isFinite(startCursor)) {
      startCursor = totalRooms;
    }

    if (startCursor <= 1) return;

    backfillStateRef.current.running = true;

    (async () => {
      const foundSnapshots: RoomSnapshot[] = [];
      let attempts = 0;
      let nextCursor = startCursor - 1;

      while (
        nextCursor >= 1 &&
        attempts < ACTIVE_ROOM_BACKFILL_SCAN_LIMIT &&
        foundSnapshots.length + activeCount + pendingCount < target
      ) {
        if (visited.has(nextCursor)) {
          nextCursor -= 1;
          attempts += 1;
          continue;
        }

        visited.add(nextCursor);
        attempts += 1;

        try {
          const snapshot = await fetchRoomSnapshot(nextCursor);
          if (snapshot && !roomIsFinalized(snapshot)) {
            foundSnapshots.push(snapshot);
          }
        } catch (error) {
          console.error("Failed to inspect older room", error);
        }

        nextCursor -= 1;
      }

      backfillStateRef.current.cursor = nextCursor;

      if (foundSnapshots.length === 0) {
        return;
      }

      foundSnapshots.forEach((snapshot) => {
        backfillPendingIdsRef.current.add(snapshot.id);
      });

      setBackfillRoomIds((prev) => {
        if (foundSnapshots.length === 0) return prev;
        const merged = new Set(prev);
        foundSnapshots.forEach((snapshot) => {
          merged.add(BigInt(snapshot.id));
        });
        const sorted = Array.from(merged).sort((a, b) => (a === b ? 0 : a > b ? -1 : 1));
        return sorted.slice(0, MAX_TRACKED_ROOMS);
      });

      setCachedRooms((prev) => {
        const map = new Map<number, RoomWithForfeit>();
        prev.forEach((room) => {
          const id = Number(room.id ?? 0);
          if (Number.isFinite(id) && id > 0) {
            map.set(id, room);
          }
        });

        foundSnapshots.forEach((snapshot) => {
          map.set(snapshot.id, { ...snapshot, forfeit: null });
        });

        const merged = Array.from(map.values());
        const next = prioritizeCachedRooms(merged);
        if (roomsEqual(prev, next)) {
          return prev;
        }
        return next;
      });
    })()
      .catch((error) => {
        console.error("Active room backfill failed", error);
      })
      .finally(() => {
        backfillStateRef.current.running = false;
      });
  }, [
    publicClient,
    nRoom,
    rooms,
    trackedRoomIds,
    fetchRoomSnapshot,
  ]);

  useEffect(() => {
    if (backfillRoomIds.length === 0) return;
    const activeSet = new Set<string>();
    rooms.forEach((room) => {
      const key = normalizeRoomId(room.id);
      if (key === "") return;
      if (!roomIsFinalized(room)) {
        activeSet.add(key);
      }
    });

    setBackfillRoomIds((prev) => {
      if (prev.length === 0) return prev;
      const filtered = prev.filter((id) => {
        const key = normalizeRoomId(id);
        return key !== "" && activeSet.has(key);
      });
      if (filtered.length === prev.length) return prev;
      return filtered;
    });
  }, [rooms, backfillRoomIds.length]);


  const personalRooms = useMemo(() => {
    if (!addressLower) return [];
    return rooms
      .filter((r) => {
        const creator = r.creator?.toLowerCase?.();
        const opponent = r.opponent?.toLowerCase?.();
        return creator === addressLower || opponent === addressLower;
      })
      .sort((a, b) => b.id - a.id);
  }, [rooms, addressLower]);

  const { visibleRooms, roomMeta } = useMemo(() => {
    const meta = new Map<
      number,
      {
        view: any;
        availability: ReturnType<typeof availability>;
      }
    >();

    rooms.forEach((room) => {
      const view = enhanceRoomDeadlines(room);
      meta.set(room.id, {
        view,
        availability: availability(view, nowTs),
      });
    });

    const sorted = [...rooms].sort((a, b) => {
      const metaA = meta.get(a.id);
      const metaB = meta.get(b.id);
      if (!metaA || !metaB) return 0;

      const opponentALower = metaA.view.opponent?.toLowerCase?.() ?? "";
      const opponentBLower = metaB.view.opponent?.toLowerCase?.() ?? "";

      const hasOpponentA = opponentALower !== "" && opponentALower !== ZERO_ADDR_LOWER;
      const hasOpponentB = opponentBLower !== "" && opponentBLower !== ZERO_ADDR_LOWER;

      const baseJoinableA = metaA.view.state === 0 && !hasOpponentA;
      const baseJoinableB = metaB.view.state === 0 && !hasOpponentB;

      const joinReadyA =
        baseJoinableA && metaA.availability.live && !metaA.availability.claimable;
      const joinReadyB =
        baseJoinableB && metaB.availability.live && !metaB.availability.claimable;

      if (joinReadyA !== joinReadyB) {
        return joinReadyA ? -1 : 1;
      }

      if (joinReadyA && joinReadyB) {
        const stakeA = metaA.view.stake ?? ZERO_BIGINT;
        const stakeB = metaB.view.stake ?? ZERO_BIGINT;
        if (stakeA !== stakeB) {
          return stakeA > stakeB ? -1 : 1;
        }

        const deadlineA = Number(metaA.view.commitDeadline ?? 0);
        const deadlineB = Number(metaB.view.commitDeadline ?? 0);
        const finiteA = Number.isFinite(deadlineA) && deadlineA > 0;
        const finiteB = Number.isFinite(deadlineB) && deadlineB > 0;

        if (finiteA && finiteB && deadlineA !== deadlineB) {
          return deadlineA < deadlineB ? -1 : 1;
        }

        if (finiteA !== finiteB) {
          return finiteA ? -1 : 1;
        }
      }

      if (baseJoinableA !== baseJoinableB) {
        return baseJoinableA ? -1 : 1;
      }

      const liveA = metaA.availability.live && !metaA.availability.expired;
      const liveB = metaB.availability.live && !metaB.availability.expired;
      if (liveA !== liveB) {
        return liveA ? -1 : 1;
      }

      if (metaA.view.state === 0 && metaB.view.state !== 0) return -1;
      if (metaA.view.state !== 0 && metaB.view.state === 0) return 1;

      return metaB.view.id - metaA.view.id;
    });

    const filtered = sorted.filter((room) => meta.has(room.id));

    return { visibleRooms: filtered, roomMeta: meta };
  }, [rooms, enhanceRoomDeadlines, nowTs]);

  useEffect(() => {
    if (!isClient) return;
    if (!rooms || rooms.length === 0) return;
    const nowSec = Math.floor(Date.now() / 1000);
    let commitNeedsSync = false;
    let revealNeedsSync = false;

    rooms.forEach((room) => {
      const id = Number(room.id);
      if (!Number.isFinite(id) || id < 0) return;
      const stateNum = Number(room.state ?? 0);
      const commitDeadline = Number(room.commitDeadline ?? 0);
      const revealDeadline = Number(room.revealDeadline ?? 0);

      if (commitDeadline > 0) {
        rememberCommitDeadlineFallback(id, commitDeadline);
      }

      if (stateNum === 2) {
        if (revealDeadline > 0) {
          rememberRevealDeadlineFallback(id, revealDeadline);
        } else {
          const current = localRevealDeadlinesRef.current.get(id) ?? 0;
          if (current <= nowSec) {
            rememberRevealDeadlineFallback(id, nowSec + REVEAL_WINDOW);
          }
        }
      } else if (localRevealDeadlinesRef.current.has(id)) {
        localRevealDeadlinesRef.current.delete(id);
        revealNeedsSync = true;
      }

      if (stateNum >= 3 || stateNum === 4) {
        if (localCommitDeadlinesRef.current.delete(id)) commitNeedsSync = true;
        if (localRevealDeadlinesRef.current.delete(id)) revealNeedsSync = true;
      }
    });

    if (commitNeedsSync) syncCommitDeadlineFallbacks();
    if (revealNeedsSync) syncRevealDeadlineFallbacks();
  }, [
    rooms,
    isClient,
    rememberCommitDeadlineFallback,
    rememberRevealDeadlineFallback,
    syncCommitDeadlineFallbacks,
    syncRevealDeadlineFallbacks,
  ]);

  useEffect(() => {
    if (!addressLower) return;
    const finishedIds = personalRooms.filter((room) => roomIsFinalized(room)).map((room) => room.id);
    if (finishedIds.length === 0) {
      if (freshResultRooms.length > 0) setFreshResultRooms([]);
      return;
    }

    setSeenResultRooms((prev) => {
      const prevSet = new Set(prev);
      let changed = false;
      const next = [...prev];
      finishedIds.forEach((id) => {
        if (!prevSet.has(id)) {
          prevSet.add(id);
          next.push(id);
          changed = true;
        }
      });
      return changed ? next : prev;
    });

    setFreshResultRooms((prev) => {
      const finishedSet = new Set(finishedIds);
      const next = prev.filter((id) => finishedSet.has(id));
      let changed = next.length !== prev.length;
      const seenSet = new Set(seenResultRooms);
      finishedIds.forEach((id) => {
        if (!seenSet.has(id) && !next.includes(id)) {
          next.push(id);
          changed = true;
        }
      });
      if (changed) next.sort((a, b) => b - a);
      return changed ? next : prev;
    });
  }, [personalRooms, addressLower, seenResultRooms]);

  // Cleanup local cache khi phòng kết thúc/huỷ
  useEffect(() => {
    if (!isClient || !address || rooms.length === 0) return;
    const toRemove: string[] = [];
    const nextMap: CommitInfoMap = { ...commitInfoMap };
    Object.values(commitInfoMap).forEach((info) => {
      const room = rooms.find((r) => r.id === Number(info.roomId));
      if (room && (roomIsFinalized(room) || room.state === 4)) {
        delete nextMap[info.roomId];
        toRemove.push(info.roomId);
      }
    });
    if (toRemove.length > 0) {
      setCommitInfoMap(nextMap);
      if (address) {
        toRemove.forEach((rid) => clearCommitInfo(address, rid, { preserveArchive: true }));
      }
      if (toRemove.includes(roomId)) {
        const fallback = Object.values(nextMap)
          .slice()
          .sort((a, b) => Number(b.roomId) - Number(a.roomId))[0];
        if (fallback) {
          setRoomId(fallback.roomId);
          setChoice(fallback.choice);
          setSalt(fallback.salt);
          setStakeHuman(formatStakeDisplayString(fallback.stakeHuman) || fallback.stakeHuman);
        } else {
          setRoomId("");
          setSalt(newSalt());
        }
      }
    }
  }, [rooms, address, isClient, commitInfoMap, roomId]);

  /* ---------- REFRESH WHEN NEW BLOCK ARRIVES ---------- */
  useEffect(() => {
    if (!isClient || !publicClient) return;
    const unwatch = publicClient.watchBlocks({
      onBlock: () => {
        scheduleSharedRefetch();
      },
      pollingInterval: BLOCK_WATCH_POLL_INTERVAL_MS,
    });
    return () => {
      const state = blockRefetchState.current;
      if (state.timer) {
        clearTimeout(state.timer);
        state.timer = null;
      }
      try {
        unwatch?.();
      } catch {
        // no-op
      }
    };
  }, [isClient, publicClient, scheduleSharedRefetch]);

  /* ---------- writes (đợi tx mined) ---------- */
  const { writeContractAsync } = useWriteContract();

  const writeContract = useCallback(
    (config: any) => writeContractAsync(config as any),
    [writeContractAsync]
  );

  async function afterTx() {
    await runSharedRefetches();
  }

  async function doApprove() {
    playBeep(true);
    try {
      if (!publicClient) {
        showToast("error", "RPC not ready", { skipBeep: true });
        return;
      }
      const amt = parseUnits(prepareStakeForContract(stakeHuman), decimals);
      const hash = await writeContract({
        address: BANMAO,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [RPS, amt],
      });
      showToast("loading", "Pending...", { id: "tx", title: "Pending", force: true });
      await publicClient.waitForTransactionReceipt({ hash });
      toast.dismiss("tx");
      showToast("success", t.toastApproveOk, { skipBeep: true });
      await afterTx();
    } catch (e: any) {
      toast.dismiss("tx");
      showToast("error", e?.shortMessage || "Approve failed", { skipBeep: true });
    }
  }

  async function createRoom() {
    playBeep(true);
    try {
      if (!publicClient) {
        showToast("error", "RPC not ready", { skipBeep: true });
        return;
      }
      const amt = parseUnits(prepareStakeForContract(stakeHuman), decimals);
      const durationRaw = commitDurationInput.trim();
      if (!durationRaw || !/^\d+$/.test(durationRaw)) {
        showToast("error", t.commitDurationInvalid, { skipBeep: true });
        return;
      }
      const durationValue = Number(durationRaw);
      if (!Number.isFinite(durationValue) || durationValue <= 0) {
        showToast("error", t.commitDurationInvalid, { skipBeep: true });
        return;
      }
      const normalizedDuration = Math.floor(durationValue);
      if (normalizedDuration < MIN_COMMIT_WINDOW || normalizedDuration > MAX_COMMIT_WINDOW) {
        showToast("error", t.commitDurationRange, { skipBeep: true });
        return;
      }
      const commitDurationArg = BigInt(normalizedDuration);

      // (A) Lấy nextRoomId trước khi tạo — đề phòng fallback
      const nextBefore = await publicClient
        .readContract({
          address: RPS,
          abi: RPS_ABI,
          functionName: "nextRoomId",
          args: [],
        } as any)
        .catch(() => null);

      const hash = await writeContract({
        address: RPS,
        abi: RPS_ABI,
        functionName: "createRoom",
        args: [amt, commitDurationArg],
      });

      showToast("loading", "Pending...", { id: "tx", title: "Pending", force: true });
      await publicClient.waitForTransactionReceipt({ hash });
      toast.dismiss("tx");
      showToast("success", t.toastCreateOk, { skipBeep: true });

      // (B) Sau khi mined, đọc nextRoomId hiện tại
      const curNext = await publicClient
        .readContract({
          address: RPS,
          abi: RPS_ABI,
          functionName: "nextRoomId",
          args: [],
        } as any)
        .catch(() => null);

      // Tính roomId mới tạo
      let newRoomId: number | null = null;
      if (typeof curNext === "bigint") {
        const v = Number(curNext);
        if (!Number.isNaN(v) && v > 0) newRoomId = v - 1;
      } else if (typeof nextBefore === "bigint") {
        const v = Number(nextBefore);
        if (!Number.isNaN(v) && v > 0) newRoomId = v;
      }

      // (C) Lưu lịch sử cho creator + mở cửa sổ 15’
      if (address && newRoomId != null) {
        const next = addRoomToHistory(address, newRoomId);
        setJoinedRooms(next);
        const nowSec = Math.floor(Date.now() / 1000);
        const expireAt = nowSec + 15 * 60;
        myCreatedRoomsRef.current.set(newRoomId, expireAt);
        rememberCommitDuration(newRoomId, normalizedDuration);
        void refreshCommitDeadline(newRoomId);
        setRoomId(String(newRoomId));
      }

      await afterTx();
    } catch (e: any) {
      toast.dismiss("tx");
      showToast("error", e?.shortMessage || "Create failed", { skipBeep: true });
    }
  }

  const promptJoinConfirmation = useCallback(
    async (details: { readable: string; seconds: number; stakeLabel: string }) => {
      const secondsClamped = Math.max(0, Math.round(details.seconds));
      return new Promise<boolean>((resolve) => {
        let settled = false;
        let toastId: string | undefined;
        const dismiss = (result: boolean, id?: string) => {
          if (settled) return;
          settled = true;
          resolve(result);
          toast.dismiss(id ?? toastId);
        };

        toastId = toast.custom((tt) => {
          const id = tt?.id ?? toastId;
          return (
            <div className="toast-card toast-card--alert toast-card--join-confirm">
              <button
                className="toast-close"
                aria-label="Close notification"
                onClick={() => dismiss(false, id)}
              >
                ×
              </button>
              <div className="toast-join__header">
                <span className="toast-card__icon toast-join__icon" aria-hidden="true">
                  <IconHourglass />
                </span>
                <div className="toast-join__copy">
                  <strong>{t.joinConfirmTitle}</strong>
                  <span>{t.joinConfirmDescription}</span>
                </div>
              </div>
              <div className="toast-join__details">
                <div className="toast-join__details-item">
                  <span className="toast-join__label">{t.joinConfirmTimeLabel}</span>
                  <span className="toast-join__value">{details.readable}</span>
                  <span className="toast-join__hint">{t.joinConfirmTimeHint(secondsClamped)}</span>
                </div>
                <div className="toast-join__details-item">
                  <span className="toast-join__label">{t.joinConfirmStakeLabel}</span>
                  <span className="toast-join__value toast-join__value--stake">
                    <IconToken className="toast-join__value-icon" aria-hidden="true" />
                    {details.stakeLabel}
                  </span>
                </div>
              </div>
              <div className="toast-actions toast-join__actions">
                <button className="table-action-button" onClick={() => dismiss(true, id)}>
                  {t.joinConfirmProceed}
                </button>
                <button className="table-action-button secondary" onClick={() => dismiss(false, id)}>
                  {t.joinConfirmCancel}
                </button>
              </div>
            </div>
          );
        }, { duration: Number.POSITIVE_INFINITY });
      });
    },
    [t]
  );

  async function join(targetRoomId?: string) {
    playBeep(true);
    try {
      const targetRaw = targetRoomId ?? roomId;
      const normalizedRoomId = normalizeRoomId(targetRaw);
      if (!normalizedRoomId) return showToast("error", t.roomMissing, { skipBeep: true });
      if (!publicClient) {
        showToast("error", "RPC not ready", { skipBeep: true });
        return;
      }
      const numericRoomId = Number(normalizedRoomId);
      let confirmDetails: { readable: string; seconds: number; stakeLabel: string } | null = null;
      if (Number.isFinite(numericRoomId) && numericRoomId >= 0) {
        await refreshCommitDeadline(numericRoomId);
        const snapshot = await fetchRoomSnapshot(numericRoomId).catch(() => null);
        if (!snapshot) {
          showToast("error", t.joinRoomLoadFailed ?? t.historyLookupError, { skipBeep: true });
          return;
        }
        const nowSec = Math.floor(Date.now() / 1000);
        const commitWindow = getCommitDurationForRoom(numericRoomId);
        const zeroAddrLower = ZERO_ADDR.toLowerCase();
        let commitDeadline = Number(snapshot.commitDeadline ?? 0);
        if (!Number.isFinite(commitDeadline)) commitDeadline = 0;
        const fallbackDeadline = localCommitDeadlinesRef.current.get(numericRoomId);
        if (fallbackDeadline && fallbackDeadline > commitDeadline) {
          commitDeadline = fallbackDeadline;
        }
        let secondsRemaining: number | null = null;
        if (commitDeadline > 0) {
          secondsRemaining = Math.floor(commitDeadline - nowSec);
        }

        const opponentTaken =
          !!snapshot.opponent && snapshot.opponent.toLowerCase() !== zeroAddrLower;

        const state = Number(snapshot.state ?? 0);
        const stateLabel =
          state === 0
            ? ""
            : state === 1
            ? t.committing ?? STATE[state] ?? "Committing"
            : state === 2
            ? t.revealing ?? STATE[state] ?? "Revealing"
            : state === 3
            ? t.finished ?? STATE[state] ?? "Finished"
            : state === 4
            ? t.canceled ?? STATE[state] ?? "Canceled"
            : STATE[state] ?? t.expired ?? "Expired";

        if (opponentTaken) {
          showToast("error", t.joinRoomOpponentPresent, { skipBeep: true });
          return;
        }

        if (state !== 0) {
          showToast("error", t.joinRoomInactive(stateLabel), { skipBeep: true });
          return;
        }

        if (secondsRemaining != null && secondsRemaining <= 0) {
          showToast("error", t.joinRoomInactive(t.expired ?? "Expired"), { skipBeep: true });
          return;
        }

        const effectiveSeconds =
          secondsRemaining != null
            ? Math.max(secondsRemaining, 0)
            : Math.max(commitWindow, 0);
        const deadline =
          secondsRemaining != null && commitDeadline > 0
            ? commitDeadline
            : nowSec + effectiveSeconds;
        const readable = formatTimeLeft(deadline, t, nowSec);
        let stakeLabel: string = t.joinStakeUnknown;
        if (snapshot.stake && typeof snapshot.stake === "bigint") {
          stakeLabel = `${formatTokenAmount(snapshot.stake, decimals)} $BANMAO`;
        }
        confirmDetails = { readable, seconds: effectiveSeconds, stakeLabel };
      }
      if (confirmDetails && typeof window !== "undefined") {
        vibrate([vibrationMs, 80, vibrationMs]);
        const confirmed = await promptJoinConfirmation(confirmDetails);
        if (!confirmed) return;
      }
      const hash = await writeContract({
        address: RPS,
        abi: RPS_ABI,
        functionName: "joinRoom",
        args: [BigInt(normalizedRoomId)],
      });
      showToast("loading", "Pending...", { id: "tx", title: "Pending", force: true });
      await publicClient.waitForTransactionReceipt({ hash });
      toast.dismiss("tx");
      showToast("success", t.toastJoinOk, { skipBeep: true });

      // lưu lịch sử (tham gia)
      if (address) {
        const next = addRoomToHistory(address, Number(normalizedRoomId));
        setJoinedRooms(next);
      }

      const joinedIdNum = Number(normalizedRoomId);
      if (!Number.isNaN(joinedIdNum) && joinedIdNum >= 0) {
        void refreshCommitDeadline(joinedIdNum);
      }

      setRoomId(normalizedRoomId);
      await afterTx();
    } catch (e: any) {
      toast.dismiss("tx");
      showToast("error", e?.shortMessage || "Join failed", { skipBeep: true });
    }
  }

  async function commit(
    targetRoomId?: string,
    overrides?: { choice?: Choice; salt?: `0x${string}` }
  ) {
    playBeep(true);
    try {
      const targetRaw = targetRoomId ?? roomId;
      const normalizedTarget = normalizeRoomId(targetRaw);
      if (!normalizedTarget) return showToast("error", t.roomMissing, { skipBeep: true });
      const commitChoice = overrides?.choice ?? choice;
      const commitSalt = overrides?.salt ?? salt;
      if (!isHex(commitSalt) || (commitSalt as string).length !== 66)
        return showToast("error", t.errSalt, { skipBeep: true });
      if (!publicClient) {
        showToast("error", "RPC not ready", { skipBeep: true });
        return;
      }

      if (overrides?.choice != null && overrides.choice !== choice) {
        setChoice(overrides.choice);
      }
      if (overrides?.salt != null && overrides.salt !== salt) {
        setSalt(overrides.salt);
      }

      const info: LastCommitInfo = { roomId: normalizedTarget, stakeHuman, choice: commitChoice, salt: commitSalt };

      const hash = await writeContract({
        address: RPS,
        abi: RPS_ABI,
        functionName: "commit",
        args: [BigInt(normalizedTarget), commitHash(commitChoice, commitSalt)],
      });

      showToast("loading", "Pending...", { id: "tx", title: "Pending", force: true });
      await publicClient.waitForTransactionReceipt({ hash });
      toast.dismiss("tx");
      showToast("success", t.toastCommitOk, { skipBeep: true });

      const normalizedIdNum = Number(normalizedTarget);
      if (!Number.isNaN(normalizedIdNum) && normalizedIdNum >= 0) {
        void refreshCommitDeadline(normalizedIdNum);
      }

      if (address) {
        saveCommitInfo(address, info);
        saveArchivedCommitInfo(address, info);
        setCommitInfoMap((prev) => ({ ...prev, [normalizedTarget]: info }));
        setArchivedCommitInfoMap((prev) => ({ ...prev, [normalizedTarget]: info }));
      }
      setRoomId(normalizedTarget);
      await afterTx();
    } catch (e: any) {
      toast.dismiss("tx");
      showToast("error", e?.shortMessage || "Commit failed", { skipBeep: true });
    }
  }

  async function reveal(targetRoomId?: string) {
    playBeep(true);
    try {
      const targetRaw = targetRoomId ?? roomId;
      const normalizedTarget = normalizeRoomId(targetRaw);
      if (!normalizedTarget) return showToast("error", t.roomMissing, { skipBeep: true });
      setRoomId(normalizedTarget);
      const savedInfo =
        commitInfoMap[normalizedTarget] ?? archivedCommitInfoMap[normalizedTarget];
      const revealChoice: Choice = savedInfo?.choice ?? choice;
      const revealSalt: `0x${string}` = savedInfo?.salt ?? salt;

      if (savedInfo) {
        if (savedInfo.choice !== choice) setChoice(savedInfo.choice);
        if (savedInfo.salt !== salt) setSalt(savedInfo.salt);
        if (savedInfo.stakeHuman !== stakeHuman)
          setStakeHuman(formatStakeDisplayString(savedInfo.stakeHuman) || savedInfo.stakeHuman);
      } else {
        if (!isHex(revealSalt) || (revealSalt as string).length !== 66) {
          return showToast("error", t.errSalt, { skipBeep: true });
        }
      }

      if (!publicClient) {
        showToast("error", "RPC not ready", { skipBeep: true });
        return;
      }

      let currentState = 0;
      try {
        const status: any = await publicClient.readContract({
          address: RPS,
          abi: RPS_ABI,
          functionName: "rooms",
          args: [BigInt(normalizedTarget)],
        } as any);
        currentState = Number(status[9] ?? 0);
      } catch {
        return showToast("error", t.errRoomStatusLoad, { skipBeep: true });
      }
      if (currentState === 1)
        return showToast("error", t.errRoomStatusCommitting, { skipBeep: true });
      if (currentState !== 2) {
        return showToast(
          "error",
          `${t.errRoomStatusNotRevealing} ${STATE[currentState]} (${t.stateCol} ${currentState}).`,
          { skipBeep: true }
        );
      }

      const hash = await writeContract({
        address: RPS,
        abi: RPS_ABI,
        functionName: "reveal",
        args: [BigInt(normalizedTarget), revealChoice, revealSalt],
      });

      showToast("loading", "Pending...", { id: "tx", title: "Pending", force: true });
      await publicClient.waitForTransactionReceipt({ hash });
      toast.dismiss("tx");
      showToast("success", t.toastRevealOk, { skipBeep: true });
      await afterTx();
    } catch (e: any) {
      toast.dismiss("tx");
      showToast("error", e?.shortMessage || "Reveal failed", { skipBeep: true });
    }
  }

  const promptForfeitConfirmation = useCallback(
    async (normalizedTarget: string): Promise<boolean> => {
      const roomIdNum = Number(normalizedTarget);
      if (!Number.isFinite(roomIdNum) || roomIdNum < 0) {
        showToast("error", t.roomMissing, { skipBeep: true });
        return false;
      }

      const snapshot = await fetchRoomSnapshot(roomIdNum);
      if (!snapshot) {
        showToast("error", t.historyLookupError, { skipBeep: true });
        return false;
      }

      const warning = createForfeitWarning(snapshot, addressLower, t, decimals);
      const stakeLabel = `${formatTokenAmount(snapshot.stake ?? ZERO_BIGINT, decimals)} $BANMAO`;
      const finalWarning =
        warning ?? {
          title: t.forfeitWarnDefaultTitle,
          body: t.forfeitWarnDefaultBody(stakeLabel),
        };

      return await new Promise<boolean>((resolve) => {
        let settled = false;
        let toastId: string | undefined;
        const dismiss = (result: boolean, id?: string) => {
          if (settled) return;
          settled = true;
          resolve(result);
          toast.dismiss(id ?? toastId);
        };

        toastId = toast.custom((tt) => {
          const id = tt?.id ?? toastId;
          return (
            <div className="toast-card toast-card--alert">
              <button
                className="toast-close"
                aria-label="Close notification"
                onClick={() => dismiss(false, id)}
              >
                ×
              </button>
              <div className="toast-text">
                <strong>{finalWarning.title}</strong>
                <span>{finalWarning.body}</span>
              </div>
              <div className="toast-actions">
                <button className="table-action-button danger" onClick={() => dismiss(true, id)}>
                  {t.forfeitConfirmProceed}
                </button>
                <button className="table-action-button secondary" onClick={() => dismiss(false, id)}>
                  {t.forfeitCancel}
                </button>
              </div>
            </div>
          );
        }, { duration: Number.POSITIVE_INFINITY });
      });
    },
    [fetchRoomSnapshot, addressLower, t, decimals, showToast]
  );

  async function claim(targetRoomId?: string) {
    playBeep(true);
    try {
      const targetRaw = targetRoomId ?? roomId;
      const normalizedTarget = normalizeRoomId(targetRaw);
      if (!normalizedTarget) return showToast("error", t.roomMissing, { skipBeep: true });
      if (!publicClient) {
        showToast("error", "RPC not ready", { skipBeep: true });
        return;
      }
      const hash = await writeContract({
        address: RPS,
        abi: RPS_ABI,
        functionName: "claimTimeout",
        args: [BigInt(normalizedTarget)],
      });
      showToast("loading", "Pending...", { id: "tx", title: "Pending", force: true });
      await publicClient.waitForTransactionReceipt({ hash });
      toast.dismiss("tx");
      showToast("success", t.toastClaimOk, { skipBeep: true });
      setRoomId(normalizedTarget);
      await afterTx();
    } catch (e: any) {
      toast.dismiss("tx");
      showToast("error", e?.shortMessage || "Claim failed", { skipBeep: true });
    }
  }

  async function forfeit(targetRoomId?: string) {
    try {
      const targetRaw = targetRoomId ?? roomId;
      const normalizedTarget = normalizeRoomId(targetRaw);
      if (!normalizedTarget) return showToast("error", t.roomMissing, { skipBeep: true });
      const confirmed = await promptForfeitConfirmation(normalizedTarget);
      if (!confirmed) return;
      if (!publicClient) {
        showToast("error", "RPC not ready", { skipBeep: true });
        return;
      }

      playBeep(true);

      const hash = await writeContract({
        address: RPS,
        abi: RPS_ABI,
        functionName: "forfeit",
        args: [BigInt(normalizedTarget)],
      });

      showToast("loading", "Pending...", { id: "tx", title: "Pending", force: true });
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      toast.dismiss("tx");
      showToast("success", t.toastForfeitOk, { skipBeep: true });
      setRoomId(normalizedTarget);

      if (forfeitEventAbi) {
        let roomIdNum: number | null = null;
        try {
          roomIdNum = Number(normalizedTarget);
          if (Number.isFinite(roomIdNum) && roomIdNum >= 0) {
            const blockNumber = receipt.blockNumber ?? null;
            rememberForfeitFetch(roomIdNum, false);
            const latestLog = await fetchLatestForfeitLog({
              publicClient,
              event: forfeitEventAbi as any,
              roomId: roomIdNum,
              ...(blockNumber != null
                ? { toBlock: blockNumber, minBlock: blockNumber, maxAttempts: 1 }
                : {}),
            });
            const record = extractForfeitRecord(latestLog);
            if (record) {
              updateForfeitResult(roomIdNum, record);
              fetchedForfeitIdsRef.current.add(roomIdNum);
            }
          }
        } catch (error) {
          if (roomIdNum != null) {
            rememberForfeitFetch(roomIdNum, false);
          }
          console.error(error);
        }
      }

      await afterTx();
    } catch (e: any) {
      toast.dismiss("tx");
      showToast("error", e?.shortMessage || "Forfeit failed", { skipBeep: true });
    }
  }

  const handleShareInvite = useCallback(
    async (targetRoomId?: string) => {
      playBeep(true);
      const shareRaw = targetRoomId ?? roomId;
      const shareId = normalizeRoomId(shareRaw);
      if (!shareId) {
        showToast("error", t.roomMissing, { skipBeep: true });
        return;
      }
      if (typeof window === "undefined") return;

      setRoomId(shareId);
      setIsSharing(true);
      try {
        let stakeLabelText = t.shareStakeLabel("? $BANMAO");
        const shareIdNum = Number(shareId);
        if (Number.isFinite(shareIdNum) && shareIdNum >= 0) {
          let stakeValue: bigint | null = null;
          const cachedRoom = roomsRef.current.find((room) => room.id === shareIdNum);
          const cachedStake = cachedRoom?.stake;
          if (typeof cachedStake === "bigint") {
            stakeValue = cachedStake;
          } else if (typeof cachedStake === "number") {
            stakeValue = BigInt(Math.floor(cachedStake));
          } else if (typeof cachedStake === "string") {
            try {
              stakeValue = BigInt(cachedStake);
            } catch {}
          }

          if (stakeValue == null) {
            const snapshot = await fetchRoomSnapshot(shareIdNum);
            if (snapshot?.stake != null) {
              stakeValue = snapshot.stake;
            }
          }

          if (stakeValue != null) {
            const stakeAmountLabel = `${formatTokenAmount(stakeValue, decimals)} $BANMAO`;
            stakeLabelText = t.shareStakeLabel(stakeAmountLabel);
          }
        }

        const canvas = document.createElement("canvas");
        const width = 720;
        const height = 400;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not supported");

        const computed = window.getComputedStyle(document.body);
        const accent = computed.getPropertyValue("--gold").trim() || "#FFD700";
        const accentRgb = computed.getPropertyValue("--gold-rgb").trim() || "255, 215, 0";
        const accentSoftRgb = computed.getPropertyValue("--gold-soft-rgb").trim() || accentRgb;

        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#050505");
        gradient.addColorStop(1, `rgba(${accentSoftRgb}, 0.2)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = `rgba(${accentRgb}, 0.08)`;
        ctx.fillRect(30, 40, width - 60, height - 80);

        ctx.fillStyle = accent;
        ctx.font = "48px Inter, sans-serif";
        ctx.fillText("BANMAO RPS", 60, 110);

        ctx.font = "26px Inter, sans-serif";
        ctx.fillText(`${t.list}`, 60, 160);

        ctx.font = "bold 72px Inter, sans-serif";
        ctx.fillText(`#${shareId}`, 60, 240);

        ctx.fillStyle = "#fff";
        ctx.font = "28px Inter, sans-serif";
        ctx.fillText(stakeLabelText, 60, 300);

        const shareUrl = `${window.location.origin}/?join=${shareId}`;

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
        if (!blob) throw new Error("Snapshot failed");

        await copyToClipboard(shareUrl);

        const fileName = `banmao-room-${shareId}.png`;
        const shareFile = new File([blob], fileName, { type: "image/png" });

        if (navigator.canShare?.({ files: [shareFile] })) {
          await navigator.share({
            files: [shareFile],
            title: "BANMAO RPS invite",
            text: shareUrl,
            url: shareUrl,
          });
          showToast("success", t.shareSuccess, { skipBeep: true });
        } else if (navigator.share) {
          await navigator.share({ title: "BANMAO RPS invite", text: shareUrl, url: shareUrl });
          showToast("success", t.shareSuccess, { skipBeep: true });
        } else {
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.download = fileName;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
          URL.revokeObjectURL(url);
          showToast("success", t.shareUnavailable, { skipBeep: true });
        }
      } catch (err: any) {
        showToast("error", err?.message || "Share failed", { skipBeep: true });
      } finally {
        setIsSharing(false);
      }
    },
    [roomId, t, showToast, playBeep, fetchRoomSnapshot, decimals]
  );

  const captureFloatingScreenshot = useCallback(async () => {
    if (typeof window === "undefined") return;
    playBeep(true);
    const toastId = "floating-shot";
    showToast("loading", t.sharePreparing, { id: toastId, title: "Preparing", force: true });
    let screenshotMode = false;
    try {
      const html2canvas = await ensureHtml2Canvas();
      if (!html2canvas) {
        toast.dismiss(toastId);
        showToast("error", "Screenshot not supported", { skipBeep: true });
        return;
      }

      toast.dismiss(toastId);

      const target = mainContentRef.current ?? document.body;
      document.body.classList.add("screenshot-mode");
      screenshotMode = true;

      const canvas = await html2canvas(target, {
        backgroundColor: getComputedStyle(document.body).backgroundColor || "#000",
        scale: Math.max(1, window.devicePixelRatio || 1),
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.clientWidth,
        windowHeight: document.documentElement.clientHeight,
        onclone: (doc: Document) => {
          doc.body.classList.add("screenshot-mode");
        },
      });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Screenshot failed");

      const fileName = `banmao-screenshot-${Date.now()}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      let shared = false;
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "BANMAO snapshot", url: window.location.href });
          shared = true;
        } catch (error) {
          console.warn("Share with file failed, falling back to download", error);
        }
      }

      if (!shared && navigator.share) {
        try {
          await navigator.share({ title: "BANMAO snapshot", text: window.location.href, url: window.location.href });
          shared = true;
        } catch (error) {
          console.warn("Text share failed", error);
        }
      }

      toast.dismiss(toastId);

      if (shared) {
        showToast("success", t.shareSuccess, { skipBeep: true });
        return;
      }

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      showToast("success", t.shareUnavailable, { skipBeep: true });
    } catch (error: any) {
      toast.dismiss(toastId);
      showToast("error", error?.message || "Screenshot failed", { skipBeep: true });
    } finally {
      toast.dismiss(toastId);
      if (typeof window !== "undefined" && screenshotMode) {
        document.body.classList.remove("screenshot-mode");
      }
    }
  }, [playBeep, showToast, t]);

  const approvedEnough = useMemo(() => {
    if (!isClient) return false;
    try {
      const want = parseUnits(prepareStakeForContract(stakeHuman), decimals);
      return (allowance ?? BigInt(0)) >= want;
    } catch {
      return false;
    }
  }, [allowance, stakeHuman, decimals, isClient]);

  const CHOICES = [
    { k: 1 as Choice, label: `✊ ${t.rock}`, img: "/rps/rock.png" },
    { k: 2 as Choice, label: `🖐 ${t.paper}`, img: "/rps/paper.png" },
    { k: 3 as Choice, label: `✌️ ${t.scissors}`, img: "/rps/scissors.png" },
  ];

  const seenResultSet = useMemo(() => new Set(seenResultRooms), [seenResultRooms]);
  const freshResultSet = useMemo(() => new Set(freshResultRooms), [freshResultRooms]);

  const activeCommitInfo = useMemo(() => {
    if (roomId && commitInfoMap[roomId]) return commitInfoMap[roomId];
    const entries = Object.values(commitInfoMap);
    if (entries.length === 0) return null;
    return entries.slice().sort((a, b) => Number(b.roomId) - Number(a.roomId))[0];
  }, [commitInfoMap, roomId]);

  const markResultSeen = useCallback((id: number) => {
    setFreshResultRooms((prev) => prev.filter((rid) => rid !== id));
  }, []);

  const handleHistoryLookup = useCallback(async () => {
    const trimmed = historyLookupId.trim();
    if (!trimmed) {
      setHistoryLookupState({ status: "error", message: t.historyLookupInvalid });
      return;
    }
    const idNum = Number(trimmed);
    if (!Number.isFinite(idNum) || idNum < 0) {
      setHistoryLookupState({ status: "error", message: t.historyLookupInvalid });
      return;
    }
    if (!publicClient) {
      setHistoryLookupState({ status: "error", message: t.historyLookupError });
      return;
    }

    setHistoryLookupState({ status: "loading" });
    try {
      const rawRoom: any = await publicClient.readContract({
        address: RPS,
        abi: RPS_ABI,
        functionName: "rooms",
        args: [BigInt(idNum)],
      } as any);

      const creator = (rawRoom?.[0] ?? rawRoom?.creator ?? ZERO_ADDR) as `0x${string}`;
      const opponent = (rawRoom?.[1] ?? rawRoom?.opponent ?? ZERO_ADDR) as `0x${string}`;
      const stakeSource = rawRoom?.[2] ?? rawRoom?.stake ?? 0;
      const stakeValue = typeof stakeSource === "bigint" ? (stakeSource as bigint) : BigInt(stakeSource ?? 0);
      const commitA = (rawRoom?.[3] ?? rawRoom?.commitA ?? ZERO_COMMIT) as `0x${string}`;
      const commitB = (rawRoom?.[4] ?? rawRoom?.commitB ?? ZERO_COMMIT) as `0x${string}`;
      const revealA = Number(rawRoom?.[5] ?? rawRoom?.revealA ?? 0);
      const revealB = Number(rawRoom?.[6] ?? rawRoom?.revealB ?? 0);
      const state = Number(rawRoom?.[9] ?? rawRoom?.state ?? 0);

      let forfeitInfo: ForfeitRecord | null = null;
      if (forfeitEventAbi) {
        try {
          rememberForfeitFetch(idNum, false);
          const latestLog = await fetchLatestForfeitLog({
            publicClient,
            event: forfeitEventAbi as any,
            roomId: idNum,
          });
          const record = extractForfeitRecord(latestLog);
          if (record) {
            forfeitInfo = record;
            updateForfeitResult(idNum, record);
          }
        } catch (error) {
          rememberForfeitFetch(idNum, false);
          console.error(error);
        }
      }

      const raw: HistoryLookupRaw = {
        id: idNum,
        creator,
        opponent,
        stake: stakeValue,
        state,
        commitA,
        commitB,
        revealA,
        revealB,
        forfeit: forfeitInfo,
      };

      const isEmptyRoom =
        creator === ZERO_ADDR &&
        opponent === ZERO_ADDR &&
        stakeValue === ZERO_BIGINT &&
        state === 0 &&
        commitA === ZERO_COMMIT &&
        commitB === ZERO_COMMIT;

      if (isEmptyRoom) {
        lastHistoryLookupRef.current = null;
        setHistoryLookupState({ status: "error", message: t.historyLookupNotFound });
        return;
      }

      lastHistoryLookupRef.current = raw;
      const formatted = formatHistoryLookup(raw, t, decimals);
      setHistoryLookupState({ status: "success", data: formatted });
      setHistoryLookupId(String(idNum));
    } catch (error) {
      console.error(error);
      lastHistoryLookupRef.current = null;
      setHistoryLookupState({ status: "error", message: t.historyLookupError });
    }
  }, [historyLookupId, publicClient, t, decimals, forfeitEventAbi, updateForfeitResult, rememberForfeitFetch]);

  useEffect(() => {
    if (historyLookupState.status === "success" && lastHistoryLookupRef.current) {
      setHistoryLookupState({
        status: "success",
        data: formatHistoryLookup(lastHistoryLookupRef.current, t, decimals),
      });
    }
  }, [t, decimals, historyLookupState.status]);

  const handleHistoryCopy = useCallback(
    async (addressValue: string) => {
      const ok = await copyToClipboard(addressValue);
      if (ok) showToast("success", t.historyLookupCopied, { skipBeep: true });
      else showToast("error", "Copy failed", { skipBeep: true });
    },
    [showToast, t]
  );

  useEffect(() => {
    if (!isClient) return;
    if (!roomId) return;
    const info = commitInfoMap[roomId] ?? archivedCommitInfoMap[roomId];
    if (info) {
      setChoice(info.choice);
      setSalt(info.salt);
      setStakeHuman(formatStakeDisplayString(info.stakeHuman) || info.stakeHuman);
    }
  }, [roomId, commitInfoMap, archivedCommitInfoMap, isClient]);

  type PersonalSummary = {
    id: number;
    opponent: string | null;
    opponentDisplay: string;
    status: string;
    state: number;
    accent: "idle" | "urgent" | "claim" | "finished" | "finished-win" | "finished-lose" | "finished-draw";
    actionLabel?: string;
    onAction?: () => void;
    actionType?: "commit" | "reveal" | "claim" | "share" | "dismiss" | "forfeit";
    needsAction: boolean;
    detail?: string;
    showChoicePicker?: boolean;
    savedChoice?: string | null;
    saltHex?: `0x${string}` | null;
    phase?: string;
    timeLeft?: string | null;
    stakeText?: string;
    choice?: { label: string; img: string } | null;
    allowForfeit?: boolean;
    onForfeit?: () => void;
    alertKey?: string;
  };

  const personalSummaries = useMemo<PersonalSummary[]>(() => {
    if (!addressLower) return [];

    const cards: PersonalSummary[] = [];

    for (const room of personalRooms) {
      const viewRoom = enhanceRoomDeadlines(room);
      const isCreator = room.creator?.toLowerCase?.() === addressLower;
      const isOpponent = room.opponent?.toLowerCase?.() === addressLower;
      const opponentAddressRaw = isCreator ? room.opponent : room.creator;
      const opponentAddress = opponentAddressRaw && opponentAddressRaw !== ZERO_ADDR ? opponentAddressRaw : null;
      const opponentDisplay = opponentAddress
        ? `${opponentAddress.slice(0, 6)}...${opponentAddress.slice(-4)}`
        : t.personalOpponentUnknown;
      const roomIdStr = String(room.id);
      const savedInfo = commitInfoMap[roomIdStr] ?? archivedCommitInfoMap[roomIdStr];
      const savedChoiceLabel = savedInfo ? CHOICES.find((c) => c.k === savedInfo.choice)?.label ?? null : null;

      const stakeText =
        room.stake != null
          ? `${formatTokenAmount(room.stake as bigint, decimals)} $BANMAO`
          : savedInfo?.stakeHuman
          ? `${savedInfo.stakeHuman} $BANMAO`
          : undefined;

      const summary: PersonalSummary = {
        id: room.id,
        opponent: opponentAddress,
        opponentDisplay,
        status: t.personalStatusWaitingJoin,
        state: viewRoom.state,
        accent: "idle",
        needsAction: false,
        detail: undefined,
        showChoicePicker: false,
        savedChoice: savedChoiceLabel,
        saltHex: savedInfo?.salt ?? null,
        stakeText: stakeText ?? "—",
        choice: savedInfo ? CHOICES.find((c) => c.k === savedInfo.choice) ?? null : null,
        allowForfeit: false,
        onForfeit: undefined,
        alertKey: undefined,
      };

      const avail = availability(viewRoom, nowTs);
      const deadline =
        viewRoom.state === 1 ? viewRoom.commitDeadline : viewRoom.state === 2 ? viewRoom.revealDeadline : 0;
      const timeLeft = deadline ? formatTimeLeft(deadline, t, nowTs) : "";
      const commitMissing =
        (isCreator && (!viewRoom.commitA || viewRoom.commitA === ZERO_COMMIT)) ||
        (!isCreator && (!viewRoom.commitB || viewRoom.commitB === ZERO_COMMIT));
      const revealMissing = (isCreator && viewRoom.revealA === 0) || (!isCreator && viewRoom.revealB === 0);
      const viewerIsParticipant = isCreator || isOpponent;

      let includeCard = true;

      const isFreshResult = freshResultSet.has(room.id);

      const finalizeCard = (status: string, accent: PersonalSummary["accent"]) => {
        summary.status = status;
        summary.accent = accent;
        summary.phase = t.finished;
        summary.timeLeft = null;
        summary.allowForfeit = false;
        summary.onForfeit = undefined;
        summary.needsAction = false;
        summary.actionLabel = undefined;
        summary.actionType = undefined;
        summary.onAction = undefined;
        if (isFreshResult) {
          summary.actionLabel = t.dismiss;
          summary.actionType = "dismiss";
          summary.onAction = () => {
            triggerInteractBeep();
            markResultSeen(room.id);
          };
        }
      };

      const defaultPhase =
        viewRoom.state === 0
          ? t.joinable
          : viewRoom.state === 1
          ? t.committing
          : viewRoom.state === 2
          ? t.revealing
          : roomIsFinalized(viewRoom)
          ? t.finished
          : viewRoom.state === 4
          ? t.canceled
          : STATE[viewRoom.state] ?? "";

      summary.phase = defaultPhase;
      summary.timeLeft = timeLeft ? timeLeft : null;

      if (
        viewerIsParticipant &&
        (viewRoom.state === 1 || viewRoom.state === 2) &&
        !resolveForfeitOutcome(viewRoom)
      ) {
        summary.allowForfeit = true;
        summary.onForfeit = () => {
          setRoomId(roomIdStr);
          void forfeit(roomIdStr);
        };
      }

      const forfeitView = resolveForfeitOutcome(viewRoom);
      if (forfeitView) {
        const { viewerWon, viewerLost } = determineForfeitViewerResult(forfeitView, {
          viewerAddress: addressLower,
          creator: viewRoom.creator ?? null,
          opponent: viewRoom.opponent ?? null,
        });
        const status = viewerWon
          ? t.personalStatusForfeitWin
          : viewerLost
          ? t.personalStatusForfeitLose
          : t.personalStatusForfeitSpectate;
        const accent = viewerWon ? "finished-win" : viewerLost ? "finished-lose" : "finished";
        summary.state = 3;
        finalizeCard(status, accent);
        if (includeCard) {
          cards.push(summary);
        }
        continue;
      }

      if (viewRoom.state === 0) {
        summary.status = t.personalStatusWaitingJoin;
        if (avail.claimable) {
          if (isCreator) {
            const claimKey = `claim-${room.id}`;
            summary.status = t.personalStatusClaim(avail.phase === "commit" ? t.committing : t.revealing);
            summary.actionLabel = t.claim;
            summary.accent = "claim";
            summary.actionType = "claim";
            summary.needsAction = true;
            summary.phase = t.claim;
            summary.timeLeft = null;
            summary.alertKey = claimKey;
            summary.onAction = () => {
              setRoomId(roomIdStr);
              stopAlertLoop(claimKey);
              claim(roomIdStr);
            };
          } else {
            const noJoinReason = t.canceledReasonNoJoin ?? t.canceledReasonUnknown;
            const creatorRefund =
              t.canceledRefundCreatorOnly ??
              t.canceledRefundBothPartial ??
              t.canceledRefundUnknown;
            summary.status = `${t.personalStatusCanceled}: ${noJoinReason}`;
            summary.detail = creatorRefund;
            summary.accent = "finished";
            summary.phase = t.canceled;
            summary.timeLeft = null;
          }
        } else if (isCreator) {
          summary.actionLabel = t.personalActionShare;
          summary.actionType = "share";
          summary.needsAction = true;
          summary.onAction = () => {
            setRoomId(roomIdStr);
            handleShareInvite(roomIdStr);
          };
        }
      } else if (viewRoom.state === 1) {
        if (avail.claimable) {
          const creatorCommitted = viewRoom.commitA && viewRoom.commitA !== ZERO_COMMIT;
          const opponentCommitted = viewRoom.commitB && viewRoom.commitB !== ZERO_COMMIT;
          const iCommitted = (isCreator && creatorCommitted) || (!isCreator && opponentCommitted);
          const opponentDidNotCommit = (isCreator && !opponentCommitted) || (!isCreator && !creatorCommitted);
          const bothPlayersMissed = !creatorCommitted && !opponentCommitted;
          const claimKey = `claim-${room.id}`;

          if (bothPlayersMissed) {
            summary.status = t.personalStatusDrawTimeoutCommit;
            summary.detail = t.canceledRefundBothFull ?? undefined;
            summary.actionLabel = t.claim;
            summary.accent = "claim";
            summary.actionType = "claim";
            summary.needsAction = true;
            summary.phase = t.claim;
            summary.timeLeft = null;
            summary.alertKey = claimKey;
            summary.onAction = () => {
              setRoomId(roomIdStr);
              stopAlertLoop(claimKey);
              claim(roomIdStr);
            };
          } else if (iCommitted && opponentDidNotCommit) {
            summary.status = t.personalStatusClaim(t.committing);
            summary.actionLabel = t.claim;
            summary.accent = "claim";
            summary.actionType = "claim";
            summary.needsAction = true;
            summary.phase = t.claim;
            summary.timeLeft = null;
            summary.alertKey = claimKey;
            summary.onAction = () => {
              setRoomId(roomIdStr);
              stopAlertLoop(claimKey);
              claim(roomIdStr);
            };
          } else {
            summary.status = t.personalStatusLoseTimeoutCommit;
            summary.accent = "finished-lose";
            summary.phase = t.finished;
            summary.timeLeft = null;
          }
        } else if (commitMissing) {
          summary.status = t.personalStatusNeedCommit(timeLeft);
          summary.actionLabel = t.commit;
          summary.accent = "urgent";
          summary.actionType = "commit";
          summary.needsAction = true;
          summary.showChoicePicker = true;
          summary.phase = t.commit;
          summary.timeLeft = timeLeft ? timeLeft : null;
          const commitKey = `need-commit-${room.id}-${isCreator ? "A" : "B"}`;
          summary.alertKey = commitKey;
          summary.onAction = () => {
            setRoomId(roomIdStr);
            stopAlertLoop(commitKey);
            void commit(roomIdStr);
          };
        } else {
          summary.status = t.personalStatusWaitingOpponentCommit(timeLeft);
        }
      } else if (viewRoom.state === 2) {
        if (avail.claimable) {
          const creatorRevealed = viewRoom.revealA > 0;
          const opponentRevealed = viewRoom.revealB > 0;
          const iRevealed = (isCreator && creatorRevealed) || (!isCreator && opponentRevealed);
          const opponentDidNotReveal = (isCreator && !opponentRevealed) || (!isCreator && !creatorRevealed);
          const bothPlayersMissedReveal = !creatorRevealed && !opponentRevealed;
          const claimKey = `claim-${room.id}`;

          if (bothPlayersMissedReveal) {
            summary.status = t.personalStatusDrawTimeoutReveal;
            summary.detail = t.canceledRefundBothPartial ?? undefined;
            summary.actionLabel = t.claim;
            summary.accent = "claim";
            summary.actionType = "claim";
            summary.needsAction = true;
            summary.phase = t.claim;
            summary.timeLeft = null;
            summary.alertKey = claimKey;
            summary.onAction = () => {
              setRoomId(roomIdStr);
              stopAlertLoop(claimKey);
              claim(roomIdStr);
            };
          } else if (iRevealed && opponentDidNotReveal) {
            summary.status = t.personalStatusClaim(t.revealing);
            summary.actionLabel = t.claim;
            summary.accent = "claim";
            summary.actionType = "claim";
            summary.needsAction = true;
            summary.phase = t.claim;
            summary.timeLeft = null;
            summary.alertKey = claimKey;
            summary.onAction = () => {
              setRoomId(roomIdStr);
              stopAlertLoop(claimKey);
              claim(roomIdStr);
            };
          } else {
            summary.status = t.personalStatusLoseTimeoutReveal;
            summary.accent = "finished-lose";
            summary.phase = t.finished;
            summary.timeLeft = null;
          }
        } else if (revealMissing) {
          summary.status = t.personalStatusNeedReveal(timeLeft);
          summary.actionLabel = t.reveal;
          summary.accent = "urgent";
          summary.actionType = "reveal";
          summary.needsAction = true;
          summary.showChoicePicker = true;
          summary.phase = t.reveal;
          summary.timeLeft = timeLeft ? timeLeft : null;
          const revealKey = `need-reveal-${room.id}-${isCreator ? "A" : "B"}`;
          summary.alertKey = revealKey;
          summary.onAction = () => {
            setRoomId(roomIdStr);
            if (savedInfo) {
              setChoice(savedInfo.choice);
              setSalt(savedInfo.salt);
              setStakeHuman(formatStakeDisplayString(savedInfo.stakeHuman) || savedInfo.stakeHuman);
            }
            stopAlertLoop(revealKey);
            void reveal(roomIdStr);
          };
        } else {
          summary.status = t.personalStatusWaitingOpponentReveal(timeLeft);
        }
      } else if (roomIsFinalized(viewRoom)) {
        const outcome = deriveFinalOutcome(viewRoom);
        let viewerWon =
          (outcome.winner === "creator" && isCreator) || (outcome.winner === "opponent" && !isCreator);
        let viewerLost =
          (outcome.winner === "creator" && !isCreator) || (outcome.winner === "opponent" && isCreator);

        if (outcome.via === "normal") {
          const opponentChoiceValue = isCreator ? viewRoom.revealB : viewRoom.revealA;
          const opponentChoice =
            CHOICES.find((c) => c.k === opponentChoiceValue)?.label ?? t.personalUnknownChoice;
          const resultText = outcome.winner === "creator"
            ? (isCreator ? t.win : t.lose)
            : outcome.winner === "opponent"
            ? (isCreator ? t.lose : t.win)
            : t.draw;
          summary.detail = t.personalStatusFinished(opponentChoice, resultText);
          if (viewerWon) {
            finalizeCard(t.personalStatusRevealSuccessWin, "finished-win");
          } else if (viewerLost) {
            finalizeCard(t.personalStatusRevealSuccessLose, "finished-lose");
          } else {
            finalizeCard(t.personalStatusRevealSuccessDraw, "finished-draw");
          }
        } else if (outcome.via === "commit-timeout") {
          const status = viewerWon
            ? t.personalStatusWinTimeoutCommit
            : viewerLost
            ? t.personalStatusLoseTimeoutCommit
            : t.personalStatusDrawTimeoutCommit;
          if (!viewerWon && !viewerLost) {
            summary.detail = t.canceledRefundBothFull ?? undefined;
          }
          const accent = viewerWon ? "finished-win" : viewerLost ? "finished-lose" : "finished-draw";
          finalizeCard(status, accent);
        } else if (outcome.via === "reveal-timeout") {
          const status = viewerWon
            ? t.personalStatusWinTimeoutReveal
            : viewerLost
            ? t.personalStatusLoseTimeoutReveal
            : t.personalStatusDrawTimeoutReveal;
          const accent = viewerWon ? "finished-win" : viewerLost ? "finished-lose" : "finished-draw";
          finalizeCard(status, accent);
        } else if (outcome.via === "forfeit") {
          const forfeitInfo = resolveForfeitOutcome(viewRoom);
          const perspective = determineForfeitViewerResult(forfeitInfo, {
            viewerAddress: addressLower,
            creator: viewRoom.creator ?? null,
            opponent: viewRoom.opponent ?? null,
          });
          viewerWon = perspective.viewerWon;
          viewerLost = perspective.viewerLost;
          const status = viewerWon
            ? t.personalStatusForfeitWin
            : viewerLost
            ? t.personalStatusForfeitLose
            : t.personalStatusForfeitSpectate;
          const accent = viewerWon ? "finished-win" : viewerLost ? "finished-lose" : "finished";
          finalizeCard(status, accent);
        } else if (outcome.via === "both-commit-timeout") {
          summary.detail = t.canceledRefundBothFull ?? undefined;
          finalizeCard(t.personalStatusDrawTimeoutCommit, "finished-draw");
        } else if (outcome.via === "both-reveal-timeout") {
          summary.detail = t.canceledRefundBothPartial ?? undefined;
          finalizeCard(t.personalStatusDrawTimeoutReveal, "finished-draw");
        } else {
          finalizeCard(t.personalStatusFinished(t.personalUnknownChoice, t.finished), "finished");
        }
      } else if (viewRoom.state === 4) {
        const cancelDetails = getCancelDetails(viewRoom, t);
        summary.status = `${t.personalStatusCanceled}: ${cancelDetails.reason}`;
        summary.detail = cancelDetails.refund;
      }

      if (includeCard) {
        cards.push(summary);
      }
    }

    return cards;
  }, [
    addressLower,
    personalRooms,
    enhanceRoomDeadlines,
    t,
    handleShareInvite,
    claim,
    commit,
    reveal,
    CHOICES,
    stopAlertLoop,
    commitInfoMap,
    archivedCommitInfoMap,
    freshResultSet,
    triggerInteractBeep,
    markResultSeen,
    nowTs,
  ]);

  const personalSummariesRef = useRef<PersonalSummary[]>([]);
  useEffect(() => {
    personalSummariesRef.current = personalSummaries;
  }, [personalSummaries]);

  const [autoPlayingRooms, setAutoPlayingRooms] = useState<Set<number>>(() => new Set());
  const autoPlayControllersRef = useRef<Map<number, { canceled: boolean }>>(new Map());

  const updateAutoPlaying = useCallback((roomId: number, active: boolean) => {
    setAutoPlayingRooms((prev) => {
      const next = new Set(prev);
      if (active) next.add(roomId);
      else next.delete(roomId);
      return next;
    });
  }, []);

  const stopAutoPlay = useCallback((roomId: number) => {
    const controller = autoPlayControllersRef.current.get(roomId);
    if (controller) {
      controller.canceled = true;
    }
  }, []);

  const autoPlayRoom = useCallback(
    async (roomId: number) => {
      const normalizedTarget = normalizeRoomId(roomId);
      if (!normalizedTarget) {
        showToast("error", t.roomMissing, { skipBeep: true });
        return;
      }

      if (autoPlayControllersRef.current.has(roomId)) {
        stopAutoPlay(roomId);
        return;
      }

      const controller = { canceled: false };
      autoPlayControllersRef.current.set(roomId, controller);
      updateAutoPlaying(roomId, true);
      try {
        let performed = false;
        let blocked = false;
        let idleCycles = 0;

        const waitForActionTransition = async (
          previousAction: PersonalSummary["actionType"] | undefined
        ): Promise<"canceled" | "changed" | "cleared" | "missing" | "timeout"> => {
          const start = Date.now();
          const MAX_WAIT_MS = 45_000;
          const POLL_INTERVAL_MS = 650;
          while (!controller.canceled) {
            await waitMs(POLL_INTERVAL_MS);
            const latest = personalSummariesRef.current.find((card) => card.id === roomId);
            if (!latest) return "missing";
            if (!latest.needsAction) return "cleared";
            if (latest.actionType !== previousAction) return "changed";
            if (Date.now() - start >= MAX_WAIT_MS) return "timeout";
          }
          return "canceled";
        };

        while (!controller.canceled) {
          const summary = personalSummariesRef.current.find((card) => card.id === roomId);
          if (!summary || !summary.needsAction || !summary.actionType) {
            if (!summary) break;
            if (summary.state === 3 || summary.state === 4) {
              break;
            }

            idleCycles += 1;
            await waitMs(Math.min(5000, 750 + idleCycles * 250));
            continue;
          }

          if (
            summary.actionType !== "commit" &&
            summary.actionType !== "reveal" &&
            summary.actionType !== "claim"
          ) {
            break;
          }

          idleCycles = 0;

          if (summary.alertKey) {
            stopAlertLoop(summary.alertKey);
          }

          setRoomId(normalizedTarget);

          if (controller.canceled) break;

          const currentAction = summary.actionType;
          if (summary.actionType === "commit") {
            const option = CHOICES[Math.floor(Math.random() * CHOICES.length)];
            const randomSalt = newSalt();
            await commit(normalizedTarget, { choice: option.k, salt: randomSalt });
          } else if (summary.actionType === "reveal") {
            const info = commitInfoMap[normalizedTarget] ?? archivedCommitInfoMap[normalizedTarget];
            if (!info) {
              showToast("error", t.personalAutoPlayMissingCommit, { skipBeep: true });
              blocked = true;
              break;
            }
            setChoice(info.choice);
            setSalt(info.salt);
            await reveal(normalizedTarget);
          } else {
            await claim(normalizedTarget);
          }

          performed = true;
          const transition = await waitForActionTransition(currentAction);
          if (transition === "timeout") {
            blocked = true;
            showToast("error", t.personalAutoPlayPending, { skipBeep: true });
            break;
          }
          if (transition === "missing") {
            break;
          }
        }

        if (controller.canceled) {
          showToast("success", t.personalAutoPlayStopped, { skipBeep: true });
        } else if (!performed && !blocked) {
          showToast("error", t.personalAutoPlayNoAction, { skipBeep: true });
        }
      } finally {
        autoPlayControllersRef.current.delete(roomId);
        updateAutoPlaying(roomId, false);
      }
    },
    [
      archivedCommitInfoMap,
      CHOICES,
      claim,
      commit,
      commitInfoMap,
      reveal,
      setChoice,
      setRoomId,
      setSalt,
      stopAutoPlay,
      showToast,
      stopAlertLoop,
      t,
      updateAutoPlaying,
    ]
  );

  const actionableSummaries = useMemo(
    () => personalSummaries.filter((card) => card.state !== 3 && card.state !== 4),
    [personalSummaries]
  );

  const userStats = useMemo(() => {
    if (!addressLower || personalRooms.length === 0) {
      return { ...EMPTY_STATS };
    }
    const finishedRooms = personalRooms.filter((room) => roomIsFinalized(room));
    let win = 0;
    let loss = 0;
    let draw = 0;
    let totalWinnings = ZERO_BIGINT;
    let totalLosses = ZERO_BIGINT;
    let rock = 0;
    let paper = 0;
    let scissors = 0;

    for (const room of finishedRooms) {
      const isCreator = room.creator?.toLowerCase?.() === addressLower;
      const outcome = deriveFinalOutcome(room);
      if (outcome.via === "forfeit") {
        continue;
      }
      if ((outcome.winner === "creator" && isCreator) || (outcome.winner === "opponent" && !isCreator)) {
        win++;
        totalWinnings += room.stake;
      } else if (outcome.winner === "draw") {
        draw++;
      } else {
        loss++;
        totalLosses += room.stake;
      }

      if (isCreator) {
        if (room.revealA === 1) rock++;
        else if (room.revealA === 2) paper++;
        else if (room.revealA === 3) scissors++;
      } else {
        if (room.revealB === 1) rock++;
        else if (room.revealB === 2) paper++;
        else if (room.revealB === 3) scissors++;
      }
    }

    return { win, loss, draw, totalWinnings, totalLosses, rock, paper, scissors };
  }, [personalRooms, addressLower]);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    const hasFreshBalance = typeof balance === "bigint";
    const hasStatsData = personalRooms.length > 0;
    if (!hasFreshBalance && !hasStatsData) return;

    const nextInfo: CachedInfoState = {
      balance: hasFreshBalance ? (balance as bigint) : cachedInfo?.balance ?? null,
      stats: hasStatsData ? userStats : cachedInfo?.stats ?? userStats,
    };

    if (cachedInfo) {
      const sameBalance = (cachedInfo.balance ?? null) === (nextInfo.balance ?? null);
      const sameStats = userStatsEqual(cachedInfo.stats, nextInfo.stats);
      if (sameBalance && sameStats) return;
    }

    setCachedInfo(nextInfo);
    try {
      const serialized = serializeInfoForCache(nextInfo);
      window.localStorage.setItem(INFO_CACHE_KEY, JSON.stringify(serialized));
    } catch (error) {
      console.error("Failed to cache info data", error);
    }
  }, [balance, personalRooms.length, userStats, isClient, cachedInfo]);

  const infoBalance = useMemo(() => {
    if (typeof balance === "bigint") return balance as bigint;
    return cachedInfo?.balance ?? null;
  }, [balance, cachedInfo]);

  const infoStats = useMemo(() => {
    if (personalRooms.length > 0) return userStats;
    if (cachedInfo?.stats) return cachedInfo.stats;
    return userStats;
  }, [personalRooms.length, userStats, cachedInfo]);

  const visiblePersonalSummaries = useMemo(
    () => (showOnlyActionableRooms ? actionableSummaries : personalSummaries),
    [actionableSummaries, personalSummaries, showOnlyActionableRooms]
  );

  /* ---------- WATCH: thêm phòng tự tạo vào lịch sử + set cửa sổ 15 phút ---------- */
  useWatchContractEvent({
    address: RPS,
    abi: RPS_ABI,
    eventName: "RoomCreated" as any,
    onLogs: (logs) => {
      refetchNextRoomId?.();
      refetchRooms?.();
      if (!address) return;
      const mine = logs.find(
        (l: any) => l?.args?.creator?.toLowerCase?.() === address.toLowerCase()
      ) as any;
      if (mine?.args?.roomId != null) {
        const idNum = Number(mine.args.roomId);
        const next = addRoomToHistory(address, idNum);
        setJoinedRooms(next);

        // set 15 phút để “care” phòng do mình tạo => rung/notify commit-reveal
        const nowSec = Math.floor(Date.now() / 1000);
        const expireAt = nowSec + 15 * 60;
        myCreatedRoomsRef.current.set(idNum, expireAt);
        void refreshCommitDeadline(idNum);
      }
    },
  });

  /* ---------- WATCH: ROOM JOINED -> rung + toast ---------- */
  useWatchContractEvent({
    address: RPS,
    abi: RPS_ABI,
    eventName: "Joined" as any,
    onLogs: (logs) => {
      refetchRooms?.();
      logs.forEach((l: any) => {
        const rid = Number(l?.args?.roomId);
        const opponent = String(l?.args?.opponent || "");
        const opponentLower = opponent.toLowerCase();
        const viewerLower = address?.toLowerCase?.() ?? "";
        if (!Number.isFinite(rid) || rid < 0) return;

        // Nếu là phòng mình care (creator hoặc trong 15'), rung + báo
        if (isInMyCreatedWindow(rid) || (viewerLower && opponentLower === viewerLower)) {
          void refreshCommitDeadline(rid);

          const joinKey = `joined-${rid}-${opponentLower}`;
          if (!notifiedRef.current.has(joinKey)) {
            notifiedRef.current.add(joinKey);
            startAlertLoop(joinKey);
            pushNotification(
              (tt) => (
                <div className="toast-card toast-card--alert">
                  <button
                    className="toast-close"
                    aria-label="Close notification"
                    onClick={() => {
                      stopAlertLoop(joinKey);
                      toast.dismiss(tt?.id);
                    }}
                  >
                    ×
                  </button>
                  <div className="toast-text">
                    <strong>{t.joinedNotificationTitle(rid)}</strong>
                    <span>{t.joinedNotificationBody(opponent)}</span>
                  </div>
                  <div className="toast-actions">
                    <button
                      className="table-action-button"
                      onClick={async () => {
                        setRoomId(String(rid));
                        document.getElementById("join-room-section")?.scrollIntoView({ behavior: "smooth" });
                        const ok = await copyToClipboard(opponent);
                        stopAlertLoop(joinKey, { dismiss: false });
                        toast.dismiss(tt?.id);
                        if (ok) showToast("success", t.copyWallet);
                        else showToast("error", "Copy failed");
                      }}
                    >
                      {t.focusRoom}
                    </button>
                    <button
                      className="table-action-button secondary"
                      onClick={() => {
                        stopAlertLoop(joinKey);
                        toast.dismiss(tt?.id);
                      }}
                    >
                      {t.dismiss}
                    </button>
                  </div>
                </div>
              ),
              { duration: Number.POSITIVE_INFINITY, id: joinKey }
            );
          }
        }

        // Nếu chính mình là opponent, lưu vào history
        if (viewerLower && opponentLower === viewerLower && address) {
          const next = addRoomToHistory(address, rid);
          setJoinedRooms(next);
        }
      });
    },
  });

  /* ---------- WATCH: COMMIT -> rung + toast ---------- */
  useWatchContractEvent({
    address: RPS,
    abi: RPS_ABI,
    eventName: "Committed" as any,
    onLogs: (logs) => {
      refetchRooms?.();
      logs.forEach((l: any) => {
        const rid = Number(l?.args?.roomId);
        const player = String(l?.args?.player || "");
        if (!Number.isFinite(rid) || rid < 0) return;
        if (!iCareAboutThisRoom({ id: rid, creator: player })) return;

        const roomSnapshot = roomsRef.current.find((room) => Number(room?.id) === rid);
        const playerLower = player.toLowerCase();
        const zeroLower = ZERO_ADDR.toLowerCase();
        let shouldResetCommitWindow = false;
        if (roomSnapshot) {
          const creatorLower = roomSnapshot.creator?.toLowerCase?.() ?? "";
          const opponentLower = roomSnapshot.opponent?.toLowerCase?.() ?? "";
          const creatorPending = !roomSnapshot.commitA || roomSnapshot.commitA === ZERO_COMMIT;
          const opponentPending = !roomSnapshot.commitB || roomSnapshot.commitB === ZERO_COMMIT;
          if (
            playerLower === opponentLower &&
            creatorLower &&
            creatorLower !== zeroLower &&
            creatorPending
          ) {
            shouldResetCommitWindow = true;
          } else if (
            playerLower === creatorLower &&
            opponentLower &&
            opponentLower !== zeroLower &&
            opponentPending
          ) {
            shouldResetCommitWindow = true;
          }
        }

        if (shouldResetCommitWindow) {
          const nowSec = Math.floor(Date.now() / 1000);
          const commitWindow = getCommitDurationForRoom(rid);
          if (commitWindow > 0) {
            rememberCommitDuration(rid, commitWindow);
            rememberCommitDeadlineFallback(rid, nowSec + commitWindow);
            void refreshCommitDeadline(rid);
          }
        }

        const key = `committed-${rid}-${player.toLowerCase()}`;
        if (!notifiedRef.current.has(key)) {
          notifiedRef.current.add(key);
          vibrate([vibrationMs, 50, vibrationMs]);
          pushNotification(
            (tt) => (
              <div className="toast-card toast-card--alert">
                <button
                  className="toast-close"
                  aria-label="Close notification"
                  onClick={() => toast.dismiss(tt?.id)}
                >
                  ×
                </button>
                <div className="toast-text">
                  <strong>{`🧠 Room #${rid}`}</strong>
                  <span>{`${player.slice(0, 6)}... committed`}</span>
                </div>
              </div>
            ),
            { duration: 4000, id: key }
          );
        }
      });
    },
  });

  /* ---------- WATCH: REVEAL -> rung + toast ---------- */
  useWatchContractEvent({
    address: RPS,
    abi: RPS_ABI,
    eventName: "Revealed" as any,
    onLogs: (logs) => {
      refetchRooms?.();
      logs.forEach((l: any) => {
        const rid = Number(l?.args?.roomId);
        const player = String(l?.args?.player || "");
        if (!Number.isFinite(rid) || rid < 0) return;
        if (!iCareAboutThisRoom({ id: rid, creator: player })) return;
        const key = `revealed-${rid}-${player.toLowerCase()}`;
        if (!notifiedRef.current.has(key)) {
          notifiedRef.current.add(key);
          vibrate([vibrationMs, 80, vibrationMs]);
          pushNotification(
            (tt) => (
              <div className="toast-card toast-card--alert">
                <button
                  className="toast-close"
                  aria-label="Close notification"
                  onClick={() => toast.dismiss(tt?.id)}
                >
                  ×
                </button>
                <div className="toast-text">
                  <strong>{`🔓 Room #${rid}`}</strong>
                  <span>{`${player.slice(0, 6)}... revealed`}</span>
                </div>
              </div>
            ),
            { duration: 4000, id: key }
          );
        }
      });
    },
  });

  useWatchContractEvent({
    address: RPS,
    abi: RPS_ABI,
    eventName: "Forfeited" as any,
    onLogs: (logs) => {
      refetchRooms?.();
      logs.forEach((l: any) => {
        const rid = Number(l?.args?.roomId);
        const loserAddr = normalizeForfeitAddress(String(l?.args?.loser || ""));
        const winnerAddr = normalizeForfeitAddress(String(l?.args?.winner || ""));
        const payoutValue = normalizeForfeitPayout(l?.args?.winnerPayout ?? null);
        if (!Number.isFinite(rid) || rid <= 0) return;
        if (loserAddr || winnerAddr || payoutValue) {
          updateForfeitResult(rid, {
            loser: loserAddr,
            winner: winnerAddr,
            payout: payoutValue,
          });
          fetchedForfeitIdsRef.current.add(rid);
        }

        const viewerLower = addressLower ?? "";
        if (!viewerLower) return;

        const mergedRecord: ForfeitRecord = {
          loser: forfeitResultsRef.current[rid]?.loser ?? loserAddr ?? null,
          winner: forfeitResultsRef.current[rid]?.winner ?? winnerAddr ?? null,
          payout: forfeitResultsRef.current[rid]?.payout ?? payoutValue ?? null,
        };

        const room = roomsRef.current.find((room) => room.id === rid);
        const resolution = resolveForfeitOutcome({
          forfeit: mergedRecord,
          creator: room?.creator,
          opponent: room?.opponent,
        });
        if (!resolution) return;

        const { viewerWon, viewerLost } = determineForfeitViewerResult(resolution, {
          viewerAddress: viewerLower,
          creator: room?.creator ?? null,
          opponent: room?.opponent ?? null,
        });
        if (!viewerWon && !viewerLost) return;

        const creatorAddr = room?.creator ?? null;
        const opponentAddr = room?.opponent ?? null;
        const creatorLower = creatorAddr?.toLowerCase?.() ?? null;
        const opponentLower = opponentAddr?.toLowerCase?.() ?? null;

        const fallbackOpponentLabel = () => {
          if (viewerLower && creatorLower && viewerLower === creatorLower) {
            return formatShortAddress(opponentAddr);
          }
          if (viewerLower && opponentLower && viewerLower === opponentLower) {
            return formatShortAddress(creatorAddr);
          }
          return null;
        };

        if (viewerWon) {
          const loserLabel =
            formatShortAddress(mergedRecord.loser) ?? fallbackOpponentLabel() ?? t.opponent;
          const payoutLabel =
            mergedRecord.payout != null
              ? `${formatTokenAmount(mergedRecord.payout, decimals)} $BANMAO`
              : null;
          const messageParts = [
            t.forfeitWinTitle,
            t.forfeitWinBody(loserLabel, rid),
            t.forfeitWinResultRoom,
            payoutLabel ? t.forfeitWinResultPayout(payoutLabel) : null,
            t.forfeitWinReminder,
          ].filter(Boolean) as string[];
          refetchBalance?.();
          showToast("success", messageParts.join("\n\n"), { skipBeep: true, force: true });
        } else if (viewerLost) {
          const winnerLabel =
            formatShortAddress(mergedRecord.winner) ?? fallbackOpponentLabel() ?? t.opponent;
          showToast("error", t.toastForfeitLose(winnerLabel), { skipBeep: true });
        }
      });
    },
  });

  /* ---------- AUTO-NOTIFY: Action needed (claim, commit, reveal) ---------- */
  useEffect(() => {
    if (!isConnected || !address || rooms.length === 0 || !notificationsEnabled) return;

    let notificationShown = false;
    const lower = address.toLowerCase();
    const allActionableKeys = new Set<string>();

    const showNotification = (
      key: string,
      createToast: (toast: any) => React.ReactElement,
      pattern?: number | number[]
    ): boolean => {
      if (notificationShown) return false;

      if (!notifiedRef.current.has(key) && !isSnoozed(key)) {
        notifiedRef.current.add(key);
        startAlertLoop(key, pattern);
        pushNotification(createToast, { duration: Number.POSITIVE_INFINITY, id: key });
        notificationShown = true;
        return true;
      }

      return false;
    };

    // Prioritize by claims > reveal > commit, and sort by room ID to keep it stable
    const sortedRooms = [...rooms].sort((a, b) => a.id - b.id);

    for (const r of sortedRooms) {
      const viewRoom = enhanceRoomDeadlines(r);
      const isCreator = viewRoom.creator?.toLowerCase?.() === lower;
      const isOpponent = viewRoom.opponent?.toLowerCase?.() === lower;
      if (!isCreator && !isOpponent) continue;
      if (resolveForfeitOutcome(viewRoom)) continue;
      if (roomIsFinalized(viewRoom)) continue;

      const avail = availability(viewRoom, nowTs);
      if (avail.claimable) {
        const claimKey = `claim-${viewRoom.id}`;
        allActionableKeys.add(claimKey);
        const triggered = showNotification(
          claimKey,
          (tt) => (
            <div className="toast-card toast-card--alert">
              <button
                className="toast-close"
                aria-label="Close notification"
                onClick={() => {
                  stopAlertLoop(claimKey);
                  toast.dismiss(tt?.id);
                }}
              >
                ×
              </button>
              <div className="toast-text">
                <strong>{t.notifyClaim(viewRoom.id)}</strong>
                <span>{avail.phase === "commit" ? t.committing : t.revealing}</span>
              </div>
              <div className="toast-actions">
                <button
                  className="table-action-button"
                  onClick={() => {
                    setRoomId(String(viewRoom.id));
                    stopAlertLoop(claimKey, { dismiss: false });
                    toast.dismiss(tt?.id);
                    claim(String(viewRoom.id));
                  }}
                >
                  {t.takeAction}
                </button>
                <button
                  className="table-action-button secondary"
                  onClick={() => {
                    stopAlertLoop(claimKey);
                    snooze(claimKey);
                    toast.dismiss(tt?.id);
                  }}
                >
                  {t.rememberLater}
                </button>
              </div>
            </div>
          )
        );
      } else if (viewRoom.state === 2) {
        const needReveal = (isCreator && viewRoom.revealA === 0) || (isOpponent && viewRoom.revealB === 0);
        if (needReveal) {
          const key = `need-reveal-${viewRoom.id}-${isCreator ? "A" : "B"}`;
          allActionableKeys.add(key);
          const triggered = showNotification(
            key,
            (tt) => (
              <div className="toast-card toast-card--alert">
                <button
                  className="toast-close"
                  aria-label="Close notification"
                  onClick={() => {
                    stopAlertLoop(key);
                    toast.dismiss(tt?.id);
                  }}
                >
                  ×
                </button>
                <div className="toast-text">
                  <strong>{t.notifyReveal(viewRoom.id)}</strong>
                  <span>{t.reveal}</span>
                </div>
                <div className="toast-actions">
                  <button
                    className="table-action-button"
                    onClick={() => {
                      setRoomId(String(viewRoom.id));
                      stopAlertLoop(key, { dismiss: false });
                      toast.dismiss(tt?.id);
                      void reveal(String(viewRoom.id));
                    }}
                  >
                    {t.takeAction}
                  </button>
                  <button
                    className="table-action-button secondary"
                    onClick={() => {
                      stopAlertLoop(key);
                      snooze(key);
                      toast.dismiss(tt?.id);
                    }}
                  >
                    {t.rememberLater}
                  </button>
                </div>
              </div>
            ),
            [vibrationMs, 80, vibrationMs]
          );
          if (triggered) {
            sendTelegramReminder({
              key,
              roomId: viewRoom.id,
              type: "reveal",
              title: t.notifyReveal(viewRoom.id),
              body: t.reveal,
              deadline: viewRoom.revealDeadline ?? null,
            });
          }
        }
      } else if (viewRoom.state === 1) {
        const creatorNeedsCommit =
          isCreator && (!viewRoom.commitA || viewRoom.commitA === ZERO_COMMIT);
        const opponentNeedsCommit =
          isOpponent && (!viewRoom.commitB || viewRoom.commitB === ZERO_COMMIT);
        const needCommit = creatorNeedsCommit || opponentNeedsCommit;
        const secondsRemaining =
          viewRoom.commitDeadline > 0 ? Math.floor(viewRoom.commitDeadline - nowTs) : null;

        if (
          creatorNeedsCommit &&
          secondsRemaining != null &&
          secondsRemaining > 0 &&
          secondsRemaining <= 60
        ) {
          const warningKey = `commit-urgent-${viewRoom.id}`;
          allActionableKeys.add(warningKey);
          const timeLabel = formatTimeLeft(viewRoom.commitDeadline, t, nowTs);
          const secondsLabel = Math.max(0, secondsRemaining);
          const triggered = showNotification(
            warningKey,
            (tt) => (
              <div className="toast-card toast-card--alert">
                <button
                  className="toast-close"
                  aria-label="Close notification"
                  onClick={() => {
                    stopAlertLoop(warningKey);
                    toast.dismiss(tt?.id);
                  }}
                >
                  ×
                </button>
                <div className="toast-text">
                  <strong>{t.commitUrgentTitle(viewRoom.id)}</strong>
                  <span>{t.commitUrgentBody(timeLabel, secondsLabel)}</span>
                </div>
                <div className="toast-actions">
                  <button
                    className="table-action-button"
                    onClick={() => {
                      setRoomId(String(viewRoom.id));
                      stopAlertLoop(warningKey, { dismiss: false });
                      toast.dismiss(tt?.id);
                      void commit(String(viewRoom.id));
                    }}
                  >
                    {t.takeAction}
                  </button>
                  <button
                    className="table-action-button secondary"
                    onClick={() => {
                      stopAlertLoop(warningKey);
                      snooze(warningKey);
                      toast.dismiss(tt?.id);
                    }}
                  >
                    {t.rememberLater}
                  </button>
                </div>
              </div>
            ),
            [vibrationMs, 90, vibrationMs, 90, vibrationMs]
          );
          if (triggered) {
            sendTelegramReminder({
              key: warningKey,
              roomId: viewRoom.id,
              type: "commit-urgent",
              title: t.commitUrgentTitle(viewRoom.id),
              body: t.commitUrgentBody(timeLabel, secondsLabel),
              deadline: viewRoom.commitDeadline ?? null,
            });
          }
          continue;
        }

        if (needCommit) {
          const key = `need-commit-${viewRoom.id}-${isCreator ? "A" : "B"}`;
          allActionableKeys.add(key);
          const triggered = showNotification(key, (tt) => (
            <div className="toast-card toast-card--alert">
              <button
                className="toast-close"
                aria-label="Close notification"
                onClick={() => {
                  stopAlertLoop(key);
                  toast.dismiss(tt?.id);
                }}
              >
                ×
              </button>
              <div className="toast-text">
                <strong>{t.notifyCommit(viewRoom.id)}</strong>
                <span>{t.commit}</span>
              </div>
              <div className="toast-actions">
                <button
                  className="table-action-button"
                  onClick={() => {
                    setRoomId(String(viewRoom.id));
                    stopAlertLoop(key, { dismiss: false });
                    toast.dismiss(tt?.id);
                    void commit(String(viewRoom.id));
                  }}
                >
                  {t.takeAction}
                </button>
                <button
                  className="table-action-button secondary"
                  onClick={() => {
                    stopAlertLoop(key);
                    snooze(key);
                    toast.dismiss(tt?.id);
                  }}
                >
                  {t.rememberLater}
                </button>
              </div>
            </div>
          ));
          if (triggered) {
            sendTelegramReminder({
              key,
              roomId: viewRoom.id,
              type: "commit",
              title: t.notifyCommit(viewRoom.id),
              body: t.commit,
              deadline: viewRoom.commitDeadline ?? null,
            });
          }
        }
      }
    }

    // Cleanup stale notifications
    notifiedRef.current.forEach((key) => {
      if (
        key.startsWith("claim-") ||
        key.startsWith("need-commit-") ||
        key.startsWith("commit-urgent-") ||
        key.startsWith("need-reveal-")
      ) {
        if (!allActionableKeys.has(key)) {
          stopAlertLoop(key);
        }
      }
    });
  }, [
    rooms,
    isConnected,
    address,
    isSnoozed,
    pushNotification,
    snooze,
    t,
    notificationsEnabled,
    startAlertLoop,
    stopAlertLoop,
    vibrationMs,
    nowTs,
    enhanceRoomDeadlines,
    claim,
    commit,
    reveal,
    sendTelegramReminder,
  ]);

  useEffect(() => {
    if (!address || rooms.length === 0 || !notificationsEnabled) return;
    if (freshResultRooms.length === 0) return;

    const lower = address.toLowerCase();
    const latestFreshId = freshResultRooms[0];
    const room = rooms.find((r) => r.id === latestFreshId);
    if (!room || !roomIsFinalized(room)) return;

    const isCreator = room.creator?.toLowerCase?.() === lower;
    const isOpponent = room.opponent?.toLowerCase?.() === lower;
    if (!isCreator && !isOpponent) return;

    const key = `result-${room.id}-${lower}`;
    if (notifiedRef.current.has(key)) return;

    const outcome = deriveFinalOutcome(room);

    let viewerWon =
      (outcome.winner === "creator" && isCreator) || (outcome.winner === "opponent" && isOpponent);
    let viewerLost =
      (outcome.winner === "creator" && isOpponent) || (outcome.winner === "opponent" && isCreator);

    let bodyText: string | null = null;
    let icon = "🤝";

    if (outcome.via === "normal") {
      const opponentChoiceValue = isCreator ? room.revealB : room.revealA;
      if (!opponentChoiceValue) return;
      const opponentChoice = CHOICES.find((c) => c.k === opponentChoiceValue)?.label;
      if (!opponentChoice) return;

      const winner = getWinner(room.revealA, room.revealB);
      let outcomeLabel: string = t.draw;
      if (winner === "A") outcomeLabel = isCreator ? t.win : t.lose;
      else if (winner === "B") outcomeLabel = isOpponent ? t.win : t.lose;

      icon =
        winner === "Draw" || winner === null
          ? "🤝"
          : (winner === "A" && isCreator) || (winner === "B" && isOpponent)
          ? "🏆"
          : "📉";
      bodyText = t.resultNotificationBody(opponentChoice, outcomeLabel);
    } else if (outcome.via === "commit-timeout") {
      if (viewerWon) {
        bodyText = t.personalStatusWinTimeoutCommit;
        icon = "🏆";
      } else if (viewerLost) {
        bodyText = t.personalStatusLoseTimeoutCommit;
        icon = "📉";
      } else {
        bodyText = t.personalStatusDrawTimeoutCommit;
      }
    } else if (outcome.via === "reveal-timeout") {
      if (viewerWon) {
        bodyText = t.personalStatusWinTimeoutReveal;
        icon = "🏆";
      } else if (viewerLost) {
        bodyText = t.personalStatusLoseTimeoutReveal;
        icon = "📉";
      } else {
        bodyText = t.personalStatusDrawTimeoutReveal;
      }
    } else if (outcome.via === "forfeit") {
      const perspective = determineForfeitViewerResult(resolveForfeitOutcome(room), {
        viewerAddress: address,
        creator: room.creator ?? null,
        opponent: room.opponent ?? null,
      });
      viewerWon = perspective.viewerWon;
      viewerLost = perspective.viewerLost;
      if (viewerWon) {
        bodyText = t.personalStatusForfeitWin;
        icon = "🏆";
      } else if (viewerLost) {
        bodyText = t.personalStatusForfeitLose;
        icon = "📉";
      } else {
        bodyText = t.personalStatusForfeitSpectate;
      }
    } else if (outcome.via === "both-commit-timeout") {
      bodyText = t.personalStatusDrawTimeoutCommit;
    } else if (outcome.via === "both-reveal-timeout") {
      bodyText = t.personalStatusDrawTimeoutReveal;
    }

    if (!bodyText) return;

    notifiedRef.current.add(key);
    vibrate([vibrationMs, 120, vibrationMs]);

    const resultTone = viewerWon ? "win" : viewerLost ? "lose" : "draw";
    const title = t.resultNotificationTitle(room.id);

    pushNotification(
      (tt) => (
        <div className={`toast-card toast-card--result toast-card--result-${resultTone}`}>
          <span className="toast-card__icon" aria-hidden="true">
            {icon}
          </span>
          <div className="toast-text">
            <strong>{title}</strong>
            <span>{bodyText}</span>
          </div>
          <button
            className="toast-close"
            aria-label={t.dismiss ?? "Dismiss"}
            onClick={() => toast.dismiss(tt?.id)}
          >
            ×
          </button>
        </div>
      ),
      { duration: 8000, id: key }
    );
  }, [
    rooms,
    address,
    notificationsEnabled,
    CHOICES,
    pushNotification,
    t,
    vibrate,
    vibrationMs,
    freshResultRooms,
  ]);

  useEffect(() => {
    if (!notificationsEnabled) {
      notifiedRef.current.forEach((id) => stopAlertLoop(id));
      notifiedRef.current.clear();
    }
  }, [notificationsEnabled, stopAlertLoop]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        alertLoopsRef.current.forEach((intervalId) => window.clearInterval(intervalId));
        alertLoopsRef.current.clear();
      }
      mainContentRef.current?.classList.remove("app-shake");
    };
  }, []);

  // Dọn map phòng tạo sau 15 phút
  useEffect(() => {
    const timer = setInterval(() => {
      const nowTs = Math.floor(Date.now() / 1000);
      for (const [rid, exp] of myCreatedRoomsRef.current.entries()) {
        if (nowTs >= exp) myCreatedRoomsRef.current.delete(rid);
      }
      let commitChanged = false;
      let revealChanged = false;
      for (const [rid, deadline] of localCommitDeadlinesRef.current.entries()) {
        const commitWindow = getCommitDurationForRoom(rid);
        if (nowTs >= deadline + commitWindow * 6) {
          localCommitDeadlinesRef.current.delete(rid);
          commitChanged = true;
        }
      }
      for (const [rid, deadline] of localRevealDeadlinesRef.current.entries()) {
        if (nowTs >= deadline + REVEAL_WINDOW * 6) {
          localRevealDeadlinesRef.current.delete(rid);
          revealChanged = true;
        }
      }
      if (commitChanged) syncCommitDeadlineFallbacks();
      if (revealChanged) syncRevealDeadlineFallbacks();
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, [syncCommitDeadlineFallbacks, syncRevealDeadlineFallbacks]);

  /* ===================== RENDER ===================== */
  return (
    <main>
      <Toaster
        position="top-center"
        toastOptions={{ className: "toast-wrapper", duration: 5000 }}
        containerStyle={{ inset: "12px", pointerEvents: "none", width: "auto", zIndex: 9999 }}
      />
      <Header connectLabel={t.connect} chainUnsupportedLabel={t.connectUnsupported} />

      <div ref={mainContentRef} className="main-wrapper">
        <h2 className="glowing-title" style={{ textAlign: "center" }}>
          {t.title}
        </h2>
        {!isConnected && <p style={{ textAlign: "center" }}>{t.connect}</p>}

        <div className="main-content">
          {/* Cột chính (Game UI) */}
          <div>
            {/* Approve / Create */}
            <div className="row" style={{ marginTop: 24 }}>
              <section
                className={`join-room-section stake-section${
                  isStakeTableCollapsed ? " stake-section--collapsed" : ""
                }`}
              >
                <div className="stake-section__header">
                  <div className="stake-section__title-row">
                    <h3 className="glowing-title stake-section__title">{t.infoTitle}</h3>
                    <div className="stake-section__title-actions">
                      <button
                        type="button"
                        className={`icon-refresh-button${
                          isRefreshing ? " icon-refresh-button--spinning" : ""
                        }`}
                        onClick={handleManualRefresh}
                        title={refreshLabel}
                        aria-label={refreshLabel}
                        disabled={isRefreshing}
                      >
                        <FaSyncAlt className="icon-refresh-button__icon" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="stake-section__toggle"
                        onClick={() => setIsStakeTableCollapsed(!isStakeTableCollapsed)}
                        aria-expanded={!isStakeTableCollapsed}
                        aria-controls="stake-section-content"
                        title={isStakeTableCollapsed ? "Show" : "Hide"}
                        aria-label={isStakeTableCollapsed ? "Show" : "Hide"}
                        disabled={!isConnected}
                      >
                        {isStakeTableCollapsed ? (
                          <FaEyeSlash className="stake-section__toggle-icon" aria-hidden="true" />
                        ) : (
                          <FaEye className="stake-section__toggle-icon" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="stake-section__content" id="stake-section-content">
                  {!isConnected ? (
                    <p className="stake-section__message">{t.stakeConnectPrompt}</p>
                  ) : !isStakeTableCollapsed ? (
                    <div className="stake-section__info-stack">
                      <InfoTable
                        balance={infoBalance}
                        decimals={decimals}
                        stats={infoStats}
                        strings={t}
                      />
                    </div>
                  ) : null}
                </div>
              </section>

              <section
                id="join-room-section"
                ref={joinSectionRef}
                className={`join-room-section${joinSectionHighlight ? " join-room-section--highlight" : ""}`}
              >
                <h3 className="glowing-title">{t.join}</h3>
                <div className="join-room-section__create-block">
                  <div className="join-room-section__field">
                    <label className="join-room-section__label" htmlFor="join-stake-input">
                      {t.stake}
                    </label>
                    <div className="commit-window-control commit-window-control--wide">
                      <button
                        type="button"
                        className="commit-window-control__step"
                        aria-label={
                          t.stake
                            ? `${t.stake} decrease by ×${stakeStepLabel}`
                            : `Decrease stake by ${stakeStepLabel}`
                        }
                        onClick={() => {
                          handleStakeStep(-stakeStep);
                        }}
                      >
                        −
                      </button>
                      <input
                        id="join-stake-input"
                        className="stake-section__input commit-window-control__input join-room-section__input"
                        value={stakeHuman}
                        onChange={(e) => setStakeHuman(e.target.value)}
                        placeholder={t.stakePH}
                        inputMode="decimal"
                        aria-label={t.stake}
                      />
                      <button
                        type="button"
                        className="commit-window-control__step"
                        aria-label={
                          t.stake
                            ? `${t.stake} increase by ×${stakeStepLabel}`
                            : `Increase stake by ${stakeStepLabel}`
                        }
                        onClick={() => {
                          handleStakeStep(stakeStep);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className="commit-window-control__step-options">
                      {STEP_PRESETS.map((multiplier) => {
                        const isActive = stakeStep === multiplier;
                        return (
                          <button
                            key={`stake-step-${multiplier}`}
                            type="button"
                            className={`commit-window-control__step-option${
                              isActive ? " commit-window-control__step-option--active" : ""
                            }`}
                            onClick={() => setStakeStep(multiplier)}
                            aria-pressed={isActive}
                          >
                            ×{formatWholeWithThousands(String(multiplier))}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="join-room-section__commit-window">
                    <label className="join-room-section__label" htmlFor="commit-duration-input">
                      {t.commitDurationLabel}
                    </label>
                    <div className="commit-window-control commit-window-control--wide">
                      <button
                        type="button"
                        className="commit-window-control__step"
                        aria-label={t.commitDurationDecrease ?? "Decrease seconds"}
                        onClick={(event) => {
                          const delta = event.shiftKey ? -60 : -1;
                          handleCommitDurationStep(delta);
                        }}
                      >
                        −
                      </button>
                      <input
                        id="commit-duration-input"
                        className="stake-section__input commit-window-control__input join-room-section__input"
                        type="number"
                        inputMode="numeric"
                        min={MIN_COMMIT_WINDOW}
                        max={MAX_COMMIT_WINDOW}
                        step={1}
                        value={commitDurationInput}
                        onChange={(e) => setCommitDurationInput(e.target.value)}
                        placeholder={t.commitDurationPH}
                        aria-describedby="commit-duration-hint"
                      />
                      <button
                        type="button"
                        className="commit-window-control__step"
                        aria-label={t.commitDurationIncrease ?? "Increase seconds"}
                        onClick={(event) => {
                          const delta = event.shiftKey ? 60 : 1;
                          handleCommitDurationStep(delta);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <span id="commit-duration-hint" className="join-room-section__hint">
                      {t.commitDurationHint}
                    </span>
                  </div>
                  <div className="stake-section__actions join-room-section__create-actions">
                    {!approvedEnough ? (
                      <button onClick={doApprove} disabled={!isConnected || !isClient}>
                        {t.approve}
                      </button>
                    ) : (
                      <button className="approved" type="button" disabled aria-label="Approved">
                        ✅ {t.approved}
                      </button>
                    )}
                    <button onClick={createRoom} disabled={!isConnected || !isClient}>
                      {t.create}
                    </button>
                    <button onClick={() => handleShareInvite()} disabled={!roomId || isSharing}>
                      {isSharing ? t.sharePreparing : t.shareScreenshot}
                    </button>
                  </div>
                </div>
                <div className="join-room-section__field-group">
                  <div className="join-room-section__field">
                    <label className="join-room-section__label" htmlFor="join-room-id-input">
                      {t.room}
                    </label>
                    <div className="commit-window-control commit-window-control--wide">
                      <button
                        type="button"
                        className="commit-window-control__step"
                        aria-label={
                          t.room
                            ? `${t.room} decrease by ${roomStep}`
                            : `Decrease room id by ${roomStep}`
                        }
                        onClick={() => {
                          handleRoomIdStep(-roomStep);
                        }}
                      >
                        −
                      </button>
                      <input
                        id="join-room-id-input"
                        ref={joinInputRef}
                        className="stake-section__input commit-window-control__input join-room-section__input"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        placeholder={t.room}
                        inputMode="numeric"
                        aria-label={t.room}
                      />
                      <button
                        type="button"
                        className="commit-window-control__step"
                        aria-label={
                          t.room
                            ? `${t.room} increase by ${roomStep}`
                            : `Increase room id by ${roomStep}`
                        }
                        onClick={() => {
                          handleRoomIdStep(roomStep);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="join-room-section__field">
                    <label className="join-room-section__label" htmlFor="join-salt-input">
                      {t.salt}
                    </label>
                    <div className="commit-window-control commit-window-control--wide">
                      <button
                        type="button"
                        className="commit-window-control__step"
                        aria-label={
                          t.salt
                            ? `${t.salt} decrease by ${saltStep}`
                            : `Decrease salt by ${saltStep}`
                        }
                        onClick={() => {
                          const stepValue = BigInt(saltStep);
                          handleSaltStep(-stepValue);
                        }}
                      >
                        −
                      </button>
                      <input
                        id="join-salt-input"
                        className="stake-section__input commit-window-control__input join-room-section__input"
                        value={salt}
                        onChange={(e) => setSalt(e.target.value as `0x${string}`)}
                        placeholder={t.salt}
                        spellCheck={false}
                        aria-label={t.salt}
                      />
                      <button
                        type="button"
                        className="commit-window-control__step"
                        aria-label={
                          t.salt
                            ? `${t.salt} increase by ${saltStep}`
                            : `Increase salt by ${saltStep}`
                        }
                        onClick={() => {
                          const stepValue = BigInt(saltStep);
                          handleSaltStep(stepValue);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="join-room-section__join-actions">
                  <button onClick={() => join()} disabled={!isConnected || !isClient}>
                    {t.join}
                  </button>
                  <button
                    onClick={() => {
                      playBeep(true);
                      setSalt(newSalt());
                    }}
                  >
                    🔁 {t.newSalt}
                  </button>
                  <button
                    onClick={async () => {
                      playBeep(true);
                      const ok = await copyToClipboard(salt);
                      if (ok) showToast("success", t.personalCopySaltSuccess, { skipBeep: true });
                      else showToast("error", t.personalCopySaltError, { skipBeep: true });
                    }}
                    disabled={!salt}
                  >
                    📋 {t.personalCopySalt}
                  </button>
                </div>

              </section>
            </div>

            {isConnected && (
              <>
                <section
                  className={`personal-board${
                    isPersonalBoardCollapsed ? " personal-board--collapsed" : ""
                  }${showOnlyActionableRooms ? " personal-board--focused" : ""}${
                    !showOnlyActionableRooms && !isPersonalBoardCollapsed
                      ? " personal-board--all-limited"
                      : ""
                  }`}
                >
                  <div className="personal-board__heading">
                    <div className="personal-board__heading-text">
                      <h3 className="glowing-title">{t.personalBoardTitle}</h3>
                      <p>{t.personalBoardSubtitle}</p>
                    </div>
                    <div className="personal-board__controls">
                      <button
                        type="button"
                        className={`icon-refresh-button personal-board__refresh${
                          isRefreshing ? " icon-refresh-button--spinning" : ""
                        }`}
                        onClick={handleManualRefresh}
                        title={refreshLabel}
                        aria-label={refreshLabel}
                        disabled={isRefreshing}
                      >
                        <FaSyncAlt className="icon-refresh-button__icon" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={`personal-board__toggle${
                          isPersonalBoardCollapsed ? " personal-board__toggle--active" : ""
                        }`}
                        onClick={() => {
                          setIsPersonalBoardCollapsed((prev) => !prev);
                        }}
                        aria-pressed={isPersonalBoardCollapsed}
                        aria-label={
                          isPersonalBoardCollapsed ? t.personalBoardShowAll : t.personalBoardCollapse
                        }
                        title={isPersonalBoardCollapsed ? t.personalBoardShowAll : t.personalBoardCollapse}
                      >
                        <span aria-hidden="true">{isPersonalBoardCollapsed ? "⇲" : "⇱"}</span>
                        <span className="personal-board__toggle-label">
                          {isPersonalBoardCollapsed ? t.personalBoardShowAll : t.personalBoardCollapse}
                        </span>
                      </button>
                      <button
                        type="button"
                        className={`personal-board__toggle${
                          showOnlyActionableRooms ? " personal-board__toggle--active" : ""
                        }`}
                        onClick={() => {
                          setShowOnlyActionableRooms((prev) => {
                            const next = !prev;
                            if (next) setIsPersonalBoardCollapsed(false);
                            return next;
                          });
                        }}
                        aria-pressed={showOnlyActionableRooms}
                        aria-label={
                          showOnlyActionableRooms ? t.personalBoardShowAll : t.personalBoardExpand
                        }
                        title={showOnlyActionableRooms ? t.personalBoardShowAll : t.personalBoardExpand}
                      >
                        <span aria-hidden="true">{showOnlyActionableRooms ? "☰" : "⚡"}</span>
                        <span className="personal-board__toggle-label">
                          {showOnlyActionableRooms ? t.personalBoardShowAll : t.personalBoardExpand}
                        </span>
                      </button>
                    </div>
                  </div>

                  {visiblePersonalSummaries.length === 0 ? (
                    <p className="personal-board__empty">
                      {showOnlyActionableRooms ? t.personalBoardNoAction : t.personalBoardEmpty}
                    </p>
                  ) : (
                    <div className="personal-board__table-wrapper">
                      <table className="personal-board__table">
                      <thead>
                        <tr>
                          <th>{t.room}</th>
                          <th>{t.opponent}</th>
                          <th>Phase</th>
                          <th>Status</th>
                          <th>{t.stakeCol}</th>
                          <th className="action-col">{t.actionCol}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visiblePersonalSummaries.map((card) => {
                          const isActiveCard = roomId === String(card.id);
                          const isAutoPlayable =
                            card.needsAction &&
                            (card.actionType === "commit" ||
                              card.actionType === "reveal" ||
                              card.actionType === "claim");
                          const isAutoPlaying = autoPlayingRooms.has(card.id);
                          return (
                            <tr key={card.id} className={`personal-board__row personal-board__row--${card.accent}`}>
                              <td data-label={t.room}>
                                <div className="personal-board__room">
                                  <span>#{card.id}</span>
                                  {card.saltHex && (
                                    <button
                                      type="button"
                                      className="personal-board__salt"
                                      onClick={async () => {
                                        triggerInteractBeep();
                                        const ok = await copyToClipboard(card.saltHex ?? "");
                                        if (ok) showToast("success", t.personalCopySaltSuccess);
                                        else showToast("error", t.personalCopySaltError ?? "Copy failed");
                                      }}
                                    >
                                      {t.personalCopySalt}
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td data-label={t.opponent}>
                                <div className="personal-board__opponent">
                                  <span>{card.opponentDisplay}</span>
                                  {card.opponent && (
                                    <button
                                      className="table-action-button secondary"
                                      onClick={async () => {
                                        const ok = await copyToClipboard(card.opponent ?? "");
                                        if (ok) showToast("success", t.personalCopyOpponent);
                                        else showToast("error", "Copy failed");
                                      }}
                                    >
                                      {t.copyAddress}
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td data-label="Phase">
                                <div className="personal-board__phase">
                                  <span>{card.phase}</span>
                                  {card.timeLeft && <span className="personal-board__time">{card.timeLeft}</span>}
                                </div>
                              </td>
                              <td data-label="Status">
                                <div className="personal-board__status">
                                  <p>{card.status}</p>
                                  {card.detail && <span>{card.detail}</span>}
                                </div>
                              </td>
                              <td data-label={t.stakeCol}>
                                <div className="personal-board__stake">
                                  <span className="personal-board__stake-value">{card.stakeText}</span>
                                  {card.choice && !card.showChoicePicker && (
                                    <span className="personal-board__choice-display">
                                      <Image src={card.choice.img} alt={card.choice.label} width={20} height={20} />
                                      <span>{card.choice.label}</span>
                                    </span>
                                  )}
                                  {card.showChoicePicker && (
                                    <div className="personal-board__choices">
                                      {CHOICES.map((c) => (
                                        <button
                                          key={c.k}
                                          type="button"
                                          className={`personal-board__choice-button${
                                            isActiveCard && choice === c.k ? " personal-board__choice-button--active" : ""
                                          }`}
                                          onClick={() => {
                                            setRoomId(String(card.id));
                                            setChoice(c.k);
                                          }}
                                        >
                                          <Image src={c.img} alt={c.label} width={20} height={20} />
                                          <span>{c.label}</span>
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                  {card.savedChoice && (
                                    <span className="personal-board__saved-choice">
                                      {t.personalChoiceSaved(card.savedChoice)}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td data-label={t.actionCol} className="action-col">
                                <div className="personal-board__action-stack">
                                  {isAutoPlayable && (
                                    <button
                                      type="button"
                                      className="personal-board__action"
                                      onClick={() => {
                                        if (isAutoPlaying) stopAutoPlay(card.id);
                                        else void autoPlayRoom(card.id);
                                      }}
                                      disabled={!isClient || (!isAutoPlaying && !isConnected)}
                                    >
                                      {isAutoPlaying ? t.personalAutoPlayStop : t.personalAutoPlay}
                                    </button>
                                  )}
                                  {card.actionLabel && card.onAction ? (
                                    <button
                                      className="personal-board__action"
                                      onClick={() => {
                                        card.onAction?.();
                                      }}
                                    >
                                      {card.actionLabel}
                                    </button>
                                  ) : !card.allowForfeit ? (
                                    <span className="personal-board__no-action">—</span>
                                  ) : null}
                                  {card.allowForfeit && (
                                    <button
                                      className="personal-board__action personal-board__action--danger"
                                      onClick={() => {
                                        triggerInteractBeep();
                                        card.onForfeit?.();
                                      }}
                                    >
                                      {t.forfeit}
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      </table>
                    </div>
                  )}
                </section>

                <section
                  className={`telegram-reminders${
                    isTelegramPanelCollapsed ? " telegram-reminders--collapsed" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="telegram-reminders__toggle"
                    onClick={() => {
                      triggerInteractBeep();
                      setIsTelegramPanelCollapsed((prev) => !prev);
                    }}
                    aria-expanded={!isTelegramPanelCollapsed}
                    aria-controls="telegram-reminders-content"
                    title={t.telegramReminderLabel}
                  >
                    <IconTelegram width={18} height={18} />
                    <span>{t.telegramReminderLabel}</span>
                    <FaChevronDown
                      className={`telegram-reminders__chevron${
                        isTelegramPanelCollapsed ? "" : " telegram-reminders__chevron--open"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <p className="telegram-reminders__hint">
                    {isTelegramConnected ? t.telegramReminderSuccess : t.telegramReminderDetail}
                  </p>
                  <div
                    className="telegram-reminders__content"
                    id="telegram-reminders-content"
                    hidden={isTelegramPanelCollapsed}
                    aria-hidden={isTelegramPanelCollapsed}
                  >
                    <TelegramConnect
                      strings={t}
                      defaultConnected={isTelegramConnected}
                      onConnected={handleTelegramConnected}
                      onBeforeConnect={triggerInteractBeep}
                    />
                  </div>
                </section>
              </>
            )}

            {/* === RPS === */}
            <section className="rps-wrap" style={{ marginTop: 24 }}>
              <h3 className="glowing-title">{t.rpsTitle}</h3>

              <div className="rps-grid">
                {CHOICES.map((c) => (
                  <ChoiceCard
                    key={c.k}
                    label={c.label}
                    src={c.img}
                    selected={choice === c.k}
                    onClick={() => handleSelectChoice(c.k)}
                  />
                ))}
              </div>

              <div id="actions-panel" className="actions-row" style={{ marginTop: 12 }}>
                <button onClick={() => commit()} disabled={!isConnected || !roomId || !isClient}>
                  {t.commit}
                </button>
                <button
                  onClick={() => reveal()}
                  disabled={!isConnected || !roomId || !activeCommitInfo || !isClient}
                >
                  {t.reveal}
                </button>
                <button onClick={() => claim()} disabled={!isConnected || !roomId || !isClient}>
                  {t.claim}
                </button>
                <button
                  className="btn-forfeit"
                  onClick={() => forfeit()}
                  disabled={!isConnected || !roomId || !isClient}
                >
                  {t.forfeit}
                </button>
              </div>

            </section>

            {/* Rooms */}
            <section style={{ marginTop: 24 }}>
              <div className="section-heading">
                <h3 className="glowing-title">{t.list}</h3>
                <button
                  type="button"
                  className={`icon-refresh-button section-heading__refresh${
                    isRefreshing ? " icon-refresh-button--spinning" : ""
                  }`}
                  onClick={handleManualRefresh}
                  title={refreshLabel}
                  aria-label={refreshLabel}
                  disabled={isRefreshing}
                >
                  <FaSyncAlt className="icon-refresh-button__icon" aria-hidden="true" />
                </button>
              </div>
              {visibleRooms.length === 0 ? (
                <p>{t.empty}</p>
              ) : (
                <div className="table-container">
                  <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>{t.creator}</th>
                      <th>{t.opponent}</th>
                      <th>{t.stakeCol}</th>
                      <th className="time-col">Time</th>
                      <th className="state-col">{t.stateCol}</th>
                      <th className="action-col">{t.actionCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRooms.map((r) => {
                      const meta = roomMeta.get(r.id);
                      const viewRoom = meta?.view ?? enhanceRoomDeadlines(r);
                      const avail = meta?.availability ?? availability(viewRoom, nowTs);
                      const viewerAddress = addressLower ?? "";
                      const isCreator = viewRoom.creator?.toLowerCase?.() === viewerAddress;
                      const isOpponent = viewRoom.opponent?.toLowerCase?.() === viewerAddress;
                      const isMyRoom = isCreator || isOpponent;
                      const viewerIsParticipant = isMyRoom;

                      let actionElement: React.ReactNode = <span className="badge">{STATE[viewRoom.state] || viewRoom.state}</span>;
                      const isFinalized = roomIsFinalized(viewRoom);
                      const finalOutcome = isFinalized ? deriveFinalOutcome(viewRoom) : null;
                      const creatorCommitted = !!viewRoom.commitA && viewRoom.commitA !== ZERO_COMMIT;
                      const opponentCommitted = !!viewRoom.commitB && viewRoom.commitB !== ZERO_COMMIT;
                      const creatorRevealed = Number(viewRoom.revealA) > 0;
                      const opponentRevealed = Number(viewRoom.revealB) > 0;
                      const viewerCommitted = isCreator
                        ? creatorCommitted
                        : isOpponent
                        ? opponentCommitted
                        : false;
                      const opponentHasCommitted = isCreator
                        ? opponentCommitted
                        : isOpponent
                        ? creatorCommitted
                        : false;
                      const viewerRevealed = isCreator
                        ? creatorRevealed
                        : isOpponent
                        ? opponentRevealed
                        : false;
                      const opponentHasRevealed = isCreator
                        ? opponentRevealed
                        : isOpponent
                        ? creatorRevealed
                        : false;
                      const bothPlayersMissedCommit = !creatorCommitted && !opponentCommitted;
                      const bothPlayersMissedReveal = !creatorRevealed && !opponentRevealed;
                      const canClaimCommit =
                        avail.claimable &&
                        avail.phase === "commit" &&
                        viewerIsParticipant &&
                        ((viewerCommitted && !opponentHasCommitted) || bothPlayersMissedCommit);
                      const canClaimReveal =
                        avail.claimable &&
                        avail.phase === "reveal" &&
                        viewerIsParticipant &&
                        ((viewerRevealed && !opponentHasRevealed) || bothPlayersMissedReveal);
                      const showTimer =
                        avail.deadline > 0 &&
                        (viewRoom.state === 1 || viewRoom.state === 2 || (viewRoom.state === 0 && viewRoom.opponent === ZERO_ADDR));
                      const timeCell = showTimer ? (
                        <span>{formatTimeLeft(avail.deadline, { timeout: t.timeout }, nowTs)}</span>
                      ) : (
                        <span>-</span>
                      );

                        if (isFinalized) {
                          const outcome = finalOutcome ?? { winner: null, via: "unknown" as FinalOutcomeVia };
                          let viewerWon =
                            (outcome.winner === "creator" && isCreator) ||
                            (outcome.winner === "opponent" && isOpponent);
                          let viewerLost =
                            (outcome.winner === "creator" && isOpponent) ||
                            (outcome.winner === "opponent" && isCreator);

                          const neutralTimeoutLabel = (reason: string, drawLabel: string) => {
                            if (outcome.winner === "draw" || outcome.winner === null) {
                              return { className: "badge draw", label: drawLabel };
                            }
                            const winnerLabel = outcome.winner === "creator" ? t.creator : t.opponent;
                            return { className: "badge win", label: `${winnerLabel} · ${reason}` };
                          };

                          if (outcome.via === "normal") {
                            let badgeClass = "badge draw";
                            let label: string = t.draw;
                            if (outcome.winner === "creator" || outcome.winner === "opponent") {
                              if (viewerWon) {
                                badgeClass = "badge win";
                                label = t.win;
                              } else if (viewerLost) {
                                badgeClass = "badge lose";
                                label = t.lose;
                              } else {
                                const winnerLabel = outcome.winner === "creator" ? t.creator : t.opponent;
                                badgeClass = "badge win";
                                label = `${winnerLabel} ${t.win}`;
                              }
                            }
                            actionElement = <span className={badgeClass}>{label}</span>;
                          } else if (outcome.via === "commit-timeout") {
                            if (viewerWon) {
                              actionElement = <span className="badge win">{t.tableWinTimeoutCommit}</span>;
                            } else if (viewerLost) {
                              actionElement = <span className="badge lose">{t.tableLoseTimeoutCommit}</span>;
                            } else {
                              const neutral = neutralTimeoutLabel(
                                t.tableReasonMissedCommit,
                                t.tableDrawTimeoutCommit
                              );
                              actionElement = <span className={neutral.className}>{neutral.label}</span>;
                            }
                          } else if (outcome.via === "reveal-timeout") {
                            if (viewerWon) {
                              actionElement = <span className="badge win">{t.tableWinTimeoutReveal}</span>;
                            } else if (viewerLost) {
                              actionElement = <span className="badge lose">{t.tableLoseTimeoutReveal}</span>;
                            } else {
                              const neutral = neutralTimeoutLabel(
                                t.tableReasonMissedReveal,
                                t.tableDrawTimeoutReveal
                              );
                              actionElement = <span className={neutral.className}>{neutral.label}</span>;
                            }
                          } else if (outcome.via === "forfeit") {
                            const perspective = determineForfeitViewerResult(resolveForfeitOutcome(viewRoom), {
                              viewerAddress: addressLower,
                              creator: viewRoom.creator ?? null,
                              opponent: viewRoom.opponent ?? null,
                            });
                            viewerWon = perspective.viewerWon;
                            viewerLost = perspective.viewerLost;
                            const forfeitStatus = viewerWon
                              ? `${t.win} - ${t.forfeit}`
                              : viewerLost
                              ? `${t.lose} - ${t.forfeit}`
                              : t.forfeit;
                            const badgeClass = viewerWon
                              ? "badge win"
                              : viewerLost
                              ? "badge lose"
                              : "badge forfeit";
                            actionElement = <span className={badgeClass}>{forfeitStatus}</span>;
                          } else if (outcome.via === "both-commit-timeout") {
                            actionElement = <span className="badge draw">{t.tableDrawTimeoutCommit}</span>;
                          } else if (outcome.via === "both-reveal-timeout") {
                            actionElement = <span className="badge draw">{t.tableDrawTimeoutReveal}</span>;
                          } else {
                            actionElement = <span className="badge win">{t.finished}</span>;
                          }
                        } else if (viewRoom.state === 0 && viewRoom.opponent === ZERO_ADDR) {
                          if (avail.expired || avail.claimable) {
                            if (isCreator) {
                              actionElement = (
                                <button
                                  className="table-action-button"
                                  onClick={() => {
                                    const target = viewRoom.id.toString();
                                    setRoomId(target);
                                    void claim(target);
                                  }}
                                >
                                  {t.claim}
                                </button>
                              );
                            } else {
                              actionElement = <span className="badge lose">{t.canceled}</span>;
                            }
                          } else if (!isCreator) {
                            actionElement = (
                              <button
                                className="table-action-button"
                                onClick={() => {
                                  const target = viewRoom.id.toString();
                                  void join(target);
                                }}
                                disabled={!isConnected || !isClient}
                              >
                                {t.join}
                              </button>
                            );
                          } else {
                            actionElement = <span>{t.personalStatusWaitingJoin}</span>;
                          }
                        } else if (viewRoom.state === 1) {
                          const needCommit = viewerIsParticipant && !viewerCommitted;

                          if (canClaimCommit) {
                            actionElement = (
                              <button
                                className="table-action-button"
                                onClick={() => {
                                  const target = viewRoom.id.toString();
                                  setRoomId(target);
                                  void claim(target);
                                }}
                              >
                                {t.claim}
                              </button>
                            );
                          } else if (needCommit) {
                            actionElement = (
                              <button
                                className="table-action-button"
                                onClick={() => {
                                  const target = viewRoom.id.toString();
                                  setRoomId(target);
                                  void commit(target);
                                }}
                              >
                                {t.commit}
                              </button>
                            );
                          } else if (viewRoom.commitA !== ZERO_COMMIT && viewRoom.commitB !== ZERO_COMMIT) {
                            actionElement = <span className="badge primary">{t.waitingReveal}</span>;
                          } else if (viewerIsParticipant) {
                            actionElement = (
                              <span>{`${t.committing} (${formatTimeLeft(viewRoom.commitDeadline, t, nowTs)})`}</span>
                            );
                          } else {
                            actionElement = <span>—</span>;
                          }
                        } else if (viewRoom.state === 2) {
                          const needReveal = viewerIsParticipant && !viewerRevealed;

                          if (canClaimReveal) {
                            actionElement = (
                              <button
                                className="table-action-button"
                                onClick={() => {
                                  const target = viewRoom.id.toString();
                                  setRoomId(target);
                                  void claim(target);
                                }}
                              >
                                {t.claim}
                              </button>
                            );
                          } else if (needReveal) {
                            actionElement = (
                              <button
                                className="table-action-button"
                                onClick={() => {
                                  const target = viewRoom.id.toString();
                                  setRoomId(target);
                                  void reveal(target);
                                }}
                              >
                                {t.reveal}
                              </button>
                            );
                          } else if (viewRoom.revealA !== 0 && viewRoom.revealB !== 0) {
                            actionElement = <span className="badge primary">{t.revealing}</span>;
                          } else if (viewerIsParticipant) {
                            actionElement = (
                              <span>{`${t.revealing} (${formatTimeLeft(viewRoom.revealDeadline, t, nowTs)})`}</span>
                            );
                          } else {
                            actionElement = <span>—</span>;
                          }
                        } else if (viewRoom.state === 4) {
                          actionElement = <span className="badge lose">{t.canceled}</span>;
                        }

                      const canForfeit =
                        viewerIsParticipant &&
                        (viewRoom.state === 1 || viewRoom.state === 2) &&
                        viewRoom.opponent !== ZERO_ADDR &&
                        !resolveForfeitOutcome(viewRoom);
                      if (canForfeit) {
                        const forfeitButton = (
                          <button
                            className="table-action-button danger"
                            onClick={() => {
                              const target = viewRoom.id.toString();
                              setRoomId(target);
                              void forfeit(target);
                            }}
                          >
                            {t.forfeit}
                          </button>
                        );
                        const isDashPlaceholder = (() => {
                          if (!isValidElement(actionElement)) return false;
                          if (actionElement.type !== "span") return false;

                          const { children } = actionElement.props as {
                            children?: unknown;
                          };

                          return typeof children === "string" && children.trim() === "—";
                        })();
                        if (isDashPlaceholder) {
                          actionElement = forfeitButton;
                        } else {
                          actionElement = (
                            <div className="table-action-group">
                              {actionElement}
                              {forfeitButton}
                            </div>
                          );
                        }
                      }

                        return (
                          <tr key={viewRoom.id} className={isMyRoom ? "my-room" : ""}>
                            <td>{viewRoom.id}</td>
                            <td className="address-cell">
                              <span>{`${viewRoom.creator.slice(0, 6)}...${viewRoom.creator.slice(-4)}`}</span>
                              <button
                                className="copy-btn"
                                onClick={async () => {
                                  const ok = await copyToClipboard(viewRoom.creator);
                                  if (ok) showToast("success", `${t.addressCol} ${t.copyAddress.toLowerCase()}!`);
                                  else showToast("error", "Copy failed.");
                                }}
                              >
                                {t.copyAddress}
                              </button>
                            </td>
                            <td className="address-cell">
                              {viewRoom.opponent === ZERO_ADDR ? (
                                "-"
                              ) : (
                                <>
                                  <span>{`${viewRoom.opponent.slice(0, 6)}...${viewRoom.opponent.slice(-4)}`}</span>
                                  <button
                                    className="copy-btn"
                                    onClick={async () => {
                                      const ok = await copyToClipboard(viewRoom.opponent);
                                      if (ok) showToast("success", `${t.addressCol} ${t.copyAddress.toLowerCase()}!`);
                                      else showToast("error", "Copy failed.");
                                    }}
                                  >
                                    {t.copyAddress}
                                  </button>
                                </>
                              )}
                            </td>
                            <td>${Number(viewRoom.stake) / 10 ** decimals}</td>
                            <td className="time-col">{timeCell}</td>
                            <td className="state-col">
                              <div
                                style={{ display: "flex", gap: 6, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}
                              >
                                {viewRoom.state === 0 && avail.expired && <span className="badge lose">{t.expired}</span>}
                                {avail.label === "Joinable" && avail.live && (
                                  <span className="badge primary">{t.joinable}</span>
                                )}
                                {avail.live && (viewRoom.state === 1 || viewRoom.state === 2) && (
                                  <span className="badge warning">{t.live}</span>
                                )}
                                {isFinalized && <span className="badge win">{t.finished}</span>}
                                {!isFinalized && viewRoom.state === 4 && <span className="badge lose">{t.canceled}</span>}
                              </div>
                            </td>
                            <td className="action-col">{actionElement}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>

          {/* Cột phụ (Luật chơi) */}
          <div>
            <div className="rules-panel" style={{ marginTop: "0" }}>
              <h3 className="glowing-title">{t.rules}</h3>
              <p className="rules-warning">
                <span className="rules-warning__icon" aria-hidden="true">
                  ⚠️
                </span>
                <span>{t.rulesWarning}</span>
              </p>
              <ul>
                {t.rulesList.map((rule, index) => (
                  <li key={index} className={`rule-item ${RULE_ACCENTS[index]?.className ?? ""}`}>
                    <span className="rule-icon" aria-hidden="true">
                      {RULE_ACCENTS[index]?.icon ?? "•"}
                    </span>
                    <span className="rule-text" dangerouslySetInnerHTML={{ __html: rule }} />
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 20, paddingTop: 12, borderTop: "1px dashed var(--line)" }}>
                <h3 style={{ fontSize: "1.1rem", margin: "0 0 8px" }}>{t.communityLinksTitle}</h3>
                <ul className="community-links">
                  <li>
                    <a
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => triggerInteractBeep()}
                    >
                      <IconTelegram width={18} height={18} />
                      <span>{t.communityLinkTelegramLabel}</span>
                    </a>
                    <span>{t.communityLinkTelegramDesc}</span>
                  </li>
                  <li>
                    <a
                      href={X_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => triggerInteractBeep()}
                    >
                      <IconX width={18} height={18} />
                      <span>{t.communityLinkXLabel}</span>
                    </a>
                    <span>{t.communityLinkXDesc}</span>
                  </li>
                  <li>
                    <a
                      href={docsLink}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => triggerInteractBeep()}
                    >
                      <IconDocs width={18} height={18} />
                      <span>{t.communityLinkDocsLabel}</span>
                    </a>
                    <span>{t.communityLinkDocsDesc}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer-credit">{t.footer}</footer>
      </div>
      <FloatingSettings
        lang={lang as keyof typeof langs}
        onLangChange={handleLangChange}
        notificationsEnabled={notificationsEnabled}
        onNotificationsToggle={handleNotificationsToggle}
        vibrationMs={vibrationMs}
        onVibrationChange={handleVibrationChange}
        snoozeMinutes={notificationSnoozeMinutes}
        onSnoozeChange={(value) => {
          setNotificationSnoozeMinutes(value);
        }}
        uiScale={uiScale}
        onUiScaleChange={handleUiScaleChange}
        theme={theme}
        onThemeChange={setTheme}
        telegramHandle={TELEGRAM_BOT_USERNAME}
        xHandle={X_HANDLE}
        onInteract={triggerInteractBeep}
        onScreenshot={captureFloatingScreenshot}
        onReset={handleResetSite}
        historyLookupId={historyLookupId}
        onHistoryLookupIdChange={setHistoryLookupId}
        historyLookupState={historyLookupState}
        onHistoryLookup={handleHistoryLookup}
        onCopyAddress={handleHistoryCopy}
      />
    </main>
  );
}