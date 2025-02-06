import { defineConfig } from "@playwright/test";
import { CoinbaseWallet, MetaMaskWallet } from "@tenkeylabs/dappwright";

export default defineConfig({
  workers: 1,
  timeout: 0, 
  use: {
    actionTimeout: 0, 
    navigationTimeout: 0, 
    headless: false,
  },
  projects: [
    {
      name: "Coinbase",
      metadata: {
        wallet: "coinbase",
        version: "3.99.0",
        // version: CoinbaseWallet.recommendedVersion,
        seed: "gown pill disagree boring craft valve rival airport wrestle long vacuum auction", 
      },
    },
  ],
});
