import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";
import { findProject, frontendProjects, gameProjects } from "@/data/portfolio";

const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  subject: "Hello",
  message: "A short note.",
};

describe("contact form validation", () => {
  it("accepts a complete message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an empty name, subject or message", () => {
    for (const field of ["name", "subject", "message"] as const) {
      expect(contactSchema.safeParse({ ...valid, [field]: "   " }).success).toBe(false);
    }
  });

  it("rejects a malformed email address", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects overly long messages", () => {
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(2001) }).success).toBe(false);
  });
});

describe("project detail lookup", () => {
  it("finds every project by slug in its own category", () => {
    for (const p of frontendProjects) {
      expect(findProject(p.slug)?.category).toBe("Frontend development");
    }
    for (const p of gameProjects) {
      expect(findProject(p.slug)?.category).toBe("Game development");
    }
  });

  it("returns nothing for an unknown slug", () => {
    expect(findProject("does-not-exist")).toBeNull();
  });
});
