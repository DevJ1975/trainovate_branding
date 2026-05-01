"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeName = "light" | "dark" | "hc";
type ThemePref = ThemeName | "auto";

interface ThemeContextValue {
  theme: ThemeName;          // resolved (always concrete)
  pref: ThemePref;           // user preference (may be "auto")
  setPref: (t: ThemePref) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  pref: "auto",
  setPref: () => {},
});

const STORAGE_KEY = "tv-theme";

function resolve(pref: ThemePref): ThemeName {
  if (pref === "auto") {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  }
  return pref;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [pref, setPrefState] = useState<ThemePref>("auto");
  const [theme, setTheme] = useState<ThemeName>("light");

  // Initial read from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemePref | null;
      const initial: ThemePref = stored && ["light", "dark", "hc", "auto"].includes(stored) ? stored : "auto";
      setPrefState(initial);
      setTheme(resolve(initial));
    } catch {}
  }, []);

  // React to prefers-color-scheme when in auto
  useEffect(() => {
    if (pref !== "auto") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setTheme(resolve("auto"));
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [pref]);

  // Apply theme to <html data-theme="...">
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setPref = (next: ThemePref) => {
    setPrefState(next);
    setTheme(resolve(next));
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, pref, setPref }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
