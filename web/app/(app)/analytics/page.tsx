import { CircleAlertIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { ScrollTable, StickyTableHeader } from "@/components/ScrollTable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { customRangeError, statisticsQuerySchema } from "@/lib/api/schemas/statistics";
import {
  getCancellationStatistics,
  getIngredientUsage,
  getItemStatistics,
  getRestockProjection,
  getSalesStatistics,
} from "@/lib/api/statistics";
import { requireAdmin } from "@/lib/auth/currentUser";
import { formatDateTime, formatDay, formatMoney, formatPercent, formatQuantity } from "@/lib/helpers/format";
import { cn } from "@/lib/utils";
import { RangeFilter } from "./RangeFilter";
import { SalesChart } from "./SalesChart";

export const metadata: Metadata = { title: "Analytics · Pizza Shop POS" };

type SearchParams = PageProps<"/analytics">["searchParams"];

// How many cancellations the list shows (the API allows up to 100); it scrolls past ~8 rows.
const RECENT_CANCELLATIONS = 50;

// Every section reads the same range from the URL. An invalid custom range is reported once (by
// the sales section) and the other sections render nothing, instead of four identical errors.
const readQuery = async (searchParams: SearchParams) => {
  await requireAdmin();
  const query = statisticsQuerySchema.parse(await searchParams);
  return { query, error: customRangeError(query) };
};

const Section = ({ title, description, children }: { title: string; description?: ReactNode; children: ReactNode }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const Empty = ({ children }: { children: ReactNode }) => (
  <p className="py-8 text-center text-sm text-muted-foreground">{children}</p>
);

const StatTile = ({ label, value, detail }: { label: string; value: string; detail?: string }) => {
  return (
    <Card className="gap-1 py-4">
      <CardContent className="flex flex-col gap-1 px-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
      </CardContent>
    </Card>
  );
};

const Filters = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query } = await readQuery(searchParams);
  return <RangeFilter query={query} />;
};

const SalesSection = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query, error } = await readQuery(searchParams);
  if (error) {
    return (
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const sales = await getSalesStatistics(query);
  const { totals, cancelled } = sales;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        {sales.from === sales.to ? formatDay(sales.from) : `${formatDay(sales.from)} – ${formatDay(sales.to)}`} ·
        restaurant time ({sales.timeZone.replace("_", " ")})
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Sales"
          value={formatMoney(totals.total)}
          detail={`${formatMoney(totals.subTotal)} before ${formatMoney(totals.tax)} tax`}
        />
        <StatTile label="Orders" value={totals.orderCount.toLocaleString("en-US")} detail="Not counting cancelled" />
        <StatTile label="Average order" value={formatMoney(totals.averageOrderValue)} />
        <StatTile
          label="Cancelled"
          value={cancelled.orderCount.toLocaleString("en-US")}
          detail={`${formatMoney(cancelled.total)} · ${formatPercent(cancelled.rate)} of orders`}
        />
      </div>
      <Section title="Sales per day" description="Every order not cancelled, by the day it was placed.">
        <SalesChart days={sales.days} />
      </Section>
    </div>
  );
};

