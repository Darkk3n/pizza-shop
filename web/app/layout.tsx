import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { sidebarInitScript } from "@/lib/helpers/sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pizza Shop POS",
  description: "Point of sale, inventory, and sales analytics for pizza restaurants.",
};

// The app shell lives in app/(app)/layout.tsx so the sign-in screens in app/(auth) don't get it.
const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    // suppressHydrationWarning: the inline script may set data-sidebar before hydration.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: sidebarInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster richColors closeButton />
      </body>
    </html>
  );
};

export default RootLayout;
