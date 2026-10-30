import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { CollectionHeader } from "@/components/collection/CollectionHeader";
import { CollectionBrowser } from "@/components/collection/CollectionBrowser";

export const metadata: Metadata = {
  title: "Shop All — Velmora",
  description: "Browse the complete Velmora catalog of rare objects, accessories, and uncommon gifts.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div>
      <CollectionHeader
        kicker="The Full Collection"
        title="Shop All"
        intro="Every object currently in the Velmora edit, from sculptural desk lighting to small-batch jewelry. Use the filters to narrow in on exactly what you're looking for."
        bannerImage="https://images.pexels.com/photos/39774571/pexels-photo-39774571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=2000&fit=crop"
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop All" }]}
        count={products.length}
      />
      <div className="container-wide py-12">
        <CollectionBrowser products={products} showCategoryFilter />
      </div>
    </div>
  );
}
