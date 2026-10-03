"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { roles, sources } from "../lib/waitlist-options";

type State = "idle" | "optimistic" | "success" | "duplicate";
type Field = "name" | "email" | "who" | "howHeard" | "consent" | "server";
type Joined = { email: string; demo: boolean; duplicate: boolean; source: string };
const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
const invitationConsent = "I agree to Quill storing my name, email, roles, and referral source to contact me about early access.";

function HeroEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const joined = (event: Event) => { setEmail((event as CustomEvent<Joined>).detail.email); setComplete(true); setError(""); };
    window.addEventListener("quill:joined", joined);
    return () => window.removeEventListener("quill:joined", joined);
  }, []);
  function continueToForm(event: FormEvent) {
    event.preventDefault();
    if (!validEmail(email.trim())) { setError("Enter a valid email to continue."); input.current?.focus(); return; }
    setError("");
    window.dispatchEvent(new CustomEvent("quill:hero-email", { detail: email.trim() }));
    document.getElementById("full-waitlist-form")?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    document.getElementById("final-name")?.focus({ preventScroll: true });
  }
  return <div className="signup-shell hero-capture">
    <div className="signup-heading"><span>Join the waitlist</span><span>Early access</span></div>
    <form className="signup" noValidate onSubmit={continueToForm} aria-label="Start your Quill signup">
      <label className="email-label" htmlFor="hero-email">Your email address</label>
      <div className="signup-main">
        <input ref={input} id="hero-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="Email address" value={email} onChange={event => { setEmail(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby="hero-feedback hero-notice" required readOnly={complete} />
        <motion.button className="join-button" type="submit" disabled={complete} whileTap={reduced ? undefined : { transform: "scale(.97)" }} transition={{ duration: .16, ease: [.23, 1, .32, 1] }}>{complete ? <><Check size={17} aria-hidden="true" /> You’re on the list</> : <>Continue <ArrowRight size={17} aria-hidden="true" /></>}</motion.button>
      </div>
      <p className="hero-form-hint" id="hero-notice">Next: your name and a little about you. No account needed.</p>
      <p className="form-feedback" id="hero-feedback" role="status">{error}</p>
    </form>
  </div>;
}

export function WaitlistForm({ id = "final" }: { id?: string }) {
  return id === "hero" ? <HeroEmail /> : <FullWaitlist id={id} />;
}

