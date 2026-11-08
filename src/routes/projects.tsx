import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code, ExternalLink, type LucideIcon } from "lucide-react";
import { frontendProjects, gameProjects, type Project } from "@/data/portfolio";
import { PaperCard, Tag, MarginNote, SectionTitle } from "@/components/paper";
import { QuillDoodle, CircleNote } from "@/components/doodles";
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

const IMAGE_HEIGHT = { regular: "h-52", featured: "h-56 md:h-72" };

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

      {sections.map((section) => (
        <section key={section.title} className="mt-12">
          <div className="sketch-line flex flex-wrap items-end justify-between gap-3 pt-5">
            <h2 className="font-display text-3xl uppercase tracking-wide text-primary">
              {section.title}
            </h2>
            <MarginNote className="text-lg">
              {section.projects.length} {section.projects.length === 1 ? "project" : "projects"}
            </MarginNote>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {section.projects.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                category={section.title}
                index={i}
                featured={i === 0}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

function ProjectCard({
  project,
  category,
  index,
  featured,
}: {
  project: Project;
  category: string;
  index: number;
  featured: boolean;
}) {
  const imageHeight = featured ? IMAGE_HEIGHT.featured : IMAGE_HEIGHT.regular;

  return (
    <div
      className={cn("group", featured && "md:col-span-2", ENTRANCE)}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <PaperCard
        tape={index % 2 === 0}
        tilt={index % 2 === 0 ? -0.6 : 0.6}
        className="h-full transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        innerClassName="flex h-full flex-col p-5 md:p-6 transition-shadow duration-300"
      >
        <div className={cn(featured && "md:grid md:grid-cols-2 md:items-center md:gap-8")}>
          <div className="overflow-hidden border border-primary/30">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} — hand-drawn sketch`}
                width={1200}
                height={800}
                loading="lazy"
                className={cn(
                  "w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                  imageHeight,
                )}
              />
            ) : (
              <div
                className={cn(
                  "flex w-full items-center justify-center bg-secondary/60 text-primary",
                  imageHeight,
                )}
              >
                <QuillDoodle className="h-32 w-48 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-1 flex-col md:mt-0">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-primary">
              {category}
            </p>
            <h3 className="mt-1 font-display text-3xl tracking-wide">
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="transition-colors hover:text-primary hover:underline"
              >
                {project.title}
              </Link>
            </h3>
            {project.status && (
              <MarginNote className="mt-1 inline-block text-lg">
                <CircleNote className="text-primary">{project.status}</CircleNote>
              </MarginNote>
            )}
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.blurb}</p>
            {project.note && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.note}</p>
            )}
            {project.tags && (
              <div className="mt-4">
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

            <div className="sketch-line mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-5">
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
                    <ProjectLinkButton href={project.githubUrl} icon={Code}>
                      GitHub
                    </ProjectLinkButton>
                  )}
                  {project.liveUrl && (
                    <ProjectLinkButton href={project.liveUrl} icon={ExternalLink}>
                      Live demo
                    </ProjectLinkButton>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </PaperCard>
    </div>
  );
}

function ProjectLinkButton({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="sketch-border-alt inline-flex items-center gap-2 bg-card px-3 py-1.5 font-display text-sm uppercase tracking-widest text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:bg-secondary motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
      {children}
    </a>
  );
}
