import Link from "next/link";
import { categories } from "@/lib/articles";
import { SITE_NAME } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-zinc-50 pb-24 dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            {SITE_NAME}
          </p>
          <p className="mt-2 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
            Canadian news and live radio, coast to coast to coast.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Sections
          </p>
          <ul className="mt-3 space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/category/${category.toLowerCase()}`}
                  className="text-sm text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-500"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Stay connected
          </p>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Get the day&apos;s top stories in your inbox.
          </p>
          <Link
            href="/#newsletter"
            className="mt-3 inline-block text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Sign up for the newsletter →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-4 text-xs text-zinc-400 sm:px-6">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
