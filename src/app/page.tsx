import { HomeHero } from "@/components/home/HomeHero";
import { RareEdit } from "@/components/home/RareEdit";
import { NewDiscoveries } from "@/components/home/NewDiscoveries";
import { EditorialFeature } from "@/components/home/EditorialFeature";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { LimitedEditionFeature } from "@/components/home/LimitedEditionFeature";
import { BestSellers } from "@/components/home/BestSellers";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <RareEdit />
      <NewDiscoveries />
      <EditorialFeature />
      <CategoryGrid />
      <LimitedEditionFeature />
      <BestSellers />
      <NewsletterSection />
    </div>
  );
}
