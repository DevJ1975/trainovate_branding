"use client";

import { InputHTMLAttributes, forwardRef } from "react";

export interface TSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
}

export const TSwitch = forwardRef<HTMLInputElement, TSwitchProps>(function TSwitch(
  { label, className = "", ...rest },
  ref
) {
  return (
    <label className={`t-switch ${className}`}>
      <input ref={ref} type="checkbox" {...rest} />
      <span className="t-switch__track"><span className="t-switch__thumb" /></span>
      {label && <span>{label}</span>}
    </label>
  );
});

export const TrainovateSwitch = TSwitch;
