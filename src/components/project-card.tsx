import { Link } from "@tanstack/react-router";
import { ArrowRight, Code, ExternalLink, type LucideIcon } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { CircleNote } from "./doodles";
import { MarginNote, Tag } from "./paper";
import { ProjectCover, type CardVariant } from "./project-cover";
import { cn } from "@/lib/utils";

const LAYOUT: Record<CardVariant, string> = {
  featured: "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
  wide: "lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
  compact: "",
};

const TITLE_SIZE: Record<CardVariant, string> = {
  featured: "text-4xl md:text-6xl",
  wide: "text-3xl md:text-4xl",
  compact: "text-3xl",
};

export function ProjectCard({
  project,
  category,
  number,
  variant,
  flip = false,
  className,
}: {
  project: Project;
  category: string;
  number: number;
  variant: CardVariant;
  flip?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative isolate animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 motion-reduce:animate-none",
        className,
      )}
      style={{
        rotate: `${number % 2 === 0 ? 0.4 : -0.4}deg`,
        animationDelay: `${(number - 1) * 90}ms`,
      }}
    >
      <div
        aria-hidden="true"
        className="sketch-border-alt absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-secondary/60 transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:translate-y-3 motion-reduce:transition-none"
      />
      <div
        className={cn(
          "sketch-border relative grid h-full grid-cols-1 gap-5 bg-card p-4 transition-transform duration-300 ease-out hover:-translate-y-1 md:p-5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
          LAYOUT[variant],
          variant === "featured" && "md:gap-8 md:p-7",
          variant === "wide" && "lg:gap-6",
        )}
      >
        <ProjectCover
          title={project.title}
          category={category}
          number={number}
          variant={variant}
          flip={flip}
        />
        <ProjectDetails project={project} variant={variant} />
      </div>
    </article>
  );
}

function ProjectDetails({ project, variant }: { project: Project; variant: CardVariant }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 md:py-1">
      <div>
        <h3
          className={cn("font-display uppercase leading-[1.02] tracking-wide", TITLE_SIZE[variant])}
        >
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="transition-colors hover:text-primary"
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
        className={cn(
          "leading-relaxed text-muted-foreground",
          variant === "featured" ? "text-base md:text-lg" : "text-sm md:text-base",
        )}
      >
        {project.blurb}
      </p>
      {project.note && <MarginNote className="text-lg">{project.note}</MarginNote>}

      <div>
        <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Technologies
        </p>
        {project.tags ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : (
          <MarginNote className="mt-1 text-lg">[add technologies used]</MarginNote>
        )}
      </div>

      <div className="sketch-line mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-4">
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="group/link inline-flex items-center gap-1.5 font-display text-sm uppercase tracking-[0.2em] text-primary"
        >
          View details
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1 motion-reduce:transition-none" />
        </Link>
        <div className="flex flex-wrap gap-2">
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
      <span className="inline-flex items-center gap-2 border border-dashed border-primary/40 px-3 py-1.5 font-hand text-base text-pencil">
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
        "inline-flex items-center gap-2 px-3.5 py-2 font-display text-sm uppercase tracking-widest transition-all duration-150 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        variant === "solid"
          ? "sketch-border bg-primary text-primary-foreground hover:bg-primary/90"
          : "sketch-border-alt bg-card text-foreground hover:bg-secondary",
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
