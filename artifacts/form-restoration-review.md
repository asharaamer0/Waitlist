# Original waitlist form restored

4 October 2026. The original `Waitlist-main.zip` supplied the exact field labels and choices. This report updates the email-only conversion flow described in the earlier hero review.

| Before | After | Why |
| --- | --- | --- |
| Email and consent only | Full name, email, original 13 role choices, original eight referral choices, consent | Restore the information the user intended to collect |
| Hero submitted immediately | Hero Continue pre-fills the full form and focuses its name field | An email alone must not create an incomplete signup |
| Header link opened hero email | Header Join the waitlist opens `/#waitlist` | Expose the complete form directly |
| API permitted missing name and roles | Name and at least one allowed role are required; referral is optional | Validate the complete submission on the server too |
| Generic retry only referred to email | Retry preserves name, email, roles, source and consent | Avoid making visitors repeat their selections |
| Choice styles depended on relational selected-state selectors | Selected classes derive from the existing form state | Reduce selector work without changing the appearance |

## Fields

Full name and email are required. The multi-select roles are Student, Researcher, Writer, Professional, Developer, Designer, Teacher, Entrepreneur, Content creator, Healthcare worker, Lawyer, Journalist, and Other. At least one role is required.

The optional single-select referral source is Instagram, YouTube, Twitter / X, A friend, Reddit, Google, AI tools newsletter, or Other. Clear selection returns it to blank. Early-access storage/contact consent is required and covers all collected fields. The privacy page reflects the restored fields.

The native role checkboxes and referral radio buttons support keyboard interaction and have 44px input hit areas. The selected forest-green state does not replace their checked semantics. Reduced-motion behavior is retained.

## Captures and results

Current production hero, full-page and mid-section screenshots at 375, 768 and 1440px are in `iteration-restored-form-final`. `full-form-375.png`, `full-form-768.png`, and `full-form-1440.png` show the complete form, including every role and referral choice, consent, submit button and privacy link.

The first development capture used stale CSS during HMR and is not final evidence. Restarting the development server and building production resolved that capture issue; the live development stylesheet was checked for the full-form and selected-state rules.

The first production audit scored 80 mobile performance, with elevated layout/script work; its report is retained in `iteration-restored-form`. Selected-state selector work was simplified, the app was rebuilt and recaptured, and the final audit below meets the targets. Host load can also affect these lab results, so the score difference is not attributed solely to that CSS change.

| Lighthouse metric | Final mobile | Final desktop |
| --- | ---: | ---: |
| Performance | 99 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 1.744s | 0.623s |
| CLS | 0.000198 | 0.000100 |
| Total blocking time | 79.5ms | 0ms |

The JSON and HTML Lighthouse reports are retained beside the screenshots. Measurements are localhost lab results, not field data.

Production build and TypeScript checks pass. All 25 functional/accessibility checks pass (`qa/results.json`), including email handoff with zero signup POSTs, focused validation of name/email/roles/consent, multiple roles, preservation of all fields after failure, optimistic receipt, actual success, normalized duplicates, concurrency and four axe A/AA states. There is no overflow at six widths from 320 to 1920px.

Current WebKit checks pass at 320, 375, 768 and 1440px, including actual signup, native consent rendering, keyboard navigation, a single receipt announcement and no undersized controls. This is engine emulation, not a physical-device test. The motion check also confirms that navigation from the privacy page reaches the full form; measured scroll motion averaged 59.96fps over 149 frames.

A real browser submission to the existing development server returned 201. The local JSON entry was checked for name, email, both chosen roles, referral source and consent (`qa/development.json`). A normalized duplicate returned 409. The actual unconfigured production endpoint still returns a specific 503 configuration message while preserving the full form (`qa/unconfigured.json`). No external emails or Sheet writes were sent during verification.

## Review

The hero identity, typography, motion and copy are retained from the previous review. My current scores are 9.5 for identity, typography, layout, motion, copy, conversion, responsiveness, and performance/accessibility (average 9.5). The restored form is longer because it contains the requested original questions; the hero and header make its location explicit. I found no remaining noticeable visual issue in the tested final captures.

Evidence for conversion and responsiveness is the complete-form screenshots, focus/validation/persistence results, and 44px target measurements above. The score is a design judgment within the requested field set, not a claim that collecting 13 role options has no conversion cost.

## Storage and running

New entries store all submitted fields in the existing local JSON shape or Google Sheet A:E columns. Duplicates retain their original stored details, including older email-only preview entries; restoration does not overwrite existing registrations. Google Sheets is implemented but cannot be externally verified without the three credentials. Local development sends no invitations.

From `Waitlist-main/Waitlist`, run `npm run dev`; the current development server is at `http://localhost:3001/#waitlist`. For the verified production preview, set `WAITLIST_STORE=local` and `WAITLIST_LOCAL_FILE=artifacts/qa/waitlist.json`, run `npm run build`, then `npm start -- --port 3100`. Next production step remains configuring and verifying the private Google Sheet.
