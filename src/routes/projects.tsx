import { createFileRoute, Link } from "@tanstack/react-router";
import { frontendProjects, gameProjects } from "@/data/portfolio";
import { PaperCard, Tag, MarginNote, SectionTitle } from "@/components/paper";
import { QuillDoodle, CircleNote } from "@/components/doodles";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Work — Ravat Prince" },
      {
        name: "description",
        content:
          "Frontend development projects and The Last Escape, a prison escape game in development by Ravat Prince.",
      },
      { property: "og:title", content: "Work — Ravat Prince" },
      {
        property: "og:description",
        content: "Frontend projects and an in-development Unity and C# game from Ravat Prince.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const sections = [
    { title: "Frontend development", projects: frontendProjects },
    { title: "Game development", projects: gameProjects },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <SectionTitle>The work pages</SectionTitle>
      <MarginNote className="mt-3 text-xl">frontend projects &amp; game development</MarginNote>

      {sections.map((section) => (
        <section key={section.title} className="mt-10">
          <h2 className="font-display text-2xl uppercase tracking-wide text-primary">
            {section.title}
          </h2>
          <div className="mt-5 grid gap-10 md:grid-cols-2">
            {section.projects.map((p, i) => (
              <PaperCard key={p.slug} tape={i % 2 === 0} tilt={i % 2 === 0 ? -0.7 : 0.7}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} — hand-drawn sketch`}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="h-52 w-full border border-primary/30 object-cover"
                  />
                ) : (
                  <div className="flex h-52 w-full items-center justify-center border border-primary/30 bg-secondary/60 text-primary">
                    <QuillDoodle className="h-32 w-48" />
                  </div>
                )}
                <h3 className="mt-4 font-display text-3xl tracking-wide">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="transition-colors hover:text-primary hover:underline"
                  >
                    {p.title}
                  </Link>
                </h3>
                {p.status && (
                  <MarginNote className="mt-1 inline-block text-lg">
                    <CircleNote className="text-primary">{p.status}</CircleNote>
                  </MarginNote>
                )}
                <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                {p.note && <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>}
                {p.tags && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                )}
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="mt-4 inline-block font-display text-sm uppercase tracking-[0.2em] text-primary hover:underline"
                >
                  View details →
                </Link>
              </PaperCard>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
