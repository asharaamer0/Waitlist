# Quill: revised hero and waitlist review

> The form was subsequently restored to its original full field set on 4 October 2026. The email-only flow below is historical; see [the current form restoration review](form-restoration-review.md) for current form behavior, captures and production audits.

Reviewed 2 October 2026. This supersedes the earlier design review. Scores are my design judgments, not independent awards. Lighthouse and functional results below are actual production-browser measurements.

The value proposition is spoken thoughts turned into ordered notes and flashcards. The target user thinks aloud and wants to revisit useful ideas. The single conversion goal is joining the early-access waitlist. Existing Quill branding, supplied app screenshots, grey/forest palette, and self-hosted Playfair Display with DM Sans are retained.

## Before / after

| Before | After | Reason |
| --- | --- | --- |
| Fresh development checkout returned 503 on every signup | Development automatically uses a visibly labelled local JSON store | Make the form usable without silently implying production storage |
| An unconfigured production server showed a generic retry message | Explicit storage-not-connected error, with email preserved | Repeating the request cannot repair missing credentials |
| Form looked like an unlabeled email strip | Visible “Join the waitlist” heading and “Your email address” label | Make the conversion mechanism unmistakable |
| Large generic promise alongside three devices | “Go off on a tangent. We’ll keep the thread.” with a transcript, connecting thread, and one real phone | Give the visual composition a reason grounded in the product |
| Static hero product illustration | Keyboard-operable thought-to-note example | Show what the product does before asking for trust |
| Long stacked mobile scene and obstructed tablet control | Compact mobile pairing; tablet reserves space for control and captions | Improve rhythm and preserve usable interactions |
| Hero entrance used opacity on the largest text | Staggered transform entrance with immediate legibility | Keep the entrance while avoiding an unnecessary LCP delay |

## Capture and improvement passes

All current production screenshots are in `iteration-hero-5`: hero, full-page, and mid-scroll product, recall, and final waitlist captures at 375, 768, and 1440px. The interactive hero states were separately captured at 320, 375, 768, 1024, 1440, and 1920px in `qa/hero`.

1. Replaced the headline and three-device composition; repaired storage configuration and exposed form labels. Prototype had a transcript card and crowded tablet positions. The first development capture mixed HMR states, so it is not reliable final visual evidence and has no claimed Lighthouse score.
2. Removed the floating card treatment and gave the transcript an editorial margin. At 375px, the tall stacked scene noticeably delayed the next section. At 768px, the phone encroached on the demo control and caption. See `iteration-hero-2/full-375.png` and `hero-768.png`.
3. Compressed the mobile scene to a side-by-side thought/phone pairing and reserved tablet control/caption space. The tablet connector still stopped above the device. See `iteration-hero-3/hero-768.png`. These development capture passes were not Lighthouse-audited; performance was measured in the subsequent production passes.
4. Built and inspected the complete production page. Mobile Lighthouse: 99 performance, 100 accessibility, 100 SEO. Desktop: 100 in each. The remaining visible defect was the tablet connector endpoint; layout and responsiveness stayed at 9 rather than being raised prematurely.
5. Corrected the tablet thread, restored the beta status alignment, and updated the sharing image to the new hero. Rebuilt, recaptured every required viewport/section, and reran form, interaction, motion, WebKit, and unconfigured-production checks. Latest mobile Lighthouse is 98/100/100; desktop is 100/100/100. No remaining defect in these captures is noticeable to me as a designer.

### Review score progression

Passes 2 and 3 are retrospective visual reviews of their saved captures. “Unmeasured” means no Lighthouse claim for that build.

| Pass | Identity | Type | Layout | Motion | Copy | Conversion | Responsive | Performance / accessibility |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 2 | 9 | 9.5 | 8.5 | 9.5 | 9.5 | 9.5 | 8.5 | Unmeasured |
| 3 | 9.5 | 9.5 | 9 | 9.5 | 9.5 | 9.5 | 9 | Unmeasured |
| 4 | 9.5 | 9.5 | 9 | 9.5 | 9.5 | 9.5 | 9 | 9.5 |
| 5 | 9.5 | 9.5 | 9.5 | 9.5 | 9.5 | 9.5 | 9.5 | 9.5 |

The two scores below 9 in pass 2 are supported by the 375px scene length and the overlapping 768px control/caption described above. They changed through composition adjustments, not smaller type or hidden content.

## Five highest-impact flaws, ranked and resolved

