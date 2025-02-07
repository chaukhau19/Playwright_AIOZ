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
  slowMo: 500,
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

  projects: [
    {
      name: "MetaMask",
      metadata: {
        wallet: "metamask",
        version: "12.10.1",
        seed: "boring raccoon elevator sustain long jar phrase ring mask region elder primary", 
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
