import { NextResponse } from "next/server";
// The product site no longer accepts waitlist entries or accesses the former sheet.
export async function POST() {
  return NextResponse.json({ error: "The waitlist is closed. Visit the Quill homepage for app information." }, { status: 410 });
}
