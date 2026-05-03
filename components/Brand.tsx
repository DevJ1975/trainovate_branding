import { useId } from "react";

/**
 * Trainovate brand mark — an atomic nucleus.
 *
 * Three elliptical orbits set 60° apart, a solid nucleus, and three
 * electrons that travel each orbit at slightly different rates so the
 * motion never resolves to a single beat.
 *
 * The static form (no `animated`) is the canonical print/export shape.
 * The animated form is reserved for live UI surfaces (hero, splash,
 * the Identity showcase). At sizes below 24px electrons are dropped
 * entirely so the orbits stay legible at favicon scale.
 */

type Tone = "ink" | "bone" | "cobalt" | "current";

const COLORS: Record<Tone, string> = {
  ink: "#0A0A0A",
  bone: "#F4F1EA",
  cobalt: "#0046E6",
  current: "currentColor",
};

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
  const animClass = `tv-mark-anim-${uid}`;

  const showElectrons = size >= 24;
  const animate = animated && size >= 28;

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
      {animate && (
        <style>{`@media (prefers-reduced-motion: reduce){.${animClass}{display:none}}`}</style>
      )}

      <defs>
        {/* Single canonical orbit path; rotated copies use <g transform> */}
        <path
          id={orbitPathId}
          d="M 92,50 A 42,14 0 1 1 8,50 A 42,14 0 1 1 92,50"
        />
      </defs>

      {/* Orbital rings */}
      <g fill="none" stroke="currentColor" strokeWidth={3}>
        <ellipse cx="50" cy="50" rx="42" ry="14" />
        <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(120 50 50)" />
      </g>

      {/* Nucleus */}
      <circle cx="50" cy="50" r="9" fill="currentColor" />

      {/* Electrons — static cx/cy take effect when motion is reduced */}
      {showElectrons && (
        <>
          <circle cx="92" cy="50" r="4.5" fill="currentColor">
            {animate && (
              <animateMotion
                className={animClass}
                dur="3.2s"
                repeatCount="indefinite"
              >
                <mpath href={`#${orbitPathId}`} />
              </animateMotion>
            )}
          </circle>
          <g transform="rotate(60 50 50)">
            <circle cx="92" cy="50" r="4.5" fill="currentColor">
              {animate && (
                <animateMotion
                  className={animClass}
                  dur="3.8s"
                  repeatCount="indefinite"
                  begin="-0.9s"
                >
                  <mpath href={`#${orbitPathId}`} />
                </animateMotion>
              )}
            </circle>
          </g>
          <g transform="rotate(120 50 50)">
            <circle cx="92" cy="50" r="4.5" fill="currentColor">
              {animate && (
                <animateMotion
                  className={animClass}
                  dur="2.6s"
                  repeatCount="indefinite"
                  begin="-1.6s"
                >
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
        Trainovate
      </span>
    </span>
  );
}
