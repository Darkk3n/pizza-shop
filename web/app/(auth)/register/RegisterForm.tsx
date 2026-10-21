"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormAlert } from "@/components/forms/FormAlert";
import { FormInput } from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import { registerSchema, type RegisterInput } from "@/lib/api/schemas/auth";
import { register as registerAccount } from "@/lib/auth/actions";
import { applyActionErrors } from "@/lib/helpers/forms";

const FIELDS = ["email", "password", "confirmPassword"] as const;

export const RegisterForm = () => {
  const next = useSearchParams().get("next") ?? undefined;
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    startTransition(async () => {
      // On success the action signs in and redirects, so only failures come back.
      const result = await registerAccount(values, next);
      if (!result.ok) setFormError(applyActionErrors(result, setError, FIELDS));
    });
  });

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
      <FormInput
        id="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        hint="At least 6 characters with upper and lower case, a number and a symbol."
        error={errors.password}
        {...register("password")}
      />
      <FormInput
        id="confirmPassword"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword}
        {...register("confirmPassword")}
      />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
};
