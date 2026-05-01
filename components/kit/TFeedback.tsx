"use client";

import { ReactNode } from "react";

/* ---------- Avatar ---------- */
export function TAvatar({
  src, alt, initials, size = "md", color, className = "",
}: {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}) {
  const sizeCls = `t-avatar--${size}`;
  if (src) {
    return <img src={src} alt={alt ?? ""} className={`t-avatar ${sizeCls} ${className}`} />;
  }
  return (
    <div
      className={`t-avatar ${sizeCls} ${className}`}
      style={{
        background: color ?? "var(--t-action)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: size === "lg" ? 16 : size === "sm" ? 11 : 13,
      }}
    >
      {initials ?? "?"}
    </div>
  );
}
export const TrainovateAvatar = TAvatar;

/* ---------- ListRow ---------- */
export function TListRow({
  leading, title, sub, trailing, className = "", onClick,
}: {
  leading?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div className={`t-list-row ${className}`} onClick={onClick} role={onClick ? "button" : undefined}>
      {leading}
      <div className="t-list-row__main">
        <div className="t-list-row__title">{title}</div>
        {sub && <div className="t-list-row__sub">{sub}</div>}
      </div>
      {trailing}
    </div>
  );
}
export const TrainovateListRow = TListRow;

/* ---------- Progress bar ---------- */
export function TProgress({
  value, label, className = "",
}: {
  value: number; // 0..100
  label?: ReactNode;
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--t-fg-muted)", marginBottom: 6 }}>
          <span>{label}</span><span>{Math.round(v)}%</span>
        </div>
      )}
      <div className="t-progress"><div className="t-progress__bar" style={{ width: `${v}%` }} /></div>
    </div>
  );
}
export const TrainovateProgress = TProgress;

/* ---------- Progress ring ---------- */
export function TRing({
  value, size = 80, color = "var(--t-action)", label, className = "",
}: {
  value: number;
  size?: number;
  color?: string;
  label?: ReactNode;
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - v / 100);
  return (
    <svg className={`t-ring ${className}`} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--t-bg-inset)" strokeWidth="6" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fill="var(--t-fg)" fontFamily="Inter Tight" fontWeight="600" fontSize={size * 0.22}>
        {label ?? `${Math.round(v)}%`}
      </text>
    </svg>
  );
}
export const TrainovateRing = TRing;

/* ---------- Empty state ---------- */
export function TEmpty({
  icon, title, body, action, className = "",
}: {
  icon?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`t-empty ${className}`} style={{ textAlign: "center" }}>
      {icon}
      <h4 className="t-empty__title">{title}</h4>
      {body && <p className="t-empty__body">{body}</p>}
      {action}
    </div>
  );
}
export const TrainovateEmpty = TEmpty;
