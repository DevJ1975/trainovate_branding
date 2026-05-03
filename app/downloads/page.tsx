import { TCard, TBadge, TButton } from "@/components/kit";
import { PageShell, SectionHead } from "@/components/PageShell";

type Item = { name: string; format: string; size?: string; href?: string };
type Row = { group: string; items: Item[] };

const ROWS: Row[] = [
  {
    group: "Identity",
    items: [
      { name: "Logo lockup · horizontal · ink", format: "SVG", size: "1 KB",   href: "/brand/trainovate-lockup-horizontal-ink.svg" },
      { name: "Logo lockup · stacked · ink",    format: "SVG", size: "1 KB",   href: "/brand/trainovate-lockup-stacked-ink.svg" },
      { name: "Mark · ink",                     format: "SVG", size: "1 KB",   href: "/brand/trainovate-mark-ink.svg" },
      { name: "Mark · cobalt",                  format: "SVG", size: "1 KB",   href: "/brand/trainovate-mark-cobalt.svg" },
      { name: "Mark · light",                   format: "SVG", size: "1 KB",   href: "/brand/trainovate-mark-light.svg" },
      { name: "Animated mark · raster exports", format: "GIF · MP4" },
      { name: "Favicon · 32px",                 format: "PNG", size: "1 KB",   href: "/brand/favicon-32.png" },
      { name: "Favicon · 192px",                format: "PNG", size: "6 KB",   href: "/brand/favicon-192.png" },
      { name: "Favicon · 512px",                format: "PNG", size: "20 KB",  href: "/brand/favicon-512.png" },
    ],
  },
  {
    group: "Type",
    items: [
      { name: "Inter Tight · 400 Regular",      format: "WOFF2", size: "22 KB", href: "/fonts/InterTight-400.woff2" },
      { name: "Inter Tight · 500 Medium",       format: "WOFF2", size: "22 KB", href: "/fonts/InterTight-500.woff2" },
      { name: "Inter Tight · 600 Semibold",     format: "WOFF2", size: "22 KB", href: "/fonts/InterTight-600.woff2" },
      { name: "Inter Tight · 700 Bold",         format: "WOFF2", size: "22 KB", href: "/fonts/InterTight-700.woff2" },
      { name: "Inter Tight · 800 Extrabold",    format: "WOFF2", size: "22 KB", href: "/fonts/InterTight-800.woff2" },
      { name: "JetBrains Mono · 400 Regular",   format: "WOFF2", size: "21 KB", href: "/fonts/JetBrainsMono-400.woff2" },
      { name: "JetBrains Mono · 500 Medium",    format: "WOFF2", size: "21 KB", href: "/fonts/JetBrainsMono-500.woff2" },
      { name: "JetBrains Mono · 700 Bold",      format: "WOFF2", size: "21 KB", href: "/fonts/JetBrainsMono-700.woff2" },
    ],
  },
  {
    group: "Tokens",
    items: [
      { name: "Design tokens",                  format: "JSON", size: "7 KB", href: "/tokens.json" },
    ],
  },
  {
    group: "UI Kit",
    items: [
      { name: "Web · React + TS",               format: "Source" },
      { name: "React Native",                   format: "Source" },
      { name: "SwiftUI",                        format: "Source" },
      { name: "UIKit",                          format: "Source" },
    ],
  },
  {
    group: "Templates",
    items: [
      { name: "Letterhead · Word (.docx)",      format: "8.5 × 11 · A4" },
      { name: "Letterhead · Google Docs",       format: "HTML import" },
      { name: "Business card front + back",     format: "PDF · print" },
      { name: "Email signature",                format: "HTML snippet" },
      { name: "Slide master · PowerPoint",      format: ".pptx" },
      { name: "Zoom backgrounds (cobalt + ink)", format: "PNG 1920×1080" },
    ],
  },
];

export default function DownloadsPage() {
  const total = ROWS.reduce((n, g) => n + g.items.length, 0);
  const ready = ROWS.reduce((n, g) => n + g.items.filter((i) => i.href).length, 0);

  return (
    <PageShell
      eyebrow="07 · Downloads"
      title={<>Every artefact,<br/>in one matrix.</>}
      lede={`${ready} of ${total} assets ready to download across identity, type, UI kits, templates, and code.`}
    >
      {ROWS.map((g) => (
        <div key={g.group} id={g.group.toLowerCase()} className="scroll-mt-24">
          <SectionHead title={g.group} count={`${g.items.length} ITEMS`} />
          <TCard elevated className="!p-0 overflow-hidden">
            <div className="divide-y divide-[rgba(10,10,10,0.06)]">
              {g.items.map((it) => (
                <div key={it.name} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 py-3.5 hover:bg-[var(--t-bg-inset)] transition-colors">
                  <div>
                    <p className="font-semibold text-sm">{it.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45 mt-0.5">{it.format}</p>
                  </div>
                  <span className="font-mono text-[11px] text-ink/55 min-w-[3rem] text-right">{it.size ?? ""}</span>
                  {it.href ? (
                    <TBadge tone="neutral">Asset</TBadge>
                  ) : (
                    <TBadge tone="neutral">Soon</TBadge>
                  )}
                  {it.href ? (
                    <a
                      href={it.href}
                      download
                      className="t-btn t-btn--secondary t-btn--sm no-underline"
                    >
                      Download
                    </a>
                  ) : (
                    <TButton size="sm" variant="secondary" disabled>
                      Coming soon
                    </TButton>
                  )}
                </div>
              ))}
            </div>
          </TCard>
        </div>
      ))}
    </PageShell>
  );
}
