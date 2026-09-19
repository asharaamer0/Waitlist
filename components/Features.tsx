"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, AudioLines, FileUp, Type } from "lucide-react";

const features = [
  {
    icon: AudioLines,
    index: "01",
    title: "Speak. Quill listens.",
    copy: "Hit record and talk naturally. Quill transcribes, structures, and titles your note — no editing required.",
    meta: "Voice capture",
    accent: true,
  },
  {
    icon: Type,
    index: "02",
    title: "Type or paste. Done.",
    copy: "Drop in raw text, meeting notes, or a URL. Quill turns it into a clean, searchable note in seconds.",
    meta: "Text capture",
  },
  {
    icon: FileUp,
    index: "03",
    title: "Import documents.",
    copy: "Upload PDFs and Quill extracts the key ideas and turns them into notes and flashcards.",
    meta: "PDF import",
  },
];

export function Features() {
  return (
    <section className="page-section" id="features" aria-labelledby="features-title">
      <div className="section-inner">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">What Quill does</p>
          <h2 className="section-title" id="features-title">
            Every format. One quiet place.
          </h2>
          <p className="section-intro">
            However a thought arrives — voice, text, or document — Quill accepts it and returns something
            clean, titled, and ready to revisit.
          </p>
        </motion.div>

        <div className="feature-grid">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.article
                className={`feature-card${feature.accent ? " feature-card-main" : ""}`}
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="feature-top">
                  <span className="feature-index" aria-hidden="true">
                    {feature.index}
                  </span>
                </div>
                <span className="feature-icon-wrap" aria-hidden="true">
                  <Icon className="feature-icon" />
                </span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-copy">{feature.copy}</p>
                <span className="feature-link" aria-hidden="true">
                  {feature.meta}
                  <ArrowUpRight />
                </span>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
