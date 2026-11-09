import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Project } from "@/data/portfolio";
import { ProjectCard, type CardTreatment } from "@/components/project-card";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    className,
    params,
  }: {
    children: ReactNode;
    className?: string;
    params?: { slug: string };
  }) => (
    <a href={`/projects/${params?.slug}`} className={className}>
      {children}
    </a>
  ),
}));

const withMedia: Project = {
  slug: "demo-site",
  title: "Demo Site",
  blurb: "A demo site.",
  tags: ["React"],
  image: "/demo-site.png",
  githubUrl: "https://github.com/example/demo-site",
  liveUrl: "https://demo.example.com",
};

const withoutMedia: Project = {
  slug: "demo-game",
  title: "Demo Game",
  status: "in development",
  blurb: "A demo game.",
};

const FRONTEND_HINT = "[add website screenshot, 16:9]";
const GAME_HINT = "[add gameplay image or video, 16:9]";

function renderCard(
  project: Project,
  options: { treatment?: CardTreatment; featured?: boolean; hint?: string } = {},
) {
  return render(
    <ProjectCard
      project={project}
      category={project.image ? "Frontend development" : "Game development"}
      mediaHint={options.hint ?? (project.image ? FRONTEND_HINT : GAME_HINT)}
      number={2}
      treatment={options.treatment ?? "plain"}
      featured={options.featured ?? false}
    />,
  );
}

describe("project showcase card", () => {
  it("shows the project image as a 16:9 preview", () => {
    renderCard(withMedia);
    const img = screen.getByRole("img", { name: "Preview of Demo Site" });
    expect(img).toHaveAttribute("src", "/demo-site.png");
    expect(img.parentElement).toHaveClass("aspect-video");
  });

  it("shows a clearly marked placeholder when no media exists", () => {
    renderCard(withoutMedia, { featured: true });
    expect(
      screen.getByRole("img", { name: "Placeholder for Demo Game media" }),
    ).toBeInTheDocument();
    expect(screen.getByText(GAME_HINT)).toBeInTheDocument();
  });

  it("links GitHub and Live demo in new tabs when URLs exist", () => {
    renderCard(withMedia);
    const github = screen.getByRole("link", { name: /GitHub/ });
    expect(github).toHaveAttribute("href", "https://github.com/example/demo-site");
    expect(github).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: /Live demo/ })).toHaveAttribute(
      "href",
      "https://demo.example.com",
    );
  });

  it("marks missing GitHub and Live demo links as placeholders", () => {
    renderCard(withoutMedia);
    expect(screen.getByText("[add github link]")).toBeInTheDocument();
    expect(screen.getByText("[add live demo link]")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /GitHub/ })).toBeNull();
  });

  it("shows technology tags, or a placeholder when none are listed", () => {
    const { unmount } = renderCard(withMedia);
    expect(screen.getByText("React")).toBeInTheDocument();
    unmount();

    renderCard(withoutMedia);
    expect(screen.getByText("[add technologies used]")).toBeInTheDocument();
  });

  it("labels only featured cards", () => {
    const { unmount } = renderCard(withMedia, { featured: true });
    expect(screen.getByText("featured")).toBeInTheDocument();
    unmount();

    renderCard(withMedia);
    expect(screen.queryByText("featured")).toBeNull();
  });

  it("puts the details panel over the media only in the overlap treatment", () => {
    const { container, unmount } = renderCard(withMedia, { treatment: "overlap" });
    expect(container.querySelector(".-mt-12")).not.toBeNull();
    unmount();

    const plain = renderCard(withMedia);
    expect(plain.container.querySelector(".-mt-12")).toBeNull();
  });

  it("adds tape strips only in the tilt treatment", () => {
    const { container, unmount } = renderCard(withMedia, { treatment: "tilt" });
    expect(container.querySelectorAll(".tape-strip").length).toBeGreaterThan(1);
    unmount();

    const plain = renderCard(withMedia);
    expect(plain.container.querySelectorAll(".tape-strip")).toHaveLength(1);
  });
});
