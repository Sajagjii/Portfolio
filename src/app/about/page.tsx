import type { Metadata } from "next";
import { AboutSection, SkillsSection } from "@/components/sections";
export const metadata: Metadata = {
  title: "About",
  description:
    "Sajag Makhija is an engineering student exploring software, AI, automation, and creative technology.",
};
export default function AboutPage() {
  return (
    <main id="main-content">
      <AboutSection page />
      <SkillsSection />
    </main>
  );
}
