import { createFileRoute } from "@tanstack/react-router";
import { journey, profile } from "@/data/portfolio";
import { PaperCard, MarginNote, SectionTitle } from "@/components/paper";
import { StarDoodle } from "@/components/doodles";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ravat Prince" },
      {
        name: "description",
        content:
          "Ravat Prince is a BCA student in Surat, Gujarat, building projects across frontend and game development.",
      },
      { property: "og:title", content: "About — Ravat Prince" },
      {
        property: "og:description",
        content:
          "A BCA student in Surat building frontend projects and The Last Escape in Unity and C#.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <SectionTitle>About</SectionTitle>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0">
            <div className="sketch-border-alt flex aspect-[4/5] items-center justify-center bg-card p-6 text-center">
              <MarginNote className="text-2xl">[add your profile photo]</MarginNote>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg font-medium">
              Hi — I'm {profile.name}, a third-year BCA student in {profile.location}. I'm
              interested in both frontend development and game development, and I learn by turning
              that interest into practical projects.
            </p>
            <p className="text-muted-foreground">
              My frontend projects include a personal portfolio, SoulCare (a mental health
              platform), a paste app, a Razorpay clone, Leet-Metric and NESTORA (a real estate
              portal). Alongside them, I'm developing The Last Escape, a prison escape game made
              with Unity and C#. Its basic gameplay is complete.
            </p>
            <p className="text-muted-foreground">
              I have participated in Hackathon 2025 and secured 3rd rank in Hackathon 2026. SoulCare
              also received project recognition and certificates.
            </p>
            <MarginNote className="mt-6 text-xl">
              off the clock: [add your hobbies and interests here]
            </MarginNote>
          </div>
        </div>

        <PaperCard tape tilt={0.8} innerClassName="ruled-lines">
          <h3 className="font-display text-2xl tracking-wide">The journey</h3>
          <MarginNote className="text-lg">one sketchbook, still filling up</MarginNote>
          <ol className="relative mt-6 space-y-6 border-l-2 border-dashed border-primary/40 pl-6">
            {journey.map((j) => (
              <li key={j.label} className="relative">
                <StarDoodle className="absolute -left-[34px] top-1 h-5 w-5 bg-card text-primary" />
                <span className="font-display text-lg tracking-[0.2em] text-primary">
                  {j.label}
                </span>
                <h4 className="font-semibold">{j.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{j.text}</p>
              </li>
            ))}
          </ol>
        </PaperCard>
      </div>
    </main>
  );
}
