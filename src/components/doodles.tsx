import { cn } from "@/lib/utils";

/** Hand-drawn squiggle underline. Color follows currentColor. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" fill="none" aria-hidden className={cn("h-3 w-28", className)}>
      <path
        d="M2 8 C 14 2, 22 10, 34 6 S 56 2, 68 7 S 96 9, 118 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small hand-drawn five-point star outline. */
export function StarDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={cn("h-5 w-5", className)}>
      <path
        d="M12 2.5 L13.6 8.6 L19.8 8.2 L14.8 11.9 L16.9 17.8 L12 14.2 L7.1 17.8 L9.2 11.9 L4.2 8.2 L10.4 8.6 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Curved arrow doodle with a hand-drawn arrowhead. */
export function ArrowDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" fill="none" aria-hidden className={cn("h-6 w-12", className)}>
      <path d="M2 14 C 14 5, 28 19, 40 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M33.5 7.5 L41 8.5 L35.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Hand-drawn ellipse circling a piece of text (like a marker ring). */
export function CircleNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("relative inline-block px-2 py-0.5", className)}>
      {children}
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
        className="pointer-events-none absolute -inset-x-1 -inset-y-0.5 h-[calc(100%+4px)] w-[calc(100%+8px)] overflow-visible"
      >
        <path
          d="M10 20 C 4 9, 28 4, 54 5 C 84 6, 97 12, 93 21 C 89 33, 58 36, 32 34 C 12 32, 2 29, 10 18"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** A quill pen doodle — stands in for project art. */
export function QuillDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" aria-hidden className={cn("h-full w-full", className)}>
      {/* feather */}
      <path
        d="M40 100 C 70 80, 120 40, 165 18 C 150 45, 105 78, 62 98 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* feather barb strokes */}
      <path d="M60 92 C 80 80, 110 60, 138 40" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M56 96 C 84 84, 118 60, 150 32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M78 82 C 96 70, 118 54, 140 40" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* nib + ink line */}
      <path d="M40 100 L52 92" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 112 C 40 104, 80 108, 118 100 S 160 106, 182 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* little stars */}
      <path d="M172 92 l3 4 5 .5 -4 3 1 5 -4.5-2.5 -4.5 2.5 1-5 -4-3 5-.5 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M28 30 l2.5 3.5 4 .4 -3 2.5 .8 4 -3.6-2 -3.6 2 .8-4 -3-2.5 4-.4 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/** Coffee-cup ring stain, very subtle. */
export function CoffeeStain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden className={cn("h-20 w-20 opacity-20", className)}>
      <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="3" />
      <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 7" />
      <circle cx="40" cy="40" r="33" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" />
    </svg>
  );
}

/** Washi tape strip — position it with className (absolute by default). */
export function TapeStrip({ className }: { className?: string }) {
  return <div aria-hidden className={cn("tape-strip absolute", className)} />;
}
