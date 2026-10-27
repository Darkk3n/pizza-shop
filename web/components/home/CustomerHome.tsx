import Link from "next/link";
import { Suspense } from "react";
import { RecipeCard } from "@/components/menu/RecipeCard";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { listPizzaSizes, listPopularRecipes, listRecipes, listToppings } from "@/lib/api/menu";
import { findOrder, listActiveOrders, listOrders } from "@/lib/api/orders";
import type { Order } from "@/lib/api/schemas/orders";
import { describeTopping, formatDateTime, formatMoney } from "@/lib/helpers/format";
import { OrderAgainButton, type ReorderLine } from "./OrderAgainButton";
import { OrderTracker } from "./OrderTracker";

const RECENT_ORDERS = 3;
const HIGHLIGHTS = 4;

// Keyed by what the server saw, so a fresher render (e.g. "Check again") restarts the tracker.
const InProgress = async () => {
  const orders = await listActiveOrders();
  if (orders.length === 0) return null;
  return <OrderTracker key={orders.map((o) => `${o.orderId}:${o.status}`).join()} initialOrders={orders} />;
};

type Available = { recipeIds: Set<string>; sizeIds: Set<string>; toppingIds: Set<string> };

// What can be ordered again today: the recipe and size are still on the menu and every topping
// still offered.
const reorderLines = (order: Order, { recipeIds, sizeIds, toppingIds }: Available) => {
  const lines: ReorderLine[] = [];
  let unavailable = 0;
  for (const item of order.items) {
    if (
      !item.recipeId ||
      !recipeIds.has(item.recipeId) ||
      (item.pizzaSizeId !== null && !sizeIds.has(item.pizzaSizeId)) ||
      item.toppings.some((t) => !toppingIds.has(t.ingredientId))
    ) {
      unavailable += item.quantity;
      continue;
    }
    lines.push({
      item: {
        recipeId: item.recipeId,
        pizzaSizeId: item.pizzaSizeId,
        quantity: item.quantity,
        toppings: item.toppings.map(({ ingredientId, coverage, extraAmount }) => ({ ingredientId, coverage, extraAmount })),
      },
      name: item.itemNameSnapshot,
      details: item.toppings.map((topping) => `+ ${describeTopping(topping)}`),
    });
  }
  return { lines, unavailable };
};

const OrderAgain = async () => {
  const [completed, recipes, sizes, toppings] = await Promise.all([
    listOrders({ status: "Completed", page: 1 }),
    listRecipes(),
    listPizzaSizes(),
    listToppings(),
  ]);
  const orders = (
    await Promise.all(completed.items.slice(0, RECENT_ORDERS).map((summary) => findOrder(summary.orderId)))
  ).filter((order) => order !== null);
  if (orders.length === 0) return null;

  const available: Available = {
    recipeIds: new Set(recipes.filter((recipe) => recipe.isActive).map((recipe) => recipe.recipeId)),
    sizeIds: new Set(sizes.filter((size) => size.isActive).map((size) => size.pizzaSizeId)),
    toppingIds: new Set(toppings.map((topping) => topping.ingredientId)),
  };

  return (
    <section aria-labelledby="order-again" className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 id="order-again" className="text-lg font-semibold tracking-tight">
          Order again
        </h2>
        <Link href="/my-orders" className="text-sm text-muted-foreground hover:underline">
          All my orders
        </Link>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {orders.map((order) => {
          const { lines, unavailable } = reorderLines(order, available);
          return (
            <li key={order.orderId}>
              <Card size="sm" className="h-full">
                <CardHeader>
                  <CardTitle className="font-mono">
                    <Link href={`/my-orders/${order.orderId}`} className="hover:underline">
                      #{order.orderNumber}
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {formatDateTime(order.createdAt)} · {formatMoney(order.total)}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="flex flex-col gap-1 text-sm">
                    {order.items.map((item) => (
                      <li key={item.orderItemId}>
                        <span className="tabular-nums">{item.quantity}×</span> {item.itemNameSnapshot}
                        {item.toppings.length > 0 && (
                          <span className="text-muted-foreground"> + {item.toppings.length} {item.toppings.length === 1 ? "topping" : "toppings"}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {unavailable > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {unavailable === 1 ? "1 item is" : `${unavailable} items are`} no longer on the menu and won&apos;t be added.
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <OrderAgainButton orderNumber={order.orderNumber} lines={lines} />
                </CardFooter>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

// Most ordered lately; a new shop with no orders yet shows the first recipes of the menu instead.
const Highlights = async () => {
  const popular = await listPopularRecipes(HIGHLIGHTS);
  const recipes =
    popular.length > 0 ? popular : (await listRecipes()).filter((recipe) => recipe.isActive).slice(0, HIGHLIGHTS);
  if (recipes.length === 0) return null;

  return (
    <section aria-labelledby="highlights" className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 id="highlights" className="text-lg font-semibold tracking-tight">
          {popular.length > 0 ? "Popular right now" : "From our menu"}
        </h2>
        <Link href="/menu" className="text-sm text-muted-foreground hover:underline">
          Full menu
        </Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <li key={recipe.recipeId}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </section>
  );
};

const SectionSkeleton = () => <Skeleton className="h-40 w-full rounded-xl" aria-busy="true" aria-label="Loading" />;

// The customer home page: orders in progress first (when there are any), then reordering and ideas.
// Each section loads on its own, so a slow one doesn't hold the others back.
export const CustomerHome = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">Hungry? Build a pizza or pick up where you left off.</p>
        </div>
        <Link href="/menu" className={buttonVariants()}>
          Start an order
        </Link>
      </div>
      <Suspense fallback={<SectionSkeleton />}>
        <InProgress />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <OrderAgain />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Highlights />
      </Suspense>
    </div>
  );
};
