# Quill product website

The site now presents the iOS app, saved flashcards, recall scoring, study tips and PDF export. The waitlist form is removed and `/api/waitlist` returns HTTP 410 without collecting entries or calling Google Sheets. Old waitlist records are not deleted by this change; handle withdrawal/deletion requests for those records through the owner contact.

Public app documents: `/privacy`, `/terms`, `/community`, `/support`. These match the in-app copy dated 4 October 2026, operated by Ashar Aamer (helloasharaamer@gmail.com). `lib/legal.ts` contains escaped, static generated HTML; no user content is injected into these pages.

Run `npm ci`, `npm run typecheck` and `npm run build`. Set `NEXT_PUBLIC_SITE_URL=https://quill.asharaamer.dev` and, once the listing exists, `NEXT_PUBLIC_APP_STORE_URL` to its real `https://apps.apple.com/...` URL. Until then the page identifies iPhone/iPad and transparently says the download link is pending. This avoids claiming an App Store release before approval. Vercel should use the default `.next` production output directory.

## Design and verification

The existing grey/forest-green palette, self-hosted Playfair and DM Sans fonts, real app artwork and interactive illustrative previews are retained. Motion respects reduced-motion preferences. Run the production preview with `npm start -- --port 3100`. Review the homepage at desktop and phone widths, check all four public documents, and confirm POST `/api/waitlist` returns 410.

Earlier waitlist and design review records remain under `artifacts/` as historical development evidence. Scripts that exercise signup refer to that earlier implementation and no longer describe the current site.
