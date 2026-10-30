import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Velmora — home"
      className={`group inline-flex items-center gap-2 ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="relative inline-block h-2.5 w-2.5 rotate-45 border border-charcoal transition-colors group-hover:bg-olive-dark group-hover:border-olive-dark"
      />
      <span className="font-serif-display text-xl font-medium tracking-[0.14em] text-charcoal">
        VELMORA
      </span>
    </Link>
  );
}
