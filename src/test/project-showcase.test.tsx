import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Project } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";

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

function renderCard(project: Project, options: { hint?: string } = {}) {
  return render(
    <ProjectCard
      project={project}
      category={project.image ? "Frontend development" : "Game development"}
      mediaHint={options.hint ?? (project.image ? FRONTEND_HINT : GAME_HINT)}
      number={2}
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

  it("uses the same 16:9 cover frame for projects with and without media", () => {
    const { container, unmount } = renderCard(withMedia);
    expect(container.querySelector(".aspect-video")).not.toBeNull();
    unmount();

    const placeholder = renderCard(withoutMedia);
    expect(placeholder.container.querySelector(".aspect-video")).not.toBeNull();
  });

  it("shows a clearly marked placeholder when no media exists", () => {
    renderCard(withoutMedia);
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

  it("shows a play button only when a video is linked", () => {
    const { unmount } = renderCard({ ...withMedia, videoUrl: "https://video.example.com/demo" });
    expect(screen.getByRole("link", { name: "Watch the Demo Site video" })).toHaveAttribute(
      "href",
      "https://video.example.com/demo",
    );
    unmount();

    renderCard(withMedia);
    expect(screen.queryByRole("link", { name: /Watch the/ })).toBeNull();
  });
});
