"use client";

import { useCallback, useSyncExternalStore } from "react";
import { SIDEBAR_STORAGE_KEY } from "@/lib/sidebar";

const DESKTOP_QUERY = "(min-width: 48rem)"; // Tailwind `md`

// The <html data-sidebar> attribute is the source of truth for the desktop
// collapsed state; CSS reads it via the `sidebar-collapsed:` variant.
const listeners = new Set<() => void>();

function subscribeCollapsed(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getCollapsed() {
  return document.documentElement.dataset.sidebar === "collapsed";
}

function setCollapsed(collapsed: boolean) {
  if (collapsed) {
    document.documentElement.dataset.sidebar = "collapsed";
  } else {
    delete document.documentElement.dataset.sidebar;
  }
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, collapsed ? "collapsed" : "expanded");
  } catch {
    // Storage unavailable (private mode, blocked); state still applies this session.
  }
  listeners.forEach((listener) => listener());
}

function subscribeDesktop(listener: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", listener);
  return () => mql.removeEventListener("change", listener);
}

function getIsDesktop() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

const getServerFalse = () => false;

export function useSidebarCollapsed() {
  const collapsed = useSyncExternalStore(
    subscribeCollapsed,
    getCollapsed,
    getServerFalse,
  );
  const toggleCollapsed = useCallback(() => setCollapsed(!getCollapsed()), []);
  return { collapsed, toggleCollapsed };
}

export function useIsDesktop() {
  return useSyncExternalStore(subscribeDesktop, getIsDesktop, getServerFalse);
}
