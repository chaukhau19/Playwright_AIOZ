import { test as baseTest } from "@playwright/test";
import dappwright from "@tenkeylabs/dappwright";

let sharedContext;

export const test = baseTest.extend({
  context: async ({}, use) => {
    if (!sharedContext) {
    try {
      console.log("Starting Metamask bootstrap...");
      const [wallet, _, context] = await Promise.race([
      dappwright.bootstrap("", {
        wallet: "metamask",
        version: "12.10.1",
        seed: "boring raccoon elevator sustain long jar phrase ring mask region elder primary",
        headless: true,
        slowMo: 500,
        args: [
          "--disable-web-security",
          "--disable-features=IsolateOrigins,site-per-process",
          "--ignore-certificate-errors",
          "--disable-gpu",
          "--disable-extensions", 
          "--no-sandbox",
          "--disable-popup-blocking",
          "--disable-infobars",
          "--disable-backgrounding-occluded-windows",
          "--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure"
        ],
      }),
      // new Promise((_, reject) => setTimeout(() => reject(new Error("Bootstrap Metamask Timeout!")), 120000))
      ]);

      console.log("Metamask bootstrap completed.");
  
      await wallet.page.waitForTimeout(500); 
      console.log("Adding AIOZ Network Testnet to Metamask...");

      await wallet.addNetwork({
      networkName: "AIOZ Network Testnet",
      rpc: "https://eth-ds.testnet.aioz.network",
      chainId: 4102,
      symbol: "AIOZ",
      blockExplorer: "https://testnet-explorer.aioz.network",
      });

      console.log("AIOZ Network Testnet added to Metamask.");
  
      sharedContext = context;
    } catch (error) {
      console.error("Error during Metamask setup:", error);
      throw error; 
    }
    } else {
    console.log("Using shared context.");
    }
  
    await use(sharedContext);
  },
  
  wallet: async ({ context }, use) => {
    console.log("Getting Metamask wallet...");
    const metamask = await dappwright.getWallet("metamask", context);
    console.log("Metamask wallet obtained.");
    await use(metamask);
  },
});
