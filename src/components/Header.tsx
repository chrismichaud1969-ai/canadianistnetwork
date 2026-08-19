import Link from "next/link";
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

        {/* Section nav (table of contents) comes in a later pass. */}

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
