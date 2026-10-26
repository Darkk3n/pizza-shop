import type { ReactNode } from "react";
import { TableHeader } from "@/components/ui/table";
import { cn } from "@/lib/utils";

// A bordered box that scrolls a long <Table> with its header pinned. shadcn's Table wraps the
// <table> in its own overflow-x container, and a sticky header sticks to the nearest scroll
// container, so that wrapper gets the height limit and scrolls both ways.
export const ScrollTable = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border [&_[data-slot=table-container]]:max-h-96 [&_[data-slot=table-container]]:overflow-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

// Opaque so rows scroll underneath; the inset shadow is the divider, since a sticky row's own
// border scrolls away with the collapsed table borders.
export const StickyTableHeader = ({ children }: { children: ReactNode }) => {
  return (
    <TableHeader className="sticky top-0 z-10 bg-card shadow-[inset_0_-1px_0_var(--border)] [&_tr]:border-b-0">
      {children}
    </TableHeader>
  );
};
