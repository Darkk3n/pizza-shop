import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { listIngredients } from "@/lib/api/ingredients";
import { getRecipe } from "@/lib/api/menu";
import { requireAdmin } from "@/lib/auth/currentUser";
import { DeleteRecipeDialog } from "../DeleteRecipeDialog";
import { RecipeForm } from "../RecipeForm";

export const metadata: Metadata = { title: "Edit recipe · Pizza Shop POS" };

const EditRecipe = async ({ params }: { params: PageProps<"/recipes/[id]">["params"] }) => {
  await requireAdmin();
  const { id } = await params;
  const [recipe, ingredients] = await Promise.all([getRecipe(id), listIngredients()]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{recipe.name}</h1>
          {!recipe.isActive && <Badge variant="outline">Retired</Badge>}
        </div>
        <DeleteRecipeDialog recipeId={recipe.recipeId} name={recipe.name} />
      </div>
      {/* Keyed by recipe so navigating between recipes starts a fresh form. */}
      <RecipeForm key={recipe.recipeId} recipe={recipe} ingredients={ingredients} />
    </div>
  );
};

const EditRecipeSkeleton = () => {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading recipe">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-96 max-w-2xl" />
    </div>
  );
};

const EditRecipePage = ({ params }: PageProps<"/recipes/[id]">) => {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/recipes" className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
        Recipes
      </Link>
      <Suspense fallback={<EditRecipeSkeleton />}>
        <EditRecipe params={params} />
      </Suspense>
    </div>
  );
};

export default EditRecipePage;
