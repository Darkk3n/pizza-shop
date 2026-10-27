import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Order } from "@/lib/api/schemas/orders";
import { describeTopping, formatTime, ORDER_TYPE_LABELS } from "@/lib/helpers/format";
import { AdvanceOrderButton } from "./AdvanceOrderButton";
import { ElapsedTime } from "./ElapsedTime";

// One ticket on the dashboard: what to make (items and toppings), how long it has waited, and the
// button for the next step.
export const ActiveOrderCard = ({ order }: { order: Order }) => {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-baseline justify-between gap-2">
          <CardTitle className="font-mono">
            <Link href={`/orders/${order.orderId}`} className="hover:underline">
              #{order.orderNumber}
            </Link>
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            <ElapsedTime since={order.createdAt} />
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {ORDER_TYPE_LABELS[order.orderType]} · {formatTime(order.createdAt)}
          {order.placedByEmail && <span className="block truncate">{order.placedByEmail}</span>}
        </p>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2 text-sm">
          {order.items.map((item) => (
            <li key={item.orderItemId}>
              <span className="font-medium">
                <span className="tabular-nums">{item.quantity}×</span> {item.itemNameSnapshot}
              </span>
              {item.toppings.length > 0 && (
                <span className="block text-muted-foreground">
                  + {item.toppings.map(describeTopping).join(", ")}
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <AdvanceOrderButton orderId={order.orderId} orderNumber={order.orderNumber} status={order.status} />
      </CardFooter>
    </Card>
  );
};
