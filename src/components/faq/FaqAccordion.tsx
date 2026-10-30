"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div>
      <div className="relative max-w-md">
        <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-soft/50" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpenIndex(null);
          }}
          placeholder="Search FAQs — try “returns” or “payment”"
          aria-label="Search frequently asked questions"
          className="w-full border border-line bg-ivory py-3 pl-11 pr-4 text-sm focus:border-charcoal focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-charcoal-soft/70">No questions match “{query}”. Try another term.</p>
      ) : (
        <div className="mt-8 divide-y divide-line border-y border-line">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[0.95rem] text-charcoal">{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-charcoal-soft/60 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                {isOpen && (
                  <p className="max-w-2xl pb-5 text-sm leading-relaxed text-charcoal-soft/80">{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
