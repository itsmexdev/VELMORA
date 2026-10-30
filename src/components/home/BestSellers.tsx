import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductsByFlag } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

export function BestSellers() {
  const products = getProductsByFlag("bestseller").slice(0, 4);

  return (
    <section className="container-wide py-16 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-olive-dark">Most Loved</p>
          <h2 className="mt-3 font-serif-display text-3xl text-charcoal sm:text-4xl">Best Sellers</h2>
        </div>
        <Link href="/collections/best-sellers" className="inline-flex items-center gap-2 text-sm text-charcoal link-underline">
          View Best Sellers <ArrowRight size={15} />
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
