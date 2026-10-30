import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductImage } from "@/components/product/ProductImage";

export const metadata: Metadata = {
  title: "About — Velmora",
  description: "The story and design philosophy behind Velmora, a premium discovery store for uncommon objects.",
};

const values = [
  {
    title: "Sourced, Not Manufactured at Scale",
    body: "We work with independent studios and small workshops rather than mass production lines, which means smaller runs — and occasional waitlists.",
  },
  {
    title: "Material Honesty",
    body: "Solid brass, full-grain leather, stoneware, and real wood. If a material is described, it's the material you'll receive.",
  },
  {
    title: "Edited, Not Exhaustive",
    body: "We'd rather carry 48 objects we believe in than 4,800 we don't. Every product on Velmora passed a deliberately small bar.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <div className="container-wide pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      </div>

      <section className="container-wide grid grid-cols-1 gap-10 py-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-olive-dark">About Velmora</p>
          <h1 className="mt-4 font-serif-display text-4xl leading-tight text-charcoal sm:text-5xl">
            A store built for people who notice things.
          </h1>
          <p className="mt-6 text-[0.98rem] leading-relaxed text-charcoal-soft/85">
            Velmora began as a simple frustration: most &ldquo;discovery&rdquo; shopping online felt
            identical — the same drop-shipped objects, reshuffled under different names. We wanted a
            place that felt like a well-travelled friend&rsquo;s apartment: considered, a little
            unexpected, and clearly assembled by someone with taste.
          </p>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-charcoal-soft/85">
            Today, Velmora curates a small, rotating collection of rare objects, distinctive
            accessories, and collectible design pieces from independent makers — sourced in limited
            quantities and never restocked exactly the same way twice.
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <ProductImage
            src="/images/about-story.jpg"
            alt="A quiet design atelier with sculptural objects being inspected by hand"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-line bg-ivory-dim py-16">
        <div className="container-wide">
          <h2 className="font-serif-display text-3xl text-charcoal">What Makes the Collection Different</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title}>
                <p className="font-serif-display text-xl text-charcoal">{v.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft/80">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-16 text-center">
        <p className="mx-auto max-w-2xl font-serif-display text-2xl leading-snug text-charcoal sm:text-3xl">
          &ldquo;Find What Others Overlook.&rdquo;
        </p>
        <p className="mx-auto mt-4 max-w-lg text-sm text-charcoal-soft/75">
          That's not a slogan we chose lightly — it's the only editorial standard every product on this
          site is held to. All brand, team, and sourcing details on this page are illustrative content for
          this design demonstration.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 bg-charcoal px-7 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-ivory hover:bg-olive-dark"
        >
          Explore the Collection <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
