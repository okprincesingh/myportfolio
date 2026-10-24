import { test, expect } from "@playwright/test";

const baseURL = process.env.PORTFOLIO_URL || "http://127.0.0.1:4174";

const widths = [320, 390, 640, 768, 1024, 1440, 1920];

test("loads with real typefaces, every asset resolving and no runtime errors", async ({ page }) => {
  const missing: string[] = [];
  const errors: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) missing.push(`${response.status()} ${response.url()}`);
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseURL);
  await page.evaluate(() => document.fonts.ready);

  // The three faces must genuinely load — a silent fallback changes the whole design.
  expect(await page.evaluate(() => document.fonts.check("800 40px Archivo"))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('500 12px "JetBrains Mono"'))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check("italic 400 16px Newsreader"))).toBe(true);

  const heading = page.locator("h1.display");
  await expect(heading).toBeVisible();
  expect(await heading.evaluate((el) => getComputedStyle(el).fontFamily)).toContain("Archivo");
  // Expanded width axis must be applied, not just the weight.
  expect(await heading.evaluate((el) => getComputedStyle(el).fontStretch)).not.toBe("normal");

  expect(await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length)).toBe(0);
  expect(errors).toEqual([]);
  expect(missing, `Failed requests: ${missing.join(", ")}`).toEqual([]);
});

test("no horizontal overflow at any breakpoint", async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(baseURL);
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
      offenders: [...document.querySelectorAll<HTMLElement>("*")]
        .filter((el) => el.getBoundingClientRect().right > innerWidth + 2 && getComputedStyle(el).position !== "fixed")
        .slice(0, 5)
        .map((el) => `${el.tagName}.${el.className.toString().slice(0, 30)} @${Math.round(el.getBoundingClientRect().right)}`),
    }));
    expect(result.document, `document overflow at ${width}px: ${result.offenders.join(" | ")}`).toBeLessThanOrEqual(result.viewport);
    expect(result.body).toBeLessThanOrEqual(result.viewport);
  }
});

