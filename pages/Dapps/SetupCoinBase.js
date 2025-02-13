import { test as baseTest } from "@playwright/test";
import dappwright from "@tenkeylabs/dappwright";

let sharedContext;

export const test = baseTest.extend({
  context: async ({}, use) => {
    if (!sharedContext) {
      const [wallet, _, context] = await dappwright.bootstrap("", {
        wallet: "coinbase",
        version: "3.99.0",
        seed:"gown pill disagree boring craft valve rival airport wrestle long vacuum auction", 
        headless: false,
        slowMo: 250,
        args: [
          "--disable-web-security",
          "--disable-features=IsolateOrigins,site-per-process",
          "--ignore-certificate-errors",
          "--disable-gpu",
          "--disable-extensions", 
          "--no-sandbox" 
      ],
      });
      await wallet.page.waitForTimeout(500); 

      await wallet.addNetwork({
        networkName: "AIOZ Network Testnet",
        rpc: "https://eth-ds.testnet.aioz.network",
        chainId: 4102,
        symbol: "AIOZ",
        blockExplorer: "https://testnet-explorer.aioz.network",
      });

      sharedContext = context;
    }

    await use(sharedContext);
  },

  wallet: async ({ context }, use) => {
    const coinbase = await dappwright.getWallet("coinbase", context);

    await use(coinbase);
  },
});



