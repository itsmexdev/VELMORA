"use client";

import Link from "next/link";
import { Heart, ArrowRight, X } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { getProductBySlug } from "@/lib/products";
import { ProductImage } from "@/components/product/ProductImage";
import { Price } from "@/components/ui/Price";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useToast } from "@/components/ui/ToastProvider";

export default function WishlistPage() {
  const mounted = useMounted();
  const slugs = useWishlistStore((s) => s.slugs);
  const remove = useWishlistStore((s) => s.remove);
  const addItem = useCartStore((s) => s.addItem);
  const { showToast } = useToast();

  const items = slugs.map((slug) => getProductBySlug(slug)).filter(Boolean);

  return (
    <div className="container-wide py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <h1 className="mt-4 font-serif-display text-4xl text-charcoal">Your Wishlist</h1>

      {!mounted ? (
        <div className="mt-10 h-64 skeleton" />
      ) : items.length === 0 ? (
        <div className="mt-14 flex flex-col items-center gap-4 border border-dashed border-line py-20 text-center">
          <Heart size={32} className="text-charcoal-soft/40" />
          <p className="font-serif-display text-xl text-charcoal">Your wishlist is empty</p>
          <p className="max-w-sm text-sm text-charcoal-soft/70">
            Save pieces you're considering — they'll be waiting for you here.
          </p>
          <Link
            href="/shop"
            className="mt-2 inline-flex items-center gap-2 bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.12em] text-ivory hover:bg-olive-dark"
          >
            Explore the Shop <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => {
            if (!product) return null;
            return (
              <div key={product.slug} className="group relative flex gap-4 border border-line p-4">
                <Link href={`/products/${product.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden bg-ivory-dim">
                  <ProductImage src={product.image} alt={product.name} sizes="96px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link href={`/products/${product.slug}`} className="font-serif-display text-base text-charcoal link-underline">
                      {product.name}
                    </Link>
                    <div className="mt-1.5">
                      <Price price={product.price} originalPrice={product.originalPrice} size="sm" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={!product.inStock}
                      onClick={() => {
                        addItem(product.slug, 1, product.colors?.[0]);
                        showToast(`Added “${product.name}” to your bag.`);
                      }}
                      className="border border-charcoal px-3 py-2 text-xs uppercase tracking-[0.08em] text-charcoal hover:bg-charcoal hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${product.name} from wishlist`}
                  onClick={() => remove(product.slug)}
                  className="absolute right-2 top-2 text-charcoal-soft/40 hover:text-burgundy"
                >
                  <X size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
