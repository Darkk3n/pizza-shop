import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getRecipe, listPizzaSizes, listToppings, quoteItems } from "@/lib/api/menu";
import { ApiError } from "@/lib/api/problem";
import { requireUser } from "@/lib/auth/currentUser";
import { PizzaBuilder } from "./PizzaBuilder";

export const metadata: Metadata = { title: "Build your pizza · Pizza Shop POS" };

const Builder = async ({ params }: { params: PageProps<"/menu/[recipeId]">["params"] }) => {
  await requireUser();
  const { recipeId } = await params;
  const [recipe, allSizes, toppings] = await Promise.all([getRecipe(recipeId), listPizzaSizes(), listToppings()]);
  // Staff can open a retired recipe by URL; it can't be ordered, so don't offer it.
  if (!recipe.isActive) notFound();
  // Staff and admins also get retired sizes, which can't be ordered either.
  const sizes = allSizes.filter((size) => size.isActive);

  // Price for the default pizza (smallest size, no extras), so the panel isn't empty on first paint.
  let initialQuote = null;
  try {
    initialQuote = await quoteItems([
      { recipeId: recipe.recipeId, pizzaSizeId: sizes[0]?.pizzaSizeId ?? null, quantity: 1, toppings: [] },
    ]);
  } catch (error) {
    // The builder shows its own error and retries; only unexpected failures should surface here.
    if (!(error instanceof ApiError)) throw error;
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{recipe.name}</h1>
        <p className="text-muted-foreground">Choose a size and any extra toppings.</p>
      </div>
      <PizzaBuilder recipe={recipe} sizes={sizes} toppings={toppings} initialQuote={initialQuote} />
    </>
  );
};

const BuilderSkeleton = () => {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading pizza">
      <Skeleton className="h-8 w-56" />
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
        <Skeleton className="h-72 rounded-xl" />
      </div>
    </div>
  );
};

const BuilderPage = ({ params }: PageProps<"/menu/[recipeId]">) => {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/menu" className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
        Menu
      </Link>
      <Suspense fallback={<BuilderSkeleton />}>
        <Builder params={params} />
      </Suspense>
    </div>
  );
};

export default BuilderPage;
