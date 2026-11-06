"use client";

import { MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { PizzaSize } from "@/lib/api/schemas/menu";
import { formatMoney } from "@/lib/helpers/format";
import { deletePizzaSize } from "./actions";
import { DeleteCatalogItemDialog } from "./DeleteCatalogItemDialog";
import { EXAMPLE_SMALL_PRICE, PizzaSizeFormDialog } from "./PizzaSizeFormDialog";

const multiplier = new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// The dialogs live outside the menu so they stay open after the menu closes.
const PizzaSizeActions = ({ size }: { size: PizzaSize }) => {
  const [dialog, setDialog] = useState<"edit" | "delete" | null>(null);
  const setOpen = (which: "edit" | "delete") => (open: boolean) => setDialog(open ? which : null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={`Más acciones para ${size.name}`}>
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
      <PizzaSizeFormDialog open={dialog === "edit"} onOpenChange={setOpen("edit")} size={size} />
      <DeleteCatalogItemDialog
        name={size.name}
        kind="tamaño"
        description="Se elimina de forma permanente. Los tamaños que se usaron en pedidos anteriores solo se pueden retirar."
        inUseMessage={`${size.name} aparece en pedidos anteriores, así que no se puede eliminar. En su lugar, se puede editar y marcar como Retirado.`}
        onDelete={() => deletePizzaSize(size.pizzaSizeId)}
        open={dialog === "delete"}
        onOpenChange={setOpen("delete")}
      />
    </>
  );
};

export const PizzaSizesTable = ({ sizes }: { sizes: PizzaSize[] }) => {
  const [creating, setCreating] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Del más chico al más grande. Los clientes solo ven los tamaños del menú.
        </p>
        <Button onClick={() => setCreating(true)}>
          <PlusIcon />
          Nuevo tamaño
        </Button>
      </div>
      <PizzaSizeFormDialog open={creating} onOpenChange={setCreating} />

      {sizes.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-12 text-center text-muted-foreground">
          Aún no hay tamaños. Se necesita al menos uno para que los clientes puedan pedir.
        </p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tamaño</TableHead>
                <TableHead className="text-right">Multiplicador</TableHead>
                <TableHead className="hidden text-right sm:table-cell">
                  A {formatMoney(EXAMPLE_SMALL_PRICE)} Small
                </TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sizes.map((size) => (
                <TableRow key={size.pizzaSizeId}>
                  <TableCell className="font-medium">
                    <span className="flex flex-wrap items-center gap-2">
                      {size.name}
                      {!size.isActive && <Badge variant="outline">Retirado</Badge>}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    ×{multiplier.format(size.priceMultiplier)}
                  </TableCell>
                  <TableCell className="hidden text-right font-mono tabular-nums text-muted-foreground sm:table-cell">
                    {formatMoney(EXAMPLE_SMALL_PRICE * size.priceMultiplier)}
                  </TableCell>
                  <TableCell className="text-right">
                    <PizzaSizeActions size={size} />
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