test("masthead contents strip jumps to each section", async ({ page }) => {
  await page.goto(baseURL);
  const strip = page.locator(".index-strip");
  await expect(strip.locator("a")).toHaveCount(5);
  await strip.locator("a", { hasText: "Capabilities" }).click();
  await expect(page).toHaveURL(/#stack$/);
  await expect(page.locator("#stack")).toBeInViewport();
});

test("case study dialog opens, closes on Escape and returns focus", async ({ page }) => {
  await page.goto(baseURL);
  const row = page.locator(".work-row").first();
  const opener = row.getByRole("button", { name: "Open case study" });
  await opener.click();

  const dialog = page.getByRole("dialog", { name: "Care Management Platform case study" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("h2")).toContainText("Care Management Platform");
  await expect(dialog.getByText("Frontend lead · partial backend")).toBeVisible();

  // the case study CTA must be a real, addressed mail link
  const cta = dialog.getByRole("link", { name: "Ask about this build" });
  expect(await cta.getAttribute("href")).toContain("mailto:okprincesingh@gmail.com");

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("capability tabs switch panels and declare selection", async ({ page }) => {
  await page.goto(baseURL);
  await page.locator("#stack").scrollIntoViewIfNeeded();
  const frontend = page.getByRole("tab", { name: "Frontend" });
  await expect(frontend).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#panel-frontend")).toBeVisible();
  await expect(page.locator("#panel-frontend")).toContainText("React.js");

  const commerce = page.getByRole("tab", { name: "Commerce" });
  await commerce.click();
  await expect(commerce).toHaveAttribute("aria-selected", "true");
  await expect(frontend).toHaveAttribute("aria-selected", "false");
  await expect(page.locator("#panel-commerce")).toContainText("WooCommerce");

  // proficiency meters fill once their group is on screen
  const meter = page.locator("#panel-commerce .meter i").first();
  await expect.poll(async () => Number.parseFloat(await meter.evaluate((el) => el.style.width))).toBeGreaterThan(50);
});

test("experience timeline lists every role from the résumé", async ({ page }) => {
  await page.goto(baseURL);
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await expect(page.locator(".job")).toHaveCount(3);
  await expect(page.locator(".job").first()).toContainText("Jaikvik Technology India Pvt Ltd");
  await expect(page.locator(".job.now")).toHaveCount(1);
  await expect(page.locator(".edu-row")).toHaveCount(2);
});

test("contact form validates, composes an addressed draft and copies the email", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(baseURL);
  await page.locator("#contact").scrollIntoViewIfNeeded();

  const submit = page.getByRole("button", { name: "Open email draft" });
  await submit.click();
  // native validation must block an empty required field
  expect(await page.locator("#name").evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false);

  await page.getByLabel("Your name *").fill("Test Visitor");
  await page.getByLabel("Email *").fill("visitor@example.com");
  await page.getByLabel("A little about it *").fill("A responsive web application with a custom admin panel.");

  const client = await context.newCDPSession(page);
  await client.send("Page.enable");
  const navigations: string[] = [];
  client.on("Page.frameRequestedNavigation", (event: { url: string }) => navigations.push(event.url));

  await submit.click();
  await expect(page.getByRole("status").last()).toContainText("draft is open in your mail app");
  await expect.poll(() => navigations.some((url) => url.startsWith("mailto:okprincesingh@gmail.com"))).toBe(true);

  const mailto = navigations.find((url) => url.startsWith("mailto:")) ?? "";
  const decoded = decodeURIComponent(mailto);
  expect(decoded).toContain("visitor@example.com");
  expect(decoded).toContain("A responsive web application");

  const copy = page.getByRole("button", { name: /okprincesingh@gmail\.com/ });
  await copy.click();
  await expect(page.getByRole("button", { name: /Copied/ })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("okprincesingh@gmail.com");
});

test("mobile sheet opens, navigates and restores scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL);

  const burger = page.getByRole("button", { name: "Open menu" });
  await expect(burger).toBeVisible();
  await burger.click();

  const sheet = page.locator("#sheet");
  await expect(sheet).toHaveClass(/open/);
  await expect(page.evaluate(() => document.body.style.overflow)).resolves.toBe("hidden");

  await sheet.getByRole("link", { name: /Experience/ }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(sheet).not.toHaveClass(/open/);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("résumé is a genuine PDF and downloads under its own name", async ({ page, request }) => {
  const response = await request.get(`${baseURL}/prince-singh-resume.pdf`);
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");

  await page.goto(baseURL);
  const download = page.waitForEvent("download");
  await page.locator(".topbar .resume").click();
  expect((await download).suggestedFilename()).toBe("prince-singh-resume.pdf");
});

test("scroll drives the progress bar and the timeline rail", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseURL);
  const atTop = await page.locator(".progress").evaluate((el) => el.style.transform);

  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(500);
  const atBottom = await page.locator(".progress").evaluate((el) => Number.parseFloat((el.style.transform.match(/scaleX\(([\d.]+)\)/) ?? ["", "0"])[1]));
  expect(atBottom).toBeGreaterThan(0.8);
  expect(atTop).not.toBe(`scaleX(${atBottom})`);

  await page.locator("#experience").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const rail = await page.locator(".rail i").evaluate((el) => Number.parseFloat(el.style.height));
  expect(rail).toBeGreaterThan(0);
});

test("reduced motion keeps everything readable and stops perpetual animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(baseURL);
  await page.evaluate(() => document.fonts.ready);

  const ticker = await page.locator(".ticker-track").evaluate((el) => Number.parseFloat(getComputedStyle(el).animationDuration));
  expect(ticker).toBeLessThan(0.001);

  // reveals must resolve to visible rather than staying hidden
  await page.locator("#work").scrollIntoViewIfNeeded();
  const hidden = await page.evaluate(
    () => [...document.querySelectorAll<HTMLElement>(".rv, .lm > span")].filter((el) => Number.parseFloat(getComputedStyle(el).opacity) < 0.9).length,
  );
  expect(hidden).toBe(0);
  await expect(page.locator("h1.display")).toBeVisible();
});
