import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { listIngredients } from "@/lib/api/ingredients";
import { requireStaff } from "@/lib/auth/currentUser";
import { InventoryTable } from "./InventoryTable";

export const metadata: Metadata = { title: "Inventory · Pizza Shop POS" };

const Inventory = async () => {
  await requireStaff();
  const ingredients = await listIngredients();
  return <InventoryTable ingredients={ingredients} />;
};

const InventorySkeleton = () => {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading inventory">
      <div className="flex gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-7 w-20" />
        ))}
      </div>
      <div className="flex flex-col gap-2 rounded-lg border p-4">
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  );
};

const InventoryPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground">
          Stock is used up automatically by orders. Record deliveries, waste and counts here.
        </p>
      </div>
      <Suspense fallback={<InventorySkeleton />}>
        <Inventory />
      </Suspense>
    </div>
  );
};

export default InventoryPage;
