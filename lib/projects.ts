// The Fusion Space project catalog. Adding a new project to the site is a
// one-entry change here — append an object and it renders on the home page, gets
// its own /projects/<id> detail page, and appears in the sitemap. No other file
// needs to change.
//
// Keep `status: "live"` projects in the order you want them featured (the home
// page renders them top to bottom). Set `status: "soon"` for a teaser card that
// deliberately does NOT over-promise — leave `href` undefined and keep the copy
// vague until the project is real.

export type ProjectStatus = "live" | "soon";

export type ProjectFeature = {
  /** Short feature name. */
  title: string;
  /** One sentence on what it does. */
  detail: string;
};

export type Project = {
  /** Stable slug — used as the React key and the /projects/<id> route. */
  id: string;
  /** Display name. */
  name: string;
  /** One-line description shown on the home-page card. */
  description: string;
  /** Slightly longer one-liner used as the detail page's lead. */
  tagline?: string;
  /** Full description shown on the detail page, one entry per paragraph. */
  longDescription?: string[];
  /** Public URL. Omit for "soon" / unannounced projects. */
  href?: string;
  /** Hostname shown on the card and detail page (e.g. "motor.fusionspace.co"). */
  domain?: string;
  /** Public source repository, if any. */
  repo?: string;
  status: ProjectStatus;
  /** Short tags shown as pills on the card. */
  tags?: string[];
  /** Feature highlights shown on the detail page. */
  features?: ProjectFeature[];
};

export const projects: Project[] = [
  {
    id: "motor-finder",
    name: "HPR Motor Finder",
    description:
      "Live AeroTech, Cesaroni & Loki motor stock and pricing, aggregated across the major " +
      "U.S. vendors and matched against ThrustCurve — so you can see who has a motor in stock " +
      "without checking every vendor by hand.",
    tagline:
      "Live motor stock and pricing across the major U.S. vendors, in one searchable view.",
    longDescription: [
      "HPR Motor Finder pulls high-power rocketry motor availability from the major U.S. " +
        "vendors into one searchable view. It scrapes vendor sites on a schedule, normalizes " +
        "every listing against the ThrustCurve catalog, and shows you who has a given motor in " +
        "stock — so finding an in-stock reload doesn't mean opening ten tabs.",
      "Beyond stock, it tracks pricing over time, suggests in-stock substitutes when a motor " +
        "is sold out everywhere, overlays thrust curves for side-by-side comparison, and can " +
        "email you when a motor restocks. The underlying data is also available as a free, " +
        "no-auth JSON API.",
    ],
    href: "https://motor.fusionspace.co",
    domain: "motor.fusionspace.co",
    repo: "https://github.com/nrdptel/Hobby-Rocket-Motor-Finder",
    status: "live",
    tags: ["Motor availability", "Price tracking", "Free JSON API"],
    features: [
      {
        title: "Unified catalog",
        detail:
          "Search and filter every tracked AeroTech, Cesaroni and Loki motor across vendors in one place.",
      },
      {
        title: "Cross-vendor stock",
        detail: "See who has a motor in stock right now without checking each store yourself.",
      },
      {
        title: "In-stock substitutes",
        detail:
          "When a motor is sold out everywhere, find the closest available alternative by flight profile.",
      },
      {
        title: "Pricing history",
        detail: "Compare prices across vendors and see how they've moved over time.",
      },
      {
        title: "Thrust curves",
        detail: "Per-motor thrust curves, with side-by-side comparison of up to four motors.",
      },
      {
        title: "Restock alerts",
        detail: "Get an email the moment a sold-out motor comes back in stock.",
      },
      {
        title: "Order planning",
        detail: "Plan a multi-motor order across vendors, accounting for shipping.",
      },
      {
        title: "Free JSON API",
        detail: "Public, no-auth API of the live stock and pricing data — no rate limits.",
      },
    ],
  },
];

export const liveProjects = projects.filter((p) => p.status === "live");

/** Look up a live project by its slug (used by the /projects/<id> route). */
export function getProject(id: string): Project | undefined {
  return liveProjects.find((p) => p.id === id);
}
