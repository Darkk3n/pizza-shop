import type { Metadata } from "next";
import { CartView } from "./CartView";

export const metadata: Metadata = { title: "Cart · Pizza Shop POS" };

// The cart is in-memory client state (components/cart/CartProvider.tsx); placeOrder checks the user.
const CartPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Your order</h1>
        <p className="text-muted-foreground">Review your pizzas, then place the order.</p>
      </div>
      <CartView />
    </div>
  );
};

export default CartPage;
