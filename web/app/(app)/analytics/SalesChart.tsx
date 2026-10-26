"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import { ScrollTable, StickyTableHeader } from "@/components/ScrollTable";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import type { SalesDay } from "@/lib/api/schemas/statistics";
import { formatCompactMoney, formatDay, formatMoney, formatShortDay, formatWeekday } from "@/lib/helpers/format";
import { cn } from "@/lib/utils";

// Geometry in CSS pixels. The container's height includes the x-axis band, so the card never
// scrolls; the top padding leaves room for the label on the tallest column.
const PLOT_HEIGHT = 220;
const TOP_PAD = 20;
const AXIS_BAND = 28;
const LEFT_AXIS = 52;
const RIGHT_PAD = 8;
const HEIGHT = TOP_PAD + PLOT_HEIGHT + AXIS_BAND;
const MAX_BAR = 24;
const MIN_LABEL_SPACING = 56;

// A clean axis maximum: the next 1 / 2 / 2.5 / 5 x 10^n at or above the data.
const niceMax = (max: number) => {
  if (max <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(max));
  return ([1, 2, 2.5, 5, 10].find((step) => step * magnitude >= max) ?? 10) * magnitude;
};

// Column with a 4px rounded data end and a square base on the baseline.
const columnPath = (x: number, y: number, width: number, base: number) => {
  const r = Math.min(4, width / 2, base - y);
  return `M${x},${base} V${y + r} Q${x},${y} ${x + r},${y} H${x + width - r} Q${x + width},${y} ${x + width},${y + r} V${base} Z`;
};

const describe = (day: SalesDay) =>
  [
    `${formatDay(day.date)}: ${formatMoney(day.total)} in sales`,
    `${day.orderCount} ${day.orderCount === 1 ? "order" : "orders"}`,
    day.cancelledCount > 0 && `${day.cancelledCount} cancelled (${formatMoney(day.cancelledTotal)})`,
  ]
    .filter(Boolean)
    .join(", ");

