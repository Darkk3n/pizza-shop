import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/lib/api/schemas/orders";
import { ORDER_STATUS_LABELS } from "@/lib/helpers/format";

// One quiet tint per stage; Ready stands out because it's waiting on someone.
const STATUS_CLASSES: Record<OrderStatus, string> = {
  Pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  Preparing: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
  Ready: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  Completed: "bg-muted text-muted-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
};

export const StatusBadge = ({ status }: { status: OrderStatus }) => {
  return (
    <Badge variant="secondary" className={STATUS_CLASSES[status]}>
      {ORDER_STATUS_LABELS[status]}
    </Badge>
  );
};
