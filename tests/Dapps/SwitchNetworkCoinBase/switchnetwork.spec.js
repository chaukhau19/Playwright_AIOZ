import { expect, test as baseTest } from "@playwright/test";
import { bootstrap, getWallet } from "@tenkeylabs/dappwright";
import { CoinbaseWallet } from '@tenkeylabs/dappwright';

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

test.beforeEach(async ({ page }) => {
  await page.goto("https://aiozswap-web.vercel.app/#/swap");
});

test("Switch Network Ethereum to AIOZ Testnet with CoinBase", async ({ wallet, page }) => {
  await page.waitForTimeout(1000);
  await page.locator('//button[@data-testid="navbar-connect-wallet"]').click();
  await page.waitForTimeout(1000);
  await page.locator('//button[@data-testid="wallet-option-COINBASE_WALLET"]').click();
  await wallet.approve();
  await page.waitForTimeout(1000);
  await expect(page.locator("//button[.//p[text()='0x0D3f...9E3b']]")).toBeVisible();
  await page.getByTestId('chain-selector').click();
  await page.getByTestId('AIOZ Testnet-selector').click();
  await wallet.approve(); 
  await page.waitForTimeout(1000);
  await page.getByTestId('chain-selector').click();
  await page.getByTestId('Ethereum-selector').click();
  await page.waitForTimeout(1000);
  await page.getByTestId('chain-selector').click();
  await page.getByTestId('AIOZ Testnet-selector').click();
  await wallet.approve(); 
  await page.waitForTimeout(1000);
});

