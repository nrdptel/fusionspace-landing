import Link from "next/link";
import { KofiButton } from "./KofiButton";
import { ThemeToggle } from "./ThemeToggle";

/** Wordmark + support/theme controls, shared by every page so the chrome is
 * identical — and matched to motor.fusionspace.co's header (Tip + theme) so the
 * sites read as one family. */
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
      <div className="flex items-center gap-2">
        <KofiButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
