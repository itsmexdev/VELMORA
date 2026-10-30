import type { CategoryInfo } from "./types";

export const categories: CategoryInfo[] = [
  {
    slug: "accessories",
    label: "Accessories",
    shortLabel: "Accessories",
    description:
      "Small leather goods and sculptural everyday carry objects, made to be handled, used, and noticed.",
    image:
      "https://images.pexels.com/photos/4452374/pexels-photo-4452374.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
  },
  {
    slug: "fashion",
    label: "Fashion & Wearables",
    shortLabel: "Fashion",
    description:
      "Considered wearables and textiles — scarves, wraps, and warm-weather pieces in quiet, lasting colour.",
    image:
      "https://images.pexels.com/photos/3808229/pexels-photo-3808229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
  },
  {
    slug: "home-living",
    label: "Home & Living",
    shortLabel: "Home & Living",
    description:
      "Ceramics, vessels, and sculptural objects for a home that rewards a second look.",
    image:
      "https://images.pexels.com/photos/29904622/pexels-photo-29904622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
  },
  {
    slug: "tech-desk",
    label: "Tech & Desk",
    shortLabel: "Tech & Desk",
    description:
      "Architectural lighting and desk companions that bring material honesty to the modern workspace.",
    image:
      "https://images.pexels.com/photos/31410610/pexels-photo-31410610.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
  },
  {
    slug: "art-collectibles",
    label: "Art & Collectibles",
    shortLabel: "Art & Collectibles",
    description:
      "Framed studies, prints, and small-run collectibles for walls and shelves worth curating.",
    image:
      "https://images.pexels.com/photos/17210078/pexels-photo-17210078.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
  },
  {
    slug: "bags",
    label: "Bags & Carry",
    shortLabel: "Bags & Carry",
    description:
      "Structured and soft carry, built from full-grain leather with hardware that will outlast trends.",
    image:
      "https://images.pexels.com/photos/27100523/pexels-photo-27100523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
  },
  {
    slug: "jewelry",
    label: "Jewelry",
    shortLabel: "Jewelry",
    description:
      "Sculptural fine and demi-fine jewelry, cast in small batches and finished by hand.",
    image:
      "https://images.pexels.com/photos/29502321/pexels-photo-29502321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
  },
  {
    slug: "gifts",
    label: "Gifts",
    shortLabel: "Gifts",
    description:
      "Giftable objects and curated sets, wrapped for giving and chosen for staying.",
    image:
      "https://images.pexels.com/photos/10673679/pexels-photo-10673679.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
  },
];

export function getCategory(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}
