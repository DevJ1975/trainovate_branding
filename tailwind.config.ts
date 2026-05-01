import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./pages/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: "#000000",
      ink: "#0A0A0A",
      bone: "#F4F1EA",
      signal: "#FF3B30",
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
    },
    fontFamily: {
      sans: ['"Inter Tight"', "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      mono: ['"JetBrains Mono"', "SFMono-Regular", "Consolas", "Menlo", "monospace"],
      display: ['"Inter Tight"', "sans-serif"],
    },
    fontSize: {
      xs: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.06em" }],
      sm: ["0.8125rem", { lineHeight: "1.5" }],
      base: ["1rem", { lineHeight: "1.5" }],
      md: ["1.125rem", { lineHeight: "1.5" }],
      lg: ["1.5rem", { lineHeight: "1.2" }],
      xl: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
      "2xl": ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      "3xl": ["4rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
      "4xl": ["5.5rem", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
    },
    extend: {
      borderRadius: {
        DEFAULT: "6px",
        sm: "3px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(10,10,10,0.06)",
        DEFAULT: "0 4px 12px rgba(10,10,10,0.08), 0 1px 2px rgba(10,10,10,0.04)",
        md: "0 12px 32px -8px rgba(10,10,10,0.14), 0 4px 8px rgba(10,10,10,0.04)",
        lg: "0 24px 48px -16px rgba(10,10,10,0.18), 0 8px 16px rgba(10,10,10,0.06)",
        cobalt: "0 8px 32px -8px rgba(0,70,230,0.35)",
        focus: "0 0 0 3px rgba(0,70,230,0.15)",
      },
      transitionTimingFunction: {
        emphasis: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        DEFAULT: "220ms",
        slow: "400ms",
      },
      maxWidth: {
        container: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
