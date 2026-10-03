import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { FlashcardPreview } from "../components/FlashcardPreview";
import { ProductDemo } from "../components/ProductDemo";
import { Motion } from "../components/Motion";
import { Nav } from "../components/Nav";
import { WaitlistForm } from "../components/WaitlistForm";
import { waitlistMode } from "../lib/waitlist-config";

export const dynamic = "force-dynamic";

export default function Home() {
  const demo = waitlistMode() === "local";
  return <>
    <Nav />
    {demo && <div className="demo-banner" role="note">Local preview · signups are saved on this computer. No invitation emails are sent.</div>}
    <Motion>
      <main id="main">
        <Hero />
        <ProductDemo />
        <FlashcardPreview />
        <section className="final-section" id="waitlist" aria-labelledby="waitlist-title">
          <div className="shell final-grid">
            <div><p className="eyebrow"><span className="status-dot" /> A little less to remember</p><h2 id="waitlist-title">Your next thought<br /><em>deserves a home.</em></h2></div>
            <div className="final-signup"><p>Quill is in closed beta.<br />Tell us a little about yourself. We’ll be in touch when your invitation is ready.</p><WaitlistForm /></div>
          </div>
        </section>
      </main>
    </Motion>
    <Footer />
  </>;
}
