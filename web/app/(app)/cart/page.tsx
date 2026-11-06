import type { Metadata } from "next";
import { CartView } from "./CartView";

export const metadata: Metadata = { title: "Carrito · Rubencinis & Mate Pizza" };

// The cart is in-memory client state (components/cart/CartProvider.tsx); placeOrder checks the user.
const CartPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Tu pedido</h1>
        <p className="text-muted-foreground">Revisa tus pizzas y luego haz tu pedido.</p>
      </div>
      <CartView />
    </div>
  );
};

export default CartPage;
