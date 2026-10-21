"use client";

import type { ComponentProps } from "react";
import type { FieldError } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = ComponentProps<typeof Input> & {
  id: string;
  label: string;
  error?: FieldError;
  hint?: string;
};

// Label + input + error, wired for screen readers (aria-invalid, aria-describedby).
export const FormInput = ({ id, label, error, hint, ...inputProps }: FormInputProps) => {
  const messageId = `${id}-message`;
  const message = error?.message ?? hint;

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        {...inputProps}
      />
      {message && (
        <p id={messageId} className={error ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
          {message}
        </p>
      )}
    </div>
  );
};
