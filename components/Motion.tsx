"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";

export function Motion({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;
    let cancelled = false;
    let version = 0;
    async function setup() {
      if (media.matches) return;
      const ticket = ++version;
      const [{ gsap }, { ScrollTrigger }, { CustomEase }, { default: Lenis }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/CustomEase"), import("lenis")]);
      if (cancelled || media.matches || ticket !== version) return;
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      CustomEase.create("quill-out", "0.23, 1, 0.32, 1");
      const lenis = new Lenis({ duration: 0.9, smoothWheel: true, syncTouch: false, anchors: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      const context = gsap.context(() => {
        gsap.from(".hero-enter", { y: 18, duration: 0.6, stagger: 0.055, ease: "quill-out", clearProps: "transform" });
        gsap.fromTo(".product-phone", { y: 32, rotation: 3 }, { y: -16, rotation: 0, ease: "none", scrollTrigger: { trigger: "#product", start: "top 85%", end: "bottom 30%", scrub: 0.6 } });
        gsap.fromTo(".raw-voice", { y: 12 }, { y: -12, ease: "none", scrollTrigger: { trigger: "#product", start: "top 80%", end: "bottom 30%", scrub: 0.6 } });
        gsap.from(".phone-note-block", { y: 16, stagger: 0.16, ease: "quill-out", scrollTrigger: { trigger: ".product-stage", start: "top 80%", end: "top 25%", scrub: 0.5 } });
      });
      dispose = () => { context.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
    }
    void setup();
    const change = () => { version++; dispose?.(); dispose = undefined; if (!media.matches) void setup(); };
    media.addEventListener("change", change);
    return () => { cancelled = true; dispose?.(); media.removeEventListener("change", change); };
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
