"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { advanceStatus } from "@/components/orders/actions";
import { CancelOrderDialog } from "@/components/orders/CancelOrderDialog";
import { Button } from "@/components/ui/button";
import type { ActionFailure } from "@/lib/helpers/actions";
import { isCancellable, nextStatuses, type OrderStatus } from "@/lib/api/schemas/orders";
import { ORDER_STATUS_LABELS } from "@/lib/helpers/format";

type OrderActionsProps = { orderId: string; orderNumber: number; status: OrderStatus };

// 409 means someone else changed the order first; the action already refreshed the page.
const reportFailure = (result: ActionFailure) => {
  if (result.status === 409) {
    toast.warning(result.message ?? "This order changed. Showing the latest version.");
  } else {
    toast.error(result.message || Object.values(result.fieldErrors ?? {}).join(" ") || "Couldn't update the order.");
  }
};

export const OrderActions = ({ orderId, orderNumber, status }: OrderActionsProps) => {
  const [pending, startTransition] = useTransition();
  const [target, setTarget] = useState<OrderStatus | null>(null);
  const forward = nextStatuses(status);

  if (forward.length === 0 && !isCancellable(status)) return null;

  const move = (next: OrderStatus) => {
    setTarget(next);
    startTransition(async () => {
      const result = await advanceStatus(orderId, next);
      if (result.ok) toast.success(`Order #${orderNumber} is now ${ORDER_STATUS_LABELS[next].toLowerCase()}.`);
      else reportFailure(result);
      setTarget(null);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* The next step is the main action; later steps can be skipped to. */}
      {forward.map((next, index) => (
        <Button key={next} variant={index === 0 ? "default" : "outline"} disabled={pending} onClick={() => move(next)}>
          {pending && target === next ? "Updating…" : `Mark ${ORDER_STATUS_LABELS[next].toLowerCase()}`}
        </Button>
      ))}
      {isCancellable(status) && (
        <CancelOrderDialog
          orderId={orderId}
          orderNumber={orderNumber}
          description="The ingredients this order used go back into stock. The order stays in the history as cancelled."
          successMessage={`Order #${orderNumber} cancelled. Its stock was returned.`}
          reasonPlaceholder="e.g. Customer changed their mind"
        />
      )}
    </div>
  );
};
