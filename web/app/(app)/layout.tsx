import { Suspense } from "react";
import { AppShell } from "@/components/app-shell/AppShell";
import { NavLinksSkeleton } from "@/components/app-shell/NavLinks";
import { RoleNav, SessionUserMenu } from "@/components/app-shell/SessionSlots";

// Signed-in screens. The shell prerenders; the role-specific nav and user menu stream in.
const AppLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <AppShell
      nav={
        <Suspense fallback={<NavLinksSkeleton />}>
          <RoleNav />
        </Suspense>
      }
      userMenu={
        <Suspense>
          <SessionUserMenu />
        </Suspense>
      }
    >
      {children}
    </AppShell>
  );
};

export default AppLayout;
