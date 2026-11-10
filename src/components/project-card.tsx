import { Link } from "@tanstack/react-router";
import { ArrowRight, Code, ExternalLink, type LucideIcon } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { TapeStrip } from "./doodles";
import { Tag } from "./paper";
import { ProjectMedia } from "./project-media";

const MAX_CARD_TAGS = 3;

/** Every card shares one size, padding and layout so the grid lines up. */
export function ProjectCard({
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
      className="group relative isolate flex h-full animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 motion-reduce:animate-none"
      style={{ animationDelay: `${(number - 1) * 90}ms` }}
    >
      <div
        aria-hidden="true"
        className="sketch-border-alt absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-secondary/60 transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:translate-y-3 motion-reduce:transition-none"
      />
      <div className="sketch-border relative flex w-full flex-col bg-card p-3 transition-transform duration-300 ease-out hover:-translate-y-1 md:p-4 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <TapeStrip className="right-6 -top-3 h-5 w-16 rotate-6" />
        <ProjectMedia project={project} number={number} placeholderHint={mediaHint} />
        <ProjectDetails project={project} category={category} />
      </div>
    </article>
  );
}

function ProjectDetails({ project, category }: { project: Project; category: string }) {
  const tags = project.tags?.slice(0, MAX_CARD_TAGS);

  return (
    <div className="flex flex-1 flex-col gap-4 px-2 pb-2 pt-5 md:px-3 md:pb-3">
      <div className="min-w-0">
        <p className="truncate font-display text-sm uppercase tracking-[0.2em] text-primary">
          {category}
          {project.status ? ` · ${project.status}` : ""}
        </p>
        <h3 className="mt-1 truncate font-display text-4xl uppercase leading-[1.02] tracking-wide">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="transition-colors hover:text-primary"
          >
            {project.title}
          </Link>
        </h3>
      </div>

      <p className="line-clamp-3 min-h-[5rem] leading-relaxed text-muted-foreground">
        {project.blurb}
      </p>

      <div className="min-h-[4.5rem]">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Technologies
        </p>
        {tags ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : (
          <p className="mt-1 font-hand text-lg leading-tight text-pencil">
            [add technologies used]
          </p>
        )}
      </div>

      <div className="sketch-line mt-auto flex flex-col gap-3 pt-4">
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="group/link inline-flex items-center gap-1.5 self-start font-display text-sm uppercase tracking-[0.2em] text-primary"
        >
          View details
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1 motion-reduce:transition-none" />
        </Link>
        <div className="grid grid-cols-2 gap-2">
          <ProjectLink href={project.githubUrl} label="GitHub" icon={Code} variant="outline" />
          <ProjectLink
            href={project.liveUrl}
            label="Live demo"
            icon={ExternalLink}
            variant="solid"
          />
        </div>
      </div>
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
