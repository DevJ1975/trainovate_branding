"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { BrandMark } from "./Brand";

const NAV = [
  { href: "/",           label: "Home",       num: "01" },
  { href: "/identity",   label: "Identity",   num: "02" },
  { href: "/brand",      label: "Brand",      num: "03" },
  { href: "/ui-kit",     label: "UI Kit",     num: "04" },
  { href: "/templates",  label: "Templates",  num: "05" },
  { href: "/developers", label: "Developers", num: "06" },
  { href: "/downloads",  label: "Downloads",  num: "07" },
  { href: "/screensaver", label: "Screensaver", num: "08" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-ink text-bone transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container-tv flex items-center gap-8 py-3.5">
        <Link href="/" className="flex items-center gap-3 group">
          <BrandMark tone="bone" size={26} />
          <span className="font-semibold tracking-tight text-base">Trainovate<span className="font-medium text-bone/50">.ai</span></span>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-bone/50 hidden md:inline">
            Brand Hub
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-6 overflow-x-auto">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 py-1.5 text-sm transition-colors whitespace-nowrap ${
                  active ? "text-bone" : "text-bone/55 hover:text-bone"
                }`}
              >
                <span className="font-mono text-[10px] tracking-[0.12em] text-bone/40">
                  {item.num}
                </span>
                {item.label}
                {active && (
                  <span className="absolute -bottom-3.5 left-0 right-0 h-[2px] bg-cobalt" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
