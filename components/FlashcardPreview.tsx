"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";

export function FlashcardPreview() {
  const [answer, setAnswer] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const reduced = useReducedMotion();
  return <section className="recall-section shell" id="recall" aria-labelledby="recall-title">
    <div className="recall-art">
      <div className="source-note"><span className="eyebrow">From your PDF</span><h3>Thinking, Fast<br />and Slow</h3><p>Two ways we think.<br />One automatic, one deliberate.</p><span className="source-page">Book notes · 4 pages</span></div>
      <button className="recall-card" onClick={() => setAnswer(!answer)} onPointerDown={() => setKeyboard(false)} onKeyDown={() => setKeyboard(true)} aria-pressed={answer}>
        <span className="recall-card-top"><span>{answer ? "The answer" : "A question for you"}</span><span>01 / 03</span></span>
        <motion.span className="recall-question" key={String(answer)} initial={{ opacity: reduced || keyboard ? 1 : 0, transform: reduced || keyboard ? "none" : "translateY(5px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={{ duration: reduced || keyboard ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}>{answer ? "System 1 is fast and intuitive. System 2 is slow and deliberate." : "How do System 1 and System 2 differ?"}</motion.span>
        <span className="recall-card-bottom"><span>{answer ? "Back to the question" : "Tap to find out"}</span>{answer ? <RotateCcw size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}</span>
      </button>
      <p className="recall-art-caption">Illustrative preview · tap the card to try it.</p>
    </div>
    <div className="recall-copy">
      <p className="eyebrow"><span className="section-number">02 /</span> Built-in recall</p>
      <h2 id="recall-title">Don’t just save it.<br /><em>Keep it with you.</em></h2>
      <p>That paper you read. That lecture you recorded. Quill turns the key ideas into flashcards, so the useful bits stay with you.</p>
      <a className="text-link" href="#waitlist">Make room for what matters <ArrowRight size={17} aria-hidden="true" /></a>
    </div>
  </section>;
}
