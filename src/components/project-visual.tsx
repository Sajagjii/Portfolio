import type { Project } from "@/data/projects";

export function Workflow() {
  return (
    <ol className="workflow" aria-label="Conceptual AI workflow">
      {["Input", "Model / API", "Tools", "Result"].map((label, index) => (
        <li key={label}>
          <span className="mono">0{index + 1}</span>
          <strong>{label}</strong>
          {index < 3 && (
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
export function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  if (kind === "schedule")
    return (
      <figure className="constraint-visual">
        <figcaption className="diagram-topline mono">
          <span>FIG. 01 / CONSTRAINT STUDY</span>
          <span aria-hidden="true">↗</span>
        </figcaption>
        <div
          className="schedule-board"
          role="img"
          aria-label="Conceptual timetable: class blocks placed across five days and four time slots. This is an illustration, not a project screenshot."
        >
          <div className="schedule-axis mono">
            <span>TIME / DAY</span>
            {["M", "T", "W", "T", "F"].map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>
          {["09:00", "10:00", "11:00", "12:00"].map((time, row) => (
            <div className="schedule-row" key={time}>
              <span className="mono">{time}</span>
              {Array.from({ length: 5 }, (_, col) => (
                <div
                  key={col}
                  className={`schedule-cell ${
                    [
                      [0, 2, 4],
                      [1, 3],
                      [0, 2, 3],
                      [1, 4],
                    ][row].includes(col)
                      ? "occupied"
                      : ""
                  } ${row === 1 && col === 3 ? "highlight" : ""}`}
                >
                  {[
                    [0, 2, 4],
                    [1, 3],
                    [0, 2, 3],
                    [1, 4],
                  ][row].includes(col) && (
                    <span className="mono">
                      {String.fromCharCode(65 + ((row + col) % 3))} / {col + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="constraint-caption">
          <strong>
            A place.
            <br />A time.
            <br />
            <span>A set of constraints.</span>
          </strong>
          <span className="mono">
            CLASSES
            <br />
            RESOURCES
            <br />
            TIME
          </span>
        </div>
        <p className="visual-caption mono">
          CONCEPTUAL DIAGRAM / NOT A PRODUCT SCREENSHOT
        </p>
      </figure>
    );
  if (kind === "nutrition")
    return (
      <div className="nutrition-visual" aria-hidden="true">
        <span className="mono nutrition-label">SOFTWARE / APPLICATION</span>
        <span className="nutrition-word">
          Nutri<span>Finder</span>
          <sup>↗</sup>
        </span>
        <div className="nutrition-rule">
          <span>02</span>
          <span>NF_</span>
        </div>
      </div>
    );
  if (kind === "agents")
    return (
      <figure className="agent-visual">
        <figcaption className="diagram-topline mono">
          <span>WORKFLOW STUDY</span>
          <span>CONCEPTUAL</span>
        </figcaption>
        <Workflow />
        <div className="agent-caption">
          <span className="mono">INPUT → ORCHESTRATION → OUTPUT</span>
          <p>
            Models change.
            <br />
            The connections matter.
          </p>
        </div>
      </figure>
    );
  return (
    <figure className="film-visual">
      <figcaption className="diagram-topline mono">
        <span>STORY STUDY / THREE MOVEMENTS</span>
        <span>CONCEPT</span>
      </figcaption>
      <div className="film-study">
        {[
          { title: "Absence", caption: "A monochrome world" },
          { title: "Feeling", caption: "Colour as emotion" },
          { title: "Return", caption: "A world recovered" },
        ].map((frame, i) => (
          <div className={`film-frame frame-${i}`} key={frame.title}>
            <span className="mono">0{i + 1}</span>
            <div className="film-symbol" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <strong>{frame.title}</strong>
            <small className="mono">{frame.caption}</small>
          </div>
        ))}
      </div>
      <p className="visual-caption mono">
        A TYPOGRAPHIC STORYBOARD / GENERATIVE FILM CONCEPT
      </p>
    </figure>
  );
}
