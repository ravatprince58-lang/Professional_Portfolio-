// ============================================================================
//  EDIT ME — all real professional content lives in this one file.
//  Text in [square brackets] is an editable placeholder waiting for a real
//  value. Never replace a placeholder with an invented fact.
// ============================================================================

export const profile = {
  name: "Ravat Prince",
  role: "Game Developer & Frontend Developer",
  tagline: "Building practical projects across frontend and game development.",
  email: "[add your email address]",
  location: "Surat, Gujarat, India",
  education: "BCA — 3rd year",
};

/** Null until a real email address replaces the placeholder in `profile`. */
export const contactEmail: string | null = profile.email.includes("@") ? profile.email : null;

export type Project = {
  slug: string;
  title: string;
  status?: string;
  blurb: string;
  tags?: string[];
  image?: string;
  doodle?: "quill";
  note?: string;
  githubUrl?: string;
  liveUrl?: string;
};

/** Frontend development projects. */
export const frontendProjects: Project[] = [
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    blurb: "A personal portfolio presenting my frontend and game development work.",
  },
  {
    slug: "soulcare",
    title: "SoulCare",
    blurb: "A mental health platform recognized with project certificates.",
  },
  {
    slug: "paste-app",
    title: "Paste App",
    blurb: "A frontend development project.",
  },
  {
    slug: "razorpay-clone",
    title: "Razorpay Clone",
    blurb: "A frontend clone project.",
  },
  {
    slug: "leet-metric",
    title: "Leet-Metric",
    blurb: "A LeetCode metrics tracker.",
  },
  {
    slug: "nestora",
    title: "NESTORA",
    blurb: "A real estate portal.",
  },
];

/** Game development projects. */
export const gameProjects: Project[] = [
  {
    slug: "the-last-escape",
    title: "The Last Escape",
    status: "in development",
    blurb: "A prison escape game built with Unity and C#. Basic gameplay is complete.",
    tags: ["Unity", "C#", "Gameplay scripting"],
    note: "gameplay screenshots and videos: [add when available]",
  },
];

/** Everything, in display order. */
export const projects: Project[] = [...frontendProjects, ...gameProjects];

export function findProject(slug: string): { project: Project; category: string } | null {
  const frontend = frontendProjects.find((p) => p.slug === slug);
  if (frontend) return { project: frontend, category: "Frontend development" };
  const game = gameProjects.find((p) => p.slug === slug);
  if (game) return { project: game, category: "Game development" };
  return null;
}

/** The about-page journey — real stages, no invented dates. */
export const journey = [
  {
    label: "Now",
    title: "BCA, 3rd year",
    text: "Pursuing a BCA and building practical skills through projects.",
  },
  {
    label: "Frontend",
    title: "Frontend development projects",
    text: "Building practical work across a personal portfolio, mental health platform, paste app, Razorpay clone, metrics tracker and real estate portal.",
  },
  {
    label: "Gamedev",
    title: "The Last Escape",
    text: "Developing a prison escape game in Unity and C#. Basic gameplay is complete.",
  },
  {
    label: "Hackathons",
    title: "Participation and achievement",
    text: "Participated in Hackathon 2025; achievement details: [add details]. Secured 3rd rank in Hackathon 2026.",
  },
];

export type Skill = {
  name: string;
  highlight?: boolean;
};

export type SkillCategory = {
  id: "frontend" | "languages" | "gamedev" | "tools";
  title: string;
  description: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Building interfaces that run in the browser.",
    skills: [
      { name: "React.js", highlight: true },
      { name: "Tailwind CSS", highlight: true },
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    description: "The languages I write day to day.",
    skills: [
      { name: "HTML5", highlight: true },
      { name: "CSS3", highlight: true },
      { name: "JavaScript", highlight: true },
      { name: "C#", highlight: true },
    ],
  },
  {
    id: "gamedev",
    title: "Game Development",
    description: "Making playable worlds and the systems behind them.",
    skills: [
      { name: "Unity", highlight: true },
      { name: "Gameplay scripting" },
      { name: "Game mechanics" },
      { name: "Inventory systems" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    description: "The tools I use to build, track and share my work.",
    skills: [{ name: "Git and GitHub" }],
  },
];

/** Education — the only experience shown; no invented employers or dates. */
export const education = {
  course: "BCA — Bachelor of Computer Applications",
  stage: "3rd year",
  // EDIT: add your college / university name
  place: "[your college name]",
  points: [
    "Studying for a Bachelor of Computer Applications.",
    "Building projects in frontend and game development.",
    "Developing The Last Escape in Unity and C#; basic gameplay is complete.",
    "Participating in hackathons.",
  ],
};

export const achievements: { year?: string; title: string; text: string }[] = [
  {
    year: "2026",
    title: "3rd rank — Hackathon 2026",
    text: "Secured 3rd rank in Hackathon 2026.",
  },
  {
    year: "2025",
    title: "Hackathon 2025",
    text: "Achievement details: [add details].",
  },
  {
    title: "SoulCare recognition",
    text: "SoulCare project recognition and certificates. Certificate details: [add details].",
  },
];
