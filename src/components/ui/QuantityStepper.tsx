"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const pad = size === "sm" ? "px-2 py-1.5" : "px-3 py-2.5";
  return (
    <div className="inline-flex items-center border border-line text-charcoal">
      <button
        type="button"
        aria-label="Decrease quantity"
        className={`${pad} hover:bg-ivory-dim disabled:opacity-30 transition-colors`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={14} strokeWidth={1.75} />
      </button>
      <span className="min-w-[2.25rem] text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className={`${pad} hover:bg-ivory-dim disabled:opacity-30 transition-colors`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus size={14} strokeWidth={1.75} />
      </button>
    </div>
  );
}
