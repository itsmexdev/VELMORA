"use client";

import { useState } from "react";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "./ProductImage";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  function next() {
    setActive((i) => (i + 1) % images.length);
  }
  function prev() {
    setActive((i) => (i - 1 + images.length) % images.length);
  }

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-dim">
        <ProductImage
          src={images[active]}
          alt={`${name} — view ${active + 1}`}
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label="Open image zoom view"
          className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center border border-line bg-ivory/90 text-charcoal hover:border-charcoal"
        >
          <Expand size={16} />
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-line bg-ivory/80 text-charcoal hover:border-charcoal"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-line bg-ivory/80 text-charcoal hover:border-charcoal"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`View image ${idx + 1}`}
              aria-current={active === idx}
              className={`relative aspect-square overflow-hidden border transition-colors ${
                active === idx ? "border-charcoal" : "border-line hover:border-charcoal-soft"
              }`}
            >
              <ProductImage src={img} alt="" sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoomOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} zoomed image`}
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            aria-label="Close zoom view"
            onClick={() => setZoomOpen(false)}
            className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center border border-ivory/40 text-ivory hover:border-ivory"
          >
            <X size={20} />
          </button>
          <div
            className="relative h-full max-h-[85vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductImage src={images[active]} alt={`${name} enlarged`} className="object-contain" sizes="90vw" />
          </div>
        </div>
      )}
    </div>
  );
}
