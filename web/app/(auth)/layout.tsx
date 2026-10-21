import Link from "next/link";
import { BrandLogo } from "@/components/app-shell/icons";

// Sign-in screens: no sidebar, a centered card.
const AuthLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12">
      <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
        <BrandLogo className="size-9" />
        <span className="text-lg">Pizza Shop</span>
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
};

export default AuthLayout;
