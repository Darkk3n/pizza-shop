import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { listIngredients } from "@/lib/api/ingredients";
import { requireAdmin } from "@/lib/auth/currentUser";
import { RecipeForm } from "../RecipeForm";

export const metadata: Metadata = { title: "New recipe · Rubencinis & Mate Pizza" };

const NewRecipe = async () => {
  await requireAdmin();
  const ingredients = await listIngredients();
  return <RecipeForm ingredients={ingredients} />;
};

const NewRecipePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/recipes" className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
        Recipes
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">New recipe</h1>
      <Suspense fallback={<Skeleton className="h-96 max-w-2xl" aria-busy="true" aria-label="Loading form" />}>
        <NewRecipe />
      </Suspense>
    </div>
  );
};

export default NewRecipePage;
