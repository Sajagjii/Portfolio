import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, hasProjectDetails } from "@/data/projects";
import { GlassSurface, Reveal } from "@/components/interaction";
import { ProjectVisual } from "@/components/project-visual";

export function FeaturedProjects() {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <Reveal key={project.slug}>
          <article
            className={`project project-${project.tone}`}
            aria-labelledby={`${project.slug}-title`}
          >
            <GlassSurface className="project-surface">
              <ProjectVisual kind={project.visual} />
            </GlassSurface>
            <div className="project-info">
              <span className="project-number mono">/{project.number}</span>
              <div className="project-description">
                <p className="eyebrow">{project.category}</p>
                <h3 id={`${project.slug}-title`}>{project.title}</h3>
                {project.summary && <p>{project.summary}</p>}
                {project.concepts.length > 0 && (
                  <ul className="tags">
                    {project.concepts.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
              {hasProjectDetails(project) && (
                <Link
                  className="project-link"
                  href={`/projects/${project.slug}/`}
                  aria-label={`Explore ${project.title}`}
                >
                  <ArrowUpRight size={25} strokeWidth={1.5} />
                </Link>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
