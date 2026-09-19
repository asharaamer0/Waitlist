/**
 * Quill — Waitlist Auto-Email
 * --------------------------------
 * Paste this file into Extensions > Apps Script in your Google Sheet
 * (the sheet bound to GOOGLE_SHEET_ID).
 *
 * What it does:
 *  1) On every new row appended to Sheet1, sends a polished thank-you email
 *     from helloasharaamer@gmail.com (the Google account that owns the script).
 *  2) Provides a one-click bulk sender to email all waitlist entries when
 *     Quill launches or for updates.
 *
 * Setup (one time, 2 minutes):
 *  1) Open your waitlist Sheet → Extensions → Apps Script → paste Code.gs
 *  2) Run setupTrigger() once → Authorize → allows Gmail + Sheets access
 *  3) Check Triggers (clock icon) → you should see onWaitlistChange on change
 *  4) Test by adding a row manually — you should receive the email.
 *
 * Column layout expected (Sheet1!A:E):
 *   A: Timestamp | B: Name | C: Email | D: Who (roles) | E: How Heard
 * If you renamed the tab, update SHEET_NAME below.
 */

const SHEET_ID = '1lK-0AbdNCN-mTGL-nfUua64LgVUxUprq0COpc4qza5A';
const SHEET_NAME = 'Sheet1';
const FROM_NAME = 'Quill — helloasharaamer@gmail.com';
const REPLY_TO = 'helloasharaamer@gmail.com';
const SENDER_ALIAS = 'helloasharaamer@gmail.com'; // must be an alias/owner on the Gmail account

function getSheet_() {
  let ss = null;
  try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch(e) {}
  if (!ss) ss = SpreadsheetApp.openById(SHEET_ID);
  return ss.getSheetByName(SHEET_NAME);
}
function getSpreadsheet_() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) return ss;
  } catch(e) {}
  return SpreadsheetApp.openById(SHEET_ID);
}

