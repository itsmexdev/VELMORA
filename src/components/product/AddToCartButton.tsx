"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useToast } from "@/components/ui/ToastProvider";

export function AddToCartButton({
  slug,
  name,
  color,
  quantity = 1,
  inStock = true,
  variant = "icon",
  className,
}: {
  slug: string;
  name: string;
  color?: string;
  quantity?: number;
  inStock?: boolean;
  variant?: "icon" | "full";
  className?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const { showToast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) {
      showToast(`“${name}” is currently out of stock.`, "error");
      return;
    }
    addItem(slug, quantity, color);
    showToast(`Added “${name}”${color ? ` (${color})` : ""} to your bag.`, "success");
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleAdd}
        disabled={!inStock}
        className="flex w-full items-center justify-center gap-2 bg-charcoal px-6 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-olive-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-charcoal-soft"
      >
        <ShoppingBag size={16} strokeWidth={1.75} />
        {inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Add ${name} to cart`}
      onClick={handleAdd}
      disabled={!inStock}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ivory/90 backdrop-blur transition-colors hover:border-charcoal disabled:opacity-40 ${className ?? ""}`}
    >
      <ShoppingBag size={16} strokeWidth={1.5} className="text-charcoal" />
    </button>
  );
}
