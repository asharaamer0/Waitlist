"use client";

import { motion } from "framer-motion";
import { Clock3, Database, EyeOff, FileLock, Inbox, Mail, ShieldCheck, Trash2, UserCheck } from "lucide-react";

const clauses = [
  {
    id: "01",
    icon: Inbox,
    kicker: "What we collect",
    title: "Your details, and nothing else",
    body: "When you join the waitlist we collect exactly what you type or select: your full name, email, the role pills you choose (e.g. Student, Writer), and the single referral pill — if any. We also record the timestamp. No tracking, no analytics, no account creation on this page.",
  },
  {
    id: "02",
    icon: Database,
    kicker: "Where it is stored",
    title: "One private sheet, owned by Quill",
    body: "Each submission appends one row to a private Google Sheet with columns Timestamp, Name, Email, Who, and How Heard. Storage and transport run on Google Cloud infrastructure. The sheet is never public, never shared by link, and never published.",
  },
  {
    id: "03",
    icon: EyeOff,
    kicker: "How it is used",
    title: "Early access only — never sold",
    body: "Your details are used for one purpose: managing the waitlist and contacting you about early access. We do not sell, rent, or share your data with advertisers or brokers. We never add you to unrelated lists. Expect at most a handful of emails — no spam.",
  },
  {
    id: "04",
    icon: UserCheck,
    kicker: "Consent",
    title: "Opt in, opt out at any time",
    body: "Submitting requires ticking the consent checkbox — your explicit permission for the storage above. You can withdraw any time by replying to any email we send and asking to be removed. Withdrawing removes you from future early-access contact.",
  },
  {
    id: "05",
    icon: Trash2,
    kicker: "Your rights",
    title: "See, correct, or delete",
    body: "Ask at any time to see, correct, or delete your waitlist entry. Reply from the address you signed up with and tell us what to change or remove. We action deletions promptly and confirm once done. Entries are kept only while the waitlist is active.",
  },
  {
    id: "06",
    icon: ShieldCheck,
    kicker: "Security & changes",
    title: "Limited access, dated updates",
    body: "Access is restricted to the Quill team via a dedicated service account with editor access — no one else can view or edit it. No storage is perfectly secure, but access is limited to what is needed. If this policy changes, the updated version is posted here with a new effective date.",
  },
];

export function PrivacyPolicy() {
  return (
    <section className="page-section privacy-section" id="privacy" aria-labelledby="privacy-title">
      <div className="section-inner privacy-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-heading" style={{ marginBottom: 0 }}>
            <p className="section-label">Legal</p>
            <h2 className="section-title" id="privacy-title">
              Privacy policy.
            </h2>
            <p className="section-intro">
              Plain language, no surprises. Everything that happens to your data when you join the waitlist.
            </p>
            <div className="privacy-meta" aria-label="Policy metadata">
              <span>
                <Clock3 aria-hidden="true" /> Effective 19 September 2026
              </span>
              <span>
                <FileLock aria-hidden="true" /> 6 clauses · 1 minute read
              </span>
            </div>
          </div>
        </motion.div>

        <div>
          <div className="privacy-grid">
            {clauses.map((clause, i) => {
              const Icon = clause.icon;
              return (
                <motion.article
                  className="privacy-card"
                  key={clause.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.42, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="privacy-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <span className="privacy-kicker">
                      {clause.id} · {clause.kicker}
                    </span>
                    <h3 className="privacy-title">{clause.title}</h3>
                    <p className="privacy-copy">{clause.body}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            className="privacy-foot"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
          >
            <Mail aria-hidden="true" />
            <span>
              Questions about your data? Email{" "}
              <a href="mailto:helloasharaamer@gmail.com" style={{ color: "var(--color-accent)", fontWeight: 600 }}>
                helloasharaamer@gmail.com
              </a>{" "}
              or reply to any waitlist email — access, correction, and deletion requests are always honoured.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
