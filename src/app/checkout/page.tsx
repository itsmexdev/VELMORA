"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleCheckBig, LoaderCircle, ShieldCheck } from "lucide-react";
import { useCartStore, useCartSummary } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/format";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductImage } from "@/components/product/ProductImage";

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Ireland",
  "France",
  "Germany",
  "Netherlands",
  "Australia",
  "New Zealand",
  "Japan",
];

const DELIVERY_METHODS = [
  { id: "standard", label: "Standard", detail: "5–7 business days", price: 12 },
  { id: "express", label: "Express", detail: "2–3 business days", price: 28 },
  { id: "white-glove", label: "White Glove", detail: "Scheduled delivery, 7–10 days", price: 45 },
] as const;

const FREE_SHIPPING_THRESHOLD = 150;

interface FormState {
  email: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod: (typeof DELIVERY_METHODS)[number]["id"];
}

const initialForm: FormState = {
  email: "",
  fullName: "",
  address: "",
  city: "",
  postalCode: "",
  country: COUNTRIES[0],
  deliveryMethod: "standard",
};

export default function CheckoutPage() {
  const mounted = useMounted();
  const { items, subtotal } = useCartSummary();
  const clearCart = useCartStore((s) => s.clear);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ orderNumber: string; total: number } | null>(null);

  const selectedMethod = DELIVERY_METHODS.find((m) => m.id === form.deliveryMethod) ?? DELIVERY_METHODS[0];
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD && form.deliveryMethod === "standard" ? 0 : selectedMethod.price;
  const total = subtotal + shipping;

  const inStockItems = useMemo(() => items.filter((i) => i.product.inStock), [items]);
  const hasBlockingOutOfStock = items.length > 0 && inStockItems.length !== items.length;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (form.fullName.trim().length < 2) next.fullName = "Enter your full name.";
    if (form.address.trim().length < 4) next.address = "Enter your shipping address.";
    if (form.city.trim().length < 2) next.city = "Enter your city.";
    if (form.postalCode.trim().length < 3) next.postalCode = "Enter a valid postal code.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (items.length === 0) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            slug: i.slug,
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.price,
            color: i.color,
          })),
          subtotal,
          shipping,
          total,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong placing your order.");
      setConfirmation({ orderNumber: data.orderNumber, total });
      clearCart();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong placing your order.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="container-wide py-20">
        <div className="mx-auto max-w-lg text-center">
          <CircleCheckBig size={40} className="mx-auto text-olive-dark" />
          <h1 className="mt-5 font-serif-display text-3xl text-charcoal">Order Confirmed</h1>
          <p className="mt-3 text-sm text-charcoal-soft/80">
            Thank you. Your demonstration order <span className="font-medium text-charcoal">{confirmation.orderNumber}</span> has
            been recorded for {formatPrice(confirmation.total)}.
          </p>
          <div className="mt-6 border border-line bg-ivory-dim p-5 text-left text-xs leading-relaxed text-charcoal-soft/80">
            <p className="font-medium uppercase tracking-[0.1em] text-charcoal">This is a demonstration</p>
            <p className="mt-2">
              No real payment has been processed and no shipment has been dispatched. This checkout exists to
              demonstrate a complete order flow with a persisted order record. A production build would connect a
              real payment provider (e.g. Stripe) and fulfilment/order-management system here.
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/shop" className="bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.12em] text-ivory hover:bg-olive-dark">
              Continue Shopping
            </Link>
            <Link href="/" className="border border-charcoal px-6 py-3 text-xs uppercase tracking-[0.12em] text-charcoal hover:bg-ivory-dim">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="mt-4 font-serif-display text-4xl text-charcoal">Checkout</h1>
      <p className="mt-2 flex items-center gap-2 text-xs text-charcoal-soft/70">
        <ShieldCheck size={14} className="text-olive-dark" /> Demonstration checkout — no real payment is collected.
      </p>

      {!mounted ? (
        <div className="mt-10 h-96 skeleton" />
      ) : items.length === 0 ? (
        <div className="mt-14 flex flex-col items-center gap-4 border border-dashed border-line py-20 text-center">
          <p className="font-serif-display text-xl text-charcoal">Your bag is empty</p>
          <p className="max-w-sm text-sm text-charcoal-soft/70">
            Add something from the collection before checking out.
          </p>
          <Link href="/shop" className="bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.12em] text-ivory hover:bg-olive-dark">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {hasBlockingOutOfStock && (
              <p className="border border-burgundy/30 bg-ivory-dim px-4 py-3 text-sm text-burgundy">
                One or more items in your bag are out of stock. Please return to your bag and remove them before
                checking out.
              </p>
            )}

            <fieldset>
              <legend className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-charcoal-soft/60">
                Contact
              </legend>
              <label htmlFor="email" className="mb-1 block text-sm text-charcoal">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                className="w-full border border-line bg-ivory px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
              />
              {errors.email && <p className="mt-1 text-xs text-burgundy">{errors.email}</p>}
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-charcoal-soft/60">
                Shipping Address
              </legend>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="mb-1 block text-sm text-charcoal">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    className="w-full border border-line bg-ivory px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-burgundy">{errors.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="address" className="mb-1 block text-sm text-charcoal">
                    Street address
                  </label>
                  <input
                    id="address"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    aria-invalid={Boolean(errors.address)}
                    className="w-full border border-line bg-ivory px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
                  />
                  {errors.address && <p className="mt-1 text-xs text-burgundy">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="mb-1 block text-sm text-charcoal">
                      City
                    </label>
                    <input
                      id="city"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      aria-invalid={Boolean(errors.city)}
                      className="w-full border border-line bg-ivory px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
                    />
                    {errors.city && <p className="mt-1 text-xs text-burgundy">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="mb-1 block text-sm text-charcoal">
                      Postal code
                    </label>
                    <input
                      id="postalCode"
                      autoComplete="postal-code"
                      value={form.postalCode}
                      onChange={(e) => update("postalCode", e.target.value)}
                      aria-invalid={Boolean(errors.postalCode)}
                      className="w-full border border-line bg-ivory px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
                    />
                    {errors.postalCode && <p className="mt-1 text-xs text-burgundy">{errors.postalCode}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="mb-1 block text-sm text-charcoal">
                    Country
                  </label>
                  <select
                    id="country"
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    className="w-full border border-line bg-ivory px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-charcoal-soft/60">
                Delivery Method
              </legend>
              <div className="space-y-3">
                {DELIVERY_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center justify-between border px-4 py-3 text-sm transition-colors ${
                      form.deliveryMethod === method.id ? "border-charcoal" : "border-line hover:border-charcoal-soft"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={form.deliveryMethod === method.id}
                        onChange={() => update("deliveryMethod", method.id)}
                        className="h-4 w-4 accent-charcoal"
                      />
                      <span>
                        <span className="block text-charcoal">{method.label}</span>
                        <span className="block text-xs text-charcoal-soft/60">{method.detail}</span>
                      </span>
                    </span>
                    <span className="text-charcoal">
                      {method.id === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD
                        ? "Free"
                        : formatPrice(method.price)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {submitError && (
              <p role="alert" className="border border-burgundy/30 bg-ivory-dim px-4 py-3 text-sm text-burgundy">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || hasBlockingOutOfStock}
              className="flex w-full items-center justify-center gap-2 bg-charcoal py-4 text-sm font-medium uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-olive-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <>
                  Place Demo Order <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <div className="h-max border border-line p-6">
            <h2 className="font-serif-display text-xl text-charcoal">Order Summary</h2>
            <div className="mt-5 space-y-4 divide-y divide-line">
              {items.map((item) => (
                <div key={`${item.slug}-${item.color ?? ""}`} className="flex gap-3 pt-4 first:pt-0">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-ivory-dim">
                    <ProductImage src={item.product.image} alt={item.product.name} sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="text-charcoal">{item.product.name}</p>
                    <p className="text-xs text-charcoal-soft/60">
                      Qty {item.quantity} {item.color ? `· ${item.color}` : ""}
                    </p>
                  </div>
                  <p className="text-sm text-charcoal">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
              <div className="flex justify-between text-charcoal-soft/80">
                <span>Subtotal</span>
                <span className="text-charcoal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal-soft/80">
                <span>Shipping</span>
                <span className="text-charcoal">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between border-t border-line pt-4 text-base font-medium text-charcoal">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
