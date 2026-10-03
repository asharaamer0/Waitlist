"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mic, RotateCcw } from "lucide-react";

const bars = [11, 23, 35, 17, 28, 41, 19, 32, 15, 39, 25, 13, 30, 18];

export function HeroThought() {
  const [tidy, setTidy] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const reduced = useReducedMotion();
  return <figure className="hero-thought hero-enter" aria-label="A thought becomes a note, alongside a real Quill app screen">
    <div className="thought-thread" aria-hidden="true"><svg viewBox="0 0 530 480" fill="none"><path d="M42 169C126 156 86 260 195 267C300 274 220 382 315 356C372 340 308 227 390 246" stroke="currentColor" strokeWidth="1.2" /><circle cx="42" cy="169" r="3" fill="currentColor" /><path d="m382 239 8 7-10 4" stroke="currentColor" strokeWidth="1.2" /></svg></div>
    <div className="thought-slip">
      <div className="thought-slip-header"><span><Mic size={14} aria-hidden="true" /> {tidy ? "Your note" : "Your voice"}</span><span>{tidy ? "03 ideas" : "00:24"}</span></div>
      <div className="thought-slip-content" role="status" aria-live="polite">
        <motion.div key={String(tidy)} initial={{ opacity: reduced || keyboard ? 1 : 0, transform: reduced || keyboard ? "none" : "translateY(5px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={{ duration: reduced || keyboard ? 0 : .18, ease: [.23, 1, .32, 1] }}>
          {tidy ? <><h2>Thursday’s<br /><em>design review.</em></h2><ul><li>Design review on Thursday.</li><li>Start with the onboarding flow.</li><li>Send Priya the roadmap beforehand.</li></ul></> : <><blockquote>“Okay, the review is Thursday. And we should start with onboarding. Oh, send Priya the roadmap before then…”</blockquote><div className="thought-wave" aria-hidden="true">{bars.map((height, i) => <span key={i} style={{ height }} />)}</div></>}
        </motion.div>
      </div>
      <button className="thought-toggle" type="button" aria-pressed={tidy} onPointerDown={() => setKeyboard(false)} onKeyDown={() => setKeyboard(true)} onClick={() => setTidy(!tidy)}>{tidy ? "Back to the thought" : "See the note"}{tidy ? <RotateCcw size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}</button>
    </div>
    <div className="hero-device-label"><span className="device-label-line" /><span>A little order.<br />In your own words.</span></div>
    <div className="hero-device"><Image src="/images/mockup-home-grid.png" alt="Real Quill iPhone home screen with voice notes and PDF study notes" width={1536} height={1024} sizes="(max-width: 700px) 550px, (max-width: 850px) 730px, 930px" className="hero-device-image" priority /></div>
    <figcaption><span>01 / An illustrative example.</span><span>Actual Quill app screen</span></figcaption>
  </figure>;
}