const DaysTable = ({ days }: { days: SalesDay[] }) => {
  return (
    <ScrollTable>
      <Table>
        <StickyTableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead className="text-right">Orders</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="text-right">Cancelled</TableHead>
          </TableRow>
        </StickyTableHeader>
        <TableBody>
          {days.map((day) => (
            <TableRow key={day.date}>
              <TableCell>
                {formatWeekday(day.date)}, {formatDay(day.date)}
              </TableCell>
              <TableCell className="text-right tabular-nums">{day.orderCount}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{formatMoney(day.total)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums text-muted-foreground">
                {day.cancelledCount > 0 ? `${day.cancelledCount} · ${formatMoney(day.cancelledTotal)}` : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollTable>
  );
};

// One series (non-cancelled sales per local day), so no legend: the card title names it.
// Hover or arrow keys read a day; the table view has every value without hovering.
export const SalesChart = ({ days }: { days: SalesDay[] }) => {
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);

  // A callback ref, not an effect: the plot container comes and goes (empty range, table view),
  // and this runs every time it mounts, so the chart is measured whatever brought it back.
  const measure = useCallback((element: HTMLDivElement | null) => {
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hasSales = days.some((day) => day.total > 0);
  const max = niceMax(Math.max(...days.map((day) => day.total)));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
  const plotWidth = Math.max(0, width - LEFT_AXIS - RIGHT_PAD);
  const band = days.length > 0 ? plotWidth / days.length : 0;
  // Thin columns with air between them; at 90+ days they narrow down to 1px with a 2px gap.
  const barWidth = Math.max(1, Math.min(MAX_BAR, band * 0.7, band - 2));
  const base = TOP_PAD + PLOT_HEIGHT;
  const yFor = (value: number) => base - (value / max) * PLOT_HEIGHT;
  const labelEvery = Math.max(1, Math.ceil(MIN_LABEL_SPACING / Math.max(band, 1)));
  const peak = days.reduce((best, day, i) => (day.total > days[best].total ? i : best), 0);
  const activeDay = active === null ? null : days[active];

  const onKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    const last = days.length - 1;
    const current = active ?? last;
    const next =
      event.key === "ArrowLeft" ? Math.max(0, current - 1)
      : event.key === "ArrowRight" ? Math.min(last, current + 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
  };

  const toggle = (
    <Button variant="outline" size="sm" onClick={() => setShowTable((value) => !value)}>
      {showTable ? "Show chart" : "Show table"}
    </Button>
  );

  if (!hasSales) {
    return <p className="py-16 text-center text-muted-foreground">No sales in this range.</p>;
  }

  if (showTable) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">{toggle}</div>
        <DaysTable days={days} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">{toggle}</div>
      <div ref={measure} className="relative w-full" style={{ height: HEIGHT }}>
        {width > 0 && (
          <svg
            width={width}
            height={HEIGHT}
            tabIndex={0}
            role="group"
            aria-label="Sales per day. Use the left and right arrow keys to read each day."
            className="overflow-visible rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onKeyDown={onKeyDown}
            onFocus={() => setActive((value) => value ?? days.length - 1)}
            onBlur={() => setActive(null)}
            onPointerLeave={() => setActive(null)}
          >
            {/* Recessive hairline grid with clean, compact ticks. */}
            {ticks.map((tick) => (
              <g key={tick}>
                <line
                  x1={LEFT_AXIS}
                  x2={width - RIGHT_PAD}
                  y1={yFor(tick) + 0.5}
                  y2={yFor(tick) + 0.5}
                  className="stroke-border"
                  strokeWidth={1}
                />
                <text
                  x={LEFT_AXIS - 8}
                  y={yFor(tick)}
                  dy="0.32em"
                  textAnchor="end"
                  className="fill-muted-foreground text-xs tabular-nums"
                >
                  {formatCompactMoney(tick)}
                </text>
              </g>
            ))}

            {days.map((day, i) => {
              const x = LEFT_AXIS + i * band;
              const barX = x + (band - barWidth) / 2;
              const showLabel = (days.length - 1 - i) % labelEvery === 0;
              return (
                <g key={day.date}>
                  {day.total > 0 && (
                    <path
                      d={columnPath(barX, yFor(day.total), barWidth, base)}
                      className={cn("fill-chart-1 transition-opacity", active !== null && active !== i && "opacity-50")}
                    />
                  )}
                  {showLabel && (
                    <text
                      x={x + band / 2}
                      y={base + 18}
                      textAnchor="middle"
                      className="fill-muted-foreground text-xs"
                    >
                      {formatShortDay(day.date)}
                    </text>
                  )}
                  {/* The hit target is the whole column of space, not just the painted bar. */}
                  <rect
                    x={x}
                    y={TOP_PAD}
                    width={band}
                    height={PLOT_HEIGHT}
                    fill="transparent"
                    onPointerEnter={() => setActive(i)}
                  />
                </g>
              );
            })}

            {/* One direct label, on the best day; the axis, tooltip and table carry the rest. */}
            <text
              x={LEFT_AXIS + peak * band + band / 2}
              y={yFor(days[peak].total) - 6}
              textAnchor="middle"
              className="pointer-events-none fill-foreground text-xs font-medium"
            >
              {formatCompactMoney(days[peak].total)}
            </text>
          </svg>
        )}

        {activeDay && active !== null && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 z-10 w-48 rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md"
            style={{
              left: Math.min(Math.max(0, LEFT_AXIS + active * band + band / 2 - 96), Math.max(0, width - 192)),
            }}
          >
            <p className="font-mono text-base font-semibold">{formatMoney(activeDay.total)}</p>
            <p className="text-muted-foreground">
              {formatWeekday(activeDay.date)}, {formatDay(activeDay.date)}
            </p>
            <p className="mt-1">
              {activeDay.orderCount} {activeDay.orderCount === 1 ? "order" : "orders"}
            </p>
            {activeDay.cancelledCount > 0 && (
              <p className="text-muted-foreground">
                {activeDay.cancelledCount} cancelled · {formatMoney(activeDay.cancelledTotal)}
              </p>
            )}
          </div>
        )}
        {/* Screen readers hear the day the arrow keys moved to. */}
        <p className="sr-only" aria-live="polite">
          {activeDay ? describe(activeDay) : ""}
        </p>
      </div>
    </div>
  );
};
