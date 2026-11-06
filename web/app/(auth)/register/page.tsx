import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = { title: "Crear cuenta · Rubencinis & Mate Pizza" };

const RegisterPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Crea una cuenta</CardTitle>
        <CardDescription>Pide con anticipación y sigue tus pizzas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense>
          <RegisterForm />
        </Suspense>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        ¿Ya tienes cuenta?&nbsp;
        <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          Iniciar sesión
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
