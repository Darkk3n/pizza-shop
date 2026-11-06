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

const ingredientsLabel = (count: number) => (count === 1 ? "1 ingrediente" : `${count} ingredientes`);

const UnitOfMeasureActions = ({ unit, ingredientCount }: { unit: UnitOfMeasure; ingredientCount: number }) => {
  const [dialog, setDialog] = useState<"edit" | "delete" | null>(null);
  const setOpen = (which: "edit" | "delete") => (open: boolean) => setDialog(open ? which : null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={`Más acciones para ${unit.name}`}>
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setDialog("edit")}>Editar</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={() => setDialog("delete")}>
            Eliminar
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
        kind="unidad"
        description="Se elimina de forma permanente. Solo se pueden eliminar las unidades que ningún ingrediente usa."
        inUseMessage={`${unit.name} se usa en ingredientes, así que no se puede eliminar. Primero hay que cambiarlos a otra unidad.`}
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
        <p className="text-sm text-muted-foreground">Cómo se almacenan los ingredientes y cómo se miden en las recetas.</p>
        <Button onClick={() => setCreating(true)}>
          <PlusIcon />
          Nueva unidad
        </Button>
      </div>
      <UnitOfMeasureFormDialog open={creating} onOpenChange={setCreating} />

      {units.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-12 text-center text-muted-foreground">
          Aún no hay unidades. Se necesita al menos una antes de crear ingredientes.
        </p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unidad</TableHead>
                <TableHead className="text-right">Usada por</TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">Acciones</span>
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
                      {count === 0 ? "Sin uso" : ingredientsLabel(count)}
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
