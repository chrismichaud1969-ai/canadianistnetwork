import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        Page not found
      </h1>
      <p className="mt-3 text-zinc-500 dark:text-zinc-400">
        The story you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
      >
        Back to the front page
      </Link>
    </div>
  );
}
