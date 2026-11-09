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

describe("project showcase card", () => {
  it("shows the project image as a 16:9 preview", () => {
    render(
      <ProjectCard
        project={withMedia}
        category="Frontend development"
        mediaHint={FRONTEND_HINT}
        number={2}
      />,
    );
    const img = screen.getByRole("img", { name: "Preview of Demo Site" });
    expect(img).toHaveAttribute("src", "/demo-site.png");
    expect(img.parentElement).toHaveClass("aspect-video");
  });

  it("shows a clearly marked placeholder when no media exists", () => {
    render(
      <ProjectCard
        project={withoutMedia}
        category="Game development"
        mediaHint="[add gameplay image or video, 16:9]"
        number={1}
        featured
      />,
    );
    expect(
      screen.getByRole("img", { name: "Placeholder for Demo Game media" }),
    ).toBeInTheDocument();
    expect(screen.getByText("[add gameplay image or video, 16:9]")).toBeInTheDocument();
  });

  it("links GitHub and Live demo in new tabs when URLs exist", () => {
    render(
      <ProjectCard
        project={withMedia}
        category="Frontend development"
        mediaHint={FRONTEND_HINT}
        number={2}
      />,
    );
    const github = screen.getByRole("link", { name: /GitHub/ });
    expect(github).toHaveAttribute("href", "https://github.com/example/demo-site");
    expect(github).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: /Live demo/ })).toHaveAttribute(
      "href",
      "https://demo.example.com",
    );
  });

  it("marks missing GitHub and Live demo links as placeholders", () => {
    render(
      <ProjectCard
        project={withoutMedia}
        category="Game development"
        mediaHint="[add gameplay image or video, 16:9]"
        number={1}
        featured
      />,
    );
    expect(screen.getByText("[add github link]")).toBeInTheDocument();
    expect(screen.getByText("[add live demo link]")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /GitHub/ })).toBeNull();
  });

  it("shows technology tags, or a placeholder when none are listed", () => {
    const { unmount } = render(
      <ProjectCard
        project={withMedia}
        category="Frontend development"
        mediaHint={FRONTEND_HINT}
        number={2}
      />,
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    unmount();

    render(
      <ProjectCard
        project={withoutMedia}
        category="Game development"
        mediaHint="[add gameplay image or video, 16:9]"
        number={1}
      />,
    );
    expect(screen.getByText("[add technologies used]")).toBeInTheDocument();
  });

  it("labels only featured cards", () => {
    const { unmount } = render(
      <ProjectCard
        project={withMedia}
        category="Frontend development"
        mediaHint={FRONTEND_HINT}
        number={2}
        featured
      />,
    );
    expect(screen.getByText("featured")).toBeInTheDocument();
    unmount();

    render(
      <ProjectCard
        project={withMedia}
        category="Frontend development"
        mediaHint={FRONTEND_HINT}
        number={2}
      />,
    );
    expect(screen.queryByText("featured")).toBeNull();
  });
});
