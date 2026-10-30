"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  slugs: string[];
  toggle: (slug: string) => void;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  has: (slug: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) =>
        set((state) =>
          state.slugs.includes(slug)
            ? { slugs: state.slugs.filter((s) => s !== slug) }
            : { slugs: [...state.slugs, slug] }
        ),
      add: (slug) =>
        set((state) =>
          state.slugs.includes(slug) ? state : { slugs: [...state.slugs, slug] }
        ),
      remove: (slug) =>
        set((state) => ({ slugs: state.slugs.filter((s) => s !== slug) })),
      has: (slug) => get().slugs.includes(slug),
    }),
    { name: "velmora-wishlist" }
  )
);
