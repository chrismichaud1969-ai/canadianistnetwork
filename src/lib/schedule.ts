export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type ScheduleEntry = {
  id: string;
  show: string;
  host?: string;
  days: DayOfWeek[];
  startTime: string; // 24h "HH:mm"
  endTime: string; // 24h "HH:mm"
  description?: string;
};

const DAY_ORDER: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// NOTE: Placeholder programming so the Schedule page has something to show.
// Replace with the real lineup from radio.thecanadianist.news — every page
// reads through the helpers below, so this is the only file that needs to
// change.
export const schedule: ScheduleEntry[] = [
  {
    id: "morning-drive",
    show: "Morning Drive",
    host: "The Canadianist Radio Desk",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    startTime: "06:00",
    endTime: "09:00",
    description: "News, traffic, and interviews to start the day.",
  },
  {
    id: "midday-report",
    show: "Midday Report",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    startTime: "12:00",
    endTime: "13:00",
    description: "A closer look at the day's top national stories.",
  },
  {
    id: "drive-home",
    show: "Drive Home",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    startTime: "16:00",
    endTime: "18:00",
    description: "Commute coverage with sports and business updates.",
  },
  {
    id: "weekend-edition",
    show: "Weekend Edition",
    days: ["Saturday", "Sunday"],
    startTime: "09:00",
    endTime: "11:00",
    description: "The week's biggest stories, revisited.",
  },
];

export function getSchedule(): ScheduleEntry[] {
  return [...schedule].sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function getScheduleByDay(day: DayOfWeek): ScheduleEntry[] {
  return getSchedule().filter((entry) => entry.days.includes(day));
}

export { DAY_ORDER };
