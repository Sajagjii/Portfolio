export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  tone: "blue" | "steel" | "cyan" | "amber";
  visual: "schedule" | "nutrition" | "agents" | "film";
  summary?: string;
  concepts: string[];
  sections: Partial<
    Record<
      | "Overview"
      | "Problem"
      | "Constraints"
      | "Approach"
      | "Architecture"
      | "Result"
      | "What I learned"
      | "What I would improve",
      string
    >
  >;
  links: { label: string; href: string }[];
};

// Keep unknown fields absent. NutriFinder is NOT the Flutter nutrition app
// described in the original draft; Sajag confirmed this before implementation.
export const projects: Project[] = [
  {
    slug: "dynamic-class-scheduling",
    number: "01",
    title: "Dynamic Class Scheduling System",
    category: "Engineering / Systems",
    tone: "blue",
    visual: "schedule",
    summary:
      "Scheduling classes means working with constraints. A project exploring how classes, time and shared resources fit together.",
    concepts: [
      "Scheduling",
      "Constraints",
      "Resource allocation",
      "System design",
    ],
    sections: {
      Overview:
        "An engineering project centred on class scheduling and resource allocation. Its focus is the relationship between scheduling decisions, constraints and engineering trade-offs.",
      Constraints:
        "Class and resource allocation form the core of the problem. Scheduling, optimization and system design are the concepts behind this work.",
    },
    links: [],
  },
  {
    slug: "nutrifinder",
    number: "02",
    title: "NutriFinder",
    category: "Software / Application",
    tone: "steel",
    visual: "nutrition",
    concepts: [],
    sections: {},
    links: [],
  },
  {
    slug: "agentic-ai",
    number: "03",
    title: "Agentic AI & Workflow Experiments",
    category: "AI / Automation",
    tone: "cyan",
    visual: "agents",
    summary:
      "Exploring how LLMs, APIs and conventional software can work together as practical tools beyond a chat interface.",
    concepts: [
      "LLM APIs",
      "Agentic systems",
      "API orchestration",
      "Automation",
    ],
    sections: {
      Overview:
        "A collection of experiments with agentic AI, LLM APIs and automated workflows. This work is an ongoing exploration of practical tools.",
      Approach:
        "Experimenting with model and provider switching, API-based workflows, automated coding assistance and generative AI workflows.",
    },
    links: [],
  },
  {
    slug: "creative-technology",
    number: "04",
    title: "A World Returning to Colour",
    category: "Creative Technology / Film Concept",
    tone: "amber",
    visual: "film",
    summary:
      "An emotionally numb character. A world in black and white. A generative short-film concept in which colour returns with feeling.",
    concepts: [
      "Generative film",
      "Visual storytelling",
      "Cinematic prompting",
      "Creative direction",
    ],
    sections: {
      Overview:
        "A short-film concept following an emotionally numb character through a mostly black-and-white world. Red, blue and green represent separate emotional states; colour gradually returns as those states are recovered.",
      Approach:
        "Using generative media and cinematic prompting to explore visual storytelling, editing and creative direction. Colour is part of the narrative, with each of the three channels carrying a separate emotional state.",
    },
    links: [],
  },
];

export function hasProjectDetails(project: Project) {
  return Object.keys(project.sections).length > 0;
}
