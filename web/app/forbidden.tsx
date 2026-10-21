import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

// Rendered by forbidden() (requireStaff / requireAdmin) for a signed-in user without the role.
const Forbidden = () => {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="text-sm font-medium text-primary">403</p>
      <h1 className="text-2xl font-semibold tracking-tight">You don&apos;t have access to this page</h1>
      <p className="max-w-md text-muted-foreground">
        Your account can&apos;t open this screen. If you think it should, ask an admin to update your role.
      </p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Go to your home page
      </Link>
    </main>
  );
};

export default Forbidden;
