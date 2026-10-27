"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormAlert } from "@/components/forms/FormAlert";
import { FormInput } from "@/components/forms/FormInput";
import { Button, buttonVariants } from "@/components/ui/button";
import { emailOnlySchema, type EmailOnlyInput } from "@/lib/api/schemas/auth";
import { requestPasswordReset } from "@/lib/auth/actions";
import { applyActionErrors } from "@/lib/helpers/forms";

const FIELDS = ["email"] as const;

export const ForgotPasswordForm = () => {
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmailOnlyInput>({ resolver: zodResolver(emailOnlySchema), defaultValues: { email: "" } });

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    startTransition(async () => {
      const result = await requestPasswordReset(values);
      if (result.ok) setSentTo(values.email);
      else setFormError(applyActionErrors(result, setError, FIELDS));
    });
  });

  // The API answers the same for any address, so this can't (and doesn't) say whether one exists.
  if (sentTo) {
    return (
      <div className="grid gap-4">
        <div role="status" className="grid gap-2">
          <p className="font-medium">Check your inbox</p>
          <p className="text-sm text-muted-foreground">
            If <span className="font-medium text-foreground">{sentTo}</span> has a confirmed Pizza Shop account, we
            sent it a link to choose a new password. The link expires in a day.
          </p>
        </div>
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <FormAlert message={formError} />
      <FormInput
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        autoFocus
        error={errors.email}
        {...register("email")}
      />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
};
