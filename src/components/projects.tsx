import { ArrowUpRight } from "lucide-react";
import { projects, hasProjectDetails, type Project } from "@/data/projects";
import { ProjectVisual } from "@/components/project-visual";
export function ProjectFeature({
  project,
  layout = project.layout,
}: {
  project: Project;
  layout?: Project["layout"];
}) {
  return (
    <article
      className={`project project-${layout}`}
      aria-labelledby={`${project.slug}-title`}
    >
      <div className="project-info">
        <div className="project-meta mono">
          <span className="project-number">{project.number}</span>
          <span>{project.category}</span>
        </div>
        <h3 id={`${project.slug}-title`}>{project.title}</h3>
        {project.summary && (
          <p className="project-summary">{project.summary}</p>
        )}
        {project.concepts.length > 0 && (
          <ul className="tags">
            {project.concepts.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        {(project.year || project.stack?.length) && (
          <p className="mono project-facts">
            {project.year}
            {project.year && project.stack?.length ? " / " : ""}
            {project.stack?.join(" / ")}
          </p>
        )}
        {hasProjectDetails(project) && (
          <a
            className="text-link"
            href={`/projects/${project.slug}/`}
            aria-label={`Explore ${project.title}`}
          >
            Read project notes <ArrowUpRight size={18} />
          </a>
        )}
        {project.links.map((link) => (
          <a
            className="text-link"
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
            <ArrowUpRight size={18} />
          </a>
        ))}
      </div>
      <div className="project-surface">
        <ProjectVisual kind={project.visual} />
      </div>
    </article>
  );
}
export function FeaturedProjects() {
  return (
    <div className="project-list">
      {projects
        .filter((project) => project.collection === "work")
        .map((project) => (
          <ProjectFeature key={project.slug} project={project} />
        ))}
    </div>
  );
}
