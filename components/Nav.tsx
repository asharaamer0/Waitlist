"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#preview", label: "Preview" },
  { href: "#waitlist", label: "Early access" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="Quill home" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Quill feather mark" className="brand-mark" width={36} height={36} />
            <span className="wordmark">
              <span className="wordmark-name">Quill</span>
              <span className="wordmark-sub">Notes · AI</span>
            </span>
          </a>
          <div className="nav-links">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="nav-cta">
            <a className="button button-primary nav-button" href="#waitlist">
              Join waitlist
              <ArrowRight className="button-icon" aria-hidden="true" />
            </a>
            <button
              className="hamburger"
              type="button"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>
      {open && (
        <div className="mobile-menu" role="dialog" aria-label="Menu">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="button button-primary" href="#waitlist" onClick={() => setOpen(false)}>
            Join the waitlist
            <ArrowRight className="button-icon" aria-hidden="true" />
          </a>
        </div>
      )}
    </>
  );
}
