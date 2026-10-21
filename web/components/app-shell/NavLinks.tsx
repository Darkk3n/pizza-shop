"use client";

import { PizzaIcon, ReceiptTextIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import type { NavKey } from "@/lib/helpers/navigation";
import { AnalyticsIcon, DashboardIcon, InventoryIcon, OrdersIcon, RecipesIcon } from "./icons";
import { useShell } from "./ShellContext";

type NavItem = { href: string; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> };

const NAV_ITEMS: Record<NavKey, NavItem> = {
  dashboard: { href: "/", label: "Dashboard", icon: DashboardIcon },
  menu: { href: "/menu", label: "Menu", icon: PizzaIcon },
  myOrders: { href: "/my-orders", label: "My orders", icon: ReceiptTextIcon },
  orders: { href: "/orders", label: "Orders", icon: OrdersIcon },
  inventory: { href: "/inventory", label: "Inventory", icon: InventoryIcon },
  recipes: { href: "/recipes", label: "Recipes", icon: RecipesIcon },
  analytics: { href: "/analytics", label: "Analytics", icon: AnalyticsIcon },
  users: { href: "/users", label: "Users", icon: UsersIcon },
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
              className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 md:sidebar-collapsed:justify-center md:sidebar-collapsed:px-0 ${
                active
                  ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
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
        <li key={i} className="h-10 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800/60" />
      ))}
    </ul>
  );
};
