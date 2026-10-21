"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Choice<T extends string> = { value: T; label: ReactNode; hint?: ReactNode };

type ChoiceGroupProps<T extends string> = {
  legend: string;
  // Hide the legend visually when the surrounding UI already names the group.
  hideLegend?: boolean;
  value: T | null;
  choices: readonly Choice<T>[];
  onChange: (value: T) => void;
  size?: "sm" | "md";
  className?: string;
};

// Single choice as pill buttons, built on native radio inputs (fieldset + legend), so arrow
// keys, focus and screen readers work without extra code.
export const ChoiceGroup = <T extends string>({
  legend,
  hideLegend,
  value,
  choices,
  onChange,
  size = "md",
  className,
}: ChoiceGroupProps<T>) => {
  const name = useId();

  return (
    <fieldset className={cn("grid gap-2", className)}>
      <legend className={cn("mb-2 text-sm font-medium", hideLegend && "sr-only")}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {choices.map((choice) => (
          <label key={choice.value} className="relative">
            <input
              type="radio"
              name={name}
              value={choice.value}
              checked={value === choice.value}
              onChange={() => onChange(choice.value)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "flex cursor-pointer flex-col items-center rounded-md border border-border bg-background text-center font-medium transition-colors hover:bg-muted",
                "peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-foreground",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
                size === "sm" ? "px-2.5 py-1 text-xs" : "min-w-20 px-3 py-2 text-sm",
              )}
            >
              {choice.label}
              {choice.hint && <span className="text-xs font-normal text-muted-foreground">{choice.hint}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
