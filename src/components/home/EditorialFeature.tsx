import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";

export function EditorialFeature() {
  return (
    <section className="container-wide py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="relative aspect-[4/5] w-full overflow-hidden lg:order-2">
          <ProductImage
            src="/images/editorial-philosophy.jpg"
            alt="A single rare object lit dramatically on a pedestal, representing considered curation"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:order-1">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-olive-dark">Our Philosophy</p>
          <h2 className="mt-4 font-serif-display text-3xl leading-tight text-charcoal sm:text-4xl">
            We don&rsquo;t chase trends. We chase the objects trends leave behind.
          </h2>
          <p className="mt-6 text-[0.95rem] leading-relaxed text-charcoal-soft/85">
            Every season produces thousands of forgettable things and a handful of genuinely considered
            ones. Velmora exists to find the second kind — small-batch jewelry, sculptural lighting,
            hand-thrown ceramics, and leather goods made by people who still care how a seam is finished.
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-charcoal-soft/85">
            We work with independent makers and small studios, favour material honesty over logos, and
            would rather sell fewer things that last than more things that don&rsquo;t.
          </p>
          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.1em] text-charcoal link-underline"
          >
            Read Our Story <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
