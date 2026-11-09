import { createFileRoute } from "@tanstack/react-router";
import { frontendProjects, gameProjects } from "@/data/portfolio";
import { MarginNote, SectionTitle } from "@/components/paper";
import { ProjectCard } from "@/components/project-card";
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

/** Six-column grid on desktop: the first two rest cards take half each, the rest a third. */
function restCardSpan(restIndex: number, restCount: number) {
  const isLonelyLast = restIndex === restCount - 1 && restCount % 2 === 1;
  return cn(
    isLonelyLast ? "md:col-span-2" : "md:col-span-1",
    restIndex < 2 ? "lg:col-span-3" : "lg:col-span-2",
  );
}

const SECTIONS = [
  {
    title: "Frontend development",
    projects: frontendProjects,
    mediaHint: "[add website screenshot, 16:9]",
  },
  {
    title: "Game development",
    projects: gameProjects,
    mediaHint: "[add gameplay image or video, 16:9]",
  },
];

function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <header>
        <SectionTitle>The work pages</SectionTitle>
        <MarginNote className="mt-3 text-xl">frontend projects &amp; game development</MarginNote>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground">
          A selection of frontend projects and a game in development. Open any project to read more
          about how it was built.
        </p>
      </header>

      {SECTIONS.map((section) => {
        const [featured, ...rest] = section.projects;
        return (
          <section key={section.title} className="mt-16">
            <div className="sketch-line flex flex-wrap items-end justify-between gap-3 pt-5">
              <h2 className="font-display text-3xl uppercase tracking-wide text-primary">
                {section.title}
              </h2>
              <MarginNote className="text-lg">
                {section.projects.length} {section.projects.length === 1 ? "project" : "projects"}
              </MarginNote>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-x-8 lg:grid-cols-6">
              {featured && (
                <ProjectCard
                  project={featured}
                  category={section.title}
                  mediaHint={section.mediaHint}
                  number={1}
                  featured
                  className="md:col-span-2 lg:col-span-6"
                />
              )}
              {rest.map((p, r) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  category={section.title}
                  mediaHint={section.mediaHint}
                  number={r + 2}
                  className={restCardSpan(r, rest.length)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
