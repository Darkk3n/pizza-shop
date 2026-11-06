import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { resetLinkSchema } from "@/lib/api/schemas/auth";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = { title: "Nueva contraseña · Rubencinis & Mate Pizza" };

// Opened from the reset email: /reset-password?email=...&code=... (Email:WebBaseUrl in the API).
const ResetPasswordContent = async ({ searchParams }: { searchParams: PageProps<"/reset-password">["searchParams"] }) => {
  const link = resetLinkSchema.safeParse(await searchParams);
  if (!link.success) {
    return (
      <div className="grid gap-4">
        <p className="text-sm text-muted-foreground">
          Este enlace está incompleto. Abre otra vez el correo más reciente o pide un enlace nuevo.
        </p>
        <Link href="/forgot-password" className={buttonVariants({ variant: "outline" })}>
          Pedir un enlace nuevo
        </Link>
      </div>
    );
  }
  return <ResetPasswordForm email={link.data.email} code={link.data.code} />;
};

const ResetPasswordPage = ({ searchParams }: PageProps<"/reset-password">) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Elige una nueva contraseña</CardTitle>
        <CardDescription>El enlace de tu correo funciona una sola vez.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          <ResetPasswordContent searchParams={searchParams} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordPage;
