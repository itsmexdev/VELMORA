import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";

export function HomeHero() {
  return (
    <section className="border-b border-line bg-ivory">
      <div className="container-wide grid grid-cols-1 items-stretch gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-olive-dark">
            The Discovery Edit
          </p>
          <h1 className="mt-4 font-serif-display text-4xl leading-[1.05] text-charcoal text-balance sm:text-5xl lg:text-[3.4rem]">
            Ordinary Is Easy.
            <br />
            <em className="italic text-olive-dark">Uncommon</em> Is Everything.
          </h1>
          <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-charcoal-soft/85">
            Objects with character. Pieces with a story. Discover a more considered collection
            of things worth keeping.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/collections/rare-finds"
              className="inline-flex items-center gap-2 bg-charcoal px-7 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-ivory transition-colors hover:bg-olive-dark"
            >
              Explore Rare Finds <ArrowRight size={15} />
            </Link>
            <Link
              href="/collections/new-arrivals"
              className="inline-flex items-center gap-2 border border-charcoal px-7 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-charcoal transition-colors hover:bg-ivory-dim"
            >
              Shop New Arrivals
            </Link>
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden lg:min-h-0">
          <ProductImage
            src="/images/hero-main.jpg"
            alt="A curated still life arrangement of rare objects — brass, ceramic, and leather — on an ivory backdrop"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
