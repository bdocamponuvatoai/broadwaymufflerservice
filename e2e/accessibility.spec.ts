import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

import { expect, routes, test } from "./fixtures";

const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function expectNoViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
  const summary = violations.map(
    (v) => `${v.id}: ${v.nodes.map((n) => `${n.target.join(" ")} (${n.failureSummary ?? ""})`).join(", ")}`,
  );
  expect(summary).toEqual([]);
}

// A full axe scan takes 13–21 s per page in Firefox, so allow more than the 30 s default under parallel load.
test.describe.configure({ timeout: 60_000 });

// Reduced motion so mid-fade colours are never measured.
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

for (const route of routes) {
  test(`${route} has no WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(route);
    await expectNoViolations(page);
  });
}

test("request form steps and errors have no violations", async ({ page }) => {
  await page.goto("/request");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Enter the vehicle’s year.")).toBeVisible();
  await expectNoViolations(page);

  await page.getByLabel("Mufflers & exhaust").check();
  await page.getByLabel("Year").fill("1999");
  await page.getByLabel("Make").fill("Honda");
  await page.getByLabel("Model").fill("Civic");
  await page.getByLabel("What would you like the shop to know?").fill("Rattle over bumps.");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { name: "How can the shop reach you?" })).toBeVisible();
  await expectNoViolations(page);

  await page.getByLabel("Your name").fill("Sam Lee");
  await page.getByRole("textbox", { name: "Email" }).fill("sam@example.com");
  await page.getByRole("textbox", { name: "Phone" }).fill("925 555 0100");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { name: "Check, then email." })).toBeVisible();
  await expectNoViolations(page);
});

test("gallery lightbox has no violations", async ({ page }) => {
  await page.goto("/work");
  await page.getByRole("button", { name: /Character worth keeping/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expectNoViolations(page);
});

test("mobile menu has no violations", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phone layout only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await expectNoViolations(page);
});
