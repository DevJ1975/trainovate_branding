"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * IntroGate — only loads the three.js intro on first home visit per
 * session. Adds `tv-intro-playing` to <html> so we can lock body scroll
 * while the reveal runs.
 */

const Intro = dynamic(
  () => import("./Intro").then((m) => ({ default: m.Intro })),
  { ssr: false }
);

const KEY = "tv-intro-shown";

export function IntroGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
    setShow(true);
    document.documentElement.classList.add("tv-intro-playing");
  }, []);

  function done() {
    setShow(false);
    document.documentElement.classList.remove("tv-intro-playing");
  }

  if (!show) return null;
  return <Intro onDone={done} />;
}
