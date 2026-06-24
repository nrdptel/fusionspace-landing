import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-start justify-center px-4 py-20 md:px-6">
      <p className="font-mono text-sm text-indigo-600 dark:text-indigo-400">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-lg text-zinc-600 dark:text-zinc-400">
        That page doesn&apos;t exist. Head back to the Fusion Space home page to find what
        you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
      >
        <span aria-hidden>&larr;</span>
        Back home
      </Link>
    </main>
  );
}
