import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.BASE_URL || 'http://localhost:3100';
const dir = 'artifacts/qa/hero';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const rows = [];
for (const width of [320,375,768,1024,1440,1920]) {
  const page = await browser.newPage({ viewport: { width, height: width <= 375 ? 812 : 1000 } });
  await page.goto(base, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(1100);
  const button = page.locator('.thought-toggle'); await button.scrollIntoViewIfNeeded();
  const points = await button.evaluate(el => {
    const r = el.getBoundingClientRect();
    return [r.left+r.width/2,r.right-12].map(x => el.contains(document.elementFromPoint(x,r.top+r.height/2)));
  });
  const row = { width, overflow: await page.evaluate(() => document.documentElement.scrollWidth !== innerWidth), buttonUnobstructed: points.every(Boolean), unchangedHeight: false, keyboard: false };
  try {
    expect(row.overflow).toBe(false); expect(points).toEqual([true,true]);
    const height = await page.locator('.hero-thought').evaluate(el => el.getBoundingClientRect().height);
    await button.focus(); await page.keyboard.press('Enter'); await expect(button).toHaveAttribute('aria-pressed','true');
    await expect(page.locator('.thought-slip')).toContainText('Design review on Thursday');
    expect(await page.locator('.hero-thought').evaluate(el => el.getBoundingClientRect().height)).toBe(height);
    row.unchangedHeight = true; row.keyboard = true;
    await page.locator('.hero-thought').screenshot({ path: dir+'/note-'+width+'.png' });
    await page.keyboard.press('Space'); await expect(button).toHaveAttribute('aria-pressed','false');
    await page.locator('.hero-thought').screenshot({ path: dir+'/voice-'+width+'.png' });
  } catch(error) { row.error = error.message; }
  rows.push(row); await page.close();
}
await browser.close(); await writeFile(dir+'/results.json',JSON.stringify(rows,null,2)); console.log(JSON.stringify(rows,null,2));
if(rows.some(row=>row.error))process.exitCode=1;
