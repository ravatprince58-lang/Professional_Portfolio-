import { createFileRoute } from "@tanstack/react-router";
import { Code, Gamepad2, Layout, Wrench, type LucideIcon } from "lucide-react";
import { skillCategories, type Skill, type SkillCategory } from "@/data/portfolio";
import { PaperCard, MarginNote, SectionTitle, Tag } from "@/components/paper";
import { Squiggle, StarDoodle } from "@/components/doodles";
import { cn } from "@/lib/utils";

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

const CATEGORY_ICONS: Record<SkillCategory["id"], LucideIcon> = {
  frontend: Layout,
  languages: Code,
  gamedev: Gamepad2,
  tools: Wrench,
};

const ENTRANCE =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 motion-reduce:animate-none";

function SkillsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <header className={cn("relative", ENTRANCE)}>
        <p className="font-hand text-2xl text-primary">the pencil case, unpacked</p>
        <SectionTitle>Skills</SectionTitle>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          The frontend, programming and game development skills I work with, grouped by what I use
          them for. Starred skills are the ones I reach for most.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <MarginNote className="text-xl">skills across both disciplines</MarginNote>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <StarDoodle className="h-4 w-4 text-primary" />
            Highlighted skill
          </span>
        </div>
      </header>

      <div className="mt-12 space-y-12">
        {skillCategories.map((category, index) => (
          <CategorySection key={category.id} category={category} index={index} />
        ))}
      </div>

      <MarginNote className="mt-14 text-center text-xl">
        practical learning through projects
      </MarginNote>
    </main>
  );
}

function CategorySection({ category, index }: { category: SkillCategory; index: number }) {
  const Icon = CATEGORY_ICONS[category.id];
  const headingId = `skills-${category.id}`;

  return (
    <section
      aria-labelledby={headingId}
      className={ENTRANCE}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <PaperCard tilt={index % 2 === 0 ? -0.3 : 0.3}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <span className="sketch-border flex h-14 w-14 shrink-0 items-center justify-center bg-background text-primary">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id={headingId}
              className="font-display text-3xl uppercase leading-[1.2] tracking-wide md:text-4xl"
            >
              {category.title}
            </h2>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
          <span className="font-hand text-xl text-pencil sm:ml-auto">
            {category.skills.length} {category.skills.length === 1 ? "skill" : "skills"}
          </span>
        </div>
        <Squiggle className="mt-3 w-40 text-primary/60" />

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {category.skills.map((skill, skillIndex) => (
            <SkillCard key={skill.name} skill={skill} index={skillIndex} />
          ))}
        </ul>
      </PaperCard>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <li className={ENTRANCE} style={{ animationDelay: `${180 + index * 80}ms` }}>
      <div
        className={cn(
          "group sketch-border-alt flex h-full items-center justify-between gap-3 px-4 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-secondary motion-reduce:transition-none motion-reduce:hover:translate-y-0",
          skill.highlight ? "bg-background" : "bg-card",
        )}
      >
        <span className="flex min-w-0 items-center gap-3">
          {skill.highlight ? (
            <StarDoodle className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:rotate-12" />
          ) : (
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
          )}
          <span
            className={cn("truncate text-base", skill.highlight ? "font-semibold" : "font-medium")}
          >
            {skill.name}
          </span>
        </span>
        {skill.highlight && <Tag>Highlighted</Tag>}
      </div>
    </li>
  );
}
