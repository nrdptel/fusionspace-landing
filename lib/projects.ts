// The Fusion Space project catalog. Adding a new project to the site is a
// one-entry change here — append an object and it renders on the home page, gets
// its own /projects/<id> detail page, and appears in the sitemap. No other file
// needs to change.
//
// Every entry is rendered as a card on the home page (in array order) and gets a
// /projects/<id> detail page. Use `status: "live"` for shipped tools (green "Live"
// badge) and `status: "in-progress"` for a tool that's announced but still being
// built (amber "In development" badge). For genuinely unannounced work, add
// nothing here — the static "More on the way" card on the home page covers it
// without naming anything.

export type ProjectStatus = "live" | "in-progress";

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
  {
    id: "window",
    name: "Window",
    description:
      "A launch-weather board for US high-power and model rocketry: surface wind against the " +
      "20 mph limit, winds aloft up to waiver altitude, storms, cloud ceiling, and a multi-day " +
      "outlook for any field — one honest view, fetched live in your browser. No go/no-go verdict.",
    tagline:
      "Launch weather for high-power rocketry — surface wind against the limit, winds aloft to waiver altitude, and a multi-day outlook for any field.",
    longDescription: [
      "Window shows the weather a flyer needs to decide whether to fly: surface wind and gusts " +
        "against the 20 mph NFPA/NAR/Tripoli limit, winds aloft by true height up to waiver " +
        "altitude, density altitude, storm potential (CAPE), cloud ceiling and visibility, air " +
        "quality, active NWS alerts, and a multi-day outlook — for any launch field, in one " +
        "glanceable view.",
      "It's purely informational: it takes no rocket parameters and produces no go/no-go " +
        "verdict. It surfaces the data and the reference lines — the wind limit, the winds-aloft " +
        "profile, the ceiling — and leaves the call to you and your field's rules. Every figure " +
        "carries its source and valid time, fetched live in your browser.",
    ],
    href: "https://window.fusionspace.co",
    domain: "window.fusionspace.co",
    repo: "https://github.com/nrdptel/fusionspace-window",
    status: "live",
    tags: ["Launch weather", "Winds aloft", "In-browser"],
    features: [
      {
        title: "Surface wind vs the limit",
        detail:
          "Wind, gust, and direction against the 20 mph launch limit, with a steadiness read and a cross-check against the nearest station's observed wind.",
      },
      {
        title: "Winds aloft",
        detail:
          "Wind speed and direction by true height, surface up to waiver altitude — flagging the strongest shear layer and the mean wind, and turning your descent rate and apogee into a landing-drift distance.",
      },
      {
        title: "Storm potential",
        detail: "Convective instability (CAPE) now and at the day's peak, in the bands meteorologists use.",
      },
      {
        title: "Density altitude",
        detail:
          "How thin the air is — which sets thrust and descent — alongside temperature, sky, and a pressure tendency.",
      },
      {
        title: "Calm windows",
        detail:
          "An hourly wind timeline that surfaces upcoming calm windows; drag a fly-time slider to any hour and the whole view follows.",
      },
      {
        title: "Sky, ceiling & air quality",
        detail:
          "Observed ceiling and visibility from the nearest station — read as a go/no-go gate against your apogee — plus US AQI and smoke/dust particulate.",
      },
      {
        title: "Multi-day outlook",
        detail:
          "A ~7-day view with each day's calmest flyable window, set against the field's seasonal normal.",
      },
      {
        title: "Field briefing",
        detail: "Copy a plain-text conditions summary for the club chat, or a link to the exact view.",
      },
    ],
  },
  {
    id: "muster",
    name: "Muster",
    description:
      "Motor-hardware compatibility for high-power rocketry. Pick a reloadable case — AeroTech " +
      "RMS, Cesaroni Pro, or Loki Research — and see every reload it flies, the closures and " +
      "spacers each needs, its certification, and the full reusable-hardware shopping list. Or " +
      "start from a reload and work back to the cases and parts that fly it.",
    tagline:
      "Map reloadable motor hardware end to end — every reload a case flies, the closures and spacers each needs, and the parts to buy.",
    longDescription: [
      "Reloadable motor hardware is a graph, and it's easy to get lost in it: a case flies some " +
        "reloads directly and others only with spacers, each reload needs the right closures, and " +
        "a few need a seal disc or a plugged closure. Muster makes that graph interactive across " +
        "AeroTech RMS, Cesaroni Pro, and Loki Research. Tell it a case you own and it lists every " +
        "reload it can fly — direct or with spacers — each reload's certification, and the complete " +
        "list of reusable hardware to buy. Or start from a reload and it works back to the cases " +
        "and hardware that fly it.",
      "Every fit is typed — direct versus spacer, and how many spacers — never a bare yes/no, and " +
        "the tool won't invent a cross-brand fit beyond the 75/98 mm crossloads the manufacturers " +
        "publish. A companion kit planner turns the same graph on your own hardware: check off the " +
        "cases and adapters you own and it ranks the single purchase that unlocks the most new " +
        "reloads. Muster is a shopping aid, not an assembly guide — the reload's printed " +
        "instructions are always the authority on the hardware it needs.",
    ],
    href: "https://muster.fusionspace.co",
    domain: "muster.fusionspace.co",
    repo: "https://github.com/nrdptel/fusionspace-muster",
    status: "live",
    tags: ["Motor hardware", "Reload compatibility", "In-browser"],
    features: [
      {
        title: "Both directions",
        detail:
          "Start from a case to see every reload it flies, or from a reload to find the cases and hardware that fly it.",
      },
      {
        title: "Typed fits",
        detail:
          "Direct fits and spacer fits are distinguished — and spacer fits grouped by how many spacers they need — never a bare yes/no.",
      },
      {
        title: "Shopping list",
        detail:
          "Reusable hardware to own once — case, closures, seal disc, adapter — separated from the single-use reload, with part numbers and a plain-text copy.",
      },
      {
        title: "Three systems",
        detail:
          "AeroTech RMS, Cesaroni Pro, and Loki Research, with the manufacturer-published 75/98 mm crossloads shown as a distinct caution, never a resolved fit.",
      },
      {
        title: "Kit planner",
        detail:
          "Check off the hardware you own and it ranks the single purchase that unlocks the most new reloads — kept on your device.",
      },
      {
        title: "Certification as a dimension",
        detail:
          "Each reload carries its certifying body, with out-of-production shown as its own status — never conflated with decertified.",
      },
      {
        title: "Sourced end to end",
        detail:
          "The reload catalog mirrors ThrustCurve; the hardware graph is curated by hand from manufacturer data, with a source on every part and rule.",
      },
      {
        title: "A page for every part",
        detail:
          "Each case and reload has its own deep-linkable, static page — cross-linked, in the sitemap, and leading back into the interactive tool.",
      },
    ],
  },
  {
    id: "debrief",
    name: "Debrief",
    description:
      "A universal, in-browser altimeter flight-log analyzer. Drop in a file from any logger and " +
      "get apogee, max velocity, max-Q and the curves that matter — with the real-world mess " +
      "(ejection spikes, sensor noise, mixed units) handled. Analyzes flights you've already " +
      "flown; not a simulator.",
    tagline:
      "Drop in an altimeter flight log and get one clean, correctly-analyzed flight — the headline numbers and the curves that matter.",
    longDescription: [
      "Debrief reads a flight log from any altimeter and turns it into one clean, " +
        "correctly-analyzed flight: apogee, max velocity (and Mach), max acceleration, max-Q, " +
        "burnout, deployments, descent rates, and flight time — with altitude, velocity, and " +
        "acceleration plotted against time and the key events marked. It handles the real-world " +
        "mess (ejection spikes, sensor noise, mixed sample rates, units) so the numbers are honest.",
      "It shows its work — overlay the raw trace on the cleaned line, open the full channel " +
        "explorer to plot anything the logger recorded (plus derived Mach and dynamic pressure), " +
        "and export the analyzed series as CSV or the charts as PNG. Debrief analyzes flights " +
        "you've already flown — it's not a simulator and doesn't predict performance.",
    ],
    href: "https://debrief.fusionspace.co",
    domain: "debrief.fusionspace.co",
    repo: "https://github.com/nrdptel/fusionspace-debrief",
    status: "in-progress",
    tags: ["Flight-log analysis", "Altimeter data", "In-browser"],
    features: [
      {
        title: "Any logger",
        detail: "Reads flight files from common altimeters and normalizes units, sample rates, and channels.",
      },
      {
        title: "Headline numbers",
        detail:
          "Apogee, max velocity (and Mach), max acceleration, max-Q, burnout, deployments, descent rates, flight time.",
      },
      {
        title: "The curves that matter",
        detail:
          "Altitude, velocity, and acceleration vs time, with liftoff, burnout, apogee, deploy, and landing marked.",
      },
      {
        title: "Real apogee",
        detail:
          "A median filter removes the single-sample spike an ejection charge punches into a barometric trace.",
      },
      {
        title: "Channel explorer",
        detail:
          "Plot anything the logger recorded — plus derived Mach and dynamic pressure — with live stats over the zoomed window.",
      },
      {
        title: "Shows its work",
        detail: "Overlay the raw trace on the cleaned line to see exactly what spike-removal took out.",
      },
      {
        title: "Exports",
        detail: "Copy a text summary, save the analyzed series as CSV, or save the charts as PNG.",
      },
      {
        title: "On-device logbook",
        detail: "Recent flights are remembered in your browser for quick re-opening — nothing leaves your device.",
      },
    ],
  },
  {
    id: "loft",
    name: "Loft",
    description:
      "A high-power rocketry flight simulator that runs in your browser and on a phone. Import " +
      "an OpenRocket .ork design and get apogee, max velocity and Mach, stability margin, " +
      "rail-exit speed, and descent and drift — with the model's assumptions and accuracy shown " +
      "against OpenRocket's own stored results. No accounts, no tracking, no go/no-go verdicts.",
    tagline:
      "Import an OpenRocket design and simulate the flight in your browser — apogee, Mach, stability, and drift, checked against OpenRocket's own numbers.",
    longDescription: [
      "Loft simulates a high-power rocket flight from an OpenRocket .ork design, entirely in your " +
        "browser. Import a file and it reads the component tree, materials, motor mounts, and " +
        "recovery, then flies it with a standard-atmosphere model, Barrowman stability, a " +
        "component-buildup drag model, real motor thrust curves resolved from a bundled ThrustCurve " +
        "database, and a Runge–Kutta integrator — returning apogee, max velocity and Mach, rail-exit " +
        "and burnout speed, descent rate and drift, dynamic pressure, and the timings, with plots " +
        "and a phase-coloured flight path.",
      "It measures its own accuracy rather than assuming it: Loft re-flies your design under the " +
        "launch conditions OpenRocket stored in the file and diffs each metric, so the agreement is " +
        "shown, not claimed. It can also re-fly for today's weather from live winds aloft, warns " +
        "when a flight runs outside the drag model's validated envelope, and links every calculation " +
        "to its source in a candid limitations log. Every figure is an estimate from a model, not a " +
        "measurement, and never a go/no-go verdict — the motor's printed data and your RSO are " +
        "authoritative.",
    ],
    href: "https://loft.fusionspace.co",
    domain: "loft.fusionspace.co",
    repo: "https://github.com/nrdptel/fusionspace-loft",
    status: "in-progress",
    tags: ["Flight simulation", "OpenRocket import", "In-browser"],
    features: [
      {
        title: "OpenRocket import",
        detail:
          "Reads .ork files (gzip-wrapped or raw XML) — component tree, materials, motor mounts, recovery, and stored results — degrading gracefully on anything unrecognised.",
      },
      {
        title: "Full flight simulation",
        detail:
          "A standard atmosphere, Barrowman stability, a component-buildup drag model, real thrust curves, and a Runge–Kutta integrator with 6-DOF-shaped state.",
      },
      {
        title: "The numbers that matter",
        detail:
          "Apogee, max velocity/Mach/acceleration, rail-exit and burnout velocity, descent rate and drift, dynamic pressure, and timings — metric or imperial.",
      },
      {
        title: "Checked against OpenRocket",
        detail:
          "Flies your design under its own stored launch conditions and diffs each metric, so the accuracy is measured and shown, not assumed.",
      },
      {
        title: "Resolves real thrust curves",
        detail:
          "A .ork names a motor but embeds no curve — Loft resolves it against a bundled offline ThrustCurve database, and flags an approximate or missing match.",
      },
      {
        title: "Today's weather",
        detail:
          "Optionally pulls live surface conditions and winds aloft for a launch site to see how density and wind change apogee and drift.",
      },
      {
        title: "Warns on extrapolation",
        detail:
          "Marginal stability, low rail-exit speed, and transonic flight outside the drag model's envelope are flagged — without ever issuing a verdict.",
      },
      {
        title: "Shows its work",
        detail:
          "Every calculation links to its published source, with a candid limitations log and validation section — the math is meant to be checked, not trusted.",
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

// Just the shipped tools — used for the "N live" counter.
export const liveProjects = projects.filter((p) => p.status === "live");

/** Look up any project (live or in-progress) by its slug — used by the
 * /projects/<id> route, so in-development tools get a detail page too. */
export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
