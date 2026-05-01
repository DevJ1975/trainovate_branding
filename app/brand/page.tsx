import { TCard, TBadge } from "@/components/kit";
import { PageShell, SectionHead } from "@/components/PageShell";

const PALETTE = [
  { name: "Ink",    hex: "#0A0A0A", role: "Primary text, dark surfaces", bg: "bg-ink",    fg: "text-bone" },
  { name: "Bone",   hex: "#F4F1EA", role: "Default page background",     bg: "bg-bone",   fg: "text-ink",  border: true },
  { name: "Cobalt", hex: "#0046E6", role: "Brand action, links, focus",  bg: "bg-cobalt", fg: "text-bone" },
  { name: "Signal", hex: "#FF3B30", role: "Errors only",                 bg: "bg-signal", fg: "text-bone" },
];

const SCALE_RAMP = ["50","100","200","300","400","500","600","700","800","900"];

export default function BrandPage() {
  return (
    <PageShell
      eyebrow="03 · Brand"
      title={<>Foundations — color,<br/>type, voice and motion.</>}
      lede="The smallest set of decisions that produce the largest amount of consistency."
    >
      {/* Color */}
      <SectionHead title="Color · core palette" count="4 TOKENS" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PALETTE.map((c) => (
          <TCard key={c.name} className="!p-0 overflow-hidden">
            <div className={`aspect-[4/3] ${c.bg} ${c.fg} flex items-end p-4 ${c.border ? "border-b border-[rgba(10,10,10,0.08)]" : ""}`}>
              <div>
                <p className="text-lg font-semibold">{c.name}</p>
                <p className="font-mono text-xs opacity-75 mt-1">{c.hex}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-ink/60 leading-relaxed">{c.role}</p>
            </div>
          </TCard>
        ))}
      </div>

      <SectionHead title="Cobalt · ramp" count="50 → 900" />
      <div className="grid grid-cols-5 md:grid-cols-10 rounded-md overflow-hidden border border-[rgba(10,10,10,0.10)]">
        {SCALE_RAMP.map((step, i) => {
          const lum = 100 - i * 10;
          return (
            <div key={step}
              className="aspect-square flex items-end p-2"
              style={{
                background: `oklch(${lum}% 0.18 264)`,
                color: i > 4 ? "#fff" : "#0A0A0A",
              }}
            >
              <div className="font-mono text-[10px]">{step}</div>
            </div>
          );
        })}
      </div>

      {/* Type */}
      <SectionHead title="Typography" count="2 FAMILIES" />
      <div className="grid md:grid-cols-2 gap-4">
        <TCard elevated>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 mb-3">Sans · Inter Tight</p>
          <p className="text-3xl font-bold tracking-tight leading-tight mb-2">The orbit holds.</p>
          <p className="text-xl font-semibold tracking-tight mb-1">Built for the field.</p>
          <p className="text-md text-ink/70 leading-relaxed">
            Used for everything except code and tabular data. 4 weights — Regular, Medium, SemiBold, Bold.
          </p>
        </TCard>
        <TCard elevated>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 mb-3">Mono · JetBrains Mono</p>
          <p className="font-mono text-2xl font-semibold tracking-tight leading-tight mb-2">{`const orbit = train(0.001);`}</p>
          <p className="font-mono text-md text-ink/70 mb-1">EYEBROWS · LABELS · CODE</p>
          <p className="text-sm text-ink/65 leading-relaxed mt-3">
            Used for eyebrows, labels, code, and tabular numerals. 3 weights — Regular, Medium, Bold.
          </p>
        </TCard>
      </div>

      {/* Type scale */}
      <SectionHead title="Type scale" count="9 STEPS" />
      <TCard elevated className="!p-0">
        <div className="divide-y divide-[rgba(10,10,10,0.08)]">
          {[
            { token: "text-4xl", size: "88px", line: "1.0", weight: "800", sample: "Display" },
            { token: "text-3xl", size: "64px", line: "1.05", weight: "800", sample: "Hero" },
            { token: "text-2xl", size: "44px", line: "1.1", weight: "700", sample: "Section title" },
            { token: "text-xl",  size: "32px", line: "1.2", weight: "700", sample: "Card title" },
            { token: "text-lg",  size: "24px", line: "1.2", weight: "600", sample: "Sub-section" },
            { token: "text-md",  size: "18px", line: "1.5", weight: "400", sample: "Lead body copy" },
            { token: "text-base",size: "16px", line: "1.5", weight: "400", sample: "Default body" },
            { token: "text-sm",  size: "13px", line: "1.5", weight: "400", sample: "Secondary" },
            { token: "text-xs",  size: "11px", line: "1.4", weight: "500", sample: "EYEBROW", mono: true },
          ].map((t) => (
            <div key={t.token} className="flex items-baseline gap-6 px-6 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45 w-24 shrink-0">{t.token}</span>
              <span className="font-mono text-xs text-ink/55 w-16 shrink-0">{t.size}</span>
              <span className={`flex-1 ${t.mono ? "font-mono uppercase tracking-[0.12em]" : ""}`}
                    style={{ fontSize: t.size, lineHeight: t.line, fontWeight: parseInt(t.weight, 10), letterSpacing: t.token.includes("xl") ? "-0.02em" : undefined }}>
                {t.sample}
              </span>
            </div>
          ))}
        </div>
      </TCard>

      {/* Voice */}
      <SectionHead title="Voice" count="3 PRINCIPLES" />
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { num: "01", title: "Direct", body: "Lead with the verb. Cut hedging. The reader is busy and trusts you." },
          { num: "02", title: "Specific", body: "Names, numbers, places. ‘12 modules in 45 minutes,' not ‘a comprehensive program.'" },
          { num: "03", title: "Operational", body: "We work alongside ops teams. Use their language, never marketing's." },
        ].map((p) => (
          <TCard key={p.num} elevated>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cobalt mb-3">{p.num}</p>
            <h3 className="text-lg font-semibold tracking-tight mb-2">{p.title}</h3>
            <p className="text-sm text-ink/65 leading-relaxed">{p.body}</p>
          </TCard>
        ))}
      </div>

      {/* Motion */}
      <SectionHead title="Motion" count="3 DURATIONS" />
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { name: "Fast",     ms: "120ms", use: "Press, hover, focus" },
          { name: "Standard", ms: "220ms", use: "Default — most transitions" },
          { name: "Slow",     ms: "400ms", use: "Page transitions, reveals" },
        ].map((m) => (
          <TCard key={m.name} elevated>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 mb-2">Duration</p>
            <p className="text-2xl font-semibold tracking-tight">{m.name}</p>
            <p className="font-mono text-sm text-cobalt mt-1">{m.ms}</p>
            <p className="text-xs text-ink/60 mt-3">{m.use}</p>
          </TCard>
        ))}
      </div>
    </PageShell>
  );
}
