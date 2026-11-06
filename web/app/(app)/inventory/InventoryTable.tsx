"use client";

import { useState } from "react";
import { ChoiceGroup } from "@/components/forms/ChoiceGroup";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Ingredient, UnitOfMeasure } from "@/lib/api/schemas/ingredients";
import { formatMoney, formatQuantity } from "@/lib/helpers/format";
import { cn } from "@/lib/utils";
import { AdjustStockDialog } from "./AdjustStockDialog";
import { IngredientAdminActions, NewIngredientButton } from "./IngredientAdminActions";

type View = "active" | "out" | "retired" | "all";

// Orders may push stock negative, so "out" means zero or below, which is what needs a restock.
const isOut = (ingredient: Ingredient) => ingredient.currentStock <= 0;

const VIEWS: Record<View, { label: string; matches: (ingredient: Ingredient) => boolean; empty: string }> = {
  active: { label: "Activos", matches: (i) => i.isActive, empty: "No hay ingredientes activos." },
  out: { label: "Agotados", matches: (i) => i.isActive && isOut(i), empty: "No hay ingredientes agotados." },
  retired: { label: "Retirados", matches: (i) => !i.isActive, empty: "No hay ingredientes retirados." },
  all: { label: "Todos", matches: () => true, empty: "Aún no hay ingredientes." },
};

// The API returns every ingredient at once (a restaurant has dozens, not thousands), so
// filtering happens here and stays instant.
type InventoryTableProps = {
  ingredients: Ingredient[];
  // Only passed for admins, who also manage the catalog (create, edit, retire, delete).
  units?: UnitOfMeasure[];
};

export const InventoryTable = ({ ingredients, units }: InventoryTableProps) => {
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
        <ChoiceGroup legend="Mostrar" hideLegend size="sm" value={view} choices={choices} onChange={setView} />
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Buscar ingredientes"
            aria-label="Buscar ingredientes"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="sm:w-64"
          />
          {units && <NewIngredientButton units={units} />}
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-12 text-center text-muted-foreground">
          {term ? `Ningún ingrediente coincide con «${search.trim()}».` : VIEWS[view].empty}
        </p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingrediente</TableHead>
                <TableHead className="text-right">Existencia</TableHead>
                <TableHead className="hidden sm:table-cell">Unidad</TableHead>
                <TableHead className="hidden md:table-cell">Precio como extra</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((ingredient) => (
                <TableRow key={ingredient.ingredientId}>
                  <TableCell className="font-medium">
                    <span className="flex flex-wrap items-center gap-2">
                      {ingredient.name}
                      {!ingredient.isActive && <Badge variant="outline">Retirado</Badge>}
                      {ingredient.isActive && isOut(ingredient) && (
                        <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                          Agotado
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
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <AdjustStockDialog ingredient={ingredient} />
                      {units && <IngredientAdminActions ingredient={ingredient} units={units} />}
                    </div>
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
