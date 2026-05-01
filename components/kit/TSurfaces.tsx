"use client";

import { ReactNode } from "react";

/* ---------- Card ---------- */
export function TCard({
  elevated, padded = true, className = "", children,
}: {
  elevated?: boolean;
  padded?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = ["t-card", elevated && "t-card--elevated", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {padded ? <div className="t-card__body">{children}</div> : children}
    </div>
  );
}
export const TrainovateCard = TCard;

/* ---------- Badge ---------- */
export type BadgeTone = "neutral" | "info" | "success" | "warning" | "danger" | "accent";

export function TBadge({
  tone = "neutral", className = "", children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return <span className={`t-badge t-badge--${tone} ${className}`}>{children}</span>;
}
export const TrainovateBadge = TBadge;

/* ---------- Alert ---------- */
export type AlertTone = "info" | "success" | "warning" | "danger";

export function TAlert({
  tone = "info", title, children, className = "",
}: {
  tone?: AlertTone;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`t-alert t-alert--${tone} ${className}`}>
      {title && <div className="t-alert__title">{title}</div>}
      <div className="t-alert__body">{children}</div>
    </div>
  );
}
export const TrainovateAlert = TAlert;
