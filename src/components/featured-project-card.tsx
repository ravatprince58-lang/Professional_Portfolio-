import { Link } from "@tanstack/react-router";
import { ArrowRight, Code, ExternalLink, type LucideIcon } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { TapeStrip } from "./doodles";
import { Tag } from "./paper";
import { ProjectMedia } from "./project-media";

/**
 * Large horizontal showcase for a single project. Media sits beside the
 * details on desktop and stacks on mobile. Shares the sketchbook look with
 * the standard ProjectCard but at a much larger size.
 */
export function FeaturedProjectCard({
  project,
  category,
  mediaHint,
  number,
}: {
  project: Project;
  category: string;
  mediaHint: string;
  number: number;
}) {
  return (
    <article
      className="group relative isolate flex h-full animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 motion-reduce:animate-none"
      style={{ animationDelay: `${(number - 1) * 120}ms` }}
    >
      <div
        aria-hidden="true"
        className="sketch-border-alt absolute inset-0 -z-10 translate-x-3 translate-y-3 bg-secondary/60 transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:translate-y-4 motion-reduce:transition-none"
      />
      <div className="sketch-border relative flex w-full flex-col bg-card p-4 transition-transform duration-300 ease-out hover:-translate-y-1 md:p-6 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="relative">
            <ProjectMedia project={project} number={number} placeholderHint={mediaHint} featured />
          </div>
          <div className="flex flex-col gap-5 px-2 pb-2 pt-4 lg:px-1 lg:pb-1 lg:pt-2">
            <div className="min-w-0">
              <p className="font-display text-base uppercase tracking-[0.2em] text-primary">
                {category}
                {project.status ? ` · ${project.status}` : ""}
              </p>
              <h2 className="mt-1.5 font-display text-5xl uppercase leading-[1.02] tracking-wide md:text-6xl">
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="transition-colors hover:text-primary"
                >
                  {project.title}
                </Link>
              </h2>
              <TapeStrip className="right-8 -top-2 h-5 w-16 rotate-3" />
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground">{project.blurb}</p>

            <FeaturedTags project={project} />

            <div className="sketch-line mt-auto flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group/link inline-flex items-center gap-2 self-start font-display text-base uppercase tracking-[0.2em] text-primary"
              >
                View case study
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover/link:translate-x-1 motion-reduce:transition-none" />
              </Link>
              <div className="grid grid-cols-2 gap-2 sm:max-w-xs">
                <ProjectLink
                  href={project.githubUrl}
                  label="GitHub"
                  icon={Code}
                  variant="outline"
                />
                <ProjectLink
                  href={project.liveUrl}
                  label="Live demo"
                  icon={ExternalLink}
                  variant="solid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeaturedTags({ project }: { project: Project }) {
  const tags = project.tags;
  return (
    <div>
      <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Technologies
      </p>
      {tags && tags.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      ) : (
        <p className="mt-1 font-hand text-lg leading-tight text-pencil">[add technologies used]</p>
      )}
    </div>
  );
}

function ProjectLink({
  href,
  label,
  icon: Icon,
  variant,
}: {
  href: string | undefined;
  label: string;
  icon: LucideIcon;
  variant: "solid" | "outline";
}) {
  if (!href) {
    return (
      <span className="flex h-11 items-center justify-center border border-dashed border-primary/40 px-2 text-center font-hand text-base leading-tight text-pencil">
        [add {label.toLowerCase()} link]
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 px-3 font-display text-sm uppercase tracking-widest transition-all duration-150 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        variant === "solid"
          ? "sketch-border bg-primary text-primary-foreground hover:bg-primary/90"
          : "sketch-border-alt bg-card text-foreground hover:bg-secondary",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {label}
    </a>
  );
}
