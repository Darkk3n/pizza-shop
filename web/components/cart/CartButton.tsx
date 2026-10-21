"use client";

import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "./CartProvider";

// Header link to the cart; hidden while it's empty (staff never see it unless they add pizzas).
export const CartButton = () => {
  const { count } = useCart();
  if (count === 0) return null;

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
      className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "relative gap-2")}
    >
      <ShoppingBagIcon className="size-4" />
      <span className="font-mono tabular-nums">{count}</span>
    </Link>
  );
};
