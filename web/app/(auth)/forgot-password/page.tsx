import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = { title: "Olvidé mi contraseña · Rubencinis & Mate Pizza" };

const ForgotPasswordPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">¿Olvidaste tu contraseña?</CardTitle>
        <CardDescription>Escribe el correo de tu cuenta y te enviaremos un enlace para elegir una nueva.</CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        ¿Ya la recordaste?&nbsp;
        <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          Iniciar sesión
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordPage;
