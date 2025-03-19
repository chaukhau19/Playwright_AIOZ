import { test } from "../../../pages/6_Dapps/SetupMetaMask.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";

let connectWalletMetaMaskPage;

test.beforeAll(async ({ page, wallet }) => {
  connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await Promise.race([
    connectWalletMetaMaskPage.Connect_MetaMask(wallet),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Connect Wallet Timeout!")), 120000))
  ]);
});

test.beforeEach(async ({ page }) => {
  connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await page.waitForTimeout(1000);
});

test.afterEach(async ({ page }) => {
  // await page.waitForTimeout(1000);
  await page.close();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Connect AIOZ with MetaMask", async ({ wallet, page }) => {
  // const connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  // await connectWalletMetaMaskPage.Connect_MetaMask(wallet);
});

test("Disconnect AIOZ with MetaMask", async ({ wallet, page }) => {
  await connectWalletMetaMaskPage.Disconnect_MetaMask(wallet);
});

test("Switch Network Ethereum and AIOZ Testnet with MetaMask", async ({ wallet, page }) => {
  await connectWalletMetaMaskPage.Switch_Network(wallet);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


