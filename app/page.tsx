import { Features } from "../components/Features";
import { FlashcardPreview } from "../components/FlashcardPreview";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Motion } from "../components/Motion";
import { Nav } from "../components/Nav";
import { NoteCardPreview } from "../components/NoteCardPreview";
import { PrivacyPolicy } from "../components/PrivacyPolicy";
import { Ticker } from "../components/Ticker";
import { WaitlistForm } from "../components/WaitlistForm";

export default function Home() {
  return (
    <>
      <Nav />
      <Motion>
        <main>
          <Hero />
          <Ticker />
          <Features />
          <HowItWorks />
          <NoteCardPreview />
          <FlashcardPreview />
          <WaitlistForm />
          <PrivacyPolicy />
        </main>
      </Motion>
      <Footer />
    </>
  );
}
