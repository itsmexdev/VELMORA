import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchProducts } from "@/lib/products";
import { categories } from "@/lib/categories";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type SearchParams = Promise<{ q?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for “${q}” — Velmora` : "Search — Velmora",
  };
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? searchProducts(query) : [];

  return (
    <div className="container-wide py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />

      <div className="mt-6 flex items-center gap-3">
        <Search size={22} className="text-charcoal-soft/50" />
        <h1 className="font-serif-display text-3xl text-charcoal">
          {query ? `Results for “${query}”` : "Search Velmora"}
        </h1>
      </div>

      <form action="/search" method="get" className="mt-6 max-w-lg">
        <label htmlFor="q" className="sr-only">
          Search products
        </label>
        <div className="flex border border-line focus-within:border-charcoal">
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search for products, categories, materials…"
            className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none"
          />
          <button type="submit" className="bg-charcoal px-5 text-xs uppercase tracking-[0.1em] text-ivory">
            Search
          </button>
        </div>
      </form>

      {query && (
        <p className="mt-5 text-sm text-charcoal-soft/70">
          {results.length} {results.length === 1 ? "result" : "results"} found
        </p>
      )}

      {query && results.length === 0 && (
        <div className="mt-12 max-w-xl border border-dashed border-line p-10 text-center">
          <p className="font-serif-display text-xl text-charcoal">No matches for “{query}”</p>
          <p className="mt-3 text-sm text-charcoal-soft/75">
            Try a broader term, check your spelling, or browse a category below.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="border border-line px-3 py-1.5 text-xs text-charcoal hover:border-charcoal"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {!query && (
        <div className="mt-12">
          <p className="mb-3 text-xs uppercase tracking-[0.12em] text-charcoal-soft/60">
            Browse by category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="border border-line px-3 py-1.5 text-xs text-charcoal hover:border-charcoal"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
