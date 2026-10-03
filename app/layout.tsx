import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ServiceWorker } from "./components/ServiceWorker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Origin used to resolve OG / Twitter / canonical URLs absolutely. Defaults to
// the production site; override with NEXT_PUBLIC_SITE_URL on the deploy host.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fusionspace.co";

const NAME = "FusionSpace"; // always one word, like the wordmark

const description =
  `${NAME} builds free, polished tools for the high-power rocketry community. ` +
  "Home of the HPR Motor Finder, with more rocketry tools on the way.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: NAME,
    template: `%s · ${NAME}`,
  },
  description,
  applicationName: NAME,
  manifest: "/manifest.webmanifest",
  // app/icon.svg, app/apple-icon.png and app/favicon.ico are picked up automatically.
  // Canonical to the apex so the www and *.pages.dev hostnames don't get indexed
  // as duplicate content — they all resolve to one canonical URL.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: NAME,
    title: NAME,
    description,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: NAME,
    description,
    images: ["/og.png"],
  },
};

// Emits <meta name="color-scheme" content="light dark">. The browser reads this
// during HTML parse — before CSS/JS — and paints the load/reload canvas to match
// the user's OS preference instead of defaulting to white, stopping the white
// flash on refresh for dark-mode users.
export const viewport: Viewport = {
  colorScheme: "light dark",
  // Tints the mobile browser chrome to match each theme's page background
  // (brand Paper and Void).
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F4F7" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F1C" },
  ],
};

// Apply the persisted theme choice as a class on <html>: `dark` or `light` for an
// explicit pick, or NEITHER for "system" (the default) — in which case the
// prefers-color-scheme fallback baked into the `dark:` variant and the html
// background (globals.css) drives the theme, with no script-timing dependency.
// Kept in sync by <ThemeToggle>. `<html suppressHydrationWarning>` lets the class
// the script adds survive hydration.
const themeInit = `(function(){try{var t=localStorage.getItem('fusionspace.theme');var e=document.documentElement;e.classList.toggle('dark',t==='dark');e.classList.toggle('light',t==='light');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-zinc-900 dark:bg-void dark:text-zinc-100">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
