import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code, ExternalLink, type LucideIcon } from "lucide-react";
import { frontendProjects, gameProjects, type Project } from "@/data/portfolio";
import { PaperCard, Tag, MarginNote, SectionTitle } from "@/components/paper";
import { CircleNote } from "@/components/doodles";
import { ProjectCover } from "@/components/project-cover";
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

const ENTRANCE =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 motion-reduce:animate-none";

/** Six-column grid on desktop: the first two rest cards take half each, the rest a third. */
function restCardSpan(restIndex: number, restCount: number) {
  const isLonelyLast = restIndex === restCount - 1 && restCount % 2 === 1;
  return cn(
    isLonelyLast ? "md:col-span-2" : "md:col-span-1",
    restIndex < 2 ? "lg:col-span-3" : "lg:col-span-2",
  );
}

function ProjectsPage() {
  const sections = [
    { title: "Frontend development", projects: frontendProjects },
    { title: "Game development", projects: gameProjects },
  ];

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

      {sections.map((section) => {
        const [featured, ...rest] = section.projects;
        return (
          <section key={section.title} className="mt-14">
            <div className="sketch-line flex flex-wrap items-end justify-between gap-3 pt-5">
              <h2 className="font-display text-3xl uppercase tracking-wide text-primary">
                {section.title}
              </h2>
              <MarginNote className="text-lg">
                {section.projects.length} {section.projects.length === 1 ? "project" : "projects"}
              </MarginNote>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-6">
              {featured && (
                <ProjectCard
                  project={featured}
                  category={section.title}
                  index={0}
                  featured
                  className="md:col-span-2 lg:col-span-6"
                />
              )}
              {rest.map((p, r) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  category={section.title}
                  index={r + 1}
                  featured={false}
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

function ProjectCard({
  project,
  category,
  index,
  featured,
  className,
}: {
  project: Project;
  category: string;
  index: number;
  featured: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn("group relative isolate", ENTRANCE, className)}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div
        aria-hidden="true"
        className="sketch-border-alt absolute inset-0 -z-10 translate-x-2 translate-y-2 rotate-[0.8deg] bg-secondary/60 transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:translate-y-3 motion-reduce:transition-none"
      />
      <PaperCard
        tape={index % 2 === 0}
        tilt={index % 2 === 0 ? -0.5 : 0.5}
        className="h-full transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        innerClassName={cn(
          "h-full p-4 md:p-5",
          featured ? "md:grid md:grid-cols-2 md:gap-8 md:p-7" : "flex flex-col gap-4",
        )}
      >
        <ProjectCover title={project.title} number={index + 1} featured={featured} />
        <ProjectDetails project={project} category={category} featured={featured} />
      </PaperCard>
    </article>
  );
}

function ProjectDetails({
  project,
  category,
  featured,
}: {
  project: Project;
  category: string;
  featured: boolean;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-4", featured && "mt-6 md:mt-0")}>
      <div>
        <p className="font-display text-sm uppercase tracking-[0.2em] text-primary">{category}</p>
        <h3
          className={cn(
            "mt-1 font-display uppercase leading-[1.05] tracking-wide",
            featured ? "text-4xl md:text-5xl" : "text-3xl",
          )}
        >
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="transition-colors hover:text-primary hover:underline"
          >
            {project.title}
          </Link>
        </h3>
        {project.status && (
          <MarginNote className="mt-2 inline-block text-lg">
            <CircleNote className="text-primary">{project.status}</CircleNote>
          </MarginNote>
        )}
      </div>

      <p
        className={cn("leading-relaxed text-muted-foreground", featured ? "text-base" : "text-sm")}
      >
        {project.blurb}
      </p>
      {project.note && (
        <p className="text-sm leading-relaxed text-muted-foreground">{project.note}</p>
      )}

      {project.tags && (
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Technologies
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      )}

      <div className="sketch-line mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-4">
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="group/link inline-flex items-center gap-1.5 font-display text-sm uppercase tracking-[0.2em] text-primary"
        >
          View details
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1 motion-reduce:transition-none" />
        </Link>
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex flex-wrap gap-2">
            {project.githubUrl && (
              <ProjectLinkButton href={project.githubUrl} icon={Code} variant="outline">
                GitHub
              </ProjectLinkButton>
            )}
            {project.liveUrl && (
              <ProjectLinkButton href={project.liveUrl} icon={ExternalLink} variant="solid">
                Live demo
              </ProjectLinkButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectLinkButton({
  href,
  icon: Icon,
  variant,
  children,
}: {
  href: string;
  icon: LucideIcon;
  variant: "solid" | "outline";
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-2 font-display text-sm uppercase tracking-widest transition-all duration-150 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        variant === "solid"
          ? "sketch-border bg-primary text-primary-foreground hover:bg-primary/90"
          : "sketch-border-alt bg-card text-foreground hover:bg-secondary",
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  );
}
