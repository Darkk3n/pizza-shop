"use client";

import { HouseIcon, PizzaIcon, ReceiptTextIcon, TagsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import type { NavKey } from "@/lib/helpers/navigation";
import { AnalyticsIcon, DashboardIcon, InventoryIcon, OrdersIcon, RecipesIcon } from "./icons";
import { useShell } from "./ShellContext";

type NavItem = { href: string; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> };

const NAV_ITEMS: Record<NavKey, NavItem> = {
  dashboard: { href: "/", label: "Tablero", icon: DashboardIcon },
  home: { href: "/", label: "Inicio", icon: HouseIcon },
  menu: { href: "/menu", label: "Menú", icon: PizzaIcon },
  myOrders: { href: "/my-orders", label: "Mis pedidos", icon: ReceiptTextIcon },
  orders: { href: "/orders", label: "Pedidos", icon: OrdersIcon },
  inventory: { href: "/inventory", label: "Inventario", icon: InventoryIcon },
  recipes: { href: "/recipes", label: "Recetas", icon: RecipesIcon },
  catalogs: { href: "/catalogs", label: "Catálogos", icon: TagsIcon },
  analytics: { href: "/analytics", label: "Estadísticas", icon: AnalyticsIcon },
  users: { href: "/users", label: "Usuarios", icon: UsersIcon },
};

const isActive = (pathname: string, href: string) => {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
};

export const NavLinks = ({ keys }: { keys: readonly NavKey[] }) => {
  const pathname = usePathname();
  const { collapsed, isDesktop, closeMobileNav } = useShell();

  return (
    <ul className="flex flex-col gap-1">
      {keys.map((key) => {
        const { href, label, icon: NavIcon } = NAV_ITEMS[key];
        const active = isActive(pathname, href);
        return (
          <li key={key}>
            <Link
              href={href}
              onClick={closeMobileNav}
              aria-current={active ? "page" : undefined}
              title={isDesktop && collapsed ? label : undefined}
              className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:sidebar-collapsed:justify-center md:sidebar-collapsed:px-0 ${
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <NavIcon className="size-5 shrink-0" />
              <span className="truncate md:sidebar-collapsed:sr-only">{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

// Shown while the user's roles load, so the sidebar doesn't jump.
export const NavLinksSkeleton = () => {
  return (
    <ul className="flex flex-col gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <li key={i} className="h-10 animate-pulse rounded-md bg-muted" />
      ))}
    </ul>
  );
};
