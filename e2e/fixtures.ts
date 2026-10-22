import { test as base, expect } from "@playwright/test";

type Fixtures = {
  /** Console messages a test expects, e.g. the browser's own log line for a 404 page. */
  consoleAllowlist: RegExp[];
  pageErrors: string[];
};

// Fail any test that logs a console error. This also catches CSP violations.
export const test = base.extend<Fixtures>({
  consoleAllowlist: [[], { option: true }],
  pageErrors: [
    async ({ page, consoleAllowlist }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(String(error)));
      page.on("console", (message) => {
        if (message.type() !== "error") return;
        const text = message.text();
        if (!consoleAllowlist.some((pattern) => pattern.test(text))) errors.push(text);
      });
      await use(errors);
      expect(errors, "console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

export const routes = [
  "/",
  "/services",
  "/services/muffler-exhaust-repair",
  "/services/custom-exhaust-fabrication",
  "/services/catalytic-converters",
  "/services/classic-specialty-vehicles",
  "/work",
  "/about",
  "/visit",
  "/request",
  "/privacy",
] as const;
