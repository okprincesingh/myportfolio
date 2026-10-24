// Regenerates public/prince-singh-resume.pdf from tools/resume.html.
// Run: node tools/build-resume.mjs   (requires: npx playwright install chromium)
import { chromium } from "playwright";
import fs from "node:fs";

const source = "tools/resume.html";
const output = "public/prince-singh-resume.pdf";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setContent(fs.readFileSync(source, "utf8"));
await page.pdf({
  path: output,
  format: "A4",
  printBackground: true,
  margin: { top: "13mm", bottom: "13mm", left: "15mm", right: "15mm" },
});
await browser.close();

const buffer = fs.readFileSync(output);
if (buffer.subarray(0, 5).toString() !== "%PDF-") throw new Error("PDF generation failed");
console.log(`${output} written (${buffer.length} bytes)`);
