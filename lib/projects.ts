// The Fusion Space project catalog. Adding a new project to the landing page is
// a one-entry change here — append an object and it renders on the home page,
// in the sitemap, and anywhere else the list is consumed. No other file needs to
// change.
//
// Keep `status: "live"` projects in the order you want them featured (the home
// page renders them top to bottom). Set `status: "soon"` for a teaser card that
// deliberately does NOT over-promise — leave `href` undefined and keep the copy
// vague until the project is real.

export type ProjectStatus = "live" | "soon";

export type Project = {
  /** Stable slug, used as a React key and for anchor links. */
  id: string;
  /** Display name. */
  name: string;
  /** One-line description shown on the card. */
  description: string;
  /** Public URL. Omit for "soon" / unannounced projects. */
  href?: string;
  /** Hostname shown on the card (e.g. "motor.fusionspace.co"). */
  domain?: string;
  /** Public source repository, if any. */
  repo?: string;
  status: ProjectStatus;
  /** Short tags shown as pills on the card. */
  tags?: string[];
};

export const projects: Project[] = [
  {
    id: "motor-finder",
    name: "HPR Motor Finder",
    description:
      "Live AeroTech, Cesaroni & Loki motor stock and pricing, aggregated across the major " +
      "U.S. vendors and matched against ThrustCurve — so you can see who has a motor in stock " +
      "without checking every vendor by hand.",
    href: "https://motor.fusionspace.co",
    domain: "motor.fusionspace.co",
    repo: "https://github.com/nrdptel/Hobby-Rocket-Motor-Finder",
    status: "live",
    tags: ["Motor availability", "Price tracking", "Free JSON API"],
  },
];

export const liveProjects = projects.filter((p) => p.status === "live");
