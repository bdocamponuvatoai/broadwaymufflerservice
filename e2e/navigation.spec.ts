import { expect, test } from "./fixtures";

test.describe("mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "Phone layout only");

  test("menu opens, closes with Escape and navigates", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await menu.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(menu).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("The right work for your car.");
  });

  test("action bar appears once the hero scrolls away", async ({ page }) => {
    await page.goto("/");
    const bar = page.getByTestId("mobile-action-bar");
    await expect(bar).toHaveAttribute("data-visible", "false");
    await expect(bar).toBeHidden();

    await page.getByRole("heading", { name: "Follow the pipe." }).scrollIntoViewIfNeeded();
    await expect(bar).toHaveAttribute("data-visible", "true");
    await expect(bar.getByRole("link", { name: "Call" })).toHaveAttribute("href", "tel:+19259334373");
    await expect(bar.getByRole("link", { name: "Request" })).toHaveAttribute("href", "/request");
  });
});

test.describe("desktop", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop layout only");

  test("main navigation marks the current page", async ({ page }) => {
    await page.goto("/work");
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link", { name: "Our work" })).toHaveAttribute("aria-current", "page");
    await nav.getByRole("link", { name: "The shop" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("A shop with character.");
  });

  test("skip link is the first tab stop and moves focus to main", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "Safari only tabs to links with a system setting enabled");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main")).toBeFocused();
  });
});

test("header turns solid after scrolling", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header").first();
  await expect(header).toHaveAttribute("data-scrolled", "false");
  await page.evaluate(() => window.scrollTo(0, 800));
  await expect(header).toHaveAttribute("data-scrolled", "true");
});
