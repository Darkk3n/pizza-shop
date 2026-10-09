"use client";

import { useIsDesktop, useSidebarCollapsed } from "@/hooks/useSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
	AnalyticsIcon,
	BrandLogo,
	CloseIcon,
	DashboardIcon,
	InventoryIcon,
	MenuIcon,
	OrdersIcon,
	RecipesIcon,
} from "./icons";

const NAV_ITEMS = [
	{ href: "/", label: "Dashboard", icon: DashboardIcon },
	{ href: "/orders", label: "Orders", icon: OrdersIcon },
	{ href: "/recipes", label: "Recipes", icon: RecipesIcon },
	{ href: "/inventory", label: "Inventory", icon: InventoryIcon },
	{ href: "/analytics", label: "Analytics", icon: AnalyticsIcon },
] as const;

const SIDEBAR_ID = "app-sidebar";

function isActive(pathname: string, href: string) {
	return href === "/"
		? pathname === "/"
		: pathname === href || pathname.startsWith(`${href}/`);
}

function Brand() {
	return (
		<Link
			href="/"
			className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight"
		>
			<BrandLogo className="size-8 shrink-0" />
			<span className="text-base">Pizza Shop POS</span>
		</Link>
	);
}

export function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const isDesktop = useIsDesktop();
	const { collapsed, toggleCollapsed } = useSidebarCollapsed();
	const [mobileOpen, setMobileOpen] = useState(false);
	const drawerOpen = mobileOpen && !isDesktop;

	const toggleRef = useRef<HTMLButtonElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	function handleToggle() {
		if (isDesktop) toggleCollapsed();
		else setMobileOpen((open) => !open);
	}

	function closeDrawer() {
		setMobileOpen(false);
		toggleRef.current?.focus();
	}

	// While the mobile drawer is open: lock page scroll, close on Escape,
	// and move focus into the drawer.
	useEffect(() => {
		if (!drawerOpen) return;
		const { overflow } = document.body.style;
		document.body.style.overflow = "hidden";
		closeRef.current?.focus();

		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setMobileOpen(false);
				toggleRef.current?.focus();
			}
		}
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = overflow;
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [drawerOpen]);

	const expanded = isDesktop ? !collapsed : mobileOpen;

	return (
		<>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-60 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow-md dark:focus:bg-zinc-900"
			>
				Skip to content
			</a>

			<header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-zinc-200 bg-white/90 px-3 backdrop-blur sm:px-4 dark:border-zinc-800 dark:bg-zinc-950/90">
				<button
					ref={toggleRef}
					type="button"
					onClick={handleToggle}
					aria-controls={SIDEBAR_ID}
					aria-expanded={expanded}
					aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
					className="inline-flex size-10 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
				>
					<MenuIcon className="size-5" />
				</button>
				<Brand />
			</header>

			<div className="flex flex-1">
				{/* Mobile drawer backdrop */}
				<div
					aria-hidden="true"
					onClick={closeDrawer}
					className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden ${
						mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
					}`}
				/>

				<aside
					id={SIDEBAR_ID}
					aria-label="Main navigation"
					data-open={mobileOpen}
					className="invisible fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] -translate-x-full flex-col border-r border-zinc-200 bg-white transition-[translate,visibility] duration-200 ease-out data-[open=true]:visible data-[open=true]:translate-x-0 dark:border-zinc-800 dark:bg-zinc-950 md:visible md:sticky md:top-16 md:z-auto md:h-[calc(100dvh-4rem)] md:w-60 md:max-w-none md:shrink-0 md:translate-x-0 md:transition-[width] md:sidebar-collapsed:w-16"
				>
					{/* Drawer header: mobile only, since the desktop sidebar sits under the app header */}
					<div className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 px-3 md:hidden dark:border-zinc-800">
						<Brand />
						<button
							ref={closeRef}
							type="button"
							onClick={closeDrawer}
							aria-label="Close navigation"
							className="inline-flex size-10 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 dark:text-zinc-400 dark:hover:bg-zinc-800"
						>
							<CloseIcon className="size-5" />
						</button>
					</div>

					<nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:sidebar-collapsed:px-2">
						<ul className="flex flex-col gap-1">
							{NAV_ITEMS.map(({ href, label, icon: NavIcon }) => {
								const active = isActive(pathname, href);
								return (
									<li key={href}>
										<Link
											href={href}
											onClick={() => setMobileOpen(false)}
											aria-current={active ? "page" : undefined}
											title={isDesktop && collapsed ? label : undefined}
											className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 md:sidebar-collapsed:justify-center md:sidebar-collapsed:px-0 ${
												active
													? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
													: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
											}`}
										>
											<NavIcon className="size-5 shrink-0" />
											<span className="truncate md:sidebar-collapsed:sr-only">
												{label}
											</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</aside>

				<main
					id="main-content"
					tabIndex={-1}
					className="min-w-0 flex-1 focus:outline-none"
				>
					<div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						{children}
					</div>
				</main>
			</div>
		</>
	);
}
