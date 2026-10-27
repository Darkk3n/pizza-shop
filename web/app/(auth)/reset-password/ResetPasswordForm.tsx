"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormAlert } from "@/components/forms/FormAlert";
import { FormInput } from "@/components/forms/FormInput";
import { Button, buttonVariants } from "@/components/ui/button";
import { PASSWORD_HINT, resetPasswordSchema, type ResetPasswordInput } from "@/lib/api/schemas/auth";
import { resetPassword } from "@/lib/auth/actions";
import { applyActionErrors } from "@/lib/helpers/forms";

const FIELDS = ["password", "confirmPassword"] as const;

// The email and code come from the emailed link; only the new password is typed here.
export const ResetPasswordForm = ({ email, code }: { email: string; code: string }) => {
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [linkExpired, setLinkExpired] = useState(false);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    startTransition(async () => {
      const result = await resetPassword(email, code, values);
      if (result.ok) {
        setDone(true);
        return;
      }
      setFormError(applyActionErrors(result, setError, FIELDS));
      setLinkExpired(result.code === "InvalidLink");
    });
  });

  if (done) {
    return (
      <div className="grid gap-4">
        <p role="status" className="text-sm text-muted-foreground">
          Your password was changed. Sign in with the new one.
        </p>
        <Link href="/login" className={buttonVariants({ size: "lg" })}>
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <FormAlert message={formError} />
      {linkExpired && (
        <Link href="/forgot-password" className={buttonVariants({ variant: "outline" })}>
          Ask for a new link
        </Link>
      )}
      <p className="text-sm text-muted-foreground">
        For <span className="font-medium text-foreground">{email}</span>
      </p>
      <FormInput
        id="password"
        label="New password"
        type="password"
        autoComplete="new-password"
        autoFocus
        hint={PASSWORD_HINT}
        error={errors.password}
        {...register("password")}
      />
      <FormInput
        id="confirmPassword"
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword}
        {...register("confirmPassword")}
      />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Saving…" : "Set new password"}
      </Button>
    </form>
  );
};
