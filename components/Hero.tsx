"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Smartphone, Zap } from "lucide-react";

const bars = Array.from({ length: 14 });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const rise = {
  hidden: { y: 44, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function TitleLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="hero-title-line">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-rules" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <motion.div className="hero-content" variants={container} initial="hidden" animate="show">
        <motion.div variants={rise}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" aria-hidden="true" className="hero-mark" width={76} height={76} />
        </motion.div>

        <motion.div variants={rise}>
          <span className="eyebrow-chip">
            <span className="eyebrow-dot" aria-hidden="true" />
            Now taking early access
          </span>
        </motion.div>

        <h1 className="hero-title" id="hero-title">
          <TitleLine delay={0.25}>Capture at the</TitleLine>
          <TitleLine delay={0.37}>
            <span className="italic-accent">speed of thought</span>
          </TitleLine>
        </h1>

        <motion.p className="hero-copy" variants={rise}>
          Quill turns your voice, text, and documents into clean, curated notes and flashcards — automatically.
          Speak freely. Quill structures, titles, and remembers.
        </motion.p>

        <motion.div className="hero-actions" variants={rise}>
          <motion.a
            className="button button-primary"
            href="#waitlist"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Join the waitlist
            <ArrowRight className="button-icon" aria-hidden="true" />
          </motion.a>
          <motion.a
            className="button button-outline"
            href="#features"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Play className="button-icon" aria-hidden="true" />
            See how it works
          </motion.a>
        </motion.div>

        <motion.ul className="hero-proof" variants={rise} aria-label="Why people trust Quill">
          <li>
            <ShieldCheck aria-hidden="true" /> No spam, ever
          </li>
          <li>
            <Zap aria-hidden="true" /> Notes in seconds
          </li>
          <li>
            <Smartphone aria-hidden="true" /> Mobile app coming soon
          </li>
        </motion.ul>

        <motion.div
          className="waveform"
          aria-label="A gently animated audio waveform"
          role="img"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {bars.map((_, index) => (
            <span className="wave-bar" key={index} />
          ))}
        </motion.div>

        <motion.a
          className="scroll-cue"
          href="#features"
          aria-label="Scroll to features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          Scroll
          <span className="scroll-cue-line" aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  );
}
