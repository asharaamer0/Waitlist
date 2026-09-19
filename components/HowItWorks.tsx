"use client";

import { motion } from "framer-motion";
import { GraduationCap, Mic, WandSparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Mic,
    title: "Capture",
    copy: "Speak, type, or upload — however a thought arrives, Quill accepts it without friction.",
  },
  {
    number: "02",
    icon: WandSparkles,
    title: "Curate",
    copy: "Quill structures your input into a clean, titled note with a summary and key points.",
  },
  {
    number: "03",
    icon: GraduationCap,
    title: "Study",
    copy: "Flashcards are generated automatically so reviewing and retaining is built in.",
  },
];

export function HowItWorks() {
  return (
    <section className="page-section steps-section" id="process" aria-labelledby="process-title">
      <div className="section-inner">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">The process</p>
          <h2 className="section-title" id="process-title">
            Three steps. Zero effort.
          </h2>
          <p className="section-intro">
            A quiet pipeline from raw thought to retained knowledge. No dashboards, no busywork.
          </p>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.article
                className="step"
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="step-top">
                  <p className="step-number" aria-hidden="true">
                    {step.number}
                  </p>
                  <motion.span
                    className="step-badge"
                    initial={{ scale: 0.96, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.12 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Icon aria-hidden="true" />
                  </motion.span>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-copy">{step.copy}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