function FullWaitlist({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [who, setWho] = useState<string[]>([]);
  const [howHeard, setHowHeard] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<Field | null>(null);
  const [demo, setDemo] = useState(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const roleInput = useRef<HTMLInputElement>(null);
  const consentInput = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();
  const pending = state === "optimistic";
  const complete = state === "success" || state === "duplicate";
  const feedback = id + "-feedback";

  useEffect(() => {
    const handoff = (event: Event) => { setEmail((event as CustomEvent<string>).detail); setError(""); setErrorField(null); };
    window.addEventListener("quill:hero-email", handoff);
    return () => window.removeEventListener("quill:hero-email", handoff);
  }, []);

  function clearError() { setError(""); setErrorField(null); }
  function invalid(field: Field, message: string) {
    setErrorField(field); setError(message);
    const focus: Partial<Record<Field, typeof nameInput>> = { name: nameInput, email: emailInput, who: roleInput, consent: consentInput };
    focus[field]?.current?.focus();
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || complete) return;
    const address = email.trim();
    if (name.trim().length < 2 || name.trim().length > 100) { invalid("name", "Please enter your full name (2–100 characters)."); return; }
    if (!validEmail(address)) { invalid("email", "Enter a valid email so we can send your invitation."); return; }
    if (!who.length) { invalid("who", "Choose at least one option under ‘Who are you?’."); return; }
    if (!consent) { invalid("consent", "Please agree to receive your early-access invitation."); return; }
    clearError(); setState("optimistic");
    try {
      const response = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), email: address, who, howHeard, consent: true }), signal: AbortSignal.timeout(15000) });
      const data = await response.json();
      if (data.code === "WAITLIST_NOT_CONFIGURED") { setState("idle"); invalid("server", "Signups aren’t open on this server yet. Please check back once the waitlist is connected."); return; }
      if (response.status === 400) { setState("idle"); invalid(data.field || "email", data.error || "Check your details and try again."); return; }
      if (!response.ok && response.status !== 409) throw new Error("Storage unavailable");
      setDemo(Boolean(data.demo)); setEmail(address); setState(response.status === 409 ? "duplicate" : "success");
      window.dispatchEvent(new CustomEvent("quill:joined", { detail: { email: address, demo: Boolean(data.demo), duplicate: response.status === 409, source: id } satisfies Joined }));
    } catch { setState("idle"); invalid("server", "We couldn’t save your place. Your details are still here. Please try again."); }
  }

  return <div className="signup-shell full-signup" id="full-waitlist-form">
    <div className="signup-heading"><span>Join the waitlist</span><span>Early access</span></div>
    <form className="signup" noValidate onSubmit={submit} aria-label="Join the Quill waitlist" aria-busy={pending} data-state={state}>
      <fieldset className="signup-fields" disabled={pending || complete}>
        <legend className="sr-only">Your waitlist details</legend>
        <div className="signup-identity">
          <div><label className="email-label" htmlFor={id + "-name"}>Full name</label><input className="signup-text" ref={nameInput} id={id + "-name"} name="name" type="text" autoComplete="name" placeholder="Ada Lovelace" maxLength={100} value={name} onChange={event => { setName(event.target.value); clearError(); }} required aria-invalid={errorField === "name"} aria-describedby={feedback} /></div>
          <div><label className="email-label" htmlFor={id + "-email"}>Your email address</label><input className="signup-text" ref={emailInput} id={id + "-email"} name="email" type="email" autoComplete="email" inputMode="email" placeholder="ada@email.com" maxLength={254} value={email} onChange={event => { setEmail(event.target.value); clearError(); }} required aria-invalid={errorField === "email"} aria-describedby={feedback} /></div>
        </div>
        <fieldset className="signup-choices" aria-describedby={id + "-roles-hint " + feedback} aria-invalid={errorField === "who"}>
          <legend>Who are you?</legend><p className="choice-hint" id={id + "-roles-hint"}>Choose all that apply. At least one is required.</p>
          <div className="signup-options">{roles.map((role, index) => <label className={"signup-option" + (who.includes(role) ? " is-selected" : "")} key={role}><input ref={index === 0 ? roleInput : undefined} type="checkbox" name="who" value={role} checked={who.includes(role)} onChange={event => { setWho(current => event.target.checked ? [...current, role] : current.filter(item => item !== role)); clearError(); }} aria-invalid={errorField === "who"} aria-describedby={feedback} /><span>{role}</span></label>)}</div>
        </fieldset>
        <fieldset className="signup-choices">
          <legend>How did you hear about Quill? <span className="choice-optional">Optional</span></legend>
          <div className="signup-options signup-sources">{sources.map(source => <label className={"signup-option" + (howHeard === source ? " is-selected" : "")} key={source}><input type="radio" name={id + "-howHeard"} value={source} checked={howHeard === source} onChange={() => { setHowHeard(source); clearError(); }} /><span>{source}</span></label>)}</div>
          <button className="source-clear" type="button" disabled={!howHeard} onClick={() => setHowHeard("")}>Clear selection</button>
        </fieldset>
        <label className="consent-label full-consent"><input ref={consentInput} type="checkbox" name="consent" checked={consent} onChange={event => { setConsent(event.target.checked); clearError(); }} required aria-invalid={errorField === "consent"} aria-describedby={feedback} /><span>{invitationConsent} No unrelated emails.</span></label>
      </fieldset>
      <motion.button className="join-button full-submit" type="submit" disabled={pending || complete} whileTap={reduced ? undefined : { transform: "scale(.97)" }} transition={{ duration: .16, ease: [.23, 1, .32, 1] }}>{complete ? <><Check size={17} aria-hidden="true" /> You’re on the list</> : pending ? <>Saving your place <Loader2 className="spin" size={16} aria-hidden="true" /></> : <>Join the waitlist <ArrowRight size={17} aria-hidden="true" /></>}</motion.button>
      <div className="full-receipt">
        <p className="success-message" role={pending || complete ? "status" : undefined}>{pending ? "Your request is ready. Confirming your place…" : complete ? demo ? state === "duplicate" ? "This email is already in the local demo list. No invitation will be sent." : "Demo signup saved locally. No invitation will be sent." : state === "duplicate" ? "You’re already on the list. We’ll email when your invitation is ready." : "A little less to remember. We’ll email when your invitation is ready." : ""}</p>
        <p className="form-feedback" id={feedback} role="status">{error}</p>
      </div>
      <p className="signup-notice" id={id + "-notice"}>No account needed. <a href="/privacy">Privacy</a></p>
    </form>
  </div>;
}
