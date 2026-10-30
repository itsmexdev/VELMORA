"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductBySlug } from "@/lib/products";

export interface CartLine {
  slug: string;
  quantity: number;
  color?: string;
}

interface CartState {
  lines: CartLine[];
  addItem: (slug: string, quantity?: number, color?: string) => void;
  removeItem: (slug: string, color?: string) => void;
  updateQuantity: (slug: string, quantity: number, color?: string) => void;
  clear: () => void;
}

function sameLine(a: CartLine, slug: string, color?: string) {
  return a.slug === slug && (a.color ?? null) === (color ?? null);
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      addItem: (slug, quantity = 1, color) =>
        set((state) => {
          const existing = state.lines.find((l) => sameLine(l, slug, color));
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                sameLine(l, slug, color)
                  ? { ...l, quantity: l.quantity + quantity }
                  : l
              ),
            };
          }
          return { lines: [...state.lines, { slug, quantity, color }] };
        }),
      removeItem: (slug, color) =>
        set((state) => ({
          lines: state.lines.filter((l) => !sameLine(l, slug, color)),
        })),
      updateQuantity: (slug, quantity, color) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              sameLine(l, slug, color) ? { ...l, quantity } : l
            )
            .filter((l) => l.quantity > 0),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "velmora-cart" }
  )
);

export function useCartSummary() {
  const lines = useCartStore((s) => s.lines);
  const items = lines
    .map((line) => {
      const product = getProductBySlug(line.slug);
      return product ? { ...line, product } : null;
    })
    .filter((x): x is CartLine & { product: NonNullable<ReturnType<typeof getProductBySlug>> } => Boolean(x));

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return { items, itemCount, subtotal };
}
