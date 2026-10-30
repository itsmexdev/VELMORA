"use client";

import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useMounted } from "@/hooks/use-mounted";
import { useToast } from "@/components/ui/ToastProvider";

export function ProductActions({ product }: { product: Product }) {
  const [color, setColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const addItem = useCartStore((s) => s.addItem);
  const mounted = useMounted();
  const wishlisted = useWishlistStore((s) => s.slugs.includes(product.slug));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const { showToast } = useToast();

  const needsColor = Boolean(product.colors && product.colors.length > 0);

  function handleAddToCart() {
    if (!product.inStock) {
      showToast(`“${product.name}” is currently out of stock.`, "error");
      return;
    }
    if (needsColor && !color) {
      setError("Please select an option before adding to your bag.");
      return;
    }
    setError(null);
    addItem(product.slug, quantity, color);
    showToast(
      `Added ${quantity} × “${product.name}”${color ? ` (${color})` : ""} to your bag.`,
      "success"
    );
  }

  return (
    <div className="space-y-6">
      {needsColor && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-charcoal-soft/60">
            Option {color ? `— ${color}` : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors!.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setColor(c);
                  setError(null);
                }}
                aria-pressed={color === c}
                className={`border px-4 py-2 text-sm transition-colors ${
                  color === c
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-line text-charcoal hover:border-charcoal"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-charcoal-soft/60">
          Quantity
        </p>
        <QuantityStepper value={quantity} onChange={setQuantity} />
      </div>

      {error && (
        <p role="alert" className="text-sm text-burgundy">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex flex-1 items-center justify-center gap-2 bg-charcoal px-6 py-4 text-sm font-medium uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-olive-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-charcoal-soft"
        >
          <ShoppingBag size={16} strokeWidth={1.75} />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.slug);
            showToast(
              wishlisted
                ? `Removed “${product.name}” from your wishlist.`
                : `Added “${product.name}” to your wishlist.`
            );
          }}
          aria-pressed={mounted ? wishlisted : false}
          className="flex items-center justify-center gap-2 border border-charcoal px-6 py-4 text-sm font-medium uppercase tracking-[0.1em] text-charcoal transition-colors hover:bg-ivory-dim"
        >
          <Heart
            size={16}
            strokeWidth={1.75}
            className={mounted && wishlisted ? "fill-burgundy text-burgundy" : ""}
          />
          {mounted && wishlisted ? "Wishlisted" : "Wishlist"}
        </button>
      </div>
    </div>
  );
}
