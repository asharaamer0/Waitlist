import { NextResponse } from "next/server";
import { z } from "zod";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { waitlistMode } from "../../../lib/waitlist-config";
import { roles, sources } from "../../../lib/waitlist-options";

export const runtime = "nodejs";
const schema = z.object({
  email: z.string().trim().max(254).email().transform(value => value.toLowerCase()),
  consent: z.literal(true),
  name: z.string().trim().min(2).max(100),
  who: z.array(z.enum(roles)).min(1).max(roles.length).transform(values => [...new Set(values)]),
  howHeard: z.union([z.enum(sources), z.literal("")]).optional().default(""),
});
type Entry = z.infer<typeof schema> & { createdAt: string };
// Serialise read + append within a server instance, including local demo writes.
// Google Sheets is not an atomic unique-key database; see README deployment note.
let queue: Promise<unknown> = Promise.resolve();

function locked<T>(operation: () => Promise<T>): Promise<T> {
  const result = queue.then(operation, operation);
  queue = result.catch(() => undefined);
  return result;
}

export async function POST(request: Request) {
  if (request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Please join from the Quill website." }, { status: 403 });
  }
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 8192) return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const field = String(parsed.error.issues[0]?.path[0] || "email");
    const messages: Record<string, string> = { name: "Please enter your full name (2–100 characters).", email: "Enter a valid email address.", who: "Choose at least one of the listed roles.", howHeard: "Choose one of the listed referral sources, or leave it blank.", consent: "Please agree to receive your early-access invitation." };
    return NextResponse.json({ code: "VALIDATION_ERROR", field, error: messages[field] || "Check your details and try again." }, { status: 400 });
  }
  const entry: Entry = { ...parsed.data, createdAt: new Date().toISOString() };
  const mode = waitlistMode();
  const demo = mode === "local";
  if (mode === "unconfigured") {
    return NextResponse.json({ code: "WAITLIST_NOT_CONFIGURED", error: "Signups aren’t open on this server yet. The waitlist storage needs to be connected." }, { status: 503 });
  }
  try {
    const duplicate = await locked(async () => {
      if (demo) {
        const file = resolve(process.env.WAITLIST_LOCAL_FILE || ".data/waitlist.json");
        let entries: Entry[] = [];
        try { entries = JSON.parse(await readFile(file, "utf8")); }
        catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
        if (entries.some(item => item.email.toLowerCase() === entry.email)) return true;
        entries.push(entry);
        await mkdir(dirname(file), { recursive: true });
        await writeFile(file + ".tmp", JSON.stringify(entries, null, 2), { mode: 0o600 });
        await rename(file + ".tmp", file);
        return false;
      }
      const { google } = await import("googleapis");
      const auth = new google.auth.GoogleAuth({
        credentials: { client_email: process.env.GOOGLE_CLIENT_EMAIL, private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      const sheets = google.sheets({ version: "v4", auth });
      const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
      const existing = await sheets.spreadsheets.values.get({ spreadsheetId, range: "Sheet1!C:C" });
      if (existing.data.values?.some(row => String(row[0]).trim().toLowerCase() === entry.email)) return true;
      await sheets.spreadsheets.values.append({
        spreadsheetId, range: "Sheet1!A:E", valueInputOption: "RAW",
        requestBody: { values: [[entry.createdAt, entry.name, entry.email, entry.who.join(", "), entry.howHeard]] },
      });
      return false;
    });
    return NextResponse.json({ success: !duplicate, duplicate, demo }, { status: duplicate ? 409 : 201, headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Quill waitlist: storage operation failed");
    return NextResponse.json({ error: "We couldn’t save your place. Please try again." }, { status: 503 });
  }
}
