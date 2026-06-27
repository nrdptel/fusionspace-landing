import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, liveProjects } from "@/lib/projects";
import { ArrowLeft, ArrowUpRight } from "../../components/icons";
import { LiveStats } from "../../components/LiveStats";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fusionspace.co";

// Static export needs the full set of slugs up front — one page per live project.
export function generateStaticParams() {
  return liveProjects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = project.tagline ?? project.description;
  return {
    title: project.name,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: "website",
      siteName: "Fusion Space",
      title: `${project.name} · Fusion Space`,
      description,
      url: `/projects/${project.id}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Fusion Space" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} · Fusion Space`,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const paragraphs = project.longDescription ?? [project.description];
  const features = project.features ?? [];

  // SoftwareApplication structured data — this page describes a web app.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    description: project.tagline ?? project.description,
    url: project.href,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Fusion Space", url: siteUrl },
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <div className="mt-10 md:mt-14">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>
      </div>

      <article className="mt-6">
        <header className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            Live
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{project.name}</h1>
          {project.tagline && (
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.tagline}
            </p>
          )}

          {project.statsApi && <LiveStats api={project.statsApi} className="mt-4" />}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Visit {project.domain ?? "site"}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Source
              </a>
            )}
          </div>
        </header>

        <section className="mt-8 max-w-2xl space-y-4 text-zinc-700 dark:text-zinc-300">
          {paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))}
        </section>

        {features.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-semibold tracking-tight">What it does</h2>
            <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <li
                  key={f.title}
                  className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
                >
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {f.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.href && (
          <section className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-semibold tracking-tight">Try it out</h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Free to use, no account required.
                </p>
              </div>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Visit {project.domain ?? "site"}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        )}
      </article>

      <SiteFooter />
    </main>
  );
}
