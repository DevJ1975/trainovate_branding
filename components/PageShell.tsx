import { ReactNode } from "react";

/**
 * PageShell — shared layout for all Brand Hub pages.
 * Provides eyebrow + title + optional lede in a consistent rhythm.
 */
export function PageShell({
  eyebrow, title, lede, children, action,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <main className="pb-24">
      <section className="container-tv pt-16 md:pt-24 pb-12">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div className="max-w-[60ch]">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h1 className="font-bold text-3xl md:text-4xl tracking-tight leading-[1.04]">
              {title}
            </h1>
            {lede && (
              <p className="mt-5 text-md text-ink/65 leading-relaxed">
                {lede}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </section>
      <div className="container-tv">{children}</div>
    </main>
  );
}

/**
 * SectionHead — eyebrow-style sub section header
 */
export function SectionHead({
  eyebrow, title, count, children,
}: {
  eyebrow?: string;
  title: ReactNode;
  count?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 mt-12 flex items-end justify-between gap-4 flex-wrap pb-3 border-b border-[rgba(10,10,10,0.10)]">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      {count && <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">{count}</span>}
      {children}
    </div>
  );
}
