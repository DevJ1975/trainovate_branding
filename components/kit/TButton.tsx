"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

export interface TButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function TButton({
  variant = "primary",
  size = "md",
  block,
  leadingIcon,
  trailingIcon,
  className = "",
  children,
  ...rest
}: TButtonProps) {
  const cls = [
    "t-btn",
    `t-btn--${variant}`,
    size !== "md" && `t-btn--${size}`,
    block && "t-btn--block",
    className,
  ].filter(Boolean).join(" ");
  return (
    <button className={cls} {...rest}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}

export const TrainovateButton = TButton;
