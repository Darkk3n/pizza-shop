"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UnitOfMeasure } from "@/lib/api/schemas/ingredients";
import type { PizzaSize } from "@/lib/api/schemas/menu";
import { PizzaSizesTable } from "./PizzaSizesTable";
import { CATALOG_TABS, type CatalogTab } from "./tabs";
import { UnitsOfMeasureTable } from "./UnitsOfMeasureTable";

type CatalogTabsProps = {
  defaultTab: CatalogTab;
  sizes: PizzaSize[];
  units: UnitOfMeasure[];
  unitUsage: Record<string, number>;
};

// The tab is kept in ?tab= so a reload or a shared link opens it. replaceState updates the URL
// without a navigation (both tabs' data is already here).
export const CatalogTabs = ({ defaultTab, sizes, units, unitUsage }: CatalogTabsProps) => {
  const onTabChange = (tab: string) => {
    const url = new URL(window.location.href);
    if (tab === CATALOG_TABS[0]) url.searchParams.delete("tab");
    else url.searchParams.set("tab", tab);
    window.history.replaceState(window.history.state, "", url);
  };

  return (
    <Tabs defaultValue={defaultTab} onValueChange={onTabChange} className="gap-4">
      <TabsList>
        <TabsTrigger value="sizes">Pizza sizes</TabsTrigger>
        <TabsTrigger value="units">Units of measure</TabsTrigger>
      </TabsList>
      <TabsContent value="sizes">
        <PizzaSizesTable sizes={sizes} />
      </TabsContent>
      <TabsContent value="units">
        <UnitsOfMeasureTable units={units} usage={unitUsage} />
      </TabsContent>
    </Tabs>
  );
};
