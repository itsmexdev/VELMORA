import { formatPrice } from "@/lib/format";

export function Price({
  price,
  originalPrice,
  size = "md",
  tone = "dark",
}: {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
}) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  } as const;

  return (
    <span className={`inline-flex items-baseline gap-2 ${sizes[size]}`}>
      <span className={`font-medium ${tone === "light" ? "text-ivory" : "text-charcoal"}`}>
        {formatPrice(price)}
      </span>
      {originalPrice && originalPrice > price ? (
        <span
          className={`line-through text-[0.85em] ${
            tone === "light" ? "text-ivory/60" : "text-charcoal-soft/60"
          }`}
        >
          {formatPrice(originalPrice)}
        </span>
      ) : null}
    </span>
  );
}
