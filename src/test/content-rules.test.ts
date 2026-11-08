import { describe, expect, it } from "vitest";
import {
  achievements,
  education,
  frontendProjects,
  gameProjects,
  profile,
  projects,
} from "@/data/portfolio";

// Content rules set by the user:
// - no fictional projects, companies, dates, awards or contact details
// - unfinished work must never be presented as completed
// - missing links/contact info stay as editable placeholders
describe("portfolio content rules", () => {
  it("keeps the real identity from the brief", () => {
    expect(profile.name).toBe("Ravat Prince");
    expect(profile.role).toBe("Game Developer & Frontend Developer");
    expect(profile.location).toBe("Surat, Gujarat, India");
    expect(profile.education).toContain("BCA");
  });

  it("no longer contains invented fictional content", () => {
    const all = JSON.stringify({ projects, achievements, education });
    for (const banned of [
      "Bramble",
      "Lumen Ledger",
      "Petal Run",
      "Quill UI",
      "Pixel & Pine",
      "ravatprince.dev",
      "UTC+5:30",
    ]) {
      expect(all).not.toContain(banned);
    }
  });

  it("gives frontend and game development equal sections", () => {
    expect(frontendProjects).toHaveLength(6);
    expect(gameProjects).toHaveLength(1);
    expect(gameProjects.at(0)?.title).toBe("The Last Escape");
    expect(gameProjects.at(0)?.tags).toContain("Unity");
  });

  it("never marks the unfinished game as shipped", () => {
    for (const p of gameProjects) {
      expect(p.status?.toLowerCase()).not.toMatch(/shipped|released|launched|completed/);
    }
  });

  it("does not invent a working email or social URLs", () => {
    expect(profile.email).not.toMatch(/@(?!example\.com)[a-z.]+\.[a-z]+$/);
    expect(JSON.stringify(projects)).not.toContain("github.com");
  });

  it("states achievements only as far as the facts go", () => {
    expect(achievements.some((a) => a.title.includes("3rd rank") && a.title.includes("2026"))).toBe(
      true,
    );
    expect(achievements.some((a) => a.title.includes("Hackathon 2025"))).toBe(true);
    expect(achievements.some((a) => a.title.includes("SoulCare"))).toBe(true);
  });
});
