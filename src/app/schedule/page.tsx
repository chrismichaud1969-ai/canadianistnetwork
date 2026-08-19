import type { Metadata } from "next";
import { DAY_ORDER, getScheduleByDay, type ScheduleEntry } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "Schedule",
};

function formatTime(time: string) {
  const [hourStr, minute] = time.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${period}`;
}

function ScheduleRow({ entry }: { entry: ScheduleEntry }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/5 py-4 last:border-b-0 dark:border-white/5">
      <div>
        <p className="font-semibold text-zinc-900 dark:text-zinc-50">
          {entry.show}
        </p>
        {entry.host && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {entry.host}
          </p>
        )}
        {entry.description && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {entry.description}
          </p>
        )}
      </div>
      <p className="shrink-0 whitespace-nowrap text-sm font-medium text-zinc-600 dark:text-zinc-300">
        {formatTime(entry.startTime)} – {formatTime(entry.endTime)}
      </p>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Schedule
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        What&apos;s on The Canadianist Radio, day by day.
      </p>

      <div className="mt-8 space-y-8">
        {DAY_ORDER.map((day) => {
          const entries = getScheduleByDay(day);
          if (entries.length === 0) return null;
          return (
            <section key={day}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                {day}
              </h2>
              <div className="mt-2 rounded-xl border border-black/10 bg-white px-5 dark:border-white/10 dark:bg-zinc-950">
                {entries.map((entry) => (
                  <ScheduleRow key={entry.id} entry={entry} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
