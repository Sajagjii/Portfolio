import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, hasProjectDetails } from "@/data/projects";
import { ProjectVisual } from "@/components/project-visual";
import { GlassSurface, Reveal } from "@/components/interaction";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.filter(hasProjectDetails).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project || !hasProjectDetails(project)) notFound();
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Sajag Makhija`,
      description: project.summary,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project || !hasProjectDetails(project)) notFound();
  const available = projects.filter(hasProjectDetails);
  const next = available[(available.indexOf(project) + 1) % available.length];
  return (
    <main
      id="main-content"
      className={`case-study page-width project-${project.tone}`}
    >
      <Link href="/#work" className="text-link case-back">
        <ArrowLeft size={16} />
        All selected work
      </Link>
      <header className="case-header">
        <p className="eyebrow">
          /{project.number} &nbsp; {project.category}
        </p>
        <h1>{project.title}</h1>
        {project.summary && <p className="case-summary">{project.summary}</p>}
        <ul className="tags">
          {project.concepts.map((concept) => (
            <li key={concept}>{concept}</li>
          ))}
        </ul>
      </header>
      <GlassSurface className="project-surface">
        <ProjectVisual kind={project.visual} />
      </GlassSurface>
      <div className="case-sections">
        {Object.entries(project.sections).map(([heading, content]) => (
          <Reveal key={heading}>
            <section className="case-section">
              <h2>{heading}</h2>
              <p>{content}</p>
            </section>
          </Reveal>
        ))}
        {project.links.length > 0 && (
          <section className="case-section">
            <h2>Links</h2>
            <div>
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {link.label}
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
      <Link href={`/projects/${next.slug}/`} className="next-project">
        <div>
          <span className="eyebrow">Next project</span>
          <h2>{next.title}</h2>
        </div>
        <ArrowUpRight size={30} />
      </Link>
    </main>
  );
}
