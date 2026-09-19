"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Layers, RotateCw } from "lucide-react";

const cards = [
  { q: "What is spaced repetition?", a: "A learning technique that schedules reviews just before you forget." },
  { q: "Why does Quill title notes?", a: "So every capture is searchable, scannable, and easy to revisit." },
  { q: "Where do flashcards come from?", a: "Generated automatically from your notes as you capture." },
];

const ADVANCE_MS = 5200;

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
            No separate study step — every note becomes material for review. Tap to flip, or let the deck breathe on its own.
          </p>
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
                <small>Question · {index + 1} / {cards.length}</small>
                {card.q}
              </div>
              <div className="flashcard-face flashcard-back">
                <small>Answer</small>
                {card.a}
              </div>
            </div>
          </div>
          <p className="flashcard-hint" aria-hidden="true">
            <RotateCw /> Tap to flip · auto-advances
          </p>
          <div className="flashcard-dots" aria-hidden="true">
            {cards.map((_, i) => (
              <span key={i} className={i === index ? "active" : ""} />
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Card {index + 1} of {cards.length}: {flipped ? card.a : card.q}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
