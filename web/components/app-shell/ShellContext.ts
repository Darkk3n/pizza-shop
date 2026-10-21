"use client";

import { createContext, use } from "react";

// Lets nav links rendered in a server slot (RoleNav) react to the shell's sidebar state.
export type ShellState = {
  collapsed: boolean;
  isDesktop: boolean;
  closeMobileNav: () => void;
};

export const ShellContext = createContext<ShellState | null>(null);

export const useShell = () => {
  const state = use(ShellContext);
  if (!state) throw new Error("useShell must be used inside AppShell.");
  return state;
};
