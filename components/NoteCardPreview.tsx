"use client";

import { motion } from "framer-motion";
import { Check, Clock, Mic } from "lucide-react";

export function NoteCardPreview() {
  return (
    <section className="page-section preview-section" id="preview" aria-label="A preview of a generated Quill note">
      <div className="section-inner proof-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Live proof</p>
          <h2 className="section-title">From ramble to refined.</h2>
          <p className="section-intro">
            A four-minute voice note becomes a titled summary with key themes, key points, and a timestamp —
            ready to search, share, or study.
          </p>
          <p className="preview-caption preview-caption-left">
            <em>Generated from a 4-minute voice recording.</em>
          </p>
        </motion.div>

        <motion.div
          className="note-preview-wrap"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="note-stack">
            <div className="note-card-back two" aria-hidden="true" />
            <div className="note-card-back" aria-hidden="true" />
            <article className="note-card">
              <div className="note-eyebrow">
                <span className="note-source">
                  <Mic aria-hidden="true" /> Voice · 4 min
                </span>
                <span className="note-time">Just now</span>
              </div>
              <h3 className="note-title">Weekly planning session</h3>
              <p className="note-copy">
                Key themes included habit tracking setup, the new flashcard review feature, and a note export
                workflow for weekly reflection.
              </p>
              <ul className="note-points">
                <li>
                  <Check aria-hidden="true" /> Habit system ships with streaks
                </li>
                <li>
                  <Check aria-hidden="true" /> Flashcards review on a 7-day loop
                </li>
                <li>
                  <Clock aria-hidden="true" /> Export draft due Thursday
                </li>
              </ul>
              <div className="note-footer">
                <span className="note-voice">
                  <Mic aria-hidden="true" /> Transcribed · Titled · Summarised
                </span>
                <span>2h ago</span>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
