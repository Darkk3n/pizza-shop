"use client";

import { useIsDesktop, useSidebarCollapsed } from "@/hooks/useSidebar";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { restaurant } from "@/lib/restaurant";
import { CloseIcon, MenuIcon } from "./icons";
import { ShellContext } from "./ShellContext";

const SIDEBAR_ID = "app-sidebar";

const Brand = () => {
	return (
		<Link
			href="/"
			className="flex min-w-0 items-center gap-2.5 rounded-md font-semibold tracking-tight"
		>
			<BrandLogo size={40} />
			<span className="truncate text-base">{restaurant.name}</span>
		</Link>
	);
};

type AppShellProps = {
	children: ReactNode;
	// Server-rendered slots: they depend on the signed-in user, so they stream in
	// behind their own Suspense boundaries while the shell itself stays static.
	nav: ReactNode;
	userMenu: ReactNode;
};

export const AppShell = ({ children, nav, userMenu }: AppShellProps) => {
	const isDesktop = useIsDesktop();
	const { collapsed, toggleCollapsed } = useSidebarCollapsed();
	const [mobileOpen, setMobileOpen] = useState(false);
	const drawerOpen = mobileOpen && !isDesktop;

	const toggleRef = useRef<HTMLButtonElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		if (isDesktop) toggleCollapsed();
		else setMobileOpen((open) => !open);
	};

	const closeDrawer = () => {
		setMobileOpen(false);
		toggleRef.current?.focus();
	};

	// While the mobile drawer is open: lock page scroll, close on Escape,
	// and move focus into the drawer.
	useEffect(() => {
		if (!drawerOpen) return;
		const { overflow } = document.body.style;
		document.body.style.overflow = "hidden";
		closeRef.current?.focus();

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMobileOpen(false);
				toggleRef.current?.focus();
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = overflow;
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [drawerOpen]);

	const expanded = isDesktop ? !collapsed : mobileOpen;

	const shellState = useMemo(
		() => ({ collapsed, isDesktop, closeMobileNav: () => setMobileOpen(false) }),
		[collapsed, isDesktop],
	);

	return (
		<ShellContext value={shellState}>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-60 focus:rounded-md focus:bg-popover focus:px-3 focus:py-2 focus:text-sm focus:text-popover-foreground focus:shadow-md"
			>
				Skip to content
			</a>

			<header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-card/90 px-3 backdrop-blur sm:px-4">
				<button
					ref={toggleRef}
					type="button"
					onClick={handleToggle}
					aria-controls={SIDEBAR_ID}
					aria-expanded={expanded}
					aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
					className="inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
				>
					<MenuIcon className="size-5" />
				</button>
				<Brand />
				<div className="ml-auto">{userMenu}</div>
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
					className="invisible fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] -translate-x-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[translate,visibility] duration-200 ease-out data-[open=true]:visible data-[open=true]:translate-x-0 md:visible md:sticky md:top-16 md:z-auto md:h-[calc(100dvh-4rem)] md:w-60 md:max-w-none md:shrink-0 md:translate-x-0 md:transition-[width] md:sidebar-collapsed:w-16"
				>
					{/* Drawer header: mobile only, since the desktop sidebar sits under the app header */}
					<div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-3 md:hidden">
						<Brand />
						<button
							ref={closeRef}
							type="button"
							onClick={closeDrawer}
							aria-label="Close navigation"
							className="inline-flex size-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
						>
							<CloseIcon className="size-5" />
						</button>
					</div>

					<nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:sidebar-collapsed:px-2">
						{nav}
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
		</ShellContext>
	);
};
