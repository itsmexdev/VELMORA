import type { CategorySlug, Product } from "./types";
import type { FlagKey } from "./products";
import { getProductsByCategory, getProductsByFlag } from "./products";
import { getCategory } from "./categories";

export interface CollectionConfig {
  slug: string;
  title: string;
  kicker: string;
  intro: string;
  bannerImage: string;
  type: "flag" | "category";
  key: FlagKey | CategorySlug;
}

export const collectionConfigs: CollectionConfig[] = [
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    kicker: "Just In",
    intro:
      "The newest additions to the Velmora edit — recently finished, freshly stocked, and not yet widely seen.",
    bannerImage:
      "https://images.pexels.com/photos/39774571/pexels-photo-39774571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=2000&fit=crop",
    type: "flag",
    key: "newArrival",
  },
  {
    slug: "rare-finds",
    title: "Rare Finds",
    kicker: "Scarce by Nature",
    intro:
      "Unusual objects sourced in small quantities. When a rare find sells out, it is rarely restocked in the same form.",
    bannerImage:
      "https://images.pexels.com/photos/32541183/pexels-photo-32541183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=2000&fit=crop",
    type: "flag",
    key: "rareFind",
  },
  {
    slug: "limited-editions",
    title: "Limited Editions",
    kicker: "Numbered Runs",
    intro:
      "Produced in fixed, numbered runs for a single season. Demonstration data — edition sizes shown are for illustrative purposes only.",
    bannerImage:
      "https://images.pexels.com/photos/38014632/pexels-photo-38014632.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=2000&fit=crop",
    type: "flag",
    key: "limitedEdition",
  },
  {
    slug: "best-sellers",
    title: "Best Sellers",
    kicker: "Most Loved",
    intro:
      "The pieces our community returns for again and again — proven favourites across every category.",
    bannerImage:
      "https://images.pexels.com/photos/27046146/pexels-photo-27046146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=2000&fit=crop",
    type: "flag",
    key: "bestseller",
  },
];

for (const category of [
  "accessories",
  "fashion",
  "home-living",
  "tech-desk",
  "art-collectibles",
  "bags",
  "jewelry",
  "gifts",
] as CategorySlug[]) {
  const info = getCategory(category);
  if (!info) continue;
  collectionConfigs.push({
    slug: category,
    title: info.label,
    kicker: "Shop the Category",
    intro: info.description,
    bannerImage: `${info.image.replace("h=900&w=900", "h=1200&w=2000")}`,
    type: "category",
    key: category,
  });
}

export function getCollectionConfig(slug: string): CollectionConfig | undefined {
  return collectionConfigs.find((c) => c.slug === slug);
}

export function getCollectionProducts(config: CollectionConfig): Product[] {
  if (config.type === "flag") {
    return getProductsByFlag(config.key as FlagKey);
  }
  return getProductsByCategory(config.key as CategorySlug);
}

export const allCollectionSlugs = collectionConfigs.map((c) => c.slug);
