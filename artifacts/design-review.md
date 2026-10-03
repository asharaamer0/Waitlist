# Quill design review

> Historical review, superseded by [the revised hero review](hero-review.md). The earlier final scores were provisional: subsequent user feedback rejected the hero, and the last old-build mobile performance result was 90. Those claims do not establish the current exit condition. Current verified captures, signup behavior, scores and production audits are in the revised report.

The product promise is voice, text and PDFs turned into structured notes and flashcards. The audience is people who think aloud and want to revisit what they learn. The single conversion goal is an early-access waitlist signup.

Existing Quill code and real app screenshots took precedence over the older Mistral name in design.md. Grey, forest green and Playfair were retained. Gorestka was not provided; self-hosted DM Sans is the stated substitute. There are no invented testimonials, user counts or endorsements.

## Before / after

| Before | After | Reason |
| --- | --- | --- |
| Repeated explanatory sections | Voice-to-note interaction and a working recall card | Let visitors try the promised behavior |
| Several signup fields | Email and explicit invitation consent | Lower the cost of joining |
| Font variables scoped beneath root tokens | Font variables on html | Correct the actual rendered typography |
| Generic success treatment | Provisional receipt, confirmed success, duplicate and retry states | Represent storage results honestly |
| App screenshot alongside extra decoration | Actual devices, editorial rules, asymmetric composition | Preserve the product's visual identity |
| Development and production shared manifests | Separate .next and .next-production directories | Keep simultaneous previews reliable |

## Iteration scores

Scores are design judgments, not independent awards. I revisited earlier judgments when full-size captures revealed problems. The final responsive score describes the tested viewport and browser matrix only.

| Iteration | Identity | Type | Layout | Motion | Copy | Conversion | Responsive | Perf / a11y | Mobile Lighthouse P / A / SEO |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | 7 | 5 | 8 | 8 | 9 | 8 | 7 | 8 | 100 / 97 / 100 |
| 2 | 8.5 | 9 | 8.5 | 8 | 9 | 8.5 | 9 | 7.5 | 100 / 97 / 92 |
| 3 | 9 | 9 | 8.5 | 8.5 | 9 | 9 | 9.5 | 9.5 | 96 / 100 / 100 |
| 4 | 9 | 9.5 | 9 | 9 | 9.5 | 9.5 | 9.5 | 9.5 | 96 / 100 / 100 |
| 5 | 9 | 8.5 | 9.5 | 9.5 | 8.5 | 8.5 | 9.5 | 9.5 | 98 / 100 / 100 |
| 6 | 9 | 9 | 9.5 | 9.5 | 9.5 | 9.5 | 10 | 9.5 | 98 / 100 / 100 |
| 7 | 9 | 9.5 | 9.5 | 9.5 | 9.5 | 9 | 10 | 9.5 | 99 / 100 / 100 |
| 8 | 9 | 9.5 | 9.5 | 9.5 | 9.5 | 9.5 | 10 | 9.5 | See iteration-8/scores.json |

### 1 — build and inspect

Established the editorial hero, voice-to-note demo, recall deck and two shared signup forms. Added real storage handling, local preview mode and privacy page.

Ranked findings:
1. Typography: hero-1440.png rendered sans-serif because app/layout.tsx scoped font variables on body while globals.css resolved them on root. Type 5, identity 7.
2. Responsiveness: viewport metrics found 2px of tablet overflow. Responsive 7.
3. Accessibility: Lighthouse identified text contrast and interactive-name issues. Perf/a11y 8.
4. Conversion: several navigation/privacy targets were smaller than 44px. Conversion 8.
5. Layout/motion: source-note layering and motion had not yet been checked across all states. Layout and motion 8.

### 2 — font and target corrections

Moved font variables to html, constrained overflowing columns and increased interactive hit areas.

