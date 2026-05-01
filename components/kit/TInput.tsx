"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef, ReactNode } from "react";

/* ---------- Field wrapper ---------- */
export function TField({
  label, help, error, children, className = "",
}: {
  label?: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`t-field ${className}`}>
      {label && <label className="t-field__label">{label}</label>}
      {children}
      {error ? (
        <p className="t-field__error">{error}</p>
      ) : help ? (
        <p className="t-field__help">{help}</p>
      ) : null}
    </div>
  );
}
export const TrainovateField = TField;

/* ---------- Input ---------- */
export interface TInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}
export const TInput = forwardRef<HTMLInputElement, TInputProps>(function TInput(
  { invalid, className = "", ...rest },
  ref
) {
  const cls = ["t-input", invalid && "t-input--error", className].filter(Boolean).join(" ");
  return <input ref={ref} className={cls} {...rest} />;
});
export const TrainovateInput = TInput;

/* ---------- Textarea ---------- */
export interface TTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}
export const TTextarea = forwardRef<HTMLTextAreaElement, TTextareaProps>(function TTextarea(
  { invalid, className = "", ...rest },
  ref
) {
  const cls = ["t-textarea", invalid && "t-input--error", className].filter(Boolean).join(" ");
  return <textarea ref={ref} className={cls} {...rest} />;
});
export const TrainovateTextarea = TTextarea;

/* ---------- Select ---------- */
export interface TSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}
export const TSelect = forwardRef<HTMLSelectElement, TSelectProps>(function TSelect(
  { invalid, className = "", children, ...rest },
  ref
) {
  const cls = ["t-select", invalid && "t-input--error", className].filter(Boolean).join(" ");
  return <select ref={ref} className={cls} {...rest}>{children}</select>;
});
export const TrainovateSelect = TSelect;
