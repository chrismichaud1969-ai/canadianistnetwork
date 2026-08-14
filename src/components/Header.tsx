import Link from "next/link";
import { slugifyCategory } from "@/lib/articles";
import { SITE_NAME } from "@/lib/config";

export default function Header() {
  return (
    <header className="border-b border-black/10 bg-white dark:border-white/10 dark:bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-red-600 text-sm font-bold text-white">
            CI
          </span>
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href={`/category/${slugifyCategory("Major News")}`}
            className="text-sm font-medium text-zinc-600 transition hover:text-red-600 dark:text-zinc-300 dark:hover:text-red-500"
          >
            Major News
          </Link>
        </nav>

        <Link
          href="/#newsletter"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Subscribe
        </Link>
      </div>
    </header>
  );
}
