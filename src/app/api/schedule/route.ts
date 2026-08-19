import { NextResponse } from "next/server";
import { getSchedule } from "@/lib/schedule";

// Public read-only feed of the radio schedule, consumed by the web app and
// the React Native mobile app so both stay in sync with a single source.
export async function GET() {
  return NextResponse.json(
    { schedule: getSchedule() },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
  );
}
