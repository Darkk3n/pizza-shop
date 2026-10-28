import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { restaurant } from "@/lib/restaurant";

// Sign-in screens: no sidebar, a centered card.
const AuthLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <main id="main-content" className="relative flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12">
      <div className="absolute top-3 right-3">
        <ThemeToggle />
      </div>
      <Link href="/" className="flex flex-col items-center gap-2 rounded-md font-semibold tracking-tight">
        <BrandLogo size={112} className="rounded-xl shadow-sm" />
        <span className="text-lg">{restaurant.name}</span>
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
};

export default AuthLayout;
