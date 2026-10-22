import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const isCI = Boolean(process.env.CI);
const channel = process.env.PW_CHANNEL; // msedge or chrome reuses an installed browser locally

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://localhost:${port}`, trace: "on-first-retry" },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"], channel } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"], channel } },
    { name: "desktop-firefox", use: devices["Desktop Firefox"] },
    { name: "desktop-webkit", use: devices["Desktop Safari"] },
    { name: "mobile-webkit", use: devices["iPhone 15"] },
  ],
  // Run against the production build so headers and CSP are real.
  webServer: {
    command: `npm run start -- --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !isCI,
    timeout: 60_000,
  },
});
