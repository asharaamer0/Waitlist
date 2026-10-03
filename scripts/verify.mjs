import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const dir = "artifacts/qa";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
async function test(name, run) {
  try { await run(); results.push({ name, status: "pass" }); }
  catch (error) { results.push({ name, status: "fail", error: error.message }); }
}
const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
const page = await context.newPage();
const base = process.env.BASE_URL || "http://localhost:3100";
await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const form = page.getByRole("form", { name: "Join the Quill waitlist", exact: true });
const input = page.locator("#final-email");
const button = form.locator(".full-submit");
const consent = form.getByRole("checkbox", { name: /^I agree/ });
const geometry = () => form.evaluate(el => ({ height: el.getBoundingClientRect().height, privacyTop: el.querySelector(".signup-notice").getBoundingClientRect().top - el.getBoundingClientRect().top }));
const initialGeometry = await geometry();
async function expectStableGeometry() {
  const current = await geometry();
  expect(current.height).toBeCloseTo(initialGeometry.height, 2);
  expect(current.privacyTop).toBeCloseTo(initialGeometry.privacyTop, 2);
}
await test("Hero carries email to the full form without submitting", async () => {
  let requests = 0; page.on("request", r => { if(r.url().endsWith('/api/waitlist') && r.method() === 'POST') requests++; });
  await page.locator('#hero-email').fill('handoff@example.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(input).toHaveValue('handoff@example.test');
  await expect(page.locator('#final-name')).toBeFocused(); expect(requests).toBe(0);
  await input.fill('');
});
await test("Full name validation focuses the name field", async () => {
  await button.click(); await expect(page.locator('#final-name')).toBeFocused();
  await expect(page.locator('#final-feedback')).toContainText('full name');
  await page.locator('#final-name').fill('QA Tester');
});
await test("Email validation focuses the email field", async () => {
  await button.click(); await expect(input).toBeFocused();
  await expect(page.locator("#final-feedback")).toContainText("valid email");
});
await test("Role selection is required and supports multiple choices", async () => {
  await input.fill('qa-' + Date.now() + '@example.test'); await button.click();
  await expect(form.getByRole('checkbox', { name: 'Student', exact: true })).toBeFocused();
  await expect(page.locator('#final-feedback')).toContainText('at least one');
  await form.getByRole('checkbox', { name: 'Student', exact: true }).check();
  await form.getByRole('checkbox', { name: 'Writer', exact: true }).check();
});
await test("Explicit consent validation focuses the checkbox", async () => {
  await input.fill("qa-" + Date.now() + "@example.test"); await button.click();
  await expect(consent).toBeFocused();
  await expect(page.locator("#final-feedback")).toContainText("agree");
});
await test("Network failure preserves input and allows retry", async () => {
  await consent.check();
  await form.getByRole('radio', { name: 'YouTube', exact: true }).check();
  const email = await input.inputValue();
  await page.route("**/api/waitlist", route => route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ error: "Unavailable" }) }));
  await button.click(); await expect(page.locator("#final-feedback")).toContainText("try again");
  await expect(input).toHaveValue(email); await expect(button).toBeEnabled();
  await expect(form.getByLabel('Full name')).toHaveValue('QA Tester');
  await expect(form.getByRole('checkbox', { name: 'Student', exact: true })).toBeChecked();
  await expect(form.getByRole('checkbox', { name: 'Writer', exact: true })).toBeChecked();
  await expect(form.getByRole('radio', { name: 'YouTube', exact: true })).toBeChecked();
  await expectStableGeometry();
  await page.screenshot({ path: dir + "/form-error.png" });
  await page.unroute("**/api/waitlist");
});
await test("Optimistic saving state, confirmed success and shared form state", async () => {
  await page.route("**/api/waitlist", async route => { await new Promise(r => setTimeout(r, 550)); await route.continue(); });
  await button.click(); await expect(button).toContainText("Saving your place");
  await expect(form).toHaveAttribute("data-state", "optimistic");
  await expect(form).toContainText("Your request is ready. Confirming your place");
  await expectStableGeometry();
  await page.screenshot({ path: dir + "/form-optimistic.png" });
  await expect(button).toContainText("You’re on the list", { timeout: 20000 });
  await expect(page.locator('.hero-capture button')).toContainText("You’re on the list");
  await expect(page.locator('.success-message[role="status"]')).toHaveCount(1);
  await expect(form).toContainText("No invitation will be sent");
  await expectStableGeometry();
  await page.screenshot({ path: dir + "/form-success.png" });
  await page.unroute("**/api/waitlist");
});
const savedEmail = await input.inputValue();
await page.reload({ waitUntil: "networkidle" });
await test("Case-insensitive duplicate email gets a clear existing-entry state", async () => {
  await input.fill("  " + savedEmail.toUpperCase() + "  ");
  await form.getByLabel('Full name').fill('QA Tester');
  await form.getByRole('checkbox', { name: 'Student', exact: true }).check();
  await consent.check(); await button.click();
  await expect(button).toContainText("You’re on the list");
  // Local mode must remain clear, including duplicate results.
  await expect(form).toContainText("already in the local demo list");
  await expectStableGeometry();
  await page.screenshot({ path: dir + "/form-duplicate.png" });
});
await test("Malformed JSON and missing consent rejected by actual endpoint", async () => {
  const invalid = await page.request.post(base + "/api/waitlist", { data: "{bad", headers: { "Content-Type": "application/json" } });
  expect(invalid.status()).toBe(400);
  const noConsent = await page.request.post(base + "/api/waitlist", { data: { email: "person@example.test" } });
  expect(noConsent.status()).toBe(400);
});
await test("Concurrent local duplicates produce exactly one registration", async () => {
  const email = "parallel-" + Date.now() + "@example.test";
  const responses = await Promise.all(Array.from({ length: 3 }, () => page.request.post(base + "/api/waitlist", { data: { email, name: 'Parallel Tester', who: ['Student'], consent: true } })));
  expect(responses.map(r => r.status()).sort()).toEqual([201, 409, 409]);
});
await test("Server requires full details and rejects unknown choices", async () => {
  const valid = { email: 'validation@example.test', name: 'QA Tester', who: ['Student'], consent: true };
  for (const data of [{ ...valid, name: '' }, { ...valid, who: [] }, { ...valid, who: ['Unknown role'] }, { ...valid, howHeard: 'Unknown source' }]) {
    expect((await page.request.post(base + '/api/waitlist', { data })).status()).toBe(400);
  }
});
await test("Product tabs support keyboard navigation and flashcard interaction", async () => {
  await page.locator("#step-1").focus(); await page.keyboard.press("ArrowRight");
  await expect(page.locator("#step-2")).toBeFocused(); await expect(page.locator("#step-2")).toHaveAttribute("aria-selected", "true");
  const card = page.locator(".phone-flashcard"); await card.click(); await expect(card).toContainText("Thursday.");
  await page.keyboard.press("Space"); await expect(card).toContainText("When is");
});
await test("Recall deck works by keyboard and reveals the answer", async () => {
  const card = page.locator(".recall-card"); await card.focus(); await page.keyboard.press("Enter");
  await expect(card).toContainText("fast and intuitive");
});
await test("Reduced motion disables smooth scrolling and recording animation", async () => {
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.reload({ waitUntil: "networkidle" });
  expect(await page.evaluate(() => document.documentElement.classList.contains("lenis"))).toBe(false);
  await page.locator("#step-0").click();
  expect(await page.locator(".recording-wave span").first().evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  await page.screenshot({ path: dir + "/reduced-motion.png", fullPage: true });
});
await test("Native keyboard focus is visible and privacy page works", async () => {
  await page.goto(base + "/privacy", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Waitlist privacy." })).toBeVisible();
  await page.keyboard.press("Tab");
  expect(await page.locator(":focus").evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe("none");
});
for (const width of [320, 375, 768, 1024, 1440, 1920]) {
  await test("No overflow at " + width + "px", async () => {
    await page.setViewportSize({ width, height: 1000 }); await page.goto(base, { waitUntil: "networkidle" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    const font = await page.locator("h1").evaluate(el => getComputedStyle(el).fontFamily);
    expect(font).toMatch(/^display,/);
  });
}
for (const state of ["initial", "recording", "review", "answer"]) {
  await test("WCAG A/AA axe audit: " + state, async () => {
    await page.setViewportSize({ width: 375, height: 812 }); await page.goto(base, { waitUntil: "networkidle" });
    if (state === "recording") await page.locator("#step-0").click();
    if (state === "review") await page.locator("#step-2").click();
    if (state === "answer") await page.locator(".recall-card").click();
    if (state === "recording") await expect(page.locator(".recording-screen")).toBeVisible();
    if (state === "review") await expect(page.locator(".phone-review")).toBeVisible();
    const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    await writeFile(dir + "/axe-" + state + ".json", JSON.stringify(scan.violations, null, 2));
    expect(scan.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
  });
}
await browser.close();
await writeFile(dir + "/results.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
if (results.some(r => r.status === "fail")) process.exitCode = 1;
