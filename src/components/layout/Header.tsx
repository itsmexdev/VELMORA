"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Logo } from "./Logo";
import { primaryNav, megaMenuGroups } from "@/lib/nav";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { SearchPanel } from "./SearchPanel";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const mounted = useMounted();

  const wishlistCount = useWishlistStore((s) => s.slugs.length);
  const cartCount = useCartStore((s) => s.lines.reduce((sum, l) => sum + l.quantity, 0));

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur">
      <div
        className={`container-wide flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <button
          type="button"
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>

        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {primaryNav.map((item) =>
            item.label === "Shop" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 py-2 text-sm tracking-wide text-charcoal link-underline"
                  aria-expanded={megaOpen}
                  onClick={() => setMegaOpen((v) => !v)}
                >
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
                </button>
                {megaOpen && (
                  <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 border border-line bg-ivory pt-6 shadow-[0_30px_60px_rgba(32,28,25,0.14)]">
                    <div className="grid grid-cols-3 gap-8 px-8 pb-8">
                      {megaMenuGroups.map((group) => (
                        <div key={group.title}>
                          <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-charcoal-soft/60">
                            {group.title}
                          </p>
                          <ul className="space-y-2.5">
                            {group.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="text-sm text-charcoal link-underline"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-line bg-ivory-dim px-8 py-3 text-center">
                      <Link href="/shop" className="text-xs uppercase tracking-[0.12em] text-olive-dark link-underline">
                        View Entire Shop
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="py-2 text-sm tracking-wide text-charcoal link-underline">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center hover:text-olive-dark"
          >
            <Search size={19} strokeWidth={1.5} />
          </button>
          <Link
            href="/wishlist"
            aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ""}`}
            className="relative inline-flex h-10 w-10 items-center justify-center hover:text-olive-dark"
          >
            <Heart size={19} strokeWidth={1.5} />
            {mounted && wishlistCount > 0 && (
              <span className="absolute right-0.5 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[0.6rem] font-medium text-ivory">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            aria-label={`Shopping bag${cartCount > 0 ? `, ${cartCount} items` : ""}`}
            className="relative inline-flex h-10 w-10 items-center justify-center hover:text-olive-dark"
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            {mounted && cartCount > 0 && (
              <span className="absolute right-0.5 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-charcoal px-1 text-[0.6rem] font-medium text-ivory">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-charcoal/40" onClick={() => setMobileOpen(false)} />
          <div className="relative flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-ivory shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
              {primaryNav
                .filter((i) => i.label !== "Shop")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b border-line py-3.5 text-[0.95rem] text-charcoal"
                  >
                    {item.label}
                  </Link>
                ))}
              {megaMenuGroups.map((group) => (
                <div key={group.title} className="border-b border-line">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3.5 text-left text-[0.95rem] text-charcoal"
                    onClick={() =>
                      setExpandedGroup((g) => (g === group.title ? null : group.title))
                    }
                    aria-expanded={expandedGroup === group.title}
                  >
                    {group.title}
                    <ChevronRight
                      size={16}
                      className={`transition-transform ${expandedGroup === group.title ? "rotate-90" : ""}`}
                    />
                  </button>
                  {expandedGroup === group.title && (
                    <ul className="space-y-3 pb-4 pl-3">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="text-sm text-charcoal-soft">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <Link href="/wishlist" className="border-b border-line py-3.5 text-[0.95rem] text-charcoal">
                Wishlist {mounted && wishlistCount > 0 ? `(${wishlistCount})` : ""}
              </Link>
              <Link href="/cart" className="py-3.5 text-[0.95rem] text-charcoal">
                Cart {mounted && cartCount > 0 ? `(${cartCount})` : ""}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
