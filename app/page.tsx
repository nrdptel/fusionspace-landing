import { liveProjects } from "@/lib/projects";
import { ComingSoonCard, ProjectCard } from "./components/ProjectCard";
import { ThemeToggle } from "./components/ThemeToggle";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-10">
      {/* Header — wordmark + theme toggle, mirroring motor.fusionspace.co. */}
      <header className="flex items-center justify-between gap-4">
        <a
          href="/"
          aria-label="Fusion Space home"
          className="inline-flex items-center rounded-md focus-visible:outline-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/fusion-space-wordmark.svg"
            alt="Fusion Space"
            width={1598}
            height={281}
            className="h-6 w-auto md:h-7"
          />
        </a>
        <ThemeToggle />
      </header>

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

function SiteFooter() {
  const year = 2026;
  return (
    <footer className="mt-20 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 md:mt-28">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href="https://github.com/nrdptel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>
          <span aria-hidden className="text-zinc-300 dark:text-zinc-700">
            ·
          </span>
          <a
            href="https://motor.fusionspace.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            Motor Finder
          </a>
        </nav>

        <div className="flex items-center gap-1.5">
          <span>&copy; {year}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/fusion-space-wordmark.svg"
            alt="Fusion Space"
            width={1598}
            height={281}
            className="h-4 w-auto"
          />
        </div>
      </div>

      <p className="mt-5 max-w-3xl leading-relaxed text-zinc-500 dark:text-zinc-400">
        Personal, non-commercial projects &mdash; not affiliated with any rocketry vendor or
        manufacturer. Built for the hobby rocketry community.
      </p>
    </footer>
  );
}
