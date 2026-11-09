import { Link } from "@tanstack/react-router";
import { ArrowRight, Code, ExternalLink, type LucideIcon } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { CircleNote } from "./doodles";
import { MarginNote, Tag } from "./paper";
import { ProjectMedia } from "./project-media";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  category,
  mediaHint,
  number,
  featured = false,
  className,
}: {
  project: Project;
  category: string;
  mediaHint: string;
  number: number;
  featured?: boolean;
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
          "sketch-border relative h-full bg-card p-3 transition-transform duration-300 ease-out hover:-translate-y-1 md:p-4 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
          featured
            ? "md:grid md:grid-cols-12 md:items-center md:gap-8 md:p-6"
            : "flex flex-col gap-5",
        )}
      >
        <div className={cn(featured && "md:col-span-7")}>
          <ProjectMedia
            project={project}
            number={number}
            featured={featured}
            placeholderHint={mediaHint}
          />
        </div>
        <div className={cn(featured && "md:col-span-5")}>
          <ProjectDetails project={project} category={category} featured={featured} />
        </div>
      </div>
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
    <div className="flex min-w-0 flex-col gap-4 px-2 pb-2 md:px-3 md:pb-3">
      <div>
        <p className="font-display text-sm uppercase tracking-[0.2em] text-primary">{category}</p>
        <h3
          className={cn(
            "mt-1 font-display uppercase leading-[1.02] tracking-wide",
            featured ? "text-4xl md:text-5xl" : "text-3xl",
          )}
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
          featured ? "text-base md:text-lg" : "text-sm md:text-base",
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
      <span className="inline-flex items-center border border-dashed border-primary/40 px-3 py-1.5 font-hand text-base text-pencil">
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
