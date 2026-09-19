import type { Project } from "@/data/projects";

export function SystemLayers() {
  return (
    <div
      className="system-layers"
      aria-label="Four connected layers: software, AI, systems and creative technology"
      role="img"
    >
      <div className="layer-axis" />
      {["SOFTWARE", "AI", "SYSTEMS", "CREATIVE TECH"].map((label, index) => (
        <div key={label} className={`system-layer layer-${index}`}>
          <span className="layer-number">0{index + 1}</span>
          <span className="layer-label">{label}</span>
          <span className="layer-cross">+</span>
        </div>
      ))}
      <span className="system-caption">
        Different disciplines. Connected thinking.
      </span>
    </div>
  );
}

export function Workflow({ detailed = false }: { detailed?: boolean }) {
  const nodes = detailed
    ? ["Input", "Application", "Model / API", "Tools", "Result"]
    : ["Input", "Model / API", "Tools", "Result"];
  return (
    <ol
      className={`workflow ${detailed ? "workflow-detailed" : ""}`}
      aria-label="Conceptual AI workflow"
    >
      {nodes.map((label, index) => (
        <li key={label}>
          <span className="mono flow-number">0{index + 1}</span>
          <span>{label}</span>
        </li>
      ))}
    </ol>
  );
}

export function FilmStudy({ large = false }: { large?: boolean }) {
  return (
    <div className={`film-study ${large ? "film-study-large" : ""}`}>
      <div className="film-frame frame-mono">
        <span>01</span>
        <p>Absence</p>
        <small>Black & white</small>
      </div>
      <div className="film-frame frame-colour">
        <span>02</span>
        <p>Feeling</p>
        <small>Red / Blue / Green</small>
        <div className="colour-channels" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="film-frame frame-return">
        <span>03</span>
        <p>Return</p>
        <small>A world in colour</small>
      </div>
    </div>
  );
}

export function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  if (kind === "schedule")
    return (
      <div className="constraint-visual">
        <div className="diagram-topline mono">
          <span>Scheduling / Constraint map</span>
          <span>Concept study</span>
        </div>
        <div className="constraint-map">
          <div className="constraint-inputs">
            <span>Classes</span>
            <span>Resources</span>
            <span>Time</span>
          </div>
          <div className="constraint-connector" aria-hidden="true" />
          <div className="constraint-core">
            <span className="mono">SYSTEM</span>
            <strong>
              A place.
              <br />A time.
              <br />A set of constraints.
            </strong>
          </div>
        </div>
        <div className="constraint-bottom mono">
          <span>Allocation</span>
          <span>↔</span>
          <span>Trade-offs</span>
        </div>
      </div>
    );
  if (kind === "nutrition")
    return (
      <div className="nutrition-visual" aria-hidden="true">
        <span className="nutrition-word">
          Nutri<span>Finder</span>
          <sup>↗</sup>
        </span>
        <div className="nutrition-line" />
      </div>
    );
  if (kind === "agents")
    return (
      <div className="agent-visual">
        <div className="diagram-topline mono">
          <span>Connected workflows</span>
          <span>Experiments</span>
        </div>
        <Workflow />
        <p className="agent-caption">Models change. The connections matter.</p>
      </div>
    );
  return (
    <div className="film-visual">
      <div className="diagram-topline mono">
        <span>Colour as narrative</span>
        <span>Film concept</span>
      </div>
      <FilmStudy />
    </div>
  );
}
