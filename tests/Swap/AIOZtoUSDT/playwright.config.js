import { defineConfig } from "@playwright/test";

export default defineConfig({
  workers: 1,
  timeout: 0, 
  use: {
    actionTimeout: 0, 
    navigationTimeout: 0, 
    headless: false,
  },
  slowMo: 500,
  args: [
    "--disable-web-security",
    "--disable-features=IsolateOrigins,site-per-process",
    "--ignore-certificate-errors",
    "--disable-gpu",
    "--disable-extensions", 
    "--no-sandbox" 
  ],
});
