import Link from "next/link";
import { categories } from "@/lib/categories";
import { ProductImage } from "@/components/product/ProductImage";

export function CategoryGrid() {
  return (
    <section className="bg-ivory-dim py-16 sm:py-24">
      <div className="container-wide">
        <div className="mb-10 max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-olive-dark">Browse</p>
          <h2 className="mt-3 font-serif-display text-3xl text-charcoal sm:text-4xl">Shop by Category</h2>
          <p className="mt-3 text-sm text-charcoal-soft/80">
            Eight considered departments, each built around a point of view rather than a trend cycle.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/collections/${category.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden"
            >
              <ProductImage
                src={category.image}
                alt={category.label}
                sizes="(min-width: 1024px) 23vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-serif-display text-lg text-ivory">{category.shortLabel}</p>
                <span className="mt-1 inline-block text-xs uppercase tracking-[0.1em] text-ivory/80 opacity-0 transition-opacity group-hover:opacity-100">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
