"use client";

import { MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { UnitOfMeasure } from "@/lib/api/schemas/ingredients";
import { deleteUnitOfMeasure } from "./actions";
import { DeleteCatalogItemDialog } from "./DeleteCatalogItemDialog";
import { UnitOfMeasureFormDialog } from "./UnitOfMeasureFormDialog";

const ingredientsLabel = (count: number) => (count === 1 ? "1 ingredient" : `${count} ingredients`);

const UnitOfMeasureActions = ({ unit, ingredientCount }: { unit: UnitOfMeasure; ingredientCount: number }) => {
  const [dialog, setDialog] = useState<"edit" | "delete" | null>(null);
  const setOpen = (which: "edit" | "delete") => (open: boolean) => setDialog(open ? which : null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${unit.name}`}>
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setDialog("edit")}>Edit</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={() => setDialog("delete")}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UnitOfMeasureFormDialog
        open={dialog === "edit"}
        onOpenChange={setOpen("edit")}
        unit={unit}
        ingredientCount={ingredientCount}
      />
      <DeleteCatalogItemDialog
        name={unit.name}
        kind="unit"
        description="This removes it for good. Only units no ingredient uses can be deleted."
        inUseMessage={`${unit.name} is used by ingredients, so it can't be deleted. Move them to another unit first.`}
        onDelete={() => deleteUnitOfMeasure(unit.unitOfMeasureId)}
        open={dialog === "delete"}
        onOpenChange={setOpen("delete")}
      />
    </>
  );
};

type UnitsOfMeasureTableProps = {
  units: UnitOfMeasure[];
  // Ingredients per unit id (retired ones included); a missing id means none.
  usage: Record<string, number>;
};

export const UnitsOfMeasureTable = ({ units, usage }: UnitsOfMeasureTableProps) => {
  const [creating, setCreating] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">How ingredients are stocked and measured in recipes.</p>
        <Button onClick={() => setCreating(true)}>
          <PlusIcon />
          New unit
        </Button>
      </div>
      <UnitOfMeasureFormDialog open={creating} onOpenChange={setCreating} />

      {units.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-12 text-center text-muted-foreground">
          No units yet. Add one before creating ingredients.
        </p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Used by</TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => {
                const count = usage[unit.unitOfMeasureId] ?? 0;
                return (
                  <TableRow key={unit.unitOfMeasureId}>
                    <TableCell className="font-medium">{unit.name}</TableCell>
                    <TableCell className="text-right text-muted-foreground tabular-nums">
                      {count === 0 ? "Not used" : ingredientsLabel(count)}
                    </TableCell>
                    <TableCell className="text-right">
                      <UnitOfMeasureActions unit={unit} ingredientCount={count} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
