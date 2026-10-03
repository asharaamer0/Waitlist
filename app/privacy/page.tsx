import type { Metadata } from "next";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { waitlistMode } from "../../lib/waitlist-config";

export const metadata: Metadata = { title: "Waitlist privacy", alternates: { canonical: "/privacy" } };
export const dynamic = "force-dynamic";

export default function Privacy() {
  const demo = waitlistMode() === "local";
  return <><Nav /><main className="shell privacy-page" id="main">
    <p className="eyebrow">Effective 4 October 2026</p>
    <h1>Waitlist privacy.</h1>
    <p>When you join, Quill collects your name, email address, chosen roles, optional referral source, your permission to contact you about early access, and the time you signed up. No account is created.</p>
    <h2>Where your email goes</h2>
    <p>{demo ? "This is a local demo. Entries are saved on the computer running this website. No invitation emails are sent." : "Waitlist entries are stored in a private Google Sheet, accessible to the Quill team. Your details are used to manage the waitlist and send early-access invitations."}</p>
    <h2>Early access only</h2>
    <p>We do not sell your email or use it for unrelated marketing. This page uses no analytics or advertising trackers.</p>
    <h2>Your choice</h2>
    <p>You can withdraw your permission, request a copy, correct your address, or ask us to delete your entry by emailing <a className="privacy-email" href="mailto:helloasharaamer@gmail.com">helloasharaamer@gmail.com</a>. Entries are kept only while the waitlist is active.</p>
    <h2>Older entries</h2>
    <p>If you joined using our previous form, your entry may also contain your name, chosen roles, and referral source. The same purpose and deletion options apply.</p>
    <a className="text-link" href="/">← Back to Quill</a>
  </main><Footer /></>;
}
