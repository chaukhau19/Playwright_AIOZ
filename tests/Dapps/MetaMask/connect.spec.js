import { test } from "./../../../pages/Dapps/SetupMetaMask.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";

test("Connect AIOZ with MetaMask", { timeout: 200000 }, async ({ wallet, page }) => {
  console.log("Test started: Connect AIOZ with MetaMask");
  const connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  console.log("ConnectWalletMetaMaskPage initialized");
  await connectWalletMetaMaskPage.Connect_MetaMask(wallet);
  console.log("MetaMask connection attempted");
});

