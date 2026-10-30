import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { getCategory } from "@/lib/categories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Price } from "@/components/ui/Price";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductCard } from "@/components/product/ProductCard";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Velmora`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  return (
    <div className="container-wide py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          ...(category ? [{ label: category.label, href: `/collections/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ProductGallery images={product.gallery.length ? product.gallery : [product.image]} name={product.name} />

        <div className="lg:pl-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-olive-dark">
            {category?.label ?? product.category}
          </p>
          <h1 className="mt-2 font-serif-display text-3xl leading-tight text-charcoal sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Price price={product.price} originalPrice={product.originalPrice} size="lg" />
            {!product.inStock ? (
              <span className="border border-burgundy/30 px-2 py-1 text-xs uppercase tracking-wide text-burgundy">
                Out of Stock
              </span>
            ) : product.lowStock ? (
              <span className="border border-burgundy/30 px-2 py-1 text-xs uppercase tracking-wide text-burgundy">
                Low Stock
              </span>
            ) : (
              <span className="border border-olive-dark/30 px-2 py-1 text-xs uppercase tracking-wide text-olive-dark">
                In Stock
              </span>
            )}
          </div>

          <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-charcoal-soft/85">
            {product.description}
          </p>

          <div className="mt-8 border-t border-line pt-8">
            <ProductActions product={product} />
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-[0.1em] text-charcoal-soft/60">SKU</dt>
              <dd className="mt-1 text-charcoal">{product.sku}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.1em] text-charcoal-soft/60">Category</dt>
              <dd className="mt-1 text-charcoal">{category?.label ?? product.category}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-xs uppercase tracking-[0.1em] text-charcoal-soft/60">Tags</dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5 text-charcoal">
                {product.tags.map((t) => (
                  <span key={t} className="border border-line px-2 py-0.5 text-xs capitalize text-charcoal-soft">
                    {t.replace(/-/g, " ")}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8 space-y-3 border-t border-line pt-6 text-sm text-charcoal-soft/80">
            <p className="flex items-center gap-3">
              <Truck size={16} className="shrink-0 text-olive-dark" /> Ships in 2–4 business days. See{" "}
              <Link href="/shipping-returns" className="link-underline text-charcoal">
                shipping details
              </Link>
              .
            </p>
            <p className="flex items-center gap-3">
              <RotateCcw size={16} className="shrink-0 text-olive-dark" /> 30-day demo return window —
              see our{" "}
              <Link href="/shipping-returns" className="link-underline text-charcoal">
                returns policy
              </Link>
              .
            </p>
            <p className="flex items-center gap-3">
              <ShieldCheck size={16} className="shrink-0 text-olive-dark" /> Checkout is a demonstration
              flow; no real payment is processed.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="font-serif-display text-2xl text-charcoal">You May Also Like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
