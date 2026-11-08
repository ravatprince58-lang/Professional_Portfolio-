import { createFileRoute } from "@tanstack/react-router";
import { education, achievements } from "@/data/portfolio";
import { PaperCard, MarginNote, SectionTitle } from "@/components/paper";
import { StarDoodle } from "@/components/doodles";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Ravat Prince" },
      {
        name: "description",
        content:
          "Ravat Prince's journey so far: BCA student, frontend projects, Unity game development and hackathon wins.",
      },
      { property: "og:title", content: "Experience — Ravat Prince" },
      {
        property: "og:description",
        content:
          "Education, hackathon wins and project recognition — Ravat Prince's experience pages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <SectionTitle>Education &amp; achievements</SectionTitle>
      <MarginNote className="mt-3 text-xl">education &amp; milestones</MarginNote>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="border-l-2 border-dashed border-primary/40 pl-6">
          <span className="font-display text-lg tracking-[0.2em] text-primary">
            {education.stage}
          </span>
          <h3 className="font-display text-3xl tracking-wide">{education.course}</h3>
          <p className="text-sm italic text-muted-foreground">{education.place}</p>
          <ul className="mt-3 space-y-2">
            {education.points.map((pt) => (
              <li key={pt} className="text-sm text-muted-foreground">
                — {pt}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-2xl uppercase tracking-wide">Small wins</h3>
          <MarginNote className="text-lg">pinned to the wall above the desk</MarginNote>
          <div className="mt-6 space-y-6">
            {achievements.map((a, i) => (
              <PaperCard key={a.title} tilt={i % 2 === 0 ? -0.5 : 0.5}>
                <div className="flex items-center gap-2">
                  <StarDoodle className="text-primary" />
                  {a.year && (
                    <span className="font-display text-sm tracking-[0.2em] text-pencil">
                      {a.year}
                    </span>
                  )}
                </div>
                <h4 className="mt-1 font-semibold">{a.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
              </PaperCard>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
