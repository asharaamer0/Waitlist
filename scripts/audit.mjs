import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
const iteration = process.argv[2] || "1";
const dir = "artifacts/iteration-" + iteration;
await mkdir(dir, { recursive: true });
const chrome = await launch({ chromePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"] });
const scores = {};
try {
  for (const mode of ["mobile", "desktop"]) {
    const result = await lighthouse(process.env.BASE_URL || "http://localhost:3100", { port: chrome.port, output: ["json", "html"], logLevel: "error", onlyCategories: ["performance", "accessibility", "best-practices", "seo"] }, mode === "desktop" ? { extends: "lighthouse:default", settings: { formFactor: "desktop", screenEmulation: { mobile: false, width: 1440, height: 1000, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 } } } : { extends: "lighthouse:default", settings: { screenEmulation: { mobile: true, width: 375, height: 812, deviceScaleFactor: 1, disabled: false } } });
    await writeFile(dir + "/lighthouse-" + mode + ".json", result.report[0]);
    await writeFile(dir + "/lighthouse-" + mode + ".html", result.report[1]);
    const lhr = result.lhr;
    scores[mode] = { ...Object.fromEntries(Object.entries(lhr.categories).map(([key,value]) => [key, Math.round(value.score * 100)])), lcp: lhr.audits["largest-contentful-paint"].numericValue, cls: lhr.audits["cumulative-layout-shift"].numericValue, tbt: lhr.audits["total-blocking-time"].numericValue,
      failures: Object.values(lhr.audits).filter(a => a.score !== null && a.score < 1).map(a => ({ id: a.id, title: a.title, score: a.score, displayValue: a.displayValue })) };
  }
} finally { await chrome.kill(); }
await writeFile(dir + "/scores.json", JSON.stringify(scores, null, 2));
console.log(JSON.stringify(scores, null, 2));
