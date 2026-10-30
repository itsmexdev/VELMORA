import type { Metadata } from "next";
import { Truck, RotateCcw, PackageCheck, Globe } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shipping & Returns — Velmora",
  description: "Sample shipping timelines and return policy for the Velmora demonstration store.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="container-wide py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shipping & Returns" }]} />
      <h1 className="mt-4 font-serif-display text-4xl text-charcoal">Shipping &amp; Returns</h1>
      <p className="mt-3 max-w-xl text-sm text-charcoal-soft/80">
        The policies below are sample demonstration content intended to show a complete storefront
        experience. They are easy to replace with your real business policies in production.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <section className="border border-line p-6">
          <Truck size={22} className="text-olive-dark" />
          <h2 className="mt-4 font-serif-display text-xl text-charcoal">Delivery Timelines</h2>
          <ul className="mt-4 space-y-3 text-sm text-charcoal-soft/80">
            <li><strong className="text-charcoal">Standard</strong> — 5–7 business days, flat $12 fee (free over $150).</li>
            <li><strong className="text-charcoal">Express</strong> — 2–3 business days, flat $28 fee.</li>
            <li><strong className="text-charcoal">White Glove</strong> — 7–10 days scheduled delivery for larger objects, $45 fee.</li>
          </ul>
        </section>

        <section className="border border-line p-6">
          <Globe size={22} className="text-olive-dark" />
          <h2 className="mt-4 font-serif-display text-xl text-charcoal">Where We Ship</h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-soft/80">
            Our demo checkout supports a sample list of countries across North America, Europe, and the
            Asia-Pacific region. In production, shipping zones, duties, and carrier rates would be
            calculated live at checkout.
          </p>
        </section>

        <section className="border border-line p-6">
          <RotateCcw size={22} className="text-olive-dark" />
          <h2 className="mt-4 font-serif-display text-xl text-charcoal">Returns</h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-soft/80">
            Items may be returned within 30 days of delivery in original, unused condition with packaging
            intact. Limited edition pieces, final-sale gifts, and opened candles are not eligible for
            return. Refunds are issued to the original payment method within 5–7 business days of receipt.
          </p>
        </section>

        <section className="border border-line p-6">
          <PackageCheck size={22} className="text-olive-dark" />
          <h2 className="mt-4 font-serif-display text-xl text-charcoal">Damaged or Incorrect Items</h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-soft/80">
            If an item arrives damaged or incorrect, contact us within 7 days with your order number and a
            photo of the issue, and we will arrange a replacement or refund at no additional cost.
          </p>
        </section>
      </div>

      <p className="mt-12 text-xs text-charcoal-soft/55">
        This page describes demonstration policies for prototype purposes only and should be replaced with
        reviewed, jurisdiction-appropriate policies before real-world use.
      </p>
    </div>
  );
}
