import { useId } from "react";

/**
 * Trainovate brand mark — two crossed ellipses with a cobalt nucleus.
 *
 * The ellipses sit at ±30° from horizontal so they form a clean X with
 * an almond/lens shape in the middle. The nucleus is always rendered
 * in brand cobalt (except on a cobalt surface, where it flips to bone
 * to keep contrast).
 *
 * `animated` adds two electrons that travel each ellipse at different
 * rates. The animation is opt-in per surface — print/template exports
 * stay still; the hero and screensaver opt in.
 */

type Tone = "ink" | "bone" | "cobalt" | "current";

const COLORS: Record<Tone, string> = {
  ink: "#0A0A0A",
  bone: "#F4F1EA",
  cobalt: "#0046E6",
  current: "currentColor",
};

// Nucleus is always cobalt — except on a cobalt surface where it would
// disappear, in which case it flips to bone for contrast.
function nucleusFill(tone: Tone): string {
  return tone === "cobalt" ? COLORS.bone : COLORS.cobalt;
}

export function BrandMark({
  tone = "ink",
  size = 32,
  animated = false,
  className = "",
}: {
  tone?: Tone;
  size?: number;
  animated?: boolean;
  className?: string;
}) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const orbitPathId = `tv-orbit-${uid}`;

  const showElectrons = size >= 28;
  const animate = animated && size >= 32;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{ color: COLORS[tone], display: "block" }}
      role="img"
      aria-label="Trainovate"
    >
      <defs>
        {/* Canonical orbit path — geometry matches public/brand/trainovate-mark-*.svg */}
        <path
          id={orbitPathId}
          d="M 90,50 A 40,17 0 1 1 10,50 A 40,17 0 1 1 90,50"
        />
      </defs>

      {/* Two crossed orbital rings */}
      <g fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round">
        <ellipse cx="50" cy="50" rx="40" ry="17" transform="rotate(30 50 50)" />
        <ellipse cx="50" cy="50" rx="40" ry="17" transform="rotate(-30 50 50)" />
      </g>

      {/* Cobalt nucleus */}
      <circle cx="50" cy="50" r="8" fill={nucleusFill(tone)} />

      {/* Electrons — base cx/cy is the static fallback; animateMotion overrides while running */}
      {showElectrons && (
        <>
          <g transform="rotate(30 50 50)">
            <circle cx="90" cy="50" r="3.5" fill="currentColor">
              {animate && (
                <animateMotion dur="3.2s" repeatCount="indefinite">
                  <mpath href={`#${orbitPathId}`} />
                </animateMotion>
              )}
            </circle>
          </g>
          <g transform="rotate(-30 50 50)">
            <circle cx="90" cy="50" r="3.5" fill="currentColor">
              {animate && (
                <animateMotion dur="2.6s" repeatCount="indefinite" begin="-1.1s">
                  <mpath href={`#${orbitPathId}`} />
                </animateMotion>
              )}
            </circle>
          </g>
        </>
      )}
    </svg>
  );
}

export function BrandLockup({
  tone = "ink",
  size = 28,
  animated = false,
  className = "",
}: {
  tone?: Exclude<Tone, "current">;
  size?: number;
  animated?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark tone={tone} size={size} animated={animated} />
      <span
        style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontWeight: 700,
          fontSize: size * 0.78,
          letterSpacing: "-0.02em",
          color: COLORS[tone],
          lineHeight: 1,
        }}
      >
        Trainovate<span style={{ opacity: 0.5, fontWeight: 500 }}>.ai</span>
      </span>
    </span>
  );
}
