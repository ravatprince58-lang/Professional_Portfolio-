import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Squiggle, TapeStrip } from "./doodles";

/** Routes the notebook pages can link to. */
export type PaperPath = "/" | "/projects" | "/about" | "/skills" | "/experience" | "/contact";

/**
 * A sheet of paper: organic hand-drawn border, slight ink shadow,
 * optional washi tape and tilt.
 */
export function PaperCard({
  children,
  className,
  innerClassName,
  tilt = 0,
  tape = false,
  variant = "solid",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  tilt?: number;
  tape?: boolean;
  variant?: "solid" | "alt";
}) {
  return (
    <div
      className={cn("relative", className)}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      {tape && <TapeStrip className="left-1/2 top-[-14px] h-7 w-28 -translate-x-1/2 -rotate-3" />}
      <div
        className={cn(
          variant === "solid" ? "sketch-border" : "sketch-border-alt",
          "h-full bg-card p-6",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** A link styled like ink on paper: solid = filled ink, ghost = outlined sheet. */
export function InkLink({
  to,
  children,
  variant = "solid",
  className,
}: {
  to: PaperPath;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 font-display text-lg uppercase tracking-widest transition-all duration-150 hover:-translate-y-0.5",
        variant === "solid"
          ? "sketch-border bg-primary text-primary-foreground hover:bg-primary/90"
          : "sketch-border-alt bg-card text-foreground hover:bg-secondary",
        className
      )}
    >
      {children}
    </Link>
  );
}

/** Handwritten margin note, slightly rotated. */
export function MarginNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("-rotate-1 font-hand text-xl leading-tight text-pencil", className)}>{children}</p>;
}

/** Small tag chip with an irregular hand-drawn pill border. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="sketch-chip bg-background px-2.5 py-0.5 text-xs font-medium tracking-wide text-primary">
      {children}
    </span>
  );
}

/** Section heading: Bebas display + squiggle underneath. */
export function SectionTitle({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" ? "flex flex-col items-center" : "", className)}>
      <h2 className="font-display text-4xl uppercase tracking-wide md:text-5xl">{children}</h2>
      <Squiggle className="mt-1 text-primary" />
    </div>
  );
}
