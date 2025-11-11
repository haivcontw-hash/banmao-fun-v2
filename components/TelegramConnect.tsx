"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import type { LocaleStrings } from "../lib/i18n";
import { TELEGRAM_BOT_USERNAME, TELEGRAM_TOKEN_ENDPOINT } from "../lib/telegram";
import { IconTelegram } from "./Icons";

interface TelegramConnectProps {
  strings: LocaleStrings;
  defaultConnected?: boolean;
  onBeforeConnect?: () => void;
  onConnected?: () => void;
}

interface GenerateTokenResponse {
  token?: string;
}

export default function TelegramConnect({
  strings,
  defaultConnected = false,
  onBeforeConnect,
  onConnected,
}: TelegramConnectProps) {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasConnected, setHasConnected] = useState(defaultConnected);

  useEffect(() => {
    setHasConnected(defaultConnected);
  }, [defaultConnected]);

  const buttonLabel = useMemo(
    () => (isLoading ? strings.telegramReminderLoading : strings.telegramReminderLink),
    [isLoading, strings.telegramReminderLink, strings.telegramReminderLoading]
  );

  const handleConnect = useCallback(async () => {
    onBeforeConnect?.();

    if (!isConnected || !address) {
      setError(strings.telegramReminderWalletRequired);
      return;
    }

    setIsLoading(true);
    setError(null);

    const pendingWindow =
      typeof window !== "undefined"
        ? window.open("about:blank", "_blank", "noopener,noreferrer")
        : null;

    try {
      if (typeof window !== "undefined" && pendingWindow === null) {
        throw new Error("POPUP_BLOCKED");
      }

      const response = await fetch(TELEGRAM_TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress: address }),
      });

      if (!response.ok) {
        throw new Error("SERVER_ERROR");
      }

      const data = (await response.json()) as GenerateTokenResponse;
      if (!data?.token) {
        throw new Error("TOKEN_MISSING");
      }

      const telegramUrl = `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${encodeURIComponent(data.token)}`;

      if (pendingWindow) {
        pendingWindow.location.href = telegramUrl;
      } else if (typeof window !== "undefined") {
        window.open(telegramUrl, "_blank", "noopener,noreferrer");
      }

      setHasConnected(true);
      setError(null);
      onConnected?.();
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        if (err.message === "SERVER_ERROR") {
          setError(strings.telegramReminderServerError);
        } else if (err.message === "TOKEN_MISSING") {
          setError(strings.telegramReminderServerError);
        } else if (err.message === "POPUP_BLOCKED") {
          setError(strings.telegramReminderPopupBlocked ?? strings.telegramReminderUnknownError);
        } else {
          setError(strings.telegramReminderUnknownError);
        }
      } else {
        setError(strings.telegramReminderUnknownError);
      }

      if (pendingWindow && typeof pendingWindow.close === "function") {
        pendingWindow.close();
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    address,
    strings.telegramReminderPopupBlocked,
    isConnected,
    onBeforeConnect,
    onConnected,
    strings.telegramReminderServerError,
    strings.telegramReminderUnknownError,
    strings.telegramReminderWalletRequired,
  ]);

  const message = hasConnected ? strings.telegramReminderSuccess : strings.telegramReminderDetail;
  const messageClassName = hasConnected
    ? "telegram-connect-box__message telegram-connect-box__message--success"
    : "telegram-connect-box__message";

  return (
    <div className="telegram-connect-box">
      <p className="telegram-connect-box__title">
        <IconTelegram width={18} height={18} />
        <span>{strings.telegramReminderLabel}</span>
      </p>
      <button
        type="button"
        className="telegram-connect-box__button"
        onClick={handleConnect}
        disabled={isLoading || !isConnected}
        aria-busy={isLoading}
        title={!isConnected ? strings.telegramReminderWalletRequired : undefined}
      >
        {buttonLabel}
      </button>
      <p className={messageClassName} aria-live="polite">
        {message}
      </p>
      {error ? (
        <p className="telegram-connect-box__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
