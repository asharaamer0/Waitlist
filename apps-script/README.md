# Quill — Waitlist Auto-Email via Apps Script

Sends a polished **thank-you email from `helloasharaamer@gmail.com`** every time someone joins the waitlist, plus a **one-click bulk sender** for launch day.

---

## 1) Install (2 minutes)

1. Open your waitlist Google Sheet (the one behind `GOOGLE_SHEET_ID` / `Sheet1`).
2. Top menu → **Extensions → Apps Script** → delete any existing `Code.gs` → paste `Code.gs` from this folder → **Save** (Ctrl+S).
3. In the toolbar, select `setupTrigger` → click **Run** → **Authorize** (choose the Gmail account `helloasharaamer@gmail.com`) → Allow `Gmail send` + `Sheets read/write`.
4. Check **Triggers** (clock icon left sidebar) — you should see:
   - `onWaitlistChange` → `On change`
   - `onFormSubmit` → `On form submit`

> This covers both **API appends** (Next.js `/api/waitlist` using googleapis) *and* Google Forms.

## 2) Test

- Add a test row to `Sheet1` manually: `Timestamp | Test Name | your+test@gmail.com | Student | Instagram`
- Within ~10 seconds column **F** should flip to `sent` and column **G** gets a timestamp — and you receive the welcome email.

Or run `Run → backfillUnsent` to sweep any existing rows.

## 3) How it works

- Sheet layout expected: `A:Timestamp B:Name C:Email D:Who E:HowHeard` (header row 1).
- Script marks `F:Emailed = sent` to dedupe — safe to run repeatedly.
- Email is sent via `GmailApp.sendEmail(...)` so it comes **from your Gmail** (`helloasharaamer@gmail.com`). For deliverability, ensure `helloasharaamer@gmail.com` is the sheet owner / script author.

### Welcome email copy (plain + HTML)

- Subject: `You're on the Quill waitlist — we'll let you know when it lands, <Name> ✦`
- Body explains: no spam, first-in-line, private sheet, reply to `helloasharaamer@gmail.com` for deletion/rights. Feel free to tweak `buildWelcomeEmail_()` in `Code.gs`.

## 4) Bulk / launch email to everyone

Later when Quill releases:

- In the Sheet → menu **Quill ✦ → Send launch update to all**
- Enter **Subject** then **HTML/body** → sends to every **unique email** in `Sheet1` (throttled to ~2.5/sec to avoid quota).

Programmatic alternative: also run `sendBulkLaunchUpdate()` directly from the Apps Script editor.

Quota notes: free Gmail ~500/day, Google Workspace ~2000/day. For > quota, run in batches across days or connect a Workspace account.

## 5) Mass-email outside the welcome flow

The dedup columns let you mass-email without duplicate welcomes:

- Welcome flow only touches rows where `F != sent`.
- Bulk sender uses a `Set` of emails, so duplicates are never mailed twice.

## 6) Troubleshooting

| Symptom | Fix |
|---|---|
| No trigger fires | Re-run `setupTrigger()`; check you authorized with `helloasharaamer@gmail.com` |
| `F` stays blank | Check sheet name is `Sheet1` (or edit `SHEET_NAME` constant) |
| Gmail quota error | Wait 24h or switch to Workspace; reduce `Utilities.sleep(400)` only if you have higher quota |
| Want to change copy | Edit `buildWelcomeEmail_()` → Save → new signups use new copy instantly |

---

### Files

- `Code.gs` — all logic (welcome + bulk + menu + triggers)
- `README.md` — this file

Contact for issues: **helloasharaamer@gmail.com**
