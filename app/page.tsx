import Link from "next/link";
import { TButton, TBadge, TCard } from "@/components/kit";
import { BrandMark } from "@/components/Brand";
import { PageShell, SectionHead } from "@/components/PageShell";
import { IntroGate } from "@/components/IntroGate";

const SECTIONS = [
  {
    href: "/identity",
    num: "02",
    title: "Identity",
    body: "Logo, mark, lockups, clearspace, animated mark, favicons.",
    badge: "10 ASSETS",
  },
  {
    href: "/brand",
    num: "03",
    title: "Brand",
    body: "Colors, typography, voice, motion, photography direction.",
    badge: "FOUNDATIONS",
  },
  {
    href: "/ui-kit",
    num: "04",
    title: "UI Kit",
    body: "20 live components across web and native. Built with itself.",
    badge: "WEB · RN · SWIFTUI · UIKIT",
  },
  {
    href: "/templates",
    num: "05",
    title: "Templates",
    body: "Letterhead, business cards, email signature, Zoom backgrounds.",
    badge: "8 TEMPLATES",
  },
  {
    href: "/developers",
    num: "06",
    title: "Developers",
    body: "Token reference, install snippets, Tailwind config, Next.js starter.",
    badge: "TOKENS · CSS · TAILWIND",
  },
  {
    href: "/downloads",
    num: "07",
    title: "Downloads",
    body: "Every artefact in one matrix — logos, fonts, kits, templates.",
    badge: "ALL ASSETS",
  },
];

export default function Home() {
  return (
    <main className="pb-32">
      <IntroGate />
      {/* Hero */}
      <section className="container-tv pt-20 md:pt-32 pb-16">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <p className="eyebrow mb-5">Trainovate.ai · Brand Hub v1.0</p>
            <h1 className="font-bold text-3xl md:text-4xl tracking-tight leading-[1.02]">
              The full system,<br/>
              <span className="text-cobalt">in one place.</span>
            </h1>
            <p className="mt-6 text-md text-ink/65 max-w-[56ch] leading-relaxed">
              Identity, design tokens, a 20-component cross-platform UI kit, templates, and a Next.js starter — wired
              together so designers, developers and operators all read from the same source of truth.
            </p>
            <div className="flex gap-3 mt-8 flex-wrap">
              <Link href="/ui-kit"><TButton variant="primary" size="lg">Open the UI Kit →</TButton></Link>
              <Link href="/identity"><TButton variant="secondary" size="lg">Browse identity</TButton></Link>
              <Link href="/downloads"><TButton variant="ghost" size="lg">Downloads</TButton></Link>
            </div>
          </div>
          <div className="relative aspect-square bg-ink rounded-lg overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }} />
            <BrandMark tone="bone" size={240} animated />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[rgba(10,10,10,0.10)] grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat num="20" label="Components" />
          <Stat num="4" label="Platforms" />
          <Stat num="12" label="Design tokens" />
          <Stat num="1" label="Source of truth" />
        </div>
      </section>

      {/* Section grid */}
      <section className="container-tv">
        <SectionHead eyebrow="Browse" title="Everything in the system" count="6 SECTIONS" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="group">
              <TCard className="h-full transition-all group-hover:-translate-y-0.5" elevated>
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt">{s.num}</span>
                  <TBadge tone="neutral">{s.badge}</TBadge>
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--t-fg-muted)] leading-relaxed mb-4">{s.body}</p>
                <span className="text-sm font-medium text-cobalt inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Open →
                </span>
              </TCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Eat-our-own-dog-food note */}
      <section className="container-tv mt-20">
        <TCard elevated className="!p-0 overflow-hidden">
          <div className="grid md:grid-cols-[1fr_1.4fr]">
            <div className="bg-ink text-bone p-10 flex flex-col justify-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/55 mb-3">Note · Self-hosted</p>
              <h3 className="text-xl font-semibold tracking-tight leading-tight">
                This Brand Hub is built using its own UI kit.
              </h3>
            </div>
            <div className="p-10">
              <p className="text-md text-ink/65 leading-relaxed mb-5">
                Every button, card, badge, alert, toast, modal and form control on this site is the same
                <code className="font-mono text-sm bg-bone px-1.5 py-0.5 rounded mx-1">{"<TButton/>"}</code>
                you'd import in your own app. Theme it, fork it, ship it.
              </p>
              <Link href="/developers"><TButton variant="secondary">See install snippets →</TButton></Link>
            </div>
          </div>
        </TCard>
      </section>
    </main>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="text-xl font-semibold tracking-tight">{num}</div>
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 mt-1">{label}</div>
    </div>
  );
}
