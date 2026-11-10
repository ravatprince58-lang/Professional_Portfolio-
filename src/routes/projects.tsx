import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { frontendProjects, gameProjects, projects, type Project } from "@/data/portfolio";
import { MarginNote } from "@/components/paper";
import { Squiggle } from "@/components/doodles";
import { ProjectCard, type CardTreatment } from "@/components/project-card";
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

const CARD_TREATMENTS: CardTreatment[] = ["plain", "overlap", "tilt"];

type FilterId = "all" | "frontend" | "game";

const SECTIONS: {
  id: Exclude<FilterId, "all">;
  title: string;
  projects: Project[];
  mediaHint: string;
}[] = [
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

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "game", label: "Game Development" },
];

function countFor(filter: FilterId) {
  return filter === "all"
    ? projects.length
    : (SECTIONS.find((s) => s.id === filter)?.projects.length ?? 0);
}

function ProjectsPage() {
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = SECTIONS.filter((s) => filter === "all" || s.id === filter);
  const featured = visible.flatMap((section) =>
    section.projects.slice(0, 1).map((project) => ({ section, project })),
  );
  const more = visible.flatMap((section) =>
    section.projects.slice(1).map((project) => ({ section, project })),
  );

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <header>
        <h1 className="font-display text-6xl uppercase leading-[0.95] tracking-wide md:text-7xl">
          Things I’ve Built.
        </h1>
        <Squiggle className="mt-2 h-3 w-36 text-primary" />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground">
          Frontend projects and a game in development, side by side. Filter by discipline and open
          any project to read more about how it was built.
        </p>
        <MarginNote className="mt-4 text-xl">frontend &amp; game development</MarginNote>

        <div role="group" aria-label="Filter projects" className="mt-8 flex flex-wrap gap-3">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "sketch-chip px-4 py-2 font-display text-base uppercase tracking-widest transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-secondary",
                )}
              >
                {f.label} ({countFor(f.id)})
              </button>
            );
          })}
        </div>
      </header>

      {featured.length > 0 && (
        <section
          className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2"
          aria-label="Featured projects"
        >
          {featured.map(({ section, project }) => (
            <ProjectCard
              key={project.slug}
              project={project}
              category={section.title}
              mediaHint={section.mediaHint}
              number={projects.indexOf(project) + 1}
              treatment="plain"
              featured
            />
          ))}
        </section>
      )}

      {more.length > 0 && (
        <section className="mt-16">
          <div className="sketch-line flex flex-wrap items-end justify-between gap-3 pt-5">
            <h2 className="font-display text-3xl uppercase tracking-wide text-primary">
              More projects
            </h2>
            <MarginNote className="text-lg">
              {more.length} {more.length === 1 ? "project" : "projects"}
            </MarginNote>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
            {more.map(({ section, project }) => {
              const number = projects.indexOf(project) + 1;
              return (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  category={section.title}
                  mediaHint={section.mediaHint}
                  number={number}
                  treatment={CARD_TREATMENTS[(number - 1) % CARD_TREATMENTS.length]!}
                />
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
