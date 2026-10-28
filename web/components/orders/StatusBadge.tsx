import { CircleXIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/lib/api/schemas/orders";
import { ORDER_STATUS_LABELS } from "@/lib/helpers/format";

// One tint per stage (yellow, orange, green, neutral), from the --status-* tokens in globals.css.
// Cancelled also carries an icon, so it never depends on color alone.
const STATUS_CLASSES: Record<OrderStatus, string> = {
  Pending: "bg-status-pending text-status-pending-foreground",
  Preparing: "bg-status-preparing text-status-preparing-foreground",
  Ready: "bg-status-ready text-status-ready-foreground",
  Completed: "bg-muted text-muted-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
};

export const StatusBadge = ({ status }: { status: OrderStatus }) => {
  return (
    <Badge variant="secondary" className={STATUS_CLASSES[status]}>
      {status === "Cancelled" && <CircleXIcon data-icon="inline-start" aria-hidden="true" />}
      {ORDER_STATUS_LABELS[status]}
    </Badge>
  );
};
