"use client";

import { motion } from "framer-motion";
import { GraduationCap, Mic, WandSparkles } from "lucide-react";

const steps = [
  {
    number: "01 Capture",
    icon: Mic,
    title: "Capture",
    copy: "Speak, type, or upload — however a thought arrives, Quill accepts it without friction.",
  },
  {
    number: "02 Curate",
    icon: WandSparkles,
    title: "Curate",
    copy: "Quill structures your input into a clean, titled note with summary and key points.",
  },
  {
    number: "03 Study",
    icon: GraduationCap,
    title: "Study",
    copy: "Flashcards are generated as you go — review is built in, not bolted on.",
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
            Raw thought to retained knowledge.
          </h2>
          <p className="section-intro">
            No dashboards, no busywork. Just three moments — and then it&apos;s done.
          </p>
        </motion.div>

        <div className="steps-rail" aria-hidden="true">
          <span className="rail-number">01 Capture</span>
          <span className="rail-line" />
          <span className="rail-number">02 Curate</span>
          <span className="rail-line" />
          <span className="rail-number">03 Study</span>
        </div>

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
                <p className="step-number">{step.number}</p>
                <span className="step-badge">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-copy">{step.copy}</p>
              </motion.article>
            );
          })}
        </div>

        {/* IMAGE NEEDED: Processing screen (waveform collapsing into spinner) — 240×480px — placed between steps 01 and 02 as visual proof */}
        <div
          className="mockup-placeholder"
          style={{ width: 240, height: 480, borderRadius: 24, margin: "40px auto 0", display: "none" }}
        >
          <p>Processing screen mockup</p>
        </div>
      </div>
    </section>
  );
}
