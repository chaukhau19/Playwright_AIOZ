import { test } from "./../../../pages/6_Dapps/SetupMetaMask.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/6_Dapps/02_MetaMask/MetaMask.js";

test("Switch Network Ethereum and AIOZ Testnet with MetaMask", { timeout: 300000 }, async ({ wallet, page }) => {
  const connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await connectWalletMetaMaskPage.Switch_Network(wallet);
});






