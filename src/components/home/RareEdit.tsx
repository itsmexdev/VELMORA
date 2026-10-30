import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductsByFlag } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
];

const aspects = [
  "aspect-[16/11]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[16/11]",
  "aspect-[4/5]",
  "aspect-[4/5]",
];

export function RareEdit() {
  const products = getProductsByFlag("featured").slice(0, 6);

  return (
    <section className="container-wide py-16 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-olive-dark">
            Signature Selection
          </p>
          <h2 className="mt-3 font-serif-display text-3xl text-charcoal sm:text-4xl">The Rare Edit</h2>
          <p className="mt-3 max-w-xl text-sm text-charcoal-soft/80">
            A small, deliberately uneven selection pulled from across the collection — the pieces we'd
            keep for ourselves.
          </p>
        </div>
        <Link
          href="/collections/rare-finds"
          className="inline-flex items-center gap-2 text-sm text-charcoal link-underline"
        >
          View All Rare Finds <ArrowRight size={15} />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
        {products.map((product, idx) => (
          <div key={product.id} className={`col-span-2 ${spans[idx % spans.length]}`}>
            <ProductCard product={product} imageAspect={aspects[idx % aspects.length]} priority={idx === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
