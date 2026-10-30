"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

export function ProductImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-ivory-dim text-charcoal-soft/50 ${className ?? ""}`}
      >
        <ImageOff size={28} strokeWidth={1.25} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"}
      className={className}
      onError={() => setError(true)}
      priority={priority}
    />
  );
}
