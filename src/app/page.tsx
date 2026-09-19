import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { GlassSurface, Reveal } from "@/components/interaction";
import { FeaturedProjects } from "@/components/projects";
import { FilmStudy, SystemLayers, Workflow } from "@/components/project-visual";
import { socials } from "@/data/socials";
import { skills } from "@/data/skills";
import Link from "next/link";

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label mono">
      <span>{number}</span>
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero page-width" aria-labelledby="hero-heading">
        <div className="hero-kicker">
          <span className="mono">PORTFOLIO / SAJAG MAKHIJA</span>
          <span className="mono hero-kicker-right">
            A practice in curiosity
          </span>
        </div>
        <div className="hero-composition">
          <div className="hero-copy">
            <p className="hero-name">Sajag Makhija</p>
            <h1 id="hero-heading">
              Engineering student <br className="desktop-break" /> building{" "}
              <span>software,</span> <br className="desktop-break" />{" "}
              <span>AI systems</span> and <br className="desktop-break" />{" "}
              <span>creative technology.</span>
            </h1>
            <p className="hero-description">
              I enjoy turning ideas into working systems — from AI-powered
              applications and automation to constraint-solving software and
              generative media.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button button-primary">
                Explore work
                <ArrowDown size={17} />
              </a>
              <a
                href={socials.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-quiet"
              >
                GitHub
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <GlassSurface className="hero-visual">
            <SystemLayers />
          </GlassSurface>
        </div>
        <div className="hero-bottom mono">
          <span>Software · AI · Systems · Creative technology</span>
          <a href="#work">
            Scroll to explore
            <ArrowDown size={13} />
          </a>
        </div>
      </section>

      <section
        id="work"
        className="work-section page-width section-space"
        aria-labelledby="work-heading"
      >
        <Reveal>
          <SectionLabel number="01">Selected work</SectionLabel>
          <div className="section-heading-row">
            <h2 id="work-heading">Ideas, made tangible.</h2>
            <p>
              Software, systems and experiments. <br />
              Different ways of learning by building.
            </p>
          </div>
        </Reveal>
        <FeaturedProjects />
      </section>

      <section
        id="automation"
        className="automation-section page-width section-space ruled"
        aria-labelledby="automation-heading"
      >
        <Reveal>
          <SectionLabel number="02">AI & Automation</SectionLabel>
          <div className="split-heading">
            <h2 id="automation-heading">
              From a prompt <br />
              to a working system.
            </h2>
            <div>
              <p className="section-copy">
                Building and experimenting with tools that combine LLMs, APIs,
                automation and conventional software.
              </p>
              <p className="secondary-copy">
                Agentic systems, model and provider experimentation, and the
                connections that make an automated workflow useful.
              </p>
            </div>
          </div>
          <Workflow detailed />
          <p className="diagram-caption mono">
            A conceptual workflow / input to result
          </p>
        </Reveal>
      </section>

      <section
        id="engineering"
        className="engineering-section page-width section-space ruled"
        aria-labelledby="engineering-heading"
      >
        <Reveal>
          <SectionLabel number="03">
            Engineering / Systems Thinking
          </SectionLabel>
          <div className="engineering-layout">
            <div>
              <h2 id="engineering-heading">
                How I think <br />
                about building.
              </h2>
              <p className="section-copy">
                The interface is one part of a system. I’m interested in the
                constraints, relationships and trade-offs underneath it.
              </p>
              <Link
                href="/projects/dynamic-class-scheduling/"
                className="text-link"
              >
                Explore the scheduling project
                <ArrowUpRight size={17} />
              </Link>
            </div>
            <ol className="thinking-list">
              <li>
                <span className="mono">01</span>
                <div>
                  <h3>Understand the constraints</h3>
                  <p>
                    Scheduling and allocation start with what a system needs to
                    account for.
                  </p>
                </div>
              </li>
              <li>
                <span className="mono">02</span>
                <div>
                  <h3>Look at the connections</h3>
                  <p>
                    Architecture, data and dependencies shape how the pieces
                    work together.
                  </p>
                </div>
              </li>
              <li>
                <span className="mono">03</span>
                <div>
                  <h3>Consider the trade-offs</h3>
                  <p>
                    Optimization and performance are engineering decisions with
                    context.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </Reveal>
      </section>

      <section
        id="creative"
        className="creative-section page-width section-space ruled"
        aria-labelledby="creative-heading"
      >
        <Reveal>
          <SectionLabel number="04">Creative Technology</SectionLabel>
          <div className="section-heading-row">
            <h2 id="creative-heading">Colour can tell a story.</h2>
            <p>
              Generative tools as a creative medium. <br />A short-film concept,
              in three movements.
            </p>
          </div>
          <FilmStudy large />
          <div className="creative-caption">
            <p>
              An emotionally numb character moves through a monochrome world.
              Red, blue and green carry separate emotions as colour gradually
              returns.
            </p>
            <Link href="/projects/creative-technology/" className="text-link">
              Explore the concept
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </Reveal>
      </section>

      <section
        id="community"
        className="community-section page-width section-space ruled"
        aria-labelledby="community-heading"
      >
        <Reveal>
          <SectionLabel number="05">Technical Community</SectionLabel>
          <div className="community-layout">
            <div>
              <h2 id="community-heading">
                Learning extends <br />
                beyond the project.
              </h2>
              <p className="section-copy">
                My interest in technical communities includes IEEE and its
                societies, technical programs and events. They’re another way to
                keep learning across disciplines.
              </p>
            </div>
            <ul className="community-list">
              <li>
                IEEE<span className="mono">Technical community</span>
              </li>
              <li>Computer Society</li>
              <li>Industry Applications Society</li>
              <li>Women in Engineering</li>
              <li>Young Professionals</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section
        id="hardware"
        className="hardware-section page-width ruled"
        aria-labelledby="hardware-heading"
      >
        <Reveal className="hardware-layout">
          <h2 id="hardware-heading">Beyond software.</h2>
          <div>
            <p>
              I also enjoy understanding the hardware underneath the software:
              system performance, GPUs, storage, power requirements and how
              components affect real workloads.
            </p>
            <ul className="inline-topics mono">
              <li>GPU performance</li>
              <li>System building</li>
              <li>Storage</li>
              <li>Graphics workloads</li>
              <li>Hardware compatibility</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section
        id="about"
        className="about-section page-width section-space ruled"
        aria-labelledby="about-heading"
      >
        <Reveal>
          <SectionLabel number="06">A little about me</SectionLabel>
          <div className="about-layout">
            <h2 id="about-heading">
              Curiosity is <br />
              the common thread.
            </h2>
            <div className="about-copy">
              <p>
                I’m Sajag, an engineering student interested in software, AI,
                automation and creative technology.
              </p>
              <p>
                I tend to learn by building. Sometimes that means designing a
                scheduling system around real constraints. Other times it means
                experimenting with LLM APIs, understanding how hardware affects
                performance, or using generative tools to tell a visual story.
              </p>
              <p className="about-closing">
                I like understanding how technology works, then seeing what I
                can build with it.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        id="interests"
        className="interests-section page-width ruled"
        aria-labelledby="interests-heading"
      >
        <Reveal className="interests-layout">
          <div>
            <p className="eyebrow">Away from the work</p>
            <h2 id="interests-heading">Outside engineering.</h2>
          </div>
          <ol className="interests-list">
            {["Photography", "Video editing", "Gaming", "Psychology"].map(
              (interest, index) => (
                <li key={interest}>
                  <span className="mono">0{index + 1}</span>
                  <h3>{interest}</h3>
                  {interest === "Gaming" && (
                    <span className="interest-detail">
                      Clash Royale / Death Stranding
                    </span>
                  )}
                </li>
              ),
            )}
          </ol>
        </Reveal>
      </section>

      <section
        id="skills"
        className="skills-section page-width section-space ruled"
        aria-labelledby="skills-heading"
      >
        <Reveal>
          <SectionLabel number="07">Skills & tools</SectionLabel>
          <div className="section-heading-row">
            <h2 id="skills-heading">What I work with.</h2>
          </div>
          <div className="skills-matrix">
            {skills.map(({ group, items }) => (
              <div key={group} className="skill-group">
                <h3>{group}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        id="contact"
        className="contact-section page-width section-space ruled"
        aria-labelledby="contact-heading"
      >
        <Reveal>
          <SectionLabel number="08">Get in touch</SectionLabel>
          <div className="contact-layout">
            <div>
              <h2 id="contact-heading">
                Let’s talk<span>.</span>
              </h2>
              <p>
                You can find my work on GitHub <br />
                or reach me through LinkedIn.
              </p>
            </div>
            <div className="contact-links">
              <a
                href={socials.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-primary"
              >
                LinkedIn
                <ArrowUpRight size={33} strokeWidth={1.3} />
              </a>
              <a
                href={socials.github.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <ArrowRight size={21} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
