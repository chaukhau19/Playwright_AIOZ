import { defineConfig } from "@playwright/test";


///////////////////////////////////////////////////////////////////////////////////////////////////////////
export default defineConfig({
  workers: 1,
  use: {
    headless: false,
  },
  projects: [
    {
      name: "MetaMask",
      metadata: {
        wallet: "metamask",
        version: "12.10.1",
        seed: "test test test test test test test test test test test junk",
      },
    },
    {
      name: "Coinbase",
      metadata: {
        wallet: "coinbase",
        version: "3.99.0",
        seed: "gown pill disagree boring craft valve rival airport wrestle long vacuum auction",
      },
    },
  ],
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////
