import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  allCollectionSlugs,
  getCollectionConfig,
  getCollectionProducts,
} from "@/lib/collections";
import { CollectionHeader } from "@/components/collection/CollectionHeader";
import { CollectionBrowser } from "@/components/collection/CollectionBrowser";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return allCollectionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const config = getCollectionConfig(slug);
  if (!config) return {};
  return {
    title: `${config.title} — Velmora`,
    description: config.intro,
  };
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const config = getCollectionConfig(slug);
  if (!config) notFound();

  const products = getCollectionProducts(config);

  return (
    <div>
      <CollectionHeader
        kicker={config.kicker}
        title={config.title}
        intro={config.intro}
        bannerImage={config.bannerImage}
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: config.title }]}
        count={products.length}
      />
      <div className="container-wide py-12">
        <CollectionBrowser products={products} showCategoryFilter={config.type === "flag"} />
      </div>
    </div>
  );
}
