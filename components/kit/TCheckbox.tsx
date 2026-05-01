"use client";

import { InputHTMLAttributes, forwardRef } from "react";

export interface TCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
}

export const TCheckbox = forwardRef<HTMLInputElement, TCheckboxProps>(function TCheckbox(
  { label, className = "", ...rest },
  ref
) {
  return (
    <label className={`t-check ${className}`}>
      <input ref={ref} type="checkbox" {...rest} />
      <span className="t-check__box">
        <svg viewBox="0 0 12 12" fill="none">
          <path d="M2 6 L5 9 L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
});

export const TrainovateCheckbox = TCheckbox;

export interface TRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
}

export const TRadio = forwardRef<HTMLInputElement, TRadioProps>(function TRadio(
  { label, className = "", ...rest },
  ref
) {
  return (
    <label className={`t-radio ${className}`}>
      <input ref={ref} type="radio" {...rest} />
      <span className="t-radio__dot" />
      {label && <span>{label}</span>}
    </label>
  );
});

export const TrainovateRadio = TRadio;
