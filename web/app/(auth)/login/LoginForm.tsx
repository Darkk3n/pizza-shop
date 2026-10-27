"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ResendConfirmation } from "@/components/auth/ResendConfirmation";
import { FormAlert } from "@/components/forms/FormAlert";
import { FormInput } from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import { credentialsSchema, type Credentials } from "@/lib/api/schemas/auth";
import { login } from "@/lib/auth/actions";
import { applyActionErrors } from "@/lib/helpers/forms";

const FIELDS = ["email", "password"] as const;

export const LoginForm = () => {
  const next = useSearchParams().get("next") ?? undefined;
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  // Set when the password was right but the account hasn't confirmed its email yet.
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    setUnconfirmedEmail(null);
    startTransition(async () => {
      // On success the action redirects, so only failures come back.
      const result = await login(values, next);
      if (result.ok) return;
      setFormError(applyActionErrors(result, setError, FIELDS));
      if (result.code === "EmailNotConfirmed") setUnconfirmedEmail(values.email);
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <FormAlert message={formError} />
      {unconfirmedEmail && <ResendConfirmation email={unconfirmedEmail} />}
      <FormInput
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        autoFocus
        error={errors.email}
        {...register("email")}
      />
      <FormInput
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        error={errors.password}
        {...register("password")}
      />
      <Link
        href="/forgot-password"
        className="-mt-2 w-fit text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Forgot your password?
      </Link>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
};
