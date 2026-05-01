/**
 * Trainovate · design tokens (TypeScript source of truth)
 *
 * Edit the values here and they propagate everywhere — Tailwind theme,
 * components, and the UI kit's runtime CSS variables.
 */

export const palette = {
  ink: "#0A0A0A",
  bone: "#F4F1EA",
  paper: "#FFFFFF",
  cobalt: {
    DEFAULT: "#0046E6",
    50: "#F2F5FE",
    100: "#E5EBFC",
    200: "#C2CFF8",
    300: "#6A8FF0",
    400: "#3366EB",
    500: "#0046E6",
    600: "#003ECC",
    700: "#0036B5",
    800: "#002A8C",
    900: "#001E63",
  },
  signal: "#FF3B30",
  success: "#2F6B4F",
  warning: "#B97700",
  neutral: {
    50: "#FAFAFA",
    100: "#F4F4F4",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0A0A0A",
  },
} as const;

export const type = {
  family: {
    sans: '"Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "SFMono-Regular", Consolas, Menlo, monospace',
  },
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
} as const;

export const space = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s7: 32,
  s8: 48,
  s9: 64,
  s10: 96,
} as const;

export const radius = { sm: 3, md: 6, lg: 16, xl: 24, pill: 999 } as const;

export const shadow = {
  sm: "0 1px 2px rgba(10,10,10,0.06)",
  md: "0 4px 12px rgba(10,10,10,0.08), 0 1px 2px rgba(10,10,10,0.04)",
  lg: "0 12px 32px -8px rgba(10,10,10,0.14), 0 4px 8px rgba(10,10,10,0.04)",
  xl: "0 24px 48px -16px rgba(10,10,10,0.18), 0 8px 16px rgba(10,10,10,0.06)",
  cobalt: "0 8px 32px -8px rgba(0,70,230,0.35)",
  focus: "0 0 0 3px rgba(0,70,230,0.15)",
} as const;

export const motion = {
  fast: 120,
  base: 220,
  slow: 400,
  ease: "cubic-bezier(0.4, 0, 0.2, 1)",
  emphasis: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

export type ThemeName = "light" | "dark" | "hc";
export type Theme = "light" | "dark" | "hc" | "auto";

const tokens = { palette, type, space, radius, shadow, motion };
export default tokens;
