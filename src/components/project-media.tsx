import { Play } from "lucide-react";
import type { Project } from "@/data/portfolio";

const SKIPPED_WORDS = new Set(["the", "a", "an", "of", "and"]);

/** Initials from the title, e.g. "The Last Escape" becomes "LE". */
function monogram(title: string) {
  const words = title.split(/[\s-]+/).filter((w) => w && !SKIPPED_WORDS.has(w.toLowerCase()));
  if (words.length === 0) return title.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase();
  return words
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join("")
    .toUpperCase();
}

/**
 * Project cover at a fixed 16:9 ratio: the project's own screenshot when one is
 * set, otherwise a clearly marked placeholder. A play button appears when a
 * video is linked.
 */
export function ProjectMedia({
  project,
  number,
  placeholderHint,
  featured = false,
}: {
  project: Project;
  number: number;
  placeholderHint: string;
  featured?: boolean;
}) {
  return (
    <div className="relative">
      <div
        className={`relative aspect-video overflow-hidden border border-primary/30 bg-secondary/50 ${
          featured ? "rounded-sm" : ""
        }`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`Preview of ${project.title}`}
            width={1600}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div
            role="img"
            aria-label={`Placeholder for ${project.title} media`}
            className="ruled-lines flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-primary/40 transition-colors duration-300 group-hover:bg-secondary/80 motion-reduce:transition-none"
          >
            <span
              aria-hidden="true"
              className="select-none font-display text-7xl leading-none tracking-wide text-primary/25 transition-transform duration-500 ease-out group-hover:scale-105 md:text-8xl motion-reduce:transition-none"
            >
              {monogram(project.title)}
            </span>
            <span className="px-4 text-center font-hand text-xl leading-tight text-pencil">
              {placeholderHint}
            </span>
          </div>
        )}
        {project.videoUrl && (
          <a
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch the ${project.title} video`}
            className="group/play absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-300 hover:bg-foreground/15 motion-reduce:transition-none"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-card text-primary shadow-md transition-transform duration-300 group-hover/play:scale-110 motion-reduce:transition-none motion-reduce:group-hover/play:scale-100">
              <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
            </span>
          </a>
        )}
      </div>
      <span className="absolute left-3 top-3 bg-card/90 px-2 py-0.5 font-hand text-lg leading-tight text-pencil">
        No. {String(number).padStart(2, "0")}
      </span>
    </div>
  );
}
