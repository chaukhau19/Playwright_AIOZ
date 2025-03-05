import { test as baseTest } from "@playwright/test";
import dappwright from "@tenkeylabs/dappwright";

let sharedContext;

export const test = baseTest.extend({
    context: async ({}, use) => {
      if (!sharedContext) {
        try {
          const [wallet, _, context] = await Promise.race([
            dappwright.bootstrap("", {
              wallet: "metamask",
              version: "12.10.1",
              seed: "boring raccoon elevator sustain long jar phrase ring mask region elder primary",
              headless: false,
              slowMo: 500,
              browser: "chrome", 

              args: [
                "--disable-web-security",
                "--disable-features=IsolateOrigins,site-per-process",
                "--ignore-certificate-errors",
                "--disable-gpu",
                // "--disable-extensions", 
                "--disable-popup-blocking",
                "--disable-infobars",
                "--disable-backgrounding-occluded-windows",
                "--no-sandbox" 
              ],
              
            }),
          ]);

          await wallet.page.waitForTimeout(500); 
  
          await wallet.addNetwork({
            networkName: "AIOZ Network Testnet",
            rpc: "https://eth-ds.testnet.aioz.network",
            chainId: 4102,
            symbol: "AIOZ",
            blockExplorer: "https://testnet-explorer.aioz.network",
          });

          sharedContext = context;
        } catch (error) {
          console.error("Error during Metamask setup:", error);
          throw error; 
        }
      }
  
      await use(sharedContext);
    },
  
    wallet: async ({ context }, use) => {
      const metamask = await dappwright.getWallet("metamask", context);
      await use(metamask);
    },
});
