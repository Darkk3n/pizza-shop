"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormAlert } from "@/components/forms/FormAlert";
import { ResendConfirmation } from "@/components/auth/ResendConfirmation";
import { FormInput } from "@/components/forms/FormInput";
import { Button, buttonVariants } from "@/components/ui/button";
import { PASSWORD_HINT, registerSchema, type RegisterInput } from "@/lib/api/schemas/auth";
import { register as registerAccount } from "@/lib/auth/actions";
import { applyActionErrors } from "@/lib/helpers/forms";

const FIELDS = ["email", "password", "confirmPassword"] as const;

// After signing up, the account waits for its emailed confirmation link before it can sign in.
const CheckInbox = ({ email }: { email: string }) => {
  return (
    <div className="grid gap-4">
      <div role="status" className="grid gap-2">
        <p className="font-medium">Check your inbox</p>
        <p className="text-sm text-muted-foreground">
          We sent a confirmation link to <span className="font-medium text-foreground">{email}</span>. Open it to
          finish creating your account, then sign in. The link expires in a day.
        </p>
      </div>
      <ResendConfirmation email={email} />
      <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
        Go to sign in
      </Link>
    </div>
  );
};

export const RegisterForm = () => {
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
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
      const result = await registerAccount(values);
      if (result.ok) setRegisteredEmail(result.email);
      else setFormError(applyActionErrors(result, setError, FIELDS));
    });
  });

  if (registeredEmail) return <CheckInbox email={registeredEmail} />;

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
        hint={PASSWORD_HINT}
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
