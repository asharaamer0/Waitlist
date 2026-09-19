"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Nav() {
  return (
    <motion.nav
      className="nav"
      aria-label="Main navigation"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-inner">
        <a className="brand" href="#top" aria-label="Quill home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Quill feather mark" className="brand-mark" width={36} height={36} />
          <span className="wordmark">
            <span className="wordmark-name">Quill</span>
            <span className="wordmark-sub">Notes · AI</span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#process">Process</a>
          <a href="#preview">Preview</a>
          <a href="#waitlist">Early access</a>
        </div>
        <a className="button button-outline nav-button nav-cta" href="#waitlist">
          Join waitlist
          <ArrowRight className="button-icon" aria-hidden="true" />
        </a>
      </div>
    </motion.nav>
  );
}
