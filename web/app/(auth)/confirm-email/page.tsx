import { CircleCheckIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { confirmEmail } from "@/lib/auth/emailConfirmation";

export const metadata: Metadata = { title: "Confirmar correo · Rubencinis & Mate Pizza" };

// Opened from the confirmation email: /confirm-email?userId=...&code=...[&changedEmail=...].
// Confirming on load (no button) is what Identity's own link does; it's safe to repeat, so a mail
// client that prefetches the link does no harm.
const Confirmation = async ({ searchParams }: { searchParams: PageProps<"/confirm-email">["searchParams"] }) => {
  const result = await confirmEmail(await searchParams);

  if (result === "confirmed") {
    return (
      <div className="grid gap-4">
        <p role="status" className="flex items-center gap-2 font-medium">
          <CircleCheckIcon className="size-5 text-primary" aria-hidden="true" />
          Tu correo quedó confirmado.
        </p>
        <Link href="/login" className={buttonVariants({ size: "lg" })}>
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted-foreground">
        {result === "rate-limited"
          ? "Demasiados intentos por ahora. Espera un minuto y vuelve a abrir el enlace."
          : "Este enlace venció, fue reemplazado por uno más reciente o está incompleto. Inicia sesión para que te enviemos uno nuevo."}
      </p>
      <Link href="/login" className={buttonVariants({ variant: "outline" })}>
        Ir a iniciar sesión
      </Link>
    </div>
  );
};

const ConfirmEmailPage = ({ searchParams }: PageProps<"/confirm-email">) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Confirma tu correo</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="h-20 w-full" />}>
          <Confirmation searchParams={searchParams} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default ConfirmEmailPage;
