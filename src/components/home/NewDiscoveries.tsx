import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductsByFlag } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

export function NewDiscoveries() {
  const products = getProductsByFlag("newArrival").slice(0, 4);

  return (
    <section className="bg-ivory-dim py-16 sm:py-24">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-olive-dark">Just Landed</p>
            <h2 className="mt-3 font-serif-display text-3xl text-charcoal sm:text-4xl">New Discoveries</h2>
          </div>
          <Link href="/collections/new-arrivals" className="inline-flex items-center gap-2 text-sm text-charcoal link-underline">
            Shop New Arrivals <ArrowRight size={15} />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
