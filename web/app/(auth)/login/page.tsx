import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Iniciar sesión · Rubencinis & Mate Pizza" };

const LoginPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Iniciar sesión</CardTitle>
        <CardDescription>Usa tu cuenta de Rubencinis & Mate Pizza.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* LoginForm reads ?next=, which is request data, so it streams in. */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        ¿Primera vez aquí?&nbsp;
        <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
          Crea una cuenta
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
