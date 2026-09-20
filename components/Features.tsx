"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, AudioLines, FileUp, Type } from "lucide-react";

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
            However a thought arrives — voice, text, or document — Quill accepts it and returns
            something clean, titled, and ready to revisit.
          </p>
        </motion.div>

        <div className="feature-grid">
          <motion.article
            className="feature-card feature-card-dark"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="feature-top">
              <span className="feature-index" aria-hidden="true">
                01
              </span>
            </div>
            <span className="feature-icon-wrap" aria-hidden="true">
              <AudioLines className="feature-icon" />
            </span>
            <h3 className="feature-title">Speak. Quill listens.</h3>
            <p className="feature-copy">
              Hit record and talk naturally. Quill transcribes, structures, and titles your note — no
              editing required.
            </p>
            <div className="raw-block">
              <p className="raw-quote">
                “so I was thinking we need to fix the export bug before thursday and also the search
                thing roshaan…”
              </p>
            </div>
            <p className="becomes-line">
              <span className="becomes-arrow" aria-hidden="true">
                ↓{" "}
              </span>
              Becomes a titled, structured note
            </p>
            <span className="feature-link" aria-hidden="true">
              Voice capture
              <ArrowUpRight />
            </span>
          </motion.article>

          <motion.article
            className="feature-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="feature-top">
              <span className="feature-index" aria-hidden="true">
                02
              </span>
            </div>
            <span className="feature-icon-wrap" aria-hidden="true">
              <Type className="feature-icon" />
            </span>
            <h3 className="feature-title">Type or paste. Done.</h3>
            <p className="feature-copy">
              Drop in raw text, meeting notes, or a URL. Quill turns it into a clean, searchable note
              in seconds.
            </p>
            <span className="feature-link" aria-hidden="true">
              Text capture
              <ArrowUpRight />
            </span>
          </motion.article>

          <motion.article
            className="feature-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="feature-top">
              <span className="feature-index" aria-hidden="true">
                03
              </span>
            </div>
            <span className="feature-icon-wrap" aria-hidden="true">
              <FileUp className="feature-icon" />
            </span>
            <h3 className="feature-title">Import documents.</h3>
            <p className="feature-copy">
              Upload PDFs and Quill extracts the key ideas and turns them into notes and flashcards.
            </p>
            <span className="feature-link" aria-hidden="true">
              Document import
              <ArrowUpRight />
            </span>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
