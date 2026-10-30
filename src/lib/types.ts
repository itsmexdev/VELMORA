export type CategorySlug =
  | "accessories"
  | "fashion"
  | "home-living"
  | "tech-desk"
  | "art-collectibles"
  | "bags"
  | "jewelry"
  | "gifts";

export interface CategoryInfo {
  slug: CategorySlug;
  label: string;
  shortLabel: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  colors?: string[];
  inStock: boolean;
  lowStock?: boolean;
  tags: string[];
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  rareFind?: boolean;
  limitedEdition?: boolean;
  addedIndex: number;
  relatedSlugs: string[];
}
