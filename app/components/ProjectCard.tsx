import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ArrowRight } from "./icons";
import { LiveStats } from "./LiveStats";
import { StatusBadge } from "./StatusBadge";

/** A single project tile. The whole card links to the project's detail page
 * (/projects/<id>); the detail page is where the outbound "visit site" / "source"
 * links live. The "soon" teaser is a non-interactive dashed card that
 * intentionally stays vague (no link, no name) so it never over-promises. */
export function ProjectCard({ project }: { project: Project }) {
  const tags = project.tags ?? [];

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-indigo-400 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-indigo-500/60"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {project.name}
        </h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>

      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-5">
        {project.statsApi && <LiveStats api={project.statsApi} className="mb-3" />}
        <div className="flex items-center justify-between gap-3">
          {project.domain && (
            <span className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-500">
              {project.domain}
            </span>
          )}
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-indigo-600 transition group-hover:gap-1.5 dark:text-indigo-400">
            View project
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** The deliberately understated "more on the way" tile. No name, no date, no
 * link — a promise of more without a promise we can't keep yet. */
export function ComingSoonCard() {
  return (
    <div className="flex h-full flex-col justify-center rounded-xl border border-dashed border-zinc-300 bg-transparent p-5 dark:border-zinc-700/70">
      <h3 className="text-base font-semibold tracking-tight text-zinc-500 dark:text-zinc-400">
        More on the way
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
        More free tools for the high-power rocketry community are in the workshop. New projects
        land here as they ship.
      </p>
    </div>
  );
}
