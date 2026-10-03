export function waitlistMode(): "local" | "sheets" | "unconfigured" {
  const configured = Boolean(process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID);
  if (process.env.WAITLIST_STORE === "local") return "local";
  if (configured) return "sheets";
  // Fresh checkouts get a working, labelled local form. Production never silently falls back.
  if (process.env.NODE_ENV === "development" && process.env.WAITLIST_STORE !== "sheets") return "local";
  return "unconfigured";
}
