import Form from "next/form";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RANGE_PRESETS, type StatisticsQuery } from "@/lib/api/schemas/statistics";

const PRESET_LABELS: Record<(typeof RANGE_PRESETS)[number], string> = {
  1: "Today",
  7: "Last 7 days",
  30: "Last 30 days",
  90: "Last 90 days",
};

// One row above every section, so they all show the same slice. Presets first (links, so they work
// without JavaScript and keep the range in the URL), then a custom range as a plain GET form.
export const RangeFilter = ({ query }: { query: StatisticsQuery }) => {
  const custom = Boolean(query.from || query.to);
  const activeDays = custom ? null : (query.days ?? 7);

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <nav aria-label="Date range" className="flex flex-wrap gap-2">
        {RANGE_PRESETS.map((days) => (
          <Link
            key={days}
            href={days === 7 ? "/analytics" : `/analytics?days=${days}`}
            aria-current={days === activeDays ? "page" : undefined}
            className={buttonVariants({ variant: days === activeDays ? "default" : "outline", size: "sm" })}
          >
            {PRESET_LABELS[days]}
          </Link>
        ))}
      </nav>
      {/* Keyed so the inputs show the current range after back/forward navigation. */}
      <Form key={`${query.from}-${query.to}`} action="/analytics" className="flex flex-wrap items-end gap-2">
        <div className="grid gap-1">
          <Label htmlFor="range-from" className="text-xs text-muted-foreground">
            From
          </Label>
          <Input id="range-from" name="from" type="date" defaultValue={query.from} required className="h-8 w-40" />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="range-to" className="text-xs text-muted-foreground">
            To
          </Label>
          <Input id="range-to" name="to" type="date" defaultValue={query.to} required className="h-8 w-40" />
        </div>
        <Button type="submit" variant={custom ? "default" : "outline"} size="sm">
          Apply
        </Button>
        {/* Clears the custom range (back to the default last 7 days); a link, so it also empties the
            date inputs. Only shown while a custom range is applied: presets have their own buttons. */}
        {custom && (
          <Link href="/analytics" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Clear
          </Link>
        )}
      </Form>
    </div>
  );
};
