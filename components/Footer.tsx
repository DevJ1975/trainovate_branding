import Link from "next/link";
import { BrandMark } from "./Brand";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#F4F1EA] mt-32">
      <div className="container-tv py-14">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BrandMark tone="bone" size={28} />
              <span className="font-semibold text-lg tracking-tight">Trainovate</span>
            </div>
            <p className="text-[#F4F1EA]/55 text-sm max-w-[28ch] leading-relaxed">
              The full brand system — identity, components, templates, code-ready tokens.
            </p>
          </div>

          <FooterCol title="Brand" links={[
            { href: "/identity", label: "Identity" },
            { href: "/brand", label: "Colors & type" },
            { href: "/templates", label: "Templates" },
          ]} />
          <FooterCol title="Build" links={[
            { href: "/ui-kit", label: "UI Kit" },
            { href: "/ui-kit/native", label: "Native platforms" },
            { href: "/developers", label: "Developers" },
          ]} />
          <FooterCol title="Get it" links={[
            { href: "/downloads", label: "Downloads" },
          ]} />
        </div>

        <div className="border-t border-[#F4F1EA]/15 pt-6 mt-12 flex justify-between items-center flex-wrap gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F4F1EA]/40">
            © Trainovate · Brand Hub v1.0
          </p>
          <p className="font-mono text-[10px] tracking-[0.14em] text-[#F4F1EA]/40">
            Built with Next.js + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F4F1EA]/40 mb-3">{title}</p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-[#F4F1EA]/75 hover:text-[#F4F1EA] transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
