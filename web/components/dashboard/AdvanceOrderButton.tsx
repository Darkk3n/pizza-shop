"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { advanceStatus } from "@/components/orders/actions";
import { Button } from "@/components/ui/button";
import { nextStatuses, type OrderStatus } from "@/lib/api/schemas/orders";
import { ORDER_STATUS_LABELS } from "@/lib/helpers/format";

// The dashboard only offers the next step; skipping ahead and cancelling are on the order page.
const LABELS: Partial<Record<OrderStatus, string>> = {
  Preparing: "Start preparing",
  Ready: "Mark ready",
  Completed: "Complete",
};

type AdvanceOrderButtonProps = { orderId: string; orderNumber: number; status: OrderStatus };

export const AdvanceOrderButton = ({ orderId, orderNumber, status }: AdvanceOrderButtonProps) => {
  const [pending, startTransition] = useTransition();
  const next = nextStatuses(status)[0];
  if (!next) return null;

  const advance = () => {
    startTransition(async () => {
      const result = await advanceStatus(orderId, next);
      if (result.ok) {
        toast.success(`Order #${orderNumber} is now ${ORDER_STATUS_LABELS[next].toLowerCase()}.`);
      } else if (result.status === 409) {
        // Someone else moved it first; the action already refreshed the board.
        toast.warning(result.message ?? "This order changed. Showing the latest version.");
      } else {
        toast.error(result.message || "Couldn't update the order.");
      }
    });
  };

  return (
    <Button size="sm" className="w-full" disabled={pending} onClick={advance}>
      {pending ? "Updating…" : LABELS[next]}
    </Button>
  );
};
