import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FeaturedProjects } from "@/components/projects";
import {
  AboutSection,
  ContactSection,
  LabSection,
  SectionHeading,
  SkillsSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero page-width" aria-labelledby="hero-heading">
        <div className="hero-kicker mono">
          <span>PERSONAL PORTFOLIO</span>
          <span>SOFTWARE / SYSTEMS / EXPERIMENTS</span>
        </div>
        <h1 id="hero-heading">
          SAJAG
          <br />
          <span>MAKHIJA</span>
          <span className="hero-asterisk" aria-hidden="true">
            ✳
          </span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-note">
            <span className="mono field-label">A WORKING INTRODUCTION</span>
            <p>
              Engineering student building software, exploring AI, and making
              room for the unexpected.
            </p>
            <p className="muted">
              I like understanding how things work. Building them is usually how
              I find out.
            </p>
          </div>
          <ul className="disciplines" aria-label="Areas of interest">
            {["SOFTWARE", "AI & AUTOMATION", "CREATIVE TECHNOLOGY"].map(
              (label, i) => (
                <li key={label}>
                  <span className="mono">0{i + 1}</span>
                  {label}
                </li>
              ),
            )}
          </ul>
          <a
            href="#work"
            className="hero-scroll"
            aria-label="Explore selected work"
          >
            <ArrowDown size={28} />
            <span className="mono">
              SCROLL TO
              <br />
              SELECTED WORK
            </span>
          </a>
        </div>
      </section>
      <section
        id="work"
        className="page-width section-space"
        aria-labelledby="work-heading"
      >
        <SectionHeading
          number="01"
          title="SELECTED WORK"
          id="work-heading"
          description="A closer look at the problems I’m working through."
        />
        <FeaturedProjects />
        <a href="/work/" className="text-link section-end">
          Open the work index <ArrowUpRight size={18} />
        </a>
      </section>
      <LabSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
