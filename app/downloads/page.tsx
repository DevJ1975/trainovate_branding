import { TCard, TBadge, TButton } from "@/components/kit";
import { PageShell, SectionHead } from "@/components/PageShell";

const ROWS: { group: string; items: { name: string; format: string; size?: string; href?: string }[] }[] = [
  {
    group: "Identity",
    items: [
      { name: "Logo lockup · horizontal · ink",   format: "SVG · PDF · PNG", size: "12 KB", href: "#" },
      { name: "Logo lockup · horizontal · bone",  format: "SVG · PDF · PNG", size: "12 KB", href: "#" },
      { name: "Logo lockup · stacked · ink",      format: "SVG · PDF · PNG", size: "11 KB", href: "#" },
      { name: "Mark only · all variants",         format: "SVG · PDF · PNG", size: "8 KB",  href: "#" },
      { name: "Animated mark",                    format: "GIF · WEBM · SVG", size: "62 KB", href: "#" },
      { name: "Favicon set",                      format: "ICO · PNG (32/192/512)", size: "14 KB", href: "#" },
    ],
  },
  {
    group: "Type",
    items: [
      { name: "Inter Tight · web (woff2)",        format: "5 weights", size: "180 KB", href: "#" },
      { name: "JetBrains Mono · web (woff2)",     format: "3 weights", size: "118 KB", href: "#" },
    ],
  },
  {
    group: "UI Kit",
    items: [
      { name: "Web · React + TS",                 format: "Source", href: "#" },
      { name: "React Native",                     format: "Source", href: "#" },
      { name: "SwiftUI",                          format: "Source", href: "#" },
      { name: "UIKit",                            format: "Source", href: "#" },
      { name: "Design tokens (single JSON)",      format: ".json",  size: "6 KB", href: "#" },
    ],
  },
  {
    group: "Templates",
    items: [
      { name: "Letterhead · Word (.docx)",        format: "8.5 × 11 · A4", href: "#" },
      { name: "Letterhead · Google Docs",         format: "HTML import",   href: "#" },
      { name: "Business card front + back",       format: "PDF · print",   href: "#" },
      { name: "Email signature",                  format: "HTML snippet",  href: "#" },
      { name: "Slide master · PowerPoint",        format: ".pptx",         href: "#" },
      { name: "Zoom backgrounds (cobalt + ink)",  format: "PNG 1920×1080", href: "#" },
    ],
  },
  {
    group: "Code",
    items: [
      { name: "Brand Hub · Next.js source",       format: ".zip", href: "#" },
      { name: "Tailwind preset",                  format: "@trainovate/tailwind", href: "#" },
      { name: "Tokens · CSS / TS / Swift / RN",   format: "Multi", href: "#" },
    ],
  },
];

export default function DownloadsPage() {
  const total = ROWS.reduce((n, g) => n + g.items.length, 0);
  return (
    <PageShell
      eyebrow="07 · Downloads"
      title={<>Every artefact,<br/>in one matrix.</>}
      lede={`${total} downloadable assets across identity, type, UI kits, templates, and code.`}
    >
      {ROWS.map((g) => (
        <div key={g.group}>
          <SectionHead title={g.group} count={`${g.items.length} ITEMS`} />
          <TCard elevated className="!p-0 overflow-hidden">
            <div className="divide-y divide-[rgba(10,10,10,0.06)]">
              {g.items.map((it) => (
                <div key={it.name} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 py-3.5 hover:bg-[var(--t-bg-inset)] transition-colors">
                  <div>
                    <p className="font-semibold text-sm">{it.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45 mt-0.5">{it.format}</p>
                  </div>
                  {it.size && <span className="font-mono text-[11px] text-ink/55">{it.size}</span>}
                  <TBadge tone="neutral">Asset</TBadge>
                  <TButton size="sm" variant="secondary">Download</TButton>
                </div>
              ))}
            </div>
          </TCard>
        </div>
      ))}
    </PageShell>
  );
}
