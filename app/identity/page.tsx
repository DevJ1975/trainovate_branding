import Link from "next/link";
import { TCard, TButton } from "@/components/kit";
import { BrandMark, BrandLockup } from "@/components/Brand";
import { PageShell, SectionHead } from "@/components/PageShell";

export default function IdentityPage() {
  return (
    <PageShell
      eyebrow="02 · Identity"
      title={<>The mark, the lockups,<br/>and how to use them.</>}
      lede="Trainovate's identity is built on a single geometric mark — an orbital ellipse with a structural cross. Use it consistently."
    >
      {/* Primary lockups */}
      <SectionHead title="Primary lockups" count="3 VARIANTS" />
      <div className="grid md:grid-cols-3 gap-4">
        <TCard elevated>
          <div className="aspect-[4/3] bg-bone rounded-md flex items-center justify-center mb-4">
            <BrandLockup tone="ink" size={42} />
          </div>
          <p className="text-sm font-semibold mb-1">Horizontal · Ink</p>
          <p className="text-xs text-ink/60">Default lockup. Use on bone or white.</p>
        </TCard>
        <TCard elevated>
          <div className="aspect-[4/3] bg-ink rounded-md flex items-center justify-center mb-4">
            <BrandLockup tone="bone" size={42} />
          </div>
          <p className="text-sm font-semibold mb-1">Horizontal · Bone</p>
          <p className="text-xs text-ink/60">For dark backgrounds. Always pair with ink.</p>
        </TCard>
        <TCard elevated>
          <div className="aspect-[4/3] bg-cobalt rounded-md flex items-center justify-center mb-4">
            <BrandLockup tone="bone" size={42} surface="cobalt" />
          </div>
          <p className="text-sm font-semibold mb-1">Horizontal · On Cobalt</p>
          <p className="text-xs text-ink/60">Brand moments only. Sparingly.</p>
        </TCard>
      </div>

      {/* Mark only */}
      <SectionHead title="Mark only" count="STANDALONE" />
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { tone: "ink",    bg: "bg-bone",   surface: "bone",   label: "Ink on bone" },
          { tone: "bone",   bg: "bg-ink",    surface: "ink",    label: "Bone on ink" },
          { tone: "bone",   bg: "bg-cobalt", surface: "cobalt", label: "Bone on cobalt" },
          { tone: "cobalt", bg: "bg-bone",   surface: "bone",   label: "Cobalt on bone" },
        ].map((m, i) => (
          <TCard key={i} elevated>
            <div className={`aspect-square ${m.bg} rounded-md flex items-center justify-center mb-3`}>
              <BrandMark tone={m.tone as any} surface={m.surface as any} size={92} />
            </div>
            <p className="text-xs font-mono text-ink/60 uppercase tracking-[0.08em]">{m.label}</p>
          </TCard>
        ))}
      </div>

      {/* Clearspace */}
      <SectionHead title="Clearspace & sizing" count="THE RULES" />
      <div className="grid md:grid-cols-2 gap-4">
        <TCard elevated>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 mb-3">Clearspace</p>
          <div className="aspect-[4/3] bg-bone rounded-md relative overflow-hidden mb-4 border border-[rgba(10,10,10,0.08)]">
            <div className="absolute inset-[20%] flex items-center justify-center">
              <BrandLockup tone="ink" size={36} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-2 border-dashed border-cobalt/40 inset-[10%] absolute" />
            </div>
          </div>
          <p className="text-sm text-ink/65 leading-relaxed">
            Maintain at least <strong>1× the height of the mark</strong> as clearspace on every side. No other element — text, image, or graphic — should enter this zone.
          </p>
        </TCard>
        <TCard elevated>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 mb-3">Minimum size</p>
          <div className="bg-bone rounded-md p-6 mb-4 border border-[rgba(10,10,10,0.08)] flex items-end gap-6">
            <div className="text-center">
              <BrandMark tone="ink" size={16} />
              <p className="font-mono text-[10px] mt-2 text-ink/55">16px<br/>min digital</p>
            </div>
            <div className="text-center">
              <BrandMark tone="ink" size={32} />
              <p className="font-mono text-[10px] mt-2 text-ink/55">32px<br/>app icon</p>
            </div>
            <div className="text-center">
              <BrandMark tone="ink" size={64} />
              <p className="font-mono text-[10px] mt-2 text-ink/55">64px<br/>document</p>
            </div>
          </div>
          <p className="text-sm text-ink/65 leading-relaxed">
            Never use the mark below <strong>16 px</strong> on screen or <strong>10 mm</strong> in print. The wordmark needs more room — minimum 24 px digital.
          </p>
        </TCard>
      </div>

      {/* Animated mark */}
      <SectionHead title="Animated mark" count="LIVE · 3 BACKGROUNDS" />
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { tone: "ink",    bg: "bg-bone",   surface: "bone",   label: "On bone",   note: "Default — for light surfaces and product UI." },
          { tone: "bone",   bg: "bg-ink",    surface: "ink",    label: "On ink",    note: "For dark hero moments and splashes." },
          { tone: "bone",   bg: "bg-cobalt", surface: "cobalt", label: "On cobalt", note: "Brand moments only — keep it sparing." },
        ].map((a) => (
          <TCard key={a.label} elevated>
            <div className={`aspect-square ${a.bg} rounded-md flex items-center justify-center mb-3 overflow-hidden`}>
              <BrandMark tone={a.tone as "ink" | "bone"} surface={a.surface as any} size={140} animated />
            </div>
            <p className="text-sm font-semibold mb-1">{a.label}</p>
            <p className="text-xs text-ink/60">{a.note}</p>
          </TCard>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink/55 leading-relaxed max-w-[60ch]">
        Three electrons orbit the nucleus at independent rates. Honors{" "}
        <code className="font-mono text-[11px] bg-bone px-1 py-0.5 rounded">prefers-reduced-motion</code>{" "}
        — the electrons pin to their orbits when motion is dialled back.
      </p>

      {/* Misuse */}
      <SectionHead title="Misuse" count="DON'T DO THESE" />
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Don't stretch",    fix: "Always lock proportions" },
          { label: "Don't recolor",    fix: "Use approved palette only" },
          { label: "Don't add effects", fix: "No shadows, glows, or strokes" },
          { label: "Don't crowd",      fix: "Respect the clearspace zone" },
        ].map((m) => (
          <TCard key={m.label}>
            <p className="font-semibold text-sm mb-1">{m.label}</p>
            <p className="text-xs text-ink/60">{m.fix}</p>
          </TCard>
        ))}
      </div>

      <div className="mt-12 flex gap-3 flex-wrap">
        <Link href="/downloads#identity"><TButton variant="primary">Download all logo files →</TButton></Link>
        <Link href="/brand"><TButton variant="secondary">See brand foundations</TButton></Link>
      </div>
    </PageShell>
  );
}
