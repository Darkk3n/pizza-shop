"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/button";
import type { OrderItemRequest } from "@/lib/api/schemas/orders";

export type ReorderLine = { item: OrderItemRequest; name: string; details: string[] };

// Puts a past order's items back in the cart. The cart prices them again (today's prices), and
// checkout goes through the usual quote and validation.
export const OrderAgainButton = ({ orderNumber, lines }: { orderNumber: number; lines: ReorderLine[] }) => {
  const cart = useCart();
  const router = useRouter();

  const add = () => {
    for (const line of lines) cart.addItem(line.item, { name: line.name, details: line.details });
    const count = lines.reduce((sum, line) => sum + line.item.quantity, 0);
    toast.success(`${count} ${count === 1 ? "item" : "items"} from order #${orderNumber} added`, {
      action: { label: "View cart", onClick: () => router.push("/cart") },
    });
  };

  return (
    <Button size="sm" variant="outline" disabled={lines.length === 0} onClick={add}>
      Order again
    </Button>
  );
};
