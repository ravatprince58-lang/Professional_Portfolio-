import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Grid2x2, Gamepad2, LayoutGrid } from "lucide-react";
import { frontendProjects, gameProjects, projects, type Project } from "@/data/portfolio";
import { MarginNote } from "@/components/paper";
import { Squiggle, StarDoodle, ArrowDoodle, CoffeeStain } from "@/components/doodles";
import { ProjectCard } from "@/components/project-card";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Work — Ravat Prince" },
      {
        name: "description",
        content:
          "Frontend development projects and The Last Escape, a prison escape game in development by Ravat Prince.",
      },
      { property: "og:title", content: "Work — Ravat Prince" },
      {
        property: "og:description",
        content: "Frontend projects and an in-development Unity and C# game from Ravat Prince.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

type FilterId = "all" | "frontend" | "game";

type Section = {
  id: Exclude<FilterId, "all">;
  title: string;
  projects: Project[];
  mediaHint: string;
};

const SECTIONS: Section[] = [
  {
    id: "frontend",
    title: "Frontend development",
    projects: frontendProjects,
    mediaHint: "[add website screenshot, 16:9]",
  },
  {
    id: "game",
    title: "Game development",
    projects: gameProjects,
    mediaHint: "[add gameplay image or video, 16:9]",
  },
];

const FILTERS: { id: FilterId; label: string; icon: typeof LayoutGrid }[] = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "frontend", label: "Frontend", icon: Grid2x2 },
  { id: "game", label: "Game Development", icon: Gamepad2 },
];

function countFor(filter: FilterId) {
  if (filter === "all") return projects.length;
  return SECTIONS.find((s) => s.id === filter)?.projects.length ?? 0;
}

/** Projects that get the large featured showcase — one per visible section. */
function pickFeatured(filter: FilterId): { section: Section; project: Project } | null {
  for (const section of SECTIONS) {
    if (filter !== "all" && filter !== section.id) continue;
    const featured =
      section.projects.find((p) => p.tags && p.tags.length > 0) ?? section.projects[0];
    if (featured) return { section, project: featured };
  }
  return null;
}

/** Everything except the featured picks, flattened with their section. */
function pickStandard(filter: FilterId): { section: Section; project: Project }[] {
  const featured = pickFeatured(filter);
  const featuredSlug = featured?.project.slug;
  return SECTIONS.filter((s) => filter === "all" || s.id === filter).flatMap((section) =>
    section.projects
      .filter((p) => p.slug !== featuredSlug)
      .map((project) => ({ section, project })),
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const featured = pickFeatured(filter);
  const standard = pickStandard(filter);

  return (
    <main className="relative mx-auto max-w-6xl px-4 pb-24 pt-10 md:pt-14">
      <CoffeeStain className="pointer-events-none absolute right-4 top-32 hidden rotate-12 text-primary/30 md:block" />
      <StarDoodle className="pointer-events-none absolute left-2 top-28 hidden rotate-12 text-primary/40 lg:block" />

      <header className="relative">
        <div className="flex items-center gap-3">
          <p className="font-hand text-2xl text-pencil">selected work</p>
          <ArrowDoodle className="h-5 w-10 text-primary/60" />
        </div>
        <h1 className="mt-1 font-display text-7xl uppercase leading-[0.92] tracking-wide md:text-8xl">
          Things I’ve Built.
        </h1>
        <Squiggle className="mt-2 h-3.5 w-44 text-primary" />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground">
          Frontend projects and a game in development, side by side. Filter by discipline and open
          any project to read more about how it was built.
        </p>
        <MarginNote className="mt-3 text-xl">frontend &amp; game development</MarginNote>

        <div role="group" aria-label="Filter projects" className="mt-8 flex flex-wrap gap-3">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "sketch-chip inline-flex items-center gap-2 px-4 py-2 font-display text-base uppercase tracking-widest transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-secondary",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {f.label} ({countFor(f.id)})
              </button>
            );
          })}
        </div>
      </header>

      {featured && (
        <section aria-label="Featured project" className="mt-12">
          <div className="mb-4 flex items-center gap-2">
            <StarDoodle className="h-5 w-5 text-primary" />
            <p className="font-display text-sm uppercase tracking-[0.25em] text-muted-foreground">
              Featured showcase
            </p>
          </div>
          <FeaturedProjectCard
            project={featured.project}
            category={featured.section.title}
            mediaHint={featured.section.mediaHint}
            number={1}
          />
        </section>
      )}

      {standard.length > 0 && (
        <section aria-label="More projects" className="mt-16">
          <div className="mb-6 flex items-center gap-3">
            <h2 className="font-display text-3xl uppercase tracking-wide">More Projects</h2>
            <Squiggle className="h-3 w-24 text-primary" />
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {standard.map(({ section, project }, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                category={section.title}
                mediaHint={section.mediaHint}
                number={index + 2}
              />
            ))}
          </div>
        </section>
      )}

      {standard.length === 0 && !featured && (
        <p className="mt-16 font-hand text-2xl text-pencil">No projects in this category yet.</p>
      )}
    </main>
  );
}
