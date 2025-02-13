import { test } from "./../../../pages/Dapps/SetupMetaMask.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";

test("Switch Network Ethereum and AIOZ Testnet with MetaMask", async ({ wallet, page }) => {
  const connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await connectWalletMetaMaskPage.Switch_Network(wallet);
});






