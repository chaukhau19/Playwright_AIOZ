import { defineConfig } from "@playwright/test";
import { CoinbaseWallet } from "@tenkeylabs/dappwright";
import { test as baseTest } from "@playwright/test";
import { bootstrap, getWallet } from "@tenkeylabs/dappwright";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      name: "Coinbase",
      metadata: {
        wallet: "coinbase",
        version: "3.99.0",
        seed: "gown pill disagree boring craft valve rival airport wrestle long vacuum auction", 
      },
    },
  ],
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const test = baseTest.extend({
  context: async ({}, use, testInfo) => {

    const metadata = testInfo.project.metadata;
    const [wallet, _, context] = await bootstrap("", {
      ...metadata,
      headless: testInfo.project.use.headless,
    });

    if (wallet instanceof CoinbaseWallet) {
      await wallet.addNetwork({
        networkName: "AIOZ Network Testnet",
        rpc: "https://eth-ds.testnet.aioz.network",
        chainId: 4102,
        symbol: "AIOZ",
        blockExplorer: "https://testnet-explorer.aioz.network",
      });
    } else {
      console.log("Skipping network addition for Coinbase Wallet.");
    }
    

    await use(context);
  },

  wallet: async ({ context }, use, testInfo) => {
    const walletId = testInfo.project.metadata.wallet;
    const metamask = await getWallet(walletId, context);

    await use(metamask);
  },
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////