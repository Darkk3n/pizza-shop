import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order } from "@/lib/api/schemas/orders";
import { requireStaff } from "@/lib/auth/currentUser";
import {
  AMOUNT_LABELS,
  COVERAGE_LABELS,
  formatDateTime,
  formatMoney,
  ORDER_TYPE_LABELS,
} from "@/lib/helpers/format";
import { getOrder } from "@/lib/api/orders";
import { StatusBadge } from "../StatusBadge";
import { OrderActions } from "./OrderActions";

export const metadata: Metadata = { title: "Order · Pizza Shop POS" };

const ItemsTable = ({ order }: { order: Order }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead className="text-right">Qty</TableHead>
          <TableHead className="text-right">Unit</TableHead>
          <TableHead className="text-right">Line</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.items.map((item) => (
          <TableRow key={item.orderItemId}>
            <TableCell className="whitespace-normal">
              <div className="font-medium">{item.itemNameSnapshot}</div>
              {item.toppings.length > 0 && (
                <ul className="mt-1 flex flex-col gap-0.5 text-sm text-muted-foreground">
                  {item.toppings.map((topping) => (
                    <li key={topping.orderItemToppingId}>
                      + {topping.ingredientName} · {COVERAGE_LABELS[topping.coverage]}
                      {topping.extraAmount !== "Standard" && ` · ${AMOUNT_LABELS[topping.extraAmount]}`}
                      <span className="font-mono"> ({formatMoney(topping.priceAdjustment)})</span>
                    </li>
                  ))}
                </ul>
              )}
            </TableCell>
            <TableCell className="text-right align-top tabular-nums">{item.quantity}</TableCell>
            <TableCell className="text-right align-top font-mono tabular-nums">{formatMoney(item.unitPrice)}</TableCell>
            <TableCell className="text-right align-top font-mono tabular-nums">{formatMoney(item.lineTotal)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Subtotal</TableCell>
          <TableCell className="text-right font-mono tabular-nums">{formatMoney(order.subTotal)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3}>Tax</TableCell>
          <TableCell className="text-right font-mono tabular-nums">{formatMoney(order.tax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} className="font-semibold">
            Total
          </TableCell>
          <TableCell className="text-right font-mono font-semibold tabular-nums">{formatMoney(order.total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

const Detail = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div className="grid gap-0.5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm">{children}</dd>
    </div>
  );
};

const OrderDetail = async ({ params }: { params: PageProps<"/orders/[id]">["params"] }) => {
  await requireStaff();
  const order = await getOrder((await params).id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="font-mono text-2xl font-semibold tracking-tight">Order #{order.orderNumber}</h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {ORDER_TYPE_LABELS[order.orderType]} · placed {formatDateTime(order.createdAt)}
          </p>
        </div>
        <OrderActions orderId={order.orderId} orderNumber={order.orderNumber} status={order.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ItemsTable order={order} />
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4">
              <Detail label="Placed by">{order.placedByEmail ?? "—"}</Detail>
              <Detail label="Placed">{formatDateTime(order.createdAt)}</Detail>
              {order.cancelledAt && (
                <>
                  <Detail label="Cancelled">{formatDateTime(order.cancelledAt)}</Detail>
                  <Detail label="Cancelled by">{order.cancelledByEmail ?? "—"}</Detail>
                  <Detail label="Reason">{order.cancellationReason ?? "No reason given"}</Detail>
                </>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const OrderDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading order">
      <Skeleton className="h-8 w-56" />
      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <Skeleton className="h-64" />
        <Skeleton className="h-40" />
      </div>
    </div>
  );
};

const OrderPage = ({ params }: PageProps<"/orders/[id]">) => {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/orders" className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
        All orders
      </Link>
      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetail params={params} />
      </Suspense>
    </div>
  );
};

export default OrderPage;
