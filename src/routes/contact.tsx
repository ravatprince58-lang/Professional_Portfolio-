import { createFileRoute } from "@tanstack/react-router";
import { contactEmail, profile } from "@/data/portfolio";
import { PaperCard, MarginNote, SectionTitle } from "@/components/paper";
import { CoffeeStain, StarDoodle } from "@/components/doodles";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ravat Prince" },
      {
        name: "description",
        content: "Get in touch with Ravat Prince about game development or frontend development.",
      },
      { property: "og:title", content: "Contact — Ravat Prince" },
      {
        property: "og:description",
        content: "Get in touch with Ravat Prince about game development or frontend development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-10 text-center md:pt-16">
      <CoffeeStain className="mx-auto mb-4 text-primary" />
      <SectionTitle align="center">Let's put something on paper</SectionTitle>
      <p className="mx-auto mt-6 max-w-md text-muted-foreground">
        Questions about frontend or game development projects are welcome.
      </p>

      <div className="mt-8">
        {contactEmail ? (
          <a
            href={`mailto:${contactEmail}`}
            className="sketch-border inline-flex max-w-full items-center justify-center break-all bg-primary px-6 py-4 font-display text-xl uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90 sm:px-8 sm:text-2xl"
          >
            {contactEmail}
          </a>
        ) : (
          <span className="sketch-border inline-flex max-w-full items-center justify-center break-all bg-card px-6 py-4 font-display text-xl uppercase tracking-widest text-pencil sm:px-8 sm:text-2xl">
            {profile.email}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <span className="sketch-chip px-4 py-1.5 font-display text-sm uppercase tracking-widest text-primary">
          [add social profile links]
        </span>
      </div>

      <PaperCard className="mx-auto mt-14 max-w-2xl">
        <MarginNote className="mb-6 text-center text-2xl">drop me a line below</MarginNote>
        <ContactForm />
      </PaperCard>

      <PaperCard variant="alt" tape tilt={-1.5} className="mx-auto mt-14 max-w-sm">
        <MarginNote className="text-center text-2xl">availability: [add details]</MarginNote>
        <StarDoodle className="mx-auto mt-2 text-primary" />
      </PaperCard>
    </main>
  );
}
