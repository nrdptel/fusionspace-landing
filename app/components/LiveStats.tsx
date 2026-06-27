"use client";

import { useEffect, useState } from "react";

type Counts = { motors?: number; in_stock?: number; vendors?: number };

/** A live stat line fetched entirely in the browser from a project's CORS-open
 * JSON endpoint — no server, no Pages Functions. Renders nothing until the data
 * arrives, and nothing at all if the request fails or the shape is unexpected, so
 * the card / detail page always reads fine without it. Server-render is null too
 * (data only exists after the client fetch), so there's no hydration mismatch. */
export function LiveStats({ api, className = "" }: { api: string; className?: string }) {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(api, { signal: ctrl.signal, headers: { accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { counts?: Counts } | null) => {
        if (data?.counts) setCounts(data.counts);
      })
      .catch(() => {
        /* offline / blocked / 4xx — leave it absent rather than show an error */
      });
    return () => ctrl.abort();
  }, [api]);

  if (!counts) return null;

  const parts: string[] = [];
  if (typeof counts.motors === "number") parts.push(`${counts.motors.toLocaleString()} motors`);
  if (typeof counts.in_stock === "number") {
    parts.push(`${counts.in_stock.toLocaleString()} in stock now`);
  }
  if (typeof counts.vendors === "number") parts.push(`${counts.vendors} vendors`);
  if (parts.length === 0) return null;

  return (
    <p
      className={`flex items-center gap-1.5 text-xs tabular-nums text-zinc-500 dark:text-zinc-400 ${className}`}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 motion-safe:animate-pulse"
        title="Live data"
      />
      <span>{parts.join(" · ")} · updated hourly</span>
    </p>
  );
}
