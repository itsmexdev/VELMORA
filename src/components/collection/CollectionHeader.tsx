import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { ProductImage } from "@/components/product/ProductImage";

export function CollectionHeader({
  kicker,
  title,
  intro,
  bannerImage,
  crumbs,
  count,
}: {
  kicker: string;
  title: string;
  intro: string;
  bannerImage: string;
  crumbs: Crumb[];
  count: number;
}) {
  return (
    <div className="border-b border-line">
      <div className="container-wide pt-6">
        <Breadcrumbs items={crumbs} />
      </div>
      <div className="container-wide grid grid-cols-1 gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-14">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-olive-dark">{kicker}</p>
          <h1 className="mt-3 font-serif-display text-4xl leading-[1.05] text-charcoal sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-charcoal-soft/80">{intro}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.12em] text-charcoal-soft/60">
            {count} {count === 1 ? "Product" : "Products"}
          </p>
        </div>
        <div className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-[4/3]">
          <ProductImage src={bannerImage} alt={title} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
