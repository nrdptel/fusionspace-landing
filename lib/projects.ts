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
  /** A CORS-open JSON endpoint exposing `{ counts: { motors, in_stock, vendors } }`,
   * fetched client-side to show a live stat line. Omit if the project has none. */
  statsApi?: string;
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
    statsApi: "https://motor.fusionspace.co/api/v1/meta.json",
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
  {
    id: "charge",
    name: "Charge",
    description:
      "A black-powder ejection-charge calculator for high-power rocketry: size by chamber " +
      "pressure or shear-pin force, see every constant in the formula, and close the loop with " +
      "a ground-test log so you fly the charge you actually validated.",
    tagline:
      "Size black-powder ejection charges — then validate them against your own ground tests.",
    longDescription: [
      "Charge sizes the black-powder ejection charge for your airframe. Give it the tube inner " +
        "diameter, the length of the pressurized section, and how hard the airframe is to " +
        "separate — a target pressure, or shear pins plus friction — and it returns a starting " +
        "charge in grams, showing the full formula and every constant so the number is never a " +
        "black box.",
      "It's built around the loop every flyer runs: size, ground-test, validate, fly. A " +
        "browser-local ground-test log surfaces the charge you actually proved on the bench " +
        "above the estimate, warns when your setup has drifted from what you tested, and exports " +
        "a build/ground-test card and recovery report for a cert package. Always ground-test a " +
        "charge before you fly it.",
    ],
    href: "https://charge.fusionspace.co",
    domain: "charge.fusionspace.co",
    repo: "https://github.com/nrdptel/fusionspace-charge",
    status: "live",
    tags: ["Ejection charges", "Ground-test log", "Sizing calculator"],
    features: [
      {
        title: "Pressure or force sizing",
        detail:
          "Size by target chamber pressure, or by separation force — shear pins (with presets) plus friction.",
      },
      {
        title: "Built-in safety margin",
        detail:
          "Size above the bare separation force or your target pressure, so a leaky real airframe still separates.",
      },
      {
        title: "Single & dual-deploy",
        detail:
          "Separate drogue and main wells, with redundant backup charges for a second altimeter.",
      },
      {
        title: "Vent-hole sizing",
        detail:
          "Size the static sampling ports for your altimeter bay by the standard one-port-per-100-in³ rule.",
      },
      {
        title: "Shows all the math",
        detail:
          "The full formula, every constant, and a worked example from your own inputs — with references.",
      },
      {
        title: "Ground-test log",
        detail:
          "Keep a browser-local log of bench tests — the charge that actually separated the airframe is the one to fly.",
      },
      {
        title: "Closes the loop",
        detail:
          "Surfaces your validated charge above the estimate and warns if the setup has drifted from what you tested.",
      },
      {
        title: "Cards & reports",
        detail:
          "Export a build/ground-test card and a recovery report as HTML or PDF — self-contained and offline.",
      },
    ],
  },
];

// Build-time sanity check on the catalog. This runs when the module is imported
// during `next build`, so a malformed entry fails the build with a clear message
// instead of silently shipping a broken card / detail page. Cheap insurance for
// the "add a project = one entry" workflow.
(function validateProjects() {
  const seen = new Set<string>();
  for (const p of projects) {
    if (!/^[a-z0-9-]+$/.test(p.id)) {
      throw new Error(`Invalid project id "${p.id}" — use lowercase letters, digits, and dashes.`);
    }
    if (seen.has(p.id)) throw new Error(`Duplicate project id "${p.id}" in lib/projects.ts.`);
    seen.add(p.id);
    if (!p.name || !p.description) {
      throw new Error(`Project "${p.id}" is missing a name or description.`);
    }
    // A "live" project must actually be reachable — its card and detail page link out.
    if (p.status === "live" && !p.href) {
      throw new Error(`Live project "${p.id}" needs an href.`);
    }
  }
})();

export const liveProjects = projects.filter((p) => p.status === "live");

/** Look up a live project by its slug (used by the /projects/<id> route). */
export function getProject(id: string): Project | undefined {
  return liveProjects.find((p) => p.id === id);
}
