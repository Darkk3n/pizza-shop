import { PlusIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listRecipes } from "@/lib/api/menu";
import { requireAdmin } from "@/lib/auth/currentUser";
import { formatMoney } from "@/lib/helpers/format";

export const metadata: Metadata = { title: "Recipes · Rubencinis & Mate Pizza" };

const RecipesTable = async () => {
  await requireAdmin();
  // Admins also get retired recipes; on the menu first, then by name.
  const recipes = (await listRecipes()).toSorted(
    (a, b) =>
      Number(b.isActive) - Number(a.isActive) || a.name.localeCompare(b.name),
  );

  if (recipes.length === 0) {
    return (
      <p className="rounded-lg border border-dashed px-4 py-12 text-center text-muted-foreground">
        No recipes yet. Add the first one to build the menu.
      </p>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recipe</TableHead>
            <TableHead className="hidden sm:table-cell">Ingredients</TableHead>
            <TableHead className="text-right">Small price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe.recipeId} className="relative">
              <TableCell className="font-medium">
                <span className="flex flex-wrap items-center gap-2">
                  {/* Stretched link: the whole row opens the editor. */}
                  <Link
                    href={`/recipes/${recipe.recipeId}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
                  >
                    {recipe.name}
                  </Link>
                  {!recipe.isActive && <Badge variant="outline">Retired</Badge>}
                </span>
              </TableCell>
              <TableCell className="hidden max-w-96 truncate text-muted-foreground sm:table-cell">
                {recipe.items.map((item) => item.ingredientName).join(", ")}
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {formatMoney(recipe.basePrice)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const RecipesTableSkeleton = () => {
  return (
    <div
      className="flex flex-col gap-2 rounded-lg border p-4"
      aria-busy="true"
      aria-label="Loading recipes"
    >
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className="h-8 w-full" />
      ))}
    </div>
  );
};

const RecipesPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Recipes</h1>
          <p className="text-muted-foreground">
            The menu: what each pizza costs and the ingredients it uses.
          </p>
        </div>
        <Link href="/recipes/new" className={buttonVariants()}>
          <PlusIcon />
          New recipe
        </Link>
      </div>
      <Suspense fallback={<RecipesTableSkeleton />}>
        <RecipesTable />
      </Suspense>
    </div>
  );
};

export default RecipesPage;
