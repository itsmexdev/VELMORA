"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";
import { useMounted } from "@/hooks/use-mounted";
import { useToast } from "@/components/ui/ToastProvider";

export function WishlistButton({
  slug,
  name,
  className,
  size = 17,
}: {
  slug: string;
  name: string;
  className?: string;
  size?: number;
}) {
  const mounted = useMounted();
  const active = useWishlistStore((s) => s.slugs.includes(slug));
  const toggle = useWishlistStore((s) => s.toggle);
  const { showToast } = useToast();

  return (
    <button
      type="button"
      aria-pressed={mounted ? active : false}
      aria-label={active ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
        showToast(
          active ? `Removed “${name}” from your wishlist.` : `Added “${name}” to your wishlist.`,
          "success"
        );
      }}
      className={`group/wish inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ivory/90 backdrop-blur transition-colors hover:border-charcoal ${className ?? ""}`}
    >
      <Heart
        size={size}
        strokeWidth={1.5}
        className={mounted && active ? "fill-burgundy text-burgundy" : "text-charcoal"}
      />
    </button>
  );
}
