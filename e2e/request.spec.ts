import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";

async function fillVehicle(page: Page) {
  await page.getByLabel("Catalytic converters").check();
  await page.getByLabel("Year").fill("1967");
  await page.getByLabel("Make").fill("Ford");
  await page.getByLabel("Model").fill("Mustang");
  await page.getByLabel("What would you like the shop to know?").fill("Loud roar on start-up since Tuesday.");
}

async function fillContact(page: Page) {
  await page.getByLabel("Your name").fill("Alex Rivera");
  await page.getByRole("textbox", { name: "Email" }).fill("alex@example.com");
  await page.getByRole("textbox", { name: "Phone" }).fill("(925) 555-0100");
  await page.getByRole("radio", { name: "Phone" }).check();
}

test("empty steps show inline errors and focus the first invalid field", async ({ page }) => {
  await page.goto("/request");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByText("Choose a service, or pick “Help me decide”.")).toBeVisible();
  await expect(page.getByText("Enter the vehicle’s year.")).toBeVisible();
  await expect(page.getByLabel("Mufflers & exhaust")).toBeFocused();
  await expect(page.getByLabel("Year")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Year")).toHaveAttribute("aria-describedby", "request-year-error");

  await page.getByLabel("Year").fill("1967");
  await expect(page.getByLabel("Year")).not.toHaveAttribute("aria-invalid", "true");
});

test("a service preset from the URL is pre-selected", async ({ page }) => {
  await page.goto("/request?service=catalytic-converters");
  await expect(page.getByLabel("Catalytic converters")).toBeChecked();
});

test("an unknown preset is ignored", async ({ page }) => {
  await page.goto("/request?service=brakes");
  for (const label of ["Mufflers & exhaust", "Catalytic converters", "Help me decide"]) {
    await expect(page.getByLabel(label)).not.toBeChecked();
  }
});

test("the full flow prepares an email draft without claiming a booking", async ({ page }) => {
  await page.goto("/request");
  await fillVehicle(page);
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByRole("heading", { level: 2, name: "How can the shop reach you?" })).toBeFocused();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Enter your name.")).toBeVisible();
  await expect(page.getByLabel("Your name")).toBeFocused();

  await fillContact(page);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { level: 2, name: "Check, then email." })).toBeFocused();

  const review = page.getByTestId("request-review");
  await expect(review).toContainText("Catalytic converter service");
  await expect(review).toContainText("1967 Ford Mustang");
  await expect(review).toContainText("Alex Rivera");
  await expect(review).toContainText("Please discuss availability");
  await expect(page.getByText("Nothing has been sent yet.")).toBeVisible();

  const href = await page.getByTestId("open-email-draft").getAttribute("href");
  expect(href).toMatch(/^mailto:bdwymuffler@comcast\.net\?subject=/);
  const body = decodeURIComponent(href?.split("&body=")[1] ?? "");
  expect(decodeURIComponent(href?.split("subject=")[1]?.split("&")[0] ?? "")).toBe(
    "Service request: 1967 Ford Mustang",
  );
  expect(body).toContain("Your request: Loud roar on start-up since Tuesday.");
  expect(body).toContain("Contact by: Phone");
  expect(body).toContain("not a confirmed appointment");

  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByLabel("Your name")).toHaveValue("Alex Rivera");
});

test("past preferred dates are rejected", async ({ page }) => {
  await page.goto("/request");
  await fillVehicle(page);
  await page.getByRole("button", { name: "Continue" }).click();
  await fillContact(page);
  await page.getByLabel("Preferred day (optional)").fill("2020-01-01");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Choose today or a future date.")).toBeVisible();
});
