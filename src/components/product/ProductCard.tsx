import Link from "next/link";
import type { Product } from "@/lib/types";
import { getCategory } from "@/lib/categories";
import { ProductImage } from "./ProductImage";
import { WishlistButton } from "./WishlistButton";
import { AddToCartButton } from "./AddToCartButton";
import { Price } from "@/components/ui/Price";

function Badge({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "burgundy" }) {
  return (
    <span
      className={`inline-block border px-2 py-1 text-[0.65rem] font-medium uppercase tracking-[0.1em] ${
        tone === "burgundy"
          ? "border-burgundy/30 bg-ivory/90 text-burgundy"
          : "border-charcoal/20 bg-ivory/90 text-charcoal"
      }`}
    >
      {children}
    </span>
  );
}

export function ProductCard({
  product,
  priority = false,
  imageAspect = "aspect-[4/5]",
}: {
  product: Product;
  priority?: boolean;
  imageAspect?: string;
}) {
  const category = getCategory(product.category);

  return (
    <article className="group relative flex h-full flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-ivory-dim"
      >
        <div className={`relative ${imageAspect} w-full overflow-hidden`}>
          <ProductImage
            src={product.image}
            alt={product.name}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
            <div className="flex flex-wrap gap-1.5">
              {product.limitedEdition && <Badge tone="burgundy">Limited</Badge>}
              {product.newArrival && <Badge>New</Badge>}
              {!product.inStock && <Badge tone="burgundy">Sold Out</Badge>}
              {product.inStock && product.lowStock && <Badge tone="burgundy">Low Stock</Badge>}
            </div>
            <WishlistButton slug={product.slug} name={product.name} />
          </div>
          <div className="absolute bottom-3 right-3 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <AddToCartButton
              slug={product.slug}
              name={product.name}
              inStock={product.inStock}
              color={product.colors?.[0]}
            />
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-1 pt-3">
        <p className="text-[0.7rem] uppercase tracking-[0.14em] text-charcoal-soft/60">
          {category?.shortLabel ?? product.category}
        </p>
        <h3 className="font-serif-display text-[1.05rem] leading-snug text-charcoal">
          <Link href={`/products/${product.slug}`} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-1 text-sm text-charcoal-soft/80">{product.shortDescription}</p>
        <div className="mt-auto pt-2">
          <Price price={product.price} originalPrice={product.originalPrice} />
        </div>
      </div>
    </article>
  );
}
