import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { restaurant } from "@/lib/restaurant";

// Static on purpose (no cookies): "Order now" goes to /menu, which is the ordering menu for a
// signed-in visitor and the public menu otherwise, so the header doesn't need to know who's viewing.
export const PublicHeader = () => {
  return (
    <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 rounded-md font-semibold tracking-tight">
          <BrandLogo size={40} />
          <span className="sr-only truncate text-base sm:not-sr-only">{restaurant.name}</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          <Link href="/menu" className={buttonVariants({ variant: "ghost", className: "hidden sm:inline-flex" })}>
            Menu
          </Link>
          <Link href="/about" className={buttonVariants({ variant: "ghost", className: "hidden sm:inline-flex" })}>
            About
          </Link>
          <ThemeToggle />
          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
            Sign in
          </Link>
          <Link href="/menu" className={buttonVariants()}>
            Order now
          </Link>
        </nav>
      </div>
    </header>
  );
};
