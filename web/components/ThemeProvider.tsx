"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

// Light by default (System is opt-in from ThemeToggle). next-themes stores the choice in localStorage and sets .dark on <html> from an inline script before
// first paint, so there's no flash and the server never reads the theme (nothing here needs <Suspense>).
// On the client the script gets a non-JavaScript type: it already ran from the server HTML, and React 19
// warns about <script> tags rendered by client components otherwise.
const scriptProps = typeof window === "undefined" ? undefined : ({ type: "application/json" } as const);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange scriptProps={scriptProps}>
      {children}
    </NextThemesProvider>
  );
};
