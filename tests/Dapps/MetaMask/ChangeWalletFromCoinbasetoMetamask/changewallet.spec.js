import { defineConfig } from "@playwright/test";
import { test as baseTest } from "@playwright/test";
import { bootstrap, getWallet } from "@tenkeylabs/dappwright";
import { MetaMaskWallet } from "@tenkeylabs/dappwright";

///////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const extendedTest = baseTest.extend({
  context: async ({}, use, testInfo) => {
    const metadata = testInfo.project.metadata;
    const [wallet, _, context] = await bootstrap("", {
      ...metadata,
      headless: testInfo.project.use.headless,
    });

    if (wallet instanceof MetaMaskWallet && metadata.wallet === "metamask") {
      await wallet.addNetwork({
        networkName: "AIOZ Network Testnet",
        rpc: "https://eth-ds.testnet.aioz.network",
        chainId: 4102,
        symbol: "AIOZ",
        blockExplorer: "https://testnet-explorer.aioz.network",
      });
    }

    await use(context);
  },

  wallet: async ({ context }, use, testInfo) => {
    const walletId = testInfo.project.metadata.wallet;
    const wallet = await getWallet(walletId, context);

    await use(wallet);
  },
});

extendedTest("Open MetaMask and Coinbase and Import Wallets", async ({ wallet, context }) => {
  // Open two pages for MetaMask and Coinbase
  const metamaskPage = await context.newPage();
  const coinbasePage = await context.newPage();

  // Navigate to MetaMask
  await metamaskPage.goto("https://metamask.io/");
  console.log("MetaMask page opened");

  // Import MetaMask wallet
  if (wallet.id === "metamask") {
    await wallet.unlock();
    console.log("MetaMask wallet unlocked");
  }

  // Navigate to Coinbase
  await coinbasePage.goto("https://www.coinbase.com/");
  console.log("Coinbase page opened");

  // Import Coinbase wallet (dummy action for demo purposes)
  if (wallet.id === "coinbase") {
    await wallet.unlock();
    console.log("Coinbase wallet unlocked");
  }

  // Wait for both pages to load
  await metamaskPage.waitForTimeout(2000);
  await coinbasePage.waitForTimeout(2000);

  console.log("Both wallets imported and ready.");
});
