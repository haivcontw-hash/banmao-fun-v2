// lib/themes.ts
export type ThemeKey =
  | "gold"
  | "white"
  | "crimson"
  | "emerald"
  | "pink"
  | "orange"
  | "purple";

export type ThemeOption = {
  key: ThemeKey;
  icon: string;
  preview: [string, string];
};

export const THEME_OPTIONS: ThemeOption[] = [
  { key: "gold", icon: "⭐", preview: ["#FFD700", "#FFB300"] },
  { key: "white", icon: "✨", preview: ["#FFFFFF", "#D9D9D9"] },
  { key: "crimson", icon: "🔥", preview: ["#FF4D4F", "#D9363E"] },
  { key: "emerald", icon: "🌿", preview: ["#00FF9D", "#1ECF5C"] },
  { key: "pink", icon: "💗", preview: ["#FF6EC7", "#E94FA2"] },
  { key: "orange", icon: "🌇", preview: ["#FF9A4C", "#FF6A00"] },
  { key: "purple", icon: "🔮", preview: ["#A077FF", "#7A4DFF"] },
];

export const DEFAULT_THEME: ThemeKey = "gold";

export const THEME_KEYS: ThemeKey[] = THEME_OPTIONS.map((option) => option.key);

export const isThemeKey = (value: string): value is ThemeKey =>
  THEME_KEYS.includes(value as ThemeKey);