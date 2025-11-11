// lib/telegram.ts

export const TELEGRAM_API_BASE_URL = "http://103.75.183.59:3000";
export const TELEGRAM_TOKEN_ENDPOINT = `${TELEGRAM_API_BASE_URL}/api/generate-token`;
export const TELEGRAM_STATUS_ENDPOINT = `${TELEGRAM_API_BASE_URL}/api/check-status`;
export const TELEGRAM_BOT_USERNAME = "banmao_rps_bot";
export const TELEGRAM_CONNECTION_STORAGE_KEY = "banmao_telegram_connected";
export const TELEGRAM_LEGACY_USERNAME_STORAGE_KEY = "banmao_telegram_username";

export function buildTelegramConnectionKey(account: string | null | undefined) {
  if (!account) return TELEGRAM_CONNECTION_STORAGE_KEY;
  return `${TELEGRAM_CONNECTION_STORAGE_KEY}_${account.toLowerCase()}`;
}
