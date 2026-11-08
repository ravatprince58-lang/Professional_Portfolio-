import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findProject } from "@/data/portfolio";
import { PaperCard, Tag, MarginNote, SectionTitle } from "@/components/paper";
import { CircleNote, QuillDoodle } from "@/components/doodles";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const found = findProject(params.slug);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    const title = `${loaderData?.project.title ?? "Project"} — Ravat Prince`;
    const description = loaderData?.project.blurb ?? "A project by Ravat Prince.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectDetailPage,
});

function MissingDetail({ children }: { children: React.ReactNode }) {
  return <span className="font-hand text-lg text-pencil">{children}</span>;
}

function ProjectDetailPage() {
  const { project, category } = Route.useLoaderData();

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <Link
        to="/projects"
        className="font-display text-sm uppercase tracking-[0.2em] text-primary transition-colors hover:underline"
      >
        ← Back to the work pages
      </Link>

      <div className="mt-8">
        <SectionTitle>{project.title}</SectionTitle>
        <MarginNote className="mt-3 text-xl">{category}</MarginNote>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <PaperCard tilt={-0.5}>
          {project.image ? (
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              width={1200}
              height={800}
              className="h-auto w-full border border-primary/30 object-cover"
            />
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 border border-primary/30 bg-secondary/60 text-primary">
              <QuillDoodle className="h-24 w-40" />
              <MarginNote>screenshots: [add when available]</MarginNote>
            </div>
          )}
        </PaperCard>

        <div className="space-y-6">
          {project.status && (
            <MarginNote className="inline-block text-lg">
              <CircleNote className="text-primary">{project.status}</CircleNote>
            </MarginNote>
          )}
          <p className="text-lg text-foreground">{project.blurb}</p>
          {project.note && <p className="text-sm text-muted-foreground">{project.note}</p>}

          <div>
            <h2 className="font-display text-lg uppercase tracking-[0.2em] text-primary">
              Technologies
            </h2>
            {project.tags ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            ) : (
              <p className="mt-2">
                <MissingDetail>[add technologies used]</MissingDetail>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-lg uppercase tracking-[0.2em] text-primary">Links</h2>
            <p>
              <span className="font-semibold">GitHub: </span>
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-primary underline-offset-4 hover:underline"
                >
                  View the source code
                </a>
              ) : (
                <MissingDetail>[add GitHub link]</MissingDetail>
              )}
            </p>
            <p>
              <span className="font-semibold">Live demo: </span>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-primary underline-offset-4 hover:underline"
                >
                  Open the live demo
                </a>
              ) : (
                <MissingDetail>[add live demo link]</MissingDetail>
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
