import Link from "next/link";
import { TCard, TBadge, TButton, TAlert } from "@/components/kit";
import { PageShell, SectionHead } from "@/components/PageShell";

const TOKENS = [
  { token: "--tv-ink",       value: "#0A0A0A", role: "Primary text · dark surfaces" },
  { token: "--tv-bone",      value: "#F4F1EA", role: "Default page background" },
  { token: "--tv-paper",     value: "#FFFFFF", role: "Card surfaces in light mode" },
  { token: "--tv-cobalt",    value: "#0046E6", role: "Brand action · links · focus" },
  { token: "--tv-cobalt-700",value: "#0036B5", role: "Hover & pressed states" },
  { token: "--tv-cobalt-100",value: "#E5EBFC", role: "Tinted backgrounds" },
  { token: "--tv-signal",    value: "#FF3B30", role: "Errors only" },
  { token: "--tv-radius",    value: "6px",     role: "Default border radius" },
  { token: "--tv-radius-lg", value: "16px",    role: "Card / panel radius" },
  { token: "--tv-shadow",    value: "0 4px 12px rgba(10,10,10,.08)", role: "Default elevation" },
  { token: "--tv-dur",       value: "220ms",   role: "Default duration" },
  { token: "--tv-ease",      value: "cubic-bezier(0.4, 0, 0.2, 1)", role: "Default easing" },
];

export default function DevelopersPage() {
  return (
    <PageShell
      eyebrow="06 · Developers"
      title={<>One token graph,<br/>every platform.</>}
      lede="Tokens are defined once in JSON and compiled per-platform. Pick your stack — the install is two lines."
    >
      <TAlert tone="info" title="This very site uses the kit">
        Every component on the Brand Hub — buttons, cards, badges, alerts, toasts — is the same React component you'd import in your own app. Run <code className="font-mono text-xs">npm run dev</code> after cloning to see it locally.
      </TAlert>

      <SectionHead title="Install · Plain CSS" count="ZERO BUILD" />
      <TCard elevated>
        <pre className="font-mono text-[12px] leading-relaxed bg-[var(--t-bg-inset)] text-[var(--t-fg)] p-4 rounded-md overflow-x-auto whitespace-pre">{`<link rel="stylesheet" href="https://cdn.trainovate.com/v1/tokens.css" />
<link rel="stylesheet" href="https://cdn.trainovate.com/v1/components.css" />

<button class="t-btn t-btn--primary">Save</button>
<div class="t-card t-card--elevated">…</div>`}</pre>
      </TCard>

      <SectionHead title="Install · Tailwind" count="DROP-IN PLUGIN" />
      <TCard elevated>
        <pre className="font-mono text-[12px] leading-relaxed bg-[var(--t-bg-inset)] text-[var(--t-fg)] p-4 rounded-md overflow-x-auto whitespace-pre">{`// tailwind.config.ts
import trainovate from "@trainovate/tailwind";

export default {
  presets: [trainovate],
  content: ["./app/**/*.{ts,tsx}"],
};`}</pre>
      </TCard>

      <SectionHead title="Install · Next.js / React" count="RECOMMENDED" />
      <TCard elevated>
        <pre className="font-mono text-[12px] leading-relaxed bg-[var(--t-bg-inset)] text-[var(--t-fg)] p-4 rounded-md overflow-x-auto whitespace-pre">{`npm install @trainovate/ui @trainovate/tokens

// app/layout.tsx
import "@trainovate/ui/styles.css";
import { TToastProvider } from "@trainovate/ui";

// anywhere
import { TButton, TCard } from "@trainovate/ui";`}</pre>
      </TCard>

      <SectionHead title="Token reference" count={`${TOKENS.length} TOKENS`} />
      <TCard elevated className="!p-0 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[var(--t-bg-inset)] text-[10px] uppercase tracking-[0.14em] font-mono text-ink/55">
              <th className="text-left py-3 px-4 font-medium">Token</th>
              <th className="text-left py-3 px-4 font-medium">Value</th>
              <th className="text-left py-3 px-4 font-medium">Role</th>
              <th className="py-3 px-4 font-medium">Preview</th>
            </tr>
          </thead>
          <tbody>
            {TOKENS.map((t) => (
              <tr key={t.token} className="border-t border-[rgba(10,10,10,0.06)]">
                <td className="py-2.5 px-4 font-mono text-xs text-cobalt">{t.token}</td>
                <td className="py-2.5 px-4 font-mono text-xs">{t.value}</td>
                <td className="py-2.5 px-4 text-xs text-ink/65">{t.role}</td>
                <td className="py-2.5 px-4 w-12">
                  {t.value.startsWith("#") && (
                    <div className="w-6 h-6 rounded border border-[rgba(10,10,10,0.10)]" style={{ background: t.value }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TCard>

      <SectionHead title="Bring your own brand" count="FORK ME" />
      <TCard elevated>
        <p className="text-sm text-ink/65 leading-relaxed mb-4">
          Edit <code className="font-mono text-xs bg-[var(--t-bg-inset)] px-1.5 py-0.5 rounded">lib/tokens.ts</code> — every component reads from there. Tailwind theme and CSS vars derive from the same values.
        </p>
        <Link href="/downloads"><TButton variant="primary">Download starter →</TButton></Link>
      </TCard>
    </PageShell>
  );
}
