"use client";

import { useState } from "react";
import { ChoiceGroup } from "@/components/forms/ChoiceGroup";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Ingredient } from "@/lib/api/schemas/ingredients";
import { formatMoney, formatQuantity } from "@/lib/helpers/format";
import { cn } from "@/lib/utils";
import { AdjustStockDialog } from "./AdjustStockDialog";

type View = "active" | "out" | "retired" | "all";

// Orders may push stock negative, so "out" means zero or below, which is what needs a restock.
const isOut = (ingredient: Ingredient) => ingredient.currentStock <= 0;

const VIEWS: Record<View, { label: string; matches: (ingredient: Ingredient) => boolean; empty: string }> = {
  active: { label: "Active", matches: (i) => i.isActive, empty: "No active ingredients." },
  out: { label: "Out of stock", matches: (i) => i.isActive && isOut(i), empty: "Nothing is out of stock." },
  retired: { label: "Retired", matches: (i) => !i.isActive, empty: "No retired ingredients." },
  all: { label: "All", matches: () => true, empty: "No ingredients yet." },
};

// The API returns every ingredient at once (a restaurant has dozens, not thousands), so
// filtering happens here and stays instant.
export const InventoryTable = ({ ingredients }: { ingredients: Ingredient[] }) => {
  const [view, setView] = useState<View>("active");
  const [search, setSearch] = useState("");

  const outCount = ingredients.filter(VIEWS.out.matches).length;
  const term = search.trim().toLowerCase();
  const rows = ingredients.filter((i) => VIEWS[view].matches(i) && i.name.toLowerCase().includes(term));
  const choices = (Object.keys(VIEWS) as View[]).map((value) => ({
    value,
    label: value === "out" && outCount > 0 ? `${VIEWS.out.label} (${outCount})` : VIEWS[value].label,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <ChoiceGroup legend="Show" hideLegend size="sm" value={view} choices={choices} onChange={setView} />
        <Input
          type="search"
          placeholder="Search ingredients"
          aria-label="Search ingredients"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:max-w-64"
        />
      </div>

      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-12 text-center text-muted-foreground">
          {term ? `No ingredients match "${search.trim()}".` : VIEWS[view].empty}
        </p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="hidden sm:table-cell">Unit</TableHead>
                <TableHead className="hidden md:table-cell">Topping</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((ingredient) => (
                <TableRow key={ingredient.ingredientId}>
                  <TableCell className="font-medium">
                    <span className="flex flex-wrap items-center gap-2">
                      {ingredient.name}
                      {!ingredient.isActive && <Badge variant="outline">Retired</Badge>}
                      {ingredient.isActive && isOut(ingredient) && (
                        <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                          Out
                        </Badge>
                      )}
                    </span>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-mono tabular-nums",
                      ingredient.currentStock < 0 && "text-destructive",
                    )}
                  >
                    {formatQuantity(ingredient.currentStock)}
                    <span className="text-muted-foreground sm:hidden"> {ingredient.unitOfMeasureName}</span>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {ingredient.unitOfMeasureName}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {ingredient.toppingPrice === null ? "—" : formatMoney(ingredient.toppingPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    <AdjustStockDialog ingredient={ingredient} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
