"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Lock, Mic } from "lucide-react";

const roles = [
  "Student",
  "Researcher",
  "Writer",
  "Professional",
  "Developer",
  "Designer",
  "Teacher",
  "Entrepreneur",
  "Content creator",
  "Healthcare worker",
  "Lawyer",
  "Journalist",
  "Other",
];

const sources = ["Instagram", "YouTube", "Twitter / X", "A friend", "Reddit", "Google", "AI tools newsletter", "Other"];

type FieldName = "name" | "email" | "roles" | "consent";
type Errors = Partial<Record<FieldName | "form", string>>;

function validateField(
  field: FieldName,
  value: string,
  selectedRoles: string[],
  consent = false,
): string | undefined {
  if (field === "name" && value.trim().length < 2) return "Please enter your full name.";
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
  if (field === "roles" && selectedRoles.length === 0) return "Choose at least one option.";
  if (field === "consent" && !consent) return "Please accept the privacy notice to join.";
  return undefined;
}

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Hero email handoff: the hero capture carries the typed email down to this form.
  useEffect(() => {
    const readStored = () => {
      try {
        const stored = sessionStorage.getItem("quill-hero-email");
        if (stored) setEmail(stored);
      } catch {
        /* session storage unavailable */
      }
    };
    readStored();
    const onHeroEmail = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      if (typeof value === "string" && value) setEmail(value);
    };
    window.addEventListener("quill:hero-email", onHeroEmail);
    return () => window.removeEventListener("quill:hero-email", onHeroEmail);
  }, []);

  const validate = (field: FieldName) => {
    const value = field === "name" ? name : email;
    const message = validateField(field, value, selectedRoles);
    setErrors((current) => ({ ...current, [field]: message }));
    return !message;
  };

  const toggleRole = (role: string) => {
    setSelectedRoles((current) => {
      const updated = current.includes(role) ? current.filter((item) => item !== role) : [...current, role];
      if (errors.roles) {
        setErrors((present) => ({ ...present, roles: validateField("roles", "", updated) }));
      }
      return updated;
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {
      name: validateField("name", name, selectedRoles, consent),
      email: validateField("email", email, selectedRoles, consent),
      roles: validateField("roles", "", selectedRoles, consent),
      consent: validateField("consent", "", selectedRoles, consent),
    };
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, who: selectedRoles, howHeard: source || "", consent: true }),
      });

      if (!response.ok) {
        const data: { errors?: Partial<Record<FieldName, string[]>> } = await response.json();
        setErrors({
          name: data.errors?.name?.[0],
          email: data.errors?.email?.[0],
          roles: data.errors?.roles?.[0],
          form: "Something went wrong. Please try again.",
        });
        return;
      }

      setIsComplete(true);
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="page-section waitlist-section" id="waitlist" aria-labelledby="waitlist-title">
      <div className="section-inner waitlist-layout">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-heading" style={{ marginBottom: 0 }}>
            <p className="section-label">Early access</p>
            <h2 className="section-title" id="waitlist-title">
              Get in early.
            </h2>
            <p className="section-intro">
              Quill is in closed beta. Join the waitlist and be among the first to capture at the
              speed of thought.
            </p>
          </div>

          <div className="waitlist-mini-note">
            <article className="note-card" aria-label="Teaser of a Quill note you will get">
              <div className="note-eyebrow">
                <span className="note-source">
                  <Mic aria-hidden="true" /> Voice · 3 min
                </span>
                <span className="note-time">2h ago</span>
              </div>
              <div className="note-card-body">
                <h3 className="note-title">Product roadmap discussion</h3>
                <p className="note-copy">
                  Key themes included user onboarding friction and the new search arch…
                </p>
              </div>
            </article>
          </div>
        </motion.div>

        {isComplete ? (
          <motion.div
            className="success-state"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.svg
              className="success-icon"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            >
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.7" />
              <motion.path
                d="m12 20 5.2 5.2L28.5 14"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              />
            </motion.svg>
            <h3 className="success-title">You&apos;re on the list.</h3>
            <p className="success-copy">
              We&apos;ll reach out when early access opens. No spam, ever.
            </p>
          </motion.div>
        ) : (
          <motion.form
            className="waitlist-form"
            noValidate
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="form-fieldset">
              <label className="form-label" htmlFor="full-name">
                Full name
              </label>
              <input
                className="text-input"
                id="full-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Ada Lovelace"
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => validate("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                required
              />
              {errors.name && (
                <p className="form-error" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-fieldset">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="text-input"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="ada@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => validate("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                required
              />
              {errors.email && (
                <p className="form-error" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <fieldset className="form-fieldset">
              <legend className="form-legend">Who are you?</legend>
              <div className="pill-group" aria-describedby={errors.roles ? "roles-error" : undefined}>
                {roles.map((role) => {
                  const active = selectedRoles.includes(role);
                  return (
                    <button
                      className="option-pill"
                      type="button"
                      key={role}
                      aria-pressed={active}
                      onClick={() => toggleRole(role)}
                      onBlur={() => validate("roles")}
                    >
                      {active && <Check aria-hidden="true" />}
                      {role}
                    </button>
                  );
                })}
              </div>
              {errors.roles && (
                <p className="form-error" id="roles-error">
                  {errors.roles}
                </p>
              )}
            </fieldset>

            <fieldset className="form-fieldset">
              <legend className="form-legend">
                How did you hear about Quill? <span className="form-optional">Optional</span>
              </legend>
              <div className="pill-group">
                {sources.map((item) => (
                  <button
                    className="option-pill"
                    type="button"
                    key={item}
                    aria-pressed={source === item}
                    onClick={() => setSource((current) => (current === item ? "" : item))}
                  >
                    {source === item && <Check aria-hidden="true" />}
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            {errors.form && (
              <p className="form-error" role="alert">
                {errors.form}
              </p>
            )}
            <div className="form-fieldset consent-fieldset">
              <label className="consent-row" htmlFor="consent">
                <input
                  className="consent-box"
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => {
                    setConsent(event.target.checked);
                    if (errors.consent) {
                      setErrors((present) => ({
                        ...present,
                        consent: validateField("consent", "", selectedRoles, event.target.checked),
                      }));
                    }
                  }}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? "consent-error" : "consent-disclosure"}
                  required
                />
                <span className="consent-check" aria-hidden="true">
                  <Check />
                </span>
                <span className="consent-text" id="consent-disclosure">
                  I agree to Quill storing my name, email, roles, and referral source in its private
                  waitlist sheet to contact me about early access. See the{" "}
                  <a href="#privacy">privacy policy</a> for details.
                </span>
              </label>
              {errors.consent && (
                <p className="form-error" id="consent-error">
                  {errors.consent}
                </p>
              )}
            </div>
            <button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="button-icon spin" aria-hidden="true" /> Joining the waitlist…
                </>
              ) : (
                <>
                  Join the waitlist <ArrowRight className="button-icon" aria-hidden="true" />
                </>
              )}
            </button>
            <p className="form-privacy">
              <Lock aria-hidden="true" /> No spam. Early access only. Read our{" "}
              <a href="#privacy">privacy policy</a> · <a href="mailto:helloasharaamer@gmail.com">helloasharaamer@gmail.com</a>
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