// --- Core template ---
function buildWelcomeEmail_(name) {
  const firstName = (name || '').trim().split(/\s+/)[0] || 'there';
  const subject = `You're on the Quill waitlist — we'll let you know when it lands, ${firstName} ✦`;

  const html = `
  <div style="margin:0;padding:0;background:#d9d9d9;">
    <div style="max-width:560px;margin:0 auto;padding:32px 20px;font-family:Inter, -apple-system, system-ui, sans-serif;color:#374933;">
      <div style="background:#f5f5f0;border:1px solid rgba(55,73,51,0.12);border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(55,73,51,0.08);">
        <div style="padding:28px 28px 0 28px;">
          <div style="display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(55,73,51,0.12);border-radius:999px;padding:6px 12px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;color:#374933;background:#d9d9d9;">
            <span style="width:7px;height:7px;border-radius:999px;background:#374933;display:inline-block;"></span> Early access · Quill
          </div>
          <h1 style="margin:18px 0 0 0;font-family:Playfair Display, Georgia, serif;font-size:28px;line-height:1.1;letter-spacing:-0.03em;color:#374933;">
            You're on the list, ${firstName}.
          </h1>
          <p style="margin:12px 0 0 0;font-size:15px;line-height:1.65;color:#6b6b6b;">
            Thanks for joining the Quill waitlist — we're building a quiet place where voice, text, and PDFs turn into clean, titled notes and flashcards automatically.
          </p>
        </div>

        <div style="margin:22px 28px 0 28px;border-top:1px solid rgba(55,73,51,0.08);"></div>

        <div style="padding:20px 28px;">
          <p style="margin:0 0 10px 0;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#374933;opacity:0.9;">What happens next</p>
          <ol style="margin:0;padding-left:18px;color:#6b6b6b;font-size:14px;line-height:1.7;">
            <li><strong style="color:#374933;">We keep it quiet.</strong> No spam — only early-access and launch notes (a handful total).</li>
            <li><strong style="color:#374933;">You'll be first in line.</strong> We'll email you as soon as your slot opens.</li>
            <li><strong style="color:#374933;">Your data stays private.</strong> One private Sheet owned by Quill; never sold, never shared. Reply to any email to see, correct, or delete your entry.</li>
          </ol>
        </div>

        <div style="margin:0 28px;border-radius:14px;background:#d9d9d9;border:1px solid rgba(55,73,51,0.08);padding:14px 16px;display:flex;gap:12px;align-items:flex-start;">
          <span style="width:28px;height:28px;border-radius:10px;background:#374933;color:#f5f5f0;display:inline-flex;align-items:center;justify-content:center;font-size:14px;flex:none;">✦</span>
          <p style="margin:0;font-size:13.5px;line-height:1.6;color:#6b6b6b;">
            Have a question, idea, or want off the list? Just reply to this email or write directly to <a href="mailto:${REPLY_TO}" style="color:#374933;font-weight:600;text-decoration:underline;">${REPLY_TO}</a> — we read every message and reply within a day.
          </p>
        </div>

        <div style="padding:18px 28px 28px 28px;">
          <p style="margin:0;font-size:13.5px;line-height:1.6;color:#6b6b6b;">
            Keep thinking out loud — Quill will handle the structuring, titling, and remembering.<br/>
            — Ashara & the Quill team
          </p>
          <p style="margin:14px 0 0 0;font-size:12px;line-height:1.5;color:#a8a8a8;">
            Quill · Capture at the speed of thought · <a href="mailto:${REPLY_TO}" style="color:#374933;">${REPLY_TO}</a>
          </p>
        </div>
      </div>

      <p style="margin:16px 0 0 0;text-align:center;font-size:11px;color:#a8a8a8;line-height:1.5;">
        You received this because you joined the waitlist at quill — if this wasn't you, just ignore this email.
      </p>
    </div>
  </div>
  `;

  const plain = `You're on the Quill waitlist, ${firstName}!\n\n` +
    `Thanks for joining — we're building a quiet place where voice, text, and PDFs turn into clean notes and flashcards automatically.\n\n` +
    `What happens next:\n` +
    `1) No spam — only early-access / launch notes (a handful total).\n` +
    `2) You'll be first in line — we'll email you as soon as your slot opens.\n` +
    `3) Your data stays private — one private Sheet, never sold or shared. Reply to any email to see, correct, or delete.\n\n` +
    `Questions? Reply to this email or write to ${REPLY_TO} — we reply within a day.\n\n` +
    `— Ashara & the Quill team\nQuill · Capture at the speed of thought`;

  return { subject: subject, html: html, plain: plain };
}

function sendWelcomeEmail_(email, name) {
  if (!email) return;
  const tpl = buildWelcomeEmail_(name);
  GmailApp.sendEmail(email, tpl.subject, tpl.plain, {
    htmlBody: tpl.html,
    name: 'Quill',
    replyTo: REPLY_TO,
    // from: SENDER_ALIAS // uncomment if you have added the alias via Gmail Settings > Accounts
  });
}

/**
 * Trigger: fires on every sheet edit / appended row.
 * Works for both Google Forms submissions and API appends (via onChange).
 * We deduplicate by marking column F = "emailed".
 */
function onWaitlistChange(e) {
  try {
    const sheet = getSheet_();
    if (!sheet) return;
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return; // header only

    // Ensure header for dedup column F
    if (sheet.getRange(1, 6).getValue() !== 'Emailed') {
      sheet.getRange(1, 6).setValue('Emailed');
    }

    // Scan last 20 rows for un-emailed entries (covers bulk appends)
    const start = Math.max(2, lastRow - 19);
    const range = sheet.getRange(start, 1, lastRow - start + 1, 6);
    const values = range.getValues();

    for (let i = 0; i < values.length; i++) {
      const rowIdx = start + i;
      const [timestamp, name, email, who, howHeard, emailed] = values[i];
      if (!email) continue;
      if (emailed === 'sent' || emailed === 'error') continue;

      // Basic email validation
      if (!String(email).includes('@')) {
        sheet.getRange(rowIdx, 6).setValue('error');
        continue;
      }

      try {
        sendWelcomeEmail_(String(email).trim(), String(name).trim());
        sheet.getRange(rowIdx, 6).setValue('sent');
        sheet.getRange(rowIdx, 7).setValue(new Date().toISOString()); // G = sent at
        Utilities.sleep(300); // gentle throttle
      } catch (err) {
        sheet.getRange(rowIdx, 6).setValue('error');
        console.error('Quill email failed for row ' + rowIdx + ': ' + err);
      }
    }
  } catch (err) {
    console.error('onWaitlistChange failed: ' + err);
  }
}

