"use client";
import { createContext, useMemo, useState } from "react";
import type { Product } from "@/src/db/schema";

export type CartItem = Product & { quantity: number };

type CartActions = {
  addItem: (product: Product) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;
};

export const CartStateContext = createContext<CartItem[] | null>(null);
export const CartActionsContext = createContext<CartActions | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const actions = useMemo<CartActions>(
    () => ({
      addItem: (product) =>
        setCartItems((prev) => {
          const qty = prev.find((i) => i.id === product.id)?.quantity ?? 0;
          if (qty >= product.stock) return prev;
          if (qty === 0) return [...prev, { ...product, quantity: 1 }];
          return prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          );
        }),

      decreaseItem: (id) =>
        setCartItems((prev) =>
          prev
            .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        ),

      removeItem: (id) =>
        setCartItems((prev) => prev.filter((i) => i.id !== id)),
    }),
    [],
  );

  return (
    <CartActionsContext value={actions}>
      <CartStateContext value={cartItems}>{children}</CartStateContext>
    </CartActionsContext>
  );
}
