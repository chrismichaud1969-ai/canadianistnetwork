import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    console.warn(
      "[subscribe] Mailchimp env vars are not configured (MAILCHIMP_API_KEY, " +
        "MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID). Logging signup instead: " +
        email
    );
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
    }),
  });

  if (res.ok) {
    return NextResponse.json({ ok: true, mode: "mailchimp" });
  }

  const data = await res.json().catch(() => null);

  // Mailchimp returns 400 "Member Exists" for repeat signups — treat that
  // as success rather than surfacing it as an error to the user.
  if (data?.title === "Member Exists") {
    return NextResponse.json({ ok: true, mode: "mailchimp", alreadySubscribed: true });
  }

  console.error("[subscribe] Mailchimp error:", data);
  return NextResponse.json(
    { error: "We couldn't complete your signup. Please try again later." },
    { status: 502 }
  );
}