Ranked findings:
1. Perf/a11y: Motion.tsx revealed note text at low opacity during scroll; Lighthouse contrast failure remained (97).
2. SEO: streamed metadata caused the HTML-only audit to miss the description (92).
3. Layout: source title was still obstructed by the front recall card at 768px.
4. Motion: easing and dynamic reduced-motion cleanup needed a deliberate review.
5. Identity/conversion: hero and form state proportions were functional but not yet settled. See hero-768.png and WaitlistForm.tsx.

### 3 — readable reveal and metadata

Removed note-text opacity animation, kept translation, delivered metadata in the initial head, adjusted source layering and mobile input size. Lighthouse targets passed.

Ranked findings:
1. Layout 8.5: recall source title still partially disappeared behind the card at tablet width.
2. Conversion: submission labels could change button width and shift the input.
3. Motion 8.5: keyboard changes were unnecessarily animated.
4. Navigation: root anchors needed to work from the privacy page as well.
5. Copy consistency: public/llms.txt still described the old multi-field form and section anchors.

### 4 — stable interaction geometry

Uncovered the source heading, fixed button widths and reserved feedback space. Keyboard and reduced-motion changes became instant. Corrected privacy navigation and crawler copy. The 21 functional/accessibility checks passed.

Ranked remaining priorities:
1. Sharing: existing social artwork did not match the new site.
2. Motion: replace the generic entrance curve with the committed custom curve.
3. Small-screen product: give the phone more breathing room at the bottom of the stage.
4. Maintenance: consolidate duplicate/unused component styling and remove obsolete components.
5. Validation: inspect every text wrap and live-region transition at full size, beyond fit-to-window screenshots.

### 5 — stricter full-size review

Added a matching social image, CustomEase, mobile phone spacing and production build isolation. Measured scroll motion at about 60fps. Changed review approach to full-size text and interaction states; scores fell where new evidence contradicted the previous review.

Ranked findings:
1. Copy 8.5: ProductDemo.tsx removed a line break on mobile without preserving a word space. Product-375.png exposed the joined sentence.
2. Type 8.5: hero-768.png left “stick.” alone on the last line.
3. Conversion 8.5: shared success rendered two status announcements for one submission.
4. Browser coverage: custom checkbox had not been verified in WebKit.
5. Failure coverage: missing Google credentials had not been checked against a separate actual server.

### 6 — copy, announcements and WebKit

Preserved the mobile sentence space and added pretty text wrapping. Only the originating form announces completion. Chrome's 21 checks, WebKit at four widths and the actual unconfigured 503 route passed.

Ranked remaining priorities:
1. Type: hero-768.png still ended with the short line “it stick.”; automated text wrapping was insufficient.
2. Requirement review: verify optimistic receipt semantics, beyond a loading label.
3. Cross-browser review: inspect actual unchecked and checked checkbox captures.
4. Measurement: rerun capture and Lighthouse against the final production bundle.
5. Delivery: document real Sheets setup and the boundary of local/demo verification.

### 7 — tablet rhythm

Widened the tablet paragraph to 330px; the value prop now sits on two balanced lines. Fresh screenshots and WebKit checks passed. Mobile Lighthouse reached 99/100/100.

Ranked remaining priorities:
1. Conversion 9: a saving label was present, but the requested immediate optimistic receipt was absent.
2. Failure transition: prove provisional feedback rolls back without losing the email.
3. State evidence: capture pending, success, duplicate and error for final delivery.
4. Final visual review: check the recall question at full mobile width as well as the hero.
5. Final audit: use the final bundle, rather than carrying forward earlier Lighthouse numbers.

### 8 — receipt and final critique

Added an immediate provisional receipt, followed by confirmed storage feedback or an editable retry state. Final full-size review caught a remaining “2?” orphan in recall-375.png; shortened the question to “How do System 1 and System 2 differ?” and balanced its lines across desktop and mobile. Form-state review also caught a small privacy-line movement; matched the consent and receipt row heights and added geometry assertions for pending, success, duplicate and error states. Repeated the final capture/audit against the rebuilt bundle.

The final inspection found no remaining noticeable visual defect in the reviewed viewports. There are no five unresolved visual flaws to manufacture. Remaining product/deployment work is listed below, separately from the visual judgment.

