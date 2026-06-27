import type { ProjectStatus } from "@/lib/projects";

const STYLES: Record<ProjectStatus, { label: string; pill: string; dot: string }> = {
  live: {
    label: "Live",
    pill: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  "in-progress": {
    label: "In development",
    pill: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
};

/** Small status pill shared by the project card and the detail page: a green
 * "Live" for shipped tools, an amber "In development" for ones still being built. */
export function StatusBadge({ status, className = "" }: { status: ProjectStatus; className?: string }) {
  const s = STYLES[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${s.pill} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
      {s.label}
    </span>
  );
}
