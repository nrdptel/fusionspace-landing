import { describe, expect, it } from "vitest";
import { getProject, liveProjects, projects } from "./projects";

describe("project catalog", () => {
  it("has well-formed, slug-safe ids", () => {
    for (const p of projects) expect(p.id).toMatch(/^[a-z0-9-]+$/);
  });

  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every project a name and description", () => {
    for (const p of projects) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
    }
  });

  it("makes every live project reachable (https href + domain)", () => {
    for (const p of liveProjects) {
      expect(p.status).toBe("live");
      expect(p.href).toMatch(/^https:\/\//);
      expect(p.domain).toBeTruthy();
    }
  });

  it("looks projects up by slug", () => {
    expect(getProject("motor-finder")?.name).toBe("HPR Motor Finder");
    expect(getProject("does-not-exist")).toBeUndefined();
  });
});
