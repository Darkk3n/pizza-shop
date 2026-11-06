import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FullMenu, RecipeGridSkeleton } from "@/components/public/MenuSections";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Menú",
  description: "Nuestras pizzas, tamaños e ingredientes extra, con precios. Inicia sesión para armar la tuya y pedir en línea.",
  alternates: { canonical: "/menu" },
  openGraph: { url: "/menu" },
};

// Shown at /menu to signed-out visitors (proxy.ts rewrites to this route). Each pizza links to
// /menu/{id}, which sends them to sign in and then back to that pizza.
const PublicMenuPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Nuestro menú</h1>
        <p className="text-muted-foreground">Todas las pizzas vienen en cualquier tamaño, con ingredientes extra en toda la pizza o en una mitad.</p>
      </div>
      <div className="flex flex-col gap-3 rounded-xl border bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          <span className="font-medium">¿Todo listo para pedir?</span>{" "}
          <span className="text-muted-foreground">Inicia sesión para armar tu pizza y seguirla en tiempo real.</span>
        </p>
        <div className="flex gap-2">
          <Link href="/login?next=/menu" className={buttonVariants({ variant: "outline" })}>
            Iniciar sesión
          </Link>
          <Link href="/register" className={buttonVariants()}>
            Crear una cuenta
          </Link>
        </div>
      </div>
      <Suspense fallback={<RecipeGridSkeleton count={6} />}>
        <FullMenu />
      </Suspense>
    </div>
  );
};

export default PublicMenuPage;
