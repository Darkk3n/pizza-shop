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
          <p className="font-medium">Revisa tu bandeja de entrada</p>
          <p className="text-sm text-muted-foreground">
            Si <span className="font-medium text-foreground">{sentTo}</span> tiene una cuenta confirmada en Rubencinis & Mate
            Pizza, le enviamos un enlace para elegir una nueva contraseña. El enlace vence en un día.
          </p>
        </div>
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          Volver a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <FormAlert message={formError} />
      <FormInput
        id="email"
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        autoFocus
        error={errors.email}
        {...register("email")}
      />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Enviando…" : "Enviar enlace"}
      </Button>
    </form>
  );
};
