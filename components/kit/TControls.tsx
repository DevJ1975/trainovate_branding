"use client";

import { InputHTMLAttributes, useState, ReactNode, useEffect } from "react";

/* ---------- Slider ---------- */
export interface TSliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /* nothing extra — pass min/max/step/value/onChange like a normal range */
}
export function TSlider({ className = "", ...rest }: TSliderProps) {
  return <input type="range" className={`t-slider ${className}`} {...rest} />;
}
export const TrainovateSlider = TSlider;

/* ---------- Stepper ---------- */
export function TStepper({
  value, onChange, min = 0, max = 999, step = 1, className = "",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}) {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));
  return (
    <div className={`t-stepper ${className}`}>
      <button type="button" className="t-stepper__btn" onClick={dec} aria-label="decrement">−</button>
      <input
        className="t-stepper__value"
        type="text"
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
        }}
      />
      <button type="button" className="t-stepper__btn" onClick={inc} aria-label="increment">+</button>
    </div>
  );
}
export const TrainovateStepper = TStepper;

/* ---------- Segmented ---------- */
export function TSegmented<T extends string>({
  options, value, onChange, className = "",
}: {
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange: (next: T) => void;
  className?: string;
}) {
  return (
    <div className={`t-segmented ${className}`} role="tablist">
      {options.map((opt) => (
        <button
          type="button"
          key={opt.value}
          role="tab"
          aria-selected={opt.value === value}
          className={`t-segmented__btn ${opt.value === value ? "t-segmented__btn--active" : ""}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
export const TrainovateSegmented = TSegmented;

/* ---------- Tabs (controlled or uncontrolled) ---------- */
export function TTabs<T extends string>({
  options, value, defaultValue, onChange, className = "",
}: {
  options: { value: T; label: ReactNode }[];
  value?: T;
  defaultValue?: T;
  onChange?: (next: T) => void;
  className?: string;
}) {
  const [internal, setInternal] = useState<T>(defaultValue ?? options[0].value);
  const active = value ?? internal;
  const handle = (next: T) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };
  return (
    <div className={`t-tabs ${className}`}>
      {options.map((opt) => (
        <button
          type="button"
          key={opt.value}
          className={`t-tabs__tab ${opt.value === active ? "t-tabs__tab--active" : ""}`}
          onClick={() => handle(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
export const TrainovateTabs = TTabs;
