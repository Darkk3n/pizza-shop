import { Suspense } from "react";
import { AppShell } from "@/components/app-shell/AppShell";
import { NavLinksSkeleton } from "@/components/app-shell/NavLinks";
import { RoleNav, SessionUserMenu } from "@/components/app-shell/SessionSlots";
import { CartButton } from "@/components/cart/CartButton";
import { CartProvider } from "@/components/cart/CartProvider";

// Signed-in screens. The shell prerenders; the role-specific nav and user menu stream in.
// The cart lives here so it survives navigation between signed-in screens.
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
