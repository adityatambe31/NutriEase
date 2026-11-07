import { Metadata } from "next";
import { team404Links } from "@/app/(docs)/links/constants/links";
import ResourceSection from "@/app/(docs)/links/components/resouce-section";
import HeroSection from "@/app/(docs)/links/components/hero-section";

export const metadata: Metadata = {
  title: "Team 404 Resources",
  description: "Resource links and information for Team 404",
};

export default function Team404Page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <HeroSection 
        title="Team 404 Resources" 
        subtitle="All the tools and resources you need in one place" 
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <ResourceSection
          title="Project Documentation"
          links={team404Links.documentation}
        />

        <ResourceSection
          title="Presentations"
          links={team404Links.presentations}
        />

        <ResourceSection title="Shared Storage" links={team404Links.storage} />

        <ResourceSection title="Development" links={team404Links.development} />

        <ResourceSection
          title="Team Communication"
          links={team404Links.communication}
        />

        <ResourceSection title="Other Resources" links={team404Links.other} />
      </div>
    </div>
  );
}