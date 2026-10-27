import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ActiveOrdersBoard, ActiveOrdersBoardSkeleton } from "@/components/dashboard/ActiveOrdersBoard";
import { CustomerHome } from "@/components/home/CustomerHome";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { requireUser } from "@/lib/auth/currentUser";

export const metadata: Metadata = { title: "Home · Pizza Shop POS" };

const StaffDashboard = () => {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Active orders, oldest first.</p>
        </div>
        <Link href="/orders" className={buttonVariants({ variant: "outline", size: "sm" })}>
          All orders
        </Link>
      </div>
      <Suspense fallback={<ActiveOrdersBoardSkeleton />}>
        <ActiveOrdersBoard />
      </Suspense>
    </>
  );
};

// Everyone lands here after signing in: staff and admins get the kitchen dashboard, customers their
// home page. Decided before anything renders, so neither sees the other's screen.
const HomeForRole = async () => {
  const user = await requireUser();
  return user.isStaff ? <StaffDashboard /> : <CustomerHome />;
};

const Home = () => {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" aria-busy="true" aria-label="Loading" />}>
        <HomeForRole />
      </Suspense>
    </div>
  );
};

export default Home;
