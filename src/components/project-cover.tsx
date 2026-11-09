import { cn } from "@/lib/utils";
import { TapeStrip } from "./doodles";

const SKIPPED_WORDS = new Set(["the", "a", "an", "of", "and"]);

export type CardVariant = "featured" | "wide" | "compact";

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

const COVER_SIZE: Record<CardVariant, string> = {
  featured: "aspect-[16/10] md:aspect-auto md:h-full md:min-h-80",
  wide: "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-56",
  compact: "aspect-[16/10]",
};

const MONOGRAM_SIZE: Record<CardVariant, string> = {
  featured: "text-8xl md:text-[10rem]",
  wide: "text-7xl lg:text-8xl",
  compact: "text-6xl md:text-7xl",
};

/** Typographic cover built from the project's own name, used where no screenshot exists. */
export function ProjectCover({
  title,
  category,
  number,
  variant,
  flip = false,
}: {
  title: string;
  category: string;
  number: number;
  variant: CardVariant;
  flip?: boolean;
}) {
  const featured = variant === "featured";
  return (
    <div
      className={cn(
        "ruled-lines relative flex flex-col justify-between overflow-hidden border border-primary/30 bg-secondary/50",
        COVER_SIZE[variant],
      )}
    >
      <TapeStrip className="right-6 top-[-8px] h-5 w-16 rotate-6" />
      <div className="flex items-start justify-between gap-3 p-4 md:p-5">
        <span className="font-hand text-xl leading-none text-pencil">
          No. {String(number).padStart(2, "0")}
        </span>
        {featured && <span className="font-hand text-xl leading-none text-primary">featured</span>}
      </div>
      <p
        aria-hidden="true"
        className={cn(
          "select-none px-4 font-display leading-none tracking-wide text-primary/80 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:px-5",
          MONOGRAM_SIZE[variant],
          flip ? "self-end" : "self-start",
        )}
      >
        {monogram(title)}
      </p>
      <div className="sketch-line mx-4 mb-4 pt-3 font-display text-sm uppercase tracking-[0.2em] text-primary md:mx-5 md:mb-5">
        {category}
      </div>
    </div>
  );
}
