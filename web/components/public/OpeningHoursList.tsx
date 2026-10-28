import { cn } from "@/lib/utils";
import { formatOpeningHours, restaurant } from "@/lib/restaurant";

export const OpeningHoursList = ({ className }: { className?: string }) => {
  return (
    <dl className={cn("grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm", className)}>
      {restaurant.hours.map((entry) => (
        <div key={entry.days} className="contents">
          <dt className="text-muted-foreground">{entry.days}</dt>
          <dd className="font-medium tabular-nums">{formatOpeningHours(entry)}</dd>
        </div>
      ))}
    </dl>
  );
};
