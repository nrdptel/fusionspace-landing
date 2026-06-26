/** Faint constellation behind the hero headline. Each sparkle is the same
 * concave 4-point shape as the Fusion Space mark, scattered at fixed positions
 * (deterministic — no random, so SSR and client match) at low opacity. A subset
 * twinkles very slowly; globals.css disables that under prefers-reduced-motion.
 * Purely decorative, so the whole layer is aria-hidden and non-interactive. */

type Star = { top: number; left: number; size: number; opacity: number; delay?: number };

// Twinkling sparkles (slow opacity pulse via .fs-twinkle). The inline opacity is
// the static fallback shown under prefers-reduced-motion.
const TWINKLE: Star[] = [
  { top: 6, left: 7, size: 12, opacity: 0.32, delay: 0 },
  { top: 19, left: 87, size: 16, opacity: 0.32, delay: 1.4 },
  { top: 44, left: 93, size: 12, opacity: 0.28, delay: 2.6 },
  { top: 74, left: 15, size: 11, opacity: 0.3, delay: 0.8 },
  { top: 84, left: 56, size: 12, opacity: 0.26, delay: 3.2 },
  { top: 57, left: 5, size: 14, opacity: 0.26, delay: 1.9 },
];

// Static sparkles — softer, for depth without motion.
const STATIC: Star[] = [
  { top: 5, left: 61, size: 8, opacity: 0.2 },
  { top: 31, left: 25, size: 9, opacity: 0.18 },
  { top: 49, left: 41, size: 7, opacity: 0.15 },
  { top: 63, left: 80, size: 14, opacity: 0.16 },
  { top: 14, left: 45, size: 7, opacity: 0.17 },
  { top: 90, left: 33, size: 9, opacity: 0.16 },
];

const SPARKLE =
  "M12 0C12 6 13.2 10.8 24 12 13.2 13.2 12 18 12 24 12 18 10.8 13.2 0 12 10.8 10.8 12 6 12 0Z";

function Sparkle({ star, twinkle }: { star: Star; twinkle: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`absolute ${twinkle ? "fs-twinkle" : ""}`}
      style={{
        top: `${star.top}%`,
        left: `${star.left}%`,
        width: star.size,
        height: star.size,
        opacity: star.opacity,
        animationDelay: star.delay ? `${star.delay}s` : undefined,
      }}
    >
      <path d={SPARKLE} />
    </svg>
  );
}

export function HeroStars() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden text-indigo-400 dark:text-indigo-300"
    >
      {STATIC.map((s, i) => (
        <Sparkle key={`s${i}`} star={s} twinkle={false} />
      ))}
      {TWINKLE.map((s, i) => (
        <Sparkle key={`t${i}`} star={s} twinkle />
      ))}
    </div>
  );
}
