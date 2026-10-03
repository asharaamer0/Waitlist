import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { FlashcardPreview } from "../components/FlashcardPreview";
import { ProductDemo } from "../components/ProductDemo";
import { Motion } from "../components/Motion";
import { Nav } from "../components/Nav";
import { DownloadLink } from "../components/DownloadLink";


export default function Home() {
  return <>
    <Nav />
    <Motion>
      <main id="main">
        <Hero />
        <ProductDemo />
        <FlashcardPreview />
        <section className="final-section" id="download" aria-labelledby="download-title">
          <div className="shell final-grid">
            <div><p className="eyebrow"><span className="status-dot" /> A little less to remember</p><h2 id="download-title">Your next thought<br /><em>deserves a home.</em></h2></div>
            <div className="final-signup"><p>Capture a thought. Study what matters. Export a note as PDF whenever you need it.</p><DownloadLink /><p className="download-support">Need a hand? <a href="/support">Quill support →</a></p></div>
          </div>
        </section>
      </main>
    </Motion>
    <Footer />
  </>;
}
