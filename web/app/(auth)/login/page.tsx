import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in · Pizza Shop POS" };

const LoginPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Sign in</CardTitle>
        <CardDescription>Use your Pizza Shop account.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* LoginForm reads ?next=, which is request data, so it streams in. */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        New here?&nbsp;
        <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
          Create an account
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
