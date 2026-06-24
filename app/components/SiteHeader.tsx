import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

/** Wordmark + theme toggle, shared by every page so the chrome is identical. */
export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      <Link
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
      </Link>
      <ThemeToggle />
    </header>
  );
}
