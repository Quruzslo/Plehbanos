"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/db/schema";

export type CartItem = Product & { quantity: number };

type CartActions = {
  addItem: (product: Product) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "cart";

export const CartActionsContext = createContext<CartActions>(null!);
export const CartStateContext = createContext<CartItem[]>(null!);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCartItems(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, loaded]);

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

      clearCart: () => setCartItems([]),
    }),

    [],
  );

  return (
    <CartActionsContext value={actions}>
      <CartStateContext value={cartItems}>{children}</CartStateContext>
    </CartActionsContext>
  );
}
