"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Mic, MoreHorizontal, Pause, Square } from "lucide-react";

const steps = [
  { name: "Speak", title: "A thought, before it’s tidy.", copy: "A meeting. A lecture. An idea on your walk home. Hit record and say it in your own words." },
  { name: "Structure", title: "The good parts, in order.", copy: "Quill gives your recording a title, a summary, and clear next steps. Your meaning stays yours." },
  { name: "Remember", title: "Make it more than a note.", copy: "Built-in flashcards turn what you capture into something you can recall. A small review goes a long way." },
];

export function ProductDemo() {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const reduced = useReducedMotion();
  return <section className="product-section shell" id="product" aria-labelledby="product-title">
    <div className="section-heading">
      <p className="eyebrow"><span className="section-number">01 /</span> Thought, meet clarity</p>
      <div className="section-heading-grid"><h2 id="product-title">You do the thinking.<br /><em>Quill does the rest.</em></h2><p>A few minutes of talking.{" "}<br />A note worth coming back to.</p></div>
    </div>
    <div className="product-stage">
      <div className="product-narrative">
        <div className="demo-tabs" data-keyboard={keyboard} role="tablist" aria-label="Explore the note-taking process" onPointerDown={() => setKeyboard(false)}>
          {steps.map((item, i) => <button key={item.name} role="tab" id={"step-" + i} aria-selected={step === i} aria-controls="demo-panel" tabIndex={step === i ? 0 : -1} onClick={() => { setStep(i); setAnswer(false); }} onKeyDown={event => {
            let next = step;
            if (event.key === "ArrowRight") next = (step + 1) % 3;
            else if (event.key === "ArrowLeft") next = (step + 2) % 3;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = 2;
            else return;
            event.preventDefault(); setKeyboard(true); setStep(next); setAnswer(false); document.getElementById("step-" + next)?.focus();
          }}><span>0{i + 1}</span> {item.name}</button>)}
        </div>
        <div className="step-description"><h3>{steps[step].title}</h3><p>{steps[step].copy}</p></div>
        <div className="raw-voice">
          <div className="voice-heading"><Mic size={16} aria-hidden="true" /><span>Your voice</span><span>00:24</span></div>
          <blockquote>“Okay, so the design review is Thursday. I need to send the updated roadmap to Priya before then. And let’s start with the onboarding flow…”</blockquote>
          <div className="voice-wave" aria-hidden="true">{Array.from({ length: 48 }, (_, i) => <span key={i} style={{ height: (8 + ((i * 17 + i * i) % 32)) + "px" }} />)}</div>
          <div className="voice-footer"><span>In your own words.</span><ArrowRight size={18} aria-hidden="true" /></div>
        </div>
        <p className="demo-disclosure">An illustrative preview. Try each step.</p>
      </div>
      <div className="phone-stage" id="demo-panel" role="tabpanel" aria-labelledby={"step-" + step}>
        <div className="product-phone">
          <div className="phone-status"><span>9:41</span><span className="phone-island" /><span className="phone-signal" aria-hidden="true">ııı <span className="battery" /></span></div>
          <div className="phone-content">
            <div className="phone-nav"><ArrowLeft size={18} aria-hidden="true" /><span>{step === 0 ? "New recording" : step === 1 ? "Your note" : "Review"}</span><MoreHorizontal size={20} aria-hidden="true" /></div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div className="phone-panel" key={step} initial={{ opacity: reduced || keyboard ? 1 : 0, transform: reduced || keyboard ? "none" : "translateY(8px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} exit={{ opacity: reduced || keyboard ? 1 : 0 }} transition={{ duration: reduced || keyboard ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}>
                {step === 0 ? <div className="recording-screen">
                  <p className="phone-kicker">A thought in progress</p><h3>Just start<br /><em>talking.</em></h3>
                  <div className="recording-wave" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <span key={i} style={{ height: (20 + ((i * 29) % 60)) + "px", animationDelay: (-i * 0.17) + "s" }} />)}</div>
                  <p className="recording-timer">00:24</p><p className="phone-kicker">Listening…</p>
                  <div className="record-controls" aria-hidden="true"><Pause size={20} /><span><Square size={20} /></span><Mic size={20} /></div>
                </div> : step === 1 ? <>
                  <p className="phone-kicker"><Mic size={12} aria-hidden="true" /> Voice · 24 seconds</p>
                  <h3 className="note-heading">Product roadmap<br /><em>discussion</em></h3>
                  <div className="phone-note-block"><span className="phone-kicker">Summary</span><p>Prepare for Thursday’s design review, with the onboarding flow as the first priority.</p></div>
                  <div className="phone-note-block"><span className="phone-kicker">Key points</span><ul><li>Design review on Thursday</li><li>Start with the onboarding flow</li><li>Share the roadmap beforehand</li></ul></div>
                  <div className="phone-note-block"><span className="phone-kicker">Next steps</span><p className="phone-task"><span className="task-check"><Check size={11} aria-hidden="true" /></span>Send updated roadmap to Priya</p></div>
                  <div className="phone-refine">Refine or ask about this note…<ArrowRight size={16} aria-hidden="true" /></div>
                </> : <div className="phone-review">
                  <p className="phone-kicker">From your notes · 1 of 3</p><h3>A little<br /><em>recall.</em></h3>
                  <button type="button" className="phone-flashcard" aria-pressed={answer} onClick={() => setAnswer(!answer)}>
                    <span className="phone-kicker">{answer ? "Answer" : "Question"}</span><span className="flashcard-question">{answer ? "Thursday." : "When is the design review?"}</span><span className="flashcard-prompt">{answer ? "Tap to see question" : "Tap to reveal answer"}<ArrowRight size={15} aria-hidden="true" /></span>
                  </button><p className="phone-kicker review-source">Product roadmap discussion</p>
                </div>}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="phone-home-bar" />
        </div>
        <span className="phone-side-caption">Captured. Collected. Remembered.</span>
      </div>
    </div>
  </section>;
}
