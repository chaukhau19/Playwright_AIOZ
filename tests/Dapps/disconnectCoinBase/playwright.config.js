import { defineConfig } from "@playwright/test";
import { CoinbaseWallet, MetaMaskWallet } from "@tenkeylabs/dappwright";

export default defineConfig({
  workers: 1, // Run serially to avoid browser session collisions
  // webServer: [
  //   {
  //     command: "yarn preview --port 8080",
  //     url: "http://localhost:8080",
  //     // timeout: 5000,
  //     reuseExistingServer: true,
  //   },
  //   {
  //     command: "yarn chain",
  //     url: "http://localhost:8546",
  //     // timeout: 5000,
  //     reuseExistingServer: true,
  //   },
  // ],
  use: {
    headless: false,
  },
  projects: [
    // {
    //   name: "MetaMask",
    //   metadata: {
    //     wallet: "metamask",
    //     version: "12.10.1",
    //     // version: MetaMaskWallet.recommendedVersion,
    //     seed: "test test test test test test test test test test test junk", // Hardhat's default https://hardhat.org/hardhat-network/docs/reference#accounts
    //   },
    // },
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
