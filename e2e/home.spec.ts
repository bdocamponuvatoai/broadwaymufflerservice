import { expect, routes, test } from "./fixtures";

test.describe("every page", () => {
  for (const route of routes) {
    test(`${route} has one h1, the shop's phone link and no horizontal overflow`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('a[href="tel:+19259334373"]').first()).toBeAttached();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test("home page shows every section", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "The exhaust shop on North Main." })).toBeVisible();
  for (const name of [
    "Four things, done with care.",
    "Follow the pipe.",
    "Real cars. Real bay.",
    "How a visit works.",
    "Good questions.",
    "Let’s get your car sorted.",
  ]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeAttached();
  }
});

test("production responses carry the security headers", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["strict-transport-security"]).toContain("max-age=63072000");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["x-powered-by"]).toBeUndefined();
});

test("pages are noindex until launch", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/services/catalytic-converters");
});

test("reduced motion shows all content without waiting for reveals", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hidden = await page
    .locator("[data-reveal]")
    .evaluateAll((elements) => elements.filter((element) => getComputedStyle(element).opacity !== "1").length);
  expect(hidden).toBe(0);
});

test("FAQ answers open", async ({ page }) => {
  await page.goto("/");
  const question = page.getByText("What are your opening hours?");
  await question.click();
  await expect(page.getByText("Public listings disagree on current hours")).toBeVisible();
});

test("exhaust diagram selects parts by click and keyboard", async ({ page }) => {
  await page.goto("/");
  const finder = page.getByTestId("exhaust-finder");
  const panel = finder.getByRole("tabpanel");
  await expect(finder.getByRole("tab", { name: "Catalytic converter" })).toHaveAttribute("aria-selected", "true");

  await finder.getByRole("tab", { name: "Muffler", exact: true }).click();
  await expect(panel).toContainText("Quiets the exhaust");
  await expect(panel.getByRole("link", { name: "Mufflers & exhaust" })).toHaveAttribute(
    "href",
    "/services/muffler-exhaust-repair",
  );

  await page.keyboard.press("ArrowRight");
  await expect(finder.getByRole("tab", { name: "Tailpipe & tips" })).toBeFocused();
  await expect(panel).toContainText("Where the exhaust exits");
  await expect(panel.getByRole("link", { name: "Ask about this" })).toHaveAttribute(
    "href",
    "/request?service=custom-exhaust-fabrication",
  );
});

test.describe("work gallery", () => {
  test("filters photos and opens the lightbox", async ({ page, isMobile }) => {
    await page.goto("/work");
    await page.getByRole("button", { name: "Fabrication", exact: true }).click();
    await expect(page.getByTestId("gallery-count")).toHaveText("1 photo");
    await page.getByRole("button", { name: "All work", exact: true }).click();
    await expect(page.getByTestId("gallery-count")).toHaveText("3 photos");

    const trigger = page.getByRole("button", { name: /Character worth keeping/ });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Character worth keeping" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByTestId("gallery-counter")).toHaveText("1 / 3");

    await dialog.getByRole("button", { name: "Next photo" }).click();
    await expect(page.getByRole("dialog", { name: "It’s all in the fit" })).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByRole("dialog", { name: "Character worth keeping" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    if (!isMobile) await expect(trigger).toBeFocused();
  });
});

test("service pages carry their preset into the request link", async ({ page }) => {
  await page.goto("/services/classic-specialty-vehicles");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("For the car you’ll never sell.");
  await expect(page.getByRole("link", { name: "Ask about this service" })).toHaveAttribute(
    "href",
    "/request?service=classic-specialty-vehicles",
  );
});

test("privacy page explains the email-draft flow", async ({ page }) => {
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Your details, handled simply.");
  await expect(page.getByText("doesn’t set cookies, load analytics")).toBeVisible();
});

test.describe("not found", () => {
  test.use({ consoleAllowlist: [/status of 404/] });

  test("unknown pages return a branded 404", async ({ page }) => {
    const response = await page.goto("/no-such-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Wrong turn.");
    await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("content is visible and the phone link works", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Real cars. Real bay." })).toBeVisible();
    const hidden = await page
      .locator("[data-reveal]")
      .evaluateAll((elements) => elements.filter((element) => getComputedStyle(element).opacity !== "1").length);
    expect(hidden).toBe(0);
    // The header number is hidden on phones by design; the hero call button is always shown.
    await expect(page.getByRole("link", { name: "Call (925) 933-4373" }).first()).toBeVisible();
  });

  test("the request page points to phone and email instead", async ({ page }) => {
    await page.goto("/request");
    // getByText skips <noscript> content, so locate the paragraph directly.
    const notice = page.locator("noscript p");
    await expect(notice).toBeVisible();
    await expect(notice).toContainText("The request form needs JavaScript.");
  });
});
