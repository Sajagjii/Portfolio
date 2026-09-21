import type { Metadata } from "next";
import { FeaturedProjects } from "@/components/projects";
import { SectionHeading } from "@/components/sections";
export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Software and engineering projects by Sajag Makhija. Explore scheduling, constraints, and system design.",
};
export default function WorkPage() {
  return (
    <main id="main-content" className="page-width route-section section-space">
      <SectionHeading
        number="01"
        title="SELECTED WORK"
        id="work-heading"
        page
        description="Software projects, viewed through the problems behind them."
      />
      <FeaturedProjects />
    </main>
  );
}
