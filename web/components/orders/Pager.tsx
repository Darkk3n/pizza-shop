import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PagerProps = {
  page: number;
  pageCount: number;
  totalCount: number;
  // Server Component only: builds each page's URL (keeping the page's other filters).
  hrefForPage: (page: number) => string;
  // Plural noun for the total, e.g. "usuarios".
  itemLabel?: string;
};

// Previous / Next links for a paged list; hidden when everything fits on one page.
export const Pager = ({ page, pageCount, totalCount, hrefForPage, itemLabel = "pedidos" }: PagerProps) => {
  if (pageCount <= 1) return null;

  const link = (target: number, label: string, disabled: boolean) => (
    <Link
      href={hrefForPage(target)}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), disabled && "pointer-events-none opacity-50")}
    >
      {label}
    </Link>
  );

  return (
    <nav aria-label="Páginas" className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">
        Página {page} de {pageCount} · {totalCount} {itemLabel}
      </span>
      <div className="flex gap-2">
        {link(page - 1, "Anterior", page <= 1)}
        {link(page + 1, "Siguiente", page >= pageCount)}
      </div>
    </nav>
  );
};
