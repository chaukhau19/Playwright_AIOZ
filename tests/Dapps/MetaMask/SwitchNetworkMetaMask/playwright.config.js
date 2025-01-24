import { defineConfig } from "@playwright/test";
import { test as baseTest } from "@playwright/test";
import dappwright from "@tenkeylabs/dappwright";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let sharedContext;

export const test = baseTest.extend({
  context: async ({}, use) => {
    if (!sharedContext) {
      const [wallet, _, context] = await dappwright.bootstrap("", {
        wallet: "metamask",
        version: "12.10.1",
        seed: "boring raccoon elevator sustain long jar phrase ring mask region elder primary", 
        headless: false,
      });

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
    const metamask = await dappwright.getWallet("metamask", context);

    await use(metamask);
  },
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default defineConfig({
  workers: 1, 
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////