import { createFileRoute, Link } from "@tanstack/react-router";
import heroSketch from "@/assets/hero-sketch.png";
import { frontendProjects, gameProjects, profile } from "@/data/portfolio";
import { PaperCard, InkLink, Tag, MarginNote, SectionTitle } from "@/components/paper";
import { ArrowDoodle, CoffeeStain } from "@/components/doodles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ravat Prince — Game & Frontend Developer" },
      {
        name: "description",
        content:
          "Ravat Prince's portfolio: frontend development projects and The Last Escape, a Unity and C# prison escape game.",
      },
      { property: "og:title", content: "Ravat Prince — Game & Frontend Developer" },
      {
        property: "og:description",
        content:
          "Frontend development projects and a Unity and C# prison escape game in development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NOTEBOOK_PAGES = [
  { to: "/about" as const, title: "About", note: "how the pages filled up" },
  { to: "/skills" as const, title: "Skills", note: "what's in the pencil case" },
  { to: "/experience" as const, title: "Experience", note: "where the ink came from" },
];

function Index() {
  const featured = frontendProjects.slice(0, 1).concat(gameProjects);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20">
      {/* Hero */}
      <section className="relative grid items-center gap-10 pt-10 md:grid-cols-[1.05fr_0.95fr] md:pt-16">
        <CoffeeStain className="absolute -top-2 right-4 hidden text-primary md:block" />
        <div>
          <p className="font-hand text-2xl text-primary">the sketchbook of</p>
          <h1 className="font-display text-6xl leading-[0.9] tracking-wide sm:text-7xl md:text-8xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg font-semibold tracking-wide">{profile.role}</p>
          <p className="mt-4 max-w-md text-muted-foreground">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <InkLink to="/projects">Flip through my work</InkLink>
            <InkLink to="/contact" variant="ghost">
              Say hello
            </InkLink>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <ArrowDoodle className="text-pencil" />
            <MarginNote className="text-lg">(warning: contains pixels)</MarginNote>
          </div>
        </div>
        <PaperCard tape tilt={1.5} className="max-w-md justify-self-center md:justify-self-end">
          <img
            src={heroSketch}
            alt="Sepia ink doodles of a game controller, a laptop and a coffee stain"
            width={1408}
            height={912}
            className="h-auto w-full"
          />
          <MarginNote className="mt-3 text-center text-lg">fig. 1 — the workshop brain</MarginNote>
        </PaperCard>
      </section>

      {/* Featured work */}
      <section className="mt-24">
        <SectionTitle>From the work pages</SectionTitle>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <PaperCard key={p.slug} tape={i === 1} tilt={i % 2 === 0 ? -0.8 : 0.8}>
              {p.image ? (
                <img
                  src={p.image}
                  alt={`${p.title} — hand-drawn sketch`}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="h-40 w-full border border-primary/30 object-cover"
                />
              ) : null}
              <h3 className="mt-4 font-display text-2xl tracking-wide">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags?.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="mt-4 inline-block font-display text-sm uppercase tracking-[0.2em] text-primary hover:underline"
              >
                Read more →
              </Link>
            </PaperCard>
          ))}
        </div>
      </section>

      {/* Rest of the notebook */}
      <section className="mt-20">
        <SectionTitle>The rest of the notebook</SectionTitle>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {NOTEBOOK_PAGES.map((l, i) => (
            <Link key={l.to} to={l.to} className="group block">
              <PaperCard variant="alt" tilt={i === 1 ? 0.8 : -0.6}>
                <h3 className="font-display text-3xl tracking-wide transition-colors group-hover:text-primary">
                  {l.title}
                </h3>
                <MarginNote className="mt-1">{l.note}</MarginNote>
              </PaperCard>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20">
        <PaperCard tape tilt={-0.6} className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-wide md:text-4xl">
            Got a project that needs both a world and a window into it?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Games, frontends, or the strange hybrids in between — I'd love to hear about it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <InkLink to="/contact">Write me a line</InkLink>
            <InkLink to="/projects" variant="ghost">
              Browse the work
            </InkLink>
          </div>
        </PaperCard>
      </section>
    </main>
  );
}
