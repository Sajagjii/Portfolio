import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { socials } from "@/data/socials";
import { ProjectFeature } from "@/components/projects";
export function SectionHeading({
  number,
  title,
  id,
  description,
  page = false,
}: {
  number: string;
  title: string;
  id: string;
  description?: string;
  page?: boolean;
}) {
  const Heading = page ? "h1" : "h2";
  return (
    <header className="section-heading">
      <p className="mono section-number">{number} /</p>
      <Heading id={id}>{title}</Heading>
      {description && <p className="section-description">{description}</p>}
    </header>
  );
}
export function LabSection({ page = false }: { page?: boolean }) {
  return (
    <section
      id="lab"
      className={`lab-section section-space ${page ? "route-section" : ""}`}
      aria-labelledby="lab-heading"
    >
      <div className="page-width">
        <SectionHeading
          number="02"
          title="LAB_/"
          id="lab-heading"
          page={page}
          description="Loose ends worth following. Experiments in automation, AI, and visual storytelling."
        />
        <div className="lab-note mono">
          <span className="status-light" aria-hidden="true" /> AN OPEN NOTEBOOK
          / EXPERIMENTS & CONCEPTS
        </div>
        <div className="lab-projects">
          {projects
            .filter((project) => project.collection === "lab")
            .map((project) => (
              <ProjectFeature key={project.slug} project={project} />
            ))}
        </div>
        {!page && (
          <a href="/lab/" className="text-link section-end">
            Inside the lab <ArrowUpRight size={18} />
          </a>
        )}
      </div>
    </section>
  );
}
export function AboutSection({ page = false }: { page?: boolean }) {
  return (
    <section
      id="about"
      className={`about-section page-width section-space ${page ? "route-section" : ""}`}
      aria-labelledby="about-heading"
    >
      <SectionHeading
        number="03"
        title="ABOUT"
        id="about-heading"
        page={page}
      />
      <div className="about-layout">
        <p className="about-statement">
          Understand it.
          <br />
          Build it.
          <br />
          <span>Try it again.</span>
        </p>
        <div className="about-copy">
          <p>
            I’m Sajag, an engineering student interested in software, AI,
            automation, and creative technology.
          </p>
          <p>
            I learn by building: working through scheduling constraints,
            connecting models and APIs, or using generative tools to explore a
            film idea. The common thread is wanting to know what happens
            underneath the surface.
          </p>
          <p>
            I care about the decisions behind a system. What are its
            constraints? Where do the pieces connect? What gets simpler, and
            what gets harder?
          </p>
          <p className="mono about-signoff">STILL LEARNING. ALWAYS MAKING.</p>
        </div>
      </div>
      {page && (
        <div className="outside-grid">
          <div>
            <h2>Beyond the editor.</h2>
            <p>
              Photography, video editing, gaming, and psychology. Different ways
              of paying attention.
            </p>
          </div>
          <div>
            <h2>Under the surface.</h2>
            <p>
              GPUs, storage, system performance, and the hardware that shapes
              real workloads.
            </p>
          </div>
          <div>
            <h2>Learning together.</h2>
            <p>
              An interest in IEEE, its societies, and technical communities that
              connect people across disciplines.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
export function SkillsSection() {
  return (
    <section
      id="skills"
      className="skills-section page-width section-space"
      aria-labelledby="skills-heading"
    >
      <div className="skills-heading">
        <p className="mono">THE TOOLBOX</p>
        <h2 id="skills-heading">Tools follow the problem.</h2>
      </div>
      <div className="skills-matrix">
        {skills.map(({ group, items }, i) => (
          <div key={group} className="skill-group">
            <h3 className="mono">
              <span>0{i + 1}</span>
              {group}
            </h3>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
export function ContactSection({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";
  return (
    <section
      id="contact"
      className={`contact-section section-space ${page ? "route-section" : ""}`}
      aria-labelledby="contact-heading"
    >
      <div className="page-width">
        <p className="mono contact-kicker">04 / CONTACT</p>
        <Heading id="contact-heading">
          HAVE AN IDEA?
          <br />
          LET’S BUILD
          <br />
          <span>SOMETHING.</span>
        </Heading>
        <div className="contact-bottom">
          <p>
            A project, a question, or a good conversation.
            <br />
            Reach me on LinkedIn, or explore my code.
          </p>
          <div className="contact-links">
            {[socials.linkedin, socials.github].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
                <ArrowUpRight size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
