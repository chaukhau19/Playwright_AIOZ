import { test } from "./SetupMetaMask.js";
import { ConnectWalletPage } from "../../../pages/Dapps/MetaMask/MetaMask.js";

test("Disconnect AIOZ with MetaMask", async ({ wallet, page }) => {

  const connectWalletPage = new ConnectWalletPage(page);

  await connectWalletPage.gotoURL();

  await connectWalletPage.Connect_Wallet();

  await wallet.approve(); 

  await connectWalletPage.Verify_Account_Connected();

  await connectWalletPage.Disconnect_Wallet();

  await connectWalletPage.Verify_Account_Disconnected();

});
