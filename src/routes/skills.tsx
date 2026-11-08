import { createFileRoute } from "@tanstack/react-router";
import { skillGroups } from "@/data/portfolio";
import { PaperCard, MarginNote, SectionTitle } from "@/components/paper";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Ravat Prince" },
      {
        name: "description",
        content:
          "Unity, C#, React, TypeScript — what Ravat Prince builds, and how honestly good at it.",
      },
      { property: "og:title", content: "Skills — Ravat Prince" },
      {
        property: "og:description",
        content:
          "Unity, C#, React, TypeScript — what Ravat Prince builds, and how honestly good at it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <SectionTitle>Skills</SectionTitle>
      <MarginNote className="mt-3 text-xl">skills across both disciplines</MarginNote>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {skillGroups.map((g, i) => (
          <PaperCard key={g.title} tilt={i === 1 ? 0.6 : -0.5}>
            <h3 className="font-display text-2xl uppercase tracking-wide text-primary">
              {g.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {g.skills.map((skill) => (
                <li
                  key={skill}
                  className="border-b border-dashed border-primary/20 pb-2 text-sm font-medium"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </PaperCard>
        ))}
      </div>

      <MarginNote className="mt-10 text-center text-xl">
        practical learning through projects
      </MarginNote>
    </main>
  );
}
