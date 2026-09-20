"use client";

import { FormEvent, useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Hero() {
  const [heroEmail, setHeroEmail] = useState("");
  const [heroError, setHeroError] = useState<string | undefined>();

  function handleHeroSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = heroEmail.trim();
    if (!EMAIL_RE.test(value)) {
      setHeroError("Please enter a valid email address.");
      return;
    }
    setHeroError(undefined);
    try {
      sessionStorage.setItem("quill-hero-email", value);
    } catch {
      /* session storage unavailable — the handoff event below still carries the email */
    }
    window.dispatchEvent(new CustomEvent("quill:hero-email", { detail: value }));
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title" id="hero-title">
            The note that writes itself from your voice.
          </h1>
          <p className="hero-sub">
            Speak freely. Quill titles, structures and remembers, turning a few minutes of rambling
            into a clean note.
          </p>
          <form className="hero-cta" noValidate onSubmit={handleHeroSubmit}>
            <label className="sr-only" htmlFor="hero-email">
              Email
            </label>
            <input
              className="text-input"
              id="hero-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="ada@email.com"
              value={heroEmail}
              onChange={(event) => setHeroEmail(event.target.value)}
              aria-invalid={Boolean(heroError)}
              aria-describedby={heroError ? "hero-email-error" : undefined}
            />
            <button className="button button-primary" type="submit">
              Join the waitlist
            </button>
            {heroError && (
              <p className="form-error" id="hero-email-error" role="alert">
                {heroError}
              </p>
            )}
          </form>
          <p className="hero-caption">Early access is now open.</p>
        </div>

        <div className="hero-proof">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero-mockup"
            src="/images/mockup-home-angled.png"
            alt="Three Quill home screens showing notes, stats and voice entries"
            width={1534}
            height={1025}
            fetchPriority="high"
          />
        </div>
      </div>

      <figure className="hero-showcase">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/heroimgreal.png"
          alt="Fog drifting over layered pine forest ridgelines"
          width={1672}
          height={941}
          loading="lazy"
        />
        <figcaption className="hero-showcase-caption">
          Quill in the wild. Voice notes, structured notes and recall in one quiet place.
        </figcaption>
      </figure>
    </section>
  );
}
