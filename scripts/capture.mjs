import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const iteration = process.argv[2] || "1";
const base = process.env.BASE_URL || "http://localhost:3100";
const dir = "artifacts/iteration-" + iteration;
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const metrics = [];
for (const width of [375, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: width === 375 ? 812 : 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1300);
  await page.screenshot({ path: dir + "/hero-" + width + ".png" });
  for (const id of ["product", "recall", "waitlist"]) {
    await page.evaluate(id => { const el = document.getElementById(id); window.scrollTo(0, el.offsetTop + (id === "product" ? 200 : 0)); }, id);
    await page.waitForTimeout(900);
    await page.screenshot({ path: dir + "/" + id + "-" + width + ".png" });
  }
  await page.locator('.full-signup').screenshot({ path: dir + '/full-form-' + width + '.png' });
  if (width === 375) {
    await page.locator(".phone-stage").scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.screenshot({ path: dir + "/product-phone-375.png" });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  await page.screenshot({ path: dir + "/full-" + width + ".png", fullPage: true });
  const info = await page.evaluate(() => ({
    width: innerWidth, documentWidth: document.documentElement.scrollWidth, cls: window.__cls,
    fonts: document.fonts.status,
    undersizedTargets: [...document.querySelectorAll("a,button,input[type=checkbox],input[type=radio]")].map(e => ({ tag: e.tagName, text: e.textContent.trim().slice(0,40), width: e.getBoundingClientRect().width, height: e.getBoundingClientRect().height })).filter(e => e.width > 0 && e.height > 0 && (e.width < 44 || e.height < 44)),
  }));
  metrics.push({ ...info, errors });
  await page.close();
}
await browser.close();
await writeFile(dir + "/viewports.json", JSON.stringify(metrics, null, 2));
console.log(JSON.stringify(metrics, null, 2));
