import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { listIngredients, listUnitsOfMeasure } from "@/lib/api/ingredients";
import { listPizzaSizes } from "@/lib/api/menu";
import { requireAdmin } from "@/lib/auth/currentUser";
import { CatalogTabs } from "./CatalogTabs";
import { isCatalogTab } from "./tabs";

export const metadata: Metadata = { title: "Catalogs · Pizza Shop POS" };

const Catalog = async ({ searchParams }: { searchParams: PageProps<"/catalogs">["searchParams"] }) => {
  await requireAdmin();
  const { tab } = await searchParams;
  // Admins get retired sizes too. Ingredients only feed the "Used by" counts on units.
  const [sizes, units, ingredients] = await Promise.all([listPizzaSizes(), listUnitsOfMeasure(), listIngredients()]);

  const unitUsage: Record<string, number> = {};
  for (const ingredient of ingredients) {
    unitUsage[ingredient.unitOfMeasureId] = (unitUsage[ingredient.unitOfMeasureId] ?? 0) + 1;
  }

  return (
    <CatalogTabs defaultTab={isCatalogTab(tab) ? tab : "sizes"} sizes={sizes} units={units} unitUsage={unitUsage} />
  );
};

const CatalogSkeleton = () => {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading catalog">
      <Skeleton className="h-8 w-64" />
      <div className="flex flex-col gap-2 rounded-lg border p-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  );
};

const CatalogPage = ({ searchParams }: PageProps<"/catalogs">) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Catalogs</h1>
        <p className="text-muted-foreground">The pizza sizes on the menu and the units ingredients are measured in.</p>
      </div>
      <Suspense fallback={<CatalogSkeleton />}>
        <Catalog searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default CatalogPage;
