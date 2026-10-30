"use client";

import Link from "next/link";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore, useCartSummary } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ProductImage } from "@/components/product/ProductImage";
import { Price } from "@/components/ui/Price";
import { formatPrice } from "@/lib/format";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const SHIPPING_FLAT_RATE = 12;
const FREE_SHIPPING_THRESHOLD = 150;

export default function CartPage() {
  const mounted = useMounted();
  const { items, subtotal } = useCartSummary();
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;
  const hasOutOfStock = items.some((i) => !i.product.inStock);

  return (
    <div className="container-wide py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shopping Bag" }]} />
      <h1 className="mt-4 font-serif-display text-4xl text-charcoal">Shopping Bag</h1>

      {!mounted ? (
        <div className="mt-10 h-64 skeleton" />
      ) : items.length === 0 ? (
        <div className="mt-14 flex flex-col items-center gap-4 border border-dashed border-line py-20 text-center">
          <ShoppingBag size={32} className="text-charcoal-soft/40" />
          <p className="font-serif-display text-xl text-charcoal">Your bag is empty</p>
          <p className="max-w-sm text-sm text-charcoal-soft/70">
            Discover something uncommon. Your curated finds will appear here once added.
          </p>
          <Link
            href="/shop"
            className="mt-2 inline-flex items-center gap-2 bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.12em] text-ivory hover:bg-olive-dark"
          >
            Continue Shopping <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          <div className="divide-y divide-line border-t border-line">
            {items.map((item) => (
              <div key={`${item.slug}-${item.color ?? ""}`} className="flex gap-4 py-6">
                <Link href={`/products/${item.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden bg-ivory-dim">
                  <ProductImage src={item.product.image} alt={item.product.name} sizes="96px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/products/${item.slug}`} className="font-serif-display text-base text-charcoal link-underline">
                        {item.product.name}
                      </Link>
                      {item.color && (
                        <p className="mt-1 text-xs text-charcoal-soft/70">Option: {item.color}</p>
                      )}
                      {!item.product.inStock && (
                        <p className="mt-1 text-xs font-medium text-burgundy">
                          Currently out of stock — remove or save for later.
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.product.name} from bag`}
                      onClick={() => removeItem(item.slug, item.color)}
                      className="text-charcoal-soft/50 hover:text-burgundy"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <QuantityStepper
                      size="sm"
                      value={item.quantity}
                      onChange={(next) => updateQuantity(item.slug, next, item.color)}
                    />
                    <Price price={item.product.price * item.quantity} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-max border border-line p-6">
            <h2 className="font-serif-display text-xl text-charcoal">Order Summary</h2>
            {hasOutOfStock && (
              <p className="mt-3 text-xs text-burgundy">
                One or more items in your bag are out of stock and won't be included at checkout totals until removed.
              </p>
            )}
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-charcoal-soft/80">
                <span>Subtotal</span>
                <span className="text-charcoal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal-soft/80">
                <span>Shipping</span>
                <span className="text-charcoal">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-charcoal-soft/60">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free demo shipping.
                </p>
              )}
            </div>
            <div className="mt-5 flex justify-between border-t border-line pt-5 text-base font-medium text-charcoal">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-6 flex items-center justify-center gap-2 bg-charcoal py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-ivory hover:bg-olive-dark"
            >
              Proceed to Checkout <ArrowRight size={15} />
            </Link>
            <Link
              href="/shop"
              className="mt-3 flex items-center justify-center text-xs uppercase tracking-[0.1em] text-charcoal-soft link-underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