/**
 * For Google Forms users: keep this alias — Forms triggers call onFormSubmit.
 */
function onFormSubmit(e) {
  onWaitlistChange(e);
}

/**
 * One-time setup — run this manually from the editor.
 * Creates the onChange trigger so API appends also send email.
 */
function setupTrigger() {
  // Remove old duplicates
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'onWaitlistChange' || t.getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(t);
    }
  });
  const ss = getSpreadsheet_();
  ScriptApp.newTrigger('onWaitlistChange').forSpreadsheet(ss).onChange().create();
  // Also watch form submit if a Form is linked
  ScriptApp.newTrigger('onFormSubmit').forSpreadsheet(ss).onFormSubmit().create();
  try { SpreadsheetApp.getUi().alert('Quill trigger installed ✓\n\nonWaitlistChange (onChange) + onFormSubmit are now active.\nNew rows in ' + SHEET_NAME + ' will auto-receive the welcome email from ' + REPLY_TO); } catch(e) { console.log('Quill trigger installed ✓'); }
}

/**
 * Run this to re-send welcome emails to rows missing the "sent" flag
 * (useful after pasting Code.gs into an existing sheet with old rows).
 */
function backfillUnsent() {
  onWaitlistChange(null);
}

/**
 * Bulk email all waitlist entries — use when Quill launches.
 * Shows a dialog with subject + body, then sends to every unique email in Sheet1.
 *
 * Usage:
 *  1) Run sendBulkLaunchUpdate() from the editor, or
 *  2) From Sheets: Quill menu → Send launch update
 */
function sendBulkLaunchUpdate() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.prompt('Quill bulk email', 'Subject line:', ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return;
  const subject = resp.getResponseText().trim();
  if (!subject) { ui.alert('Cancelled — empty subject.'); return; }

  const resp2 = ui.prompt('Quill bulk email', 'HTML body (you can paste plain text — it will be wrapped):', ui.ButtonSet.OK_CANCEL);
  if (resp2.getSelectedButton() !== ui.Button.OK) return;
  const body = resp2.getResponseText();
  if (!body) { ui.alert('Cancelled — empty body.'); return; }

  const html = '<div style="font-family:Inter, sans-serif; color:#374933; max-width:560px; margin:0 auto; padding:24px; background:#f5f5f0; border-radius:16px; border:1px solid rgba(55,73,51,0.12);">' + body + '<p style="margin-top:20px; font-size:12px; color:#a8a8a8;">— Quill · <a href="mailto:' + REPLY_TO + '">' + REPLY_TO + '</a></p></div>';

  const sheet = getSheet_();
  const data = sheet.getRange(2, 1, Math.max(0, sheet.getLastRow() - 1), 3).getValues();
  const seen = new Set();
  let sent = 0;

  for (const [_, name, email] of data) {
    const em = String(email || '').trim().toLowerCase();
    if (!em || seen.has(em) || !em.includes('@')) continue;
    seen.add(em);
    try {
      GmailApp.sendEmail(em, subject, body.replace(/<[^>]*>/g, ''), { htmlBody: html, name: 'Quill', replyTo: REPLY_TO });
      sent++;
      Utilities.sleep(400); // avoid rate limit: ~150/sec quota, we go slower
    } catch (e) {
      console.error('Bulk send failed for ' + em + ': ' + e);
    }
  }

  ui.alert('Quill bulk email sent to ' + sent + ' unique address(es) ✓');
}

// Add a custom menu so non-technical users can trigger bulk send
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Quill ✦')
    .addItem('Send welcome to unsent rows', 'backfillUnsent')
    .addItem('Send launch update to all', 'sendBulkLaunchUpdate')
    .addItem('Re-install trigger', 'setupTrigger')
    .addToUi();
}
