import { test } from "./../../../pages/Dapps/SetupMetaMask.js";
import { ConnectWalletMetaMaskPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";

test("Disconnect AIOZ with MetaMask", async ({ wallet, page }) => {
  const connectWalletMetaMaskPage = new ConnectWalletMetaMaskPage(page);
  await connectWalletMetaMaskPage.Disconnect_MetaMask(wallet);

});
