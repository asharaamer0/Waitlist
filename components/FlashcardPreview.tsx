"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Layers, RotateCw } from "lucide-react";

const cards = [
  {
    q: "What were the three main themes from the product roadmap discussion?",
    a: ["1. Search architecture overhaul", "2. Onboarding friction at step 3", "3. Q4 roadmap structure and review cadence"],
    note: "Product roadmap discussion",
  },
  {
    q: "What is the search latency target from the planning session?",
    a: ["Under 200ms", "Reviewed positively in the new IA proposal"],
    note: "Weekly planning session",
  },
  {
    q: "When is the export draft due?",
    a: ["Thursday", "Part of the weekly reflection workflow"],
    note: "Weekly planning session",
  },
];

const ADVANCE_MS = 8000;

export function FlashcardPreview() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => {
      setFlipped(false);
      setIndex((i) => (i + 1) % cards.length);
    }, ADVANCE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, flipped, paused]);

  const card = cards[index];

  const flip = () => {
    if (timer.current) clearTimeout(timer.current);
    setFlipped((f) => !f);
  };

  return (
    <section className="page-section flashcard-section" aria-labelledby="flashcard-title">
      <div className="section-inner flashcard-layout">
        <motion.div
          className="flashcard-copy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">
            <Layers className="section-label-icon" aria-hidden="true" /> Built-in recall
          </span>
          <h2 className="flashcard-heading" id="flashcard-title">
            Quill builds your deck as you go.
          </h2>
          <p className="flashcard-sub">
            Every note becomes a question. No separate study step — it just happens.
          </p>
          {/* IMAGE NEEDED: Notes List / Home screen — 280×560px — left column on desktop, flashcard on the right */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mockup-home-angled.png"
            alt="Quill home screen showing the notes list on three phones"
            width={1534}
            height={1025}
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className={`flashcard-scene${flipped ? " flipped" : ""}`}
            tabIndex={0}
            role="button"
            aria-label={`Flashcard ${index + 1} of ${cards.length}: ${flipped ? "showing answer" : "showing question"}. Activate to flip.`}
            onClick={flip}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                flip();
              }
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="flashcard-inner">
              <div className="flashcard-face">
                <small>
                  Question · {index + 1} / {cards.length}
                </small>
                <p className="flashcard-question">{card.q}</p>
                <span className="flashcard-tap">Tap to reveal answer</span>
              </div>
              <div className="flashcard-face flashcard-back">
                <small>
                  Answer · {index + 1} / {cards.length}
                </small>
                <ul className="flashcard-answer">
                  {card.a.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <span className="flashcard-note">Note: {card.note}</span>
              </div>
            </div>
          </div>
          <p className="flashcard-hint" aria-hidden="true">
            <RotateCw /> Tap to flip · auto-advances every 8 seconds
          </p>
          <div className="flashcard-dots" aria-hidden="true">
            {cards.map((_, i) => (
              <span key={i} className={i === index ? "active" : ""} />
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Card {index + 1} of {cards.length}: {flipped ? card.a.join(" ") : card.q}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
