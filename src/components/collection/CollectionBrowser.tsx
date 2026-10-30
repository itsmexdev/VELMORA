"use client";

import { useMemo, useState } from "react";
import { Funnel, X, ListFilter } from "lucide-react";
import type { Product, CategorySlug } from "@/lib/types";
import { getCategory, categories } from "@/lib/categories";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/format";

type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "name-asc";

const sortLabels: Record<SortKey, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A–Z",
};

const PAGE_SIZE = 12;

export function CollectionBrowser({
  products,
  showCategoryFilter = false,
}: {
  products: Product[];
  showCategoryFilter?: boolean;
}) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [categoryFilter, setCategoryFilter] = useState<CategorySlug[]>([]);
  const [colorFilter, setColorFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const bounds = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [products]);

  const availableColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.colors?.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [products]);

  const availableTags = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort().slice(0, 12);
  }, [products]);

  const availableCategories = useMemo(() => {
    const set = new Set<CategorySlug>();
    products.forEach((p) => set.add(p.category));
    return categories.filter((c) => set.has(c.slug));
  }, [products]);

  const filtered = useMemo(() => {
    const min = minPrice ? Number(minPrice) : undefined;
    const max = maxPrice ? Number(maxPrice) : undefined;

    let result = products.filter((p) => {
      if (categoryFilter.length > 0 && !categoryFilter.includes(p.category)) return false;
      if (inStockOnly && !p.inStock) return false;
      if (min !== undefined && p.price < min) return false;
      if (max !== undefined && p.price > max) return false;
      if (colorFilter.length > 0 && !p.colors?.some((c) => colorFilter.includes(c))) return false;
      if (tagFilter.length > 0 && !tagFilter.some((t) => p.tags.includes(t))) return false;
      return true;
    });

    switch (sort) {
      case "newest":
        result = [...result].sort((a, b) => b.addedIndex - a.addedIndex);
        break;
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return result;
  }, [products, categoryFilter, inStockOnly, minPrice, maxPrice, colorFilter, tagFilter, sort]);

  const visible = filtered.slice(0, visibleCount);

  const activeFilters: { key: string; label: string; clear: () => void }[] = [
    ...categoryFilter.map((c) => ({
      key: `cat-${c}`,
      label: getCategory(c)?.label ?? c,
      clear: () => setCategoryFilter((prev) => prev.filter((x) => x !== c)),
    })),
    ...colorFilter.map((c) => ({
      key: `color-${c}`,
      label: c,
      clear: () => setColorFilter((prev) => prev.filter((x) => x !== c)),
    })),
    ...tagFilter.map((t) => ({
      key: `tag-${t}`,
      label: t,
      clear: () => setTagFilter((prev) => prev.filter((x) => x !== t)),
    })),
    ...(inStockOnly
      ? [{ key: "instock", label: "In Stock Only", clear: () => setInStockOnly(false) }]
      : []),
    ...(minPrice
      ? [{ key: "min", label: `Min ${formatPrice(Number(minPrice))}`, clear: () => setMinPrice("") }]
      : []),
    ...(maxPrice
      ? [{ key: "max", label: `Max ${formatPrice(Number(maxPrice))}`, clear: () => setMaxPrice("") }]
      : []),
  ];

  function clearAll() {
    setCategoryFilter([]);
    setColorFilter([]);
    setTagFilter([]);
    setInStockOnly(false);
    setMinPrice("");
    setMaxPrice("");
    setVisibleCount(PAGE_SIZE);
  }

  function toggle<T>(arr: T[], value: T, setter: (v: T[]) => void) {
    setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  }

  const FilterForm = (
    <div className="space-y-8">
      {showCategoryFilter && availableCategories.length > 1 && (
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-charcoal-soft/60">
            Category
          </p>
          <ul className="space-y-2.5">
            {availableCategories.map((c) => (
              <li key={c.slug}>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
                  <input
                    type="checkbox"
                    checked={categoryFilter.includes(c.slug)}
                    onChange={() => toggle(categoryFilter, c.slug, setCategoryFilter)}
                    className="h-4 w-4 accent-charcoal"
                  />
                  {c.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-charcoal-soft/60">
          Price ({formatPrice(bounds.min)} – {formatPrice(bounds.max)})
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder={`${bounds.min}`}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            aria-label="Minimum price"
            className="w-full border border-line bg-ivory px-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
          <span className="text-charcoal-soft/50">–</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder={`${bounds.max}`}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            aria-label="Maximum price"
            className="w-full border border-line bg-ivory px-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-charcoal-soft/60">
          Availability
        </p>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 accent-charcoal"
          />
          In stock only
        </label>
      </div>

      {availableColors.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-charcoal-soft/60">
            Color
          </p>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggle(colorFilter, c, setColorFilter)}
                className={`border px-3 py-1.5 text-xs transition-colors ${
                  colorFilter.includes(c)
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-line text-charcoal-soft hover:border-charcoal"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableTags.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-charcoal-soft/60">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => toggle(tagFilter, t, setTagFilter)}
                className={`border px-3 py-1.5 text-xs capitalize transition-colors ${
                  tagFilter.includes(t)
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-line text-charcoal-soft hover:border-charcoal"
                }`}
              >
                {t.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFilters.length > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="text-xs font-medium uppercase tracking-[0.1em] text-burgundy link-underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <p className="text-sm text-charcoal-soft/80">
          Showing <span className="text-charcoal">{visible.length}</span> of{" "}
          <span className="text-charcoal">{filtered.length}</span> products
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 border border-line px-3 py-2 text-xs uppercase tracking-[0.1em] text-charcoal lg:hidden"
          >
            <Funnel size={14} /> Filters
          </button>
          <div className="flex items-center gap-2">
            <ListFilter size={14} className="hidden text-charcoal-soft/60 sm:block" />
            <label htmlFor="sort-select" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-line bg-ivory px-3 py-2 text-xs uppercase tracking-[0.08em] text-charcoal focus:outline-none focus:border-charcoal"
            >
              {Object.entries(sortLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {activeFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={f.clear}
              className="flex items-center gap-1.5 border border-line bg-ivory-dim px-3 py-1.5 text-xs text-charcoal hover:border-charcoal"
            >
              {f.label}
              <X size={12} />
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{FilterForm}</aside>

        <div>
          {visible.length === 0 ? (
            <div className="flex flex-col items-center gap-4 border border-dashed border-line py-20 text-center">
              <p className="font-serif-display text-xl text-charcoal">No products match your filters</p>
              <p className="max-w-sm text-sm text-charcoal-soft/70">
                Try widening your price range or clearing a filter to see more of the collection.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="border border-charcoal px-5 py-2.5 text-xs uppercase tracking-[0.1em] text-charcoal hover:bg-charcoal hover:text-ivory"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 xl:grid-cols-3">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {visibleCount < filtered.length && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="border border-charcoal px-8 py-3 text-xs uppercase tracking-[0.12em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-charcoal/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-ivory p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-serif-display text-lg text-charcoal">Filters</p>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            {FilterForm}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 bg-charcoal py-3 text-xs uppercase tracking-[0.12em] text-ivory"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