Performance verification caught variability before the final favicon correction: one mobile run scored 82 with simulated LCP 4.6s (observed first paint 1.21s); an unchanged-code repeat scored 96 with observed first paint 0.205s. The slow JSON/HTML report is preserved as lighthouse-mobile-slow.* alongside scores-slow.json. Inspection also exposed the 252KB full-size logo being requested as a favicon. Reused the existing 7KB Quill apple icon for the favicon, removing approximately 245KB of unnecessary transfer. Final scores refer to that corrected bundle; this change is a concrete size reduction, not proof that the icon alone caused the slow run.

## Final evidence

| Category | Score | Evidence |
| --- | ---: | --- |
| Visual identity | 9 | iteration-8/hero-1440.png: forest/grey palette, oversized Playfair, asymmetric actual-device composition; product and recall are distinct demonstrations. The three-device hero remains a familiar presentation, so this is not a 10 for originality. |
| Typography | 9.5 | hero-375/768/1440.png: self-hosted Playfair roman/italic plus DM Sans, deliberate headline scale and corrected tablet wrapping. recall-375.png has no isolated numeral. |
| Layout / spacing | 9.5 | product-1440.png and waitlist-768/1440.png: aligned editorial grid, alternating composition and clear separation; product-phone-375.png shows the complete phone with breathing room. |
| Motion | 9.5 | components/Motion.tsx: 1.045s hero stagger, CustomEase and scrubbed phone reveal. qa/motion.json: about 60fps, 16.8ms p95 frames in the recorded local sample. Reduced-motion preference changes destroy Lenis and reset transforms. |
| Copy | 9.5 | Voice example names Thursday, Priya and the onboarding flow; structured screen preserves those specifics. No fabricated proof. Interactive samples are explicitly labelled illustrative. |
| Conversion | 9.5 | qa/results.json and form-state PNGs: invalid input focus, explicit consent, immediate receipt, confirmed local write, normalised duplicates, preserved-input retry, shared forms with a single completion announcement. |
| Responsiveness | 10 within test matrix | Chrome: 320/375/768/1024/1440/1920px; WebKit: 320/375/768/1440px. No horizontal overflow, page errors or visible targets under 44px in captures. Stable recall question/answer heights at 320px. |
| Performance / accessibility | 9.5 | iteration-8/scores.json and Lighthouse HTML reports; qa/axe-*.json has zero A/AA violations in four product states. Native keyboard navigation, visible focus and labelled fields. This is lab testing, not field performance data. |

Final design average: **9.5 / 10**. Screenshots include each major section at 375, 768 and 1440px; full-page captures are available at all three widths. Lighthouse runs use mobile simulated throttling and a desktop profile, without concurrent browser workloads.

## What is verified, and what is next

The production build and TypeScript checks pass. Local-mode API writes, malformed input, consent requirements and concurrent duplicate requests are exercised against the actual server. Missing credentials are exercised against a separate actual 503 server. Chrome and Playwright WebKit are tested; WebKit mobile emulation is not a physical iPhone Safari test. The motion frame sample is one local run, not a universal 60fps guarantee.

Next, configure the existing Google Sheet using .env.example and verify a real registration against that sheet. No real Sheets credentials were available for this review. The current preview explicitly uses local storage and sends no invitations. For multiple server instances, use storage with an atomic unique email constraint and shared rate limiting; the Sheets read/append lock is per process. Before launch, test on physical iOS/Android devices and verify the public domain/canonical URLs. Confirm beta invitation operations and email ownership; this site collects entries but does not send invitation emails itself.

## Run and reproduce

`npm install`, then `npm run dev` (http://localhost:3000). Production: `npm run build`, then `npm start`.

The review preview runs at http://localhost:3100 with WAITLIST_STORE=local. To reproduce final evidence, set BASE_URL to that production server and run `node scripts/capture.mjs 8`, `node scripts/audit.mjs 8`, `node scripts/verify.mjs` and `node scripts/webkit-check.mjs`. WebKit requires `npx playwright install webkit`. The full setup is in README.md.
