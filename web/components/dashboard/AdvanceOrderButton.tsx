"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { advanceStatus } from "@/components/orders/actions";
import { Button } from "@/components/ui/button";
import { nextStatuses, type OrderStatus } from "@/lib/api/schemas/orders";
import { ORDER_STATUS_ACTION_LABELS, ORDER_STATUS_LABELS } from "@/lib/helpers/format";

// The dashboard only offers the next step; skipping ahead and cancelling are on the order page.

type AdvanceOrderButtonProps = { orderId: string; orderNumber: number; status: OrderStatus };

export const AdvanceOrderButton = ({ orderId, orderNumber, status }: AdvanceOrderButtonProps) => {
  const [pending, startTransition] = useTransition();
  const next = nextStatuses(status)[0];
  if (!next) return null;

  const advance = () => {
    startTransition(async () => {
      const result = await advanceStatus(orderId, next);
      if (result.ok) {
        toast.success(`El pedido #${orderNumber} ahora está ${ORDER_STATUS_LABELS[next].toLowerCase()}.`);
      } else if (result.status === 409) {
        // Someone else moved it first; the action already refreshed the board.
        toast.warning(result.message ?? "Este pedido cambió. Se muestra la versión más reciente.");
      } else {
        toast.error(result.message || "No se pudo actualizar el pedido.");
      }
    });
  };

  return (
    <Button size="sm" className="w-full" disabled={pending} onClick={advance}>
      {pending ? "Actualizando…" : ORDER_STATUS_ACTION_LABELS[next]}
    </Button>
  );
};
