import { defineConfig, devices } from "@playwright/test"
export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: './playwright-report', open: 'always' }]],
  timeout: 0,
  use: {
    actionTimeout: 0,
    navigationTimeout: 0,
    headless: false,
    args: [
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      "--ignore-certificate-errors",
      "--disable-gpu",
      "--disable-extensions",
      "--no-sandbox",
      '--proxy-server=https://aiozswap-web.vercel.app/',
      '--disable-setuid-sandbox'
    ],
    video: 'on',
    trace: 'on',
    screenshot: 'on',
    launchOptions: {
      slowMo: 0,
    },
    viewport: { width: 1366, height: 768 },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } },
    },
  ],
});

