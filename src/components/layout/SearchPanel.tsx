"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { searchProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/product/ProductImage";

export function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => searchProducts(query).slice(0, 6), [query]);

  function goToSearch(q: string) {
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        router.push(`/products/${results[activeIndex].slug}`);
        onClose();
      } else {
        goToSearch(query);
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-charcoal/40 px-4 pt-24 backdrop-blur-sm sm:pt-32">
      <div className="h-max w-full max-w-xl border border-line bg-ivory shadow-[0_30px_60px_rgba(32,28,25,0.25)]">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Search size={18} className="text-charcoal-soft/60" />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results-list"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search products, categories, materials…"
            className="w-full bg-transparent py-1 text-base text-charcoal placeholder:text-charcoal-soft/50 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="text-charcoal-soft/60 hover:text-charcoal"
          >
            <X size={20} />
          </button>
        </div>

        {query.trim() && (
          <ul id="search-results-list" className="max-h-[60vh] overflow-y-auto">
            {results.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-charcoal-soft/70">
                No matches for “{query}”. Try “ceramic”, “leather”, or “gold”.
              </li>
            ) : (
              results.map((p, idx) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                      idx === activeIndex ? "bg-ivory-dim" : "hover:bg-ivory-dim"
                    }`}
                  >
                    <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-ivory-dim">
                      <ProductImage src={p.image} alt={p.name} sizes="48px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-charcoal">{p.name}</p>
                      <p className="text-xs text-charcoal-soft/60">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                </li>
              ))
            )}
            <li className="border-t border-line">
              <button
                type="button"
                onClick={() => goToSearch(query)}
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-charcoal hover:bg-ivory-dim"
              >
                View all results for “{query}”
                <ArrowRight size={15} />
              </button>
            </li>
          </ul>
        )}

        {!query.trim() && (
          <div className="px-4 py-6">
            <p className="mb-2 text-xs uppercase tracking-[0.12em] text-charcoal-soft/60">
              Popular searches
            </p>
            <div className="flex flex-wrap gap-2">
              {["ceramic", "leather", "gold jewelry", "desk lamp", "gift set"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="border border-line px-3 py-1.5 text-xs text-charcoal-soft hover:border-charcoal hover:text-charcoal"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
