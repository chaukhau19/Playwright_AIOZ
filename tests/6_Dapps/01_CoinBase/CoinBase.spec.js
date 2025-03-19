import { test } from "../../../pages/6_Dapps/SetupCoinBase.js";
import { ConnectWalletCoinBasePage } from "../../../pages/6_Dapps/01_CoinBase/CoinBase.js";

let connectWalletCoinBasePage;

test.beforeAll(async ({ page, wallet }) => {
  connectWalletCoinBasePage = new ConnectWalletCoinBasePage(page);
  await Promise.race([
    connectWalletCoinBasePage.Connect_CoinBase(wallet),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Connect Wallet Timeout!")), 120000))
  ]);
});

test.beforeEach(async ({ page }) => {
  connectWalletCoinBasePage = new ConnectWalletCoinBasePage(page);
  await page.waitForTimeout(1000);
});

test.afterEach(async ({ page }) => {
  // await page.waitForTimeout(1000);
  await page.close();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Connect AIOZ with CoinBase", async ({ wallet, page }) => {
  // const connectWalletCoinBasePage = new ConnectWalletCoinBasePage(page);
  // await connectWalletCoinBasePage.Connect_CoinBase(wallet);
});

test("Disconnect AIOZ with CoinBase", async ({ wallet, page }) => {
  await connectWalletCoinBasePage.Disconnect_CoinBase(wallet);
});

test("Switch Network Ethereum and AIOZ Testnet with CoinBase", async ({ wallet, page }) => {
  await connectWalletCoinBasePage.Switch_Network(wallet);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
