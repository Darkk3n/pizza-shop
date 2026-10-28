import { Suspense } from "react";
import { AppShell } from "@/components/app-shell/AppShell";
import { NavLinksSkeleton } from "@/components/app-shell/NavLinks";
import { RoleNav, SessionUserMenu, StaffOrderFeed } from "@/components/app-shell/SessionSlots";
import { CartButton } from "@/components/cart/CartButton";
import { CartProvider } from "@/components/cart/CartProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

// Signed-in screens. The shell prerenders; the role-specific nav and user menu stream in.
// The cart and the staff order feed (with its sound toggle in the header) live here so they survive
// navigation between signed-in screens.
const AppLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <CartProvider>
      <AppShell
        nav={
          <Suspense fallback={<NavLinksSkeleton />}>
            <RoleNav />
          </Suspense>
        }
        userMenu={
          <div className="flex items-center gap-1">
            <Suspense>
              <StaffOrderFeed />
            </Suspense>
            <ThemeToggle />
            <CartButton />
            <Suspense>
              <SessionUserMenu />
            </Suspense>
          </div>
        }
      >
        {children}
      </AppShell>
    </CartProvider>
  );
};

export default AppLayout;
