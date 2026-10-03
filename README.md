# Quill waitlist

Next.js App Router, TypeScript, Tailwind 4, GSAP / ScrollTrigger, Framer Motion and Lenis. The existing grey and forest-green brand, Playfair typography, real app screenshots, and Google Sheets integration are retained.

## Run

Node 22+ and npm. Run these commands inside `Waitlist-main/Waitlist`, where `package.json` is located. If your terminal is currently in `Waitlist-main`, run `cd Waitlist` first.

```sh
npm install
npm run dev
```

Open the localhost URL printed by Next.js (usually port 3000). For a production preview, run `npm run build` then `npm start -- --port 3100`.

## Waitlist

Copy `.env.example` to `.env.local` and supply the three Google Sheets credentials. Give the service account access to the private sheet, named `Sheet1`. Row 1: Timestamp, Name, Email, Who, HowHeard. The existing A:E shape and Apps Script remain compatible. The original full form has been restored: full name, email, one or more of the original 13 roles, an optional referral source from the original eight choices, and explicit consent. No credentials are shipped.

The hero email field is the first step: **Continue** carries the address into the full form and focuses the name field. It does not POST a signup. The header's **Join the waitlist** link opens the full form directly. Submission occurs only after the full form passes validation; all selected details are stored in the JSON entry or corresponding Google Sheet columns.

In development, a fresh checkout without credentials automatically saves signups in `.data/waitlist.json`. The page clearly labels this local preview; no invitations are sent. This fixes the previous default development behavior, which returned a 503 for every signup. Open the JSON file to see the saved email, consent and timestamp. There is no separate Google Form: the visible email form posts directly to `/api/waitlist`.

Production uses the existing Google Sheets endpoint when credentials are configured. Without them, it returns an explicit `WAITLIST_NOT_CONFIGURED` response, and the form explains that signups are not open on that server. Production never silently uses local files. For an explicit production preview, set `WAITLIST_STORE=local`; optionally set `WAITLIST_LOCAL_FILE` to choose the JSON file. Set `WAITLIST_STORE=sheets` to disable the automatic development fallback while testing Sheets setup.

Email addresses are trimmed and normalised. Case-insensitive duplicates return 409. JSON, name, email, allowed roles, optional referral source and consent are validated on the server. Sheet values use RAW to prevent formula interpretation. After validation, the UI immediately shows an optimistic receipt with confirmation pending, then confirms success or rolls back to an editable form with all details preserved. Hero and full form synchronise after success; only the full form makes the receipt announcement. Existing email-only entries remain readable and eligible for duplicate detection.

Google Sheets deduplication uses a serialised read-and-append per server process. For multiple server instances or high traffic, move storage to a database with a UNIQUE email constraint for atomic deduplication and add a shared rate limit. Local JSON is for preview only, not serverless production storage.

## Verification

```sh
npm run build
npm run typecheck
node scripts/capture.mjs 1
node scripts/audit.mjs 1
node scripts/verify.mjs
node scripts/hero-check.mjs
node scripts/motion-check.mjs
node scripts/webkit-check.mjs
```

The verification scripts default to a production server on port 3100 and installed Chrome. Start it with `npm start -- --port 3100`, or set `BASE_URL` to another address. Screenshots and Lighthouse reports are saved in `artifacts/iteration-N/`. Functional verification expects a local demo server. Configure `WAITLIST_STORE=local` and `WAITLIST_LOCAL_FILE=artifacts/qa/waitlist.json` for isolated QA entries.

`node scripts/development-check.mjs` separately verifies the automatic development store against port 3001 (override `BASE_URL` for the URL printed by your development server). It creates a synthetic test entry in `.data/waitlist.json` and checks browser success plus normalized duplicates.

The hero uses a single real device screen from the supplied grid image, presented through a CSS viewport. Its interactive transcript is an illustrative example, not live AI generation or audio playback. Fonts are self-hosted with next/font/local; licenses are in app/fonts. All transform motion has a reduced-motion fallback; touch scrolling remains native.

The social sharing image uses the same typography and real app screens. Regenerate it with `node scripts/build-og.mjs` after changing the brand or product image.

Development uses `.next-dev`; production builds use the standard `.next` directory, which Vercel expects. Simultaneous local development and production previews cannot overwrite each other's manifests. Use the Next.js framework preset and leave Vercel's Output Directory override disabled. WebKit verification requires `npx playwright install webkit`. The actual unconfigured-endpoint check runs against a separate server with Google credentials cleared, using `node scripts/unconfigured-check.mjs`; it never sends an external signup.

## Review

See `artifacts/form-restoration-review.md` for the current full form, verification, screenshots and production audits. `artifacts/hero-review.md` records the revised hero's design findings; its email-only form has since been replaced with the original field set. `artifacts/design-review.md` records the earlier direction and is superseded.

Captures, Lighthouse reports, recordings and QA signup entries are generated locally and excluded from Git. The written review documents are tracked; use the verification commands above to regenerate their visual and audit evidence.
