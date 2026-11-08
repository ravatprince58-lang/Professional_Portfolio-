import { cn } from "@/lib/utils";
import { TapeStrip } from "./doodles";

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

/** Typographic stand-in for a project screenshot, built from the project's own title. */
export function ProjectCover({
  title,
  number,
  featured = false,
}: {
  title: string;
  number: number;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "ruled-lines relative flex aspect-[16/10] flex-col justify-between overflow-hidden border border-primary/30 bg-secondary/50 p-5",
        featured && "md:aspect-auto md:min-h-72 md:p-7",
      )}
    >
      <TapeStrip className="right-5 top-[-8px] h-5 w-16 rotate-6" />
      <div className="flex items-start justify-between gap-3">
        <span className="font-hand text-xl leading-none text-pencil">
          No. {String(number).padStart(2, "0")}
        </span>
        {featured && <span className="font-hand text-xl leading-none text-primary">featured</span>}
      </div>
      <p
        aria-hidden="true"
        className={cn(
          "select-none self-center font-display leading-none tracking-wide text-primary/80 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
          featured ? "text-8xl md:text-9xl" : "text-7xl",
        )}
      >
        {monogram(title)}
      </p>
      <div className="sketch-line pt-3 font-display text-sm uppercase tracking-[0.2em] text-primary/80">
        {title}
      </div>
    </div>
  );
}