1. **Every default development signup failed.** Actual browser signup now returns 201 and persists in `.data/waitlist.json`; a normalized repeat returns 409. `qa/development.json` records this against the existing development server without adding credentials.
2. **The form did not look like a form.** Explicit heading, visible email label, consent, and primary button are beneath the hero copy, inside the 375px initial viewport. See `iteration-hero-5/hero-375.png` and `components/WaitlistForm.tsx:68`.
3. **The hero had a generic oversized headline plus device collage.** The new asymmetrical composition relates a specific spoken thought to order and recall. See `iteration-hero-5/hero-1440.png` and `components/HeroThought.tsx:14`.
4. **Mobile demonstration took too much vertical space.** The 450px scene keeps thought and device together. Compare full 375px captures in passes 2 and 5.
5. **Tablet controls, caption, and connector fought for space.** The device now starts below the control; the connector reaches it, and captions are legible without overlap. See `iteration-hero-5/hero-768.png`; six-width hit testing confirms the control is unobstructed (`qa/hero/results.json`).

## Final scores and evidence

| Category | Score | Evidence |
| --- | ---: | --- |
| Visual identity / originality | 9.5 | Transcript-to-device thread, real screen, typographic margin, and product-specific tangent concept in `hero-1440.png`; no generic feature-card row or ornamental gradient |
| Typography | 9.5 | Playfair roman/italic headline and DM Sans transcript/body; controlled two-line hero at 375/768/1440; fonts loaded in `viewports.json` |
| Layout / spacing | 9.5 | Asymmetric desktop grid, composed tablet arrangement, compact mobile pairing, and ruled transitions; full-page captures at all three required widths |
| Motion | 9.5 | Hero stagger completes in approximately 0.875s with custom easing (`components/Motion.tsx:24`); scroll-linked product transformation, tactile CTAs, reduced-motion cleanup; 59.95fps average over 149 measured frames (`qa/motion.json`) |
| Copywriting | 9.5 | Concrete audience, voice-to-notes-to-flashcards explanation, and Thursday/Priya example; preview and real app screen are explicitly distinguished |
| Conversion | 9.5 | Above-fold labelled form, email + consent only; invalid input, pending receipt, actual 201, duplicate 409, retry rollback, preserved input and shared form state pass (`qa/results.json`) |
| Responsiveness | 9.5 | No overflow at six widths; no undersized visible targets at required capture widths; hero keyboard toggle never changes scene height or has covered hit area; WebKit 320/375/768/1440 passes |
| Performance / accessibility | 9.5 | Latest mobile 98 performance / 100 accessibility / 100 SEO; desktop 100/100/100; four axe A/AA states have no violations, visible keyboard focus, reduced motion, self-hosted fonts and negligible measured CLS |

Average: **9.5/10**. I found no remaining noticeable visual defect in the final captures. This is a review of the tested build and viewport matrix, not a guarantee across all hardware or an award prediction.

## Measured production results

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Lighthouse performance | 98 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest contentful paint | 2.119s | 0.540s |
| Total blocking time | 83ms | 0ms |
| Cumulative layout shift | 0.000247 | 0.000096 |

Full JSON and HTML reports are in `iteration-hero-5`. The previous production pass scored 99 mobile performance; both meet the requested threshold. Lighthouse still reports unused/legacy JavaScript opportunities, so 9.5 does not imply a perfect optimization score. These are localhost lab results, not field data.

Production build and TypeScript checks pass. The 21 main functional/accessibility checks, six hero interaction widths, four WebKit widths, and current motion checks pass. The actual unconfigured production endpoint returns 503 with a specific configuration message and preserved input (`qa/unconfigured.json`). WebKit is browser-engine emulation, not a physical iPhone test.

## How signup works and next production step

The email/consent form submits directly to `/api/waitlist`. There is no separate Google Form. Development without credentials stores entries in `.data/waitlist.json`, visibly labelled as local preview. The running isolated production preview uses `artifacts/qa/waitlist.json`; it sends no invitation emails.

For real production collection, configure `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and `GOOGLE_SHEET_ID` from `.env.example`, grant the service account access to the private `Sheet1`, and retain the documented A:E columns. The existing Google Sheets integration is implemented, but external persistence could not be verified without credentials. Invitation sending is a separate operational step; joining only stores an entry. Production does not silently fall back to local storage.

Next: connect and verify the private production Sheet, then configure the real public URL and invitation process. Before scaling across multiple server processes, use shared storage with a unique email constraint and a shared rate limit; current Sheets deduplication is serialized per process.

Run `npm install`, then `npm run dev` and open the localhost URL printed by Next.js. Production preview: `npm run build` then `npm start -- --port 3100`. See `../README.md` for the storage modes and reproducible verification commands.
