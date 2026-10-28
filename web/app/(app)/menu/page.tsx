import type { Metadata } from "next";
import { Suspense } from "react";
import { RecipeCard } from "@/components/menu/RecipeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { listRecipes } from "@/lib/api/menu";
import { requireUser } from "@/lib/auth/currentUser";

export const metadata: Metadata = { title: "Menu · Rubencinis & Mate Pizza" };

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
          <RecipeCard recipe={recipe} ingredients={recipe.items.map((item) => item.ingredientName)} />
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
