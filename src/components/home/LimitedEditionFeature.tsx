import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductsByFlag } from "@/lib/products";
import { ProductImage } from "@/components/product/ProductImage";
import { Price } from "@/components/ui/Price";
import { WishlistButton } from "@/components/product/WishlistButton";

export function LimitedEditionFeature() {
  const products = getProductsByFlag("limitedEdition").slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-charcoal text-ivory">
      <div className="absolute inset-0">
        <ProductImage
          src="/images/limited-edition-banner.jpg"
          alt=""
          className="object-cover opacity-40"
        />
      </div>
      <div className="container-wide relative py-16 sm:py-24">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ivory/70">
            Produced in Fixed Numbers
          </p>
          <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl">Limited Editions</h2>
          <p className="mt-4 text-sm leading-relaxed text-ivory/75">
            A small set of objects produced in a fixed run for this season only. Demonstration data —
            edition sizes shown throughout the site are for illustrative purposes and are not connected
            to live inventory.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="group relative border border-ivory/20 bg-charcoal/40 p-4 backdrop-blur-sm">
              <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute right-2 top-2">
                  <WishlistButton slug={product.slug} name={product.name} />
                </div>
              </Link>
              <div className="pt-4">
                <Link href={`/products/${product.slug}`} className="font-serif-display text-base text-ivory link-underline">
                  {product.name}
                </Link>
                <div className="mt-2">
                  <Price price={product.price} originalPrice={product.originalPrice} tone="light" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/collections/limited-editions"
          className="mt-10 inline-flex items-center gap-2 border border-ivory px-7 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
        >
          Shop Limited Editions <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
