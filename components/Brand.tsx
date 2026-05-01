import Image from "next/image";

const MARK_PATHS = (
  <>
    <ellipse cx="50" cy="50" rx="42" ry="22" transform="rotate(-22 50 50)" fill="none" stroke="currentColor" strokeWidth="6" />
    <path d="M30 38 H70 M50 38 V72" stroke="currentColor" strokeWidth="9" strokeLinecap="square" fill="none" />
  </>
);

export function BrandMark({
  tone = "ink",
  size = 32,
  className = "",
}: {
  tone?: "ink" | "bone" | "cobalt" | "current";
  size?: number;
  className?: string;
}) {
  const colors: Record<string, string> = {
    ink: "#0A0A0A",
    bone: "#F4F1EA",
    cobalt: "#0046E6",
    current: "currentColor",
  };
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{ color: colors[tone], display: "block" }}
      aria-label="Trainovate"
    >
      {MARK_PATHS}
    </svg>
  );
}

export function BrandLockup({
  tone = "ink",
  size = 28,
  className = "",
}: {
  tone?: "ink" | "bone" | "cobalt";
  size?: number;
  className?: string;
}) {
  const colors: Record<string, string> = {
    ink: "#0A0A0A",
    bone: "#F4F1EA",
    cobalt: "#0046E6",
  };
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark tone={tone} size={size} />
      <span
        style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontWeight: 700,
          fontSize: size * 0.78,
          letterSpacing: "-0.02em",
          color: colors[tone],
          lineHeight: 1,
        }}
      >
        Trainovate
      </span>
    </span>
  );
}
