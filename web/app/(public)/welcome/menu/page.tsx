import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FullMenu, RecipeGridSkeleton } from "@/components/public/MenuSections";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Menu",
  description: "Our pizzas, sizes and toppings, with prices. Sign in to build your own and order online.",
  alternates: { canonical: "/menu" },
  openGraph: { url: "/menu" },
};

// Shown at /menu to signed-out visitors (proxy.ts rewrites to this route). Each pizza links to
// /menu/{id}, which sends them to sign in and then back to that pizza.
const PublicMenuPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Our menu</h1>
        <p className="text-muted-foreground">Every pizza comes in any size, with toppings on the whole pizza or half.</p>
      </div>
      <div className="flex flex-col gap-3 rounded-xl border bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          <span className="font-medium">Ready to order?</span>{" "}
          <span className="text-muted-foreground">Sign in to customize a pizza and track it live.</span>
        </p>
        <div className="flex gap-2">
          <Link href="/login?next=/menu" className={buttonVariants({ variant: "outline" })}>
            Sign in
          </Link>
          <Link href="/register" className={buttonVariants()}>
            Create an account
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