const ItemsSection = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query, error } = await readQuery(searchParams);
  if (error) return null;
  const items = await getItemStatistics(query);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Section title="Top pizzas" description="Revenue includes the toppings added to them.">
        {items.recipes.length === 0 ? (
          <Empty>No pizzas sold in this range.</Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pizza</TableHead>
                <TableHead className="text-right">Sold</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.recipes.map((recipe) => (
                <TableRow key={recipe.recipeId}>
                  <TableCell className="font-medium">{recipe.name}</TableCell>
                  <TableCell className="text-right tabular-nums">{recipe.quantity}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{formatMoney(recipe.revenue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Section>
      <Section title="Top toppings" description="Counted per pizza, so 2 pizzas with olives count twice.">
        {items.toppings.length === 0 ? (
          <Empty>No toppings picked in this range.</Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Topping</TableHead>
                <TableHead className="text-right">Pizzas</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.toppings.map((topping) => (
                <TableRow key={topping.ingredientId}>
                  <TableCell className="font-medium">{topping.name}</TableCell>
                  <TableCell className="text-right tabular-nums">{topping.timesPicked}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{formatMoney(topping.revenue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Section>
    </div>
  );
};

const CancellationsSection = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query, error } = await readQuery(searchParams);
  if (error) return null;
  const { summary, byRole, recent } = await getCancellationStatistics(query, RECENT_CANCELLATIONS);

  return (
    <Section
      title="Cancellations"
      description={
        summary.orderCount === 0
          ? "Nothing was cancelled in this range."
          : `${summary.orderCount} cancelled (${formatMoney(summary.total)}): ${byRole.customer} by customers, ${byRole.staff} by staff.`
      }
    >
      {recent.length === 0 ? (
        <Empty>No cancellations.</Empty>
      ) : (
        <div className="flex flex-col gap-2">
          {/* The summary counts every cancellation; the list stops at the limit, so say so. */}
          {summary.orderCount > recent.length && (
            <p className="text-sm text-muted-foreground">
              Showing the {recent.length} most recent of {summary.orderCount}.
            </p>
          )}
          <ScrollTable>
            <Table>
              <StickyTableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead className="hidden md:table-cell">Cancelled</TableHead>
                  <TableHead className="hidden sm:table-cell">By</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </StickyTableHeader>
              <TableBody>
                {recent.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell className="font-mono font-medium">
                      <Link href={`/orders/${order.orderId}`} className="underline-offset-4 hover:underline">
                        #{order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden font-mono text-muted-foreground md:table-cell">
                      {order.cancelledAt ? formatDateTime(order.cancelledAt) : "—"}
                    </TableCell>
                    <TableCell className="hidden max-w-48 truncate sm:table-cell">{order.cancelledByEmail ?? "—"}</TableCell>
                    <TableCell className="max-w-64 truncate text-muted-foreground">{order.reason ?? "No reason given"}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{formatMoney(order.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollTable>
        </div>
      )}
    </Section>
  );
};

const UsageSection = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query, error } = await readQuery(searchParams);
  if (error) return null;
  const { ingredients } = await getIngredientUsage(query);

  return (
    <Section title="Ingredient usage" description="Stock used by orders in this range (cancelled orders gave theirs back).">
      {ingredients.length === 0 ? (
        <Empty>No stock used in this range.</Empty>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient</TableHead>
              <TableHead className="text-right">Used</TableHead>
              <TableHead className="text-right">In stock now</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient.ingredientId}>
                <TableCell className="font-medium">{ingredient.name}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {formatQuantity(ingredient.used)} <span className="text-muted-foreground">{ingredient.unitOfMeasureName}</span>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-mono tabular-nums",
                    ingredient.currentStock < 0 && "text-destructive",
                  )}
                >
                  {formatQuantity(ingredient.currentStock)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Section>
  );
};

// Not tied to the range filter: always the last complete week, so it reads no searchParams.
const RestockSection = async () => {
  await requireAdmin();
  const { from, to, lookbackDays, coverDays, ingredients } = await getRestockProjection();
  const toRestock = ingredients.filter((ingredient) => ingredient.suggestedRestock > 0).length;

  return (
    <Section
      title="Restock projection"
      description={
        <>
          Usage over the last {lookbackDays} complete days ({formatDay(from)} – {formatDay(to)}), and what to add so
          stock lasts the next {coverDays} days at that pace.{" "}
          {toRestock > 0 && (
            <span className="font-medium text-foreground">
              {toRestock} {toRestock === 1 ? "ingredient needs" : "ingredients need"} restocking.
            </span>
          )}
        </>
      }
    >
      {ingredients.length === 0 ? (
        <Empty>No stock was used in the last {lookbackDays} days.</Empty>
      ) : (
        <div className="flex flex-col gap-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead className="hidden text-right sm:table-cell">Used</TableHead>
                <TableHead className="hidden text-right md:table-cell">Per day</TableHead>
                <TableHead className="text-right">In stock</TableHead>
                <TableHead className="text-right">Days left</TableHead>
                <TableHead className="text-right">To restock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ingredient) => (
                <TableRow key={ingredient.ingredientId}>
                  <TableCell className="font-medium">
                    {ingredient.name}
                    {!ingredient.isActive && <span className="ml-2 text-xs text-muted-foreground">Retired</span>}
                  </TableCell>
                  <TableCell className="hidden text-right font-mono tabular-nums sm:table-cell">
                    {formatQuantity(ingredient.used)}
                  </TableCell>
                  <TableCell className="hidden text-right font-mono tabular-nums md:table-cell">
                    {formatQuantity(ingredient.averageDailyUse)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-mono tabular-nums",
                      ingredient.currentStock < 0 && "text-destructive",
                    )}
                  >
                    {formatQuantity(ingredient.currentStock)}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {ingredient.daysOfStockLeft === null ? "—" : ingredient.daysOfStockLeft === 0 ? "< 1" : ingredient.daysOfStockLeft}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {ingredient.suggestedRestock > 0 ? (
                      <span className="font-semibold">
                        {formatQuantity(ingredient.suggestedRestock)}{" "}
                        <span className="font-normal text-muted-foreground">{ingredient.unitOfMeasureName}</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground">
            To restock = last week&apos;s usage minus what&apos;s in stock: enough for another week like it (— means you already
            have that). Days left are whole days at last week&apos;s pace. Amounts are in each ingredient&apos;s own unit;
            ingredients not used that week aren&apos;t listed unless their stock is below zero.
          </p>
        </div>
      )}
    </Section>
  );
};

const SectionSkeleton = ({ className }: { className?: string }) => (
  <Skeleton className={cn("h-64 w-full rounded-xl", className)} aria-busy="true" aria-label="Loading" />
);

const AnalyticsPage = ({ searchParams }: PageProps<"/analytics">) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Sales count every order that wasn&apos;t cancelled; cancellations are reported on their own.
        </p>
      </div>
      <Suspense fallback={<Skeleton className="h-8 w-full max-w-xl" />}>
        <Filters searchParams={searchParams} />
      </Suspense>
      {/* Separate boundaries: each section appears as soon as its own request answers. */}
      <Suspense fallback={<SectionSkeleton className="h-96" />}>
        <SalesSection searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ItemsSection searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <UsageSection searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <RestockSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CancellationsSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AnalyticsPage;
