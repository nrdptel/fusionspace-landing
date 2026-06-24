import { liveProjects } from "@/lib/projects";
import { ComingSoonCard, ProjectCard } from "./components/ProjectCard";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fusionspace.co";

// Organization + WebSite structured data, so search engines associate the brand,
// logo, and GitHub with the site. Evaluated at build time and inlined.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#org`,
      name: "Fusion Space",
      url: siteUrl,
      logo: `${siteUrl}/icon-512.png`,
      sameAs: ["https://github.com/nrdptel"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Fusion Space",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#org` },
    },
  ],
};

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      {/* Hero. A soft indigo glow + the rocket mark, the value prop, and a
          primary CTA into the flagship tool. */}
      <section className="relative mt-12 overflow-hidden md:mt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl dark:bg-indigo-500/20"
        />
        <div className="flex flex-col items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/fusion-space-mark.svg"
            alt=""
            aria-hidden
            width={880}
            height={815}
            className="h-12 w-auto md:h-14"
          />
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Free, polished tools for high-power rocketry.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Fusion Space builds and maintains open tools for the hobby rocketry community —
            careful about the data, free to use, and made to be genuinely useful at the bench.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://motor.fusionspace.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Open Motor Finder
              <span aria-hidden>&rarr;</span>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              See all projects
            </a>
          </div>
        </div>
      </section>

      {/* Projects. Driven entirely by lib/projects.ts — adding a tool is a
          one-entry change there. */}
      <section id="projects" className="mt-20 scroll-mt-8 md:mt-28">
        <div className="flex items-baseline justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {liveProjects.length} live
          </span>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {liveProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <ComingSoonCard />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
