export type LiveCounts = {
  motors?: number;
  in_stock?: number;
  vendors?: number;
};

/** Build the live stat line ("598 motors · 396 in stock now · 11 vendors ·
 * updated hourly") from a project's API counts, or null if there's nothing
 * usable. Pure and framework-free so it's unit-testable without a DOM; the
 * <LiveStats> client component renders whatever this returns. Locale is pinned to
 * en-US so the thousands separators are stable regardless of where it runs. */
export function formatLiveStats(counts: LiveCounts | null | undefined): string | null {
  if (!counts) return null;
  const parts: string[] = [];
  if (typeof counts.motors === "number") {
    parts.push(`${counts.motors.toLocaleString("en-US")} motors`);
  }
  if (typeof counts.in_stock === "number") {
    parts.push(`${counts.in_stock.toLocaleString("en-US")} in stock now`);
  }
  if (typeof counts.vendors === "number") {
    parts.push(`${counts.vendors.toLocaleString("en-US")} vendors`);
  }
  if (parts.length === 0) return null;
  return `${parts.join(" · ")} · updated hourly`;
}
