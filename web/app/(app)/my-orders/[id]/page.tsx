import { ArrowLeftIcon, CircleCheckIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CancelOrderDialog } from "@/components/orders/CancelOrderDialog";
import { OrderItemsTable } from "@/components/orders/OrderItemsTable";
import { StatusBadge } from "@/components/orders/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getOrder } from "@/lib/api/orders";
import { requireUser } from "@/lib/auth/currentUser";
import { formatDateTime, ORDER_TYPE_LABELS } from "@/lib/helpers/format";

export const metadata: Metadata = { title: "Your order · Pizza Shop POS" };

// Checkout lands here, and My orders links here. The API only returns the caller's own orders
// (404 otherwise, even for an existing order), so no extra ownership check is needed.
const MyOrder = async ({ params }: { params: PageProps<"/my-orders/[id]">["params"] }) => {
  const user = await requireUser();
  const order = await getOrder((await params).id);

  return (
    <div className="flex flex-col gap-6">
      {/* Staff land here after placing an order themselves; their list is the board. */}
      <Link
        href={user.isStaff ? "/orders" : "/my-orders"}
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        {user.isStaff ? "All orders" : "My orders"}
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {order.status === "Pending" && <CircleCheckIcon className="size-7 text-primary" aria-hidden="true" />}
          <h1 className="font-mono text-2xl font-semibold tracking-tight">Order #{order.orderNumber}</h1>
          <StatusBadge status={order.status} />
        </div>
        <p className="text-sm text-muted-foreground">
          {ORDER_TYPE_LABELS[order.orderType]} · placed {formatDateTime(order.createdAt)}
          {order.status === "Pending" && " · We'll start on it shortly."}
        </p>
        {order.cancelledAt && (
          <p className="text-sm text-muted-foreground">
            Cancelled {formatDateTime(order.cancelledAt)}
            {order.cancellationReason && ` · ${order.cancellationReason}`}
          </p>
        )}
      </div>

      <Card>
        <CardContent>
          <OrderItemsTable order={order} />
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Link href="/menu" className={buttonVariants({ variant: "outline" })}>
          Order something else
        </Link>
        {/* Staff manage (and can cancel more) from the board. */}
        {user.isStaff && (
          <Link href={`/orders/${order.orderId}`} className={buttonVariants({ variant: "outline" })}>
            Manage on the board
          </Link>
        )}
        {/* Customers may cancel only while Pending; once the kitchen starts, staff have to. */}
        {!user.isStaff && order.status === "Pending" && (
          <CancelOrderDialog
            orderId={order.orderId}
            orderNumber={order.orderNumber}
            description="You can cancel while the kitchen hasn't started on it yet. This can't be undone."
            successMessage={`Order #${order.orderNumber} cancelled.`}
            reasonPlaceholder="e.g. Ordered by mistake"
          />
        )}
      </div>
      {!user.isStaff && (order.status === "Preparing" || order.status === "Ready") && (
        <p className="text-sm text-muted-foreground">
          The kitchen has started on this order, so it can&apos;t be cancelled here. Ask the staff if you need to.
        </p>
      )}
    </div>
  );
};

const MyOrderSkeleton = () => {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading order">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
};

const MyOrderPage = ({ params }: PageProps<"/my-orders/[id]">) => {
  return (
    <Suspense fallback={<MyOrderSkeleton />}>
      <MyOrder params={params} />
    </Suspense>
  );
};

export default MyOrderPage;
