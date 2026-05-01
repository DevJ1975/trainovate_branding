import Link from "next/link";
import { TCard, TBadge, TButton } from "@/components/kit";
import { PageShell, SectionHead } from "@/components/PageShell";
import { BrandLockup, BrandMark } from "@/components/Brand";

export default function TemplatesPage() {
  return (
    <PageShell
      eyebrow="05 · Templates"
      title={<>Pre-built artefacts<br/>for everyday use.</>}
      lede="Letterhead, business cards, email signature, slide masters, Zoom backgrounds. Ready to copy or download."
    >
      <SectionHead title="Document templates" count="3 FORMATS" />
      <div className="grid md:grid-cols-3 gap-4">
        <TCard elevated>
          <div className="aspect-[8.5/11] bg-paper border border-[rgba(10,10,10,0.10)] rounded-md p-5 mb-4 flex flex-col">
            <BrandLockup tone="ink" size={20} />
            <div className="mt-6 space-y-1.5">
              <div className="h-2 bg-ink/10 rounded w-1/2" />
              <div className="h-2 bg-ink/10 rounded w-3/4" />
              <div className="h-2 bg-ink/10 rounded w-2/3" />
            </div>
            <div className="mt-auto flex justify-between text-[8px] font-mono text-ink/40 uppercase tracking-[0.14em]">
              <span>Trainovate</span><span>1 / 1</span>
            </div>
          </div>
          <p className="font-semibold text-sm mb-1">Letterhead · Word</p>
          <p className="text-xs text-ink/60 mb-3">Editable .docx with proper margins, fonts, and footer.</p>
          <TBadge tone="neutral">.docx</TBadge>
        </TCard>

        <TCard elevated>
          <div className="aspect-[8.5/11] bg-bone border border-[rgba(10,10,10,0.10)] rounded-md p-5 mb-4 flex flex-col">
            <BrandLockup tone="ink" size={20} />
            <div className="mt-6 space-y-1.5">
              <div className="h-2 bg-ink/10 rounded w-2/3" />
              <div className="h-2 bg-ink/10 rounded w-1/2" />
              <div className="h-2 bg-ink/10 rounded w-3/4" />
            </div>
          </div>
          <p className="font-semibold text-sm mb-1">Letterhead · Google Docs</p>
          <p className="text-xs text-ink/60 mb-3">HTML import + step-by-step instructions.</p>
          <TBadge tone="neutral">Google Docs</TBadge>
        </TCard>

        <TCard elevated>
          <div className="aspect-[8.5/11] bg-ink text-bone border border-ink rounded-md p-5 mb-4 flex flex-col">
            <BrandLockup tone="bone" size={20} />
            <div className="mt-6 space-y-1.5">
              <div className="h-2 bg-bone/15 rounded w-2/3" />
              <div className="h-2 bg-bone/15 rounded w-3/4" />
              <div className="h-2 bg-bone/15 rounded w-1/2" />
            </div>
          </div>
          <p className="font-semibold text-sm mb-1">Slide master</p>
          <p className="text-xs text-ink/60 mb-3">PowerPoint + Keynote with title, content, divider layouts.</p>
          <TBadge tone="neutral">.pptx · .key</TBadge>
        </TCard>
      </div>

      <SectionHead title="Print artefacts" count="2 SIZES" />
      <div className="grid md:grid-cols-2 gap-4">
        <TCard elevated>
          <div className="bg-bone border border-[rgba(10,10,10,0.10)] rounded-md p-6 mb-4 aspect-[1.75/1] flex items-center justify-between">
            <div>
              <p className="font-semibold tracking-tight">Jane Cooper</p>
              <p className="text-xs text-ink/60 mt-0.5">Operations Lead</p>
              <p className="font-mono text-[9px] text-ink/45 mt-3 leading-relaxed">
                jane@trainovate.com<br/>+1 (713) 555-0142
              </p>
            </div>
            <BrandMark tone="cobalt" size={48} />
          </div>
          <p className="font-semibold text-sm mb-1">Business card · Front</p>
          <p className="text-xs text-ink/60 mb-3">3.5 × 2 in · 0.125 in bleed · CMYK + 300 dpi.</p>
          <TBadge tone="neutral">.pdf · print-ready</TBadge>
        </TCard>
        <TCard elevated>
          <div className="bg-ink text-bone rounded-md p-6 mb-4 aspect-[1.75/1] flex items-center justify-center">
            <BrandLockup tone="bone" size={32} />
          </div>
          <p className="font-semibold text-sm mb-1">Business card · Back</p>
          <p className="text-xs text-ink/60 mb-3">Ink-filled with centered lockup.</p>
          <TBadge tone="neutral">.pdf · print-ready</TBadge>
        </TCard>
      </div>

      <SectionHead title="Digital templates" count="3 ARTEFACTS" />
      <div className="grid md:grid-cols-3 gap-4">
        <TCard elevated>
          <div className="bg-bone border border-[rgba(10,10,10,0.10)] rounded-md p-5 mb-4 aspect-[16/9] flex flex-col gap-2 text-[10px]">
            <p className="font-semibold text-ink text-sm">Jane Cooper</p>
            <p className="text-ink/55">Operations Lead · Trainovate</p>
            <div className="border-t border-ink/15 my-1" />
            <p className="font-mono text-cobalt">jane@trainovate.com</p>
            <p className="font-mono text-ink/55">trainovate.com</p>
          </div>
          <p className="font-semibold text-sm mb-1">Email signature</p>
          <p className="text-xs text-ink/60">HTML snippet with copy/paste install steps.</p>
        </TCard>
        <TCard elevated>
          <div className="bg-cobalt rounded-md p-5 mb-4 aspect-[16/9] flex items-center justify-center">
            <BrandLockup tone="bone" size={32} />
          </div>
          <p className="font-semibold text-sm mb-1">Zoom · Cobalt</p>
          <p className="text-xs text-ink/60">1920×1080 PNG, mark centered.</p>
        </TCard>
        <TCard elevated>
          <div className="bg-ink rounded-md p-5 mb-4 aspect-[16/9] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
              backgroundSize: "12px 12px",
            }} />
            <div className="relative h-full flex items-center justify-center">
              <BrandMark tone="bone" size={64} />
            </div>
          </div>
          <p className="font-semibold text-sm mb-1">Zoom · Ink</p>
          <p className="text-xs text-ink/60">1920×1080 PNG, dotted backdrop.</p>
        </TCard>
      </div>

      <div className="mt-12 flex gap-3 flex-wrap">
        <Link href="/downloads"><TButton variant="primary">All downloads →</TButton></Link>
      </div>
    </PageShell>
  );
}
