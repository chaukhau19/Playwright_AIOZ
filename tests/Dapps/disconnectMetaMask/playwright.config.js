import { defineConfig } from "@playwright/test";

export default defineConfig({
  workers: 1,
  timeout: 0, 
  use: {
    actionTimeout: 0, 
    navigationTimeout: 0, 
    headless: false,
  },
});
