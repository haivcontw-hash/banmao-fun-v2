// lib/ui-scale.ts
export type UiScale = "xsmall" | "small" | "normal" | "large" | "desktop";

export const UI_SCALE_ORDER: UiScale[] = ["xsmall", "small", "normal", "large", "desktop"];

export const UI_SCALE_PRESET_FACTORS: Record<UiScale, number> = {
  xsmall: 0.38,
  small: 0.55,
  normal: 1,
  large: 1.18,
  desktop: 1.32,
};

export const MIN_AUTO_UI_SCALE = 0.32;
export const MAX_MANUAL_UI_SCALE = UI_SCALE_PRESET_FACTORS.desktop;

export const getPresetUiScaleFactor = (scale: UiScale): number => UI_SCALE_PRESET_FACTORS[scale] ?? 1;

export const clampAutoUiScaleFactor = (value: number): number => {
  if (!Number.isFinite(value)) return 1;
  if (value < MIN_AUTO_UI_SCALE) return MIN_AUTO_UI_SCALE;
  if (value > 1) return 1;
  return value;
};

export const deriveUiScaleLabel = (factor: number): UiScale => {
  if (!Number.isFinite(factor)) return "normal";
  if (factor <= 0.42) return "xsmall";
  if (factor <= 0.62) return "small";
  if (factor <= 1.08) return "normal";
  if (factor <= 1.22) return "large";
  return "desktop";
};
