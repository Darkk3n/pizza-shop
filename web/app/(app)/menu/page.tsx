import { PizzaIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { listRecipes } from "@/lib/api/menu";
import { requireUser } from "@/lib/auth/currentUser";
import { formatMoney } from "@/lib/helpers/format";

export const metadata: Metadata = { title: "Menu · Pizza Shop POS" };

const RecipeGrid = async () => {
  await requireUser();
  // Staff and admins also receive retired recipes; the menu only offers what can be ordered.
  const recipes = (await listRecipes()).filter((recipe) => recipe.isActive);

  if (recipes.length === 0) {
    return (
      <p className="rounded-lg border border-dashed px-4 py-12 text-center text-muted-foreground">
        The menu is empty right now. Check back soon.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <li key={recipe.recipeId}>
          <Card className="relative h-full transition-colors hover:bg-muted/50">
            <CardHeader className="gap-3">
              <div className="flex items-start justify-between gap-3">
                <PizzaIcon className="size-8 shrink-0 text-primary" aria-hidden="true" />
                <span className="font-mono text-sm text-muted-foreground">
                  from <span className="font-semibold text-foreground">{formatMoney(recipe.basePrice)}</span>
                </span>
              </div>
              <CardTitle className="text-lg">
                {/* Stretched link: the whole card opens the builder. */}
                <Link
                  href={`/menu/${recipe.recipeId}`}
                  className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
                >
                  {recipe.name}
                </Link>
              </CardTitle>
              <CardDescription>{recipe.items.map((item) => item.ingredientName).join(", ")}</CardDescription>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
};

const RecipeGridSkeleton = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading menu">
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className="h-36 rounded-xl" />
      ))}
    </div>
  );
};

const MenuPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Menu</h1>
        <p className="text-muted-foreground">Pick a pizza, then choose the size and toppings.</p>
      </div>
      <Suspense fallback={<RecipeGridSkeleton />}>
        <RecipeGrid />
      </Suspense>
    </div>
  );
};

export default MenuPage;
