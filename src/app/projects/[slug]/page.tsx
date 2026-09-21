import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, hasProjectDetails } from "@/data/projects";
import { ProjectVisual } from "@/components/project-visual";
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
const sectionNumbers: Record<string, string> = {
  Overview: "00",
  Problem: "01",
  Constraints: "01",
  Approach: "02",
  Architecture: "03",
  Build: "04",
  Result: "05",
  "What I learned": "06",
  "What I would improve": "07",
};
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
    <main id="main-content" className="case-study page-width">
      <a
        href={project.collection === "work" ? "/work/" : "/lab/"}
        className="text-link case-back"
      >
        <ArrowLeft size={16} />
        {project.collection === "work" ? "All selected work" : "Back to lab"}
      </a>
      <header className="case-header">
        <p className="mono eyebrow">
          PROJECT {project.number} / {project.category}
        </p>
        <h1>{project.title}</h1>
        {project.summary && <p className="case-summary">{project.summary}</p>}
        <ul className="tags">
          {project.concepts.map((concept) => (
            <li key={concept}>{concept}</li>
          ))}
        </ul>
        {(project.year || project.stack?.length) && (
          <p className="mono project-facts">
            {project.year} {project.stack?.join(" / ")}
          </p>
        )}
      </header>
      <div className="case-visual">
        <ProjectVisual kind={project.visual} />
      </div>
      <div className="case-sections">
        {Object.entries(project.sections).map(([heading, content]) => (
          <section key={heading} className="case-section">
            <h2>
              <span className="mono">{sectionNumbers[heading]}</span>
              {heading === "What I learned" ? "Learnings" : heading}
            </h2>
            <p>{content}</p>
          </section>
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
      <a href={`/projects/${next.slug}/`} className="next-project">
        <div>
          <span className="mono eyebrow">NEXT PROJECT / {next.number}</span>
          <h2>{next.title}</h2>
        </div>
        <ArrowUpRight size={32} />
      </a>
    </main>
  );
}
