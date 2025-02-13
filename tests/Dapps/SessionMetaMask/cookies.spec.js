import { test } from "../../../pages/Dapps/SetupMetaMask.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";

test("Save Cookies AIOZ", async ({ wallet, page }) => {
  const connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await connectWalletMetaMaskPage.Connect_MetaMask(wallet);
  await connectWalletMetaMaskPage.saveCookies();
});


test("Use Cookies AIOZ", async ({ page }) => {
  const connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await connectWalletMetaMaskPage.useCookies();
});
