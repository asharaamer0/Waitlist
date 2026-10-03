import { ArrowDown, ArrowUpRight, CornerDownRight } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";
import { HeroThought } from "./HeroThought";

export function Hero() {
  return <section className="hero shell" aria-labelledby="hero-title">
    <div className="hero-edition"><p className="eyebrow hero-enter"><span className="status-dot" /> For people who think out loud</p><span className="edition-mark">Voice → Notes → Recall</span></div>
    <div className="hero-grid">
      <div className="hero-copy">
        <h1 className="hero-title hero-enter" id="hero-title">Go off on<br /><em>a tangent.</em></h1>
        <div className="hero-explanation hero-enter"><CornerDownRight className="hero-margin-mark" size={28} aria-hidden="true" /><div><p className="hero-promise">We’ll keep the thread.</p><p className="hero-sub">Talk it through. Quill finds the key ideas, puts them in order, and makes flashcards for the parts you want to remember.</p></div></div>
        <div className="hero-form-wrap hero-enter"><WaitlistForm id="hero" /></div>
        <p className="hero-platforms hero-enter"><span className="status-dot" /> Closed beta · iOS & Android</p>
      </div>
      <HeroThought />
    </div>
    <div className="hero-bottom"><a className="discover" href="#product"><ArrowDown size={16} aria-hidden="true" /> Follow a thought through Quill</a><p>Say it messy. <span>Keep it clear.</span></p><a className="hero-detail-link" href="#recall">Built to come back to <ArrowUpRight size={16} aria-hidden="true" /></a></div>
  </section>;
}
