"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { resendConfirmation } from "@/lib/auth/actions";

// Sends the confirmation link again. The API answers the same for any address, so "sent" means
// "if there's an unconfirmed account for it".
export const ResendConfirmation = ({ email }: { email: string }) => {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  const resend = () => {
    setStatus(null);
    startTransition(async () => {
      const result = await resendConfirmation({ email });
      setStatus(
        result.ok
          ? { ok: true, message: "Listo. Busca el correo más reciente en tu bandeja de entrada (y en spam)." }
          : { ok: false, message: result.message || "No se pudo enviar. Intenta de nuevo en un minuto." },
      );
    });
  };

  return (
    <div className="grid gap-2">
      <Button type="button" variant="outline" disabled={pending} onClick={resend}>
        {pending ? "Enviando…" : "Enviar el enlace otra vez"}
      </Button>
      {status && (
        <p role="status" className={status.ok ? "text-sm text-muted-foreground" : "text-sm text-destructive"}>
          {status.message}
        </p>
      )}
    </div>
  );
};
