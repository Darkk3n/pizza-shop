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

export const metadata: Metadata = { title: "Estadísticas · Rubencinis & Mate Pizza" };

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
        hora del restaurante ({sales.timeZone.replace("_", " ")})
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Ventas"
          value={formatMoney(totals.total)}
          detail={`${formatMoney(totals.subTotal)} + ${formatMoney(totals.tax)} de IVA`}
        />
        <StatTile label="Pedidos" value={totals.orderCount.toLocaleString("es-MX")} detail="Sin contar cancelados" />
        <StatTile label="Ticket promedio" value={formatMoney(totals.averageOrderValue)} />
        <StatTile
          label="Cancelados"
          value={cancelled.orderCount.toLocaleString("es-MX")}
          detail={`${formatMoney(cancelled.total)} · ${formatPercent(cancelled.rate)} de los pedidos`}
        />
      </div>
      <Section title="Ventas por día" description="Todos los pedidos no cancelados, según el día en que se hicieron.">
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
      <Section title="Pizzas más vendidas" description="Los ingresos incluyen los ingredientes extra que se les agregaron.">
        {items.recipes.length === 0 ? (
          <Empty>No se vendieron pizzas en este periodo.</Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pizza</TableHead>
                <TableHead className="text-right">Vendidas</TableHead>
                <TableHead className="text-right">Ingresos</TableHead>
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
      <Section title="Ingredientes extra más pedidos" description="Se cuentan por pizza: 2 pizzas con aceitunas cuentan dos veces.">
        {items.toppings.length === 0 ? (
          <Empty>No se pidieron ingredientes extra en este periodo.</Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingrediente extra</TableHead>
                <TableHead className="text-right">Pizzas</TableHead>
                <TableHead className="text-right">Ingresos</TableHead>
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
      title="Cancelaciones"
      description={
        summary.orderCount === 0
          ? "No hubo cancelaciones en este periodo."
          : `${summary.orderCount} ${summary.orderCount === 1 ? "cancelado" : "cancelados"} (${formatMoney(summary.total)}): ${byRole.customer} por clientes, ${byRole.staff} por el personal.`
      }
    >
      {recent.length === 0 ? (
        <Empty>Sin cancelaciones.</Empty>
      ) : (
        <div className="flex flex-col gap-2">
          {/* The summary counts every cancellation; the list stops at the limit, so say so. */}
          {summary.orderCount > recent.length && (
            <p className="text-sm text-muted-foreground">
              Se muestran los {recent.length} más recientes de {summary.orderCount}.
            </p>
          )}
          <ScrollTable>
            <Table>
              <StickyTableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead className="hidden md:table-cell">Cancelado</TableHead>
                  <TableHead className="hidden sm:table-cell">Por</TableHead>
                  <TableHead>Motivo</TableHead>
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
                    <TableCell className="max-w-64 truncate text-muted-foreground">{order.reason ?? "Sin motivo"}</TableCell>
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
    <Section title="Uso de ingredientes" description="Existencia que usaron los pedidos en este periodo (los cancelados devolvieron la suya).">
      {ingredients.length === 0 ? (
        <Empty>No se usó existencia en este periodo.</Empty>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingrediente</TableHead>
              <TableHead className="text-right">Usado</TableHead>
              <TableHead className="text-right">Existencia actual</TableHead>
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
      title="Proyección de reabastecimiento"
      description={
        <>
          Uso en los últimos {lookbackDays} días completos ({formatDay(from)} – {formatDay(to)}) y cuánto agregar para que
          la existencia alcance los próximos {coverDays} días a ese ritmo.{" "}
          {toRestock > 0 && (
            <span className="font-medium text-foreground">
              {toRestock} {toRestock === 1 ? "ingrediente necesita" : "ingredientes necesitan"} reabastecerse.
            </span>
          )}
        </>
      }
    >
      {ingredients.length === 0 ? (
        <Empty>No se usó existencia en los últimos {lookbackDays} días.</Empty>
      ) : (
        <div className="flex flex-col gap-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingrediente</TableHead>
                <TableHead className="hidden text-right sm:table-cell">Usado</TableHead>
                <TableHead className="hidden text-right md:table-cell">Por día</TableHead>
                <TableHead className="text-right">Existencia</TableHead>
                <TableHead className="text-right">Días restantes</TableHead>
                <TableHead className="text-right">A reabastecer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ingredient) => (
                <TableRow key={ingredient.ingredientId}>
                  <TableCell className="font-medium">
                    {ingredient.name}
                    {!ingredient.isActive && <span className="ml-2 text-xs text-muted-foreground">Retirado</span>}
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
            A reabastecer = uso de la semana pasada menos la existencia actual: lo suficiente para otra semana igual (— significa
            que ya alcanza). Los días restantes son días completos al ritmo de la semana pasada. Las cantidades están en la
            unidad de cada ingrediente; los que no se usaron esa semana no aparecen, salvo que su existencia sea menor que cero.
          </p>
        </div>
      )}
    </Section>
  );
};

const SectionSkeleton = ({ className }: { className?: string }) => (
  <Skeleton className={cn("h-64 w-full rounded-xl", className)} aria-busy="true" aria-label="Cargando" />
);

const AnalyticsPage = ({ searchParams }: PageProps<"/analytics">) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Estadísticas</h1>
        <p className="text-muted-foreground">
          Las ventas cuentan todos los pedidos no cancelados; las cancelaciones se reportan por separado.
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
